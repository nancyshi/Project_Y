
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
    // var storyId = require("dataMgr").playerData.storySysId
    // if (storyId != -1) {
    //     require("systemsMgr").showSystem("storySys",storyId,2)
    // }

    require("bgmMgr").selectedSection = this.selectedSection.toString();
  },
  setupUI: function setupUI() {
    this.sectionNameLabelNode.getComponent(cc.Widget).updateAlignment();
    this.heartLabelNode.getComponent(cc.Label).string = require("dataMgr").playerData.heart.toString();
    this.physicalLabelNode.getComponent(cc.Label).string = require("dataMgr").playerData.physicalPower.toString();

    var systemsMgr = require("systemsMgr"); // this.mailSysButtonNode.on("click",function(){
    //     systemsMgr.showSystem("mailSys",null,1,2)
    // })
    // this.mailSysButtonNode.getComponent("redPointMgr").redPointShowCondition = function() {
    //     var mails = require("dataMgr").playerData.mails
    //     var unReadNum = 0
    //     for (var key in mails) {
    //         var oneMail = mails[key]
    //         if (oneMail.status == 0) {
    //             unReadNum += 1
    //         }
    //     }
    //     if (unReadNum > 0) {
    //         return true
    //     }
    //     else {
    //         return false
    //     }
    // }


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL21haW5TY2VuZS9tYWluU2NlbmVNZ3IuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzZWN0aW9uTmFtZUxhYmVsTm9kZSIsIk5vZGUiLCJsZXZlbE5vZGVzIiwiY29ubmVjdExpbmVOb2RlcyIsImxldmVsTm9kZVByZWZhYiIsIlByZWZhYiIsImxldmVsTm9kZXNDb25uZWN0TGluZVByZWZhYiIsInNlbGVjdGVkU2VjdGlvbiIsInBoeXNpY2FsTGFiZWxOb2RlIiwiaGVhcnRMYWJlbE5vZGUiLCJtYWlsU3lzQnV0dG9uTm9kZSIsInNpZ25JblN5c0J1dHRvbk5vZGUiLCJ3ZWxmYXJ5U3lzQnV0dG9uTm9kZSIsImFkZEhlYXJ0QnV0dG9uTm9kZSIsImFkZFBoeXNpY2FsUG93ZXJCdXR0b25Ob2RlIiwic2VsZWN0U2VjdGlvbkJ1dHRvbk5vZGUiLCJiYWNrVG9DdXJyZW50QnV0dG9uTm9kZSIsImxldmVsTm9kZVN0YXJ0UG9zaXRpb24iLCJ2MiIsImxldmVsTm9kZXNIb3JEaXMiLCJsZXZlbE5vZGVzVmVyRGlzIiwibGV2ZWxOb2Rlc051bVBlckxpbmUiLCJyb3RhZWRDb3BpZWRSYWRpdXMiLCJpc1Nob3dpbmdOb3RpIiwiY2FuU2hvd05vdGkiLCJvbkxvYWQiLCJzZXR1cERhdGEiLCJzdGFydCIsInNldHVwVUkiLCJyZXF1aXJlIiwidG9TdHJpbmciLCJnZXRDb21wb25lbnQiLCJXaWRnZXQiLCJ1cGRhdGVBbGlnbm1lbnQiLCJMYWJlbCIsInN0cmluZyIsInBsYXllckRhdGEiLCJoZWFydCIsInBoeXNpY2FsUG93ZXIiLCJzeXN0ZW1zTWdyIiwib24iLCJzaG93U3lzdGVtIiwicmVkUG9pbnRTaG93Q29uZGl0aW9uIiwic2lnbkluU3RhdHVzIiwiZmxhZyIsImluaXRBZFdhdGNoZWRGbGFnIiwiYWN0aXZlIiwidHdlZW4iLCJyZXBlYXRGb3JldmVyIiwidG8iLCJhbmdsZSIsImRlbGF5Iiwib3BhY2l0eSIsImdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlIiwic2VsZiIsImN1cnJlbnRTZWN0aW9uIiwic2V0dXBTZWN0aW9uUGVyZm9ybWFuY2UiLCJwbGF5QmdtIiwieSIsImhlaWdodCIsImxvZyIsInRleHRDb25maWciLCJkZXN0cm95QWxsQ2hpbGRyZW4iLCJyZW1vdmVBbGxDaGlsZHJlbiIsInNlY3Rpb25Db25maWciLCJjb25maWciLCJzZWN0aW9uVGl0bGUiLCJzZWN0aW9uVGl0bGVUZXh0SWQiLCJzZWN0aW9uRGVzIiwic2VjdGlvbkRlc2NyaXBUZXh0SWQiLCJzaG93VGV4dCIsIl9mb3JjZVVwZGF0ZVJlbmRlckRhdGEiLCJ4Iiwid2lkdGgiLCJsZXZlbHMiLCJpbmRleCIsIm9uZUxldmVsIiwib25lTGV2ZWxOb2RlIiwiaW5zdGFudGlhdGUiLCJtZ3IiLCJsZXZlbCIsImxldmVsTnVtTGFiZWxOb2RlIiwicGFyc2VJbnQiLCJzdGF0dXMiLCJfY2hlY2tMZXZlbFN0YXR1cyIsImRlbGVnYXRlIiwiX3NldHVwTGV2ZWxOb2RlUG9zaXRpb24iLCJhZGRDaGlsZCIsImNoaWxkcmVuIiwib25lTm9kZSIsInByZU5vZGUiLCJjb25uZWN0TGluZSIsInYiLCJtYWciLCJkZWdyZWUiLCJzaWduQW5nbGUiLCJNYXRoIiwiUEkiLCJyZXN1bHQiLCJfZ2V0TWlkUG9pbnRPZlR3b1BvaW50cyIsInBvc2l0aW9uIiwiZ2l2ZW5Ob2RlIiwiZ2l2ZW5JbmRleCIsImxldmVsTm9kZVBvc2l0aW9ucyIsImxlbmd0aCIsIm5vZGVzTnVtIiwiYmFzZVZlY3RvciIsInJvdGF0ZSIsInBvaW50MSIsInBvaW50MiIsIl9jaGVja1NlY3Rpb25TdGF0dXMiLCJnaXZlblNlY3Rpb24iLCJnaXZuZUxldmVsIiwic2VjdGlvbktleSIsIl9nZXRTZWN0aW9uS2V5QnlMZXZlbCIsInNlY3Rpb25TdGF0dXMiLCJjdXJyZW50TGV2ZWwiLCJsZXZlbHNBcnJ5IiwiaW5kZXhPZiIsImdpdmVuTGV2ZWwiLCJsZXZlbElkIiwia2V5Iiwib25lQ29uZmlnIiwibGV2ZWxzQ29uZmlnIiwiZGF0YU1vbml0b3JlZCIsInZhbHVlIiwib25lTWdyIiwidXBkYXRlIiwiZHQiLCJub3RpZmljYXRpb25NZ3IiLCJub3RpQXJyeSIsIm5vdGllcyIsInRlbXAiLCJvbmVTdHIiLCJzaG93Tm90aSIsInNwbGljZSIsIm5vZGUiLCJjYWxsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsb0JBQW9CLEVBQUVKLEVBQUUsQ0FBQ0ssSUFoQmpCO0FBaUJSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ0ssSUFqQlA7QUFrQlJFLElBQUFBLGdCQUFnQixFQUFFUCxFQUFFLENBQUNLLElBbEJiO0FBbUJSRyxJQUFBQSxlQUFlLEVBQUVSLEVBQUUsQ0FBQ1MsTUFuQlo7QUFvQlJDLElBQUFBLDJCQUEyQixFQUFFVixFQUFFLENBQUNTLE1BcEJ4QjtBQXFCUkUsSUFBQUEsZUFBZSxFQUFFLElBckJUO0FBc0JSQyxJQUFBQSxpQkFBaUIsRUFBRVosRUFBRSxDQUFDSyxJQXRCZDtBQXVCUlEsSUFBQUEsY0FBYyxFQUFFYixFQUFFLENBQUNLLElBdkJYO0FBd0JSUyxJQUFBQSxpQkFBaUIsRUFBRWQsRUFBRSxDQUFDSyxJQXhCZDtBQXlCUlUsSUFBQUEsbUJBQW1CLEVBQUVmLEVBQUUsQ0FBQ0ssSUF6QmhCO0FBMEJSVyxJQUFBQSxvQkFBb0IsRUFBRWhCLEVBQUUsQ0FBQ0ssSUExQmpCO0FBMkJSWSxJQUFBQSxrQkFBa0IsRUFBRWpCLEVBQUUsQ0FBQ0ssSUEzQmY7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QU0sR0FBR0gsUUFBUSxDQUFDLENBQUQsQ0FBckI7QUFDQUQsUUFBQUEsZUFBZSxDQUFDSyxRQUFoQixDQUF5QkQsTUFBekI7QUFDQUgsUUFBQUEsUUFBUSxDQUFDSyxNQUFULENBQWdCLENBQWhCLEVBQWtCLENBQWxCO0FBQ0EzSSxRQUFBQSxFQUFFLENBQUNtRCxLQUFILENBQVNPLElBQUksQ0FBQ2tGLElBQWQsRUFDS3JGLEtBREwsQ0FDVyxHQURYLEVBRUtzRixJQUZMLENBRVUsWUFBVTtBQUNaTCxVQUFBQSxJQUFJO0FBQ1AsU0FKTCxFQUtLekcsS0FMTDtBQU1ILE9BZkQ7O0FBaUJBeUcsTUFBQUEsSUFBSTtBQUNQO0FBQ0o7QUEvVkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHBzOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICBzZWN0aW9uTmFtZUxhYmVsTm9kZTogY2MuTm9kZSxcbiAgICAgICAgbGV2ZWxOb2RlczogY2MuTm9kZSxcbiAgICAgICAgY29ubmVjdExpbmVOb2RlczogY2MuTm9kZSxcbiAgICAgICAgbGV2ZWxOb2RlUHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGxldmVsTm9kZXNDb25uZWN0TGluZVByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBzZWxlY3RlZFNlY3Rpb246IG51bGwsXG4gICAgICAgIHBoeXNpY2FsTGFiZWxOb2RlOiBjYy5Ob2RlLFxuICAgICAgICBoZWFydExhYmVsTm9kZTogY2MuTm9kZSxcbiAgICAgICAgbWFpbFN5c0J1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIHNpZ25JblN5c0J1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIHdlbGZhcnlTeXNCdXR0b25Ob2RlOiBjYy5Ob2RlLFxuICAgICAgICBhZGRIZWFydEJ1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGFkZFBoeXNpY2FsUG93ZXJCdXR0b25Ob2RlOiBjYy5Ob2RlLFxuICAgICAgICBzZWxlY3RTZWN0aW9uQnV0dG9uTm9kZTogY2MuTm9kZSxcbiAgICAgICAgYmFja1RvQ3VycmVudEJ1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGxldmVsTm9kZVN0YXJ0UG9zaXRpb246IGNjLnYyKDAsMCksXG4gICAgICAgIGxldmVsTm9kZXNIb3JEaXM6IDEwLFxuICAgICAgICBsZXZlbE5vZGVzVmVyRGlzOiAyMCxcbiAgICAgICAgbGV2ZWxOb2Rlc051bVBlckxpbmU6IDQsXG5cbiAgICAgICAgcm90YWVkQ29waWVkUmFkaXVzOiAzMDAsXG4gICAgICAgIGlzU2hvd2luZ05vdGk6IGZhbHNlLFxuICAgICAgICBjYW5TaG93Tm90aTogdHJ1ZVxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMuc2V0dXBEYXRhKClcbiAgICAgICAgLy90aGlzLnNldHVwVUkoKVxuICAgICAgICAvL3JlcXVpcmUoXCJnYW1lTWdyXCIpLl9nZW5lcmF0ZUxldmVsU2NlbmVDb25maWcoKVxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuc2V0dXBVSSgpXG4gICAgICAgIC8vcmVxdWlyZShcInN5c3RlbXNNZ3JcIikuc2hvd1N5c3RlbShcInN0b3J5U3lzXCIsOTAwMSwyKVxuICAgICAgICAvLyB2YXIgc3RvcnlJZCA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuc3RvcnlTeXNJZFxuICAgICAgICAvLyBpZiAoc3RvcnlJZCAhPSAtMSkge1xuICAgICAgICAvLyAgICAgcmVxdWlyZShcInN5c3RlbXNNZ3JcIikuc2hvd1N5c3RlbShcInN0b3J5U3lzXCIsc3RvcnlJZCwyKVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgcmVxdWlyZShcImJnbU1nclwiKS5zZWxlY3RlZFNlY3Rpb24gPSB0aGlzLnNlbGVjdGVkU2VjdGlvbi50b1N0cmluZygpXG4gICAgfSxcbiAgICBcbiAgICBzZXR1cFVJKCkge1xuICAgICAgICB0aGlzLnNlY3Rpb25OYW1lTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpXG4gICAgICAgIHRoaXMuaGVhcnRMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmhlYXJ0LnRvU3RyaW5nKClcbiAgICAgICAgdGhpcy5waHlzaWNhbExhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEucGh5c2ljYWxQb3dlci50b1N0cmluZygpXG4gICAgICAgIHZhciBzeXN0ZW1zTWdyID0gcmVxdWlyZShcInN5c3RlbXNNZ3JcIilcbiAgICAgICAgLy8gdGhpcy5tYWlsU3lzQnV0dG9uTm9kZS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gICAgIHN5c3RlbXNNZ3Iuc2hvd1N5c3RlbShcIm1haWxTeXNcIixudWxsLDEsMilcbiAgICAgICAgLy8gfSlcbiAgICAgICAgLy8gdGhpcy5tYWlsU3lzQnV0dG9uTm9kZS5nZXRDb21wb25lbnQoXCJyZWRQb2ludE1nclwiKS5yZWRQb2ludFNob3dDb25kaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gICAgIHZhciBtYWlscyA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEubWFpbHNcbiAgICAgICAgLy8gICAgIHZhciB1blJlYWROdW0gPSAwXG4gICAgICAgIC8vICAgICBmb3IgKHZhciBrZXkgaW4gbWFpbHMpIHtcbiAgICAgICAgLy8gICAgICAgICB2YXIgb25lTWFpbCA9IG1haWxzW2tleV1cbiAgICAgICAgLy8gICAgICAgICBpZiAob25lTWFpbC5zdGF0dXMgPT0gMCkge1xuICAgICAgICAvLyAgICAgICAgICAgICB1blJlYWROdW0gKz0gMVxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIGlmICh1blJlYWROdW0gPiAwKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG5cblxuICAgICAgICB0aGlzLnNpZ25JblN5c0J1dHRvbk5vZGUub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzeXN0ZW1zTWdyLnNob3dTeXN0ZW0oXCJzaWduSW5TeXNcIilcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5zaWduSW5TeXNCdXR0b25Ob2RlLmdldENvbXBvbmVudChcInJlZFBvaW50TWdyXCIpLnJlZFBvaW50U2hvd0NvbmRpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHNpZ25JblN0YXR1cyA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuc2lnbkluU3RhdHVzXG4gICAgICAgICAgICBzd2l0Y2goc2lnbkluU3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkUGh5c2ljYWxQb3dlckJ1dHRvbk5vZGUub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzeXN0ZW1zTWdyLnNob3dTeXN0ZW0oXCJhZGRQcm9wZXJ0eU51bVN5c1wiLDEpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuYWRkSGVhcnRCdXR0b25Ob2RlLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgc3lzdGVtc01nci5zaG93U3lzdGVtKFwiYWRkUHJvcGVydHlOdW1TeXNcIiwyKVxuICAgICAgICB9KVxuXG4gICAgICAgIHZhciBmbGFnID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5pbml0QWRXYXRjaGVkRmxhZ1xuICAgICAgICBpZiAoZmxhZyA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLndlbGZhcnlTeXNCdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLndlbGZhcnlTeXNCdXR0b25Ob2RlKVxuICAgICAgICAgICAgICAgIC5yZXBlYXRGb3JldmVyKGNjLnR3ZWVuKClcbiAgICAgICAgICAgICAgICAgICAgLnRvKDAuMyx7YW5nbGU6IC00NX0pXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjMse2FuZ2xlOiAwfSlcbiAgICAgICAgICAgICAgICAgICAgLnRvKDAuMyx7YW5nbGU6IDQ1fSlcbiAgICAgICAgICAgICAgICAgICAgLnRvKDAuMyx7YW5nbGU6IDB9KVxuICAgICAgICAgICAgICAgICAgICAuZGVsYXkoMSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnN0YXJ0KClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy53ZWxmYXJ5U3lzQnV0dG9uTm9kZS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBzeXN0ZW1zTWdyLnNob3dTeXN0ZW0oXCJ3ZWxmYXJ5U3lzXCIpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3RTZWN0aW9uQnV0dG9uTm9kZS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHN5c3RlbXNNZ3Iuc2hvd1N5c3RlbShcInNlbGVjdFNlY3Rpb25TeXNcIilcbiAgICAgICAgfSlcblxuICAgICAgICBjYy50d2Vlbih0aGlzLmJhY2tUb0N1cnJlbnRCdXR0b25Ob2RlKVxuICAgICAgICAgICAgLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKVxuICAgICAgICAgICAgICAgICAgICAudG8oMSwge29wYWNpdHk6IDB9KVxuICAgICAgICAgICAgICAgICAgICAudG8oMSwge29wYWNpdHk6IDI1NX0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3RhcnQoKVxuICAgICAgICB0aGlzLmJhY2tUb0N1cnJlbnRCdXR0b25Ob2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVxdWlyZShcInRleHRDb25maWdcIikuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTY3KVxuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgdGhpcy5iYWNrVG9DdXJyZW50QnV0dG9uTm9kZS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRTZWN0aW9uID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5jdXJyZW50U2VjdGlvblxuICAgICAgICAgICAgc2VsZi5zZXR1cFNlY3Rpb25QZXJmb3JtYW5jZSgpXG4gICAgICAgICAgICBzZWxmLnBsYXlCZ20oKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmJhY2tUb0N1cnJlbnRCdXR0b25Ob2RlLnkgPSB0aGlzLnNlY3Rpb25OYW1lTGFiZWxOb2RlLnkgLSB0aGlzLnNlY3Rpb25OYW1lTGFiZWxOb2RlLmhlaWdodCAvIDIgLSAxMDBcbiAgICAgICAgdGhpcy5zZXR1cFNlY3Rpb25QZXJmb3JtYW5jZSgpXG4gICAgfSxcblxuICAgIHNldHVwRGF0YSgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFNlY3Rpb24gPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmN1cnJlbnRTZWN0aW9uXG4gICAgfSxcblxuICAgIHNldHVwU2VjdGlvblBlcmZvcm1hbmNlKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFNlY3Rpb24gPT0gbnVsbCkge1xuICAgICAgICAgICAgY2MubG9nKFwibm90IHNlbGVjdGVkIG9uZSBzZWN0aW9uLCBjYW4gbm90IHNldHVwIHNlY3Rpb24gb2YgbWFpblNjZW5lIG1nclwiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRTZWN0aW9uID09IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuYmFja1RvQ3VycmVudEJ1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYmFja1RvQ3VycmVudEJ1dHRvbk5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHZhciB0ZXh0Q29uZmlnID0gcmVxdWlyZShcInRleHRDb25maWdcIilcbiAgICAgICAgdGhpcy5sZXZlbE5vZGVzLmRlc3Ryb3lBbGxDaGlsZHJlbigpXG4gICAgICAgIHRoaXMubGV2ZWxOb2Rlcy5yZW1vdmVBbGxDaGlsZHJlbigpXG4gICAgICAgIHRoaXMuY29ubmVjdExpbmVOb2Rlcy5kZXN0cm95QWxsQ2hpbGRyZW4oKVxuICAgICAgICB0aGlzLmNvbm5lY3RMaW5lTm9kZXMucmVtb3ZlQWxsQ2hpbGRyZW4oKVxuICAgICAgICB2YXIgc2VjdGlvbkNvbmZpZyA9IHJlcXVpcmUoXCJzZWN0aW9uQ29uZmlnXCIpXG4gICAgICAgIHZhciBjb25maWcgPSBzZWN0aW9uQ29uZmlnW3RoaXMuc2VsZWN0ZWRTZWN0aW9uXVxuICAgICAgICB2YXIgc2VjdGlvblRpdGxlID0gdGV4dENvbmZpZy5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZShjb25maWcuc2VjdGlvblRpdGxlVGV4dElkKVxuICAgICAgICB2YXIgc2VjdGlvbkRlcyA9IHRleHRDb25maWcuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoY29uZmlnLnNlY3Rpb25EZXNjcmlwVGV4dElkKVxuICAgICAgICB2YXIgc2hvd1RleHQgPSBzZWN0aW9uVGl0bGUgKyBcIiBcIiArIHNlY3Rpb25EZXNcbiAgICAgICAgdGhpcy5zZWN0aW9uTmFtZUxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHNob3dUZXh0XG4gICAgICAgIHRoaXMuc2VjdGlvbk5hbWVMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5fZm9yY2VVcGRhdGVSZW5kZXJEYXRhKClcbiAgICAgICAgdGhpcy5zZWxlY3RTZWN0aW9uQnV0dG9uTm9kZS55ID0gdGhpcy5zZWN0aW9uTmFtZUxhYmVsTm9kZS55XG4gICAgICAgIHRoaXMuc2VsZWN0U2VjdGlvbkJ1dHRvbk5vZGUueCA9IHRoaXMuc2VjdGlvbk5hbWVMYWJlbE5vZGUueCAtIHRoaXMuc2VjdGlvbk5hbWVMYWJlbE5vZGUud2lkdGggLyAyIC0gMTAwXG4gICAgICAgIHZhciBsZXZlbHMgPSBjb25maWcubGV2ZWxzXG4gICAgICAgIGZvciAodmFyIGluZGV4IGluIGxldmVscykge1xuICAgICAgICAgICAgdmFyIG9uZUxldmVsID0gbGV2ZWxzW2luZGV4XVxuICAgICAgICAgICAgdmFyIG9uZUxldmVsTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGV2ZWxOb2RlUHJlZmFiKVxuICAgICAgICAgICAgdmFyIG1nciA9IG9uZUxldmVsTm9kZS5nZXRDb21wb25lbnQoXCJsZXZlbE5vZGVNZ3JcIilcbiAgICAgICAgICAgIG1nci5sZXZlbCA9IG9uZUxldmVsXG4gICAgICAgICAgICBtZ3IubGV2ZWxOdW1MYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAocGFyc2VJbnQoaW5kZXgpICsgMSkudG9TdHJpbmcoKVxuICAgICAgICAgICAgbWdyLnN0YXR1cyA9IHRoaXMuX2NoZWNrTGV2ZWxTdGF0dXMob25lTGV2ZWwpXG4gICAgICAgICAgICBtZ3IuZGVsZWdhdGUgPSB0aGlzXG4gICAgICAgICAgICB0aGlzLl9zZXR1cExldmVsTm9kZVBvc2l0aW9uKG9uZUxldmVsTm9kZSxpbmRleClcbiAgICAgICAgICAgIHRoaXMubGV2ZWxOb2Rlcy5hZGRDaGlsZChvbmVMZXZlbE5vZGUpXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiB0aGlzLmxldmVsTm9kZXMuY2hpbGRyZW4pe1xuICAgICAgICAgICAgaWYgKGluZGV4ID09IDApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9uZU5vZGUgPSB0aGlzLmxldmVsTm9kZXMuY2hpbGRyZW5baW5kZXhdXG4gICAgICAgICAgICB2YXIgcHJlTm9kZSA9IHRoaXMubGV2ZWxOb2Rlcy5jaGlsZHJlblsoaW5kZXggLSAxKV1cbiAgICAgICAgICAgIHZhciBjb25uZWN0TGluZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGV2ZWxOb2Rlc0Nvbm5lY3RMaW5lUHJlZmFiKVxuICAgICAgICAgICAgdmFyIHYgPSBjYy52MihwcmVOb2RlLnggLSBvbmVOb2RlLngsIHByZU5vZGUueSAtIG9uZU5vZGUueSlcbiAgICAgICAgICAgIGNvbm5lY3RMaW5lLndpZHRoID0gdi5tYWcoKVxuICAgICAgICAgICAgdmFyIGRlZ3JlZT0gdi5zaWduQW5nbGUoY2MudjIoMSwwKSkgLyBNYXRoLlBJICogMTgwXG4gICAgICAgICAgICBjb25uZWN0TGluZS5hbmdsZSA9IC1kZWdyZWVcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9nZXRNaWRQb2ludE9mVHdvUG9pbnRzKG9uZU5vZGUucG9zaXRpb24sIHByZU5vZGUucG9zaXRpb24pXG4gICAgICAgICAgICBjb25uZWN0TGluZS54ID0gcmVzdWx0LnhcbiAgICAgICAgICAgIGNvbm5lY3RMaW5lLnkgPSByZXN1bHQueVxuICAgICAgICAgICAgdGhpcy5jb25uZWN0TGluZU5vZGVzLmFkZENoaWxkKGNvbm5lY3RMaW5lKVxuICAgICAgICB9XG4gICAgfSxcbiAgICBfc2V0dXBMZXZlbE5vZGVQb3NpdGlvbihnaXZlbk5vZGUsIGdpdmVuSW5kZXgpIHtcbiAgICAgICAgdmFyIHNlY3Rpb25Db25maWcgPSByZXF1aXJlKFwic2VjdGlvbkNvbmZpZ1wiKVt0aGlzLnNlbGVjdGVkU2VjdGlvbl1cbiAgICAgICAgdmFyIGxldmVsTm9kZVBvc2l0aW9ucyA9IHNlY3Rpb25Db25maWcubGV2ZWxOb2RlUG9zaXRpb25zXG4gICAgICAgIGlmIChsZXZlbE5vZGVQb3NpdGlvbnMgPT0gbnVsbCB8fCBsZXZlbE5vZGVQb3NpdGlvbnMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIC8vbGluZWRcblxuICAgICAgICAgICAgLy8gdmFyIHJvd0luZGV4ID0gZ2l2ZW5JbmRleCAlIHRoaXMubGV2ZWxOb2Rlc051bVBlckxpbmVcbiAgICAgICAgICAgIC8vIHZhciBjb2xJbmRleCA9IE1hdGguZmxvb3IoZ2l2ZW5JbmRleCAvIHRoaXMubGV2ZWxOb2Rlc051bVBlckxpbmUpXG5cbiAgICAgICAgICAgIC8vIHZhciBtYXhYID0gdGhpcy5sZXZlbE5vZGVTdGFydFBvc2l0aW9uLnggKyB0aGlzLmxldmVsTm9kZXNIb3JEaXMgKiAodGhpcy5sZXZlbE5vZGVzTnVtUGVyTGluZSAtIDEpXG4gICAgICAgICAgICAvLyBpZiAoY29sSW5kZXggJSAyID09IDApIHtcbiAgICAgICAgICAgIC8vICAgICBnaXZlbk5vZGUueCA9IHRoaXMubGV2ZWxOb2RlU3RhcnRQb3NpdGlvbi54ICsgcm93SW5kZXggKiB0aGlzLmxldmVsTm9kZXNIb3JEaXNcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgIGdpdmVuTm9kZS54ID0gbWF4WCAtIHJvd0luZGV4ICogdGhpcy5sZXZlbE5vZGVzSG9yRGlzXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBnaXZlbk5vZGUueSA9IHRoaXMubGV2ZWxOb2RlU3RhcnRQb3NpdGlvbi55ICsgY29sSW5kZXggKiB0aGlzLmxldmVsTm9kZXNWZXJEaXNcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gdmFyIGxldmVsTm9kZVN0YXJ0ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2VjdGlvbk5hbWVMYWJlbFwiKS5nZXRDaGlsZEJ5TmFtZShcImxldmVsTm9kZVN0YXJ0XCIpXG4gICAgICAgICAgICAvLyBnaXZlbk5vZGUueCA9IGxldmVsTm9kZVN0YXJ0LnhcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gZ2l2ZW5Ob2RlLnkgPSBsZXZlbE5vZGVTdGFydC55ICsgZ2l2ZW5JbmRleCAqIHRoaXMubGV2ZWxOb2Rlc1ZlckRpc1xuXG4gICAgICAgICAgICAvL3JvdGF0ZWQgY29waWVkXG4gICAgICAgICAgICB2YXIgbm9kZXNOdW0gPSBzZWN0aW9uQ29uZmlnLmxldmVscy5sZW5ndGhcbiAgICAgICAgICAgIHZhciBhbmdsZSA9IDIgKiBNYXRoLlBJIC8gbm9kZXNOdW1cbiAgICAgICAgICAgIHZhciBiYXNlVmVjdG9yID0gY2MudjIodGhpcy5yb3RhZWRDb3BpZWRSYWRpdXMsMClcbiAgICAgICAgICAgIHZhciB2ID0gYmFzZVZlY3Rvci5yb3RhdGUoLWdpdmVuSW5kZXggKiBhbmdsZSlcbiAgICAgICAgICAgIGdpdmVuTm9kZS54ID0gdi54XG4gICAgICAgICAgICBnaXZlbk5vZGUueSA9IHYueVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZ2l2ZW5Ob2RlLnggPSBsZXZlbE5vZGVQb3NpdGlvbnNbZ2l2ZW5JbmRleF0ueFxuICAgICAgICAgICAgZ2l2ZW5Ob2RlLnkgPSBsZXZlbE5vZGVQb3NpdGlvbnNbZ2l2ZW5JbmRleF0ueVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9nZXRNaWRQb2ludE9mVHdvUG9pbnRzKHBvaW50MSxwb2ludDIpIHtcbiAgICAgICAgdmFyIHYgPSBjYy52Mihwb2ludDIueCAtIHBvaW50MS54LCBwb2ludDIueSAtIHBvaW50MS55KVxuICAgICAgICB2YXIgeCA9IHBvaW50MS54ICsgdi54IC8gMlxuICAgICAgICB2YXIgeSA9IHBvaW50MS55ICsgdi55IC8gMlxuICAgICAgICByZXR1cm4gY2MudjIoeCx5KVxuICAgIH0sXG5cblxuICAgIF9jaGVja1NlY3Rpb25TdGF0dXMoZ2l2ZW5TZWN0aW9uKSB7XG4gICAgICAgIHZhciBjdXJyZW50U2VjdGlvbiA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuY3VycmVudFNlY3Rpb25cbiAgICAgICAgaWYgKHR5cGVvZiBnaXZlblNlY3Rpb24gIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGdpdmVuU2VjdGlvbiA9IHBhcnNlSW50KGdpdmVuU2VjdGlvbilcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2l2ZW5TZWN0aW9uID4gY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiAwIC8vbG9ja2VkXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZ2l2ZW5TZWN0aW9uIDwgY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiAxIC8vdW5sb2NrZWRcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChnaXZlblNlY3Rpb24gPT0gY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiAyIC8vY3VycmVudFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9jaGVja0xldmVsU3RhdHVzKGdpdm5lTGV2ZWwpIHtcbiAgICAgICAgdmFyIHNlY3Rpb25LZXkgPSB0aGlzLl9nZXRTZWN0aW9uS2V5QnlMZXZlbChnaXZuZUxldmVsKVxuICAgICAgICBpZiAoc2VjdGlvbktleSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlIC8vbm8gc3VjaCBsZXZlbFxuICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIHZhciBzZWN0aW9uU3RhdHVzID0gdGhpcy5fY2hlY2tTZWN0aW9uU3RhdHVzKHNlY3Rpb25LZXkpXG4gICAgICAgIHN3aXRjaChzZWN0aW9uU3RhdHVzKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDAgLy9sb2NrZWRcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMSAvL3VubG9ja2VkXG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRMZXZlbCA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuY3VycmVudExldmVsXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRMZXZlbCA9PSBnaXZuZUxldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAyIC8vY3VycmVudFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBzZWN0aW9uQ29uZmlnID0gcmVxdWlyZShcInNlY3Rpb25Db25maWdcIilbc2VjdGlvbktleV1cbiAgICAgICAgICAgICAgICB2YXIgbGV2ZWxzQXJyeSA9IHNlY3Rpb25Db25maWcubGV2ZWxzXG4gICAgICAgICAgICAgICAgaWYgKGxldmVsc0FycnkuaW5kZXhPZihnaXZuZUxldmVsKSA+IGxldmVsc0FycnkuaW5kZXhPZihjdXJyZW50TGV2ZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwIC8vbG9ja2VkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAxIC8vdW5sb2NrZWRcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX2dldFNlY3Rpb25LZXlCeUxldmVsKGdpdmVuTGV2ZWwpIHtcbiAgICAgICAgdmFyIGxldmVsSWQgPSBwYXJzZUludChnaXZlbkxldmVsKVxuICAgICAgICB2YXIgc2VjdGlvbkNvbmZpZyA9IHJlcXVpcmUoXCJzZWN0aW9uQ29uZmlnXCIpXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzZWN0aW9uQ29uZmlnKSB7XG4gICAgICAgICAgICB2YXIgb25lQ29uZmlnID0gc2VjdGlvbkNvbmZpZ1trZXldXG4gICAgICAgICAgICB2YXIgbGV2ZWxzQ29uZmlnID0gb25lQ29uZmlnLmxldmVsc1xuICAgICAgICAgICAgaWYgKGxldmVsc0NvbmZpZy5pbmRleE9mKGxldmVsSWQpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSxcblxuXG4gICAgZGF0YU1vbml0b3JlZChrZXksdmFsdWUpIHtcbiAgICAgICAgaWYgKGtleSA9PSBcInBoeXNpY2FsUG93ZXJcIikge1xuICAgICAgICAgICAgdGhpcy5waHlzaWNhbExhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHZhbHVlLnRvU3RyaW5nKClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT0gXCJoZWFydFwiKSB7XG4gICAgICAgICAgICB0aGlzLmhlYXJ0TGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdmFsdWUudG9TdHJpbmcoKVxuICAgICAgICB9XG4gICAgICAgIGZvcih2YXIgaW5kZXggaW4gdGhpcy5sZXZlbE5vZGVzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICB2YXIgb25lTWdyID0gdGhpcy5sZXZlbE5vZGVzLmNoaWxkcmVuW2luZGV4XS5nZXRDb21wb25lbnQoXCJsZXZlbE5vZGVNZ3JcIilcbiAgICAgICAgICAgIG9uZU1nci5kYXRhTW9uaXRvcmVkKGtleSx2YWx1ZSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIHZhciBub3RpZmljYXRpb25NZ3IgPSByZXF1aXJlKFwibm90aWZpY2F0aW9uTWdyXCIpXG4gICAgICAgIHZhciBub3RpQXJyeSA9IG5vdGlmaWNhdGlvbk1nci5ub3RpZXNcbiAgICAgICAgaWYgKG5vdGlBcnJ5Lmxlbmd0aCA+IDAgJiYgdGhpcy5pc1Nob3dpbmdOb3RpID09IGZhbHNlICYmIHRoaXMuY2FuU2hvd05vdGkgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5pc1Nob3dpbmdOb3RpID0gdHJ1ZVxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgICAgICB2YXIgdGVtcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChub3RpQXJyeS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmlzU2hvd2luZ05vdGkgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgb25lU3RyID0gbm90aUFycnlbMF1cbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb25NZ3Iuc2hvd05vdGkob25lU3RyKVxuICAgICAgICAgICAgICAgIG5vdGlBcnJ5LnNwbGljZSgwLDEpXG4gICAgICAgICAgICAgICAgY2MudHdlZW4oc2VsZi5ub2RlKVxuICAgICAgICAgICAgICAgICAgICAuZGVsYXkoMC4zKVxuICAgICAgICAgICAgICAgICAgICAuY2FsbChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcCgpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5zdGFydCgpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRlbXAoKVxuICAgICAgICB9XG4gICAgfSxcbn0pO1xuIl19