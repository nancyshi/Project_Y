
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/singleInstanceSystems/globalRedPointMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd895aDdCFhBNIuhwEdMtJNe', 'globalRedPointMgr');
// scripts/singleInstanceSystems/globalRedPointMgr.js

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
var GlobalRedPointMgr = cc.Class({
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
    currentRedPointMgrs: []
  },
  setupRedPoints: function setupRedPoints() {
    this.getRedPointMgrs();

    for (var index in this.currentRedPointMgrs) {
      var oneRedPointMgr = this.currentRedPointMgrs[index];

      if (typeof oneRedPointMgr.setupRedPoint === "function") {
        oneRedPointMgr.setupRedPoint();
      }
    }
  },
  getRedPointMgrs: function getRedPointMgrs() {
    this.currentRedPointMgrs = [];
    var currentScene = cc.director.getScene();
    var self = this;

    var temp = function temp(givenRootNode) {
      for (var index in givenRootNode.children) {
        var oneChildNode = givenRootNode.children[index];
        var oneRedPointMgr = oneChildNode.getComponent("redPointMgr");

        if (oneRedPointMgr != null) {
          self.currentRedPointMgrs.push(oneRedPointMgr);
        }

        temp(oneChildNode);
      }
    };

    temp(currentScene.getChildByName("Canvas"));
  }
});
module.exports = new GlobalRedPointMgr();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3NpbmdsZUluc3RhbmNlU3lzdGVtcy9nbG9iYWxSZWRQb2ludE1nci5qcyJdLCJuYW1lcyI6WyJHbG9iYWxSZWRQb2ludE1nciIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiY3VycmVudFJlZFBvaW50TWdycyIsInNldHVwUmVkUG9pbnRzIiwiZ2V0UmVkUG9pbnRNZ3JzIiwiaW5kZXgiLCJvbmVSZWRQb2ludE1nciIsInNldHVwUmVkUG9pbnQiLCJjdXJyZW50U2NlbmUiLCJkaXJlY3RvciIsImdldFNjZW5lIiwic2VsZiIsInRlbXAiLCJnaXZlblJvb3ROb2RlIiwiY2hpbGRyZW4iLCJvbmVDaGlsZE5vZGUiLCJnZXRDb21wb25lbnQiLCJwdXNoIiwiZ2V0Q2hpbGRCeU5hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLGlCQUFpQixHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUM3QixhQUFTRCxFQUFFLENBQUNFLFNBRGlCO0FBRzdCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsbUJBQW1CLEVBQUU7QUFoQmIsR0FIaUI7QUFzQjdCQyxFQUFBQSxjQXRCNkIsNEJBc0JaO0FBQ2IsU0FBS0MsZUFBTDs7QUFDQSxTQUFLLElBQUlDLEtBQVQsSUFBa0IsS0FBS0gsbUJBQXZCLEVBQTRDO0FBQ3hDLFVBQUlJLGNBQWMsR0FBRyxLQUFLSixtQkFBTCxDQUF5QkcsS0FBekIsQ0FBckI7O0FBQ0EsVUFBSSxPQUFPQyxjQUFjLENBQUNDLGFBQXRCLEtBQXdDLFVBQTVDLEVBQXdEO0FBQ3BERCxRQUFBQSxjQUFjLENBQUNDLGFBQWY7QUFDSDtBQUNKO0FBQ0osR0E5QjRCO0FBZ0M3QkgsRUFBQUEsZUFoQzZCLDZCQWdDWDtBQUNkLFNBQUtGLG1CQUFMLEdBQTJCLEVBQTNCO0FBQ0EsUUFBSU0sWUFBWSxHQUFHVixFQUFFLENBQUNXLFFBQUgsQ0FBWUMsUUFBWixFQUFuQjtBQUNBLFFBQUlDLElBQUksR0FBRyxJQUFYOztBQUNBLFFBQUlDLElBQUksR0FBRyxTQUFQQSxJQUFPLENBQVNDLGFBQVQsRUFBd0I7QUFDL0IsV0FBSyxJQUFJUixLQUFULElBQWtCUSxhQUFhLENBQUNDLFFBQWhDLEVBQTBDO0FBQ3RDLFlBQUlDLFlBQVksR0FBR0YsYUFBYSxDQUFDQyxRQUFkLENBQXVCVCxLQUF2QixDQUFuQjtBQUNBLFlBQUlDLGNBQWMsR0FBR1MsWUFBWSxDQUFDQyxZQUFiLENBQTBCLGFBQTFCLENBQXJCOztBQUNBLFlBQUlWLGNBQWMsSUFBSSxJQUF0QixFQUE0QjtBQUN4QkssVUFBQUEsSUFBSSxDQUFDVCxtQkFBTCxDQUF5QmUsSUFBekIsQ0FBOEJYLGNBQTlCO0FBQ0g7O0FBQ0RNLFFBQUFBLElBQUksQ0FBQ0csWUFBRCxDQUFKO0FBQ0g7QUFDSixLQVREOztBQVdBSCxJQUFBQSxJQUFJLENBQUNKLFlBQVksQ0FBQ1UsY0FBYixDQUE0QixRQUE1QixDQUFELENBQUo7QUFDSDtBQWhENEIsQ0FBVCxDQUF4QjtBQW1EQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLElBQUl2QixpQkFBSixFQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHBzOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG52YXIgR2xvYmFsUmVkUG9pbnRNZ3IgPSBjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICBjdXJyZW50UmVkUG9pbnRNZ3JzOiBbXVxuICAgIH0sXG5cbiAgICBzZXR1cFJlZFBvaW50cygpIHtcbiAgICAgICAgdGhpcy5nZXRSZWRQb2ludE1ncnMoKVxuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiB0aGlzLmN1cnJlbnRSZWRQb2ludE1ncnMpIHtcbiAgICAgICAgICAgIHZhciBvbmVSZWRQb2ludE1nciA9IHRoaXMuY3VycmVudFJlZFBvaW50TWdyc1tpbmRleF1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb25lUmVkUG9pbnRNZ3Iuc2V0dXBSZWRQb2ludCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgb25lUmVkUG9pbnRNZ3Iuc2V0dXBSZWRQb2ludCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0UmVkUG9pbnRNZ3JzKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRSZWRQb2ludE1ncnMgPSBbXVxuICAgICAgICB2YXIgY3VycmVudFNjZW5lID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKVxuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgdmFyIHRlbXAgPSBmdW5jdGlvbihnaXZlblJvb3ROb2RlKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBnaXZlblJvb3ROb2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9uZUNoaWxkTm9kZSA9IGdpdmVuUm9vdE5vZGUuY2hpbGRyZW5baW5kZXhdXG4gICAgICAgICAgICAgICAgdmFyIG9uZVJlZFBvaW50TWdyID0gb25lQ2hpbGROb2RlLmdldENvbXBvbmVudChcInJlZFBvaW50TWdyXCIpXG4gICAgICAgICAgICAgICAgaWYgKG9uZVJlZFBvaW50TWdyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50UmVkUG9pbnRNZ3JzLnB1c2gob25lUmVkUG9pbnRNZ3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRlbXAob25lQ2hpbGROb2RlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGVtcChjdXJyZW50U2NlbmUuZ2V0Q2hpbGRCeU5hbWUoXCJDYW52YXNcIikpXG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEdsb2JhbFJlZFBvaW50TWdyKClcbiJdfQ==