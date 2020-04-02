"use strict";
cc._RF.push(module, '0f1aaVtZzdLF65JTpKPKY/Y', 'addPhysicalPowerSys');
// scripts/systems/addPhysicalPowerSys.js

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

var AddPhysicalPowerSys = cc.Class({
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
        physicalPowerAddNum: 10
    },

    // LIFE-CYCLE CALLBACKS:

    // update (dt) {},
    show: function show() {
        if (this.ui == null) {
            this.setupUi();
        }

        var others = this.ui.getChildByName("others");
        others.scale = 0;
        if (this.ui.parent == null) {
            cc.director.getScene().getChildByName("Canvas").addChild(this.ui);
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
        var self = this;
        var ensureSystemNodeMgr = this.ui.getComponent("ensureSystemNodeMgr");
        ensureSystemNodeMgr.ensureButtonWillAutoCloseUi = false;
        ensureSystemNodeMgr.cancelButtonWillAutoCloseUi = false;
        ensureSystemNodeMgr.canClose = false;
        var desStr = "您可以观看视频广告，获得体力 * " + this.physicalPowerAddNum.toString();
        desStr = desStr + " ，您是否愿意观看？";

        ensureSystemNodeMgr.desText = desStr;
        ensureSystemNodeMgr.onCancleButtonClick = function () {
            self.close();
        };
        ensureSystemNodeMgr.onEnsureButtonClick = function () {
            var advertisMgr = require("advertisMgr");
            advertisMgr.delegate = self;
            advertisMgr.showVideoAd();
        };
    },
    onVideoAdEnd: function onVideoAdEnd() {
        var addedPhysicalPower = require("dataMgr").playerData.physicalPower + this.physicalPowerAddNum;
        var commitBody = {
            physicalPower: addedPhysicalPower
        };
        var successCallBack = function successCallBack() {
            require("dataMgr").playerData.physicalPower = addedPhysicalPower;
            if (cc.director.getScene().name == "mainScene") {
                cc.director.getScene().getChildByName("Canvas").getComponent("mainSceneMgr").physicalPower = addedPhysicalPower;
            }
        };

        require("dataMgr").commitPlayerDataToServer(commitBody, successCallBack);
    },
    onVideoAdShowError: function onVideoAdShowError() {
        var notificationMgr = require("notificationMgr");
        notificationMgr.showNoti("貌似有些问题");
    }
});

var sharedAddPhysicalPowerSys = new AddPhysicalPowerSys();
module.exports = sharedAddPhysicalPowerSys;

cc._RF.pop();