
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL21haW5TY2VuZS9zZWxlY3RTZWN0aW9uRWxlbWVudE1nci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInByb2Nlc3NCYXJOb2RlIiwiTm9kZSIsInByb2Nlc3NMYWJlbE5vZGUiLCJpY29uTm9kZSIsImljb25MYWJlbE5vZGUiLCJuYW1lTGFiZWxOb2RlIiwibG9ja2VkSWNvblNwcml0ZUZyYW1lIiwiU3ByaXRlRnJhbWUiLCJzZWN0aW9uS2V5IiwiY29uZmlnIiwibWFpbEluZm8iLCJzZWxlY3RTZWN0aW9uVUlOb2RlIiwib25Mb2FkIiwic3RhcnQiLCJzZXR1cERhdGEiLCJnZXRDb21wb25lbnQiLCJMYWJlbCIsInN0cmluZyIsInJlcXVpcmUiLCJnZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSIsInNlY3Rpb25UaXRsZVRleHRJZCIsInBhcnNlSW50IiwicGxheWVyRGF0YSIsImN1cnJlbnRTZWN0aW9uIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJzZW5kTnVtIiwidG9TdHJpbmciLCJ0b3RhbE51bSIsIlByb2dyZXNzQmFyIiwicHJvZ3Jlc3MiLCJzZWN0aW9uQ29uZmlnIiwibWFpbElkc1Nob3VsZFRvU2VuZCIsImxldmVscyIsIm1haWxTeXNDb25maWciLCJ0YWciLCJjb25kaXRpb25zIiwiaW5kZXgiLCJvbmVDb25kaXRpb24iLCJjb25kaXRpb25UeXBlIiwiY29uZGl0aW9uUGFyYSIsImluZGV4T2YiLCJwdXNoIiwibWFpbElkIiwibGV2ZWxJZCIsInRvdGFsTWFpbE51bSIsImxlbmd0aCIsInNlbmRNYWlsTnVtIiwiY3VycmVudE1haWxJZHMiLCJPYmplY3QiLCJrZXlzIiwibWFpbHMiLCJvbmVNYWlsSWQiLCJyZXN1bHQiLCJvbkNsaWNrIiwic2hvd05vdGkiLCJtYWluU2NlbmVNZ3IiLCJkaXJlY3RvciIsImdldFNjZW5lIiwiZ2V0Q2hpbGRCeU5hbWUiLCJsb2ciLCJzZWxlY3RlZFNlY3Rpb24iLCJzZXR1cFNlY3Rpb25QZXJmb3JtYW5jZSIsInBsYXlCZ20iLCJjbG9zZVN5c3RlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLElBQUFBLGNBQWMsRUFBRUosRUFBRSxDQUFDSyxJQWhCWDtBQWlCUkMsSUFBQUEsZ0JBQWdCLEVBQUVOLEVBQUUsQ0FBQ0ssSUFqQmI7QUFrQlJFLElBQUFBLFFBQVEsRUFBRVAsRUFBRSxDQUFDSyxJQWxCTDtBQW1CUkcsSUFBQUEsYUFBYSxFQUFFUixFQUFFLENBQUNLLElBbkJWO0FBb0JSSSxJQUFBQSxhQUFhLEVBQUVULEVBQUUsQ0FBQ0ssSUFwQlY7QUFxQlJLLElBQUFBLHFCQUFxQixFQUFFVixFQUFFLENBQUNXLFdBckJsQjtBQXVCUkMsSUFBQUEsVUFBVSxFQUFFLElBdkJKO0FBd0JSQyxJQUFBQSxNQUFNLEVBQUUsSUF4QkE7QUF5QlJDLElBQUFBLFFBQVEsRUFBRSxJQXpCRjtBQTJCUkMsSUFBQUEsbUJBQW1CLEVBQUU7QUEzQmIsR0FIUDtBQWlDTDtBQUVBQyxFQUFBQSxNQW5DSyxvQkFtQ0ssQ0FDVCxDQXBDSTtBQXNDTEMsRUFBQUEsS0F0Q0ssbUJBc0NJO0FBQ0wsUUFBSSxLQUFLTCxVQUFMLElBQW1CLElBQXZCLEVBQTZCO0FBQ3pCO0FBQ0g7O0FBRUQsU0FBS00sU0FBTCxHQUxLLENBTUw7O0FBQ0EsU0FBS1QsYUFBTCxDQUFtQlUsWUFBbkIsQ0FBZ0NuQixFQUFFLENBQUNvQixLQUFuQyxFQUEwQ0MsTUFBMUMsR0FBbURDLE9BQU8sQ0FBQyxZ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QXZDO0FBQ0FnRCxVQUFBQSxZQUFZLENBQUNNLHVCQUFiO0FBQ0FOLFVBQUFBLFlBQVksQ0FBQ08sT0FBYjtBQUNIO0FBQ0o7QUFDSjs7QUFFRDdDLElBQUFBLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0I4QyxXQUF0QixDQUFrQyxrQkFBbEM7QUFDSDtBQXJISSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cHM6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgICAgIHByb2Nlc3NCYXJOb2RlOiBjYy5Ob2RlLFxuICAgICAgICBwcm9jZXNzTGFiZWxOb2RlOiBjYy5Ob2RlLFxuICAgICAgICBpY29uTm9kZTogY2MuTm9kZSxcbiAgICAgICAgaWNvbkxhYmVsTm9kZTogY2MuTm9kZSxcbiAgICAgICAgbmFtZUxhYmVsTm9kZTogY2MuTm9kZSxcbiAgICAgICAgbG9ja2VkSWNvblNwcml0ZUZyYW1lOiBjYy5TcHJpdGVGcmFtZSxcblxuICAgICAgICBzZWN0aW9uS2V5OiBudWxsLFxuICAgICAgICBjb25maWc6IG51bGwsXG4gICAgICAgIG1haWxJbmZvOiBudWxsLFxuXG4gICAgICAgIHNlbGVjdFNlY3Rpb25VSU5vZGU6IG51bGxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlY3Rpb25LZXkgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldHVwRGF0YSgpXG4gICAgICAgIC8vIHRoaXMubmFtZUxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuY29uZmlnLnNlY3Rpb25EZXNjcmlwXG4gICAgICAgIHRoaXMubmFtZUxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJlcXVpcmUoXCJ0ZXh0Q29uZmlnXCIpLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKHRoaXMuY29uZmlnLnNlY3Rpb25UaXRsZVRleHRJZClcbiAgICAgICAgdGhpcy5pY29uTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5zZWN0aW9uS2V5XG5cbiAgICAgICAgaWYgKHBhcnNlSW50KHRoaXMuc2VjdGlvbktleSkgPiByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmljb25Ob2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5sb2NrZWRJY29uU3ByaXRlRnJhbWVcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJvY2Vzc0xhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMubWFpbEluZm8uc2VuZE51bS50b1N0cmluZygpICsgXCIgLyBcIiArIHRoaXMubWFpbEluZm8udG90YWxOdW0udG9TdHJpbmcoKVxuICAgICAgICB0aGlzLnByb2Nlc3NCYXJOb2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPSB0aGlzLm1haWxJbmZvLnNlbmROdW0gLyB0aGlzLm1haWxJbmZvLnRvdGFsTnVtXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxuICAgIHNldHVwRGF0YSgpIHtcbiAgICAgICAgdmFyIHNlY3Rpb25Db25maWcgPSByZXF1aXJlKFwic2VjdGlvbkNvbmZpZ1wiKVxuICAgICAgICB0aGlzLmNvbmZpZyA9IHNlY3Rpb25Db25maWdbdGhpcy5zZWN0aW9uS2V5XVxuICAgICAgICB2YXIgbWFpbElkc1Nob3VsZFRvU2VuZCA9IFtdXG4gICAgICAgIHZhciBsZXZlbHMgPSB0aGlzLmNvbmZpZy5sZXZlbHNcbiAgICAgICAgdmFyIG1haWxTeXNDb25maWcgPSByZXF1aXJlKFwibWFpbFN5c0NvbmZpZ1wiKVxuICAgICAgICBmb3IgKHZhciB0YWcgaW4gbWFpbFN5c0NvbmZpZykge1xuICAgICAgICAgICAgdmFyIGNvbmRpdGlvbnMgPSBtYWlsU3lzQ29uZmlnW3RhZ10uY29uZGl0aW9uc1xuICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gY29uZGl0aW9ucykge1xuICAgICAgICAgICAgICAgIHZhciBvbmVDb25kaXRpb24gPSBjb25kaXRpb25zW2luZGV4XVxuICAgICAgICAgICAgICAgIHZhciBjb25kaXRpb25UeXBlID0gb25lQ29uZGl0aW9uLmNvbmRpdGlvblR5cGVcbiAgICAgICAgICAgICAgICB2YXIgY29uZGl0aW9uUGFyYSA9IG9uZUNvbmRpdGlvbi5jb25kaXRpb25QYXJhXG4gICAgICAgICAgICAgICAgaWYgKGNvbmRpdGlvblR5cGUgPT0gMSAmJiBsZXZlbHMuaW5kZXhPZihjb25kaXRpb25QYXJhKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBtYWlsSWRzU2hvdWxkVG9TZW5kLnB1c2gob25lQ29uZGl0aW9uLm1haWxJZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29uZGl0aW9uVHlwZSA9PSAyICYmIGxldmVscy5pbmRleE9mKGNvbmRpdGlvblBhcmEubGV2ZWxJZCkgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbElkc1Nob3VsZFRvU2VuZC5wdXNoKG9uZUNvbmRpdGlvbi5tYWlsSWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRvdGFsTWFpbE51bSA9IG1haWxJZHNTaG91bGRUb1NlbmQubGVuZ3RoXG4gICAgICAgIHZhciBzZW5kTWFpbE51bSA9IDBcbiAgICAgICAgaWYgKHRvdGFsTWFpbE51bSA+IDApIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50TWFpbElkcyA9IE9iamVjdC5rZXlzKHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEubWFpbHMpXG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBtYWlsSWRzU2hvdWxkVG9TZW5kKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9uZU1haWxJZCA9IG1haWxJZHNTaG91bGRUb1NlbmRbaW5kZXhdXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRNYWlsSWRzLmluZGV4T2Yob25lTWFpbElkLnRvU3RyaW5nKCkpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbmRNYWlsTnVtICs9IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgIHRvdGFsTnVtOiB0b3RhbE1haWxOdW0sXG4gICAgICAgICAgICBzZW5kTnVtOiBzZW5kTWFpbE51bVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubWFpbEluZm8gPSByZXN1bHRcbiAgICB9LFxuXG4gICAgb25DbGljaygpIHtcblxuICAgICAgICBpZiAocGFyc2VJbnQodGhpcy5zZWN0aW9uS2V5KSA+IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgICAgIHJlcXVpcmUoXCJub3RpZmljYXRpb25NZ3JcIikuc2hvd05vdGkocmVxdWlyZShcInRleHRDb25maWdcIikuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTU4KSlcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBhcnNlSW50KHRoaXMuc2VjdGlvbktleSkgPD0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5jdXJyZW50U2VjdGlvbiApIHtcbiAgICAgICAgICAgIHZhciBtYWluU2NlbmVNZ3IgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudChcIm1haW5TY2VuZU1nclwiKVxuICAgICAgICAgICAgaWYgKG1haW5TY2VuZU1nciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwi546w5Zyo5LiN5piv5Li755WM6Z2i77yM5peg5rOV6YCJ5oup56ug6IqC77yM6L+Z56eN5oOF5Ya15bqU6K+l5LiN5Lya5Ye6546w55qE5omN5a+577yBXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZihwYXJzZUludCh0aGlzLnNlY3Rpb25LZXkpICE9IG1haW5TY2VuZU1nci5zZWxlY3RlZFNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgbWFpblNjZW5lTWdyLnNlbGVjdGVkU2VjdGlvbiA9IHBhcnNlSW50KHRoaXMuc2VjdGlvbktleSlcbiAgICAgICAgICAgICAgICAgICAgbWFpblNjZW5lTWdyLnNldHVwU2VjdGlvblBlcmZvcm1hbmNlKClcbiAgICAgICAgICAgICAgICAgICAgbWFpblNjZW5lTWdyLnBsYXlCZ20oKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVpcmUoXCJzeXN0ZW1zTWdyXCIpLmNsb3NlU3lzdGVtKFwic2VsZWN0U2VjdGlvblN5c1wiKVxuICAgIH1cbn0pO1xuIl19