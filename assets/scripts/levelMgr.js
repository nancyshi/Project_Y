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
        helper: null,

        walls: [],
        targetsNum: {
            get() {
                return this._targetsNum
            },
            set(value) {
                this._targetsNum = value
                if (value == 0) {
                    this.onSuccess()
                }
            }
        }
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var Helper = require("helper")
        this.helper = new Helper()
    },

    start () {
        this.node.on("touchstart",this.onTouchStart,this)
        this.node.on("touchmove",this.onTouchMove,this)
        this.node.on("touchend",this.onTouchEnd,this)

        var bulletsNode = cc.find("Canvas/bullets")
        this.bullets = bulletsNode.children

        var wallsNode = cc.find("Canvas/walls")
        this.walls = wallsNode.children
        this.targetsNum = cc.find("Canvas/targets").children.length
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
            this.moveBullets(this.directionTryto)
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
            return cc.v2(1,0) //right
        }
        else if (this.isPossiableWithGivenDirection(delta,cc.v2(0,-1)) == true) {
            return cc.v2(0,-1) //down
        }
        else if (this.isPossiableWithGivenDirection(delta,cc.v2(-1,0)) == true) {
            return cc.v2(-1,0) //left
        }
        else if (this.isPossiableWithGivenDirection(delta,cc.v2(0,1)) == true) {
            return cc.v2(0,1) //up
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
    
    moveBullets(direction) {
        var shadows = []
        for (var index in this.bullets) {
            var bullet = this.bullets[index]
            var bulletMgr = bullet.getComponent("bulletMgr")
            var nearestWallInfo = bulletMgr.getNearestWallInfo()
            var shadowNode = {
                x: nearestWallInfo.suitablePosition.x,
                y: nearestWallInfo.suitablePosition.y,
                width: bullet.width,
                height: bullet.height,
                dis: nearestWallInfo.dis,
                originNode: bullet
            }

            shadows.push(shadowNode)
        }


    },

    onSuccess() {
        cc.log("YOU WIN")
    }
    
});

