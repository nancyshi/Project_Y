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
        processBarNode: cc.Node,
        processLabelNode: cc.Node,
        iconNode: cc.Node,
        iconLabelNode: cc.Node,
        nameLabelNode: cc.Node,
        lockedIconSpriteFrame: cc.SpriteFrame,

        sectionKey: null,
        config: null,
        mailInfo: null,

        selectSectionUINode: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {
        if (this.sectionKey == null) {
            return
        }

        this.setupData()
        // this.nameLabelNode.getComponent(cc.Label).string = this.config.sectionDescrip
        this.nameLabelNode.getComponent(cc.Label).string = require("textConfig").getTextByIdAndLanguageType(this.config.sectionTitleTextId)
        this.iconLabelNode.getComponent(cc.Label).string = this.sectionKey

        if (parseInt(this.sectionKey) > require("dataMgr").playerData.currentSection) {
            this.iconNode.getComponent(cc.Sprite).spriteFrame = this.lockedIconSpriteFrame
            this.nameLabelNode.color = cc.color()
        }

        this.processLabelNode.getComponent(cc.Label).string = this.mailInfo.sendNum.toString() + " / " + this.mailInfo.totalNum.toString()
        this.processBarNode.getComponent(cc.ProgressBar).progress = this.mailInfo.sendNum / this.mailInfo.totalNum
    },

    // update (dt) {},
    setupData() {
        var sectionConfig = require("sectionConfig")
        this.config = sectionConfig[this.sectionKey]
        var mailIdsShouldToSend = []
        var levels = this.config.levels
        var mailSysConfig = require("mailSysConfig")
        for (var tag in mailSysConfig) {
            var conditions = mailSysConfig[tag].conditions
            for (var index in conditions) {
                var oneCondition = conditions[index]
                var conditionType = oneCondition.conditionType
                var conditionPara = oneCondition.conditionPara
                if (conditionType == 1 && levels.indexOf(conditionPara) != -1) {
                    mailIdsShouldToSend.push(oneCondition.mailId)
                }
                else if (conditionType == 2 && levels.indexOf(conditionPara.levelId) != -1) {
                    mailIdsShouldToSend.push(oneCondition.mailId)
                }
            }
        }

        var totalMailNum = mailIdsShouldToSend.length
        var sendMailNum = 0
        if (totalMailNum > 0) {
            var currentMailIds = Object.keys(require("dataMgr").playerData.mails)
            for (var index in mailIdsShouldToSend) {
                var oneMailId = mailIdsShouldToSend[index]
                if (currentMailIds.indexOf(oneMailId.toString()) != -1) {
                    sendMailNum += 1
                }
            }
        }
        var result = {
            totalNum: totalMailNum,
            sendNum: sendMailNum
        }
        this.mailInfo = result
    },

    onClick() {

        if (parseInt(this.sectionKey) > require("dataMgr").playerData.currentSection) {
            require("notificationMgr").showNoti(require("textConfig").getTextByIdAndLanguageType(158))
            return
        }
        else if (parseInt(this.sectionKey) <= require("dataMgr").playerData.currentSection ) {
            var mainSceneMgr = cc.director.getScene().getChildByName("Canvas").getComponent("mainSceneMgr")
            if (mainSceneMgr == null) {
                cc.log("现在不是主界面，无法选择章节，这种情况应该不会出现的才对！")
            }
            else {
                if(parseInt(this.sectionKey) != mainSceneMgr.selectedSection) {
                    mainSceneMgr.selectedSection = parseInt(this.sectionKey)
                    mainSceneMgr.setupSectionPerformance()
                    mainSceneMgr.playBgm()
                }
            }
        }

        require("systemsMgr").closeSystem("selectSectionSys")
    }
});
