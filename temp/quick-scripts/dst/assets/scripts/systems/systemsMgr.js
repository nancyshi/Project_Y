
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/systems/systemsMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '90768z3BYZIyKcDPXY67Q3P', 'systemsMgr');
// scripts/systems/systemsMgr.js

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
//a typical system will have an ui , which will be created by a prefab
//other system will not be contained by here, such as notificaition system
var SystemsMgr = cc.Class({
  "extends": cc.Component,
  properties: {
    welfarySys: {
      get: function get() {
        if (this._welfarySys == null) {
          this._welfarySys = this.setupSysProperty("welfarySysPrefab", "welfarySys", "welfarySysMgr");
          this.systems["welfarySys"] = this._welfarySys;
        }

        return this._welfarySys;
      }
    },
    signInSys: {
      get: function get() {
        if (this._signInSys == null) {
          this._signInSys = this.setupSysProperty("signInSysPrefab", "signInSys", "signInSysMgr");
          this.systems["signInSys"] = this._signInSys;
        }

        return this._signInSys;
      }
    },
    addPropertyNumSys: {
      get: function get() {
        if (this._addPropertyNumSys == null) {
          this._addPropertyNumSys = this.setupSysProperty("addPropertyNumSysPrefab", "addPropertyNumSys", "addPropertyNumSysMgr");
          this.systems["addPropertyNumSys"] = this._addPropertyNumSys;
        }

        return this._addPropertyNumSys;
      }
    },
    mailSys: {
      get: function get() {
        if (this._mailSys == null) {
          this._mailSys = this.setupSysProperty("mailSysPrefab", "mailSys", "mailSysMgr");
          this.systems["mailSys"] = this._mailSys;
        }

        return this._mailSys;
      }
    },
    selectSectionSys: {
      get: function get() {
        if (this._selectSectionSys == null) {
          this._selectSectionSys = this.setupSysProperty("selectSectionSysPrefab", "selectSectionSys", "selectSectionUIMgr");
          this.systems["selectSectionSys"] = this._selectSectionSys;
        }

        return this._selectSectionSys;
      }
    },
    storySys: {
      get: function get() {
        if (this._storySys == null) {
          this._storySys = this.setupSysProperty("storySysPrefab", "storySys", "storySysMgr");
          this.systems["storySys"] = this._storySys;
        }

        return this._storySys;
      }
    },
    systems: {
      get: function get() {
        if (this._systems == null) {
          this._systems = {};
        }

        return this._systems;
      }
    }
  },
  setupSysProperty: function setupSysProperty(givenPrefabName, givenName, givenMgrName) {
    var givenSysProperty = {};
    givenSysProperty.uiPrefab = require("resMgr").reses[givenPrefabName];
    givenSysProperty.opendNode = null;
    givenSysProperty.name = givenName;
    givenSysProperty.mgrName = givenMgrName;
    return givenSysProperty;
  },
  showSystem: function showSystem(givenSysName) {
    var para = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var bgType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    //type 1 = animated open , 2 = direct open
    //bgType 1 = prevent 2 = close
    var givenSys = this.getSysBySysName(givenSysName);

    if (givenSys.opendNode != null) {
      cc.log("this sys has been opend , can't reopen: " + givenSys.name);
      return;
    }

    var ui = cc.instantiate(givenSys.uiPrefab);
    var mgrName = this.systems[givenSys.name].mgrName;
    var mgr = ui.getComponent(mgrName);

    if (mgr != null && typeof mgr.onWillOpend === "function") {
      mgr.onWillOpend(para);
    }

    var others = ui.getChildByName("others");
    var bg = ui.getChildByName("bg");

    if (bg != null) {
      bg.width = cc.winSize.width;
      bg.height = cc.winSize.height;

      if (bgType == 1) {
        bg.on("touchstart", function () {});
      } else if (bgType == 2) {
        var self = this;
        bg.on("touchstart", function () {
          self.closeSystem(givenSysName);
        });
      }
    }

    if (type == 2) {
      cc.director.getScene().getChildByName("Canvas").addChild(ui);
      givenSys.opendNode = ui;
      return;
    }

    cc.director.getScene().getChildByName("Canvas").addChild(ui);
    givenSys.opendNode = ui;

    if (others != null) {
      others.scale = 0;
      cc.tween(others).to(0.3, {
        scale: 1
      }).start();
    } else {
      ui.scale = 0;
      cc.tween(ui).to(0.3, {
        scale: 1
      }).start();
    }
  },
  closeSystem: function closeSystem(givenSysName) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    //1 = animated close , 2 = direct close, 3 = fade out
    var givenSys = this.getSysBySysName(givenSysName);
    var opendNode = givenSys.opendNode;

    if (opendNode == null) {
      cc.log(givenSys.name + "has not been opend, no need to colse");
      return;
    }

    if (type == 1) {
      var others = opendNode.getChildByName("others");

      if (others != null) {
        cc.tween(others).to(0.3, {
          scale: 0
        }).call(function () {
          opendNode.destroy();
          givenSys.opendNode = null;
        }).start();
      } else {
        cc.tween(opendNode).to(0.3, {
          scale: 0
        }).call(function () {
          opendNode.destroy();
          givenSys.opendNode = null;
        });
      }
    } else if (type == 2) {
      opendNode.destroy();
      givenSys.opendNode = null;
    } else if (type == 3) {
      var coverNode = require("resMgr").reses["coverNodePrefab"];

      coverNode = cc.instantiate(coverNode);
      coverNode.width = opendNode.width;
      coverNode.height = opendNode.height;
      coverNode.opacity = 0;
      coverNode.on("touchstart", function () {});
      opendNode.addChild(coverNode);
      cc.tween(coverNode).to(0.5, {
        opacity: 255
      }).delay(0.5).call(function () {
        opendNode.destroy();
        givenSys.opendNode = null;
      }).start();
    }
  },
  getSysBySysName: function getSysBySysName(givenSysName) {
    switch (givenSysName) {
      case "welfarySys":
        return this.welfarySys;

      case "signInSys":
        return this.signInSys;

      case "addPropertyNumSys":
        return this.addPropertyNumSys;

      case "mailSys":
        return this.mailSys;

      case "selectSectionSys":
        return this.selectSectionSys;

      case "storySys":
        return this.storySys;

      default:
        cc.log("no such sys");
        return false;
    }
  },
  systemsGloableDataMonitored: function systemsGloableDataMonitored(key, value) {//mailSys
    //monitored whether reach mail condition
    //this.mailSysGloableMonitored(key,value)
  },
  mailSysGloableMonitored: function mailSysGloableMonitored(key, value) {
    var textConfig = require("textConfig");

    var onReachCondition = function onReachCondition(givenTag, givenMailId) {
      var networkMgr = require("networkMgr");

      var messageObj = networkMgr.makeMessageObj("mailModule", "reachConditionMessageType");
      messageObj.message.playerId = require("dataMgr").playerData.id;
      messageObj.message.tag = givenTag;
      messageObj.message.mailId = givenMailId;

      messageObj.successCallBack = function (xhr) {
        var response = xhr.responseText;
        response = JSON.parse(response);

        if (response.type == "success") {
          var isEnd = response.isEnd;

          if (isEnd == 0) {
            require("dataMgr").playerData.mailConditionIndex[givenTag] += 1;
          } else {
            require("dataMgr").playerData.mailConditionIndex[givenTag] = -1;
          }

          var newMail = response.mail;
          require("dataMgr").playerData.mails[givenMailId] = newMail;

          var notificaitionMgr = require("notificationMgr");

          var notiStr = textConfig.getTextByIdAndLanguageType(148);
          notificaitionMgr.pushNoti(notiStr);
        }
      };

      networkMgr.sendMessageByMsgObj(messageObj);
    };

    var mailSysConfig = require("mailSysConfig");

    var tags = Object.keys(mailSysConfig);

    for (var index in tags) {
      var oneTag = tags[index];

      var conditionIndex = require("dataMgr").playerData.mailConditionIndex[oneTag];

      if (conditionIndex == -1) {
        continue;
      }

      var element = mailSysConfig[oneTag].conditions[conditionIndex];
      var conditionType = element.conditionType;
      var conditionPara = element.conditionPara;

      if (conditionType == 1) {
        //reach given level id
        if (key != "preLevel") {
          continue;
        }

        if (value == conditionPara) {
          var mailId = element.mailId;
          onReachCondition(oneTag, mailId);
        }
      } else if (conditionType == 2) {
        //min step num of given level less than a value
        if (key.indexOf("minStep_level_") == -1) {
          continue;
        }

        var levelId = key.slice(14);

        if (parseInt(levelId) == conditionPara.levelId) {
          if (value <= conditionPara.minStepNum) {
            var mailId = element.mailId;
            onReachCondition(oneTag, mailId);
          }
        }
      }
    }
  },
  mailSysGloableSendOneMail: function mailSysGloableSendOneMail(givenMailId, givenTag) {
    var complete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    var networkMgr = require("networkMgr");

    var messageObj = networkMgr.makeMessageObj("mailModule", "sendMailMessageType");
    messageObj.message.playerId = require("dataMgr").playerData.id;
    messageObj.message.mailId = givenMailId;
    messageObj.message.tag = givenTag;
    messageObj.message.delay = delay;

    messageObj.successCallBack = function (xhr) {
      var response = xhr.responseText;
      response = JSON.parse(response);

      if (response.type == "success") {
        complete();
      }
    };

    networkMgr.sendMessageByMsgObj(messageObj);
  } // getSectionLevelInfoByLevelId(givenLevelId) {
  //     var result = null
  //     var sectionConfig = require("sectionConfig")
  //     for (var key in sectionConfig) {
  //         var oneConfig = sectionConfig[key]
  //         var levels = oneConfig.levels
  //         for (var index in levels) {
  //             if (givenLevelId == levels[index]) {
  //                 var currentLevel = givenLevelId
  //             }
  //         }
  //     }
  //     return result
  // }
  // update (dt) {},

});
var systemsMgr = new SystemsMgr();
module.exports = systemsMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3N5c3RlbXMvc3lzdGVtc01nci5qcyJdLCJuYW1lcyI6WyJTeXN0ZW1zTWdyIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ3ZWxmYXJ5U3lzIiwiZ2V0IiwiX3dlbGZhcnlTeXMiLCJzZXR1cFN5c1Byb3BlcnR5Iiwic3lzdGVtcyIsInNpZ25JblN5cyIsIl9zaWduSW5TeXMiLCJhZGRQcm9wZXJ0eU51bVN5cyIsIl9hZGRQcm9wZXJ0eU51bVN5cyIsIm1haWxTeXMiLCJfbWFpbFN5cyIsInNlbGVjdFNlY3Rpb25TeXMiLCJfc2VsZWN0U2VjdGlvblN5cyIsInN0b3J5U3lzIiwiX3N0b3J5U3lzIiwiX3N5c3RlbXMiLCJnaXZlblByZWZhYk5hbWUiLCJnaXZlbk5hbWUiLCJnaXZlbk1nck5hbWUiLCJnaXZlblN5c1Byb3BlcnR5IiwidWlQcmVmYWIiLCJyZXF1aXJlIiwicmVzZXMiLCJvcGVuZE5vZGUiLCJuYW1lIiwibWdyTmFtZSIsInNob3dTeXN0ZW0iLCJnaXZlblN5c05hbWUiLCJwYXJhIiwidHlwZSIsImJnVHlwZSIsImdpdmVuU3lzIiwiZ2V0U3lzQnlTeXNOYW1lIiwibG9nIiwidWkiLCJpbnN0YW50aWF0ZSIsIm1nciIsImdldENvbXBvbmVudCIsIm9uV2lsbE9wZW5kIiwib3RoZXJzIiwiZ2V0Q2hpbGRCeU5hbWUiLCJiZyIsIndpZHRoIiwid2luU2l6ZSIsImhlaWdodCIsIm9uIiwic2VsZiIsImNsb3NlU3lzdGVtIiwiZGlyZWN0b3IiLCJnZXRTY2VuZSIsImFkZENoaWxkIiwic2NhbGUiLCJ0d2VlbiIsInRvIiwic3RhcnQiLCJjYWxsIiwiZGVzdHJveSIsImNvdmVyTm9kZSIsIm9wYWNpdHkiLCJkZWxheSIsInN5c3RlbXNHbG9hYmxlRGF0YU1vbml0b3JlZCIsImtleSIsInZhbHVlIiwibWFpbFN5c0dsb2FibGVNb25pdG9yZWQiLCJ0ZXh0Q29uZmlnIiwib25SZWFjaENvbmRpdGlvbiIsImdpdmVuVGFnIiwiZ2l2ZW5NYWlsSWQiLCJuZXR3b3JrTWdyIiwibWVzc2FnZU9iaiIsIm1ha2VNZXNzYWdlT2JqIiwibWVzc2FnZSIsInBsYXllcklkIiwicGxheWVyRGF0YSIsImlkIiwidGFnIiwibWFpbElkIiwic3VjY2Vzc0NhbGxCYWNrIiwieGhyIiwicmVzcG9uc2UiLCJyZXNwb25zZVRleHQiLCJKU09OIiwicGFyc2UiLCJpc0VuZCIsIm1haWxDb25kaXRpb25JbmRleCIsIm5ld01haWwiLCJtYWlsIiwibWFpbHMiLCJub3RpZmljYWl0aW9uTWdyIiwibm90aVN0ciIsImdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlIiwicHVzaE5vdGkiLCJzZW5kTWVzc2FnZUJ5TXNnT2JqIiwibWFpbFN5c0NvbmZpZyIsInRhZ3MiLCJPYmplY3QiLCJrZXlzIiwiaW5kZXgiLCJvbmVUYWciLCJjb25kaXRpb25JbmRleCIsImVsZW1lbnQiLCJjb25kaXRpb25zIiwiY29uZGl0aW9uVHlwZSIsImNvbmRpdGlvblBhcmEiLCJpbmRleE9mIiwibGV2ZWxJZCIsInNsaWNlIiwicGFyc2VJbnQiLCJtaW5TdGVwTnVtIiwibWFpbFN5c0dsb2FibGVTZW5kT25lTWFpbCIsImNvbXBsZXRlIiwic3lzdGVtc01nciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBLElBQUlBLFVBQVUsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdEIsYUFBU0QsRUFBRSxDQUFDRSxTQURVO0FBR3RCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1JDLE1BQUFBLEdBRFEsaUJBQ0Y7QUFDRixZQUFJLEtBQUtDLFdBQUwsSUFBb0IsSUFBeEIsRUFBOEI7QUFDMUIsZUFBS0EsV0FBTCxHQUFtQixLQUFLQyxnQkFBTCxDQUFzQixrQkFBdEIsRUFB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Q0FBK0J2QixVQUEvQjtBQUNILEdBMVNxQixDQTRTdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQTNUc0IsQ0FBVCxDQUFqQjtBQThUQSxJQUFJMEMsVUFBVSxHQUFHLElBQUlwSCxVQUFKLEVBQWpCO0FBQ0FxSCxNQUFNLENBQUNDLE9BQVAsR0FBaUJGLFVBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cHM6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cblxuLy9hIHR5cGljYWwgc3lzdGVtIHdpbGwgaGF2ZSBhbiB1aSAsIHdoaWNoIHdpbGwgYmUgY3JlYXRlZCBieSBhIHByZWZhYlxuLy9vdGhlciBzeXN0ZW0gd2lsbCBub3QgYmUgY29udGFpbmVkIGJ5IGhlcmUsIHN1Y2ggYXMgbm90aWZpY2FpdGlvbiBzeXN0ZW1cbnZhciBTeXN0ZW1zTWdyID0gY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgd2VsZmFyeVN5czoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl93ZWxmYXJ5U3lzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2VsZmFyeVN5cyA9IHRoaXMuc2V0dXBTeXNQcm9wZXJ0eShcIndlbGZhcnlTeXNQcmVmYWJcIixcIndlbGZhcnlTeXNcIixcIndlbGZhcnlTeXNNZ3JcIilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeXN0ZW1zW1wid2VsZmFyeVN5c1wiXSA9IHRoaXMuX3dlbGZhcnlTeXNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlbGZhcnlTeXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2lnbkluU3lzOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NpZ25JblN5cyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NpZ25JblN5cyA9IHRoaXMuc2V0dXBTeXNQcm9wZXJ0eShcInNpZ25JblN5c1ByZWZhYlwiLCBcInNpZ25JblN5c1wiLFwic2lnbkluU3lzTWdyXCIpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3lzdGVtc1tcInNpZ25JblN5c1wiXSA9IHRoaXMuX3NpZ25JblN5c1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2lnbkluU3lzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRkUHJvcGVydHlOdW1TeXM6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWRkUHJvcGVydHlOdW1TeXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRQcm9wZXJ0eU51bVN5cyA9IHRoaXMuc2V0dXBTeXNQcm9wZXJ0eShcImFkZFByb3BlcnR5TnVtU3lzUHJlZmFiXCIsXCJhZGRQcm9wZXJ0eU51bVN5c1wiLFwiYWRkUHJvcGVydHlOdW1TeXNNZ3JcIilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeXN0ZW1zW1wiYWRkUHJvcGVydHlOdW1TeXNcIl0gPSB0aGlzLl9hZGRQcm9wZXJ0eU51bVN5c1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYWRkUHJvcGVydHlOdW1TeXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBtYWlsU3lzOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21haWxTeXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYWlsU3lzID0gdGhpcy5zZXR1cFN5c1Byb3BlcnR5KFwibWFpbFN5c1ByZWZhYlwiLFwibWFpbFN5c1wiLFwibWFpbFN5c01nclwiKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5c3RlbXNbXCJtYWlsU3lzXCJdID0gdGhpcy5fbWFpbFN5c1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFpbFN5c1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgc2VsZWN0U2VjdGlvblN5czoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZWxlY3RTZWN0aW9uU3lzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0U2VjdGlvblN5cyA9IHRoaXMuc2V0dXBTeXNQcm9wZXJ0eShcInNlbGVjdFNlY3Rpb25TeXNQcmVmYWJcIixcInNlbGVjdFNlY3Rpb25TeXNcIixcInNlbGVjdFNlY3Rpb25VSU1nclwiKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5c3RlbXNbXCJzZWxlY3RTZWN0aW9uU3lzXCJdID0gdGhpcy5fc2VsZWN0U2VjdGlvblN5c1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0U2VjdGlvblN5c1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzdG9yeVN5czoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdG9yeVN5cyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0b3J5U3lzID0gdGhpcy5zZXR1cFN5c1Byb3BlcnR5KFwic3RvcnlTeXNQcmVmYWJcIixcInN0b3J5U3lzXCIsXCJzdG9yeVN5c01nclwiKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5c3RlbXNbXCJzdG9yeVN5c1wiXSA9IHRoaXMuX3N0b3J5U3lzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdG9yeVN5c1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHN5c3RlbXM6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3lzdGVtcyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N5c3RlbXMgPSB7fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3lzdGVtc1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldHVwU3lzUHJvcGVydHkoZ2l2ZW5QcmVmYWJOYW1lLCBnaXZlbk5hbWUsIGdpdmVuTWdyTmFtZSkge1xuICAgICAgICB2YXIgZ2l2ZW5TeXNQcm9wZXJ0eSA9IHt9XG4gICAgICAgIGdpdmVuU3lzUHJvcGVydHkudWlQcmVmYWIgPSByZXF1aXJlKFwicmVzTWdyXCIpLnJlc2VzW2dpdmVuUHJlZmFiTmFtZV1cbiAgICAgICAgZ2l2ZW5TeXNQcm9wZXJ0eS5vcGVuZE5vZGUgPSBudWxsXG4gICAgICAgIGdpdmVuU3lzUHJvcGVydHkubmFtZSA9IGdpdmVuTmFtZVxuICAgICAgICBnaXZlblN5c1Byb3BlcnR5Lm1nck5hbWUgPSBnaXZlbk1nck5hbWVcbiAgICAgICAgcmV0dXJuIGdpdmVuU3lzUHJvcGVydHlcbiAgICB9LFxuXG4gICAgc2hvd1N5c3RlbShnaXZlblN5c05hbWUsIHBhcmEgPSBudWxsLCB0eXBlID0gMSwgYmdUeXBlID0gMSkge1xuICAgICAgICAvL3R5cGUgMSA9IGFuaW1hdGVkIG9wZW4gLCAyID0gZGlyZWN0IG9wZW5cbiAgICAgICAgLy9iZ1R5cGUgMSA9IHByZXZlbnQgMiA9IGNsb3NlXG4gICAgICAgIHZhciBnaXZlblN5cyA9IHRoaXMuZ2V0U3lzQnlTeXNOYW1lKGdpdmVuU3lzTmFtZSlcbiAgICAgICAgaWYgKGdpdmVuU3lzLm9wZW5kTm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjYy5sb2coXCJ0aGlzIHN5cyBoYXMgYmVlbiBvcGVuZCAsIGNhbid0IHJlb3BlbjogXCIgKyBnaXZlblN5cy5uYW1lKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHVpID0gY2MuaW5zdGFudGlhdGUoZ2l2ZW5TeXMudWlQcmVmYWIpXG4gICAgICAgIHZhciBtZ3JOYW1lID0gdGhpcy5zeXN0ZW1zW2dpdmVuU3lzLm5hbWVdLm1nck5hbWVcbiAgICAgICAgdmFyIG1nciA9IHVpLmdldENvbXBvbmVudChtZ3JOYW1lKVxuICAgICAgICBpZiAobWdyICE9IG51bGwgJiYgdHlwZW9mIG1nci5vbldpbGxPcGVuZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBtZ3Iub25XaWxsT3BlbmQocGFyYSlcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3RoZXJzID0gdWkuZ2V0Q2hpbGRCeU5hbWUoXCJvdGhlcnNcIilcbiAgICAgICAgdmFyIGJnID0gdWkuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKVxuICAgICAgICBpZiAoYmcgIT0gbnVsbCkge1xuICAgICAgICAgICAgYmcud2lkdGggPSBjYy53aW5TaXplLndpZHRoXG4gICAgICAgICAgICBiZy5oZWlnaHQgPSBjYy53aW5TaXplLmhlaWdodFxuICAgICAgICAgICAgaWYgKGJnVHlwZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgYmcub24oXCJ0b3VjaHN0YXJ0XCIsZnVuY3Rpb24oKXt9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmdUeXBlID09IDIpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgICBiZy5vbihcInRvdWNoc3RhcnRcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNsb3NlU3lzdGVtKGdpdmVuU3lzTmFtZSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT0gMikge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZShcIkNhbnZhc1wiKS5hZGRDaGlsZCh1aSlcbiAgICAgICAgICAgIGdpdmVuU3lzLm9wZW5kTm9kZSA9IHVpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKFwiQ2FudmFzXCIpLmFkZENoaWxkKHVpKVxuICAgICAgICBnaXZlblN5cy5vcGVuZE5vZGUgPSB1aVxuICAgICAgICBpZiAob3RoZXJzICE9IG51bGwpIHtcbiAgICAgICAgICAgIG90aGVycy5zY2FsZSA9IDBcbiAgICAgICAgICAgIGNjLnR3ZWVuKG90aGVycylcbiAgICAgICAgICAgICAgICAudG8oMC4zLHtzY2FsZTogMX0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHVpLnNjYWxlID0gMFxuICAgICAgICAgICAgY2MudHdlZW4odWkpXG4gICAgICAgICAgICAgICAgLnRvKDAuMyx7c2NhbGU6IDF9KVxuICAgICAgICAgICAgICAgIC5zdGFydCgpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY2xvc2VTeXN0ZW0oZ2l2ZW5TeXNOYW1lLCB0eXBlID0gMSkge1xuICAgICAgICAvLzEgPSBhbmltYXRlZCBjbG9zZSAsIDIgPSBkaXJlY3QgY2xvc2UsIDMgPSBmYWRlIG91dFxuICAgICAgICB2YXIgZ2l2ZW5TeXMgPSB0aGlzLmdldFN5c0J5U3lzTmFtZShnaXZlblN5c05hbWUpXG4gICAgICAgIHZhciBvcGVuZE5vZGUgPSBnaXZlblN5cy5vcGVuZE5vZGVcbiAgICAgICAgaWYgKG9wZW5kTm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBjYy5sb2coZ2l2ZW5TeXMubmFtZSArIFwiaGFzIG5vdCBiZWVuIG9wZW5kLCBubyBuZWVkIHRvIGNvbHNlXCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PSAxKSB7XG4gICAgICAgICAgICB2YXIgb3RoZXJzID0gb3BlbmROb2RlLmdldENoaWxkQnlOYW1lKFwib3RoZXJzXCIpXG4gICAgICAgICAgICBpZiAob3RoZXJzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjYy50d2VlbihvdGhlcnMpXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjMsIHtzY2FsZTogMH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuZE5vZGUuZGVzdHJveSgpXG4gICAgICAgICAgICAgICAgICAgICAgICBnaXZlblN5cy5vcGVuZE5vZGUgPSBudWxsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5zdGFydCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYy50d2VlbihvcGVuZE5vZGUpXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjMsIHtzY2FsZTogMH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuZE5vZGUuZGVzdHJveSgpXG4gICAgICAgICAgICAgICAgICAgICAgICBnaXZlblN5cy5vcGVuZE5vZGUgPSBudWxsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmICh0eXBlID09IDIpIHtcbiAgICAgICAgICAgIG9wZW5kTm9kZS5kZXN0cm95KClcbiAgICAgICAgICAgIGdpdmVuU3lzLm9wZW5kTm9kZSA9IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gMykge1xuICAgICAgICAgICAgdmFyIGNvdmVyTm9kZSA9IHJlcXVpcmUoXCJyZXNNZ3JcIikucmVzZXNbXCJjb3Zlck5vZGVQcmVmYWJcIl1cbiAgICAgICAgICAgIGNvdmVyTm9kZSA9IGNjLmluc3RhbnRpYXRlKGNvdmVyTm9kZSlcbiAgICAgICAgICAgIGNvdmVyTm9kZS53aWR0aCA9IG9wZW5kTm9kZS53aWR0aFxuICAgICAgICAgICAgY292ZXJOb2RlLmhlaWdodCA9IG9wZW5kTm9kZS5oZWlnaHRcbiAgICAgICAgICAgIGNvdmVyTm9kZS5vcGFjaXR5ID0gMFxuICAgICAgICAgICAgY292ZXJOb2RlLm9uKFwidG91Y2hzdGFydFwiLGZ1bmN0aW9uKCl7fSlcblxuICAgICAgICAgICAgb3BlbmROb2RlLmFkZENoaWxkKGNvdmVyTm9kZSlcbiAgICAgICAgICAgIGNjLnR3ZWVuKGNvdmVyTm9kZSlcbiAgICAgICAgICAgICAgICAudG8oMC41LHtvcGFjaXR5OiAyNTV9KVxuICAgICAgICAgICAgICAgIC5kZWxheSgwLjUpXG4gICAgICAgICAgICAgICAgLmNhbGwoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgb3BlbmROb2RlLmRlc3Ryb3koKVxuICAgICAgICAgICAgICAgICAgICBnaXZlblN5cy5vcGVuZE5vZGUgPSBudWxsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3RhcnQoKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH0sXG5cbiAgICBnZXRTeXNCeVN5c05hbWUoZ2l2ZW5TeXNOYW1lKSB7XG4gICAgICAgIHN3aXRjaChnaXZlblN5c05hbWUpe1xuICAgICAgICAgICAgY2FzZSBcIndlbGZhcnlTeXNcIiA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2VsZmFyeVN5c1xuICAgICAgICAgICAgY2FzZSBcInNpZ25JblN5c1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNpZ25JblN5c1xuICAgICAgICAgICAgY2FzZSBcImFkZFByb3BlcnR5TnVtU3lzXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkUHJvcGVydHlOdW1TeXNcbiAgICAgICAgICAgIGNhc2UgXCJtYWlsU3lzXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFpbFN5c1xuICAgICAgICAgICAgY2FzZSBcInNlbGVjdFNlY3Rpb25TeXNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RTZWN0aW9uU3lzXG4gICAgICAgICAgICBjYXNlIFwic3RvcnlTeXNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdG9yeVN5c1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJubyBzdWNoIHN5c1wiKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN5c3RlbXNHbG9hYmxlRGF0YU1vbml0b3JlZChrZXksdmFsdWUpIHtcbiAgICAgICAgLy9tYWlsU3lzXG4gICAgICAgICAgICAvL21vbml0b3JlZCB3aGV0aGVyIHJlYWNoIG1haWwgY29uZGl0aW9uXG4gICAgICAgIC8vdGhpcy5tYWlsU3lzR2xvYWJsZU1vbml0b3JlZChrZXksdmFsdWUpXG4gICAgfSxcblxuXG4gICAgbWFpbFN5c0dsb2FibGVNb25pdG9yZWQoa2V5LHZhbHVlKSB7XG4gICAgICAgIHZhciB0ZXh0Q29uZmlnID0gcmVxdWlyZShcInRleHRDb25maWdcIilcbiAgICAgICAgdmFyIG9uUmVhY2hDb25kaXRpb24gPSBmdW5jdGlvbihnaXZlblRhZyxnaXZlbk1haWxJZCkge1xuICAgICAgICAgICAgdmFyIG5ldHdvcmtNZ3IgPSByZXF1aXJlKFwibmV0d29ya01nclwiKVxuICAgICAgICAgICAgdmFyIG1lc3NhZ2VPYmogPSBuZXR3b3JrTWdyLm1ha2VNZXNzYWdlT2JqKFwibWFpbE1vZHVsZVwiLFwicmVhY2hDb25kaXRpb25NZXNzYWdlVHlwZVwiKVxuICAgICAgICAgICAgbWVzc2FnZU9iai5tZXNzYWdlLnBsYXllcklkID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5pZFxuICAgICAgICAgICAgbWVzc2FnZU9iai5tZXNzYWdlLnRhZyA9IGdpdmVuVGFnXG4gICAgICAgICAgICBtZXNzYWdlT2JqLm1lc3NhZ2UubWFpbElkID0gZ2l2ZW5NYWlsSWRcbiAgICAgICAgICAgIG1lc3NhZ2VPYmouc3VjY2Vzc0NhbGxCYWNrID0gZnVuY3Rpb24oeGhyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSlcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UudHlwZSA9PSBcInN1Y2Nlc3NcIikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXNFbmQgPSByZXNwb25zZS5pc0VuZFxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNFbmQgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5tYWlsQ29uZGl0aW9uSW5kZXhbZ2l2ZW5UYWddICs9IDFcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEubWFpbENvbmRpdGlvbkluZGV4W2dpdmVuVGFnXSA9IC0xXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld01haWwgPSByZXNwb25zZS5tYWlsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEubWFpbHNbZ2l2ZW5NYWlsSWRdID0gbmV3TWFpbFxuICAgICAgICAgICAgICAgICAgICB2YXIgbm90aWZpY2FpdGlvbk1nciA9IHJlcXVpcmUoXCJub3RpZmljYXRpb25NZ3JcIilcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vdGlTdHIgPSB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDE0OClcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2FpdGlvbk1nci5wdXNoTm90aShub3RpU3RyKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ldHdvcmtNZ3Iuc2VuZE1lc3NhZ2VCeU1zZ09iaihtZXNzYWdlT2JqKVxuICAgICAgICB9XG4gICAgICAgIHZhciBtYWlsU3lzQ29uZmlnID0gcmVxdWlyZShcIm1haWxTeXNDb25maWdcIilcbiAgICAgICAgdmFyIHRhZ3MgPSBPYmplY3Qua2V5cyhtYWlsU3lzQ29uZmlnKVxuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiB0YWdzKSB7XG4gICAgICAgICAgICB2YXIgb25lVGFnID0gdGFnc1tpbmRleF1cbiAgICAgICAgICAgIHZhciBjb25kaXRpb25JbmRleCA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEubWFpbENvbmRpdGlvbkluZGV4W29uZVRhZ11cbiAgICAgICAgICAgIGlmIChjb25kaXRpb25JbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IG1haWxTeXNDb25maWdbb25lVGFnXS5jb25kaXRpb25zW2NvbmRpdGlvbkluZGV4XVxuICAgICAgICAgICAgdmFyIGNvbmRpdGlvblR5cGUgPSBlbGVtZW50LmNvbmRpdGlvblR5cGVcbiAgICAgICAgICAgIHZhciBjb25kaXRpb25QYXJhID0gZWxlbWVudC5jb25kaXRpb25QYXJhXG5cbiAgICAgICAgICAgIGlmIChjb25kaXRpb25UeXBlID09IDEpIHtcbiAgICAgICAgICAgICAgICAvL3JlYWNoIGdpdmVuIGxldmVsIGlkXG4gICAgICAgICAgICAgICAgaWYgKGtleSAhPSBcInByZUxldmVsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IGNvbmRpdGlvblBhcmEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1haWxJZCA9IGVsZW1lbnQubWFpbElkXG4gICAgICAgICAgICAgICAgICAgIG9uUmVhY2hDb25kaXRpb24ob25lVGFnLG1haWxJZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb25kaXRpb25UeXBlID09IDIpIHtcbiAgICAgICAgICAgICAgICAvL21pbiBzdGVwIG51bSBvZiBnaXZlbiBsZXZlbCBsZXNzIHRoYW4gYSB2YWx1ZVxuICAgICAgICAgICAgICAgIGlmIChrZXkuaW5kZXhPZihcIm1pblN0ZXBfbGV2ZWxfXCIpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGxldmVsSWQgPSBrZXkuc2xpY2UoMTQpXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KGxldmVsSWQpID09IGNvbmRpdGlvblBhcmEubGV2ZWxJZCl7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8PSBjb25kaXRpb25QYXJhLm1pblN0ZXBOdW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYWlsSWQgPSBlbGVtZW50Lm1haWxJZFxuICAgICAgICAgICAgICAgICAgICAgICAgb25SZWFjaENvbmRpdGlvbihvbmVUYWcsbWFpbElkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG1haWxTeXNHbG9hYmxlU2VuZE9uZU1haWwoZ2l2ZW5NYWlsSWQsZ2l2ZW5UYWcsY29tcGxldGUgPSBmdW5jdGlvbigpe30sZGVsYXkgPSAwKSB7XG4gICAgICAgIHZhciBuZXR3b3JrTWdyID0gcmVxdWlyZShcIm5ldHdvcmtNZ3JcIilcbiAgICAgICAgdmFyIG1lc3NhZ2VPYmogPSBuZXR3b3JrTWdyLm1ha2VNZXNzYWdlT2JqKFwibWFpbE1vZHVsZVwiLFwic2VuZE1haWxNZXNzYWdlVHlwZVwiKVxuICAgICAgICBtZXNzYWdlT2JqLm1lc3NhZ2UucGxheWVySWQgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmlkXG4gICAgICAgIG1lc3NhZ2VPYmoubWVzc2FnZS5tYWlsSWQgPSBnaXZlbk1haWxJZFxuICAgICAgICBtZXNzYWdlT2JqLm1lc3NhZ2UudGFnID0gZ2l2ZW5UYWdcbiAgICAgICAgbWVzc2FnZU9iai5tZXNzYWdlLmRlbGF5ID0gZGVsYXlcbiAgICAgICAgbWVzc2FnZU9iai5zdWNjZXNzQ2FsbEJhY2sgPSBmdW5jdGlvbih4aHIpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZSA9IHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSlcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS50eXBlID09IFwic3VjY2Vzc1wiKSB7XG4gICAgICAgICAgICAgICAgY29tcGxldGUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG5ldHdvcmtNZ3Iuc2VuZE1lc3NhZ2VCeU1zZ09iaihtZXNzYWdlT2JqKVxuICAgIH0sXG5cbiAgICAvLyBnZXRTZWN0aW9uTGV2ZWxJbmZvQnlMZXZlbElkKGdpdmVuTGV2ZWxJZCkge1xuICAgIC8vICAgICB2YXIgcmVzdWx0ID0gbnVsbFxuICAgIC8vICAgICB2YXIgc2VjdGlvbkNvbmZpZyA9IHJlcXVpcmUoXCJzZWN0aW9uQ29uZmlnXCIpXG4gICAgLy8gICAgIGZvciAodmFyIGtleSBpbiBzZWN0aW9uQ29uZmlnKSB7XG4gICAgLy8gICAgICAgICB2YXIgb25lQ29uZmlnID0gc2VjdGlvbkNvbmZpZ1trZXldXG4gICAgLy8gICAgICAgICB2YXIgbGV2ZWxzID0gb25lQ29uZmlnLmxldmVsc1xuICAgIC8vICAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gbGV2ZWxzKSB7XG4gICAgLy8gICAgICAgICAgICAgaWYgKGdpdmVuTGV2ZWxJZCA9PSBsZXZlbHNbaW5kZXhdKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIHZhciBjdXJyZW50TGV2ZWwgPSBnaXZlbkxldmVsSWRcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIHJldHVybiByZXN1bHRcbiAgICAvLyB9XG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcblxudmFyIHN5c3RlbXNNZ3IgPSBuZXcgU3lzdGVtc01ncigpXG5tb2R1bGUuZXhwb3J0cyA9IHN5c3RlbXNNZ3IiXX0=