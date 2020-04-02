"use strict";
cc._RF.push(module, 'f2d4dhkhWpLB6YTf+2pbgMu', 'rankingSystem');
// scripts/systems/rankingSystem.js

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
        uiPrefab: cc.Prefab,
        ui: null,
        enterButtonNode: null,
        rankNodePrefab: cc.Prefab,

        rankNodeStartY: 175.327,
        rankNodesVerDis: 20
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.ui = cc.instantiate(this.uiPrefab);
        var bg = this.ui.getChildByName("bg");
        bg.on("touchstart", this.close, this);
        var others = this.ui.getChildByName("others");
        var closeButtonNode = others.getChildByName("closeButton");
        closeButtonNode.on("click", this.close, this);
        if (this.enterButtonNode != null) {
            this.enterButtonNode.on("click", this.show, this);
        }
    },
    start: function start() {},
    show: function show() {
        var others = this.ui.getChildByName("others");
        others.scale = 0;
        if (this.ui.parent == null) {
            this.node.addChild(this.ui);
        }

        this.ui.active = true;
        cc.tween(others).to(0.3, { scale: 1 }).start();
    },
    close: function close() {
        var others = this.ui.getChildByName("others");
        var self = this;
        cc.tween(others).to(0.3, { scale: 0 }).call(function () {
            self.ui.active = false;
        }).start();
    },
    setupData: function setupData() {},
    setupRankingPerformance: function setupRankingPerformance() {}

    // update (dt) {},

});

cc._RF.pop();