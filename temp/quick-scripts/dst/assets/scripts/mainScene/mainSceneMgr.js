
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
    this.setupData();
    this.setupUI(); //require("gameMgr")._generateLevelSceneConfig()
  },
  start: function start() {
    //require("systemsMgr").showSystem("storySys",9001,2)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL21haW5TY2VuZS9tYWluU2NlbmVNZ3IuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzZWN0aW9uTmFtZUxhYmVsTm9kZSIsIk5vZGUiLCJsZXZlbE5vZGVzIiwiY29ubmVjdExpbmVOb2RlcyIsImxldmVsTm9kZVByZWZhYiIsIlByZWZhYiIsImxldmVsTm9kZXNDb25uZWN0TGluZVByZWZhYiIsInNlbGVjdGVkU2VjdGlvbiIsInBoeXNpY2FsTGFiZWxOb2RlIiwiaGVhcnRMYWJlbE5vZGUiLCJtYWlsU3lzQnV0dG9uTm9kZSIsInNpZ25JblN5c0J1dHRvbk5vZGUiLCJ3ZWxmYXJ5U3lzQnV0dG9uTm9kZSIsImFkZEhlYXJ0QnV0dG9uTm9kZSIsImFkZFBoeXNpY2FsUG93ZXJCdXR0b25Ob2RlIiwic2VsZWN0U2VjdGlvbkJ1dHRvbk5vZGUiLCJiYWNrVG9DdXJyZW50QnV0dG9uTm9kZSIsImxldmVsTm9kZVN0YXJ0UG9zaXRpb24iLCJ2MiIsImxldmVsTm9kZXNIb3JEaXMiLCJsZXZlbE5vZGVzVmVyRGlzIiwibGV2ZWxOb2Rlc051bVBlckxpbmUiLCJyb3RhZWRDb3BpZWRSYWRpdXMiLCJpc1Nob3dpbmdOb3RpIiwiY2FuU2hvd05vdGkiLCJvbkxvYWQiLCJzZXR1cERhdGEiLCJzZXR1cFVJIiwic3RhcnQiLCJzdG9yeUlkIiwicmVxdWlyZSIsInBsYXllckRhdGEiLCJzdG9yeVN5c0lkIiwic2hvd1N5c3RlbSIsInBsYXlCZ20iLCJzZWxmIiwicGF0aCIsImJnbVBhdGgiLCJsb2FkZXIiLCJsb2FkUmVzIiwiZXJyIiwicmVzIiwiYXVkaW9FbmdpbmUiLCJzdG9wQWxsIiwicGxheSIsImdldENvbXBvbmVudCIsIkxhYmVsIiwic3RyaW5nIiwiaGVhcnQiLCJ0b1N0cmluZyIsInBoeXNpY2FsUG93ZXIiLCJzeXN0ZW1zTWdyIiwib24iLCJyZWRQb2ludFNob3dDb25kaXRpb24iLCJtYWlscyIsInVuUmVhZE51bSIsImtleSIsIm9uZU1haWwiLCJzdGF0dXMiLCJzaWduSW5TdGF0dXMiLCJmbGFnIiwiaW5pdEFkV2F0Y2hlZEZsYWciLCJhY3RpdmUiLCJ0d2VlbiIsInJlcGVhdEZvcmV2ZXIiLCJ0byIsImFuZ2xlIiwiZGVsYXkiLCJvcGFjaXR5IiwiZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUiLCJjdXJyZW50U2VjdGlvbiIsInNldHVwU2VjdGlvblBlcmZvcm1hbmNlIiwieSIsImhlaWdodCIsImxvZyIsInRleHRDb25maWciLCJkZXN0cm95QWxsQ2hpbGRyZW4iLCJyZW1vdmVBbGxDaGlsZHJlbiIsInNlY3Rpb25Db25maWciLCJjb25maWciLCJzZWN0aW9uVGl0bGUiLCJzZWN0aW9uVGl0bGVUZXh0SWQiLCJzZWN0aW9uRGVzIiwic2VjdGlvbkRlc2NyaXBUZXh0SWQiLCJzaG93VGV4dCIsIl9mb3JjZVVwZGF0ZVJlbmRlckRhdGEiLCJ4Iiwid2lkdGgiLCJsZXZlbHMiLCJpbmRleCIsIm9uZUxldmVsIiwib25lTGV2ZWxOb2RlIiwiaW5zdGFudGlhdGUiLCJtZ3IiLCJsZXZlbCIsImxldmVsTnVtTGFiZWxOb2RlIiwicGFyc2VJbnQiLCJfY2hlY2tMZXZlbFN0YXR1cyIsImRlbGVnYXRlIiwiX3NldHVwTGV2ZWxOb2RlUG9zaXRpb24iLCJhZGRDaGlsZCIsImNoaWxkcmVuIiwib25lTm9kZSIsInByZU5vZGUiLCJjb25uZWN0TGluZSIsInYiLCJtYWciLCJkZWdyZWUiLCJzaWduQW5nbGUiLCJNYXRoIiwiUEkiLCJyZXN1bHQiLCJfZ2V0TWlkUG9pbnRPZlR3b1BvaW50cyIsInBvc2l0aW9uIiwiZ2l2ZW5Ob2RlIiwiZ2l2ZW5JbmRleCIsImxldmVsTm9kZVBvc2l0aW9ucyIsImxlbmd0aCIsIm5vZGVzTnVtIiwiYmFzZVZlY3RvciIsInJvdGF0ZSIsInBvaW50MSIsInBvaW50MiIsIl9jaGVja1NlY3Rpb25TdGF0dXMiLCJnaXZlblNlY3Rpb24iLCJnaXZuZUxldmVsIiwic2VjdGlvbktleSIsIl9nZXRTZWN0aW9uS2V5QnlMZXZlbCIsInNlY3Rpb25TdGF0dXMiLCJjdXJyZW50TGV2ZWwiLCJsZXZlbHNBcnJ5IiwiaW5kZXhPZiIsImdpdmVuTGV2ZWwiLCJsZXZlbElkIiwib25lQ29uZmlnIiwibGV2ZWxzQ29uZmlnIiwiZGF0YU1vbml0b3JlZCIsInZhbHVlIiwib25lTWdyIiwidXBkYXRlIiwiZHQiLCJub3RpZmljYXRpb25NZ3IiLCJub3RpQXJyeSIsIm5vdGllcyIsInRlbXAiLCJvbmVTdHIiLCJzaG93Tm90aSIsInNwbGljZSIsIm5vZGUiLCJjYWxsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsb0JBQW9CLEVBQUVKLEVBQUUsQ0FBQ0ssSUFoQmpCO0FBaUJSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ0ssSUFqQlA7QUFrQlJFLElBQUFBLGdCQUFnQixFQUFFUCxFQUFFLENBQUNLLElBbEJiO0FBbUJSRyxJQUFBQSxlQUFlLEVBQUVSLEVBQUUsQ0FBQ1MsTUFuQlo7QUFvQlJDLElBQUFBLDJCQUEyQixFQUFFVixFQUFFLENBQUNTLE1BcEJ4QjtBQXFCUkUsSUFBQUEsZUFBZSxFQUFFLElBckJUO0FBc0JSQyxJQUFBQSxpQkFBaUIsRUFBRVosRUFBRSxDQUFDSyxJQXRCZDtBQXVCUlEsSUFBQUEsY0FBYyxFQUFFYixFQUFFLENBQUNLLElBdkJYO0FBd0JSUyxJQUFBQSxpQkFBaUIsRUFBRWQsRUFBRSxDQUFDSyxJQXhCZDtBQXlCUlUsSUFBQUEsbUJBQW1CLEVBQUVmLEVB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QixDQUF2QixFQUEwQjtBQUN0QmxGLFVBQUFBLElBQUksQ0FBQ1osYUFBTCxHQUFxQixLQUFyQjtBQUNBO0FBQ0g7O0FBRUQsWUFBSTBILE1BQU0sR0FBR0gsUUFBUSxDQUFDLENBQUQsQ0FBckI7QUFDQUQsUUFBQUEsZUFBZSxDQUFDSyxRQUFoQixDQUF5QkQsTUFBekI7QUFDQUgsUUFBQUEsUUFBUSxDQUFDSyxNQUFULENBQWdCLENBQWhCLEVBQWtCLENBQWxCO0FBQ0F2SixRQUFBQSxFQUFFLENBQUNtRSxLQUFILENBQVM1QixJQUFJLENBQUNpSCxJQUFkLEVBQ0tqRixLQURMLENBQ1csR0FEWCxFQUVLa0YsSUFGTCxDQUVVLFlBQVU7QUFDWkwsVUFBQUEsSUFBSTtBQUNQLFNBSkwsRUFLS3BILEtBTEw7QUFNSCxPQWZEOztBQWlCQW9ILE1BQUFBLElBQUk7QUFDUDtBQUNKO0FBcldJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICAgICAgc2VjdGlvbk5hbWVMYWJlbE5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGxldmVsTm9kZXM6IGNjLk5vZGUsXG4gICAgICAgIGNvbm5lY3RMaW5lTm9kZXM6IGNjLk5vZGUsXG4gICAgICAgIGxldmVsTm9kZVByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBsZXZlbE5vZGVzQ29ubmVjdExpbmVQcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgc2VsZWN0ZWRTZWN0aW9uOiBudWxsLFxuICAgICAgICBwaHlzaWNhbExhYmVsTm9kZTogY2MuTm9kZSxcbiAgICAgICAgaGVhcnRMYWJlbE5vZGU6IGNjLk5vZGUsXG4gICAgICAgIG1haWxTeXNCdXR0b25Ob2RlOiBjYy5Ob2RlLFxuICAgICAgICBzaWduSW5TeXNCdXR0b25Ob2RlOiBjYy5Ob2RlLFxuICAgICAgICB3ZWxmYXJ5U3lzQnV0dG9uTm9kZTogY2MuTm9kZSxcbiAgICAgICAgYWRkSGVhcnRCdXR0b25Ob2RlOiBjYy5Ob2RlLFxuICAgICAgICBhZGRQaHlzaWNhbFBvd2VyQnV0dG9uTm9kZTogY2MuTm9kZSxcbiAgICAgICAgc2VsZWN0U2VjdGlvbkJ1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGJhY2tUb0N1cnJlbnRCdXR0b25Ob2RlOiBjYy5Ob2RlLFxuICAgICAgICBsZXZlbE5vZGVTdGFydFBvc2l0aW9uOiBjYy52MigwLDApLFxuICAgICAgICBsZXZlbE5vZGVzSG9yRGlzOiAxMCxcbiAgICAgICAgbGV2ZWxOb2Rlc1ZlckRpczogMjAsXG4gICAgICAgIGxldmVsTm9kZXNOdW1QZXJMaW5lOiA0LFxuXG4gICAgICAgIHJvdGFlZENvcGllZFJhZGl1czogMzAwLFxuICAgICAgICBpc1Nob3dpbmdOb3RpOiBmYWxzZSxcbiAgICAgICAgY2FuU2hvd05vdGk6IHRydWVcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB0aGlzLnNldHVwRGF0YSgpXG4gICAgICAgIHRoaXMuc2V0dXBVSSgpXG4gICAgICAgIC8vcmVxdWlyZShcImdhbWVNZ3JcIikuX2dlbmVyYXRlTGV2ZWxTY2VuZUNvbmZpZygpXG4gICAgfSxcblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgXG4gICAgICAgIC8vcmVxdWlyZShcInN5c3RlbXNNZ3JcIikuc2hvd1N5c3RlbShcInN0b3J5U3lzXCIsOTAwMSwyKVxuICAgICAgICB2YXIgc3RvcnlJZCA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuc3RvcnlTeXNJZFxuICAgICAgICBpZiAoc3RvcnlJZCAhPSAtMSkge1xuICAgICAgICAgICAgcmVxdWlyZShcInN5c3RlbXNNZ3JcIikuc2hvd1N5c3RlbShcInN0b3J5U3lzXCIsc3RvcnlJZCwyKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGxheUJnbSgpXG4gICAgICAgIC8vdGVzdFxuICAgICAgICAvL3JlcXVpcmUoXCJhZHZlcnRpc01nclwiKS5zaG93QWN0aXZpdHlOb2RlKClcbiAgICB9LFxuICAgIHBsYXlCZ20oKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgIHZhciBwYXRoID0gcmVxdWlyZShcInNlY3Rpb25Db25maWdcIilbdGhpcy5zZWxlY3RlZFNlY3Rpb25dLmJnbVBhdGhcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMocGF0aCxmdW5jdGlvbihlcnIscmVzKXtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKVxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheShyZXMsdHJ1ZSwxKVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgc2V0dXBVSSgpIHtcbiAgICAgICAgdGhpcy5oZWFydExhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuaGVhcnQudG9TdHJpbmcoKVxuICAgICAgICB0aGlzLnBoeXNpY2FsTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5waHlzaWNhbFBvd2VyLnRvU3RyaW5nKClcbiAgICAgICAgdmFyIHN5c3RlbXNNZ3IgPSByZXF1aXJlKFwic3lzdGVtc01nclwiKVxuICAgICAgICB0aGlzLm1haWxTeXNCdXR0b25Ob2RlLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgc3lzdGVtc01nci5zaG93U3lzdGVtKFwibWFpbFN5c1wiLG51bGwsMSwyKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLm1haWxTeXNCdXR0b25Ob2RlLmdldENvbXBvbmVudChcInJlZFBvaW50TWdyXCIpLnJlZFBvaW50U2hvd0NvbmRpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG1haWxzID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5tYWlsc1xuICAgICAgICAgICAgdmFyIHVuUmVhZE51bSA9IDBcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBtYWlscykge1xuICAgICAgICAgICAgICAgIHZhciBvbmVNYWlsID0gbWFpbHNba2V5XVxuICAgICAgICAgICAgICAgIGlmIChvbmVNYWlsLnN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHVuUmVhZE51bSArPSAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHVuUmVhZE51bSA+IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMuc2lnbkluU3lzQnV0dG9uTm9kZS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHN5c3RlbXNNZ3Iuc2hvd1N5c3RlbShcInNpZ25JblN5c1wiKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnNpZ25JblN5c0J1dHRvbk5vZGUuZ2V0Q29tcG9uZW50KFwicmVkUG9pbnRNZ3JcIikucmVkUG9pbnRTaG93Q29uZGl0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgc2lnbkluU3RhdHVzID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5zaWduSW5TdGF0dXNcbiAgICAgICAgICAgIHN3aXRjaChzaWduSW5TdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hZGRQaHlzaWNhbFBvd2VyQnV0dG9uTm9kZS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHN5c3RlbXNNZ3Iuc2hvd1N5c3RlbShcImFkZFByb3BlcnR5TnVtU3lzXCIsMSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5hZGRIZWFydEJ1dHRvbk5vZGUub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzeXN0ZW1zTWdyLnNob3dTeXN0ZW0oXCJhZGRQcm9wZXJ0eU51bVN5c1wiLDIpXG4gICAgICAgIH0pXG5cbiAgICAgICAgdmFyIGZsYWcgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmluaXRBZFdhdGNoZWRGbGFnXG4gICAgICAgIGlmIChmbGFnID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMud2VsZmFyeVN5c0J1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMud2VsZmFyeVN5c0J1dHRvbk5vZGUpXG4gICAgICAgICAgICAgICAgLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKVxuICAgICAgICAgICAgICAgICAgICAudG8oMC4zLHthbmdsZTogLTQ1fSlcbiAgICAgICAgICAgICAgICAgICAgLnRvKDAuMyx7YW5nbGU6IDB9KVxuICAgICAgICAgICAgICAgICAgICAudG8oMC4zLHthbmdsZTogNDV9KVxuICAgICAgICAgICAgICAgICAgICAudG8oMC4zLHthbmdsZTogMH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZWxheSgxKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuc3RhcnQoKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLndlbGZhcnlTeXNCdXR0b25Ob2RlLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHN5c3RlbXNNZ3Iuc2hvd1N5c3RlbShcIndlbGZhcnlTeXNcIilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdFNlY3Rpb25CdXR0b25Ob2RlLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgc3lzdGVtc01nci5zaG93U3lzdGVtKFwic2VsZWN0U2VjdGlvblN5c1wiKVxuICAgICAgICB9KVxuXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuYmFja1RvQ3VycmVudEJ1dHRvbk5vZGUpXG4gICAgICAgICAgICAucmVwZWF0Rm9yZXZlcihjYy50d2VlbigpXG4gICAgICAgICAgICAgICAgICAgIC50bygxLCB7b3BhY2l0eTogMH0pXG4gICAgICAgICAgICAgICAgICAgIC50bygxLCB7b3BhY2l0eTogMjU1fSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdGFydCgpXG4gICAgICAgIHRoaXMuYmFja1RvQ3VycmVudEJ1dHRvbk5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKS5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxNjcpXG4gICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICB0aGlzLmJhY2tUb0N1cnJlbnRCdXR0b25Ob2RlLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5zZWxlY3RlZFNlY3Rpb24gPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmN1cnJlbnRTZWN0aW9uXG4gICAgICAgICAgICBzZWxmLnNldHVwU2VjdGlvblBlcmZvcm1hbmNlKClcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5iYWNrVG9DdXJyZW50QnV0dG9uTm9kZS55ID0gdGhpcy5zZWN0aW9uTmFtZUxhYmVsTm9kZS55IC0gdGhpcy5zZWN0aW9uTmFtZUxhYmVsTm9kZS5oZWlnaHQgLyAyIC0gMTAwXG4gICAgICAgIHRoaXMuc2V0dXBTZWN0aW9uUGVyZm9ybWFuY2UoKVxuICAgIH0sXG5cbiAgICBzZXR1cERhdGEoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRTZWN0aW9uID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5jdXJyZW50U2VjdGlvblxuICAgIH0sXG5cbiAgICBzZXR1cFNlY3Rpb25QZXJmb3JtYW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRTZWN0aW9uID09IG51bGwpIHtcbiAgICAgICAgICAgIGNjLmxvZyhcIm5vdCBzZWxlY3RlZCBvbmUgc2VjdGlvbiwgY2FuIG5vdCBzZXR1cCBzZWN0aW9uIG9mIG1haW5TY2VuZSBtZ3JcIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkU2VjdGlvbiA9PSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmJhY2tUb0N1cnJlbnRCdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJhY2tUb0N1cnJlbnRCdXR0b25Ob2RlLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGV4dENvbmZpZyA9IHJlcXVpcmUoXCJ0ZXh0Q29uZmlnXCIpXG4gICAgICAgIHRoaXMubGV2ZWxOb2Rlcy5kZXN0cm95QWxsQ2hpbGRyZW4oKVxuICAgICAgICB0aGlzLmxldmVsTm9kZXMucmVtb3ZlQWxsQ2hpbGRyZW4oKVxuICAgICAgICB0aGlzLmNvbm5lY3RMaW5lTm9kZXMuZGVzdHJveUFsbENoaWxkcmVuKClcbiAgICAgICAgdGhpcy5jb25uZWN0TGluZU5vZGVzLnJlbW92ZUFsbENoaWxkcmVuKClcbiAgICAgICAgdmFyIHNlY3Rpb25Db25maWcgPSByZXF1aXJlKFwic2VjdGlvbkNvbmZpZ1wiKVxuICAgICAgICB2YXIgY29uZmlnID0gc2VjdGlvbkNvbmZpZ1t0aGlzLnNlbGVjdGVkU2VjdGlvbl1cbiAgICAgICAgdmFyIHNlY3Rpb25UaXRsZSA9IHRleHRDb25maWcuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoY29uZmlnLnNlY3Rpb25UaXRsZVRleHRJZClcbiAgICAgICAgdmFyIHNlY3Rpb25EZXMgPSB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKGNvbmZpZy5zZWN0aW9uRGVzY3JpcFRleHRJZClcbiAgICAgICAgdmFyIHNob3dUZXh0ID0gc2VjdGlvblRpdGxlICsgXCIgXCIgKyBzZWN0aW9uRGVzXG4gICAgICAgIHRoaXMuc2VjdGlvbk5hbWVMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzaG93VGV4dFxuICAgICAgICB0aGlzLnNlY3Rpb25OYW1lTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuX2ZvcmNlVXBkYXRlUmVuZGVyRGF0YSgpXG4gICAgICAgIHRoaXMuc2VsZWN0U2VjdGlvbkJ1dHRvbk5vZGUueSA9IHRoaXMuc2VjdGlvbk5hbWVMYWJlbE5vZGUueVxuICAgICAgICB0aGlzLnNlbGVjdFNlY3Rpb25CdXR0b25Ob2RlLnggPSB0aGlzLnNlY3Rpb25OYW1lTGFiZWxOb2RlLnggLSB0aGlzLnNlY3Rpb25OYW1lTGFiZWxOb2RlLndpZHRoIC8gMiAtIDEwMFxuICAgICAgICB2YXIgbGV2ZWxzID0gY29uZmlnLmxldmVsc1xuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBsZXZlbHMpIHtcbiAgICAgICAgICAgIHZhciBvbmVMZXZlbCA9IGxldmVsc1tpbmRleF1cbiAgICAgICAgICAgIHZhciBvbmVMZXZlbE5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmxldmVsTm9kZVByZWZhYilcbiAgICAgICAgICAgIHZhciBtZ3IgPSBvbmVMZXZlbE5vZGUuZ2V0Q29tcG9uZW50KFwibGV2ZWxOb2RlTWdyXCIpXG4gICAgICAgICAgICBtZ3IubGV2ZWwgPSBvbmVMZXZlbFxuICAgICAgICAgICAgbWdyLmxldmVsTnVtTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHBhcnNlSW50KGluZGV4KSArIDEpLnRvU3RyaW5nKClcbiAgICAgICAgICAgIG1nci5zdGF0dXMgPSB0aGlzLl9jaGVja0xldmVsU3RhdHVzKG9uZUxldmVsKVxuICAgICAgICAgICAgbWdyLmRlbGVnYXRlID0gdGhpc1xuICAgICAgICAgICAgdGhpcy5fc2V0dXBMZXZlbE5vZGVQb3NpdGlvbihvbmVMZXZlbE5vZGUsaW5kZXgpXG4gICAgICAgICAgICB0aGlzLmxldmVsTm9kZXMuYWRkQ2hpbGQob25lTGV2ZWxOb2RlKVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gdGhpcy5sZXZlbE5vZGVzLmNoaWxkcmVuKXtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBvbmVOb2RlID0gdGhpcy5sZXZlbE5vZGVzLmNoaWxkcmVuW2luZGV4XVxuICAgICAgICAgICAgdmFyIHByZU5vZGUgPSB0aGlzLmxldmVsTm9kZXMuY2hpbGRyZW5bKGluZGV4IC0gMSldXG4gICAgICAgICAgICB2YXIgY29ubmVjdExpbmUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmxldmVsTm9kZXNDb25uZWN0TGluZVByZWZhYilcbiAgICAgICAgICAgIHZhciB2ID0gY2MudjIocHJlTm9kZS54IC0gb25lTm9kZS54LCBwcmVOb2RlLnkgLSBvbmVOb2RlLnkpXG4gICAgICAgICAgICBjb25uZWN0TGluZS53aWR0aCA9IHYubWFnKClcbiAgICAgICAgICAgIHZhciBkZWdyZWU9IHYuc2lnbkFuZ2xlKGNjLnYyKDEsMCkpIC8gTWF0aC5QSSAqIDE4MFxuICAgICAgICAgICAgY29ubmVjdExpbmUuYW5nbGUgPSAtZGVncmVlXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fZ2V0TWlkUG9pbnRPZlR3b1BvaW50cyhvbmVOb2RlLnBvc2l0aW9uLCBwcmVOb2RlLnBvc2l0aW9uKVxuICAgICAgICAgICAgY29ubmVjdExpbmUueCA9IHJlc3VsdC54XG4gICAgICAgICAgICBjb25uZWN0TGluZS55ID0gcmVzdWx0LnlcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdExpbmVOb2Rlcy5hZGRDaGlsZChjb25uZWN0TGluZSlcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX3NldHVwTGV2ZWxOb2RlUG9zaXRpb24oZ2l2ZW5Ob2RlLCBnaXZlbkluZGV4KSB7XG4gICAgICAgIHZhciBzZWN0aW9uQ29uZmlnID0gcmVxdWlyZShcInNlY3Rpb25Db25maWdcIilbdGhpcy5zZWxlY3RlZFNlY3Rpb25dXG4gICAgICAgIHZhciBsZXZlbE5vZGVQb3NpdGlvbnMgPSBzZWN0aW9uQ29uZmlnLmxldmVsTm9kZVBvc2l0aW9uc1xuICAgICAgICBpZiAobGV2ZWxOb2RlUG9zaXRpb25zID09IG51bGwgfHwgbGV2ZWxOb2RlUG9zaXRpb25zLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAvL2xpbmVkXG5cbiAgICAgICAgICAgIC8vIHZhciByb3dJbmRleCA9IGdpdmVuSW5kZXggJSB0aGlzLmxldmVsTm9kZXNOdW1QZXJMaW5lXG4gICAgICAgICAgICAvLyB2YXIgY29sSW5kZXggPSBNYXRoLmZsb29yKGdpdmVuSW5kZXggLyB0aGlzLmxldmVsTm9kZXNOdW1QZXJMaW5lKVxuXG4gICAgICAgICAgICAvLyB2YXIgbWF4WCA9IHRoaXMubGV2ZWxOb2RlU3RhcnRQb3NpdGlvbi54ICsgdGhpcy5sZXZlbE5vZGVzSG9yRGlzICogKHRoaXMubGV2ZWxOb2Rlc051bVBlckxpbmUgLSAxKVxuICAgICAgICAgICAgLy8gaWYgKGNvbEluZGV4ICUgMiA9PSAwKSB7XG4gICAgICAgICAgICAvLyAgICAgZ2l2ZW5Ob2RlLnggPSB0aGlzLmxldmVsTm9kZVN0YXJ0UG9zaXRpb24ueCArIHJvd0luZGV4ICogdGhpcy5sZXZlbE5vZGVzSG9yRGlzXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICBnaXZlbk5vZGUueCA9IG1heFggLSByb3dJbmRleCAqIHRoaXMubGV2ZWxOb2Rlc0hvckRpc1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gZ2l2ZW5Ob2RlLnkgPSB0aGlzLmxldmVsTm9kZVN0YXJ0UG9zaXRpb24ueSArIGNvbEluZGV4ICogdGhpcy5sZXZlbE5vZGVzVmVyRGlzXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIHZhciBsZXZlbE5vZGVTdGFydCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNlY3Rpb25OYW1lTGFiZWxcIikuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbE5vZGVTdGFydFwiKVxuICAgICAgICAgICAgLy8gZ2l2ZW5Ob2RlLnggPSBsZXZlbE5vZGVTdGFydC54XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGdpdmVuTm9kZS55ID0gbGV2ZWxOb2RlU3RhcnQueSArIGdpdmVuSW5kZXggKiB0aGlzLmxldmVsTm9kZXNWZXJEaXNcblxuICAgICAgICAgICAgLy9yb3RhdGVkIGNvcGllZFxuICAgICAgICAgICAgdmFyIG5vZGVzTnVtID0gc2VjdGlvbkNvbmZpZy5sZXZlbHMubGVuZ3RoXG4gICAgICAgICAgICB2YXIgYW5nbGUgPSAyICogTWF0aC5QSSAvIG5vZGVzTnVtXG4gICAgICAgICAgICB2YXIgYmFzZVZlY3RvciA9IGNjLnYyKHRoaXMucm90YWVkQ29waWVkUmFkaXVzLDApXG4gICAgICAgICAgICB2YXIgdiA9IGJhc2VWZWN0b3Iucm90YXRlKC1naXZlbkluZGV4ICogYW5nbGUpXG4gICAgICAgICAgICBnaXZlbk5vZGUueCA9IHYueFxuICAgICAgICAgICAgZ2l2ZW5Ob2RlLnkgPSB2LnlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdpdmVuTm9kZS54ID0gbGV2ZWxOb2RlUG9zaXRpb25zW2dpdmVuSW5kZXhdLnhcbiAgICAgICAgICAgIGdpdmVuTm9kZS55ID0gbGV2ZWxOb2RlUG9zaXRpb25zW2dpdmVuSW5kZXhdLnlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfZ2V0TWlkUG9pbnRPZlR3b1BvaW50cyhwb2ludDEscG9pbnQyKSB7XG4gICAgICAgIHZhciB2ID0gY2MudjIocG9pbnQyLnggLSBwb2ludDEueCwgcG9pbnQyLnkgLSBwb2ludDEueSlcbiAgICAgICAgdmFyIHggPSBwb2ludDEueCArIHYueCAvIDJcbiAgICAgICAgdmFyIHkgPSBwb2ludDEueSArIHYueSAvIDJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHgseSlcbiAgICB9LFxuXG5cbiAgICBfY2hlY2tTZWN0aW9uU3RhdHVzKGdpdmVuU2VjdGlvbikge1xuICAgICAgICB2YXIgY3VycmVudFNlY3Rpb24gPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmN1cnJlbnRTZWN0aW9uXG4gICAgICAgIGlmICh0eXBlb2YgZ2l2ZW5TZWN0aW9uICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBnaXZlblNlY3Rpb24gPSBwYXJzZUludChnaXZlblNlY3Rpb24pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdpdmVuU2VjdGlvbiA+IGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gMCAvL2xvY2tlZFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGdpdmVuU2VjdGlvbiA8IGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gMSAvL3VubG9ja2VkXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZ2l2ZW5TZWN0aW9uID09IGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gMiAvL2N1cnJlbnRcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfY2hlY2tMZXZlbFN0YXR1cyhnaXZuZUxldmVsKSB7XG4gICAgICAgIHZhciBzZWN0aW9uS2V5ID0gdGhpcy5fZ2V0U2VjdGlvbktleUJ5TGV2ZWwoZ2l2bmVMZXZlbClcbiAgICAgICAgaWYgKHNlY3Rpb25LZXkgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZSAvL25vIHN1Y2ggbGV2ZWxcbiAgICAgICAgfVxuICAgICAgIFxuICAgICAgICB2YXIgc2VjdGlvblN0YXR1cyA9IHRoaXMuX2NoZWNrU2VjdGlvblN0YXR1cyhzZWN0aW9uS2V5KVxuICAgICAgICBzd2l0Y2goc2VjdGlvblN0YXR1cykge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiAwIC8vbG9ja2VkXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEgLy91bmxvY2tlZFxuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50TGV2ZWwgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmN1cnJlbnRMZXZlbFxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50TGV2ZWwgPT0gZ2l2bmVMZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMiAvL2N1cnJlbnRcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgc2VjdGlvbkNvbmZpZyA9IHJlcXVpcmUoXCJzZWN0aW9uQ29uZmlnXCIpW3NlY3Rpb25LZXldXG4gICAgICAgICAgICAgICAgdmFyIGxldmVsc0FycnkgPSBzZWN0aW9uQ29uZmlnLmxldmVsc1xuICAgICAgICAgICAgICAgIGlmIChsZXZlbHNBcnJ5LmluZGV4T2YoZ2l2bmVMZXZlbCkgPiBsZXZlbHNBcnJ5LmluZGV4T2YoY3VycmVudExldmVsKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMCAvL2xvY2tlZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gMSAvL3VubG9ja2VkXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9nZXRTZWN0aW9uS2V5QnlMZXZlbChnaXZlbkxldmVsKSB7XG4gICAgICAgIHZhciBsZXZlbElkID0gcGFyc2VJbnQoZ2l2ZW5MZXZlbClcbiAgICAgICAgdmFyIHNlY3Rpb25Db25maWcgPSByZXF1aXJlKFwic2VjdGlvbkNvbmZpZ1wiKVxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc2VjdGlvbkNvbmZpZykge1xuICAgICAgICAgICAgdmFyIG9uZUNvbmZpZyA9IHNlY3Rpb25Db25maWdba2V5XVxuICAgICAgICAgICAgdmFyIGxldmVsc0NvbmZpZyA9IG9uZUNvbmZpZy5sZXZlbHNcbiAgICAgICAgICAgIGlmIChsZXZlbHNDb25maWcuaW5kZXhPZihsZXZlbElkKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH0sXG5cblxuICAgIGRhdGFNb25pdG9yZWQoa2V5LHZhbHVlKSB7XG4gICAgICAgIGlmIChrZXkgPT0gXCJwaHlzaWNhbFBvd2VyXCIpIHtcbiAgICAgICAgICAgIHRoaXMucGh5c2ljYWxMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB2YWx1ZS50b1N0cmluZygpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09IFwiaGVhcnRcIikge1xuICAgICAgICAgICAgdGhpcy5oZWFydExhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHZhbHVlLnRvU3RyaW5nKClcbiAgICAgICAgfVxuICAgICAgICBmb3IodmFyIGluZGV4IGluIHRoaXMubGV2ZWxOb2Rlcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgdmFyIG9uZU1nciA9IHRoaXMubGV2ZWxOb2Rlcy5jaGlsZHJlbltpbmRleF0uZ2V0Q29tcG9uZW50KFwibGV2ZWxOb2RlTWdyXCIpXG4gICAgICAgICAgICBvbmVNZ3IuZGF0YU1vbml0b3JlZChrZXksdmFsdWUpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlIChkdCkge1xuICAgICAgICB2YXIgbm90aWZpY2F0aW9uTWdyID0gcmVxdWlyZShcIm5vdGlmaWNhdGlvbk1nclwiKVxuICAgICAgICB2YXIgbm90aUFycnkgPSBub3RpZmljYXRpb25NZ3Iubm90aWVzXG4gICAgICAgIGlmIChub3RpQXJyeS5sZW5ndGggPiAwICYmIHRoaXMuaXNTaG93aW5nTm90aSA9PSBmYWxzZSAmJiB0aGlzLmNhblNob3dOb3RpID09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTaG93aW5nTm90aSA9IHRydWVcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICAgICAgdmFyIHRlbXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAobm90aUFycnkubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pc1Nob3dpbmdOb3RpID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIG9uZVN0ciA9IG5vdGlBcnJ5WzBdXG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uTWdyLnNob3dOb3RpKG9uZVN0cilcbiAgICAgICAgICAgICAgICBub3RpQXJyeS5zcGxpY2UoMCwxKVxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHNlbGYubm9kZSlcbiAgICAgICAgICAgICAgICAgICAgLmRlbGF5KDAuMylcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAoKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZW1wKClcbiAgICAgICAgfVxuICAgIH0sXG59KTtcbiJdfQ==