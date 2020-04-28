
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/components/redPointMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f34142gIJJJ4YCZvHxJkXfT', 'redPointMgr');
// scripts/components/redPointMgr.js

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
    redPointPrefab: cc.Prefab,
    redPoint: null,
    offset: cc.v2(5, 10),
    redPointShowCondition: {
      get: function get() {
        return this._redPointShowCondition;
      },
      set: function set(value) {
        //init setup
        this._redPointShowCondition = value;
        this.setupRedPoint();
      }
    }
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {},
  setupRedPoint: function setupRedPoint() {
    if (this.redPointShowCondition == null || typeof this.redPointShowCondition !== "function") {
      cc.log("no condition of redpoint, or condition is not a function from node " + this.node.name);
      return;
    }

    if (this.redPointShowCondition() == true) {
      this.showRedPoint();
    } else {
      this.hideRedPoint();
    }
  },
  showRedPoint: function showRedPoint() {
    if (this.redPoint == null) {
      var oneRedPoint = cc.instantiate(this.redPointPrefab);

      var getNodeRightHeadPoint = function getNodeRightHeadPoint(givenNode) {
        var x = (1 - givenNode.anchorX) * givenNode.width;
        var y = (1 - givenNode.anchorY) * givenNode.height;
        return cc.v2(x, y);
      };

      var targetX = getNodeRightHeadPoint(this.node).x + this.offset.x;
      var targetY = getNodeRightHeadPoint(this.node).y + this.offset.y;
      oneRedPoint.x = targetX;
      oneRedPoint.y = targetY;
      this.redPoint = oneRedPoint;
      this.node.addChild(oneRedPoint);
    }

    this.redPoint.active = true;
  },
  hideRedPoint: function hideRedPoint() {
    if (this.redPoint == null) {
      var oneRedPoint = cc.instantiate(this.redPointPrefab);

      var getNodeRightHeadPoint = function getNodeRightHeadPoint(givenNode) {
        var x = (1 - givenNode.anchorX) * givenNode.width;
        var y = (1 - givenNode.anchorY) * givenNode.height;
        return cc.v2(x, y);
      };

      var targetX = getNodeRightHeadPoint(this.node).x + this.offset.x;
      var targetY = getNodeRightHeadPoint(this.node).y + this.offset.y;
      oneRedPoint.x = targetX;
      oneRedPoint.y = targetY;
      this.redPoint = oneRedPoint;
      this.node.addChild(oneRedPoint);
    }

    this.redPoint.active = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2NvbXBvbmVudHMvcmVkUG9pbnRNZ3IuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJyZWRQb2ludFByZWZhYiIsIlByZWZhYiIsInJlZFBvaW50Iiwib2Zmc2V0IiwidjIiLCJyZWRQb2ludFNob3dDb25kaXRpb24iLCJnZXQiLCJfcmVkUG9pbnRTaG93Q29uZGl0aW9uIiwic2V0IiwidmFsdWUiLCJzZXR1cFJlZFBvaW50Iiwic3RhcnQiLCJsb2ciLCJub2RlIiwibmFtZSIsInNob3dSZWRQb2ludCIsImhpZGVSZWRQb2ludCIsIm9uZVJlZFBvaW50IiwiaW5zdGFudGlhdGUiLCJnZXROb2RlUmlnaHRIZWFkUG9pbnQiLCJnaXZlbk5vZGUiLCJ4IiwiYW5jaG9yWCIsIndpZHRoIiwieSIsImFuY2hvclkiLCJoZWlnaHQiLCJ0YXJnZXRYIiwidGFyZ2V0WSIsImFkZENoaWxkIiwiYWN0aXZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsY0FBYyxFQUFFSixFQUFFLENBQUNLLE1BaEJYO0FBaUJSQyxJQUFBQSxRQUFRLEVBQUUsSUFqQkY7QUFrQlJDLElBQUFBLE1BQU0sRUFBRVAsRUFBRSxDQUFDUSxFQUFILENBQU0sQ0FBTixFQUFRLEVBQVIsQ0FsQkE7QUFtQlJDLElBQUFBLHFCQUFxQixFQUFFO0FBQ25CQyxNQUFBQSxHQURtQixpQkFDYjtBQUNGLGVBQU8sS0FBS0Msc0JBQVo7QUFDSCxPQUhr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QUFLckIsTUFBTCxDQUFZcUIsQ0FBL0Q7QUFDQVAsTUFBQUEsV0FBVyxDQUFDSSxDQUFaLEdBQWdCTSxPQUFoQjtBQUNBVixNQUFBQSxXQUFXLENBQUNPLENBQVosR0FBZ0JJLE9BQWhCO0FBQ0EsV0FBSzFCLFFBQUwsR0FBZ0JlLFdBQWhCO0FBQ0EsV0FBS0osSUFBTCxDQUFVZ0IsUUFBVixDQUFtQlosV0FBbkI7QUFDSDs7QUFFRCxTQUFLZixRQUFMLENBQWM0QixNQUFkLEdBQXVCLEtBQXZCO0FBQ0gsR0E1RkksQ0E4Rkw7O0FBOUZLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICAgICAgcmVkUG9pbnRQcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgcmVkUG9pbnQ6IG51bGwsXG4gICAgICAgIG9mZnNldDogY2MudjIoNSwxMCksXG4gICAgICAgIHJlZFBvaW50U2hvd0NvbmRpdGlvbjoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWRQb2ludFNob3dDb25kaXRpb25cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvL2luaXQgc2V0dXBcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWRQb2ludFNob3dDb25kaXRpb24gPSB2YWx1ZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBSZWRQb2ludCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9LFxuXG4gICAgc2V0dXBSZWRQb2ludCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVkUG9pbnRTaG93Q29uZGl0aW9uID09IG51bGwgfHwgdHlwZW9mIHRoaXMucmVkUG9pbnRTaG93Q29uZGl0aW9uICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGNjLmxvZyhcIm5vIGNvbmRpdGlvbiBvZiByZWRwb2ludCwgb3IgY29uZGl0aW9uIGlzIG5vdCBhIGZ1bmN0aW9uIGZyb20gbm9kZSBcIiArIHRoaXMubm9kZS5uYW1lKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yZWRQb2ludFNob3dDb25kaXRpb24oKSA9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dSZWRQb2ludCgpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVSZWRQb2ludCgpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvd1JlZFBvaW50KCkge1xuICAgICAgICBpZiAodGhpcy5yZWRQb2ludCA9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgb25lUmVkUG9pbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnJlZFBvaW50UHJlZmFiKVxuICAgICAgICAgICAgdmFyIGdldE5vZGVSaWdodEhlYWRQb2ludCA9IGZ1bmN0aW9uKGdpdmVuTm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciB4ID0gKDEgLSBnaXZlbk5vZGUuYW5jaG9yWCkgKiBnaXZlbk5vZGUud2lkdGhcbiAgICAgICAgICAgICAgICB2YXIgeSA9ICgxIC0gZ2l2ZW5Ob2RlLmFuY2hvclkpICogZ2l2ZW5Ob2RlLmhlaWdodFxuICAgICAgICAgICAgICAgIHJldHVybiBjYy52Mih4LHkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdGFyZ2V0WCA9IGdldE5vZGVSaWdodEhlYWRQb2ludCh0aGlzLm5vZGUpLnggKyB0aGlzLm9mZnNldC54XG4gICAgICAgICAgICB2YXIgdGFyZ2V0WSA9IGdldE5vZGVSaWdodEhlYWRQb2ludCh0aGlzLm5vZGUpLnkgKyB0aGlzLm9mZnNldC55XG4gICAgICAgICAgICBvbmVSZWRQb2ludC54ID0gdGFyZ2V0WFxuICAgICAgICAgICAgb25lUmVkUG9pbnQueSA9IHRhcmdldFlcbiAgICAgICAgICAgIHRoaXMucmVkUG9pbnQgPSBvbmVSZWRQb2ludFxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG9uZVJlZFBvaW50KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlZFBvaW50LmFjdGl2ZSA9IHRydWVcbiAgICB9LFxuXG4gICAgaGlkZVJlZFBvaW50KCkge1xuICAgICAgICBpZiAodGhpcy5yZWRQb2ludCA9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgb25lUmVkUG9pbnQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnJlZFBvaW50UHJlZmFiKVxuICAgICAgICAgICAgdmFyIGdldE5vZGVSaWdodEhlYWRQb2ludCA9IGZ1bmN0aW9uKGdpdmVuTm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciB4ID0gKDEgLSBnaXZlbk5vZGUuYW5jaG9yWCkgKiBnaXZlbk5vZGUud2lkdGhcbiAgICAgICAgICAgICAgICB2YXIgeSA9ICgxIC0gZ2l2ZW5Ob2RlLmFuY2hvclkpICogZ2l2ZW5Ob2RlLmhlaWdodFxuICAgICAgICAgICAgICAgIHJldHVybiBjYy52Mih4LHkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdGFyZ2V0WCA9IGdldE5vZGVSaWdodEhlYWRQb2ludCh0aGlzLm5vZGUpLnggKyB0aGlzLm9mZnNldC54XG4gICAgICAgICAgICB2YXIgdGFyZ2V0WSA9IGdldE5vZGVSaWdodEhlYWRQb2ludCh0aGlzLm5vZGUpLnkgKyB0aGlzLm9mZnNldC55XG4gICAgICAgICAgICBvbmVSZWRQb2ludC54ID0gdGFyZ2V0WFxuICAgICAgICAgICAgb25lUmVkUG9pbnQueSA9IHRhcmdldFlcbiAgICAgICAgICAgIHRoaXMucmVkUG9pbnQgPSBvbmVSZWRQb2ludFxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG9uZVJlZFBvaW50KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWRQb2ludC5hY3RpdmUgPSBmYWxzZVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=