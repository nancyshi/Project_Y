// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


//a typical system will have an ui , which will be created by a prefab
//other system will not be contained by here, such as notificaition system
var SystemsMgr = cc.Class({
    extends: cc.Component,

    properties: {
        welfarySys: {
            get() {
                if (this._welfarySys == null) {
                    this._welfarySys = this.setupSysProperty("welfarySysPrefab","welfarySys","welfarySysMgr")
                    this.systems["welfarySys"] = this._welfarySys
                }
                return this._welfarySys
            }
        },
        signInSys: {
            get() {
                if (this._signInSys == null) {
                    this._signInSys = this.setupSysProperty("signInSysPrefab", "signInSys","signInSysMgr")
                    this.systems["signInSys"] = this._signInSys
                }
                return this._signInSys
            }
        },

        addPropertyNumSys: {
            get() {
                if (this._addPropertyNumSys == null) {
                    this._addPropertyNumSys = this.setupSysProperty("addPropertyNumSysPrefab","addPropertyNumSys","addPropertyNumSysMgr")
                    this.systems["addPropertyNumSys"] = this._addPropertyNumSys
                }
                return this._addPropertyNumSys
            }
        },

        mailSys: {
            get() {
                if (this._mailSys == null) {
                    this._mailSys = this.setupSysProperty("mailSysPrefab","mailSys","mailSysMgr")
                    this.systems["mailSys"] = this._mailSys
                }
                return this._mailSys
            }
        },
        
        selectSectionSys: {
            get() {
                if (this._selectSectionSys == null) {
                    this._selectSectionSys = this.setupSysProperty("selectSectionSysPrefab","selectSectionSys","selectSectionUIMgr")
                    this.systems["selectSectionSys"] = this._selectSectionSys
                }
                return this._selectSectionSys
            }
        },
        storySys: {
            get() {
                if (this._storySys == null) {
                    this._storySys = this.setupSysProperty("storySysPrefab","storySys","storySysMgr")
                    this.systems["storySys"] = this._storySys
                }
                return this._storySys
            }
        },

        systems: {
            get() {
                if (this._systems == null) {
                    this._systems = {}
                }
                return this._systems
            }
        }
    },

    setupSysProperty(givenPrefabName, givenName, givenMgrName) {
        var givenSysProperty = {}
        givenSysProperty.uiPrefab = require("resMgr").reses[givenPrefabName]
        givenSysProperty.opendNode = null
        givenSysProperty.name = givenName
        givenSysProperty.mgrName = givenMgrName
        return givenSysProperty
    },

    showSystem(givenSysName, para = null, type = 1) {
        //type 1 = animated open , 2 = direct open
        var givenSys = this.getSysBySysName(givenSysName)
        if (givenSys.opendNode != null) {
            cc.log("this sys has been opend , can't reopen: " + givenSys.name)
            return
        }
        var ui = cc.instantiate(givenSys.uiPrefab)
        var mgrName = this.systems[givenSys.name].mgrName
        var mgr = ui.getComponent(mgrName)
        if (mgr != null && typeof mgr.onWillOpend === "function") {
            mgr.onWillOpend(para)
        }
        if (type == 2) {
            cc.director.getScene().getChildByName("Canvas").addChild(ui)
            givenSys.opendNode = ui
            return
        }
        var others = ui.getChildByName("others")
        var bg = ui.getChildByName("bg")
        if (bg != null) {
            bg.width = cc.winSize.width
            bg.height = cc.winSize.height
            bg.on("touchstart",function(){})
        }
        cc.director.getScene().getChildByName("Canvas").addChild(ui)
        givenSys.opendNode = ui
        if (others != null) {
            others.scale = 0
            cc.tween(others)
                .to(0.3,{scale: 1})
                .start()
        }
        else {
            ui.scale = 0
            cc.tween(ui)
                .to(0.3,{scale: 1})
                .start()
        }
    },

    closeSystem(givenSysName, type = 1) {
        //1 = animated close , 2 = direct close, 3 = fade out
        var givenSys = this.getSysBySysName(givenSysName)
        var opendNode = givenSys.opendNode
        if (opendNode == null) {
            cc.log(givenSys.name + "has not been opend, no need to colse")
            return
        }
        if (type == 1) {
            var others = opendNode.getChildByName("others")
            if (others != null) {
                cc.tween(others)
                    .to(0.3, {scale: 0})
                    .call(function(){
                        opendNode.destroy()
                        givenSys.opendNode = null
                    })
                    .start()
            }
            else {
                cc.tween(opendNode)
                    .to(0.3, {scale: 0})
                    .call(function(){
                        opendNode.destroy()
                        givenSys.opendNode = null
                    })
            }
        }

        else if (type == 2) {
            opendNode.destroy()
            givenSys.opendNode = null
        }

        else if (type == 3) {
            var coverNode = require("resMgr").reses["coverNodePrefab"]
            coverNode = cc.instantiate(coverNode)
            coverNode.width = opendNode.width
            coverNode.height = opendNode.height
            coverNode.opacity = 0
            coverNode.on("touchstart",function(){})

            opendNode.addChild(coverNode)
            cc.tween(coverNode)
                .to(0.5,{opacity: 255})
                .delay(0.5)
                .call(function(){
                    opendNode.destroy()
                    givenSys.opendNode = null
                })
                .start()
        }
        
    },

    getSysBySysName(givenSysName) {
        switch(givenSysName){
            case "welfarySys" :
                return this.welfarySys
            case "signInSys":
                return this.signInSys
            case "addPropertyNumSys":
                return this.addPropertyNumSys
            case "mailSys":
                return this.mailSys
            case "selectSectionSys":
                return this.selectSectionSys
            case "storySys":
                return this.storySys
            default:
                cc.log("no such sys")
                return false
        }
    },

    systemsGloableDataMonitored(key,value) {
        //mailSys
            //monitored whether reach mail condition
        this.mailSysGloableMonitored(key,value)
    },


    mailSysGloableMonitored(key,value) {
        var textConfig = require("textConfig")
        var onReachCondition = function(givenTag,givenMailId) {
            var networkMgr = require("networkMgr")
            var messageObj = networkMgr.makeMessageObj("mailModule","reachConditionMessageType")
            messageObj.message.playerId = require("dataMgr").playerData.id
            messageObj.message.tag = givenTag
            messageObj.message.mailId = givenMailId
            messageObj.successCallBack = function(xhr) {
                var response = xhr.responseText
                response = JSON.parse(response)
                if (response.type == "success") {
                    var isEnd = response.isEnd
                    if (isEnd == 0) {
                        require("dataMgr").playerData.mailConditionIndex[givenTag] += 1
                    }
                    else {
                        require("dataMgr").playerData.mailConditionIndex[givenTag] = -1
                    }
                    var newMail = response.mail
                    require("dataMgr").playerData.mails[givenMailId] = newMail
                    var notificaitionMgr = require("notificationMgr")
                    var notiStr = textConfig.getTextByIdAndLanguageType(148)
                    notificaitionMgr.pushNoti(notiStr)
                }
            }
            networkMgr.sendMessageByMsgObj(messageObj)
        }
        var mailSysConfig = require("mailSysConfig")
        var tags = Object.keys(mailSysConfig)
        for (var index in tags) {
            var oneTag = tags[index]
            var conditionIndex = require("dataMgr").playerData.mailConditionIndex[oneTag]
            if (conditionIndex == -1) {
                continue
            }
            var element = mailSysConfig[oneTag].conditions[conditionIndex]
            var conditionType = element.conditionType
            var conditionPara = element.conditionPara

            if (conditionType == 1) {
                //reach given level id
                if (key != "preLevel") {
                    continue
                }
                
                if (value == conditionPara) {
                    var mailId = element.mailId
                    onReachCondition(oneTag,mailId)
                }
                
            }
            else if (conditionType == 2) {
                //min step num of given level less than a value
                if (key.indexOf("minStep_level_") == -1) {
                    continue
                }

                var levelId = key.slice(14)
                if (parseInt(levelId) == conditionPara.levelId){
                    if (value <= conditionPara.minStepNum) {
                        var mailId = element.mailId
                        onReachCondition(oneTag,mailId)
                    }
                }
            }
        }
    },

    mailSysGloableSendOneMail(givenMailId,givenTag,complete = function(){},delay = 0) {
        var networkMgr = require("networkMgr")
        var messageObj = networkMgr.makeMessageObj("mailModule","sendMailMessageType")
        messageObj.message.playerId = require("dataMgr").playerData.id
        messageObj.message.mailId = givenMailId
        messageObj.message.tag = givenTag
        messageObj.message.delay = delay
        messageObj.successCallBack = function(xhr) {
            var response = xhr.responseText
            response = JSON.parse(response)
            if (response.type == "success") {
                complete()
            }
        }
        networkMgr.sendMessageByMsgObj(messageObj)
    },

    // getSectionLevelInfoByLevelId(givenLevelId) {
    //     var result = null
    //     var sectionConfig = require("sectionConfig")
    //     for (var key in sectionConfig) {
    //         var oneConfig = sectionConfig[key]
    //         var levels = oneConfig.levels
    //         for (var index in levels) {
    //             if (givenLevelId == levels[index]) {
    //                 var currentLevel = givenLevelId
                    
    //             }
    //         }
    //     }
    //     return result
    // }
    // update (dt) {},
});

var systemsMgr = new SystemsMgr()
module.exports = systemsMgr