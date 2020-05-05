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
        headerDis: 83,
        footerDis: 124,
        sectionDis: 66,
        contentSpace: 99,
        mailSectionElementDis: 30,

        titleLabelNode: cc.Node,
        challengeButtonNoe: cc.Node,
        contentSectionNode: cc.Node,
        mailSectionNode: cc.Node,
        closeButtonNode: cc.Node,
        mailSectionElementPrefab: cc.Prefab,
        challengeButtonCostPhySprite: cc.SpriteFrame,

        level: null,
        levelStatus: null,
        costResult: null,
        delegate: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var textConfig = require("textConfig")
        var bg = this.node.getChildByName("bg")
        bg.width = cc.winSize.width
        bg.height = cc.winSize.height
        bg.on("touchstart",function(){},this)

        var self = this
        this.closeButtonNode.on("click",function(){
            if (self.delegate != null) {
                self.delegate.preChanllengeUIOpend = false
            }
            else {
                cc.log("delegate is null")
            }
            self.node.destroy()     
        },this)

        this.challengeButtonNoe.getChildByName("New Label").getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(151)
    },

    start () {
        this.setupUI()
    },

    getSectionAndIndexOfLevel() {
        var mainSceneMgr = cc.director.getScene().getChildByName("Canvas").getComponent("mainSceneMgr")
        var section = mainSceneMgr.selectedSection
        var sectionConfig = require("sectionConfig")
        var levels = sectionConfig[section].levels
        var index = levels.indexOf(this.level) + 1
        return [section, index]
    },

    setupUI() {
        this._setupUIContent()
        this._setupUIPosition()
    },

    _setupUIContent() {
        //title label
        var result = this.getSectionAndIndexOfLevel()
        this.titleLabelNode.getComponent(cc.Label).string = result[0].toString() + " - " + result[1]
        
        //content section
        var levelConfig = require("levelConfig")
        var config = levelConfig[this.level]
        var desLabelNode = this.contentSectionNode.getChildByName("desLabel")
        //desLabelNode.getComponent(cc.Label).string = require("textConfig").getTextByIdAndLanguageType(config.desTextId)
        desLabelNode.getComponent(cc.Label).string = this.titleLabelNode.getComponent(cc.Label).string
        desLabelNode.getComponent(cc.Label)._forceUpdateRenderData()

        var seperateLineUpNode = this.contentSectionNode.getChildByName("seperateLineUp")
        var seperateLineDownNode = this.contentSectionNode.getChildByName("seperateLineDown")
        var contentHeight = desLabelNode.height + 2 * this.contentSpace + seperateLineUpNode.height + seperateLineDownNode.height
        this.contentSectionNode.height = contentHeight

        seperateLineUpNode.y = 0
        desLabelNode.y = seperateLineUpNode.y - seperateLineUpNode.height - this.contentSpace
        seperateLineDownNode.y = -contentHeight + seperateLineDownNode.height

        //mailSection
        var textConfig = require("textConfig")
        var result = this._getMailSectionInfo()
        var mailSectionHeight = 0
        // for (var index in result) {
        //     var oneConfig = result[index]
        //     var node = cc.instantiate(this.mailSectionElementPrefab)
        //     var desLabel = node.getChildByName("desLabel")
            
        //     var textStr = ""
        //     if (oneConfig.type == 1) {
        //         // textStr = "通关后会收到 " + oneConfig.tag + " 分支的新邮件"
        //         textStr = textConfig.getFormatedString(149,[oneConfig.tag])
        //     }
        //     else if (oneConfig.type == 2) {
        //         // textStr = "用不多于 " + oneConfig.minStep + " 步通关，会收到 " + oneConfig.tag + " 分支的新邮件"
        //         textStr = textConfig.getFormatedString(150,[oneConfig.minStep,oneConfig.tag])
        //     }
        //     desLabel.getComponent(cc.Label).string = textStr
        //     desLabel.getComponent(cc.Label)._forceUpdateRenderData()
            
        //     var completeIcon = node.getChildByName("completeIcon")
        //     if (oneConfig.status == true) {
        //         completeIcon.active = true
        //     }

        //     if (desLabel.height > completeIcon.height) {
        //         node.height = desLabel.height
        //     }
        //     else {
        //         node.height = completeIcon.height
        //     }

        //     node.y = mailSectionHeight
        //     mailSectionHeight += node.height
        //     if (index != result.length - 1) {
        //         mailSectionHeight += this.mailSectionElementDis
        //     }
        //     this.mailSectionNode.addChild(node)
        // }
        this.mailSectionNode.height = mailSectionHeight

        //challengeButton
        var costResult = this._getCostInfoOfChallenge()
        if (costResult.type == "physicalPower") {
            this.challengeButtonNoe.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = this.challengeButtonCostPhySprite
        }
        
        this.challengeButtonNoe.getChildByName("costLabel").getComponent(cc.Label).string = costResult.num.toString()
        this.costResult = costResult
    },
    _setupUIPosition() {
        var totalHeight = this.footerDis + this.titleLabelNode.height + this.sectionDis + this.contentSectionNode.height + this.sectionDis + this.mailSectionNode.height + this.sectionDis + this.challengeButtonNoe.height + this.footerDis
        var uibg = this.node.getChildByName("others").getChildByName("uiBg")
        uibg.height = totalHeight

        this.titleLabelNode.y = uibg.height / 2 - this.headerDis
        this.contentSectionNode.y = this.titleLabelNode.y - this.titleLabelNode.height - this.sectionDis
        this.mailSectionNode.y = this.contentSectionNode.y - this.contentSectionNode.height - this.sectionDis
        this.challengeButtonNoe.y = this.mailSectionNode.y - this.mailSectionNode.height - this.sectionDis - this.challengeButtonNoe.height / 2
    },

    _getMailSectionInfo() {
        var mailSysConfig = require("mailSysConfig")
        var result = []
        var textConfig = require("textConfig")
        for (var tag in mailSysConfig) {
            var oneConfig = mailSysConfig[tag]
            var conditions = oneConfig.conditions
            var currentConditionIndex = require("dataMgr").playerData.mailConditionIndex[tag]
            for (var index in conditions) {
                var oneConditionConfig = conditions[index]
                var conditionType = oneConditionConfig.conditionType
                var conditionPara = oneConditionConfig.conditionPara
                
                // if (conditionPara == this.level) {
                //     var oneResult = {
                //         tag: oneConfig.tagName,
                //         status: null
                //     }
                    
                // }
                var oneResult = null
                if ((conditionType == 1 && conditionPara == this.level) || (conditionType == 2 && conditionPara.levelId == this.level)) {
                    oneResult = {
                        // tag: oneConfig.tagNameTextId,
                        tag: textConfig.getTextByIdAndLanguageType(oneConfig.tagNameTextId),
                        type: conditionType,
                        status: null,
                        minStep: null
                    }
                }
                if (oneResult == null) {
                    continue
                }

                if (index < currentConditionIndex) {
                    oneResult.status = true
                }
                else {
                    oneResult.status = false
                }

                if (conditionType == 2) {
                    oneResult.minStep = conditionPara.minStepNum
                }
                result.push(oneResult)
                break
            }
        }

        return result
    },

    _getCostInfoOfChallenge() {
        var result = {
            type: "physicalPower",
            num: 0
        }
        var levelConfig = require("levelConfig")
        if (this.levelStatus == 1) {
            result.type = "heart"
            result.num = levelConfig[this.level].heartForRetryCost
        }
        else if (this.levelStatus == 2) {
            var flag = require("dataMgr").playerData.physicalPowerCostedFlag
            if (flag == 0) {
                result.type = "physicalPower"
                result.num = levelConfig[this.level].physicalPowerCost
                var welfaryFlag = require("dataMgr").playerData.initAdWatchedFlag
                if (welfaryFlag == 1) {
                    result.num = Math.round(result.num / 2)
                }
            }
            else if (flag == 1) {
                result.type = "heart"
                result.num = levelConfig[this.level].heartForRetryCost
            }
        }

        return result
    },

    onClick() {
        if (this.costResult == null || this.costResult.num == 0) {
            return
        }
        var valueNum = null
        if (this.costResult.type == "heart") {
            valueNum = require("dataMgr").playerData.heart - this.costResult.num
        }
        else if (this.costResult.type == "physicalPower") {
            valueNum = require("dataMgr").playerData.physicalPower - this.costResult.num
        }

        if (valueNum == null || valueNum < 0) {
            var notificaitionSys = require("notificationMgr")
            var notiStr = ""
            if (this.costResult.type == "heart") {
                notiStr = require("textConfig").getTextByIdAndLanguageType(169)
            }
            else if (this.costResult.type == "physicalPower") {
                notiStr = require("textConfig").getTextByIdAndLanguageType(170)
            }
            notificaitionSys.pushNoti(notiStr)
            return
        }
        
        
        var networkMgr = require("networkMgr")
        var messageObj = networkMgr.makeMessageObj("dataModule","commitMessageTyp")
        messageObj.message.playerId = require("dataMgr").playerData.id
        var commitBody = null
        if (this.costResult.type == "heart") {
            commitBody = {
                "heart": require("dataMgr").playerData.heart - this.costResult.num
            }
        }

        else if (this.costResult.type == "physicalPower") {
            commitBody = {
                "physicalPower": require("dataMgr").playerData.physicalPower - this.costResult.num
            }
        }

        messageObj.message.commitBody = commitBody
        var self = this
        messageObj.successCallBack = function(){
            if (self.costResult.type == "heart") {
                require("dataMgr").playerData.heart = commitBody.heart
            }
            else if (self.costResult.type == "physicalPower") {
                require("dataMgr").playerData.physicalPower = commitBody.physicalPower
            }
            
            // self.challengeButtonNoe.getComponent(cc.Button).interactable = true
            require("gameMgr").enterLevelScene(self.level)
        }

        this.challengeButtonNoe.getComponent(cc.Button).interactable = false
        networkMgr.sendMessageByMsgObj(messageObj)
    }
    // update (dt) {},
});
