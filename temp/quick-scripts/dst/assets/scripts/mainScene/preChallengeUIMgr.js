
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
    var desLabelNode = this.contentSectionNode.getChildByName("desLabel");
    desLabelNode.getComponent(cc.Label).string = require("textConfig").getTextByIdAndLanguageType(config.desTextId);

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

    var mailSectionHeight = 0;

    for (var index in result) {
      var oneConfig = result[index];
      var node = cc.instantiate(this.mailSectionElementPrefab);
      var desLabel = node.getChildByName("desLabel");
      var textStr = "";

      if (oneConfig.type == 1) {
        // textStr = "通关后会收到 " + oneConfig.tag + " 分支的新邮件"
        textStr = textConfig.getFormatedString(149, [oneConfig.tag]);
      } else if (oneConfig.type == 2) {
        // textStr = "用不多于 " + oneConfig.minStep + " 步通关，会收到 " + oneConfig.tag + " 分支的新邮件"
        textStr = textConfig.getFormatedString(150, [oneConfig.minStep, oneConfig.tag]);
      }

      desLabel.getComponent(cc.Label).string = textStr;

      desLabel.getComponent(cc.Label)._forceUpdateRenderData();

      var completeIcon = node.getChildByName("completeIcon");

      if (oneConfig.status == true) {
        completeIcon.active = true;
      }

      if (desLabel.height > completeIcon.height) {
        node.height = desLabel.height;
      } else {
        node.height = completeIcon.height;
      }

      node.y = mailSectionHeight;
      mailSectionHeight += node.height;

      if (index != result.length - 1) {
        mailSectionHeight += this.mailSectionElementDis;
      }

      this.mailSectionNode.addChild(node);
    }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL21haW5TY2VuZS9wcmVDaGFsbGVuZ2VVSU1nci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImhlYWRlckRpcyIsImZvb3RlckRpcyIsInNlY3Rpb25EaXMiLCJjb250ZW50U3BhY2UiLCJtYWlsU2VjdGlvbkVsZW1lbnREaXMiLCJ0aXRsZUxhYmVsTm9kZSIsIk5vZGUiLCJjaGFsbGVuZ2VCdXR0b25Ob2UiLCJjb250ZW50U2VjdGlvbk5vZGUiLCJtYWlsU2VjdGlvbk5vZGUiLCJjbG9zZUJ1dHRvbk5vZGUiLCJtYWlsU2VjdGlvbkVsZW1lbnRQcmVmYWIiLCJQcmVmYWIiLCJjaGFsbGVuZ2VCdXR0b25Db3N0UGh5U3ByaXRlIiwiU3ByaXRlRnJhbWUiLCJsZXZlbCIsImxldmVsU3RhdHVzIiwiY29zdFJlc3VsdCIsImRlbGVnYXRlIiwib25Mb2FkIiwidGV4dENvbmZpZyIsInJlcXVpcmUiLCJiZyIsIm5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsIndpZHRoIiwid2luU2l6ZSIsImhlaWdodCIsIm9uIiwic2VsZiIsInByZUNoYW5sbGVuZ2VVSU9wZW5kIiwibG9nIiwiZGVzdHJveSIsImdldENvbXBvbmVudCIsIkxhYmVsIiwic3RyaW5nIiwiZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUiLCJzdGFydCIsInNldHVwVUkiLCJnZXRTZWN0aW9uQW5kSW5kZXhPZkxldmVsIiwibWFpblNjZW5lTWdyIiwiZGlyZWN0b3IiLCJnZXRTY2VuZSIsInNlY3Rpb24iLCJzZWxlY3RlZFNlY3Rpb24iLCJzZWN0aW9uQ29uZmlnIiwibGV2ZWxzIiwiaW5kZXgiLCJpbmRleE9mIiwiX3NldHVwVUlDb250ZW50IiwiX3NldHVwVUlQb3NpdGlvbiIsInJlc3VsdCIsInRvU3RyaW5nIiwibGV2ZWxDb25maWciLCJjb25maWciLCJkZXNMYWJlbE5vZGUiLCJkZXNUZXh0SWQiLCJfZm9yY2VVcGRhdGVSZW5kZXJEYXRhIiwic2VwZXJhdGVMaW5lVXBOb2RlIiwic2VwZXJhdGVMaW5lRG93bk5vZGUiLCJjb250ZW50SGVpZ2h0IiwieSIsIl9nZXRNYWlsU2VjdGlvbkluZm8iLCJtYWlsU2VjdGlvbkhlaWdodCIsIm9uZUNvbmZpZyIsImluc3RhbnRpYXRlIiwiZGVzTGFiZWwiLCJ0ZXh0U3RyIiwidHlwZSIsImdldEZvcm1hdGVkU3RyaW5nIiwidGFnIiwibWluU3RlcCIsImNvbXBsZXRlSWNvbiIsInN0YXR1cyIsImFjdGl2ZSIsImxlbmd0aCIsImFkZENoaWxkIiwiX2dldENvc3RJbmZvT2ZDaGFsbGVuZ2UiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsIm51bSIsInRvdGFsSGVpZ2h0IiwidWliZyIsIm1haWxTeXNDb25maWciLCJjb25kaXRpb25zIiwiY3VycmVudENvbmRpdGlvbkluZGV4IiwicGxheWVyRGF0YSIsIm1haWxDb25kaXRpb25JbmRleCIsIm9uZUNvbmRpdGlvbkNvbmZpZyIsImNvbmRpdGlvblR5cGUiLCJjb25kaXRpb25QYXJhIiwib25lUmVzdWx0IiwibGV2ZWxJZCIsInRhZ05hbWVUZXh0SWQiLCJtaW5TdGVwTnVtIiwicHVzaCIsImhlYXJ0Rm9yUmV0cnlDb3N0IiwiZmxhZyIsInBoeXNpY2FsUG93ZXJDb3N0ZWRGbGFnIiwicGh5c2ljYWxQb3dlckNvc3QiLCJ3ZWxmYXJ5RmxhZyIsImluaXRBZFdhdGNoZWRGbGFnIiwiTWF0aCIsInJvdW5kIiwib25DbGljayIsInZhbHVlTnVtIiwiaGVhcnQiLCJwaHlzaWNhbFBvd2VyIiwibm90aWZpY2FpdGlvblN5cyIsIm5vdGlTdHIiLCJwdXNoTm90aSIsIm5ldHdvcmtNZ3IiLCJtZXNzYWdlT2JqIiwibWFrZU1lc3NhZ2VPYmoiLCJtZXNzYWdlIiwicGxheWVySWQiLCJpZCIsImNvbW1pdEJvZHkiLCJzdWNjZXNzQ2FsbEJhY2siLCJlbnRlckxldmVsU2NlbmUiLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJzZW5kTWVzc2FnZUJ5TXNn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O0FBQ0EsUUFBSXhGLElBQUksR0FBRyxJQUFYOztBQUNBbUYsSUFBQUEsVUFBVSxDQUFDTSxlQUFYLEdBQTZCLFlBQVU7QUFDbkMsVUFBSXpGLElBQUksQ0FBQ1osVUFBTCxDQUFnQm1ELElBQWhCLElBQXdCLE9BQTVCLEVBQXFDO0FBQ2pDL0MsUUFBQUEsT0FBTyxDQUFDLFNBQUQsQ0FBUCxDQUFtQmlFLFVBQW5CLENBQThCb0IsS0FBOUIsR0FBc0NXLFVBQVUsQ0FBQ1gsS0FBakQ7QUFDSCxPQUZELE1BR0ssSUFBSTdFLElBQUksQ0FBQ1osVUFBTCxDQUFnQm1ELElBQWhCLElBQXdCLGVBQTVCLEVBQTZDO0FBQzlDL0MsUUFBQUEsT0FBTyxDQUFDLFNBQUQsQ0FBUCxDQUFtQmlFLFVBQW5CLENBQThCcUIsYUFBOUIsR0FBOENVLFVBQVUsQ0FBQ1YsYUFBekQ7QUFDSCxPQU5rQyxDQVFuQzs7O0FBQ0F0RixNQUFBQSxPQUFPLENBQUMsU0FBRCxDQUFQLENBQW1Ca0csZUFBbkIsQ0FBbUMxRixJQUFJLENBQUNkLEtBQXhDO0FBQ0gsS0FWRDs7QUFZQSxTQUFLUixrQkFBTCxDQUF3QjBCLFlBQXhCLENBQXFDckMsRUFBRSxDQUFDNEgsTUFBeEMsRUFBZ0RDLFlBQWhELEdBQStELEtBQS9EO0FBQ0FWLElBQUFBLFVBQVUsQ0FBQ1csbUJBQVgsQ0FBK0JWLFVBQS9CO0FBQ0gsR0E5U0ksQ0ErU0w7O0FBL1NLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICAgICAgaGVhZGVyRGlzOiA4MyxcbiAgICAgICAgZm9vdGVyRGlzOiAxMjQsXG4gICAgICAgIHNlY3Rpb25EaXM6IDY2LFxuICAgICAgICBjb250ZW50U3BhY2U6IDk5LFxuICAgICAgICBtYWlsU2VjdGlvbkVsZW1lbnREaXM6IDMwLFxuXG4gICAgICAgIHRpdGxlTGFiZWxOb2RlOiBjYy5Ob2RlLFxuICAgICAgICBjaGFsbGVuZ2VCdXR0b25Ob2U6IGNjLk5vZGUsXG4gICAgICAgIGNvbnRlbnRTZWN0aW9uTm9kZTogY2MuTm9kZSxcbiAgICAgICAgbWFpbFNlY3Rpb25Ob2RlOiBjYy5Ob2RlLFxuICAgICAgICBjbG9zZUJ1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIG1haWxTZWN0aW9uRWxlbWVudFByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBjaGFsbGVuZ2VCdXR0b25Db3N0UGh5U3ByaXRlOiBjYy5TcHJpdGVGcmFtZSxcblxuICAgICAgICBsZXZlbDogbnVsbCxcbiAgICAgICAgbGV2ZWxTdGF0dXM6IG51bGwsXG4gICAgICAgIGNvc3RSZXN1bHQ6IG51bGwsXG4gICAgICAgIGRlbGVnYXRlOiBudWxsXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdmFyIHRleHRDb25maWcgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKVxuICAgICAgICB2YXIgYmcgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKVxuICAgICAgICBiZy53aWR0aCA9IGNjLndpblNpemUud2lkdGhcbiAgICAgICAgYmcuaGVpZ2h0ID0gY2Mud2luU2l6ZS5oZWlnaHRcbiAgICAgICAgYmcub24oXCJ0b3VjaHN0YXJ0XCIsZnVuY3Rpb24oKXt9LHRoaXMpXG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b25Ob2RlLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYgKHNlbGYuZGVsZWdhdGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZGVsZWdhdGUucHJlQ2hhbmxsZW5nZVVJT3BlbmQgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwiZGVsZWdhdGUgaXMgbnVsbFwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5ub2RlLmRlc3Ryb3koKSAgICAgXG4gICAgICAgIH0sdGhpcylcblxuICAgICAgICB0aGlzLmNoYWxsZW5nZUJ1dHRvbk5vZS5nZXRDaGlsZEJ5TmFtZShcIk5ldyBMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRleHRDb25maWcuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTUxKVxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuc2V0dXBVSSgpXG4gICAgfSxcblxuICAgIGdldFNlY3Rpb25BbmRJbmRleE9mTGV2ZWwoKSB7XG4gICAgICAgIHZhciBtYWluU2NlbmVNZ3IgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudChcIm1haW5TY2VuZU1nclwiKVxuICAgICAgICB2YXIgc2VjdGlvbiA9IG1haW5TY2VuZU1nci5zZWxlY3RlZFNlY3Rpb25cbiAgICAgICAgdmFyIHNlY3Rpb25Db25maWcgPSByZXF1aXJlKFwic2VjdGlvbkNvbmZpZ1wiKVxuICAgICAgICB2YXIgbGV2ZWxzID0gc2VjdGlvbkNvbmZpZ1tzZWN0aW9uXS5sZXZlbHNcbiAgICAgICAgdmFyIGluZGV4ID0gbGV2ZWxzLmluZGV4T2YodGhpcy5sZXZlbCkgKyAxXG4gICAgICAgIHJldHVybiBbc2VjdGlvbiwgaW5kZXhdXG4gICAgfSxcblxuICAgIHNldHVwVUkoKSB7XG4gICAgICAgIHRoaXMuX3NldHVwVUlDb250ZW50KClcbiAgICAgICAgdGhpcy5fc2V0dXBVSVBvc2l0aW9uKClcbiAgICB9LFxuXG4gICAgX3NldHVwVUlDb250ZW50KCkge1xuICAgICAgICAvL3RpdGxlIGxhYmVsXG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmdldFNlY3Rpb25BbmRJbmRleE9mTGV2ZWwoKVxuICAgICAgICB0aGlzLnRpdGxlTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVzdWx0WzBdLnRvU3RyaW5nKCkgKyBcIiAtIFwiICsgcmVzdWx0WzFdXG4gICAgICAgIFxuICAgICAgICAvL2NvbnRlbnQgc2VjdGlvblxuICAgICAgICB2YXIgbGV2ZWxDb25maWcgPSByZXF1aXJlKFwibGV2ZWxDb25maWdcIilcbiAgICAgICAgdmFyIGNvbmZpZyA9IGxldmVsQ29uZmlnW3RoaXMubGV2ZWxdXG4gICAgICAgIHZhciBkZXNMYWJlbE5vZGUgPSB0aGlzLmNvbnRlbnRTZWN0aW9uTm9kZS5nZXRDaGlsZEJ5TmFtZShcImRlc0xhYmVsXCIpXG4gICAgICAgIGRlc0xhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJlcXVpcmUoXCJ0ZXh0Q29uZmlnXCIpLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKGNvbmZpZy5kZXNUZXh0SWQpXG4gICAgICAgIGRlc0xhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLl9mb3JjZVVwZGF0ZVJlbmRlckRhdGEoKVxuXG4gICAgICAgIHZhciBzZXBlcmF0ZUxpbmVVcE5vZGUgPSB0aGlzLmNvbnRlbnRTZWN0aW9uTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNlcGVyYXRlTGluZVVwXCIpXG4gICAgICAgIHZhciBzZXBlcmF0ZUxpbmVEb3duTm9kZSA9IHRoaXMuY29udGVudFNlY3Rpb25Ob2RlLmdldENoaWxkQnlOYW1lKFwic2VwZXJhdGVMaW5lRG93blwiKVxuICAgICAgICB2YXIgY29udGVudEhlaWdodCA9IGRlc0xhYmVsTm9kZS5oZWlnaHQgKyAyICogdGhpcy5jb250ZW50U3BhY2UgKyBzZXBlcmF0ZUxpbmVVcE5vZGUuaGVpZ2h0ICsgc2VwZXJhdGVMaW5lRG93bk5vZGUuaGVpZ2h0XG4gICAgICAgIHRoaXMuY29udGVudFNlY3Rpb25Ob2RlLmhlaWdodCA9IGNvbnRlbnRIZWlnaHRcblxuICAgICAgICBzZXBlcmF0ZUxpbmVVcE5vZGUueSA9IDBcbiAgICAgICAgZGVzTGFiZWxOb2RlLnkgPSBzZXBlcmF0ZUxpbmVVcE5vZGUueSAtIHNlcGVyYXRlTGluZVVwTm9kZS5oZWlnaHQgLSB0aGlzLmNvbnRlbnRTcGFjZVxuICAgICAgICBzZXBlcmF0ZUxpbmVEb3duTm9kZS55ID0gLWNvbnRlbnRIZWlnaHQgKyBzZXBlcmF0ZUxpbmVEb3duTm9kZS5oZWlnaHRcblxuICAgICAgICAvL21haWxTZWN0aW9uXG4gICAgICAgIHZhciB0ZXh0Q29uZmlnID0gcmVxdWlyZShcInRleHRDb25maWdcIilcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX2dldE1haWxTZWN0aW9uSW5mbygpXG4gICAgICAgIHZhciBtYWlsU2VjdGlvbkhlaWdodCA9IDBcbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gcmVzdWx0KSB7XG4gICAgICAgICAgICB2YXIgb25lQ29uZmlnID0gcmVzdWx0W2luZGV4XVxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm1haWxTZWN0aW9uRWxlbWVudFByZWZhYilcbiAgICAgICAgICAgIHZhciBkZXNMYWJlbCA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJkZXNMYWJlbFwiKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgdGV4dFN0ciA9IFwiXCJcbiAgICAgICAgICAgIGlmIChvbmVDb25maWcudHlwZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgLy8gdGV4dFN0ciA9IFwi6YCa5YWz5ZCO5Lya5pS25YiwIFwiICsgb25lQ29uZmlnLnRhZyArIFwiIOWIhuaUr+eahOaWsOmCruS7tlwiXG4gICAgICAgICAgICAgICAgdGV4dFN0ciA9IHRleHRDb25maWcuZ2V0Rm9ybWF0ZWRTdHJpbmcoMTQ5LFtvbmVDb25maWcudGFnXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9uZUNvbmZpZy50eXBlID09IDIpIHtcbiAgICAgICAgICAgICAgICAvLyB0ZXh0U3RyID0gXCLnlKjkuI3lpJrkuo4gXCIgKyBvbmVDb25maWcubWluU3RlcCArIFwiIOatpemAmuWFs++8jOS8muaUtuWIsCBcIiArIG9uZUNvbmZpZy50YWcgKyBcIiDliIbmlK/nmoTmlrDpgq7ku7ZcIlxuICAgICAgICAgICAgICAgIHRleHRTdHIgPSB0ZXh0Q29uZmlnLmdldEZvcm1hdGVkU3RyaW5nKDE1MCxbb25lQ29uZmlnLm1pblN0ZXAsb25lQ29uZmlnLnRhZ10pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZXNMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRleHRTdHJcbiAgICAgICAgICAgIGRlc0xhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuX2ZvcmNlVXBkYXRlUmVuZGVyRGF0YSgpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBjb21wbGV0ZUljb24gPSBub2RlLmdldENoaWxkQnlOYW1lKFwiY29tcGxldGVJY29uXCIpXG4gICAgICAgICAgICBpZiAob25lQ29uZmlnLnN0YXR1cyA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgY29tcGxldGVJY29uLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRlc0xhYmVsLmhlaWdodCA+IGNvbXBsZXRlSWNvbi5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBub2RlLmhlaWdodCA9IGRlc0xhYmVsLmhlaWdodFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZS5oZWlnaHQgPSBjb21wbGV0ZUljb24uaGVpZ2h0XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5vZGUueSA9IG1haWxTZWN0aW9uSGVpZ2h0XG4gICAgICAgICAgICBtYWlsU2VjdGlvbkhlaWdodCArPSBub2RlLmhlaWdodFxuICAgICAgICAgICAgaWYgKGluZGV4ICE9IHJlc3VsdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgbWFpbFNlY3Rpb25IZWlnaHQgKz0gdGhpcy5tYWlsU2VjdGlvbkVsZW1lbnREaXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubWFpbFNlY3Rpb25Ob2RlLmFkZENoaWxkKG5vZGUpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYWlsU2VjdGlvbk5vZGUuaGVpZ2h0ID0gbWFpbFNlY3Rpb25IZWlnaHRcblxuICAgICAgICAvL2NoYWxsZW5nZUJ1dHRvblxuICAgICAgICB2YXIgY29zdFJlc3VsdCA9IHRoaXMuX2dldENvc3RJbmZvT2ZDaGFsbGVuZ2UoKVxuICAgICAgICBpZiAoY29zdFJlc3VsdC50eXBlID09IFwicGh5c2ljYWxQb3dlclwiKSB7XG4gICAgICAgICAgICB0aGlzLmNoYWxsZW5nZUJ1dHRvbk5vZS5nZXRDaGlsZEJ5TmFtZShcImNvc3RJY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5jaGFsbGVuZ2VCdXR0b25Db3N0UGh5U3ByaXRlXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2hhbGxlbmdlQnV0dG9uTm9lLmdldENoaWxkQnlOYW1lKFwiY29zdExhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gY29zdFJlc3VsdC5udW0udG9TdHJpbmcoKVxuICAgICAgICB0aGlzLmNvc3RSZXN1bHQgPSBjb3N0UmVzdWx0XG4gICAgfSxcbiAgICBfc2V0dXBVSVBvc2l0aW9uKCkge1xuICAgICAgICB2YXIgdG90YWxIZWlnaHQgPSB0aGlzLmZvb3RlckRpcyArIHRoaXMudGl0bGVMYWJlbE5vZGUuaGVpZ2h0ICsgdGhpcy5zZWN0aW9uRGlzICsgdGhpcy5jb250ZW50U2VjdGlvbk5vZGUuaGVpZ2h0ICsgdGhpcy5zZWN0aW9uRGlzICsgdGhpcy5tYWlsU2VjdGlvbk5vZGUuaGVpZ2h0ICsgdGhpcy5zZWN0aW9uRGlzICsgdGhpcy5jaGFsbGVuZ2VCdXR0b25Ob2UuaGVpZ2h0ICsgdGhpcy5mb290ZXJEaXNcbiAgICAgICAgdmFyIHVpYmcgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvdGhlcnNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ1aUJnXCIpXG4gICAgICAgIHVpYmcuaGVpZ2h0ID0gdG90YWxIZWlnaHRcblxuICAgICAgICB0aGlzLnRpdGxlTGFiZWxOb2RlLnkgPSB1aWJnLmhlaWdodCAvIDIgLSB0aGlzLmhlYWRlckRpc1xuICAgICAgICB0aGlzLmNvbnRlbnRTZWN0aW9uTm9kZS55ID0gdGhpcy50aXRsZUxhYmVsTm9kZS55IC0gdGhpcy50aXRsZUxhYmVsTm9kZS5oZWlnaHQgLSB0aGlzLnNlY3Rpb25EaXNcbiAgICAgICAgdGhpcy5tYWlsU2VjdGlvbk5vZGUueSA9IHRoaXMuY29udGVudFNlY3Rpb25Ob2RlLnkgLSB0aGlzLmNvbnRlbnRTZWN0aW9uTm9kZS5oZWlnaHQgLSB0aGlzLnNlY3Rpb25EaXNcbiAgICAgICAgdGhpcy5jaGFsbGVuZ2VCdXR0b25Ob2UueSA9IHRoaXMubWFpbFNlY3Rpb25Ob2RlLnkgLSB0aGlzLm1haWxTZWN0aW9uTm9kZS5oZWlnaHQgLSB0aGlzLnNlY3Rpb25EaXMgLSB0aGlzLmNoYWxsZW5nZUJ1dHRvbk5vZS5oZWlnaHQgLyAyXG4gICAgfSxcblxuICAgIF9nZXRNYWlsU2VjdGlvbkluZm8oKSB7XG4gICAgICAgIHZhciBtYWlsU3lzQ29uZmlnID0gcmVxdWlyZShcIm1haWxTeXNDb25maWdcIilcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG4gICAgICAgIHZhciB0ZXh0Q29uZmlnID0gcmVxdWlyZShcInRleHRDb25maWdcIilcbiAgICAgICAgZm9yICh2YXIgdGFnIGluIG1haWxTeXNDb25maWcpIHtcbiAgICAgICAgICAgIHZhciBvbmVDb25maWcgPSBtYWlsU3lzQ29uZmlnW3RhZ11cbiAgICAgICAgICAgIHZhciBjb25kaXRpb25zID0gb25lQ29uZmlnLmNvbmRpdGlvbnNcbiAgICAgICAgICAgIHZhciBjdXJyZW50Q29uZGl0aW9uSW5kZXggPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLm1haWxDb25kaXRpb25JbmRleFt0YWddXG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBjb25kaXRpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9uZUNvbmRpdGlvbkNvbmZpZyA9IGNvbmRpdGlvbnNbaW5kZXhdXG4gICAgICAgICAgICAgICAgdmFyIGNvbmRpdGlvblR5cGUgPSBvbmVDb25kaXRpb25Db25maWcuY29uZGl0aW9uVHlwZVxuICAgICAgICAgICAgICAgIHZhciBjb25kaXRpb25QYXJhID0gb25lQ29uZGl0aW9uQ29uZmlnLmNvbmRpdGlvblBhcmFcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBpZiAoY29uZGl0aW9uUGFyYSA9PSB0aGlzLmxldmVsKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHZhciBvbmVSZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0YWc6IG9uZUNvbmZpZy50YWdOYW1lLFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgc3RhdHVzOiBudWxsXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIHZhciBvbmVSZXN1bHQgPSBudWxsXG4gICAgICAgICAgICAgICAgaWYgKChjb25kaXRpb25UeXBlID09IDEgJiYgY29uZGl0aW9uUGFyYSA9PSB0aGlzLmxldmVsKSB8fCAoY29uZGl0aW9uVHlwZSA9PSAyICYmIGNvbmRpdGlvblBhcmEubGV2ZWxJZCA9PSB0aGlzLmxldmVsKSkge1xuICAgICAgICAgICAgICAgICAgICBvbmVSZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0YWc6IG9uZUNvbmZpZy50YWdOYW1lVGV4dElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKG9uZUNvbmZpZy50YWdOYW1lVGV4dElkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGNvbmRpdGlvblR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5TdGVwOiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG9uZVJlc3VsdCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgY3VycmVudENvbmRpdGlvbkluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIG9uZVJlc3VsdC5zdGF0dXMgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvbmVSZXN1bHQuc3RhdHVzID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY29uZGl0aW9uVHlwZSA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uZVJlc3VsdC5taW5TdGVwID0gY29uZGl0aW9uUGFyYS5taW5TdGVwTnVtXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG9uZVJlc3VsdClcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH0sXG5cbiAgICBfZ2V0Q29zdEluZm9PZkNoYWxsZW5nZSgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgIHR5cGU6IFwicGh5c2ljYWxQb3dlclwiLFxuICAgICAgICAgICAgbnVtOiAwXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxldmVsQ29uZmlnID0gcmVxdWlyZShcImxldmVsQ29uZmlnXCIpXG4gICAgICAgIGlmICh0aGlzLmxldmVsU3RhdHVzID09IDEpIHtcbiAgICAgICAgICAgIHJlc3VsdC50eXBlID0gXCJoZWFydFwiXG4gICAgICAgICAgICByZXN1bHQubnVtID0gbGV2ZWxDb25maWdbdGhpcy5sZXZlbF0uaGVhcnRGb3JSZXRyeUNvc3RcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmxldmVsU3RhdHVzID09IDIpIHtcbiAgICAgICAgICAgIHZhciBmbGFnID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5waHlzaWNhbFBvd2VyQ29zdGVkRmxhZ1xuICAgICAgICAgICAgaWYgKGZsYWcgPT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC50eXBlID0gXCJwaHlzaWNhbFBvd2VyXCJcbiAgICAgICAgICAgICAgICByZXN1bHQubnVtID0gbGV2ZWxDb25maWdbdGhpcy5sZXZlbF0ucGh5c2ljYWxQb3dlckNvc3RcbiAgICAgICAgICAgICAgICB2YXIgd2VsZmFyeUZsYWcgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmluaXRBZFdhdGNoZWRGbGFnXG4gICAgICAgICAgICAgICAgaWYgKHdlbGZhcnlGbGFnID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lm51bSA9IE1hdGgucm91bmQocmVzdWx0Lm51bSAvIDIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZmxhZyA9PSAxKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnR5cGUgPSBcImhlYXJ0XCJcbiAgICAgICAgICAgICAgICByZXN1bHQubnVtID0gbGV2ZWxDb25maWdbdGhpcy5sZXZlbF0uaGVhcnRGb3JSZXRyeUNvc3RcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICB9LFxuXG4gICAgb25DbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMuY29zdFJlc3VsdCA9PSBudWxsIHx8IHRoaXMuY29zdFJlc3VsdC5udW0gPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZhbHVlTnVtID0gbnVsbFxuICAgICAgICBpZiAodGhpcy5jb3N0UmVzdWx0LnR5cGUgPT0gXCJoZWFydFwiKSB7XG4gICAgICAgICAgICB2YWx1ZU51bSA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuaGVhcnQgLSB0aGlzLmNvc3RSZXN1bHQubnVtXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5jb3N0UmVzdWx0LnR5cGUgPT0gXCJwaHlzaWNhbFBvd2VyXCIpIHtcbiAgICAgICAgICAgIHZhbHVlTnVtID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5waHlzaWNhbFBvd2VyIC0gdGhpcy5jb3N0UmVzdWx0Lm51bVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlTnVtID09IG51bGwgfHwgdmFsdWVOdW0gPCAwKSB7XG4gICAgICAgICAgICB2YXIgbm90aWZpY2FpdGlvblN5cyA9IHJlcXVpcmUoXCJub3RpZmljYXRpb25NZ3JcIilcbiAgICAgICAgICAgIHZhciBub3RpU3RyID0gXCJcIlxuICAgICAgICAgICAgaWYgKHRoaXMuY29zdFJlc3VsdC50eXBlID09IFwiaGVhcnRcIikge1xuICAgICAgICAgICAgICAgIG5vdGlTdHIgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKS5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxNjkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNvc3RSZXN1bHQudHlwZSA9PSBcInBoeXNpY2FsUG93ZXJcIikge1xuICAgICAgICAgICAgICAgIG5vdGlTdHIgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKS5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxNzApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub3RpZmljYWl0aW9uU3lzLnB1c2hOb3RpKG5vdGlTdHIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHZhciBuZXR3b3JrTWdyID0gcmVxdWlyZShcIm5ldHdvcmtNZ3JcIilcbiAgICAgICAgdmFyIG1lc3NhZ2VPYmogPSBuZXR3b3JrTWdyLm1ha2VNZXNzYWdlT2JqKFwiZGF0YU1vZHVsZVwiLFwiY29tbWl0TWVzc2FnZVR5cFwiKVxuICAgICAgICBtZXNzYWdlT2JqLm1lc3NhZ2UucGxheWVySWQgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmlkXG4gICAgICAgIHZhciBjb21taXRCb2R5ID0gbnVsbFxuICAgICAgICBpZiAodGhpcy5jb3N0UmVzdWx0LnR5cGUgPT0gXCJoZWFydFwiKSB7XG4gICAgICAgICAgICBjb21taXRCb2R5ID0ge1xuICAgICAgICAgICAgICAgIFwiaGVhcnRcIjogcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5oZWFydCAtIHRoaXMuY29zdFJlc3VsdC5udW1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY29zdFJlc3VsdC50eXBlID09IFwicGh5c2ljYWxQb3dlclwiKSB7XG4gICAgICAgICAgICBjb21taXRCb2R5ID0ge1xuICAgICAgICAgICAgICAgIFwicGh5c2ljYWxQb3dlclwiOiByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLnBoeXNpY2FsUG93ZXIgLSB0aGlzLmNvc3RSZXN1bHQubnVtXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBtZXNzYWdlT2JqLm1lc3NhZ2UuY29tbWl0Qm9keSA9IGNvbW1pdEJvZHlcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgIG1lc3NhZ2VPYmouc3VjY2Vzc0NhbGxCYWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmIChzZWxmLmNvc3RSZXN1bHQudHlwZSA9PSBcImhlYXJ0XCIpIHtcbiAgICAgICAgICAgICAgICByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmhlYXJ0ID0gY29tbWl0Qm9keS5oZWFydFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2VsZi5jb3N0UmVzdWx0LnR5cGUgPT0gXCJwaHlzaWNhbFBvd2VyXCIpIHtcbiAgICAgICAgICAgICAgICByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLnBoeXNpY2FsUG93ZXIgPSBjb21taXRCb2R5LnBoeXNpY2FsUG93ZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gc2VsZi5jaGFsbGVuZ2VCdXR0b25Ob2UuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZVxuICAgICAgICAgICAgcmVxdWlyZShcImdhbWVNZ3JcIikuZW50ZXJMZXZlbFNjZW5lKHNlbGYubGV2ZWwpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYWxsZW5nZUJ1dHRvbk5vZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZVxuICAgICAgICBuZXR3b3JrTWdyLnNlbmRNZXNzYWdlQnlNc2dPYmoobWVzc2FnZU9iailcbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==