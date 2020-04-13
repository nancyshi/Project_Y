(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/libs/gloableConfig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '94d39yYUJRKLIlaG9r7L5ON', 'gloableConfig', __filename);
// scripts/libs/gloableConfig.js

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


var GloableConfig = cc.Class({

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
        basicIp: "192.168.0.101",
        basicPort: 8888,
        netWorkMessageConfigs: {
            get: function get() {
                return {
                    loginModule: {
                        suffix: "login",
                        loginMessageType: {
                            code: "asfdsfds",
                            codeType: 3
                        }
                    },

                    dataModule: {
                        suffix: "data",
                        queryMessageType: {
                            playerId: 100000001,
                            requestType: "query"
                        },
                        commitMessageTyp: {
                            playerId: 100000001,
                            requestType: "commit",
                            commitBody: {}
                        }
                    },

                    signInModule: {
                        suffix: "signIn",
                        signInMessageType: {
                            playerId: 100000001,
                            signType: 1
                        },
                        refreshMessageType: {
                            playerId: 100000001
                        }
                    },

                    mailModule: {
                        suffix: "mail",
                        readMailMessageType: {
                            playerId: 100000001,
                            mailId: 1001,
                            requestType: "readMail"
                        },
                        sendMailMessageType: {
                            playerId: 100000001,
                            mailId: 1001,
                            tag: "mainLine",
                            requestType: "sendMail",
                            delay: 0
                        },
                        reachConditionMessageType: {
                            playerId: 1001,
                            mailId: 1001,
                            tag: "mainLine",
                            selectedOptionIndex: 0,
                            requestType: "reachCondition"
                        }
                    },

                    helperModule: {
                        suffix: "helper",
                        generateLevelConfigFileMessageType: {
                            data: ""
                        }
                    }
                };
            }
        }
    }

});

var gloableConfig = new GloableConfig();
module.exports = gloableConfig;

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
        //# sourceMappingURL=gloableConfig.js.map
        