// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var BgmMgr = cc.Class({
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
        selectedSection: {
            get() {
                return this._selectedSection
            },
            set(value) {
                
                if (value.toString() != this.selectedSection) {
                    this.playBgm(value)
                }
                this._selectedSection = value
            }
        },
    },

    playBgm(section) {
        cc.audioEngine.stopAll()
        var path = require("sectionConfig")[section.toString()].bgmPath
        cc.loader.loadRes(path,function(err,res){
            cc.audioEngine.play(res)
        })
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});

var sharedBgmMgr = new BgmMgr()
module.exports = sharedBgmMgr