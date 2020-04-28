
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/systems/ensureSys_notUse/ensureSystemNodeMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '96611KWWBZMSI+yqEf4pl0U', 'ensureSystemNodeMgr');
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
  "extends": cc.Component,
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
    cc.tween(others).to(0.3, {
      scale: 0
    }).call(function () {
      self.node.destroy();
    }).start();
  },
  show: function show(target) {
    var others = this.node.getChildByName("others");
    others.scale = 0;
    target.addChild(this.node);
    cc.tween(others).to(0.3, {
      scale: 1
    }).start();
  } // update (dt) {},

});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3N5c3RlbXMvZW5zdXJlU3lzX25vdFVzZS9lbnN1cmVTeXN0ZW1Ob2RlTWdyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZGVzVGV4dCIsImdldCIsIl9kZXNUZXh0Iiwic2V0IiwidmFsdWUiLCJkZXNMYWJlbCIsIm5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsImdldENvbXBvbmVudCIsIkxhYmVsIiwic3RyaW5nIiwib25FbnN1cmVCdXR0b25DbGljayIsIm9uQ2FuY2xlQnV0dG9uQ2xpY2siLCJjYW5DbG9zZSIsIl9jYW5DbG9zZSIsImNsb3NlQnV0dG9uTm9kZSIsImFjdGl2ZSIsImNhbmNlbEJ1dHRvblRleHQiLCJfY2FuY2VsQnV0dG9uVGV4dCIsImNhbmNlbEJ1dHRvbk5vZGUiLCJlbnN1cmVCdXR0b25UZXh0IiwiX2Vuc3VyZUJ1dHRvblRleHQiLCJlbnN1cmVCdXR0b25Ob2RlIiwiZW5zdXJlQnV0dG9uV2lsbEF1dG9DbG9zZVVpIiwiY2FuY2VsQnV0dG9uV2lsbEF1dG9DbG9zZVVpIiwiaXNFeHNpc3RDYW5jZWxCdXR0b24iLCJfaXNFeHNpc3RDYW5jZWxCdXR0b24iLCJ4Iiwib25Mb2FkIiwiYmciLCJvbiIsIndpblNpemUiLCJ3aWR0aCIsImhlaWdodCIsIm90aGVycyIsImNsb3NlIiwib25FbnN1cmUiLCJvbkNhbmNlbCIsInN0YXJ0Iiwic2VsZiIsInR3ZWVuIiwidG8iLCJzY2FsZSIsImNhbGwiLCJkZXN0cm95Iiwic2hvdyIsInRhcmdldCIsImFkZENoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFD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QSxNQUFNLENBQUNRLEtBQVAsR0FBZSxDQUFmO0FBQ0FJLElBQUFBLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQixLQUFLekMsSUFBckI7QUFFQVYsSUFBQUEsRUFBRSxDQUFDNEMsS0FBSCxDQUFTTixNQUFULEVBQ0tPLEVBREwsQ0FDUSxHQURSLEVBQ2E7QUFBQ0MsTUFBQUEsS0FBSyxFQUFFO0FBQVIsS0FEYixFQUVLSixLQUZMO0FBR0gsR0FuSkksQ0FvSkw7O0FBcEpLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICAgICAgZGVzVGV4dDoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kZXNUZXh0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXNUZXh0ID0gXCJkZWZhdWx0IHZhbHVlXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Rlc1RleHRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXNUZXh0ID0gdmFsdWVcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgZGVzTGFiZWwgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvdGhlcnNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJkZXNMYWJlbFwiKVxuICAgICAgICAgICAgICAgIGRlc0xhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdmFsdWVcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25FbnN1cmVCdXR0b25DbGljazogbnVsbCxcbiAgICAgICAgb25DYW5jbGVCdXR0b25DbGljazogbnVsbCxcbiAgICAgICAgY2FuQ2xvc2U6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FuQ2xvc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5DbG9zZSA9IHZhbHVlXG4gICAgICAgICAgICAgICAgdmFyIGNsb3NlQnV0dG9uTm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm90aGVyc1wiKS5nZXRDaGlsZEJ5TmFtZShcImNsb3NlQnV0dG9uXCIpXG4gICAgICAgICAgICAgICAgY2xvc2VCdXR0b25Ob2RlLmFjdGl2ZSA9IHZhbHVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NhbmNlbEJ1dHRvblRleHRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5jZWxCdXR0b25UZXh0ID0gdmFsdWVcbiAgICAgICAgICAgICAgICB2YXIgY2FuY2VsQnV0dG9uTm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm90aGVyc1wiKS5nZXRDaGlsZEJ5TmFtZShcImNhbmNlbEJ1dHRvblwiKVxuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0TGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB2YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGVuc3VyZUJ1dHRvblRleHQ6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5zdXJlQnV0dG9uVGV4dFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Vuc3VyZUJ1dHRvblRleHQgPSB2YWx1ZVxuICAgICAgICAgICAgICAgIHZhciBlbnN1cmVCdXR0b25Ob2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwib3RoZXJzXCIpLmdldENoaWxkQnlOYW1lKFwiZW5zdXJlQnV0dG9uXCIpXG4gICAgICAgICAgICAgICAgZW5zdXJlQnV0dG9uTm9kZS5nZXRDaGlsZEJ5TmFtZShcInRleHRMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZW5zdXJlQnV0dG9uV2lsbEF1dG9DbG9zZVVpOiB0cnVlLFxuICAgICAgICBjYW5jZWxCdXR0b25XaWxsQXV0b0Nsb3NlVWk6IHRydWUsXG4gICAgICAgIGlzRXhzaXN0Q2FuY2VsQnV0dG9uOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5faXNFeHNpc3RDYW5jZWxCdXR0b24gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0V4c2lzdENhbmNlbEJ1dHRvbiA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzRXhzaXN0Q2FuY2VsQnV0dG9uXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNFeHNpc3RDYW5jZWxCdXR0b24gPSB2YWx1ZVxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvdGhlcnNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYW5jZWxCdXR0b25cIikuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwib3RoZXJzXCIpLmdldENoaWxkQnlOYW1lKFwiZW5zdXJlQnV0dG9uXCIpLnggPSAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB2YXIgYmcgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKVxuICAgICAgICBiZy5vbihcInRvdWNoc3RhcnRcIixmdW5jdGlvbigpe30sdGhpcylcbiAgICAgICAgdmFyIHdpblNpemUgPSBjYy53aW5TaXplXG4gICAgICAgIGJnLndpZHRoID0gd2luU2l6ZS53aWR0aFxuICAgICAgICBiZy5oZWlnaHQgPSB3aW5TaXplLmhlaWdodFxuXG4gICAgICAgIHZhciBvdGhlcnMgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvdGhlcnNcIilcbiAgICAgICAgdmFyIGNsb3NlQnV0dG9uTm9kZSA9IG90aGVycy5nZXRDaGlsZEJ5TmFtZShcImNsb3NlQnV0dG9uXCIpXG4gICAgICAgIGNsb3NlQnV0dG9uTm9kZS5vbihcImNsaWNrXCIsdGhpcy5jbG9zZSx0aGlzKVxuICAgICAgICBcbiAgICAgICAgdmFyIGVuc3VyZUJ1dHRvbk5vZGUgPSBvdGhlcnMuZ2V0Q2hpbGRCeU5hbWUoXCJlbnN1cmVCdXR0b25cIilcbiAgICAgICAgZW5zdXJlQnV0dG9uTm9kZS5vbihcImNsaWNrXCIsdGhpcy5vbkVuc3VyZSx0aGlzKVxuICAgICAgICB2YXIgY2FuY2VsQnV0dG9uTm9kZSA9IG90aGVycy5nZXRDaGlsZEJ5TmFtZShcImNhbmNlbEJ1dHRvblwiKVxuICAgICAgICBjYW5jZWxCdXR0b25Ob2RlLm9uKFwiY2xpY2tcIix0aGlzLm9uQ2FuY2VsLHRoaXMpXG4gICAgfSxcblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH0sXG4gICAgb25FbnN1cmUoKSB7XG4gICAgICAgIGlmICh0aGlzLmVuc3VyZUJ1dHRvbldpbGxBdXRvQ2xvc2VVaSA9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKClcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vbkVuc3VyZUJ1dHRvbkNsaWNrICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMub25FbnN1cmVCdXR0b25DbGljaygpXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG9uQ2FuY2VsKCl7XG4gICAgICAgIGlmICh0aGlzLmNhbmNlbEJ1dHRvbldpbGxBdXRvQ2xvc2VVaSA9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKClcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vbkNhbmNsZUJ1dHRvbkNsaWNrICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMub25DYW5jbGVCdXR0b25DbGljaygpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHZhciBvdGhlcnMgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvdGhlcnNcIilcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgIGNjLnR3ZWVuKG90aGVycylcbiAgICAgICAgICAgIC50bygwLjMse3NjYWxlOiAwfSlcbiAgICAgICAgICAgIC5jYWxsKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlLmRlc3Ryb3koKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpXG4gICAgfSxcbiAgICBzaG93KHRhcmdldCkge1xuICAgICAgICB2YXIgb3RoZXJzID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwib3RoZXJzXCIpXG4gICAgICAgIG90aGVycy5zY2FsZSA9IDBcbiAgICAgICAgdGFyZ2V0LmFkZENoaWxkKHRoaXMubm9kZSlcblxuICAgICAgICBjYy50d2VlbihvdGhlcnMpIFxuICAgICAgICAgICAgLnRvKDAuMywge3NjYWxlOiAxfSlcbiAgICAgICAgICAgIC5zdGFydCgpXG4gICAgfSxcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19