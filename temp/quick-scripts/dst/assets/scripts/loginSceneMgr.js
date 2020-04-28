
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
        require("networkMgr").startHeartBeat();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xvZ2luU2NlbmVNZ3IuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJkYXRhTWdyIiwibG9naW5NZ3IiLCJuZXR3b3JrTWdyIiwiaXNMb2dpbmluZyIsImNoYW5nZVNjZW5lQW5pbWF0aW9uVGltZSIsIm5hbWVFblNwcml0ZUZyYW1lIiwiU3ByaXRlRnJhbWUiLCJvbkxvYWQiLCJub2RlIiwib24iLCJvblRvdWNoU3RhcnQiLCJ0ZXh0Q29uZmlnIiwicmVxdWlyZSIsImxhbmd1YWdlVHlwZSIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50IiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJzdGFydCIsImRlbGVnYXRlIiwicmV0cnlOb2RlIiwiZmluZCIsInR3ZWVuIiwicmVwZWF0Rm9yZXZlciIsInRvIiwic2NhbGUiLCJsb2dpbiIsIm9uUGxheWVyRGF0YVVwZGF0ZWQiLCJpbml0QWRzIiwiTGFiZWwiLCJzdHJpbmciLCJnZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSIsImluZGV4IiwiY2hpbGRyZW4iLCJzZWxmIiwidGVtcCIsImkiLCJvcGFjaXR5IiwiZGVsYXkiLCJjYWxsIiwibG9hZFJlc2VzIiwic3RhcnRIZWFydEJlYXQiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsImFjdGl2ZSIsImxvZ2luVHlwZSIsInBsYXRmb3JtIiwic3lzIiwiV0VDSEFUX0dBTUUiLCJMb2dpblR5cGUiLCJXRV9DSEFUX0dBTUUiLCJERVZJQ0VfSUQiLCJldmVudCIsIl9kZWJ1Z0xvZ2luIiwicGxheWVyRGF0YSIsImlkIiwibmFtZSIsInBoeXNpY2FsUG93ZXIiLCJtYXhQaHlzaWNhbFBvd2VyIiwiaGVhcnQiLCJtYXhIZWFydCIsImN1cnJlbnRTZWN0aW9uIiwiY3VycmVudExldmVsIiwicGh5c2ljYWxQb3dlckNvc3RlZEZsYWciLCJvbkRlc3Ryb3kiLCJvZmYiLCJvbkFsbFJldHJ5RmFpbGVkIiwibG9naW5JbmZvIiwibG9naW5JbmZvTGFiZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxJQUFBQSxPQUFPLEVBQUUsSUFoQkQ7QUFpQlJDLElBQUFBLFFBQVEsRUFBRSxJQWpCRjtBQWtCUkMsSUFBQUEsVUFBVSxFQUFFLElBbEJKO0FBbUJSQyxJQUFBQSxVQUFVLEVBQUUsS0FuQko7QUFvQlJDLElBQUFBLHdCQUF3QixFQUFFLENBcEJsQjtBQXFCUkMsSUFBQUEsaUJBQWlCLEVBQUVULEVBQUUsQ0FBQ1U7QUFyQmQsR0FIUDtBQTJCTDtBQUVBQyxFQUFBQSxNQTdCSyxvQkE2Qks7QUFFTixTQUFLQyxJQUFMLENBQVVDLEVBQVYsQ0FBYSxZQUFiLEVBQTBCLEtBQUtDLFlBQS9CLEVBQTRDLElBQTVDOztBQUNBLFFBQUlDLFVBQVUsR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBeEI7O0FBQ0EsUUFBSUQsVUFBVSxDQUFDRSxZQUFYLElBQTJCLENBQS9CLEVBQWtDO0FBQzlCLFdBQUtMLElBQUwsQ0FBVU0sY0FBVixDQUF5QixNQUF6QixFQUFpQ0MsWUFBakMsQ0FBOENuQixFQUFFLENBQUNvQixNQUFqRCxFQUF5REMsV0FBekQsR0FBdUUsS0FBS1osaUJBQTVFO0FBQ0g7QUFDSixHQXBDSTtBQXNDTGEsRUFBQUEsS0F0Q0ssbUJBc0NJO0FBRUwsU0FBS2xCLE9BQUwsR0FBZVksT0FBTyxDQUFDLFNBQUQsQ0FBdEI7QUFDQSxTQUFLWCxRQUFMLEdBQWdCVyxPQUFPLENBQUMsVUFBRCxDQUF2QjtBQUNBLFNBQUtWLFVBQUwsR0FBa0JVLE9BQU8sQ0FBQyxZQUFELENBQXpCO0FBQ0EsU0FBS1YsVUFBTCxDQUFnQmlCLFFBQWhCLEdBQTJCLElBQTNCO0FBQ0EsUUFBSUMsU0FBUyxHQUFHeEIsRUFBRSxDQUFDeUIsSUFBSCxDQUFRLGNBQVIsQ0FBaEI7QUFDQXpCLElBQUFBLEVBQUUsQ0FBQzBCLEtBQUgsQ0FBU0YsU0FBVCxFQUNLRyxhQURMLENBRVEzQixFQUFFLENBQUMwQixLQUFILEdBQ0tFLEVBREwsQ0FDUSxHQURSLEVBQ1k7QUFBQ0MsTUFBQUEsS0FBSyxFQUFFO0FBQVIsS0FEWixFQUVLRCxFQUZMLENBRVEsR0FGUixFQUVZO0FBQUNDLE1BQUFBLEtBQUssRUFBRTtBQUFSLEtBRlosQ0FGUixFQU1LUCxLQU5MO0FBUUEsU0FBS1EsS0FBTCxHQWZLLENBZ0JMO0FBQ0gsR0F2REk7QUF5RExDLEVBQUFBLG1CQXpESyxpQ0F5RGlCO0FBQ2xCZixJQUFBQSxPQUFPLENBQUMsYUFBRCxDQUFQLENBQXVCZ0IsT0FBdkI7O0FBQ0FoQyxJQUFBQSxFQUFFLENBQUN5QixJQUFILENBQVEsMkJBQVIsRUFBcUNOLFlBQXJDLENBQWtEbkIsRUFBRSxDQUFDaUMsS0FBckQsRUFBNERDLE1BQTVELEdBQXFFbEIsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQm1CLDBCQUF0QixDQUFpRCxHQUFqRCxDQUFyRSxDQUZrQixDQUdsQjs7QUFDQSxTQUFLLElBQUlDLEtBQVQsSUFBa0IsS0FBS3hCLElBQUwsQ0FBVXlCLFFBQTVCLEVBQXNDO0FBQ2xDLFVBQUlDLElBQUksR0FBRyxJQUFYOztBQUVBLFVBQUlDLElBQUksR0FBRyxTQUFQQSxJQUFPLENBQVNDLENBQVQsRUFBWTtBQUNuQixZQUFJNUIsSUFBSSxHQUFHMEIsSUFBSSxDQUFDMUIsSUFBTCxDQUFVeUIsUUFBVixDQUFtQkcsQ0FBbkIsQ0FBWDtBQUNBeEMsUUFBQUEsRUFBRSxDQUFDMEIsS0FBSCxDQUFTZCxJQUFULEVBQ0tnQixFQURMLENBQ1FVLElBQUksQ0FBQzlCLHdCQURiLEVBQ3VDO0FBQUNpQyxVQUFBQSxPQUFPLEVBQUU7QUFBVixTQUR2QyxFQUVLbkIsS0FGTDtBQUdILE9BTEQ7O0FBTUFpQixNQUFBQSxJQUFJLENBQUNILEtBQUQsQ0FBSjtBQUNIOztBQUVEcEMsSUFBQUEsRUFBRSxDQUFDMEIsS0FBSCxDQUFTLEtBQUtkLElBQWQsRUFDSzhCLEtBREwsQ0FDVyxLQUFLbEMsd0JBRGhCLEVBRUttQyxJQUZMLENBRVUsWUFBVTtBQUNaM0IsTUFBQUEsT0FBTyxDQUFDLFFBQUQsQ0FBUCxDQUFrQjRCLFNBQWxCLENBQTRCLFlBQVU7QUFDbEM1QixRQUFBQSxPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCNkIsY0FBdEI7O0FBQ0E3QyxRQUFBQSxFQUFFLENBQUM4QyxRQUFILENBQVlDLFNBQVosQ0FBc0IsV0FBdEI7QUFDSCxPQUhEO0FBSUgsS0FQTCxFQVFLekIsS0FSTDtBQVNILEdBbEZJO0FBb0ZMUSxFQUFBQSxLQXBGSyxtQkFvRkc7QUFDSixTQUFLdkIsVUFBTCxHQUFrQixJQUFsQjtBQUNBLFFBQUlpQixTQUFTLEdBQUd4QixFQUFFLENBQUN5QixJQUFILENBQVEsY0FBUixDQUFoQjtBQUNBRCxJQUFBQSxTQUFTLENBQUN3QixNQUFWLEdBQW1CLEtBQW5CO0FBQ0FoRCxJQUFBQSxFQUFFLENBQUN5QixJQUFILENBQVEsMkJBQVIsRUFBcUNOLFlBQXJDLENBQWtEbkIsRUFBRSxDQUFDaUMsS0FBckQsRUFBNERDLE1BQTVELEdBQXFFbEIsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQm1CLDBCQUF0QixDQUFpRCxHQUFqRCxDQUFyRTtBQUVBLFFBQUljLFNBQVMsR0FBRyxJQUFoQjtBQUNBLFFBQUlDLFFBQVEsR0FBR2xELEVBQUUsQ0FBQ21ELEdBQUgsQ0FBT0QsUUFBdEI7O0FBQ0EsUUFBSUEsUUFBUSxJQUFJbEQsRUFBRSxDQUFDbUQsR0FBSCxDQUFPQyxXQUF2QixFQUFvQztBQUNoQ0gsTUFBQUEsU0FBUyxHQUFHLEtBQUs1QyxRQUFMLENBQWNnRCxTQUFkLENBQXdCQyxZQUFwQztBQUNILEtBRkQsTUFHSztBQUNETCxNQUFBQSxTQUFTLEdBQUcsS0FBSzVDLFFBQUwsQ0FBY2dELFNBQWQsQ0FBd0JFLFNBQXBDO0FBQ0g7O0FBRUQsU0FBS2xELFFBQUwsQ0FBY3lCLEtBQWQsQ0FBb0JtQixTQUFwQjtBQUNILEdBcEdJO0FBc0dMbkMsRUFBQUEsWUF0R0ssd0JBc0dRMEMsS0F0R1IsRUFzR2U7QUFDaEIsUUFBSSxLQUFLakQsVUFBTCxJQUFtQixLQUF2QixFQUE4QjtBQUMxQixXQUFLdUIsS0FBTDtBQUNIO0FBQ0osR0ExR0k7QUEyR0w7QUFFQTJCLEVBQUFBLFdBN0dLLHlCQTZHUztBQUNWLFNBQUtyRCxPQUFMLENBQWFzRCxVQUFiLEdBQTBCO0FBQ3RCQyxNQUFBQSxFQUFFLEVBQUUsU0FEa0I7QUFFdEJDLE1BQUFBLElBQUksRUFBRSxZQUZnQjtBQUd0QkMsTUFBQUEsYUFBYSxFQUFFLEVBSE87QUFJdEJDLE1BQUFBLGdCQUFnQixFQUFFLEVBSkk7QUFLdEJDLE1BQUFBLEtBQUssRUFBRSxFQUxlO0FBTXRCQyxNQUFBQSxRQUFRLEVBQUUsRUFOWTtBQU90QkMsTUFBQUEsY0FBYyxFQUFFLENBUE07QUFRdEJDLE1BQUFBLFlBQVksRUFBRSxDQVJRO0FBU3RCQyxNQUFBQSx1QkFBdUIsRUFBRTtBQVRILEtBQTFCO0FBV0EsU0FBS3BDLG1CQUFMO0FBQ0gsR0ExSEk7QUE0SExxQyxFQUFBQSxTQTVISyx1QkE0SE87QUFDUixTQUFLeEQsSUFBTCxDQUFVeUQsR0FBVixDQUFjLFlBQWQsRUFBMkIsS0FBS3ZELFlBQWhDLEVBQTZDLElBQTdDO0FBQ0gsR0E5SEk7QUErSEx3RCxFQUFBQSxnQkEvSEssOEJBK0hjO0FBQ2YsUUFBSUMsU0FBUyxHQUFHdkUsRUFBRSxDQUFDeUIsSUFBSCxDQUFRLGtCQUFSLENBQWhCO0FBQ0EsUUFBSStDLGNBQWMsR0FBR0QsU0FBUyxDQUFDckQsY0FBVixDQUF5QixVQUF6QixFQUFxQ0MsWUFBckMsQ0FBa0RuQixFQUFFLENBQUNpQyxLQUFyRCxDQUFyQjtBQUNBdUMsSUFBQUEsY0FBYyxDQUFDdEMsTUFBZixHQUF3QmxCLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0JtQiwwQkFBdEIsQ0FBaUQsR0FBakQsQ0FBeEI7QUFDQW9DLElBQUFBLFNBQVMsQ0FBQ3ZCLE1BQVYsR0FBbUIsSUFBbkI7QUFDQSxRQUFJeEIsU0FBUyxHQUFHeEIsRUFBRSxDQUFDeUIsSUFBSCxDQUFRLGNBQVIsQ0FBaEI7QUFDQUQsSUFBQUEsU0FBUyxDQUFDd0IsTUFBVixHQUFtQixJQUFuQjtBQUNBLFNBQUt6QyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0g7QUF2SUksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHBzOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICBkYXRhTWdyOiBudWxsLFxuICAgICAgICBsb2dpbk1ncjogbnVsbCxcbiAgICAgICAgbmV0d29ya01ncjogbnVsbCxcbiAgICAgICAgaXNMb2dpbmluZzogZmFsc2UsXG4gICAgICAgIGNoYW5nZVNjZW5lQW5pbWF0aW9uVGltZTogMixcbiAgICAgICAgbmFtZUVuU3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lLFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9uKFwidG91Y2hzdGFydFwiLHRoaXMub25Ub3VjaFN0YXJ0LHRoaXMpXG4gICAgICAgIHZhciB0ZXh0Q29uZmlnID0gcmVxdWlyZShcInRleHRDb25maWdcIilcbiAgICAgICAgaWYgKHRleHRDb25maWcubGFuZ3VhZ2VUeXBlICE9IDEpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm5hbWVcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLm5hbWVFblNwcml0ZUZyYW1lXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgICAgIHRoaXMuZGF0YU1nciA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpXG4gICAgICAgIHRoaXMubG9naW5NZ3IgPSByZXF1aXJlKFwibG9naW5NZ3JcIilcbiAgICAgICAgdGhpcy5uZXR3b3JrTWdyID0gcmVxdWlyZShcIm5ldHdvcmtNZ3JcIilcbiAgICAgICAgdGhpcy5uZXR3b3JrTWdyLmRlbGVnYXRlID0gdGhpc1xuICAgICAgICB2YXIgcmV0cnlOb2RlID0gY2MuZmluZChcIkNhbnZhcy9yZXRyeVwiKVxuICAgICAgICBjYy50d2VlbihyZXRyeU5vZGUpXG4gICAgICAgICAgICAucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgICAgICAgICBjYy50d2VlbigpXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjUse3NjYWxlOiAxLjJ9KVxuICAgICAgICAgICAgICAgICAgICAudG8oMC41LHtzY2FsZTogMC44fSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdGFydCgpXG5cbiAgICAgICAgdGhpcy5sb2dpbigpXG4gICAgICAgIC8vdGhpcy5fZGVidWdMb2dpbigpXG4gICAgfSxcblxuICAgIG9uUGxheWVyRGF0YVVwZGF0ZWQoKSB7XG4gICAgICAgIHJlcXVpcmUoXCJhZHZlcnRpc01nclwiKS5pbml0QWRzKClcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9sb2dpbkluZm8vdGV4dE5vZGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKS5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxNTcpXG4gICAgICAgIC8vYW5pbWF0aW9uIFxuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiB0aGlzLm5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpc1xuXG4gICAgICAgICAgICB2YXIgdGVtcCA9IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHNlbGYubm9kZS5jaGlsZHJlbltpXVxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpXG4gICAgICAgICAgICAgICAgICAgIC50byhzZWxmLmNoYW5nZVNjZW5lQW5pbWF0aW9uVGltZSwge29wYWNpdHk6IDB9KVxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGVtcChpbmRleClcbiAgICAgICAgfVxuXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSlcbiAgICAgICAgICAgIC5kZWxheSh0aGlzLmNoYW5nZVNjZW5lQW5pbWF0aW9uVGltZSlcbiAgICAgICAgICAgIC5jYWxsKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcmVxdWlyZShcInJlc01nclwiKS5sb2FkUmVzZXMoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShcIm5ldHdvcmtNZ3JcIikuc3RhcnRIZWFydEJlYXQoKVxuICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJtYWluU2NlbmVcIilcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpXG4gICAgfSxcblxuICAgIGxvZ2luKCkge1xuICAgICAgICB0aGlzLmlzTG9naW5pbmcgPSB0cnVlXG4gICAgICAgIHZhciByZXRyeU5vZGUgPSBjYy5maW5kKFwiQ2FudmFzL3JldHJ5XCIpXG4gICAgICAgIHJldHJ5Tm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL2xvZ2luSW5mby90ZXh0Tm9kZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJlcXVpcmUoXCJ0ZXh0Q29uZmlnXCIpLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDE1NilcblxuICAgICAgICB2YXIgbG9naW5UeXBlID0gbnVsbFxuICAgICAgICB2YXIgcGxhdGZvcm0gPSBjYy5zeXMucGxhdGZvcm1cbiAgICAgICAgaWYgKHBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRSkge1xuICAgICAgICAgICAgbG9naW5UeXBlID0gdGhpcy5sb2dpbk1nci5Mb2dpblR5cGUuV0VfQ0hBVF9HQU1FXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2dpblR5cGUgPSB0aGlzLmxvZ2luTWdyLkxvZ2luVHlwZS5ERVZJQ0VfSURcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9naW5NZ3IubG9naW4obG9naW5UeXBlKVxuICAgIH0sXG5cbiAgICBvblRvdWNoU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNMb2dpbmluZyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5sb2dpbigpXG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxuXG4gICAgX2RlYnVnTG9naW4oKSB7XG4gICAgICAgIHRoaXMuZGF0YU1nci5wbGF5ZXJEYXRhID0ge1xuICAgICAgICAgICAgaWQ6IDEwMDAwMDAwMSxcbiAgICAgICAgICAgIG5hbWU6IFwibmV3IFBsYXllclwiLFxuICAgICAgICAgICAgcGh5c2ljYWxQb3dlcjogMTAsXG4gICAgICAgICAgICBtYXhQaHlzaWNhbFBvd2VyOiAxMCxcbiAgICAgICAgICAgIGhlYXJ0OiAxMCxcbiAgICAgICAgICAgIG1heEhlYXJ0OiAxMCxcbiAgICAgICAgICAgIGN1cnJlbnRTZWN0aW9uOiAxLFxuICAgICAgICAgICAgY3VycmVudExldmVsOiAyLFxuICAgICAgICAgICAgcGh5c2ljYWxQb3dlckNvc3RlZEZsYWc6IDBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uUGxheWVyRGF0YVVwZGF0ZWQoKVxuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoXCJ0b3VjaHN0YXJ0XCIsdGhpcy5vblRvdWNoU3RhcnQsdGhpcylcbiAgICB9LFxuICAgIG9uQWxsUmV0cnlGYWlsZWQoKSB7XG4gICAgICAgIHZhciBsb2dpbkluZm8gPSBjYy5maW5kKFwiQ2FudmFzL2xvZ2luSW5mb1wiKVxuICAgICAgICB2YXIgbG9naW5JbmZvTGFiZWwgPSBsb2dpbkluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0Tm9kZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXG4gICAgICAgIGxvZ2luSW5mb0xhYmVsLnN0cmluZyA9IHJlcXVpcmUoXCJ0ZXh0Q29uZmlnXCIpLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDE2MSlcbiAgICAgICAgbG9naW5JbmZvLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgdmFyIHJldHJ5Tm9kZSA9IGNjLmZpbmQoXCJDYW52YXMvcmV0cnlcIilcbiAgICAgICAgcmV0cnlOb2RlLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgdGhpcy5pc0xvZ2luaW5nID0gZmFsc2VcbiAgICB9XG4gICAgXG59KTtcbiJdfQ==