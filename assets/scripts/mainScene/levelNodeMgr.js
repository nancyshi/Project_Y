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
        status: {
            get() {
                return this._status
            },
            set(value) {
                this._status = value
                if(value == 0 || value == 2) {                  
                    this.node.getComponent(cc.Sprite).spriteFrame = this.graySpriteFrame
                }
                if (value == 2) {
                    this.isRecommanded = true
                }
            }
        }, //0 = locked, 1 = unlocked, 2 = current
        levelNumLabelNode: cc.Node,
        mailTagNode: cc.Node,
        selectedEffectNode: cc.Node,
        graySpriteFrame: cc.SpriteFrame,
        mailTagSendSpriteFrame: cc.SpriteFrame,
        delegate: null,
        level: null,
        preChanllengeUIPrefab: cc.Prefab,
        preChanllengeUIOpend: false,
        isRecommanded: {
            get() {
                return this._isRecommanded
            },
            set(value) {
                this._isRecommanded = value
                if (value == true) {
                    this.selectedEffectNode.active = true
                }
            }
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.tween(this.selectedEffectNode)
            .repeatForever(cc.tween().to(0.5,{opacity:0}).to(0.5,{opacity: 255}))
            .start()
        this.levelNumLabelNode.getComponent(cc.Label).string = this.level.toString()
        this.setupMailTag()
    },

    start () {

    },

    onClick() {
        if (this.status == 0) {
            return
        }
        this.openPreChanllengeUI()
    },

    openPreChanllengeUI() {
        if (this.preChanllengeUIOpend == true) {
            return
        }

        var ui = cc.instantiate(this.preChanllengeUIPrefab)
        var mgr = ui.getComponent("preChallengeUIMgr")
        mgr.level = this.level
        mgr.levelStatus = this.status
        mgr.delegate = this

        cc.director.getScene().getChildByName("Canvas").addChild(ui)
        this.preChanllengeUIOpend = true
    },

    setupMailTag() {
        var result = this._checkLevelMailTagStatus()
        if (result != false) {
            var mailHasSend = result[1]
            var mailTagWillShow = result[0]
            if (mailHasSend == true) {
                this.mailTagNode.getComponent(cc.Sprite).spriteFrame = this.mailTagSendSpriteFrame
            }
            if (mailTagWillShow == true) {
                this.mailTagNode.active = true
            }
        }
    },

    _checkLevelMailTagStatus() {
        var mailSysConfig = require("mailSysConfig")
        var mailTagWillShow = false
        var mailHasSend = false
        for (var tag in mailSysConfig) {
            var conditions = mailSysConfig[tag].conditions
            for (var index in conditions) {
                var oneElement = conditions[index]
                var conditionType = oneElement.conditionType
                var conditionPara = oneElement.conditionPara
                
                if (conditionType == 1) {
                    if (conditionPara == this.level){
                        mailTagWillShow = true
                        var currentConditionIndex = require("dataMgr").playerData.mailConditionIndex[tag]
                        if (this.level == 2) {
                            cc.log(index, currentConditionIndex)
                        }
                        
                        if (index < currentConditionIndex || currentConditionIndex == -1){
                            mailHasSend = true
                        }
                        
                        return [mailTagWillShow,mailHasSend]
                    }
                }
                else if (conditionType == 2) {
                    if (conditionPara.levelId == this.level) {
                        mailTagWillShow = true
                    }
                    var currentConditionIndex = require("dataMgr").playerData.mailConditionIndex[tag]
                    if (index < currentConditionIndex || currentConditionIndex == -1) {
                        mailHasSend = true
                    }

                    return [mailTagWillShow,mailHasSend]
                }
            }
        }
        return false
    },

    dataMonitored(key,value) {
        var mailConfig = require("mailConfig")
        var mailIds = Object.keys(mailConfig)
        if (mailIds.indexOf(key) != -1) {
            this.setupMailTag()
        }
    }
    // update (dt) {},
});
