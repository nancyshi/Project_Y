// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        bulletType: 1, //1 is normal , 2 is slider bullet
        status: 0, //0 is static, 1 is moving , 2 is reached target
        disFromBorder: 10,
        moveSpeed: 500,
        movingDirection: null,

        levelMgr: null,
        helper: null,

        _rayTestLength: 3000,
        faultTolerance: 0.01
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.levelMgr = cc.find("Canvas").getComponent("levelMgr")
        var Helper = require("helper")
        this.helper = new Helper()
    },

    start () {

    },
    move(direction) {

    },
    checkWhetherCanMove(direction) {

    },
    update (dt) {
        this.moveUpdate(dt)
    },

    moveUpdate(dt) {

    },
    getNearestWallInfo(givenDirection) {
        var result = null
        var ray = this.helper.makeRay(cc.v2(this.node.x,this.node.y),this._rayTestLength,givenDirection)
        var walls = this.levelMgr.walls
        var disToSelfBounder = null
        var selfBounderLindes = this.helper.getLinesOfOneNode(this.node)
        for (var key in selfBounderLindes) {
            var line = selfBounderLindes[key]
            var dis = this.helper.rayTest(ray,line)
            if (dis != false) {
                disToSelfBounder = dis
                break
            }
        }
        for(var index in walls) {
            var wallNode = walls[index]
            var bounderLines = this.helper.getLinesOfOneNode(wallNode)
            for (var key in bounderLines) {
                var line = bounderLines[key]
                var dis = this.helper.rayTest(ray,line)
                if (dis == false) {
                    continue
                }
                if (result == null || dis < result.dis) {
                    var targetDis = this.disFromBorder + disToSelfBounder
                    var suitablePosition = this.helper.getSuitablePoint(cc.v2(this.node.x,this.node.y),dis,targetDis,givenDirection)
                    result = {
                        dis: dis,
                        suitablePosition: suitablePosition
                    }
                }
            }
        }

        return result
    }
 
});
