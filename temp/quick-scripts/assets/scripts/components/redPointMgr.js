(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/components/redPointMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0e647+txBdKC7R/jhDegLyA', 'redPointMgr', __filename);
// scripts/components/redPointMgr.js

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
        redPointPrefab: cc.Prefab,
        redPoint: null,
        offset: cc.v2(5, 10),
        redPointShowCondition: {
            get: function get() {
                return this._redPointShowCondition;
            },
            set: function set(value) {
                //init setup
                this._redPointShowCondition = value;
                this.setupRedPoint();
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    setupRedPoint: function setupRedPoint() {
        if (this.redPointShowCondition == null || typeof this.redPointShowCondition !== "function") {
            cc.log("no condition of redpoint, or condition is not a function from node " + this.node.name);
            return;
        }

        if (this.redPointShowCondition() == true) {
            this.showRedPoint();
        } else {
            this.hideRedPoint();
        }
    },
    showRedPoint: function showRedPoint() {
        if (this.redPoint == null) {
            var oneRedPoint = cc.instantiate(this.redPointPrefab);
            var getNodeRightHeadPoint = function getNodeRightHeadPoint(givenNode) {
                var x = (1 - givenNode.anchorX) * givenNode.width;
                var y = (1 - givenNode.anchorY) * givenNode.height;
                return cc.v2(x, y);
            };
            var targetX = getNodeRightHeadPoint(this.node).x + this.offset.x;
            var targetY = getNodeRightHeadPoint(this.node).y + this.offset.y;
            oneRedPoint.x = targetX;
            oneRedPoint.y = targetY;
            this.redPoint = oneRedPoint;
            this.node.addChild(oneRedPoint);
        }

        this.redPoint.active = true;
    },
    hideRedPoint: function hideRedPoint() {
        if (this.redPoint == null) {
            var oneRedPoint = cc.instantiate(this.redPointPrefab);
            var getNodeRightHeadPoint = function getNodeRightHeadPoint(givenNode) {
                var x = (1 - givenNode.anchorX) * givenNode.width;
                var y = (1 - givenNode.anchorY) * givenNode.height;
                return cc.v2(x, y);
            };
            var targetX = getNodeRightHeadPoint(this.node).x + this.offset.x;
            var targetY = getNodeRightHeadPoint(this.node).y + this.offset.y;
            oneRedPoint.x = targetX;
            oneRedPoint.y = targetY;
            this.redPoint = oneRedPoint;
            this.node.addChild(oneRedPoint);
        }

        this.redPoint.active = false;
    }

    // update (dt) {},

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
        //# sourceMappingURL=redPointMgr.js.map
        