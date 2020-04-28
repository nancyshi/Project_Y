
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/systems/welfarySys/welfarySysMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b76ban9vyBAI6HjYNJk1oHH', 'welfarySysMgr');
// scripts/systems/welfarySys/welfarySysMgr.js

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
    desLabelNode: cc.Node,
    ensureButtonNode: cc.Node,
    cancelButtonNode: cc.Node,
    systemName: "welfarySys"
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    this.setupInitUI();
  },
  onClickEnsureButton: function onClickEnsureButton() {
    var advMgr = require("advertisMgr");

    advMgr.delegate = this;
    advMgr.showVideoAd();
  },
  onClickCancelButton: function onClickCancelButton() {
    require("systemsMgr").closeSystem(this.systemName);
  },
  setupInitUI: function setupInitUI() {
    var flag = require("dataMgr").playerData.initAdWatchedFlag;

    if (flag == 0) {
      this.desLabelNode.getComponent(cc.Label).string = require("textConfig").getTextByIdAndLanguageType(112);
      this.ensureButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = require("textConfig").getTextByIdAndLanguageType(113);
      this.cancelButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = require("textConfig").getTextByIdAndLanguageType(114);
    } else if (flag == 1) {
      this.desLabelNode.getComponent(cc.Label).string = "嗯？ 这个界面不应该出现的，你已经领取过福利啦~";
    }
  },
  //advertis delegate
  onVideoAdEnd: function onVideoAdEnd() {
    var commitBody = {
      initAdWatchedFlag: 1
    };
    var self = this;

    var successCallBack = function successCallBack() {
      require("dataMgr").playerData.initAdWatchedFlag = 1;

      require("systemsMgr").closeSystem(self.systemName);

      var currentScene = cc.director.getScene();

      if (currentScene.name == "mainScene") {
        currentScene.getChildByName("Canvas").getChildByName("welfaryButton").active = false;
      }
    };

    require("dataMgr").commitPlayerDataToServer(commitBody, successCallBack);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3N5c3RlbXMvd2VsZmFyeVN5cy93ZWxmYXJ5U3lzTWdyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZGVzTGFiZWxOb2RlIiwiTm9kZSIsImVuc3VyZUJ1dHRvbk5vZGUiLCJjYW5jZWxCdXR0b25Ob2RlIiwic3lzdGVtTmFtZSIsInN0YXJ0Iiwic2V0dXBJbml0VUkiLCJvbkNsaWNrRW5zdXJlQnV0dG9uIiwiYWR2TWdyIiwicmVxdWlyZSIsImRlbGVnYXRlIiwic2hvd1ZpZGVvQWQiLCJvbkNsaWNrQ2FuY2VsQnV0dG9uIiwiY2xvc2VTeXN0ZW0iLCJmbGFnIiwicGxheWVyRGF0YSIsImluaXRBZFdhdGNoZWRGbGFnIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciLCJnZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSIsImdldENoaWxkQnlOYW1lIiwib25WaWRlb0FkRW5kIiwiY29tbWl0Qm9keSIsInNlbGYiLCJzdWNjZXNzQ2FsbEJhY2siLCJjdXJyZW50U2NlbmUiLCJkaXJlY3RvciIsImdldFNjZW5lIiwibmFtZSIsImFjdGl2ZSIsImNvbW1pdFBsYXllckRhdGFUb1NlcnZlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLElBQUFBLFlBQVksRUFBRUosRUFBRSxDQUFDSyxJQWhCVDtBQWlCUkMsSUFBQUEsZ0JBQWdCLEVBQUVOLEVBQUUsQ0FBQ0ssSUFqQmI7QUFrQlJFLElBQUFBLGdCQUFnQixFQUFFUCxFQUFFLENBQUNLLElBbEJiO0FBbUJSRyxJQUFBQSxVQUFVLEVBQUU7QUFuQkosR0FIUDtBQXlCTDtBQUVBO0FBRUFDLEVBQUFBLEtBN0JLLG1CQTZCSTtBQUNMLFNBQUtDLFdBQUw7QUFDSCxHQS9CSTtBQWlDTEMsRUFBQUEsbUJBakNLLGlDQWlDaUI7QUFDbEIsUUFBSUMsTUFBTSxHQUFHQyxPQUFPLENBQUMsYUFBRCxDQUFwQjs7QUFDQUQsSUFBQUEsTUFBTSxDQUFDRSxRQUFQLEdBQWtCLElBQWxCO0FBQ0FGLElBQUFBLE1BQU0sQ0FBQ0csV0FBUDtBQUNILEdBckNJO0FBdUNMQyxFQUFBQSxtQkF2Q0ssaUNBdUNpQjtBQUNsQkgsSUFBQUEsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQkksV0FBdEIsQ0FBa0MsS0FBS1QsVUFBdkM7QUFDSCxHQXpDSTtBQTJDTEUsRUFBQUEsV0EzQ0sseUJBMkNTO0FBQ1YsUUFBSVEsSUFBSSxHQUFHTCxPQUFPLENBQUMsU0FBRCxDQUFQLENBQW1CTSxVQUFuQixDQUE4QkMsaUJBQXpDOztBQUNBLFFBQUlGLElBQUksSUFBSSxDQUFaLEVBQWU7QUFDWCxXQUFLZCxZQUFMLENBQWtCaUIsWUFBbEIsQ0FBK0JyQixFQUFFLENBQUNzQixLQUFsQyxFQUF5Q0MsTUFBekMsR0FBa0RWLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0JXLDBCQUF0QixDQUFpRCxHQUFqRCxDQUFsRDtBQUNBLFdBQUtsQixnQkFBTCxDQUFzQm1CLGNBQXRCLENBQXFDLFdBQXJDLEVBQWtESixZQUFsRCxDQUErRHJCLEVBQUUsQ0FBQ3NCLEtBQWxFLEVBQXlFQyxNQUF6RSxHQUFrRlYsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQlcsMEJBQXRCLENBQWlELEdBQWpELENBQWxGO0FBQ0EsV0FBS2pCLGdCQUFMLENBQXNCa0IsY0FBdEIsQ0FBcUMsV0FBckMsRUFBa0RKLFlBQWxELENBQStEckIsRUFBRSxDQUFDc0IsS0FBbEUsRUFBeUVDLE1BQXpFLEdBQWtGVixPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCVywwQkFBdEIsQ0FBaUQsR0FBakQsQ0FBbEY7QUFDSCxLQUpELE1BS0ssSUFBSU4sSUFBSSxJQUFJLENBQVosRUFBZTtBQUNoQixXQUFLZCxZQUFMLENBQWtCaUIsWUFBbEIsQ0FBK0JyQixFQUFFLENBQUNzQixLQUFsQyxFQUF5Q0MsTUFBekMsR0FBa0QsMEJBQWxEO0FBQ0g7QUFDSixHQXJESTtBQXVETDtBQUNBRyxFQUFBQSxZQXhESywwQkF3RFU7QUFDWCxRQUFJQyxVQUFVLEdBQUc7QUFDYlAsTUFBQUEsaUJBQWlCLEVBQUU7QUFETixLQUFqQjtBQUdBLFFBQUlRLElBQUksR0FBRyxJQUFYOztBQUNBLFFBQUlDLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsR0FBVztBQUM3QmhCLE1BQUFBLE9BQU8sQ0FBQyxTQUFELENBQVAsQ0FBbUJNLFVBQW5CLENBQThCQyxpQkFBOUIsR0FBa0QsQ0FBbEQ7O0FBQ0FQLE1BQUFBLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0JJLFdBQXRCLENBQWtDVyxJQUFJLENBQUNwQixVQUF2Qzs7QUFDQSxVQUFJc0IsWUFBWSxHQUFHOUIsRUFBRSxDQUFDK0IsUUFBSCxDQUFZQyxRQUFaLEVBQW5COztBQUNBLFVBQUlGLFlBQVksQ0FBQ0csSUFBYixJQUFxQixXQUF6QixFQUFzQztBQUNsQ0gsUUFBQUEsWUFBWSxDQUFDTCxjQUFiLENBQTRCLFFBQTVCLEVBQXNDQSxjQUF0QyxDQUFxRCxlQUFyRCxFQUFzRVMsTUFBdEUsR0FBK0UsS0FBL0U7QUFDSDtBQUNKLEtBUEQ7O0FBUUFyQixJQUFBQSxPQUFPLENBQUMsU0FBRCxDQUFQLENBQW1Cc0Isd0JBQW5CLENBQTRDUixVQUE1QyxFQUF1REUsZUFBdkQ7QUFDSCxHQXRFSSxDQXVFTDs7QUF2RUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHBzOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICBkZXNMYWJlbE5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGVuc3VyZUJ1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIGNhbmNlbEJ1dHRvbk5vZGU6IGNjLk5vZGUsXG4gICAgICAgIHN5c3RlbU5hbWU6IFwid2VsZmFyeVN5c1wiXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQgKCkge1xuICAgICAgICB0aGlzLnNldHVwSW5pdFVJKClcbiAgICB9LFxuXG4gICAgb25DbGlja0Vuc3VyZUJ1dHRvbigpIHtcbiAgICAgICAgdmFyIGFkdk1nciA9IHJlcXVpcmUoXCJhZHZlcnRpc01nclwiKVxuICAgICAgICBhZHZNZ3IuZGVsZWdhdGUgPSB0aGlzXG4gICAgICAgIGFkdk1nci5zaG93VmlkZW9BZCgpXG4gICAgfSxcblxuICAgIG9uQ2xpY2tDYW5jZWxCdXR0b24oKSB7XG4gICAgICAgIHJlcXVpcmUoXCJzeXN0ZW1zTWdyXCIpLmNsb3NlU3lzdGVtKHRoaXMuc3lzdGVtTmFtZSlcbiAgICB9LFxuICAgIFxuICAgIHNldHVwSW5pdFVJKCkge1xuICAgICAgICB2YXIgZmxhZyA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuaW5pdEFkV2F0Y2hlZEZsYWdcbiAgICAgICAgaWYgKGZsYWcgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5kZXNMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKS5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxMTIpXG4gICAgICAgICAgICB0aGlzLmVuc3VyZUJ1dHRvbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0TGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKS5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxMTMpXG4gICAgICAgICAgICB0aGlzLmNhbmNlbEJ1dHRvbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0TGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKS5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxMTQpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZmxhZyA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmRlc0xhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi5Zev77yfIOi/meS4queVjOmdouS4jeW6lOivpeWHuueOsOeahO+8jOS9oOW3sue7j+mihuWPlui/h+emj+WIqeWVpn5cIlxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vYWR2ZXJ0aXMgZGVsZWdhdGVcbiAgICBvblZpZGVvQWRFbmQoKSB7XG4gICAgICAgIHZhciBjb21taXRCb2R5ID0ge1xuICAgICAgICAgICAgaW5pdEFkV2F0Y2hlZEZsYWc6IDFcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgdmFyIHN1Y2Nlc3NDYWxsQmFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5pbml0QWRXYXRjaGVkRmxhZyA9IDFcbiAgICAgICAgICAgIHJlcXVpcmUoXCJzeXN0ZW1zTWdyXCIpLmNsb3NlU3lzdGVtKHNlbGYuc3lzdGVtTmFtZSlcbiAgICAgICAgICAgIHZhciBjdXJyZW50U2NlbmUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpXG4gICAgICAgICAgICBpZiAoY3VycmVudFNjZW5lLm5hbWUgPT0gXCJtYWluU2NlbmVcIikge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTY2VuZS5nZXRDaGlsZEJ5TmFtZShcIkNhbnZhc1wiKS5nZXRDaGlsZEJ5TmFtZShcIndlbGZhcnlCdXR0b25cIikuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXF1aXJlKFwiZGF0YU1nclwiKS5jb21taXRQbGF5ZXJEYXRhVG9TZXJ2ZXIoY29tbWl0Qm9keSxzdWNjZXNzQ2FsbEJhY2spXG4gICAgfSxcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19