(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/singleInstanceSystems/globalRedPointMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '08ca8+JdxVKC6Nrnc5qMPER', 'globalRedPointMgr', __filename);
// scripts/singleInstanceSystems/globalRedPointMgr.js

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

    setupRedPoints: function setupRedPoints() {
        this.getRedPointMgrs();
        for (var index in this.currentRedPointMgrs) {
            var oneRedPointMgr = this.currentRedPointMgrs[index];
            if (typeof oneRedPointMgr.setupRedPoint === "function") {
                oneRedPointMgr.setupRedPoint();
            }
        }
    },
    getRedPointMgrs: function getRedPointMgrs() {
        this.currentRedPointMgrs = [];
        var currentScene = cc.director.getScene();
        var self = this;
        var temp = function temp(givenRootNode) {
            for (var index in givenRootNode.children) {
                var oneChildNode = givenRootNode.children[index];
                var oneRedPointMgr = oneChildNode.getComponent("redPointMgr");
                if (oneRedPointMgr != null) {
                    self.currentRedPointMgrs.push(oneRedPointMgr);
                }
                temp(oneChildNode);
            }
        };

        temp(currentScene.getChildByName("Canvas"));
    }
});

module.exports = new GlobalRedPointMgr();

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
        //# sourceMappingURL=globalRedPointMgr.js.map
        