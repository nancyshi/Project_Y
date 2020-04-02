// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var NotificationMgr = cc.Class({
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
        lastTime: 3
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    showNoti(str) {
        var notiPrefab = require("resMgr").reses.notiSysPrefab
        var notiNode = cc.instantiate(notiPrefab)
        var label = notiNode.getChildByName("label")
        label.getComponent(cc.Label).string = str
        var currentSceneCanvas = cc.director.getScene().getChildByName("Canvas")
        currentSceneCanvas.addChild(notiNode)
        var self = this
        cc.tween(notiNode)
            .delay(self.lastTime)
            .to(0.3, {opacity: 0})
            .call(function(){
                notiNode.removeFromParent()
            })
            .start()
    }
    // update (dt) {},
});

var sharedNotificationMgr = new NotificationMgr()
module.exports = sharedNotificationMgr