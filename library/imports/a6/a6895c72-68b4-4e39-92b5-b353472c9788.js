"use strict";
cc._RF.push(module, 'a6895xyaLROOZK1s1NHLJeI', 'signInSysMgr');
// scripts/systems/signInSys/signInSysMgr.js

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
        ensureButtonNode: cc.Node,
        cancelButtonNode: cc.Node,
        desLabelNode: cc.Label,
        physicalPowerAddNum: 0,
        heartAddNum: 0,
        addRateForAd: 0,
        sysName: "signInSys"
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.setupData();
        this.setupUI();
    },
    setupUI: function setupUI() {
        var status = require("dataMgr").playerData.signInStatus;
        //1 = not sign in
        //2 = common in
        //3 = ad sign in
        var desStr = "";
        switch (status) {
            case 1:
                desStr = "每日签到可以获得体力 * " + this.physicalPowerAddNum + ", 金币 * " + this.heartAddNum + ", ";
                desStr = desStr + "您是否愿意观看视频广告，获得双倍奖励？";
                this.cancelButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = "普通签到";
                break;
            case 2:
                desStr = "您还可以观看视频广告获取体力 * " + ((this.addRateForAd - 1) * this.physicalPowerAddNum).toString();
                desStr = desStr + ", ";
                desStr = desStr + "金币 * " + ((this.addRateForAd - 1) * this.heartAddNum).toString();
                desStr = desStr + "， 是否观看？";
                break;
            case 3:
                desStr = "您今天已经签到过啦，明天再来吧~";
                this.cancelButtonNode.active = false;
                this.ensureButtonNode.x = 0;
                this.ensureButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = "好的";
                break;
        }
        if (desStr == "") {
            cc.log("wrong signIn status");
            return;
        }

        this.desLabelNode.getComponent(cc.Label).string = desStr;
    },
    setupData: function setupData() {
        var config = require("signInSysConfig");
        this.physicalPowerAddNum = config.physicalPowerAddNum;
        this.heartAddNum = config.heartAddNum;
        this.addRateForAd = config.addRateForAd;
    },
    onClickEnsureButton: function onClickEnsureButton() {
        var status = require("dataMgr").playerData.signInStatus;
        switch (status) {
            case 1:
                var advMgr = require("advertisMgr");
                advMgr.delegate = this;
                advMgr.showVideoAd();
                break;
            case 2:
                var advMgr = require("advertisMgr");
                advMgr.delegate = this;
                advMgr.showVideoAd();
                break;
            case 3:
                require("systemsMgr").closeSystem(this.sysName);
                break;
        }
    },
    onClickCancelButton: function onClickCancelButton() {
        var status = require("dataMgr").playerData.signInStatus;
        switch (status) {
            case 1:
                this.signIn(1);
                break;
            case 2:
                require("systemsMgr").closeSystem(this.sysName);
                break;
            case 3:
                // if status == 3, cancel button will not appear
                cc.log("some wrong thing happen from onClickCancelButton");
                break;
        }
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
        switch (signInType) {
            case 1:
                require("dataMgr").playerData.signInStatus = 2;
                break;
            case 2:
                require("dataMgr").playerData.signInStatus = 3;
                break;
            case 3:
                require("dataMgr").playerData.signInStatus = 3;
                break;
        }

        require("dataMgr").playerData.physicalPower = physicalPower;
        require("dataMgr").playerData.heart = heart;
        require("notificationMgr").showNoti("签到成功");
        require("systemsMgr").closeSystem(this.sysName);
    },


    //advertis delegate
    onVideoAdEnd: function onVideoAdEnd() {
        var status = require("dataMgr").playerData.signInStatus;
        switch (status) {
            case 1:
                this.signIn(2);
                break;
            case 2:
                this.signIn(3);
                break;
        }
    }
    // update (dt) {},

});

cc._RF.pop();