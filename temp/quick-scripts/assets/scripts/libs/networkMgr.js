(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/libs/networkMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '06ef571V7VDkpNc4lgVqmds', 'networkMgr', __filename);
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

        retryDelta: 1.5,
        maxRetryTime: 3,

        retryWaitingNode: null,
        retryAction: null
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
        var url = "https://" + msgObj.ip + ":" + msgObj.port.toString() + "/" + msgObj.suffix;
        var xhr = null;
        xhr = new XMLHttpRequest();
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
            cc.log("err");
            if (self.retryAction == null) {
                self.retryAction = function () {
                    xhr.send(msgForSend);
                    xhr.currentRetryTime += 1;
                };
            }

            if (xhr.currentRetryTime == null || xhr.currentRetryTime == undefined) {
                xhr.currentRetryTime = 0;
            }
            var retry = function retry(xhr) {
                cc.log("retry", xhr.currentRetryTime);
                if (xhr.currentRetryTime > self.maxRetryTime) {
                    self.retryWaitingNode.destroy();
                    self.retryWaitingNode.removeFromParent();
                    self.retryWaitingNode = null;
                    self.retryAction = null;
                    self.unscheduleAllCallbacks();

                    //do something else
                    var currentScene = cc.director.getScene();
                    if (currentScene.name == "loginScene") {
                        var mgr = currentScene.getChildByName("Canvas").getComponent("loginSceneMgr");
                        mgr.onAllRetryFailed();
                    } else {
                        cc.loader.loadRes("prefabs/backToLoginScene", function (err, res) {
                            var node = cc.instantiate(res);
                            var bg = node.getChildByName("bg");
                            bg.width = cc.winSize.width;
                            bg.height = cc.winSize.height;
                            bg.on("touchstart", function () {});

                            var ensureButtonNode = node.getChildByName("others").getChildByName("ensureButton");
                            ensureButtonNode.on("click", function () {
                                cc.director.loadScene("loginScene");
                            });

                            cc.director.getScene().getChildByName("Canvas").addChild(node);
                        });
                    }
                } else if (xhr.currentRetryTime == 0) {
                    cc.director.getScene().getChildByName("Canvas").addChild(self.retryWaitingNode);
                    self.schedule(self.retryAction, self.retryDelta);
                }
            };
            if (self.retryWaitingNode == null) {
                cc.loader.loadRes("prefabs/retryWaitingNode", function (err, res) {
                    var node = cc.instantiate(res);
                    var bg = node.getChildByName("bg");
                    bg.width = cc.winSize.width;
                    bg.height = cc.winSize.height;
                    bg.on("touchstart", function () {});

                    self.retryWaitingNode = node;
                    retry(xhr);
                });
            } else {
                retry(xhr);
            }
        };
        xhr.ontimeout = function () {
            cc.log("time out!!!");
        };
        xhr.onabort = function () {
            cc.log("abord");
        };
        if (xhr.readyState == 0) {
            xhr.open("POST", url);
        }
        xhr.send(msgForSend);
    },
    onAllRetryFailed: function onAllRetryFailed() {},
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
        }, 60);
    }
});

var sharedMgr = new Networkmgr();
module.exports = sharedMgr;

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
        //# sourceMappingURL=networkMgr.js.map
        