
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3N5c3RlbXMvbWFpbFN5cy9tYWlsU3lzTWdyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidWliZyIsIk5vZGUiLCJjbG9zZUJ1dHRvbk5vZGUiLCJ0YWdTZWN0aW9uIiwibWFpbFNlY3Rpb24iLCJub3RpU2VjdGlvbiIsIm1haWxTZWN0aW9uQ29udGVudE5vZGUiLCJtYWlsU2VjdGlvbkVtcHR5TGFiZWxOb2RlIiwibWFpbFNlY3Rpb25QcmVmYWIiLCJQcmVmYWIiLCJ0YWdTZWN0aW9uUHJlZmFiIiwic2VsZWN0ZWRUYWdFZmZlY3RQcmVmYWIiLCJvcGVuZE1haWxQcmVmYWIiLCJ0YWdzIiwibWFpbHNCeVRhZyIsInVuUmVhZGVkTWFpbE51bXMiLCJzZWxlY3RlZFRhZyIsImdldCIsIl9zZWxlY3RlZFRhZyIsInNldCIsInZhbHVlIiwic2V0dXBNYWlsU2VjdGlvbiIsInNldHVwTm90aVNlY3Rpb24iLCJzZWxlY3RlZFRhZ05vZGUiLCJfc2VsZWN0ZWRUYWdOb2RlIiwic2VsZWN0ZWRUYWdFZmZlY3QiLCJwYXJlbnQiLCJ4IiwieSIsImFkZENoaWxkIiwidGFyZ2V0WSIsInR3ZWVuIiwidG8iLCJzdGFydCIsIl9zZWxlY3RlZFRhZ0VmZmVjdCIsImVmZmVjdCIsImluc3RhbnRpYXRlIiwidGFnU2VjdGlvblN0YXJ0WSIsInRhZ1NlY3Rpb25EaXMiLCJtYWlsU2VjdGlvblN0YXJ0UG9zaXRpb24iLCJ2MiIsIm1haWxTZWN0aW9uTm9kZURpcyIsIm1haWxTZWN0aW9uTm9kZVJlYWRlZENvbG9yIiwiX21haWxTZWN0aW9uTm9kZVJlYWRlZENvbG9yIiwiY29sb3IiLCJzeXNOYW1lIiwib25Mb2FkIiwic2VsZiIsIm9uIiwicmVxdWlyZSIsImNsb3NlU3lzdGVtIiwic2V0dXBEYXRhIiwic2V0dXBVSSIsInNldHVwVGFnU2VjdGlvbiIsInRleHRDb25maWciLCJpbmRleCIsIm9uZVRhZyIsInRhZ05hbWUiLCJ0YWdOYW1lVGV4dElkIiwiZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciLCJfZm9yY2VVcGRhdGVSZW5kZXJEYXRhIiwiYmluZEZ1bmN0aW9uIiwiZ2l2ZW5Ob2RlIiwiZ2l2ZW5UYWciLCJyZWRQb2ludFNob3dDb25kaXRpb24iLCJtYWlscyIsInBsYXllckRhdGEiLCJ1blJlYWROdW0iLCJrZXkiLCJvbmVNYWlsIiwidGFnIiwic3RhdHVzIiwibmFtZSIsInRhZ01haWxzIiwibWFpbElkc0FycnkiLCJPYmplY3QiLCJrZXlzIiwiZGVzdHJveUFsbENoaWxkcmVuIiwibGVuZ3RoIiwiYWN0aXZlIiwiaGVpZ2h0Iiwic29ydEZ1bmN0aW9uIiwibWFpbElkMSIsIm1haWxJZDIiLCJtYWlsMSIsIm1haWwyIiwidGltZVN0YW1wMSIsInRpbWVTdGFtcCIsInRpbWVTdGFtcDIiLCJzb3J0IiwibWFpbENvbmZpZyIsInRvdGFsSGVpZ2h0IiwibWFpbElkIiwibWFpbCIsInVuUmVhZEljb25Ob2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJyZWFkZWRJY29uTm9kZSIsInRpdGxlTGFiZWxOb2RlIiwic2VwZXJhdGVMaW5lTm9kZSIsInRpdGxlU3RyIiwidGl0bGVUZXh0SWQiLCJub2RlV2lkdGgiLCJ3aWR0aCIsIm5vZGVIZWlnaHQiLCJ0b1N0cmluZyIsImdpdmVuTWFpbElkIiwib3Blbk9uZU1haWwiLCJtaW5IZWlnaHQiLCJ1blJlYWRNYWlsTnVtIiwic3RyIiwibWFpbENvbmRpdGlvbkluZGV4IiwibWFpbFN5c0NvbmZpZyIsImVsZW1lbnQiLCJjb25kaXRpb25zIiwiY29uZGl0aW9uVHlwZSIsImxldmVsIiwiY29uZGl0aW9uUGFyYSIsInJlc3VsdCIsIl9nZXRTZWN0aW9uQW5kTGV2ZWxOdW1PZlNlY3Rpb24iLCJzZWN0aW9uIiwibGV2ZWxOdW1PZlNlY3Rpb24iLCJnZXRGb3JtYXRlZFN0cmluZyIsImxldmVsSWQiLCJtaW5TdGVwTnVtIiwiZ2l2ZW5MZXZlbElkIiwic2VjdGlvbkNvbmZpZyIsImxldmVscyIsImluZGV4T2YiLCJzdGF1dHMiLCJfaW5zZXJ0T25lTWFpbCIsIm1nciIsInJlbGF0ZWRNYWlsU2VjdGlvbk5vZGUiLCJyZWxhdGVkTWFpbFN5c01nciIsInNldE9uZU1haWxSZWFkZWQiLCJpbmRleE9mT3B0aW9ucyIsImNvbXBsZXRlIiwibG9nIiwibmV0d29ya01nciIsIm1lc3NhZ2VPYmoiLCJtYWtlTWVzc2FnZU9iaiIsIm1lc3NhZ2UiLCJwbGF5ZXJJZCIsImlkIiwic2VsZWN0ZWRPcHRpb25JbmRleCIsInN1Y2Nlc3NDYWxsQmFjayIsInhociIsInJlc3BvbnNlIiwicmVzcG9uc2VUZXh0IiwiSlNPTiIsInBhcnNlIiwidHlwZSIsInNlbmRNZXNzYWdlQnlNc2dPYmoiLCJkYXRhTW9uaXRvcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsSUFBSSxFQUFFSixFQUFFLENBQUNLLElBaEJEO0FBaUJSQyxJQUFBQSxlQUFlLEVBQUVOLEVBQUUsQ0FBQ0ssSUFqQlo7QUFrQlJFLElBQUFBLFVBQVUsRUFBRVAsRUFBRSxDQUFDSyxJQWxCUDtBQW1CUkcsSUFBQUEsV0FBVyxFQUFFUixFQUFFLENBQUNLLElBbkJSO0FBb0JSSSxJQUFBQSxXQUFXLEVBQUVULEVBQUUsQ0FBQ0ssSUFwQlI7QUFxQlJLLElBQUFBLHNCQUFzQixFQUFFVixFQUFFLENBQUNLLElBckJuQjtBQXNCUk0sSUFBQUEseUJBQXlCLEVBQUVYLEVB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QXNCLFFBQUFBLElBQUksQ0FBQ2tELG1CQUFMLEdBQTJCVCxjQUEzQjtBQUNBSCxRQUFBQSxzQkFBc0IsQ0FBQ3BDLGNBQXZCLENBQXNDLGFBQXRDLEVBQXFEaEIsTUFBckQsR0FBOEQsSUFBOUQ7QUFDQW9ELFFBQUFBLHNCQUFzQixDQUFDcEMsY0FBdkIsQ0FBc0MsYUFBdEMsRUFBcURoQixNQUFyRCxHQUE4RCxLQUE5RDtBQUNBb0QsUUFBQUEsc0JBQXNCLENBQUNwQyxjQUF2QixDQUFzQyxZQUF0QyxFQUFvRHZELEtBQXBELEdBQTRERyxJQUFJLENBQUNMLDBCQUFqRTtBQUNBSyxRQUFBQSxJQUFJLENBQUNoQyxnQkFBTCxDQUFzQmtGLElBQUksQ0FBQ3ZCLEdBQTNCLEtBQW1DLENBQW5DLENBTjRCLENBTzVCOztBQUNBM0IsUUFBQUEsSUFBSSxDQUFDekIsZ0JBQUw7QUFDQXFILFFBQUFBLFFBQVE7QUFDWDtBQUNKLEtBZEQ7O0FBZUFFLElBQUFBLFVBQVUsQ0FBQ2MsbUJBQVgsQ0FBK0JiLFVBQS9CO0FBQ0gsR0ExWEk7QUE0WExjLEVBQUFBLGFBNVhLLHlCQTRYU3BGLEdBNVhULEVBNFhhcEQsS0E1WGIsRUE0WG9CO0FBQ3JCLFFBQUkwRSxVQUFVLEdBQUc3QyxPQUFPLENBQUMsWUFBRCxDQUF4Qjs7QUFDQSxRQUFJOEIsTUFBTSxDQUFDQyxJQUFQLENBQVljLFVBQVosRUFBd0JxQyxPQUF4QixDQUFnQzNELEdBQWhDLEtBQXdDLENBQUMsQ0FBN0MsRUFBZ0Q7QUFDNUMsV0FBS3JCLFNBQUw7O0FBQ0EsV0FBS2tGLGNBQUwsQ0FBb0I3RCxHQUFwQixFQUF3QnBELEtBQXhCO0FBQ0g7QUFDSixHQWxZSSxDQW1ZTDs7QUFuWUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHBzOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICB1aWJnOiBjYy5Ob2RlLFxuICAgICAgICBjbG9zZUJ1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIHRhZ1NlY3Rpb246IGNjLk5vZGUsXG4gICAgICAgIG1haWxTZWN0aW9uOiBjYy5Ob2RlLFxuICAgICAgICBub3RpU2VjdGlvbjogY2MuTm9kZSxcbiAgICAgICAgbWFpbFNlY3Rpb25Db250ZW50Tm9kZTogY2MuTm9kZSxcbiAgICAgICAgbWFpbFNlY3Rpb25FbXB0eUxhYmVsTm9kZTogY2MuTm9kZSxcblxuICAgICAgICBtYWlsU2VjdGlvblByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICB0YWdTZWN0aW9uUHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIHNlbGVjdGVkVGFnRWZmZWN0UHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIG9wZW5kTWFpbFByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICB0YWdzOiBudWxsLFxuICAgICAgICBtYWlsc0J5VGFnOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiB7fVxuICAgICAgICB9LFxuXG4gICAgICAgIHVuUmVhZGVkTWFpbE51bXM6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHt9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2VsZWN0ZWRUYWc6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRUYWdcbiAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRUYWcgPSB2YWx1ZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBNYWlsU2VjdGlvbigpXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR1cE5vdGlTZWN0aW9uKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0ZWRUYWdOb2RlOiB7XG4gICAgICAgICAgICBnZXQoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRUYWdOb2RlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRUYWdOb2RlID0gdmFsdWVcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFRhZ0VmZmVjdC5wYXJlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFnRWZmZWN0LnggPSB0aGlzLnNlbGVjdGVkVGFnTm9kZS54XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWdFZmZlY3QueSA9IHRoaXMuc2VsZWN0ZWRUYWdOb2RlLnlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdTZWN0aW9uLmFkZENoaWxkKHRoaXMuc2VsZWN0ZWRUYWdFZmZlY3QsMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXRZID0gdGhpcy5zZWxlY3RlZFRhZ05vZGUueVxuICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLnNlbGVjdGVkVGFnRWZmZWN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvKDAuMSx7eTogdGFyZ2V0WX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0ZWRUYWdFZmZlY3Q6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRUYWdFZmZlY3QgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWZmZWN0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5zZWxlY3RlZFRhZ0VmZmVjdFByZWZhYilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRUYWdFZmZlY3QgPSBlZmZlY3RcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkVGFnRWZmZWN0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRUYWdFZmZlY3QgPSB2YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0YWdTZWN0aW9uU3RhcnRZOiAtODYuMzQ1LFxuICAgICAgICB0YWdTZWN0aW9uRGlzOiAxMjAsXG5cblxuICAgICAgICBtYWlsU2VjdGlvblN0YXJ0UG9zaXRpb246IGNjLnYyKC0xMjUuNzg4LDM3My4zNTYpLFxuICAgICAgICBtYWlsU2VjdGlvbk5vZGVEaXM6IDMyLFxuICAgICAgICBtYWlsU2VjdGlvbk5vZGVSZWFkZWRDb2xvcjoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYWlsU2VjdGlvbk5vZGVSZWFkZWRDb2xvciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21haWxTZWN0aW9uTm9kZVJlYWRlZENvbG9yID0gY2MuY29sb3IoMTAyLDEwMiwxMDIpXG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFpbFNlY3Rpb25Ob2RlUmVhZGVkQ29sb3JcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYWlsU2VjdGlvbk5vZGVSZWFkZWRDb2xvciA9IHZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3lzTmFtZTogXCJtYWlsU3lzXCJcbiAgICAgICAgXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b25Ob2RlLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmVxdWlyZShcInN5c3RlbXNNZ3JcIikuY2xvc2VTeXN0ZW0oc2VsZi5zeXNOYW1lKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnNldHVwRGF0YSgpXG4gICAgICAgIHRoaXMuc2V0dXBVSSgpXG4gICAgfSxcblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH0sXG5cbiAgICBzZXR1cFRhZ1NlY3Rpb24oKSB7XG4gICAgICAgIHZhciB0ZXh0Q29uZmlnID0gcmVxdWlyZShcInRleHRDb25maWdcIilcbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gdGhpcy50YWdzKSB7XG4gICAgICAgICAgICB2YXIgb25lVGFnID0gdGhpcy50YWdzW2luZGV4XVxuICAgICAgICAgICAgdmFyIHRhZ05hbWUgPSByZXF1aXJlKFwibWFpbFN5c0NvbmZpZ1wiKVtvbmVUYWddLnRhZ05hbWVUZXh0SWRcbiAgICAgICAgICAgIHRhZ05hbWUgPSB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKHRhZ05hbWUpXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudGFnU2VjdGlvblByZWZhYilcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0YWdOYW1lXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuX2ZvcmNlVXBkYXRlUmVuZGVyRGF0YSgpXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHZhciBiaW5kRnVuY3Rpb24gPSBmdW5jdGlvbihnaXZlbk5vZGUsIGdpdmVuVGFnKSB7XG4gICAgICAgICAgICAgICAgZ2l2ZW5Ob2RlLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5zZWxlY3RlZFRhZyAhPSBnaXZlblRhZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RlZFRhZyA9IGdpdmVuVGFnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWRUYWdOb2RlICE9IGdpdmVuTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RlZFRhZ05vZGUgPSBnaXZlbk5vZGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgZ2l2ZW5Ob2RlLmdldENvbXBvbmVudChcInJlZFBvaW50TWdyXCIpLnJlZFBvaW50U2hvd0NvbmRpdGlvbiA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYWlscyA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEubWFpbHNcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVuUmVhZE51bSA9IDBcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG1haWxzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb25lTWFpbCA9IG1haWxzW2tleV1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbmVNYWlsLnRhZyA9PSBnaXZlblRhZyAmJiBvbmVNYWlsLnN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5SZWFkTnVtICs9IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodW5SZWFkTnVtID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmluZEZ1bmN0aW9uKG5vZGUsb25lVGFnKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBub2RlLnkgPSB0aGlzLnRhZ1NlY3Rpb25TdGFydFkgLSBpbmRleCAqIHRoaXMudGFnU2VjdGlvbkRpc1xuICAgICAgICAgICAgbm9kZS5uYW1lID0gb25lVGFnXG4gICAgICAgICAgICB0aGlzLnRhZ1NlY3Rpb24uYWRkQ2hpbGQobm9kZSwxKVxuICAgICAgICAgICAgaWYgKGluZGV4ID09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFnID0gb25lVGFnXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRhZ05vZGUgPSBub2RlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0dXBNYWlsU2VjdGlvbigpIHtcbiAgICAgICAgdmFyIHRleHRDb25maWcgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKVxuICAgICAgICB2YXIgdGFnTWFpbHMgPSB0aGlzLm1haWxzQnlUYWdbdGhpcy5zZWxlY3RlZFRhZ11cbiAgICAgICAgdmFyIG1haWxJZHNBcnJ5ID0gT2JqZWN0LmtleXModGFnTWFpbHMpXG4gICAgICAgIHRoaXMubWFpbFNlY3Rpb25Db250ZW50Tm9kZS5kZXN0cm95QWxsQ2hpbGRyZW4oKVxuICAgICAgICBpZiAobWFpbElkc0FycnkubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHRoaXMubWFpbFNlY3Rpb25FbXB0eUxhYmVsTm9kZS5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICB0aGlzLm1haWxTZWN0aW9uRW1wdHlMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDE0NilcbiAgICAgICAgICAgIHRoaXMubWFpbFNlY3Rpb25Db250ZW50Tm9kZS5oZWlnaHQgPSAwXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5tYWlsU2VjdGlvbkVtcHR5TGFiZWxOb2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICB2YXIgc29ydEZ1bmN0aW9uID0gZnVuY3Rpb24obWFpbElkMSwgbWFpbElkMikge1xuICAgICAgICAgICAgdmFyIG1haWwxID0gc2VsZi5tYWlsc0J5VGFnW3NlbGYuc2VsZWN0ZWRUYWddW21haWxJZDFdXG4gICAgICAgICAgICB2YXIgbWFpbDIgPSBzZWxmLm1haWxzQnlUYWdbc2VsZi5zZWxlY3RlZFRhZ11bbWFpbElkMl1cbiAgICAgICAgICAgIGlmIChtYWlsMS5zdGF0dXMgPT0gMCAmJiBtYWlsMi5zdGF0dXMgPT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobWFpbDEuc3RhdHVzID09IDEgJiYgbWFpbDIuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHRpbWVTdGFtcDEgPSBtYWlsMS50aW1lU3RhbXBcbiAgICAgICAgICAgICAgICB2YXIgdGltZVN0YW1wMiA9IG1haWwyLnRpbWVTdGFtcFxuICAgICAgICAgICAgICAgIGlmICh0aW1lU3RhbXAxIDwgdGltZVN0YW1wMikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG1haWxJZHNBcnJ5ID0gbWFpbElkc0Fycnkuc29ydChzb3J0RnVuY3Rpb24pXG4gICAgICAgIHZhciBtYWlsQ29uZmlnID0gcmVxdWlyZShcIm1haWxDb25maWdcIilcbiAgICAgICAgdmFyIHRvdGFsSGVpZ2h0ID0gMFxuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBtYWlsSWRzQXJyeSkge1xuICAgICAgICAgICAgdmFyIG1haWxJZCA9IG1haWxJZHNBcnJ5W2luZGV4XVxuICAgICAgICAgICAgdmFyIG1haWwgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLm1haWxzW21haWxJZF1cbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5tYWlsU2VjdGlvblByZWZhYilcbiAgICAgICAgICAgIHZhciB1blJlYWRJY29uTm9kZSA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpY29uX3VucmVhZFwiKVxuICAgICAgICAgICAgdmFyIHJlYWRlZEljb25Ob2RlID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImljb25fcmVhZGVkXCIpXG4gICAgICAgICAgICB2YXIgdGl0bGVMYWJlbE5vZGUgPSBub2RlLmdldENoaWxkQnlOYW1lKFwidGl0bGVMYWJlbFwiKVxuICAgICAgICAgICAgdmFyIHNlcGVyYXRlTGluZU5vZGUgPSBub2RlLmdldENoaWxkQnlOYW1lKFwic2VwZXJhdGVMaW5lXCIpXG5cbiAgICAgICAgICAgIGlmIChtYWlsLnN0YXR1cyA9PSAxKSB7XG4gICAgICAgICAgICAgICAgdW5SZWFkSWNvbk5vZGUuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgICAgICByZWFkZWRJY29uTm9kZS5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgdGl0bGVMYWJlbE5vZGUuY29sb3IgPSB0aGlzLm1haWxTZWN0aW9uTm9kZVJlYWRlZENvbG9yXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdGl0bGVTdHIgPSB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKG1haWxDb25maWdbbWFpbElkXS50aXRsZVRleHRJZClcbiAgICAgICAgICAgIHRpdGxlTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGl0bGVTdHJcbiAgICAgICAgICAgIHNlcGVyYXRlTGluZU5vZGUueSA9IC10aXRsZUxhYmVsTm9kZS5oZWlnaHRcbiAgICAgICAgICAgIG5vZGUueSA9IC10b3RhbEhlaWdodFxuICAgICAgICAgICAgdmFyIG5vZGVXaWR0aCA9IHRpdGxlTGFiZWxOb2RlLnggKyB0aXRsZUxhYmVsTm9kZS53aWR0aCAvIDIgLSAodW5SZWFkSWNvbk5vZGUueCAtIHVuUmVhZEljb25Ob2RlLndpZHRoIC8gMilcbiAgICAgICAgICAgIHZhciBub2RlSGVpZ2h0ID0gdGl0bGVMYWJlbE5vZGUuaGVpZ2h0XG4gICAgICAgICAgICBub2RlLndpZHRoID0gbm9kZVdpZHRoXG4gICAgICAgICAgICBub2RlLmhlaWdodCA9IG5vZGVIZWlnaHRcbiAgICAgICAgICAgIG5vZGUubmFtZSA9IG1haWxJZC50b1N0cmluZygpXG4gICAgICAgICAgICB0b3RhbEhlaWdodCA9IHRvdGFsSGVpZ2h0ICsgdGl0bGVMYWJlbE5vZGUuaGVpZ2h0ICsgMlxuICAgICAgICAgICAgaWYgKGluZGV4ICE9IG1haWxJZHNBcnJ5Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICB0b3RhbEhlaWdodCArPSB0aGlzLm1haWxTZWN0aW9uTm9kZURpc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgICAgICB2YXIgYmluZEZ1bmN0aW9uID0gZnVuY3Rpb24oZ2l2ZW5Ob2RlLCBnaXZlbk1haWxJZCkge1xuICAgICAgICAgICAgICAgIGdpdmVuTm9kZS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vcGVuT25lTWFpbChnaXZlbk1haWxJZCxnaXZlbk5vZGUpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJpbmRGdW5jdGlvbihub2RlLG1haWxJZClcbiAgICAgICAgICAgIHRoaXMubWFpbFNlY3Rpb25Db250ZW50Tm9kZS5hZGRDaGlsZChub2RlKVxuICAgICAgICB9XG4gICAgICAgIHZhciBtaW5IZWlnaHQgPSB0aGlzLm1haWxTZWN0aW9uQ29udGVudE5vZGUuaGVpZ2h0XG4gICAgICAgIGlmICh0b3RhbEhlaWdodCA+IG1pbkhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5tYWlsU2VjdGlvbkNvbnRlbnROb2RlLmhlaWdodCA9IHRvdGFsSGVpZ2h0XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0dXBOb3RpU2VjdGlvbigpIHtcbiAgICAgICAgdmFyIHRleHRDb25maWcgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKVxuICAgICAgICB2YXIgdW5SZWFkTWFpbE51bSA9IHRoaXMudW5SZWFkZWRNYWlsTnVtc1t0aGlzLnNlbGVjdGVkVGFnXVxuICAgICAgICBpZiAodW5SZWFkTWFpbE51bSA+IDApIHtcbiAgICAgICAgICAgIHZhciBzdHIgPSB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDEyOSlcbiAgICAgICAgICAgIHRoaXMubm90aVNlY3Rpb24uZ2V0Q2hpbGRCeU5hbWUoXCJub3RpTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzdHJcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB2YXIgbWFpbENvbmRpdGlvbkluZGV4ID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5tYWlsQ29uZGl0aW9uSW5kZXhcbiAgICAgICAgdmFyIGluZGV4ID0gbWFpbENvbmRpdGlvbkluZGV4W3RoaXMuc2VsZWN0ZWRUYWddXG4gICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5ub3RpU2VjdGlvbi5nZXRDaGlsZEJ5TmFtZShcIm5vdGlMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRleHRDb25maWcuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTMwKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1haWxTeXNDb25maWcgPSByZXF1aXJlKFwibWFpbFN5c0NvbmZpZ1wiKVxuICAgICAgICB2YXIgZWxlbWVudCA9IG1haWxTeXNDb25maWdbdGhpcy5zZWxlY3RlZFRhZ10uY29uZGl0aW9uc1tpbmRleF1cblxuICAgICAgICBpZiAoZWxlbWVudC5jb25kaXRpb25UeXBlID09IDEpIHtcbiAgICAgICAgICAgIHZhciBsZXZlbCA9IGVsZW1lbnQuY29uZGl0aW9uUGFyYVxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX2dldFNlY3Rpb25BbmRMZXZlbE51bU9mU2VjdGlvbihsZXZlbClcbiAgICAgICAgICAgIGlmIChyZXN1bHQgIT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VjdGlvbiA9IHJlc3VsdFswXVxuICAgICAgICAgICAgICAgIHZhciBsZXZlbE51bU9mU2VjdGlvbiA9IHJlc3VsdFsxXVxuICAgICAgICAgICAgICAgIC8vIHZhciBzdHIgID0gXCLpgJrlhbMgXCIgKyBzZWN0aW9uLnRvU3RyaW5nKCkgKyBcIiAtIFwiICsgbGV2ZWxOdW1PZlNlY3Rpb24udG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIC8vIHN0ciA9IHN0ciArIFwiIO+8jOS8muacieaWsOeahOmCruS7tu+8jOWKoOayueWQp+WwkeW5tO+8gVwiXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5ub3RpU2VjdGlvbi5nZXRDaGlsZEJ5TmFtZShcIm5vdGlMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN0clxuICAgICAgICAgICAgICAgIHZhciBzdHIgPSB0ZXh0Q29uZmlnLmdldEZvcm1hdGVkU3RyaW5nKDEzMSxbc2VjdGlvbi50b1N0cmluZygpLGxldmVsTnVtT2ZTZWN0aW9uLnRvU3RyaW5nKCldKVxuICAgICAgICAgICAgICAgIHRoaXMubm90aVNlY3Rpb24uZ2V0Q2hpbGRCeU5hbWUoXCJub3RpTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzdHJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgaWYgKGVsZW1lbnQuY29uZGl0aW9uVHlwZSA9PSAyKSB7XG4gICAgICAgICAgICAvL2dldCBtaW51bSBzdGVwIG9mIG9uZSBsZXZlbFxuICAgICAgICAgICAgdmFyIGxldmVsSWQgPSBlbGVtZW50LmNvbmRpdGlvblBhcmEubGV2ZWxJZFxuICAgICAgICAgICAgdmFyIG1pblN0ZXBOdW0gPSBlbGVtZW50LmNvbmRpdGlvblBhcmEubWluU3RlcE51bVxuXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fZ2V0U2VjdGlvbkFuZExldmVsTnVtT2ZTZWN0aW9uKGxldmVsSWQpXG4gICAgICAgICAgICBpZiAocmVzdWx0ICE9IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlY3Rpb24gPSByZXN1bHRbMF1cbiAgICAgICAgICAgICAgICB2YXIgbGV2ZWwgPSByZXN1bHRbMV1cblxuICAgICAgICAgICAgICAgIC8vIHZhciBzdHIgPSBcIuWcqCBcIiArIHNlY3Rpb24udG9TdHJpbmcoKSArIFwiIC0gXCIgKyBsZXZlbC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgLy8gc3RyID0gc3RyICsgXCIg55So5pyA5aSaIFwiICsgbWluU3RlcE51bSArIFwiIOatpemAmuWFs++8jOS8muacieaWsOeahOmCruS7tu+8jOWKoOayueWQp+WwkeW5tO+8gVwiXG4gICAgICAgICAgICAgICAgdmFyIHN0ciA9IHRleHRDb25maWcuZ2V0Rm9ybWF0ZWRTdHJpbmcoMTMyLFtzZWN0aW9uLnRvU3RyaW5nKCksIGxldmVsLnRvU3RyaW5nKCksIG1pblN0ZXBOdW0udG9TdHJpbmcoKV0pXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpU2VjdGlvbi5nZXRDaGlsZEJ5TmFtZShcIm5vdGlMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN0clxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBfZ2V0U2VjdGlvbkFuZExldmVsTnVtT2ZTZWN0aW9uKGdpdmVuTGV2ZWxJZCkge1xuICAgICAgICB2YXIgc2VjdGlvbiA9IG51bGxcbiAgICAgICAgdmFyIGxldmVsTnVtT2ZTZWN0aW9uID0gbnVsbFxuICAgICAgICB2YXIgc2VjdGlvbkNvbmZpZyA9IHJlcXVpcmUoXCJzZWN0aW9uQ29uZmlnXCIpXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzZWN0aW9uQ29uZmlnKSB7XG4gICAgICAgICAgICB2YXIgbGV2ZWxzID0gc2VjdGlvbkNvbmZpZ1trZXldLmxldmVsc1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gbGV2ZWxzLmluZGV4T2YoZ2l2ZW5MZXZlbElkKVxuICAgICAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgc2VjdGlvbiA9IGtleVxuICAgICAgICAgICAgICAgIGxldmVsTnVtT2ZTZWN0aW9uID0gaW5kZXggKyAxXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzZWN0aW9uLCBsZXZlbE51bU9mU2VjdGlvbl1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9LFxuXG4gICAgc2V0dXBEYXRhKCkge1xuICAgICAgICB2YXIgbWFpbHMgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLm1haWxzXG4gICAgICAgIHRoaXMudGFncyA9IE9iamVjdC5rZXlzKHJlcXVpcmUoXCJtYWlsU3lzQ29uZmlnXCIpKVxuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiB0aGlzLnRhZ3MpIHtcbiAgICAgICAgICAgIHZhciBvbmVUYWcgPSB0aGlzLnRhZ3NbaW5kZXhdXG4gICAgICAgICAgICB0aGlzLm1haWxzQnlUYWdbb25lVGFnXSA9IHt9XG4gICAgICAgICAgICB0aGlzLnVuUmVhZGVkTWFpbE51bXNbb25lVGFnXSA9IDBcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBtYWlscykge1xuICAgICAgICAgICAgICAgIHZhciBvbmVNYWlsID0gbWFpbHNba2V5XVxuICAgICAgICAgICAgICAgIGlmIChvbmVNYWlsLnRhZyA9PSBvbmVUYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWlsc0J5VGFnW29uZVRhZ11ba2V5XSA9IG9uZU1haWxcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9uZU1haWwuc3RhdXRzID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5SZWFkZWRNYWlsTnVtc1tvbmVUYWddICs9IDFcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXR1cFVJKCkge1xuICAgICAgICB0aGlzLnNldHVwVGFnU2VjdGlvbigpXG4gICAgICAgIHRoaXMuc2V0dXBNYWlsU2VjdGlvbigpXG4gICAgICAgIHRoaXMuc2V0dXBOb3RpU2VjdGlvbigpXG4gICAgfSxcblxuICAgIF9pbnNlcnRPbmVNYWlsKG1haWxJZCwgbWFpbCl7XG4gICAgICAgIGlmIChtYWlsLnRhZyA9PSB0aGlzLnNlbGVjdGVkVGFnKSB7XG4gICAgICAgICAgICB0aGlzLnNldHVwTWFpbFNlY3Rpb24oKVxuICAgICAgICAgICAgdGhpcy5zZXR1cE5vdGlTZWN0aW9uKClcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvcGVuT25lTWFpbChnaXZlbk1haWxJZCxnaXZlbk5vZGUpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm9wZW5kTWFpbFByZWZhYilcbiAgICAgICAgdmFyIG1nciA9IG5vZGUuZ2V0Q29tcG9uZW50KFwibWFpbFN5c01haWxNZ3JcIilcbiAgICAgICAgbWdyLm1haWxJZCA9IGdpdmVuTWFpbElkXG4gICAgICAgIG1nci5yZWxhdGVkTWFpbFNlY3Rpb25Ob2RlID0gZ2l2ZW5Ob2RlXG4gICAgICAgIG1nci5yZWxhdGVkTWFpbFN5c01nciA9IHRoaXNcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpXG4gICAgfSxcbiAgICBzZXRPbmVNYWlsUmVhZGVkKG1haWxJZCxpbmRleE9mT3B0aW9ucywgY29tcGxldGUgPSBmdW5jdGlvbigpe30scmVsYXRlZE1haWxTZWN0aW9uTm9kZSkge1xuICAgICAgICB2YXIgbWFpbCA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEubWFpbHNbbWFpbElkXVxuICAgICAgICBpZiAobWFpbC5zdGF0dXMgPT0gMSkge1xuICAgICAgICAgICAgY2MubG9nKFwidGhpcyBtYWlsIGlzIGFscmVhZHkgcmVhZGVkXCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV0d29ya01nciA9IHJlcXVpcmUoXCJuZXR3b3JrTWdyXCIpXG4gICAgICAgIHZhciBtZXNzYWdlT2JqID0gbmV0d29ya01nci5tYWtlTWVzc2FnZU9iaihcIm1haWxNb2R1bGVcIixcInJlYWRNYWlsTWVzc2FnZVR5cGVcIilcbiAgICAgICAgbWVzc2FnZU9iai5tZXNzYWdlLnBsYXllcklkID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5pZFxuICAgICAgICBtZXNzYWdlT2JqLm1lc3NhZ2UubWFpbElkID0gbWFpbElkXG4gICAgICAgIG1lc3NhZ2VPYmoubWVzc2FnZS5zZWxlY3RlZE9wdGlvbkluZGV4ID0gaW5kZXhPZk9wdGlvbnNcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgIG1lc3NhZ2VPYmouc3VjY2Vzc0NhbGxCYWNrID0gZnVuY3Rpb24oeGhyKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UudHlwZSA9PSBcInN1Y2Nlc3NcIikge1xuICAgICAgICAgICAgICAgIG1haWwuc3RhdHVzID0gMVxuICAgICAgICAgICAgICAgIG1haWwuc2VsZWN0ZWRPcHRpb25JbmRleCA9IGluZGV4T2ZPcHRpb25zXG4gICAgICAgICAgICAgICAgcmVsYXRlZE1haWxTZWN0aW9uTm9kZS5nZXRDaGlsZEJ5TmFtZShcImljb25fcmVhZGVkXCIpLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgICAgICByZWxhdGVkTWFpbFNlY3Rpb25Ob2RlLmdldENoaWxkQnlOYW1lKFwiaWNvbl91bnJlYWRcIikuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgICAgICByZWxhdGVkTWFpbFNlY3Rpb25Ob2RlLmdldENoaWxkQnlOYW1lKFwidGl0bGVMYWJlbFwiKS5jb2xvciA9IHNlbGYubWFpbFNlY3Rpb25Ob2RlUmVhZGVkQ29sb3JcbiAgICAgICAgICAgICAgICBzZWxmLnVuUmVhZGVkTWFpbE51bXNbbWFpbC50YWddIC09IDFcbiAgICAgICAgICAgICAgICAvL3NlbGYuc2V0dXBSZWRQb2ludCgpXG4gICAgICAgICAgICAgICAgc2VsZi5zZXR1cE5vdGlTZWN0aW9uKClcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbmV0d29ya01nci5zZW5kTWVzc2FnZUJ5TXNnT2JqKG1lc3NhZ2VPYmopXG4gICAgfSxcblxuICAgIGRhdGFNb25pdG9yZWQoa2V5LHZhbHVlKSB7XG4gICAgICAgIHZhciBtYWlsQ29uZmlnID0gcmVxdWlyZShcIm1haWxDb25maWdcIilcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKG1haWxDb25maWcpLmluZGV4T2Yoa2V5KSAhPSAtMSkge1xuICAgICAgICAgICAgdGhpcy5zZXR1cERhdGEoKVxuICAgICAgICAgICAgdGhpcy5faW5zZXJ0T25lTWFpbChrZXksdmFsdWUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==