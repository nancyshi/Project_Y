// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


var LoginMgr = cc.Class({
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
        playerId: {
            get() {
                return this._playerId
            },
            set(value) {
                this._playerId = value
                if (value) {
                    this.onPlayerIdSet()
                }
            }
        },
        LoginType: {
            get() {
                return {
                    ACCOUNT: 1,
                    WE_CHAT_GAME: 2,
                    DEVICE_ID: 3
                }
            }
        }
        
    },

    login(loginType) {
        this._setPlayerIdFromServer(loginType)
    },

    onPlayerIdSet() {
        this.updatePlayerDataFromServer(this.playerId)
    },

    updatePlayerDataFromServer(playerId) {
        var dataMgr = require("dataMgr")
        dataMgr.updatePlayerDataFromServer(playerId)
    },

    _genarateUUID() {
        var time = cc.sys.now()
        var uuid =  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        uuid = uuid + time.toString()
        return uuid
    },

    _setPlayerIdFromServer(loginType) {

        var networkMgr = require("networkMgr")
        var msgObj = networkMgr.makeMessageObj("loginModule","loginMessageType")
        msgObj.message.codeType = loginType
        var asyncFlag = false
        switch(loginType) {
            case this.LoginType.ACCOUNT:
                break
            case this.LoginType.WE_CHAT_GAME:
                asyncFlag = true
                var self = this
                wx.login({
                    success: function(res) {
                        var code = res.code
                        if (code != null) {
                            msgObj.message.code = code
                            msgObj.successCallBack = function(xhr) {
                                var response = xhr.responseText
                                response = JSON.parse(response)
                                if (response.type == "login_success") {
                                    var playerId = response.playerId
                                    self.playerId = playerId
                                }
                                else if (response.type == "login_fail") {
                                            
                                }
                            }
                            networkMgr.sendMessageByMsgObj(msgObj)
                        }
                    }
                })
                break
            case this.LoginType.DEVICE_ID:
                var deviceId = cc.sys.localStorage.getItem("deviceId")
                if (deviceId == null) {
                    var uuid = this._genarateUUID()
                    cc.sys.localStorage.setItem("deviceId",uuid)
                    deviceId = uuid
                }
                msgObj.message.code = deviceId
                break
            default:
                cc.log("Login type erro: now it's " + loginType)
        }
        if (asyncFlag == true) {
            return
        }
        var self = this
        msgObj.successCallBack = function(xhr) {
            var response = xhr.responseText
            response = JSON.parse(response)
            if (response.type == "login_success") {
                var playerId = response.playerId
                self.playerId = playerId
            }
            else if (response.type == "login_fail") {
                        
            }
        }
        networkMgr.sendMessageByMsgObj(msgObj)
    }
});

var sharedLoginMgr = new LoginMgr()
module.exports = sharedLoginMgr