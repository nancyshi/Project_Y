
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/loginSceneMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '81fbcyHVFlDhqJvCbUik6hX', 'loginSceneMgr');
// scripts/loginSceneMgr.js

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
    dataMgr: null,
    loginMgr: null,
    networkMgr: null,
    isLogining: false,
    changeSceneAnimationTime: 2,
    nameEnSpriteFrame: cc.SpriteFrame
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.node.on("touchstart", this.onTouchStart, this);

    var textConfig = require("textConfig");

    if (textConfig.languageType != 1) {
      this.node.getChildByName("name").getComponent(cc.Sprite).spriteFrame = this.nameEnSpriteFrame;
    }
  },
  start: function start() {
    this.dataMgr = require("dataMgr");
    this.loginMgr = require("loginMgr");
    this.networkMgr = require("networkMgr");
    this.networkMgr.delegate = this;
    var retryNode = cc.find("Canvas/retry");
    cc.tween(retryNode).repeatForever(cc.tween().to(0.5, {
      scale: 1.2
    }).to(0.5, {
      scale: 0.8
    })).start();
    this.login(); //this._debugLogin()
  },
  onPlayerDataUpdated: function onPlayerDataUpdated() {
    require("advertisMgr").initAds();

    cc.find("Canvas/loginInfo/textNode").getComponent(cc.Label).string = require("textConfig").getTextByIdAndLanguageType(157); //animation 

    for (var index in this.node.children) {
      var self = this;

      var temp = function temp(i) {
        var node = self.node.children[i];
        cc.tween(node).to(self.changeSceneAnimationTime, {
          opacity: 0
        }).start();
      };

      temp(index);
    }

    cc.tween(this.node).delay(this.changeSceneAnimationTime).call(function () {
      require("resMgr").loadReses(function () {
        //require("networkMgr").startHeartBeat()
        cc.director.loadScene("mainScene");
      });
    }).start();
  },
  login: function login() {
    this.isLogining = true;
    var retryNode = cc.find("Canvas/retry");
    retryNode.active = false;
    cc.find("Canvas/loginInfo/textNode").getComponent(cc.Label).string = require("textConfig").getTextByIdAndLanguageType(156);
    var loginType = null;
    var platform = cc.sys.platform;

    if (platform == cc.sys.WECHAT_GAME) {
      loginType = this.loginMgr.LoginType.WE_CHAT_GAME;
    } else {
      loginType = this.loginMgr.LoginType.DEVICE_ID;
    }

    this.loginMgr.login(loginType);
  },
  onTouchStart: function onTouchStart(event) {
    if (this.isLogining == false) {
      this.login();
    }
  },
  // update (dt) {},
  _debugLogin: function _debugLogin() {
    this.dataMgr.playerData = {
      id: 100000001,
      name: "new Player",
      physicalPower: 10,
      maxPhysicalPower: 10,
      heart: 10,
      maxHeart: 10,
      currentSection: 1,
      currentLevel: 2,
      physicalPowerCostedFlag: 0
    };
    this.onPlayerDataUpdated();
  },
  onDestroy: function onDestroy() {
    this.node.off("touchstart", this.onTouchStart, this);
  },
  onAllRetryFailed: function onAllRetryFailed() {
    var loginInfo = cc.find("Canvas/loginInfo");
    var loginInfoLabel = loginInfo.getChildByName("textNode").getComponent(cc.Label);
    loginInfoLabel.string = require("textConfig").getTextByIdAndLanguageType(161);
    loginInfo.active = true;
    var retryNode = cc.find("Canvas/retry");
    retryNode.active = true;
    this.isLogining = false;
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xvZ2luU2NlbmVNZ3IuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJkYXRhTWdyIiwibG9naW5NZ3IiLCJuZXR3b3JrTWdyIiwiaXNMb2dpbmluZyIsImNoYW5nZVNjZW5lQW5pbWF0aW9uVGltZSIsIm5hbWVFblNwcml0ZUZyYW1lIiwiU3ByaXRlRnJhbWUiLCJvbkxvYWQiLCJub2RlIiwib24iLCJvblRvdWNoU3RhcnQiLCJ0ZXh0Q29uZmlnIiwicmVxdWlyZSIsImxhbmd1YWdlVHlwZSIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50IiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJzdGFydCIsImRlbGVnYXRlIiwicmV0cnlOb2RlIiwiZmluZCIsInR3ZWVuIiwicmVwZWF0Rm9yZXZlciIsInRvIiwic2NhbGUiLCJsb2dpbiIsIm9uUGxheWVyRGF0YVVwZGF0ZWQiLCJpbml0QWRzIiwiTGFiZWwiLCJzdHJpbmciLCJnZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSIsImluZGV4IiwiY2hpbGRyZW4iLCJzZWxmIiwidGVtcCIsImkiLCJvcGFjaXR5IiwiZGVsYXkiLCJjYWxsIiwibG9hZFJlc2VzIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJhY3RpdmUiLCJsb2dpblR5cGUiLCJwbGF0Zm9ybSIsInN5cyIsIldFQ0hBVF9HQU1FIiwiTG9naW5UeXBlIiwiV0VfQ0hBVF9HQU1FIiwiREVWSUNFX0lEIiwiZXZlbnQiLCJfZGVidWdMb2dpbiIsInBsYXllckRhdGEiLCJpZCIsIm5hbWUiLCJwaHlzaWNhbFBvd2VyIiwibWF4UGh5c2ljYWxQb3dlciIsImhlYXJ0IiwibWF4SGVhcnQiLCJjdXJyZW50U2VjdGlvbiIsImN1cnJlbnRMZXZlbCIsInBoeXNpY2FsUG93ZXJDb3N0ZWRGbGFnIiwib25EZXN0cm95Iiwib2ZmIiwib25BbGxSZXRyeUZhaWxlZCIsImxvZ2luSW5mbyIs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LENBQVAsQ0FBc0JtQiwwQkFBdEIsQ0FBaUQsR0FBakQsQ0FBeEI7QUFDQW1DLElBQUFBLFNBQVMsQ0FBQ3ZCLE1BQVYsR0FBbUIsSUFBbkI7QUFDQSxRQUFJdkIsU0FBUyxHQUFHeEIsRUFBRSxDQUFDeUIsSUFBSCxDQUFRLGNBQVIsQ0FBaEI7QUFDQUQsSUFBQUEsU0FBUyxDQUFDdUIsTUFBVixHQUFtQixJQUFuQjtBQUNBLFNBQUt4QyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0g7QUF2SUksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHBzOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICBkYXRhTWdyOiBudWxsLFxuICAgICAgICBsb2dpbk1ncjogbnVsbCxcbiAgICAgICAgbmV0d29ya01ncjogbnVsbCxcbiAgICAgICAgaXNMb2dpbmluZzogZmFsc2UsXG4gICAgICAgIGNoYW5nZVNjZW5lQW5pbWF0aW9uVGltZTogMixcbiAgICAgICAgbmFtZUVuU3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lLFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9uKFwidG91Y2hzdGFydFwiLHRoaXMub25Ub3VjaFN0YXJ0LHRoaXMpXG4gICAgICAgIHZhciB0ZXh0Q29uZmlnID0gcmVxdWlyZShcInRleHRDb25maWdcIilcbiAgICAgICAgaWYgKHRleHRDb25maWcubGFuZ3VhZ2VUeXBlICE9IDEpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm5hbWVcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLm5hbWVFblNwcml0ZUZyYW1lXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgICAgIHRoaXMuZGF0YU1nciA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpXG4gICAgICAgIHRoaXMubG9naW5NZ3IgPSByZXF1aXJlKFwibG9naW5NZ3JcIilcbiAgICAgICAgdGhpcy5uZXR3b3JrTWdyID0gcmVxdWlyZShcIm5ldHdvcmtNZ3JcIilcbiAgICAgICAgdGhpcy5uZXR3b3JrTWdyLmRlbGVnYXRlID0gdGhpc1xuICAgICAgICB2YXIgcmV0cnlOb2RlID0gY2MuZmluZChcIkNhbnZhcy9yZXRyeVwiKVxuICAgICAgICBjYy50d2VlbihyZXRyeU5vZGUpXG4gICAgICAgICAgICAucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgICAgICAgICBjYy50d2VlbigpXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjUse3NjYWxlOiAxLjJ9KVxuICAgICAgICAgICAgICAgICAgICAudG8oMC41LHtzY2FsZTogMC44fSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdGFydCgpXG5cbiAgICAgICAgdGhpcy5sb2dpbigpXG4gICAgICAgIC8vdGhpcy5fZGVidWdMb2dpbigpXG4gICAgfSxcblxuICAgIG9uUGxheWVyRGF0YVVwZGF0ZWQoKSB7XG4gICAgICAgIHJlcXVpcmUoXCJhZHZlcnRpc01nclwiKS5pbml0QWRzKClcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9sb2dpbkluZm8vdGV4dE5vZGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKS5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxNTcpXG4gICAgICAgIC8vYW5pbWF0aW9uIFxuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiB0aGlzLm5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpc1xuXG4gICAgICAgICAgICB2YXIgdGVtcCA9IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHNlbGYubm9kZS5jaGlsZHJlbltpXVxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpXG4gICAgICAgICAgICAgICAgICAgIC50byhzZWxmLmNoYW5nZVNjZW5lQW5pbWF0aW9uVGltZSwge29wYWNpdHk6IDB9KVxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGVtcChpbmRleClcbiAgICAgICAgfVxuXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSlcbiAgICAgICAgICAgIC5kZWxheSh0aGlzLmNoYW5nZVNjZW5lQW5pbWF0aW9uVGltZSlcbiAgICAgICAgICAgIC5jYWxsKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcmVxdWlyZShcInJlc01nclwiKS5sb2FkUmVzZXMoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgLy9yZXF1aXJlKFwibmV0d29ya01nclwiKS5zdGFydEhlYXJ0QmVhdCgpXG4gICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIm1haW5TY2VuZVwiKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXJ0KClcbiAgICB9LFxuXG4gICAgbG9naW4oKSB7XG4gICAgICAgIHRoaXMuaXNMb2dpbmluZyA9IHRydWVcbiAgICAgICAgdmFyIHJldHJ5Tm9kZSA9IGNjLmZpbmQoXCJDYW52YXMvcmV0cnlcIilcbiAgICAgICAgcmV0cnlOb2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvbG9naW5JbmZvL3RleHROb2RlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVxdWlyZShcInRleHRDb25maWdcIikuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTU2KVxuXG4gICAgICAgIHZhciBsb2dpblR5cGUgPSBudWxsXG4gICAgICAgIHZhciBwbGF0Zm9ybSA9IGNjLnN5cy5wbGF0Zm9ybVxuICAgICAgICBpZiAocGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FKSB7XG4gICAgICAgICAgICBsb2dpblR5cGUgPSB0aGlzLmxvZ2luTWdyLkxvZ2luVHlwZS5XRV9DSEFUX0dBTUVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZ2luVHlwZSA9IHRoaXMubG9naW5NZ3IuTG9naW5UeXBlLkRFVklDRV9JRFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2dpbk1nci5sb2dpbihsb2dpblR5cGUpXG4gICAgfSxcblxuICAgIG9uVG91Y2hTdGFydChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0xvZ2luaW5nID09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2luKClcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG5cbiAgICBfZGVidWdMb2dpbigpIHtcbiAgICAgICAgdGhpcy5kYXRhTWdyLnBsYXllckRhdGEgPSB7XG4gICAgICAgICAgICBpZDogMTAwMDAwMDAxLFxuICAgICAgICAgICAgbmFtZTogXCJuZXcgUGxheWVyXCIsXG4gICAgICAgICAgICBwaHlzaWNhbFBvd2VyOiAxMCxcbiAgICAgICAgICAgIG1heFBoeXNpY2FsUG93ZXI6IDEwLFxuICAgICAgICAgICAgaGVhcnQ6IDEwLFxuICAgICAgICAgICAgbWF4SGVhcnQ6IDEwLFxuICAgICAgICAgICAgY3VycmVudFNlY3Rpb246IDEsXG4gICAgICAgICAgICBjdXJyZW50TGV2ZWw6IDIsXG4gICAgICAgICAgICBwaHlzaWNhbFBvd2VyQ29zdGVkRmxhZzogMFxuICAgICAgICB9XG4gICAgICAgIHRoaXMub25QbGF5ZXJEYXRhVXBkYXRlZCgpXG4gICAgfSxcblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihcInRvdWNoc3RhcnRcIix0aGlzLm9uVG91Y2hTdGFydCx0aGlzKVxuICAgIH0sXG4gICAgb25BbGxSZXRyeUZhaWxlZCgpIHtcbiAgICAgICAgdmFyIGxvZ2luSW5mbyA9IGNjLmZpbmQoXCJDYW52YXMvbG9naW5JbmZvXCIpXG4gICAgICAgIHZhciBsb2dpbkluZm9MYWJlbCA9IGxvZ2luSW5mby5nZXRDaGlsZEJ5TmFtZShcInRleHROb2RlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbClcbiAgICAgICAgbG9naW5JbmZvTGFiZWwuc3RyaW5nID0gcmVxdWlyZShcInRleHRDb25maWdcIikuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTYxKVxuICAgICAgICBsb2dpbkluZm8uYWN0aXZlID0gdHJ1ZVxuICAgICAgICB2YXIgcmV0cnlOb2RlID0gY2MuZmluZChcIkNhbnZhcy9yZXRyeVwiKVxuICAgICAgICByZXRyeU5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICB0aGlzLmlzTG9naW5pbmcgPSBmYWxzZVxuICAgIH1cbiAgICBcbn0pO1xuIl19