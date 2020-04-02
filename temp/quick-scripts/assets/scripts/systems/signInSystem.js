(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/systems/signInSystem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3671aL3S0lCFL5r4m+FxG83', 'signInSystem', __filename);
// scripts/systems/signInSystem.js

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

var SignInSystem = cc.Class({
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
        physicalPowerAddNum: 10,
        heartAddNum: 20,
        addRateForAd: 2
    },

    start: function start() {},
    show: function show() {
        if (this.ui == null) {
            var status = require("dataMgr").playerData.signInStatus;
            this.setupUiByStatus(status);
        }
        var others = this.ui.getChildByName("others");
        others.scale = 0;
        if (this.ui.parent == null) {
            var currentScene = cc.director.getScene();
            var Canvas = currentScene.getChildByName("Canvas");
            Canvas.addChild(this.ui);
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
    onVideoAdEnd: function onVideoAdEnd() {
        if (signInStatus == 1) {
            this.signIn(2);
        } else if (signInStatus == 2) {
            this.signIn(3);
        }
    },
    onVideoAdNotEnd: function onVideoAdNotEnd() {
        var notiSys = require("notificationMgr");
        var notiStr = "看完广告视频才能获得奖励哦";
        notiSys.showNoti(notiStr);
    },
    onVideoAdShowError: function onVideoAdShowError(err) {
        console.log("wow, there are some problems for ad system");
        console.log(err);
        var notiSys = require("notificationMgr");
        var notiStr = "广告系统貌似有点问题，请稍后再试";
        notiSys.showNoti(notiStr);
    },
    onTimerReach: function onTimerReach() {
        var self = this;
        var networkMgr = require("networkMgr");
        var msgObj = networkMgr.makeMessageObj("signInModule", "refreshMessageType");
        msgObj.message.playerId = require("dataMgr").playerData.id;
        msgObj.successCallBack = function (xhr) {
            var response = xhr.responseText;
            response = JSON.parse(response);

            if (response.type == "success") {
                var signInRefreshDelta = response.signInRefreshDelta;
                require("dataMgr").playerData.signInRefreshDelta = signInRefreshDelta;
                require("timerSystemsMgr").signInSysTimer = signInRefreshDelta;
                require("dataMgr").playerData.signInStatus = 1;
                self.setupUiByStatus(1);
            }
        };

        networkMgr.sendMessageByMsgObj(msgObj);
    },
    signIn: function signIn(signInType) {
        var networkMgr = require("networkMgr");
        var msgObj = networkMgr.makeMessageObj("signInModule", "signInMessageType");
        msgObj.message.signInType = signInType;
        msgObj.message.playerId = require("dataMgr").playerData.id;
        var self = this;
        msgObj.successCallBack = function (xhr) {
            var response = xhr.responseText;
            response = JSON.parse(response);

            if (response.type == "success") {
                var physicalPower = response.physicalPower;
                var heart = response.heart;
                self.onSignInSuccess(signInType, physicalPower, heart);
            }
        };

        networkMgr.sendMessageByMsgObj(msgObj);
    },
    onSignInSuccess: function onSignInSuccess(signInType, physicalPower, heart) {
        //signintype: 
        //1 = normal
        //2 = ad
        //3 = just ad
        if (signInType == 1) {
            require("dataMgr").playerData.signInStatus = 2;
            this.setupUiByStatus(2);
        } else if (signInType == 2 || signInType == 3) {
            require("dataMgr").playerData.signInStatus = 3;
            this.setupUiByStatus(3);
        }

        require("dataMgr").playerData.physicalPower = physicalPower;
        require("dataMgr").playerData.heart = heart;
        var currentScene = cc.director.getScene();
        if (currentScene.name == "mainScene") {
            currentScene.getChildByName("Canvas").getComponent("mainSceneMgr").physicalPower = physicalPower;
            currentScene.getChildByName("Canvas").getComponent("mainSceneMgr").heart = heart;
        } else if (currentScene.name.indexOf("level") > -1) {
            currentScene.getChildByName("Canvas").getComponent("levelMgr").heart = heart;
        }
    },
    setupUiByStatus: function setupUiByStatus(signInStatus) {
        //1 is not sign
        //2 is common sign
        //3 is ad sign

        if (this.ui == null) {
            var resMgr = require("resMgr");
            this.ui = cc.instantiate(resMgr.reses.ensureSysPrefab);
        }
        var ensureNodeMgr = this.ui.getComponent("ensureSystemNodeMgr");
        ensureNodeMgr.canClose = false;
        ensureNodeMgr.ensureButtonWillAutoCloseUi = false;
        ensureNodeMgr.cancelButtonWillAutoCloseUi = false;

        if (signInStatus == 1) {
            var desStr = "每日签到可以获得体力 * " + this.physicalPowerAddNum + ", 金币 * " + this.heartAddNum + ", ";
            desStr = desStr + "您是否愿意观看视频广告，获得双倍奖励？";
            ensureNodeMgr.desText = desStr;
            var self = this;
            ensureNodeMgr.onCancleButtonClick = function () {
                self.close();
                self.signIn(1);
            };
            ensureNodeMgr.onEnsureButtonClick = function () {
                var advMgr = require("advertisMgr");
                advMgr.delegate = self;
                advMgr.showVideoAd();
            };
        } else if (signInStatus == 2) {
            var desStr = "您还可以观看视频广告获取体力 * " + (this.addRateForAd * this.physicalPowerAddNum).toString();
            desStr = desStr + ", ";
            desStr = desStr + "金币 * " + (this.addRateForAd * this.heartAddNum).toString();
            desStr = desStr + "， 是否观看？";
            ensureNodeMgr.desText = desStr;
            var self = this;

            ensureNodeMgr.onEnsureButtonClick = function () {
                var advMgr = require("advertisMgr");
                advMgr.delegate = self;
                advMgr.showVideoAd();
            };
            ensureNodeMgr.onCancleButtonClick = function () {
                self.close();
            };
        } else if (signInStatus == 3) {
            var desStr = "您今天已经签到过啦，明天再来吧~";
            ensureNodeMgr.desText = desStr;
            ensureNodeMgr.isExsistCancelButton = false;
            var self = this;
            ensureNodeMgr.onEnsureButtonClick = function () {
                self.close();
            };
        }
    }

    // update (dt) {},

});

var sharedSignSystem = new SignInSystem();
module.exports = sharedSignSystem;

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
        //# sourceMappingURL=signInSystem.js.map
        