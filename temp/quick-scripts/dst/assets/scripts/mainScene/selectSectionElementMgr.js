
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
      this.iconNode.getComponent(cc.Sprite).spriteFrame = this.lockedIconSpriteFrame; //this.nameLabelNode.color = cc.color()
    } else {//this.nameLabelNode.color = cc.color()
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
          require("bgmMgr").selectedSection = this.sectionKey;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL21haW5TY2VuZS9zZWxlY3RTZWN0aW9uRWxlbWVudE1nci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInByb2Nlc3NCYXJOb2RlIiwiTm9kZSIsInByb2Nlc3NMYWJlbE5vZGUiLCJpY29uTm9kZSIsImljb25MYWJlbE5vZGUiLCJuYW1lTGFiZWxOb2RlIiwibG9ja2VkSWNvblNwcml0ZUZyYW1lIiwiU3ByaXRlRnJhbWUiLCJzZWN0aW9uS2V5IiwiY29uZmlnIiwibWFpbEluZm8iLCJzZWxlY3RTZWN0aW9uVUlOb2RlIiwib25Mb2FkIiwic3RhcnQiLCJzZXR1cERhdGEiLCJnZXRDb21wb25lbnQiLCJMYWJlbCIsInN0cmluZyIsInJlcXVpcmUiLCJnZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSIsInNlY3Rpb25UaXRsZVRleHRJZCIsInBhcnNlSW50IiwicGxheWVyRGF0YSIsImN1cnJlbnRTZWN0aW9uIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJzZW5kTnVtIiwidG9TdHJpbmciLCJ0b3RhbE51bSIsIlByb2dyZXNzQmFyIiwicHJvZ3Jlc3MiLCJzZWN0aW9uQ29uZmlnIiwibWFpbElkc1Nob3VsZFRvU2VuZCIsImxldmVscyIsIm1haWxTeXNDb25maWciLCJ0YWciLCJjb25kaXRpb25zIiwiaW5kZXgiLCJvbmVDb25kaXRpb24iLCJjb25kaXRpb25UeXBlIiwiY29uZGl0aW9uUGFyYSIsImluZGV4T2YiLCJwdXNoIiwibWFpbElkIiwibGV2ZWxJZCIsInRvdGFsTWFpbE51bSIsImxlbmd0aCIsInNlbmRNYWlsTnVtIiwiY3VycmVudE1haWxJZHMiLCJPYmplY3QiLCJrZXlzIiwibWFpbHMiLCJvbmVNYWlsSWQiLCJyZXN1bHQiLCJvbkNsaWNrIiwic2hvd05vdGkiLCJtYWluU2NlbmVNZ3IiLCJkaXJlY3RvciIsImdldFNjZW5lIiwiZ2V0Q2hpbGRCeU5hbWUiLCJsb2ci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QUFRLENBQUMsS0FBS2IsVUFBTixDQUF2QztBQUNBZ0QsVUFBQUEsWUFBWSxDQUFDTSx1QkFBYjtBQUNBNUMsVUFBQUEsT0FBTyxDQUFDLFFBQUQsQ0FBUCxDQUFrQjJDLGVBQWxCLEdBQW9DLEtBQUtyRCxVQUF6QztBQUNIO0FBQ0o7QUFDSjs7QUFFRFUsSUFBQUEsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQjZDLFdBQXRCLENBQWtDLGtCQUFsQztBQUNIO0FBekhJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICAgICAgcHJvY2Vzc0Jhck5vZGU6IGNjLk5vZGUsXG4gICAgICAgIHByb2Nlc3NMYWJlbE5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGljb25Ob2RlOiBjYy5Ob2RlLFxuICAgICAgICBpY29uTGFiZWxOb2RlOiBjYy5Ob2RlLFxuICAgICAgICBuYW1lTGFiZWxOb2RlOiBjYy5Ob2RlLFxuICAgICAgICBsb2NrZWRJY29uU3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lLFxuXG4gICAgICAgIHNlY3Rpb25LZXk6IG51bGwsXG4gICAgICAgIGNvbmZpZzogbnVsbCxcbiAgICAgICAgbWFpbEluZm86IG51bGwsXG5cbiAgICAgICAgc2VsZWN0U2VjdGlvblVJTm9kZTogbnVsbFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgfSxcblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VjdGlvbktleSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0dXBEYXRhKClcbiAgICAgICAgLy8gdGhpcy5uYW1lTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5jb25maWcuc2VjdGlvbkRlc2NyaXBcbiAgICAgICAgdGhpcy5uYW1lTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVxdWlyZShcInRleHRDb25maWdcIikuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUodGhpcy5jb25maWcuc2VjdGlvblRpdGxlVGV4dElkKVxuICAgICAgICB0aGlzLmljb25MYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLnNlY3Rpb25LZXlcblxuICAgICAgICBpZiAocGFyc2VJbnQodGhpcy5zZWN0aW9uS2V5KSA+IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuaWNvbk5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmxvY2tlZEljb25TcHJpdGVGcmFtZVxuICAgICAgICAgICAgLy90aGlzLm5hbWVMYWJlbE5vZGUuY29sb3IgPSBjYy5jb2xvcigpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvL3RoaXMubmFtZUxhYmVsTm9kZS5jb2xvciA9IGNjLmNvbG9yKClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJvY2Vzc0xhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMubWFpbEluZm8uc2VuZE51bS50b1N0cmluZygpICsgXCIgLyBcIiArIHRoaXMubWFpbEluZm8udG90YWxOdW0udG9TdHJpbmcoKVxuICAgICAgICB0aGlzLnByb2Nlc3NCYXJOb2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPSB0aGlzLm1haWxJbmZvLnNlbmROdW0gLyB0aGlzLm1haWxJbmZvLnRvdGFsTnVtXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxuICAgIHNldHVwRGF0YSgpIHtcbiAgICAgICAgdmFyIHNlY3Rpb25Db25maWcgPSByZXF1aXJlKFwic2VjdGlvbkNvbmZpZ1wiKVxuICAgICAgICB0aGlzLmNvbmZpZyA9IHNlY3Rpb25Db25maWdbdGhpcy5zZWN0aW9uS2V5XVxuICAgICAgICB2YXIgbWFpbElkc1Nob3VsZFRvU2VuZCA9IFtdXG4gICAgICAgIHZhciBsZXZlbHMgPSB0aGlzLmNvbmZpZy5sZXZlbHNcbiAgICAgICAgdmFyIG1haWxTeXNDb25maWcgPSByZXF1aXJlKFwibWFpbFN5c0NvbmZpZ1wiKVxuICAgICAgICBmb3IgKHZhciB0YWcgaW4gbWFpbFN5c0NvbmZpZykge1xuICAgICAgICAgICAgdmFyIGNvbmRpdGlvbnMgPSBtYWlsU3lzQ29uZmlnW3RhZ10uY29uZGl0aW9uc1xuICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gY29uZGl0aW9ucykge1xuICAgICAgICAgICAgICAgIHZhciBvbmVDb25kaXRpb24gPSBjb25kaXRpb25zW2luZGV4XVxuICAgICAgICAgICAgICAgIHZhciBjb25kaXRpb25UeXBlID0gb25lQ29uZGl0aW9uLmNvbmRpdGlvblR5cGVcbiAgICAgICAgICAgICAgICB2YXIgY29uZGl0aW9uUGFyYSA9IG9uZUNvbmRpdGlvbi5jb25kaXRpb25QYXJhXG4gICAgICAgICAgICAgICAgaWYgKGNvbmRpdGlvblR5cGUgPT0gMSAmJiBsZXZlbHMuaW5kZXhPZihjb25kaXRpb25QYXJhKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBtYWlsSWRzU2hvdWxkVG9TZW5kLnB1c2gob25lQ29uZGl0aW9uLm1haWxJZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29uZGl0aW9uVHlwZSA9PSAyICYmIGxldmVscy5pbmRleE9mKGNvbmRpdGlvblBhcmEubGV2ZWxJZCkgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbElkc1Nob3VsZFRvU2VuZC5wdXNoKG9uZUNvbmRpdGlvbi5tYWlsSWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRvdGFsTWFpbE51bSA9IG1haWxJZHNTaG91bGRUb1NlbmQubGVuZ3RoXG4gICAgICAgIHZhciBzZW5kTWFpbE51bSA9IDBcbiAgICAgICAgaWYgKHRvdGFsTWFpbE51bSA+IDApIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50TWFpbElkcyA9IE9iamVjdC5rZXlzKHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEubWFpbHMpXG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBtYWlsSWRzU2hvdWxkVG9TZW5kKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9uZU1haWxJZCA9IG1haWxJZHNTaG91bGRUb1NlbmRbaW5kZXhdXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRNYWlsSWRzLmluZGV4T2Yob25lTWFpbElkLnRvU3RyaW5nKCkpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbmRNYWlsTnVtICs9IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgIHRvdGFsTnVtOiB0b3RhbE1haWxOdW0sXG4gICAgICAgICAgICBzZW5kTnVtOiBzZW5kTWFpbE51bVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubWFpbEluZm8gPSByZXN1bHRcbiAgICB9LFxuXG4gICAgb25DbGljaygpIHtcblxuICAgICAgICBpZiAocGFyc2VJbnQodGhpcy5zZWN0aW9uS2V5KSA+IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgICAgIHJlcXVpcmUoXCJub3RpZmljYXRpb25NZ3JcIikuc2hvd05vdGkocmVxdWlyZShcInRleHRDb25maWdcIikuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTU4KSlcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBhcnNlSW50KHRoaXMuc2VjdGlvbktleSkgPD0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5jdXJyZW50U2VjdGlvbiApIHtcbiAgICAgICAgICAgIHZhciBtYWluU2NlbmVNZ3IgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudChcIm1haW5TY2VuZU1nclwiKVxuICAgICAgICAgICAgaWYgKG1haW5TY2VuZU1nciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwi546w5Zyo5LiN5piv5Li755WM6Z2i77yM5peg5rOV6YCJ5oup56ug6IqC77yM6L+Z56eN5oOF5Ya15bqU6K+l5LiN5Lya5Ye6546w55qE5omN5a+577yBXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZihwYXJzZUludCh0aGlzLnNlY3Rpb25LZXkpICE9IG1haW5TY2VuZU1nci5zZWxlY3RlZFNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgbWFpblNjZW5lTWdyLnNlbGVjdGVkU2VjdGlvbiA9IHBhcnNlSW50KHRoaXMuc2VjdGlvbktleSlcbiAgICAgICAgICAgICAgICAgICAgbWFpblNjZW5lTWdyLnNldHVwU2VjdGlvblBlcmZvcm1hbmNlKClcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShcImJnbU1nclwiKS5zZWxlY3RlZFNlY3Rpb24gPSB0aGlzLnNlY3Rpb25LZXlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXF1aXJlKFwic3lzdGVtc01nclwiKS5jbG9zZVN5c3RlbShcInNlbGVjdFNlY3Rpb25TeXNcIilcbiAgICB9XG59KTtcbiJdfQ==