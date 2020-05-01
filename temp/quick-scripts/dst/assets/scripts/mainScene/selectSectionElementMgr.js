
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

    this.nameLabelNode.getComponent(cc.Label).string = require("textConfig").getTextByIdAndLanguageType(this.config.sectionTitleTextId);
    this.iconLabelNode.getComponent(cc.Label).string = this.sectionKey;

    if (parseInt(this.sectionKey) > require("dataMgr").playerData.currentSection) {
      this.iconNode.getComponent(cc.Sprite).spriteFrame = this.lockedIconSpriteFrame;
      this.nameLabelNode.color = cc.color();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL21haW5TY2VuZS9zZWxlY3RTZWN0aW9uRWxlbWVudE1nci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInByb2Nlc3NCYXJOb2RlIiwiTm9kZSIsInByb2Nlc3NMYWJlbE5vZGUiLCJpY29uTm9kZSIsImljb25MYWJlbE5vZGUiLCJuYW1lTGFiZWxOb2RlIiwibG9ja2VkSWNvblNwcml0ZUZyYW1lIiwiU3ByaXRlRnJhbWUiLCJzZWN0aW9uS2V5IiwiY29uZmlnIiwibWFpbEluZm8iLCJzZWxlY3RTZWN0aW9uVUlOb2RlIiwib25Mb2FkIiwic3RhcnQiLCJzZXR1cERhdGEiLCJnZXRDb21wb25lbnQiLCJMYWJlbCIsInN0cmluZyIsInJlcXVpcmUiLCJnZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSIsInNlY3Rpb25UaXRsZVRleHRJZCIsInBhcnNlSW50IiwicGxheWVyRGF0YSIsImN1cnJlbnRTZWN0aW9uIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJjb2xvciIsInNlbmROdW0iLCJ0b1N0cmluZyIsInRvdGFsTnVtIiwiUHJvZ3Jlc3NCYXIiLCJwcm9ncmVzcyIsInNlY3Rpb25Db25maWciLCJtYWlsSWRzU2hvdWxkVG9TZW5kIiwibGV2ZWxzIiwibWFpbFN5c0NvbmZpZyIsInRhZyIsImNvbmRpdGlvbnMiLCJpbmRleCIsIm9uZUNvbmRpdGlvbiIsImNvbmRpdGlvblR5cGUiLCJjb25kaXRpb25QYXJhIiwiaW5kZXhPZiIsInB1c2giLCJtYWlsSWQiLCJsZXZlbElkIiwidG90YWxNYWlsTnVtIiwibGVuZ3RoIiwic2VuZE1haWxOdW0iLCJjdXJyZW50TWFpbElkcyIsIk9iamVjdCIsImtleXMiLCJtYWlscyIsIm9uZU1haWxJZCIsInJlc3VsdCIsIm9uQ2xpY2siLCJzaG93Tm90aSIsIm1haW5TY2VuZU1nciIsImRpcmVjdG9yIiwiZ2V0U2NlbmUiLCJnZXRDaGlsZEJ5TmFtZSIsImxvZyIsInNlbGVjdGVkU2VjdGlvbiIsInNldHVwU2VjdGlvblBlcmZvcm1hbmNlIiwicGxheUJnbSIsImNsb3NlU3lzdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsY0FBYyxFQUFFSixFQUFFLENBQUNLLElBaEJYO0FBaUJSQyxJQUFBQSxnQkFBZ0IsRUFBRU4sRUFBRSxDQUFDSyxJQWpCYjtBQWtCUkUsSUFBQUEsUUFBUSxFQUFFUCxFQUFFLENBQUNLLElBbEJMO0FBbUJSRyxJQUFBQSxhQUFhLEVBQUVSLEVBQUUsQ0FBQ0ssSUFuQlY7QUFvQlJJLElBQUFBLGFBQWEsRUFBRVQsRUFBRSxDQUFDSyxJQXBCVjtBQXFCUkssSUFBQUEscUJBQXFCLEVBQUVWLEVBQUUsQ0FBQ1csV0FyQmxCO0FBdUJSQyxJQUFBQSxVQUFVLEVBQUUsSUF2Qko7QUF3QlJDLElBQUFBLE1BQU0sRUFBRSxJQXhCQTtBQXlCUkMsSUFBQUEsUUFBUSxFQUFFLElBekJGO0FBMkJSQyxJQUFBQSxtQkFBbUIsRUFBRTtBQTNCYixHQUhQO0FBaUNMO0FBRUFDLEVBQUFBLE1BbkNLLG9CQW1DSyxDQUNULENBcENJO0FBc0NMQyxFQUFBQSxLQXRDSyxtQkFzQ0k7QUFDTCxRQUFJLEtBQUtMLFVBQUwsSUFBbUIsSUFBdkIsRUFBNkI7QUFDekI7QUFDSDs7QUFFRCxTQUFLTSxTQUFMLEdBTEssQ0FNTDs7QUFDQSxTQUFLVCxhQUFMLENBQW1CVSxZQUFuQixDQUFnQ25CLEVBQUUsQ0FBQ29CLEtBQW5DLEVBQTBDQyxNQUExQyxHQUFtREMsT0FB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QTdDLEVBQThEO0FBQzFETCxVQUFBQSxZQUFZLENBQUNLLGVBQWIsR0FBK0J6QyxRQUFRLENBQUMsS0FBS2IsVUFBTixDQUF2QztBQUNBaUQsVUFBQUEsWUFBWSxDQUFDTSx1QkFBYjtBQUNBTixVQUFBQSxZQUFZLENBQUNPLE9BQWI7QUFDSDtBQUNKO0FBQ0o7O0FBRUQ5QyxJQUFBQSxPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCK0MsV0FBdEIsQ0FBa0Msa0JBQWxDO0FBQ0g7QUF0SEksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHBzOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICBwcm9jZXNzQmFyTm9kZTogY2MuTm9kZSxcbiAgICAgICAgcHJvY2Vzc0xhYmVsTm9kZTogY2MuTm9kZSxcbiAgICAgICAgaWNvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGljb25MYWJlbE5vZGU6IGNjLk5vZGUsXG4gICAgICAgIG5hbWVMYWJlbE5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGxvY2tlZEljb25TcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWUsXG5cbiAgICAgICAgc2VjdGlvbktleTogbnVsbCxcbiAgICAgICAgY29uZmlnOiBudWxsLFxuICAgICAgICBtYWlsSW5mbzogbnVsbCxcblxuICAgICAgICBzZWxlY3RTZWN0aW9uVUlOb2RlOiBudWxsXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkICgpIHtcbiAgICB9LFxuXG4gICAgc3RhcnQgKCkge1xuICAgICAgICBpZiAodGhpcy5zZWN0aW9uS2V5ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXR1cERhdGEoKVxuICAgICAgICAvLyB0aGlzLm5hbWVMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmNvbmZpZy5zZWN0aW9uRGVzY3JpcFxuICAgICAgICB0aGlzLm5hbWVMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKS5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSh0aGlzLmNvbmZpZy5zZWN0aW9uVGl0bGVUZXh0SWQpXG4gICAgICAgIHRoaXMuaWNvbkxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuc2VjdGlvbktleVxuXG4gICAgICAgIGlmIChwYXJzZUludCh0aGlzLnNlY3Rpb25LZXkpID4gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5jdXJyZW50U2VjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5pY29uTm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubG9ja2VkSWNvblNwcml0ZUZyYW1lXG4gICAgICAgICAgICB0aGlzLm5hbWVMYWJlbE5vZGUuY29sb3IgPSBjYy5jb2xvcigpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByb2Nlc3NMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLm1haWxJbmZvLnNlbmROdW0udG9TdHJpbmcoKSArIFwiIC8gXCIgKyB0aGlzLm1haWxJbmZvLnRvdGFsTnVtLnRvU3RyaW5nKClcbiAgICAgICAgdGhpcy5wcm9jZXNzQmFyTm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gdGhpcy5tYWlsSW5mby5zZW5kTnVtIC8gdGhpcy5tYWlsSW5mby50b3RhbE51bVxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbiAgICBzZXR1cERhdGEoKSB7XG4gICAgICAgIHZhciBzZWN0aW9uQ29uZmlnID0gcmVxdWlyZShcInNlY3Rpb25Db25maWdcIilcbiAgICAgICAgdGhpcy5jb25maWcgPSBzZWN0aW9uQ29uZmlnW3RoaXMuc2VjdGlvbktleV1cbiAgICAgICAgdmFyIG1haWxJZHNTaG91bGRUb1NlbmQgPSBbXVxuICAgICAgICB2YXIgbGV2ZWxzID0gdGhpcy5jb25maWcubGV2ZWxzXG4gICAgICAgIHZhciBtYWlsU3lzQ29uZmlnID0gcmVxdWlyZShcIm1haWxTeXNDb25maWdcIilcbiAgICAgICAgZm9yICh2YXIgdGFnIGluIG1haWxTeXNDb25maWcpIHtcbiAgICAgICAgICAgIHZhciBjb25kaXRpb25zID0gbWFpbFN5c0NvbmZpZ1t0YWddLmNvbmRpdGlvbnNcbiAgICAgICAgICAgIGZvciAodmFyIGluZGV4IGluIGNvbmRpdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgb25lQ29uZGl0aW9uID0gY29uZGl0aW9uc1tpbmRleF1cbiAgICAgICAgICAgICAgICB2YXIgY29uZGl0aW9uVHlwZSA9IG9uZUNvbmRpdGlvbi5jb25kaXRpb25UeXBlXG4gICAgICAgICAgICAgICAgdmFyIGNvbmRpdGlvblBhcmEgPSBvbmVDb25kaXRpb24uY29uZGl0aW9uUGFyYVxuICAgICAgICAgICAgICAgIGlmIChjb25kaXRpb25UeXBlID09IDEgJiYgbGV2ZWxzLmluZGV4T2YoY29uZGl0aW9uUGFyYSkgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbElkc1Nob3VsZFRvU2VuZC5wdXNoKG9uZUNvbmRpdGlvbi5tYWlsSWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbmRpdGlvblR5cGUgPT0gMiAmJiBsZXZlbHMuaW5kZXhPZihjb25kaXRpb25QYXJhLmxldmVsSWQpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIG1haWxJZHNTaG91bGRUb1NlbmQucHVzaChvbmVDb25kaXRpb24ubWFpbElkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b3RhbE1haWxOdW0gPSBtYWlsSWRzU2hvdWxkVG9TZW5kLmxlbmd0aFxuICAgICAgICB2YXIgc2VuZE1haWxOdW0gPSAwXG4gICAgICAgIGlmICh0b3RhbE1haWxOdW0gPiAwKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudE1haWxJZHMgPSBPYmplY3Qua2V5cyhyZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLm1haWxzKVxuICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gbWFpbElkc1Nob3VsZFRvU2VuZCkge1xuICAgICAgICAgICAgICAgIHZhciBvbmVNYWlsSWQgPSBtYWlsSWRzU2hvdWxkVG9TZW5kW2luZGV4XVxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50TWFpbElkcy5pbmRleE9mKG9uZU1haWxJZC50b1N0cmluZygpKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBzZW5kTWFpbE51bSArPSAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICB0b3RhbE51bTogdG90YWxNYWlsTnVtLFxuICAgICAgICAgICAgc2VuZE51bTogc2VuZE1haWxOdW1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1haWxJbmZvID0gcmVzdWx0XG4gICAgfSxcblxuICAgIG9uQ2xpY2soKSB7XG5cbiAgICAgICAgaWYgKHBhcnNlSW50KHRoaXMuc2VjdGlvbktleSkgPiByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgICAgICByZXF1aXJlKFwibm90aWZpY2F0aW9uTWdyXCIpLnNob3dOb3RpKHJlcXVpcmUoXCJ0ZXh0Q29uZmlnXCIpLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDE1OCkpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwYXJzZUludCh0aGlzLnNlY3Rpb25LZXkpIDw9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuY3VycmVudFNlY3Rpb24gKSB7XG4gICAgICAgICAgICB2YXIgbWFpblNjZW5lTWdyID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZShcIkNhbnZhc1wiKS5nZXRDb21wb25lbnQoXCJtYWluU2NlbmVNZ3JcIilcbiAgICAgICAgICAgIGlmIChtYWluU2NlbmVNZ3IgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcIueOsOWcqOS4jeaYr+S4u+eVjOmdou+8jOaXoOazlemAieaLqeeroOiKgu+8jOi/meenjeaDheWGteW6lOivpeS4jeS8muWHuueOsOeahOaJjeWvue+8gVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYocGFyc2VJbnQodGhpcy5zZWN0aW9uS2V5KSAhPSBtYWluU2NlbmVNZ3Iuc2VsZWN0ZWRTZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIG1haW5TY2VuZU1nci5zZWxlY3RlZFNlY3Rpb24gPSBwYXJzZUludCh0aGlzLnNlY3Rpb25LZXkpXG4gICAgICAgICAgICAgICAgICAgIG1haW5TY2VuZU1nci5zZXR1cFNlY3Rpb25QZXJmb3JtYW5jZSgpXG4gICAgICAgICAgICAgICAgICAgIG1haW5TY2VuZU1nci5wbGF5QmdtKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXF1aXJlKFwic3lzdGVtc01nclwiKS5jbG9zZVN5c3RlbShcInNlbGVjdFNlY3Rpb25TeXNcIilcbiAgICB9XG59KTtcbiJdfQ==