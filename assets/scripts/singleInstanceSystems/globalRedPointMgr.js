// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var GlobalRedPointMgr = cc.Class({
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
        currentRedPointMgrs: []
    },

    setupRedPoints() {
        this.getRedPointMgrs()
        for (var index in this.currentRedPointMgrs) {
            var oneRedPointMgr = this.currentRedPointMgrs[index]
            if (typeof oneRedPointMgr.setupRedPoint === "function") {
                oneRedPointMgr.setupRedPoint()
            }
        }
    },

    getRedPointMgrs() {
        this.currentRedPointMgrs = []
        var currentScene = cc.director.getScene()
        var self = this
        var temp = function(givenRootNode) {
            for (var index in givenRootNode.children) {
                var oneChildNode = givenRootNode.children[index]
                var oneRedPointMgr = oneChildNode.getComponent("redPointMgr")
                if (oneRedPointMgr != null) {
                    self.currentRedPointMgrs.push(oneRedPointMgr)
                }
                temp(oneChildNode)
            }
        }

        temp(currentScene.getChildByName("Canvas"))
    }
});

module.exports = new GlobalRedPointMgr()
