"use strict";
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