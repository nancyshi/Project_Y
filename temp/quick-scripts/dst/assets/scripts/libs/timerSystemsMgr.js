
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/libs/timerSystemsMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'db2d5jDzvdBm400iKuIvXTH', 'timerSystemsMgr');
// scripts/libs/timerSystemsMgr.js

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
var TimerSystemsMgr = cc.Class({
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
    signInSysTimer: {
      get: function get() {
        return this._signInSysTimer;
      },
      set: function set(value) {
        this._signInSysTimer = value;

        if (value <= 0) {
          this.onTimerReach("signInSys");
        }
      }
    },
    timers: []
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {},
  initSetup: function initSetup() {
    this.timers.push(this.signInSysTimer);
    this.signInSysTimer = require("dataMgr").playerData.signInRefreshDelta;
  },
  lunch: function lunch() {
    this.schedule(this.timerUpdate, 1);
  },
  timerUpdate: function timerUpdate() {
    for (var index in this.timers) {
      var oneTimer = this.timers[index];

      if (oneTimer > 0) {
        oneTimer -= 1;
      }
    }
  },
  stop: function stop() {
    this.unschedule(this.timerUpdate, this);
  },
  onTimerReach: function onTimerReach(givenName) {
    switch (givenName) {
      case "signInSys":
        var self = this;

        var networkMgr = require("networkMgr");

        var msgObj = networkMgr.makeMessageObj("signInModule", "refreshMessageType");
        msgObj.message.playerId = require("dataMgr").playerData.id;

        msgObj.successCallBack = function (xhr) {
          var response = xhr.responseText;
          response = JSON.parse(response);

          if (response.type == "success") {
            var signInRefreshDelta = response.signInRefreshDelta;
            require("dataMgr").playerData.signInRefreshDelta = signInRefreshDelta;
            self.signInSysTimer = signInRefreshDelta;
            require("dataMgr").playerData.signInStatus = 1;

            if (require("systemsMgr").signInSys.opendNode != null) {
              var signInSysMgr = require("systemsMgr").signInSys.opendNode.getComponent("signInSysMgr");

              signInSysMgr.setupUI();
            }
          }
        };

        networkMgr.sendMessageByMsgObj(msgObj);
        break;
    }
  }
});
var sharedTimerSystemsMgr = new TimerSystemsMgr();
module.exports = sharedTimerSystemsMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xpYnMvdGltZXJTeXN0ZW1zTWdyLmpzIl0sIm5hbWVzIjpbIlRpbWVyU3lzdGVtc01nciIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic2lnbkluU3lzVGltZXIiLCJnZXQiLCJfc2lnbkluU3lzVGltZXIiLCJzZXQiLCJ2YWx1ZSIsIm9uVGltZXJSZWFjaCIsInRpbWVycyIsInN0YXJ0IiwiaW5pdFNldHVwIiwicHVzaCIsInJlcXVpcmUiLCJwbGF5ZXJEYXRhIiwic2lnbkluUmVmcmVzaERlbHRhIiwibHVuY2giLCJzY2hlZHVsZSIsInRpbWVyVXBkYXRlIiwiaW5kZXgiLCJvbmVUaW1lciIsInN0b3AiLCJ1bnNjaGVkdWxlIiwiZ2l2ZW5OYW1lIiwic2VsZiIsIm5ldHdvcmtNZ3IiLCJtc2dPYmoiLCJtYWtlTWVzc2FnZU9iaiIsIm1lc3NhZ2UiLCJwbGF5ZXJJZCIsImlkIiwic3VjY2Vzc0NhbGxCYWNrIiwieGhyIiwicmVzcG9uc2UiLCJyZXNwb25zZVRleHQiLCJKU09OIiwicGFyc2UiLCJ0eXBlIiwic2lnbkluU3RhdHVzIiwic2lnbkluU3lzIiwib3BlbmROb2RlIiwic2lnbkluU3lzTWdyIiwiZ2V0Q29tcG9uZW50Iiwic2V0dXBVSSIsInNlbmRNZXNzYWdlQnlNc2dPYmoiLCJzaGFyZWRUaW1lclN5c3RlbXNNZ3IiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLGVBQWUsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDM0IsYUFBU0QsRUFBRSxDQUFDRSxTQURlO0FBRzNCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QWVBbEIsUUFBQUEsVUFBVSxDQUFDbUIsbUJBQVgsQ0FBK0JsQixNQUEvQjtBQUNBO0FBdEJSO0FBd0JIO0FBeEYwQixDQUFULENBQXRCO0FBNEZBLElBQUltQixxQkFBcUIsR0FBRyxJQUFJL0MsZUFBSixFQUE1QjtBQUNBZ0QsTUFBTSxDQUFDQyxPQUFQLEdBQWlCRixxQkFBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxudmFyIFRpbWVyU3lzdGVtc01nciA9IGNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgICAgIHNpZ25JblN5c1RpbWVyOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25JblN5c1RpbWVyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2lnbkluU3lzVGltZXIgPSB2YWx1ZVxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25UaW1lclJlYWNoKFwic2lnbkluU3lzXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHRpbWVyczogW11cbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9LFxuICAgIGluaXRTZXR1cCgpe1xuICAgICAgICB0aGlzLnRpbWVycy5wdXNoKHRoaXMuc2lnbkluU3lzVGltZXIpXG4gICAgICAgIHRoaXMuc2lnbkluU3lzVGltZXIgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLnNpZ25JblJlZnJlc2hEZWx0YVxuICAgIH0sXG4gICAgbHVuY2goKXtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnRpbWVyVXBkYXRlLCAxKVxuICAgIH0sXG5cbiAgICB0aW1lclVwZGF0ZSgpIHtcbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gdGhpcy50aW1lcnMpIHtcbiAgICAgICAgICAgIHZhciBvbmVUaW1lciA9IHRoaXMudGltZXJzW2luZGV4XVxuICAgICAgICAgICAgaWYgKG9uZVRpbWVyID4gMCkge1xuICAgICAgICAgICAgICAgIG9uZVRpbWVyIC09IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wKCl7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnRpbWVyVXBkYXRlLHRoaXMpXG4gICAgfSxcblxuXG4gICAgb25UaW1lclJlYWNoKGdpdmVuTmFtZSkge1xuICAgICAgICBzd2l0Y2goZ2l2ZW5OYW1lKXtcbiAgICAgICAgICAgIGNhc2UgXCJzaWduSW5TeXNcIjpcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgICB2YXIgbmV0d29ya01nciA9IHJlcXVpcmUoXCJuZXR3b3JrTWdyXCIpXG4gICAgICAgICAgICAgICAgdmFyIG1zZ09iaiA9IG5ldHdvcmtNZ3IubWFrZU1lc3NhZ2VPYmooXCJzaWduSW5Nb2R1bGVcIixcInJlZnJlc2hNZXNzYWdlVHlwZVwiKVxuICAgICAgICAgICAgICAgIG1zZ09iai5tZXNzYWdlLnBsYXllcklkID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5pZFxuICAgICAgICAgICAgICAgIG1zZ09iai5zdWNjZXNzQ2FsbEJhY2sgPSBmdW5jdGlvbih4aHIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS50eXBlID09IFwic3VjY2Vzc1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2lnbkluUmVmcmVzaERlbHRhID0gcmVzcG9uc2Uuc2lnbkluUmVmcmVzaERlbHRhXG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLnNpZ25JblJlZnJlc2hEZWx0YSA9IHNpZ25JblJlZnJlc2hEZWx0YVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaWduSW5TeXNUaW1lciA9IHNpZ25JblJlZnJlc2hEZWx0YVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5zaWduSW5TdGF0dXMgPSAxXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWlyZShcInN5c3RlbXNNZ3JcIikuc2lnbkluU3lzLm9wZW5kTm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNpZ25JblN5c01nciA9IHJlcXVpcmUoXCJzeXN0ZW1zTWdyXCIpLnNpZ25JblN5cy5vcGVuZE5vZGUuZ2V0Q29tcG9uZW50KFwic2lnbkluU3lzTWdyXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbkluU3lzTWdyLnNldHVwVUkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbmV0d29ya01nci5zZW5kTWVzc2FnZUJ5TXNnT2JqKG1zZ09iailcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuICAgIFxufSk7XG5cbnZhciBzaGFyZWRUaW1lclN5c3RlbXNNZ3IgPSBuZXcgVGltZXJTeXN0ZW1zTWdyKClcbm1vZHVsZS5leHBvcnRzID0gc2hhcmVkVGltZXJTeXN0ZW1zTWdyIl19