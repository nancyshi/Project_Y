
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

    require("bgmMgr").selectedSection = this.selectedSection.toString();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL21haW5TY2VuZS9tYWluU2NlbmVNZ3IuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzZWN0aW9uTmFtZUxhYmVsTm9kZSIsIk5vZGUiLCJsZXZlbE5vZGVzIiwiY29ubmVjdExpbmVOb2RlcyIsImxldmVsTm9kZVByZWZhYiIsIlByZWZhYiIsImxldmVsTm9kZXNDb25uZWN0TGluZVByZWZhYiIsInNlbGVjdGVkU2VjdGlvbiIsInBoeXNpY2FsTGFiZWxOb2RlIiwiaGVhcnRMYWJlbE5vZGUiLCJtYWlsU3lzQnV0dG9uTm9kZSIsInNpZ25JblN5c0J1dHRvbk5vZGUiLCJ3ZWxmYXJ5U3lzQnV0dG9uTm9kZSIsImFkZEhlYXJ0QnV0dG9uTm9kZSIsImFkZFBoeXNpY2FsUG93ZXJCdXR0b25Ob2RlIiwic2VsZWN0U2VjdGlvbkJ1dHRvbk5vZGUiLCJiYWNrVG9DdXJyZW50QnV0dG9uTm9kZSIsImxldmVsTm9kZVN0YXJ0UG9zaXRpb24iLCJ2MiIsImxldmVsTm9kZXNIb3JEaXMiLCJsZXZlbE5vZGVzVmVyRGlzIiwibGV2ZWxOb2Rlc051bVBlckxpbmUiLCJyb3RhZWRDb3BpZWRSYWRpdXMiLCJpc1Nob3dpbmdOb3RpIiwiY2FuU2hvd05vdGkiLCJvbkxvYWQiLCJzZXR1cERhdGEiLCJzdGFydCIsInNldHVwVUkiLCJzdG9yeUlkIiwicmVxdWlyZSIsInBsYXllckRhdGEiLCJzdG9yeVN5c0lkIiwic2hvd1N5c3RlbSIsInRvU3RyaW5nIiwiZ2V0Q29tcG9uZW50IiwiV2lkZ2V0IiwidXBkYXRlQWxpZ25tZW50IiwiTGFiZWwiLCJzdHJpbmciLCJoZWFydCIsInBoeXNpY2FsUG93ZXIiLCJzeXN0ZW1zTWdyIiwib24iLCJyZWRQb2ludFNob3dDb25kaXRpb24iLCJtYWlscyIsInVuUmVhZE51bSIsImtleSIsIm9uZU1haWwiLCJzdGF0dXMiLCJzaWduSW5TdGF0dXMiLCJmbGFnIiwiaW5pdEFkV2F0Y2hlZEZsYWciLCJhY3RpdmUiLCJ0d2VlbiIsInJlcGVhdEZvcmV2ZXIiLCJ0byIsImFuZ2xlIiwiZGVsYXkiLCJvcGFjaXR5IiwiZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUiLCJzZWxmIiwiY3VycmVudFNlY3Rpb24iLCJzZXR1cFNlY3Rpb25QZXJmb3JtYW5jZSIsInBsYXlCZ20iLCJ5IiwiaGVpZ2h0IiwibG9nIiwidGV4dENvbmZpZyIsImRlc3Ryb3lBbGxDaGlsZHJlbiIsInJlbW92ZUFsbENoaWxkcmVuIiwic2VjdGlvbkNvbmZpZyIsImNvbmZpZyIsInNlY3Rpb25UaXRsZSIsInNlY3Rpb25UaXRsZVRleHRJZCIsInNlY3Rpb25EZXMiLCJzZWN0aW9uRGVzY3JpcFRleHRJZCIsInNob3dUZXh0IiwiX2ZvcmNlVXBkYXRlUmVuZGVyRGF0YSIsIngiLCJ3aWR0aCIsImxldmVscyIsImluZGV4Iiwib25lTGV2ZWwiLCJvbmVMZXZlbE5vZGUiLCJpbnN0YW50aWF0ZSIsIm1nciIsImxldmVsIiwibGV2ZWxOdW1MYWJlbE5vZGUiLCJwYXJzZUludCIsIl9jaGVja0xldmVsU3RhdHVzIiwiZGVsZWdhdGUiLCJfc2V0dXBMZXZlbE5vZGVQb3NpdGlvbiIsImFkZENoaWxkIiwiY2hpbGRyZW4iLCJvbmVOb2RlIiwicHJlTm9kZSIsImNvbm5lY3RMaW5lIiwidiIsIm1hZyIsImRlZ3JlZSIsInNpZ25BbmdsZSIsIk1hdGgiLCJQSSIsInJlc3VsdCIsIl9nZXRNaWRQb2ludE9mVHdvUG9pbnRzIiwicG9zaXRpb24iLCJnaXZlbk5vZGUiLCJnaXZlbkluZGV4IiwibGV2ZWxOb2RlUG9zaXRpb25zIiwibGVuZ3RoIiwibm9kZXNOdW0iLCJiYXNlVmVjdG9yIiwicm90YXRlIiwicG9pbnQxIiwicG9pbnQyIiwiX2NoZWNrU2VjdGlvblN0YXR1cyIsImdpdmVuU2VjdGlvbiIsImdpdm5lTGV2ZWwiLCJzZWN0aW9uS2V5IiwiX2dldFNlY3Rpb25LZXlCeUxldmVsIiwic2VjdGlvblN0YXR1cyIsImN1cnJlbnRMZXZlbCIsImxldmVsc0FycnkiLCJpbmRleE9mIiwiZ2l2ZW5MZXZlbCIsImxldmVsSWQiLCJvbmVDb25maWciLCJsZXZlbHNDb25maWciLCJkYXRhTW9uaXRvcmVkIiwidmFsdWUiLCJvbmVNZ3IiLCJ1cGRhdGUiLCJkdCIsIm5vdGlmaWNhdGlvbk1nciIsIm5vdGlBcnJ5Iiwibm90aWVzIiwidGVtcCIsIm9uZVN0ciIsInNob3dOb3RpIiwic3BsaWNlIiwibm9kZSIsImNhbGwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxJQUFBQSxvQkFBb0IsRUFBRUosRUFBRSxDQUFDSyxJQWhCakI7QUFpQlJDLElBQUFBLFVBQVUsRUFBRU4sRUFBRSxDQUFDSyxJQWpCUDtBQWtCUkUsSUFBQUEsZ0JBQWdCLEVBQUVQLEVBQUUsQ0FBQ0ssSUFsQmI7QUFtQlJHLElBQUFBLGVBQWUsRUFBRVIsRUFBRSxDQUFDUyxNQW5CWjtBQW9CUkMsSUFBQUEsMkJBQTJCLEVBQUVWLEVBQUUsQ0FBQ1MsTUFwQnhCO0FBcUJSRSxJQUFBQSxlQUFlLEVBQUUsSUFyQlQ7QUFzQlJDLElBQUFBLGlCQUFpQixFQUFFWixFQUFFLENBQUNLLElBdEJkO0FBdUJSUSxJQUFBQSxjQUFjLEVBQUViLEVBQUUsQ0FBQ0ssSUF2Qlg7QUF3QlJTLElBQUFBLGlCQUFpQixFQUFFZCxFQUFFLENBQUNLLElBeEJkO0FBeUJSVSxJQUFBQSxtQkFBbUIsRUFBRWYsRUFBRSxDQUFDSyxJQXpCaEI7QUEwQlJXLElBQUFBLG9CQUFvQixFQUFFaEIsRUFBRSxDQUFD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LEtBREwsQ0FDVyxHQURYLEVBRUtvRixJQUZMLENBRVUsWUFBVTtBQUNaTCxVQUFBQSxJQUFJO0FBQ1AsU0FKTCxFQUtLOUcsS0FMTDtBQU1ILE9BZkQ7O0FBaUJBOEcsTUFBQUEsSUFBSTtBQUNQO0FBQ0o7QUEvVkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHBzOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICBzZWN0aW9uTmFtZUxhYmVsTm9kZTogY2MuTm9kZSxcbiAgICAgICAgbGV2ZWxOb2RlczogY2MuTm9kZSxcbiAgICAgICAgY29ubmVjdExpbmVOb2RlczogY2MuTm9kZSxcbiAgICAgICAgbGV2ZWxOb2RlUHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGxldmVsTm9kZXNDb25uZWN0TGluZVByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBzZWxlY3RlZFNlY3Rpb246IG51bGwsXG4gICAgICAgIHBoeXNpY2FsTGFiZWxOb2RlOiBjYy5Ob2RlLFxuICAgICAgICBoZWFydExhYmVsTm9kZTogY2MuTm9kZSxcbiAgICAgICAgbWFpbFN5c0J1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIHNpZ25JblN5c0J1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIHdlbGZhcnlTeXNCdXR0b25Ob2RlOiBjYy5Ob2RlLFxuICAgICAgICBhZGRIZWFydEJ1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGFkZFBoeXNpY2FsUG93ZXJCdXR0b25Ob2RlOiBjYy5Ob2RlLFxuICAgICAgICBzZWxlY3RTZWN0aW9uQnV0dG9uTm9kZTogY2MuTm9kZSxcbiAgICAgICAgYmFja1RvQ3VycmVudEJ1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGxldmVsTm9kZVN0YXJ0UG9zaXRpb246IGNjLnYyKDAsMCksXG4gICAgICAgIGxldmVsTm9kZXNIb3JEaXM6IDEwLFxuICAgICAgICBsZXZlbE5vZGVzVmVyRGlzOiAyMCxcbiAgICAgICAgbGV2ZWxOb2Rlc051bVBlckxpbmU6IDQsXG5cbiAgICAgICAgcm90YWVkQ29waWVkUmFkaXVzOiAzMDAsXG4gICAgICAgIGlzU2hvd2luZ05vdGk6IGZhbHNlLFxuICAgICAgICBjYW5TaG93Tm90aTogdHJ1ZVxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMuc2V0dXBEYXRhKClcbiAgICAgICAgLy90aGlzLnNldHVwVUkoKVxuICAgICAgICAvL3JlcXVpcmUoXCJnYW1lTWdyXCIpLl9nZW5lcmF0ZUxldmVsU2NlbmVDb25maWcoKVxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuc2V0dXBVSSgpXG4gICAgICAgIC8vcmVxdWlyZShcInN5c3RlbXNNZ3JcIikuc2hvd1N5c3RlbShcInN0b3J5U3lzXCIsOTAwMSwyKVxuICAgICAgICB2YXIgc3RvcnlJZCA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuc3RvcnlTeXNJZFxuICAgICAgICBpZiAoc3RvcnlJZCAhPSAtMSkge1xuICAgICAgICAgICAgcmVxdWlyZShcInN5c3RlbXNNZ3JcIikuc2hvd1N5c3RlbShcInN0b3J5U3lzXCIsc3RvcnlJZCwyKVxuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWlyZShcImJnbU1nclwiKS5zZWxlY3RlZFNlY3Rpb24gPSB0aGlzLnNlbGVjdGVkU2VjdGlvbi50b1N0cmluZygpXG4gICAgfSxcbiAgICBcbiAgICBzZXR1cFVJKCkge1xuICAgICAgICB0aGlzLnNlY3Rpb25OYW1lTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpXG4gICAgICAgIHRoaXMuaGVhcnRMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmhlYXJ0LnRvU3RyaW5nKClcbiAgICAgICAgdGhpcy5waHlzaWNhbExhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEucGh5c2ljYWxQb3dlci50b1N0cmluZygpXG4gICAgICAgIHZhciBzeXN0ZW1zTWdyID0gcmVxdWlyZShcInN5c3RlbXNNZ3JcIilcbiAgICAgICAgdGhpcy5tYWlsU3lzQnV0dG9uTm9kZS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHN5c3RlbXNNZ3Iuc2hvd1N5c3RlbShcIm1haWxTeXNcIixudWxsLDEsMilcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5tYWlsU3lzQnV0dG9uTm9kZS5nZXRDb21wb25lbnQoXCJyZWRQb2ludE1nclwiKS5yZWRQb2ludFNob3dDb25kaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBtYWlscyA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEubWFpbHNcbiAgICAgICAgICAgIHZhciB1blJlYWROdW0gPSAwXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gbWFpbHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgb25lTWFpbCA9IG1haWxzW2tleV1cbiAgICAgICAgICAgICAgICBpZiAob25lTWFpbC5zdGF0dXMgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB1blJlYWROdW0gKz0gMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh1blJlYWROdW0gPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLnNpZ25JblN5c0J1dHRvbk5vZGUub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzeXN0ZW1zTWdyLnNob3dTeXN0ZW0oXCJzaWduSW5TeXNcIilcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5zaWduSW5TeXNCdXR0b25Ob2RlLmdldENvbXBvbmVudChcInJlZFBvaW50TWdyXCIpLnJlZFBvaW50U2hvd0NvbmRpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHNpZ25JblN0YXR1cyA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuc2lnbkluU3RhdHVzXG4gICAgICAgICAgICBzd2l0Y2goc2lnbkluU3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkUGh5c2ljYWxQb3dlckJ1dHRvbk5vZGUub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzeXN0ZW1zTWdyLnNob3dTeXN0ZW0oXCJhZGRQcm9wZXJ0eU51bVN5c1wiLDEpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuYWRkSGVhcnRCdXR0b25Ob2RlLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgc3lzdGVtc01nci5zaG93U3lzdGVtKFwiYWRkUHJvcGVydHlOdW1TeXNcIiwyKVxuICAgICAgICB9KVxuXG4gICAgICAgIHZhciBmbGFnID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5pbml0QWRXYXRjaGVkRmxhZ1xuICAgICAgICBpZiAoZmxhZyA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLndlbGZhcnlTeXNCdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLndlbGZhcnlTeXNCdXR0b25Ob2RlKVxuICAgICAgICAgICAgICAgIC5yZXBlYXRGb3JldmVyKGNjLnR3ZWVuKClcbiAgICAgICAgICAgICAgICAgICAgLnRvKDAuMyx7YW5nbGU6IC00NX0pXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjMse2FuZ2xlOiAwfSlcbiAgICAgICAgICAgICAgICAgICAgLnRvKDAuMyx7YW5nbGU6IDQ1fSlcbiAgICAgICAgICAgICAgICAgICAgLnRvKDAuMyx7YW5nbGU6IDB9KVxuICAgICAgICAgICAgICAgICAgICAuZGVsYXkoMSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnN0YXJ0KClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy53ZWxmYXJ5U3lzQnV0dG9uTm9kZS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBzeXN0ZW1zTWdyLnNob3dTeXN0ZW0oXCJ3ZWxmYXJ5U3lzXCIpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3RTZWN0aW9uQnV0dG9uTm9kZS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHN5c3RlbXNNZ3Iuc2hvd1N5c3RlbShcInNlbGVjdFNlY3Rpb25TeXNcIilcbiAgICAgICAgfSlcblxuICAgICAgICBjYy50d2Vlbih0aGlzLmJhY2tUb0N1cnJlbnRCdXR0b25Ob2RlKVxuICAgICAgICAgICAgLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKVxuICAgICAgICAgICAgICAgICAgICAudG8oMSwge29wYWNpdHk6IDB9KVxuICAgICAgICAgICAgICAgICAgICAudG8oMSwge29wYWNpdHk6IDI1NX0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3RhcnQoKVxuICAgICAgICB0aGlzLmJhY2tUb0N1cnJlbnRCdXR0b25Ob2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVxdWlyZShcInRleHRDb25maWdcIikuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTY3KVxuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgdGhpcy5iYWNrVG9DdXJyZW50QnV0dG9uTm9kZS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRTZWN0aW9uID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5jdXJyZW50U2VjdGlvblxuICAgICAgICAgICAgc2VsZi5zZXR1cFNlY3Rpb25QZXJmb3JtYW5jZSgpXG4gICAgICAgICAgICBzZWxmLnBsYXlCZ20oKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmJhY2tUb0N1cnJlbnRCdXR0b25Ob2RlLnkgPSB0aGlzLnNlY3Rpb25OYW1lTGFiZWxOb2RlLnkgLSB0aGlzLnNlY3Rpb25OYW1lTGFiZWxOb2RlLmhlaWdodCAvIDIgLSAxMDBcbiAgICAgICAgdGhpcy5zZXR1cFNlY3Rpb25QZXJmb3JtYW5jZSgpXG4gICAgfSxcblxuICAgIHNldHVwRGF0YSgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFNlY3Rpb24gPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmN1cnJlbnRTZWN0aW9uXG4gICAgfSxcblxuICAgIHNldHVwU2VjdGlvblBlcmZvcm1hbmNlKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFNlY3Rpb24gPT0gbnVsbCkge1xuICAgICAgICAgICAgY2MubG9nKFwibm90IHNlbGVjdGVkIG9uZSBzZWN0aW9uLCBjYW4gbm90IHNldHVwIHNlY3Rpb24gb2YgbWFpblNjZW5lIG1nclwiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRTZWN0aW9uID09IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuYmFja1RvQ3VycmVudEJ1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYmFja1RvQ3VycmVudEJ1dHRvbk5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHZhciB0ZXh0Q29uZmlnID0gcmVxdWlyZShcInRleHRDb25maWdcIilcbiAgICAgICAgdGhpcy5sZXZlbE5vZGVzLmRlc3Ryb3lBbGxDaGlsZHJlbigpXG4gICAgICAgIHRoaXMubGV2ZWxOb2Rlcy5yZW1vdmVBbGxDaGlsZHJlbigpXG4gICAgICAgIHRoaXMuY29ubmVjdExpbmVOb2Rlcy5kZXN0cm95QWxsQ2hpbGRyZW4oKVxuICAgICAgICB0aGlzLmNvbm5lY3RMaW5lTm9kZXMucmVtb3ZlQWxsQ2hpbGRyZW4oKVxuICAgICAgICB2YXIgc2VjdGlvbkNvbmZpZyA9IHJlcXVpcmUoXCJzZWN0aW9uQ29uZmlnXCIpXG4gICAgICAgIHZhciBjb25maWcgPSBzZWN0aW9uQ29uZmlnW3RoaXMuc2VsZWN0ZWRTZWN0aW9uXVxuICAgICAgICB2YXIgc2VjdGlvblRpdGxlID0gdGV4dENvbmZpZy5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZShjb25maWcuc2VjdGlvblRpdGxlVGV4dElkKVxuICAgICAgICB2YXIgc2VjdGlvbkRlcyA9IHRleHRDb25maWcuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoY29uZmlnLnNlY3Rpb25EZXNjcmlwVGV4dElkKVxuICAgICAgICB2YXIgc2hvd1RleHQgPSBzZWN0aW9uVGl0bGUgKyBcIiBcIiArIHNlY3Rpb25EZXNcbiAgICAgICAgdGhpcy5zZWN0aW9uTmFtZUxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHNob3dUZXh0XG4gICAgICAgIHRoaXMuc2VjdGlvbk5hbWVMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5fZm9yY2VVcGRhdGVSZW5kZXJEYXRhKClcbiAgICAgICAgdGhpcy5zZWxlY3RTZWN0aW9uQnV0dG9uTm9kZS55ID0gdGhpcy5zZWN0aW9uTmFtZUxhYmVsTm9kZS55XG4gICAgICAgIHRoaXMuc2VsZWN0U2VjdGlvbkJ1dHRvbk5vZGUueCA9IHRoaXMuc2VjdGlvbk5hbWVMYWJlbE5vZGUueCAtIHRoaXMuc2VjdGlvbk5hbWVMYWJlbE5vZGUud2lkdGggLyAyIC0gMTAwXG4gICAgICAgIHZhciBsZXZlbHMgPSBjb25maWcubGV2ZWxzXG4gICAgICAgIGZvciAodmFyIGluZGV4IGluIGxldmVscykge1xuICAgICAgICAgICAgdmFyIG9uZUxldmVsID0gbGV2ZWxzW2luZGV4XVxuICAgICAgICAgICAgdmFyIG9uZUxldmVsTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGV2ZWxOb2RlUHJlZmFiKVxuICAgICAgICAgICAgdmFyIG1nciA9IG9uZUxldmVsTm9kZS5nZXRDb21wb25lbnQoXCJsZXZlbE5vZGVNZ3JcIilcbiAgICAgICAgICAgIG1nci5sZXZlbCA9IG9uZUxldmVsXG4gICAgICAgICAgICBtZ3IubGV2ZWxOdW1MYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAocGFyc2VJbnQoaW5kZXgpICsgMSkudG9TdHJpbmcoKVxuICAgICAgICAgICAgbWdyLnN0YXR1cyA9IHRoaXMuX2NoZWNrTGV2ZWxTdGF0dXMob25lTGV2ZWwpXG4gICAgICAgICAgICBtZ3IuZGVsZWdhdGUgPSB0aGlzXG4gICAgICAgICAgICB0aGlzLl9zZXR1cExldmVsTm9kZVBvc2l0aW9uKG9uZUxldmVsTm9kZSxpbmRleClcbiAgICAgICAgICAgIHRoaXMubGV2ZWxOb2Rlcy5hZGRDaGlsZChvbmVMZXZlbE5vZGUpXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiB0aGlzLmxldmVsTm9kZXMuY2hpbGRyZW4pe1xuICAgICAgICAgICAgaWYgKGluZGV4ID09IDApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9uZU5vZGUgPSB0aGlzLmxldmVsTm9kZXMuY2hpbGRyZW5baW5kZXhdXG4gICAgICAgICAgICB2YXIgcHJlTm9kZSA9IHRoaXMubGV2ZWxOb2Rlcy5jaGlsZHJlblsoaW5kZXggLSAxKV1cbiAgICAgICAgICAgIHZhciBjb25uZWN0TGluZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGV2ZWxOb2Rlc0Nvbm5lY3RMaW5lUHJlZmFiKVxuICAgICAgICAgICAgdmFyIHYgPSBjYy52MihwcmVOb2RlLnggLSBvbmVOb2RlLngsIHByZU5vZGUueSAtIG9uZU5vZGUueSlcbiAgICAgICAgICAgIGNvbm5lY3RMaW5lLndpZHRoID0gdi5tYWcoKVxuICAgICAgICAgICAgdmFyIGRlZ3JlZT0gdi5zaWduQW5nbGUoY2MudjIoMSwwKSkgLyBNYXRoLlBJICogMTgwXG4gICAgICAgICAgICBjb25uZWN0TGluZS5hbmdsZSA9IC1kZWdyZWVcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9nZXRNaWRQb2ludE9mVHdvUG9pbnRzKG9uZU5vZGUucG9zaXRpb24sIHByZU5vZGUucG9zaXRpb24pXG4gICAgICAgICAgICBjb25uZWN0TGluZS54ID0gcmVzdWx0LnhcbiAgICAgICAgICAgIGNvbm5lY3RMaW5lLnkgPSByZXN1bHQueVxuICAgICAgICAgICAgdGhpcy5jb25uZWN0TGluZU5vZGVzLmFkZENoaWxkKGNvbm5lY3RMaW5lKVxuICAgICAgICB9XG4gICAgfSxcbiAgICBfc2V0dXBMZXZlbE5vZGVQb3NpdGlvbihnaXZlbk5vZGUsIGdpdmVuSW5kZXgpIHtcbiAgICAgICAgdmFyIHNlY3Rpb25Db25maWcgPSByZXF1aXJlKFwic2VjdGlvbkNvbmZpZ1wiKVt0aGlzLnNlbGVjdGVkU2VjdGlvbl1cbiAgICAgICAgdmFyIGxldmVsTm9kZVBvc2l0aW9ucyA9IHNlY3Rpb25Db25maWcubGV2ZWxOb2RlUG9zaXRpb25zXG4gICAgICAgIGlmIChsZXZlbE5vZGVQb3NpdGlvbnMgPT0gbnVsbCB8fCBsZXZlbE5vZGVQb3NpdGlvbnMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIC8vbGluZWRcblxuICAgICAgICAgICAgLy8gdmFyIHJvd0luZGV4ID0gZ2l2ZW5JbmRleCAlIHRoaXMubGV2ZWxOb2Rlc051bVBlckxpbmVcbiAgICAgICAgICAgIC8vIHZhciBjb2xJbmRleCA9IE1hdGguZmxvb3IoZ2l2ZW5JbmRleCAvIHRoaXMubGV2ZWxOb2Rlc051bVBlckxpbmUpXG5cbiAgICAgICAgICAgIC8vIHZhciBtYXhYID0gdGhpcy5sZXZlbE5vZGVTdGFydFBvc2l0aW9uLnggKyB0aGlzLmxldmVsTm9kZXNIb3JEaXMgKiAodGhpcy5sZXZlbE5vZGVzTnVtUGVyTGluZSAtIDEpXG4gICAgICAgICAgICAvLyBpZiAoY29sSW5kZXggJSAyID09IDApIHtcbiAgICAgICAgICAgIC8vICAgICBnaXZlbk5vZGUueCA9IHRoaXMubGV2ZWxOb2RlU3RhcnRQb3NpdGlvbi54ICsgcm93SW5kZXggKiB0aGlzLmxldmVsTm9kZXNIb3JEaXNcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgIGdpdmVuTm9kZS54ID0gbWF4WCAtIHJvd0luZGV4ICogdGhpcy5sZXZlbE5vZGVzSG9yRGlzXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBnaXZlbk5vZGUueSA9IHRoaXMubGV2ZWxOb2RlU3RhcnRQb3NpdGlvbi55ICsgY29sSW5kZXggKiB0aGlzLmxldmVsTm9kZXNWZXJEaXNcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gdmFyIGxldmVsTm9kZVN0YXJ0ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2VjdGlvbk5hbWVMYWJlbFwiKS5nZXRDaGlsZEJ5TmFtZShcImxldmVsTm9kZVN0YXJ0XCIpXG4gICAgICAgICAgICAvLyBnaXZlbk5vZGUueCA9IGxldmVsTm9kZVN0YXJ0LnhcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gZ2l2ZW5Ob2RlLnkgPSBsZXZlbE5vZGVTdGFydC55ICsgZ2l2ZW5JbmRleCAqIHRoaXMubGV2ZWxOb2Rlc1ZlckRpc1xuXG4gICAgICAgICAgICAvL3JvdGF0ZWQgY29waWVkXG4gICAgICAgICAgICB2YXIgbm9kZXNOdW0gPSBzZWN0aW9uQ29uZmlnLmxldmVscy5sZW5ndGhcbiAgICAgICAgICAgIHZhciBhbmdsZSA9IDIgKiBNYXRoLlBJIC8gbm9kZXNOdW1cbiAgICAgICAgICAgIHZhciBiYXNlVmVjdG9yID0gY2MudjIodGhpcy5yb3RhZWRDb3BpZWRSYWRpdXMsMClcbiAgICAgICAgICAgIHZhciB2ID0gYmFzZVZlY3Rvci5yb3RhdGUoLWdpdmVuSW5kZXggKiBhbmdsZSlcbiAgICAgICAgICAgIGdpdmVuTm9kZS54ID0gdi54XG4gICAgICAgICAgICBnaXZlbk5vZGUueSA9IHYueVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZ2l2ZW5Ob2RlLnggPSBsZXZlbE5vZGVQb3NpdGlvbnNbZ2l2ZW5JbmRleF0ueFxuICAgICAgICAgICAgZ2l2ZW5Ob2RlLnkgPSBsZXZlbE5vZGVQb3NpdGlvbnNbZ2l2ZW5JbmRleF0ueVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9nZXRNaWRQb2ludE9mVHdvUG9pbnRzKHBvaW50MSxwb2ludDIpIHtcbiAgICAgICAgdmFyIHYgPSBjYy52Mihwb2ludDIueCAtIHBvaW50MS54LCBwb2ludDIueSAtIHBvaW50MS55KVxuICAgICAgICB2YXIgeCA9IHBvaW50MS54ICsgdi54IC8gMlxuICAgICAgICB2YXIgeSA9IHBvaW50MS55ICsgdi55IC8gMlxuICAgICAgICByZXR1cm4gY2MudjIoeCx5KVxuICAgIH0sXG5cblxuICAgIF9jaGVja1NlY3Rpb25TdGF0dXMoZ2l2ZW5TZWN0aW9uKSB7XG4gICAgICAgIHZhciBjdXJyZW50U2VjdGlvbiA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuY3VycmVudFNlY3Rpb25cbiAgICAgICAgaWYgKHR5cGVvZiBnaXZlblNlY3Rpb24gIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGdpdmVuU2VjdGlvbiA9IHBhcnNlSW50KGdpdmVuU2VjdGlvbilcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2l2ZW5TZWN0aW9uID4gY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiAwIC8vbG9ja2VkXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZ2l2ZW5TZWN0aW9uIDwgY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiAxIC8vdW5sb2NrZWRcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChnaXZlblNlY3Rpb24gPT0gY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiAyIC8vY3VycmVudFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9jaGVja0xldmVsU3RhdHVzKGdpdm5lTGV2ZWwpIHtcbiAgICAgICAgdmFyIHNlY3Rpb25LZXkgPSB0aGlzLl9nZXRTZWN0aW9uS2V5QnlMZXZlbChnaXZuZUxldmVsKVxuICAgICAgICBpZiAoc2VjdGlvbktleSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlIC8vbm8gc3VjaCBsZXZlbFxuICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIHZhciBzZWN0aW9uU3RhdHVzID0gdGhpcy5fY2hlY2tTZWN0aW9uU3RhdHVzKHNlY3Rpb25LZXkpXG4gICAgICAgIHN3aXRjaChzZWN0aW9uU3RhdHVzKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDAgLy9sb2NrZWRcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMSAvL3VubG9ja2VkXG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRMZXZlbCA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuY3VycmVudExldmVsXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRMZXZlbCA9PSBnaXZuZUxldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAyIC8vY3VycmVudFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBzZWN0aW9uQ29uZmlnID0gcmVxdWlyZShcInNlY3Rpb25Db25maWdcIilbc2VjdGlvbktleV1cbiAgICAgICAgICAgICAgICB2YXIgbGV2ZWxzQXJyeSA9IHNlY3Rpb25Db25maWcubGV2ZWxzXG4gICAgICAgICAgICAgICAgaWYgKGxldmVsc0FycnkuaW5kZXhPZihnaXZuZUxldmVsKSA+IGxldmVsc0FycnkuaW5kZXhPZihjdXJyZW50TGV2ZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwIC8vbG9ja2VkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAxIC8vdW5sb2NrZWRcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX2dldFNlY3Rpb25LZXlCeUxldmVsKGdpdmVuTGV2ZWwpIHtcbiAgICAgICAgdmFyIGxldmVsSWQgPSBwYXJzZUludChnaXZlbkxldmVsKVxuICAgICAgICB2YXIgc2VjdGlvbkNvbmZpZyA9IHJlcXVpcmUoXCJzZWN0aW9uQ29uZmlnXCIpXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzZWN0aW9uQ29uZmlnKSB7XG4gICAgICAgICAgICB2YXIgb25lQ29uZmlnID0gc2VjdGlvbkNvbmZpZ1trZXldXG4gICAgICAgICAgICB2YXIgbGV2ZWxzQ29uZmlnID0gb25lQ29uZmlnLmxldmVsc1xuICAgICAgICAgICAgaWYgKGxldmVsc0NvbmZpZy5pbmRleE9mKGxldmVsSWQpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSxcblxuXG4gICAgZGF0YU1vbml0b3JlZChrZXksdmFsdWUpIHtcbiAgICAgICAgaWYgKGtleSA9PSBcInBoeXNpY2FsUG93ZXJcIikge1xuICAgICAgICAgICAgdGhpcy5waHlzaWNhbExhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHZhbHVlLnRvU3RyaW5nKClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT0gXCJoZWFydFwiKSB7XG4gICAgICAgICAgICB0aGlzLmhlYXJ0TGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdmFsdWUudG9TdHJpbmcoKVxuICAgICAgICB9XG4gICAgICAgIGZvcih2YXIgaW5kZXggaW4gdGhpcy5sZXZlbE5vZGVzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICB2YXIgb25lTWdyID0gdGhpcy5sZXZlbE5vZGVzLmNoaWxkcmVuW2luZGV4XS5nZXRDb21wb25lbnQoXCJsZXZlbE5vZGVNZ3JcIilcbiAgICAgICAgICAgIG9uZU1nci5kYXRhTW9uaXRvcmVkKGtleSx2YWx1ZSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIHZhciBub3RpZmljYXRpb25NZ3IgPSByZXF1aXJlKFwibm90aWZpY2F0aW9uTWdyXCIpXG4gICAgICAgIHZhciBub3RpQXJyeSA9IG5vdGlmaWNhdGlvbk1nci5ub3RpZXNcbiAgICAgICAgaWYgKG5vdGlBcnJ5Lmxlbmd0aCA+IDAgJiYgdGhpcy5pc1Nob3dpbmdOb3RpID09IGZhbHNlICYmIHRoaXMuY2FuU2hvd05vdGkgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5pc1Nob3dpbmdOb3RpID0gdHJ1ZVxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgICAgICB2YXIgdGVtcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChub3RpQXJyeS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmlzU2hvd2luZ05vdGkgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgb25lU3RyID0gbm90aUFycnlbMF1cbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb25NZ3Iuc2hvd05vdGkob25lU3RyKVxuICAgICAgICAgICAgICAgIG5vdGlBcnJ5LnNwbGljZSgwLDEpXG4gICAgICAgICAgICAgICAgY2MudHdlZW4oc2VsZi5ub2RlKVxuICAgICAgICAgICAgICAgICAgICAuZGVsYXkoMC4zKVxuICAgICAgICAgICAgICAgICAgICAuY2FsbChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcCgpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5zdGFydCgpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRlbXAoKVxuICAgICAgICB9XG4gICAgfSxcbn0pO1xuIl19