
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/mainScene/mainSceneMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b1711iV+ldL4qhgqdK5YGYi', 'mainSceneMgr');
// scripts/mainScene/mainSceneMgr.js

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
    backToCurrentButtonNode: cc.Node,
    levelNodeStartPosition: cc.v2(0, 0),
    levelNodesHorDis: 10,
    levelNodesVerDis: 20,
    levelNodesNumPerLine: 4,
    rotaedCopiedRadius: 300,
    isShowingNoti: false,
    canShowNoti: true
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.setupData(); //this.setupUI()
    //require("gameMgr")._generateLevelSceneConfig()
  },
  start: function start() {
    this.setupUI(); //require("systemsMgr").showSystem("storySys",9001,2)

    var storyId = require("dataMgr").playerData.storySysId;

    if (storyId != -1) {
      require("systemsMgr").showSystem("storySys", storyId, 2);
    }

    this.playBgm(); //test
    //require("advertisMgr").showActivityNode()
  },
  playBgm: function playBgm() {
    var self = this;

    var path = require("sectionConfig")[this.selectedSection].bgmPath;

    cc.loader.loadRes(path, function (err, res) {
      cc.audioEngine.stopAll();
      cc.audioEngine.play(res, true, 1);
    });
  },
  setupUI: function setupUI() {
    this.sectionNameLabelNode.getComponent(cc.Widget).updateAlignment();
    this.heartLabelNode.getComponent(cc.Label).string = require("dataMgr").playerData.heart.toString();
    this.physicalLabelNode.getComponent(cc.Label).string = require("dataMgr").playerData.physicalPower.toString();

    var systemsMgr = require("systemsMgr");

    this.mailSysButtonNode.on("click", function () {
      systemsMgr.showSystem("mailSys", null, 1, 2);
    });

    this.mailSysButtonNode.getComponent("redPointMgr").redPointShowCondition = function () {
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

    this.signInSysButtonNode.on("click", function () {
      systemsMgr.showSystem("signInSys");
    });

    this.signInSysButtonNode.getComponent("redPointMgr").redPointShowCondition = function () {
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

    this.addPhysicalPowerButtonNode.on("click", function () {
      systemsMgr.showSystem("addPropertyNumSys", 1);
    });
    this.addHeartButtonNode.on("click", function () {
      systemsMgr.showSystem("addPropertyNumSys", 2);
    });

    var flag = require("dataMgr").playerData.initAdWatchedFlag;

    if (flag == 1) {
      this.welfarySysButtonNode.active = false;
    } else {
      cc.tween(this.welfarySysButtonNode).repeatForever(cc.tween().to(0.3, {
        angle: -45
      }).to(0.3, {
        angle: 0
      }).to(0.3, {
        angle: 45
      }).to(0.3, {
        angle: 0
      }).delay(1)).start();
      this.welfarySysButtonNode.on("click", function () {
        systemsMgr.showSystem("welfarySys");
      });
    }

    this.selectSectionButtonNode.on("click", function () {
      systemsMgr.showSystem("selectSectionSys");
    });
    cc.tween(this.backToCurrentButtonNode).repeatForever(cc.tween().to(1, {
      opacity: 0
    }).to(1, {
      opacity: 255
    })).start();
    this.backToCurrentButtonNode.getComponent(cc.Label).string = require("textConfig").getTextByIdAndLanguageType(167);
    var self = this;
    this.backToCurrentButtonNode.on("click", function () {
      self.selectedSection = require("dataMgr").playerData.currentSection;
      self.setupSectionPerformance();
      self.playBgm();
    });
    this.backToCurrentButtonNode.y = this.sectionNameLabelNode.y - this.sectionNameLabelNode.height / 2 - 100;
    this.setupSectionPerformance();
  },
  setupData: function setupData() {
    this.selectedSection = require("dataMgr").playerData.currentSection;
  },
  setupSectionPerformance: function setupSectionPerformance() {
    if (this.selectedSection == null) {
      cc.log("not selected one section, can not setup section of mainScene mgr");
      return;
    }

    if (this.selectedSection == require("dataMgr").playerData.currentSection) {
      this.backToCurrentButtonNode.active = false;
    } else {
      this.backToCurrentButtonNode.active = true;
    }

    var textConfig = require("textConfig");

    this.levelNodes.destroyAllChildren();
    this.levelNodes.removeAllChildren();
    this.connectLineNodes.destroyAllChildren();
    this.connectLineNodes.removeAllChildren();

    var sectionConfig = require("sectionConfig");

    var config = sectionConfig[this.selectedSection];
    var sectionTitle = textConfig.getTextByIdAndLanguageType(config.sectionTitleTextId);
    var sectionDes = textConfig.getTextByIdAndLanguageType(config.sectionDescripTextId);
    var showText = sectionTitle + " " + sectionDes;
    this.sectionNameLabelNode.getComponent(cc.Label).string = showText;

    this.sectionNameLabelNode.getComponent(cc.Label)._forceUpdateRenderData();

    this.selectSectionButtonNode.y = this.sectionNameLabelNode.y;
    this.selectSectionButtonNode.x = this.sectionNameLabelNode.x - this.sectionNameLabelNode.width / 2 - 100;
    var levels = config.levels;

    for (var index in levels) {
      var oneLevel = levels[index];
      var oneLevelNode = cc.instantiate(this.levelNodePrefab);
      var mgr = oneLevelNode.getComponent("levelNodeMgr");
      mgr.level = oneLevel;
      mgr.levelNumLabelNode.getComponent(cc.Label).string = (parseInt(index) + 1).toString();
      mgr.status = this._checkLevelStatus(oneLevel);
      mgr.delegate = this;

      this._setupLevelNodePosition(oneLevelNode, index);

      this.levelNodes.addChild(oneLevelNode);
    }

    for (var index in this.levelNodes.children) {
      if (index == 0) {
        continue;
      }

      var oneNode = this.levelNodes.children[index];
      var preNode = this.levelNodes.children[index - 1];
      var connectLine = cc.instantiate(this.levelNodesConnectLinePrefab);
      var v = cc.v2(preNode.x - oneNode.x, preNode.y - oneNode.y);
      connectLine.width = v.mag();
      var degree = v.signAngle(cc.v2(1, 0)) / Math.PI * 180;
      connectLine.angle = -degree;

      var result = this._getMidPointOfTwoPoints(oneNode.position, preNode.position);

      connectLine.x = result.x;
      connectLine.y = result.y;
      this.connectLineNodes.addChild(connectLine);
    }
  },
  _setupLevelNodePosition: function _setupLevelNodePosition(givenNode, givenIndex) {
    var sectionConfig = require("sectionConfig")[this.selectedSection];

    var levelNodePositions = sectionConfig.levelNodePositions;

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
      var nodesNum = sectionConfig.levels.length;
      var angle = 2 * Math.PI / nodesNum;
      var baseVector = cc.v2(this.rotaedCopiedRadius, 0);
      var v = baseVector.rotate(-givenIndex * angle);
      givenNode.x = v.x;
      givenNode.y = v.y;
    } else {
      givenNode.x = levelNodePositions[givenIndex].x;
      givenNode.y = levelNodePositions[givenIndex].y;
    }
  },
  _getMidPointOfTwoPoints: function _getMidPointOfTwoPoints(point1, point2) {
    var v = cc.v2(point2.x - point1.x, point2.y - point1.y);
    var x = point1.x + v.x / 2;
    var y = point1.y + v.y / 2;
    return cc.v2(x, y);
  },
  _checkSectionStatus: function _checkSectionStatus(givenSection) {
    var currentSection = require("dataMgr").playerData.currentSection;

    if (typeof givenSection !== "number") {
      givenSection = parseInt(givenSection);
    }

    if (givenSection > currentSection) {
      return 0; //locked
    } else if (givenSection < currentSection) {
      return 1; //unlocked
    } else if (givenSection == currentSection) {
      return 2; //current
    }
  },
  _checkLevelStatus: function _checkLevelStatus(givneLevel) {
    var sectionKey = this._getSectionKeyByLevel(givneLevel);

    if (sectionKey == false) {
      return false; //no such level
    }

    var sectionStatus = this._checkSectionStatus(sectionKey);

    switch (sectionStatus) {
      case 0:
        return 0;
      //locked

      case 1:
        return 1;
      //unlocked

      case 2:
        var currentLevel = require("dataMgr").playerData.currentLevel;

        if (currentLevel == givneLevel) {
          return 2; //current
        }

        var sectionConfig = require("sectionConfig")[sectionKey];

        var levelsArry = sectionConfig.levels;

        if (levelsArry.indexOf(givneLevel) > levelsArry.indexOf(currentLevel)) {
          return 0; //locked
        }

        return 1;
      //unlocked
    }
  },
  _getSectionKeyByLevel: function _getSectionKeyByLevel(givenLevel) {
    var levelId = parseInt(givenLevel);

    var sectionConfig = require("sectionConfig");

    for (var key in sectionConfig) {
      var oneConfig = sectionConfig[key];
      var levelsConfig = oneConfig.levels;

      if (levelsConfig.indexOf(levelId) != -1) {
        return key;
      }
    }

    return false;
  },
  dataMonitored: function dataMonitored(key, value) {
    if (key == "physicalPower") {
      this.physicalLabelNode.getComponent(cc.Label).string = value.toString();
    } else if (key == "heart") {
      this.heartLabelNode.getComponent(cc.Label).string = value.toString();
    }

    for (var index in this.levelNodes.children) {
      var oneMgr = this.levelNodes.children[index].getComponent("levelNodeMgr");
      oneMgr.dataMonitored(key, value);
    }
  },
  update: function update(dt) {
    var notificationMgr = require("notificationMgr");

    var notiArry = notificationMgr.noties;

    if (notiArry.length > 0 && this.isShowingNoti == false && this.canShowNoti == true) {
      this.isShowingNoti = true;
      var self = this;

      var temp = function temp() {
        if (notiArry.length == 0) {
          self.isShowingNoti = false;
          return;
        }

        var oneStr = notiArry[0];
        notificationMgr.showNoti(oneStr);
        notiArry.splice(0, 1);
        cc.tween(self.node).delay(0.3).call(function () {
          temp();
        }).start();
      };

      temp();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL21haW5TY2VuZS9tYWluU2NlbmVNZ3IuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzZWN0aW9uTmFtZUxhYmVsTm9kZSIsIk5vZGUiLCJsZXZlbE5vZGVzIiwiY29ubmVjdExpbmVOb2RlcyIsImxldmVsTm9kZVByZWZhYiIsIlByZWZhYiIsImxldmVsTm9kZXNDb25uZWN0TGluZVByZWZhYiIsInNlbGVjdGVkU2VjdGlvbiIsInBoeXNpY2FsTGFiZWxOb2RlIiwiaGVhcnRMYWJlbE5vZGUiLCJtYWlsU3lzQnV0dG9uTm9kZSIsInNpZ25JblN5c0J1dHRvbk5vZGUiLCJ3ZWxmYXJ5U3lzQnV0dG9uTm9kZSIsImFkZEhlYXJ0QnV0dG9uTm9kZSIsImFkZFBoeXNpY2FsUG93ZXJCdXR0b25Ob2RlIiwic2VsZWN0U2VjdGlvbkJ1dHRvbk5vZGUiLCJiYWNrVG9DdXJyZW50QnV0dG9uTm9kZSIsImxldmVsTm9kZVN0YXJ0UG9zaXRpb24iLCJ2MiIsImxldmVsTm9kZXNIb3JEaXMiLCJsZXZlbE5vZGVzVmVyRGlzIiwibGV2ZWxOb2Rlc051bVBlckxpbmUiLCJyb3RhZWRDb3BpZWRSYWRpdXMiLCJpc1Nob3dpbmdOb3RpIiwiY2FuU2hvd05vdGkiLCJvbkxvYWQiLCJzZXR1cERhdGEiLCJzdGFydCIsInNldHVwVUkiLCJzdG9yeUlkIiwicmVxdWlyZSIsInBsYXllckRhdGEiLCJzdG9yeVN5c0lkIiwic2hvd1N5c3RlbSIsInBsYXlCZ20iLCJzZWxmIiwicGF0aCIsImJnbVBhdGgiLCJsb2FkZXIiLCJsb2FkUmVzIiwiZXJyIiwicmVzIiwiYXVkaW9FbmdpbmUiLCJzdG9wQWxsIiwicGxheSIsImdldENvbXBvbmVudCIsIldpZGdldCIsInVwZGF0ZUFsaWdubWVudCIsIkxhYmVsIiwic3RyaW5nIiwiaGVhcnQiLCJ0b1N0cmluZyIsInBoeXNpY2FsUG93ZXIiLCJzeXN0ZW1zTWdyIiwib24iLCJyZWRQb2ludFNob3dDb25kaXRpb24iLCJtYWlscyIsInVuUmVhZE51bSIsImtleSIsIm9uZU1haWwiLCJzdGF0dXMiLCJzaWduSW5TdGF0dXMiLCJmbGFnIiwiaW5pdEFkV2F0Y2hlZEZsYWciLCJhY3RpdmUiLCJ0d2VlbiIsInJlcGVhdEZvcmV2ZXIiLCJ0byIsImFuZ2xlIiwiZGVsYXkiLCJvcGFjaXR5IiwiZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUiLCJjdXJyZW50U2VjdGlvbiIsInNldHVwU2VjdGlvblBlcmZvcm1hbmNlIiwieSIsImhlaWdodCIsImxvZyIsInRleHRDb25maWciLCJkZXN0cm95QWxsQ2hpbGRyZW4iLCJyZW1vdmVBbGxDaGlsZHJlbiIsInNlY3Rpb25Db25maWciLCJjb25maWciLCJzZWN0aW9uVGl0bGUiLCJzZWN0aW9uVGl0bGVUZXh0SWQiLCJzZWN0aW9uRGVzIiwic2VjdGlvbkRlc2NyaXBUZXh0SWQiLCJzaG93VGV4dCIsIl9mb3JjZVVwZGF0ZVJlbmRlckRhdGEiLCJ4Iiwid2lkdGgiLCJsZXZlbHMiLCJpbmRleCIsIm9uZUxldmVsIiwib25lTGV2ZWxOb2RlIiwiaW5zdGFudGlhdGUiLCJtZ3IiLCJsZXZlbCIsImxldmVsTnVtTGFiZWxOb2RlIiwicGFyc2VJbnQiLCJfY2hlY2tMZXZlbFN0YXR1cyIsImRlbGVnYXRlIiwiX3NldHVwTGV2ZWxOb2RlUG9zaXRpb24iLCJhZGRDaGlsZCIsImNoaWxkcmVuIiwib25lTm9kZSIsInByZU5vZGUiLCJjb25uZWN0TGluZSIsInYiLCJtYWciLCJkZWdyZWUiLCJzaWduQW5nbGUiLCJNYXRoIiwiUEkiLCJyZXN1bHQiLCJfZ2V0TWlkUG9pbnRPZlR3b1BvaW50cyIsInBvc2l0aW9uIiwiZ2l2ZW5Ob2RlIiwiZ2l2ZW5JbmRleCIsImxldmVsTm9kZVBvc2l0aW9ucyIsImxlbmd0aCIsIm5vZGVzTnVtIiwiYmFzZVZlY3RvciIsInJvdGF0ZSIsInBvaW50MSIsInBvaW50MiIsIl9jaGVja1NlY3Rpb25TdGF0dXMiLCJnaXZlblNlY3Rpb24iLCJnaXZuZUxldmVsIiwic2VjdGlvbktleSIsIl9nZXRTZWN0aW9uS2V5QnlMZXZlbCIsInNlY3Rpb25TdGF0dXMiLCJjdXJyZW50TGV2ZWwiLCJsZXZlbHNBcnJ5IiwiaW5kZXhPZiIsImdpdmVuTGV2ZWwiLCJsZXZlbElkIiwib25lQ29uZmlnIiwibGV2ZWxzQ29uZmlnIiwiZGF0YU1vbml0b3JlZCIsInZhbHVlIiwib25lTWdyIiwidXBkYXRlIiwiZHQiLCJub3RpZmljYXRpb25NZ3IiLCJub3RpQXJyeSIsIm5vdGllcyIsInRlbXAiLCJvbmVTdHIiLCJzaG93Tm90aSIsInNwbGljZSIsIm5vZGUiLCJjYWxsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsb0JBQW9CLEVBQUVKLEVBQUUsQ0FBQ0ssSUFoQmpCO0FBaUJSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ0ssSUFqQlA7QUFrQlJFLElBQUFBLGdCQUFnQixFQUFFUCxFQUFFLENBQUNLLElBbEJiO0FBbUJSRyxJQUFBQSxlQUFlLEVBQUVSLEVBQUUsQ0FBQ1MsTUFuQlo7QUFvQlJDLElBQUFBLDJCQUEyQixFQUFFVixFQUFFLENBQUNTLE1BcEJ4QjtBQXFCUkUsSUFBQUEsZUFBZSxFQUFFLElBckJUO0FBc0JSQyxJQUFBQSxpQkFBaUIsRUFBRVosRUFBRSxDQUFDSyxJQXRCZDtBQXVCUlEsSUFBQUEsY0FBYyxFQUFFYixFQUFFLENBQUNLLElBdkJYO0FBd0JSUyxJQUFBQSxpQkFBaUIsRUFBRWQsRUFBRSxDQUFDSyxJQXhCZDtB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QTlFLEVBQW9GO0FBQ2hGLFdBQUtELGFBQUwsR0FBcUIsSUFBckI7QUFDQSxVQUFJWSxJQUFJLEdBQUcsSUFBWDs7QUFDQSxVQUFJK0csSUFBSSxHQUFHLFNBQVBBLElBQU8sR0FBVztBQUNsQixZQUFJRixRQUFRLENBQUN6QixNQUFULElBQW1CLENBQXZCLEVBQTBCO0FBQ3RCcEYsVUFBQUEsSUFBSSxDQUFDWixhQUFMLEdBQXFCLEtBQXJCO0FBQ0E7QUFDSDs7QUFFRCxZQUFJNEgsTUFBTSxHQUFHSCxRQUFRLENBQUMsQ0FBRCxDQUFyQjtBQUNBRCxRQUFBQSxlQUFlLENBQUNLLFFBQWhCLENBQXlCRCxNQUF6QjtBQUNBSCxRQUFBQSxRQUFRLENBQUNLLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEI7QUFDQXpKLFFBQUFBLEVBQUUsQ0FBQ3FFLEtBQUgsQ0FBUzlCLElBQUksQ0FBQ21ILElBQWQsRUFDS2pGLEtBREwsQ0FDVyxHQURYLEVBRUtrRixJQUZMLENBRVUsWUFBVTtBQUNaTCxVQUFBQSxJQUFJO0FBQ1AsU0FKTCxFQUtLdkgsS0FMTDtBQU1ILE9BZkQ7O0FBaUJBdUgsTUFBQUEsSUFBSTtBQUNQO0FBQ0o7QUF2V0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHBzOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICBzZWN0aW9uTmFtZUxhYmVsTm9kZTogY2MuTm9kZSxcbiAgICAgICAgbGV2ZWxOb2RlczogY2MuTm9kZSxcbiAgICAgICAgY29ubmVjdExpbmVOb2RlczogY2MuTm9kZSxcbiAgICAgICAgbGV2ZWxOb2RlUHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGxldmVsTm9kZXNDb25uZWN0TGluZVByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBzZWxlY3RlZFNlY3Rpb246IG51bGwsXG4gICAgICAgIHBoeXNpY2FsTGFiZWxOb2RlOiBjYy5Ob2RlLFxuICAgICAgICBoZWFydExhYmVsTm9kZTogY2MuTm9kZSxcbiAgICAgICAgbWFpbFN5c0J1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIHNpZ25JblN5c0J1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIHdlbGZhcnlTeXNCdXR0b25Ob2RlOiBjYy5Ob2RlLFxuICAgICAgICBhZGRIZWFydEJ1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGFkZFBoeXNpY2FsUG93ZXJCdXR0b25Ob2RlOiBjYy5Ob2RlLFxuICAgICAgICBzZWxlY3RTZWN0aW9uQnV0dG9uTm9kZTogY2MuTm9kZSxcbiAgICAgICAgYmFja1RvQ3VycmVudEJ1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGxldmVsTm9kZVN0YXJ0UG9zaXRpb246IGNjLnYyKDAsMCksXG4gICAgICAgIGxldmVsTm9kZXNIb3JEaXM6IDEwLFxuICAgICAgICBsZXZlbE5vZGVzVmVyRGlzOiAyMCxcbiAgICAgICAgbGV2ZWxOb2Rlc051bVBlckxpbmU6IDQsXG5cbiAgICAgICAgcm90YWVkQ29waWVkUmFkaXVzOiAzMDAsXG4gICAgICAgIGlzU2hvd2luZ05vdGk6IGZhbHNlLFxuICAgICAgICBjYW5TaG93Tm90aTogdHJ1ZVxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMuc2V0dXBEYXRhKClcbiAgICAgICAgLy90aGlzLnNldHVwVUkoKVxuICAgICAgICAvL3JlcXVpcmUoXCJnYW1lTWdyXCIpLl9nZW5lcmF0ZUxldmVsU2NlbmVDb25maWcoKVxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuc2V0dXBVSSgpXG4gICAgICAgIC8vcmVxdWlyZShcInN5c3RlbXNNZ3JcIikuc2hvd1N5c3RlbShcInN0b3J5U3lzXCIsOTAwMSwyKVxuICAgICAgICB2YXIgc3RvcnlJZCA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuc3RvcnlTeXNJZFxuICAgICAgICBpZiAoc3RvcnlJZCAhPSAtMSkge1xuICAgICAgICAgICAgcmVxdWlyZShcInN5c3RlbXNNZ3JcIikuc2hvd1N5c3RlbShcInN0b3J5U3lzXCIsc3RvcnlJZCwyKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGxheUJnbSgpXG4gICAgICAgIC8vdGVzdFxuICAgICAgICAvL3JlcXVpcmUoXCJhZHZlcnRpc01nclwiKS5zaG93QWN0aXZpdHlOb2RlKClcbiAgICB9LFxuICAgIHBsYXlCZ20oKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgIHZhciBwYXRoID0gcmVxdWlyZShcInNlY3Rpb25Db25maWdcIilbdGhpcy5zZWxlY3RlZFNlY3Rpb25dLmJnbVBhdGhcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMocGF0aCxmdW5jdGlvbihlcnIscmVzKXtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKVxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheShyZXMsdHJ1ZSwxKVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgc2V0dXBVSSgpIHtcbiAgICAgICAgdGhpcy5zZWN0aW9uTmFtZUxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS51cGRhdGVBbGlnbm1lbnQoKVxuICAgICAgICB0aGlzLmhlYXJ0TGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5oZWFydC50b1N0cmluZygpXG4gICAgICAgIHRoaXMucGh5c2ljYWxMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLnBoeXNpY2FsUG93ZXIudG9TdHJpbmcoKVxuICAgICAgICB2YXIgc3lzdGVtc01nciA9IHJlcXVpcmUoXCJzeXN0ZW1zTWdyXCIpXG4gICAgICAgIHRoaXMubWFpbFN5c0J1dHRvbk5vZGUub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzeXN0ZW1zTWdyLnNob3dTeXN0ZW0oXCJtYWlsU3lzXCIsbnVsbCwxLDIpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubWFpbFN5c0J1dHRvbk5vZGUuZ2V0Q29tcG9uZW50KFwicmVkUG9pbnRNZ3JcIikucmVkUG9pbnRTaG93Q29uZGl0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbWFpbHMgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLm1haWxzXG4gICAgICAgICAgICB2YXIgdW5SZWFkTnVtID0gMFxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG1haWxzKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9uZU1haWwgPSBtYWlsc1trZXldXG4gICAgICAgICAgICAgICAgaWYgKG9uZU1haWwuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdW5SZWFkTnVtICs9IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodW5SZWFkTnVtID4gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5zaWduSW5TeXNCdXR0b25Ob2RlLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgc3lzdGVtc01nci5zaG93U3lzdGVtKFwic2lnbkluU3lzXCIpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuc2lnbkluU3lzQnV0dG9uTm9kZS5nZXRDb21wb25lbnQoXCJyZWRQb2ludE1nclwiKS5yZWRQb2ludFNob3dDb25kaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBzaWduSW5TdGF0dXMgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLnNpZ25JblN0YXR1c1xuICAgICAgICAgICAgc3dpdGNoKHNpZ25JblN0YXR1cykge1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZFBoeXNpY2FsUG93ZXJCdXR0b25Ob2RlLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgc3lzdGVtc01nci5zaG93U3lzdGVtKFwiYWRkUHJvcGVydHlOdW1TeXNcIiwxKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmFkZEhlYXJ0QnV0dG9uTm9kZS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHN5c3RlbXNNZ3Iuc2hvd1N5c3RlbShcImFkZFByb3BlcnR5TnVtU3lzXCIsMilcbiAgICAgICAgfSlcblxuICAgICAgICB2YXIgZmxhZyA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuaW5pdEFkV2F0Y2hlZEZsYWdcbiAgICAgICAgaWYgKGZsYWcgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy53ZWxmYXJ5U3lzQnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy53ZWxmYXJ5U3lzQnV0dG9uTm9kZSlcbiAgICAgICAgICAgICAgICAucmVwZWF0Rm9yZXZlcihjYy50d2VlbigpXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjMse2FuZ2xlOiAtNDV9KVxuICAgICAgICAgICAgICAgICAgICAudG8oMC4zLHthbmdsZTogMH0pXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjMse2FuZ2xlOiA0NX0pXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjMse2FuZ2xlOiAwfSlcbiAgICAgICAgICAgICAgICAgICAgLmRlbGF5KDEpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5zdGFydCgpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMud2VsZmFyeVN5c0J1dHRvbk5vZGUub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc3lzdGVtc01nci5zaG93U3lzdGVtKFwid2VsZmFyeVN5c1wiKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0U2VjdGlvbkJ1dHRvbk5vZGUub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzeXN0ZW1zTWdyLnNob3dTeXN0ZW0oXCJzZWxlY3RTZWN0aW9uU3lzXCIpXG4gICAgICAgIH0pXG5cbiAgICAgICAgY2MudHdlZW4odGhpcy5iYWNrVG9DdXJyZW50QnV0dG9uTm9kZSlcbiAgICAgICAgICAgIC5yZXBlYXRGb3JldmVyKGNjLnR3ZWVuKClcbiAgICAgICAgICAgICAgICAgICAgLnRvKDEsIHtvcGFjaXR5OiAwfSlcbiAgICAgICAgICAgICAgICAgICAgLnRvKDEsIHtvcGFjaXR5OiAyNTV9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN0YXJ0KClcbiAgICAgICAgdGhpcy5iYWNrVG9DdXJyZW50QnV0dG9uTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJlcXVpcmUoXCJ0ZXh0Q29uZmlnXCIpLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDE2NylcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgIHRoaXMuYmFja1RvQ3VycmVudEJ1dHRvbk5vZGUub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkU2VjdGlvbiA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuY3VycmVudFNlY3Rpb25cbiAgICAgICAgICAgIHNlbGYuc2V0dXBTZWN0aW9uUGVyZm9ybWFuY2UoKVxuICAgICAgICAgICAgc2VsZi5wbGF5QmdtKClcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5iYWNrVG9DdXJyZW50QnV0dG9uTm9kZS55ID0gdGhpcy5zZWN0aW9uTmFtZUxhYmVsTm9kZS55IC0gdGhpcy5zZWN0aW9uTmFtZUxhYmVsTm9kZS5oZWlnaHQgLyAyIC0gMTAwXG4gICAgICAgIHRoaXMuc2V0dXBTZWN0aW9uUGVyZm9ybWFuY2UoKVxuICAgIH0sXG5cbiAgICBzZXR1cERhdGEoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRTZWN0aW9uID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5jdXJyZW50U2VjdGlvblxuICAgIH0sXG5cbiAgICBzZXR1cFNlY3Rpb25QZXJmb3JtYW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRTZWN0aW9uID09IG51bGwpIHtcbiAgICAgICAgICAgIGNjLmxvZyhcIm5vdCBzZWxlY3RlZCBvbmUgc2VjdGlvbiwgY2FuIG5vdCBzZXR1cCBzZWN0aW9uIG9mIG1haW5TY2VuZSBtZ3JcIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkU2VjdGlvbiA9PSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmJhY2tUb0N1cnJlbnRCdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJhY2tUb0N1cnJlbnRCdXR0b25Ob2RlLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGV4dENvbmZpZyA9IHJlcXVpcmUoXCJ0ZXh0Q29uZmlnXCIpXG4gICAgICAgIHRoaXMubGV2ZWxOb2Rlcy5kZXN0cm95QWxsQ2hpbGRyZW4oKVxuICAgICAgICB0aGlzLmxldmVsTm9kZXMucmVtb3ZlQWxsQ2hpbGRyZW4oKVxuICAgICAgICB0aGlzLmNvbm5lY3RMaW5lTm9kZXMuZGVzdHJveUFsbENoaWxkcmVuKClcbiAgICAgICAgdGhpcy5jb25uZWN0TGluZU5vZGVzLnJlbW92ZUFsbENoaWxkcmVuKClcbiAgICAgICAgdmFyIHNlY3Rpb25Db25maWcgPSByZXF1aXJlKFwic2VjdGlvbkNvbmZpZ1wiKVxuICAgICAgICB2YXIgY29uZmlnID0gc2VjdGlvbkNvbmZpZ1t0aGlzLnNlbGVjdGVkU2VjdGlvbl1cbiAgICAgICAgdmFyIHNlY3Rpb25UaXRsZSA9IHRleHRDb25maWcuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoY29uZmlnLnNlY3Rpb25UaXRsZVRleHRJZClcbiAgICAgICAgdmFyIHNlY3Rpb25EZXMgPSB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKGNvbmZpZy5zZWN0aW9uRGVzY3JpcFRleHRJZClcbiAgICAgICAgdmFyIHNob3dUZXh0ID0gc2VjdGlvblRpdGxlICsgXCIgXCIgKyBzZWN0aW9uRGVzXG4gICAgICAgIHRoaXMuc2VjdGlvbk5hbWVMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzaG93VGV4dFxuICAgICAgICB0aGlzLnNlY3Rpb25OYW1lTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuX2ZvcmNlVXBkYXRlUmVuZGVyRGF0YSgpXG4gICAgICAgIHRoaXMuc2VsZWN0U2VjdGlvbkJ1dHRvbk5vZGUueSA9IHRoaXMuc2VjdGlvbk5hbWVMYWJlbE5vZGUueVxuICAgICAgICB0aGlzLnNlbGVjdFNlY3Rpb25CdXR0b25Ob2RlLnggPSB0aGlzLnNlY3Rpb25OYW1lTGFiZWxOb2RlLnggLSB0aGlzLnNlY3Rpb25OYW1lTGFiZWxOb2RlLndpZHRoIC8gMiAtIDEwMFxuICAgICAgICB2YXIgbGV2ZWxzID0gY29uZmlnLmxldmVsc1xuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBsZXZlbHMpIHtcbiAgICAgICAgICAgIHZhciBvbmVMZXZlbCA9IGxldmVsc1tpbmRleF1cbiAgICAgICAgICAgIHZhciBvbmVMZXZlbE5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmxldmVsTm9kZVByZWZhYilcbiAgICAgICAgICAgIHZhciBtZ3IgPSBvbmVMZXZlbE5vZGUuZ2V0Q29tcG9uZW50KFwibGV2ZWxOb2RlTWdyXCIpXG4gICAgICAgICAgICBtZ3IubGV2ZWwgPSBvbmVMZXZlbFxuICAgICAgICAgICAgbWdyLmxldmVsTnVtTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHBhcnNlSW50KGluZGV4KSArIDEpLnRvU3RyaW5nKClcbiAgICAgICAgICAgIG1nci5zdGF0dXMgPSB0aGlzLl9jaGVja0xldmVsU3RhdHVzKG9uZUxldmVsKVxuICAgICAgICAgICAgbWdyLmRlbGVnYXRlID0gdGhpc1xuICAgICAgICAgICAgdGhpcy5fc2V0dXBMZXZlbE5vZGVQb3NpdGlvbihvbmVMZXZlbE5vZGUsaW5kZXgpXG4gICAgICAgICAgICB0aGlzLmxldmVsTm9kZXMuYWRkQ2hpbGQob25lTGV2ZWxOb2RlKVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gdGhpcy5sZXZlbE5vZGVzLmNoaWxkcmVuKXtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBvbmVOb2RlID0gdGhpcy5sZXZlbE5vZGVzLmNoaWxkcmVuW2luZGV4XVxuICAgICAgICAgICAgdmFyIHByZU5vZGUgPSB0aGlzLmxldmVsTm9kZXMuY2hpbGRyZW5bKGluZGV4IC0gMSldXG4gICAgICAgICAgICB2YXIgY29ubmVjdExpbmUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmxldmVsTm9kZXNDb25uZWN0TGluZVByZWZhYilcbiAgICAgICAgICAgIHZhciB2ID0gY2MudjIocHJlTm9kZS54IC0gb25lTm9kZS54LCBwcmVOb2RlLnkgLSBvbmVOb2RlLnkpXG4gICAgICAgICAgICBjb25uZWN0TGluZS53aWR0aCA9IHYubWFnKClcbiAgICAgICAgICAgIHZhciBkZWdyZWU9IHYuc2lnbkFuZ2xlKGNjLnYyKDEsMCkpIC8gTWF0aC5QSSAqIDE4MFxuICAgICAgICAgICAgY29ubmVjdExpbmUuYW5nbGUgPSAtZGVncmVlXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fZ2V0TWlkUG9pbnRPZlR3b1BvaW50cyhvbmVOb2RlLnBvc2l0aW9uLCBwcmVOb2RlLnBvc2l0aW9uKVxuICAgICAgICAgICAgY29ubmVjdExpbmUueCA9IHJlc3VsdC54XG4gICAgICAgICAgICBjb25uZWN0TGluZS55ID0gcmVzdWx0LnlcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdExpbmVOb2Rlcy5hZGRDaGlsZChjb25uZWN0TGluZSlcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX3NldHVwTGV2ZWxOb2RlUG9zaXRpb24oZ2l2ZW5Ob2RlLCBnaXZlbkluZGV4KSB7XG4gICAgICAgIHZhciBzZWN0aW9uQ29uZmlnID0gcmVxdWlyZShcInNlY3Rpb25Db25maWdcIilbdGhpcy5zZWxlY3RlZFNlY3Rpb25dXG4gICAgICAgIHZhciBsZXZlbE5vZGVQb3NpdGlvbnMgPSBzZWN0aW9uQ29uZmlnLmxldmVsTm9kZVBvc2l0aW9uc1xuICAgICAgICBpZiAobGV2ZWxOb2RlUG9zaXRpb25zID09IG51bGwgfHwgbGV2ZWxOb2RlUG9zaXRpb25zLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAvL2xpbmVkXG5cbiAgICAgICAgICAgIC8vIHZhciByb3dJbmRleCA9IGdpdmVuSW5kZXggJSB0aGlzLmxldmVsTm9kZXNOdW1QZXJMaW5lXG4gICAgICAgICAgICAvLyB2YXIgY29sSW5kZXggPSBNYXRoLmZsb29yKGdpdmVuSW5kZXggLyB0aGlzLmxldmVsTm9kZXNOdW1QZXJMaW5lKVxuXG4gICAgICAgICAgICAvLyB2YXIgbWF4WCA9IHRoaXMubGV2ZWxOb2RlU3RhcnRQb3NpdGlvbi54ICsgdGhpcy5sZXZlbE5vZGVzSG9yRGlzICogKHRoaXMubGV2ZWxOb2Rlc051bVBlckxpbmUgLSAxKVxuICAgICAgICAgICAgLy8gaWYgKGNvbEluZGV4ICUgMiA9PSAwKSB7XG4gICAgICAgICAgICAvLyAgICAgZ2l2ZW5Ob2RlLnggPSB0aGlzLmxldmVsTm9kZVN0YXJ0UG9zaXRpb24ueCArIHJvd0luZGV4ICogdGhpcy5sZXZlbE5vZGVzSG9yRGlzXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICBnaXZlbk5vZGUueCA9IG1heFggLSByb3dJbmRleCAqIHRoaXMubGV2ZWxOb2Rlc0hvckRpc1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gZ2l2ZW5Ob2RlLnkgPSB0aGlzLmxldmVsTm9kZVN0YXJ0UG9zaXRpb24ueSArIGNvbEluZGV4ICogdGhpcy5sZXZlbE5vZGVzVmVyRGlzXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIHZhciBsZXZlbE5vZGVTdGFydCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNlY3Rpb25OYW1lTGFiZWxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbE5vZGVTdGFydFwiKVxuICAgICAgICAgICAgLy8gZ2l2ZW5Ob2RlLnggPSBsZXZlbE5vZGVTdGFydC54XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGdpdmVuTm9kZS55ID0gbGV2ZWxOb2RlU3RhcnQueSArIGdpdmVuSW5kZXggKiB0aGlzLmxldmVsTm9kZXNWZXJEaXNcblxuICAgICAgICAgICAgLy9yb3RhdGVkIGNvcGllZFxuICAgICAgICAgICAgdmFyIG5vZGVzTnVtID0gc2VjdGlvbkNvbmZpZy5sZXZlbHMubGVuZ3RoXG4gICAgICAgICAgICB2YXIgYW5nbGUgPSAyICogTWF0aC5QSSAvIG5vZGVzTnVtXG4gICAgICAgICAgICB2YXIgYmFzZVZlY3RvciA9IGNjLnYyKHRoaXMucm90YWVkQ29waWVkUmFkaXVzLDApXG4gICAgICAgICAgICB2YXIgdiA9IGJhc2VWZWN0b3Iucm90YXRlKC1naXZlbkluZGV4ICogYW5nbGUpXG4gICAgICAgICAgICBnaXZlbk5vZGUueCA9IHYueFxuICAgICAgICAgICAgZ2l2ZW5Ob2RlLnkgPSB2LnlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdpdmVuTm9kZS54ID0gbGV2ZWxOb2RlUG9zaXRpb25zW2dpdmVuSW5kZXhdLnhcbiAgICAgICAgICAgIGdpdmVuTm9kZS55ID0gbGV2ZWxOb2RlUG9zaXRpb25zW2dpdmVuSW5kZXhdLnlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfZ2V0TWlkUG9pbnRPZlR3b1BvaW50cyhwb2ludDEscG9pbnQyKSB7XG4gICAgICAgIHZhciB2ID0gY2MudjIocG9pbnQyLnggLSBwb2ludDEueCwgcG9pbnQyLnkgLSBwb2ludDEueSlcbiAgICAgICAgdmFyIHggPSBwb2ludDEueCArIHYueCAvIDJcbiAgICAgICAgdmFyIHkgPSBwb2ludDEueSArIHYueSAvIDJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHgseSlcbiAgICB9LFxuXG5cbiAgICBfY2hlY2tTZWN0aW9uU3RhdHVzKGdpdmVuU2VjdGlvbikge1xuICAgICAgICB2YXIgY3VycmVudFNlY3Rpb24gPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmN1cnJlbnRTZWN0aW9uXG4gICAgICAgIGlmICh0eXBlb2YgZ2l2ZW5TZWN0aW9uICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBnaXZlblNlY3Rpb24gPSBwYXJzZUludChnaXZlblNlY3Rpb24pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdpdmVuU2VjdGlvbiA+IGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gMCAvL2xvY2tlZFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGdpdmVuU2VjdGlvbiA8IGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gMSAvL3VubG9ja2VkXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZ2l2ZW5TZWN0aW9uID09IGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gMiAvL2N1cnJlbnRcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfY2hlY2tMZXZlbFN0YXR1cyhnaXZuZUxldmVsKSB7XG4gICAgICAgIHZhciBzZWN0aW9uS2V5ID0gdGhpcy5fZ2V0U2VjdGlvbktleUJ5TGV2ZWwoZ2l2bmVMZXZlbClcbiAgICAgICAgaWYgKHNlY3Rpb25LZXkgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZSAvL25vIHN1Y2ggbGV2ZWxcbiAgICAgICAgfVxuICAgICAgIFxuICAgICAgICB2YXIgc2VjdGlvblN0YXR1cyA9IHRoaXMuX2NoZWNrU2VjdGlvblN0YXR1cyhzZWN0aW9uS2V5KVxuICAgICAgICBzd2l0Y2goc2VjdGlvblN0YXR1cykge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiAwIC8vbG9ja2VkXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEgLy91bmxvY2tlZFxuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50TGV2ZWwgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmN1cnJlbnRMZXZlbFxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50TGV2ZWwgPT0gZ2l2bmVMZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMiAvL2N1cnJlbnRcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgc2VjdGlvbkNvbmZpZyA9IHJlcXVpcmUoXCJzZWN0aW9uQ29uZmlnXCIpW3NlY3Rpb25LZXldXG4gICAgICAgICAgICAgICAgdmFyIGxldmVsc0FycnkgPSBzZWN0aW9uQ29uZmlnLmxldmVsc1xuICAgICAgICAgICAgICAgIGlmIChsZXZlbHNBcnJ5LmluZGV4T2YoZ2l2bmVMZXZlbCkgPiBsZXZlbHNBcnJ5LmluZGV4T2YoY3VycmVudExldmVsKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMCAvL2xvY2tlZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gMSAvL3VubG9ja2VkXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9nZXRTZWN0aW9uS2V5QnlMZXZlbChnaXZlbkxldmVsKSB7XG4gICAgICAgIHZhciBsZXZlbElkID0gcGFyc2VJbnQoZ2l2ZW5MZXZlbClcbiAgICAgICAgdmFyIHNlY3Rpb25Db25maWcgPSByZXF1aXJlKFwic2VjdGlvbkNvbmZpZ1wiKVxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc2VjdGlvbkNvbmZpZykge1xuICAgICAgICAgICAgdmFyIG9uZUNvbmZpZyA9IHNlY3Rpb25Db25maWdba2V5XVxuICAgICAgICAgICAgdmFyIGxldmVsc0NvbmZpZyA9IG9uZUNvbmZpZy5sZXZlbHNcbiAgICAgICAgICAgIGlmIChsZXZlbHNDb25maWcuaW5kZXhPZihsZXZlbElkKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH0sXG5cblxuICAgIGRhdGFNb25pdG9yZWQoa2V5LHZhbHVlKSB7XG4gICAgICAgIGlmIChrZXkgPT0gXCJwaHlzaWNhbFBvd2VyXCIpIHtcbiAgICAgICAgICAgIHRoaXMucGh5c2ljYWxMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB2YWx1ZS50b1N0cmluZygpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09IFwiaGVhcnRcIikge1xuICAgICAgICAgICAgdGhpcy5oZWFydExhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHZhbHVlLnRvU3RyaW5nKClcbiAgICAgICAgfVxuICAgICAgICBmb3IodmFyIGluZGV4IGluIHRoaXMubGV2ZWxOb2Rlcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgdmFyIG9uZU1nciA9IHRoaXMubGV2ZWxOb2Rlcy5jaGlsZHJlbltpbmRleF0uZ2V0Q29tcG9uZW50KFwibGV2ZWxOb2RlTWdyXCIpXG4gICAgICAgICAgICBvbmVNZ3IuZGF0YU1vbml0b3JlZChrZXksdmFsdWUpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlIChkdCkge1xuICAgICAgICB2YXIgbm90aWZpY2F0aW9uTWdyID0gcmVxdWlyZShcIm5vdGlmaWNhdGlvbk1nclwiKVxuICAgICAgICB2YXIgbm90aUFycnkgPSBub3RpZmljYXRpb25NZ3Iubm90aWVzXG4gICAgICAgIGlmIChub3RpQXJyeS5sZW5ndGggPiAwICYmIHRoaXMuaXNTaG93aW5nTm90aSA9PSBmYWxzZSAmJiB0aGlzLmNhblNob3dOb3RpID09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTaG93aW5nTm90aSA9IHRydWVcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICAgICAgdmFyIHRlbXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAobm90aUFycnkubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pc1Nob3dpbmdOb3RpID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIG9uZVN0ciA9IG5vdGlBcnJ5WzBdXG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uTWdyLnNob3dOb3RpKG9uZVN0cilcbiAgICAgICAgICAgICAgICBub3RpQXJyeS5zcGxpY2UoMCwxKVxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHNlbGYubm9kZSlcbiAgICAgICAgICAgICAgICAgICAgLmRlbGF5KDAuMylcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAoKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZW1wKClcbiAgICAgICAgfVxuICAgIH0sXG59KTtcbiJdfQ==