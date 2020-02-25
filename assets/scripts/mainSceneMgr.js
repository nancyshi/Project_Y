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
        playerData: null,
        levelsStartPosition: cc.v2(0,0),
        levelsHorDis: 60,
        levelsVerDis: 60,
        levelsHorNum: 5,
        levelNodePrefab: cc.Prefab,
        lockedLevelColor: cc.color,
        unlockedLevelColor: cc.color,
        currentLevelColor: cc.color,

        physicalPower: {
            get() {
                return this._physicalPower
            },
            set(value) {
                this._physicalPower = value
                this.node.getChildByName("physicalPowerLabel").getComponent(cc.Label).string = this.playerData.physicalPower.toString() + " / " + this.playerData.maxPhysicalPower.toString()
            }
        },

        maxPhysicalPower: {
            get() {
                return this._maxPhysicalPower
            },
            set(value) {
                this._maxPhysicalPower = value
            }
        },

        physicalPowerForChallengeCost: {
            get() {
                return this._physicalPowerForChallengeCost
            },
            set(value) {
                this._physicalPowerForChallengeCost = value
                cc.find("Canvas/challengeButton/physicalPowerLabel").getComponent(cc.Label).string = value.toString()
                if (value == 0) {
                    cc.find("Canvas/commentLabel").getComponent(cc.Label).string = "已挑战过的关卡不会消耗体力"
                }
                else if (value > 0 ) {
                    cc.find("Canvas/commentLabel").getComponent(cc.Label).string = "每天挑战每个新的关卡时会消耗体力"
                }

                if (value > this.physicalPower) {
                    cc.find("Canvas/challengeButton").getComponent(cc.Button).interactable = false
                }
                else {
                    cc.find("Canvas/challengeButton").getComponent(cc.Button).interactable = true
                }
            }
        },

        selectedLevel: {
            get() {
                return this._selectedLevel
            },
            set(value) {
                this._selectedLevel = value
                if (value != null) {
                    if (value == this.playerData.currentLevel && this.playerData.physicalPowerCostedFlag == 0) {
                        this.physicalPowerForChallengeCost = require("levelConfig")[value].physicalPowerCost
                    }
                    else{
                        this.physicalPowerForChallengeCost = 0
                    }
                    if (this.levelAresNodes[value] != null) {
                        this.selectedLevelAreaNode = this.levelAresNodes[value]
                    }
                }
            }
        },

        selectedLevelAreaNode: {
            get() {
                return this._selectedLevelAreaNode
            },
            set(value) {
                this._selectedLevelAreaNode = value
                if (value != null) {
                    if (this.selectedEffect.active == false) {
                        this.selectedEffect.x = this.selectedLevelAreaNode.x
                        this.selectedEffect.y = this.selectedLevelAreaNode.y
                        this.selectedEffect.active = true
                    }
                    else {
                        cc.tween(this.selectedEffect)
                            .to(0.2,{x: this.selectedLevelAreaNode.x, y: this.selectedLevelAreaNode.y})
                            .start()
                    }
                }
                else {
                    this.selectedEffect.active = false
                }
            }
        },

        selectedEffect: cc.Node,
        levelAresNodes: {
            default: {}
        },

        challengeButton: null,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.playerData = require("dataMgr").playerData
        this.lockedLevelColor = cc.color(191,191,191)
        this.unlockedLevelColor = cc.color(102,102,102)
        this.currentLevelColor = cc.color(188,36,36)
        
        this.playerName = this.playerData.name
        this.maxPhysicalPower = this.playerData.maxPhysicalPower
        this.physicalPower = this.playerData.physicalPower

        this.setupSection(this.playerData.currentSection)
        require("networkMgr").delegate = this

        this.challengeButton = this.node.getChildByName("challengeButton")
    },

    start () {

    },

    // update (dt) {},

    setupSection(givenSection, complete = function(){}) {
        this.selectedLevel = null
        
        var sectionConfig = require("sectionConfig")
        var config = sectionConfig[givenSection]

        this.node.getChildByName("sectionTitleLabel").getComponent(cc.Label).string = config.sectionTitle
        this.node.getChildByName("sectionDescripLabel").getComponent(cc.Label).string = config.sectionDescrip
        

        var levels = config.levels
        this.levelAresNodes = {}
        for (var index in levels) {
            var strForShow = parseInt(index) + 1
            strForShow = strForShow.toString()
            if (strForShow.length == 1) {
                strForShow = "0" + strForShow
            }

            var node = cc.instantiate(this.levelNodePrefab)
            var label = node.getComponent(cc.Label)
            label.string = strForShow

            node.x = (index % this.levelsHorNum) * (this.levelsHorDis + node.width) + this.levelsStartPosition.x
            node.y = -Math.floor(index / this.levelsHorNum) * (this.levelsVerDis + node.width) + this.levelsStartPosition.y

            var status = this.checkLevelStatus(levels[index])
            switch(status) {
                case 0:
                    node.color = this.lockedLevelColor
                    break
                case 1:
                    node.color = this.unlockedLevelColor
                    break
                case 2:
                    node.color = this.currentLevelColor
                    break
            }
            node.getComponent("levelAreaNodeMgr").delegate = this
            node.getComponent("levelAreaNodeMgr").level = levels[index]
            this.levelAresNodes[levels[index]] = node
            cc.find("Canvas/levelsArea").addChild(node)
        }
        var url = config.backgroundPath
        var self = this
        cc.loader.loadRes(url,cc.SpriteFrame,function(err,res){
            self.node.getChildByName("sectionBg").getComponent(cc.Sprite).spriteFrame = res
            complete()
        })

        if (givenSection == this.playerData.currentSection) {
            this.selectedLevel = this.playerData.currentLevel
        }
    },

    checkSectionStatus(givenSection) {
        var currentSection = this.playerData.currentSection
        if (givenSection > currentSection) {
            return 0 //locked
        }
        else if (givenSection < currentSection) {
            return 1 //unlocked
        }
        else if (givenSection == currentSection) {
            return 2 //current
        }
    },

    checkLevelStatus(givenLevel) {
        var sectionConfig = require("sectionConfig")

        var temp = function() {
            for (var key in sectionConfig) {
                var levels = sectionConfig[key].levels
                for (var i in levels) {
                    if (givenLevel == levels[i]) {
                        return key
                    }
                }
            }

            return false
        }

        var belongedSection = temp()
        if (belongedSection != false) {
            belongedSection = parseInt(belongedSection)
        }
        else {
            return false // no such level
        }

        var sectionCheckResult = this.checkSectionStatus(belongedSection)
        switch(sectionCheckResult) {
            case 0:
                return 0 //locked 
            case 1: 
                return 1 //unlocked
            case 2:
                var currentLevel = this.playerData.currentLevel
                if (currentLevel == givenLevel) {
                    return 2 //current
                }
                
                for (var index in require("sectionConfig")[belongedSection].levels) {
                    var oneLevel = require("sectionConfig")[belongedSection].levels[index]
                    if (oneLevel == givenLevel) {
                        return 1
                    }

                    if (oneLevel == currentLevel) {
                        return 0
                    }
                }
        }
    },


    onClickChallengeButton() {
        this.challengeButton.getComponent(cc.Button).interactable = false
        if (this.physicalPowerForChallengeCost == 0) {
            this.enterLevelScene(this.selectedLevel)
            return
        }
        var temp = this.physicalPower - this.physicalPowerForChallengeCost
        if(temp < 0) {
            return
        }
        
        var msgObj =  require("networkMgr").makeMessageObj("dataModule","commitMessageTyp")
        msgObj.message.playerId = this.playerData.id
        msgObj.message.commitBody = {
            physicalPower: temp
        }
        var self = this
        msgObj.successCallBack = function(xhr) {
            var response = xhr.responseText
            response = JSON.parse(response)
            if (response.type == "commitSuccess") {
                self.playerData.physicalPower = temp
                self.physicalPower = temp

                self.enterLevelScene(self.selectedLevel)
            }
        }

        require("networkMgr").sendMessageByMsgObj(msgObj)
    },

    enterLevelScene(givenLevel) {
        cc.director.loadScene("level001")
    },

    onAllRetryFailed() {
        this.challengeButton.getComponent(cc.Button).interactable = true
    }
});
