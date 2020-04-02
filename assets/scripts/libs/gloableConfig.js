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
            get() {
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
                            playerId: 100000001,
                        }
                    }
                }
            }
        }
    },


});

var gloableConfig = new GloableConfig()
module.exports = gloableConfig