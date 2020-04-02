// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
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
        desText: {
            get() {
                if (this._desText == null) {
                    this.desText = "default value"
                }
                return this._desText
            },
            set(value) {
                this._desText = value
                
                var desLabel = this.node.getChildByName("others").getChildByName("desLabel")
                desLabel.getComponent(cc.Label).string = value
                
            }
        },
        onEnsureButtonClick: null,
        onCancleButtonClick: null,
        canClose: {
            get() {
                return this._canClose
            },
            set(value) {
                this._canClose = value
                var closeButtonNode = this.node.getChildByName("others").getChildByName("closeButton")
                closeButtonNode.active = value
            }

        },

        cancelButtonText: {
            get() {
                return this._cancelButtonText
            },
            set(value) {
                this._cancelButtonText = value
                var cancelButtonNode = this.node.getChildByName("others").getChildByName("cancelButton")
                cancelButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = value
            }
        },

        ensureButtonText: {
            get() {
                return this._ensureButtonText
            },
            set(value) {
                this._ensureButtonText = value
                var ensureButtonNode = this.node.getChildByName("others").getChildByName("ensureButton")
                ensureButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = value
            }
        },

        ensureButtonWillAutoCloseUi: true,
        cancelButtonWillAutoCloseUi: true,
        isExsistCancelButton: {
            get() {
                if(this._isExsistCancelButton == null) {
                    this._isExsistCancelButton = true
                }
                return this._isExsistCancelButton
            },
            set(value) {
                this._isExsistCancelButton = value
                if (value == false) {
                    this.node.getChildByName("others").getChildByName("cancelButton").active = false
                    this.node.getChildByName("others").getChildByName("ensureButton").x = 0
                }
            }
        },
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var bg = this.node.getChildByName("bg")
        bg.on("touchstart",function(){},this)
        var winSize = cc.winSize
        bg.width = winSize.width
        bg.height = winSize.height

        var others = this.node.getChildByName("others")
        var closeButtonNode = others.getChildByName("closeButton")
        closeButtonNode.on("click",this.close,this)
        
        var ensureButtonNode = others.getChildByName("ensureButton")
        ensureButtonNode.on("click",this.onEnsure,this)
        var cancelButtonNode = others.getChildByName("cancelButton")
        cancelButtonNode.on("click",this.onCancel,this)
    },

    start () {

    },
    onEnsure() {
        if (this.ensureButtonWillAutoCloseUi == true) {
            this.close()
        }
        if (this.onEnsureButtonClick != null) {
            this.onEnsureButtonClick()
        }
    },
    onCancel(){
        if (this.cancelButtonWillAutoCloseUi == true) {
            this.close()
        }
        if (this.onCancleButtonClick != null) {
            this.onCancleButtonClick()
        }
    },

    close() {
        var others = this.node.getChildByName("others")
        var self = this
        cc.tween(others)
            .to(0.3,{scale: 0})
            .call(function(){
                self.node.destroy()
            })
            .start()
    },
    show(target) {
        var others = this.node.getChildByName("others")
        others.scale = 0
        target.addChild(this.node)

        cc.tween(others) 
            .to(0.3, {scale: 1})
            .start()
    },
    // update (dt) {},
});
