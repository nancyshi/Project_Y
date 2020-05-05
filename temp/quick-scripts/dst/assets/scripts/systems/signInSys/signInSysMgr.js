
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/systems/signInSys/signInSysMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a6895xyaLROOZK1s1NHLJeI', 'signInSysMgr');
// scripts/systems/signInSys/signInSysMgr.js

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
    desLabelNode: cc.Label,
    physicalPowerAddNum: 0,
    heartAddNum: 0,
    addRateForAd: 0,
    sysName: "signInSys"
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    this.setupData();
    this.setupUI();
  },
  setupUI: function setupUI() {
    var status = require("dataMgr").playerData.signInStatus; //1 = not sign in
    //2 = common in
    //3 = ad sign in


    var desStr = "";

    var textConfig = require("textConfig");

    switch (status) {
      case 1:
        desStr = textConfig.getTextByIdAndLanguageType(115) + this.physicalPowerAddNum + textConfig.getTextByIdAndLanguageType(116) + this.heartAddNum + ", ";
        desStr = desStr + textConfig.getTextByIdAndLanguageType(117);
        this.cancelButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(118);
        this.ensureButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(113);
        break;

      case 2:
        desStr = textConfig.getTextByIdAndLanguageType(119) + ((this.addRateForAd - 1) * this.physicalPowerAddNum).toString();
        desStr = desStr + textConfig.getTextByIdAndLanguageType(116) + ((this.addRateForAd - 1) * this.heartAddNum).toString();
        desStr = desStr + textConfig.getTextByIdAndLanguageType(120);
        this.ensureButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(113);
        this.cancelButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(114);
        break;

      case 3:
        desStr = textConfig.getTextByIdAndLanguageType(121);
        this.cancelButtonNode.active = false;
        this.ensureButtonNode.x = 0;

        var delta = require("dataMgr").playerData.signInRefreshDelta;

        var h = Math.floor(delta / 3600);
        var m = Math.floor(delta % 3600 / 60);
        var s = h.toString() + "h " + m.toString() + "m ";
        this.ensureButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = textConfig.getFormatedString(122, [s]);
        break;
    }

    if (desStr == "") {
      cc.log("wrong signIn status");
      return;
    }

    this.desLabelNode.getComponent(cc.Label).string = desStr;
  },
  setupData: function setupData() {
    var config = require("signInSysConfig");

    this.physicalPowerAddNum = config.physicalPowerAddNum;
    this.heartAddNum = config.heartAddNum;
    this.addRateForAd = config.addRateForAd;
  },
  onClickEnsureButton: function onClickEnsureButton() {
    var status = require("dataMgr").playerData.signInStatus;

    switch (status) {
      case 1:
        var advMgr = require("advertisMgr");

        advMgr.delegate = this;
        advMgr.showVideoAd();
        break;

      case 2:
        var advMgr = require("advertisMgr");

        advMgr.delegate = this;
        advMgr.showVideoAd();
        break;

      case 3:
        require("systemsMgr").closeSystem(this.sysName);

        break;
    }
  },
  onClickCancelButton: function onClickCancelButton() {
    var status = require("dataMgr").playerData.signInStatus;

    switch (status) {
      case 1:
        this.signIn(1);
        break;

      case 2:
        require("systemsMgr").closeSystem(this.sysName);

        break;

      case 3:
        // if status == 3, cancel button will not appear
        cc.log("some wrong thing happen from onClickCancelButton");
        break;
    }
  },
  signIn: function signIn(signInType) {
    var networkMgr = require("networkMgr");

    var msgObj = networkMgr.makeMessageObj("signInModule", "signInMessageType");
    msgObj.message.signInType = signInType;
    msgObj.message.playerId = require("dataMgr").playerData.id;
    var self = this;

    msgObj.successCallBack = function (xhr) {
      var response = xhr.responseText;
      response = JSON.parse(response);

      if (response.type == "success") {
        var physicalPower = response.physicalPower;
        var heart = response.heart;
        self.onSignInSuccess(signInType, physicalPower, heart);
      }
    };

    networkMgr.sendMessageByMsgObj(msgObj);
  },
  onSignInSuccess: function onSignInSuccess(signInType, physicalPower, heart) {
    switch (signInType) {
      case 1:
        require("dataMgr").playerData.signInStatus = 2;
        break;

      case 2:
        require("dataMgr").playerData.signInStatus = 3;
        break;

      case 3:
        require("dataMgr").playerData.signInStatus = 3;
        break;
    }

    require("dataMgr").playerData.physicalPower = physicalPower;
    require("dataMgr").playerData.heart = heart;

    var str = require("textConfig").getTextByIdAndLanguageType(164);

    require("notificationMgr").pushNoti(str);

    require("systemsMgr").closeSystem(this.sysName);
  },
  //advertis delegate
  onVideoAdEnd: function onVideoAdEnd() {
    var status = require("dataMgr").playerData.signInStatus;

    switch (status) {
      case 1:
        this.signIn(2);
        break;

      case 2:
        this.signIn(3);
        break;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3N5c3RlbXMvc2lnbkluU3lzL3NpZ25JblN5c01nci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImVuc3VyZUJ1dHRvbk5vZGUiLCJOb2RlIiwiY2FuY2VsQnV0dG9uTm9kZSIsImRlc0xhYmVsTm9kZSIsIkxhYmVsIiwicGh5c2ljYWxQb3dlckFkZE51bSIsImhlYXJ0QWRkTnVtIiwiYWRkUmF0ZUZvckFkIiwic3lzTmFtZSIsInN0YXJ0Iiwic2V0dXBEYXRhIiwic2V0dXBVSSIsInN0YXR1cyIsInJlcXVpcmUiLCJwbGF5ZXJEYXRhIiwic2lnbkluU3RhdHVzIiwiZGVzU3RyIiwidGV4dENvbmZpZyIsImdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRDb21wb25lbnQiLCJzdHJpbmciLCJ0b1N0cmluZyIsImFjdGl2ZSIsIngiLCJkZWx0YSIsInNpZ25JblJlZnJlc2hEZWx0YSIsImgiLCJNYXRoIiwiZmxvb3IiLCJtIiwicyIsImdldEZvcm1hdGVkU3RyaW5nIiwibG9nIiwiY29uZmlnIiwib25DbGlja0Vuc3VyZUJ1dHRvbiIsImFkdk1nciIsImRlbGVnYXRlIiwic2hvd1ZpZGVvQWQiLCJjbG9zZVN5c3RlbSIsIm9uQ2xpY2tDYW5jZWxCdXR0b24iLCJzaWduSW4iLCJzaWduSW5UeXBlIiwibmV0d29ya01nciIsIm1zZ09iaiIsIm1ha2VNZXNzYWdlT2JqIiwibWVzc2FnZSIsInBsYXllcklkIiwiaWQiLCJzZWxmIiwic3VjY2Vzc0NhbGxCYWNrIiwieGhyIiwicmVzcG9uc2UiLCJyZXNwb25zZVRleHQiLCJKU09OIiwicGFyc2UiLCJ0eXBlIiwicGh5c2ljYWxQb3dlciIsImhlYXJ0Iiwib25TaWduSW5TdWNjZXNzIiwic2VuZE1lc3NhZ2VCeU1zZ09iaiIsInN0ciIsInB1c2hOb3RpIiwib25WaWRlb0FkRW5kIl0sIm1hcHBpbmdz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QUwsQ0FBWSxDQUFaO0FBQ0E7QUFOUjtBQVFILEdBMUtJLENBMktMOztBQTNLSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cHM6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgICAgIGVuc3VyZUJ1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGNhbmNlbEJ1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGRlc0xhYmVsTm9kZTogY2MuTGFiZWwsXG4gICAgICAgIHBoeXNpY2FsUG93ZXJBZGROdW06IDAsXG4gICAgICAgIGhlYXJ0QWRkTnVtOiAwLFxuICAgICAgICBhZGRSYXRlRm9yQWQ6IDAsXG4gICAgICAgIHN5c05hbWU6IFwic2lnbkluU3lzXCJcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuc2V0dXBEYXRhKClcbiAgICAgICAgdGhpcy5zZXR1cFVJKClcbiAgICB9LFxuICAgIHNldHVwVUkoKSB7XG4gICAgICAgIHZhciBzdGF0dXMgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLnNpZ25JblN0YXR1c1xuICAgICAgICAvLzEgPSBub3Qgc2lnbiBpblxuICAgICAgICAvLzIgPSBjb21tb24gaW5cbiAgICAgICAgLy8zID0gYWQgc2lnbiBpblxuICAgICAgICB2YXIgZGVzU3RyID0gXCJcIlxuICAgICAgICB2YXIgdGV4dENvbmZpZyA9IHJlcXVpcmUoXCJ0ZXh0Q29uZmlnXCIpXG4gICAgICAgIHN3aXRjaChzdGF0dXMpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBkZXNTdHIgPSB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDExNSkgKyB0aGlzLnBoeXNpY2FsUG93ZXJBZGROdW0gKyB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDExNikgKyB0aGlzLmhlYXJ0QWRkTnVtICtcIiwgXCJcbiAgICAgICAgICAgICAgICBkZXNTdHIgPSBkZXNTdHIgKyB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDExNylcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbEJ1dHRvbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0TGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDExOClcbiAgICAgICAgICAgICAgICB0aGlzLmVuc3VyZUJ1dHRvbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0TGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDExMylcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGRlc1N0ciA9IHRleHRDb25maWcuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTE5KSArICgodGhpcy5hZGRSYXRlRm9yQWQgLSAxKSAqIHRoaXMucGh5c2ljYWxQb3dlckFkZE51bSkudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIGRlc1N0ciA9IGRlc1N0ciArIHRleHRDb25maWcuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTE2KSArICgodGhpcy5hZGRSYXRlRm9yQWQgLSAxKSAqIHRoaXMuaGVhcnRBZGROdW0pLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICBkZXNTdHIgPSBkZXNTdHIgKyB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDEyMClcbiAgICAgICAgICAgICAgICB0aGlzLmVuc3VyZUJ1dHRvbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0TGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDExMylcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbEJ1dHRvbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0TGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDExNClcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGRlc1N0ciA9IHRleHRDb25maWcuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTIxKVxuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsQnV0dG9uTm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuZW5zdXJlQnV0dG9uTm9kZS54ID0gMFxuICAgICAgICAgICAgICAgIHZhciBkZWx0YSA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuc2lnbkluUmVmcmVzaERlbHRhXG4gICAgICAgICAgICAgICAgdmFyIGggPSBNYXRoLmZsb29yKGRlbHRhIC8gMzYwMClcbiAgICAgICAgICAgICAgICB2YXIgbSA9IE1hdGguZmxvb3IoZGVsdGEgJSAzNjAwIC8gNjApXG4gICAgICAgICAgICAgICAgdmFyIHMgPSBoLnRvU3RyaW5nKCkgKyBcImggXCIgKyBtLnRvU3RyaW5nKCkgKyBcIm0gXCIgXG4gICAgICAgICAgICAgICAgdGhpcy5lbnN1cmVCdXR0b25Ob2RlLmdldENoaWxkQnlOYW1lKFwidGV4dExhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGV4dENvbmZpZy5nZXRGb3JtYXRlZFN0cmluZygxMjIsW3NdKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlc1N0ciA9PSBcIlwiKSB7XG4gICAgICAgICAgICBjYy5sb2coXCJ3cm9uZyBzaWduSW4gc3RhdHVzXCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGVzTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZGVzU3RyXG5cbiAgICB9LFxuXG4gICAgc2V0dXBEYXRhKCkge1xuICAgICAgICB2YXIgY29uZmlnID0gcmVxdWlyZShcInNpZ25JblN5c0NvbmZpZ1wiKVxuICAgICAgICB0aGlzLnBoeXNpY2FsUG93ZXJBZGROdW0gPSBjb25maWcucGh5c2ljYWxQb3dlckFkZE51bVxuICAgICAgICB0aGlzLmhlYXJ0QWRkTnVtID0gY29uZmlnLmhlYXJ0QWRkTnVtXG4gICAgICAgIHRoaXMuYWRkUmF0ZUZvckFkID0gY29uZmlnLmFkZFJhdGVGb3JBZFxuICAgIH0sXG5cbiAgICBvbkNsaWNrRW5zdXJlQnV0dG9uKCl7XG4gICAgICAgIHZhciBzdGF0dXMgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLnNpZ25JblN0YXR1c1xuICAgICAgICBzd2l0Y2goc3RhdHVzKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgdmFyIGFkdk1nciA9IHJlcXVpcmUoXCJhZHZlcnRpc01nclwiKVxuICAgICAgICAgICAgICAgIGFkdk1nci5kZWxlZ2F0ZSA9IHRoaXNcbiAgICAgICAgICAgICAgICBhZHZNZ3Iuc2hvd1ZpZGVvQWQoKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdmFyIGFkdk1nciA9IHJlcXVpcmUoXCJhZHZlcnRpc01nclwiKVxuICAgICAgICAgICAgICAgIGFkdk1nci5kZWxlZ2F0ZSA9IHRoaXNcbiAgICAgICAgICAgICAgICBhZHZNZ3Iuc2hvd1ZpZGVvQWQoKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmVxdWlyZShcInN5c3RlbXNNZ3JcIikuY2xvc2VTeXN0ZW0odGhpcy5zeXNOYW1lKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25DbGlja0NhbmNlbEJ1dHRvbigpIHtcbiAgICAgICAgdmFyIHN0YXR1cyA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuc2lnbkluU3RhdHVzXG4gICAgICAgIHN3aXRjaChzdGF0dXMpIHtcbiAgICAgICAgICAgIGNhc2UgMTogXG4gICAgICAgICAgICAgICAgdGhpcy5zaWduSW4oMSlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJlcXVpcmUoXCJzeXN0ZW1zTWdyXCIpLmNsb3NlU3lzdGVtKHRoaXMuc3lzTmFtZSlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIC8vIGlmIHN0YXR1cyA9PSAzLCBjYW5jZWwgYnV0dG9uIHdpbGwgbm90IGFwcGVhclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcInNvbWUgd3JvbmcgdGhpbmcgaGFwcGVuIGZyb20gb25DbGlja0NhbmNlbEJ1dHRvblwiKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2lnbkluKHNpZ25JblR5cGUpIHtcbiAgICAgICAgdmFyIG5ldHdvcmtNZ3IgPSByZXF1aXJlKFwibmV0d29ya01nclwiKVxuICAgICAgICB2YXIgbXNnT2JqID0gbmV0d29ya01nci5tYWtlTWVzc2FnZU9iaihcInNpZ25Jbk1vZHVsZVwiLFwic2lnbkluTWVzc2FnZVR5cGVcIilcbiAgICAgICAgbXNnT2JqLm1lc3NhZ2Uuc2lnbkluVHlwZSA9IHNpZ25JblR5cGVcbiAgICAgICAgbXNnT2JqLm1lc3NhZ2UucGxheWVySWQgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmlkXG4gICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICBtc2dPYmouc3VjY2Vzc0NhbGxCYWNrID0gZnVuY3Rpb24oeGhyKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS50eXBlID09IFwic3VjY2Vzc1wiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBoeXNpY2FsUG93ZXIgPSByZXNwb25zZS5waHlzaWNhbFBvd2VyXG4gICAgICAgICAgICAgICAgdmFyIGhlYXJ0ID0gcmVzcG9uc2UuaGVhcnRcbiAgICAgICAgICAgICAgICBzZWxmLm9uU2lnbkluU3VjY2VzcyhzaWduSW5UeXBlLHBoeXNpY2FsUG93ZXIsaGVhcnQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuZXR3b3JrTWdyLnNlbmRNZXNzYWdlQnlNc2dPYmoobXNnT2JqKVxuICAgIH0sXG5cbiAgICBvblNpZ25JblN1Y2Nlc3Moc2lnbkluVHlwZSxwaHlzaWNhbFBvd2VyLGhlYXJ0KSB7XG4gICAgICAgIHN3aXRjaChzaWduSW5UeXBlKXtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLnNpZ25JblN0YXR1cyA9IDJcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuc2lnbkluU3RhdHVzID0gM1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5zaWduSW5TdGF0dXMgPSAzXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEucGh5c2ljYWxQb3dlciA9IHBoeXNpY2FsUG93ZXJcbiAgICAgICAgcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5oZWFydCA9IGhlYXJ0XG4gICAgICAgIHZhciBzdHIgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKS5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxNjQpXG4gICAgICAgIHJlcXVpcmUoXCJub3RpZmljYXRpb25NZ3JcIikucHVzaE5vdGkoc3RyKVxuICAgICAgICByZXF1aXJlKFwic3lzdGVtc01nclwiKS5jbG9zZVN5c3RlbSh0aGlzLnN5c05hbWUpXG4gICAgfSxcblxuICAgIC8vYWR2ZXJ0aXMgZGVsZWdhdGVcbiAgICBvblZpZGVvQWRFbmQoKSB7XG4gICAgICAgIHZhciBzdGF0dXMgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLnNpZ25JblN0YXR1c1xuICAgICAgICBzd2l0Y2goc3RhdHVzKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgdGhpcy5zaWduSW4oMilcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHRoaXMuc2lnbkluKDMpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19