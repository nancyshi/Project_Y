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

        isReady: {
            get() {
                return this._isReady
            },
            set(value) {
                this._isReady = value
                //1 = ok , 2 = loading 3 = erro
                if (value == 1 && this.showStatus == 1) {
                    //this.showActivityNode()
                    sdkbox.PluginAdMob.show("rewarded")
                    this.stopWaitting()
                }
                else if (value == 3 && this.showStatus == 1) {
                    this.showStatus = 0
                    this.removeActivityNode()
                    var str = require("textConfig").getTextByIdAndLanguageType(175)
                    require("notificationMgr").showNoti(str)
    
                }

                else if (value == 2 && this.showStatus == 1) {
                    this.showActivityNode()
                }
            }
        },

        showStatus: {
            get() {
                return this._showStatus
            },
            set(value) {
                this._showStatus = value
                //0 = init 1 = will show 2 = showing

            }
        },

        activityNode: null,

        isRewardSend: false,

        waittingTimer: {
            get() {
                return this._waittingTimer
            },
            set(value) {
                this._waittingTimer = value
                if ( typeof value == "number" && value <= 0) {
                    this.stopWaitting()
                    this.showStatus = 0
                    var str = require("textConfig").getTextByIdAndLanguageType(176)
                    require("notificationMgr").showNoti(str)
                    this.removeActivityNode()
                }
            }
        },

        maxWaittingTime: 10
    },

    showActivityNode() {
        if (this.activityNode != null) {
            return
        }
        var activityNodePrefab = require("resMgr").reses["activityNodePrefab"]
        var activityNode = cc.instantiate(activityNodePrefab)
        var bg = activityNode.getChildByName("bg")
        bg.width = cc.winSize.width
        bg.height = cc.winSize.height
        bg.on("touchstart",function(){})

        var activity = activityNode.getChildByName("activity")
        cc.tween(activity)
            .repeatForever(cc.tween()
                    .by(2,{angle: 360})
            )
            .start()
        this.activityNode = activityNode
        cc.director.getScene().getChildByName("Canvas").addChild(this.activityNode)
    },

    removeActivityNode() {
        if (this.activityNode != null && this.activityNode.parent != null) {
            this.activityNode.destroy()
            this.activityNode.removeFromParent()
            this.activityNode = null
        }
    },

    onVideoAdEnd() {
        if (this.delegate != null && typeof this.delegate.onVideoAdEnd == "function") {
            this.delegate.onVideoAdEnd()
        }
    },
    onVideoAdNotEnd(defaultNoti = true){
        if (defaultNoti == true) {
            var notificationSys = require("notificationMgr")
            var str = require("textConfig").getTextByIdAndLanguageType(162)
            notificationSys.pushNoti(str)
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

            else if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_ANDROID) {
                var self = this
                sdkbox.PluginAdMob.setListener({
                    adViewDidReceiveAd: function(name){
                        self.isReady = 1
                    },

                    adViewDidFailToReceiveAdWithError: function(name,msg){
                        self.isReady = 3
                        self.onVideoAdLoadError(msg)
                    },

                    adViewWillPresentScreen: function(name) {
                        self.removeActivityNode()
                        self.showStatus = 2
                        self.isRewardSend = false
                        cc.audioEngine.pauseAll()
                        var mainSceneMgr = cc.director.getScene().getChildByName("Canvas").getComponent("mainSceneMgr")
                        if (mainSceneMgr != null) {
                            mainSceneMgr.canShowNoti = false
                        }
                    },

                    adViewDidDismissScreen: function(name) {
                        self.showStatus = 0
                        if (self.isRewardSend == false) {
                            self.onVideoAdNotEnd(true)
                        }
                        self.isReady = 2
                        sdkbox.PluginAdMob.cache("rewarded")
                        cc.audioEngine.resumeAll()
                        var mainSceneMgr = cc.director.getScene().getChildByName("Canvas").getComponent("mainSceneMgr")
                        if (mainSceneMgr != null) {
                            mainSceneMgr.canShowNoti = true
                        }
                    },

                    adViewWillDismissScreen: function(name) {
                        
                    },

                    adViewWillLeaveApplication: function(name) {
                        
                    },
                    reward: function(name,currency, amount) {
                        self.isRewardSend = true
                        self.onVideoAdEnd()
                    }
                })
                this.isReady = 2
                sdkbox.PluginAdMob.init()
                sdkbox.PluginAdMob.cache("rewarded")
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

        else if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS) {
            this.showStatus = 1
            // cc.log(this.isReady + " : current isready")
            if (this.isReady == 1) {
                this.showActivityNode()
                sdkbox.PluginAdMob.show("rewarded")
            }
            else if (this.isReady == 2) {
                //just wait set event of isReady to 1
                this.showActivityNode()
                this.startWaitting()
            }
            else if (this.isReady == 3) {
                //reload once and then show
                this.isReady = 2
                sdkbox.PluginAdMob.cache("rewarded")
                //wait set event of isReady to 1
            }
        }

        else {
            var str = require("textConfig").getTextByIdAndLanguageType(166)
            require("notificationMgr").pushNoti(str)
        }
    },

    startWaitting() {
        this.waittingTimer = this.maxWaittingTime
        this.schedule(this.waittingUpdate,1)
    },

    stopWaitting() {
        this.waittingTimer = null
        this.unschedule(this.waittingUpdate)
    },

    waittingUpdate() {
        if (this.waittingTimer >0) {
            this.waittingTimer -= 1
        }
    }
    
});

var sharedAdvertisMgr = new AdvertisMgr()
sharedAdvertisMgr.maxWaittingTime = 15
module.exports = sharedAdvertisMgr