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
        containerContentNode: cc.Node,
        closeButtonNode: cc.Node,
        bgNode: cc.Node,
        othersNode: cc.Node,
        elementPrefab: cc.Prefab,

        elementDis: 100
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.setupUI()
    },

    setupUI() {
        this.bgNode.width = cc.winSize.width
        this.bgNode.height = cc.winSize.height
        this.bgNode.on("touchstart",function(){
            require("systemsMgr").closeSystem("selectSectionSys")
        })

        this.closeButtonNode.on("click",function(){
            require("systemsMgr").closeSystem("selectSectionSys")
        })

        var sectionConfig = require("sectionConfig")
        var contentHeight = 0
        for (var key in sectionConfig) {
            var node = cc.instantiate(this.elementPrefab)
            var mgr = node.getComponent("selectSectionElementMgr")
            mgr.sectionKey = key
            mgr.selectSectionUINode = this.node

            node.y = contentHeight
            contentHeight += node.height
            contentHeight += this.elementDis
            this.containerContentNode.addChild(node)
        }

        if (this.containerContentNode.height < contentHeight) {
            this.containerContentNode.height = contentHeight
        }
    }
    // update (dt) {},
});
