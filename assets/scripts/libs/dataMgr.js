// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var dataMgr = cc.Class({
    

    properties: {

        playerData: {
            get() {
                return this._playerData
            },
            set(value) {
                this._playerData = value
                this.onPlayerDataUpdated()
                if (this.delegate != null) {
                    this.delegate.onPlayerDataUpdated()
                }
                //do something else
            }
        },
        delegate: null
        
    },

    updatePlayerDataFromServer(playerId) {

        var networkMgr = require("networkMgr")
        var msgObj = networkMgr.makeMessageObj("dataModule","queryMessageType")
        msgObj.message.playerId = playerId
        var self = this
        msgObj.successCallBack = function(xhr) {
            var response = xhr.responseText
            response = JSON.parse(response)  
            if (response.type == "success") {
                self.playerData = response.playerData
            }
            else {
                //do something for erros
            }
        }
        networkMgr.sendMessageByMsgObj(msgObj)
    },
    onPlayerDataUpdated () {
        cc.log("now player data is " + JSON.stringify(this.playerData))
    },

    commitPlayerDataToServer(dataForCommit) {
        var networkMgr = require("networkMgr")
        var msgObj = networkMgr.makeMessageObj("dataModule","commitMessageTyp")
        msgObj.message.playerId = this.playerData.id
        if (msgObj.message.playerId == null) {
            cc.log("no player data")
            return
        }
        
        msgObj.message.commitBody = dataForCommit
        networkMgr.sendMessageByMsgObj(msgObj)
    }
});

var shareDataMgr = new dataMgr()
module.exports = shareDataMgr
