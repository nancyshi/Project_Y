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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        bullets: [],
        minDis: 100,
        maxOffsetDegree: 30,
        directionTryto: null,
        flag: false,

        walls: []
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.on("touchstart",this.onTouchStart,this)
        this.node.on("touchmove",this.onTouchMove,this)
        this.node.on("touchend",this.onTouchEnd,this)

        var bulletsNode = cc.find("Canvas/bullets")
        this.bullets = bulletsNode.children

        var wallsNode = cc.find("Canvas/walls")
        this.walls = wallsNode.children
    },

    // update (dt) {},

    onTouchStart(event){
        this.directionTryto = null
        this.flag = true
    },
    onTouchMove(event) {
        if (this.flag == false) {
            return
        }
        var delta = event.getDelta()
        var direction = this.getPossiableDirection(delta)

        if (direction == -1) {
            this.flag = false
            return
        }
        if (this.directionTryto == null) {
            this.directionTryto = direction
        }
        if (direction != this.directionTryto) {
            this.flag = false
            return
        }

        var startLocation = event.getStartLocation()
        var disFromStart = cc.v2(event.getLocationX() - startLocation.x, event.getLocationY() - startLocation.y).mag()
        if (disFromStart >= this.minDis) {
            //valid move
            this.flag = false
            for (var index in this.bullets) {
                var bullet = this.bullets[index]
                var mgr = bullet.getComponent("bulletMgr")
                mgr.move(this.directionTryto)
            }
        }
    },
    onTouchEnd(event) {

    },

    onDestroy() {
        this.node.off("touchstart",this.onTouchStart,this)
        this.node.off("touchmove",this.onTouchMove,this)
        this.node.off("touchend",this.onTouchEnd,this)
    },

    getPossiableDirection(delta) {
        if (this.isPossiableWithGivenDirection(delta,cc.v2(1,0)) == true) {
            return 1 //right
        }
        else if (this.isPossiableWithGivenDirection(delta,cc.v2(0,-1)) == true) {
            return 2 //down
        }
        else if (this.isPossiableWithGivenDirection(delta,cc.v2(-1,0)) == true) {
            return 3 //left
        }
        else if (this.isPossiableWithGivenDirection(delta,cc.v2(0,1)) == true) {
            return 0 //up
        }
        else {
            return -1 //no direction match
        }
    },
    
    isPossiableWithGivenDirection(delta,givenDirection) {
        var angle = delta.signAngle(givenDirection)
        var degree = angle / Math.PI * 180
        if (Math.abs(degree) <= this.maxOffsetDegree) {
            return true
        }
        else {
            return false
        }
    },

    getWallLine(givenWallNode) {

        var offset = givenWallNode.height / 2
        var p1 = cc.v2(givenWallNode.x - givenWallNode.width/2, givenWallNode.y - offset)
        var p2 = cc.v2(givenWallNode.x + givenWallNode.width/2, givenWallNode.y - offset)
        var p3 = cc.v2(p1.x, p1.y + givenWallNode.height)
        var p4 = cc.v2(p2.x, p2.y + givenWallNode.height)
        var Helper = require("helper")
        var helper = new Helper()
        var line1 = helper.rotateSegment(p1,p2,givenWallNode.position,-givenWallNode.angle)
        var line2 = helper.rotateSegment(p3,p4,givenWallNode.position,-givenWallNode.angle)
        var obj = {
            line1: line1,
            line2: line2
        }
        return obj
    },

    getBulletLine(givenBulletNode,givenDirection) {
        var resultLine = {
            p1: null,
            p2: null
        }
        switch(givenDirection) {
            case 0:
                resultLine.p1 = cc.v2(givenBulletNode.x - givenBulletNode.width / 2, givenBulletNode.y + givenBulletNode.height / 2)
                resultLine.p2 = cc.v2(givenBulletNode.x + givenBulletNode.width / 2, givenBulletNode.y + givenBulletNode.height / 2)
                break
            case 1:
                resultLine.p1 = cc.v2(givenBulletNode.x + givenBulletNode.width / 2, givenBulletNode.y + givenBulletNode.height / 2)
                resultLine.p2 = cc.v2(resultLine.p1.x, givenBulletNode.y - givenBulletNode.height / 2)
                break
            case 2:
                resultLine.p1 = cc.v2(givenBulletNode.x - givenBulletNode.width / 2, givenBulletNode.y - givenBulletNode.height / 2)
                resultLine.p2 = cc.v2(givenBulletNode.x + givenBulletNode.height / 2, resultLine.p1.y)
                break
            case 3:
                resultLine.p1 = cc.v2(givenBulletNode.x - givenBulletNode.width / 2, givenBulletNode.y + givenBulletNode.height / 2)
                resultLine.p2 = cc.v2(resultLine.p1.x, givenBulletNode.y - givenBulletNode.height / 2)
                break
        }

        if (resultLine.p1 == null || resultLine.p2 == null) {
            cc.error("NOT INVALID DIRECTION OF " + givenDirection)
            return false
        }

        return resultLine
    }
    
});

