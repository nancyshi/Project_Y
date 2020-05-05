
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/mainScene/levelNodeMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a65daQfIs1AIaVJClbi9PqX', 'levelNodeMgr');
// scripts/mainScene/levelNodeMgr.js

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
    status: {
      get: function get() {
        return this._status;
      },
      set: function set(value) {
        this._status = value;

        if (value == 0 || value == 2) {
          this.node.getComponent(cc.Sprite).spriteFrame = this.graySpriteFrame;
        }

        if (value == 2) {
          this.isRecommanded = true;
        }
      }
    },
    //0 = locked, 1 = unlocked, 2 = current
    levelNumLabelNode: cc.Node,
    mailTagNode: cc.Node,
    selectedEffectNode: cc.Node,
    graySpriteFrame: cc.SpriteFrame,
    mailTagSendSpriteFrame: cc.SpriteFrame,
    delegate: null,
    level: null,
    preChanllengeUIPrefab: cc.Prefab,
    preChanllengeUIOpend: false,
    isRecommanded: {
      get: function get() {
        return this._isRecommanded;
      },
      set: function set(value) {
        this._isRecommanded = value;

        if (value == true) {
          this.selectedEffectNode.active = true;
        }
      }
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    cc.tween(this.selectedEffectNode).repeatForever(cc.tween().to(0.5, {
      opacity: 0
    }).to(0.5, {
      opacity: 255
    })).start(); //this.setupMailTag()
  },
  start: function start() {},
  onClick: function onClick() {
    if (this.status == 0) {
      var str = require("textConfig").getTextByIdAndLanguageType(168);

      require("notificationMgr").pushNoti(str);

      return;
    }

    this.openPreChanllengeUI();
  },
  openPreChanllengeUI: function openPreChanllengeUI() {
    if (this.preChanllengeUIOpend == true) {
      return;
    }

    var ui = cc.instantiate(this.preChanllengeUIPrefab);
    var mgr = ui.getComponent("preChallengeUIMgr");
    mgr.level = this.level;
    mgr.levelStatus = this.status;
    mgr.delegate = this;
    cc.director.getScene().getChildByName("Canvas").addChild(ui);
    this.preChanllengeUIOpend = true;
  },
  setupMailTag: function setupMailTag() {
    var result = this._checkLevelMailTagStatus();

    if (result != false) {
      var mailHasSend = result[1];
      var mailTagWillShow = result[0];

      if (mailHasSend == true) {
        this.mailTagNode.getComponent(cc.Sprite).spriteFrame = this.mailTagSendSpriteFrame;
      }

      if (mailTagWillShow == true) {
        this.mailTagNode.active = true;
      }
    }
  },
  _checkLevelMailTagStatus: function _checkLevelMailTagStatus() {
    var mailSysConfig = require("mailSysConfig");

    var mailTagWillShow = false;
    var mailHasSend = false;

    for (var tag in mailSysConfig) {
      var conditions = mailSysConfig[tag].conditions;

      for (var index in conditions) {
        var oneElement = conditions[index];
        var conditionType = oneElement.conditionType;
        var conditionPara = oneElement.conditionPara;

        if (conditionType == 1) {
          if (conditionPara == this.level) {
            mailTagWillShow = true;

            var currentConditionIndex = require("dataMgr").playerData.mailConditionIndex[tag];

            if (this.level == 2) {
              cc.log(index, currentConditionIndex);
            }

            if (index < currentConditionIndex || currentConditionIndex == -1) {
              mailHasSend = true;
            }

            return [mailTagWillShow, mailHasSend];
          }
        } else if (conditionType == 2) {
          if (conditionPara.levelId == this.level) {
            mailTagWillShow = true;
          }

          var currentConditionIndex = require("dataMgr").playerData.mailConditionIndex[tag];

          if (index < currentConditionIndex || currentConditionIndex == -1) {
            mailHasSend = true;
          }

          return [mailTagWillShow, mailHasSend];
        }
      }
    }

    return false;
  },
  dataMonitored: function dataMonitored(key, value) {} // var mailConfig = require("mailConfig")
  // var mailIds = Object.keys(mailConfig)
  // if (mailIds.indexOf(key) != -1) {
  //     this.setupMailTag()
  // }
  // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL21haW5TY2VuZS9sZXZlbE5vZGVNZ3IuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGF0dXMiLCJnZXQiLCJfc3RhdHVzIiwic2V0IiwidmFsdWUiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJncmF5U3ByaXRlRnJhbWUiLCJpc1JlY29tbWFuZGVkIiwibGV2ZWxOdW1MYWJlbE5vZGUiLCJOb2RlIiwibWFpbFRhZ05vZGUiLCJzZWxlY3RlZEVmZmVjdE5vZGUiLCJTcHJpdGVGcmFtZSIsIm1haWxUYWdTZW5kU3ByaXRlRnJhbWUiLCJkZWxlZ2F0ZSIsImxldmVsIiwicHJlQ2hhbmxsZW5nZVVJUHJlZmFiIiwiUHJlZmFiIiwicHJlQ2hhbmxsZW5nZVVJT3BlbmQiLCJfaXNSZWNvbW1hbmRlZCIsImFjdGl2ZSIsIm9uTG9hZCIsInR3ZWVuIiwicmVwZWF0Rm9yZXZlciIsInRvIiwib3BhY2l0eSIsInN0YXJ0Iiwib25DbGljayIsInN0ciIsInJlcXVpcmUiLCJnZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSIsInB1c2hOb3RpIiwib3BlblByZUNoYW5sbGVuZ2VVSSIsInVpIiwiaW5zdGFudGlhdGUiLCJtZ3IiLCJsZXZlbFN0YXR1cyIsImRpcmVjdG9yIiwiZ2V0U2NlbmUiLCJnZXRDaGlsZEJ5TmFtZSIsImFkZENoaWxkIiwic2V0dXBNYWlsVGFnIiwicmVzdWx0IiwiX2NoZWNrTGV2ZWxNYWlsVGFnU3RhdHVzIiwibWFpbEhhc1NlbmQiLCJtYWlsVGFnV2lsbFNob3ciLCJtYWlsU3lzQ29uZmlnIiwidGFnIiwiY29uZGl0aW9ucyIsImluZGV4Iiwib25lRWxlbWVudCIsImNvbmRpdGlvblR5cGUiLCJjb25kaXRpb25QYXJhIiwiY3VycmVudENvbmRpdGlvbkluZGV4IiwicGxheWVyRGF0YSIsIm1haWxDb25kaXRpb25JbmRleCIsImxvZyIsImxldmVsSWQiLCJkYXRhTW9uaXRvcmVkIiwia2V5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsTUFBTSxFQUFFO0FBQ0pDLE1BQUFBLEdBREksaUJBQ0U7QUFDRixlQUFPLEtBQUtDLE9BQVo7QUFDSCxPQUhHO0FBSUpDLE1BQUFBLEdBSkksZUFJQUMsS0FKQSxFQUlPO0FBQ1AsYUFBS0YsT0FBTCxHQUFlRSxLQUFmOztBQUNBLFlBQUdBLEtBQUssSUFBSSxDQUFULElBQWNBLEtBQUssSUFBSSxDQUExQixFQUE2QjtBQUN6QixlQUFLQyxJQUFMLENBQVVDLFlBQVYsQ0FBdUJWLEVBQUUsQ0FBQ1csTUFBMUIsRUFBa0NDLFdBQWxDLEdBQWdELEtBQUtDLGVBQXJEO0FBQ0g7O0FBQ0QsWUFBSUwsS0FBSyxJQUFJLENBQWIsRUFBZ0I7QUFDWixlQUFLTSxhQUFMLEdBQXFCLElBQXJCO0FBQ0g7QUFDSjtBQVpHLEtBaEJBO0FBNkJMO0FBQ0hDLElBQUFBLGlCQUFpQixFQUFFZixFQUFFLENBQUNnQixJQTlCZDtBQStCUkMsSUFBQUEsV0FBVyxFQUFFakIsRUFBRSxDQUFDZ0IsSUEvQlI7QUFnQ1JFLElBQUFBLGtCQUFrQixFQUFFbEIsRUFBRSxDQUFDZ0IsSUFoQ2Y7QUFpQ1JILElBQUFBLGVBQWUsRUFBRWIsRUFBRSxDQUFDbUIsV0FqQ1o7QUFrQ1JDLElBQUFBLHNCQUFzQixFQUFFcEIsRUFBRSxDQUFDbUIsV0FsQ25CO0FBbUNSRSxJQUFBQSxRQUFRLEVBQUUsSUFuQ0Y7QUFvQ1JDLElBQUFBLEtBQUssRUFBRSxJQXBDQztBQXFDUkMsSUFBQUEscUJBQXFCLEVBQUV2QixFQUFFLENBQUN3QixNQXJDbEI7QUFzQ1JDLElBQUFBLG9CQUFvQixFQUFFLEtBdENkO0FBdUNSWCxJQUFBQSxhQUFhLEVBQUU7QUFDWFQsTUFBQUEsR0FEVyxpQkFDTDtBQUNGLGVBQU8sS0FBS3FCLGNBQVo7QUFDSCxPQUhVO0FBSVhuQixNQUFBQSxHQUpXLGVBSVBDLEtBSk8sRUFJQTtBQUNQLGFBQUtrQixjQUFMLEdBQXNCbEIsS0FBdEI7O0FBQ0EsWUFBSUEsS0FBSyxJQUFJLElBQWIsRUFBbUI7QUFDZixlQUFLVSxrQkFBTCxDQUF3QlMsTUFBeEIsR0FBaUMsSUFBakM7QUFDSDtBQUNKO0FBVFU7QUF2Q1AsR0FIUDtBQXVETDtBQUVBQyxFQUFBQSxNQXpESyxvQkF5REs7QUFDTjVCLElBQUFBLEVBQUUsQ0FBQzZCLEtBQUgsQ0FBUyxLQUFLWCxrQkFBZCxFQUNLWSxhQURMLENBQ21COUIsRUFBRSxDQUFDNkIsS0FBSCxHQUFXRSxFQUFYLENBQWMsR0FBZCxFQUFrQjtBQUFDQyxNQUFBQSxPQUFPLEVBQUM7QUFBVCxLQUFsQixFQUErQkQsRUFBL0IsQ0FBa0MsR0FBbEMsRUFBc0M7QUFBQ0MsTUFBQUEsT0FBTyxFQUFFO0FBQVYsS0FBdEMsQ0FEbkIsRUFFS0MsS0FGTCxHQURNLENBSU47QUFDSCxHQTlESTtBQWdFTEEsRUFBQUEsS0FoRUssbUJBZ0VJLENBRVIsQ0FsRUk7QUFvRUxDLEVBQUFBLE9BcEVLLHFCQW9FSztBQUNOLFFBQUksS0FBSzlCLE1BQUwsSUFBZSxDQUFuQixFQUFzQjtBQUNsQixVQUFJK0IsR0FBRyxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCQywwQkFBdEIsQ0FBaUQsR0FBakQsQ0FBVjs7QUFDQUQsTUFBQUEsT0FBTyxDQUFDLGlCQUFELENBQVAsQ0FBMkJFLFFBQTNCLENBQW9DSCxHQUFwQzs7QUFDQTtBQUNIOztBQUNELFNBQUtJLG1CQUFMO0FBQ0gsR0EzRUk7QUE2RUxBLEVBQUFBLG1CQTdFSyxpQ0E2RWlCO0FBQ2xCLFFBQUksS0FBS2Qsb0JBQUwsSUFBNkIsSUFBakMsRUFBdUM7QUFDbkM7QUFDSDs7QUFFRCxRQUFJZSxFQUFFLEdBQUd4QyxFQUFFLENBQUN5QyxXQUFILENBQWUsS0FBS2xCLHFCQUFwQixDQUFUO0FBQ0EsUUFBSW1CLEdBQUcsR0FBR0YsRUFBRSxDQUFDOUIsWUFBSCxDQUFnQixtQkFBaEIsQ0FBVjtBQUNBZ0MsSUFBQUEsR0FBRyxDQUFDcEIsS0FBSixHQUFZLEtBQUtBLEtBQWpCO0FBQ0FvQixJQUFBQSxHQUFHLENBQUNDLFdBQUosR0FBa0IsS0FBS3ZDLE1BQXZCO0FBQ0FzQyxJQUFBQSxHQUFHLENBQUNyQixRQUFKLEdBQWUsSUFBZjtBQUVBckIsSUFBQUEsRUFBRSxDQUFDNEMsUUFBSCxDQUFZQyxRQUFaLEdBQXVCQyxjQUF2QixDQUFzQyxRQUF0QyxFQUFnREMsUUFBaEQsQ0FBeURQLEVBQXpEO0FBQ0EsU0FBS2Ysb0JBQUwsR0FBNEIsSUFBNUI7QUFDSCxHQTFGSTtBQTRGTHVCLEVBQUFBLFlBNUZLLDBCQTRGVTtBQUNYLFFBQUlDLE1BQU0sR0FBRyxLQUFLQyx3QkFBTCxFQUFiOztBQUNBLFFBQUlELE1BQU0sSUFBSSxLQUFkLEVBQXFCO0FBQ2pCLFVBQUlFLFdBQVcsR0FBR0YsTUFBTSxDQUFDLENBQUQsQ0FBeEI7QUFDQSxVQUFJRyxlQUFlLEdBQUdILE1BQU0sQ0FBQyxDQUFELENBQTVCOztBQUNBLFVBQUlFLFdBQVcsSUFBSSxJQUFuQixFQUF5QjtBQUNyQixhQUFLbEMsV0FBTCxDQUFpQlAsWUFBakIsQ0FBOEJWLEVBQUUsQ0FBQ1csTUFBakMsRUFBeUNDLFdBQXpDLEdBQXVELEtBQUtRLHNCQUE1RDtBQUNIOztBQUNELFVBQUlnQyxlQUFlLElBQUksSUFBdkIsRUFBNkI7QUFDekIsYUFBS25DLFdBQUwsQ0FBaUJVLE1BQWpCLEdBQTBCLElBQTFCO0FBQ0g7QUFDSjtBQUNKLEdBeEdJO0FBMEdMdUIsRUFBQUEsd0JBMUdLLHNDQTBHc0I7QUFDdkIsUUFBSUcsYUFBYSxHQUFHakIsT0FBTyxDQUFDLGVBQUQsQ0FBM0I7O0FBQ0EsUUFBSWdCLGVBQWUsR0FBRyxLQUF0QjtBQUNBLFFBQUlELFdBQVcsR0FBRyxLQUFsQjs7QUFDQSxTQUFLLElBQUlHLEdBQVQsSUFBZ0JELGFBQWhCLEVBQStCO0FBQzNCLFVBQUlFLFVBQVUsR0FBR0YsYUFBYSxDQUFDQyxHQUFELENBQWIsQ0FBbUJDLFVBQXBDOztBQUNBLFdBQUssSUFBSUMsS0FBVCxJQUFrQkQsVUFBbEIsRUFBOEI7QUFDMUIsWUFBSUUsVUFBVSxHQUFHRixVQUFVLENBQUNDLEtBQUQsQ0FBM0I7QUFDQSxZQUFJRSxhQUFhLEdBQUdELFVBQVUsQ0FBQ0MsYUFBL0I7QUFDQSxZQUFJQyxhQUFhLEdBQUdGLFVBQVUsQ0FBQ0UsYUFBL0I7O0FBRUEsWUFBSUQsYUFBYSxJQUFJLENBQXJCLEVBQXdCO0FBQ3BCLGNBQUlDLGFBQWEsSUFBSSxLQUFLckMsS0FBMUIsRUFBZ0M7QUFDNUI4QixZQUFBQSxlQUFlLEdBQUcsSUFBbEI7O0FBQ0EsZ0JBQUlRLHFCQUFxQixHQUFHeEIsT0FBTyxDQUFDLFNBQUQsQ0FBUCxDQUFtQnlCLFVBQW5CLENBQThCQyxrQkFBOUIsQ0FBaURSLEdBQWpELENBQTVCOztBQUNBLGdCQUFJLEtBQUtoQyxLQUFMLElBQWMsQ0FBbEIsRUFBcUI7QUFDakJ0QixjQUFBQSxFQUFFLENBQUMrRCxHQUFILENBQU9QLEtBQVAsRUFBY0kscUJBQWQ7QUFDSDs7QUFFRCxnQkFBSUosS0FBSyxHQUFHSSxxQkFBUixJQUFpQ0EscUJBQXFCLElBQUksQ0FBQyxDQUEvRCxFQUFpRTtBQUM3RFQsY0FBQUEsV0FBVyxHQUFHLElBQWQ7QUFDSDs7QUFFRCxtQkFBTyxDQUFDQyxlQUFELEVBQWlCRCxXQUFqQixDQUFQO0FBQ0g7QUFDSixTQWRELE1BZUssSUFBSU8sYUFBYSxJQUFJLENBQXJCLEVBQXdCO0FBQ3pCLGNBQUlDLGFBQWEsQ0FBQ0ssT0FBZCxJQUF5QixLQUFLMUMsS0FBbEMsRUFBeUM7QUFDckM4QixZQUFBQSxlQUFlLEdBQUcsSUFBbEI7QUFDSDs7QUFDRCxjQUFJUSxxQkFBcUIsR0FBR3hCLE9BQU8sQ0FBQyxTQUFELENBQVAsQ0FBbUJ5QixVQUFuQixDQUE4QkMsa0JBQTlCLENBQWlEUixHQUFqRCxDQUE1Qjs7QUFDQSxjQUFJRSxLQUFLLEdBQUdJLHFCQUFSLElBQWlDQSxxQkFBcUIsSUFBSSxDQUFDLENBQS9ELEVBQWtFO0FBQzlEVCxZQUFBQSxXQUFXLEdBQUcsSUFBZDtBQUNIOztBQUVELGlCQUFPLENBQUNDLGVBQUQsRUFBaUJELFdBQWpCLENBQVA7QUFDSDtBQUNKO0FBQ0o7O0FBQ0QsV0FBTyxLQUFQO0FBQ0gsR0FsSkk7QUFvSkxjLEVBQUFBLGFBcEpLLHlCQW9KU0MsR0FwSlQsRUFvSmExRCxLQXBKYixFQW9Kb0IsQ0FNeEIsQ0ExSkksQ0FxSkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVKOztBQTNKSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cHM6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgICAgIHN0YXR1czoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGF0dXNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0dXMgPSB2YWx1ZVxuICAgICAgICAgICAgICAgIGlmKHZhbHVlID09IDAgfHwgdmFsdWUgPT0gMikgeyAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmdyYXlTcHJpdGVGcmFtZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUmVjb21tYW5kZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAvLzAgPSBsb2NrZWQsIDEgPSB1bmxvY2tlZCwgMiA9IGN1cnJlbnRcbiAgICAgICAgbGV2ZWxOdW1MYWJlbE5vZGU6IGNjLk5vZGUsXG4gICAgICAgIG1haWxUYWdOb2RlOiBjYy5Ob2RlLFxuICAgICAgICBzZWxlY3RlZEVmZmVjdE5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGdyYXlTcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWUsXG4gICAgICAgIG1haWxUYWdTZW5kU3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lLFxuICAgICAgICBkZWxlZ2F0ZTogbnVsbCxcbiAgICAgICAgbGV2ZWw6IG51bGwsXG4gICAgICAgIHByZUNoYW5sbGVuZ2VVSVByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBwcmVDaGFubGxlbmdlVUlPcGVuZDogZmFsc2UsXG4gICAgICAgIGlzUmVjb21tYW5kZWQ6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faXNSZWNvbW1hbmRlZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzUmVjb21tYW5kZWQgPSB2YWx1ZVxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRFZmZlY3ROb2RlLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgY2MudHdlZW4odGhpcy5zZWxlY3RlZEVmZmVjdE5vZGUpXG4gICAgICAgICAgICAucmVwZWF0Rm9yZXZlcihjYy50d2VlbigpLnRvKDAuNSx7b3BhY2l0eTowfSkudG8oMC41LHtvcGFjaXR5OiAyNTV9KSlcbiAgICAgICAgICAgIC5zdGFydCgpXG4gICAgICAgIC8vdGhpcy5zZXR1cE1haWxUYWcoKVxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9LFxuXG4gICAgb25DbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIHZhciBzdHIgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKS5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxNjgpXG4gICAgICAgICAgICByZXF1aXJlKFwibm90aWZpY2F0aW9uTWdyXCIpLnB1c2hOb3RpKHN0cilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMub3BlblByZUNoYW5sbGVuZ2VVSSgpXG4gICAgfSxcblxuICAgIG9wZW5QcmVDaGFubGxlbmdlVUkoKSB7XG4gICAgICAgIGlmICh0aGlzLnByZUNoYW5sbGVuZ2VVSU9wZW5kID09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHVpID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVDaGFubGxlbmdlVUlQcmVmYWIpXG4gICAgICAgIHZhciBtZ3IgPSB1aS5nZXRDb21wb25lbnQoXCJwcmVDaGFsbGVuZ2VVSU1nclwiKVxuICAgICAgICBtZ3IubGV2ZWwgPSB0aGlzLmxldmVsXG4gICAgICAgIG1nci5sZXZlbFN0YXR1cyA9IHRoaXMuc3RhdHVzXG4gICAgICAgIG1nci5kZWxlZ2F0ZSA9IHRoaXNcblxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKFwiQ2FudmFzXCIpLmFkZENoaWxkKHVpKVxuICAgICAgICB0aGlzLnByZUNoYW5sbGVuZ2VVSU9wZW5kID0gdHJ1ZVxuICAgIH0sXG5cbiAgICBzZXR1cE1haWxUYWcoKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9jaGVja0xldmVsTWFpbFRhZ1N0YXR1cygpXG4gICAgICAgIGlmIChyZXN1bHQgIT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHZhciBtYWlsSGFzU2VuZCA9IHJlc3VsdFsxXVxuICAgICAgICAgICAgdmFyIG1haWxUYWdXaWxsU2hvdyA9IHJlc3VsdFswXVxuICAgICAgICAgICAgaWYgKG1haWxIYXNTZW5kID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1haWxUYWdOb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5tYWlsVGFnU2VuZFNwcml0ZUZyYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWFpbFRhZ1dpbGxTaG93ID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1haWxUYWdOb2RlLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfY2hlY2tMZXZlbE1haWxUYWdTdGF0dXMoKSB7XG4gICAgICAgIHZhciBtYWlsU3lzQ29uZmlnID0gcmVxdWlyZShcIm1haWxTeXNDb25maWdcIilcbiAgICAgICAgdmFyIG1haWxUYWdXaWxsU2hvdyA9IGZhbHNlXG4gICAgICAgIHZhciBtYWlsSGFzU2VuZCA9IGZhbHNlXG4gICAgICAgIGZvciAodmFyIHRhZyBpbiBtYWlsU3lzQ29uZmlnKSB7XG4gICAgICAgICAgICB2YXIgY29uZGl0aW9ucyA9IG1haWxTeXNDb25maWdbdGFnXS5jb25kaXRpb25zXG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBjb25kaXRpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9uZUVsZW1lbnQgPSBjb25kaXRpb25zW2luZGV4XVxuICAgICAgICAgICAgICAgIHZhciBjb25kaXRpb25UeXBlID0gb25lRWxlbWVudC5jb25kaXRpb25UeXBlXG4gICAgICAgICAgICAgICAgdmFyIGNvbmRpdGlvblBhcmEgPSBvbmVFbGVtZW50LmNvbmRpdGlvblBhcmFcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoY29uZGl0aW9uVHlwZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kaXRpb25QYXJhID09IHRoaXMubGV2ZWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbFRhZ1dpbGxTaG93ID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRDb25kaXRpb25JbmRleCA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEubWFpbENvbmRpdGlvbkluZGV4W3RhZ11cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVsID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coaW5kZXgsIGN1cnJlbnRDb25kaXRpb25JbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgY3VycmVudENvbmRpdGlvbkluZGV4IHx8IGN1cnJlbnRDb25kaXRpb25JbmRleCA9PSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbEhhc1NlbmQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbbWFpbFRhZ1dpbGxTaG93LG1haWxIYXNTZW5kXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbmRpdGlvblR5cGUgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZGl0aW9uUGFyYS5sZXZlbElkID09IHRoaXMubGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haWxUYWdXaWxsU2hvdyA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudENvbmRpdGlvbkluZGV4ID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5tYWlsQ29uZGl0aW9uSW5kZXhbdGFnXVxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCBjdXJyZW50Q29uZGl0aW9uSW5kZXggfHwgY3VycmVudENvbmRpdGlvbkluZGV4ID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWlsSGFzU2VuZCA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbbWFpbFRhZ1dpbGxTaG93LG1haWxIYXNTZW5kXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9LFxuXG4gICAgZGF0YU1vbml0b3JlZChrZXksdmFsdWUpIHtcbiAgICAgICAgLy8gdmFyIG1haWxDb25maWcgPSByZXF1aXJlKFwibWFpbENvbmZpZ1wiKVxuICAgICAgICAvLyB2YXIgbWFpbElkcyA9IE9iamVjdC5rZXlzKG1haWxDb25maWcpXG4gICAgICAgIC8vIGlmIChtYWlsSWRzLmluZGV4T2Yoa2V5KSAhPSAtMSkge1xuICAgICAgICAvLyAgICAgdGhpcy5zZXR1cE1haWxUYWcoKVxuICAgICAgICAvLyB9XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=