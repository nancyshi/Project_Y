
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/mainScene/preChallengeUIMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e5cd7mr4sZJ97Ekm5ipqXJu', 'preChallengeUIMgr');
// scripts/mainScene/preChallengeUIMgr.js

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
    headerDis: 83,
    footerDis: 124,
    sectionDis: 66,
    contentSpace: 99,
    mailSectionElementDis: 30,
    titleLabelNode: cc.Node,
    challengeButtonNoe: cc.Node,
    contentSectionNode: cc.Node,
    mailSectionNode: cc.Node,
    closeButtonNode: cc.Node,
    mailSectionElementPrefab: cc.Prefab,
    challengeButtonCostPhySprite: cc.SpriteFrame,
    level: null,
    levelStatus: null,
    costResult: null,
    delegate: null
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    var textConfig = require("textConfig");

    var bg = this.node.getChildByName("bg");
    bg.width = cc.winSize.width;
    bg.height = cc.winSize.height;
    bg.on("touchstart", function () {}, this);
    var self = this;
    this.closeButtonNode.on("click", function () {
      if (self.delegate != null) {
        self.delegate.preChanllengeUIOpend = false;
      } else {
        cc.log("delegate is null");
      }

      self.node.destroy();
    }, this);
    this.challengeButtonNoe.getChildByName("New Label").getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(151);
  },
  start: function start() {
    this.setupUI();
  },
  getSectionAndIndexOfLevel: function getSectionAndIndexOfLevel() {
    var mainSceneMgr = cc.director.getScene().getChildByName("Canvas").getComponent("mainSceneMgr");
    var section = mainSceneMgr.selectedSection;

    var sectionConfig = require("sectionConfig");

    var levels = sectionConfig[section].levels;
    var index = levels.indexOf(this.level) + 1;
    return [section, index];
  },
  setupUI: function setupUI() {
    this._setupUIContent();

    this._setupUIPosition();
  },
  _setupUIContent: function _setupUIContent() {
    //title label
    var result = this.getSectionAndIndexOfLevel();
    this.titleLabelNode.getComponent(cc.Label).string = result[0].toString() + " - " + result[1]; //content section

    var levelConfig = require("levelConfig");

    var config = levelConfig[this.level];
    var desLabelNode = this.contentSectionNode.getChildByName("desLabel"); //desLabelNode.getComponent(cc.Label).string = require("textConfig").getTextByIdAndLanguageType(config.desTextId)

    desLabelNode.getComponent(cc.Label).string = this.titleLabelNode.getComponent(cc.Label).string;

    desLabelNode.getComponent(cc.Label)._forceUpdateRenderData();

    var seperateLineUpNode = this.contentSectionNode.getChildByName("seperateLineUp");
    var seperateLineDownNode = this.contentSectionNode.getChildByName("seperateLineDown");
    var contentHeight = desLabelNode.height + 2 * this.contentSpace + seperateLineUpNode.height + seperateLineDownNode.height;
    this.contentSectionNode.height = contentHeight;
    seperateLineUpNode.y = 0;
    desLabelNode.y = seperateLineUpNode.y - seperateLineUpNode.height - this.contentSpace;
    seperateLineDownNode.y = -contentHeight + seperateLineDownNode.height; //mailSection

    var textConfig = require("textConfig");

    var result = this._getMailSectionInfo();

    var mailSectionHeight = 0; // for (var index in result) {
    //     var oneConfig = result[index]
    //     var node = cc.instantiate(this.mailSectionElementPrefab)
    //     var desLabel = node.getChildByName("desLabel")
    //     var textStr = ""
    //     if (oneConfig.type == 1) {
    //         // textStr = "通关后会收到 " + oneConfig.tag + " 分支的新邮件"
    //         textStr = textConfig.getFormatedString(149,[oneConfig.tag])
    //     }
    //     else if (oneConfig.type == 2) {
    //         // textStr = "用不多于 " + oneConfig.minStep + " 步通关，会收到 " + oneConfig.tag + " 分支的新邮件"
    //         textStr = textConfig.getFormatedString(150,[oneConfig.minStep,oneConfig.tag])
    //     }
    //     desLabel.getComponent(cc.Label).string = textStr
    //     desLabel.getComponent(cc.Label)._forceUpdateRenderData()
    //     var completeIcon = node.getChildByName("completeIcon")
    //     if (oneConfig.status == true) {
    //         completeIcon.active = true
    //     }
    //     if (desLabel.height > completeIcon.height) {
    //         node.height = desLabel.height
    //     }
    //     else {
    //         node.height = completeIcon.height
    //     }
    //     node.y = mailSectionHeight
    //     mailSectionHeight += node.height
    //     if (index != result.length - 1) {
    //         mailSectionHeight += this.mailSectionElementDis
    //     }
    //     this.mailSectionNode.addChild(node)
    // }

    this.mailSectionNode.height = mailSectionHeight; //challengeButton

    var costResult = this._getCostInfoOfChallenge();

    if (costResult.type == "physicalPower") {
      this.challengeButtonNoe.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = this.challengeButtonCostPhySprite;
    }

    this.challengeButtonNoe.getChildByName("costLabel").getComponent(cc.Label).string = costResult.num.toString();
    this.costResult = costResult;
  },
  _setupUIPosition: function _setupUIPosition() {
    var totalHeight = this.footerDis + this.titleLabelNode.height + this.sectionDis + this.contentSectionNode.height + this.sectionDis + this.mailSectionNode.height + this.sectionDis + this.challengeButtonNoe.height + this.footerDis;
    var uibg = this.node.getChildByName("others").getChildByName("uiBg");
    uibg.height = totalHeight;
    this.titleLabelNode.y = uibg.height / 2 - this.headerDis;
    this.contentSectionNode.y = this.titleLabelNode.y - this.titleLabelNode.height - this.sectionDis;
    this.mailSectionNode.y = this.contentSectionNode.y - this.contentSectionNode.height - this.sectionDis;
    this.challengeButtonNoe.y = this.mailSectionNode.y - this.mailSectionNode.height - this.sectionDis - this.challengeButtonNoe.height / 2;
  },
  _getMailSectionInfo: function _getMailSectionInfo() {
    var mailSysConfig = require("mailSysConfig");

    var result = [];

    var textConfig = require("textConfig");

    for (var tag in mailSysConfig) {
      var oneConfig = mailSysConfig[tag];
      var conditions = oneConfig.conditions;

      var currentConditionIndex = require("dataMgr").playerData.mailConditionIndex[tag];

      for (var index in conditions) {
        var oneConditionConfig = conditions[index];
        var conditionType = oneConditionConfig.conditionType;
        var conditionPara = oneConditionConfig.conditionPara; // if (conditionPara == this.level) {
        //     var oneResult = {
        //         tag: oneConfig.tagName,
        //         status: null
        //     }
        // }

        var oneResult = null;

        if (conditionType == 1 && conditionPara == this.level || conditionType == 2 && conditionPara.levelId == this.level) {
          oneResult = {
            // tag: oneConfig.tagNameTextId,
            tag: textConfig.getTextByIdAndLanguageType(oneConfig.tagNameTextId),
            type: conditionType,
            status: null,
            minStep: null
          };
        }

        if (oneResult == null) {
          continue;
        }

        if (index < currentConditionIndex) {
          oneResult.status = true;
        } else {
          oneResult.status = false;
        }

        if (conditionType == 2) {
          oneResult.minStep = conditionPara.minStepNum;
        }

        result.push(oneResult);
        break;
      }
    }

    return result;
  },
  _getCostInfoOfChallenge: function _getCostInfoOfChallenge() {
    var result = {
      type: "physicalPower",
      num: 0
    };

    var levelConfig = require("levelConfig");

    if (this.levelStatus == 1) {
      result.type = "heart";
      result.num = levelConfig[this.level].heartForRetryCost;
    } else if (this.levelStatus == 2) {
      var flag = require("dataMgr").playerData.physicalPowerCostedFlag;

      if (flag == 0) {
        result.type = "physicalPower";
        result.num = levelConfig[this.level].physicalPowerCost;

        var welfaryFlag = require("dataMgr").playerData.initAdWatchedFlag;

        if (welfaryFlag == 1) {
          result.num = Math.round(result.num / 2);
        }
      } else if (flag == 1) {
        result.type = "heart";
        result.num = levelConfig[this.level].heartForRetryCost;
      }
    }

    return result;
  },
  onClick: function onClick() {
    if (this.costResult == null || this.costResult.num == 0) {
      return;
    }

    var valueNum = null;

    if (this.costResult.type == "heart") {
      valueNum = require("dataMgr").playerData.heart - this.costResult.num;
    } else if (this.costResult.type == "physicalPower") {
      valueNum = require("dataMgr").playerData.physicalPower - this.costResult.num;
    }

    if (valueNum == null || valueNum < 0) {
      var notificaitionSys = require("notificationMgr");

      var notiStr = "";

      if (this.costResult.type == "heart") {
        notiStr = require("textConfig").getTextByIdAndLanguageType(169);
      } else if (this.costResult.type == "physicalPower") {
        notiStr = require("textConfig").getTextByIdAndLanguageType(170);
      }

      notificaitionSys.pushNoti(notiStr);
      return;
    }

    var networkMgr = require("networkMgr");

    var messageObj = networkMgr.makeMessageObj("dataModule", "commitMessageTyp");
    messageObj.message.playerId = require("dataMgr").playerData.id;
    var commitBody = null;

    if (this.costResult.type == "heart") {
      commitBody = {
        "heart": require("dataMgr").playerData.heart - this.costResult.num
      };
    } else if (this.costResult.type == "physicalPower") {
      commitBody = {
        "physicalPower": require("dataMgr").playerData.physicalPower - this.costResult.num
      };
    }

    messageObj.message.commitBody = commitBody;
    var self = this;

    messageObj.successCallBack = function () {
      if (self.costResult.type == "heart") {
        require("dataMgr").playerData.heart = commitBody.heart;
      } else if (self.costResult.type == "physicalPower") {
        require("dataMgr").playerData.physicalPower = commitBody.physicalPower;
      } // self.challengeButtonNoe.getComponent(cc.Button).interactable = true


      require("gameMgr").enterLevelScene(self.level);
    };

    this.challengeButtonNoe.getComponent(cc.Button).interactable = false;
    networkMgr.sendMessageByMsgObj(messageObj);
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL21haW5TY2VuZS9wcmVDaGFsbGVuZ2VVSU1nci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImhlYWRlckRpcyIsImZvb3RlckRpcyIsInNlY3Rpb25EaXMiLCJjb250ZW50U3BhY2UiLCJtYWlsU2VjdGlvbkVsZW1lbnREaXMiLCJ0aXRsZUxhYmVsTm9kZSIsIk5vZGUiLCJjaGFsbGVuZ2VCdXR0b25Ob2UiLCJjb250ZW50U2VjdGlvbk5vZGUiLCJtYWlsU2VjdGlvbk5vZGUiLCJjbG9zZUJ1dHRvbk5vZGUiLCJtYWlsU2VjdGlvbkVsZW1lbnRQcmVmYWIiLCJQcmVmYWIiLCJjaGFsbGVuZ2VCdXR0b25Db3N0UGh5U3ByaXRlIiwiU3ByaXRlRnJhbWUiLCJsZXZlbCIsImxldmVsU3RhdHVzIiwiY29zdFJlc3VsdCIsImRlbGVnYXRlIiwib25Mb2FkIiwidGV4dENvbmZpZyIsInJlcXVpcmUiLCJiZyIsIm5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsIndpZHRoIiwid2luU2l6ZSIsImhlaWdodCIsIm9uIiwic2VsZiIsInByZUNoYW5sbGVuZ2VVSU9wZW5kIiwibG9nIiwiZGVzdHJveSIsImdldENvbXBvbmVudCIsIkxhYmVsIiwic3RyaW5nIiwiZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUiLCJzdGFydCIsInNldHVwVUkiLCJnZXRTZWN0aW9uQW5kSW5kZXhPZkxldmVsIiwibWFpblNjZW5lTWdyIiwiZGlyZWN0b3IiLCJnZXRTY2VuZSIsInNlY3Rpb24iLCJzZWxlY3RlZFNlY3Rpb24iLCJzZWN0aW9uQ29uZmlnIiwibGV2ZWxzIiwiaW5kZXgiLCJpbmRleE9mIiwiX3NldHVwVUlDb250ZW50IiwiX3NldHVwVUlQb3NpdGlvbiIsInJlc3VsdCIsInRvU3RyaW5nIiwibGV2ZWxDb25maWciLCJjb25maWciLCJkZXNMYWJlbE5vZGUiLCJfZm9yY2VVcGRhdGVSZW5kZXJEYXRhIiwic2VwZXJhdGVMaW5lVXBOb2RlIiwic2VwZXJhdGVMaW5lRG93bk5vZGUiLCJjb250ZW50SGVpZ2h0IiwieSIsIl9nZXRNYWlsU2VjdGlvbkluZm8iLCJtYWlsU2VjdGlvbkhlaWdodCIsIl9nZXRDb3N0SW5mb09mQ2hhbGxlbmdlIiwidHlwZSIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwibnVtIiwidG90YWxIZWlnaHQiLCJ1aWJnIiwibWFpbFN5c0NvbmZpZyIsInRhZyIsIm9uZUNvbmZpZyIsImNvbmRpdGlvbnMiLCJjdXJyZW50Q29uZGl0aW9uSW5kZXgiLCJwbGF5ZXJEYXRhIiwibWFpbENvbmRpdGlvbkluZGV4Iiwib25lQ29uZGl0aW9uQ29uZmlnIiwiY29uZGl0aW9uVHlwZSIsImNvbmRpdGlvblBhcmEiLCJvbmVSZXN1bHQiLCJsZXZlbElkIiwidGFnTmFtZVRleHRJZCIsInN0YXR1cyIsIm1pblN0ZXAiLCJtaW5TdGVwTnVtIiwicHVzaCIsImhlYXJ0Rm9yUmV0cnlDb3N0IiwiZmxhZyIsInBoeXNpY2FsUG93ZXJDb3N0ZWRGbGFnIiwicGh5c2ljYWxQb3dlckNvc3QiLCJ3ZWxmYXJ5RmxhZyIsImluaXRBZFdhdGNoZWRGbGFnIiwiTWF0aCIsInJvdW5kIiwib25DbGljayIsInZhbHVlTnVtIiwiaGVhcnQiLCJwaHlzaWNhbFBvd2VyIiwibm90aWZpY2FpdGlvblN5cyIsIm5vdGlTdHIiLCJwdXNoTm90aSIsIm5ldHdvcmtNZ3IiLCJtZXNzYWdlT2JqIiwibWFrZU1lc3NhZ2VPYmoiLCJtZXNzYWdlIiwicGxheWVySWQiLCJpZCIsImNvbW1pdEJvZHkiLCJzdWNjZXNzQ2FsbEJhY2siLCJlbnRlckxldmVsU2NlbmUiLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJzZW5kTWVzc2FnZUJ5TXNnT2JqIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsU0FBUyxFQUFFLEVBaEJIO0FBaUJSQyxJQUFBQSxTQUFTLEVBQUUsR0FqQkg7QUFrQlJDLElBQUFBLFVBQVUsRUFBRSxFQWxCSjtBQW1CUkMsSUFBQUEsWUFBWSxFQUFFLEVBbkJOO0FBb0JSQyxJQUFBQSxxQkFBcUIsRUFBRSxFQXBCZjtBQXNCUkMsSUFBQUEsY0FBYyxFQUFFVCxFQUFFLENBQUNVLElBdEJYO0FBdUJSQyxJQUFBQSxrQkFBa0IsRUFBRVgsRUFBRSxDQUFDVSxJQXZCZjtBQXdCUkUsSUFBQUEsa0JBQWtCLEVBQUVaLEVBQUUsQ0FBQ1UsSUF4QmY7QUF5QlJHLElBQUFBLGVBQWUsRUFBRWIsRUFBRSxDQUFDVSxJQXpCWjtBQTBCUkksSUFBQUEsZUFBZSxFQUFFZCxFQUFFLENBQUNVLElBMUJaO0FBMkJSSyxJQUFBQSx3QkFBd0IsRUFBRWYsRUFBRSxDQUFDZ0IsTUEzQnJCO0FBNEJSQyxJQUFBQSw0QkFBNEIsRUFBRWpCLEVBQUUsQ0FBQ2tCLFdBNUJ6QjtBQThCUkMsSUFBQUEsS0FBSyxFQUFFLElBOUJDO0FBK0JSQyxJQUFBQSxXQUFXLEVBQUUsSUEvQkw7QUFnQ1JDLElBQUFBLFVBQVUsRUFBRSxJQWhDSjtBQWlDUkMsSUFBQUEsUUFBUSxFQUFFO0FBakNGLEdBSFA7QUF1Q0w7QUFFQUMsRUFBQUEsTUF6Q0ssb0JBeUNLO0FBQ04sUUFBSUMsVUFBVSxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUF4Qjs7QUFDQSxRQUFJQyxFQUFFLEdBQUcsS0FBS0MsSUFBTCxDQUFVQyxjQUFWLENBQXlCLElBQXpCLENBQVQ7QUFDQUYsSUFBQUEsRUFBRSxDQUFDRyxLQUFILEdBQVc3QixFQUFFLENBQUM4QixPQUFILENBQVdELEtBQXRCO0FBQ0FILElBQUFBLEVBQUUsQ0FBQ0ssTUFBSCxHQUFZL0IsRUFBRSxDQUFDOEIsT0FBSCxDQUFXQyxNQUF2QjtBQUNBTCxJQUFBQSxFQUFFLENBQUNNLEVBQUgsQ0FBTSxZQUFOLEVBQW1CLFlBQVUsQ0FBRSxDQUEvQixFQUFnQyxJQUFoQztBQUVBLFFBQUlDLElBQUksR0FBRyxJQUFYO0FBQ0EsU0FBS25CLGVBQUwsQ0FBcUJrQixFQUFyQixDQUF3QixPQUF4QixFQUFnQyxZQUFVO0FBQ3RDLFVBQUlDLElBQUksQ0FBQ1gsUUFBTCxJQUFpQixJQUFyQixFQUEyQjtBQUN2QlcsUUFBQUEsSUFBSSxDQUFDWCxRQUFMLENBQWNZLG9CQUFkLEdBQXFDLEtBQXJDO0FBQ0gsT0FGRCxNQUdLO0FBQ0RsQyxRQUFBQSxFQUFFLENBQUNtQyxHQUFILENBQU8sa0JBQVA7QUFDSDs7QUFDREYsTUFBQUEsSUFBSSxDQUFDTixJQUFMLENBQVVTLE9BQVY7QUFDSCxLQVJELEVBUUUsSUFSRjtBQVVBLFNBQUt6QixrQkFBTCxDQUF3QmlCLGNBQXhCLENBQXVDLFdBQXZDLEVBQW9EUyxZQUFwRCxDQUFpRXJDLEVBQUUsQ0FBQ3NDLEtBQXBFLEVBQTJFQyxNQUEzRSxHQUFvRmYsVUFBVSxDQUFDZ0IsMEJBQVgsQ0FBc0MsR0FBdEMsQ0FBcEY7QUFDSCxHQTVESTtBQThETEMsRUFBQUEsS0E5REssbUJBOERJO0FBQ0wsU0FBS0MsT0FBTDtBQUNILEdBaEVJO0FBa0VMQyxFQUFBQSx5QkFsRUssdUNBa0V1QjtBQUN4QixRQUFJQyxZQUFZLEdBQUc1QyxFQUFFLENBQUM2QyxRQUFILENBQVlDLFFBQVosR0FBdUJsQixjQUF2QixDQUFzQyxRQUF0QyxFQUFnRFMsWUFBaEQsQ0FBNkQsY0FBN0QsQ0FBbkI7QUFDQSxRQUFJVSxPQUFPLEdBQUdILFlBQVksQ0FBQ0ksZUFBM0I7O0FBQ0EsUUFBSUMsYUFBYSxHQUFHeEIsT0FBTyxDQUFDLGVBQUQsQ0FBM0I7O0FBQ0EsUUFBSXlCLE1BQU0sR0FBR0QsYUFBYSxDQUFDRixPQUFELENBQWIsQ0FBdUJHLE1BQXBDO0FBQ0EsUUFBSUMsS0FBSyxHQUFHRCxNQUFNLENBQUNFLE9BQVAsQ0FBZSxLQUFLakMsS0FBcEIsSUFBNkIsQ0FBekM7QUFDQSxXQUFPLENBQUM0QixPQUFELEVBQVVJLEtBQVYsQ0FBUDtBQUNILEdBekVJO0FBMkVMVCxFQUFBQSxPQTNFSyxxQkEyRUs7QUFDTixTQUFLVyxlQUFMOztBQUNBLFNBQUtDLGdCQUFMO0FBQ0gsR0E5RUk7QUFnRkxELEVBQUFBLGVBaEZLLDZCQWdGYTtBQUNkO0FBQ0EsUUFBSUUsTUFBTSxHQUFHLEtBQUtaLHlCQUFMLEVBQWI7QUFDQSxTQUFLbEMsY0FBTCxDQUFvQjRCLFlBQXBCLENBQWlDckMsRUFBRSxDQUFDc0MsS0FBcEMsRUFBMkNDLE1BQTNDLEdBQW9EZ0IsTUFBTSxDQUFDLENBQUQsQ0FBTixDQUFVQyxRQUFWLEtBQXVCLEtBQXZCLEdBQStCRCxNQUFNLENBQUMsQ0FBRCxDQUF6RixDQUhjLENBS2Q7O0FBQ0EsUUFBSUUsV0FBVyxHQUFHaEMsT0FBTyxDQUFDLGFBQUQsQ0FBekI7O0FBQ0EsUUFBSWlDLE1BQU0sR0FBR0QsV0FBVyxDQUFDLEtBQUt0QyxLQUFOLENBQXhCO0FBQ0EsUUFBSXdDLFlBQVksR0FBRyxLQUFLL0Msa0JBQUwsQ0FBd0JnQixjQUF4QixDQUF1QyxVQUF2QyxDQUFuQixDQVJjLENBU2Q7O0FBQ0ErQixJQUFBQSxZQUFZLENBQUN0QixZQUFiLENBQTBCckMsRUFBRSxDQUFDc0MsS0FBN0IsRUFBb0NDLE1BQXBDLEdBQTZDLEtBQUs5QixjQUFMLENBQW9CNEIsWUFBcEIsQ0FBaUNyQyxFQUFFLENBQUNzQyxLQUFwQyxFQUEyQ0MsTUFBeEY7O0FBQ0FvQixJQUFBQSxZQUFZLENBQUN0QixZQUFiLENBQTBCckMsRUFBRSxDQUFDc0MsS0FBN0IsRUFBb0NzQixzQkFBcEM7O0FBRUEsUUFBSUMsa0JBQWtCLEdBQUcsS0FBS2pELGtCQUFMLENBQXdCZ0IsY0FBeEIsQ0FBdUMsZ0JBQXZDLENBQXpCO0FBQ0EsUUFBSWtDLG9CQUFvQixHQUFHLEtBQUtsRCxrQkFBTCxDQUF3QmdCLGNBQXhCLENBQXVDLGtCQUF2QyxDQUEzQjtBQUNBLFFBQUltQyxhQUFhLEdBQUdKLFlBQVksQ0FBQzVCLE1BQWIsR0FBc0IsSUFBSSxLQUFLeEIsWUFBL0IsR0FBOENzRCxrQkFBa0IsQ0FBQzlCLE1BQWpFLEdBQTBFK0Isb0JBQW9CLENBQUMvQixNQUFuSDtBQUNBLFNBQUtuQixrQkFBTCxDQUF3Qm1CLE1BQXhCLEdBQWlDZ0MsYUFBakM7QUFFQUYsSUFBQUEsa0JBQWtCLENBQUNHLENBQW5CLEdBQXVCLENBQXZCO0FBQ0FMLElBQUFBLFlBQVksQ0FBQ0ssQ0FBYixHQUFpQkgsa0JBQWtCLENBQUNHLENBQW5CLEdBQXVCSCxrQkFBa0IsQ0FBQzlCLE1BQTFDLEdBQW1ELEtBQUt4QixZQUF6RTtBQUNBdUQsSUFBQUEsb0JBQW9CLENBQUNFLENBQXJCLEdBQXlCLENBQUNELGFBQUQsR0FBaUJELG9CQUFvQixDQUFDL0IsTUFBL0QsQ0FwQmMsQ0FzQmQ7O0FBQ0EsUUFBSVAsVUFBVSxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUF4Qjs7QUFDQSxRQUFJOEIsTUFBTSxHQUFHLEtBQUtVLG1CQUFMLEVBQWI7O0FBQ0EsUUFBSUMsaUJBQWlCLEdBQUcsQ0FBeEIsQ0F6QmMsQ0EwQmQ7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxTQUFLckQsZUFBTCxDQUFxQmtCLE1BQXJCLEdBQThCbUMsaUJBQTlCLENBOURjLENBZ0VkOztBQUNBLFFBQUk3QyxVQUFVLEdBQUcsS0FBSzhDLHVCQUFMLEVBQWpCOztBQUNBLFFBQUk5QyxVQUFVLENBQUMrQyxJQUFYLElBQW1CLGVBQXZCLEVBQXdDO0FBQ3BDLFdBQUt6RCxrQkFBTCxDQUF3QmlCLGNBQXhCLENBQXVDLFVBQXZDLEVBQW1EUyxZQUFuRCxDQUFnRXJDLEVBQUUsQ0FBQ3FFLE1BQW5FLEVBQTJFQyxXQUEzRSxHQUF5RixLQUFLckQsNEJBQTlGO0FBQ0g7O0FBRUQsU0FBS04sa0JBQUwsQ0FBd0JpQixjQUF4QixDQUF1QyxXQUF2QyxFQUFvRFMsWUFBcEQsQ0FBaUVyQyxFQUFFLENBQUNzQyxLQUFwRSxFQUEyRUMsTUFBM0UsR0FBb0ZsQixVQUFVLENBQUNrRCxHQUFYLENBQWVmLFFBQWYsRUFBcEY7QUFDQSxTQUFLbkMsVUFBTCxHQUFrQkEsVUFBbEI7QUFDSCxHQXhKSTtBQXlKTGlDLEVBQUFBLGdCQXpKSyw4QkF5SmM7QUFDZixRQUFJa0IsV0FBVyxHQUFHLEtBQUtuRSxTQUFMLEdBQWlCLEtBQUtJLGNBQUwsQ0FBb0JzQixNQUFyQyxHQUE4QyxLQUFLekIsVUFBbkQsR0FBZ0UsS0FBS00sa0JBQUwsQ0FBd0JtQixNQUF4RixHQUFpRyxLQUFLekIsVUFBdEcsR0FBbUgsS0FBS08sZUFBTCxDQUFxQmtCLE1BQXhJLEdBQWlKLEtBQUt6QixVQUF0SixHQUFtSyxLQUFLSyxrQkFBTCxDQUF3Qm9CLE1BQTNMLEdBQW9NLEtBQUsxQixTQUEzTjtBQUNBLFFBQUlvRSxJQUFJLEdBQUcsS0FBSzlDLElBQUwsQ0FBVUMsY0FBVixDQUF5QixRQUF6QixFQUFtQ0EsY0FBbkMsQ0FBa0QsTUFBbEQsQ0FBWDtBQUNBNkMsSUFBQUEsSUFBSSxDQUFDMUMsTUFBTCxHQUFjeUMsV0FBZDtBQUVBLFNBQUsvRCxjQUFMLENBQW9CdUQsQ0FBcEIsR0FBd0JTLElBQUksQ0FBQzFDLE1BQUwsR0FBYyxDQUFkLEdBQWtCLEtBQUszQixTQUEvQztBQUNBLFNBQUtRLGtCQUFMLENBQXdCb0QsQ0FBeEIsR0FBNEIsS0FBS3ZELGNBQUwsQ0FBb0J1RCxDQUFwQixHQUF3QixLQUFLdkQsY0FBTCxDQUFvQnNCLE1BQTVDLEdBQXFELEtBQUt6QixVQUF0RjtBQUNBLFNBQUtPLGVBQUwsQ0FBcUJtRCxDQUFyQixHQUF5QixLQUFLcEQsa0JBQUwsQ0FBd0JvRCxDQUF4QixHQUE0QixLQUFLcEQsa0JBQUwsQ0FBd0JtQixNQUFwRCxHQUE2RCxLQUFLekIsVUFBM0Y7QUFDQSxTQUFLSyxrQkFBTCxDQUF3QnFELENBQXhCLEdBQTRCLEtBQUtuRCxlQUFMLENBQXFCbUQsQ0FBckIsR0FBeUIsS0FBS25ELGVBQUwsQ0FBcUJrQixNQUE5QyxHQUF1RCxLQUFLekIsVUFBNUQsR0FBeUUsS0FBS0ssa0JBQUwsQ0FBd0JvQixNQUF4QixHQUFpQyxDQUF0STtBQUNILEdBbEtJO0FBb0tMa0MsRUFBQUEsbUJBcEtLLGlDQW9LaUI7QUFDbEIsUUFBSVMsYUFBYSxHQUFHakQsT0FBTyxDQUFDLGVBQUQsQ0FBM0I7O0FBQ0EsUUFBSThCLE1BQU0sR0FBRyxFQUFiOztBQUNBLFFBQUkvQixVQUFVLEdBQUdDLE9BQU8sQ0FBQyxZQUFELENBQXhCOztBQUNBLFNBQUssSUFBSWtELEdBQVQsSUFBZ0JELGFBQWhCLEVBQStCO0FBQzNCLFVBQUlFLFNBQVMsR0FBR0YsYUFBYSxDQUFDQyxHQUFELENBQTdCO0FBQ0EsVUFBSUUsVUFBVSxHQUFHRCxTQUFTLENBQUNDLFVBQTNCOztBQUNBLFVBQUlDLHFCQUFxQixHQUFHckQsT0FBTyxDQUFDLFNBQUQsQ0FBUCxDQUFtQnNELFVBQW5CLENBQThCQyxrQkFBOUIsQ0FBaURMLEdBQWpELENBQTVCOztBQUNBLFdBQUssSUFBSXhCLEtBQVQsSUFBa0IwQixVQUFsQixFQUE4QjtBQUMxQixZQUFJSSxrQkFBa0IsR0FBR0osVUFBVSxDQUFDMUIsS0FBRCxDQUFuQztBQUNBLFlBQUkrQixhQUFhLEdBQUdELGtCQUFrQixDQUFDQyxhQUF2QztBQUNBLFlBQUlDLGFBQWEsR0FBR0Ysa0JBQWtCLENBQUNFLGFBQXZDLENBSDBCLENBSzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQSxZQUFJQyxTQUFTLEdBQUcsSUFBaEI7O0FBQ0EsWUFBS0YsYUFBYSxJQUFJLENBQWpCLElBQXNCQyxhQUFhLElBQUksS0FBS2hFLEtBQTdDLElBQXdEK0QsYUFBYSxJQUFJLENBQWpCLElBQXNCQyxhQUFhLENBQUNFLE9BQWQsSUFBeUIsS0FBS2xFLEtBQWhILEVBQXdIO0FBQ3BIaUUsVUFBQUEsU0FBUyxHQUFHO0FBQ1I7QUFDQVQsWUFBQUEsR0FBRyxFQUFFbkQsVUFBVSxDQUFDZ0IsMEJBQVgsQ0FBc0NvQyxTQUFTLENBQUNVLGFBQWhELENBRkc7QUFHUmxCLFlBQUFBLElBQUksRUFBRWMsYUFIRTtBQUlSSyxZQUFBQSxNQUFNLEVBQUUsSUFKQTtBQUtSQyxZQUFBQSxPQUFPLEVBQUU7QUFMRCxXQUFaO0FBT0g7O0FBQ0QsWUFBSUosU0FBUyxJQUFJLElBQWpCLEVBQXVCO0FBQ25CO0FBQ0g7O0FBRUQsWUFBSWpDLEtBQUssR0FBRzJCLHFCQUFaLEVBQW1DO0FBQy9CTSxVQUFBQSxTQUFTLENBQUNHLE1BQVYsR0FBbUIsSUFBbkI7QUFDSCxTQUZELE1BR0s7QUFDREgsVUFBQUEsU0FBUyxDQUFDRyxNQUFWLEdBQW1CLEtBQW5CO0FBQ0g7O0FBRUQsWUFBSUwsYUFBYSxJQUFJLENBQXJCLEVBQXdCO0FBQ3BCRSxVQUFBQSxTQUFTLENBQUNJLE9BQVYsR0FBb0JMLGFBQWEsQ0FBQ00sVUFBbEM7QUFDSDs7QUFDRGxDLFFBQUFBLE1BQU0sQ0FBQ21DLElBQVAsQ0FBWU4sU0FBWjtBQUNBO0FBQ0g7QUFDSjs7QUFFRCxXQUFPN0IsTUFBUDtBQUNILEdBdE5JO0FBd05MWSxFQUFBQSx1QkF4TksscUNBd05xQjtBQUN0QixRQUFJWixNQUFNLEdBQUc7QUFDVGEsTUFBQUEsSUFBSSxFQUFFLGVBREc7QUFFVEcsTUFBQUEsR0FBRyxFQUFFO0FBRkksS0FBYjs7QUFJQSxRQUFJZCxXQUFXLEdBQUdoQyxPQUFPLENBQUMsYUFBRCxDQUF6Qjs7QUFDQSxRQUFJLEtBQUtMLFdBQUwsSUFBb0IsQ0FBeEIsRUFBMkI7QUFDdkJtQyxNQUFBQSxNQUFNLENBQUNhLElBQVAsR0FBYyxPQUFkO0FBQ0FiLE1BQUFBLE1BQU0sQ0FBQ2dCLEdBQVAsR0FBYWQsV0FBVyxDQUFDLEtBQUt0QyxLQUFOLENBQVgsQ0FBd0J3RSxpQkFBckM7QUFDSCxLQUhELE1BSUssSUFBSSxLQUFLdkUsV0FBTCxJQUFvQixDQUF4QixFQUEyQjtBQUM1QixVQUFJd0UsSUFBSSxHQUFHbkUsT0FBTyxDQUFDLFNBQUQsQ0FBUCxDQUFtQnNELFVBQW5CLENBQThCYyx1QkFBekM7O0FBQ0EsVUFBSUQsSUFBSSxJQUFJLENBQVosRUFBZTtBQUNYckMsUUFBQUEsTUFBTSxDQUFDYSxJQUFQLEdBQWMsZUFBZDtBQUNBYixRQUFBQSxNQUFNLENBQUNnQixHQUFQLEdBQWFkLFdBQVcsQ0FBQyxLQUFLdEMsS0FBTixDQUFYLENBQXdCMkUsaUJBQXJDOztBQUNBLFlBQUlDLFdBQVcsR0FBR3RFLE9BQU8sQ0FBQyxTQUFELENBQVAsQ0FBbUJzRCxVQUFuQixDQUE4QmlCLGlCQUFoRDs7QUFDQSxZQUFJRCxXQUFXLElBQUksQ0FBbkIsRUFBc0I7QUFDbEJ4QyxVQUFBQSxNQUFNLENBQUNnQixHQUFQLEdBQWEwQixJQUFJLENBQUNDLEtBQUwsQ0FBVzNDLE1BQU0sQ0FBQ2dCLEdBQVAsR0FBYSxDQUF4QixDQUFiO0FBQ0g7QUFDSixPQVBELE1BUUssSUFBSXFCLElBQUksSUFBSSxDQUFaLEVBQWU7QUFDaEJyQyxRQUFBQSxNQUFNLENBQUNhLElBQVAsR0FBYyxPQUFkO0FBQ0FiLFFBQUFBLE1BQU0sQ0FBQ2dCLEdBQVAsR0FBYWQsV0FBVyxDQUFDLEtBQUt0QyxLQUFOLENBQVgsQ0FBd0J3RSxpQkFBckM7QUFDSDtBQUNKOztBQUVELFdBQU9wQyxNQUFQO0FBQ0gsR0FuUEk7QUFxUEw0QyxFQUFBQSxPQXJQSyxxQkFxUEs7QUFDTixRQUFJLEtBQUs5RSxVQUFMLElBQW1CLElBQW5CLElBQTJCLEtBQUtBLFVBQUwsQ0FBZ0JrRCxHQUFoQixJQUF1QixDQUF0RCxFQUF5RDtBQUNyRDtBQUNIOztBQUNELFFBQUk2QixRQUFRLEdBQUcsSUFBZjs7QUFDQSxRQUFJLEtBQUsvRSxVQUFMLENBQWdCK0MsSUFBaEIsSUFBd0IsT0FBNUIsRUFBcUM7QUFDakNnQyxNQUFBQSxRQUFRLEdBQUczRSxPQUFPLENBQUMsU0FBRCxDQUFQLENBQW1Cc0QsVUFBbkIsQ0FBOEJzQixLQUE5QixHQUFzQyxLQUFLaEYsVUFBTCxDQUFnQmtELEdBQWpFO0FBQ0gsS0FGRCxNQUdLLElBQUksS0FBS2xELFVBQUwsQ0FBZ0IrQyxJQUFoQixJQUF3QixlQUE1QixFQUE2QztBQUM5Q2dDLE1BQUFBLFFBQVEsR0FBRzNFLE9BQU8sQ0FBQyxTQUFELENBQVAsQ0FBbUJzRCxVQUFuQixDQUE4QnVCLGFBQTlCLEdBQThDLEtBQUtqRixVQUFMLENBQWdCa0QsR0FBekU7QUFDSDs7QUFFRCxRQUFJNkIsUUFBUSxJQUFJLElBQVosSUFBb0JBLFFBQVEsR0FBRyxDQUFuQyxFQUFzQztBQUNsQyxVQUFJRyxnQkFBZ0IsR0FBRzlFLE9BQU8sQ0FBQyxpQkFBRCxDQUE5Qjs7QUFDQSxVQUFJK0UsT0FBTyxHQUFHLEVBQWQ7O0FBQ0EsVUFBSSxLQUFLbkYsVUFBTCxDQUFnQitDLElBQWhCLElBQXdCLE9BQTVCLEVBQXFDO0FBQ2pDb0MsUUFBQUEsT0FBTyxHQUFHL0UsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQmUsMEJBQXRCLENBQWlELEdBQWpELENBQVY7QUFDSCxPQUZELE1BR0ssSUFBSSxLQUFLbkIsVUFBTCxDQUFnQitDLElBQWhCLElBQXdCLGVBQTVCLEVBQTZDO0FBQzlDb0MsUUFBQUEsT0FBTyxHQUFHL0UsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQmUsMEJBQXRCLENBQWlELEdBQWpELENBQVY7QUFDSDs7QUFDRCtELE1BQUFBLGdCQUFnQixDQUFDRSxRQUFqQixDQUEwQkQsT0FBMUI7QUFDQTtBQUNIOztBQUdELFFBQUlFLFVBQVUsR0FBR2pGLE9BQU8sQ0FBQyxZQUFELENBQXhCOztBQUNBLFFBQUlrRixVQUFVLEdBQUdELFVBQVUsQ0FBQ0UsY0FBWCxDQUEwQixZQUExQixFQUF1QyxrQkFBdkMsQ0FBakI7QUFDQUQsSUFBQUEsVUFBVSxDQUFDRSxPQUFYLENBQW1CQyxRQUFuQixHQUE4QnJGLE9BQU8sQ0FBQyxTQUFELENBQVAsQ0FBbUJzRCxVQUFuQixDQUE4QmdDLEVBQTVEO0FBQ0EsUUFBSUMsVUFBVSxHQUFHLElBQWpCOztBQUNBLFFBQUksS0FBSzNGLFVBQUwsQ0FBZ0IrQyxJQUFoQixJQUF3QixPQUE1QixFQUFxQztBQUNqQzRDLE1BQUFBLFVBQVUsR0FBRztBQUNULGlCQUFTdkYsT0FBTyxDQUFDLFNBQUQsQ0FBUCxDQUFtQnNELFVBQW5CLENBQThCc0IsS0FBOUIsR0FBc0MsS0FBS2hGLFVBQUwsQ0FBZ0JrRDtBQUR0RCxPQUFiO0FBR0gsS0FKRCxNQU1LLElBQUksS0FBS2xELFVBQUwsQ0FBZ0IrQyxJQUFoQixJQUF3QixlQUE1QixFQUE2QztBQUM5QzRDLE1BQUFBLFVBQVUsR0FBRztBQUNULHlCQUFpQnZGLE9BQU8sQ0FBQyxTQUFELENBQVAsQ0FBbUJzRCxVQUFuQixDQUE4QnVCLGFBQTlCLEdBQThDLEtBQUtqRixVQUFMLENBQWdCa0Q7QUFEdEUsT0FBYjtBQUdIOztBQUVEb0MsSUFBQUEsVUFBVSxDQUFDRSxPQUFYLENBQW1CRyxVQUFuQixHQUFnQ0EsVUFBaEM7QUFDQSxRQUFJL0UsSUFBSSxHQUFHLElBQVg7O0FBQ0EwRSxJQUFBQSxVQUFVLENBQUNNLGVBQVgsR0FBNkIsWUFBVTtBQUNuQyxVQUFJaEYsSUFBSSxDQUFDWixVQUFMLENBQWdCK0MsSUFBaEIsSUFBd0IsT0FBNUIsRUFBcUM7QUFDakMzQyxRQUFBQSxPQUFPLENBQUMsU0FBRCxDQUFQLENBQW1Cc0QsVUFBbkIsQ0FBOEJzQixLQUE5QixHQUFzQ1csVUFBVSxDQUFDWCxLQUFqRDtBQUNILE9BRkQsTUFHSyxJQUFJcEUsSUFBSSxDQUFDWixVQUFMLENBQWdCK0MsSUFBaEIsSUFBd0IsZUFBNUIsRUFBNkM7QUFDOUMzQyxRQUFBQSxPQUFPLENBQUMsU0FBRCxDQUFQLENBQW1Cc0QsVUFBbkIsQ0FBOEJ1QixhQUE5QixHQUE4Q1UsVUFBVSxDQUFDVixhQUF6RDtBQUNILE9BTmtDLENBUW5DOzs7QUFDQTdFLE1BQUFBLE9BQU8sQ0FBQyxTQUFELENBQVAsQ0FBbUJ5RixlQUFuQixDQUFtQ2pGLElBQUksQ0FBQ2QsS0FBeEM7QUFDSCxLQVZEOztBQVlBLFNBQUtSLGtCQUFMLENBQXdCMEIsWUFBeEIsQ0FBcUNyQyxFQUFFLENBQUNtSCxNQUF4QyxFQUFnREMsWUFBaEQsR0FBK0QsS0FBL0Q7QUFDQVYsSUFBQUEsVUFBVSxDQUFDVyxtQkFBWCxDQUErQlYsVUFBL0I7QUFDSCxHQS9TSSxDQWdUTDs7QUFoVEssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHBzOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICBoZWFkZXJEaXM6IDgzLFxuICAgICAgICBmb290ZXJEaXM6IDEyNCxcbiAgICAgICAgc2VjdGlvbkRpczogNjYsXG4gICAgICAgIGNvbnRlbnRTcGFjZTogOTksXG4gICAgICAgIG1haWxTZWN0aW9uRWxlbWVudERpczogMzAsXG5cbiAgICAgICAgdGl0bGVMYWJlbE5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGNoYWxsZW5nZUJ1dHRvbk5vZTogY2MuTm9kZSxcbiAgICAgICAgY29udGVudFNlY3Rpb25Ob2RlOiBjYy5Ob2RlLFxuICAgICAgICBtYWlsU2VjdGlvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGNsb3NlQnV0dG9uTm9kZTogY2MuTm9kZSxcbiAgICAgICAgbWFpbFNlY3Rpb25FbGVtZW50UHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGNoYWxsZW5nZUJ1dHRvbkNvc3RQaHlTcHJpdGU6IGNjLlNwcml0ZUZyYW1lLFxuXG4gICAgICAgIGxldmVsOiBudWxsLFxuICAgICAgICBsZXZlbFN0YXR1czogbnVsbCxcbiAgICAgICAgY29zdFJlc3VsdDogbnVsbCxcbiAgICAgICAgZGVsZWdhdGU6IG51bGxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB2YXIgdGV4dENvbmZpZyA9IHJlcXVpcmUoXCJ0ZXh0Q29uZmlnXCIpXG4gICAgICAgIHZhciBiZyA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpXG4gICAgICAgIGJnLndpZHRoID0gY2Mud2luU2l6ZS53aWR0aFxuICAgICAgICBiZy5oZWlnaHQgPSBjYy53aW5TaXplLmhlaWdodFxuICAgICAgICBiZy5vbihcInRvdWNoc3RhcnRcIixmdW5jdGlvbigpe30sdGhpcylcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbk5vZGUub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZiAoc2VsZi5kZWxlZ2F0ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kZWxlZ2F0ZS5wcmVDaGFubGxlbmdlVUlPcGVuZCA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJkZWxlZ2F0ZSBpcyBudWxsXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLm5vZGUuZGVzdHJveSgpICAgICBcbiAgICAgICAgfSx0aGlzKVxuXG4gICAgICAgIHRoaXMuY2hhbGxlbmdlQnV0dG9uTm9lLmdldENoaWxkQnlOYW1lKFwiTmV3IExhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGV4dENvbmZpZy5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxNTEpXG4gICAgfSxcblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgdGhpcy5zZXR1cFVJKClcbiAgICB9LFxuXG4gICAgZ2V0U2VjdGlvbkFuZEluZGV4T2ZMZXZlbCgpIHtcbiAgICAgICAgdmFyIG1haW5TY2VuZU1nciA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoXCJDYW52YXNcIikuZ2V0Q29tcG9uZW50KFwibWFpblNjZW5lTWdyXCIpXG4gICAgICAgIHZhciBzZWN0aW9uID0gbWFpblNjZW5lTWdyLnNlbGVjdGVkU2VjdGlvblxuICAgICAgICB2YXIgc2VjdGlvbkNvbmZpZyA9IHJlcXVpcmUoXCJzZWN0aW9uQ29uZmlnXCIpXG4gICAgICAgIHZhciBsZXZlbHMgPSBzZWN0aW9uQ29uZmlnW3NlY3Rpb25dLmxldmVsc1xuICAgICAgICB2YXIgaW5kZXggPSBsZXZlbHMuaW5kZXhPZih0aGlzLmxldmVsKSArIDFcbiAgICAgICAgcmV0dXJuIFtzZWN0aW9uLCBpbmRleF1cbiAgICB9LFxuXG4gICAgc2V0dXBVSSgpIHtcbiAgICAgICAgdGhpcy5fc2V0dXBVSUNvbnRlbnQoKVxuICAgICAgICB0aGlzLl9zZXR1cFVJUG9zaXRpb24oKVxuICAgIH0sXG5cbiAgICBfc2V0dXBVSUNvbnRlbnQoKSB7XG4gICAgICAgIC8vdGl0bGUgbGFiZWxcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuZ2V0U2VjdGlvbkFuZEluZGV4T2ZMZXZlbCgpXG4gICAgICAgIHRoaXMudGl0bGVMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXN1bHRbMF0udG9TdHJpbmcoKSArIFwiIC0gXCIgKyByZXN1bHRbMV1cbiAgICAgICAgXG4gICAgICAgIC8vY29udGVudCBzZWN0aW9uXG4gICAgICAgIHZhciBsZXZlbENvbmZpZyA9IHJlcXVpcmUoXCJsZXZlbENvbmZpZ1wiKVxuICAgICAgICB2YXIgY29uZmlnID0gbGV2ZWxDb25maWdbdGhpcy5sZXZlbF1cbiAgICAgICAgdmFyIGRlc0xhYmVsTm9kZSA9IHRoaXMuY29udGVudFNlY3Rpb25Ob2RlLmdldENoaWxkQnlOYW1lKFwiZGVzTGFiZWxcIilcbiAgICAgICAgLy9kZXNMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKS5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZShjb25maWcuZGVzVGV4dElkKVxuICAgICAgICBkZXNMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLnRpdGxlTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nXG4gICAgICAgIGRlc0xhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLl9mb3JjZVVwZGF0ZVJlbmRlckRhdGEoKVxuXG4gICAgICAgIHZhciBzZXBlcmF0ZUxpbmVVcE5vZGUgPSB0aGlzLmNvbnRlbnRTZWN0aW9uTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNlcGVyYXRlTGluZVVwXCIpXG4gICAgICAgIHZhciBzZXBlcmF0ZUxpbmVEb3duTm9kZSA9IHRoaXMuY29udGVudFNlY3Rpb25Ob2RlLmdldENoaWxkQnlOYW1lKFwic2VwZXJhdGVMaW5lRG93blwiKVxuICAgICAgICB2YXIgY29udGVudEhlaWdodCA9IGRlc0xhYmVsTm9kZS5oZWlnaHQgKyAyICogdGhpcy5jb250ZW50U3BhY2UgKyBzZXBlcmF0ZUxpbmVVcE5vZGUuaGVpZ2h0ICsgc2VwZXJhdGVMaW5lRG93bk5vZGUuaGVpZ2h0XG4gICAgICAgIHRoaXMuY29udGVudFNlY3Rpb25Ob2RlLmhlaWdodCA9IGNvbnRlbnRIZWlnaHRcblxuICAgICAgICBzZXBlcmF0ZUxpbmVVcE5vZGUueSA9IDBcbiAgICAgICAgZGVzTGFiZWxOb2RlLnkgPSBzZXBlcmF0ZUxpbmVVcE5vZGUueSAtIHNlcGVyYXRlTGluZVVwTm9kZS5oZWlnaHQgLSB0aGlzLmNvbnRlbnRTcGFjZVxuICAgICAgICBzZXBlcmF0ZUxpbmVEb3duTm9kZS55ID0gLWNvbnRlbnRIZWlnaHQgKyBzZXBlcmF0ZUxpbmVEb3duTm9kZS5oZWlnaHRcblxuICAgICAgICAvL21haWxTZWN0aW9uXG4gICAgICAgIHZhciB0ZXh0Q29uZmlnID0gcmVxdWlyZShcInRleHRDb25maWdcIilcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX2dldE1haWxTZWN0aW9uSW5mbygpXG4gICAgICAgIHZhciBtYWlsU2VjdGlvbkhlaWdodCA9IDBcbiAgICAgICAgLy8gZm9yICh2YXIgaW5kZXggaW4gcmVzdWx0KSB7XG4gICAgICAgIC8vICAgICB2YXIgb25lQ29uZmlnID0gcmVzdWx0W2luZGV4XVxuICAgICAgICAvLyAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm1haWxTZWN0aW9uRWxlbWVudFByZWZhYilcbiAgICAgICAgLy8gICAgIHZhciBkZXNMYWJlbCA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJkZXNMYWJlbFwiKVxuICAgICAgICAgICAgXG4gICAgICAgIC8vICAgICB2YXIgdGV4dFN0ciA9IFwiXCJcbiAgICAgICAgLy8gICAgIGlmIChvbmVDb25maWcudHlwZSA9PSAxKSB7XG4gICAgICAgIC8vICAgICAgICAgLy8gdGV4dFN0ciA9IFwi6YCa5YWz5ZCO5Lya5pS25YiwIFwiICsgb25lQ29uZmlnLnRhZyArIFwiIOWIhuaUr+eahOaWsOmCruS7tlwiXG4gICAgICAgIC8vICAgICAgICAgdGV4dFN0ciA9IHRleHRDb25maWcuZ2V0Rm9ybWF0ZWRTdHJpbmcoMTQ5LFtvbmVDb25maWcudGFnXSlcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIGVsc2UgaWYgKG9uZUNvbmZpZy50eXBlID09IDIpIHtcbiAgICAgICAgLy8gICAgICAgICAvLyB0ZXh0U3RyID0gXCLnlKjkuI3lpJrkuo4gXCIgKyBvbmVDb25maWcubWluU3RlcCArIFwiIOatpemAmuWFs++8jOS8muaUtuWIsCBcIiArIG9uZUNvbmZpZy50YWcgKyBcIiDliIbmlK/nmoTmlrDpgq7ku7ZcIlxuICAgICAgICAvLyAgICAgICAgIHRleHRTdHIgPSB0ZXh0Q29uZmlnLmdldEZvcm1hdGVkU3RyaW5nKDE1MCxbb25lQ29uZmlnLm1pblN0ZXAsb25lQ29uZmlnLnRhZ10pXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICBkZXNMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRleHRTdHJcbiAgICAgICAgLy8gICAgIGRlc0xhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuX2ZvcmNlVXBkYXRlUmVuZGVyRGF0YSgpXG4gICAgICAgICAgICBcbiAgICAgICAgLy8gICAgIHZhciBjb21wbGV0ZUljb24gPSBub2RlLmdldENoaWxkQnlOYW1lKFwiY29tcGxldGVJY29uXCIpXG4gICAgICAgIC8vICAgICBpZiAob25lQ29uZmlnLnN0YXR1cyA9PSB0cnVlKSB7XG4gICAgICAgIC8vICAgICAgICAgY29tcGxldGVJY29uLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgLy8gICAgIH1cblxuICAgICAgICAvLyAgICAgaWYgKGRlc0xhYmVsLmhlaWdodCA+IGNvbXBsZXRlSWNvbi5oZWlnaHQpIHtcbiAgICAgICAgLy8gICAgICAgICBub2RlLmhlaWdodCA9IGRlc0xhYmVsLmhlaWdodFxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgbm9kZS5oZWlnaHQgPSBjb21wbGV0ZUljb24uaGVpZ2h0XG4gICAgICAgIC8vICAgICB9XG5cbiAgICAgICAgLy8gICAgIG5vZGUueSA9IG1haWxTZWN0aW9uSGVpZ2h0XG4gICAgICAgIC8vICAgICBtYWlsU2VjdGlvbkhlaWdodCArPSBub2RlLmhlaWdodFxuICAgICAgICAvLyAgICAgaWYgKGluZGV4ICE9IHJlc3VsdC5sZW5ndGggLSAxKSB7XG4gICAgICAgIC8vICAgICAgICAgbWFpbFNlY3Rpb25IZWlnaHQgKz0gdGhpcy5tYWlsU2VjdGlvbkVsZW1lbnREaXNcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIHRoaXMubWFpbFNlY3Rpb25Ob2RlLmFkZENoaWxkKG5vZGUpXG4gICAgICAgIC8vIH1cbiAgICAgICAgdGhpcy5tYWlsU2VjdGlvbk5vZGUuaGVpZ2h0ID0gbWFpbFNlY3Rpb25IZWlnaHRcblxuICAgICAgICAvL2NoYWxsZW5nZUJ1dHRvblxuICAgICAgICB2YXIgY29zdFJlc3VsdCA9IHRoaXMuX2dldENvc3RJbmZvT2ZDaGFsbGVuZ2UoKVxuICAgICAgICBpZiAoY29zdFJlc3VsdC50eXBlID09IFwicGh5c2ljYWxQb3dlclwiKSB7XG4gICAgICAgICAgICB0aGlzLmNoYWxsZW5nZUJ1dHRvbk5vZS5nZXRDaGlsZEJ5TmFtZShcImNvc3RJY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5jaGFsbGVuZ2VCdXR0b25Db3N0UGh5U3ByaXRlXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2hhbGxlbmdlQnV0dG9uTm9lLmdldENoaWxkQnlOYW1lKFwiY29zdExhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gY29zdFJlc3VsdC5udW0udG9TdHJpbmcoKVxuICAgICAgICB0aGlzLmNvc3RSZXN1bHQgPSBjb3N0UmVzdWx0XG4gICAgfSxcbiAgICBfc2V0dXBVSVBvc2l0aW9uKCkge1xuICAgICAgICB2YXIgdG90YWxIZWlnaHQgPSB0aGlzLmZvb3RlckRpcyArIHRoaXMudGl0bGVMYWJlbE5vZGUuaGVpZ2h0ICsgdGhpcy5zZWN0aW9uRGlzICsgdGhpcy5jb250ZW50U2VjdGlvbk5vZGUuaGVpZ2h0ICsgdGhpcy5zZWN0aW9uRGlzICsgdGhpcy5tYWlsU2VjdGlvbk5vZGUuaGVpZ2h0ICsgdGhpcy5zZWN0aW9uRGlzICsgdGhpcy5jaGFsbGVuZ2VCdXR0b25Ob2UuaGVpZ2h0ICsgdGhpcy5mb290ZXJEaXNcbiAgICAgICAgdmFyIHVpYmcgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvdGhlcnNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ1aUJnXCIpXG4gICAgICAgIHVpYmcuaGVpZ2h0ID0gdG90YWxIZWlnaHRcblxuICAgICAgICB0aGlzLnRpdGxlTGFiZWxOb2RlLnkgPSB1aWJnLmhlaWdodCAvIDIgLSB0aGlzLmhlYWRlckRpc1xuICAgICAgICB0aGlzLmNvbnRlbnRTZWN0aW9uTm9kZS55ID0gdGhpcy50aXRsZUxhYmVsTm9kZS55IC0gdGhpcy50aXRsZUxhYmVsTm9kZS5oZWlnaHQgLSB0aGlzLnNlY3Rpb25EaXNcbiAgICAgICAgdGhpcy5tYWlsU2VjdGlvbk5vZGUueSA9IHRoaXMuY29udGVudFNlY3Rpb25Ob2RlLnkgLSB0aGlzLmNvbnRlbnRTZWN0aW9uTm9kZS5oZWlnaHQgLSB0aGlzLnNlY3Rpb25EaXNcbiAgICAgICAgdGhpcy5jaGFsbGVuZ2VCdXR0b25Ob2UueSA9IHRoaXMubWFpbFNlY3Rpb25Ob2RlLnkgLSB0aGlzLm1haWxTZWN0aW9uTm9kZS5oZWlnaHQgLSB0aGlzLnNlY3Rpb25EaXMgLSB0aGlzLmNoYWxsZW5nZUJ1dHRvbk5vZS5oZWlnaHQgLyAyXG4gICAgfSxcblxuICAgIF9nZXRNYWlsU2VjdGlvbkluZm8oKSB7XG4gICAgICAgIHZhciBtYWlsU3lzQ29uZmlnID0gcmVxdWlyZShcIm1haWxTeXNDb25maWdcIilcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG4gICAgICAgIHZhciB0ZXh0Q29uZmlnID0gcmVxdWlyZShcInRleHRDb25maWdcIilcbiAgICAgICAgZm9yICh2YXIgdGFnIGluIG1haWxTeXNDb25maWcpIHtcbiAgICAgICAgICAgIHZhciBvbmVDb25maWcgPSBtYWlsU3lzQ29uZmlnW3RhZ11cbiAgICAgICAgICAgIHZhciBjb25kaXRpb25zID0gb25lQ29uZmlnLmNvbmRpdGlvbnNcbiAgICAgICAgICAgIHZhciBjdXJyZW50Q29uZGl0aW9uSW5kZXggPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLm1haWxDb25kaXRpb25JbmRleFt0YWddXG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBjb25kaXRpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9uZUNvbmRpdGlvbkNvbmZpZyA9IGNvbmRpdGlvbnNbaW5kZXhdXG4gICAgICAgICAgICAgICAgdmFyIGNvbmRpdGlvblR5cGUgPSBvbmVDb25kaXRpb25Db25maWcuY29uZGl0aW9uVHlwZVxuICAgICAgICAgICAgICAgIHZhciBjb25kaXRpb25QYXJhID0gb25lQ29uZGl0aW9uQ29uZmlnLmNvbmRpdGlvblBhcmFcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBpZiAoY29uZGl0aW9uUGFyYSA9PSB0aGlzLmxldmVsKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHZhciBvbmVSZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0YWc6IG9uZUNvbmZpZy50YWdOYW1lLFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgc3RhdHVzOiBudWxsXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIHZhciBvbmVSZXN1bHQgPSBudWxsXG4gICAgICAgICAgICAgICAgaWYgKChjb25kaXRpb25UeXBlID09IDEgJiYgY29uZGl0aW9uUGFyYSA9PSB0aGlzLmxldmVsKSB8fCAoY29uZGl0aW9uVHlwZSA9PSAyICYmIGNvbmRpdGlvblBhcmEubGV2ZWxJZCA9PSB0aGlzLmxldmVsKSkge1xuICAgICAgICAgICAgICAgICAgICBvbmVSZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0YWc6IG9uZUNvbmZpZy50YWdOYW1lVGV4dElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKG9uZUNvbmZpZy50YWdOYW1lVGV4dElkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGNvbmRpdGlvblR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5TdGVwOiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG9uZVJlc3VsdCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgY3VycmVudENvbmRpdGlvbkluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIG9uZVJlc3VsdC5zdGF0dXMgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvbmVSZXN1bHQuc3RhdHVzID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY29uZGl0aW9uVHlwZSA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uZVJlc3VsdC5taW5TdGVwID0gY29uZGl0aW9uUGFyYS5taW5TdGVwTnVtXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG9uZVJlc3VsdClcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH0sXG5cbiAgICBfZ2V0Q29zdEluZm9PZkNoYWxsZW5nZSgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgIHR5cGU6IFwicGh5c2ljYWxQb3dlclwiLFxuICAgICAgICAgICAgbnVtOiAwXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxldmVsQ29uZmlnID0gcmVxdWlyZShcImxldmVsQ29uZmlnXCIpXG4gICAgICAgIGlmICh0aGlzLmxldmVsU3RhdHVzID09IDEpIHtcbiAgICAgICAgICAgIHJlc3VsdC50eXBlID0gXCJoZWFydFwiXG4gICAgICAgICAgICByZXN1bHQubnVtID0gbGV2ZWxDb25maWdbdGhpcy5sZXZlbF0uaGVhcnRGb3JSZXRyeUNvc3RcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmxldmVsU3RhdHVzID09IDIpIHtcbiAgICAgICAgICAgIHZhciBmbGFnID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5waHlzaWNhbFBvd2VyQ29zdGVkRmxhZ1xuICAgICAgICAgICAgaWYgKGZsYWcgPT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC50eXBlID0gXCJwaHlzaWNhbFBvd2VyXCJcbiAgICAgICAgICAgICAgICByZXN1bHQubnVtID0gbGV2ZWxDb25maWdbdGhpcy5sZXZlbF0ucGh5c2ljYWxQb3dlckNvc3RcbiAgICAgICAgICAgICAgICB2YXIgd2VsZmFyeUZsYWcgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmluaXRBZFdhdGNoZWRGbGFnXG4gICAgICAgICAgICAgICAgaWYgKHdlbGZhcnlGbGFnID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lm51bSA9IE1hdGgucm91bmQocmVzdWx0Lm51bSAvIDIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZmxhZyA9PSAxKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnR5cGUgPSBcImhlYXJ0XCJcbiAgICAgICAgICAgICAgICByZXN1bHQubnVtID0gbGV2ZWxDb25maWdbdGhpcy5sZXZlbF0uaGVhcnRGb3JSZXRyeUNvc3RcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICB9LFxuXG4gICAgb25DbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMuY29zdFJlc3VsdCA9PSBudWxsIHx8IHRoaXMuY29zdFJlc3VsdC5udW0gPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZhbHVlTnVtID0gbnVsbFxuICAgICAgICBpZiAodGhpcy5jb3N0UmVzdWx0LnR5cGUgPT0gXCJoZWFydFwiKSB7XG4gICAgICAgICAgICB2YWx1ZU51bSA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuaGVhcnQgLSB0aGlzLmNvc3RSZXN1bHQubnVtXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5jb3N0UmVzdWx0LnR5cGUgPT0gXCJwaHlzaWNhbFBvd2VyXCIpIHtcbiAgICAgICAgICAgIHZhbHVlTnVtID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5waHlzaWNhbFBvd2VyIC0gdGhpcy5jb3N0UmVzdWx0Lm51bVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlTnVtID09IG51bGwgfHwgdmFsdWVOdW0gPCAwKSB7XG4gICAgICAgICAgICB2YXIgbm90aWZpY2FpdGlvblN5cyA9IHJlcXVpcmUoXCJub3RpZmljYXRpb25NZ3JcIilcbiAgICAgICAgICAgIHZhciBub3RpU3RyID0gXCJcIlxuICAgICAgICAgICAgaWYgKHRoaXMuY29zdFJlc3VsdC50eXBlID09IFwiaGVhcnRcIikge1xuICAgICAgICAgICAgICAgIG5vdGlTdHIgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKS5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxNjkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNvc3RSZXN1bHQudHlwZSA9PSBcInBoeXNpY2FsUG93ZXJcIikge1xuICAgICAgICAgICAgICAgIG5vdGlTdHIgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKS5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxNzApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub3RpZmljYWl0aW9uU3lzLnB1c2hOb3RpKG5vdGlTdHIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHZhciBuZXR3b3JrTWdyID0gcmVxdWlyZShcIm5ldHdvcmtNZ3JcIilcbiAgICAgICAgdmFyIG1lc3NhZ2VPYmogPSBuZXR3b3JrTWdyLm1ha2VNZXNzYWdlT2JqKFwiZGF0YU1vZHVsZVwiLFwiY29tbWl0TWVzc2FnZVR5cFwiKVxuICAgICAgICBtZXNzYWdlT2JqLm1lc3NhZ2UucGxheWVySWQgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmlkXG4gICAgICAgIHZhciBjb21taXRCb2R5ID0gbnVsbFxuICAgICAgICBpZiAodGhpcy5jb3N0UmVzdWx0LnR5cGUgPT0gXCJoZWFydFwiKSB7XG4gICAgICAgICAgICBjb21taXRCb2R5ID0ge1xuICAgICAgICAgICAgICAgIFwiaGVhcnRcIjogcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5oZWFydCAtIHRoaXMuY29zdFJlc3VsdC5udW1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY29zdFJlc3VsdC50eXBlID09IFwicGh5c2ljYWxQb3dlclwiKSB7XG4gICAgICAgICAgICBjb21taXRCb2R5ID0ge1xuICAgICAgICAgICAgICAgIFwicGh5c2ljYWxQb3dlclwiOiByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLnBoeXNpY2FsUG93ZXIgLSB0aGlzLmNvc3RSZXN1bHQubnVtXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBtZXNzYWdlT2JqLm1lc3NhZ2UuY29tbWl0Qm9keSA9IGNvbW1pdEJvZHlcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgIG1lc3NhZ2VPYmouc3VjY2Vzc0NhbGxCYWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmIChzZWxmLmNvc3RSZXN1bHQudHlwZSA9PSBcImhlYXJ0XCIpIHtcbiAgICAgICAgICAgICAgICByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmhlYXJ0ID0gY29tbWl0Qm9keS5oZWFydFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2VsZi5jb3N0UmVzdWx0LnR5cGUgPT0gXCJwaHlzaWNhbFBvd2VyXCIpIHtcbiAgICAgICAgICAgICAgICByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLnBoeXNpY2FsUG93ZXIgPSBjb21taXRCb2R5LnBoeXNpY2FsUG93ZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gc2VsZi5jaGFsbGVuZ2VCdXR0b25Ob2UuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZVxuICAgICAgICAgICAgcmVxdWlyZShcImdhbWVNZ3JcIikuZW50ZXJMZXZlbFNjZW5lKHNlbGYubGV2ZWwpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYWxsZW5nZUJ1dHRvbk5vZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZVxuICAgICAgICBuZXR3b3JrTWdyLnNlbmRNZXNzYWdlQnlNc2dPYmoobWVzc2FnZU9iailcbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==