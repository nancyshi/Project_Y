(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/systems/ensureSys_notUse/ensureSystemNodeMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '96611KWWBZMSI+yqEf4pl0U', 'ensureSystemNodeMgr', __filename);
// scripts/systems/ensureSys_notUse/ensureSystemNodeMgr.js

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
            get: function get() {
                if (this._desText == null) {
                    this.desText = "default value";
                }
                return this._desText;
            },
            set: function set(value) {
                this._desText = value;

                var desLabel = this.node.getChildByName("others").getChildByName("desLabel");
                desLabel.getComponent(cc.Label).string = value;
            }
        },
        onEnsureButtonClick: null,
        onCancleButtonClick: null,
        canClose: {
            get: function get() {
                return this._canClose;
            },
            set: function set(value) {
                this._canClose = value;
                var closeButtonNode = this.node.getChildByName("others").getChildByName("closeButton");
                closeButtonNode.active = value;
            }
        },

        cancelButtonText: {
            get: function get() {
                return this._cancelButtonText;
            },
            set: function set(value) {
                this._cancelButtonText = value;
                var cancelButtonNode = this.node.getChildByName("others").getChildByName("cancelButton");
                cancelButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = value;
            }
        },

        ensureButtonText: {
            get: function get() {
                return this._ensureButtonText;
            },
            set: function set(value) {
                this._ensureButtonText = value;
                var ensureButtonNode = this.node.getChildByName("others").getChildByName("ensureButton");
                ensureButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = value;
            }
        },

        ensureButtonWillAutoCloseUi: true,
        cancelButtonWillAutoCloseUi: true,
        isExsistCancelButton: {
            get: function get() {
                if (this._isExsistCancelButton == null) {
                    this._isExsistCancelButton = true;
                }
                return this._isExsistCancelButton;
            },
            set: function set(value) {
                this._isExsistCancelButton = value;
                if (value == false) {
                    this.node.getChildByName("others").getChildByName("cancelButton").active = false;
                    this.node.getChildByName("others").getChildByName("ensureButton").x = 0;
                }
            }
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var bg = this.node.getChildByName("bg");
        bg.on("touchstart", function () {}, this);
        var winSize = cc.winSize;
        bg.width = winSize.width;
        bg.height = winSize.height;

        var others = this.node.getChildByName("others");
        var closeButtonNode = others.getChildByName("closeButton");
        closeButtonNode.on("click", this.close, this);

        var ensureButtonNode = others.getChildByName("ensureButton");
        ensureButtonNode.on("click", this.onEnsure, this);
        var cancelButtonNode = others.getChildByName("cancelButton");
        cancelButtonNode.on("click", this.onCancel, this);
    },
    start: function start() {},
    onEnsure: function onEnsure() {
        if (this.ensureButtonWillAutoCloseUi == true) {
            this.close();
        }
        if (this.onEnsureButtonClick != null) {
            this.onEnsureButtonClick();
        }
    },
    onCancel: function onCancel() {
        if (this.cancelButtonWillAutoCloseUi == true) {
            this.close();
        }
        if (this.onCancleButtonClick != null) {
            this.onCancleButtonClick();
        }
    },
    close: function close() {
        var others = this.node.getChildByName("others");
        var self = this;
        cc.tween(others).to(0.3, { scale: 0 }).call(function () {
            self.node.destroy();
        }).start();
    },
    show: function show(target) {
        var others = this.node.getChildByName("others");
        others.scale = 0;
        target.addChild(this.node);

        cc.tween(others).to(0.3, { scale: 1 }).start();
    }
}
// update (dt) {},
);

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
        //# sourceMappingURL=ensureSystemNodeMgr.js.map
        