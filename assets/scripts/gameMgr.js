
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

    start () {

    },

    enterLevelScene(givenLevel) {
        var levelForName = givenLevel
            switch(levelForName.toString().length){
                case 1:
                    levelForName = "00" + levelForName.toString()
                    break
                case 2:
                    levelForName = "0" + levelForName.toString()
                    break
            }
        var levelName = "level" + levelForName
        var self = this
        cc.director.preloadScene(levelName,null,function(err,res){
            var levelMgr = res.scene.getChildByName("Canvas").getComponent("levelMgr")
            levelMgr.level = givenLevel
            // cc.director.loadScene(levelName)
            self.animatedToScene(levelName)
        })
    },

    animatedToScene(sceneName) {
        var currentScene = cc.director.getScene()
        cc.tween(currentScene.children[0])
            .to(0.5,{opacity: 0})
            .delay(1)
            .call(function(){
                cc.director.preloadScene(sceneName,null,function(err,res){
                    var scene = res.scene
                    scene.children[0].opacity = 0
                    cc.director.loadScene(sceneName,function(){
                        cc.tween(scene.children[0])
                            .to(0.5,{opacity: 255})
                            .start()
                    })
                })
            })
            .start()
    }
    
    // update (dt) {},
});

var gameMgr = new GameMgr()
module.exports = gameMgr