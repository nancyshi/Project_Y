
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/mainScene/selectSectionElementMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'db60cQ2kgJNgK6qR9e+RnsV', 'selectSectionElementMgr');
// scripts/mainScene/selectSectionElementMgr.js

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
    processBarNode: cc.Node,
    processLabelNode: cc.Node,
    iconNode: cc.Node,
    iconLabelNode: cc.Node,
    nameLabelNode: cc.Node,
    lockedIconSpriteFrame: cc.SpriteFrame,
    sectionKey: null,
    config: null,
    mailInfo: null,
    selectSectionUINode: null
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  start: function start() {
    if (this.sectionKey == null) {
      return;
    }

    this.setupData(); // this.nameLabelNode.getComponent(cc.Label).string = this.config.sectionDescrip

    this.nameLabelNode.getComponent(cc.Label).string = require("textConfig").getTextByIdAndLanguageType(this.config.sectionDescripTextId);
    this.iconLabelNode.getComponent(cc.Label).string = this.sectionKey;

    if (parseInt(this.sectionKey) > require("dataMgr").playerData.currentSection) {
      this.iconNode.getComponent(cc.Sprite).spriteFrame = this.lockedIconSpriteFrame;
    }

    this.processLabelNode.getComponent(cc.Label).string = this.mailInfo.sendNum.toString() + " / " + this.mailInfo.totalNum.toString();
    this.processBarNode.getComponent(cc.ProgressBar).progress = this.mailInfo.sendNum / this.mailInfo.totalNum;
  },
  // update (dt) {},
  setupData: function setupData() {
    var sectionConfig = require("sectionConfig");

    this.config = sectionConfig[this.sectionKey];
    var mailIdsShouldToSend = [];
    var levels = this.config.levels;

    var mailSysConfig = require("mailSysConfig");

    for (var tag in mailSysConfig) {
      var conditions = mailSysConfig[tag].conditions;

      for (var index in conditions) {
        var oneCondition = conditions[index];
        var conditionType = oneCondition.conditionType;
        var conditionPara = oneCondition.conditionPara;

        if (conditionType == 1 && levels.indexOf(conditionPara) != -1) {
          mailIdsShouldToSend.push(oneCondition.mailId);
        } else if (conditionType == 2 && levels.indexOf(conditionPara.levelId) != -1) {
          mailIdsShouldToSend.push(oneCondition.mailId);
        }
      }
    }

    var totalMailNum = mailIdsShouldToSend.length;
    var sendMailNum = 0;

    if (totalMailNum > 0) {
      var currentMailIds = Object.keys(require("dataMgr").playerData.mails);

      for (var index in mailIdsShouldToSend) {
        var oneMailId = mailIdsShouldToSend[index];

        if (currentMailIds.indexOf(oneMailId.toString()) != -1) {
          sendMailNum += 1;
        }
      }
    }

    var result = {
      totalNum: totalMailNum,
      sendNum: sendMailNum
    };
    this.mailInfo = result;
  },
  onClick: function onClick() {
    if (parseInt(this.sectionKey) > require("dataMgr").playerData.currentSection) {
      require("notificationMgr").showNoti(require("textConfig").getTextByIdAndLanguageType(158));

      return;
    } else if (parseInt(this.sectionKey) <= require("dataMgr").playerData.currentSection) {
      var mainSceneMgr = cc.director.getScene().getChildByName("Canvas").getComponent("mainSceneMgr");

      if (mainSceneMgr == null) {
        cc.log("现在不是主界面，无法选择章节，这种情况应该不会出现的才对！");
      } else {
        if (parseInt(this.sectionKey) != mainSceneMgr.selectedSection) {
          mainSceneMgr.selectedSection = parseInt(this.sectionKey);
          mainSceneMgr.setupSectionPerformance();
          mainSceneMgr.playBgm();
        }
      }
    }

    require("systemsMgr").closeSystem("selectSectionSys");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL21haW5TY2VuZS9zZWxlY3RTZWN0aW9uRWxlbWVudE1nci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInByb2Nlc3NCYXJOb2RlIiwiTm9kZSIsInByb2Nlc3NMYWJlbE5vZGUiLCJpY29uTm9kZSIsImljb25MYWJlbE5vZGUiLCJuYW1lTGFiZWxOb2RlIiwibG9ja2VkSWNvblNwcml0ZUZyYW1lIiwiU3ByaXRlRnJhbWUiLCJzZWN0aW9uS2V5IiwiY29uZmlnIiwibWFpbEluZm8iLCJzZWxlY3RTZWN0aW9uVUlOb2RlIiwib25Mb2FkIiwic3RhcnQiLCJzZXR1cERhdGEiLCJnZXRDb21wb25lbnQiLCJMYWJlbCIsInN0cmluZyIsInJlcXVpcmUiLCJnZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSIsInNlY3Rpb25EZXNjcmlwVGV4dElkIiwicGFyc2VJbnQiLCJwbGF5ZXJEYXRhIiwiY3VycmVudFNlY3Rpb24iLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsInNlbmROdW0iLCJ0b1N0cmluZyIsInRvdGFsTnVtIiwiUHJvZ3Jlc3NCYXIiLCJwcm9ncmVzcyIsInNlY3Rpb25Db25maWciLCJtYWlsSWRzU2hvdWxkVG9TZW5kIiwibGV2ZWxzIiwibWFpbFN5c0NvbmZpZyIsInRhZyIsImNvbmRpdGlvbnMiLCJpbmRleCIsIm9uZUNvbmRpdGlvbiIsImNvbmRpdGlvblR5cGUiLCJjb25kaXRpb25QYXJhIiwiaW5kZXhPZiIsInB1c2giLCJtYWlsSWQiLCJsZXZlbElkIiwidG90YWxNYWlsTnVtIiwibGVuZ3RoIiwic2VuZE1haWxOdW0iLCJjdXJyZW50TWFpbElkcyIsIk9iamVjdCIsImtleXMiLCJtYWlscyIsIm9uZU1haWxJZCIsInJlc3VsdCIsIm9uQ2xpY2siLCJzaG93Tm90aSIsIm1haW5TY2VuZU1nciIsImRpcmVjdG9yIiwiZ2V0U2NlbmUiLCJnZXRDaGlsZEJ5TmFtZSIsImxvZyIsInNlbGVjdGVkU2VjdGlvbiIsInNldHVwU2VjdGlvblBlcmZvcm1hbmNlIiwicGxheUJnbSIsImNsb3NlU3lzdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsY0FBYyxFQUFFSixFQUFFLENBQUNLLElBaEJYO0FBaUJSQyxJQUFBQSxnQkFBZ0IsRUFBRU4sRUFBRSxDQUFDSyxJQWpCYjtBQWtCUkUsSUFBQUEsUUFBUSxFQUFFUCxFQUFFLENBQUNLLElBbEJMO0FBbUJSRyxJQUFBQSxhQUFhLEVBQUVSLEVBQUUsQ0FBQ0ssSUFuQlY7QUFvQlJJLElBQUFBLGFBQWEsRUFBRVQsRUFBRSxDQUFDSyxJQXBCVjtBQXFCUkssSUFBQUEscUJBQXFCLEVBQUVWLEVBQUUsQ0FBQ1csV0FyQmxCO0FBdUJSQyxJQUFBQSxVQUFVLEVBQUUsSUF2Qko7QUF3QlJDLElBQUFBLE1BQU0sRUFBRSxJQXhCQTtBQXlCUkMsSUFBQUEsUUFBUSxFQUFFLElBekJGO0FBMkJSQyxJQUFBQSxtQkFBbUIsRUFBRTtBQTNCYixHQUhQO0FBaUNMO0FBRUFDLEVBQUFBLE1BbkNLLG9CQW1DSyxDQUNULENBcENJO0FBc0NMQyxFQUFBQSxLQXRDSyxtQkFzQ0k7QUFDTCxRQUFJLEtBQUtMLFVBQUwsSUFBbUIsSUFBdkIsRUFBNkI7QUFDekI7QUFDSDs7QUFFRCxTQUFLTSxTQUFMLEdBTEssQ0FNTDs7QUFDQSxTQUFLVCxhQUFMLENBQW1CVSxZQUFuQixDQUFnQ25CLEVBQUUsQ0FBQ29CLEtBQW5DLEVBQTBDQyxNQUExQyxHQUFtREMsT0FBTyxDQUFD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Q0FBdkM7QUFDQWdELFVBQUFBLFlBQVksQ0FBQ00sdUJBQWI7QUFDQU4sVUFBQUEsWUFBWSxDQUFDTyxPQUFiO0FBQ0g7QUFDSjtBQUNKOztBQUVEN0MsSUFBQUEsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQjhDLFdBQXRCLENBQWtDLGtCQUFsQztBQUNIO0FBckhJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICAgICAgcHJvY2Vzc0Jhck5vZGU6IGNjLk5vZGUsXG4gICAgICAgIHByb2Nlc3NMYWJlbE5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGljb25Ob2RlOiBjYy5Ob2RlLFxuICAgICAgICBpY29uTGFiZWxOb2RlOiBjYy5Ob2RlLFxuICAgICAgICBuYW1lTGFiZWxOb2RlOiBjYy5Ob2RlLFxuICAgICAgICBsb2NrZWRJY29uU3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lLFxuXG4gICAgICAgIHNlY3Rpb25LZXk6IG51bGwsXG4gICAgICAgIGNvbmZpZzogbnVsbCxcbiAgICAgICAgbWFpbEluZm86IG51bGwsXG5cbiAgICAgICAgc2VsZWN0U2VjdGlvblVJTm9kZTogbnVsbFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgfSxcblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VjdGlvbktleSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0dXBEYXRhKClcbiAgICAgICAgLy8gdGhpcy5uYW1lTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5jb25maWcuc2VjdGlvbkRlc2NyaXBcbiAgICAgICAgdGhpcy5uYW1lTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVxdWlyZShcInRleHRDb25maWdcIikuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUodGhpcy5jb25maWcuc2VjdGlvbkRlc2NyaXBUZXh0SWQpXG4gICAgICAgIHRoaXMuaWNvbkxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuc2VjdGlvbktleVxuXG4gICAgICAgIGlmIChwYXJzZUludCh0aGlzLnNlY3Rpb25LZXkpID4gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5jdXJyZW50U2VjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5pY29uTm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubG9ja2VkSWNvblNwcml0ZUZyYW1lXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByb2Nlc3NMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLm1haWxJbmZvLnNlbmROdW0udG9TdHJpbmcoKSArIFwiIC8gXCIgKyB0aGlzLm1haWxJbmZvLnRvdGFsTnVtLnRvU3RyaW5nKClcbiAgICAgICAgdGhpcy5wcm9jZXNzQmFyTm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gdGhpcy5tYWlsSW5mby5zZW5kTnVtIC8gdGhpcy5tYWlsSW5mby50b3RhbE51bVxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbiAgICBzZXR1cERhdGEoKSB7XG4gICAgICAgIHZhciBzZWN0aW9uQ29uZmlnID0gcmVxdWlyZShcInNlY3Rpb25Db25maWdcIilcbiAgICAgICAgdGhpcy5jb25maWcgPSBzZWN0aW9uQ29uZmlnW3RoaXMuc2VjdGlvbktleV1cbiAgICAgICAgdmFyIG1haWxJZHNTaG91bGRUb1NlbmQgPSBbXVxuICAgICAgICB2YXIgbGV2ZWxzID0gdGhpcy5jb25maWcubGV2ZWxzXG4gICAgICAgIHZhciBtYWlsU3lzQ29uZmlnID0gcmVxdWlyZShcIm1haWxTeXNDb25maWdcIilcbiAgICAgICAgZm9yICh2YXIgdGFnIGluIG1haWxTeXNDb25maWcpIHtcbiAgICAgICAgICAgIHZhciBjb25kaXRpb25zID0gbWFpbFN5c0NvbmZpZ1t0YWddLmNvbmRpdGlvbnNcbiAgICAgICAgICAgIGZvciAodmFyIGluZGV4IGluIGNvbmRpdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgb25lQ29uZGl0aW9uID0gY29uZGl0aW9uc1tpbmRleF1cbiAgICAgICAgICAgICAgICB2YXIgY29uZGl0aW9uVHlwZSA9IG9uZUNvbmRpdGlvbi5jb25kaXRpb25UeXBlXG4gICAgICAgICAgICAgICAgdmFyIGNvbmRpdGlvblBhcmEgPSBvbmVDb25kaXRpb24uY29uZGl0aW9uUGFyYVxuICAgICAgICAgICAgICAgIGlmIChjb25kaXRpb25UeXBlID09IDEgJiYgbGV2ZWxzLmluZGV4T2YoY29uZGl0aW9uUGFyYSkgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbElkc1Nob3VsZFRvU2VuZC5wdXNoKG9uZUNvbmRpdGlvbi5tYWlsSWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbmRpdGlvblR5cGUgPT0gMiAmJiBsZXZlbHMuaW5kZXhPZihjb25kaXRpb25QYXJhLmxldmVsSWQpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIG1haWxJZHNTaG91bGRUb1NlbmQucHVzaChvbmVDb25kaXRpb24ubWFpbElkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b3RhbE1haWxOdW0gPSBtYWlsSWRzU2hvdWxkVG9TZW5kLmxlbmd0aFxuICAgICAgICB2YXIgc2VuZE1haWxOdW0gPSAwXG4gICAgICAgIGlmICh0b3RhbE1haWxOdW0gPiAwKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudE1haWxJZHMgPSBPYmplY3Qua2V5cyhyZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLm1haWxzKVxuICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gbWFpbElkc1Nob3VsZFRvU2VuZCkge1xuICAgICAgICAgICAgICAgIHZhciBvbmVNYWlsSWQgPSBtYWlsSWRzU2hvdWxkVG9TZW5kW2luZGV4XVxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50TWFpbElkcy5pbmRleE9mKG9uZU1haWxJZC50b1N0cmluZygpKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBzZW5kTWFpbE51bSArPSAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICB0b3RhbE51bTogdG90YWxNYWlsTnVtLFxuICAgICAgICAgICAgc2VuZE51bTogc2VuZE1haWxOdW1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1haWxJbmZvID0gcmVzdWx0XG4gICAgfSxcblxuICAgIG9uQ2xpY2soKSB7XG5cbiAgICAgICAgaWYgKHBhcnNlSW50KHRoaXMuc2VjdGlvbktleSkgPiByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgICAgICByZXF1aXJlKFwibm90aWZpY2F0aW9uTWdyXCIpLnNob3dOb3RpKHJlcXVpcmUoXCJ0ZXh0Q29uZmlnXCIpLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDE1OCkpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwYXJzZUludCh0aGlzLnNlY3Rpb25LZXkpIDw9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuY3VycmVudFNlY3Rpb24gKSB7XG4gICAgICAgICAgICB2YXIgbWFpblNjZW5lTWdyID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZShcIkNhbnZhc1wiKS5nZXRDb21wb25lbnQoXCJtYWluU2NlbmVNZ3JcIilcbiAgICAgICAgICAgIGlmIChtYWluU2NlbmVNZ3IgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcIueOsOWcqOS4jeaYr+S4u+eVjOmdou+8jOaXoOazlemAieaLqeeroOiKgu+8jOi/meenjeaDheWGteW6lOivpeS4jeS8muWHuueOsOeahOaJjeWvue+8gVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYocGFyc2VJbnQodGhpcy5zZWN0aW9uS2V5KSAhPSBtYWluU2NlbmVNZ3Iuc2VsZWN0ZWRTZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIG1haW5TY2VuZU1nci5zZWxlY3RlZFNlY3Rpb24gPSBwYXJzZUludCh0aGlzLnNlY3Rpb25LZXkpXG4gICAgICAgICAgICAgICAgICAgIG1haW5TY2VuZU1nci5zZXR1cFNlY3Rpb25QZXJmb3JtYW5jZSgpXG4gICAgICAgICAgICAgICAgICAgIG1haW5TY2VuZU1nci5wbGF5QmdtKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXF1aXJlKFwic3lzdGVtc01nclwiKS5jbG9zZVN5c3RlbShcInNlbGVjdFNlY3Rpb25TeXNcIilcbiAgICB9XG59KTtcbiJdfQ==