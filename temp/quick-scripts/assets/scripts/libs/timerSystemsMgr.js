(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/libs/timerSystemsMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0acef/WoXNG37CDvIvobyT+', 'timerSystemsMgr', __filename);
// scripts/libs/timerSystemsMgr.js

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

var TimerSystemsMgr = cc.Class({
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
        signInSysTimer: {
            get: function get() {
                return this._signInSysTimer;
            },
            set: function set(value) {
                this._signInSysTimer = value;
                if (value <= 0) {
                    var signInSystem = require("signInSystem");
                    signInSystem.onTimerReach();
                }
            }
        },

        timers: []
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    initSetup: function initSetup() {
        this.timers.push(this.signInSysTimer);
        this.signInSysTimer = require("dataMgr").playerData.signInRefreshDelta;
    },
    lunch: function lunch() {
        this.schedule(this.timerUpdate, 1);
    },
    timerUpdate: function timerUpdate() {
        for (var index in this.timers) {
            var oneTimer = this.timers[index];
            if (oneTimer > 0) {
                oneTimer -= 1;
            }
        }
    },
    stop: function stop() {
        this.unschedule(this.timerUpdate, this);
    }
});

var sharedTimerSystemsMgr = new TimerSystemsMgr();
module.exports = sharedTimerSystemsMgr;

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
        //# sourceMappingURL=timerSystemsMgr.js.map
        