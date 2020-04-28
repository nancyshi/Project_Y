
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/guildNodeMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4abf6f10txCYqgtMh4ibAyZ', 'guildNodeMgr');
// scripts/guildNodeMgr.js

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
    guildBgNode: cc.Node,
    guildLabelNode: cc.Node,
    buttonNode: cc.Node,
    header: 105,
    footer: 105,
    sectionDis: 50
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    this.setupUi();
  },
  setupUi: function setupUi() {
    var textConfig = require("textConfig");

    var bg = this.node.getChildByName("bg");
    bg.width = cc.winSize.width;
    bg.height = cc.winSize.height;
    bg.on("touchstart", function () {});
    this.guildLabelNode.getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(159);

    this.guildLabelNode.getComponent(cc.Label)._forceUpdateRenderData();

    var totalHeight = this.header + this.guildBgNode.height + this.sectionDis + this.guildLabelNode.height + this.sectionDis + this.buttonNode.height + this.footer;
    this.uibg.height = totalHeight;
    this.guildBgNode.y = this.uibg.height / 2 - this.header - this.guildBgNode.height / 2;
    this.guildLabelNode.y = this.guildBgNode.y - this.guildBgNode.height / 2 - this.sectionDis;
    this.buttonNode.y = -this.uibg.height / 2 + this.footer + this.buttonNode.height / 2;
    var self = this;
    this.buttonNode.on("click", function () {
      self.node.destroy();
    });
    this.buttonNode.getChildByName("textLabel").getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(122);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2d1aWxkTm9kZU1nci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInVpYmciLCJOb2RlIiwiZ3VpbGRCZ05vZGUiLCJndWlsZExhYmVsTm9kZSIsImJ1dHRvbk5vZGUiLCJoZWFkZXIiLCJmb290ZXIiLCJzZWN0aW9uRGlzIiwic3RhcnQiLCJzZXR1cFVpIiwidGV4dENvbmZpZyIsInJlcXVpcmUiLCJiZyIsIm5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsIndpZHRoIiwid2luU2l6ZSIsImhlaWdodCIsIm9uIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciLCJnZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSIsIl9mb3JjZVVwZGF0ZVJlbmRlckRhdGEiLCJ0b3RhbEhlaWdodCIsInkiLCJzZWxmIiwiZGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLElBQUFBLElBQUksRUFBRUosRUFBRSxDQUFDSyxJQWhCRDtBQWlCUkMsSUFBQUEsV0FBVyxFQUFFTixFQUFFLENBQUNLLElBakJSO0FBa0JSRSxJQUFBQSxjQUFjLEVBQUVQLEVBQUUsQ0FBQ0ssSUFsQlg7QUFtQlJHLElBQUFBLFVBQVUsRUFBRVIsRUFBRSxDQUFDSyxJQW5CUDtBQXFCUkksSUFBQUEsTUFBTSxFQUFFLEdBckJBO0FBc0JSQyxJQUFBQSxNQUFNLEVBQUUsR0F0QkE7QUF1QlJDLElBQUFBLFVBQVUsRUFBRTtBQXZCSixHQUhQO0FBNkJMO0FBRUE7QUFFQUMsRUFBQUEsS0FqQ0ssbUJBaUNJO0FBQ0wsU0FBS0MsT0FBTDtBQUNILEdBbkNJO0FBcUNMQSxFQUFBQSxPQXJDSyxxQkFxQ0s7QUFDTixRQUFJQyxVQUFVLEdBQUdDLE9BQU8sQ0FBQyxZQUFELENBQXhCOztBQUNBLFFBQUlDLEVBQUUsR0FBRyxLQUFLQyxJQUFMLENBQVVDLGNBQVYsQ0FBeUIsSUFBekIsQ0FBVDtBQUNBRixJQUFBQSxFQUFFLENBQUNHLEtBQUgsR0FBV25CLEVBQUUsQ0FBQ29CLE9BQUgsQ0FBV0QsS0FBdEI7QUFDQUgsSUFBQUEsRUFBRSxDQUFDSyxNQUFILEdBQVlyQixFQUFFLENBQUNvQixPQUFILENBQVdDLE1BQXZCO0FBQ0FMLElBQUFBLEVBQUUsQ0FBQ00sRUFBSCxDQUFNLFlBQU4sRUFBbUIsWUFBVSxDQUFFLENBQS9CO0FBRUEsU0FBS2YsY0FBTCxDQUFvQmdCLFlBQXBCLENBQWlDdkIsRUFBRSxDQUFDd0IsS0FBcEMsRUFBMkNDLE1BQTNDLEdBQW9EWCxVQUFVLENBQUNZLDBCQUFYLENBQXNDLEdBQXRDLENBQXBEOztBQUNBLFNBQUtuQixjQUFMLENBQW9CZ0IsWUFBcEIsQ0FBaUN2QixFQUFFLENBQUN3QixLQUFwQyxFQUEyQ0csc0JBQTNDOztBQUVBLFFBQUlDLFdBQVcsR0FBRyxLQUFLbkIsTUFBTCxHQUFjLEtBQUtILFdBQUwsQ0FBaUJlLE1BQS9CLEdBQXdDLEtBQUtWLFVBQTdDLEdBQTBELEtBQUtKLGNBQUwsQ0FBb0JjLE1BQTlFLEdBQXVGLEtBQUtWLFVBQTVGLEdBQXlHLEtBQUtILFVBQUwsQ0FBZ0JhLE1BQXpILEdBQWtJLEtBQUtYLE1BQXpKO0FBQ0EsU0FBS04sSUFBTCxDQUFVaUIsTUFBVixHQUFtQk8sV0FBbkI7QUFFQSxTQUFLdEIsV0FBTCxDQUFpQnVCLENBQWpCLEdBQXFCLEtBQUt6QixJQUFMLENBQVVpQixNQUFWLEdBQW1CLENBQW5CLEdBQXVCLEtBQUtaLE1BQTVCLEdBQXFDLEtBQUtILFdBQUwsQ0FBaUJlLE1BQWpCLEdBQTBCLENBQXBGO0FBQ0EsU0FBS2QsY0FBTCxDQUFvQnNCLENBQXBCLEdBQXdCLEtBQUt2QixXQUFMLENBQWlCdUIsQ0FBakIsR0FBcUIsS0FBS3ZCLFdBQUwsQ0FBaUJlLE1BQWpCLEdBQTBCLENBQS9DLEdBQW1ELEtBQUtWLFVBQWhGO0FBQ0EsU0FBS0gsVUFBTCxDQUFnQnFCLENBQWhCLEdBQW9CLENBQUMsS0FBS3pCLElBQUwsQ0FBVWlCLE1BQVgsR0FBb0IsQ0FBcEIsR0FBd0IsS0FBS1gsTUFBN0IsR0FBc0MsS0FBS0YsVUFBTCxDQUFnQmEsTUFBaEIsR0FBeUIsQ0FBbkY7QUFFQSxRQUFJUyxJQUFJLEdBQUcsSUFBWDtBQUNBLFNBQUt0QixVQUFMLENBQWdCYyxFQUFoQixDQUFtQixPQUFuQixFQUE0QixZQUFVO0FBQ2xDUSxNQUFBQSxJQUFJLENBQUNiLElBQUwsQ0FBVWMsT0FBVjtBQUNILEtBRkQ7QUFJQSxTQUFLdkIsVUFBTCxDQUFnQlUsY0FBaEIsQ0FBK0IsV0FBL0IsRUFBNENLLFlBQTVDLENBQXlEdkIsRUFBRSxDQUFDd0IsS0FBNUQsRUFBbUVDLE1BQW5FLEdBQTRFWCxVQUFVLENBQUNZLDBCQUFYLENBQXNDLEdBQXRDLENBQTVFO0FBQ0gsR0E1REksQ0E2REw7O0FBN0RLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICAgICAgdWliZzogY2MuTm9kZSxcbiAgICAgICAgZ3VpbGRCZ05vZGU6IGNjLk5vZGUsXG4gICAgICAgIGd1aWxkTGFiZWxOb2RlOiBjYy5Ob2RlLFxuICAgICAgICBidXR0b25Ob2RlOiBjYy5Ob2RlLFxuXG4gICAgICAgIGhlYWRlcjogMTA1LFxuICAgICAgICBmb290ZXI6IDEwNSxcbiAgICAgICAgc2VjdGlvbkRpczogNTBcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuc2V0dXBVaSgpXG4gICAgfSxcblxuICAgIHNldHVwVWkoKSB7XG4gICAgICAgIHZhciB0ZXh0Q29uZmlnID0gcmVxdWlyZShcInRleHRDb25maWdcIilcbiAgICAgICAgdmFyIGJnID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmdcIilcbiAgICAgICAgYmcud2lkdGggPSBjYy53aW5TaXplLndpZHRoXG4gICAgICAgIGJnLmhlaWdodCA9IGNjLndpblNpemUuaGVpZ2h0XG4gICAgICAgIGJnLm9uKFwidG91Y2hzdGFydFwiLGZ1bmN0aW9uKCl7fSlcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZ3VpbGRMYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDE1OSlcbiAgICAgICAgdGhpcy5ndWlsZExhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLl9mb3JjZVVwZGF0ZVJlbmRlckRhdGEoKVxuXG4gICAgICAgIHZhciB0b3RhbEhlaWdodCA9IHRoaXMuaGVhZGVyICsgdGhpcy5ndWlsZEJnTm9kZS5oZWlnaHQgKyB0aGlzLnNlY3Rpb25EaXMgKyB0aGlzLmd1aWxkTGFiZWxOb2RlLmhlaWdodCArIHRoaXMuc2VjdGlvbkRpcyArIHRoaXMuYnV0dG9uTm9kZS5oZWlnaHQgKyB0aGlzLmZvb3RlclxuICAgICAgICB0aGlzLnVpYmcuaGVpZ2h0ID0gdG90YWxIZWlnaHRcblxuICAgICAgICB0aGlzLmd1aWxkQmdOb2RlLnkgPSB0aGlzLnVpYmcuaGVpZ2h0IC8gMiAtIHRoaXMuaGVhZGVyIC0gdGhpcy5ndWlsZEJnTm9kZS5oZWlnaHQgLyAyXG4gICAgICAgIHRoaXMuZ3VpbGRMYWJlbE5vZGUueSA9IHRoaXMuZ3VpbGRCZ05vZGUueSAtIHRoaXMuZ3VpbGRCZ05vZGUuaGVpZ2h0IC8gMiAtIHRoaXMuc2VjdGlvbkRpc1xuICAgICAgICB0aGlzLmJ1dHRvbk5vZGUueSA9IC10aGlzLnVpYmcuaGVpZ2h0IC8gMiArIHRoaXMuZm9vdGVyICsgdGhpcy5idXR0b25Ob2RlLmhlaWdodCAvIDJcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgdGhpcy5idXR0b25Ob2RlLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYubm9kZS5kZXN0cm95KClcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmJ1dHRvbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0TGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDEyMilcbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==