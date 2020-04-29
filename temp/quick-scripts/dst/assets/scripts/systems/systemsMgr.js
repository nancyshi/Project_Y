
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
  systemsGloableDataMonitored: function systemsGloableDataMonitored(key, value) {
    //mailSys
    //monitored whether reach mail condition
    this.mailSysGloableMonitored(key, value);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3N5c3RlbXMvc3lzdGVtc01nci5qcyJdLCJuYW1lcyI6WyJTeXN0ZW1zTWdyIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ3ZWxmYXJ5U3lzIiwiZ2V0IiwiX3dlbGZhcnlTeXMiLCJzZXR1cFN5c1Byb3BlcnR5Iiwic3lzdGVtcyIsInNpZ25JblN5cyIsIl9zaWduSW5TeXMiLCJhZGRQcm9wZXJ0eU51bVN5cyIsIl9hZGRQcm9wZXJ0eU51bVN5cyIsIm1haWxTeXMiLCJfbWFpbFN5cyIsInNlbGVjdFNlY3Rpb25TeXMiLCJfc2VsZWN0U2VjdGlvblN5cyIsInN0b3J5U3lzIiwiX3N0b3J5U3lzIiwiX3N5c3RlbXMiLCJnaXZlblByZWZhYk5hbWUiLCJnaXZlbk5hbWUiLCJnaXZlbk1nck5hbWUiLCJnaXZlblN5c1Byb3BlcnR5IiwidWlQcmVmYWIiLCJyZXF1aXJlIiwicmVzZXMiLCJvcGVuZE5vZGUiLCJuYW1lIiwibWdyTmFtZSIsInNob3dTeXN0ZW0iLCJnaXZlblN5c05hbWUiLCJwYXJhIiwidHlwZSIsImJnVHlwZSIsImdpdmVuU3lzIiwiZ2V0U3lzQnlTeXNOYW1lIiwibG9nIiwidWkiLCJpbnN0YW50aWF0ZSIsIm1nciIsImdldENvbXBvbmVudCIsIm9uV2lsbE9wZW5kIiwib3RoZXJzIiwiZ2V0Q2hpbGRCeU5hbWUiLCJiZyIsIndpZHRoIiwid2luU2l6ZSIsImhlaWdodCIsIm9uIiwic2VsZiIsImNsb3NlU3lzdGVtIiwiZGlyZWN0b3IiLCJnZXRTY2VuZSIsImFkZENoaWxkIiwic2NhbGUiLCJ0d2VlbiIsInRvIiwic3RhcnQiLCJjYWxsIiwiZGVzdHJveSIsImNvdmVyTm9kZSIsIm9wYWNpdHkiLCJkZWxheSIsInN5c3RlbXNHbG9hYmxlRGF0YU1vbml0b3JlZCIsImtleSIsInZhbHVlIiwibWFpbFN5c0dsb2FibGVNb25pdG9yZWQiLCJ0ZXh0Q29uZmlnIiwib25SZWFjaENvbmRpdGlvbiIsImdpdmVuVGFnIiwiZ2l2ZW5NYWlsSWQiLCJuZXR3b3JrTWdyIiwibWVzc2FnZU9iaiIsIm1ha2VNZXNzYWdlT2JqIiwibWVzc2FnZSIsInBsYXllcklkIiwicGxheWVyRGF0YSIsImlkIiwidGFnIiwibWFpbElkIiwic3VjY2Vzc0NhbGxCYWNrIiwieGhyIiwicmVzcG9uc2UiLCJyZXNwb25zZVRleHQiLCJKU09OIiwicGFyc2UiLCJpc0VuZCIsIm1haWxDb25kaXRpb25JbmRleCIsIm5ld01haWwiLCJtYWlsIiwibWFpbHMiLCJub3RpZmljYWl0aW9uTWdyIiwibm90aVN0ciIsImdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlIiwicHVzaE5vdGkiLCJzZW5kTWVzc2FnZUJ5TXNnT2JqIiwibWFpbFN5c0NvbmZpZyIsInRhZ3MiLCJPYmplY3QiLCJrZXlzIiwiaW5kZXgiLCJvbmVUYWciLCJjb25kaXRpb25JbmRleCIsImVsZW1lbnQiLCJjb25kaXRpb25zIiwiY29uZGl0aW9uVHlwZSIsImNvbmRpdGlvblBhcmEiLCJpbmRleE9mIiwibGV2ZWxJZCIsInNsaWNlIiwicGFyc2VJbnQiLCJtaW5TdGVwTnVtIiwibWFpbFN5c0dsb2FibGVTZW5kT25lTWFpbCIsImNvbXBsZXRlIiwic3lzdGVtc01nciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBLElBQUlBLFVBQVUsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdEIsYUFBU0QsRUFBRSxDQUFDRSxTQURVO0FBR3RCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1JDLE1BQUFBLEdBRFEsaUJBQ0Y7QUFDRixZQUFJLEtBQUtDLFdBQUwsSUFBb0IsSUFBeEIsRUFBOEI7QUFDMUIsZUFBS0EsV0FBTCxHQUFtQixLQUFLQyxnQkFBTCxDQUFzQixrQkFBdEIsRUFB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LEtBTkQ7O0FBT0ExQyxJQUFBQSxVQUFVLENBQUN3QixtQkFBWCxDQUErQnZCLFVBQS9CO0FBQ0gsR0ExU3FCLENBNFN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBM1RzQixDQUFULENBQWpCO0FBOFRBLElBQUkwQyxVQUFVLEdBQUcsSUFBSXBILFVBQUosRUFBakI7QUFDQXFILE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQkYsVUFBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuXG4vL2EgdHlwaWNhbCBzeXN0ZW0gd2lsbCBoYXZlIGFuIHVpICwgd2hpY2ggd2lsbCBiZSBjcmVhdGVkIGJ5IGEgcHJlZmFiXG4vL290aGVyIHN5c3RlbSB3aWxsIG5vdCBiZSBjb250YWluZWQgYnkgaGVyZSwgc3VjaCBhcyBub3RpZmljYWl0aW9uIHN5c3RlbVxudmFyIFN5c3RlbXNNZ3IgPSBjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICB3ZWxmYXJ5U3lzOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3dlbGZhcnlTeXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl93ZWxmYXJ5U3lzID0gdGhpcy5zZXR1cFN5c1Byb3BlcnR5KFwid2VsZmFyeVN5c1ByZWZhYlwiLFwid2VsZmFyeVN5c1wiLFwid2VsZmFyeVN5c01nclwiKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5c3RlbXNbXCJ3ZWxmYXJ5U3lzXCJdID0gdGhpcy5fd2VsZmFyeVN5c1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd2VsZmFyeVN5c1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzaWduSW5TeXM6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2lnbkluU3lzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2lnbkluU3lzID0gdGhpcy5zZXR1cFN5c1Byb3BlcnR5KFwic2lnbkluU3lzUHJlZmFiXCIsIFwic2lnbkluU3lzXCIsXCJzaWduSW5TeXNNZ3JcIilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeXN0ZW1zW1wic2lnbkluU3lzXCJdID0gdGhpcy5fc2lnbkluU3lzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaWduSW5TeXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBhZGRQcm9wZXJ0eU51bVN5czoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hZGRQcm9wZXJ0eU51bVN5cyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZFByb3BlcnR5TnVtU3lzID0gdGhpcy5zZXR1cFN5c1Byb3BlcnR5KFwiYWRkUHJvcGVydHlOdW1TeXNQcmVmYWJcIixcImFkZFByb3BlcnR5TnVtU3lzXCIsXCJhZGRQcm9wZXJ0eU51bVN5c01nclwiKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5c3RlbXNbXCJhZGRQcm9wZXJ0eU51bVN5c1wiXSA9IHRoaXMuX2FkZFByb3BlcnR5TnVtU3lzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hZGRQcm9wZXJ0eU51bVN5c1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG1haWxTeXM6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFpbFN5cyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21haWxTeXMgPSB0aGlzLnNldHVwU3lzUHJvcGVydHkoXCJtYWlsU3lzUHJlZmFiXCIsXCJtYWlsU3lzXCIsXCJtYWlsU3lzTWdyXCIpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3lzdGVtc1tcIm1haWxTeXNcIl0gPSB0aGlzLl9tYWlsU3lzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYWlsU3lzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBzZWxlY3RTZWN0aW9uU3lzOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlbGVjdFNlY3Rpb25TeXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RTZWN0aW9uU3lzID0gdGhpcy5zZXR1cFN5c1Byb3BlcnR5KFwic2VsZWN0U2VjdGlvblN5c1ByZWZhYlwiLFwic2VsZWN0U2VjdGlvblN5c1wiLFwic2VsZWN0U2VjdGlvblVJTWdyXCIpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3lzdGVtc1tcInNlbGVjdFNlY3Rpb25TeXNcIl0gPSB0aGlzLl9zZWxlY3RTZWN0aW9uU3lzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RTZWN0aW9uU3lzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHN0b3J5U3lzOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N0b3J5U3lzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RvcnlTeXMgPSB0aGlzLnNldHVwU3lzUHJvcGVydHkoXCJzdG9yeVN5c1ByZWZhYlwiLFwic3RvcnlTeXNcIixcInN0b3J5U3lzTWdyXCIpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3lzdGVtc1tcInN0b3J5U3lzXCJdID0gdGhpcy5fc3RvcnlTeXNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0b3J5U3lzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3lzdGVtczoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zeXN0ZW1zID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3lzdGVtcyA9IHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zeXN0ZW1zXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0dXBTeXNQcm9wZXJ0eShnaXZlblByZWZhYk5hbWUsIGdpdmVuTmFtZSwgZ2l2ZW5NZ3JOYW1lKSB7XG4gICAgICAgIHZhciBnaXZlblN5c1Byb3BlcnR5ID0ge31cbiAgICAgICAgZ2l2ZW5TeXNQcm9wZXJ0eS51aVByZWZhYiA9IHJlcXVpcmUoXCJyZXNNZ3JcIikucmVzZXNbZ2l2ZW5QcmVmYWJOYW1lXVxuICAgICAgICBnaXZlblN5c1Byb3BlcnR5Lm9wZW5kTm9kZSA9IG51bGxcbiAgICAgICAgZ2l2ZW5TeXNQcm9wZXJ0eS5uYW1lID0gZ2l2ZW5OYW1lXG4gICAgICAgIGdpdmVuU3lzUHJvcGVydHkubWdyTmFtZSA9IGdpdmVuTWdyTmFtZVxuICAgICAgICByZXR1cm4gZ2l2ZW5TeXNQcm9wZXJ0eVxuICAgIH0sXG5cbiAgICBzaG93U3lzdGVtKGdpdmVuU3lzTmFtZSwgcGFyYSA9IG51bGwsIHR5cGUgPSAxLCBiZ1R5cGUgPSAxKSB7XG4gICAgICAgIC8vdHlwZSAxID0gYW5pbWF0ZWQgb3BlbiAsIDIgPSBkaXJlY3Qgb3BlblxuICAgICAgICAvL2JnVHlwZSAxID0gcHJldmVudCAyID0gY2xvc2VcbiAgICAgICAgdmFyIGdpdmVuU3lzID0gdGhpcy5nZXRTeXNCeVN5c05hbWUoZ2l2ZW5TeXNOYW1lKVxuICAgICAgICBpZiAoZ2l2ZW5TeXMub3BlbmROb2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNjLmxvZyhcInRoaXMgc3lzIGhhcyBiZWVuIG9wZW5kICwgY2FuJ3QgcmVvcGVuOiBcIiArIGdpdmVuU3lzLm5hbWUpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB2YXIgdWkgPSBjYy5pbnN0YW50aWF0ZShnaXZlblN5cy51aVByZWZhYilcbiAgICAgICAgdmFyIG1nck5hbWUgPSB0aGlzLnN5c3RlbXNbZ2l2ZW5TeXMubmFtZV0ubWdyTmFtZVxuICAgICAgICB2YXIgbWdyID0gdWkuZ2V0Q29tcG9uZW50KG1nck5hbWUpXG4gICAgICAgIGlmIChtZ3IgIT0gbnVsbCAmJiB0eXBlb2YgbWdyLm9uV2lsbE9wZW5kID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIG1nci5vbldpbGxPcGVuZChwYXJhKVxuICAgICAgICB9XG4gICAgICAgIHZhciBvdGhlcnMgPSB1aS5nZXRDaGlsZEJ5TmFtZShcIm90aGVyc1wiKVxuICAgICAgICB2YXIgYmcgPSB1aS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpXG4gICAgICAgIGlmIChiZyAhPSBudWxsKSB7XG4gICAgICAgICAgICBiZy53aWR0aCA9IGNjLndpblNpemUud2lkdGhcbiAgICAgICAgICAgIGJnLmhlaWdodCA9IGNjLndpblNpemUuaGVpZ2h0XG4gICAgICAgICAgICBpZiAoYmdUeXBlID09IDEpIHtcbiAgICAgICAgICAgICAgICBiZy5vbihcInRvdWNoc3RhcnRcIixmdW5jdGlvbigpe30pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiZ1R5cGUgPT0gMikge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICAgICAgICAgIGJnLm9uKFwidG91Y2hzdGFydFwiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2xvc2VTeXN0ZW0oZ2l2ZW5TeXNOYW1lKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PSAyKSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKFwiQ2FudmFzXCIpLmFkZENoaWxkKHVpKVxuICAgICAgICAgICAgZ2l2ZW5TeXMub3BlbmROb2RlID0gdWlcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoXCJDYW52YXNcIikuYWRkQ2hpbGQodWkpXG4gICAgICAgIGdpdmVuU3lzLm9wZW5kTm9kZSA9IHVpXG4gICAgICAgIGlmIChvdGhlcnMgIT0gbnVsbCkge1xuICAgICAgICAgICAgb3RoZXJzLnNjYWxlID0gMFxuICAgICAgICAgICAgY2MudHdlZW4ob3RoZXJzKVxuICAgICAgICAgICAgICAgIC50bygwLjMse3NjYWxlOiAxfSlcbiAgICAgICAgICAgICAgICAuc3RhcnQoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdWkuc2NhbGUgPSAwXG4gICAgICAgICAgICBjYy50d2Vlbih1aSlcbiAgICAgICAgICAgICAgICAudG8oMC4zLHtzY2FsZTogMX0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KClcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjbG9zZVN5c3RlbShnaXZlblN5c05hbWUsIHR5cGUgPSAxKSB7XG4gICAgICAgIC8vMSA9IGFuaW1hdGVkIGNsb3NlICwgMiA9IGRpcmVjdCBjbG9zZSwgMyA9IGZhZGUgb3V0XG4gICAgICAgIHZhciBnaXZlblN5cyA9IHRoaXMuZ2V0U3lzQnlTeXNOYW1lKGdpdmVuU3lzTmFtZSlcbiAgICAgICAgdmFyIG9wZW5kTm9kZSA9IGdpdmVuU3lzLm9wZW5kTm9kZVxuICAgICAgICBpZiAob3BlbmROb2RlID09IG51bGwpIHtcbiAgICAgICAgICAgIGNjLmxvZyhnaXZlblN5cy5uYW1lICsgXCJoYXMgbm90IGJlZW4gb3BlbmQsIG5vIG5lZWQgdG8gY29sc2VcIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlID09IDEpIHtcbiAgICAgICAgICAgIHZhciBvdGhlcnMgPSBvcGVuZE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvdGhlcnNcIilcbiAgICAgICAgICAgIGlmIChvdGhlcnMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG90aGVycylcbiAgICAgICAgICAgICAgICAgICAgLnRvKDAuMywge3NjYWxlOiAwfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5kTm9kZS5kZXN0cm95KClcbiAgICAgICAgICAgICAgICAgICAgICAgIGdpdmVuU3lzLm9wZW5kTm9kZSA9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG9wZW5kTm9kZSlcbiAgICAgICAgICAgICAgICAgICAgLnRvKDAuMywge3NjYWxlOiAwfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5kTm9kZS5kZXN0cm95KClcbiAgICAgICAgICAgICAgICAgICAgICAgIGdpdmVuU3lzLm9wZW5kTm9kZSA9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gMikge1xuICAgICAgICAgICAgb3BlbmROb2RlLmRlc3Ryb3koKVxuICAgICAgICAgICAgZ2l2ZW5TeXMub3BlbmROb2RlID0gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAzKSB7XG4gICAgICAgICAgICB2YXIgY292ZXJOb2RlID0gcmVxdWlyZShcInJlc01nclwiKS5yZXNlc1tcImNvdmVyTm9kZVByZWZhYlwiXVxuICAgICAgICAgICAgY292ZXJOb2RlID0gY2MuaW5zdGFudGlhdGUoY292ZXJOb2RlKVxuICAgICAgICAgICAgY292ZXJOb2RlLndpZHRoID0gb3BlbmROb2RlLndpZHRoXG4gICAgICAgICAgICBjb3Zlck5vZGUuaGVpZ2h0ID0gb3BlbmROb2RlLmhlaWdodFxuICAgICAgICAgICAgY292ZXJOb2RlLm9wYWNpdHkgPSAwXG4gICAgICAgICAgICBjb3Zlck5vZGUub24oXCJ0b3VjaHN0YXJ0XCIsZnVuY3Rpb24oKXt9KVxuXG4gICAgICAgICAgICBvcGVuZE5vZGUuYWRkQ2hpbGQoY292ZXJOb2RlKVxuICAgICAgICAgICAgY2MudHdlZW4oY292ZXJOb2RlKVxuICAgICAgICAgICAgICAgIC50bygwLjUse29wYWNpdHk6IDI1NX0pXG4gICAgICAgICAgICAgICAgLmRlbGF5KDAuNSlcbiAgICAgICAgICAgICAgICAuY2FsbChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBvcGVuZE5vZGUuZGVzdHJveSgpXG4gICAgICAgICAgICAgICAgICAgIGdpdmVuU3lzLm9wZW5kTm9kZSA9IG51bGxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdGFydCgpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfSxcblxuICAgIGdldFN5c0J5U3lzTmFtZShnaXZlblN5c05hbWUpIHtcbiAgICAgICAgc3dpdGNoKGdpdmVuU3lzTmFtZSl7XG4gICAgICAgICAgICBjYXNlIFwid2VsZmFyeVN5c1wiIDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53ZWxmYXJ5U3lzXG4gICAgICAgICAgICBjYXNlIFwic2lnbkluU3lzXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2lnbkluU3lzXG4gICAgICAgICAgICBjYXNlIFwiYWRkUHJvcGVydHlOdW1TeXNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hZGRQcm9wZXJ0eU51bVN5c1xuICAgICAgICAgICAgY2FzZSBcIm1haWxTeXNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYWlsU3lzXG4gICAgICAgICAgICBjYXNlIFwic2VsZWN0U2VjdGlvblN5c1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdFNlY3Rpb25TeXNcbiAgICAgICAgICAgIGNhc2UgXCJzdG9yeVN5c1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3J5U3lzXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIm5vIHN1Y2ggc3lzXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3lzdGVtc0dsb2FibGVEYXRhTW9uaXRvcmVkKGtleSx2YWx1ZSkge1xuICAgICAgICAvL21haWxTeXNcbiAgICAgICAgICAgIC8vbW9uaXRvcmVkIHdoZXRoZXIgcmVhY2ggbWFpbCBjb25kaXRpb25cbiAgICAgICAgdGhpcy5tYWlsU3lzR2xvYWJsZU1vbml0b3JlZChrZXksdmFsdWUpXG4gICAgfSxcblxuXG4gICAgbWFpbFN5c0dsb2FibGVNb25pdG9yZWQoa2V5LHZhbHVlKSB7XG4gICAgICAgIHZhciB0ZXh0Q29uZmlnID0gcmVxdWlyZShcInRleHRDb25maWdcIilcbiAgICAgICAgdmFyIG9uUmVhY2hDb25kaXRpb24gPSBmdW5jdGlvbihnaXZlblRhZyxnaXZlbk1haWxJZCkge1xuICAgICAgICAgICAgdmFyIG5ldHdvcmtNZ3IgPSByZXF1aXJlKFwibmV0d29ya01nclwiKVxuICAgICAgICAgICAgdmFyIG1lc3NhZ2VPYmogPSBuZXR3b3JrTWdyLm1ha2VNZXNzYWdlT2JqKFwibWFpbE1vZHVsZVwiLFwicmVhY2hDb25kaXRpb25NZXNzYWdlVHlwZVwiKVxuICAgICAgICAgICAgbWVzc2FnZU9iai5tZXNzYWdlLnBsYXllcklkID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5pZFxuICAgICAgICAgICAgbWVzc2FnZU9iai5tZXNzYWdlLnRhZyA9IGdpdmVuVGFnXG4gICAgICAgICAgICBtZXNzYWdlT2JqLm1lc3NhZ2UubWFpbElkID0gZ2l2ZW5NYWlsSWRcbiAgICAgICAgICAgIG1lc3NhZ2VPYmouc3VjY2Vzc0NhbGxCYWNrID0gZnVuY3Rpb24oeGhyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSlcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UudHlwZSA9PSBcInN1Y2Nlc3NcIikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXNFbmQgPSByZXNwb25zZS5pc0VuZFxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNFbmQgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5tYWlsQ29uZGl0aW9uSW5kZXhbZ2l2ZW5UYWddICs9IDFcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEubWFpbENvbmRpdGlvbkluZGV4W2dpdmVuVGFnXSA9IC0xXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld01haWwgPSByZXNwb25zZS5tYWlsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEubWFpbHNbZ2l2ZW5NYWlsSWRdID0gbmV3TWFpbFxuICAgICAgICAgICAgICAgICAgICB2YXIgbm90aWZpY2FpdGlvbk1nciA9IHJlcXVpcmUoXCJub3RpZmljYXRpb25NZ3JcIilcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vdGlTdHIgPSB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDE0OClcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2FpdGlvbk1nci5wdXNoTm90aShub3RpU3RyKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ldHdvcmtNZ3Iuc2VuZE1lc3NhZ2VCeU1zZ09iaihtZXNzYWdlT2JqKVxuICAgICAgICB9XG4gICAgICAgIHZhciBtYWlsU3lzQ29uZmlnID0gcmVxdWlyZShcIm1haWxTeXNDb25maWdcIilcbiAgICAgICAgdmFyIHRhZ3MgPSBPYmplY3Qua2V5cyhtYWlsU3lzQ29uZmlnKVxuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiB0YWdzKSB7XG4gICAgICAgICAgICB2YXIgb25lVGFnID0gdGFnc1tpbmRleF1cbiAgICAgICAgICAgIHZhciBjb25kaXRpb25JbmRleCA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEubWFpbENvbmRpdGlvbkluZGV4W29uZVRhZ11cbiAgICAgICAgICAgIGlmIChjb25kaXRpb25JbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IG1haWxTeXNDb25maWdbb25lVGFnXS5jb25kaXRpb25zW2NvbmRpdGlvbkluZGV4XVxuICAgICAgICAgICAgdmFyIGNvbmRpdGlvblR5cGUgPSBlbGVtZW50LmNvbmRpdGlvblR5cGVcbiAgICAgICAgICAgIHZhciBjb25kaXRpb25QYXJhID0gZWxlbWVudC5jb25kaXRpb25QYXJhXG5cbiAgICAgICAgICAgIGlmIChjb25kaXRpb25UeXBlID09IDEpIHtcbiAgICAgICAgICAgICAgICAvL3JlYWNoIGdpdmVuIGxldmVsIGlkXG4gICAgICAgICAgICAgICAgaWYgKGtleSAhPSBcInByZUxldmVsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IGNvbmRpdGlvblBhcmEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1haWxJZCA9IGVsZW1lbnQubWFpbElkXG4gICAgICAgICAgICAgICAgICAgIG9uUmVhY2hDb25kaXRpb24ob25lVGFnLG1haWxJZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb25kaXRpb25UeXBlID09IDIpIHtcbiAgICAgICAgICAgICAgICAvL21pbiBzdGVwIG51bSBvZiBnaXZlbiBsZXZlbCBsZXNzIHRoYW4gYSB2YWx1ZVxuICAgICAgICAgICAgICAgIGlmIChrZXkuaW5kZXhPZihcIm1pblN0ZXBfbGV2ZWxfXCIpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGxldmVsSWQgPSBrZXkuc2xpY2UoMTQpXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KGxldmVsSWQpID09IGNvbmRpdGlvblBhcmEubGV2ZWxJZCl7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8PSBjb25kaXRpb25QYXJhLm1pblN0ZXBOdW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYWlsSWQgPSBlbGVtZW50Lm1haWxJZFxuICAgICAgICAgICAgICAgICAgICAgICAgb25SZWFjaENvbmRpdGlvbihvbmVUYWcsbWFpbElkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG1haWxTeXNHbG9hYmxlU2VuZE9uZU1haWwoZ2l2ZW5NYWlsSWQsZ2l2ZW5UYWcsY29tcGxldGUgPSBmdW5jdGlvbigpe30sZGVsYXkgPSAwKSB7XG4gICAgICAgIHZhciBuZXR3b3JrTWdyID0gcmVxdWlyZShcIm5ldHdvcmtNZ3JcIilcbiAgICAgICAgdmFyIG1lc3NhZ2VPYmogPSBuZXR3b3JrTWdyLm1ha2VNZXNzYWdlT2JqKFwibWFpbE1vZHVsZVwiLFwic2VuZE1haWxNZXNzYWdlVHlwZVwiKVxuICAgICAgICBtZXNzYWdlT2JqLm1lc3NhZ2UucGxheWVySWQgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmlkXG4gICAgICAgIG1lc3NhZ2VPYmoubWVzc2FnZS5tYWlsSWQgPSBnaXZlbk1haWxJZFxuICAgICAgICBtZXNzYWdlT2JqLm1lc3NhZ2UudGFnID0gZ2l2ZW5UYWdcbiAgICAgICAgbWVzc2FnZU9iai5tZXNzYWdlLmRlbGF5ID0gZGVsYXlcbiAgICAgICAgbWVzc2FnZU9iai5zdWNjZXNzQ2FsbEJhY2sgPSBmdW5jdGlvbih4aHIpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZSA9IHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSlcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS50eXBlID09IFwic3VjY2Vzc1wiKSB7XG4gICAgICAgICAgICAgICAgY29tcGxldGUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG5ldHdvcmtNZ3Iuc2VuZE1lc3NhZ2VCeU1zZ09iaihtZXNzYWdlT2JqKVxuICAgIH0sXG5cbiAgICAvLyBnZXRTZWN0aW9uTGV2ZWxJbmZvQnlMZXZlbElkKGdpdmVuTGV2ZWxJZCkge1xuICAgIC8vICAgICB2YXIgcmVzdWx0ID0gbnVsbFxuICAgIC8vICAgICB2YXIgc2VjdGlvbkNvbmZpZyA9IHJlcXVpcmUoXCJzZWN0aW9uQ29uZmlnXCIpXG4gICAgLy8gICAgIGZvciAodmFyIGtleSBpbiBzZWN0aW9uQ29uZmlnKSB7XG4gICAgLy8gICAgICAgICB2YXIgb25lQ29uZmlnID0gc2VjdGlvbkNvbmZpZ1trZXldXG4gICAgLy8gICAgICAgICB2YXIgbGV2ZWxzID0gb25lQ29uZmlnLmxldmVsc1xuICAgIC8vICAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gbGV2ZWxzKSB7XG4gICAgLy8gICAgICAgICAgICAgaWYgKGdpdmVuTGV2ZWxJZCA9PSBsZXZlbHNbaW5kZXhdKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIHZhciBjdXJyZW50TGV2ZWwgPSBnaXZlbkxldmVsSWRcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIHJldHVybiByZXN1bHRcbiAgICAvLyB9XG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcblxudmFyIHN5c3RlbXNNZ3IgPSBuZXcgU3lzdGVtc01ncigpXG5tb2R1bGUuZXhwb3J0cyA9IHN5c3RlbXNNZ3IiXX0=