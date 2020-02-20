(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/bulletMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2e7ebmG0o9A+INmyGAQ4snA', 'bulletMgr', __filename);
// scripts/bulletMgr.js

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

        bulletType: 1, //1 is normal , 2 is slider bullet
        status: 0, //0 is static, 1 is moving , 2 is reached target
        disFromBorder: 10,
        moveSpeed: 500,
        movingDirection: null,
        targetPosition: null,

        levelMgr: null,
        helper: null,

        _rayTestLength: 3000,
        pathWaysNode: cc.Node,
        pathWaysHeight: 10,
        sliderFrame: cc.SpriteFrame
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.levelMgr = cc.find("Canvas").getComponent("levelMgr");
        var Helper = require("helper");
        this.helper = new Helper();
    },
    start: function start() {
        if (this.bulletType == 2) {
            this.node.getComponent(cc.Sprite).spriteFrame = this.sliderFrame;
        }
    },
    move: function move(direction) {},
    checkWhetherCanMove: function checkWhetherCanMove(direction) {},
    update: function update(dt) {
        this.moveUpdate(dt);
    },
    moveUpdate: function moveUpdate(dt) {
        if (this.status != 1) {
            return;
        }

        this.movingDirection.normalizeSelf();
        var vx = this.moveSpeed * this.movingDirection.x;
        var vy = this.moveSpeed * this.movingDirection.y;

        var tempX = this.node.x + vx * dt;
        var tempY = this.node.y + vy * dt;
        if (cc.v2(tempX - this.node.x, tempY - this.node.y).mag() >= cc.v2(this.targetPosition.x - this.node.x, this.targetPosition.y - this.node.y).mag()) {
            tempX = this.targetPosition.x;
            tempY = this.targetPosition.y;

            this.node.x = tempX;
            this.node.y = tempY;
            this.status = 0;
            return;
        }

        this.node.x = tempX;
        this.node.y = tempY;
    },
    getNearestWallInfo: function getNearestWallInfo(givenDirection) {
        if (this.bulletType == 1) {
            //normal bullet
            var result = null;
            var ray = this.helper.makeRay(cc.v2(this.node.x, this.node.y), this._rayTestLength, givenDirection);
            var walls = this.levelMgr.walls;
            var disToSelfBounder = null;
            var selfBounderLindes = this.helper.getLinesOfOneNode(this.node);
            for (var key in selfBounderLindes) {
                var line = selfBounderLindes[key];
                var dis = this.helper.rayTest(ray, line);
                if (dis != false) {
                    disToSelfBounder = dis;
                    break;
                }
            }
            for (var index in walls) {
                var wallNode = walls[index];
                var bounderLines = this.helper.getLinesOfOneNode(wallNode);
                for (var key in bounderLines) {
                    var line = bounderLines[key];
                    var dis = this.helper.rayTest(ray, line);
                    if (dis == false) {
                        continue;
                    }
                    if (result == null || dis < result.dis) {
                        var targetDis = this.disFromBorder + disToSelfBounder;
                        var suitablePosition = this.helper.getSuitablePoint(cc.v2(this.node.x, this.node.y), dis, targetDis, givenDirection);
                        result = {
                            dis: dis,
                            suitablePosition: suitablePosition
                        };
                    }
                }
            }
            return result;
        }

        if (this.bulletType == 2) {
            if (this.pathWaysNode == null || this.pathWaysNode.children.length == 0) {
                return {
                    dis: 0,
                    suitablePosition: this.node.position
                };
            }
            var selectedPathNode = null;
            for (var index in this.pathWaysNode.children) {
                var onePath = this.pathWaysNode.children[index];
                if (this.helper.isTwoNodeCross(this.node, onePath) == false) {
                    continue;
                }

                if (selectedPathNode == null || this.getMaxDisFromPathNode(onePath, givenDirection) > this.getMaxDisFromPathNode(selectedPathNode, givenDirection)) {
                    selectedPathNode = onePath;
                }
            }
            var ray = this.helper.makeRay(this.node.position, 3000, givenDirection);
            var currentDis = null;
            var lines = this.helper.getLinesOfOneNode(selectedPathNode);
            for (var key in lines) {
                var line = lines[key];
                var dis = this.helper.rayTest(ray, line);
                if (dis != false) {
                    currentDis = dis;
                    break;
                }
            }

            var suitablePosition = this.helper.getSuitablePoint(this.node.position, currentDis, this.pathWaysHeight / 2, givenDirection);
            var dis = cc.v2(suitablePosition.x - this.node.x, suitablePosition.y - this.node.y).mag();
            return {
                suitablePosition: suitablePosition,
                dis: dis
            };
        }
    },
    getMaxDisFromPathNode: function getMaxDisFromPathNode(givenNode, direction) {
        var ray1 = this.helper.makeRay(this.node.position, 3000, direction);
        var ray2 = this.helper.makeRay(this.node.position, 3000, cc.v2(-direction.x, -direction.y));

        var lines = this.helper.getLinesOfOneNode(givenNode);
        var self = this;
        var getDis = function getDis(ray) {
            for (var key in lines) {
                var line = lines[key];
                var dis = self.helper.rayTest(ray, line);
                if (dis != false) {
                    return dis;
                }
            }
        };

        var dis1 = getDis(ray1);
        var dis2 = getDis(ray2);

        if (dis1 >= dis2) {
            return dis1;
        } else {
            return dis2;
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=bulletMgr.js.map
        