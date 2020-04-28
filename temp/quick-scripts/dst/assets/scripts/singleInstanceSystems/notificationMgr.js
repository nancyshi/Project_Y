
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/singleInstanceSystems/notificationMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6adf2lw5wdC6oB912oNiN7C', 'notificationMgr');
// scripts/singleInstanceSystems/notificationMgr.js

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
var NotificationMgr = cc.Class({
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
    lastTime: 2,
    moveTime: 0.5,
    moveDis: 200,
    noties: []
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {},
  showNoti: function showNoti(str) {
    var notiPrefab = require("resMgr").reses.notiSysPrefab;

    var notiNode = cc.instantiate(notiPrefab);
    var label = notiNode.getChildByName("label");
    label.getComponent(cc.Label).string = str;
    var currentSceneCanvas = cc.director.getScene().getChildByName("Canvas");
    currentSceneCanvas.addChild(notiNode);
    var self = this;
    cc.tween(notiNode).by(self.moveTime, {
      y: self.moveDis
    }).delay(self.lastTime - self.moveTime) //.to(0.3, {opacity: 0})
    .call(function () {
      notiNode.destroy();
    }).start();
  },
  pushNoti: function pushNoti(str) {
    this.noties.push(str);
  } // update (dt) {},

});
var sharedNotificationMgr = new NotificationMgr();
module.exports = sharedNotificationMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3NpbmdsZUluc3RhbmNlU3lzdGVtcy9ub3RpZmljYXRpb25NZ3IuanMiXSwibmFtZXMiOlsiTm90aWZpY2F0aW9uTWdyIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsYXN0VGltZSIsIm1vdmVUaW1lIiwibW92ZURpcyIsIm5vdGllcyIsInN0YXJ0Iiwic2hvd05vdGkiLCJzdHIiLCJub3RpUHJlZmFiIiwicmVxdWlyZSIsInJlc2VzIiwibm90aVN5c1ByZWZhYiIsIm5vdGlOb2RlIiwiaW5zdGFudGlhdGUiLCJsYWJlbCIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciLCJjdXJyZW50U2NlbmVDYW52YXMiLCJkaXJlY3RvciIsImdldFNjZW5lIiwiYWRkQ2hpbGQiLCJzZWxmIiwidHdlZW4iLCJieSIsInkiLCJkZWxheSIsImNhbGwiLCJkZXN0cm95IiwicHVzaE5vdGkiLCJwdXNoIiwic2hhcmVkTm90aWZpY2F0aW9uTWdyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFJQSxlQUFlLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQzNCLGFBQVNELEVBQUUsQ0FBQ0UsU0FEZTtBQUczQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLElBQUFBLFFBQVEsRUFBRSxDQWhCRjtBQWlCUkMsSUFBQUEsUUFBUSxFQUFFLEdBakJGO0FBa0JSQyxJQUFBQSxPQUFPLEVBQUUsR0FsQkQ7QUFvQlJDLElBQUFBLE1BQU0sRUFBRTtBQXBCQSxHQUhlO0FBMEIzQjtBQUVBO0FBRUFDLEVBQUFBLEtBOUIyQixtQkE4QmxCLENBRVIsQ0FoQzBCO0FBa0MzQkMsRUFBQUEsUUFsQzJCLG9CQWtDbEJDLEdBbENrQixFQWtDYjtBQUNWLFFBQUlDLFVBQVUsR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBUCxDQUFrQkMsS0FBbEIsQ0FBd0JDLGFBQXpDOztBQUNBLFFBQUlDLFFBQVEsR0FBR2YsRUFBRSxDQUFDZ0IsV0FBSCxDQUFlTCxVQUFmLENBQWY7QUFDQSxRQUFJTSxLQUFLLEdBQUdGLFFBQVEsQ0FBQ0csY0FBVCxDQUF3QixPQUF4QixDQUFaO0FBQ0FELElBQUFBLEtBQUssQ0FBQ0UsWUFBTixDQUFtQm5CLEVBQUUsQ0FBQ29CLEtBQXRCLEVBQTZCQyxNQUE3QixHQUFzQ1gsR0FBdEM7QUFDQSxRQUFJWSxrQkFBa0IsR0FBR3RCLEVBQUUsQ0FBQ3VCLFFBQUgsQ0FBWUMsUUFBWixHQUF1Qk4sY0FBdkIsQ0FBc0MsUUFBdEMsQ0FBekI7QUFDQUksSUFBQUEsa0JBQWtCLENBQUNHLFFBQW5CLENBQTRCVixRQUE1QjtBQUNBLFFBQUlXLElBQUksR0FBRyxJQUFYO0FBQ0ExQixJQUFBQSxFQUFFLENBQUMyQixLQUFILENBQVNaLFFBQVQsRUFDS2EsRUFETCxDQUNRRixJQUFJLENBQUNyQixRQURiLEVBQ3NCO0FBQUN3QixNQUFBQSxDQUFDLEVBQUVILElBQUksQ0FBQ3BCO0FBQVQsS0FEdEIsRUFFS3dCLEtBRkwsQ0FFV0osSUFBSSxDQUFDdEIsUUFBTCxHQUFnQnNCLElBQUksQ0FBQ3JCLFFBRmhDLEVBR0k7QUFISixLQUlLMEIsSUFKTCxDQUlVLFlBQVU7QUFDWmhCLE1BQUFBLFFBQVEsQ0FBQ2lCLE9BQVQ7QUFDSCxLQU5MLEVBT0t4QixLQVBMO0FBUUgsR0FsRDBCO0FBb0QzQnlCLEVBQUFBLFFBcEQyQixvQkFvRGxCdkIsR0FwRGtCLEVBb0RiO0FBQ1YsU0FBS0gsTUFBTCxDQUFZMkIsSUFBWixDQUFpQnhCLEdBQWpCO0FBQ0gsR0F0RDBCLENBdUQzQjs7QUF2RDJCLENBQVQsQ0FBdEI7QUEwREEsSUFBSXlCLHFCQUFxQixHQUFHLElBQUlwQyxlQUFKLEVBQTVCO0FBQ0FxQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJGLHFCQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHBzOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG52YXIgTm90aWZpY2F0aW9uTWdyID0gY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICAgICAgbGFzdFRpbWU6IDIsXG4gICAgICAgIG1vdmVUaW1lOiAwLjUsXG4gICAgICAgIG1vdmVEaXM6IDIwMCxcblxuICAgICAgICBub3RpZXM6IFtdXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfSxcblxuICAgIHNob3dOb3RpKHN0cikge1xuICAgICAgICB2YXIgbm90aVByZWZhYiA9IHJlcXVpcmUoXCJyZXNNZ3JcIikucmVzZXMubm90aVN5c1ByZWZhYlxuICAgICAgICB2YXIgbm90aU5vZGUgPSBjYy5pbnN0YW50aWF0ZShub3RpUHJlZmFiKVxuICAgICAgICB2YXIgbGFiZWwgPSBub3RpTm9kZS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpXG4gICAgICAgIGxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc3RyXG4gICAgICAgIHZhciBjdXJyZW50U2NlbmVDYW52YXMgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKFwiQ2FudmFzXCIpXG4gICAgICAgIGN1cnJlbnRTY2VuZUNhbnZhcy5hZGRDaGlsZChub3RpTm9kZSlcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgIGNjLnR3ZWVuKG5vdGlOb2RlKVxuICAgICAgICAgICAgLmJ5KHNlbGYubW92ZVRpbWUse3k6IHNlbGYubW92ZURpc30pXG4gICAgICAgICAgICAuZGVsYXkoc2VsZi5sYXN0VGltZSAtIHNlbGYubW92ZVRpbWUpXG4gICAgICAgICAgICAvLy50bygwLjMsIHtvcGFjaXR5OiAwfSlcbiAgICAgICAgICAgIC5jYWxsKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgbm90aU5vZGUuZGVzdHJveSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXJ0KClcbiAgICB9LFxuXG4gICAgcHVzaE5vdGkoc3RyKSB7XG4gICAgICAgIHRoaXMubm90aWVzLnB1c2goc3RyKVxuICAgIH1cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuXG52YXIgc2hhcmVkTm90aWZpY2F0aW9uTWdyID0gbmV3IE5vdGlmaWNhdGlvbk1ncigpXG5tb2R1bGUuZXhwb3J0cyA9IHNoYXJlZE5vdGlmaWNhdGlvbk1nciJdfQ==