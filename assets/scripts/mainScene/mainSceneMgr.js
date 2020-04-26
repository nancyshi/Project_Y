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
        sectionNameLabelNode: cc.Node,
        levelNodes: cc.Node,
        connectLineNodes: cc.Node,
        levelNodePrefab: cc.Prefab,
        levelNodesConnectLinePrefab: cc.Prefab,
        selectedSection: null,
        physicalLabelNode: cc.Node,
        heartLabelNode: cc.Node,
        mailSysButtonNode: cc.Node,
        signInSysButtonNode: cc.Node,
        welfarySysButtonNode: cc.Node,
        addHeartButtonNode: cc.Node,
        addPhysicalPowerButtonNode: cc.Node,
        selectSectionButtonNode: cc.Node,
        levelNodeStartPosition: cc.v2(0,0),
        levelNodesHorDis: 10,
        levelNodesVerDis: 20,
        levelNodesNumPerLine: 4,

        rotaedCopiedRadius: 300,
        isShowingNoti: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.setupData()
        this.setupUI()
        //require("gameMgr")._generateLevelSceneConfig()
    },

    start () {
        
        //require("systemsMgr").showSystem("storySys",9001,2)
        var storyId = require("dataMgr").playerData.storySysId
        if (storyId != -1) {
            require("systemsMgr").showSystem("storySys",storyId,2)
        }
        this.playBgm()
    },
    playBgm(){
        var self = this
        var path = require("sectionConfig")[this.selectedSection].bgmPath
        cc.loader.loadRes(path,function(err,res){
            cc.audioEngine.stopAll()
            cc.audioEngine.play(res,true,1)
        })
    },
    setupUI() {
        this.heartLabelNode.getComponent(cc.Label).string = require("dataMgr").playerData.heart.toString()
        this.physicalLabelNode.getComponent(cc.Label).string = require("dataMgr").playerData.physicalPower.toString()
        var systemsMgr = require("systemsMgr")
        this.mailSysButtonNode.on("click",function(){
            systemsMgr.showSystem("mailSys")
        })
        this.mailSysButtonNode.getComponent("redPointMgr").redPointShowCondition = function() {
            var mails = require("dataMgr").playerData.mails
            var unReadNum = 0
            for (var key in mails) {
                var oneMail = mails[key]
                if (oneMail.status == 0) {
                    unReadNum += 1
                }
            }
            if (unReadNum > 0) {
                return true
            }
            else {
                return false
            }
        }


        this.signInSysButtonNode.on("click",function(){
            systemsMgr.showSystem("signInSys")
        })
        this.signInSysButtonNode.getComponent("redPointMgr").redPointShowCondition = function() {
            var signInStatus = require("dataMgr").playerData.signInStatus
            switch(signInStatus) {
                case 1:
                    return true
                case 2:
                    return true
                default:
                    return false
            }
        }

        this.addPhysicalPowerButtonNode.on("click",function(){
            systemsMgr.showSystem("addPropertyNumSys",1)
        })
        this.addHeartButtonNode.on("click",function(){
            systemsMgr.showSystem("addPropertyNumSys",2)
        })

        var flag = require("dataMgr").playerData.initAdWatchedFlag
        if (flag == 1) {
            this.welfarySysButtonNode.active = false
        }
        else {
            cc.tween(this.welfarySysButtonNode)
                .repeatForever(cc.tween()
                    .to(0.3,{angle: -45})
                    .to(0.3,{angle: 0})
                    .to(0.3,{angle: 45})
                    .to(0.3,{angle: 0})
                    .delay(1)
                )
                .start()
            
            this.welfarySysButtonNode.on("click",function(){
                systemsMgr.showSystem("welfarySys")
            })
        }

        this.selectSectionButtonNode.on("click",function(){
            systemsMgr.showSystem("selectSectionSys")
        })

        this.setupSectionPerformance()
    },

    setupData() {
        this.selectedSection = require("dataMgr").playerData.currentSection
    },

    setupSectionPerformance() {
        if (this.selectedSection == null) {
            cc.log("not selected one section, can not setup section of mainScene mgr")
            return
        }
        var textConfig = require("textConfig")
        this.levelNodes.destroyAllChildren()
        this.levelNodes.removeAllChildren()
        this.connectLineNodes.destroyAllChildren()
        this.connectLineNodes.removeAllChildren()
        var sectionConfig = require("sectionConfig")
        var config = sectionConfig[this.selectedSection]
        var sectionTitle = textConfig.getTextByIdAndLanguageType(config.sectionTitleTextId)
        var sectionDes = textConfig.getTextByIdAndLanguageType(config.sectionDescripTextId)
        var showText = sectionTitle + " " + sectionDes
        this.sectionNameLabelNode.getComponent(cc.Label).string = showText

        var levels = config.levels
        for (var index in levels) {
            var oneLevel = levels[index]
            var oneLevelNode = cc.instantiate(this.levelNodePrefab)
            var mgr = oneLevelNode.getComponent("levelNodeMgr")
            mgr.level = oneLevel
            mgr.levelNumLabelNode.getComponent(cc.Label).string = (parseInt(index) + 1).toString()
            mgr.status = this._checkLevelStatus(oneLevel)
            mgr.delegate = this
            this._setupLevelNodePosition(oneLevelNode,index)
            this.levelNodes.addChild(oneLevelNode)
        }

        for (var index in this.levelNodes.children){
            if (index == 0) {
                continue
            }
            var oneNode = this.levelNodes.children[index]
            var preNode = this.levelNodes.children[(index - 1)]
            var connectLine = cc.instantiate(this.levelNodesConnectLinePrefab)
            var v = cc.v2(preNode.x - oneNode.x, preNode.y - oneNode.y)
            connectLine.width = v.mag()
            var degree= v.signAngle(cc.v2(1,0)) / Math.PI * 180
            connectLine.angle = -degree
            var result = this._getMidPointOfTwoPoints(oneNode.position, preNode.position)
            connectLine.x = result.x
            connectLine.y = result.y
            this.connectLineNodes.addChild(connectLine)
        }
    },
    _setupLevelNodePosition(givenNode, givenIndex) {
        var sectionConfig = require("sectionConfig")[this.selectedSection]
        var levelNodePositions = sectionConfig.levelNodePositions
        if (levelNodePositions == null || levelNodePositions.length == 0) {
            //lined

            // var rowIndex = givenIndex % this.levelNodesNumPerLine
            // var colIndex = Math.floor(givenIndex / this.levelNodesNumPerLine)

            // var maxX = this.levelNodeStartPosition.x + this.levelNodesHorDis * (this.levelNodesNumPerLine - 1)
            // if (colIndex % 2 == 0) {
            //     givenNode.x = this.levelNodeStartPosition.x + rowIndex * this.levelNodesHorDis
            // }
            // else {
            //     givenNode.x = maxX - rowIndex * this.levelNodesHorDis
            // }
            // givenNode.y = this.levelNodeStartPosition.y + colIndex * this.levelNodesVerDis
            
            // var levelNodeStart = this.node.getChildByName("sectionNameLabel").getChildByName("levelNodeStart")
            // givenNode.x = levelNodeStart.x
            
            // givenNode.y = levelNodeStart.y + givenIndex * this.levelNodesVerDis

            //rotated copied
            var nodesNum = sectionConfig.levels.length
            var angle = 2 * Math.PI / nodesNum
            var baseVector = cc.v2(this.rotaedCopiedRadius,0)
            var v = baseVector.rotate(-givenIndex * angle)
            givenNode.x = v.x
            givenNode.y = v.y
        }
        else {
            givenNode.x = levelNodePositions[givenIndex].x
            givenNode.y = levelNodePositions[givenIndex].y
        }
    },

    _getMidPointOfTwoPoints(point1,point2) {
        var v = cc.v2(point2.x - point1.x, point2.y - point1.y)
        var x = point1.x + v.x / 2
        var y = point1.y + v.y / 2
        return cc.v2(x,y)
    },


    _checkSectionStatus(givenSection) {
        var currentSection = require("dataMgr").playerData.currentSection
        if (typeof givenSection !== "number") {
            givenSection = parseInt(givenSection)
        }
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

    _checkLevelStatus(givneLevel) {
        var sectionKey = this._getSectionKeyByLevel(givneLevel)
        if (sectionKey == false) {
            return false //no such level
        }
       
        var sectionStatus = this._checkSectionStatus(sectionKey)
        switch(sectionStatus) {
            case 0:
                return 0 //locked
            case 1:
                return 1 //unlocked
            case 2:
                var currentLevel = require("dataMgr").playerData.currentLevel
                if (currentLevel == givneLevel) {
                    return 2 //current
                }

                var sectionConfig = require("sectionConfig")[sectionKey]
                var levelsArry = sectionConfig.levels
                if (levelsArry.indexOf(givneLevel) > levelsArry.indexOf(currentLevel)) {
                    return 0 //locked
                }
                return 1 //unlocked
        }
    },
    _getSectionKeyByLevel(givenLevel) {
        var levelId = parseInt(givenLevel)
        var sectionConfig = require("sectionConfig")
        for (var key in sectionConfig) {
            var oneConfig = sectionConfig[key]
            var levelsConfig = oneConfig.levels
            if (levelsConfig.indexOf(levelId) != -1) {
                return key
            }
        }

        return false
    },


    dataMonitored(key,value) {
        if (key == "physicalPower") {
            this.physicalLabelNode.getComponent(cc.Label).string = value.toString()
        }
        else if (key == "heart") {
            this.heartLabelNode.getComponent(cc.Label).string = value.toString()
        }
        for(var index in this.levelNodes.children) {
            var oneMgr = this.levelNodes.children[index].getComponent("levelNodeMgr")
            oneMgr.dataMonitored(key,value)
        }
    },

    update (dt) {
        var notificationMgr = require("notificationMgr")
        var notiArry = notificationMgr.noties
        if (notiArry.length > 0 && this.isShowingNoti == false) {
            this.isShowingNoti = true
            var self = this
            var temp = function() {
                if (notiArry.length == 0) {
                    self.isShowingNoti = false
                    return
                }

                var oneStr = notiArry[0]
                notificationMgr.showNoti(oneStr)
                notiArry.splice(0,1)
                cc.tween(self.node)
                    .delay(0.3)
                    .call(function(){
                        temp()
                    })
            }

            temp()
        }
    },
});
