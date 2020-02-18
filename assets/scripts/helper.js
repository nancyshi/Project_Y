// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var Helper = cc.Class({
    properties: {},

    segmentsIntr(a, b, c, d){ 
  
        // 三角形abc 面积的2倍 
        var area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x); 
         
        // 三角形abd 面积的2倍 
        var area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x); 
         
        // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理); 
        if ( area_abc*area_abd>=0 ) { 
        return false; 
        } 
         
        // 三角形cda 面积的2倍 
        var area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x); 
        // 三角形cdb 面积的2倍 
        // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出. 
        var area_cdb = area_cda + area_abc - area_abd ; 
        if ( area_cda * area_cdb >= 0 ) { 
        return false; 
        } 
         
        //计算交点坐标 
        var t = area_cda / ( area_abd- area_abc ); 
        var dx= t*(b.x - a.x), 
        dy= t*(b.y - a.y); 
        return { x: a.x + dx , y: a.y + dy }; 
         
    },

    rotateSegment(a,b,origin,degree) {
        var rotatedA = this.rotateOnePoint(a,origin,degree)
        var rotatedB = this.rotateOnePoint(b,origin,degree)

        return {
            p1: rotatedA,
            p2: rotatedB
        }
    },

    rotateOnePoint(b,origin,degree) {
        var angle = degree * Math.PI / 180
        var pb = cc.v2(b.x - origin.x, b.y - origin.y)
        var rotatedPb = pb.rotate(angle)
        var rotatedB = cc.v2(rotatedPb.x + origin.x, rotatedPb.y + origin.y)
        return rotatedB
    },

    rayTest(line1,line2) {
        var result = this.segmentsIntr(line1.p1, line1.p2, line2.p1, line2.p2)
        if (result == false) {
            return false
        }

        var dis = cc.v2(result.x - line1.p1.x, result.y - line1.p1.y).mag()
        return dis
    },
    
    getSuitablePoint(p1,currentDis,targetDis,direction) {
        direction.normalizeSelf()
        var currentDisX = currentDis * direction.x
        var currentDisY = currentDis * direction.y

        var ratio = (currentDis - targetDis) / currentDis
        var resultX = p1.x + ratio * currentDisX
        var resultY = p1.y + ratio * currentDisY

        return cc.v2(resultX, resultY)
    },

    makeRay(p1,dis,direction) {
        var ray = {
            p1: p1,
            p2: null
        }
        if (direction.mag() != 1) {
            direction.normalizeSelf()
        }
        var dx = direction.x * dis
        var dy = direction.y * dis
        var x = p1.x + dx
        var y = p1.y + dy
        ray.p2 = cc.v2(x,y)
        return ray
    },

    getLinesOfOneNode(givenNode) {

        var offset = givenNode.height / 2
        var p1 = cc.v2(givenNode.x - givenNode.width/2, givenNode.y - offset)
        var p2 = cc.v2(givenNode.x + givenNode.width/2, givenNode.y - offset)
        var p3 = cc.v2(p1.x, p1.y + givenNode.height)
        var p4 = cc.v2(p2.x, p2.y + givenNode.height)
        var p5 = cc.v2(givenNode.x - givenNode.width / 2, givenNode.y + givenNode.height / 2)
        var p6 = cc.v2(p5.x, p5.y - givenNode.height)
        var p7 = cc.v2(givenNode.x + givenNode.width / 2, givenNode.y + givenNode.height / 2)
        var p8 = cc.v2(p7.x, p7.y - givenNode.height)

        var line1 = this.helper.rotateSegment(p1,p2,givenNode.position,-givenNode.angle)
        var line2 = this.helper.rotateSegment(p3,p4,givenNode.position,-givenNode.angle)
        var line3 = this.helper.rotateSegment(p5,p6,givenNode.position,-givenNode.angle)
        var line4 = this.helper.rotateSegment(p7,p8,givenNode.position,-givenNode.angle)
        var obj = {
            lowerLine: line1, //lower line
            upperLine: line2, //upper line
            leftLine: line3, //left line
            rightLine: line4  //right line
        }
        return obj
    },

    isTwoNodeCross(node1, node2) {
        var bounders1 = this.getLinesOfOneNode(node1)
        var bounders2 = this.getLinesOfOneNode(node2)
        for (var key in bounders1) {
            var line = bounders1[key]
            for (var k in bounders2) {
                var anotherLine = bounders2[k]
                var dis = this.rayTest(line,anotherLine)
                if (dis != false) {
                    return true
                }
            }
        }

        return false
    }
});

module.exports = Helper
