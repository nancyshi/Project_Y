(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/systems/welfarySys/welfarySysMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b76ban9vyBAI6HjYNJk1oHH', 'welfarySysMgr', __filename);
// scripts/systems/welfarySys/welfarySysMgr.js

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
        desLabelNode: cc.Node,
        ensureButtonNode: cc.Node,
        cancelButtonNode: cc.Node,
        systemName: "welfarySys"
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.setupInitUI();
    },
    onClickEnsureButton: function onClickEnsureButton() {
        var advMgr = require("advertisMgr");
        advMgr.delegate = this;
        advMgr.showVideoAd();
    },
    onClickCancelButton: function onClickCancelButton() {
        require("systemsMgr").closeSystem(this.systemName);
    },
    setupInitUI: function setupInitUI() {
        var flag = require("dataMgr").playerData.initAdWatchedFlag;
        if (flag == 0) {
            this.desLabelNode.getComponent(cc.Label).string = require("textConfig").getTextByIdAndLanguageType(112);
            this.ensureButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = require("textConfig").getTextByIdAndLanguageType(113);
            this.cancelButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = require("textConfig").getTextByIdAndLanguageType(114);
        } else if (flag == 1) {
            this.desLabelNode.getComponent(cc.Label).string = "嗯？ 这个界面不应该出现的，你已经领取过福利啦~";
        }
    },


    //advertis delegate
    onVideoAdEnd: function onVideoAdEnd() {
        var commitBody = {
            initAdWatchedFlag: 1
        };
        var self = this;
        var successCallBack = function successCallBack() {
            require("dataMgr").playerData.initAdWatchedFlag = 1;
            require("systemsMgr").closeSystem(self.systemName);
            var currentScene = cc.director.getScene();
            if (currentScene.name == "mainScene") {
                currentScene.getChildByName("Canvas").getChildByName("welfaryButton").active = false;
            }
        };
        require("dataMgr").commitPlayerDataToServer(commitBody, successCallBack);
    }
}
// update (dt) {},
);

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
        //# sourceMappingURL=welfarySysMgr.js.map
        