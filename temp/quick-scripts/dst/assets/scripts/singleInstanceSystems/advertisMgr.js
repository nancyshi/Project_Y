
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/singleInstanceSystems/advertisMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd2cc9xBWpRNy65AgLl//eBO', 'advertisMgr');
// scripts/singleInstanceSystems/advertisMgr.js

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
var AdvertisMgr = cc.Class({
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
    videoAd: null,
    delegate: null,
    wechatAdId: "xxxxx",
    isReady: {
      get: function get() {
        return this._isReady;
      },
      set: function set(value) {
        this._isReady = value; //1 = ok , 2 = loading 3 = erro

        if (value == 1 && this.showStatus == 1) {
          sdkbox.PluginAdMob.show("rewarded");
        } else if (value == 3 && this.showStatus == 1) {
          this.showStatus = 0;
          this.removeActivityNode();

          require("notificationMgr").showNoti("something wrong with ad system , retry later");
        } else if (value == 2 && this.showStatus == 1) {
          this.showActivityNode();
        }
      }
    },
    showStatus: {
      get: function get() {
        return this._showStatus;
      },
      set: function set(value) {
        this._showStatus = value; //0 = init 1 = will show 2 = showing
      }
    },
    activityNode: null,
    isRewardSend: false
  },
  showActivityNode: function showActivityNode() {
    var activityNodePrefab = require("resMgr").reses["activityNodePrefab"];

    var activityNode = cc.instantiate(activityNodePrefab);
    var bg = activityNode.getChildByName("bg");
    bg.width = cc.winSize.width;
    bg.height = cc.winSize.height;
    bg.on("touchstart", function () {});
    var activity = activityNode.getChildByName("activity");
    cc.tween(activity).repeatForever(cc.tween().by(2, {
      angle: 360
    })).start();
    this.activityNode = activityNode;
    cc.director.getScene().getChildByName("Canvas").addChild(this.activityNode);
  },
  removeActivityNode: function removeActivityNode() {
    if (this.activityNode != null && this.activityNode.parent != null) {
      this.activityNode.destroy();
      this.activityNode.removeFromParent();
      this.activityNode = null;
    }
  },
  onVideoAdEnd: function onVideoAdEnd() {
    if (this.delegate != null && typeof this.delegate.onVideoAdEnd == "function") {
      this.delegate.onVideoAdEnd();
    }
  },
  onVideoAdNotEnd: function onVideoAdNotEnd() {
    var defaultNoti = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (defaultNoti == true) {
      var notificationSys = require("notificationMgr");

      var str = require("textConfig").getTextByIdAndLanguageType(162);

      notificationSys.pushNoti(str);
    }

    if (this.delegate != null && typeof this.delegate.onVideoAdNotEnd == "function") {
      this.delegate.onVideoAdNotEnd();
    }
  },
  onVideoAdLoadError: function onVideoAdLoadError(err) {
    console.log("拉取广告失败");

    if (this.delegate != null && typeof this.delegate.onVideoAdLoadError == "function") {
      this.delegate.onVideoAdLoadError(err);
    }
  },
  onVideoAdShowError: function onVideoAdShowError(err) {
    if (this.delegate != null && typeof this.delegate.onVideoAdShowError == "function") {
      this.delegate.onVideoAdShowError(err);
    }
  },
  initAds: function initAds() {
    if (this.videoAd == null) {
      if (cc.sys.platform == cc.sys.WECHAT_GAME) {
        var self = this;
        this.videoAd = wx.createRewardedVideoAd({
          adUnitId: this.wechatAdId
        });
        this.videoAd.onLoad(function () {
          console.log("拉取广告成功");
        });
        this.videoAd.onError(function (err) {
          self.onVideoAdLoadError(err);
        });
        this.videoAd.onClose(function (res) {
          if (res && res.isEnded) {
            self.onVideoAdEnd();
          } else {
            self.onVideoAdNotEnd();
          }
        });
      } else if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_ANDROID) {
        var self = this;
        sdkbox.PluginAdMob.setListener({
          adViewDidReceiveAd: function adViewDidReceiveAd(name) {
            self.isReady = 1;
          },
          adViewDidFailToReceiveAdWithError: function adViewDidFailToReceiveAdWithError(name, msg) {
            self.isReady = 3;
            self.onVideoAdLoadError(msg);
          },
          adViewWillPresentScreen: function adViewWillPresentScreen(name) {
            self.removeActivityNode();
            self.showStatus = 2;
            self.isRewardSend = false;
            cc.audioEngine.pauseAll();
            var mainSceneMgr = cc.director.getScene().getChildByName("Canvas").getComponent("mainSceneMgr");

            if (mainSceneMgr != null) {
              mainSceneMgr.canShowNoti = false;
            }
          },
          adViewDidDismissScreen: function adViewDidDismissScreen(name) {
            self.showStatus = 0;

            if (self.isRewardSend == false) {
              self.onVideoAdNotEnd(true);
            }

            self.isReady = 2;
            sdkbox.PluginAdMob.cache("rewarded");
            cc.audioEngine.resumeAll();
            var mainSceneMgr = cc.director.getScene().getChildByName("Canvas").getComponent("mainSceneMgr");

            if (mainSceneMgr != null) {
              mainSceneMgr.canShowNoti = true;
            }
          },
          adViewWillDismissScreen: function adViewWillDismissScreen(name) {},
          adViewWillLeaveApplication: function adViewWillLeaveApplication(name) {},
          reward: function reward(name, currency, amount) {
            self.isRewardSend = true;
            self.onVideoAdEnd();
          }
        });
        this.isReady = 2;
        sdkbox.PluginAdMob.init();
        sdkbox.PluginAdMob.cache("rewarded");
      }
    }
  },
  showVideoAd: function showVideoAd() {
    if (cc.sys.platform == cc.sys.WECHAT_GAME) {
      var self = this;
      this.videoAd.load().then(function () {
        self.videoAd.show();
      })["catch"](function (err) {
        self.onVideoAdShowError(err);
      });
    } else if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS) {
      this.showStatus = 1;
      cc.log(this.isReady + " : current isready");

      if (this.isReady == 1) {
        this.showActivityNode();
        sdkbox.PluginAdMob.show("rewarded");
      } else if (this.isReady == 2) {
        //just wait set event of isReady to 1
        this.showActivityNode();
      } else if (this.isReady == 3) {
        //reload once and then show
        this.isReady = 2;
        sdkbox.PluginAdMob.cache("rewarded"); //wait set event of isReady to 1
      }
    } else {
      var str = require("textConfig").getTextByIdAndLanguageType(166);

      require("notificationMgr").pushNoti(str);
    }
  }
});
var sharedAdvertisMgr = new AdvertisMgr();
module.exports = sharedAdvertisMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3NpbmdsZUluc3RhbmNlU3lzdGVtcy9hZHZlcnRpc01nci5qcyJdLCJuYW1lcyI6WyJBZHZlcnRpc01nciIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidmlkZW9BZCIsImRlbGVnYXRlIiwid2VjaGF0QWRJZCIsImlzUmVhZHkiLCJnZXQiLCJfaXNSZWFkeSIsInNldCIsInZhbHVlIiwic2hvd1N0YXR1cyIsInNka2JveCIsIlBsdWdpbkFkTW9iIiwic2hvdyIsInJlbW92ZUFjdGl2aXR5Tm9kZSIsInJlcXVpcmUiLCJzaG93Tm90aSIsInNob3dBY3Rpdml0eU5vZGUiLCJfc2hvd1N0YXR1cyIsImFjdGl2aXR5Tm9kZSIsImlzUmV3YXJkU2VuZCIsImFjdGl2aXR5Tm9kZVByZWZhYiIsInJlc2VzIiwiaW5zdGFudGlhdGUiLCJiZyIsImdldENoaWxkQnlOYW1lIiwid2lkdGgiLCJ3aW5TaXplIiwiaGVpZ2h0Iiwib24iLCJhY3Rpdml0eSIsInR3ZWVuIiwicmVwZWF0Rm9yZXZlciIsImJ5IiwiYW5nbGUiLCJzdGFydCIsImRpcmVjdG9yIiwiZ2V0U2NlbmUiLCJhZGRDaGlsZCIsInBhcmVudCIsImRlc3Ryb3kiLCJyZW1vdmVGcm9tUGFyZW50Iiwib25WaWRlb0FkRW5kIiwib25WaWRlb0FkTm90RW5kIiwiZGVmYXVsdE5vdGkiLCJub3RpZmljYXRpb25TeXMiLCJzdHIiLCJnZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSIsInB1c2hOb3RpIiwib25WaWRlb0FkTG9hZEVycm9yIiwiZXJyIiwiY29uc29sZSIsImxvZyIsIm9uVmlkZW9BZFNob3dFcnJvciIsImluaXRBZHMiLCJzeXMiLCJwbGF0Zm9ybSIsIldFQ0hBVF9HQU1FIiwic2VsZiIsInd4IiwiY3JlYXRlUmV3YXJkZWRWaWRlb0FkIiwiYWRVbml0SWQiLCJvbkxvYWQiLCJvbkVycm9yIiwib25DbG9zZSIsInJlcyIsImlzRW5kZWQiLCJvcyIsIk9TX0lPUyIsIk9TX0FORFJPSUQiLCJzZXRMaXN0ZW5lciIsImFkVmlld0RpZFJlY2VpdmVBZCIsIm5hbWUiLCJhZFZpZXdEaWRGYWlsVG9SZWNlaXZlQWRXaXRoRXJyb3IiLCJtc2ciLCJhZFZpZXdXaWxsUHJlc2VudFNjcmVlbiIsImF1ZGlvRW5naW5lIiwicGF1c2VBbGwiLCJtYWluU2NlbmVNZ3IiLCJnZXRDb21wb25lbnQiLCJjYW5TaG93Tm90aSIsImFkVmlld0RpZERpc21pc3NTY3JlZW4iLCJjYWNoZSIsInJlc3VtZUFsbCIsImFkVmlld1dpbGxEaXNtaXNzU2NyZWVuIiwiYWRWaWV3V2lsbExlYXZlQXBwbGljYXRpb24iLCJyZXdhcmQiLCJjdXJyZW5jeSIsImFtb3VudCIsImluaXQiLCJzaG93VmlkZW9BZCIsImxvYWQiLCJ0aGVuIiwic2hhcmVkQWR2ZXJ0aXNNZ3IiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLFdBQVcsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdkIsYUFBU0QsRUFBRSxDQUFDRSxTQURXO0FBR3ZCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsT0FBTyxFQUFFLElBaEJEO0FBaUJSQyxJQUFBQSxRQUFRLEVBQUUsSUFqQkY7QUFtQlJDLElBQUFBLFVBQVUsRUFBRSxPQW5CSjtBQXFCUkMsSUFBQUEsT0FBTyxFQUFFO0FBQ0xDLE1BQUFBLEdBREssaUJBQ0M7QUFDRixlQUFPLEtBQUtDLFFBQVo7QUFDSCxPQUhJO0FBSUxDLE1BQUFBLEdBSkssZUFJREMsS0FKQyxFQUlNO0FBQ1AsYUFBS0YsUUFBTCxHQUFnQkUsS0FBaEIsQ0FETyxDQUVQOztBQUNBLFlBQUlBLEtBQUss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QUFQLElBQWFyRSxFQUFFLENBQUN5RCxHQUFILENBQU9jLFVBQXBCLElBQWtDdkUsRUFBRSxDQUFDeUQsR0FBSCxDQUFPWSxFQUFQLElBQWFyRSxFQUFFLENBQUN5RCxHQUFILENBQU9hLE1BQTFELEVBQWtFO0FBQ25FLFdBQUsxRCxVQUFMLEdBQWtCLENBQWxCO0FBQ0FaLE1BQUFBLEVBQUUsQ0FBQ3NELEdBQUgsQ0FBTyxLQUFLL0MsT0FBTCxHQUFlLG9CQUF0Qjs7QUFDQSxVQUFJLEtBQUtBLE9BQUwsSUFBZ0IsQ0FBcEIsRUFBdUI7QUFDbkIsYUFBS1ksZ0JBQUw7QUFDQU4sUUFBQUEsTUFBTSxDQUFDQyxXQUFQLENBQW1CQyxJQUFuQixDQUF3QixVQUF4QjtBQUNILE9BSEQsTUFJSyxJQUFJLEtBQUtSLE9BQUwsSUFBZ0IsQ0FBcEIsRUFBdUI7QUFDeEI7QUFDQSxhQUFLWSxnQkFBTDtBQUNILE9BSEksTUFJQSxJQUFJLEtBQUtaLE9BQUwsSUFBZ0IsQ0FBcEIsRUFBdUI7QUFDeEI7QUFDQSxhQUFLQSxPQUFMLEdBQWUsQ0FBZjtBQUNBTSxRQUFBQSxNQUFNLENBQUNDLFdBQVAsQ0FBbUJzRSxLQUFuQixDQUF5QixVQUF6QixFQUh3QixDQUl4QjtBQUNIO0FBQ0osS0FqQkksTUFtQkE7QUFDRCxVQUFJcEMsR0FBRyxHQUFHL0IsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQmdDLDBCQUF0QixDQUFpRCxHQUFqRCxDQUFWOztBQUNBaEMsTUFBQUEsT0FBTyxDQUFDLGlCQUFELENBQVAsQ0FBMkJpQyxRQUEzQixDQUFvQ0YsR0FBcEM7QUFDSDtBQUNKO0FBbk9zQixDQUFULENBQWxCO0FBc09BLElBQUkrQyxpQkFBaUIsR0FBRyxJQUFJaEcsV0FBSixFQUF4QjtBQUNBaUcsTUFBTSxDQUFDQyxPQUFQLEdBQWlCRixpQkFBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxudmFyIEFkdmVydGlzTWdyID0gY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICAgICAgdmlkZW9BZDogbnVsbCxcbiAgICAgICAgZGVsZWdhdGU6IG51bGwsXG5cbiAgICAgICAgd2VjaGF0QWRJZDogXCJ4eHh4eFwiLFxuXG4gICAgICAgIGlzUmVhZHk6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faXNSZWFkeVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzUmVhZHkgPSB2YWx1ZVxuICAgICAgICAgICAgICAgIC8vMSA9IG9rICwgMiA9IGxvYWRpbmcgMyA9IGVycm9cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gMSAmJiB0aGlzLnNob3dTdGF0dXMgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBzZGtib3guUGx1Z2luQWRNb2Iuc2hvdyhcInJld2FyZGVkXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlID09IDMgJiYgdGhpcy5zaG93U3RhdHVzID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93U3RhdHVzID0gMFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUFjdGl2aXR5Tm9kZSgpXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoXCJub3RpZmljYXRpb25NZ3JcIikuc2hvd05vdGkoXCJzb21ldGhpbmcgd3Jvbmcgd2l0aCBhZCBzeXN0ZW0gLCByZXRyeSBsYXRlclwiKVxuICAgIFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlID09IDIgJiYgdGhpcy5zaG93U3RhdHVzID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QWN0aXZpdHlOb2RlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd1N0YXR1czoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaG93U3RhdHVzXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd1N0YXR1cyA9IHZhbHVlXG4gICAgICAgICAgICAgICAgLy8wID0gaW5pdCAxID0gd2lsbCBzaG93IDIgPSBzaG93aW5nXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBhY3Rpdml0eU5vZGU6IG51bGwsXG5cbiAgICAgICAgaXNSZXdhcmRTZW5kOiBmYWxzZVxuICAgIH0sXG5cbiAgICBzaG93QWN0aXZpdHlOb2RlKCkge1xuICAgICAgICB2YXIgYWN0aXZpdHlOb2RlUHJlZmFiID0gcmVxdWlyZShcInJlc01nclwiKS5yZXNlc1tcImFjdGl2aXR5Tm9kZVByZWZhYlwiXVxuICAgICAgICB2YXIgYWN0aXZpdHlOb2RlID0gY2MuaW5zdGFudGlhdGUoYWN0aXZpdHlOb2RlUHJlZmFiKVxuICAgICAgICB2YXIgYmcgPSBhY3Rpdml0eU5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKVxuICAgICAgICBiZy53aWR0aCA9IGNjLndpblNpemUud2lkdGhcbiAgICAgICAgYmcuaGVpZ2h0ID0gY2Mud2luU2l6ZS5oZWlnaHRcbiAgICAgICAgYmcub24oXCJ0b3VjaHN0YXJ0XCIsZnVuY3Rpb24oKXt9KVxuXG4gICAgICAgIHZhciBhY3Rpdml0eSA9IGFjdGl2aXR5Tm9kZS5nZXRDaGlsZEJ5TmFtZShcImFjdGl2aXR5XCIpXG4gICAgICAgIGNjLnR3ZWVuKGFjdGl2aXR5KVxuICAgICAgICAgICAgLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKVxuICAgICAgICAgICAgICAgICAgICAuYnkoMix7YW5nbGU6IDM2MH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3RhcnQoKVxuICAgICAgICB0aGlzLmFjdGl2aXR5Tm9kZSA9IGFjdGl2aXR5Tm9kZVxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKFwiQ2FudmFzXCIpLmFkZENoaWxkKHRoaXMuYWN0aXZpdHlOb2RlKVxuICAgIH0sXG5cbiAgICByZW1vdmVBY3Rpdml0eU5vZGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2aXR5Tm9kZSAhPSBudWxsICYmIHRoaXMuYWN0aXZpdHlOb2RlLnBhcmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5Tm9kZS5kZXN0cm95KClcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlOb2RlLnJlbW92ZUZyb21QYXJlbnQoKVxuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eU5vZGUgPSBudWxsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25WaWRlb0FkRW5kKCkge1xuICAgICAgICBpZiAodGhpcy5kZWxlZ2F0ZSAhPSBudWxsICYmIHR5cGVvZiB0aGlzLmRlbGVnYXRlLm9uVmlkZW9BZEVuZCA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUub25WaWRlb0FkRW5kKClcbiAgICAgICAgfVxuICAgIH0sXG4gICAgb25WaWRlb0FkTm90RW5kKGRlZmF1bHROb3RpID0gdHJ1ZSl7XG4gICAgICAgIGlmIChkZWZhdWx0Tm90aSA9PSB0cnVlKSB7XG4gICAgICAgICAgICB2YXIgbm90aWZpY2F0aW9uU3lzID0gcmVxdWlyZShcIm5vdGlmaWNhdGlvbk1nclwiKVxuICAgICAgICAgICAgdmFyIHN0ciA9IHJlcXVpcmUoXCJ0ZXh0Q29uZmlnXCIpLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDE2MilcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblN5cy5wdXNoTm90aShzdHIpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZGVsZWdhdGUgIT0gbnVsbCAmJiB0eXBlb2YgdGhpcy5kZWxlZ2F0ZS5vblZpZGVvQWROb3RFbmQgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlLm9uVmlkZW9BZE5vdEVuZCgpXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG9uVmlkZW9BZExvYWRFcnJvcihlcnIpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIuaLieWPluW5v+WRiuWksei0pVwiKVxuICAgICAgICBpZiAodGhpcy5kZWxlZ2F0ZSAhPSBudWxsICYmIHR5cGVvZiB0aGlzLmRlbGVnYXRlLm9uVmlkZW9BZExvYWRFcnJvciA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUub25WaWRlb0FkTG9hZEVycm9yKGVycilcbiAgICAgICAgfVxuICAgIH0sXG4gICAgb25WaWRlb0FkU2hvd0Vycm9yKGVycikge1xuICAgICAgICBpZiAodGhpcy5kZWxlZ2F0ZSAhPSBudWxsICYmIHR5cGVvZiB0aGlzLmRlbGVnYXRlLm9uVmlkZW9BZFNob3dFcnJvciA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUub25WaWRlb0FkU2hvd0Vycm9yKGVycilcbiAgICAgICAgfVxuICAgIH0sXG4gICAgaW5pdEFkcygpe1xuICAgICAgICBpZiAodGhpcy52aWRlb0FkID09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb0FkID0gd3guY3JlYXRlUmV3YXJkZWRWaWRlb0FkKHthZFVuaXRJZDogdGhpcy53ZWNoYXRBZElkfSlcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvQWQub25Mb2FkKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5ouJ5Y+W5bm/5ZGK5oiQ5YqfXCIpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvQWQub25FcnJvcihmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm9uVmlkZW9BZExvYWRFcnJvcihlcnIpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvQWQub25DbG9zZShmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5pc0VuZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm9uVmlkZW9BZEVuZCgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm9uVmlkZW9BZE5vdEVuZCgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUyB8fCBjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgICBzZGtib3guUGx1Z2luQWRNb2Iuc2V0TGlzdGVuZXIoe1xuICAgICAgICAgICAgICAgICAgICBhZFZpZXdEaWRSZWNlaXZlQWQ6IGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc1JlYWR5ID0gMVxuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIGFkVmlld0RpZEZhaWxUb1JlY2VpdmVBZFdpdGhFcnJvcjogZnVuY3Rpb24obmFtZSxtc2cpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc1JlYWR5ID0gM1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5vblZpZGVvQWRMb2FkRXJyb3IobXNnKVxuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIGFkVmlld1dpbGxQcmVzZW50U2NyZWVuOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZUFjdGl2aXR5Tm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dTdGF0dXMgPSAyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzUmV3YXJkU2VuZCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZUFsbCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWFpblNjZW5lTWdyID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZShcIkNhbnZhc1wiKS5nZXRDb21wb25lbnQoXCJtYWluU2NlbmVNZ3JcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYWluU2NlbmVNZ3IgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5TY2VuZU1nci5jYW5TaG93Tm90aSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgYWRWaWV3RGlkRGlzbWlzc1NjcmVlbjogZnVuY3Rpb24obmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93U3RhdHVzID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuaXNSZXdhcmRTZW5kID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5vblZpZGVvQWROb3RFbmQodHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXNSZWFkeSA9IDJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNka2JveC5QbHVnaW5BZE1vYi5jYWNoZShcInJld2FyZGVkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWVBbGwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1haW5TY2VuZU1nciA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoXCJDYW52YXNcIikuZ2V0Q29tcG9uZW50KFwibWFpblNjZW5lTWdyXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFpblNjZW5lTWdyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluU2NlbmVNZ3IuY2FuU2hvd05vdGkgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgYWRWaWV3V2lsbERpc21pc3NTY3JlZW46IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIGFkVmlld1dpbGxMZWF2ZUFwcGxpY2F0aW9uOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkOiBmdW5jdGlvbihuYW1lLGN1cnJlbmN5LCBhbW91bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXNSZXdhcmRTZW5kID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5vblZpZGVvQWRFbmQoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLmlzUmVhZHkgPSAyXG4gICAgICAgICAgICAgICAgc2RrYm94LlBsdWdpbkFkTW9iLmluaXQoKVxuICAgICAgICAgICAgICAgIHNka2JveC5QbHVnaW5BZE1vYi5jYWNoZShcInJld2FyZGVkXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNob3dWaWRlb0FkKCkge1xuXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHRoaXMudmlkZW9BZC5sb2FkKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc2VsZi52aWRlb0FkLnNob3coKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgIHNlbGYub25WaWRlb0FkU2hvd0Vycm9yKGVycilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQgfHwgY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1N0YXR1cyA9IDFcbiAgICAgICAgICAgIGNjLmxvZyh0aGlzLmlzUmVhZHkgKyBcIiA6IGN1cnJlbnQgaXNyZWFkeVwiKVxuICAgICAgICAgICAgaWYgKHRoaXMuaXNSZWFkeSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93QWN0aXZpdHlOb2RlKClcbiAgICAgICAgICAgICAgICBzZGtib3guUGx1Z2luQWRNb2Iuc2hvdyhcInJld2FyZGVkXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzUmVhZHkgPT0gMikge1xuICAgICAgICAgICAgICAgIC8vanVzdCB3YWl0IHNldCBldmVudCBvZiBpc1JlYWR5IHRvIDFcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dBY3Rpdml0eU5vZGUoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc1JlYWR5ID09IDMpIHtcbiAgICAgICAgICAgICAgICAvL3JlbG9hZCBvbmNlIGFuZCB0aGVuIHNob3dcbiAgICAgICAgICAgICAgICB0aGlzLmlzUmVhZHkgPSAyXG4gICAgICAgICAgICAgICAgc2RrYm94LlBsdWdpbkFkTW9iLmNhY2hlKFwicmV3YXJkZWRcIilcbiAgICAgICAgICAgICAgICAvL3dhaXQgc2V0IGV2ZW50IG9mIGlzUmVhZHkgdG8gMVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgc3RyID0gcmVxdWlyZShcInRleHRDb25maWdcIikuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTY2KVxuICAgICAgICAgICAgcmVxdWlyZShcIm5vdGlmaWNhdGlvbk1nclwiKS5wdXNoTm90aShzdHIpXG4gICAgICAgIH1cbiAgICB9XG59KTtcblxudmFyIHNoYXJlZEFkdmVydGlzTWdyID0gbmV3IEFkdmVydGlzTWdyKClcbm1vZHVsZS5leHBvcnRzID0gc2hhcmVkQWR2ZXJ0aXNNZ3IiXX0=