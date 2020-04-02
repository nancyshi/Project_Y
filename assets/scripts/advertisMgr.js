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
    extends: cc.Component,

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
    },

    onVideoAdEnd() {
        if (this.delegate != null && typeof this.delegate.onVideoAdEnd == "function") {
            this.delegate.onVideoAdEnd()
        }
    },
    onVideoAdNotEnd(defaultNoti = true){
        if (defaultNoti == true) {
            var notificationSys = require("notificationMgr")
            notificationSys.showNoti("看完视频才能获得奖励哦~")
        }
        if (this.delegate != null && typeof this.delegate.onVideoAdNotEnd == "function") {
            this.delegate.onVideoAdNotEnd()
        }
    },
    onVideoAdLoadError(err){
        console.log("拉取广告失败")
        if (this.delegate != null && typeof this.delegate.onVideoAdLoadError == "function") {
            this.delegate.onVideoAdLoadError(err)
        }
    },
    onVideoAdShowError(err) {
        if (this.delegate != null && typeof this.delegate.onVideoAdShowError == "function") {
            this.delegate.onVideoAdShowError(err)
        }
    },
    initAds(){
        if (this.videoAd == null) {
            if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                var self = this
                this.videoAd = wx.createRewardedVideoAd({adUnitId: this.wechatAdId})
                this.videoAd.onLoad(function(){
                    console.log("拉取广告成功")
                })
                this.videoAd.onError(function(err){
                    self.onVideoAdLoadError(err)
                })
                this.videoAd.onClose(function(res){
                    if (res && res.isEnded) {
                        self.onVideoAdEnd()
                    }
                    else {
                        self.onVideoAdNotEnd()
                    }
                })
            }
        }
    },
    showVideoAd() {

        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            var self = this
            this.videoAd.load()
            .then(function(){
                self.videoAd.show()
            })
            .catch(function(err){
                self.onVideoAdShowError(err)
            })
        }
    }
});

var sharedAdvertisMgr = new AdvertisMgr()
module.exports = sharedAdvertisMgr