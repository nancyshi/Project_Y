"use strict";
cc._RF.push(module, 'fee26lOQ3NFBb7FR2MoK8sC', 'helper');
// scripts/helper.js

"use strict";

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

    segmentsIntr: function segmentsIntr(a, b, c, d) {

        // 三角形abc 面积的2倍 
        var area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);

        // 三角形abd 面积的2倍 
        var area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);

        // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理); 
        if (area_abc * area_abd >= 0) {
            return false;
        }

        // 三角形cda 面积的2倍 
        var area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
        // 三角形cdb 面积的2倍 
        // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出. 
        var area_cdb = area_cda + area_abc - area_abd;
        if (area_cda * area_cdb >= 0) {
            return false;
        }

        //计算交点坐标 
        var t = area_cda / (area_abd - area_abc);
        var dx = t * (b.x - a.x),
            dy = t * (b.y - a.y);
        return { x: a.x + dx, y: a.y + dy };
    },
    rotateSegment: function rotateSegment(a, b, origin, degree) {
        var rotatedA = this.rotateOnePoint(a, origin, degree);
        var rotatedB = this.rotateOnePoint(b, origin, degree);

        return {
            p1: rotatedA,
            p2: rotatedB
        };
    },
    rotateOnePoint: function rotateOnePoint(b, origin, degree) {
        var angle = degree * Math.PI / 180;
        var pb = cc.v2(b.x - origin.x, b.y - origin.y);
        var rotatedPb = pb.rotate(angle);
        var rotatedB = cc.v2(rotatedPb.x + origin.x, rotatedPb.y + origin.y);
        return rotatedB;
    },
    rayTest: function rayTest(line1, line2) {
        var result = this.segmentsIntr(line1.p1, line1.p2, line2.p1, line2.p2);
        if (result == false) {
            return false;
        }

        var dis = cc.v2(result.x - line1.p1.x, result.y - line1.p1.y).mag();
        return dis;
    },
    getSuitablePoint: function getSuitablePoint(p1, currentDis, targetDis, direction) {
        if (targetDis >= currentDis) {
            return p1;
        }
        direction.normalizeSelf();
        var currentDisX = currentDis * direction.x;
        var currentDisY = currentDis * direction.y;

        var ratio = (currentDis - targetDis) / currentDis;
        var resultX = p1.x + ratio * currentDisX;
        var resultY = p1.y + ratio * currentDisY;

        return cc.v2(resultX, resultY);
    },
    makeRay: function makeRay(p1, dis, direction) {
        var ray = {
            p1: p1,
            p2: null
        };
        if (direction.mag() != 1) {
            direction.normalizeSelf();
        }
        var dx = direction.x * dis;
        var dy = direction.y * dis;
        var x = p1.x + dx;
        var y = p1.y + dy;
        ray.p2 = cc.v2(x, y);
        return ray;
    },
    getLinesOfOneNode: function getLinesOfOneNode(givenNode) {

        var offset = givenNode.height / 2;
        var p1 = cc.v2(givenNode.x - givenNode.width / 2, givenNode.y - offset);
        var p2 = cc.v2(givenNode.x + givenNode.width / 2, givenNode.y - offset);
        var p3 = cc.v2(p1.x, p1.y + givenNode.height);
        var p4 = cc.v2(p2.x, p2.y + givenNode.height);
        var p5 = cc.v2(givenNode.x - givenNode.width / 2, givenNode.y + givenNode.height / 2);
        var p6 = cc.v2(p5.x, p5.y - givenNode.height);
        var p7 = cc.v2(givenNode.x + givenNode.width / 2, givenNode.y + givenNode.height / 2);
        var p8 = cc.v2(p7.x, p7.y - givenNode.height);

        var line1 = { p1: p1, p2: p2 };
        var line2 = { p1: p3, p2: p4 };
        var line3 = { p1: p5, p2: p6 };
        var line4 = { p1: p7, p2: p8 };
        if (givenNode.angle != null && givenNode.angle != undefined) {
            line1 = this.rotateSegment(p1, p2, cc.v2(givenNode.x, givenNode.y), -givenNode.angle);
            line2 = this.rotateSegment(p3, p4, cc.v2(givenNode.x, givenNode.y), -givenNode.angle);
            line3 = this.rotateSegment(p5, p6, cc.v2(givenNode.x, givenNode.y), -givenNode.angle);
            line4 = this.rotateSegment(p7, p8, cc.v2(givenNode.x, givenNode.y), -givenNode.angle);
        }
        // var line1 = this.rotateSegment(p1,p2,cc.v2(givenNode.x, givenNode.y),-givenNode.angle)
        // var line2 = this.rotateSegment(p3,p4,cc.v2(givenNode.x, givenNode.y),-givenNode.angle)
        // var line3 = this.rotateSegment(p5,p6,cc.v2(givenNode.x, givenNode.y),-givenNode.angle)
        // var line4 = this.rotateSegment(p7,p8,cc.v2(givenNode.x, givenNode.y),-givenNode.angle) 
        var obj = {
            lowerLine: line1, //lower line
            upperLine: line2, //upper line
            leftLine: line3, //left line
            rightLine: line4 //right line
        };
        if (line1 == null || line2 == null || line3 == null || line4 == null) {
            cc.error("NOT INVALID LINES");
        }
        return obj;
    },
    isTwoNodeCross: function isTwoNodeCross(node1, node2) {

        var info1 = this.getInfoOfOneNode(node1);
        var info2 = this.getInfoOfOneNode(node2);
        if (info1.minY > info2.maxY || info2.minY > info1.maxY || info1.minX > info2.maxX || info2.minX > info1.maxX) {
            return false;
        }
        return true;
    },
    getInfoOfOneNode: function getInfoOfOneNode(givenNode) {
        var leftUpPoint = cc.v2(givenNode.x - givenNode.width / 2, givenNode.y + givenNode.height / 2);
        var rightUpPoint = cc.v2(givenNode.x + givenNode.width / 2, leftUpPoint.y);
        var leftDownPoint = cc.v2(leftUpPoint.x, givenNode.y - givenNode.height / 2);
        var rightDownPoint = cc.v2(rightUpPoint.x, leftDownPoint.y);

        if (givenNode.angle != null && givenNode.angle != undefined) {
            leftUpPoint = this.rotateOnePoint(leftUpPoint, cc.v2(givenNode.x, givenNode.y), -givenNode.angle);
            rightUpPoint = this.rotateOnePoint(rightUpPoint, cc.v2(givenNode.x, givenNode.y), -givenNode.angle);
            leftDownPoint = this.rotateOnePoint(leftDownPoint, cc.v2(givenNode.x, givenNode.y), -givenNode.angle);
            rightDownPoint = this.rotateOnePoint(rightDownPoint, cc.v2(givenNode.x, givenNode.y), -givenNode.angle);
        }

        var minX = leftUpPoint.x;
        var maxX = rightDownPoint.x;
        var minY = leftDownPoint.y;
        var maxY = rightUpPoint.y;
        var arry = [leftUpPoint, leftDownPoint, rightUpPoint, rightDownPoint];
        for (var index in arry) {
            var point = arry[index];
            if (minX > point.x) {
                minX = point.x;
            }
            if (maxX < point.x) {
                maxX = point.x;
            }
            if (minY > point.y) {
                minY = point.y;
            }
            if (maxY < point.y) {
                maxY = point.y;
            }
        }

        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY
        };
    },
    getDisToSelfBorder: function getDisToSelfBorder(givenNode, direction) {
        var ray = this.makeRay(cc.v2(givenNode.x, givenNode.y), 1000, direction);
        var borderLines = this.getLinesOfOneNode(givenNode);

        for (var key in borderLines) {
            var line = borderLines[key];
            var dis = this.rayTest(ray, line);

            if (dis != false) {
                return dis;
            }
        }
    },
    getPointsOfOneNode: function getPointsOfOneNode(givenNode) {
        var leftUpPoint = cc.v2(givenNode.x - givenNode.width / 2, givenNode.y + givenNode.height / 2);
        var rightUpPoint = cc.v2(givenNode.x + givenNode.width / 2, leftUpPoint.y);
        var leftDownPoint = cc.v2(leftUpPoint.x, givenNode.y - givenNode.height / 2);
        var rightDownPoint = cc.v2(rightUpPoint.x, leftDownPoint.y);

        if (givenNode.angle != null && givenNode.angle != undefined) {
            leftUpPoint = this.rotateOnePoint(leftUpPoint, cc.v2(givenNode.x, givenNode.y), -givenNode.angle);
            rightUpPoint = this.rotateOnePoint(rightUpPoint, cc.v2(givenNode.x, givenNode.y), -givenNode.angle);
            leftDownPoint = this.rotateOnePoint(leftDownPoint, cc.v2(givenNode.x, givenNode.y), -givenNode.angle);
            rightDownPoint = this.rotateOnePoint(rightDownPoint, cc.v2(givenNode.x, givenNode.y), -givenNode.angle);
        }
        return {
            leftUpPoint: leftUpPoint,
            leftDownPoint: leftDownPoint,
            rightUpPoint: rightUpPoint,
            rightDownPoint: rightDownPoint
        };
    },
    isOneNodeWillCollidWithOneLineInDirection: function isOneNodeWillCollidWithOneLineInDirection(givenNode, givenLine, givenDirection) {
        var nodePoints = this.getPointsOfOneNode(givenNode);
        var rays = [];
        for (var key in nodePoints) {
            var onePoint = nodePoints[key];
            var ray = this.makeRay(onePoint, 3000, givenDirection);
            rays.push(ray);
        }

        var minX = null;
        var minY = null;
        var maxX = null;
        var maxY = null;

        for (var index in rays) {

            var oneRay = rays[index];
            var minerX = oneRay.p1.x;
            var maxerX = oneRay.p2.x;
            if (minerX > oneRay.p2.x) {
                minerX = oneRay.p2.x;
                maxerX = oneRay.p1.x;
            }

            var minerY = oneRay.p1.y;
            var maxerY = oneRay.p2.y;
            if (minerY > oneRay.p2.y) {
                minerY = oneRay.p2.y;
                maxerY = oneRay.p1.y;
            }

            if (minX == null) {
                minX = minerX;
                maxX = maxerX;
            } else {
                if (minX > minerX) {
                    minX = minerX;
                }
                if (maxX < maxerX) {
                    maxX = maxerX;
                }
            }

            if (minY == null) {
                minY = minerY;
                maxY = maxerY;
            } else {
                if (minY > minerY) {
                    minY = minerY;
                }
                if (maxY < maxerY) {
                    maxY = maxerY;
                }
            }
        }

        var lineMinx = givenLine.p1.x;
        var lineMaxX = givenLine.p2.x;
        var lineMinY = givenLine.p1.y;
        var lineMaxY = givenLine.p2.y;

        if (lineMinx > givenLine.p2.x) {
            lineMinx = givenLine.p2.x;
            lineMaxX = givenLine.p1.x;
        }

        if (lineMinY > givenLine.p2.y) {
            lineMinY = givenLine.p2.y;
            lineMaxY = givenLine.p1.y;
        }

        if (minY >= lineMaxY || maxY <= lineMinY || minX >= lineMaxX || maxX <= lineMinx) {
            return false;
        }

        var lineDirection = cc.v2(givenLine.p2.x - givenLine.p1.x, givenLine.p2.y - givenLine.p1.y);
        lineDirection.normalizeSelf();

        var lenthenLineP2 = this.makeRay(givenLine.p2, 3000, lineDirection).p2;
        var lenthenLineP1 = this.makeRay(givenLine.p1, 3000, cc.v2(-lineDirection.x, -lineDirection.y)).p2;
        var lenthenLine = {
            p1: lenthenLineP1,
            p2: lenthenLineP2
        };

        var testRay = this.makeRay(cc.v2(givenNode.x, givenNode.y), 3000, givenDirection);
        var dis = this.rayTest(testRay, lenthenLine);

        if (dis != false) {
            return dis;
        } else {
            return false;
        }
    }
});

module.exports = Helper;

cc._RF.pop();