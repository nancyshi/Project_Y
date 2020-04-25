(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/guildNodeMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4abf6f10txCYqgtMh4ibAyZ', 'guildNodeMgr', __filename);
// scripts/guildNodeMgr.js

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
        uibg: cc.Node,
        guildBgNode: cc.Node,
        guildLabelNode: cc.Node,
        buttonNode: cc.Node,

        header: 105,
        footer: 105,
        sectionDis: 50
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.setupUi();
    },
    setupUi: function setupUi() {
        var textConfig = require("textConfig");
        var bg = this.node.getChildByName("bg");
        bg.width = cc.winSize.width;
        bg.height = cc.winSize.height;
        bg.on("touchstart", function () {});

        this.guildLabelNode.getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(159);
        this.guildLabelNode.getComponent(cc.Label)._forceUpdateRenderData();

        var totalHeight = this.header + this.guildBgNode.height + this.sectionDis + this.guildLabelNode.height + this.sectionDis + this.buttonNode.height + this.footer;
        this.uibg.height = totalHeight;

        this.guildBgNode.y = this.uibg.height / 2 - this.footer;
        this.guildLabelNode.y = this.guildBgNode.y - this.guildBgNode.height / 2 - this.sectionDis;
        this.buttonNode.y = -this.uibg.height / 2 + this.footer + this.buttonNode.height / 2;

        var self = this;
        this.buttonNode.on("click", function () {
            self.node.destroy();
        });

        this.buttonNode.getChildByName("textLabel").getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(122);
    }
    // update (dt) {},

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=guildNodeMgr.js.map
        