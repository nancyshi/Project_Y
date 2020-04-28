
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/libs/dataMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0cd8087H/9I77MXIhlobXJP', 'dataMgr');
// scripts/libs/dataMgr.js

"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
  "extends": cc.Component,
  properties: {
    playerData: {
      get: function get() {
        return this._playerData;
      },
      set: function set(value) {
        this._playerData = new Proxy(value, this.dataMonitoredProxyHandler);
        this.onPlayerDataUpdated(); //do something else
      }
    },
    dataMonitoredProxyHandler: {
      get: function get() {
        if (this._dataMonitoredProxyHandler == null) {
          var handler = {
            get: function get(target, key) {
              if (_typeof(target[key]) === "object") {
                return new Proxy(target[key], handler);
              }

              return target[key];
            },
            set: function set(target, key, value) {
              target[key] = value;

              var globalRedPointMgr = require("globalRedPointMgr");

              globalRedPointMgr.setupRedPoints();

              var systems = require("systemsMgr").systems;

              require("systemsMgr").systemsGloableDataMonitored(key, value);

              for (var k in systems) {
                var oneSys = systems[k];

                if (oneSys.opendNode != null) {
                  var mgr = oneSys.opendNode.getComponent(oneSys.mgrName);

                  if (mgr != null && typeof mgr.dataMonitored === "function") {
                    mgr.dataMonitored(key, value);
                  }
                }
              }

              var currentScene = cc.director.getScene();
              var mgrName = null;

              switch (currentScene.name) {
                case "mainScene":
                  mgrName = "mainSceneMgr";
                  break;

                case "levelScene":
                  mgrName = "levelMgr";
                  break;
              }

              if (mgrName != null) {
                var mgr = currentScene.getChildByName("Canvas").getComponent(mgrName);

                if (mgr != null && typeof mgr.dataMonitored === "function") {
                  mgr.dataMonitored(key, value);
                }
              }

              return true;
            }
          };
          this._dataMonitoredProxyHandler = handler;
        }

        return this._dataMonitoredProxyHandler;
      }
    },
    delegate: null
  },
  updatePlayerDataFromServer: function updatePlayerDataFromServer(playerId) {
    var networkMgr = require("networkMgr");

    var msgObj = networkMgr.makeMessageObj("dataModule", "queryMessageType");
    msgObj.message.playerId = playerId;
    var self = this;

    msgObj.successCallBack = function (xhr) {
      var response = xhr.responseText;
      response = JSON.parse(response);

      if (response.type == "success") {
        self.playerData = response.playerData;
      } else {//do something for erros
      }
    };

    networkMgr.sendMessageByMsgObj(msgObj);
  },
  onPlayerDataUpdated: function onPlayerDataUpdated() {
    cc.log("now player data is " + JSON.stringify(this.playerData));

    var timerSystemsMgr = require("timerSystemsMgr");

    timerSystemsMgr.initSetup();
    timerSystemsMgr.lunch();

    if (cc.director.getScene().name == "loginScene") {
      var loginSceneMgr = cc.director.getScene().getChildByName("Canvas").getComponent("loginSceneMgr");
      loginSceneMgr.onPlayerDataUpdated();
    }
  },
  commitPlayerDataToServer: function commitPlayerDataToServer(dataForCommit, successCallBack) {
    var networkMgr = require("networkMgr");

    var msgObj = networkMgr.makeMessageObj("dataModule", "commitMessageTyp");
    msgObj.message.playerId = this.playerData.id;

    if (msgObj.message.playerId == null) {
      cc.log("no player data");
      return;
    }

    msgObj.message.commitBody = dataForCommit;

    msgObj.successCallBack = function (xhr) {
      var response = xhr.responseText;
      response = JSON.parse(response);

      if (response.type == "commitSuccess") {
        successCallBack();
      }
    };

    networkMgr.sendMessageByMsgObj(msgObj);
  }
});
var shareDataMgr = new dataMgr();
module.exports = shareDataMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xpYnMvZGF0YU1nci5qcyJdLCJuYW1lcyI6WyJkYXRhTWdyIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJwbGF5ZXJEYXRhIiwiZ2V0IiwiX3BsYXllckRhdGEiLCJzZXQiLCJ2YWx1ZSIsIlByb3h5IiwiZGF0YU1vbml0b3JlZFByb3h5SGFuZGxlciIsIm9uUGxheWVyRGF0YVVwZGF0ZWQiLCJfZGF0YU1vbml0b3JlZFByb3h5SGFuZGxlciIsImhhbmRsZXIiLCJ0YXJnZXQiLCJrZXkiLCJnbG9iYWxSZWRQb2ludE1nciIsInJlcXVpcmUiLCJzZXR1cFJlZFBvaW50cyIsInN5c3RlbXMiLCJzeXN0ZW1zR2xvYWJsZURhdGFNb25pdG9yZWQiLCJrIiwib25lU3lzIiwib3BlbmROb2RlIiwibWdyIiwiZ2V0Q29tcG9uZW50IiwibWdyTmFtZSIsImRhdGFNb25pdG9yZWQiLCJjdXJyZW50U2NlbmUiLCJkaXJlY3RvciIsImdldFNjZW5lIiwibmFtZSIsImdldENoaWxkQnlOYW1lIiwiZGVsZWdhdGUiLCJ1cGRhdGVQbGF5ZXJEYXRhRnJvbVNlcnZlciIsInBsYXllcklkIiwibmV0d29ya01nciIsIm1zZ09iaiIsIm1ha2VNZXNzYWdlT2JqIiwibWVzc2FnZSIsInNlbGYiLCJzdWNjZXNzQ2FsbEJhY2siLCJ4aHIiLCJyZXNwb25zZSIsInJlc3BvbnNlVGV4dCIsIkpTT04iLCJwYXJzZSIsInR5cGUiLCJzZW5kTWVzc2FnZUJ5TXNnT2JqIiwibG9nIiwic3RyaW5naWZ5IiwidGltZXJTeXN0ZW1zTWdyIiwiaW5pdFNldHVwIiwibHVuY2giLCJsb2dpblNjZW5lTWdyIiwiY29tbWl0UGxheWVyRGF0YVRvU2VydmVyIiwiZGF0YUZvckNvbW1pdCIsImlkIiwiY29tbWl0Qm9keSIsInNoYXJlRGF0YU1nciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtB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QUFDbENOLFFBQUFBLGVBQWU7QUFDbEI7QUFDSixLQU5EOztBQU9BTCxJQUFBQSxVQUFVLENBQUNZLG1CQUFYLENBQStCWCxNQUEvQjtBQUNIO0FBeEhrQixDQUFULENBQWQ7QUEySEEsSUFBSXNCLFlBQVksR0FBRyxJQUFJNUQsT0FBSixFQUFuQjtBQUNBNkQsTUFBTSxDQUFDQyxPQUFQLEdBQWlCRixZQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHBzOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG52YXIgZGF0YU1nciA9IGNjLkNsYXNzKHtcbiAgICBcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG4gICAgcHJvcGVydGllczoge1xuXG4gICAgICAgIHBsYXllckRhdGE6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcGxheWVyRGF0YVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllckRhdGEgPSBuZXcgUHJveHkodmFsdWUsdGhpcy5kYXRhTW9uaXRvcmVkUHJveHlIYW5kbGVyKVxuICAgICAgICAgICAgICAgIHRoaXMub25QbGF5ZXJEYXRhVXBkYXRlZCgpXG4gICAgICAgICAgICAgICAgLy9kbyBzb21ldGhpbmcgZWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGRhdGFNb25pdG9yZWRQcm94eUhhbmRsZXI6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YU1vbml0b3JlZFByb3h5SGFuZGxlciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBoYW5kbGVyID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0KHRhcmdldCwga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRba2V5XSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb3h5KHRhcmdldFtrZXldLGhhbmRsZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRba2V5XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCh0YXJnZXQsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdsb2JhbFJlZFBvaW50TWdyID0gcmVxdWlyZShcImdsb2JhbFJlZFBvaW50TWdyXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsUmVkUG9pbnRNZ3Iuc2V0dXBSZWRQb2ludHMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzeXN0ZW1zID0gcmVxdWlyZShcInN5c3RlbXNNZ3JcIikuc3lzdGVtc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoXCJzeXN0ZW1zTWdyXCIpLnN5c3RlbXNHbG9hYmxlRGF0YU1vbml0b3JlZChrZXksdmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayBpbiBzeXN0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvbmVTeXMgPSBzeXN0ZW1zW2tdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbmVTeXMub3BlbmROb2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZ3IgPSBvbmVTeXMub3BlbmROb2RlLmdldENvbXBvbmVudChvbmVTeXMubWdyTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZ3IgIT0gbnVsbCAmJiB0eXBlb2YgbWdyLmRhdGFNb25pdG9yZWQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1nci5kYXRhTW9uaXRvcmVkKGtleSx2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50U2NlbmUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1nck5hbWUgPSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoKGN1cnJlbnRTY2VuZS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJtYWluU2NlbmVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1nck5hbWUgPSBcIm1haW5TY2VuZU1nclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibGV2ZWxTY2VuZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWdyTmFtZSA9IFwibGV2ZWxNZ3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1nck5hbWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWdyID0gY3VycmVudFNjZW5lLmdldENoaWxkQnlOYW1lKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudChtZ3JOYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWdyICE9IG51bGwgJiYgdHlwZW9mIG1nci5kYXRhTW9uaXRvcmVkID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1nci5kYXRhTW9uaXRvcmVkKGtleSx2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFNb25pdG9yZWRQcm94eUhhbmRsZXIgPSBoYW5kbGVyXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFNb25pdG9yZWRQcm94eUhhbmRsZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIGRlbGVnYXRlOiBudWxsXG4gICAgICAgIFxuICAgIH0sXG5cbiAgICB1cGRhdGVQbGF5ZXJEYXRhRnJvbVNlcnZlcihwbGF5ZXJJZCkge1xuXG4gICAgICAgIHZhciBuZXR3b3JrTWdyID0gcmVxdWlyZShcIm5ldHdvcmtNZ3JcIilcbiAgICAgICAgdmFyIG1zZ09iaiA9IG5ldHdvcmtNZ3IubWFrZU1lc3NhZ2VPYmooXCJkYXRhTW9kdWxlXCIsXCJxdWVyeU1lc3NhZ2VUeXBlXCIpXG4gICAgICAgIG1zZ09iai5tZXNzYWdlLnBsYXllcklkID0gcGxheWVySWRcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgIG1zZ09iai5zdWNjZXNzQ2FsbEJhY2sgPSBmdW5jdGlvbih4aHIpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZSA9IHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSkgIFxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnR5cGUgPT0gXCJzdWNjZXNzXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnBsYXllckRhdGEgPSByZXNwb25zZS5wbGF5ZXJEYXRhXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2RvIHNvbWV0aGluZyBmb3IgZXJyb3NcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBuZXR3b3JrTWdyLnNlbmRNZXNzYWdlQnlNc2dPYmoobXNnT2JqKVxuICAgIH0sXG4gICAgb25QbGF5ZXJEYXRhVXBkYXRlZCAoKSB7XG4gICAgICAgIGNjLmxvZyhcIm5vdyBwbGF5ZXIgZGF0YSBpcyBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMucGxheWVyRGF0YSkpXG4gICAgICAgIHZhciB0aW1lclN5c3RlbXNNZ3IgPSByZXF1aXJlKFwidGltZXJTeXN0ZW1zTWdyXCIpXG4gICAgICAgIHRpbWVyU3lzdGVtc01nci5pbml0U2V0dXAoKVxuICAgICAgICB0aW1lclN5c3RlbXNNZ3IubHVuY2goKVxuICAgICAgICBpZiAoY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5uYW1lID09IFwibG9naW5TY2VuZVwiKSB7XG4gICAgICAgICAgICB2YXIgbG9naW5TY2VuZU1nciA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoXCJDYW52YXNcIikuZ2V0Q29tcG9uZW50KFwibG9naW5TY2VuZU1nclwiKVxuICAgICAgICAgICAgbG9naW5TY2VuZU1nci5vblBsYXllckRhdGFVcGRhdGVkKClcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjb21taXRQbGF5ZXJEYXRhVG9TZXJ2ZXIoZGF0YUZvckNvbW1pdCwgc3VjY2Vzc0NhbGxCYWNrKSB7XG4gICAgICAgIHZhciBuZXR3b3JrTWdyID0gcmVxdWlyZShcIm5ldHdvcmtNZ3JcIilcbiAgICAgICAgdmFyIG1zZ09iaiA9IG5ldHdvcmtNZ3IubWFrZU1lc3NhZ2VPYmooXCJkYXRhTW9kdWxlXCIsXCJjb21taXRNZXNzYWdlVHlwXCIpXG4gICAgICAgIG1zZ09iai5tZXNzYWdlLnBsYXllcklkID0gdGhpcy5wbGF5ZXJEYXRhLmlkXG4gICAgICAgIGlmIChtc2dPYmoubWVzc2FnZS5wbGF5ZXJJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICBjYy5sb2coXCJubyBwbGF5ZXIgZGF0YVwiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICAgICAgbXNnT2JqLm1lc3NhZ2UuY29tbWl0Qm9keSA9IGRhdGFGb3JDb21taXRcbiAgICAgICAgbXNnT2JqLnN1Y2Nlc3NDYWxsQmFjayA9IGZ1bmN0aW9uKHhocikge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlc3BvbnNlKVxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnR5cGUgPT0gXCJjb21taXRTdWNjZXNzXCIpIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbEJhY2soKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG5ldHdvcmtNZ3Iuc2VuZE1lc3NhZ2VCeU1zZ09iaihtc2dPYmopXG4gICAgfVxufSk7XG5cbnZhciBzaGFyZURhdGFNZ3IgPSBuZXcgZGF0YU1ncigpXG5tb2R1bGUuZXhwb3J0cyA9IHNoYXJlRGF0YU1nclxuIl19