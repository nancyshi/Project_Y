
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/systems/mailSys/mailSysMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '465278Wd2tOJrFKJYgx+b6s', 'mailSysMgr');
// scripts/systems/mailSys/mailSysMgr.js

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
    uibg: cc.Node,
    closeButtonNode: cc.Node,
    tagSection: cc.Node,
    mailSection: cc.Node,
    notiSection: cc.Node,
    mailSectionContentNode: cc.Node,
    mailSectionEmptyLabelNode: cc.Node,
    mailSectionPrefab: cc.Prefab,
    tagSectionPrefab: cc.Prefab,
    selectedTagEffectPrefab: cc.Prefab,
    opendMailPrefab: cc.Prefab,
    tags: null,
    mailsByTag: {
      "default": {}
    },
    unReadedMailNums: {
      "default": {}
    },
    selectedTag: {
      get: function get() {
        return this._selectedTag;
      },
      set: function set(value) {
        this._selectedTag = value;
        this.setupMailSection();
        this.setupNotiSection();
      }
    },
    selectedTagNode: {
      get: function get() {
        return this._selectedTagNode;
      },
      set: function set(value) {
        this._selectedTagNode = value;

        if (this.selectedTagEffect.parent == null) {
          this.selectedTagEffect.x = this.selectedTagNode.x;
          this.selectedTagEffect.y = this.selectedTagNode.y;
          this.tagSection.addChild(this.selectedTagEffect, 0);
        } else {
          var targetY = this.selectedTagNode.y;
          cc.tween(this.selectedTagEffect).to(0.1, {
            y: targetY
          }).start();
        }
      }
    },
    selectedTagEffect: {
      get: function get() {
        if (this._selectedTagEffect == null) {
          var effect = cc.instantiate(this.selectedTagEffectPrefab);
          this._selectedTagEffect = effect;
        }

        return this._selectedTagEffect;
      },
      set: function set(value) {
        this._selectedTagEffect = value;
      }
    },
    tagSectionStartY: -86.345,
    tagSectionDis: 120,
    mailSectionStartPosition: cc.v2(-125.788, 373.356),
    mailSectionNodeDis: 32,
    mailSectionNodeReadedColor: {
      get: function get() {
        if (this._mailSectionNodeReadedColor == null) {
          this._mailSectionNodeReadedColor = cc.color(102, 102, 102);
        }

        return this._mailSectionNodeReadedColor;
      },
      set: function set(value) {
        this._mailSectionNodeReadedColor = value;
      }
    },
    sysName: "mailSys"
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    var self = this;
    this.closeButtonNode.on("click", function () {
      require("systemsMgr").closeSystem(self.sysName);
    });
    this.uibg.on("touchstart", function () {});
    this.setupData();
    this.setupUI();
  },
  start: function start() {},
  setupTagSection: function setupTagSection() {
    var textConfig = require("textConfig");

    for (var index in this.tags) {
      var oneTag = this.tags[index];

      var tagName = require("mailSysConfig")[oneTag].tagNameTextId;

      tagName = textConfig.getTextByIdAndLanguageType(tagName);
      var node = cc.instantiate(this.tagSectionPrefab);
      node.getComponent(cc.Label).string = tagName;

      node.getComponent(cc.Label)._forceUpdateRenderData();

      var self = this;

      var bindFunction = function bindFunction(givenNode, givenTag) {
        givenNode.on("click", function () {
          if (self.selectedTag != givenTag) {
            self.selectedTag = givenTag;
          }

          if (self.selectedTagNode != givenNode) {
            self.selectedTagNode = givenNode;
          }
        });

        givenNode.getComponent("redPointMgr").redPointShowCondition = function () {
          var mails = require("dataMgr").playerData.mails;

          var unReadNum = 0;

          for (var key in mails) {
            var oneMail = mails[key];

            if (oneMail.tag == givenTag && oneMail.status == 0) {
              unReadNum += 1;
            }
          }

          if (unReadNum > 0) {
            return true;
          } else {
            return false;
          }
        };
      };

      bindFunction(node, oneTag);
      node.y = this.tagSectionStartY - index * this.tagSectionDis;
      node.name = oneTag;
      this.tagSection.addChild(node, 1);

      if (index == 0) {
        this.selectedTag = oneTag;
        this.selectedTagNode = node;
      }
    }
  },
  setupMailSection: function setupMailSection() {
    var textConfig = require("textConfig");

    var tagMails = this.mailsByTag[this.selectedTag];
    var mailIdsArry = Object.keys(tagMails);
    this.mailSectionContentNode.destroyAllChildren();

    if (mailIdsArry.length == 0) {
      this.mailSectionEmptyLabelNode.active = true;
      this.mailSectionEmptyLabelNode.getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(146);
      this.mailSectionContentNode.height = 0;
      return;
    }

    this.mailSectionEmptyLabelNode.active = false;
    var self = this;

    var sortFunction = function sortFunction(mailId1, mailId2) {
      var mail1 = self.mailsByTag[self.selectedTag][mailId1];
      var mail2 = self.mailsByTag[self.selectedTag][mailId2];

      if (mail1.status == 0 && mail2.status == 1) {
        return -1;
      } else if (mail1.status == 1 && mail2.status == 0) {
        return 1;
      } else {
        var timeStamp1 = mail1.timeStamp;
        var timeStamp2 = mail2.timeStamp;

        if (timeStamp1 < timeStamp2) {
          return 1;
        } else {
          return -1;
        }
      }
    };

    mailIdsArry = mailIdsArry.sort(sortFunction);

    var mailConfig = require("mailConfig");

    var totalHeight = 0;

    for (var index in mailIdsArry) {
      var mailId = mailIdsArry[index];

      var mail = require("dataMgr").playerData.mails[mailId];

      var node = cc.instantiate(this.mailSectionPrefab);
      var unReadIconNode = node.getChildByName("icon_unread");
      var readedIconNode = node.getChildByName("icon_readed");
      var titleLabelNode = node.getChildByName("titleLabel");
      var seperateLineNode = node.getChildByName("seperateLine");

      if (mail.status == 1) {
        unReadIconNode.active = false;
        readedIconNode.active = true;
        titleLabelNode.color = this.mailSectionNodeReadedColor;
      }

      var titleStr = textConfig.getTextByIdAndLanguageType(mailConfig[mailId].titleTextId);
      titleLabelNode.getComponent(cc.Label).string = titleStr;
      seperateLineNode.y = -titleLabelNode.height;
      node.y = -totalHeight;
      var nodeWidth = titleLabelNode.x + titleLabelNode.width / 2 - (unReadIconNode.x - unReadIconNode.width / 2);
      var nodeHeight = titleLabelNode.height;
      node.width = nodeWidth;
      node.height = nodeHeight;
      node.name = mailId.toString();
      totalHeight = totalHeight + titleLabelNode.height + 2;

      if (index != mailIdsArry.length - 1) {
        totalHeight += this.mailSectionNodeDis;
      }

      var self = this;

      var bindFunction = function bindFunction(givenNode, givenMailId) {
        givenNode.on("click", function () {
          self.openOneMail(givenMailId, givenNode);
        });
      };

      bindFunction(node, mailId);
      this.mailSectionContentNode.addChild(node);
    }

    var minHeight = this.mailSectionContentNode.height;

    if (totalHeight > minHeight) {
      this.mailSectionContentNode.height = totalHeight;
    }
  },
  setupNotiSection: function setupNotiSection() {
    var textConfig = require("textConfig");

    var unReadMailNum = this.unReadedMailNums[this.selectedTag];

    if (unReadMailNum > 0) {
      var str = textConfig.getTextByIdAndLanguageType(129);
      this.notiSection.getChildByName("notiLabel").getComponent(cc.Label).string = str;
      return;
    }

    var mailConditionIndex = require("dataMgr").playerData.mailConditionIndex;

    var index = mailConditionIndex[this.selectedTag];

    if (index == -1) {
      this.notiSection.getChildByName("notiLabel").getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(130);
      return;
    }

    var mailSysConfig = require("mailSysConfig");

    var element = mailSysConfig[this.selectedTag].conditions[index];

    if (element.conditionType == 1) {
      var level = element.conditionPara;

      var result = this._getSectionAndLevelNumOfSection(level);

      if (result != false) {
        var section = result[0];
        var levelNumOfSection = result[1]; // var str  = "通关 " + section.toString() + " - " + levelNumOfSection.toString()
        // str = str + " ，会有新的邮件，加油吧少年！"
        // this.notiSection.getChildByName("notiLabel").getComponent(cc.Label).string = str

        var str = textConfig.getFormatedString(131, [section.toString(), levelNumOfSection.toString()]);
        this.notiSection.getChildByName("notiLabel").getComponent(cc.Label).string = str;
      }
    } else if (element.conditionType == 2) {
      //get minum step of one level
      var levelId = element.conditionPara.levelId;
      var minStepNum = element.conditionPara.minStepNum;

      var result = this._getSectionAndLevelNumOfSection(levelId);

      if (result != false) {
        var section = result[0];
        var level = result[1]; // var str = "在 " + section.toString() + " - " + level.toString()
        // str = str + " 用最多 " + minStepNum + " 步通关，会有新的邮件，加油吧少年！"

        var str = textConfig.getFormatedString(132, [section.toString(), level.toString(), minStepNum.toString()]);
        this.notiSection.getChildByName("notiLabel").getComponent(cc.Label).string = str;
      }
    }
  },
  _getSectionAndLevelNumOfSection: function _getSectionAndLevelNumOfSection(givenLevelId) {
    var section = null;
    var levelNumOfSection = null;

    var sectionConfig = require("sectionConfig");

    for (var key in sectionConfig) {
      var levels = sectionConfig[key].levels;
      var index = levels.indexOf(givenLevelId);

      if (index != -1) {
        section = key;
        levelNumOfSection = index + 1;
        return [section, levelNumOfSection];
      }
    }

    return false;
  },
  setupData: function setupData() {
    var mails = require("dataMgr").playerData.mails;

    this.tags = Object.keys(require("mailSysConfig"));

    for (var index in this.tags) {
      var oneTag = this.tags[index];
      this.mailsByTag[oneTag] = {};
      this.unReadedMailNums[oneTag] = 0;

      for (var key in mails) {
        var oneMail = mails[key];

        if (oneMail.tag == oneTag) {
          this.mailsByTag[oneTag][key] = oneMail;

          if (oneMail.stauts == 0) {
            this.unReadedMailNums[oneTag] += 1;
          }
        }
      }
    }
  },
  setupUI: function setupUI() {
    this.setupTagSection();
    this.setupMailSection();
    this.setupNotiSection();
  },
  _insertOneMail: function _insertOneMail(mailId, mail) {
    if (mail.tag == this.selectedTag) {
      this.setupMailSection();
      this.setupNotiSection();
    }
  },
  openOneMail: function openOneMail(givenMailId, givenNode) {
    var node = cc.instantiate(this.opendMailPrefab);
    var mgr = node.getComponent("mailSysMailMgr");
    mgr.mailId = givenMailId;
    mgr.relatedMailSectionNode = givenNode;
    mgr.relatedMailSysMgr = this;
    this.node.addChild(node);
  },
  setOneMailReaded: function setOneMailReaded(mailId, indexOfOptions) {
    var complete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    var relatedMailSectionNode = arguments.length > 3 ? arguments[3] : undefined;

    var mail = require("dataMgr").playerData.mails[mailId];

    if (mail.status == 1) {
      cc.log("this mail is already readed");
      return;
    }

    var networkMgr = require("networkMgr");

    var messageObj = networkMgr.makeMessageObj("mailModule", "readMailMessageType");
    messageObj.message.playerId = require("dataMgr").playerData.id;
    messageObj.message.mailId = mailId;
    messageObj.message.selectedOptionIndex = indexOfOptions;
    var self = this;

    messageObj.successCallBack = function (xhr) {
      var response = xhr.responseText;
      response = JSON.parse(response);

      if (response.type == "success") {
        mail.status = 1;
        mail.selectedOptionIndex = indexOfOptions;
        relatedMailSectionNode.getChildByName("icon_readed").active = true;
        relatedMailSectionNode.getChildByName("icon_unread").active = false;
        relatedMailSectionNode.getChildByName("titleLabel").color = self.mailSectionNodeReadedColor;
        self.unReadedMailNums[mail.tag] -= 1; //self.setupRedPoint()

        self.setupNotiSection();
        complete();
      }
    };

    networkMgr.sendMessageByMsgObj(messageObj);
  },
  dataMonitored: function dataMonitored(key, value) {
    var mailConfig = require("mailConfig");

    if (Object.keys(mailConfig).indexOf(key) != -1) {
      this.setupData();

      this._insertOneMail(key, value);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3N5c3RlbXMvbWFpbFN5cy9tYWlsU3lzTWdyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidWliZyIsIk5vZGUiLCJjbG9zZUJ1dHRvbk5vZGUiLCJ0YWdTZWN0aW9uIiwibWFpbFNlY3Rpb24iLCJub3RpU2VjdGlvbiIsIm1haWxTZWN0aW9uQ29udGVudE5vZGUiLCJtYWlsU2VjdGlvbkVtcHR5TGFiZWxOb2RlIiwibWFpbFNlY3Rpb25QcmVmYWIiLCJQcmVmYWIiLCJ0YWdTZWN0aW9uUHJlZmFiIiwic2VsZWN0ZWRUYWdFZmZlY3RQcmVmYWIiLCJvcGVuZE1haWxQcmVmYWIiLCJ0YWdzIiwibWFpbHNCeVRhZyIsInVuUmVhZGVkTWFpbE51bXMiLCJzZWxlY3RlZFRhZyIsImdldCIsIl9zZWxlY3RlZFRhZyIsInNldCIsInZhbHVlIiwic2V0dXBNYWlsU2VjdGlvbiIsInNldHVwTm90aVNlY3Rpb24iLCJzZWxlY3RlZFRhZ05vZGUiLCJfc2VsZWN0ZWRUYWdOb2RlIiwic2VsZWN0ZWRUYWdFZmZlY3QiLCJwYXJlbnQiLCJ4IiwieSIsImFkZENoaWxkIiwidGFyZ2V0WSIsInR3ZWVuIiwidG8iLCJzdGFydCIsIl9zZWxlY3RlZFRhZ0VmZmVjdCIsImVmZmVjdCIsImluc3RhbnRpYXRlIiwidGFnU2VjdGlvblN0YXJ0WSIsInRhZ1NlY3Rpb25EaXMiLCJtYWlsU2VjdGlvblN0YXJ0UG9zaXRpb24iLCJ2MiIsIm1haWxTZWN0aW9uTm9kZURpcyIsIm1haWxTZWN0aW9uTm9kZVJlYWRlZENvbG9yIiwiX21haWxTZWN0aW9uTm9kZVJlYWRlZENvbG9yIiwiY29sb3IiLCJzeXNOYW1lIiwib25Mb2FkIiwic2VsZiIsIm9uIiwicmVxdWlyZSIsImNsb3NlU3lzdGVtIiwic2V0dXBEYXRhIiwic2V0dXBVSSIsInNldHVwVGFnU2VjdGlvbiIsInRleHRDb25maWciLCJpbmRleCIsIm9uZVRhZyIsInRhZ05hbWUiLCJ0YWdOYW1lVGV4dElkIiwiZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciLCJfZm9yY2VVcGRhdGVSZW5kZXJEYXRhIiwiYmluZEZ1bmN0aW9uIiwiZ2l2ZW5Ob2RlIiwiZ2l2ZW5UYWciLCJyZWRQb2ludFNob3dDb25kaXRpb24iLCJtYWlscyIsInBsYXllckRhdGEiLCJ1blJlYWROdW0iLCJrZXkiLCJvbmVNYWlsIiwidGFnIiwic3RhdHVzIiwibmFtZSIsInRhZ01haWxzIiwibWFpbElkc0FycnkiLCJPYmplY3QiLCJrZXlzIiwiZGVzdHJveUFsbENoaWxkcmVuIiwibGVuZ3RoIiwiYWN0aXZlIiwiaGVpZ2h0Iiwic29ydEZ1bmN0aW9uIiwibWFpbElkMSIsIm1haWxJZDIiLCJtYWlsMSIsIm1haWwyIiwidGltZVN0YW1wMSIsInRpbWVTdGFtcCIsInRpbWVTdGFtcDIiLCJzb3J0IiwibWFpbENvbmZpZyIsInRvdGFsSGVpZ2h0IiwibWFpbElkIiwibWFpbCIsInVuUmVhZEljb25Ob2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJyZWFkZWRJY29uTm9kZSIsInRpdGxlTGFiZWxOb2RlIiwic2VwZXJhdGVMaW5lTm9kZSIsInRpdGxlU3RyIiwidGl0bGVUZXh0SWQiLCJub2RlV2lkdGgiLCJ3aWR0aCIsIm5vZGVIZWlnaHQiLCJ0b1N0cmluZyIsImdpdmVuTWFpbElkIiwib3Blbk9uZU1haWwiLCJtaW5IZWlnaHQiLCJ1blJlYWRNYWlsTnVtIiwic3RyIiwibWFpbENvbmRpdGlvbkluZGV4IiwibWFpbFN5c0NvbmZpZyIsImVsZW1lbnQiLCJjb25kaXRpb25zIiwiY29uZGl0aW9uVHlwZSIsImxldmVsIiwiY29uZGl0aW9uUGFyYSIsInJlc3VsdCIsIl9nZXRTZWN0aW9uQW5kTGV2ZWxOdW1PZlNlY3Rpb24iLCJzZWN0aW9uIiwibGV2ZWxOdW1PZlNlY3Rpb24iLCJnZXRGb3JtYXRlZFN0cmluZyIsImxldmVsSWQiLCJtaW5TdGVwTnVtIiwiZ2l2ZW5MZXZlbElkIiwic2VjdGlvbkNvbmZpZyIsImxldmVscyIsImluZGV4T2YiLCJzdGF1dHMiLCJfaW5zZXJ0T25lTWFpbCIsIm1nciIsInJlbGF0ZWRNYWlsU2VjdGlvbk5vZGUiLCJyZWxhdGVkTWFpbFN5c01nciIsInNldE9uZU1haWxSZWFkZWQiLCJpbmRleE9mT3B0aW9ucyIsImNvbXBsZXRlIiwibG9nIiwibmV0d29ya01nciIsIm1lc3NhZ2VPYmoiLCJtYWtlTWVzc2FnZU9iaiIsIm1lc3NhZ2UiLCJwbGF5ZXJJZCIsImlkIiwic2VsZWN0ZWRPcHRpb25JbmRleCIsInN1Y2Nlc3NDYWxsQmFjayIsInhociIsInJlc3BvbnNlIiwicmVzcG9uc2VUZXh0IiwiSlNPTiIsInBhcnNlIiwidHlwZSIsInNlbmRNZXNzYWdlQnlNc2dPYmoiLCJkYXRhTW9uaXRvcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsSUFBSSxFQUFFSixFQUFFLENBQUNLLElBaEJEO0FBaUJSQyxJQUFBQSxlQUFlLEVBQUVOLEVBQUUsQ0FBQ0ssSUFqQlo7QUFrQlJFLElBQUFBLFVBQVUsRUFBRVAsRUFBRSxDQUFDSyxJQWxCUDtBQW1CUkcsSUFBQUEsV0FBVyxFQUFFUixFQUFFLENBQUNLLElBbkJSO0FBb0JSSSxJQUFBQSxXQUFXLEVBQUVULEVBQUUsQ0FBQ0ssSUFwQlI7QUFxQlJLLElBQUFBLHNCQUFzQixFQUFFVixFQUFFLENBQUNLLElBckJuQjtBQXNCUk0sSUFBQUEseUJBQXlCLEVBQUVYLEVB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QUFpQixTQUFyQixFQUFnQztBQUM1QnpELFFBQUFBLElBQUksQ0FBQ3RCLE1BQUwsR0FBYyxDQUFkO0FBQ0FzQixRQUFBQSxJQUFJLENBQUNrRCxtQkFBTCxHQUEyQlQsY0FBM0I7QUFDQUgsUUFBQUEsc0JBQXNCLENBQUNwQyxjQUF2QixDQUFzQyxhQUF0QyxFQUFxRGhCLE1BQXJELEdBQThELElBQTlEO0FBQ0FvRCxRQUFBQSxzQkFBc0IsQ0FBQ3BDLGNBQXZCLENBQXNDLGFBQXRDLEVBQXFEaEIsTUFBckQsR0FBOEQsS0FBOUQ7QUFDQW9ELFFBQUFBLHNCQUFzQixDQUFDcEMsY0FBdkIsQ0FBc0MsWUFBdEMsRUFBb0R2RCxLQUFwRCxHQUE0REcsSUFBSSxDQUFDTCwwQkFBakU7QUFDQUssUUFBQUEsSUFBSSxDQUFDaEMsZ0JBQUwsQ0FBc0JrRixJQUFJLENBQUN2QixHQUEzQixLQUFtQyxDQUFuQyxDQU40QixDQU81Qjs7QUFDQTNCLFFBQUFBLElBQUksQ0FBQ3pCLGdCQUFMO0FBQ0FxSCxRQUFBQSxRQUFRO0FBQ1g7QUFDSixLQWREOztBQWVBRSxJQUFBQSxVQUFVLENBQUNjLG1CQUFYLENBQStCYixVQUEvQjtBQUNILEdBM1hJO0FBNlhMYyxFQUFBQSxhQTdYSyx5QkE2WFNwRixHQTdYVCxFQTZYYXBELEtBN1hiLEVBNlhvQjtBQUNyQixRQUFJMEUsVUFBVSxHQUFHN0MsT0FBTyxDQUFDLFlBQUQsQ0FBeEI7O0FBQ0EsUUFBSThCLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZYyxVQUFaLEVBQXdCcUMsT0FBeEIsQ0FBZ0MzRCxHQUFoQyxLQUF3QyxDQUFDLENBQTdDLEVBQWdEO0FBQzVDLFdBQUtyQixTQUFMOztBQUNBLFdBQUtrRixjQUFMLENBQW9CN0QsR0FBcEIsRUFBd0JwRCxLQUF4QjtBQUNIO0FBQ0osR0FuWUksQ0FvWUw7O0FBcFlLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICAgICAgdWliZzogY2MuTm9kZSxcbiAgICAgICAgY2xvc2VCdXR0b25Ob2RlOiBjYy5Ob2RlLFxuICAgICAgICB0YWdTZWN0aW9uOiBjYy5Ob2RlLFxuICAgICAgICBtYWlsU2VjdGlvbjogY2MuTm9kZSxcbiAgICAgICAgbm90aVNlY3Rpb246IGNjLk5vZGUsXG4gICAgICAgIG1haWxTZWN0aW9uQ29udGVudE5vZGU6IGNjLk5vZGUsXG4gICAgICAgIG1haWxTZWN0aW9uRW1wdHlMYWJlbE5vZGU6IGNjLk5vZGUsXG5cbiAgICAgICAgbWFpbFNlY3Rpb25QcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgdGFnU2VjdGlvblByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBzZWxlY3RlZFRhZ0VmZmVjdFByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBvcGVuZE1haWxQcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgdGFnczogbnVsbCxcbiAgICAgICAgbWFpbHNCeVRhZzoge1xuICAgICAgICAgICAgZGVmYXVsdDoge31cbiAgICAgICAgfSxcblxuICAgICAgICB1blJlYWRlZE1haWxOdW1zOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiB7fVxuICAgICAgICB9LFxuXG4gICAgICAgIHNlbGVjdGVkVGFnOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkVGFnXG4gICAgICAgICAgICB9LCBcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkVGFnID0gdmFsdWVcbiAgICAgICAgICAgICAgICB0aGlzLnNldHVwTWFpbFNlY3Rpb24oKVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBOb3RpU2VjdGlvbigpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNlbGVjdGVkVGFnTm9kZToge1xuICAgICAgICAgICAgZ2V0KCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkVGFnTm9kZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkVGFnTm9kZSA9IHZhbHVlXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUYWdFZmZlY3QucGFyZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRhZ0VmZmVjdC54ID0gdGhpcy5zZWxlY3RlZFRhZ05vZGUueFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFnRWZmZWN0LnkgPSB0aGlzLnNlbGVjdGVkVGFnTm9kZS55XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFnU2VjdGlvbi5hZGRDaGlsZCh0aGlzLnNlbGVjdGVkVGFnRWZmZWN0LDApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0WSA9IHRoaXMuc2VsZWN0ZWRUYWdOb2RlLnlcbiAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5zZWxlY3RlZFRhZ0VmZmVjdClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50bygwLjEse3k6IHRhcmdldFl9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNlbGVjdGVkVGFnRWZmZWN0OiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkVGFnRWZmZWN0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVmZmVjdCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2VsZWN0ZWRUYWdFZmZlY3RQcmVmYWIpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkVGFnRWZmZWN0ID0gZWZmZWN0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZFRhZ0VmZmVjdFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkVGFnRWZmZWN0ID0gdmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGFnU2VjdGlvblN0YXJ0WTogLTg2LjM0NSxcbiAgICAgICAgdGFnU2VjdGlvbkRpczogMTIwLFxuXG5cbiAgICAgICAgbWFpbFNlY3Rpb25TdGFydFBvc2l0aW9uOiBjYy52MigtMTI1Ljc4OCwzNzMuMzU2KSxcbiAgICAgICAgbWFpbFNlY3Rpb25Ob2RlRGlzOiAzMixcbiAgICAgICAgbWFpbFNlY3Rpb25Ob2RlUmVhZGVkQ29sb3I6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFpbFNlY3Rpb25Ob2RlUmVhZGVkQ29sb3IgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYWlsU2VjdGlvbk5vZGVSZWFkZWRDb2xvciA9IGNjLmNvbG9yKDEwMiwxMDIsMTAyKVxuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21haWxTZWN0aW9uTm9kZVJlYWRlZENvbG9yXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFpbFNlY3Rpb25Ob2RlUmVhZGVkQ29sb3IgPSB2YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHN5c05hbWU6IFwibWFpbFN5c1wiXG4gICAgICAgIFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uTm9kZS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJlcXVpcmUoXCJzeXN0ZW1zTWdyXCIpLmNsb3NlU3lzdGVtKHNlbGYuc3lzTmFtZSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy51aWJnLm9uKFwidG91Y2hzdGFydFwiLGZ1bmN0aW9uKCl7fSlcbiAgICAgICAgdGhpcy5zZXR1cERhdGEoKVxuICAgICAgICB0aGlzLnNldHVwVUkoKVxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9LFxuXG4gICAgc2V0dXBUYWdTZWN0aW9uKCkge1xuICAgICAgICB2YXIgdGV4dENvbmZpZyA9IHJlcXVpcmUoXCJ0ZXh0Q29uZmlnXCIpXG4gICAgICAgIGZvciAodmFyIGluZGV4IGluIHRoaXMudGFncykge1xuICAgICAgICAgICAgdmFyIG9uZVRhZyA9IHRoaXMudGFnc1tpbmRleF1cbiAgICAgICAgICAgIHZhciB0YWdOYW1lID0gcmVxdWlyZShcIm1haWxTeXNDb25maWdcIilbb25lVGFnXS50YWdOYW1lVGV4dElkXG4gICAgICAgICAgICB0YWdOYW1lID0gdGV4dENvbmZpZy5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSh0YWdOYW1lKVxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRhZ1NlY3Rpb25QcmVmYWIpXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGFnTmFtZVxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLl9mb3JjZVVwZGF0ZVJlbmRlckRhdGEoKVxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgICAgICB2YXIgYmluZEZ1bmN0aW9uID0gZnVuY3Rpb24oZ2l2ZW5Ob2RlLCBnaXZlblRhZykge1xuICAgICAgICAgICAgICAgIGdpdmVuTm9kZS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWRUYWcgIT0gZ2l2ZW5UYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRUYWcgPSBnaXZlblRhZ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnNlbGVjdGVkVGFnTm9kZSAhPSBnaXZlbk5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRUYWdOb2RlID0gZ2l2ZW5Ob2RlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGdpdmVuTm9kZS5nZXRDb21wb25lbnQoXCJyZWRQb2ludE1nclwiKS5yZWRQb2ludFNob3dDb25kaXRpb24gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWFpbHMgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLm1haWxzXG4gICAgICAgICAgICAgICAgICAgIHZhciB1blJlYWROdW0gPSAwXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBtYWlscykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9uZU1haWwgPSBtYWlsc1trZXldXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25lTWFpbC50YWcgPT0gZ2l2ZW5UYWcgJiYgb25lTWFpbC5zdGF0dXMgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuUmVhZE51bSArPSAxXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVuUmVhZE51bSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJpbmRGdW5jdGlvbihub2RlLG9uZVRhZylcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbm9kZS55ID0gdGhpcy50YWdTZWN0aW9uU3RhcnRZIC0gaW5kZXggKiB0aGlzLnRhZ1NlY3Rpb25EaXNcbiAgICAgICAgICAgIG5vZGUubmFtZSA9IG9uZVRhZ1xuICAgICAgICAgICAgdGhpcy50YWdTZWN0aW9uLmFkZENoaWxkKG5vZGUsMSlcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRhZyA9IG9uZVRhZ1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWdOb2RlID0gbm9kZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldHVwTWFpbFNlY3Rpb24oKSB7XG4gICAgICAgIHZhciB0ZXh0Q29uZmlnID0gcmVxdWlyZShcInRleHRDb25maWdcIilcbiAgICAgICAgdmFyIHRhZ01haWxzID0gdGhpcy5tYWlsc0J5VGFnW3RoaXMuc2VsZWN0ZWRUYWddXG4gICAgICAgIHZhciBtYWlsSWRzQXJyeSA9IE9iamVjdC5rZXlzKHRhZ01haWxzKVxuICAgICAgICB0aGlzLm1haWxTZWN0aW9uQ29udGVudE5vZGUuZGVzdHJveUFsbENoaWxkcmVuKClcbiAgICAgICAgaWYgKG1haWxJZHNBcnJ5Lmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1haWxTZWN0aW9uRW1wdHlMYWJlbE5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgdGhpcy5tYWlsU2VjdGlvbkVtcHR5TGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGV4dENvbmZpZy5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxNDYpXG4gICAgICAgICAgICB0aGlzLm1haWxTZWN0aW9uQ29udGVudE5vZGUuaGVpZ2h0ID0gMFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMubWFpbFNlY3Rpb25FbXB0eUxhYmVsTm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgdmFyIHNvcnRGdW5jdGlvbiA9IGZ1bmN0aW9uKG1haWxJZDEsIG1haWxJZDIpIHtcbiAgICAgICAgICAgIHZhciBtYWlsMSA9IHNlbGYubWFpbHNCeVRhZ1tzZWxmLnNlbGVjdGVkVGFnXVttYWlsSWQxXVxuICAgICAgICAgICAgdmFyIG1haWwyID0gc2VsZi5tYWlsc0J5VGFnW3NlbGYuc2VsZWN0ZWRUYWddW21haWxJZDJdXG4gICAgICAgICAgICBpZiAobWFpbDEuc3RhdHVzID09IDAgJiYgbWFpbDIuc3RhdHVzID09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG1haWwxLnN0YXR1cyA9PSAxICYmIG1haWwyLnN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciB0aW1lU3RhbXAxID0gbWFpbDEudGltZVN0YW1wXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVTdGFtcDIgPSBtYWlsMi50aW1lU3RhbXBcbiAgICAgICAgICAgICAgICBpZiAodGltZVN0YW1wMSA8IHRpbWVTdGFtcDIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtYWlsSWRzQXJyeSA9IG1haWxJZHNBcnJ5LnNvcnQoc29ydEZ1bmN0aW9uKVxuICAgICAgICB2YXIgbWFpbENvbmZpZyA9IHJlcXVpcmUoXCJtYWlsQ29uZmlnXCIpXG4gICAgICAgIHZhciB0b3RhbEhlaWdodCA9IDBcbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gbWFpbElkc0FycnkpIHtcbiAgICAgICAgICAgIHZhciBtYWlsSWQgPSBtYWlsSWRzQXJyeVtpbmRleF1cbiAgICAgICAgICAgIHZhciBtYWlsID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5tYWlsc1ttYWlsSWRdXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubWFpbFNlY3Rpb25QcmVmYWIpXG4gICAgICAgICAgICB2YXIgdW5SZWFkSWNvbk5vZGUgPSBub2RlLmdldENoaWxkQnlOYW1lKFwiaWNvbl91bnJlYWRcIilcbiAgICAgICAgICAgIHZhciByZWFkZWRJY29uTm9kZSA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpY29uX3JlYWRlZFwiKVxuICAgICAgICAgICAgdmFyIHRpdGxlTGFiZWxOb2RlID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcInRpdGxlTGFiZWxcIilcbiAgICAgICAgICAgIHZhciBzZXBlcmF0ZUxpbmVOb2RlID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcInNlcGVyYXRlTGluZVwiKVxuXG4gICAgICAgICAgICBpZiAobWFpbC5zdGF0dXMgPT0gMSkge1xuICAgICAgICAgICAgICAgIHVuUmVhZEljb25Ob2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgcmVhZGVkSWNvbk5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHRpdGxlTGFiZWxOb2RlLmNvbG9yID0gdGhpcy5tYWlsU2VjdGlvbk5vZGVSZWFkZWRDb2xvclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRpdGxlU3RyID0gdGV4dENvbmZpZy5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZShtYWlsQ29uZmlnW21haWxJZF0udGl0bGVUZXh0SWQpXG4gICAgICAgICAgICB0aXRsZUxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRpdGxlU3RyXG4gICAgICAgICAgICBzZXBlcmF0ZUxpbmVOb2RlLnkgPSAtdGl0bGVMYWJlbE5vZGUuaGVpZ2h0XG4gICAgICAgICAgICBub2RlLnkgPSAtdG90YWxIZWlnaHRcbiAgICAgICAgICAgIHZhciBub2RlV2lkdGggPSB0aXRsZUxhYmVsTm9kZS54ICsgdGl0bGVMYWJlbE5vZGUud2lkdGggLyAyIC0gKHVuUmVhZEljb25Ob2RlLnggLSB1blJlYWRJY29uTm9kZS53aWR0aCAvIDIpXG4gICAgICAgICAgICB2YXIgbm9kZUhlaWdodCA9IHRpdGxlTGFiZWxOb2RlLmhlaWdodFxuICAgICAgICAgICAgbm9kZS53aWR0aCA9IG5vZGVXaWR0aFxuICAgICAgICAgICAgbm9kZS5oZWlnaHQgPSBub2RlSGVpZ2h0XG4gICAgICAgICAgICBub2RlLm5hbWUgPSBtYWlsSWQudG9TdHJpbmcoKVxuICAgICAgICAgICAgdG90YWxIZWlnaHQgPSB0b3RhbEhlaWdodCArIHRpdGxlTGFiZWxOb2RlLmhlaWdodCArIDJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSBtYWlsSWRzQXJyeS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgdG90YWxIZWlnaHQgKz0gdGhpcy5tYWlsU2VjdGlvbk5vZGVEaXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICAgICAgdmFyIGJpbmRGdW5jdGlvbiA9IGZ1bmN0aW9uKGdpdmVuTm9kZSwgZ2l2ZW5NYWlsSWQpIHtcbiAgICAgICAgICAgICAgICBnaXZlbk5vZGUub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYub3Blbk9uZU1haWwoZ2l2ZW5NYWlsSWQsZ2l2ZW5Ob2RlKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiaW5kRnVuY3Rpb24obm9kZSxtYWlsSWQpXG4gICAgICAgICAgICB0aGlzLm1haWxTZWN0aW9uQ29udGVudE5vZGUuYWRkQ2hpbGQobm9kZSlcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWluSGVpZ2h0ID0gdGhpcy5tYWlsU2VjdGlvbkNvbnRlbnROb2RlLmhlaWdodFxuICAgICAgICBpZiAodG90YWxIZWlnaHQgPiBtaW5IZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMubWFpbFNlY3Rpb25Db250ZW50Tm9kZS5oZWlnaHQgPSB0b3RhbEhlaWdodFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldHVwTm90aVNlY3Rpb24oKSB7XG4gICAgICAgIHZhciB0ZXh0Q29uZmlnID0gcmVxdWlyZShcInRleHRDb25maWdcIilcbiAgICAgICAgdmFyIHVuUmVhZE1haWxOdW0gPSB0aGlzLnVuUmVhZGVkTWFpbE51bXNbdGhpcy5zZWxlY3RlZFRhZ11cbiAgICAgICAgaWYgKHVuUmVhZE1haWxOdW0gPiAwKSB7XG4gICAgICAgICAgICB2YXIgc3RyID0gdGV4dENvbmZpZy5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxMjkpXG4gICAgICAgICAgICB0aGlzLm5vdGlTZWN0aW9uLmdldENoaWxkQnlOYW1lKFwibm90aUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc3RyXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIG1haWxDb25kaXRpb25JbmRleCA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEubWFpbENvbmRpdGlvbkluZGV4XG4gICAgICAgIHZhciBpbmRleCA9IG1haWxDb25kaXRpb25JbmRleFt0aGlzLnNlbGVjdGVkVGFnXVxuICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMubm90aVNlY3Rpb24uZ2V0Q2hpbGRCeU5hbWUoXCJub3RpTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDEzMClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHZhciBtYWlsU3lzQ29uZmlnID0gcmVxdWlyZShcIm1haWxTeXNDb25maWdcIilcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBtYWlsU3lzQ29uZmlnW3RoaXMuc2VsZWN0ZWRUYWddLmNvbmRpdGlvbnNbaW5kZXhdXG5cbiAgICAgICAgaWYgKGVsZW1lbnQuY29uZGl0aW9uVHlwZSA9PSAxKSB7XG4gICAgICAgICAgICB2YXIgbGV2ZWwgPSBlbGVtZW50LmNvbmRpdGlvblBhcmFcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9nZXRTZWN0aW9uQW5kTGV2ZWxOdW1PZlNlY3Rpb24obGV2ZWwpXG4gICAgICAgICAgICBpZiAocmVzdWx0ICE9IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlY3Rpb24gPSByZXN1bHRbMF1cbiAgICAgICAgICAgICAgICB2YXIgbGV2ZWxOdW1PZlNlY3Rpb24gPSByZXN1bHRbMV1cbiAgICAgICAgICAgICAgICAvLyB2YXIgc3RyICA9IFwi6YCa5YWzIFwiICsgc2VjdGlvbi50b1N0cmluZygpICsgXCIgLSBcIiArIGxldmVsTnVtT2ZTZWN0aW9uLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAvLyBzdHIgPSBzdHIgKyBcIiDvvIzkvJrmnInmlrDnmoTpgq7ku7bvvIzliqDmsrnlkKflsJHlubTvvIFcIlxuICAgICAgICAgICAgICAgIC8vIHRoaXMubm90aVNlY3Rpb24uZ2V0Q2hpbGRCeU5hbWUoXCJub3RpTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzdHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyID0gdGV4dENvbmZpZy5nZXRGb3JtYXRlZFN0cmluZygxMzEsW3NlY3Rpb24udG9TdHJpbmcoKSxsZXZlbE51bU9mU2VjdGlvbi50b1N0cmluZygpXSlcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlTZWN0aW9uLmdldENoaWxkQnlOYW1lKFwibm90aUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc3RyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmIChlbGVtZW50LmNvbmRpdGlvblR5cGUgPT0gMikge1xuICAgICAgICAgICAgLy9nZXQgbWludW0gc3RlcCBvZiBvbmUgbGV2ZWxcbiAgICAgICAgICAgIHZhciBsZXZlbElkID0gZWxlbWVudC5jb25kaXRpb25QYXJhLmxldmVsSWRcbiAgICAgICAgICAgIHZhciBtaW5TdGVwTnVtID0gZWxlbWVudC5jb25kaXRpb25QYXJhLm1pblN0ZXBOdW1cblxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX2dldFNlY3Rpb25BbmRMZXZlbE51bU9mU2VjdGlvbihsZXZlbElkKVxuICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWN0aW9uID0gcmVzdWx0WzBdXG4gICAgICAgICAgICAgICAgdmFyIGxldmVsID0gcmVzdWx0WzFdXG5cbiAgICAgICAgICAgICAgICAvLyB2YXIgc3RyID0gXCLlnKggXCIgKyBzZWN0aW9uLnRvU3RyaW5nKCkgKyBcIiAtIFwiICsgbGV2ZWwudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIC8vIHN0ciA9IHN0ciArIFwiIOeUqOacgOWkmiBcIiArIG1pblN0ZXBOdW0gKyBcIiDmraXpgJrlhbPvvIzkvJrmnInmlrDnmoTpgq7ku7bvvIzliqDmsrnlkKflsJHlubTvvIFcIlxuICAgICAgICAgICAgICAgIHZhciBzdHIgPSB0ZXh0Q29uZmlnLmdldEZvcm1hdGVkU3RyaW5nKDEzMixbc2VjdGlvbi50b1N0cmluZygpLCBsZXZlbC50b1N0cmluZygpLCBtaW5TdGVwTnVtLnRvU3RyaW5nKCldKVxuICAgICAgICAgICAgICAgIHRoaXMubm90aVNlY3Rpb24uZ2V0Q2hpbGRCeU5hbWUoXCJub3RpTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzdHJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgX2dldFNlY3Rpb25BbmRMZXZlbE51bU9mU2VjdGlvbihnaXZlbkxldmVsSWQpIHtcbiAgICAgICAgdmFyIHNlY3Rpb24gPSBudWxsXG4gICAgICAgIHZhciBsZXZlbE51bU9mU2VjdGlvbiA9IG51bGxcbiAgICAgICAgdmFyIHNlY3Rpb25Db25maWcgPSByZXF1aXJlKFwic2VjdGlvbkNvbmZpZ1wiKVxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc2VjdGlvbkNvbmZpZykge1xuICAgICAgICAgICAgdmFyIGxldmVscyA9IHNlY3Rpb25Db25maWdba2V5XS5sZXZlbHNcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGxldmVscy5pbmRleE9mKGdpdmVuTGV2ZWxJZClcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgICAgIHNlY3Rpb24gPSBrZXlcbiAgICAgICAgICAgICAgICBsZXZlbE51bU9mU2VjdGlvbiA9IGluZGV4ICsgMVxuICAgICAgICAgICAgICAgIHJldHVybiBbc2VjdGlvbiwgbGV2ZWxOdW1PZlNlY3Rpb25dXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSxcblxuICAgIHNldHVwRGF0YSgpIHtcbiAgICAgICAgdmFyIG1haWxzID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5tYWlsc1xuICAgICAgICB0aGlzLnRhZ3MgPSBPYmplY3Qua2V5cyhyZXF1aXJlKFwibWFpbFN5c0NvbmZpZ1wiKSlcbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gdGhpcy50YWdzKSB7XG4gICAgICAgICAgICB2YXIgb25lVGFnID0gdGhpcy50YWdzW2luZGV4XVxuICAgICAgICAgICAgdGhpcy5tYWlsc0J5VGFnW29uZVRhZ10gPSB7fVxuICAgICAgICAgICAgdGhpcy51blJlYWRlZE1haWxOdW1zW29uZVRhZ10gPSAwXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gbWFpbHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgb25lTWFpbCA9IG1haWxzW2tleV1cbiAgICAgICAgICAgICAgICBpZiAob25lTWFpbC50YWcgPT0gb25lVGFnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFpbHNCeVRhZ1tvbmVUYWddW2tleV0gPSBvbmVNYWlsXG4gICAgICAgICAgICAgICAgICAgIGlmIChvbmVNYWlsLnN0YXV0cyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuUmVhZGVkTWFpbE51bXNbb25lVGFnXSArPSAxXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0dXBVSSgpIHtcbiAgICAgICAgdGhpcy5zZXR1cFRhZ1NlY3Rpb24oKVxuICAgICAgICB0aGlzLnNldHVwTWFpbFNlY3Rpb24oKVxuICAgICAgICB0aGlzLnNldHVwTm90aVNlY3Rpb24oKVxuICAgIH0sXG5cbiAgICBfaW5zZXJ0T25lTWFpbChtYWlsSWQsIG1haWwpe1xuICAgICAgICBpZiAobWFpbC50YWcgPT0gdGhpcy5zZWxlY3RlZFRhZykge1xuICAgICAgICAgICAgdGhpcy5zZXR1cE1haWxTZWN0aW9uKClcbiAgICAgICAgICAgIHRoaXMuc2V0dXBOb3RpU2VjdGlvbigpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb3Blbk9uZU1haWwoZ2l2ZW5NYWlsSWQsZ2l2ZW5Ob2RlKSB7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5vcGVuZE1haWxQcmVmYWIpXG4gICAgICAgIHZhciBtZ3IgPSBub2RlLmdldENvbXBvbmVudChcIm1haWxTeXNNYWlsTWdyXCIpXG4gICAgICAgIG1nci5tYWlsSWQgPSBnaXZlbk1haWxJZFxuICAgICAgICBtZ3IucmVsYXRlZE1haWxTZWN0aW9uTm9kZSA9IGdpdmVuTm9kZVxuICAgICAgICBtZ3IucmVsYXRlZE1haWxTeXNNZ3IgPSB0aGlzXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKVxuICAgIH0sXG4gICAgc2V0T25lTWFpbFJlYWRlZChtYWlsSWQsaW5kZXhPZk9wdGlvbnMsIGNvbXBsZXRlID0gZnVuY3Rpb24oKXt9LHJlbGF0ZWRNYWlsU2VjdGlvbk5vZGUpIHtcbiAgICAgICAgdmFyIG1haWwgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLm1haWxzW21haWxJZF1cbiAgICAgICAgaWYgKG1haWwuc3RhdHVzID09IDEpIHtcbiAgICAgICAgICAgIGNjLmxvZyhcInRoaXMgbWFpbCBpcyBhbHJlYWR5IHJlYWRlZFwiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ldHdvcmtNZ3IgPSByZXF1aXJlKFwibmV0d29ya01nclwiKVxuICAgICAgICB2YXIgbWVzc2FnZU9iaiA9IG5ldHdvcmtNZ3IubWFrZU1lc3NhZ2VPYmooXCJtYWlsTW9kdWxlXCIsXCJyZWFkTWFpbE1lc3NhZ2VUeXBlXCIpXG4gICAgICAgIG1lc3NhZ2VPYmoubWVzc2FnZS5wbGF5ZXJJZCA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuaWRcbiAgICAgICAgbWVzc2FnZU9iai5tZXNzYWdlLm1haWxJZCA9IG1haWxJZFxuICAgICAgICBtZXNzYWdlT2JqLm1lc3NhZ2Uuc2VsZWN0ZWRPcHRpb25JbmRleCA9IGluZGV4T2ZPcHRpb25zXG4gICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICBtZXNzYWdlT2JqLnN1Y2Nlc3NDYWxsQmFjayA9IGZ1bmN0aW9uKHhocikge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlc3BvbnNlKVxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnR5cGUgPT0gXCJzdWNjZXNzXCIpIHtcbiAgICAgICAgICAgICAgICBtYWlsLnN0YXR1cyA9IDFcbiAgICAgICAgICAgICAgICBtYWlsLnNlbGVjdGVkT3B0aW9uSW5kZXggPSBpbmRleE9mT3B0aW9uc1xuICAgICAgICAgICAgICAgIHJlbGF0ZWRNYWlsU2VjdGlvbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpY29uX3JlYWRlZFwiKS5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgcmVsYXRlZE1haWxTZWN0aW9uTm9kZS5nZXRDaGlsZEJ5TmFtZShcImljb25fdW5yZWFkXCIpLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgcmVsYXRlZE1haWxTZWN0aW9uTm9kZS5nZXRDaGlsZEJ5TmFtZShcInRpdGxlTGFiZWxcIikuY29sb3IgPSBzZWxmLm1haWxTZWN0aW9uTm9kZVJlYWRlZENvbG9yXG4gICAgICAgICAgICAgICAgc2VsZi51blJlYWRlZE1haWxOdW1zW21haWwudGFnXSAtPSAxXG4gICAgICAgICAgICAgICAgLy9zZWxmLnNldHVwUmVkUG9pbnQoKVxuICAgICAgICAgICAgICAgIHNlbGYuc2V0dXBOb3RpU2VjdGlvbigpXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG5ldHdvcmtNZ3Iuc2VuZE1lc3NhZ2VCeU1zZ09iaihtZXNzYWdlT2JqKVxuICAgIH0sXG5cbiAgICBkYXRhTW9uaXRvcmVkKGtleSx2YWx1ZSkge1xuICAgICAgICB2YXIgbWFpbENvbmZpZyA9IHJlcXVpcmUoXCJtYWlsQ29uZmlnXCIpXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhtYWlsQ29uZmlnKS5pbmRleE9mKGtleSkgIT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0dXBEYXRhKClcbiAgICAgICAgICAgIHRoaXMuX2luc2VydE9uZU1haWwoa2V5LHZhbHVlKVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=