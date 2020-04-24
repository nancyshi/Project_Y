(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/loginSceneMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '81fbcyHVFlDhqJvCbUik6hX', 'loginSceneMgr', __filename);
// scripts/loginSceneMgr.js

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
        dataMgr: null,
        loginMgr: null,
        networkMgr: null,
        isLogining: false,
        changeSceneAnimationTime: 2,
        nameEnSpriteFrame: cc.SpriteFrame
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.on("touchstart", this.onTouchStart, this);
        var textConfig = require("textConfig");
        if (textConfig.languageType != 1) {
            this.node.getChildByName("name").getComponent(cc.Sprite).spriteFrame = this.nameEnSpriteFrame;
        }
    },
    start: function start() {
        this.dataMgr = require("dataMgr");
        this.loginMgr = require("loginMgr");
        this.networkMgr = require("networkMgr");
        this.networkMgr.delegate = this;
        var retryNode = cc.find("Canvas/retry");
        cc.tween(retryNode).repeatForever(cc.tween().to(0.5, { scale: 1.2 }).to(0.5, { scale: 0.8 })).start();

        this.login();
        //this._debugLogin()
    },
    onPlayerDataUpdated: function onPlayerDataUpdated() {
        require("advertisMgr").initAds();
        cc.find("Canvas/loginInfo/textNode").getComponent(cc.Label).string = require("textConfig").getTextByIdAndLanguageType(157);
        //animation 
        for (var index in this.node.children) {
            var self = this;

            var temp = function temp(i) {
                var node = self.node.children[i];
                cc.tween(node).to(self.changeSceneAnimationTime, { opacity: 0 }).start();
            };
            temp(index);
        }

        cc.tween(this.node).delay(this.changeSceneAnimationTime).call(function () {
            require("resMgr").loadReses(function () {
                require("networkMgr").startHeartBeat();
                cc.director.loadScene("mainScene");
            });
        }).start();
    },
    login: function login() {
        this.isLogining = true;
        var retryNode = cc.find("Canvas/retry");
        retryNode.active = false;
        cc.find("Canvas/loginInfo/textNode").getComponent(cc.Label).string = require("textConfig").getTextByIdAndLanguageType(156);

        var loginType = null;
        var platform = cc.sys.platform;
        if (platform == cc.sys.WECHAT_GAME) {
            loginType = this.loginMgr.LoginType.WE_CHAT_GAME;
        } else {
            loginType = this.loginMgr.LoginType.DEVICE_ID;
        }

        this.loginMgr.login(loginType);
    },
    onTouchStart: function onTouchStart(event) {
        if (this.isLogining == false) {
            this.login();
        }
    },

    // update (dt) {},

    _debugLogin: function _debugLogin() {
        this.dataMgr.playerData = {
            id: 100000001,
            name: "new Player",
            physicalPower: 10,
            maxPhysicalPower: 10,
            heart: 10,
            maxHeart: 10,
            currentSection: 1,
            currentLevel: 2,
            physicalPowerCostedFlag: 0
        };
        this.onPlayerDataUpdated();
    },
    onDestroy: function onDestroy() {
        this.node.off("touchstart", this.onTouchStart, this);
    },
    onAllRetryFailed: function onAllRetryFailed() {
        var loginInfo = cc.find("Canvas/loginInfo");
        var loginInfoLabel = loginInfo.getChildByName("textNode").getComponent(cc.Label);
        loginInfoLabel.string = "连接服务器失败，请点击重试";
        loginInfo.active = true;
        var retryNode = cc.find("Canvas/retry");
        retryNode.active = true;
        this.isLogining = false;
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
        //# sourceMappingURL=loginSceneMgr.js.map
        