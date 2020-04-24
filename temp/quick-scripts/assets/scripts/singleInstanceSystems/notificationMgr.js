(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/singleInstanceSystems/notificationMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6adf2lw5wdC6oB912oNiN7C', 'notificationMgr', __filename);
// scripts/singleInstanceSystems/notificationMgr.js

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

var NotificationMgr = cc.Class({
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
        lastTime: 2,
        moveTime: 0.5,
        moveDis: 200,

        noties: []
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    showNoti: function showNoti(str) {
        var notiPrefab = require("resMgr").reses.notiSysPrefab;
        var notiNode = cc.instantiate(notiPrefab);
        var label = notiNode.getChildByName("label");
        label.getComponent(cc.Label).string = str;
        var currentSceneCanvas = cc.director.getScene().getChildByName("Canvas");
        currentSceneCanvas.addChild(notiNode);
        var self = this;
        cc.tween(notiNode).by(self.moveTime, { y: self.moveDis }).delay(self.lastTime - self.moveTime)
        //.to(0.3, {opacity: 0})
        .call(function () {
            notiNode.destroy();
        }).start();
    },
    pushNoti: function pushNoti(str) {
        this.noties.push(str);
    }
    // update (dt) {},

});

var sharedNotificationMgr = new NotificationMgr();
module.exports = sharedNotificationMgr;

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
        //# sourceMappingURL=notificationMgr.js.map
        