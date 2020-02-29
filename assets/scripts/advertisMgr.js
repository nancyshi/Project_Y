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
        platform: null,
        videoAd: null,
        delegate: null
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
    born() {
        this.platform = cc.sys.platform
        switch(this.platform) {
            case cc.sys.WECHAT_GAME:
                this.videoAd = wx.createRewardedVideoAd({adUnitId: "wechatVideioAd"})
                break
        }
        if (this.videoAd == null) {
            cc.error("CREATE AD FAILED")
            return
        }

        this.videoAd.onClose = this.onADClose
        this.videoAd.onLoad = this.onADLoad
        this.videoAd.onErro = this.onADErro
    },

    onADClose(res) {
        switch(this.platform) {
            case cc.sys.WECHAT_GAME:
                if (res.isEnded == true) {
                    //totaly watched
                    if (this.delegate != null) {
                        this.delegate.onVideoADTotalyWatched()
                    }
                }
                else {
                    //not totaly watched
                    if (this.delegate != null) {
                        this.delegate.onVideoADNotTotalyWatched()
                    }
                }
                break
        }
    },
    onADLoad() {

    },

    onADErro(erro) {
        cc.error(erro.errCode)
    }
});
