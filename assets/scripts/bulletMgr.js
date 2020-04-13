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

        bulletType: {
            get() {
                if (this._bulletType == null) {
                    this._bulletType = 1
                }
                return this._bulletType
            },
            set(value) {
                this._bulletType = value
                if (value == 2) {
                    this.node.getComponent(cc.Sprite).spriteFrame = this.sliderFrame
                }
            }
        }, //1 is normal , 2 is slider bullet
        status: 0, //0 is static, 1 is moving , 2 is reached target
        disFromBorder: 5,
        moveSpeed: 500,
        movingDirection: null,
        targetPosition: null,
        movingTime: 0.3,
        vx: null,
        vy: null,

        levelMgr: null,
        helper: null,

        _rayTestLength: 3000,
        pathWaysNode: cc.Node,
        pathWaysHeight: 10,
        sliderFrame: cc.SpriteFrame,
        faltalTorence: 0.01
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.levelMgr = cc.find("Canvas").getComponent("levelMgr")
        var Helper = require("helper")
        this.helper = new Helper()
        // if (this.bulletType == 2) {
        //     this.node.getComponent(cc.Sprite).spriteFrame = this.sliderFrame
        // }
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
        if (this.status != 1) {
            return
        }

        var tempX = this.node.x + this.vx * dt
        var tempY = this.node.y + this.vy * dt
        if (cc.v2(tempX - this.node.x, tempY - this.node.y).mag() >= cc.v2(this.targetPosition.x - this.node.x, this.targetPosition.y - this.node.y).mag()) {
            tempX = this.targetPosition.x
            tempY = this.targetPosition.y

            this.node.x = tempX
            this.node.y = tempY
            this.status = 0
            return
        }

        this.node.x = tempX
        this.node.y = tempY
    },
    getNearestWallInfo(givenDirection) {
        if (this.bulletType == 1) {
            //normal bullet

            var result = null
            var walls = this.levelMgr.walls
            var disToSelfBounder = this.helper.getDisToSelfBorder(this.node,givenDirection)

            for (var index in walls) {
                var wallNode = walls[index]
                var bounderLines = this.helper.getLinesOfOneNode(wallNode)
                for (var key in bounderLines) {
                    var line = bounderLines[key]
                    var dis = this.helper.isOneNodeWillCollidWithOneLineInDirection(this.node,line,givenDirection)
                    if (dis == false) {
                        continue
                    }
                    var targetDis = this.disFromBorder + disToSelfBounder
                    if (result == null || dis < result.dis + targetDis) {
                        var suitablePosition = this.helper.getSuitablePoint(cc.v2(this.node.x, this.node.y),dis,targetDis,givenDirection)
                        var moveDis = cc.v2(suitablePosition.x - this.node.x, suitablePosition.y - this.node.y).mag()
                        result = {
                            dis: moveDis,
                            suitablePosition: suitablePosition
                        }
                    }
                }
            }
            return result
        }
        
        if (this.bulletType == 2) {
            if (this.pathWaysNode == null || this.pathWaysNode.children.length == 0) {
                return {
                    dis: 0,
                    suitablePosition: this.node.position
                }
            }
            var selectedPathNode = null
            for (var index in this.pathWaysNode.children) {
                var onePath = this.pathWaysNode.children[index]
                if (this.helper.isTwoNodeCross(this.node,onePath) == false) {
                    continue
                }

                if (selectedPathNode == null || this._isPathNodeMoveDirection(onePath,givenDirection) == true) {
                    selectedPathNode = onePath
                }
            }
            if (this._isPathNodeMoveDirection(selectedPathNode,givenDirection) == false) {
                return {
                    dis: 0,
                    suitablePosition: this.node.position
                }
            }
            var ray = this.helper.makeRay(this.node.position,3000,givenDirection)
            var currentDis = null
            var lines = this.helper.getLinesOfOneNode(selectedPathNode)
            for (var key in lines) {
                var line = lines[key]
                var dis = this.helper.rayTest(ray,line)
                if (dis.toString() != "false") {
                    if (currentDis == null || dis > currentDis) {
                        currentDis = dis 
                    }
                }
            }

            if (currentDis == null) {
                currentDis = 5
            }
            var suitablePosition = this.helper.getSuitablePoint(this.node.position,currentDis,0,givenDirection)
            var dis = cc.v2(suitablePosition.x - this.node.x, suitablePosition.y - this.node.y).mag()
            return {
                suitablePosition: suitablePosition,
                dis: dis
            }
        }
    },

    getMaxDisFromPathNode(givenNode,direction) {
        var ray1 = this.helper.makeRay(this.node.position,3000,direction)
        var ray2 = this.helper.makeRay(this.node.position,3000,cc.v2(-direction.x, -direction.y))

        var lines = this.helper.getLinesOfOneNode(givenNode)
        var self = this
        var getDis = function(ray) {
            var dis = null
            for (var key in lines) {
                var line = lines[key]
                var dist = self.helper.rayTest(ray,line)
                if (dist != false) {
                    return dist
                }
            }
            
            if (dis == null) {
                dis = 5
            }
            return dis
        }

        var dis1 = getDis(ray1)
        var dis2 = getDis(ray2)
        
        if (dis1 >= dis2) {
            return dis1
        }
        else {
            return dis2
        }
    },

    isPathNodeMoveDirection(givenPathNode, givenDirection) {
        var dis1 = this.getMaxDisFromPathNode(givenPathNode,givenDirection)
        var verticalDirection = givenDirection.rotate(Math.PI/2)
        var dis2 = this.getMaxDisFromPathNode(givenPathNode,verticalDirection)
        if (dis1 > dis2) {
            return true
        }

        return false
    },

    _isPathNodeMoveDirection(givenPathNode,givenDirection) {
        givenDirection.normalizeSelf()
        var angle = -givenPathNode.angle * Math.PI / 180
        var rotatedDirection = cc.v2(1,0).rotate(angle)
        if (givenDirection.fuzzyEquals(rotatedDirection,0.001) == true || givenDirection.fuzzyEquals(cc.v2(-rotatedDirection.x, -rotatedDirection.y),0.001) == true) {
            return true
        }
        else {
            return false
        }

    }
 
});
