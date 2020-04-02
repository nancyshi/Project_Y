"use strict";
cc._RF.push(module, '12994CS+PNBD6kKBL4TD7Zx', 'welfarySys');
// scripts/systems/welfarySys.js

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

var WelfarySys = cc.Class({
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
        ui: null,
        enterButtonNode: null,
        animated: false
    },

    // LIFE-CYCLE CALLBACKS:


    start: function start() {},


    // update (dt) {},
    show: function show() {
        if (this.ui == null) {
            this.setupUi();
        }
        var others = this.ui.getChildByName("others");
        others.scale = 0;
        if (this.ui.parent == null) {
            var currentScene = cc.director.getScene();
            currentScene.getChildByName("Canvas").addChild(this.ui);
        } else {
            this.ui.active = true;
        }
        cc.tween(others).to(0.3, { scale: 1 }).start();
    },
    close: function close() {
        var others = this.ui.getChildByName("others");
        var self = this;
        cc.tween(others).to(0.3, { scale: 0 }).call(function () {
            self.ui.active = false;
        }).start();
    },
    setupUi: function setupUi() {
        if (this.ui == null) {
            this.ui = require("ensureSystem").create();
        }
        var ensureNodeMgr = this.ui.getComponent("ensureSystemNodeMgr");
        ensureNodeMgr.canClose = false;
        ensureNodeMgr.ensureButtonWillAutoCloseUi = false;
        ensureNodeMgr.cancelButtonWillAutoCloseUi = false;

        var flag = require("dataMgr").playerData.initAdWatchedFlag;
        if (this.enterButtonNode != null) {
            if (flag == 1) {
                this.enterButtonNode.active = false;
            } else if (flag == 0) {
                this.enterButtonNode.active = true;
            }
        }
        var self = this;
        if (flag == 0) {
            var desStr = "观看视频广告，挑战关卡消耗体力永久免费！您是否愿意观看？";
            ensureNodeMgr.desText = desStr;
            ensureNodeMgr.onCancleButtonClick = function () {
                self.close();
            };
            ensureNodeMgr.onEnsureButtonClick = function () {
                var advMgr = require("advertisMgr");
                advMgr.delegate = self;
                advMgr.showVideoAd();
            };
        } else if (flag == 1) {
            var desStr = "嗯？ 这个界面不应该出现的，你已经领取过福利啦~";
            ensureNodeMgr.desText = desStr;
            ensureNodeMgr.isExsistCancelButton = false;
            ensureNodeMgr.onEnsureButtonClick = function () {
                self.close();
            };
        }
    },


    //advertis mgr protocals
    onVideoAdEnd: function onVideoAdEnd() {
        var commitBody = {
            initAdWatchedFlag: 1
        };
        var self = this;
        var successCallBack = function successCallBack() {
            require("dataMgr").playerData.initAdWatchedFlag = 1;
            self.setupUi();
            self.close();
        };
        require("dataMgr").commitPlayerDataToServer(commitBody, successCallBack);
    },
    onVideoAdShowError: function onVideoAdShowError() {
        var notificationSys = require("notificationMgr");
        notificationSys.showNoti("好像有点问题~");
    }
});

var sharedWelfarySys = new WelfarySys();
module.exports = sharedWelfarySys;

cc._RF.pop();