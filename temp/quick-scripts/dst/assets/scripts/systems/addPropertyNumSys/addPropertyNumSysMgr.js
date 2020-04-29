
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/systems/addPropertyNumSys/addPropertyNumSysMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5666fBzlDdAnK8GSZS/8Y1e', 'addPropertyNumSysMgr');
// scripts/systems/addPropertyNumSys/addPropertyNumSysMgr.js

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
    ensureButtonNode: cc.Node,
    cancelButtonNode: cc.Node,
    desLabelNode: cc.Node,
    addTypeId: 1,
    addConfig: null,
    sysName: "addPropertyNumSys"
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    this.setupData();
    this.setupUI();
  },
  setupData: function setupData() {
    var config = require("addPropertySysConfig");

    config = config[this.addTypeId];
    this.addConfig = config;
  },
  setupUI: function setupUI() {
    var textConfig = require("textConfig");

    var desStr = textConfig.getTextByIdAndLanguageType(123);
    var isFirstKey = true;

    for (var key in this.addConfig) {
      if (isFirstKey == false) {
        desStr += "，";
      }

      switch (key) {
        case "physicalPower":
          desStr += textConfig.getTextByIdAndLanguageType(124) + this.addConfig[key].toString();
          break;

        case "heart":
          desStr += textConfig.getTextByIdAndLanguageType(125) + this.addConfig[key].toString();
          break;
      }

      isFirstKey = false;
    }

    desStr += textConfig.getTextByIdAndLanguageType(126);
    this.desLabelNode.getComponent(cc.Label).string = desStr;
    this.ensureButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(113);
    this.cancelButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(114);
  },
  onWillOpend: function onWillOpend(givenAddTypeId) {
    this.addTypeId = givenAddTypeId;
  },
  onClickEnsureButton: function onClickEnsureButton() {
    var advertisMgr = require("advertisMgr");

    advertisMgr.delegate = this;
    advertisMgr.showVideoAd();
  },
  onClickCancelButton: function onClickCancelButton() {
    require("systemsMgr").closeSystem(this.sysName);
  },
  //advertis delegate
  onVideoAdEnd: function onVideoAdEnd() {
    var commitBody = {};

    for (var key in this.addConfig) {
      var oneAddedPropertyNum = require("dataMgr").playerData[key] + this.addConfig[key];
      commitBody[key] = oneAddedPropertyNum;
    }

    if (Object.keys(commitBody).length > 0) {
      var successCallBack = function successCallBack() {
        for (var k in commitBody) {
          require("dataMgr").playerData[k] = commitBody[k];
        }

        var str = require("textConfig").getTextByIdAndLanguageType(163);

        require("notificationMgr").pushNoti(str);
      };

      require("dataMgr").commitPlayerDataToServer(commitBody, successCallBack);

      require("systemsMgr").closeSystem(this.sysName, 2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3N5c3RlbXMvYWRkUHJvcGVydHlOdW1TeXMvYWRkUHJvcGVydHlOdW1TeXNNZ3IuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJlbnN1cmVCdXR0b25Ob2RlIiwiTm9kZSIsImNhbmNlbEJ1dHRvbk5vZGUiLCJkZXNMYWJlbE5vZGUiLCJhZGRUeXBlSWQiLCJhZGRDb25maWciLCJzeXNOYW1lIiwic3RhcnQiLCJzZXR1cERhdGEiLCJzZXR1cFVJIiwiY29uZmlnIiwicmVxdWlyZSIsInRleHRDb25maWciLCJkZXNTdHIiLCJnZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSIsImlzRmlyc3RLZXkiLCJrZXkiLCJ0b1N0cmluZyIsImdldENvbXBvbmVudCIsIkxhYmVsIiwic3RyaW5nIiwiZ2V0Q2hpbGRCeU5hbWUiLCJvbldpbGxPcGVuZCIsImdpdmVuQWRkVHlwZUlkIiwib25DbGlja0Vuc3VyZUJ1dHRvbiIsImFkdmVydGlzTWdyIiwiZGVsZWdhdGUiLCJzaG93VmlkZW9BZCIsIm9uQ2xpY2tDYW5jZWxCdXR0b24iLCJjbG9zZVN5c3RlbSIsIm9uVmlkZW9BZEVuZCIsImNvbW1pdEJvZHkiLCJvbmVBZGRlZFByb3BlcnR5TnVtIiwicGxheWVyRGF0YSIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJzdWNjZXNzQ2FsbEJhY2siLCJrIiwic3RyIiwicHVzaE5vdGkiLCJjb21taXRQbGF5ZXJEYXRhVG9TZXJ2ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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czpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cHM6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgICAgIGVuc3VyZUJ1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGNhbmNlbEJ1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGRlc0xhYmVsTm9kZTogY2MuTm9kZSxcbiAgICAgICAgYWRkVHlwZUlkOiAxICxcbiAgICAgICAgYWRkQ29uZmlnOiBudWxsLFxuICAgICAgICBzeXNOYW1lOiBcImFkZFByb3BlcnR5TnVtU3lzXCJcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuc2V0dXBEYXRhKClcbiAgICAgICAgdGhpcy5zZXR1cFVJKClcbiAgICB9LFxuXG4gICAgc2V0dXBEYXRhKCkge1xuICAgICAgICB2YXIgY29uZmlnID0gcmVxdWlyZShcImFkZFByb3BlcnR5U3lzQ29uZmlnXCIpXG4gICAgICAgIGNvbmZpZyA9IGNvbmZpZ1t0aGlzLmFkZFR5cGVJZF1cbiAgICAgICAgdGhpcy5hZGRDb25maWcgPSBjb25maWdcbiAgICB9LFxuXG4gICAgc2V0dXBVSSgpIHtcbiAgICAgICAgdmFyIHRleHRDb25maWcgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKVxuICAgICAgICB2YXIgZGVzU3RyID0gdGV4dENvbmZpZy5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxMjMpXG4gICAgICAgIHZhciBpc0ZpcnN0S2V5ID0gdHJ1ZVxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5hZGRDb25maWcpIHtcbiAgICAgICAgICAgIGlmIChpc0ZpcnN0S2V5ID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZGVzU3RyICs9IFwi77yMXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBoeXNpY2FsUG93ZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgZGVzU3RyICs9IHRleHRDb25maWcuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTI0KSArIHRoaXMuYWRkQ29uZmlnW2tleV0udG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgXCJoZWFydFwiOlxuICAgICAgICAgICAgICAgICAgICBkZXNTdHIgKz0gdGV4dENvbmZpZy5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxMjUpICsgdGhpcy5hZGRDb25maWdba2V5XS50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpc0ZpcnN0S2V5ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBkZXNTdHIgKz0gdGV4dENvbmZpZy5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxMjYpXG4gICAgICAgIHRoaXMuZGVzTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZGVzU3RyXG4gICAgICAgIHRoaXMuZW5zdXJlQnV0dG9uTm9kZS5nZXRDaGlsZEJ5TmFtZShcInRleHRMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRleHRDb25maWcuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTEzKVxuICAgICAgICB0aGlzLmNhbmNlbEJ1dHRvbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0TGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDExNClcbiAgICB9LFxuXG4gICAgb25XaWxsT3BlbmQoZ2l2ZW5BZGRUeXBlSWQpIHtcbiAgICAgICAgdGhpcy5hZGRUeXBlSWQgPSBnaXZlbkFkZFR5cGVJZFxuICAgIH0sXG5cbiAgICBvbkNsaWNrRW5zdXJlQnV0dG9uKCl7XG4gICAgICAgIHZhciBhZHZlcnRpc01nciA9IHJlcXVpcmUoXCJhZHZlcnRpc01nclwiKVxuICAgICAgICBhZHZlcnRpc01nci5kZWxlZ2F0ZSA9IHRoaXNcbiAgICAgICAgYWR2ZXJ0aXNNZ3Iuc2hvd1ZpZGVvQWQoKVxuICAgIH0sXG5cbiAgICBvbkNsaWNrQ2FuY2VsQnV0dG9uKCkge1xuICAgICAgICByZXF1aXJlKFwic3lzdGVtc01nclwiKS5jbG9zZVN5c3RlbSh0aGlzLnN5c05hbWUpXG4gICAgfSxcblxuXG4gICAgLy9hZHZlcnRpcyBkZWxlZ2F0ZVxuICAgIG9uVmlkZW9BZEVuZCgpIHtcbiAgICAgICAgdmFyIGNvbW1pdEJvZHkgPSB7fVxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5hZGRDb25maWcpIHtcbiAgICAgICAgICAgIHZhciBvbmVBZGRlZFByb3BlcnR5TnVtID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YVtrZXldICsgdGhpcy5hZGRDb25maWdba2V5XVxuICAgICAgICAgICAgY29tbWl0Qm9keVtrZXldID0gb25lQWRkZWRQcm9wZXJ0eU51bVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNvbW1pdEJvZHkpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBzdWNjZXNzQ2FsbEJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrIGluIGNvbW1pdEJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YVtrXSA9IGNvbW1pdEJvZHlba11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHN0ciA9IHJlcXVpcmUoXCJ0ZXh0Q29uZmlnXCIpLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDE2MylcbiAgICAgICAgICAgICAgICByZXF1aXJlKFwibm90aWZpY2F0aW9uTWdyXCIpLnB1c2hOb3RpKHN0cilcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxdWlyZShcImRhdGFNZ3JcIikuY29tbWl0UGxheWVyRGF0YVRvU2VydmVyKGNvbW1pdEJvZHksc3VjY2Vzc0NhbGxCYWNrKVxuICAgICAgICAgICAgcmVxdWlyZShcInN5c3RlbXNNZ3JcIikuY2xvc2VTeXN0ZW0odGhpcy5zeXNOYW1lLDIpXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==