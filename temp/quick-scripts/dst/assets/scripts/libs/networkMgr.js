
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/libs/networkMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '06ef571V7VDkpNc4lgVqmds', 'networkMgr');
// scripts/libs/networkMgr.js

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
var Networkmgr = cc.Class({
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
    delegate: null,
    retryDelta: 1.5,
    maxRetryTime: 3,
    retryWaitingNode: null,
    retryAction: null
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {},
  // update (dt) {},
  sendMessage: function sendMessage(msg, port, ip, suffix, successCallBack) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
        successCallBack(xhr);
      }
    };

    var url = "http://" + ip + ":" + port.toString() + "/" + suffix.toString();
    xhr.open("POST", url);
    xhr.send(msg);
  },
  makeMessageObj: function makeMessageObj(moduleName, messageTypeName) {
    var gloableConfig = require("gloableConfig");

    var netWorkMessageConfigs = gloableConfig.netWorkMessageConfigs;
    var moduleObj = netWorkMessageConfigs[moduleName];

    if (moduleObj != null) {
      var ip = gloableConfig.basicIp;
      var port = gloableConfig.basicPort;

      if (moduleObj.ip != null) {
        ip = moduleObj.ip;
      }

      if (moduleObj.port != null) {
        port = moduleObj.port;
      }

      var suffix = moduleObj.suffix;
      var message = moduleObj[messageTypeName];

      var successCallBack = function successCallBack(xhr) {};

      var obj = {
        ip: ip,
        port: port,
        suffix: suffix,
        message: message,
        successCallBack: successCallBack
      };
      return obj;
    } else {
      cc.error("no such module name of " + moduleName);
      return null;
    }
  },
  sendMessageByMsgObj: function sendMessageByMsgObj(msgObj) {
    var url = "https://" + msgObj.ip + ":" + msgObj.port.toString() + "/" + msgObj.suffix;
    var xhr = null;
    xhr = new XMLHttpRequest();
    var self = this;

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
        msgObj.successCallBack(xhr);

        if (self.retryingFlag == true) {
          self.retryResult = true;
        }
      }
    };

    var msgForSend = JSON.stringify(msgObj.message);

    xhr.onerror = function () {
      cc.log("err");

      if (self.retryAction == null) {
        self.retryAction = function () {
          xhr.send(msgForSend);
          xhr.currentRetryTime += 1;
        };
      }

      if (xhr.currentRetryTime == null || xhr.currentRetryTime == undefined) {
        xhr.currentRetryTime = 0;
      }

      var retry = function retry(xhr) {
        cc.log("retry", xhr.currentRetryTime);

        if (xhr.currentRetryTime > self.maxRetryTime) {
          self.retryWaitingNode.destroy();
          self.retryWaitingNode.removeFromParent();
          self.retryWaitingNode = null;
          self.retryAction = null;
          self.unscheduleAllCallbacks(); //do something else

          var currentScene = cc.director.getScene();

          if (currentScene.name == "loginScene") {
            var mgr = currentScene.getChildByName("Canvas").getComponent("loginSceneMgr");
            mgr.onAllRetryFailed();
          } else {
            cc.loader.loadRes("prefabs/backToLoginScene", function (err, res) {
              var node = cc.instantiate(res);
              var bg = node.getChildByName("bg");
              bg.width = cc.winSize.width;
              bg.height = cc.winSize.height;
              bg.on("touchstart", function () {});
              var ensureButtonNode = node.getChildByName("others").getChildByName("ensureButton");
              ensureButtonNode.on("click", function () {
                cc.director.loadScene("loginScene");
              });
              cc.director.getScene().getChildByName("Canvas").addChild(node);
            });
          }
        } else if (xhr.currentRetryTime == 0) {
          cc.director.getScene().getChildByName("Canvas").addChild(self.retryWaitingNode);
          self.schedule(self.retryAction, self.retryDelta);
        }
      };

      if (self.retryWaitingNode == null) {
        cc.loader.loadRes("prefabs/retryWaitingNode", function (err, res) {
          var node = cc.instantiate(res);
          var bg = node.getChildByName("bg");
          bg.width = cc.winSize.width;
          bg.height = cc.winSize.height;
          bg.on("touchstart", function () {});
          self.retryWaitingNode = node;
          retry(xhr);
        });
      } else {
        retry(xhr);
      }
    };

    xhr.ontimeout = function () {
      cc.log("time out!!!");
    };

    xhr.onabort = function () {
      cc.log("abord");
    };

    if (xhr.readyState == 0) {
      xhr.open("POST", url);
    }

    xhr.send(msgForSend);
  },
  onAllRetryFailed: function onAllRetryFailed() {},
  startHeartBeat: function startHeartBeat() {
    var messageObj = this.makeMessageObj("longConnectModule", "heartBeatMessageType");
    messageObj.message.playerId = require("dataMgr").playerData.id;

    messageObj.successCallBack = function (xhr) {
      var response = xhr.responseText;
      response = JSON.parse(response);

      if (response.type == "message") {
        var messages = response.messages;

        for (var index in messages) {
          var oneMessage = messages[index];

          if (oneMessage.type == "mailSysSendMail") {
            var mailId = oneMessage.mailId;
            var timeStamp = oneMessage.timeStamp;
            var tag = oneMessage.tag;
            var mail = {
              "status": 0,
              "tag": tag,
              "timeStamp": timeStamp,
              "selectedOptionIndex": -1
            };
            require("dataMgr").playerData.mails[mailId] = mail;
          }
        }
      }
    }; //this.sendMessageByMsgObj(messageObj,true)


    this.schedule(function () {
      this.sendMessageByMsgObj(messageObj);
    }, 60);
  }
});
var sharedMgr = new Networkmgr();
module.exports = sharedMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xpYnMvbmV0d29ya01nci5qcyJdLCJuYW1lcyI6WyJOZXR3b3JrbWdyIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJkZWxlZ2F0ZSIsInJldHJ5RGVsdGEiLCJtYXhSZXRyeVRpbWUiLCJyZXRyeVdhaXRpbmdOb2RlIiwicmV0cnlBY3Rpb24iLCJzdGFydCIsInNlbmRNZXNzYWdlIiwibXNnIiwicG9ydCIsImlwIiwic3VmZml4Iiwic3VjY2Vzc0NhbGxCYWNrIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwidXJsIiwidG9TdHJpbmciLCJvcGVuIiwic2VuZCIsIm1ha2VNZXNzYWdlT2JqIiwibW9kdWxlTmFtZSIsIm1lc3NhZ2VUeXBlTmFtZSIsImdsb2FibGVDb25maWciLCJyZXF1aXJlIiwibmV0V29ya01lc3NhZ2VDb25maWdzIiwibW9kdWxlT2JqIiwiYmFzaWNJcCIsImJhc2ljUG9ydCIsIm1lc3NhZ2UiLCJvYmoiLCJlcnJvciIsInNlbmRNZXNzYWdlQnlNc2dPYmoiLCJtc2dPYmoiLCJzZWxmIiwicmV0cnlpbmdGbGFnIiwicmV0cnlSZXN1bHQiLCJtc2dGb3JTZW5kIiwiSlNPTiIsInN0cmluZ2lmeSIsIm9uZXJyb3IiLCJsb2ciLCJjdXJyZW50UmV0cnlUaW1lIiwidW5kZWZpbmVkIiwicmV0cnkiLCJkZXN0cm95IiwicmVtb3ZlRnJvbVBhcmVudCIsInVuc2NoZWR1bGVBbGxDYWxsYmFja3MiLCJjdXJyZW50U2NlbmUiLCJkaXJlY3RvciIsImdldFNjZW5lIiwibmFtZSIsIm1nciIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50Iiwib25BbGxSZXRyeUZhaWxlZCIsImxvYWRlciIsImxvYWRSZXMiLCJlcnIiLCJyZXMiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJiZyIsIndpZHRoIiwid2luU2l6ZSIsImhlaWdodCIsIm9uIiwiZW5zdXJlQnV0dG9uTm9kZSIsImxvYWRTY2VuZSIsImFkZENoaWxkIiwic2NoZWR1bGUiLCJvbnRpbWVvdXQiLCJvbmFib3J0Iiwic3RhcnRIZWFydEJlYXQiLCJtZXNzYWdlT2JqIiwicGxheWVySWQiLCJwbGF5ZXJEYXRhIiwiaWQiLCJyZXNwb25zZSIsInJlc3BvbnNlVGV4dCIsInBhcnNlIiwidHlwZSIsIm1lc3NhZ2VzIiwiaW5kZXgiLCJvbmVNZXNzYWdlIiwibWFpbElkIiwidGltZVN0YW1wIiwidGFnIiwibWFpbCIsIm1haWxzIiwic2hhcmVkTWdyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFJQSxVQUFVLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3RCLGFBQVNELEVBQUUsQ0FBQ0UsU0FEVTtBQUV0QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLElBQUFBLFFBQVEsRUFBRSxJQWhCRjtBQWtCUkMsSUFBQUEsVUFBVSxFQUFFLEdBbEJKO0FBbUJSQyxJQUFBQSxZQUFZLEVBQUUsQ0FuQk47QUFxQlJDLElBQUFBLGdCQUFnQixFQUFFLElBckJWO0FBc0JSQyxJQUFBQSxXQUFXLEVBQUU7QUF0QkwsR0FGVTtBQTJCdEI7QUFFQTtBQUVBQyxFQUFBQSxLQS9Cc0IsbUJBK0JiLENBRVIsQ0FqQ3FCO0FBbUN0QjtBQUVBQyxFQUFBQSxXQXJDc0IsdUJBcUNWQyxHQXJDVSxFQXFDTkMsSUFyQ00sRUFxQ0RDLEVBckNDLEVBcUNFQyxNQXJDRixFQXFDU0MsZUFyQ1QsRUFxQzBCO0FBQzVDLFFBQUlDLEdBQUcsR0FBRyxJQUFJQyxjQUFKLEVBQVY7O0FBQ0FELElBQUFBLEdBQUcsQ0FBQ0Usa0JBQUosR0FBeUIsWUFBVztBQUNoQyxVQUFJRixHQUFHLENBQUNHLFVBQUosSUFBa0IsQ0FBbEIsSUFBd0JILEdBQUcsQ0FBQ0ksTUFBSixJQUFjLEdBQWQsSUFBcUJKLEdBQUcsQ0FBQ0ksTUFBSixHQUFhLEdBQTlELEVBQW9FO0FBQ2hFTCxRQUFBQSxlQUFlLENBQUNDLEdBQUQsQ0FBZjtBQUNIO0FBQ0osS0FKRDs7QUFLQSxRQUFJSyxHQUFHLEdBQUcsWUFBWVIsRUFBWixHQUFpQixHQUFqQixHQUF1QkQsSUFBSSxDQUFDVSxRQUFMLEVBQXZCLEdBQXdDLEdBQXhDLEdBQThDUixNQUFNLENBQUNRLFFBQVAsRUFBeEQ7QUFDQU4sSUFBQUEsR0FBRyxDQUFDTyxJQUFKLENBQVMsTUFBVCxFQUFnQkYsR0FBaEI7QUFDQUwsSUFBQUEsR0FBRyxDQUFDUSxJQUFKLENBQVNiLEdBQVQ7QUFDSCxHQS9DcUI7QUFpRHRCYyxFQUFBQSxjQWpEc0IsMEJBaURQQyxVQWpETyxFQWlES0MsZUFqREwsRUFpRHNCO0FBQ3hDLFFBQUlDLGFBQWEsR0FBR0MsT0FBTyxDQUFDLGVBQUQsQ0FBM0I7O0FBRUEsUUFBSUMscUJBQXFCLEdBQUdGLGFBQWEsQ0FBQ0UscUJBQTFDO0FBQ0EsUUFBSUMsU0FBUyxHQUFHRCxxQkFBcUIsQ0FBQ0osVUFBRCxDQUFyQzs7QUFFQSxRQUFJSyxTQUFTLElBQUksSUFBakIsRUFBdUI7QUFDbkIsVUFBSWxCLEVBQUUsR0FBR2UsYUFBYSxDQUFDSSxPQUF2QjtBQUNBLFVBQUlwQixJQUFJLEdBQUdnQixhQUFhLENBQUNLLFNBQXpCOztBQUNBLFVBQUlGLFNBQVMsQ0FBQ2xCLEVBQVYsSUFBZ0IsSUFBcEIsRUFBMEI7QUFDdEJBLFFBQUFBLEVBQUUsR0FBR2tCLFNBQVMsQ0FBQ2xCLEVBQWY7QUFDSDs7QUFDRCxVQUFJa0IsU0FBUyxDQUFDbkIsSUFBVixJQUFrQixJQUF0QixFQUE0QjtBQUN4QkEsUUFBQUEsSUFBSSxHQUFHbUIsU0FBUyxDQUFDbkIsSUFBakI7QUFDSDs7QUFFRCxVQUFJRSxNQUFNLEdBQUdpQixTQUFTLENBQUNqQixNQUF2QjtBQUVBLFVBQUlvQixPQUFPLEdBQUdILFNBQVMsQ0FBQ0osZUFBRCxDQUF2Qjs7QUFDQSxVQUFJWixlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQVNDLEdBQVQsRUFBYSxDQUFFLENBQXJDOztBQUNBLFVBQUltQixHQUFHLEdBQUc7QUFDTnRCLFFBQUFBLEVBQUUsRUFBRUEsRUFERTtBQUVORCxRQUFBQSxJQUFJLEVBQUVBLElBRkE7QUFHTkUsUUFBQUEsTUFBTSxFQUFFQSxNQUhGO0FBSU5vQixRQUFBQSxPQUFPLEVBQUVBLE9BSkg7QUFLTm5CLFFBQUFBLGVBQWUsRUFBRUE7QUFMWCxPQUFWO0FBT0EsYUFBT29CLEdBQVA7QUFDSCxLQXRCRCxNQXVCSztBQUNEbkMsTUFBQUEsRUFBRSxDQUFDb0MsS0FBSCxDQUFTLDRCQUE0QlYsVUFBckM7QUFDQSxhQUFPLElBQVA7QUFDSDtBQUNKLEdBbEZxQjtBQW9GdEJXLEVBQUFBLG1CQXBGc0IsK0JBb0ZGQyxNQXBGRSxFQW9GTTtBQUN4QixRQUFJakIsR0FBRyxHQUFHLGFBQWFpQixNQUFNLENBQUN6QixFQUFwQixHQUF5QixHQUF6QixHQUErQnlCLE1BQU0sQ0FBQzFCLElBQVAsQ0FBWVUsUUFBWixFQUEvQixHQUF3RCxHQUF4RCxHQUE4RGdCLE1BQU0sQ0FBQ3hCLE1BQS9FO0FBQ0EsUUFBSUUsR0FBRyxHQUFHLElBQVY7QUFDQUEsSUFBQUEsR0FBRyxHQUFHLElBQUlDLGNBQUosRUFBTjtBQUNBLFFBQUlzQixJQUFJLEdBQUcsSUFBWDs7QUFDQXZCLElBQUFBLEdBQUcsQ0FBQ0Usa0JBQUosR0FBeUIsWUFBVztBQUNoQyxVQUFJRixHQUFHLENBQUNHLFVBQUosSUFBa0IsQ0FBbEIsSUFBd0JILEdBQUcsQ0FBQ0ksTUFBSixJQUFjLEdBQWQsSUFBcUJKLEdBQUcsQ0FBQ0ksTUFBSixHQUFhLEdBQTlELEVBQW9FO0FBQ2hFa0IsUUFBQUEsTUFBTSxDQUFDdkIsZUFBUCxDQUF1QkMsR0FBdkI7O0FBQ0EsWUFBSXVCLElBQUksQ0FBQ0MsWUFBTCxJQUFxQixJQUF6QixFQUErQjtBQUMzQkQsVUFBQUEsSUFBSSxDQUFDRSxXQUFMLEdBQW1CLElBQW5CO0FBQ0g7QUFDSjtBQUNKLEtBUEQ7O0FBUUEsUUFBSUMsVUFBVSxHQUFHQyxJQUFJLENBQUNDLFNBQUwsQ0FBZU4sTUFBTSxDQUFDSixPQUF0QixDQUFqQjs7QUFDQWxCLElBQUFBLEdBQUcsQ0FBQzZCLE9BQUosR0FBYyxZQUFVO0FBQ3BCN0MsTUFBQUEsRUFBRSxDQUFDOEMsR0FBSCxDQUFPLEtBQVA7O0FBQ0EsVUFBSVAsSUFBSSxDQUFDL0IsV0FBTCxJQUFvQixJQUF4QixFQUE4QjtBQUMxQitCLFFBQUFBLElBQUksQ0FBQy9CLFdBQUwsR0FBbUIsWUFBVTtBQUN6QlEsVUFBQUEsR0FBRyxDQUFDUSxJQUFKLENBQVNrQixVQUFUO0FBQ0ExQixVQUFBQSxHQUFHLENBQUMrQixnQkFBSixJQUF3QixDQUF4QjtBQUNILFNBSEQ7QUFJSDs7QUFFRCxVQUFJL0IsR0FBRyxDQUFDK0IsZ0JBQUosSUFBd0IsSUFBeEIsSUFBZ0MvQixHQUFHLENBQUMrQixnQkFBSixJQUF3QkMsU0FBNUQsRUFBdUU7QUFDbkVoQyxRQUFBQSxHQUFHLENBQUMrQixnQkFBSixHQUF1QixDQUF2QjtBQUNIOztBQUNELFVBQUlFLEtBQUssR0FBRyxTQUFSQSxLQUFRLENBQVNqQyxHQUFULEVBQWE7QUFDckJoQixRQUFBQSxFQUFFLENBQUM4QyxHQUFILENBQU8sT0FBUCxFQUFlOUIsR0FBRyxDQUFDK0IsZ0JBQW5COztBQUNBLFlBQUkvQixHQUFHLENBQUMrQixnQkFBSixHQUF1QlIsSUFBSSxDQUFDakMsWUFBaEMsRUFBOEM7QUFDMUNpQyxVQUFBQSxJQUFJLENBQUNoQyxnQkFBTCxDQUFzQjJDLE9BQXRCO0FBQ0FYLFVBQUFBLElBQUksQ0FBQ2hDLGdCQUFMLENBQXNCNEMsZ0JBQXRCO0FBQ0FaLFVBQUFBLElBQUksQ0FBQ2hDLGdCQUFMLEdBQXdCLElBQXhCO0FBQ0FnQyxVQUFBQSxJQUFJLENBQUMvQixXQUFMLEdBQW1CLElBQW5CO0FBQ0ErQixVQUFBQSxJQUFJLENBQUNhLHNCQUFMLEdBTDBDLENBTzFDOztBQUNBLGNBQUlDLFlBQVksR0FBR3JELEVBQUUsQ0FBQ3NELFFBQUgsQ0FBWUMsUUFBWixFQUFuQjs7QUFDQSxjQUFJRixZQUFZLENBQUNHLElBQWIsSUFBcUIsWUFBekIsRUFBdUM7QUFDbkMsZ0JBQUlDLEdBQUcsR0FBR0osWUFBWSxDQUFDSyxjQUFiLENBQTRCLFFBQTVCLEVBQXNDQyxZQUF0QyxDQUFtRCxlQUFuRCxDQUFWO0FBQ0FGLFlBQUFBLEdBQUcsQ0FBQ0csZ0JBQUo7QUFDSCxXQUhELE1BSUs7QUFDRDVELFlBQUFBLEVBQUUsQ0FBQzZELE1BQUgsQ0FBVUMsT0FBVixDQUFrQiwwQkFBbEIsRUFBNkMsVUFBU0MsR0FBVCxFQUFhQyxHQUFiLEVBQWlCO0FBQzFELGtCQUFJQyxJQUFJLEdBQUdqRSxFQUFFLENBQUNrRSxXQUFILENBQWVGLEdBQWYsQ0FBWDtBQUNBLGtCQUFJRyxFQUFFLEdBQUdGLElBQUksQ0FBQ1AsY0FBTCxDQUFvQixJQUFwQixDQUFUO0FBQ0FTLGNBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxHQUFXcEUsRUFBRSxDQUFDcUUsT0FBSCxDQUFXRCxLQUF0QjtBQUNBRCxjQUFBQSxFQUFFLENBQUNHLE1BQUgsR0FBWXRFLEVBQUUsQ0FBQ3FFLE9BQUgsQ0FBV0MsTUFBdkI7QUFDQUgsY0FBQUEsRUFBRSxDQUFDSSxFQUFILENBQU0sWUFBTixFQUFtQixZQUFVLENBQUUsQ0FBL0I7QUFFQSxrQkFBSUMsZ0JBQWdCLEdBQUdQLElBQUksQ0FBQ1AsY0FBTCxDQUFvQixRQUFwQixFQUE4QkEsY0FBOUIsQ0FBNkMsY0FBN0MsQ0FBdkI7QUFDQWMsY0FBQUEsZ0JBQWdCLENBQUNELEVBQWpCLENBQW9CLE9BQXBCLEVBQTRCLFlBQVU7QUFDbEN2RSxnQkFBQUEsRUFBRSxDQUFDc0QsUUFBSCxDQUFZbUIsU0FBWixDQUFzQixZQUF0QjtBQUNILGVBRkQ7QUFJQXpFLGNBQUFBLEVBQUUsQ0FBQ3NELFFBQUgsQ0FBWUMsUUFBWixHQUF1QkcsY0FBdkIsQ0FBc0MsUUFBdEMsRUFBZ0RnQixRQUFoRCxDQUF5RFQsSUFBekQ7QUFDSCxhQWJEO0FBY0g7QUFDSixTQTdCRCxNQThCSyxJQUFJakQsR0FBRyxDQUFDK0IsZ0JBQUosSUFBd0IsQ0FBNUIsRUFBK0I7QUFDaEMvQyxVQUFBQSxFQUFFLENBQUNzRCxRQUFILENBQVlDLFFBQVosR0FBdUJHLGNBQXZCLENBQXNDLFFBQXRDLEVBQWdEZ0IsUUFBaEQsQ0FBeURuQyxJQUFJLENBQUNoQyxnQkFBOUQ7QUFDQWdDLFVBQUFBLElBQUksQ0FBQ29DLFFBQUwsQ0FBY3BDLElBQUksQ0FBQy9CLFdBQW5CLEVBQStCK0IsSUFBSSxDQUFDbEMsVUFBcEM7QUFDSDtBQUVKLE9BckNEOztBQXNDQSxVQUFJa0MsSUFBSSxDQUFDaEMsZ0JBQUwsSUFBeUIsSUFBN0IsRUFBbUM7QUFDL0JQLFFBQUFBLEVBQUUsQ0FBQzZELE1BQUgsQ0FBVUMsT0FBVixDQUFrQiwwQkFBbEIsRUFBNkMsVUFBU0MsR0FBVCxFQUFhQyxHQUFiLEVBQWlCO0FBQzFELGNBQUlDLElBQUksR0FBR2pFLEVBQUUsQ0FBQ2tFLFdBQUgsQ0FBZUYsR0FBZixDQUFYO0FBQ0EsY0FBSUcsRUFBRSxHQUFHRixJQUFJLENBQUNQLGNBQUwsQ0FBb0IsSUFBcEIsQ0FBVDtBQUNBUyxVQUFBQSxFQUFFLENBQUNDLEtBQUgsR0FBV3BFLEVBQUUsQ0FBQ3FFLE9BQUgsQ0FBV0QsS0FBdEI7QUFDQUQsVUFBQUEsRUFBRSxDQUFDRyxNQUFILEdBQVl0RSxFQUFFLENBQUNxRSxPQUFILENBQVdDLE1BQXZCO0FBQ0FILFVBQUFBLEVBQUUsQ0FBQ0ksRUFBSCxDQUFNLFlBQU4sRUFBbUIsWUFBVSxDQUFFLENBQS9CO0FBRUFoQyxVQUFBQSxJQUFJLENBQUNoQyxnQkFBTCxHQUF3QjBELElBQXhCO0FBQ0FoQixVQUFBQSxLQUFLLENBQUNqQyxHQUFELENBQUw7QUFDSCxTQVREO0FBVUgsT0FYRCxNQVlLO0FBQ0RpQyxRQUFBQSxLQUFLLENBQUNqQyxHQUFELENBQUw7QUFDSDtBQUVKLEtBbEVEOztBQW1FQUEsSUFBQUEsR0FBRyxDQUFDNEQsU0FBSixHQUFnQixZQUFVO0FBQ3RCNUUsTUFBQUEsRUFBRSxDQUFDOEMsR0FBSCxDQUFPLGFBQVA7QUFDSCxLQUZEOztBQUdBOUIsSUFBQUEsR0FBRyxDQUFDNkQsT0FBSixHQUFjLFlBQVU7QUFDcEI3RSxNQUFBQSxFQUFFLENBQUM4QyxHQUFILENBQU8sT0FBUDtBQUNILEtBRkQ7O0FBR0EsUUFBSTlCLEdBQUcsQ0FBQ0csVUFBSixJQUFrQixDQUF0QixFQUF5QjtBQUNyQkgsTUFBQUEsR0FBRyxDQUFDTyxJQUFKLENBQVMsTUFBVCxFQUFnQkYsR0FBaEI7QUFDSDs7QUFDREwsSUFBQUEsR0FBRyxDQUFDUSxJQUFKLENBQVNrQixVQUFUO0FBQ0gsR0EvS3FCO0FBaUx0QmtCLEVBQUFBLGdCQWpMc0IsOEJBaUxILENBRWxCLENBbkxxQjtBQXFMdEJrQixFQUFBQSxjQXJMc0IsNEJBcUxMO0FBQ2IsUUFBSUMsVUFBVSxHQUFHLEtBQUt0RCxjQUFMLENBQW9CLG1CQUFwQixFQUF3QyxzQkFBeEMsQ0FBakI7QUFDQXNELElBQUFBLFVBQVUsQ0FBQzdDLE9BQVgsQ0FBbUI4QyxRQUFuQixHQUE4Qm5ELE9BQU8sQ0FBQyxTQUFELENBQVAsQ0FBbUJvRCxVQUFuQixDQUE4QkMsRUFBNUQ7O0FBQ0FILElBQUFBLFVBQVUsQ0FBQ2hFLGVBQVgsR0FBNkIsVUFBU0MsR0FBVCxFQUFjO0FBQ3ZDLFVBQUltRSxRQUFRLEdBQUduRSxHQUFHLENBQUNvRSxZQUFuQjtBQUNBRCxNQUFBQSxRQUFRLEdBQUd4QyxJQUFJLENBQUMwQyxLQUFMLENBQVdGLFFBQVgsQ0FBWDs7QUFDQSxVQUFJQSxRQUFRLENBQUNHLElBQVQsSUFBaUIsU0FBckIsRUFBZ0M7QUFDNUIsWUFBSUMsUUFBUSxHQUFHSixRQUFRLENBQUNJLFFBQXhCOztBQUNBLGFBQUssSUFBSUMsS0FBVCxJQUFrQkQsUUFBbEIsRUFBNEI7QUFDeEIsY0FBSUUsVUFBVSxHQUFHRixRQUFRLENBQUNDLEtBQUQsQ0FBekI7O0FBQ0EsY0FBSUMsVUFBVSxDQUFDSCxJQUFYLElBQW1CLGlCQUF2QixFQUEwQztBQUN0QyxnQkFBSUksTUFBTSxHQUFHRCxVQUFVLENBQUNDLE1BQXhCO0FBQ0EsZ0JBQUlDLFNBQVMsR0FBR0YsVUFBVSxDQUFDRSxTQUEzQjtBQUNBLGdCQUFJQyxHQUFHLEdBQUdILFVBQVUsQ0FBQ0csR0FBckI7QUFDQSxnQkFBSUMsSUFBSSxHQUFHO0FBQ1Asd0JBQVUsQ0FESDtBQUVQLHFCQUFPRCxHQUZBO0FBR1AsMkJBQWFELFNBSE47QUFJUCxxQ0FBdUIsQ0FBQztBQUpqQixhQUFYO0FBTUE5RCxZQUFBQSxPQUFPLENBQUMsU0FBRCxDQUFQLENBQW1Cb0QsVUFBbkIsQ0FBOEJhLEtBQTlCLENBQW9DSixNQUFwQyxJQUE4Q0csSUFBOUM7QUFDSDtBQUNKO0FBQ0o7QUFDSixLQXJCRCxDQUhhLENBeUJiOzs7QUFDQSxTQUFLbEIsUUFBTCxDQUFjLFlBQVU7QUFDcEIsV0FBS3RDLG1CQUFMLENBQXlCMEMsVUFBekI7QUFDSCxLQUZELEVBRUcsRUFGSDtBQUdIO0FBbE5xQixDQUFULENBQWpCO0FBc05BLElBQUlnQixTQUFTLEdBQUcsSUFBSWhHLFVBQUosRUFBaEI7QUFDQWlHLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQkYsU0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxudmFyIE5ldHdvcmttZ3IgPSBjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICAgICAgZGVsZWdhdGU6IG51bGwsXG5cbiAgICAgICAgcmV0cnlEZWx0YTogMS41LFxuICAgICAgICBtYXhSZXRyeVRpbWU6IDMsXG5cbiAgICAgICAgcmV0cnlXYWl0aW5nTm9kZTogbnVsbCxcbiAgICAgICAgcmV0cnlBY3Rpb246IG51bGxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG5cbiAgICBzZW5kTWVzc2FnZShtc2cscG9ydCxpcCxzdWZmaXgsc3VjY2Vzc0NhbGxCYWNrKSB7XG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkpIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbEJhY2soeGhyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciB1cmwgPSBcImh0dHA6Ly9cIiArIGlwICsgXCI6XCIgKyBwb3J0LnRvU3RyaW5nKCkgK1wiL1wiICsgc3VmZml4LnRvU3RyaW5nKClcbiAgICAgICAgeGhyLm9wZW4oXCJQT1NUXCIsdXJsKVxuICAgICAgICB4aHIuc2VuZChtc2cpXG4gICAgfSxcblxuICAgIG1ha2VNZXNzYWdlT2JqKG1vZHVsZU5hbWUsIG1lc3NhZ2VUeXBlTmFtZSkge1xuICAgICAgICB2YXIgZ2xvYWJsZUNvbmZpZyA9IHJlcXVpcmUoXCJnbG9hYmxlQ29uZmlnXCIpXG4gICAgICAgIFxuICAgICAgICB2YXIgbmV0V29ya01lc3NhZ2VDb25maWdzID0gZ2xvYWJsZUNvbmZpZy5uZXRXb3JrTWVzc2FnZUNvbmZpZ3NcbiAgICAgICAgdmFyIG1vZHVsZU9iaiA9IG5ldFdvcmtNZXNzYWdlQ29uZmlnc1ttb2R1bGVOYW1lXVxuICAgICAgICBcbiAgICAgICAgaWYgKG1vZHVsZU9iaiAhPSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgaXAgPSBnbG9hYmxlQ29uZmlnLmJhc2ljSXBcbiAgICAgICAgICAgIHZhciBwb3J0ID0gZ2xvYWJsZUNvbmZpZy5iYXNpY1BvcnRcbiAgICAgICAgICAgIGlmIChtb2R1bGVPYmouaXAgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlwID0gbW9kdWxlT2JqLmlwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobW9kdWxlT2JqLnBvcnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHBvcnQgPSBtb2R1bGVPYmoucG9ydFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc3VmZml4ID0gbW9kdWxlT2JqLnN1ZmZpeFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IG1vZHVsZU9ialttZXNzYWdlVHlwZU5hbWVdXG4gICAgICAgICAgICB2YXIgc3VjY2Vzc0NhbGxCYWNrID0gZnVuY3Rpb24oeGhyKXt9XG4gICAgICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgICAgIGlwOiBpcCxcbiAgICAgICAgICAgICAgICBwb3J0OiBwb3J0LFxuICAgICAgICAgICAgICAgIHN1ZmZpeDogc3VmZml4LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgc3VjY2Vzc0NhbGxCYWNrOiBzdWNjZXNzQ2FsbEJhY2tcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvYmpcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNjLmVycm9yKFwibm8gc3VjaCBtb2R1bGUgbmFtZSBvZiBcIiArIG1vZHVsZU5hbWUpXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNlbmRNZXNzYWdlQnlNc2dPYmoobXNnT2JqKSB7XG4gICAgICAgIHZhciB1cmwgPSBcImh0dHBzOi8vXCIgKyBtc2dPYmouaXAgKyBcIjpcIiArIG1zZ09iai5wb3J0LnRvU3RyaW5nKCkgKyBcIi9cIiArIG1zZ09iai5zdWZmaXhcbiAgICAgICAgdmFyIHhociA9IG51bGxcbiAgICAgICAgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0ICYmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgNDAwKSkge1xuICAgICAgICAgICAgICAgIG1zZ09iai5zdWNjZXNzQ2FsbEJhY2soeGhyKVxuICAgICAgICAgICAgICAgIGlmIChzZWxmLnJldHJ5aW5nRmxhZyA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmV0cnlSZXN1bHQgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBtc2dGb3JTZW5kID0gSlNPTi5zdHJpbmdpZnkobXNnT2JqLm1lc3NhZ2UpXG4gICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNjLmxvZyhcImVyclwiKVxuICAgICAgICAgICAgaWYgKHNlbGYucmV0cnlBY3Rpb24gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHNlbGYucmV0cnlBY3Rpb24gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB4aHIuc2VuZChtc2dGb3JTZW5kKVxuICAgICAgICAgICAgICAgICAgICB4aHIuY3VycmVudFJldHJ5VGltZSArPSAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoeGhyLmN1cnJlbnRSZXRyeVRpbWUgPT0gbnVsbCB8fCB4aHIuY3VycmVudFJldHJ5VGltZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB4aHIuY3VycmVudFJldHJ5VGltZSA9IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZXRyeSA9IGZ1bmN0aW9uKHhocil7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwicmV0cnlcIix4aHIuY3VycmVudFJldHJ5VGltZSlcbiAgICAgICAgICAgICAgICBpZiAoeGhyLmN1cnJlbnRSZXRyeVRpbWUgPiBzZWxmLm1heFJldHJ5VGltZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnJldHJ5V2FpdGluZ05vZGUuZGVzdHJveSgpXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmV0cnlXYWl0aW5nTm9kZS5yZW1vdmVGcm9tUGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXRyeVdhaXRpbmdOb2RlID0gbnVsbFxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJldHJ5QWN0aW9uID0gbnVsbFxuICAgICAgICAgICAgICAgICAgICBzZWxmLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKVxuXG4gICAgICAgICAgICAgICAgICAgIC8vZG8gc29tZXRoaW5nIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRTY2VuZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKClcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTY2VuZS5uYW1lID09IFwibG9naW5TY2VuZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWdyID0gY3VycmVudFNjZW5lLmdldENoaWxkQnlOYW1lKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudChcImxvZ2luU2NlbmVNZ3JcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIG1nci5vbkFsbFJldHJ5RmFpbGVkKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFicy9iYWNrVG9Mb2dpblNjZW5lXCIsZnVuY3Rpb24oZXJyLHJlcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZShyZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJnID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcud2lkdGggPSBjYy53aW5TaXplLndpZHRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcuaGVpZ2h0ID0gY2Mud2luU2l6ZS5oZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZy5vbihcInRvdWNoc3RhcnRcIixmdW5jdGlvbigpe30pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW5zdXJlQnV0dG9uTm9kZSA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvdGhlcnNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlbnN1cmVCdXR0b25cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnN1cmVCdXR0b25Ob2RlLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJsb2dpblNjZW5lXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoXCJDYW52YXNcIikuYWRkQ2hpbGQobm9kZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh4aHIuY3VycmVudFJldHJ5VGltZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoXCJDYW52YXNcIikuYWRkQ2hpbGQoc2VsZi5yZXRyeVdhaXRpbmdOb2RlKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNjaGVkdWxlKHNlbGYucmV0cnlBY3Rpb24sc2VsZi5yZXRyeURlbHRhKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGYucmV0cnlXYWl0aW5nTm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJwcmVmYWJzL3JldHJ5V2FpdGluZ05vZGVcIixmdW5jdGlvbihlcnIscmVzKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZShyZXMpXG4gICAgICAgICAgICAgICAgICAgIHZhciBiZyA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKVxuICAgICAgICAgICAgICAgICAgICBiZy53aWR0aCA9IGNjLndpblNpemUud2lkdGhcbiAgICAgICAgICAgICAgICAgICAgYmcuaGVpZ2h0ID0gY2Mud2luU2l6ZS5oZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgYmcub24oXCJ0b3VjaHN0YXJ0XCIsZnVuY3Rpb24oKXt9KVxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmV0cnlXYWl0aW5nTm9kZSA9IG5vZGVcbiAgICAgICAgICAgICAgICAgICAgcmV0cnkoeGhyKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRyeSh4aHIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNjLmxvZyhcInRpbWUgb3V0ISEhXCIpXG4gICAgICAgIH1cbiAgICAgICAgeGhyLm9uYWJvcnQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY2MubG9nKFwiYWJvcmRcIilcbiAgICAgICAgfVxuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gMCkge1xuICAgICAgICAgICAgeGhyLm9wZW4oXCJQT1NUXCIsdXJsKVxuICAgICAgICB9XG4gICAgICAgIHhoci5zZW5kKG1zZ0ZvclNlbmQpXG4gICAgfSxcblxuICAgIG9uQWxsUmV0cnlGYWlsZWQoKSB7XG5cbiAgICB9LFxuXG4gICAgc3RhcnRIZWFydEJlYXQoKSB7XG4gICAgICAgIHZhciBtZXNzYWdlT2JqID0gdGhpcy5tYWtlTWVzc2FnZU9iaihcImxvbmdDb25uZWN0TW9kdWxlXCIsXCJoZWFydEJlYXRNZXNzYWdlVHlwZVwiKVxuICAgICAgICBtZXNzYWdlT2JqLm1lc3NhZ2UucGxheWVySWQgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmlkXG4gICAgICAgIG1lc3NhZ2VPYmouc3VjY2Vzc0NhbGxCYWNrID0gZnVuY3Rpb24oeGhyKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UudHlwZSA9PSBcIm1lc3NhZ2VcIikge1xuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlcyA9IHJlc3BvbnNlLm1lc3NhZ2VzXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gbWVzc2FnZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9uZU1lc3NhZ2UgPSBtZXNzYWdlc1tpbmRleF1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9uZU1lc3NhZ2UudHlwZSA9PSBcIm1haWxTeXNTZW5kTWFpbFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWFpbElkID0gb25lTWVzc2FnZS5tYWlsSWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aW1lU3RhbXAgPSBvbmVNZXNzYWdlLnRpbWVTdGFtcFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhZyA9IG9uZU1lc3NhZ2UudGFnXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWFpbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFnXCI6IHRhZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpbWVTdGFtcFwiOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZE9wdGlvbkluZGV4XCI6IC0xXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLm1haWxzW21haWxJZF0gPSBtYWlsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy90aGlzLnNlbmRNZXNzYWdlQnlNc2dPYmoobWVzc2FnZU9iaix0cnVlKVxuICAgICAgICB0aGlzLnNjaGVkdWxlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlQnlNc2dPYmoobWVzc2FnZU9iailcbiAgICAgICAgfSwgNjApXG4gICAgfVxufSk7XG5cblxudmFyIHNoYXJlZE1nciA9IG5ldyBOZXR3b3JrbWdyKClcbm1vZHVsZS5leHBvcnRzID0gc2hhcmVkTWdyXG4iXX0=