
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/libs/gloableConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '30519IO6mJCyIUJ9xGqrBAW', 'gloableConfig');
// scripts/libs/gloableConfig.js

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
var GloableConfig = cc.Class({
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
    basicIp: "diamonds.tdreamstudio.com",
    //basicIp: "192.168.0.150",
    basicPort: 8888,
    netWorkMessageConfigs: {
      get: function get() {
        return {
          loginModule: {
            suffix: "login",
            loginMessageType: {
              code: "asfdsfds",
              codeType: 3
            }
          },
          dataModule: {
            suffix: "data",
            queryMessageType: {
              playerId: 100000001,
              requestType: "query"
            },
            commitMessageTyp: {
              playerId: 100000001,
              requestType: "commit",
              commitBody: {}
            }
          },
          signInModule: {
            suffix: "signIn",
            signInMessageType: {
              playerId: 100000001,
              signType: 1
            },
            refreshMessageType: {
              playerId: 100000001
            }
          },
          mailModule: {
            suffix: "mail",
            readMailMessageType: {
              playerId: 100000001,
              mailId: 1001,
              requestType: "readMail"
            },
            sendMailMessageType: {
              playerId: 100000001,
              mailId: 1001,
              tag: "mainLine",
              requestType: "sendMail",
              delay: 0
            },
            reachConditionMessageType: {
              playerId: 1001,
              mailId: 1001,
              tag: "mainLine",
              selectedOptionIndex: 0,
              requestType: "reachCondition"
            }
          },
          helperModule: {
            suffix: "helper",
            generateLevelConfigFileMessageType: {
              data: ""
            }
          },
          longConnectModule: {
            suffix: "longConnect",
            heartBeatMessageType: {
              playerId: 10001,
              requestType: "heartBeat"
            }
          },
          storyModule: {
            suffix: "story",
            completeCurrentMessageType: {
              playerId: 10001,
              requestType: "completeCurrent"
            }
          }
        };
      }
    }
  }
});
var gloableConfig = new GloableConfig();
module.exports = gloableConfig;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xpYnMvZ2xvYWJsZUNvbmZpZy5qcyJdLCJuYW1lcyI6WyJHbG9hYmxlQ29uZmlnIiwiY2MiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJiYXNpY0lwIiwiYmFzaWNQb3J0IiwibmV0V29ya01lc3NhZ2VDb25maWdzIiwiZ2V0IiwibG9naW5Nb2R1bGUiLCJzdWZmaXgiLCJsb2dpbk1lc3NhZ2VUeXBlIiwiY29kZSIsImNvZGVUeXBlIiwiZGF0YU1vZHVsZSIsInF1ZXJ5TWVzc2FnZVR5cGUiLCJwbGF5ZXJJZCIsInJlcXVlc3RUeXBlIiwiY29tbWl0TWVzc2FnZVR5cCIsImNvbW1pdEJvZHkiLCJzaWduSW5Nb2R1bGUiLCJzaWduSW5NZXNzYWdlVHlwZSIsInNpZ25UeXBlIiwicmVmcmVzaE1lc3NhZ2VUeXBlIiwibWFpbE1vZHVsZSIsInJlYWRNYWlsTWVzc2FnZVR5cGUiLCJtYWlsSWQiLCJzZW5kTWFpbE1lc3NhZ2VUeXBlIiwidGFnIiwiZGVsYXkiLCJyZWFjaENvbmRpdGlvbk1lc3NhZ2VUeXBlIiwic2VsZWN0ZWRPcHRpb25JbmRleCIsImhlbHBlck1vZHVsZSIsImdlbmVyYXRlTGV2ZWxDb25maWdGaWxlTWVzc2FnZVR5cGUiLCJkYXRhIiwibG9uZ0Nvbm5lY3RNb2R1bGUiLCJoZWFydEJlYXRNZXNzYWdlVHlwZSIsInN0b3J5TW9kdWxlIiwiY29tcGxldGVDdXJyZW50TWVzc2FnZVR5cGUiLCJnbG9hYmxlQ29uZmlnIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQSxJQUFJQSxhQUFhLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBRXpCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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bGFzczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cHM6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cblxudmFyIEdsb2FibGVDb25maWcgPSBjYy5DbGFzcyh7XG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgICAgIGJhc2ljSXA6IFwiZGlhbW9uZHMudGRyZWFtc3R1ZGlvLmNvbVwiLFxuICAgICAgICAvL2Jhc2ljSXA6IFwiMTkyLjE2OC4wLjE1MFwiLFxuICAgICAgICBiYXNpY1BvcnQ6IDg4ODgsXG4gICAgICAgIG5ldFdvcmtNZXNzYWdlQ29uZmlnczoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2luTW9kdWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWZmaXg6IFwibG9naW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2luTWVzc2FnZVR5cGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBcImFzZmRzZmRzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZVR5cGU6IDNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcblxuXG4gICAgICAgICAgICAgICAgICAgIGRhdGFNb2R1bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1ZmZpeDogXCJkYXRhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU1lc3NhZ2VUeXBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVySWQ6IDEwMDAwMDAwMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0VHlwZTogXCJxdWVyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0TWVzc2FnZVR5cDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcklkOiAxMDAwMDAwMDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFR5cGU6IFwiY29tbWl0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0Qm9keToge31cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcblxuXG4gICAgICAgICAgICAgICAgICAgIHNpZ25Jbk1vZHVsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VmZml4OiBcInNpZ25JblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbkluTWVzc2FnZVR5cGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJJZDogMTAwMDAwMDAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25UeXBlOiAxXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaE1lc3NhZ2VUeXBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVySWQ6IDEwMDAwMDAwMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBtYWlsTW9kdWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWZmaXg6IFwibWFpbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE1haWxNZXNzYWdlVHlwZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcklkOiAxMDAwMDAwMDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbElkOiAxMDAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RUeXBlOiBcInJlYWRNYWlsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzZW5kTWFpbE1lc3NhZ2VUeXBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVySWQ6IDEwMDAwMDAwMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWlsSWQ6IDEwMDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiBcIm1haW5MaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFR5cGU6IFwic2VuZE1haWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxheTogMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWNoQ29uZGl0aW9uTWVzc2FnZVR5cGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJJZDogMTAwMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWlsSWQ6IDEwMDEsICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiBcIm1haW5MaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRPcHRpb25JbmRleDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0VHlwZTogXCJyZWFjaENvbmRpdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgaGVscGVyTW9kdWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWZmaXg6IFwiaGVscGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUxldmVsQ29uZmlnRmlsZU1lc3NhZ2VUeXBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIGxvbmdDb25uZWN0TW9kdWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWZmaXg6IFwibG9uZ0Nvbm5lY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYXJ0QmVhdE1lc3NhZ2VUeXBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVySWQ6IDEwMDAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RUeXBlOiBcImhlYXJ0QmVhdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgc3RvcnlNb2R1bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1ZmZpeDogXCJzdG9yeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVDdXJyZW50TWVzc2FnZVR5cGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJJZDogMTAwMDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFR5cGU6IFwiY29tcGxldGVDdXJyZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cblxufSk7XG5cbnZhciBnbG9hYmxlQ29uZmlnID0gbmV3IEdsb2FibGVDb25maWcoKVxubW9kdWxlLmV4cG9ydHMgPSBnbG9hYmxlQ29uZmlnIl19