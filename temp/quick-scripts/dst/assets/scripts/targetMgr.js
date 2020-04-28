
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/targetMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dd98dJBJRlHoIaNxxkryLBz', 'targetMgr');
// scripts/targetMgr.js

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
    fatalTolerance: 0.01,
    bullets: null,
    flag: false,
    helper: null
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    var Helper = require("helper");

    this.helper = new Helper();
  },
  start: function start() {
    this.bullets = cc.find("Canvas").getComponent("levelMgr").bullets;
  },
  update: function update(dt) {
    if (this.flag == true) {
      return;
    }

    for (var index in this.bullets) {
      var bullet = this.bullets[index];
      var bulletMgr = bullet.getComponent("bulletMgr");

      if (bulletMgr.bulletType != 1) {
        continue;
      }

      if (bulletMgr.status != 0) {
        continue;
      }

      if (this.checkWhetherSatisfied(bullet) == true) {
        this.onSatisfy(bullet);
        break;
      }
    }
  },
  checkWhetherSatisfied: function checkWhetherSatisfied(givenBulletNode) {
    var points = this.helper.getPointsOfOneNode(this.node);
    var bulletPoints = this.helper.getPointsOfOneNode(givenBulletNode);

    for (var key in points) {
      var point = points[key];
      var bulletCorrespondPoint = bulletPoints[key];
      var dis = cc.v2(bulletCorrespondPoint.x - point.x, bulletCorrespondPoint.y - point.y).mag();

      if (dis > this.fatalTolerance) {
        return false;
      }
    }

    return true;
  },
  onSatisfy: function onSatisfy(givenBullet) {
    this.flag = true;
    givenBullet.getComponent("bulletMgr").status = 2;
    var self = this;
    cc.tween(givenBullet).to(0.2, {
      opacity: 0
    }).call(function () {
      givenBullet.destroy();
    }).start();
    cc.tween(this.node).to(0.2, {
      opacity: 0
    }).call(function () {
      self.node.destroy();
      cc.find("Canvas").getComponent("levelMgr").targetsNum -= 1;
    }).start();
  },
  onDestroy: function onDestroy() {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3RhcmdldE1nci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImZhdGFsVG9sZXJhbmNlIiwiYnVsbGV0cyIsImZsYWciLCJoZWxwZXIiLCJvbkxvYWQiLCJIZWxwZXIiLCJyZXF1aXJlIiwic3RhcnQiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwidXBkYXRlIiwiZHQiLCJpbmRleCIsImJ1bGxldCIsImJ1bGxldE1nciIsImJ1bGxldFR5cGUiLCJzdGF0dXMiLCJjaGVja1doZXRoZXJTYXRpc2ZpZWQiLCJvblNhdGlzZnkiLCJnaXZlbkJ1bGxldE5vZGUiLCJwb2ludHMiLCJnZXRQb2ludHNPZk9uZU5vZGUiLCJub2RlIiwiYnVsbGV0UG9pbnRzIiwia2V5IiwicG9pbnQiLCJidWxsZXRDb3JyZXNwb25kUG9pbnQiLCJkaXMiLCJ2MiIsIngiLCJ5IiwibWFnIiwiZ2l2ZW5CdWxsZXQiLCJzZWxmIiwidHdlZW4iLCJ0byIsIm9wYWNpdHkiLCJjYWxsIiwiZGVzdHJveSIsInRhcmdldHNOdW0iLCJvbkRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxJQUFBQSxjQUFjLEVBQUUsSUFoQlI7QUFpQlJDLElBQUFBLE9BQU8sRUFBRSxJQWpCRDtBQWtCUkMsSUFBQUEsSUFBSSxFQUFFLEtBbEJFO0FBbUJSQyxJQUFBQSxNQUFNLEVBQUU7QUFuQkEsR0FIUDtBQXlCTDtBQUVBQyxFQUFBQSxNQTNCSyxvQkEyQks7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MkM4QixVQUEzQyxJQUF5RCxDQUF6RDtBQUNILEtBTEwsRUFNS2hDLEtBTkw7QUFPSCxHQTFGSTtBQTRGTGlDLEVBQUFBLFNBNUZLLHVCQTRGTyxDQUVYO0FBOUZJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICAgICAgZmF0YWxUb2xlcmFuY2U6IDAuMDEsXG4gICAgICAgIGJ1bGxldHM6IG51bGwsXG4gICAgICAgIGZsYWc6IGZhbHNlLFxuICAgICAgICBoZWxwZXI6IG51bGxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB2YXIgSGVscGVyID0gcmVxdWlyZShcImhlbHBlclwiKVxuICAgICAgICB0aGlzLmhlbHBlciA9IG5ldyBIZWxwZXIoKVxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuYnVsbGV0cyA9IGNjLmZpbmQoXCJDYW52YXNcIikuZ2V0Q29tcG9uZW50KFwibGV2ZWxNZ3JcIikuYnVsbGV0c1xuICAgIH0sXG5cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLmZsYWcgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gdGhpcy5idWxsZXRzKSB7XG4gICAgICAgICAgICB2YXIgYnVsbGV0ID0gdGhpcy5idWxsZXRzW2luZGV4XVxuICAgICAgICAgICAgdmFyIGJ1bGxldE1nciA9IGJ1bGxldC5nZXRDb21wb25lbnQoXCJidWxsZXRNZ3JcIilcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGJ1bGxldE1nci5idWxsZXRUeXBlICE9IDEpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJ1bGxldE1nci5zdGF0dXMgIT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja1doZXRoZXJTYXRpc2ZpZWQoYnVsbGV0KSA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNhdGlzZnkoYnVsbGV0KVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY2hlY2tXaGV0aGVyU2F0aXNmaWVkKGdpdmVuQnVsbGV0Tm9kZSkge1xuICAgICAgICB2YXIgcG9pbnRzID0gdGhpcy5oZWxwZXIuZ2V0UG9pbnRzT2ZPbmVOb2RlKHRoaXMubm9kZSlcbiAgICAgICAgdmFyIGJ1bGxldFBvaW50cyA9IHRoaXMuaGVscGVyLmdldFBvaW50c09mT25lTm9kZShnaXZlbkJ1bGxldE5vZGUpXG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHBvaW50cykge1xuICAgICAgICAgICAgdmFyIHBvaW50ID0gcG9pbnRzW2tleV1cbiAgICAgICAgICAgIHZhciBidWxsZXRDb3JyZXNwb25kUG9pbnQgPSBidWxsZXRQb2ludHNba2V5XVxuICAgICAgICAgICAgdmFyIGRpcyA9IGNjLnYyKGJ1bGxldENvcnJlc3BvbmRQb2ludC54IC0gcG9pbnQueCwgYnVsbGV0Q29ycmVzcG9uZFBvaW50LnkgLSBwb2ludC55KS5tYWcoKVxuICAgICAgICAgICAgaWYgKGRpcyA+IHRoaXMuZmF0YWxUb2xlcmFuY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfSxcblxuICAgIG9uU2F0aXNmeShnaXZlbkJ1bGxldCkge1xuICAgICAgICB0aGlzLmZsYWcgPSB0cnVlXG4gICAgICAgIGdpdmVuQnVsbGV0LmdldENvbXBvbmVudChcImJ1bGxldE1nclwiKS5zdGF0dXMgPSAyXG4gICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICBjYy50d2VlbihnaXZlbkJ1bGxldClcbiAgICAgICAgICAgIC50bygwLjIse29wYWNpdHk6MH0pXG4gICAgICAgICAgICAuY2FsbChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGdpdmVuQnVsbGV0LmRlc3Ryb3koKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSlcbiAgICAgICAgICAgIC50bygwLjIse29wYWNpdHk6IDB9KVxuICAgICAgICAgICAgLmNhbGwoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUuZGVzdHJveSgpXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5nZXRDb21wb25lbnQoXCJsZXZlbE1nclwiKS50YXJnZXRzTnVtIC09IDFcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhcnQoKVxuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3koKSB7XG5cbiAgICB9XG59KTtcbiJdfQ==