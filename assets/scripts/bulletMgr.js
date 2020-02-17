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
        bulletType: 1, //1 is normal , 2 is slider bullet
        status: 0, //0 is static, 1 is moving , 2 is reached target
        disFromBorder: 10,
        moveSpeed: 500,
        movingDirection: -1,

        levelMgr: null,
        helper: null,

        _rayTestLength: 3000,
        faultTolerance: 0.01
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.levelMgr = cc.find("Canvas").getComponent("levelMgr")
        cc.log(this.levelMgr.walls)
        var Helper = require("helper")
        this.helper = new Helper()
    },

    start () {

    },
    move(direction) {
        if (this.checkWhetherCanMove(direction) == false) {
            return false
        }
        this.status = 1
        this.movingDirection = direction
        return true
    },
    checkWhetherCanMove(direction) {
        if (this.status != 0) {
            return false
        }
        var ray = this.makeRay(cc.v2(this.node.x, this.node.y),this._rayTestLength,direction)
        var collidDis = this.node.width / 2 + this.disFromBorder
        for (var index in this.levelMgr.walls) {
            var wall = this.levelMgr.walls[index]
            var lines = this.levelMgr.getWallLine(wall)
            for (var key in lines) {
                var wallLine = lines[key]
                var dis = this.helper.rayTest(ray,wallLine)
                if (dis != false){
                    var temp = dis - collidDis
                    if (-this.faultTolerance <= temp && temp <= this.faultTolerance) {
                        temp = 0
                    }
                    if (temp <= 0) {
                        return false
                    }
                }  
            }
        }
        var lineDirection = null
        switch(direction) {
            case 0:
                lineDirection = 2
                break
            case 1:
                lineDirection = 3
                break
            case 2:
                lineDirection = 0
                break
            case 3:
                lineDirection = 1
                break
        }
        for(var index in this.levelMgr.bullets) {
            var bullet = this.levelMgr.bullets[index]
            if (bullet == this.node) {
                continue
            }

            var line = this.levelMgr.getBulletLine(bullet,lineDirection)
            var dis = this.helper.rayTest(ray,line)
            if (dis != false) {
                var temp = dis - collidDis
                if (this.faultTolerance <= temp && temp <= this.faultTolerance) {
                    temp = 0
                }
                if (temp <= 0) {
                    if (bullet.getComponent("bulletMgr").status == 0) {
                        if (bullet.getComponent("bulletMgr").move(direction) == false) {
                            return false
                        }
                    }
                }
            }
        }

        return true
    },
    update (dt) {
        this.moveUpdate(dt)
    },

    moveUpdate(dt) {
        if (this.status != 1) {
            return
        }
        var vx = 0
        var vy = 0
        switch(this.movingDirection) {
            case 0:
                vy = this.moveSpeed
                break
            case 1:
                vx = this.moveSpeed
                break
                
            case 2: 
                vy = -this.moveSpeed
                break
            case 3:
                vx = -this.moveSpeed
                break
        }

        var tempX = this.node.x + vx * dt
        var tempY = this.node.y + vy * dt

        var result = this.checkWhetherWillStop(tempX,tempY)
        if (result != false) {
            this.node.x = result.x
            this.node.y = result.y
            this.status = 0
        }
        else {
            this.node.x = tempX
            this.node.y = tempY
        }
        
    },

    checkWhetherWillStop(tempX,tempY) {
        var ray = this.makeRay(cc.v2(tempX,tempY),this._rayTestLength,this.movingDirection)
        var collidDis = this.node.width / 2 + this.disFromBorder
        var movingVector = cc.v2(0,0)
        switch(this.movingDirection) {
            case 0:
                movingVector = cc.v2(0,1)
                break
            case 1:
                movingVector = cc.v2(1,0)
                break
            case 2:
                movingVector = cc.v2(0,-1)
                break
            case 3:
                movingVector = cc.v2(-1,0)
                break
        }
        for (var index in this.levelMgr.walls) {
            var wall = this.levelMgr.walls[index]
            var lines = this.levelMgr.getWallLine(wall)
            for(var key in lines){
                var wallLine = lines[key]

                var dis = this.helper.rayTest(ray,wallLine)
                if (dis != false){
                    var temp = dis - collidDis
                    if (-this.faultTolerance <= temp && temp <= this.faultTolerance) {
                        temp = 0
                    }
                    if (temp <= 0) {
                        var suitablePosition = this.helper.getSuitablePoint(cc.v2(tempX,tempY),dis,collidDis,movingVector)
                        return suitablePosition
                    }

                } 
            }
        }

        var lineDirection = null
        switch(this.movingDirection) {
            case 0:
                lineDirection = 2
                break
            case 1:
                lineDirection = 3
                break
            case 2:
                lineDirection = 0
                break
            case 3:
                lineDirection = 1
                break
        }
        for(var index in this.levelMgr.bullets) {
            var bullet = this.levelMgr.bullets[index]
            if (bullet == this.node) {
                continue
            }

            var line = this.levelMgr.getBulletLine(bullet,lineDirection)
            var dis = this.helper.rayTest(ray,line)
            if (dis != false) {
                var temp = dis - collidDis
                if (-this.faultTolerance <= temp && temp <= this.faultTolerance) {
                    temp = 0
                }
                if (temp <= 0) {
                    
                    if (bullet.getComponent("bulletMgr").status != 1) {
                        var suitablePosition = this.helper.getSuitablePoint(cc.v2(tempX,tempY),dis,collidDis,movingVector)
                        return suitablePosition
                    }
                    else {

                        //simple resolve
                        var dx = tempX - this.node.x
                        var dy = tempY - this.node.y

                        var x = bullet.x + dx
                        var y = bullet.y + dy
                        var result = bullet.getComponent("bulletMgr").checkWhetherWillStop(x,y)
                        if (result != false) {
                            var dir = cc.v2(-dx, -dy).normalizeSelf()
                            var d = this.node.width/2 + bullet.width/2 + this.disFromBorder
                            var returnX = result.x + dir.x * d
                            var returnY = result.y + dir.y * d
                            return cc.v2(returnX,returnY)
                        }
                    }
                }
            }
        }
        return false
    },

    makeRay(p1,dis,direction) {
        var ray = {
            p1: p1,
            p2: null
        }
        switch(direction) {
            case 0:
                ray.p2 = cc.v2(p1.x, p1.y + dis)
                break
            case 1:
                ray.p2 = cc.v2(p1.x + dis, p1.y)
                break
            case 2:
                ray.p2 = cc.v2(p1.x, p1.y - dis)
                break
            case 3:
                ray.p2 = cc.v2(p1.x - dis, p1.y)
                break
        }
        if (ray.p2 == null) {
            cc.error("NOT INVALID DIRECTION OF " + direction)
            return null
        }

        return ray
    },


});
