"use strict";
cc._RF.push(module, 'e39aagc7ClLc6v5TtMdVlRB', 'gameMgr');
// scripts/gameMgr.js

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

var GameMgr = cc.Class({
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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    enterLevelScene: function enterLevelScene(givenLevel) {
        var self = this;
        cc.director.preloadScene("levelScene", null, function (err, res) {
            var levelMgr = res.scene.getChildByName("Canvas").getComponent("levelMgr");
            levelMgr.level = givenLevel;
            self.animatedToScene("levelScene");
        });
    },
    _enterLevelScene: function _enterLevelScene(givenLevel) {
        var levelForName = givenLevel;
        switch (levelForName.toString().length) {
            case 1:
                levelForName = "00" + levelForName.toString();
                break;
            case 2:
                levelForName = "0" + levelForName.toString();
                break;
        }
        var levelName = "level" + levelForName;
        var self = this;
        cc.director.preloadScene(levelName, null, function (err, res) {
            var levelMgr = res.scene.getChildByName("Canvas").getComponent("levelMgr");
            levelMgr.level = givenLevel;
            // cc.director.loadScene(levelName)
            self.animatedToScene(levelName);
        });
    },
    animatedToScene: function animatedToScene(sceneName) {
        var currentScene = cc.director.getScene();
        cc.tween(currentScene.children[0]).to(0.5, { opacity: 0 }).delay(1).call(function () {
            cc.director.preloadScene(sceneName, null, function (err, res) {
                var scene = res.scene;
                scene.children[0].opacity = 0;
                cc.director.loadScene(sceneName, function () {
                    cc.tween(scene.children[0]).to(0.5, { opacity: 255 }).start();
                });
            });
        }).start();
    },
    _generateLevelSceneConfig: function _generateLevelSceneConfig() {
        var levelConfig = require("levelConfig");
        var result = {};
        var completNum = 0;
        var check = function check(completNum) {
            if (completNum == Object.keys(levelConfig).length) {
                var networkMgr = require("networkMgr");
                var messageObj = networkMgr.makeMessageObj("helperModule", "generateLevelConfigFileMessageType");
                messageObj.message.data = result;
                networkMgr.sendMessageByMsgObj(messageObj);
            }
        };
        for (var index in Object.keys(levelConfig)) {
            var levelId = Object.keys(levelConfig)[index];

            var getSceneNameByLevelId = function getSceneNameByLevelId(givenLevelId) {
                var levelForName = givenLevelId;
                switch (levelForName.toString().length) {
                    case 1:
                        levelForName = "00" + levelForName.toString();
                        break;
                    case 2:
                        levelForName = "0" + levelForName.toString();
                        break;
                }

                var levelName = "level" + levelForName;
                return levelName;
            };

            var sceneName = getSceneNameByLevelId(levelId);
            var setupResult = function setupResult(sceneName, levelId) {
                cc.director.preloadScene(sceneName, null, function (err, res) {
                    cc.log("preload scene: " + sceneName);
                    var canvas = res.scene.children[0];
                    var oneResult = {};
                    var getNodeBasicResult = function getNodeBasicResult(node) {
                        var oneResult = {};
                        oneResult.x = node.x;
                        oneResult.y = node.y;
                        oneResult.width = node.width;
                        oneResult.height = node.height;
                        oneResult.angle = node.angle;
                        return oneResult;
                    };
                    //fillNodes
                    var fillNodes = canvas.getChildByName("fillNodes");
                    var fillNodesResult = [];
                    cc.log("setup fillNodes");
                    for (var index in fillNodes.children) {
                        var oneFillNode = fillNodes.children[index];
                        var oneFillNodeResult = getNodeBasicResult(oneFillNode);
                        fillNodesResult.push(oneFillNodeResult);
                    }
                    oneResult.fillNodes = fillNodesResult;

                    //walls
                    var walls = canvas.getChildByName("walls");
                    var wallsResult = [];
                    cc.log("setup walls");
                    for (var index in walls.children) {
                        var oneWallNode = walls.children[index];
                        var oneWallResult = getNodeBasicResult(oneWallNode);
                        wallsResult.push(oneWallResult);
                    }
                    oneResult.walls = wallsResult;

                    //targets

                    var targets = canvas.getChildByName("targets");
                    var targetsResult = [];
                    cc.log("setup targets");
                    for (var index in targets.children) {
                        var oneTargetNode = targets.children[index];
                        var oneTargetResult = getNodeBasicResult(oneTargetNode);
                        targetsResult.push(oneTargetResult);
                    }
                    oneResult.targets = targetsResult;

                    //pathWaysNode
                    var pathWaysNode = canvas.getChildByName("pathWaysNode");
                    var pathWaysNodeResult = [];
                    cc.log("setup pathWaysNode");
                    for (var index in pathWaysNode.children) {
                        var onePathWayNode = pathWaysNode.children[index];
                        var onePathWayResult = {};
                        onePathWayResult.name = onePathWayNode.name;
                        onePathWayResult.children = [];
                        for (var i in onePathWayNode.children) {
                            var oneChildNode = onePathWayNode.children[i];
                            var oneChildResult = getNodeBasicResult(oneChildNode);
                            onePathWayResult.children.push(oneChildResult);
                        }
                        pathWaysNodeResult.push(onePathWayResult);
                    }
                    oneResult.pathWaysNode = pathWaysNodeResult;

                    //bullets
                    var bullets = canvas.getChildByName("bullets");
                    var bulletsResult = [];
                    cc.log("setup bullets");
                    for (var index in bullets.children) {
                        var oneBulletNode = bullets.children[index];
                        var oneBulletResult = {};
                        var basicResult = getNodeBasicResult(oneBulletNode);
                        oneBulletResult.basic = basicResult;

                        var bulletMgr = oneBulletNode.getComponent("bulletMgr");
                        var mgrResult = {};
                        mgrResult.bulletType = bulletMgr.bulletType;
                        mgrResult.pathWaysNodeName = "";
                        if (bulletMgr.pathWaysNode != null) {
                            mgrResult.pathWaysNodeName = bulletMgr.pathWaysNode.name;
                        }
                        oneBulletResult.mgr = mgrResult;
                        bulletsResult.push(oneBulletResult);
                    }
                    oneResult.bullets = bulletsResult;

                    result[levelId.toString()] = oneResult;
                    completNum += 1;
                    check(completNum);
                });
            };
            setupResult(sceneName, levelId);
        }
    }
    // update (dt) {},

});

var gameMgr = new GameMgr();
module.exports = gameMgr;

cc._RF.pop();