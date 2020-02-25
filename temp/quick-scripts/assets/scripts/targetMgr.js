(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/targetMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '25f14lIIdZGX5Bxde5y1xJx', 'targetMgr', __filename);
// scripts/targetMgr.js

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
        fatalTolerance: 0.01,
        bullets: null,
        flag: false,
        helper: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var Helper = require("helper");
        this.helper = new Helper();
    },
    start: function start() {
        this.bullets = cc.find("Canvas").getComponent("levelMgr").bullets;
    },
    update: function update(dt) {
        if (this.flag == true) {
            return;
        }
        for (var index in this.bullets) {
            var bullet = this.bullets[index];
            var bulletMgr = bullet.getComponent("bulletMgr");

            if (bulletMgr.bulletType != 1) {
                continue;
            }
            if (bulletMgr.status != 0) {
                continue;
            }
            if (this.checkWhetherSatisfied(bullet) == true) {
                this.onSatisfy(bullet);
                break;
            }
        }
    },
    checkWhetherSatisfied: function checkWhetherSatisfied(givenBulletNode) {
        var points = this.helper.getPointsOfOneNode(this.node);
        var bulletPoints = this.helper.getPointsOfOneNode(givenBulletNode);

        for (var key in points) {
            var point = points[key];
            var bulletCorrespondPoint = bulletPoints[key];

            var dis = cc.v2(bulletCorrespondPoint.x - point.x, bulletCorrespondPoint.y - point.y).mag();
            if (dis > this.fatalTolerance) {
                return false;
            }
        }

        return true;
    },
    onSatisfy: function onSatisfy(givenBullet) {
        this.flag = true;
        givenBullet.getComponent("bulletMgr").status = 2;
        var self = this;
        cc.tween(givenBullet).to(0.2, { opacity: 0 }).call(function () {
            givenBullet.destroy();
        }).start();
        cc.tween(this.node).to(0.2, { opacity: 0 }).call(function () {
            self.node.destroy();
            cc.find("Canvas").getComponent("levelMgr").targetsNum -= 1;
        }).start();
    },
    onDestroy: function onDestroy() {}
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
        //# sourceMappingURL=targetMgr.js.map
        