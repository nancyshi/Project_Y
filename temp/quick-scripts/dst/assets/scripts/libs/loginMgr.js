
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/libs/loginMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd733bkMuPVAjJrq/tbVsVhw', 'loginMgr');
// scripts/libs/loginMgr.js

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
var LoginMgr = cc.Class({
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
    playerId: {
      get: function get() {
        return this._playerId;
      },
      set: function set(value) {
        this._playerId = value;

        if (value) {
          this.onPlayerIdSet();
        }
      }
    },
    LoginType: {
      get: function get() {
        return {
          ACCOUNT: 1,
          WE_CHAT_GAME: 2,
          DEVICE_ID: 3
        };
      }
    }
  },
  login: function login(loginType) {
    this._setPlayerIdFromServer(loginType);
  },
  onPlayerIdSet: function onPlayerIdSet() {
    this.updatePlayerDataFromServer(this.playerId);
  },
  updatePlayerDataFromServer: function updatePlayerDataFromServer(playerId) {
    var dataMgr = require("dataMgr");

    dataMgr.updatePlayerDataFromServer(playerId);
  },
  _genarateUUID: function _genarateUUID() {
    var time = cc.sys.now();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
    uuid = uuid + time.toString();
    return uuid;
  },
  _setPlayerIdFromServer: function _setPlayerIdFromServer(loginType) {
    var networkMgr = require("networkMgr");

    var msgObj = networkMgr.makeMessageObj("loginModule", "loginMessageType");
    msgObj.message.codeType = loginType;
    var asyncFlag = false;

    switch (loginType) {
      case this.LoginType.ACCOUNT:
        break;

      case this.LoginType.WE_CHAT_GAME:
        asyncFlag = true;
        var self = this;
        wx.login({
          success: function success(res) {
            var code = res.code;

            if (code != null) {
              msgObj.message.code = code;

              msgObj.successCallBack = function (xhr) {
                var response = xhr.responseText;
                response = JSON.parse(response);

                if (response.type == "login_success") {
                  var playerId = response.playerId;
                  self.playerId = playerId;
                } else if (response.type == "login_fail") {}
              };

              networkMgr.sendMessageByMsgObj(msgObj);
            }
          }
        });
        break;

      case this.LoginType.DEVICE_ID:
        var deviceId = cc.sys.localStorage.getItem("deviceId");

        if (deviceId == null) {
          var uuid = this._genarateUUID();

          cc.sys.localStorage.setItem("deviceId", uuid);
          deviceId = uuid;
        }

        msgObj.message.code = deviceId;
        break;

      default:
        cc.log("Login type erro: now it's " + loginType);
    }

    if (asyncFlag == true) {
      return;
    }

    var self = this;

    msgObj.successCallBack = function (xhr) {
      var response = xhr.responseText;
      response = JSON.parse(response);

      if (response.type == "login_success") {
        var playerId = response.playerId;
        self.playerId = playerId;
      } else if (response.type == "login_fail") {}
    };

    networkMgr.sendMessageByMsgObj(msgObj);
  }
});
var sharedLoginMgr = new LoginMgr();
module.exports = sharedLoginMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xpYnMvbG9naW5NZ3IuanMiXSwibmFtZXMiOlsiTG9naW5NZ3IiLCJjYyIsIkNsYXNzIiwicHJvcGVydGllcyIsInBsYXllcklkIiwiZ2V0IiwiX3BsYXllcklkIiwic2V0IiwidmFsdWUiLCJvblBsYXllcklkU2V0IiwiTG9naW5UeXBlIiwiQUNDT1VOVCIsIldFX0NIQVRfR0FNRSIsIkRFVklDRV9JRCIsImxvZ2luIiwibG9naW5UeXBlIiwiX3NldFBsYXllcklkRnJvbVNlcnZlciIsInVwZGF0ZVBsYXllckRhdGFGcm9tU2VydmVyIiwiZGF0YU1nciIsInJlcXVpcmUiLCJfZ2VuYXJhdGVVVUlEIiwidGltZSIsInN5cyIsIm5vdyIsInV1aWQiLCJyZXBsYWNlIiwiYyIsInIiLCJNYXRoIiwicmFuZG9tIiwidiIsInRvU3RyaW5nIiwibmV0d29ya01nciIsIm1zZ09iaiIsIm1ha2VNZXNzYWdlT2JqIiwibWVzc2FnZSIsImNvZGVUeXBlIiwiYXN5bmNGbGFnIiwic2VsZiIsInd4Iiwic3VjY2VzcyIsInJlcyIsImNvZGUiLCJzdWNjZXNzQ2FsbEJhY2siLCJ4aHIiLCJyZXNwb25zZSIsInJlc3BvbnNlVGV4dCIsIkpTT04iLCJwYXJzZSIsInR5cGUiLCJzZW5kTWVzc2FnZUJ5TXNnT2JqIiwiZGV2aWNlSWQiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic2V0SXRlbSIsImxvZyIsInNoYXJlZExvZ2luTWdyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQSxJQUFJQSxRQUFRLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3BCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsUUFBUSxFQUFFO0FBQ05DLE1BQUFBLEdBRE0saUJBQ0E7QUFDRixlQUFPLEtBQUtDLFNBQVo7QUFDSCxPQUhLO0FBSU5DLE1BQUFBLEdBSk0sZUFJRkMsS0FKRSxFQUlLO0FBQ1AsYUFBS0YsU0FBTCxHQUFpQkUsS0FBakI7O0FBQ0EsWUFBSUEsS0FBSixFQUFXO0FBQ1AsZUFBS0MsYUFBTDtBQUNIO0FBQ0o7QUFUSyxLQWhCRjtBQTJCUkMsSUFBQUEsU0FBUyxFQUFFO0FBQ1BMLE1BQUFBLEdBRE8saUJBQ0Q7QUFDRixlQUFPO0FBQ0hNLFVBQUFBLE9BQU8sRUFBRSxDQUROO0FBRUhDLFVBQUFBLFlBQVksRUFBRSxDQUZYO0FBR0hDLFVBQUFBLFNBQVMsRUFBRTtBQUhSLFNBQVA7QUFLSDtBQVBNO0FBM0JILEdBRFE7QUF3Q3BCQyxFQUFBQSxLQXhDb0IsaUJBd0NkQyxTQXhDYyxFQXdDSDtBQUNiLFNBQUtDLHNCQUFMLENBQTRCRCxTQUE1QjtBQUNILEdBMUNtQjtBQTRDcEJOLEVBQUFBLGFBNUNvQiwyQkE0Q0o7QUFDWixTQUFLUSwwQkFBTCxDQUFnQyxLQUFLYixRQUFyQztBQUNILEdBOUNtQjtBQWdEcEJhLEVBQUFBLDBCQWhEb0Isc0NBZ0RPYixRQWhEUCxFQWdEaUI7QUFDakMsUUFBSWMsT0FBTyxHQUFHQyxPQUFPLENBQUMsU0FBRCxDQUFyQjs7QUFDQUQsSUFBQUEsT0FBTyxDQUFDRCwwQkFBUixDQUFtQ2IsUUFBbkM7QUFDSCxHQW5EbUI7QUFxRHBCZ0IsRUFBQUEsYUFyRG9CLDJCQXFESjtBQUNaLFFBQUlDLElBQUksR0FBR3BCLEVBQUUsQ0FBQ3FCLEdBQUgsQ0FBT0MsR0FBUCxFQUFYO0FBQ0EsUUFBSUMsSUFBSSxHQUFJLHVDQUF1Q0MsT0FBdkMsQ0FBK0MsT0FBL0MsRUFBd0QsVUFBVUMsQ0FBVixFQUFhO0FBQzdFLFVBQUlDLENBQUMsR0FBR0MsSUFBSSxDQUFDQyxNQUFMLEtBQWdCLEVBQWhCLEdBQXFCLENBQTdCO0FBQUEsVUFDSUMsQ0FBQyxHQUFHSixDQUFDLElBQUksR0FBTCxHQUFXQyxDQUFYLEdBQWdCQSxDQUFDLEdBQUcsR0FBSixHQUFVLEdBRGxDO0FBRUEsYUFBT0csQ0FBQyxDQUFDQyxRQUFGLENBQVcsRUFBWCxDQUFQO0FBQ0gsS0FKVyxDQUFaO0FBS0FQLElBQUFBLElBQUksR0FBR0EsSUFBSSxHQUFHSCxJQUFJLENBQUNVLFFBQUwsRUFBZDtBQUNBLFdBQU9QLElBQVA7QUFDSCxHQTlEbUI7QUFnRXBCUixFQUFBQSxzQkFoRW9CLGtDQWdFR0QsU0FoRUgsRUFnRWM7QUFFOUIsUUFBSWlCLFVBQVUsR0FBR2IsT0FBTyxDQUFDLFlBQUQsQ0FBeEI7O0FBQ0EsUUFBSWMsTUFBTSxHQUFHRCxVQUFVLENBQUNFLGNBQVgsQ0FBMEIsYUFBMUIsRUFBd0Msa0JBQXhDLENBQWI7QUFDQUQsSUFBQUEsTUFBTSxDQUFDRSxPQUFQLENBQWVDLFFBQWYsR0FBMEJyQixTQUExQjtBQUNBLFFBQUlzQixTQUFTLEdBQUcsS0FBaEI7O0FBQ0EsWUFBT3RCLFNBQVA7QUFDSSxXQUFLLEtBQUtMLFNBQUwsQ0FBZUMsT0FBcEI7QUFDSTs7QUFDSixXQUFLLEtBQUtELFNBQUwsQ0FBZUUsWUFBcEI7QUFDSXlCLFFBQUFBLFNBQVMsR0FBRyxJQUFaO0FBQ0EsWUFBSUMsSUFBSSxHQUFHLElBQVg7QUFDQUMsUUFBQUEsRUFBRSxDQUFDekIsS0FBSCxDQUFTO0FBQ0wwQixVQUFBQSxPQUFPLEVBQUUsaUJBQVNDLEdBQVQsRUFBYztBQUNuQixnQkFBSUMsSUFBSSxHQUFHRCxHQUFHLENBQUNDLElBQWY7O0FBQ0EsZ0JBQUlBLElBQUksSUFBSSxJQUFaLEVBQWtCO0FBQ2RULGNBQUFBLE1BQU0sQ0FBQ0UsT0FBUCxDQUFlTyxJQUFmLEdBQXNCQSxJQUF0Qjs7QUFDQVQsY0FBQUEsTUFBTSxDQUFDVSxlQUFQLEdBQXlCLFVBQVNDLEdBQVQsRUFBYztBQUNuQyxvQkFBSUMsUUFBUSxHQUFHRCxHQUFHLENBQUNFLFlBQW5CO0FBQ0FELGdCQUFBQSxRQUFRLEdBQUdFLElBQUksQ0FBQ0MsS0FBTCxDQUFXSCxRQUFYLENBQVg7O0FBQ0Esb0JBQUlBLFFBQVEsQ0FBQ0ksSUFBVCxJQUFpQixlQUFyQixFQUFzQztBQUNsQyxzQkFBSTdDLFFBQVEsR0FBR3lDLFFBQVEsQ0FBQ3pDLFFBQXhCO0FBQ0FrQyxrQkFBQUEsSUFBSSxDQUFDbEMsUUFBTCxHQUFnQkEsUUFBaEI7QUFDSCxpQkFIRCxNQUlLLElBQUl5QyxRQUFRLENBQUNJLElBQVQsSUFBaUIsWUFBckIsRUFBbUMsQ0FFdkM7QUFDSixlQVZEOztBQVdBakIsY0FBQUEsVUFBVSxDQUFDa0IsbUJBQVgsQ0FBK0JqQixNQUEvQjtBQUNIO0FBQ0o7QUFsQkksU0FBVDtBQW9CQTs7QUFDSixXQUFLLEtBQUt2QixTQUFMLENBQWVHLFNBQXBCO0FBQ0ksWUFBSXNDLFFBQVEsR0FBR2xELEVBQUUsQ0FBQ3FCLEdBQUgsQ0FBTzhCLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFVBQTVCLENBQWY7O0FBQ0EsWUFBSUYsUUFBUSxJQUFJLElBQWhCLEVBQXNCO0FBQ2xCLGNBQUkzQixJQUFJLEdBQUcsS0FBS0osYUFBTCxFQUFYOztBQUNBbkIsVUFBQUEsRUFBRSxDQUFDcUIsR0FBSCxDQUFPOEIsWUFBUCxDQUFvQkUsT0FBcEIsQ0FBNEIsVUFBNUIsRUFBdUM5QixJQUF2QztBQUNBMkIsVUFBQUEsUUFBUSxHQUFHM0IsSUFBWDtBQUNIOztBQUNEUyxRQUFBQSxNQUFNLENBQUNFLE9BQVAsQ0FBZU8sSUFBZixHQUFzQlMsUUFBdEI7QUFDQTs7QUFDSjtBQUNJbEQsUUFBQUEsRUFBRSxDQUFDc0QsR0FBSCxDQUFPLCtCQUErQnhDLFNBQXRDO0FBckNSOztBQXVDQSxRQUFJc0IsU0FBUyxJQUFJLElBQWpCLEVBQXVCO0FBQ25CO0FBQ0g7O0FBQ0QsUUFBSUMsSUFBSSxHQUFHLElBQVg7O0FBQ0FMLElBQUFBLE1BQU0sQ0FBQ1UsZUFBUCxHQUF5QixVQUFTQyxHQUFULEVBQWM7QUFDbkMsVUFBSUMsUUFBUSxHQUFHRCxHQUFHLENBQUNFLFlBQW5CO0FBQ0FELE1BQUFBLFFBQVEsR0FBR0UsSUFBSSxDQUFDQyxLQUFMLENBQVdILFFBQVgsQ0FBWDs7QUFDQSxVQUFJQSxRQUFRLENBQUNJLElBQVQsSUFBaUIsZUFBckIsRUFBc0M7QUFDbEMsWUFBSTdDLFFBQVEsR0FBR3lDLFFBQVEsQ0FBQ3pDLFFBQXhCO0FBQ0FrQyxRQUFBQSxJQUFJLENBQUNsQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNILE9BSEQsTUFJSyxJQUFJeUMsUUFBUSxDQUFDSSxJQUFULElBQWlCLFlBQXJCLEVBQW1DLENBRXZDO0FBQ0osS0FWRDs7QUFXQWpCLElBQUFBLFVBQVUsQ0FBQ2tCLG1CQUFYLENBQStCakIsTUFBL0I7QUFDSDtBQTdIbUIsQ0FBVCxDQUFmO0FBZ0lBLElBQUl1QixjQUFjLEdBQUcsSUFBSXhELFFBQUosRUFBckI7QUFDQXlELE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQkYsY0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuXG52YXIgTG9naW5NZ3IgPSBjYy5DbGFzcyh7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICBwbGF5ZXJJZDoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wbGF5ZXJJZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllcklkID0gdmFsdWVcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblBsYXllcklkU2V0KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIExvZ2luVHlwZToge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIEFDQ09VTlQ6IDEsXG4gICAgICAgICAgICAgICAgICAgIFdFX0NIQVRfR0FNRTogMixcbiAgICAgICAgICAgICAgICAgICAgREVWSUNFX0lEOiAzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH0sXG5cbiAgICBsb2dpbihsb2dpblR5cGUpIHtcbiAgICAgICAgdGhpcy5fc2V0UGxheWVySWRGcm9tU2VydmVyKGxvZ2luVHlwZSlcbiAgICB9LFxuXG4gICAgb25QbGF5ZXJJZFNldCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVQbGF5ZXJEYXRhRnJvbVNlcnZlcih0aGlzLnBsYXllcklkKVxuICAgIH0sXG5cbiAgICB1cGRhdGVQbGF5ZXJEYXRhRnJvbVNlcnZlcihwbGF5ZXJJZCkge1xuICAgICAgICB2YXIgZGF0YU1nciA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpXG4gICAgICAgIGRhdGFNZ3IudXBkYXRlUGxheWVyRGF0YUZyb21TZXJ2ZXIocGxheWVySWQpXG4gICAgfSxcblxuICAgIF9nZW5hcmF0ZVVVSUQoKSB7XG4gICAgICAgIHZhciB0aW1lID0gY2Muc3lzLm5vdygpXG4gICAgICAgIHZhciB1dWlkID0gICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIHZhciByID0gTWF0aC5yYW5kb20oKSAqIDE2IHwgMCxcbiAgICAgICAgICAgICAgICB2ID0gYyA9PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpO1xuICAgICAgICAgICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xuICAgICAgICB9KTtcbiAgICAgICAgdXVpZCA9IHV1aWQgKyB0aW1lLnRvU3RyaW5nKClcbiAgICAgICAgcmV0dXJuIHV1aWRcbiAgICB9LFxuXG4gICAgX3NldFBsYXllcklkRnJvbVNlcnZlcihsb2dpblR5cGUpIHtcblxuICAgICAgICB2YXIgbmV0d29ya01nciA9IHJlcXVpcmUoXCJuZXR3b3JrTWdyXCIpXG4gICAgICAgIHZhciBtc2dPYmogPSBuZXR3b3JrTWdyLm1ha2VNZXNzYWdlT2JqKFwibG9naW5Nb2R1bGVcIixcImxvZ2luTWVzc2FnZVR5cGVcIilcbiAgICAgICAgbXNnT2JqLm1lc3NhZ2UuY29kZVR5cGUgPSBsb2dpblR5cGVcbiAgICAgICAgdmFyIGFzeW5jRmxhZyA9IGZhbHNlXG4gICAgICAgIHN3aXRjaChsb2dpblR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgdGhpcy5Mb2dpblR5cGUuQUNDT1VOVDpcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSB0aGlzLkxvZ2luVHlwZS5XRV9DSEFUX0dBTUU6XG4gICAgICAgICAgICAgICAgYXN5bmNGbGFnID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICAgICAgICAgIHd4LmxvZ2luKHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29kZSA9IHJlcy5jb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNnT2JqLm1lc3NhZ2UuY29kZSA9IGNvZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc2dPYmouc3VjY2Vzc0NhbGxCYWNrID0gZnVuY3Rpb24oeGhyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZSA9IHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UudHlwZSA9PSBcImxvZ2luX3N1Y2Nlc3NcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBsYXllcklkID0gcmVzcG9uc2UucGxheWVySWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucGxheWVySWQgPSBwbGF5ZXJJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlLnR5cGUgPT0gXCJsb2dpbl9mYWlsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya01nci5zZW5kTWVzc2FnZUJ5TXNnT2JqKG1zZ09iailcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgdGhpcy5Mb2dpblR5cGUuREVWSUNFX0lEOlxuICAgICAgICAgICAgICAgIHZhciBkZXZpY2VJZCA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImRldmljZUlkXCIpXG4gICAgICAgICAgICAgICAgaWYgKGRldmljZUlkID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHV1aWQgPSB0aGlzLl9nZW5hcmF0ZVVVSUQoKVxuICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJkZXZpY2VJZFwiLHV1aWQpXG4gICAgICAgICAgICAgICAgICAgIGRldmljZUlkID0gdXVpZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtc2dPYmoubWVzc2FnZS5jb2RlID0gZGV2aWNlSWRcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJMb2dpbiB0eXBlIGVycm86IG5vdyBpdCdzIFwiICsgbG9naW5UeXBlKVxuICAgICAgICB9XG4gICAgICAgIGlmIChhc3luY0ZsYWcgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgIG1zZ09iai5zdWNjZXNzQ2FsbEJhY2sgPSBmdW5jdGlvbih4aHIpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZSA9IHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSlcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS50eXBlID09IFwibG9naW5fc3VjY2Vzc1wiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBsYXllcklkID0gcmVzcG9uc2UucGxheWVySWRcbiAgICAgICAgICAgICAgICBzZWxmLnBsYXllcklkID0gcGxheWVySWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlLnR5cGUgPT0gXCJsb2dpbl9mYWlsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG5ldHdvcmtNZ3Iuc2VuZE1lc3NhZ2VCeU1zZ09iaihtc2dPYmopXG4gICAgfVxufSk7XG5cbnZhciBzaGFyZWRMb2dpbk1nciA9IG5ldyBMb2dpbk1ncigpXG5tb2R1bGUuZXhwb3J0cyA9IHNoYXJlZExvZ2luTWdyIl19