"use strict";
cc._RF.push(module, '26886qZG21CFKSkgIvhUSHl', 'networkMgr');
// scripts/libs/networkMgr.js

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

var Networkmgr = cc.Class({
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
        delegate: null,

        retryDelta: 0.5,
        retryTime: 3,
        retryingFlag: false,
        currentRetryTime: 3,

        retryResult: {
            get: function get() {
                return this._retryResult;
            },
            set: function set(value) {
                this._retryResult = value;
                if (value == true) {
                    if (this.retryWaitingNode != null) {
                        this.retryWaitingNode.destroy();
                    }
                }
            }
        },

        retryWaitingNode: null,

        longConnectXhr: {
            get: function get() {
                if (this._longConnectXhr == null) {
                    this._longConnectXhr = new XMLHttpRequest();
                    //this._longConnectXhr.timeout = 100000000
                }
                return this._longConnectXhr;
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},


    // update (dt) {},

    sendMessage: function sendMessage(msg, port, ip, suffix, successCallBack) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                successCallBack(xhr);
            }
        };
        var url = "http://" + ip + ":" + port.toString() + "/" + suffix.toString();
        xhr.open("POST", url);
        xhr.send(msg);
    },
    makeMessageObj: function makeMessageObj(moduleName, messageTypeName) {
        var gloableConfig = require("gloableConfig");

        var netWorkMessageConfigs = gloableConfig.netWorkMessageConfigs;
        var moduleObj = netWorkMessageConfigs[moduleName];

        if (moduleObj != null) {
            var ip = gloableConfig.basicIp;
            var port = gloableConfig.basicPort;
            if (moduleObj.ip != null) {
                ip = moduleObj.ip;
            }
            if (moduleObj.port != null) {
                port = moduleObj.port;
            }

            var suffix = moduleObj.suffix;

            var message = moduleObj[messageTypeName];
            var successCallBack = function successCallBack(xhr) {};
            var obj = {
                ip: ip,
                port: port,
                suffix: suffix,
                message: message,
                successCallBack: successCallBack
            };
            return obj;
        } else {
            cc.error("no such module name of " + moduleName);
            return null;
        }
    },
    sendMessageByMsgObj: function sendMessageByMsgObj(msgObj) {
        var useLongConnectXhr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (useLongConnectXhr == true) {
            cc.log("start heart beat");
        }
        var url = "http://" + msgObj.ip + ":" + msgObj.port.toString() + "/" + msgObj.suffix;
        var xhr = null;
        if (useLongConnectXhr == false) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = this.longConnectXhr;
        }
        var self = this;
        xhr.onreadystatechange = function () {

            if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                msgObj.successCallBack(xhr);
                if (self.retryingFlag == true) {
                    self.retryResult = true;
                }
            }
        };
        var msgForSend = JSON.stringify(msgObj.message);
        xhr.onerror = function () {
            if (self.retryingFlag == false) {
                cc.loader.loadRes("prefabs/retryWaitingNode", function (err, res) {
                    if (self.delegate != null) {
                        var retryWaitingNode = cc.instantiate(res);
                        retryWaitingNode.name = "retryWaitingNode";
                        var bg = retryWaitingNode.getChildByName("bg");
                        var winsize = cc.director.getWinSize();
                        bg.width = winsize.width;
                        bg.height = winsize.height;
                        bg.on("touchstart", function () {}, this);
                        self.retryWaitingNode = retryWaitingNode;
                        self.delegate.node.addChild(self.retryWaitingNode);
                    }
                    self.retryingFlag = true;
                    self.scheduleOnce(function () {
                        self.currentRetryTime -= 1;
                        xhr.send(msgForSend);
                    }, self.retryDelta);
                });
            }
            if (self.retryingFlag == true) {
                self.currentRetryTime -= 1;
                xhr.send(msgForSend);
                if (self.currentRetryTime == 0) {
                    xhr.onerror = function () {
                        xhr = null;
                        self.onAllRetryFailed();
                    };
                    self.retryingFlag = false;
                    self.currentRetryTime = self.retryTime;
                    self.retryResult = null;
                }
            }
        };
        if (xhr.readyState == 0) {
            xhr.open("POST", url);
        }
        xhr.send(msgForSend);
    },
    onAllRetryFailed: function onAllRetryFailed() {
        if (this.retryWaitingNode != null) {
            this.retryWaitingNode.destroy();
        }
        if (this.delegate != null) {
            this.delegate.onAllRetryFailed();
        }
    },
    startHeartBeat: function startHeartBeat() {
        var messageObj = this.makeMessageObj("longConnectModule", "heartBeatMessageType");
        messageObj.message.playerId = require("dataMgr").playerData.id;
        messageObj.successCallBack = function (xhr) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            if (response.type == "message") {
                var messages = response.messages;
                for (var index in messages) {
                    var oneMessage = messages[index];
                    if (oneMessage.type == "mailSysSendMail") {
                        var mailId = oneMessage.mailId;
                        var timeStamp = oneMessage.timeStamp;
                        var tag = oneMessage.tag;
                        var mail = {
                            "status": 0,
                            "tag": tag,
                            "timeStamp": timeStamp,
                            "selectedOptionIndex": -1
                        };
                        require("dataMgr").playerData.mails[mailId] = mail;
                    }
                }
            }
        };
        //this.sendMessageByMsgObj(messageObj,true)
        this.schedule(function () {
            this.sendMessageByMsgObj(messageObj);
        }, 10);
    }
});

var sharedMgr = new Networkmgr();
module.exports = sharedMgr;

cc._RF.pop();