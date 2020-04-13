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
    
    extends: cc.Component,
    properties: {

        playerData: {
            get() {
                return this._playerData
            },
            set(value) {
                this._playerData = new Proxy(value,this.dataMonitoredProxyHandler)
                this.onPlayerDataUpdated()
                //do something else
            }
        },

        dataMonitoredProxyHandler: {
            get() {
                if (this._dataMonitoredProxyHandler == null) {
                    var handler = {
                        get(target, key) {
                            if (typeof target[key] === "object") {
                                return new Proxy(target[key],handler)
                            }
                            return target[key]
                        },
                        set(target, key, value) {
                            target[key] = value
                            var globalRedPointMgr = require("globalRedPointMgr")
                            globalRedPointMgr.setupRedPoints()
                            var systems = require("systemsMgr").systems
                            require("systemsMgr").systemsGloableDataMonitored(key,value)
                            for (var k in systems) {
                                var oneSys = systems[k]
                                if (oneSys.opendNode != null) {
                                    var mgr = oneSys.opendNode.getComponent(oneSys.mgrName)
                                    if (mgr != null && typeof mgr.dataMonitored === "function") {
                                        mgr.dataMonitored(key,value)
                                    }
                                }
                            }

                            var currentScene = cc.director.getScene()
                            var mgrName = null
                            switch(currentScene.name) {
                                case "mainScene":
                                    mgrName = "mainSceneMgr"
                                    break
                                case "levelScene":
                                    mgrName = "levelMgr"
                                    break
                            }
                            if (mgrName != null) {
                                var mgr = currentScene.getChildByName("Canvas").getComponent(mgrName)
                                if (mgr != null && typeof mgr.dataMonitored === "function") {
                                    mgr.dataMonitored(key,value)
                                }
                            }
                            return true
                        }
                    }
                    this._dataMonitoredProxyHandler = handler
                }

                return this._dataMonitoredProxyHandler
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
        var timerSystemsMgr = require("timerSystemsMgr")
        timerSystemsMgr.initSetup()
        timerSystemsMgr.lunch()
        if (cc.director.getScene().name == "loginScene") {
            var loginSceneMgr = cc.director.getScene().getChildByName("Canvas").getComponent("loginSceneMgr")
            loginSceneMgr.onPlayerDataUpdated()
        }
    },

    commitPlayerDataToServer(dataForCommit, successCallBack) {
        var networkMgr = require("networkMgr")
        var msgObj = networkMgr.makeMessageObj("dataModule","commitMessageTyp")
        msgObj.message.playerId = this.playerData.id
        if (msgObj.message.playerId == null) {
            cc.log("no player data")
            return
        }
        

        msgObj.message.commitBody = dataForCommit
        msgObj.successCallBack = function(xhr) {
            var response = xhr.responseText
            response = JSON.parse(response)
            if (response.type == "commitSuccess") {
                successCallBack()
            }
        }
        networkMgr.sendMessageByMsgObj(msgObj)
    }
});

var shareDataMgr = new dataMgr()
module.exports = shareDataMgr
