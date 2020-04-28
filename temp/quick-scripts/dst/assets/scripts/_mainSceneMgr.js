
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/_mainSceneMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c5bd2cNtixMsrSjayquVQFU', '_mainSceneMgr');
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
  "extends": cc.Component,
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
            cc.tween(this.selectedEffect).to(0.2, {
              x: this.selectedLevelAreaNode.x,
              y: this.selectedLevelAreaNode.y
            }).start();
          }
        } else {
          this.selectedEffect.active = false;
        }
      }
    },
    selectedEffect: cc.Node,
    levelAresNodes: {
      "default": {}
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
    } // maxHeart: null

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
      cc.tween(welfaryButton).repeatForever(cc.tween().to(0.3, {
        angle: -45
      }).to(0.3, {
        angle: 0
      }).to(0.3, {
        angle: 45
      }).to(0.3, {
        angle: 0
      }).delay(1)).start();
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
        return 0;
      //locked 

      case 1:
        return 1;
      //unlocked

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
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL19tYWluU2NlbmVNZ3IuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJwbGF5ZXJEYXRhIiwibGV2ZWxzU3RhcnRQb3NpdGlvbiIsInYyIiwibGV2ZWxzSG9yRGlzIiwibGV2ZWxzVmVyRGlzIiwibGV2ZWxzSG9yTnVtIiwibGV2ZWxOb2RlUHJlZmFiIiwiUHJlZmFiIiwibG9ja2VkTGV2ZWxDb2xvciIsImNvbG9yIiwidW5sb2NrZWRMZXZlbENvbG9yIiwiY3VycmVudExldmVsQ29sb3IiLCJwaHlzaWNhbFBvd2VyIiwiZ2V0IiwiX3BoeXNpY2FsUG93ZXIiLCJzZXQiLCJ2YWx1ZSIsIm5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsImdldENvbXBvbmVudCIsIkxhYmVsIiwic3RyaW5nIiwidG9TdHJpbmciLCJwaHlzaWNhbFBvd2VyRm9yQ2hhbGxlbmdlQ29zdCIsIl9waHlzaWNhbFBvd2VyRm9yQ2hhbGxlbmdlQ29zdCIsInBoeXNpY2FsUG93ZXJMYWJlbCIsImNoYWxsZW5nZUJ1dHRvbiIsImNvbW1lbnRMYWJlbCIsImZpbmQiLCJwaHlzaWNhbFBvd2VySWNvbiIsImFjdGl2ZSIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsImhlYXJ0Rm9yQ2hhbGxlbmdlQ29zdCIsIl9oZWFydEZvckNoYWxsZW5nZUNvc3QiLCJoZWFydExhYmVsIiwiaGVhcnRJY29uIiwiaGVhcnQiLCJzZWxlY3RlZExldmVsIiwiX3NlbGVjdGVkTGV2ZWwiLCJjdXJyZW50TGV2ZWwiLCJwaHlzaWNhbFBvd2VyQ29zdGVkRmxhZyIsInRlbXAiLCJyZXF1aXJlIiwicGh5c2ljYWxQb3dlckNvc3QiLCJpbml0QWRXYXRjaGVkRmxhZyIsIk1hdGgiLCJyb3VuZCIsImhlYXJ0Rm9yUmV0cnlDb3N0IiwibGV2ZWxBcmVzTm9kZXMiLCJzZWxlY3RlZExldmVsQXJlYU5vZGUiLCJfc2VsZWN0ZWRMZXZlbEFyZWFOb2RlIiwic2VsZWN0ZWRFZmZlY3QiLCJ4IiwieSIsInR3ZWVuIiwidG8iLCJzdGFydCIsIk5vZGUiLCJfaGVhcnQiLCJvbkxvYWQiLCJwbGF5ZXJOYW1lIiwibmFtZSIsImRlbGVnYXRlIiwic2lnbkluQnV0dG9uIiwib24iLCJzaG93U3lzdGVtIiwicmVkUG9pbnRTaG93Q29uZGl0aW9uIiwic2lnbkluU3RhdHVzIiwid2VsZmFyeUJ1dHRvbiIsInJlcGVhdEZvcmV2ZXIiLCJhbmdsZSIsImRlbGF5IiwiYWRkSGVhcnRCdXR0b24iLCJhZGRQaHlzaWNhbFBvd2VyQnV0dG9uIiwibWFpbEJ1dHRvbiIsIm1haWxzIiwidW5SZWFkTnVtIiwia2V5Iiwib25lTWFpbCIsInN0YXR1cyIsInNldHVwU2VjdGlvbiIsImN1cnJlbnRTZWN0aW9uIiwiZ2l2ZW5TZWN0aW9uIiwiY29tcGxldGUiLCJzZWN0aW9uQ29uZmlnIiwiY29uZmlnIiwic2VjdGlvblRpdGxlIiwic2VjdGlvbkRlc2NyaXAiLCJsZXZlbHMiLCJpbmRleCIsInN0ckZvclNob3ciLCJwYXJzZUludCIsImxlbmd0aCIsImluc3RhbnRpYXRlIiwibGFiZWwiLCJ3aWR0aCIsImZsb29yIiwiY2hlY2tMZXZlbFN0YXR1cyIsImxldmVsIiwiYWRkQ2hpbGQiLCJ1cmwiLCJiYWNrZ3JvdW5kUGF0aCIsInNlbGYiLCJsb2FkZXIiLCJsb2FkUmVzIiwiU3ByaXRlRnJhbWUiLCJlcnIiLCJyZXMiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsImNoZWNrU2VjdGlvblN0YXR1cyIsImdpdmVuTGV2ZWwiLCJpIiwiYmVsb25nZWRTZWN0aW9uIiwic2VjdGlvbkNoZWNrUmVzdWx0Iiwib25lTGV2ZWwiLCJvbkNsaWNrQ2hhbGxlbmdlQnV0dG9uIiwiZ2FtZU1nciIsImVudGVyTGV2ZWxTY2VuZSIsImNvbW1pdEJvZHkiLCJmbGFnVmFsdWUiLCJzdWNjZXNzQ2FsbEJhY2siLCJjb21taXRQbGF5ZXJEYXRhVG9TZXJ2ZXIiLCJvbkFsbFJldHJ5RmFpbGVkIiwiZGF0YU1vbml0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QkFBTCxJQUFzQyxJQUExQyxFQUFnRDtBQUM1Q2dGLFFBQUFBLElBQUksQ0FBQ3ZHLFVBQUwsQ0FBZ0JZLGFBQWhCLEdBQWdDOEIsSUFBaEM7QUFDQTZELFFBQUFBLElBQUksQ0FBQ3ZHLFVBQUwsQ0FBZ0J5Qyx1QkFBaEIsR0FBMENnRixTQUExQztBQUNIOztBQUVELFVBQUlsQixJQUFJLENBQUN0RSxxQkFBTCxJQUE4QixJQUFsQyxFQUF3QztBQUNwQ3NFLFFBQUFBLElBQUksQ0FBQ3ZHLFVBQUwsQ0FBZ0JxQyxLQUFoQixHQUF3QkssSUFBeEI7QUFDSDs7QUFFRDRFLE1BQUFBLE9BQU8sQ0FBQ0MsZUFBUixDQUF3QmhCLElBQUksQ0FBQ2pFLGFBQTdCO0FBQ0gsS0FYRDs7QUFjQUssSUFBQUEsT0FBTyxDQUFDLFNBQUQsQ0FBUCxDQUFtQmdGLHdCQUFuQixDQUE0Q0gsVUFBNUMsRUFBdURFLGVBQXZEO0FBQ0gsR0F6Ykk7QUE0YkxFLEVBQUFBLGdCQTViSyw4QkE0YmM7QUFDZixTQUFLbEcsZUFBTCxDQUFxQlAsWUFBckIsQ0FBa0N2QixFQUFFLENBQUNtQyxNQUFyQyxFQUE2Q0MsWUFBN0MsR0FBNEQsSUFBNUQ7QUFDSCxHQTliSTtBQWdjTDZGLEVBQUFBLGFBaGNLLHlCQWdjUy9DLEdBaGNULEVBZ2NhOUQsS0FoY2IsRUFnY29CO0FBQ3JCLFFBQUk4RCxHQUFHLElBQUksZUFBWCxFQUE0QjtBQUN4QixXQUFLbEUsYUFBTCxHQUFxQkksS0FBckI7QUFDSCxLQUZELE1BR0ssSUFBSThELEdBQUcsSUFBSSxPQUFYLEVBQW9CO0FBQ3JCLFdBQUt6QyxLQUFMLEdBQWFyQixLQUFiO0FBQ0g7QUFDSjtBQXZjSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cHM6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgICAgIHBsYXllckRhdGE6IG51bGwsXG4gICAgICAgIGxldmVsc1N0YXJ0UG9zaXRpb246IGNjLnYyKDAsMCksXG4gICAgICAgIGxldmVsc0hvckRpczogNjAsXG4gICAgICAgIGxldmVsc1ZlckRpczogNjAsXG4gICAgICAgIGxldmVsc0hvck51bTogNSxcbiAgICAgICAgbGV2ZWxOb2RlUHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGxvY2tlZExldmVsQ29sb3I6IGNjLmNvbG9yLFxuICAgICAgICB1bmxvY2tlZExldmVsQ29sb3I6IGNjLmNvbG9yLFxuICAgICAgICBjdXJyZW50TGV2ZWxDb2xvcjogY2MuY29sb3IsXG5cbiAgICAgICAgcGh5c2ljYWxQb3dlcjoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9waHlzaWNhbFBvd2VyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGh5c2ljYWxQb3dlciA9IHZhbHVlXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGh5c2ljYWxQb3dlckxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5wbGF5ZXJEYXRhLnBoeXNpY2FsUG93ZXIudG9TdHJpbmcoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIG1heFBoeXNpY2FsUG93ZXI6IHtcbiAgICAgICAgLy8gICAgIGdldCgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fbWF4UGh5c2ljYWxQb3dlclxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX21heFBoeXNpY2FsUG93ZXIgPSB2YWx1ZVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuXG4gICAgICAgIHBoeXNpY2FsUG93ZXJGb3JDaGFsbGVuZ2VDb3N0OiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BoeXNpY2FsUG93ZXJGb3JDaGFsbGVuZ2VDb3N0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGh5c2ljYWxQb3dlckZvckNoYWxsZW5nZUNvc3QgPSB2YWx1ZVxuICAgICAgICAgICAgICAgIHZhciBwaHlzaWNhbFBvd2VyTGFiZWwgPSB0aGlzLmNoYWxsZW5nZUJ1dHRvbi5nZXRDaGlsZEJ5TmFtZShcInBoeXNpY2FsUG93ZXJMYWJlbFwiKVxuICAgICAgICAgICAgICAgIHZhciBjb21tZW50TGFiZWwgPSBjYy5maW5kKFwiQ2FudmFzL2NvbW1lbnRMYWJlbFwiKVxuICAgICAgICAgICAgICAgIHZhciBwaHlzaWNhbFBvd2VySWNvbiA9IHRoaXMuY2hhbGxlbmdlQnV0dG9uLmdldENoaWxkQnlOYW1lKFwicGh5c2ljYWxQb3dlclwiKVxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBoeXNpY2FsUG93ZXJJY29uLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIHBoeXNpY2FsUG93ZXJMYWJlbC5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGh5c2ljYWxQb3dlckljb24uYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBwaHlzaWNhbFBvd2VyTGFiZWwuYWN0aXZlID0gdHJ1ZVxuXG4gICAgICAgICAgICAgICAgICAgIHBoeXNpY2FsUG93ZXJMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHZhbHVlLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlIDw9IHRoaXMucGh5c2ljYWxQb3dlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFsbGVuZ2VCdXR0b24uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50TGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuW3suaMkeaImOi/h+eahOWFs+WNoeS4jeS8mua2iOiAl+S9k+WKm1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50TGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuavj+WkqeaMkeaImOavj+S4quaWsOeahOWFs+WNoeaXtuS8mua2iOiAl+S9k+WKm1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYWxsZW5nZUJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudExhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLmr4/lpKnmjJHmiJjmr4/kuKrmlrDnmoTlhbPljaHml7bkvJrmtojogJfkvZPliptcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGhlYXJ0Rm9yQ2hhbGxlbmdlQ29zdDoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZWFydEZvckNoYWxsZW5nZUNvc3RcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWFydEZvckNoYWxsZW5nZUNvc3QgPSB2YWx1ZVxuICAgICAgICAgICAgICAgIHZhciBoZWFydExhYmVsID0gdGhpcy5jaGFsbGVuZ2VCdXR0b24uZ2V0Q2hpbGRCeU5hbWUoXCJoZWFydExhYmVsXCIpXG4gICAgICAgICAgICAgICAgdmFyIGhlYXJ0SWNvbiA9IHRoaXMuY2hhbGxlbmdlQnV0dG9uLmdldENoaWxkQnlOYW1lKFwiaGVhcnRcIilcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBoZWFydExhYmVsLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIGhlYXJ0SWNvbi5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhcnRMYWJlbC5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIGhlYXJ0SWNvbi5hY3RpdmUgPSB0cnVlXG5cbiAgICAgICAgICAgICAgICAgICAgaGVhcnRMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHZhbHVlLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlIDw9IHRoaXMuaGVhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbGxlbmdlQnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbGxlbmdlQnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIFxuXG4gICAgICAgIHNlbGVjdGVkTGV2ZWw6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRMZXZlbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkTGV2ZWwgPSB2YWx1ZVxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSB0aGlzLnBsYXllckRhdGEuY3VycmVudExldmVsICYmIHRoaXMucGxheWVyRGF0YS5waHlzaWNhbFBvd2VyQ29zdGVkRmxhZyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYXJ0Rm9yQ2hhbGxlbmdlQ29zdCA9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gcmVxdWlyZShcImxldmVsQ29uZmlnXCIpW3ZhbHVlXS5waHlzaWNhbFBvd2VyQ29zdFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyRGF0YS5pbml0QWRXYXRjaGVkRmxhZyA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcCA9IE1hdGgucm91bmQodGVtcCAvIDIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBoeXNpY2FsUG93ZXJGb3JDaGFsbGVuZ2VDb3N0ID0gdGVtcFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlID09IHRoaXMucGxheWVyRGF0YS5jdXJyZW50TGV2ZWwgJiYgdGhpcy5wbGF5ZXJEYXRhLnBoeXNpY2FsUG93ZXJDb3N0ZWRGbGFnID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGh5c2ljYWxQb3dlckZvckNoYWxsZW5nZUNvc3QgPSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYXJ0Rm9yQ2hhbGxlbmdlQ29zdCA9IHJlcXVpcmUoXCJsZXZlbENvbmZpZ1wiKVt2YWx1ZV0uaGVhcnRGb3JSZXRyeUNvc3RcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFydEZvckNoYWxsZW5nZUNvc3QgPSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBoeXNpY2FsUG93ZXJGb3JDaGFsbGVuZ2VDb3N0ID0gMFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVsQXJlc05vZGVzW3ZhbHVlXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkTGV2ZWxBcmVhTm9kZSA9IHRoaXMubGV2ZWxBcmVzTm9kZXNbdmFsdWVdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2VsZWN0ZWRMZXZlbEFyZWFOb2RlOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkTGV2ZWxBcmVhTm9kZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkTGV2ZWxBcmVhTm9kZSA9IHZhbHVlXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRFZmZlY3QuYWN0aXZlID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRWZmZWN0LnggPSB0aGlzLnNlbGVjdGVkTGV2ZWxBcmVhTm9kZS54XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRWZmZWN0LnkgPSB0aGlzLnNlbGVjdGVkTGV2ZWxBcmVhTm9kZS55XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRWZmZWN0LmFjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuc2VsZWN0ZWRFZmZlY3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvKDAuMix7eDogdGhpcy5zZWxlY3RlZExldmVsQXJlYU5vZGUueCwgeTogdGhpcy5zZWxlY3RlZExldmVsQXJlYU5vZGUueX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEVmZmVjdC5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBzZWxlY3RlZEVmZmVjdDogY2MuTm9kZSxcbiAgICAgICAgbGV2ZWxBcmVzTm9kZXM6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHt9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hhbGxlbmdlQnV0dG9uOiBudWxsLFxuICAgICAgICBoZWFydExhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgaGVhcnQ6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faGVhcnRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWFydCA9IHZhbHVlXG4gICAgICAgICAgICAgICAgdGhpcy5oZWFydExhYmVsLnN0cmluZyA9IHZhbHVlLnRvU3RyaW5nKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8gbWF4SGVhcnQ6IG51bGxcblxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMucGxheWVyRGF0YSA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGFcbiAgICAgICAgdGhpcy5sb2NrZWRMZXZlbENvbG9yID0gY2MuY29sb3IoMTkxLDE5MSwxOTEpXG4gICAgICAgIHRoaXMudW5sb2NrZWRMZXZlbENvbG9yID0gY2MuY29sb3IoMTAyLDEwMiwxMDIpXG4gICAgICAgIHRoaXMuY3VycmVudExldmVsQ29sb3IgPSBjYy5jb2xvcigxODgsMzYsMzYpXG4gICAgICAgIHRoaXMuY2hhbGxlbmdlQnV0dG9uID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY2hhbGxlbmdlQnV0dG9uXCIpXG4gICAgICAgIHRoaXMucGxheWVyTmFtZSA9IHRoaXMucGxheWVyRGF0YS5uYW1lXG4gICAgICAgIHRoaXMucGh5c2ljYWxQb3dlciA9IHRoaXMucGxheWVyRGF0YS5waHlzaWNhbFBvd2VyXG4gICAgICAgIHRoaXMuaGVhcnQgPSB0aGlzLnBsYXllckRhdGEuaGVhcnRcbiAgICAgICBcbiAgICAgICAgcmVxdWlyZShcIm5ldHdvcmtNZ3JcIikuZGVsZWdhdGUgPSB0aGlzXG5cbiAgICAgICAgdmFyIHNpZ25JbkJ1dHRvbiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNpZ25JbkJ1dHRvblwiKVxuICAgICAgICBzaWduSW5CdXR0b24ub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXF1aXJlKFwic3lzdGVtc01nclwiKS5zaG93U3lzdGVtKFwic2lnbkluU3lzXCIpXG4gICAgICAgIH0pXG4gICAgICAgIHNpZ25JbkJ1dHRvbi5nZXRDb21wb25lbnQoXCJyZWRQb2ludE1nclwiKS5yZWRQb2ludFNob3dDb25kaXRpb24gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHNpZ25JblN0YXR1cyA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuc2lnbkluU3RhdHVzXG4gICAgICAgICAgICBzd2l0Y2goc2lnbkluU3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB3ZWxmYXJ5QnV0dG9uID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwid2VsZmFyeUJ1dHRvblwiKVxuICAgICAgICBpZiAocmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5pbml0QWRXYXRjaGVkRmxhZyA9PSAxKSB7XG4gICAgICAgICAgICB3ZWxmYXJ5QnV0dG9uLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3ZWxmYXJ5QnV0dG9uLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHJlcXVpcmUoXCJzeXN0ZW1zTWdyXCIpLnNob3dTeXN0ZW0oXCJ3ZWxmYXJ5U3lzXCIpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY2MudHdlZW4od2VsZmFyeUJ1dHRvbilcbiAgICAgICAgICAgICAgICAucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvKDAuMyx7YW5nbGU6IC00NX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAudG8oMC4zLHthbmdsZTogMH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAudG8oMC4zLHthbmdsZTogNDV9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvKDAuMyx7YW5nbGU6IDB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlbGF5KDEpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5zdGFydCgpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBhZGRIZWFydEJ1dHRvbiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImFkZEJ1dHRvbl9oZWFydFwiKVxuICAgICAgICBhZGRIZWFydEJ1dHRvbi5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJlcXVpcmUoXCJzeXN0ZW1zTWdyXCIpLnNob3dTeXN0ZW0oXCJhZGRQcm9wZXJ0eU51bVN5c1wiLDIpXG4gICAgICAgIH0pXG5cbiAgICAgICAgdmFyIGFkZFBoeXNpY2FsUG93ZXJCdXR0b24gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJhZGRCdXR0b25fcGh5XCIpXG4gICAgICAgIGFkZFBoeXNpY2FsUG93ZXJCdXR0b24ub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXF1aXJlKFwic3lzdGVtc01nclwiKS5zaG93U3lzdGVtKFwiYWRkUHJvcGVydHlOdW1TeXNcIiwxKVxuICAgICAgICB9KVxuXG4gICAgICAgIHZhciBtYWlsQnV0dG9uID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibWFpbEJ1dHRvblwiKVxuICAgICAgICBtYWlsQnV0dG9uLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmVxdWlyZShcInN5c3RlbXNNZ3JcIikuc2hvd1N5c3RlbShcIm1haWxTeXNcIilcbiAgICAgICAgfSlcbiAgICAgICAgbWFpbEJ1dHRvbi5nZXRDb21wb25lbnQoXCJyZWRQb2ludE1nclwiKS5yZWRQb2ludFNob3dDb25kaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBtYWlscyA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEubWFpbHNcbiAgICAgICAgICAgIHZhciB1blJlYWROdW0gPSAwXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gbWFpbHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgb25lTWFpbCA9IG1haWxzW2tleV1cbiAgICAgICAgICAgICAgICBpZiAob25lTWFpbC5zdGF0dXMgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB1blJlYWROdW0gKz0gMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh1blJlYWROdW0gPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXR1cFNlY3Rpb24odGhpcy5wbGF5ZXJEYXRhLmN1cnJlbnRTZWN0aW9uKVxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIFxuICAgIH0sXG5cbiAgICBzZXR1cFNlY3Rpb24oZ2l2ZW5TZWN0aW9uLCBjb21wbGV0ZSA9IGZ1bmN0aW9uKCl7fSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkTGV2ZWwgPSBudWxsXG4gICAgICAgIFxuICAgICAgICB2YXIgc2VjdGlvbkNvbmZpZyA9IHJlcXVpcmUoXCJzZWN0aW9uQ29uZmlnXCIpXG4gICAgICAgIHZhciBjb25maWcgPSBzZWN0aW9uQ29uZmlnW2dpdmVuU2VjdGlvbl1cblxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzZWN0aW9uVGl0bGVMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGNvbmZpZy5zZWN0aW9uVGl0bGVcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2VjdGlvbkRlc2NyaXBMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGNvbmZpZy5zZWN0aW9uRGVzY3JpcFxuICAgICAgICBcblxuICAgICAgICB2YXIgbGV2ZWxzID0gY29uZmlnLmxldmVsc1xuICAgICAgICB0aGlzLmxldmVsQXJlc05vZGVzID0ge31cbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gbGV2ZWxzKSB7XG4gICAgICAgICAgICB2YXIgc3RyRm9yU2hvdyA9IHBhcnNlSW50KGluZGV4KSArIDFcbiAgICAgICAgICAgIHN0ckZvclNob3cgPSBzdHJGb3JTaG93LnRvU3RyaW5nKClcbiAgICAgICAgICAgIGlmIChzdHJGb3JTaG93Lmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgc3RyRm9yU2hvdyA9IFwiMFwiICsgc3RyRm9yU2hvd1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGV2ZWxOb2RlUHJlZmFiKVxuICAgICAgICAgICAgdmFyIGxhYmVsID0gbm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXG4gICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBzdHJGb3JTaG93XG5cbiAgICAgICAgICAgIG5vZGUueCA9IChpbmRleCAlIHRoaXMubGV2ZWxzSG9yTnVtKSAqICh0aGlzLmxldmVsc0hvckRpcyArIG5vZGUud2lkdGgpICsgdGhpcy5sZXZlbHNTdGFydFBvc2l0aW9uLnhcbiAgICAgICAgICAgIG5vZGUueSA9IC1NYXRoLmZsb29yKGluZGV4IC8gdGhpcy5sZXZlbHNIb3JOdW0pICogKHRoaXMubGV2ZWxzVmVyRGlzICsgbm9kZS53aWR0aCkgKyB0aGlzLmxldmVsc1N0YXJ0UG9zaXRpb24ueVxuXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gdGhpcy5jaGVja0xldmVsU3RhdHVzKGxldmVsc1tpbmRleF0pXG4gICAgICAgICAgICBzd2l0Y2goc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBub2RlLmNvbG9yID0gdGhpcy5sb2NrZWRMZXZlbENvbG9yXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBub2RlLmNvbG9yID0gdGhpcy51bmxvY2tlZExldmVsQ29sb3JcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuY29sb3IgPSB0aGlzLmN1cnJlbnRMZXZlbENvbG9yXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcImxldmVsQXJlYU5vZGVNZ3JcIikuZGVsZWdhdGUgPSB0aGlzXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcImxldmVsQXJlYU5vZGVNZ3JcIikubGV2ZWwgPSBsZXZlbHNbaW5kZXhdXG4gICAgICAgICAgICB0aGlzLmxldmVsQXJlc05vZGVzW2xldmVsc1tpbmRleF1dID0gbm9kZVxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9sZXZlbHNBcmVhXCIpLmFkZENoaWxkKG5vZGUpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHVybCA9IGNvbmZpZy5iYWNrZ3JvdW5kUGF0aFxuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXModXJsLGNjLlNwcml0ZUZyYW1lLGZ1bmN0aW9uKGVycixyZXMpe1xuICAgICAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKFwic2VjdGlvbkJnXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gcmVzXG4gICAgICAgICAgICBjb21wbGV0ZSgpXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKGdpdmVuU2VjdGlvbiA9PSB0aGlzLnBsYXllckRhdGEuY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRMZXZlbCA9IHRoaXMucGxheWVyRGF0YS5jdXJyZW50TGV2ZWxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjaGVja1NlY3Rpb25TdGF0dXMoZ2l2ZW5TZWN0aW9uKSB7XG4gICAgICAgIHZhciBjdXJyZW50U2VjdGlvbiA9IHRoaXMucGxheWVyRGF0YS5jdXJyZW50U2VjdGlvblxuICAgICAgICBpZiAoZ2l2ZW5TZWN0aW9uID4gY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiAwIC8vbG9ja2VkXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZ2l2ZW5TZWN0aW9uIDwgY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiAxIC8vdW5sb2NrZWRcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChnaXZlblNlY3Rpb24gPT0gY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiAyIC8vY3VycmVudFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNoZWNrTGV2ZWxTdGF0dXMoZ2l2ZW5MZXZlbCkge1xuICAgICAgICB2YXIgc2VjdGlvbkNvbmZpZyA9IHJlcXVpcmUoXCJzZWN0aW9uQ29uZmlnXCIpXG5cbiAgICAgICAgdmFyIHRlbXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBzZWN0aW9uQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxldmVscyA9IHNlY3Rpb25Db25maWdba2V5XS5sZXZlbHNcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIGxldmVscykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ2l2ZW5MZXZlbCA9PSBsZXZlbHNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYmVsb25nZWRTZWN0aW9uID0gdGVtcCgpXG4gICAgICAgIGlmIChiZWxvbmdlZFNlY3Rpb24gIT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGJlbG9uZ2VkU2VjdGlvbiA9IHBhcnNlSW50KGJlbG9uZ2VkU2VjdGlvbilcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZSAvLyBubyBzdWNoIGxldmVsXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2VjdGlvbkNoZWNrUmVzdWx0ID0gdGhpcy5jaGVja1NlY3Rpb25TdGF0dXMoYmVsb25nZWRTZWN0aW9uKVxuICAgICAgICBzd2l0Y2goc2VjdGlvbkNoZWNrUmVzdWx0KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDAgLy9sb2NrZWQgXG4gICAgICAgICAgICBjYXNlIDE6IFxuICAgICAgICAgICAgICAgIHJldHVybiAxIC8vdW5sb2NrZWRcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudExldmVsID0gdGhpcy5wbGF5ZXJEYXRhLmN1cnJlbnRMZXZlbFxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50TGV2ZWwgPT0gZ2l2ZW5MZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMiAvL2N1cnJlbnRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gcmVxdWlyZShcInNlY3Rpb25Db25maWdcIilbYmVsb25nZWRTZWN0aW9uXS5sZXZlbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9uZUxldmVsID0gcmVxdWlyZShcInNlY3Rpb25Db25maWdcIilbYmVsb25nZWRTZWN0aW9uXS5sZXZlbHNbaW5kZXhdXG4gICAgICAgICAgICAgICAgICAgIGlmIChvbmVMZXZlbCA9PSBnaXZlbkxldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9uZUxldmVsID09IGN1cnJlbnRMZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cblxuICAgIG9uQ2xpY2tDaGFsbGVuZ2VCdXR0b24oKSB7XG4gICAgICAgIHZhciBnYW1lTWdyID0gcmVxdWlyZShcImdhbWVNZ3JcIilcbiAgICAgICAgdGhpcy5jaGFsbGVuZ2VCdXR0b24uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2VcbiAgICAgICAgaWYgKHRoaXMucGh5c2ljYWxQb3dlckZvckNoYWxsZW5nZUNvc3QgPT0gMCkge1xuICAgICAgICAgICAgZ2FtZU1nci5lbnRlckxldmVsU2NlbmUodGhpcy5zZWxlY3RlZExldmVsKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciB0ZW1wID0gbnVsbFxuICAgICAgICB2YXIgY29tbWl0Qm9keSA9IG51bGxcbiAgICAgICAgaWYgKHRoaXMucGh5c2ljYWxQb3dlckZvckNoYWxsZW5nZUNvc3QgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGVtcCA9IHRoaXMucGxheWVyRGF0YS5waHlzaWNhbFBvd2VyIC0gdGhpcy5waHlzaWNhbFBvd2VyRm9yQ2hhbGxlbmdlQ29zdFxuICAgICAgICAgICAgaWYgKHRlbXAgPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZmxhZ1ZhbHVlID0gdGhpcy5wbGF5ZXJEYXRhLnBoeXNpY2FsUG93ZXJDb3N0ZWRGbGFnXG4gICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkTGV2ZWwgPT0gdGhpcy5wbGF5ZXJEYXRhLmN1cnJlbnRMZXZlbCAmJiB0aGlzLnBsYXllckRhdGEucGh5c2ljYWxQb3dlckNvc3RlZEZsYWcgPT0gMCkge1xuICAgICAgICAgICAgICAgIGZsYWdWYWx1ZSA9IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbW1pdEJvZHkgPSB7XG4gICAgICAgICAgICAgICAgcGh5c2ljYWxQb3dlcjogdGVtcCxcbiAgICAgICAgICAgICAgICBwaHlzaWNhbFBvd2VyQ29zdGVkRmxhZzogZmxhZ1ZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmhlYXJ0Rm9yQ2hhbGxlbmdlQ29zdCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0ZW1wID0gdGhpcy5wbGF5ZXJEYXRhLmhlYXJ0IC0gdGhpcy5oZWFydEZvckNoYWxsZW5nZUNvc3RcbiAgICAgICAgICAgIGlmICh0ZW1wIDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tbWl0Qm9keSA9IHtcbiAgICAgICAgICAgICAgICBoZWFydDogdGVtcFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgdmFyIHN1Y2Nlc3NDYWxsQmFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHNlbGYucGh5c2ljYWxQb3dlckZvckNoYWxsZW5nZUNvc3QgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHNlbGYucGxheWVyRGF0YS5waHlzaWNhbFBvd2VyID0gdGVtcFxuICAgICAgICAgICAgICAgIHNlbGYucGxheWVyRGF0YS5waHlzaWNhbFBvd2VyQ29zdGVkRmxhZyA9IGZsYWdWYWx1ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2VsZi5oZWFydEZvckNoYWxsZW5nZUNvc3QgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHNlbGYucGxheWVyRGF0YS5oZWFydCA9IHRlbXBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ2FtZU1nci5lbnRlckxldmVsU2NlbmUoc2VsZi5zZWxlY3RlZExldmVsKVxuICAgICAgICB9XG5cblxuICAgICAgICByZXF1aXJlKFwiZGF0YU1nclwiKS5jb21taXRQbGF5ZXJEYXRhVG9TZXJ2ZXIoY29tbWl0Qm9keSxzdWNjZXNzQ2FsbEJhY2spXG4gICAgfSxcblxuXG4gICAgb25BbGxSZXRyeUZhaWxlZCgpIHtcbiAgICAgICAgdGhpcy5jaGFsbGVuZ2VCdXR0b24uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZVxuICAgIH0sXG5cbiAgICBkYXRhTW9uaXRvcmVkKGtleSx2YWx1ZSkge1xuICAgICAgICBpZiAoa2V5ID09IFwicGh5c2ljYWxQb3dlclwiKSB7XG4gICAgICAgICAgICB0aGlzLnBoeXNpY2FsUG93ZXIgPSB2YWx1ZVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSA9PSBcImhlYXJ0XCIpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhcnQgPSB2YWx1ZVxuICAgICAgICB9XG4gICAgfVxuXG5cbn0pO1xuIl19