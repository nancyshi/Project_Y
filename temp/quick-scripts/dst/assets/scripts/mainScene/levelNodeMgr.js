
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL21haW5TY2VuZS9sZXZlbE5vZGVNZ3IuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGF0dXMiLCJnZXQiLCJfc3RhdHVzIiwic2V0IiwidmFsdWUiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJncmF5U3ByaXRlRnJhbWUiLCJpc1JlY29tbWFuZGVkIiwibGV2ZWxOdW1MYWJlbE5vZGUiLCJOb2RlIiwibWFpbFRhZ05vZGUiLCJzZWxlY3RlZEVmZmVjdE5vZGUiLCJTcHJpdGVGcmFtZSIsIm1haWxUYWdTZW5kU3ByaXRlRnJhbWUiLCJkZWxlZ2F0ZSIsImxldmVsIiwicHJlQ2hhbmxsZW5nZVVJUHJlZmFiIiwiUHJlZmFiIiwicHJlQ2hhbmxsZW5nZVVJT3BlbmQiLCJfaXNSZWNvbW1hbmRlZCIsImFjdGl2ZSIsIm9uTG9hZCIsInR3ZWVuIiwicmVwZWF0Rm9yZXZlciIsInRvIiwib3BhY2l0eSIsInN0YXJ0Iiwic2V0dXBNYWlsVGFnIiwib25DbGljayIsIm9wZW5QcmVDaGFubGxlbmdlVUkiLCJ1aSIsImluc3RhbnRpYXRlIiwibWdyIiwibGV2ZWxTdGF0dXMiLCJkaXJlY3RvciIsImdldFNjZW5lIiwiZ2V0Q2hpbGRCeU5hbWUiLCJhZGRDaGlsZCIsInJlc3VsdCIsIl9jaGVja0xldmVsTWFpbFRhZ1N0YXR1cyIsIm1haWxIYXNTZW5kIiwibWFpbFRhZ1dpbGxTaG93IiwibWFpbFN5c0NvbmZpZyIsInJlcXVpcmUiLCJ0YWciLCJjb25kaXRpb25zIiwiaW5kZXgiLCJvbmVFbGVtZW50IiwiY29uZGl0aW9uVHlwZSIsImNvbmRpdGlvblBhcmEiLCJjdXJyZW50Q29uZGl0aW9uSW5kZXgiLCJwbGF5ZXJEYXRhIiwibWFpbENvbmRpdGlvbkluZGV4IiwibG9nIiwibGV2ZWxJZCIsImRhdGFNb25pdG9yZWQiLCJrZXkiLCJtYWlsQ29uZmln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QUssR0FBR0kscUJBQVIsSUFBaUNBLHFCQUFxQixJQUFJLENBQUMsQ0FBL0QsRUFBa0U7QUFDOURWLFlBQUFBLFdBQVcsR0FBRyxJQUFkO0FBQ0g7O0FBRUQsaUJBQU8sQ0FBQ0MsZUFBRCxFQUFpQkQsV0FBakIsQ0FBUDtBQUNIO0FBQ0o7QUFDSjs7QUFDRCxXQUFPLEtBQVA7QUFDSCxHQWhKSTtBQWtKTGUsRUFBQUEsYUFsSksseUJBa0pTQyxHQWxKVCxFQWtKYXZELEtBbEpiLEVBa0pvQjtBQUNyQixRQUFJd0QsVUFBVSxHQUFHZCxPQUFPLENBQUMsWUFBRCxDQUF4Qjs7QUFDQSxRQUFJZSxPQUFPLEdBQUdDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZSCxVQUFaLENBQWQ7O0FBQ0EsUUFBSUMsT0FBTyxDQUFDRyxPQUFSLENBQWdCTCxHQUFoQixLQUF3QixDQUFDLENBQTdCLEVBQWdDO0FBQzVCLFdBQUs3QixZQUFMO0FBQ0g7QUFDSixHQXhKSSxDQXlKTDs7QUF6SkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHBzOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICBzdGF0dXM6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHVzXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdHVzID0gdmFsdWVcbiAgICAgICAgICAgICAgICBpZih2YWx1ZSA9PSAwIHx8IHZhbHVlID09IDIpIHsgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5ncmF5U3ByaXRlRnJhbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1JlY29tbWFuZGVkID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgLy8wID0gbG9ja2VkLCAxID0gdW5sb2NrZWQsIDIgPSBjdXJyZW50XG4gICAgICAgIGxldmVsTnVtTGFiZWxOb2RlOiBjYy5Ob2RlLFxuICAgICAgICBtYWlsVGFnTm9kZTogY2MuTm9kZSxcbiAgICAgICAgc2VsZWN0ZWRFZmZlY3ROb2RlOiBjYy5Ob2RlLFxuICAgICAgICBncmF5U3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lLFxuICAgICAgICBtYWlsVGFnU2VuZFNwcml0ZUZyYW1lOiBjYy5TcHJpdGVGcmFtZSxcbiAgICAgICAgZGVsZWdhdGU6IG51bGwsXG4gICAgICAgIGxldmVsOiBudWxsLFxuICAgICAgICBwcmVDaGFubGxlbmdlVUlQcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgcHJlQ2hhbmxsZW5nZVVJT3BlbmQ6IGZhbHNlLFxuICAgICAgICBpc1JlY29tbWFuZGVkOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzUmVjb21tYW5kZWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1JlY29tbWFuZGVkID0gdmFsdWVcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRWZmZWN0Tm9kZS5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuc2VsZWN0ZWRFZmZlY3ROb2RlKVxuICAgICAgICAgICAgLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKS50bygwLjUse29wYWNpdHk6MH0pLnRvKDAuNSx7b3BhY2l0eTogMjU1fSkpXG4gICAgICAgICAgICAuc3RhcnQoKVxuICAgICAgICB0aGlzLnNldHVwTWFpbFRhZygpXG4gICAgfSxcblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH0sXG5cbiAgICBvbkNsaWNrKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcGVuUHJlQ2hhbmxsZW5nZVVJKClcbiAgICB9LFxuXG4gICAgb3BlblByZUNoYW5sbGVuZ2VVSSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJlQ2hhbmxsZW5nZVVJT3BlbmQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdWkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZUNoYW5sbGVuZ2VVSVByZWZhYilcbiAgICAgICAgdmFyIG1nciA9IHVpLmdldENvbXBvbmVudChcInByZUNoYWxsZW5nZVVJTWdyXCIpXG4gICAgICAgIG1nci5sZXZlbCA9IHRoaXMubGV2ZWxcbiAgICAgICAgbWdyLmxldmVsU3RhdHVzID0gdGhpcy5zdGF0dXNcbiAgICAgICAgbWdyLmRlbGVnYXRlID0gdGhpc1xuXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoXCJDYW52YXNcIikuYWRkQ2hpbGQodWkpXG4gICAgICAgIHRoaXMucHJlQ2hhbmxsZW5nZVVJT3BlbmQgPSB0cnVlXG4gICAgfSxcblxuICAgIHNldHVwTWFpbFRhZygpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX2NoZWNrTGV2ZWxNYWlsVGFnU3RhdHVzKClcbiAgICAgICAgaWYgKHJlc3VsdCAhPSBmYWxzZSkge1xuICAgICAgICAgICAgdmFyIG1haWxIYXNTZW5kID0gcmVzdWx0WzFdXG4gICAgICAgICAgICB2YXIgbWFpbFRhZ1dpbGxTaG93ID0gcmVzdWx0WzBdXG4gICAgICAgICAgICBpZiAobWFpbEhhc1NlbmQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWFpbFRhZ05vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLm1haWxUYWdTZW5kU3ByaXRlRnJhbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYWlsVGFnV2lsbFNob3cgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWFpbFRhZ05vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9jaGVja0xldmVsTWFpbFRhZ1N0YXR1cygpIHtcbiAgICAgICAgdmFyIG1haWxTeXNDb25maWcgPSByZXF1aXJlKFwibWFpbFN5c0NvbmZpZ1wiKVxuICAgICAgICB2YXIgbWFpbFRhZ1dpbGxTaG93ID0gZmFsc2VcbiAgICAgICAgdmFyIG1haWxIYXNTZW5kID0gZmFsc2VcbiAgICAgICAgZm9yICh2YXIgdGFnIGluIG1haWxTeXNDb25maWcpIHtcbiAgICAgICAgICAgIHZhciBjb25kaXRpb25zID0gbWFpbFN5c0NvbmZpZ1t0YWddLmNvbmRpdGlvbnNcbiAgICAgICAgICAgIGZvciAodmFyIGluZGV4IGluIGNvbmRpdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgb25lRWxlbWVudCA9IGNvbmRpdGlvbnNbaW5kZXhdXG4gICAgICAgICAgICAgICAgdmFyIGNvbmRpdGlvblR5cGUgPSBvbmVFbGVtZW50LmNvbmRpdGlvblR5cGVcbiAgICAgICAgICAgICAgICB2YXIgY29uZGl0aW9uUGFyYSA9IG9uZUVsZW1lbnQuY29uZGl0aW9uUGFyYVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChjb25kaXRpb25UeXBlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmRpdGlvblBhcmEgPT0gdGhpcy5sZXZlbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWlsVGFnV2lsbFNob3cgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudENvbmRpdGlvbkluZGV4ID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5tYWlsQ29uZGl0aW9uSW5kZXhbdGFnXVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWwgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZyhpbmRleCwgY3VycmVudENvbmRpdGlvbkluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCBjdXJyZW50Q29uZGl0aW9uSW5kZXggfHwgY3VycmVudENvbmRpdGlvbkluZGV4ID09IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWlsSGFzU2VuZCA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFttYWlsVGFnV2lsbFNob3csbWFpbEhhc1NlbmRdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29uZGl0aW9uVHlwZSA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kaXRpb25QYXJhLmxldmVsSWQgPT0gdGhpcy5sZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbFRhZ1dpbGxTaG93ID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50Q29uZGl0aW9uSW5kZXggPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLm1haWxDb25kaXRpb25JbmRleFt0YWddXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IGN1cnJlbnRDb25kaXRpb25JbmRleCB8fCBjdXJyZW50Q29uZGl0aW9uSW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haWxIYXNTZW5kID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFttYWlsVGFnV2lsbFNob3csbWFpbEhhc1NlbmRdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH0sXG5cbiAgICBkYXRhTW9uaXRvcmVkKGtleSx2YWx1ZSkge1xuICAgICAgICB2YXIgbWFpbENvbmZpZyA9IHJlcXVpcmUoXCJtYWlsQ29uZmlnXCIpXG4gICAgICAgIHZhciBtYWlsSWRzID0gT2JqZWN0LmtleXMobWFpbENvbmZpZylcbiAgICAgICAgaWYgKG1haWxJZHMuaW5kZXhPZihrZXkpICE9IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNldHVwTWFpbFRhZygpXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==