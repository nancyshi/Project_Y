(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/_mainSceneMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c5bd2cNtixMsrSjayquVQFU', '_mainSceneMgr', __filename);
// scripts/_mainSceneMgr.js

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
        playerData: null,
        levelsStartPosition: cc.v2(0, 0),
        levelsHorDis: 60,
        levelsVerDis: 60,
        levelsHorNum: 5,
        levelNodePrefab: cc.Prefab,
        lockedLevelColor: cc.color,
        unlockedLevelColor: cc.color,
        currentLevelColor: cc.color,

        physicalPower: {
            get: function get() {
                return this._physicalPower;
            },
            set: function set(value) {
                this._physicalPower = value;
                this.node.getChildByName("physicalPowerLabel").getComponent(cc.Label).string = this.playerData.physicalPower.toString();
            }
        },

        // maxPhysicalPower: {
        //     get() {
        //         return this._maxPhysicalPower
        //     },
        //     set(value) {
        //         this._maxPhysicalPower = value
        //     }
        // },

        physicalPowerForChallengeCost: {
            get: function get() {
                return this._physicalPowerForChallengeCost;
            },
            set: function set(value) {
                this._physicalPowerForChallengeCost = value;
                var physicalPowerLabel = this.challengeButton.getChildByName("physicalPowerLabel");
                var commentLabel = cc.find("Canvas/commentLabel");
                var physicalPowerIcon = this.challengeButton.getChildByName("physicalPower");
                if (value == null) {
                    physicalPowerIcon.active = false;
                    physicalPowerLabel.active = false;
                } else {
                    physicalPowerIcon.active = true;
                    physicalPowerLabel.active = true;

                    physicalPowerLabel.getComponent(cc.Label).string = value.toString();
                    if (value <= this.physicalPower) {
                        this.challengeButton.getComponent(cc.Button).interactable = true;
                        if (value == 0) {
                            commentLabel.getComponent(cc.Label).string = "已挑战过的关卡不会消耗体力";
                        } else {
                            commentLabel.getComponent(cc.Label).string = "每天挑战每个新的关卡时会消耗体力";
                        }
                    } else {
                        this.challengeButton.getComponent(cc.Button).interactable = false;
                        commentLabel.getComponent(cc.Label).string = "每天挑战每个新的关卡时会消耗体力";
                    }
                }
            }
        },

        heartForChallengeCost: {
            get: function get() {
                return this._heartForChallengeCost;
            },
            set: function set(value) {
                this._heartForChallengeCost = value;
                var heartLabel = this.challengeButton.getChildByName("heartLabel");
                var heartIcon = this.challengeButton.getChildByName("heart");
                if (value == null) {
                    heartLabel.active = false;
                    heartIcon.active = false;
                } else {
                    heartLabel.active = true;
                    heartIcon.active = true;

                    heartLabel.getComponent(cc.Label).string = value.toString();
                    if (value <= this.heart) {
                        this.challengeButton.getComponent(cc.Button).interactable = true;
                    } else {
                        this.challengeButton.getComponent(cc.Button).interactable = false;
                    }
                }
            }
        },

        selectedLevel: {
            get: function get() {
                return this._selectedLevel;
            },
            set: function set(value) {
                this._selectedLevel = value;
                if (value != null) {
                    if (value == this.playerData.currentLevel && this.playerData.physicalPowerCostedFlag == 0) {
                        this.heartForChallengeCost = null;
                        var temp = require("levelConfig")[value].physicalPowerCost;
                        if (this.playerData.initAdWatchedFlag == 1) {
                            temp = Math.round(temp / 2);
                        }
                        this.physicalPowerForChallengeCost = temp;
                    } else if (value == this.playerData.currentLevel && this.playerData.physicalPowerCostedFlag == 1) {
                        this.physicalPowerForChallengeCost = null;
                        this.heartForChallengeCost = require("levelConfig")[value].heartForRetryCost;
                    } else {
                        this.heartForChallengeCost = null;
                        this.physicalPowerForChallengeCost = 0;
                    }
                    if (this.levelAresNodes[value] != null) {
                        this.selectedLevelAreaNode = this.levelAresNodes[value];
                    }
                }
            }
        },

        selectedLevelAreaNode: {
            get: function get() {
                return this._selectedLevelAreaNode;
            },
            set: function set(value) {
                this._selectedLevelAreaNode = value;
                if (value != null) {
                    if (this.selectedEffect.active == false) {
                        this.selectedEffect.x = this.selectedLevelAreaNode.x;
                        this.selectedEffect.y = this.selectedLevelAreaNode.y;
                        this.selectedEffect.active = true;
                    } else {
                        cc.tween(this.selectedEffect).to(0.2, { x: this.selectedLevelAreaNode.x, y: this.selectedLevelAreaNode.y }).start();
                    }
                } else {
                    this.selectedEffect.active = false;
                }
            }
        },

        selectedEffect: cc.Node,
        levelAresNodes: {
            default: {}
        },

        challengeButton: null,
        heartLabel: cc.Label,
        heart: {
            get: function get() {
                return this._heart;
            },
            set: function set(value) {
                this._heart = value;
                this.heartLabel.string = value.toString();
            }
        }
        // maxHeart: null

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.playerData = require("dataMgr").playerData;
        this.lockedLevelColor = cc.color(191, 191, 191);
        this.unlockedLevelColor = cc.color(102, 102, 102);
        this.currentLevelColor = cc.color(188, 36, 36);
        this.challengeButton = this.node.getChildByName("challengeButton");
        this.playerName = this.playerData.name;
        this.physicalPower = this.playerData.physicalPower;
        this.heart = this.playerData.heart;

        require("networkMgr").delegate = this;

        var signInButton = this.node.getChildByName("signInButton");
        signInButton.on("click", function () {
            require("systemsMgr").showSystem("signInSys");
        });
        signInButton.getComponent("redPointMgr").redPointShowCondition = function () {
            var signInStatus = require("dataMgr").playerData.signInStatus;
            switch (signInStatus) {
                case 1:
                    return true;
                case 2:
                    return true;
                default:
                    return false;
            }
        };

        var welfaryButton = this.node.getChildByName("welfaryButton");
        if (require("dataMgr").playerData.initAdWatchedFlag == 1) {
            welfaryButton.active = false;
        } else {
            welfaryButton.on("click", function () {
                require("systemsMgr").showSystem("welfarySys");
            });
            cc.tween(welfaryButton).repeatForever(cc.tween().to(0.3, { angle: -45 }).to(0.3, { angle: 0 }).to(0.3, { angle: 45 }).to(0.3, { angle: 0 }).delay(1)).start();
        }

        var addHeartButton = this.node.getChildByName("addButton_heart");
        addHeartButton.on("click", function () {
            require("systemsMgr").showSystem("addPropertyNumSys", 2);
        });

        var addPhysicalPowerButton = this.node.getChildByName("addButton_phy");
        addPhysicalPowerButton.on("click", function () {
            require("systemsMgr").showSystem("addPropertyNumSys", 1);
        });

        var mailButton = this.node.getChildByName("mailButton");
        mailButton.on("click", function () {
            require("systemsMgr").showSystem("mailSys");
        });
        mailButton.getComponent("redPointMgr").redPointShowCondition = function () {
            var mails = require("dataMgr").playerData.mails;
            var unReadNum = 0;
            for (var key in mails) {
                var oneMail = mails[key];
                if (oneMail.status == 0) {
                    unReadNum += 1;
                }
            }
            if (unReadNum > 0) {
                return true;
            } else {
                return false;
            }
        };

        this.setupSection(this.playerData.currentSection);
    },
    start: function start() {},
    setupSection: function setupSection(givenSection) {
        var complete = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        this.selectedLevel = null;

        var sectionConfig = require("sectionConfig");
        var config = sectionConfig[givenSection];

        this.node.getChildByName("sectionTitleLabel").getComponent(cc.Label).string = config.sectionTitle;
        this.node.getChildByName("sectionDescripLabel").getComponent(cc.Label).string = config.sectionDescrip;

        var levels = config.levels;
        this.levelAresNodes = {};
        for (var index in levels) {
            var strForShow = parseInt(index) + 1;
            strForShow = strForShow.toString();
            if (strForShow.length == 1) {
                strForShow = "0" + strForShow;
            }

            var node = cc.instantiate(this.levelNodePrefab);
            var label = node.getComponent(cc.Label);
            label.string = strForShow;

            node.x = index % this.levelsHorNum * (this.levelsHorDis + node.width) + this.levelsStartPosition.x;
            node.y = -Math.floor(index / this.levelsHorNum) * (this.levelsVerDis + node.width) + this.levelsStartPosition.y;

            var status = this.checkLevelStatus(levels[index]);
            switch (status) {
                case 0:
                    node.color = this.lockedLevelColor;
                    break;
                case 1:
                    node.color = this.unlockedLevelColor;
                    break;
                case 2:
                    node.color = this.currentLevelColor;
                    break;
            }
            node.getComponent("levelAreaNodeMgr").delegate = this;
            node.getComponent("levelAreaNodeMgr").level = levels[index];
            this.levelAresNodes[levels[index]] = node;
            cc.find("Canvas/levelsArea").addChild(node);
        }
        var url = config.backgroundPath;
        var self = this;
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, res) {
            self.node.getChildByName("sectionBg").getComponent(cc.Sprite).spriteFrame = res;
            complete();
        });

        if (givenSection == this.playerData.currentSection) {
            this.selectedLevel = this.playerData.currentLevel;
        }
    },
    checkSectionStatus: function checkSectionStatus(givenSection) {
        var currentSection = this.playerData.currentSection;
        if (givenSection > currentSection) {
            return 0; //locked
        } else if (givenSection < currentSection) {
            return 1; //unlocked
        } else if (givenSection == currentSection) {
            return 2; //current
        }
    },
    checkLevelStatus: function checkLevelStatus(givenLevel) {
        var sectionConfig = require("sectionConfig");

        var temp = function temp() {
            for (var key in sectionConfig) {
                var levels = sectionConfig[key].levels;
                for (var i in levels) {
                    if (givenLevel == levels[i]) {
                        return key;
                    }
                }
            }

            return false;
        };

        var belongedSection = temp();
        if (belongedSection != false) {
            belongedSection = parseInt(belongedSection);
        } else {
            return false; // no such level
        }

        var sectionCheckResult = this.checkSectionStatus(belongedSection);
        switch (sectionCheckResult) {
            case 0:
                return 0; //locked 
            case 1:
                return 1; //unlocked
            case 2:
                var currentLevel = this.playerData.currentLevel;
                if (currentLevel == givenLevel) {
                    return 2; //current
                }

                for (var index in require("sectionConfig")[belongedSection].levels) {
                    var oneLevel = require("sectionConfig")[belongedSection].levels[index];
                    if (oneLevel == givenLevel) {
                        return 1;
                    }

                    if (oneLevel == currentLevel) {
                        return 0;
                    }
                }
        }
    },
    onClickChallengeButton: function onClickChallengeButton() {
        var gameMgr = require("gameMgr");
        this.challengeButton.getComponent(cc.Button).interactable = false;
        if (this.physicalPowerForChallengeCost == 0) {
            gameMgr.enterLevelScene(this.selectedLevel);
            return;
        }

        var temp = null;
        var commitBody = null;
        if (this.physicalPowerForChallengeCost != null) {
            temp = this.playerData.physicalPower - this.physicalPowerForChallengeCost;
            if (temp < 0) {
                return;
            }
            var flagValue = this.playerData.physicalPowerCostedFlag;
            if (this.selectedLevel == this.playerData.currentLevel && this.playerData.physicalPowerCostedFlag == 0) {
                flagValue = 1;
            }
            commitBody = {
                physicalPower: temp,
                physicalPowerCostedFlag: flagValue
            };
        }

        if (this.heartForChallengeCost != null) {
            temp = this.playerData.heart - this.heartForChallengeCost;
            if (temp < 0) {
                return;
            }
            commitBody = {
                heart: temp
            };
        }

        var self = this;
        var successCallBack = function successCallBack() {
            if (self.physicalPowerForChallengeCost != null) {
                self.playerData.physicalPower = temp;
                self.playerData.physicalPowerCostedFlag = flagValue;
            }

            if (self.heartForChallengeCost != null) {
                self.playerData.heart = temp;
            }

            gameMgr.enterLevelScene(self.selectedLevel);
        };

        require("dataMgr").commitPlayerDataToServer(commitBody, successCallBack);
    },
    onAllRetryFailed: function onAllRetryFailed() {
        this.challengeButton.getComponent(cc.Button).interactable = true;
    },
    dataMonitored: function dataMonitored(key, value) {
        if (key == "physicalPower") {
            this.physicalPower = value;
        } else if (key == "heart") {
            this.heart = value;
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=_mainSceneMgr.js.map
        