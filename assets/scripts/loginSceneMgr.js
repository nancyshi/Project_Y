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
        dataMgr: null,
        loginMgr: null,
        networkMgr: null,
        isLogining: false,
        changeSceneAnimationTime: 2,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("touchstart",this.onTouchStart,this)
    },

    start () {
        this.dataMgr = require("dataMgr")
        this.dataMgr.delegate = this
        this.loginMgr = require("loginMgr")
        this.networkMgr = require("networkMgr")
        this.networkMgr.delegate = this
        var retryNode = cc.find("Canvas/retry")
        cc.tween(retryNode)
            .repeatForever(
                cc.tween()
                    .to(0.5,{scale: 1.2})
                    .to(0.5,{scale: 0.8})
            )
            .start()

        this.login()
        //this._debugLogin()
    },

    onPlayerDataUpdated() {
        require("advertisMgr").initAds()
        cc.find("Canvas/loginInfo/textNode").getComponent(cc.Label).string = "登陆成功！"
        //animation 
        for (var index in this.node.children) {
            var self = this

            var temp = function(i) {
                var node = self.node.children[i]
                cc.tween(node)
                    .to(self.changeSceneAnimationTime, {opacity: 0})
                    .start()
            }
            temp(index)
        }

        cc.tween(this.node)
            .delay(this.changeSceneAnimationTime)
            .call(function(){
                require("resMgr").loadReses(function(){
                    cc.director.loadScene("mainScene")
                })
            })
            .start()
    },

    login() {
        this.isLogining = true
        var retryNode = cc.find("Canvas/retry")
        retryNode.active = false
        cc.find("Canvas/loginInfo/textNode").getComponent(cc.Label).string = "登陆中，请稍候"

        var loginType = null
        var platform = cc.sys.platform
        if (platform == cc.sys.WECHAT_GAME) {
            loginType = this.loginMgr.LoginType.WE_CHAT_GAME
        }
        else {
            loginType = this.loginMgr.LoginType.DEVICE_ID
        }

        this.loginMgr.login(loginType)
    },

    onTouchStart(event) {
        if (this.isLogining == false) {
            this.login()
        }
    },
    // update (dt) {},

    _debugLogin() {
        this.dataMgr.playerData = {
            id: 100000001,
            name: "new Player",
            physicalPower: 10,
            maxPhysicalPower: 10,
            heart: 10,
            maxHeart: 10,
            currentSection: 1,
            currentLevel: 2,
            physicalPowerCostedFlag: 0
        }
        this.onPlayerDataUpdated()
    },

    onDestroy() {
        this.node.off("touchstart",this.onTouchStart,this)
    },
    onAllRetryFailed() {
        var loginInfo = cc.find("Canvas/loginInfo")
        var loginInfoLabel = loginInfo.getChildByName("textNode").getComponent(cc.Label)
        loginInfoLabel.string = "连接服务器失败，请点击重试"
        loginInfo.active = true
        var retryNode = cc.find("Canvas/retry")
        retryNode.active = true
        this.isLogining = false
    }
    
});
