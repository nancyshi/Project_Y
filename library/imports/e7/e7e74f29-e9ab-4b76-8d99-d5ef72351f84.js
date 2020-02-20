"use strict";
cc._RF.push(module, 'e7e748p6atLdo2Z1e9yNR+E', 'levelMgr');
// scripts/levelMgr.js

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
            get: function get() {
                return this._targetsNum;
            },
            set: function set(value) {
                this._targetsNum = value;
                if (value == 0) {
                    this.onSuccess();
                }
            }
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var Helper = require("helper");
        this.helper = new Helper();
    },
    start: function start() {
        this.node.on("touchstart", this.onTouchStart, this);
        this.node.on("touchmove", this.onTouchMove, this);
        this.node.on("touchend", this.onTouchEnd, this);

        var bulletsNode = cc.find("Canvas/bullets");
        this.bullets = bulletsNode.children;

        var wallsNode = cc.find("Canvas/walls");
        this.walls = wallsNode.children;
        this.targetsNum = cc.find("Canvas/targets").children.length;

        var graphic = cc.find("Canvas/fillNodes").getComponent(cc.Graphics);
        var startPoint = null;
        var pointNodes = cc.find("Canvas/fillNodes").children;
        if (pointNodes.length == 0) {
            return;
        }
        for (var index in pointNodes) {
            var point = pointNodes[index];
            if (startPoint == null) {
                graphic.moveTo(point.x, point.y);
                startPoint = point;
            }

            graphic.lineTo(point.x, point.y);
        }
        graphic.close();
        graphic.stroke();
        graphic.fill();
    },


    // update (dt) {},

    onTouchStart: function onTouchStart(event) {
        this.directionTryto = null;
        this.flag = true;
    },
    onTouchMove: function onTouchMove(event) {
        if (this.flag == false) {
            return;
        }
        var delta = event.getDelta();
        var direction = this.getPossiableDirection(delta);

        if (direction == -1) {
            this.flag = false;
            return;
        }
        if (this.directionTryto == null) {
            this.directionTryto = direction;
        }
        if (direction.equals(this.directionTryto) == false) {
            this.flag = false;
            return;
        }

        var startLocation = event.getStartLocation();
        var disFromStart = cc.v2(event.getLocationX() - startLocation.x, event.getLocationY() - startLocation.y).mag();
        if (disFromStart >= this.minDis) {
            //valid move
            this.flag = false;
            this.moveBullets(this.directionTryto);
        }
    },
    onTouchEnd: function onTouchEnd(event) {},
    onDestroy: function onDestroy() {
        this.node.off("touchstart", this.onTouchStart, this);
        this.node.off("touchmove", this.onTouchMove, this);
        this.node.off("touchend", this.onTouchEnd, this);
    },
    getPossiableDirection: function getPossiableDirection(delta) {
        if (this.isPossiableWithGivenDirection(delta, cc.v2(1, 0)) == true) {
            return cc.v2(1, 0); //right
        } else if (this.isPossiableWithGivenDirection(delta, cc.v2(0, -1)) == true) {
            return cc.v2(0, -1); //down
        } else if (this.isPossiableWithGivenDirection(delta, cc.v2(-1, 0)) == true) {
            return cc.v2(-1, 0); //left
        } else if (this.isPossiableWithGivenDirection(delta, cc.v2(0, 1)) == true) {
            return cc.v2(0, 1); //up
        } else {
                return -1; //no direction match
            }
    },
    isPossiableWithGivenDirection: function isPossiableWithGivenDirection(delta, givenDirection) {
        var angle = delta.signAngle(givenDirection);
        var degree = angle / Math.PI * 180;
        if (Math.abs(degree) <= this.maxOffsetDegree) {
            return true;
        } else {
            return false;
        }
    },
    moveBullets: function moveBullets(direction) {
        for (var index in this.bullets) {
            if (this.bullets[index].getComponent("bulletMgr").status != 0) {
                return;
            }
        }
        var shadows = [];
        for (var index in this.bullets) {
            var bullet = this.bullets[index];
            var bulletMgr = bullet.getComponent("bulletMgr");
            var nearestWallInfo = bulletMgr.getNearestWallInfo(direction);
            var shadowNode = {
                x: nearestWallInfo.suitablePosition.x,
                y: nearestWallInfo.suitablePosition.y,
                width: bullet.width,
                height: bullet.height,
                dis: nearestWallInfo.dis,
                originNode: bullet
            };
            shadows.push(shadowNode);
        }

        //resolve shadows

        while (this.resolveShadows(shadows, direction) == false) {}

        for (var index in shadows) {
            var shadowNode = shadows[index];
            var originNode = shadowNode.originNode;
            originNode.getComponent("bulletMgr").targetPosition = cc.v2(shadowNode.x, shadowNode.y);
            originNode.getComponent("bulletMgr").movingDirection = direction;
            originNode.getComponent("bulletMgr").status = 1;
        }
    },
    onSuccess: function onSuccess() {
        cc.log("YOU WIN");
    },
    resolveShadows: function resolveShadows(shadows, direction) {
        for (var index in shadows) {
            var oneShadow = shadows[index];
            for (var i in shadows) {
                var anotherShadow = shadows[i];
                if (oneShadow == anotherShadow) {
                    continue;
                }

                var testResult = this._selectStaticShadowAndShaodwForResolved(oneShadow, anotherShadow, direction);
                if (testResult != false) {
                    var staticShadow = testResult.staticShadow;
                    var tempShadow = testResult.shadowForResolved;

                    var staticBorderLines = this.helper.getLinesOfOneNode(staticShadow);
                    var staticLine = null;
                    var ray = this.helper.makeRay(cc.v2(staticShadow.x, staticShadow.y), 1000, cc.v2(-direction.x, -direction.y));

                    for (var k in staticBorderLines) {
                        var line = staticBorderLines[k];
                        var dis = this.helper.rayTest(ray, line);
                        if (dis != false) {
                            staticLine = line;
                            break;
                        }
                    }
                    var newPoint2 = this.helper.makeRay(staticLine.p2, 1000, cc.v2(staticLine.p2.x - staticLine.p1.x, staticLine.p2.y - staticLine.p1.y)).p2;
                    var newPoint1 = this.helper.makeRay(staticLine.p1, 1000, cc.v2(staticLine.p1.x - staticLine.p2.x, staticLine.p1.y - staticLine.p2.y)).p2;
                    staticLine = {
                        p1: newPoint1,
                        p2: newPoint2
                    };
                    var ray1 = this.helper.makeRay(tempShadow.originNode.position, 3000, direction);
                    var currentDistance = this.helper.rayTest(ray1, staticLine);
                    var targetDis = this.helper.getDisToSelfBorder(tempShadow.originNode, direction) + tempShadow.originNode.getComponent("bulletMgr").disFromBorder;
                    var suitablePosition = this.helper.getSuitablePoint(tempShadow.originNode.position, currentDistance, targetDis, direction);
                    var updatedDis = cc.v2(suitablePosition.x - tempShadow.originNode.x, suitablePosition.y - tempShadow.originNode.y).mag();
                    tempShadow.x = suitablePosition.x;
                    tempShadow.y = suitablePosition.y;
                    tempShadow.dis = updatedDis;
                    return false;
                }
            }
        }
        return true;
    },
    _selectStaticShadowAndShaodwForResolved: function _selectStaticShadowAndShaodwForResolved(shadow1, shadow2, direction) {
        var temp = function temp(s1, s2, d, target, givenType) {
            var points = target.helper.getPointsOfOneNode(s1.originNode);
            points["origin"] = cc.v2(s1.originNode.x, s1.originNode.y);
            for (var index in points) {
                var ray = target.helper.makeRay(points[index], s1.dis, d);
                var lines = null;
                if (givenType == 1) {
                    lines = target.helper.getLinesOfOneNode(s2.originNode);
                }
                if (givenType == 2) {
                    lines = target.helper.getLinesOfOneNode(s2);
                }
                for (var key in lines) {
                    var line = lines[key];
                    var result = target.helper.rayTest(ray, line);
                    if (result != false) {

                        return true;
                    }
                }
            }
            return false;
        };

        if (temp(shadow1, shadow2, direction, this, 1) == true && temp(shadow1, shadow2, direction, this, 2) == true) {
            return {
                staticShadow: shadow2,
                shadowForResolved: shadow1
            };
        }

        if (temp(shadow2, shadow1, direction, this, 1) == true && temp(shadow2, shadow1, direction, this, 2) == true) {
            return {
                staticShadow: shadow1,
                shadowForResolved: shadow2
            };
        }

        return false;
    }
});

cc._RF.pop();