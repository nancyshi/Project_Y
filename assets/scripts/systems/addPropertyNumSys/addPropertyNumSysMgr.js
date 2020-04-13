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
        desLabelNode: cc.Node,
        addTypeId: 1 ,
        addConfig: null,
        sysName: "addPropertyNumSys"
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.setupData()
        this.setupUI()
    },

    setupData() {
        var config = require("addPropertySysConfig")
        config = config[this.addTypeId]
        this.addConfig = config
    },

    setupUI() {
        var desStr = "您可以观看视频广告，获得"
        var isFirstKey = true
        for (var key in this.addConfig) {
            if (isFirstKey == false) {
                desStr += "，"
            }
            switch (key) {
                case "physicalPower":
                    desStr += " 体力 * " + this.addConfig[key].toString()
                    break
                case "heart":
                    desStr += " 金币 * " + this.addConfig[key].toString()
                    break
            }
            isFirstKey = false
        }
        desStr += "，是否观看？"
        this.desLabelNode.getComponent(cc.Label).string = desStr
    },

    onWillOpend(givenAddTypeId) {
        this.addTypeId = givenAddTypeId
    },

    onClickEnsureButton(){
        var advertisMgr = require("advertisMgr")
        advertisMgr.delegate = this
        advertisMgr.showVideoAd()
    },

    onClickCancelButton() {
        require("systemsMgr").closeSystem(this.sysName)
    },


    //advertis delegate
    onVideoAdEnd() {
        var commitBody = {}
        for (var key in this.config) {
            var oneAddedPropertyNum = require("dataMgr").playerData[key] + this.config[key]
            commitBody[key] = oneAddedPropertyNum
        }

        if (Object.keys(commitBody).length > 0) {
            var successCallBack = function() {
                for (var k in commitBody) {
                    require("dataMgr").playerData[k] = commitBody[k]
                }
            }

            require("dataMgr").commitPlayerDataToServer(commitBody,successCallBack)
        }
    }
    // update (dt) {},
});
