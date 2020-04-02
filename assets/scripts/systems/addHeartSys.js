// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var AddHeartSys = cc.Class({
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
        heartAddNum: 10
    },

    // LIFE-CYCLE CALLBACKS:

    

    // update (dt) {},
    show() {
        if (this.ui == null) {
            this.setupUi()
        }

        var others = this.ui.getChildByName("others")
        others.scale = 0
        if (this.ui.parent == null) {
            cc.director.getScene().getChildByName("Canvas").addChild(this.ui)
        }
        else {
            this.ui.active = true
        }

        cc.tween(others)
            .to(0.3,{scale: 1})
            .start()
    },
    close() {
        var others = this.ui.getChildByName("others")
        var self = this
        cc.tween(others)
            .to(0.3,{scale: 0})
            .call(function(){
                self.ui.active = false
            })
            .start()
    },
    setupUi() {
        if (this.ui == null) {
            this.ui = require("ensureSystem").create()
        }
        var self = this
        var ensureSystemNodeMgr = this.ui.getComponent("ensureSystemNodeMgr")
        ensureSystemNodeMgr.ensureButtonWillAutoCloseUi = false
        ensureSystemNodeMgr.cancelButtonWillAutoCloseUi = false
        ensureSystemNodeMgr.canClose = false
        var desStr = "您可以观看视频广告，获得金币 * " + this.heartAddNum.toString()
        desStr = desStr + " ，您是否愿意观看？"

        ensureSystemNodeMgr.desText = desStr
        ensureSystemNodeMgr.onCancleButtonClick = function() {
            self.close()
        }
        ensureSystemNodeMgr.onEnsureButtonClick = function() {
            var advertisMgr = require("advertisMgr")
            advertisMgr.delegate = self
            advertisMgr.showVideoAd()
        }
    },

    onVideoAdEnd() {
        var addedHeart = require("dataMgr").playerData.heart + this.heartAddNum
        var commitBody = {
            heart: addedHeart
        }
        var self = this
        var successCallBack = function() {
            require("dataMgr").playerData.heart = addedHeart
            if (cc.director.getScene().name == "mainScene") {
                cc.director.getScene().getChildByName("Canvas").getComponent("mainSceneMgr").heart = addedHeart
            }
            else if (cc.director.getScene().name.indexOf("level") > -1) {
                cc.director.getScene().getChildByName("Canvas").getComponent("levelMgr").heart = addedHeart
            }
        }

        require("dataMgr").commitPlayerDataToServer(commitBody,successCallBack)
    },

    onVideoAdShowError() {
        var notificationMgr = require("notificationMgr")
        notificationMgr.showNoti("貌似有些问题")
    }
    
 
});

var sharedAddHeartSys = new AddHeartSys()
module.exports = sharedAddHeartSys