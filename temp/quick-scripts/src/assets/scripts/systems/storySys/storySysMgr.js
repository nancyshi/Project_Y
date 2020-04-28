"use strict";
cc._RF.push(module, 'e7a64OS7/RMK7rBUEbD4B4U', 'storySysMgr');
// scripts/systems/storySys/storySysMgr.js

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
    contentNode: cc.Node,
    storyTextNodePrefab: cc.Prefab,
    disBetweenStoryTextNodes: 50,
    continueLabelNode: cc.Node,
    completeButtonNode: cc.Node,
    startDelayTime: 1,
    storyId: null,
    storyTextNodes: [],
    status: {
      get: function get() {
        return this._status;
      },
      set: function set(value) {
        this._status = value; // 1 = start showing a node
        // 2 = showing complete , wating for tap to next
        // 3 = all nodes showing complete , wating for click button to complete

        switch (value) {
          case 1:
            this.continueLabelNode.active = false;
            this.completeButtonNode.active = false;
            break;

          case 2:
            this.continueLabelNode.active = true;
            this.completeButtonNode.active = false;
            break;

          case 3:
            this.continueLabelNode.active = false;
            this.completeButtonNode.active = true;
            break;

          default:
            cc.log("STORYSYSMGR: WRONG STATUS VALUE PROVIDED");
        }
      }
    },
    header: 100,
    footer: 100,
    sectionDis: 50,
    totalHeight: 0,
    totalTextNodeNum: null,
    currentNum: null,
    textIds: null
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    var self = this;
    var bg = this.node.getChildByName("bg");
    bg.width = cc.winSize.width;
    bg.height = cc.winSize.height;
    this.node.width = bg.width;
    this.node.height = bg.height;
    var monitoredNode = this.contentNode.getChildByName("tapMonitoredNode");
    monitoredNode.width = bg.width;
    monitoredNode.height = bg.height; //cc.log(bg.width,bg.height)

    monitoredNode.on("touchstart", function () {
      if (self.status == 2) {
        self.currentNum += 1;

        var str = require("textConfig").getTextByIdAndLanguageType(self.textIds[self.currentNum - 1]);

        self._showOneStoryText(str);
      }
    }, this);
    this.completeButtonNode.on("click", function () {
      if (self.status == 3) {
        self.completeStory();
      }
    });
    this.completeButtonNode.getChildByName("New Label").getComponent(cc.Label).string = require("textConfig").getTextByIdAndLanguageType(122);
    cc.tween(this.continueLabelNode).repeatForever(cc.tween().to(0.3, {
      opacity: 0
    }).to(0.3, {
      opacity: 255
    })).start();
    var scrollContainer = this.node.getChildByName("scrollContainer");
    scrollContainer.y = bg.height / 2 - this.footer;
    this.continueLabelNode.y = -bg.height / 2 + this.footer + this.completeButtonNode.height / 2;
    this.completeButtonNode.y = -bg.height / 2 + this.footer + this.completeButtonNode.height / 2;
    var tempHeight = bg.height - this.header - this.footer - this.completeButtonNode.height - this.sectionDis;
    scrollContainer.height = tempHeight;
    scrollContainer.getChildByName("view").height = tempHeight;
    this.contentNode.height = tempHeight;
  },
  start: function start() {
    this.showStory();
  },
  showStory: function showStory() {
    if (this.storyId == null) {
      cc.log("NO STORY ID PROVIDED");
      return;
    }

    var storyConfig = require("storyConfig");

    var key = "story_" + this.storyId.toString();
    var config = storyConfig[key];
    var textIds = config.textIds;
    this.textIds = textIds;
    this.totalTextNodeNum = textIds.length;
    this.currentNum = 1;

    var str = require("textConfig").getTextByIdAndLanguageType(textIds[0]);

    var self = this;
    cc.tween(this.node).delay(self.startDelayTime).call(function () {
      self._showOneStoryText(str);
    }).start();
  },
  completeStory: function completeStory() {
    var networkMgr = require("networkMgr");

    var messageObj = networkMgr.makeMessageObj("storyModule", "completeCurrentMessageType");
    messageObj.message.playerId = require("dataMgr").playerData.id;

    messageObj.successCallBack = function (xhr) {
      var response = xhr.responseText;
      response = JSON.parse(response);

      if (response.type == "success") {
        var storyId = response.storyId;
        require("dataMgr").playerData.storySysId = storyId;

        require("systemsMgr").closeSystem("storySys", 3);
      }
    };

    this.completeButtonNode.getComponent(cc.Button).interactable = false;
    networkMgr.sendMessageByMsgObj(messageObj);
  },
  _showOneStoryText: function _showOneStoryText(str) {
    this.status = 1;
    var node = cc.instantiate(this.storyTextNodePrefab);
    node.getComponent(cc.Label).string = str;

    node.getComponent(cc.Label)._forceUpdateRenderData();

    node.y = -this.totalHeight;
    this.totalHeight += node.height + this.disBetweenStoryTextNodes;

    if (this.contentNode.height < this.totalHeight) {
      this.contentNode.height = this.totalHeight;
      this.node.getChildByName("scrollContainer").getComponent(cc.ScrollView).vertical = true;
    }

    node.opacity = 0;
    this.contentNode.addChild(node);
    var self = this;
    cc.tween(node).to(0.5, {
      opacity: 255
    }).call(function () {
      if (self.currentNum == self.totalTextNodeNum) {
        self.status = 3;
      } else {
        self.status = 2;
      }
    }).start();
  },
  onWillOpend: function onWillOpend(givenStoryId) {
    this.storyId = givenStoryId;
  } // update (dt) {},

});

cc._RF.pop();