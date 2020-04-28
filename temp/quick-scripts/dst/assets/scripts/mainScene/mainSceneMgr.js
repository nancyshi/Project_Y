
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
    levelNodeStartPosition: cc.v2(0, 0),
    levelNodesHorDis: 10,
    levelNodesVerDis: 20,
    levelNodesNumPerLine: 4,
    rotaedCopiedRadius: 300,
    isShowingNoti: false
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
      systemsMgr.showSystem("mailSys");
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

    if (notiArry.length > 0 && this.isShowingNoti == false) {
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
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL21haW5TY2VuZS9tYWluU2NlbmVNZ3IuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzZWN0aW9uTmFtZUxhYmVsTm9kZSIsIk5vZGUiLCJsZXZlbE5vZGVzIiwiY29ubmVjdExpbmVOb2RlcyIsImxldmVsTm9kZVByZWZhYiIsIlByZWZhYiIsImxldmVsTm9kZXNDb25uZWN0TGluZVByZWZhYiIsInNlbGVjdGVkU2VjdGlvbiIsInBoeXNpY2FsTGFiZWxOb2RlIiwiaGVhcnRMYWJlbE5vZGUiLCJtYWlsU3lzQnV0dG9uTm9kZSIsInNpZ25JblN5c0J1dHRvbk5vZGUiLCJ3ZWxmYXJ5U3lzQnV0dG9uTm9kZSIsImFkZEhlYXJ0QnV0dG9uTm9kZSIsImFkZFBoeXNpY2FsUG93ZXJCdXR0b25Ob2RlIiwic2VsZWN0U2VjdGlvbkJ1dHRvbk5vZGUiLCJsZXZlbE5vZGVTdGFydFBvc2l0aW9uIiwidjIiLCJsZXZlbE5vZGVzSG9yRGlzIiwibGV2ZWxOb2Rlc1ZlckRpcyIsImxldmVsTm9kZXNOdW1QZXJMaW5lIiwicm90YWVkQ29waWVkUmFkaXVzIiwiaXNTaG93aW5nTm90aSIsIm9uTG9hZCIsInNldHVwRGF0YSIsInNldHVwVUkiLCJzdGFydCIsInN0b3J5SWQiLCJyZXF1aXJlIiwicGxheWVyRGF0YSIsInN0b3J5U3lzSWQiLCJzaG93U3lzdGVtIiwicGxheUJnbSIsInNlbGYiLCJwYXRoIiwiYmdtUGF0aCIsImxvYWRlciIsImxvYWRSZXMiLCJlcnIiLCJyZXMiLCJhdWRpb0VuZ2luZSIsInN0b3BBbGwiLCJwbGF5IiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciLCJoZWFydCIsInRvU3RyaW5nIiwicGh5c2ljYWxQb3dlciIsInN5c3RlbXNNZ3IiLCJvbiIsInJlZFBvaW50U2hvd0NvbmRpdGlvbiIsIm1haWxzIiwidW5SZWFkTnVtIiwia2V5Iiwib25lTWFpbCIsInN0YXR1cyIsInNpZ25JblN0YXR1cyIsImZsYWciLCJpbml0QWRXYXRjaGVkRmxhZyIsImFjdGl2ZSIsInR3ZWVuIiwicmVwZWF0Rm9yZXZlciIsInRvIiwiYW5nbGUiLCJkZWxheSIsInNldHVwU2VjdGlvblBlcmZvcm1hbmNlIiwiY3VycmVudFNlY3Rpb24iLCJsb2ciLCJ0ZXh0Q29uZmlnIiwiZGVzdHJveUFsbENoaWxkcmVuIiwicmVtb3ZlQWxsQ2hpbGRyZW4iLCJzZWN0aW9uQ29uZmlnIiwiY29uZmlnIiwic2VjdGlvblRpdGxlIiwiZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUiLCJzZWN0aW9uVGl0bGVUZXh0SWQiLCJzZWN0aW9uRGVzIiwic2VjdGlvbkRlc2NyaXBUZXh0SWQiLCJzaG93VGV4dCIsImxldmVscyIsImluZGV4Iiwib25lTGV2ZWwiLCJvbmVMZXZlbE5vZGUiLCJpbnN0YW50aWF0ZSIsIm1nciIsImxldmVsIiwibGV2ZWxOdW1MYWJlbE5vZGUiLCJwYXJzZUludCIsIl9jaGVja0xldmVsU3RhdHVzIiwiZGVsZWdhdGUiLCJfc2V0dXBMZXZlbE5vZGVQb3NpdGlvbiIsImFkZENoaWxkIiwiY2hpbGRyZW4iLCJvbmVOb2RlIiwicHJlTm9kZSIsImNvbm5lY3RMaW5lIiwidiIsIngiLCJ5Iiwid2lkdGgiLCJtYWciLCJkZWdyZWUiLCJzaWduQW5nbGUiLCJNYXRoIiwiUEkiLCJyZXN1bHQiLCJfZ2V0TWlkUG9pbnRPZlR3b1BvaW50cyIsInBvc2l0aW9uIiwiZ2l2ZW5Ob2RlIiwiZ2l2ZW5JbmRleCIsImxldmVsTm9kZVBvc2l0aW9ucyIsImxlbmd0aCIsIm5vZGVzTnVtIiwiYmFzZVZlY3RvciIsInJvdGF0ZSIsInBvaW50MSIsInBvaW50MiIsIl9jaGVja1NlY3Rpb25TdGF0dXMiLCJnaXZlblNlY3Rpb24iLCJnaXZuZUxldmVsIiwic2VjdGlvbktleSIsIl9nZXRTZWN0aW9uS2V5QnlMZXZlbCIsInNlY3Rpb25TdGF0dXMiLCJjdXJyZW50TGV2ZWwiLCJsZXZlbHNBcnJ5IiwiaW5kZXhPZiIsImdpdmVuTGV2ZWwiLCJsZXZlbElkIiwib25lQ29uZmlnIiwibGV2ZWxzQ29uZmlnIiwiZGF0YU1vbml0b3JlZCIsInZhbHVlIiwib25lTWdyIiwidXBkYXRlIiwiZHQiLCJub3RpZmljYXRpb25NZ3IiLCJub3RpQXJyeSIsIm5vdGllcyIsInRlbXAiLCJvbmVTdHIiLCJzaG93Tm90aSIsInNwbGljZSIsIm5vZGUiLCJjYWxsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsb0JBQW9CLEVBQUVKLEVBQUUsQ0FBQ0ssSUFoQmpCO0FBaUJSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ0ssSUFqQlA7QUFrQlJFLElBQUFBLGdCQUFnQixFQUFFUCxFQUFFLENBQUNLLElBbEJiO0FBbUJSRyxJQUFBQSxlQUFlLEVBQUVSLEVBQUUsQ0FBQ1MsTUFuQlo7QUFvQlJDLElBQUFBLDJCQUEyQixFQUFFVixFQUFFLENBQUNTLE1BcEJ4QjtBQXFCUkUsSUFBQUEsZUFBZSxFQUFFLElBckJUO0FBc0JSQyxJQUFBQSxpQkFBaUIsRUFBRVosRUFBRSxDQUFDSyxJQXRCZDtBQXVCUlEsSUFBQUEsY0FBYyxFQUFFYixFQUFFLENBQUNLLElBdkJYO0FBd0JSUyxJQUFBQSxpQkFBaUIsRUFBRWQsRUFBRSxDQUFDSyxJQXhCZDtBQXlCUlUsSUFBQUEsbUJBQW1CLEVBQUVmLEVBQUUsQ0FBQ0ssSUF6QmhCO0FBMEJSVyxJQUFBQSxvQkFBb0IsRUFBRWhCLEVBQUUsQ0FBQ0ssSUExQmpCO0FBMkJSWSxJQUFBQSxrQkFBa0IsRUFB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QWI7QUFDQTBGLE1BQUFBLE1BQU0sQ0FBQ0YsYUFBUCxDQUFxQjdFLEdBQXJCLEVBQXlCOEUsS0FBekI7QUFDSDtBQUNKLEdBblRJO0FBcVRMRSxFQUFBQSxNQXJUSyxrQkFxVEdDLEVBclRILEVBcVRPO0FBQ1IsUUFBSUMsZUFBZSxHQUFHNUcsT0FBTyxDQUFDLGlCQUFELENBQTdCOztBQUNBLFFBQUk2RyxRQUFRLEdBQUdELGVBQWUsQ0FBQ0UsTUFBL0I7O0FBQ0EsUUFBSUQsUUFBUSxDQUFDekIsTUFBVCxHQUFrQixDQUFsQixJQUF1QixLQUFLMUYsYUFBTCxJQUFzQixLQUFqRCxFQUF3RDtBQUNwRCxXQUFLQSxhQUFMLEdBQXFCLElBQXJCO0FBQ0EsVUFBSVcsSUFBSSxHQUFHLElBQVg7O0FBQ0EsVUFBSTBHLElBQUksR0FBRyxTQUFQQSxJQUFPLEdBQVc7QUFDbEIsWUFBSUYsUUFBUSxDQUFDekIsTUFBVCxJQUFtQixDQUF2QixFQUEwQjtBQUN0Qi9FLFVBQUFBLElBQUksQ0FBQ1gsYUFBTCxHQUFxQixLQUFyQjtBQUNBO0FBQ0g7O0FBRUQsWUFBSXNILE1BQU0sR0FBR0gsUUFBUSxDQUFDLENBQUQsQ0FBckI7QUFDQUQsUUFBQUEsZUFBZSxDQUFDSyxRQUFoQixDQUF5QkQsTUFBekI7QUFDQUgsUUFBQUEsUUFBUSxDQUFDSyxNQUFULENBQWdCLENBQWhCLEVBQWtCLENBQWxCO0FBQ0FsSixRQUFBQSxFQUFFLENBQUNpRSxLQUFILENBQVM1QixJQUFJLENBQUM4RyxJQUFkLEVBQ0s5RSxLQURMLENBQ1csR0FEWCxFQUVLK0UsSUFGTCxDQUVVLFlBQVU7QUFDWkwsVUFBQUEsSUFBSTtBQUNQLFNBSkw7QUFLSCxPQWREOztBQWdCQUEsTUFBQUEsSUFBSTtBQUNQO0FBQ0o7QUE3VUksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHBzOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICBzZWN0aW9uTmFtZUxhYmVsTm9kZTogY2MuTm9kZSxcbiAgICAgICAgbGV2ZWxOb2RlczogY2MuTm9kZSxcbiAgICAgICAgY29ubmVjdExpbmVOb2RlczogY2MuTm9kZSxcbiAgICAgICAgbGV2ZWxOb2RlUHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGxldmVsTm9kZXNDb25uZWN0TGluZVByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBzZWxlY3RlZFNlY3Rpb246IG51bGwsXG4gICAgICAgIHBoeXNpY2FsTGFiZWxOb2RlOiBjYy5Ob2RlLFxuICAgICAgICBoZWFydExhYmVsTm9kZTogY2MuTm9kZSxcbiAgICAgICAgbWFpbFN5c0J1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIHNpZ25JblN5c0J1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIHdlbGZhcnlTeXNCdXR0b25Ob2RlOiBjYy5Ob2RlLFxuICAgICAgICBhZGRIZWFydEJ1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGFkZFBoeXNpY2FsUG93ZXJCdXR0b25Ob2RlOiBjYy5Ob2RlLFxuICAgICAgICBzZWxlY3RTZWN0aW9uQnV0dG9uTm9kZTogY2MuTm9kZSxcbiAgICAgICAgbGV2ZWxOb2RlU3RhcnRQb3NpdGlvbjogY2MudjIoMCwwKSxcbiAgICAgICAgbGV2ZWxOb2Rlc0hvckRpczogMTAsXG4gICAgICAgIGxldmVsTm9kZXNWZXJEaXM6IDIwLFxuICAgICAgICBsZXZlbE5vZGVzTnVtUGVyTGluZTogNCxcblxuICAgICAgICByb3RhZWRDb3BpZWRSYWRpdXM6IDMwMCxcbiAgICAgICAgaXNTaG93aW5nTm90aTogZmFsc2VcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB0aGlzLnNldHVwRGF0YSgpXG4gICAgICAgIHRoaXMuc2V0dXBVSSgpXG4gICAgICAgIC8vcmVxdWlyZShcImdhbWVNZ3JcIikuX2dlbmVyYXRlTGV2ZWxTY2VuZUNvbmZpZygpXG4gICAgfSxcblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgXG4gICAgICAgIC8vcmVxdWlyZShcInN5c3RlbXNNZ3JcIikuc2hvd1N5c3RlbShcInN0b3J5U3lzXCIsOTAwMSwyKVxuICAgICAgICB2YXIgc3RvcnlJZCA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuc3RvcnlTeXNJZFxuICAgICAgICBpZiAoc3RvcnlJZCAhPSAtMSkge1xuICAgICAgICAgICAgcmVxdWlyZShcInN5c3RlbXNNZ3JcIikuc2hvd1N5c3RlbShcInN0b3J5U3lzXCIsc3RvcnlJZCwyKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGxheUJnbSgpXG4gICAgICAgIC8vdGVzdFxuICAgICAgICAvL3JlcXVpcmUoXCJhZHZlcnRpc01nclwiKS5zaG93QWN0aXZpdHlOb2RlKClcbiAgICB9LFxuICAgIHBsYXlCZ20oKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgIHZhciBwYXRoID0gcmVxdWlyZShcInNlY3Rpb25Db25maWdcIilbdGhpcy5zZWxlY3RlZFNlY3Rpb25dLmJnbVBhdGhcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMocGF0aCxmdW5jdGlvbihlcnIscmVzKXtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKVxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheShyZXMsdHJ1ZSwxKVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgc2V0dXBVSSgpIHtcbiAgICAgICAgdGhpcy5oZWFydExhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuaGVhcnQudG9TdHJpbmcoKVxuICAgICAgICB0aGlzLnBoeXNpY2FsTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5waHlzaWNhbFBvd2VyLnRvU3RyaW5nKClcbiAgICAgICAgdmFyIHN5c3RlbXNNZ3IgPSByZXF1aXJlKFwic3lzdGVtc01nclwiKVxuICAgICAgICB0aGlzLm1haWxTeXNCdXR0b25Ob2RlLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgc3lzdGVtc01nci5zaG93U3lzdGVtKFwibWFpbFN5c1wiKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLm1haWxTeXNCdXR0b25Ob2RlLmdldENvbXBvbmVudChcInJlZFBvaW50TWdyXCIpLnJlZFBvaW50U2hvd0NvbmRpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG1haWxzID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5tYWlsc1xuICAgICAgICAgICAgdmFyIHVuUmVhZE51bSA9IDBcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBtYWlscykge1xuICAgICAgICAgICAgICAgIHZhciBvbmVNYWlsID0gbWFpbHNba2V5XVxuICAgICAgICAgICAgICAgIGlmIChvbmVNYWlsLnN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHVuUmVhZE51bSArPSAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHVuUmVhZE51bSA+IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMuc2lnbkluU3lzQnV0dG9uTm9kZS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHN5c3RlbXNNZ3Iuc2hvd1N5c3RlbShcInNpZ25JblN5c1wiKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnNpZ25JblN5c0J1dHRvbk5vZGUuZ2V0Q29tcG9uZW50KFwicmVkUG9pbnRNZ3JcIikucmVkUG9pbnRTaG93Q29uZGl0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgc2lnbkluU3RhdHVzID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5zaWduSW5TdGF0dXNcbiAgICAgICAgICAgIHN3aXRjaChzaWduSW5TdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hZGRQaHlzaWNhbFBvd2VyQnV0dG9uTm9kZS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHN5c3RlbXNNZ3Iuc2hvd1N5c3RlbShcImFkZFByb3BlcnR5TnVtU3lzXCIsMSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5hZGRIZWFydEJ1dHRvbk5vZGUub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzeXN0ZW1zTWdyLnNob3dTeXN0ZW0oXCJhZGRQcm9wZXJ0eU51bVN5c1wiLDIpXG4gICAgICAgIH0pXG5cbiAgICAgICAgdmFyIGZsYWcgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmluaXRBZFdhdGNoZWRGbGFnXG4gICAgICAgIGlmIChmbGFnID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMud2VsZmFyeVN5c0J1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMud2VsZmFyeVN5c0J1dHRvbk5vZGUpXG4gICAgICAgICAgICAgICAgLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKVxuICAgICAgICAgICAgICAgICAgICAudG8oMC4zLHthbmdsZTogLTQ1fSlcbiAgICAgICAgICAgICAgICAgICAgLnRvKDAuMyx7YW5nbGU6IDB9KVxuICAgICAgICAgICAgICAgICAgICAudG8oMC4zLHthbmdsZTogNDV9KVxuICAgICAgICAgICAgICAgICAgICAudG8oMC4zLHthbmdsZTogMH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZWxheSgxKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuc3RhcnQoKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLndlbGZhcnlTeXNCdXR0b25Ob2RlLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHN5c3RlbXNNZ3Iuc2hvd1N5c3RlbShcIndlbGZhcnlTeXNcIilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdFNlY3Rpb25CdXR0b25Ob2RlLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgc3lzdGVtc01nci5zaG93U3lzdGVtKFwic2VsZWN0U2VjdGlvblN5c1wiKVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuc2V0dXBTZWN0aW9uUGVyZm9ybWFuY2UoKVxuICAgIH0sXG5cbiAgICBzZXR1cERhdGEoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRTZWN0aW9uID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5jdXJyZW50U2VjdGlvblxuICAgIH0sXG5cbiAgICBzZXR1cFNlY3Rpb25QZXJmb3JtYW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRTZWN0aW9uID09IG51bGwpIHtcbiAgICAgICAgICAgIGNjLmxvZyhcIm5vdCBzZWxlY3RlZCBvbmUgc2VjdGlvbiwgY2FuIG5vdCBzZXR1cCBzZWN0aW9uIG9mIG1haW5TY2VuZSBtZ3JcIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHZhciB0ZXh0Q29uZmlnID0gcmVxdWlyZShcInRleHRDb25maWdcIilcbiAgICAgICAgdGhpcy5sZXZlbE5vZGVzLmRlc3Ryb3lBbGxDaGlsZHJlbigpXG4gICAgICAgIHRoaXMubGV2ZWxOb2Rlcy5yZW1vdmVBbGxDaGlsZHJlbigpXG4gICAgICAgIHRoaXMuY29ubmVjdExpbmVOb2Rlcy5kZXN0cm95QWxsQ2hpbGRyZW4oKVxuICAgICAgICB0aGlzLmNvbm5lY3RMaW5lTm9kZXMucmVtb3ZlQWxsQ2hpbGRyZW4oKVxuICAgICAgICB2YXIgc2VjdGlvbkNvbmZpZyA9IHJlcXVpcmUoXCJzZWN0aW9uQ29uZmlnXCIpXG4gICAgICAgIHZhciBjb25maWcgPSBzZWN0aW9uQ29uZmlnW3RoaXMuc2VsZWN0ZWRTZWN0aW9uXVxuICAgICAgICB2YXIgc2VjdGlvblRpdGxlID0gdGV4dENvbmZpZy5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZShjb25maWcuc2VjdGlvblRpdGxlVGV4dElkKVxuICAgICAgICB2YXIgc2VjdGlvbkRlcyA9IHRleHRDb25maWcuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoY29uZmlnLnNlY3Rpb25EZXNjcmlwVGV4dElkKVxuICAgICAgICB2YXIgc2hvd1RleHQgPSBzZWN0aW9uVGl0bGUgKyBcIiBcIiArIHNlY3Rpb25EZXNcbiAgICAgICAgdGhpcy5zZWN0aW9uTmFtZUxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHNob3dUZXh0XG5cbiAgICAgICAgdmFyIGxldmVscyA9IGNvbmZpZy5sZXZlbHNcbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gbGV2ZWxzKSB7XG4gICAgICAgICAgICB2YXIgb25lTGV2ZWwgPSBsZXZlbHNbaW5kZXhdXG4gICAgICAgICAgICB2YXIgb25lTGV2ZWxOb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5sZXZlbE5vZGVQcmVmYWIpXG4gICAgICAgICAgICB2YXIgbWdyID0gb25lTGV2ZWxOb2RlLmdldENvbXBvbmVudChcImxldmVsTm9kZU1nclwiKVxuICAgICAgICAgICAgbWdyLmxldmVsID0gb25lTGV2ZWxcbiAgICAgICAgICAgIG1nci5sZXZlbE51bUxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChwYXJzZUludChpbmRleCkgKyAxKS50b1N0cmluZygpXG4gICAgICAgICAgICBtZ3Iuc3RhdHVzID0gdGhpcy5fY2hlY2tMZXZlbFN0YXR1cyhvbmVMZXZlbClcbiAgICAgICAgICAgIG1nci5kZWxlZ2F0ZSA9IHRoaXNcbiAgICAgICAgICAgIHRoaXMuX3NldHVwTGV2ZWxOb2RlUG9zaXRpb24ob25lTGV2ZWxOb2RlLGluZGV4KVxuICAgICAgICAgICAgdGhpcy5sZXZlbE5vZGVzLmFkZENoaWxkKG9uZUxldmVsTm9kZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGluZGV4IGluIHRoaXMubGV2ZWxOb2Rlcy5jaGlsZHJlbil7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgb25lTm9kZSA9IHRoaXMubGV2ZWxOb2Rlcy5jaGlsZHJlbltpbmRleF1cbiAgICAgICAgICAgIHZhciBwcmVOb2RlID0gdGhpcy5sZXZlbE5vZGVzLmNoaWxkcmVuWyhpbmRleCAtIDEpXVxuICAgICAgICAgICAgdmFyIGNvbm5lY3RMaW5lID0gY2MuaW5zdGFudGlhdGUodGhpcy5sZXZlbE5vZGVzQ29ubmVjdExpbmVQcmVmYWIpXG4gICAgICAgICAgICB2YXIgdiA9IGNjLnYyKHByZU5vZGUueCAtIG9uZU5vZGUueCwgcHJlTm9kZS55IC0gb25lTm9kZS55KVxuICAgICAgICAgICAgY29ubmVjdExpbmUud2lkdGggPSB2Lm1hZygpXG4gICAgICAgICAgICB2YXIgZGVncmVlPSB2LnNpZ25BbmdsZShjYy52MigxLDApKSAvIE1hdGguUEkgKiAxODBcbiAgICAgICAgICAgIGNvbm5lY3RMaW5lLmFuZ2xlID0gLWRlZ3JlZVxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX2dldE1pZFBvaW50T2ZUd29Qb2ludHMob25lTm9kZS5wb3NpdGlvbiwgcHJlTm9kZS5wb3NpdGlvbilcbiAgICAgICAgICAgIGNvbm5lY3RMaW5lLnggPSByZXN1bHQueFxuICAgICAgICAgICAgY29ubmVjdExpbmUueSA9IHJlc3VsdC55XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RMaW5lTm9kZXMuYWRkQ2hpbGQoY29ubmVjdExpbmUpXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9zZXR1cExldmVsTm9kZVBvc2l0aW9uKGdpdmVuTm9kZSwgZ2l2ZW5JbmRleCkge1xuICAgICAgICB2YXIgc2VjdGlvbkNvbmZpZyA9IHJlcXVpcmUoXCJzZWN0aW9uQ29uZmlnXCIpW3RoaXMuc2VsZWN0ZWRTZWN0aW9uXVxuICAgICAgICB2YXIgbGV2ZWxOb2RlUG9zaXRpb25zID0gc2VjdGlvbkNvbmZpZy5sZXZlbE5vZGVQb3NpdGlvbnNcbiAgICAgICAgaWYgKGxldmVsTm9kZVBvc2l0aW9ucyA9PSBudWxsIHx8IGxldmVsTm9kZVBvc2l0aW9ucy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgLy9saW5lZFxuXG4gICAgICAgICAgICAvLyB2YXIgcm93SW5kZXggPSBnaXZlbkluZGV4ICUgdGhpcy5sZXZlbE5vZGVzTnVtUGVyTGluZVxuICAgICAgICAgICAgLy8gdmFyIGNvbEluZGV4ID0gTWF0aC5mbG9vcihnaXZlbkluZGV4IC8gdGhpcy5sZXZlbE5vZGVzTnVtUGVyTGluZSlcblxuICAgICAgICAgICAgLy8gdmFyIG1heFggPSB0aGlzLmxldmVsTm9kZVN0YXJ0UG9zaXRpb24ueCArIHRoaXMubGV2ZWxOb2Rlc0hvckRpcyAqICh0aGlzLmxldmVsTm9kZXNOdW1QZXJMaW5lIC0gMSlcbiAgICAgICAgICAgIC8vIGlmIChjb2xJbmRleCAlIDIgPT0gMCkge1xuICAgICAgICAgICAgLy8gICAgIGdpdmVuTm9kZS54ID0gdGhpcy5sZXZlbE5vZGVTdGFydFBvc2l0aW9uLnggKyByb3dJbmRleCAqIHRoaXMubGV2ZWxOb2Rlc0hvckRpc1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgZ2l2ZW5Ob2RlLnggPSBtYXhYIC0gcm93SW5kZXggKiB0aGlzLmxldmVsTm9kZXNIb3JEaXNcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIGdpdmVuTm9kZS55ID0gdGhpcy5sZXZlbE5vZGVTdGFydFBvc2l0aW9uLnkgKyBjb2xJbmRleCAqIHRoaXMubGV2ZWxOb2Rlc1ZlckRpc1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyB2YXIgbGV2ZWxOb2RlU3RhcnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzZWN0aW9uTmFtZUxhYmVsXCIpLmdldENoaWxkQnlOYW1lKFwibGV2ZWxOb2RlU3RhcnRcIilcbiAgICAgICAgICAgIC8vIGdpdmVuTm9kZS54ID0gbGV2ZWxOb2RlU3RhcnQueFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBnaXZlbk5vZGUueSA9IGxldmVsTm9kZVN0YXJ0LnkgKyBnaXZlbkluZGV4ICogdGhpcy5sZXZlbE5vZGVzVmVyRGlzXG5cbiAgICAgICAgICAgIC8vcm90YXRlZCBjb3BpZWRcbiAgICAgICAgICAgIHZhciBub2Rlc051bSA9IHNlY3Rpb25Db25maWcubGV2ZWxzLmxlbmd0aFxuICAgICAgICAgICAgdmFyIGFuZ2xlID0gMiAqIE1hdGguUEkgLyBub2Rlc051bVxuICAgICAgICAgICAgdmFyIGJhc2VWZWN0b3IgPSBjYy52Mih0aGlzLnJvdGFlZENvcGllZFJhZGl1cywwKVxuICAgICAgICAgICAgdmFyIHYgPSBiYXNlVmVjdG9yLnJvdGF0ZSgtZ2l2ZW5JbmRleCAqIGFuZ2xlKVxuICAgICAgICAgICAgZ2l2ZW5Ob2RlLnggPSB2LnhcbiAgICAgICAgICAgIGdpdmVuTm9kZS55ID0gdi55XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnaXZlbk5vZGUueCA9IGxldmVsTm9kZVBvc2l0aW9uc1tnaXZlbkluZGV4XS54XG4gICAgICAgICAgICBnaXZlbk5vZGUueSA9IGxldmVsTm9kZVBvc2l0aW9uc1tnaXZlbkluZGV4XS55XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2dldE1pZFBvaW50T2ZUd29Qb2ludHMocG9pbnQxLHBvaW50Mikge1xuICAgICAgICB2YXIgdiA9IGNjLnYyKHBvaW50Mi54IC0gcG9pbnQxLngsIHBvaW50Mi55IC0gcG9pbnQxLnkpXG4gICAgICAgIHZhciB4ID0gcG9pbnQxLnggKyB2LnggLyAyXG4gICAgICAgIHZhciB5ID0gcG9pbnQxLnkgKyB2LnkgLyAyXG4gICAgICAgIHJldHVybiBjYy52Mih4LHkpXG4gICAgfSxcblxuXG4gICAgX2NoZWNrU2VjdGlvblN0YXR1cyhnaXZlblNlY3Rpb24pIHtcbiAgICAgICAgdmFyIGN1cnJlbnRTZWN0aW9uID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5jdXJyZW50U2VjdGlvblxuICAgICAgICBpZiAodHlwZW9mIGdpdmVuU2VjdGlvbiAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgZ2l2ZW5TZWN0aW9uID0gcGFyc2VJbnQoZ2l2ZW5TZWN0aW9uKVxuICAgICAgICB9XG4gICAgICAgIGlmIChnaXZlblNlY3Rpb24gPiBjdXJyZW50U2VjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIDAgLy9sb2NrZWRcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChnaXZlblNlY3Rpb24gPCBjdXJyZW50U2VjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIDEgLy91bmxvY2tlZFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGdpdmVuU2VjdGlvbiA9PSBjdXJyZW50U2VjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIDIgLy9jdXJyZW50XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2NoZWNrTGV2ZWxTdGF0dXMoZ2l2bmVMZXZlbCkge1xuICAgICAgICB2YXIgc2VjdGlvbktleSA9IHRoaXMuX2dldFNlY3Rpb25LZXlCeUxldmVsKGdpdm5lTGV2ZWwpXG4gICAgICAgIGlmIChzZWN0aW9uS2V5ID09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2UgLy9ubyBzdWNoIGxldmVsXG4gICAgICAgIH1cbiAgICAgICBcbiAgICAgICAgdmFyIHNlY3Rpb25TdGF0dXMgPSB0aGlzLl9jaGVja1NlY3Rpb25TdGF0dXMoc2VjdGlvbktleSlcbiAgICAgICAgc3dpdGNoKHNlY3Rpb25TdGF0dXMpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gMCAvL2xvY2tlZFxuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAxIC8vdW5sb2NrZWRcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudExldmVsID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5jdXJyZW50TGV2ZWxcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudExldmVsID09IGdpdm5lTGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDIgLy9jdXJyZW50XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHNlY3Rpb25Db25maWcgPSByZXF1aXJlKFwic2VjdGlvbkNvbmZpZ1wiKVtzZWN0aW9uS2V5XVxuICAgICAgICAgICAgICAgIHZhciBsZXZlbHNBcnJ5ID0gc2VjdGlvbkNvbmZpZy5sZXZlbHNcbiAgICAgICAgICAgICAgICBpZiAobGV2ZWxzQXJyeS5pbmRleE9mKGdpdm5lTGV2ZWwpID4gbGV2ZWxzQXJyeS5pbmRleE9mKGN1cnJlbnRMZXZlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDAgLy9sb2NrZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEgLy91bmxvY2tlZFxuICAgICAgICB9XG4gICAgfSxcbiAgICBfZ2V0U2VjdGlvbktleUJ5TGV2ZWwoZ2l2ZW5MZXZlbCkge1xuICAgICAgICB2YXIgbGV2ZWxJZCA9IHBhcnNlSW50KGdpdmVuTGV2ZWwpXG4gICAgICAgIHZhciBzZWN0aW9uQ29uZmlnID0gcmVxdWlyZShcInNlY3Rpb25Db25maWdcIilcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNlY3Rpb25Db25maWcpIHtcbiAgICAgICAgICAgIHZhciBvbmVDb25maWcgPSBzZWN0aW9uQ29uZmlnW2tleV1cbiAgICAgICAgICAgIHZhciBsZXZlbHNDb25maWcgPSBvbmVDb25maWcubGV2ZWxzXG4gICAgICAgICAgICBpZiAobGV2ZWxzQ29uZmlnLmluZGV4T2YobGV2ZWxJZCkgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9LFxuXG5cbiAgICBkYXRhTW9uaXRvcmVkKGtleSx2YWx1ZSkge1xuICAgICAgICBpZiAoa2V5ID09IFwicGh5c2ljYWxQb3dlclwiKSB7XG4gICAgICAgICAgICB0aGlzLnBoeXNpY2FsTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdmFsdWUudG9TdHJpbmcoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSA9PSBcImhlYXJ0XCIpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhcnRMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB2YWx1ZS50b1N0cmluZygpXG4gICAgICAgIH1cbiAgICAgICAgZm9yKHZhciBpbmRleCBpbiB0aGlzLmxldmVsTm9kZXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHZhciBvbmVNZ3IgPSB0aGlzLmxldmVsTm9kZXMuY2hpbGRyZW5baW5kZXhdLmdldENvbXBvbmVudChcImxldmVsTm9kZU1nclwiKVxuICAgICAgICAgICAgb25lTWdyLmRhdGFNb25pdG9yZWQoa2V5LHZhbHVlKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZSAoZHQpIHtcbiAgICAgICAgdmFyIG5vdGlmaWNhdGlvbk1nciA9IHJlcXVpcmUoXCJub3RpZmljYXRpb25NZ3JcIilcbiAgICAgICAgdmFyIG5vdGlBcnJ5ID0gbm90aWZpY2F0aW9uTWdyLm5vdGllc1xuICAgICAgICBpZiAobm90aUFycnkubGVuZ3RoID4gMCAmJiB0aGlzLmlzU2hvd2luZ05vdGkgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTaG93aW5nTm90aSA9IHRydWVcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICAgICAgdmFyIHRlbXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAobm90aUFycnkubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pc1Nob3dpbmdOb3RpID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIG9uZVN0ciA9IG5vdGlBcnJ5WzBdXG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uTWdyLnNob3dOb3RpKG9uZVN0cilcbiAgICAgICAgICAgICAgICBub3RpQXJyeS5zcGxpY2UoMCwxKVxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHNlbGYubm9kZSlcbiAgICAgICAgICAgICAgICAgICAgLmRlbGF5KDAuMylcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAoKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZW1wKClcbiAgICAgICAgfVxuICAgIH0sXG59KTtcbiJdfQ==