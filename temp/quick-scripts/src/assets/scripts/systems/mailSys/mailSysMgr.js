"use strict";
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