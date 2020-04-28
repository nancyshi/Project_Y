"use strict";
cc._RF.push(module, 'db2d5jDzvdBm400iKuIvXTH', 'timerSystemsMgr');
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
  "extends": cc.Component,
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
          this.onTimerReach("signInSys");
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
  },
  onTimerReach: function onTimerReach(givenName) {
    switch (givenName) {
      case "signInSys":
        var self = this;

        var networkMgr = require("networkMgr");

        var msgObj = networkMgr.makeMessageObj("signInModule", "refreshMessageType");
        msgObj.message.playerId = require("dataMgr").playerData.id;

        msgObj.successCallBack = function (xhr) {
          var response = xhr.responseText;
          response = JSON.parse(response);

          if (response.type == "success") {
            var signInRefreshDelta = response.signInRefreshDelta;
            require("dataMgr").playerData.signInRefreshDelta = signInRefreshDelta;
            self.signInSysTimer = signInRefreshDelta;
            require("dataMgr").playerData.signInStatus = 1;

            if (require("systemsMgr").signInSys.opendNode != null) {
              var signInSysMgr = require("systemsMgr").signInSys.opendNode.getComponent("signInSysMgr");

              signInSysMgr.setupUI();
            }
          }
        };

        networkMgr.sendMessageByMsgObj(msgObj);
        break;
    }
  }
});
var sharedTimerSystemsMgr = new TimerSystemsMgr();
module.exports = sharedTimerSystemsMgr;

cc._RF.pop();