
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3N5c3RlbXMvYWRkUHJvcGVydHlOdW1TeXMvYWRkUHJvcGVydHlOdW1TeXNNZ3IuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJlbnN1cmVCdXR0b25Ob2RlIiwiTm9kZSIsImNhbmNlbEJ1dHRvbk5vZGUiLCJkZXNMYWJlbE5vZGUiLCJhZGRUeXBlSWQiLCJhZGRDb25maWciLCJzeXNOYW1lIiwic3RhcnQiLCJzZXR1cERhdGEiLCJzZXR1cFVJIiwiY29uZmlnIiwicmVxdWlyZSIsInRleHRDb25maWciLCJkZXNTdHIiLCJnZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSIsImlzRmlyc3RLZXkiLCJrZXkiLCJ0b1N0cmluZyIsImdldENvbXBvbmVudCIsIkxhYmVsIiwic3RyaW5nIiwiZ2V0Q2hpbGRCeU5hbWUiLCJvbldpbGxPcGVuZCIsImdpdmVuQWRkVHlwZUlkIiwib25DbGlja0Vuc3VyZUJ1dHRvbiIsImFkdmVydGlzTWdyIiwiZGVsZWdhdGUiLCJzaG93VmlkZW9BZCIsIm9uQ2xpY2tDYW5jZWxCdXR0b24iLCJjbG9zZVN5c3RlbSIsIm9uVmlkZW9BZEVuZCIsImNvbW1pdEJvZHkiLCJvbmVBZGRlZFByb3BlcnR5TnVtIiwicGxheWVyRGF0YSIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJzdWNjZXNzQ2FsbEJhY2siLCJrIiwiY29tbWl0UGxheWVyRGF0YVRvU2VydmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFBLFlBbEZLLDBCQWtGVTtBQUNYLFFBQUlDLFVBQVUsR0FBRyxFQUFqQjs7QUFDQSxTQUFLLElBQUlmLEdBQVQsSUFBZ0IsS0FBS1gsU0FBckIsRUFBZ0M7QUFDNUIsVUFBSTJCLG1CQUFtQixHQUFHckIsT0FBTyxDQUFDLFNBQUQsQ0FBUCxDQUFtQnNCLFVBQW5CLENBQThCakIsR0FBOUIsSUFBcUMsS0FBS1gsU0FBTCxDQUFlVyxHQUFmLENBQS9EO0FBQ0FlLE1BQUFBLFVBQVUsQ0FBQ2YsR0FBRCxDQUFWLEdBQWtCZ0IsbUJBQWxCO0FBQ0g7O0FBRUQsUUFBSUUsTUFBTSxDQUFDQyxJQUFQLENBQVlKLFVBQVosRUFBd0JLLE1BQXhCLEdBQWlDLENBQXJDLEVBQXdDO0FBQ3BDLFVBQUlDLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsR0FBVztBQUM3QixhQUFLLElBQUlDLENBQVQsSUFBY1AsVUFBZCxFQUEwQjtBQUN0QnBCLFVBQUFBLE9BQU8sQ0FBQyxTQUFELENBQVAsQ0FBbUJzQixVQUFuQixDQUE4QkssQ0FBOUIsSUFBbUNQLFVBQVUsQ0FBQ08sQ0FBRCxDQUE3QztBQUNIO0FBQ0osT0FKRDs7QUFNQTNCLE1BQUFBLE9BQU8sQ0FBQyxTQUFELENBQVAsQ0FBbUI0Qix3QkFBbkIsQ0FBNENSLFVBQTVDLEVBQXVETSxlQUF2RDs7QUFDQTFCLE1BQUFBLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0JrQixXQUF0QixDQUFrQyxLQUFLdkIsT0FBdkMsRUFBK0MsQ0FBL0M7QUFDSDtBQUNKLEdBbkdJLENBb0dMOztBQXBHSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cHM6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgICAgIGVuc3VyZUJ1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGNhbmNlbEJ1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGRlc0xhYmVsTm9kZTogY2MuTm9kZSxcbiAgICAgICAgYWRkVHlwZUlkOiAxICxcbiAgICAgICAgYWRkQ29uZmlnOiBudWxsLFxuICAgICAgICBzeXNOYW1lOiBcImFkZFByb3BlcnR5TnVtU3lzXCJcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuc2V0dXBEYXRhKClcbiAgICAgICAgdGhpcy5zZXR1cFVJKClcbiAgICB9LFxuXG4gICAgc2V0dXBEYXRhKCkge1xuICAgICAgICB2YXIgY29uZmlnID0gcmVxdWlyZShcImFkZFByb3BlcnR5U3lzQ29uZmlnXCIpXG4gICAgICAgIGNvbmZpZyA9IGNvbmZpZ1t0aGlzLmFkZFR5cGVJZF1cbiAgICAgICAgdGhpcy5hZGRDb25maWcgPSBjb25maWdcbiAgICB9LFxuXG4gICAgc2V0dXBVSSgpIHtcbiAgICAgICAgdmFyIHRleHRDb25maWcgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKVxuICAgICAgICB2YXIgZGVzU3RyID0gdGV4dENvbmZpZy5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxMjMpXG4gICAgICAgIHZhciBpc0ZpcnN0S2V5ID0gdHJ1ZVxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5hZGRDb25maWcpIHtcbiAgICAgICAgICAgIGlmIChpc0ZpcnN0S2V5ID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZGVzU3RyICs9IFwi77yMXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBoeXNpY2FsUG93ZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgZGVzU3RyICs9IHRleHRDb25maWcuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTI0KSArIHRoaXMuYWRkQ29uZmlnW2tleV0udG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgXCJoZWFydFwiOlxuICAgICAgICAgICAgICAgICAgICBkZXNTdHIgKz0gdGV4dENvbmZpZy5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxMjUpICsgdGhpcy5hZGRDb25maWdba2V5XS50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpc0ZpcnN0S2V5ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBkZXNTdHIgKz0gdGV4dENvbmZpZy5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxMjYpXG4gICAgICAgIHRoaXMuZGVzTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZGVzU3RyXG4gICAgICAgIHRoaXMuZW5zdXJlQnV0dG9uTm9kZS5nZXRDaGlsZEJ5TmFtZShcInRleHRMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRleHRDb25maWcuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTEzKVxuICAgICAgICB0aGlzLmNhbmNlbEJ1dHRvbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0TGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDExNClcbiAgICB9LFxuXG4gICAgb25XaWxsT3BlbmQoZ2l2ZW5BZGRUeXBlSWQpIHtcbiAgICAgICAgdGhpcy5hZGRUeXBlSWQgPSBnaXZlbkFkZFR5cGVJZFxuICAgIH0sXG5cbiAgICBvbkNsaWNrRW5zdXJlQnV0dG9uKCl7XG4gICAgICAgIHZhciBhZHZlcnRpc01nciA9IHJlcXVpcmUoXCJhZHZlcnRpc01nclwiKVxuICAgICAgICBhZHZlcnRpc01nci5kZWxlZ2F0ZSA9IHRoaXNcbiAgICAgICAgYWR2ZXJ0aXNNZ3Iuc2hvd1ZpZGVvQWQoKVxuICAgIH0sXG5cbiAgICBvbkNsaWNrQ2FuY2VsQnV0dG9uKCkge1xuICAgICAgICByZXF1aXJlKFwic3lzdGVtc01nclwiKS5jbG9zZVN5c3RlbSh0aGlzLnN5c05hbWUpXG4gICAgfSxcblxuXG4gICAgLy9hZHZlcnRpcyBkZWxlZ2F0ZVxuICAgIG9uVmlkZW9BZEVuZCgpIHtcbiAgICAgICAgdmFyIGNvbW1pdEJvZHkgPSB7fVxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5hZGRDb25maWcpIHtcbiAgICAgICAgICAgIHZhciBvbmVBZGRlZFByb3BlcnR5TnVtID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YVtrZXldICsgdGhpcy5hZGRDb25maWdba2V5XVxuICAgICAgICAgICAgY29tbWl0Qm9keVtrZXldID0gb25lQWRkZWRQcm9wZXJ0eU51bVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNvbW1pdEJvZHkpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBzdWNjZXNzQ2FsbEJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrIGluIGNvbW1pdEJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YVtrXSA9IGNvbW1pdEJvZHlba11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcXVpcmUoXCJkYXRhTWdyXCIpLmNvbW1pdFBsYXllckRhdGFUb1NlcnZlcihjb21taXRCb2R5LHN1Y2Nlc3NDYWxsQmFjaylcbiAgICAgICAgICAgIHJlcXVpcmUoXCJzeXN0ZW1zTWdyXCIpLmNsb3NlU3lzdGVtKHRoaXMuc3lzTmFtZSwyKVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=