
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
        currentScene.getChildByName("Canvas").getChildByName("enterButtons").getChildByName("welfaryButton").active = false;
      }

      var str = require("textConfig").getTextByIdAndLanguageType(165);

      require("notificationMgr").pushNoti(str);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3N5c3RlbXMvd2VsZmFyeVN5cy93ZWxmYXJ5U3lzTWdyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZGVzTGFiZWxOb2RlIiwiTm9kZSIsImVuc3VyZUJ1dHRvbk5vZGUiLCJjYW5jZWxCdXR0b25Ob2RlIiwic3lzdGVtTmFtZSIsInN0YXJ0Iiwic2V0dXBJbml0VUkiLCJvbkNsaWNrRW5zdXJlQnV0dG9uIiwiYWR2TWdyIiwicmVxdWlyZSIsImRlbGVnYXRlIiwic2hvd1ZpZGVvQWQiLCJvbkNsaWNrQ2FuY2VsQnV0dG9uIiwiY2xvc2VTeXN0ZW0iLCJmbGFnIiwicGxheWVyRGF0YSIsImluaXRBZFdhdGNoZWRGbGFnIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciLCJnZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSIsImdldENoaWxkQnlOYW1lIiwib25WaWRlb0FkRW5kIiwiY29tbWl0Qm9keSIsInNlbGYiLCJzdWNjZXNzQ2FsbEJhY2siLCJjdXJyZW50U2NlbmUiLCJkaXJlY3RvciIsImdldFNjZW5lIiwibmFtZSIsImFjdGl2ZSIsInN0ciIsInB1c2hOb3RpIiwiY29tbWl0UGxheWVyRGF0YVRvU2VydmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsWUFBWSxFQUFFSixFQUFFLENBQUNLLElBaEJUO0FBaUJSQyxJQUFBQSxnQkFBZ0IsRUFBRU4sRUFBRSxDQUFDSyxJQWpCYjtBQWtCUkUsSUFBQUEsZ0JBQWdCLEVBQUVQLEVBQUUsQ0FBQ0ssSUFsQmI7QUFtQlJHLElBQUFBLFVBQVUsRUFBRTtBQW5CSixHQUhQO0FBeUJMO0FBRUE7QUFFQUMsRUFBQUEsS0E3QkssbUJBNkJJO0FBQ0wsU0FBS0MsV0FBTDtBQUNILEdBL0JJO0FBaUNMQyxFQUFBQSxtQkFqQ0ssaUNBaUNpQjtBQUNsQixRQUFJQyxNQUFNLEdBQUdDLE9BQU8sQ0FBQyxhQUFELENBQXBCOztBQUNBRCxJQUFBQSxNQUFNLENBQUNFLFFBQVAsR0FBa0IsSUFBbEI7QUFDQUYsSUFBQUEsTUFBTSxDQUFDRyxXQUFQO0FBQ0gsR0FyQ0k7QUF1Q0xDLEVBQUFBLG1CQXZDSyxpQ0F1Q2lCO0FBQ2xCSCxJQUFBQSxPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCSSxXQUF0QixDQUFrQyxLQUFLVCxVQUF2QztBQUNILEdBekNJO0FBMkNMRSxFQUFBQSxXQTNDSyx5QkEyQ1M7QUFDVixRQUFJUSxJQUFJLEdBQUdMLE9BQU8sQ0FBQyxTQUFELENBQVAsQ0FBbUJNLFVBQW5CLENBQThCQyxpQkFBekM7O0FBQ0EsUUFBSUYsSUFBSSxJQUFJLENBQVosRUFBZTtBQUNYLFdBQUtkLFlBQUwsQ0FBa0JpQixZQUFsQixDQUErQnJCLEVBQUUsQ0FBQ3NCLEtBQWxDLEVBQXlDQyxNQUF6QyxHQUFrRFYsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQlcsMEJBQXRCLENBQWlELEdBQWpELENBQWxEO0FBQ0EsV0FBS2xCLGdCQUFMLENBQXNCbUIsY0FBdEIsQ0FBcUMsV0FBckMsRUFBa0RKLFlBQWxELENBQStEckIsRUFBRSxDQUFDc0IsS0FBbEUsRUFBeUVDLE1BQXpFLEdBQWtGVixPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCVywwQkFBdEIsQ0FBaUQsR0FBakQsQ0FBbEY7QUFDQSxXQUFLakIsZ0JBQUwsQ0FBc0JrQixjQUF0QixDQUFxQyxXQUFyQyxFQUFrREosWUFBbEQsQ0FBK0RyQixFQUFFLENBQUNzQixLQUFsRSxFQUF5RUMsTUFBekUsR0FBa0ZWLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0JXLDBCQUF0QixDQUFpRCxHQUFqRCxDQUFsRjtBQUNILEtBSkQsTUFLSyxJQUFJTixJQUFJLElBQUksQ0FBWixFQUFlO0FBQ2hCLFdBQUtkLFlBQUwsQ0FBa0JpQixZQUFsQixDQUErQnJCLEVBQUUsQ0FBQ3NCLEtBQWxDLEVBQXlDQyxNQUF6QyxHQUFrRCwwQkFBbEQ7QUFDSDtBQUNKLEdBckRJO0FBdURMO0FBQ0FHLEVBQUFBLFlBeERLLDBCQXdEVTtBQUNYLFFBQUlDLFVBQVUsR0FBRztBQUNiUCxNQUFBQSxpQkFBaUIsRUFBRTtBQUROLEtBQWpCO0FBR0EsUUFBSVEsSUFBSSxHQUFHLElBQVg7O0FBQ0EsUUFBSUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixHQUFXO0FBQzdCaEIsTUFBQUEsT0FBTyxDQUFDLFNBQUQsQ0FBUCxDQUFtQk0sVUFBbkIsQ0FBOEJDLGlCQUE5QixHQUFrRCxDQUFsRDs7QUFDQVAsTUFBQUEsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQkksV0FBdEIsQ0FBa0NXLElBQUksQ0FBQ3BCLFVBQXZDOztBQUNBLFVBQUlzQixZQUFZLEdBQUc5QixFQUFFLENBQUMrQixRQUFILENBQVlDLFFBQVosRUFBbkI7O0FBQ0EsVUFBSUYsWUFBWSxDQUFDRyxJQUFiLElBQXFCLFdBQXpCLEVBQXNDO0FBQ2xDSCxRQUFBQSxZQUFZLENBQUNMLGNBQWIsQ0FBNEIsUUFBNUIsRUFBc0NBLGNBQXRDLENBQXFELGNBQXJELEVBQXFFQSxjQUFyRSxDQUFvRixlQUFwRixFQUFxR1MsTUFBckcsR0FBOEcsS0FBOUc7QUFDSDs7QUFDRCxVQUFJQyxHQUFHLEdBQUd0QixPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCVywwQkFBdEIsQ0FBaUQsR0FBakQsQ0FBVjs7QUFDQVgsTUFBQUEsT0FBTyxDQUFDLGlCQUFELENBQVAsQ0FBMkJ1QixRQUEzQixDQUFvQ0QsR0FBcEM7QUFDSCxLQVREOztBQVVBdEIsSUFBQUEsT0FBTyxDQUFDLFNBQUQsQ0FBUCxDQUFtQndCLHdCQUFuQixDQUE0Q1YsVUFBNUMsRUFBdURFLGVBQXZEO0FBQ0gsR0F4RUksQ0F5RUw7O0FBekVLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICAgICAgZGVzTGFiZWxOb2RlOiBjYy5Ob2RlLFxuICAgICAgICBlbnN1cmVCdXR0b25Ob2RlOiBjYy5Ob2RlLFxuICAgICAgICBjYW5jZWxCdXR0b25Ob2RlOiBjYy5Ob2RlLFxuICAgICAgICBzeXN0ZW1OYW1lOiBcIndlbGZhcnlTeXNcIlxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8vIG9uTG9hZCAoKSB7fSxcblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgdGhpcy5zZXR1cEluaXRVSSgpXG4gICAgfSxcblxuICAgIG9uQ2xpY2tFbnN1cmVCdXR0b24oKSB7XG4gICAgICAgIHZhciBhZHZNZ3IgPSByZXF1aXJlKFwiYWR2ZXJ0aXNNZ3JcIilcbiAgICAgICAgYWR2TWdyLmRlbGVnYXRlID0gdGhpc1xuICAgICAgICBhZHZNZ3Iuc2hvd1ZpZGVvQWQoKVxuICAgIH0sXG5cbiAgICBvbkNsaWNrQ2FuY2VsQnV0dG9uKCkge1xuICAgICAgICByZXF1aXJlKFwic3lzdGVtc01nclwiKS5jbG9zZVN5c3RlbSh0aGlzLnN5c3RlbU5hbWUpXG4gICAgfSxcbiAgICBcbiAgICBzZXR1cEluaXRVSSgpIHtcbiAgICAgICAgdmFyIGZsYWcgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmluaXRBZFdhdGNoZWRGbGFnXG4gICAgICAgIGlmIChmbGFnID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVzTGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVxdWlyZShcInRleHRDb25maWdcIikuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTEyKVxuICAgICAgICAgICAgdGhpcy5lbnN1cmVCdXR0b25Ob2RlLmdldENoaWxkQnlOYW1lKFwidGV4dExhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVxdWlyZShcInRleHRDb25maWdcIikuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTEzKVxuICAgICAgICAgICAgdGhpcy5jYW5jZWxCdXR0b25Ob2RlLmdldENoaWxkQnlOYW1lKFwidGV4dExhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVxdWlyZShcInRleHRDb25maWdcIikuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTE0KVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZsYWcgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5kZXNMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuWXr++8nyDov5nkuKrnlYzpnaLkuI3lupTor6Xlh7rnjrDnmoTvvIzkvaDlt7Lnu4/pooblj5bov4fnpo/liKnllaZ+XCJcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL2FkdmVydGlzIGRlbGVnYXRlXG4gICAgb25WaWRlb0FkRW5kKCkge1xuICAgICAgICB2YXIgY29tbWl0Qm9keSA9IHtcbiAgICAgICAgICAgIGluaXRBZFdhdGNoZWRGbGFnOiAxXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgIHZhciBzdWNjZXNzQ2FsbEJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuaW5pdEFkV2F0Y2hlZEZsYWcgPSAxXG4gICAgICAgICAgICByZXF1aXJlKFwic3lzdGVtc01nclwiKS5jbG9zZVN5c3RlbShzZWxmLnN5c3RlbU5hbWUpXG4gICAgICAgICAgICB2YXIgY3VycmVudFNjZW5lID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKVxuICAgICAgICAgICAgaWYgKGN1cnJlbnRTY2VuZS5uYW1lID09IFwibWFpblNjZW5lXCIpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50U2NlbmUuZ2V0Q2hpbGRCeU5hbWUoXCJDYW52YXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJlbnRlckJ1dHRvbnNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ3ZWxmYXJ5QnV0dG9uXCIpLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc3RyID0gcmVxdWlyZShcInRleHRDb25maWdcIikuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTY1KVxuICAgICAgICAgICAgcmVxdWlyZShcIm5vdGlmaWNhdGlvbk1nclwiKS5wdXNoTm90aShzdHIpXG4gICAgICAgIH1cbiAgICAgICAgcmVxdWlyZShcImRhdGFNZ3JcIikuY29tbWl0UGxheWVyRGF0YVRvU2VydmVyKGNvbW1pdEJvZHksc3VjY2Vzc0NhbGxCYWNrKVxuICAgIH0sXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==