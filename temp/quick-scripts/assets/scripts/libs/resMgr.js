(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/libs/resMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'df3f9Ff+ehEg4/MFicOafGk', 'resMgr', __filename);
// scripts/libs/resMgr.js

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

var ResMgr = cc.Class({
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
        reses: null,
        resNum: null,
        loadedResNum: 0
        //{
        //     get() {
        //         if (this._loadedResNum == null) {
        //             this._loadedResNum = 0
        //         }
        //         return this._loadedResNum
        //     },
        //     set(value) {
        //         this._loadedResNum = value
        //         if (value == this.resNum) {

        //         }
        //     }
        // }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    loadReses: function loadReses() {
        var complet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

        var resObj = {
            // ensureSysPrefab: "prefabs/ensureNode",
            // addSysPrefab: "prefabs/addUI",
            notiSysPrefab: "prefabs/notiNode",
            // mailSysTagPrefab: "prefabs/mailTagNode",
            // mailSysMailSectionNodePrefab: "prefabs/mailSectionNode",
            // mailSysSelectedTagEffectPrefab: "prefabs/selectedTagEffect",
            // mailUIPrefab: "prefabs/mailUI",
            // mailOptionPrefab: "prefabs/mailOptionNode",
            // mailSysMailPrefab: "prefabs/mailNode",
            // redPointPrefab: "prefabs/redPoint",
            wallPrefab: "prefabs/wall",
            bulletPrefab: "prefabs/bullet",
            targetPrefab: "prefabs/target",
            pathWayPrefab: "prefabs/pathWay",

            welfarySysPrefab: "prefabs/welfaryUI",
            signInSysPrefab: "prefabs/signInSysUI",
            addPropertyNumSysPrefab: "prefabs/addPropertyNumUI",
            mailSysPrefab: "prefabs/mailSysUI",
            selectSectionSysPrefab: "prefabs/selectSectionUI",
            storySysPrefab: "prefabs/storyNode",

            coverNodePrefab: "prefabs/fullSceneCoverNode",
            guildNodePrefab: "prefabs/guildNode"
        };

        var len = Object.keys(resObj).length;
        this.resNum = len;
        this.reses = {};
        var self = this;
        for (var key in resObj) {
            var temp = function temp(key) {
                var path = resObj[key];
                cc.loader.loadRes(path, function (err, res) {
                    if (res) {
                        self.reses[key] = res;
                        self.loadedResNum += 1;
                        if (self.loadedResNum == self.resNum) {
                            complet();
                        }
                    } else {
                        console.log("LOAD RES ERRO OF " + key + " :" + err);
                    }
                });
            };
            temp(key);
        }
    }
}

// update (dt) {},
);

var sharedResMgr = new ResMgr();
module.exports = sharedResMgr;

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
        //# sourceMappingURL=resMgr.js.map
        