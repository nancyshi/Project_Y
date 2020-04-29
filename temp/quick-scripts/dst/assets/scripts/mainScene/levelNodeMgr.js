
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
    })).start();
    this.setupMailTag();
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
  dataMonitored: function dataMonitored(key, value) {
    var mailConfig = require("mailConfig");

    var mailIds = Object.keys(mailConfig);

    if (mailIds.indexOf(key) != -1) {
      this.setupMailTag();
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL21haW5TY2VuZS9sZXZlbE5vZGVNZ3IuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGF0dXMiLCJnZXQiLCJfc3RhdHVzIiwic2V0IiwidmFsdWUiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJncmF5U3ByaXRlRnJhbWUiLCJpc1JlY29tbWFuZGVkIiwibGV2ZWxOdW1MYWJlbE5vZGUiLCJOb2RlIiwibWFpbFRhZ05vZGUiLCJzZWxlY3RlZEVmZmVjdE5vZGUiLCJTcHJpdGVGcmFtZSIsIm1haWxUYWdTZW5kU3ByaXRlRnJhbWUiLCJkZWxlZ2F0ZSIsImxldmVsIiwicHJlQ2hhbmxsZW5nZVVJUHJlZmFiIiwiUHJlZmFiIiwicHJlQ2hhbmxsZW5nZVVJT3BlbmQiLCJfaXNSZWNvbW1hbmRlZCIsImFjdGl2ZSIsIm9uTG9hZCIsInR3ZWVuIiwicmVwZWF0Rm9yZXZlciIsInRvIiwib3BhY2l0eSIsInN0YXJ0Iiwic2V0dXBNYWlsVGFnIiwib25DbGljayIsInN0ciIsInJlcXVpcmUiLCJnZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSIsInB1c2hOb3RpIiwib3BlblByZUNoYW5sbGVuZ2VVSSIsInVpIiwiaW5zdGFudGlhdGUiLCJtZ3IiLCJsZXZlbFN0YXR1cyIsImRpcmVjdG9yIiwiZ2V0U2NlbmUiLCJnZXRDaGlsZEJ5TmFtZSIsImFkZENoaWxkIiwicmVzdWx0IiwiX2NoZWNrTGV2ZWxNYWlsVGFnU3RhdHVzIiwibWFpbEhhc1NlbmQiLCJtYWlsVGFnV2lsbFNob3ciLCJtYWlsU3lzQ29uZmlnIiwidGFnIiwiY29uZGl0aW9ucyIsImluZGV4Iiwib25lRWxlbWVudCIsImNvbmRpdGlvblR5cGUiLCJjb25kaXRpb25QYXJhIiwiY3VycmVudENvbmRpdGlvbkluZGV4IiwicGxheWVyRGF0YSIsIm1haWxDb25kaXRpb25JbmRleCIsImxvZyIsImxldmVsSWQiLCJkYXRhTW9uaXRvcmVkIiwia2V5IiwibWFpbENvbmZpZyIsIm1haWxJZHMiLCJPYmplY3QiLCJrZXlzIiwiaW5kZXhPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLElBQUFBLE1BQU0sRUFBRTtBQUNKQyxNQUFBQSxHQURJLGlCQUNFO0FBQ0YsZUFBTyxLQUFLQyxPQUFaO0FBQ0gsT0FIRztBQUlKQyxNQUFBQSxHQUpJLGVBSUFDLEtBSkEsRUFJTztBQUNQLGFBQUtGLE9BQUwsR0FBZUUsS0FBZjs7QUFDQSxZQUFHQSxLQUFLLElBQUksQ0FBVCxJQUFjQSxLQUFLLElBQUksQ0FBMUIsRUFBNkI7QUFDekIsZUFBS0MsSUFBTCxDQUFVQyxZQUFWLENBQXVCVixFQUFFLENBQUNXLE1BQTFCLEVBQWtDQyxXQUFsQyxHQUFnRCxLQUFLQyxlQUFyRDtBQUNIOztBQUNELFlBQUlMLEtBQUssSUFBSSxDQUFiLEVBQWdCO0FBQ1osZUFBS00sYUFBTCxHQUFxQixJQUFyQjtBQUNIO0FBQ0o7QUFaRyxLQWhCQTtBQTZCTDtBQUNIQyxJQUFBQSxpQkFBaUIsRUFBRWYsRUFBRSxDQUFDZ0IsSUE5QmQ7QUErQlJDLElBQUFBLFdBQVcsRUFBRWpCLEVBQUUsQ0FBQ2dCLElBL0JSO0FBZ0NSRSxJQUFBQSxrQkFBa0IsRUFBRWxCLEVBQUUsQ0FBQ2dCLElBaENmO0FBaUNSSCxJQUFBQSxlQUFlLEVBQUViLEVBQUUsQ0FBQ21CLFdBakNaO0FBa0NSQyxJQUFBQSxzQkFBc0IsRUFBRXBCLEVBQUUsQ0FBQ21CLFdBbENuQjtBQW1D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QUFJQyxhQUFhLENBQUNLLE9BQWQsSUFBeUIsS0FBSzFDLEtBQWxDLEVBQXlDO0FBQ3JDOEIsWUFBQUEsZUFBZSxHQUFHLElBQWxCO0FBQ0g7O0FBQ0QsY0FBSVEscUJBQXFCLEdBQUd2QixPQUFPLENBQUMsU0FBRCxDQUFQLENBQW1Cd0IsVUFBbkIsQ0FBOEJDLGtCQUE5QixDQUFpRFIsR0FBakQsQ0FBNUI7O0FBQ0EsY0FBSUUsS0FBSyxHQUFHSSxxQkFBUixJQUFpQ0EscUJBQXFCLElBQUksQ0FBQyxDQUEvRCxFQUFrRTtBQUM5RFQsWUFBQUEsV0FBVyxHQUFHLElBQWQ7QUFDSDs7QUFFRCxpQkFBTyxDQUFDQyxlQUFELEVBQWlCRCxXQUFqQixDQUFQO0FBQ0g7QUFDSjtBQUNKOztBQUNELFdBQU8sS0FBUDtBQUNILEdBbEpJO0FBb0pMYyxFQUFBQSxhQXBKSyx5QkFvSlNDLEdBcEpULEVBb0phMUQsS0FwSmIsRUFvSm9CO0FBQ3JCLFFBQUkyRCxVQUFVLEdBQUc5QixPQUFPLENBQUMsWUFBRCxDQUF4Qjs7QUFDQSxRQUFJK0IsT0FBTyxHQUFHQyxNQUFNLENBQUNDLElBQVAsQ0FBWUgsVUFBWixDQUFkOztBQUNBLFFBQUlDLE9BQU8sQ0FBQ0csT0FBUixDQUFnQkwsR0FBaEIsS0FBd0IsQ0FBQyxDQUE3QixFQUFnQztBQUM1QixXQUFLaEMsWUFBTDtBQUNIO0FBQ0osR0ExSkksQ0EySkw7O0FBM0pLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICAgICAgc3RhdHVzOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXR1c1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXR1cyA9IHZhbHVlXG4gICAgICAgICAgICAgICAgaWYodmFsdWUgPT0gMCB8fCB2YWx1ZSA9PSAyKSB7ICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuZ3JheVNwcml0ZUZyYW1lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNSZWNvbW1hbmRlZCA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIC8vMCA9IGxvY2tlZCwgMSA9IHVubG9ja2VkLCAyID0gY3VycmVudFxuICAgICAgICBsZXZlbE51bUxhYmVsTm9kZTogY2MuTm9kZSxcbiAgICAgICAgbWFpbFRhZ05vZGU6IGNjLk5vZGUsXG4gICAgICAgIHNlbGVjdGVkRWZmZWN0Tm9kZTogY2MuTm9kZSxcbiAgICAgICAgZ3JheVNwcml0ZUZyYW1lOiBjYy5TcHJpdGVGcmFtZSxcbiAgICAgICAgbWFpbFRhZ1NlbmRTcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWUsXG4gICAgICAgIGRlbGVnYXRlOiBudWxsLFxuICAgICAgICBsZXZlbDogbnVsbCxcbiAgICAgICAgcHJlQ2hhbmxsZW5nZVVJUHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIHByZUNoYW5sbGVuZ2VVSU9wZW5kOiBmYWxzZSxcbiAgICAgICAgaXNSZWNvbW1hbmRlZDoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc1JlY29tbWFuZGVkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNSZWNvbW1hbmRlZCA9IHZhbHVlXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEVmZmVjdE5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICBjYy50d2Vlbih0aGlzLnNlbGVjdGVkRWZmZWN0Tm9kZSlcbiAgICAgICAgICAgIC5yZXBlYXRGb3JldmVyKGNjLnR3ZWVuKCkudG8oMC41LHtvcGFjaXR5OjB9KS50bygwLjUse29wYWNpdHk6IDI1NX0pKVxuICAgICAgICAgICAgLnN0YXJ0KClcbiAgICAgICAgdGhpcy5zZXR1cE1haWxUYWcoKVxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9LFxuXG4gICAgb25DbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIHZhciBzdHIgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKS5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxNjgpXG4gICAgICAgICAgICByZXF1aXJlKFwibm90aWZpY2F0aW9uTWdyXCIpLnB1c2hOb3RpKHN0cilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMub3BlblByZUNoYW5sbGVuZ2VVSSgpXG4gICAgfSxcblxuICAgIG9wZW5QcmVDaGFubGxlbmdlVUkoKSB7XG4gICAgICAgIGlmICh0aGlzLnByZUNoYW5sbGVuZ2VVSU9wZW5kID09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHVpID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVDaGFubGxlbmdlVUlQcmVmYWIpXG4gICAgICAgIHZhciBtZ3IgPSB1aS5nZXRDb21wb25lbnQoXCJwcmVDaGFsbGVuZ2VVSU1nclwiKVxuICAgICAgICBtZ3IubGV2ZWwgPSB0aGlzLmxldmVsXG4gICAgICAgIG1nci5sZXZlbFN0YXR1cyA9IHRoaXMuc3RhdHVzXG4gICAgICAgIG1nci5kZWxlZ2F0ZSA9IHRoaXNcblxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKFwiQ2FudmFzXCIpLmFkZENoaWxkKHVpKVxuICAgICAgICB0aGlzLnByZUNoYW5sbGVuZ2VVSU9wZW5kID0gdHJ1ZVxuICAgIH0sXG5cbiAgICBzZXR1cE1haWxUYWcoKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9jaGVja0xldmVsTWFpbFRhZ1N0YXR1cygpXG4gICAgICAgIGlmIChyZXN1bHQgIT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHZhciBtYWlsSGFzU2VuZCA9IHJlc3VsdFsxXVxuICAgICAgICAgICAgdmFyIG1haWxUYWdXaWxsU2hvdyA9IHJlc3VsdFswXVxuICAgICAgICAgICAgaWYgKG1haWxIYXNTZW5kID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1haWxUYWdOb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5tYWlsVGFnU2VuZFNwcml0ZUZyYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWFpbFRhZ1dpbGxTaG93ID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1haWxUYWdOb2RlLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfY2hlY2tMZXZlbE1haWxUYWdTdGF0dXMoKSB7XG4gICAgICAgIHZhciBtYWlsU3lzQ29uZmlnID0gcmVxdWlyZShcIm1haWxTeXNDb25maWdcIilcbiAgICAgICAgdmFyIG1haWxUYWdXaWxsU2hvdyA9IGZhbHNlXG4gICAgICAgIHZhciBtYWlsSGFzU2VuZCA9IGZhbHNlXG4gICAgICAgIGZvciAodmFyIHRhZyBpbiBtYWlsU3lzQ29uZmlnKSB7XG4gICAgICAgICAgICB2YXIgY29uZGl0aW9ucyA9IG1haWxTeXNDb25maWdbdGFnXS5jb25kaXRpb25zXG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBjb25kaXRpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9uZUVsZW1lbnQgPSBjb25kaXRpb25zW2luZGV4XVxuICAgICAgICAgICAgICAgIHZhciBjb25kaXRpb25UeXBlID0gb25lRWxlbWVudC5jb25kaXRpb25UeXBlXG4gICAgICAgICAgICAgICAgdmFyIGNvbmRpdGlvblBhcmEgPSBvbmVFbGVtZW50LmNvbmRpdGlvblBhcmFcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoY29uZGl0aW9uVHlwZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kaXRpb25QYXJhID09IHRoaXMubGV2ZWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbFRhZ1dpbGxTaG93ID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRDb25kaXRpb25JbmRleCA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEubWFpbENvbmRpdGlvbkluZGV4W3RhZ11cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxldmVsID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coaW5kZXgsIGN1cnJlbnRDb25kaXRpb25JbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgY3VycmVudENvbmRpdGlvbkluZGV4IHx8IGN1cnJlbnRDb25kaXRpb25JbmRleCA9PSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbEhhc1NlbmQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbbWFpbFRhZ1dpbGxTaG93LG1haWxIYXNTZW5kXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbmRpdGlvblR5cGUgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZGl0aW9uUGFyYS5sZXZlbElkID09IHRoaXMubGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haWxUYWdXaWxsU2hvdyA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudENvbmRpdGlvbkluZGV4ID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5tYWlsQ29uZGl0aW9uSW5kZXhbdGFnXVxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCBjdXJyZW50Q29uZGl0aW9uSW5kZXggfHwgY3VycmVudENvbmRpdGlvbkluZGV4ID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWlsSGFzU2VuZCA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbbWFpbFRhZ1dpbGxTaG93LG1haWxIYXNTZW5kXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9LFxuXG4gICAgZGF0YU1vbml0b3JlZChrZXksdmFsdWUpIHtcbiAgICAgICAgdmFyIG1haWxDb25maWcgPSByZXF1aXJlKFwibWFpbENvbmZpZ1wiKVxuICAgICAgICB2YXIgbWFpbElkcyA9IE9iamVjdC5rZXlzKG1haWxDb25maWcpXG4gICAgICAgIGlmIChtYWlsSWRzLmluZGV4T2Yoa2V5KSAhPSAtMSkge1xuICAgICAgICAgICAgdGhpcy5zZXR1cE1haWxUYWcoKVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=