
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/libs/resMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'df3f9Ff+ehEg4/MFicOafGk', 'resMgr');
// scripts/libs/resMgr.js

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
var ResMgr = cc.Class({
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
    reses: null,
    resNum: null,
    loadedResNum: 0 //{
    //     get() {
    //         if (this._loadedResNum == null) {
    //             this._loadedResNum = 0
    //         }
    //         return this._loadedResNum
    //     },
    //     set(value) {
    //         this._loadedResNum = value
    //         if (value == this.resNum) {
    //         }
    //     }
    // }

  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {},
  loadReses: function loadReses() {
    var complet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
    var resObj = {
      // ensureSysPrefab: "prefabs/ensureNode",
      // addSysPrefab: "prefabs/addUI",
      notiSysPrefab: "prefabs/notiNode",
      // mailSysTagPrefab: "prefabs/mailTagNode",
      // mailSysMailSectionNodePrefab: "prefabs/mailSectionNode",
      // mailSysSelectedTagEffectPrefab: "prefabs/selectedTagEffect",
      // mailUIPrefab: "prefabs/mailUI",
      // mailOptionPrefab: "prefabs/mailOptionNode",
      // mailSysMailPrefab: "prefabs/mailNode",
      // redPointPrefab: "prefabs/redPoint",
      wallPrefab: "prefabs/wall",
      bulletPrefab: "prefabs/bullet",
      targetPrefab: "prefabs/target",
      pathWayPrefab: "prefabs/pathWay",
      welfarySysPrefab: "prefabs/welfaryUI",
      signInSysPrefab: "prefabs/signInSysUI",
      addPropertyNumSysPrefab: "prefabs/addPropertyNumUI",
      mailSysPrefab: "prefabs/mailSysUI",
      selectSectionSysPrefab: "prefabs/selectSectionUI",
      storySysPrefab: "prefabs/storyNode",
      coverNodePrefab: "prefabs/fullSceneCoverNode",
      guildNodePrefab: "prefabs/guildNode",
      activityNodePrefab: "prefabs/activityNode"
    };
    var len = Object.keys(resObj).length;
    this.resNum = len;
    this.reses = {};
    var self = this;

    for (var key in resObj) {
      var temp = function temp(key) {
        var path = resObj[key];
        cc.loader.loadRes(path, function (err, res) {
          if (res) {
            self.reses[key] = res;
            self.loadedResNum += 1;

            if (self.loadedResNum == self.resNum) {
              complet();
            }
          } else {
            console.log("LOAD RES ERRO OF " + key + " :" + err);
          }
        });
      };

      temp(key);
    }
  } // update (dt) {},

});
var sharedResMgr = new ResMgr();
module.exports = sharedResMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xpYnMvcmVzTWdyLmpzIl0sIm5hbWVzIjpbIlJlc01nciIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicmVzZXMiLCJyZXNOdW0iLCJsb2FkZWRSZXNOdW0iLCJzdGFydCIsImxvYWRSZXNlcyIsImNvbXBsZXQiLCJyZXNPYmoiLCJub3RpU3lzUHJlZmFiIiwid2FsbFByZWZhYiIsImJ1bGxldFByZWZhYiIsInRhcmdldFByZWZhYiIsInBhdGhXYXlQcmVmYWIiLCJ3ZWxmYXJ5U3lzUHJlZmFiIiwic2lnbkluU3lzUHJlZmFiIiwiYWRkUHJvcGVydHlOdW1TeXNQcmVmYWIiLCJtYWlsU3lzUHJlZmFiIiwic2VsZWN0U2VjdGlvblN5c1ByZWZhYiIsInN0b3J5U3lzUHJlZmFiIiwiY292ZXJOb2RlUHJlZmFiIiwiZ3VpbGROb2RlUHJlZmFiIiwiYWN0aXZpdHlOb2RlUHJlZmFiIiwibGVuIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsInNlbGYiLCJrZXkiLCJ0ZW1wIiwicGF0aCIsImxvYWRlciIsImxvYWRSZXMiLCJlcnIiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwic2hhcmVkUmVzTWdyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFJQSxNQUFNLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ2xCLGFBQVNELEVBQUUsQ0FBQ0UsU0FETTtBQUdsQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLElBQUFBLEtBQUssRUFBRSxJQWhCQztBQWlCUkMsSUFBQUEsTUFBTSxFQUFFLElBakJBO0FBa0JSQyxJQUFBQSxZQUFZLEVBQUUsQ0FsQk4sQ0FtQlI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBaENRLEdBSE07QUFzQ2xCO0FBRUE7QUFFQUMsRUFBQUEsS0ExQ2tCLG1CQTBDVCxDQUVSLENBNUNpQjtBQThDbEJDLEVBQUFBLFNBOUNrQix1QkE4Q2dCO0FBQUEsUUFBeEJDLE9BQXdCLHVFQUFkLFlBQVUsQ0FBRSxDQUFFO0FBQzlCLFFBQUlDLE1BQU0sR0FBRztBQUNUO0FBQ0E7QUFDQUMsTUFBQUEsYUFBYSxFQUFFLGtCQUhOO0FBSVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsTUFBQUEsVUFBVSxFQUFFLGNBWEg7QUFZVEMsTUFBQUEsWUFBWSxFQUFFLGdCQVpMO0FBYVRDLE1BQUFBLFlBQVksRUFBRSxnQkFiTDtBQWNUQyxNQUFBQSxhQUFhLEVBQUUsaUJBZE47QUFpQlRDLE1BQUFBLGdCQUFnQixFQUFFLG1CQWpCVDtBQWtCVEMsTUFBQUEsZUFBZSxFQUFFLHFCQWxCUjtBQW1CVEMsTUFBQUEsdUJBQXVCLEVBQUUsMEJBbkJoQjtBQW9CVEMsTUFBQUEsYUFBYSxFQUFFLG1CQXBCTjtBQXFCVEMsTUFBQUEsc0JBQXNCLEVBQUUseUJBckJmO0FBc0JUQyxNQUFBQSxjQUFjLEVBQUUsbUJBdEJQO0FBd0JUQyxNQUFBQSxlQUFlLEVBQUUsNEJBeEJSO0FBeUJUQyxNQUFBQSxlQUFlLEVBQUUsbUJBekJSO0FBMEJUQyxNQUFBQSxrQkFBa0IsRUFBRTtBQTFCWCxLQUFiO0FBNkJBLFFBQUlDLEdBQUcsR0FBR0MsTUFBTSxDQUFDQyxJQUFQLENBQVlqQixNQUFaLEVBQW9Ca0IsTUFBOUI7QUFDQSxTQUFLdkIsTUFBTCxHQUFjb0IsR0FBZDtBQUNBLFNBQUtyQixLQUFMLEdBQWEsRUFBYjtBQUNBLFFBQUl5QixJQUFJLEdBQUcsSUFBWDs7QUFDQSxTQUFLLElBQUlDLEdBQVQsSUFBZ0JwQixNQUFoQixFQUF3QjtBQUNwQixVQUFJcUIsSUFBSSxHQUFHLFNBQVBBLElBQU8sQ0FBU0QsR0FBVCxFQUFjO0FBQ3JCLFlBQUlFLElBQUksR0FBR3RCLE1BQU0sQ0FBQ29CLEdBQUQsQ0FBakI7QUFDQTlCLFFBQUFBLEVBQUUsQ0FBQ2lDLE1BQUgsQ0FBVUMsT0FBVixDQUFrQkYsSUFBbEIsRUFBd0IsVUFBU0csR0FBVCxFQUFhQyxHQUFiLEVBQWlCO0FBQ3JDLGNBQUlBLEdBQUosRUFBUztBQUNMUCxZQUFBQSxJQUFJLENBQUN6QixLQUFMLENBQVcwQixHQUFYLElBQWtCTSxHQUFsQjtBQUNBUCxZQUFBQSxJQUFJLENBQUN2QixZQUFMLElBQXFCLENBQXJCOztBQUNBLGdCQUFJdUIsSUFBSSxDQUFDdkIsWUFBTCxJQUFxQnVCLElBQUksQ0FBQ3hCLE1BQTlCLEVBQXNDO0FBQ2xDSSxjQUFBQSxPQUFPO0FBQ1Y7QUFDSixXQU5ELE1BT0s7QUFDRDRCLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFzQlIsR0FBdEIsR0FBNEIsSUFBNUIsR0FBbUNLLEdBQS9DO0FBQ0g7QUFDSixTQVhEO0FBWUgsT0FkRDs7QUFlQUosTUFBQUEsSUFBSSxDQUFDRCxHQUFELENBQUo7QUFDSDtBQUNKLEdBbEdpQixDQW9HbEI7O0FBcEdrQixDQUFULENBQWI7QUF1R0EsSUFBSVMsWUFBWSxHQUFHLElBQUl4QyxNQUFKLEVBQW5CO0FBQ0F5QyxNQUFNLENBQUNDLE9BQVAsR0FBaUJGLFlBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cHM6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbnZhciBSZXNNZ3IgPSBjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICByZXNlczogbnVsbCxcbiAgICAgICAgcmVzTnVtOiBudWxsLFxuICAgICAgICBsb2FkZWRSZXNOdW06IDBcbiAgICAgICAgLy97XG4gICAgICAgIC8vICAgICBnZXQoKSB7XG4gICAgICAgIC8vICAgICAgICAgaWYgKHRoaXMuX2xvYWRlZFJlc051bSA9PSBudWxsKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuX2xvYWRlZFJlc051bSA9IDBcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRlZFJlc051bVxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2xvYWRlZFJlc051bSA9IHZhbHVlXG4gICAgICAgIC8vICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMucmVzTnVtKSB7XG5cbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9LFxuXG4gICAgbG9hZFJlc2VzKGNvbXBsZXQgPSBmdW5jdGlvbigpe30pIHtcbiAgICAgICAgdmFyIHJlc09iaiA9IHtcbiAgICAgICAgICAgIC8vIGVuc3VyZVN5c1ByZWZhYjogXCJwcmVmYWJzL2Vuc3VyZU5vZGVcIixcbiAgICAgICAgICAgIC8vIGFkZFN5c1ByZWZhYjogXCJwcmVmYWJzL2FkZFVJXCIsXG4gICAgICAgICAgICBub3RpU3lzUHJlZmFiOiBcInByZWZhYnMvbm90aU5vZGVcIixcbiAgICAgICAgICAgIC8vIG1haWxTeXNUYWdQcmVmYWI6IFwicHJlZmFicy9tYWlsVGFnTm9kZVwiLFxuICAgICAgICAgICAgLy8gbWFpbFN5c01haWxTZWN0aW9uTm9kZVByZWZhYjogXCJwcmVmYWJzL21haWxTZWN0aW9uTm9kZVwiLFxuICAgICAgICAgICAgLy8gbWFpbFN5c1NlbGVjdGVkVGFnRWZmZWN0UHJlZmFiOiBcInByZWZhYnMvc2VsZWN0ZWRUYWdFZmZlY3RcIixcbiAgICAgICAgICAgIC8vIG1haWxVSVByZWZhYjogXCJwcmVmYWJzL21haWxVSVwiLFxuICAgICAgICAgICAgLy8gbWFpbE9wdGlvblByZWZhYjogXCJwcmVmYWJzL21haWxPcHRpb25Ob2RlXCIsXG4gICAgICAgICAgICAvLyBtYWlsU3lzTWFpbFByZWZhYjogXCJwcmVmYWJzL21haWxOb2RlXCIsXG4gICAgICAgICAgICAvLyByZWRQb2ludFByZWZhYjogXCJwcmVmYWJzL3JlZFBvaW50XCIsXG4gICAgICAgICAgICB3YWxsUHJlZmFiOiBcInByZWZhYnMvd2FsbFwiLFxuICAgICAgICAgICAgYnVsbGV0UHJlZmFiOiBcInByZWZhYnMvYnVsbGV0XCIsXG4gICAgICAgICAgICB0YXJnZXRQcmVmYWI6IFwicHJlZmFicy90YXJnZXRcIixcbiAgICAgICAgICAgIHBhdGhXYXlQcmVmYWI6IFwicHJlZmFicy9wYXRoV2F5XCIsXG5cblxuICAgICAgICAgICAgd2VsZmFyeVN5c1ByZWZhYjogXCJwcmVmYWJzL3dlbGZhcnlVSVwiLFxuICAgICAgICAgICAgc2lnbkluU3lzUHJlZmFiOiBcInByZWZhYnMvc2lnbkluU3lzVUlcIixcbiAgICAgICAgICAgIGFkZFByb3BlcnR5TnVtU3lzUHJlZmFiOiBcInByZWZhYnMvYWRkUHJvcGVydHlOdW1VSVwiLFxuICAgICAgICAgICAgbWFpbFN5c1ByZWZhYjogXCJwcmVmYWJzL21haWxTeXNVSVwiLFxuICAgICAgICAgICAgc2VsZWN0U2VjdGlvblN5c1ByZWZhYjogXCJwcmVmYWJzL3NlbGVjdFNlY3Rpb25VSVwiLFxuICAgICAgICAgICAgc3RvcnlTeXNQcmVmYWI6IFwicHJlZmFicy9zdG9yeU5vZGVcIixcblxuICAgICAgICAgICAgY292ZXJOb2RlUHJlZmFiOiBcInByZWZhYnMvZnVsbFNjZW5lQ292ZXJOb2RlXCIsXG4gICAgICAgICAgICBndWlsZE5vZGVQcmVmYWI6IFwicHJlZmFicy9ndWlsZE5vZGVcIixcbiAgICAgICAgICAgIGFjdGl2aXR5Tm9kZVByZWZhYjogXCJwcmVmYWJzL2FjdGl2aXR5Tm9kZVwiXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGVuID0gT2JqZWN0LmtleXMocmVzT2JqKS5sZW5ndGhcbiAgICAgICAgdGhpcy5yZXNOdW0gPSBsZW5cbiAgICAgICAgdGhpcy5yZXNlcyA9IHt9XG4gICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gcmVzT2JqKSB7XG4gICAgICAgICAgICB2YXIgdGVtcCA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciBwYXRoID0gcmVzT2JqW2tleV1cbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhwYXRoLCBmdW5jdGlvbihlcnIscmVzKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXNlc1trZXldID0gcmVzXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYWRlZFJlc051bSArPSAxXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5sb2FkZWRSZXNOdW0gPT0gc2VsZi5yZXNOdW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTE9BRCBSRVMgRVJSTyBPRiBcIiArIGtleSArIFwiIDpcIiArIGVycilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZW1wKGtleSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuXG52YXIgc2hhcmVkUmVzTWdyID0gbmV3IFJlc01ncigpXG5tb2R1bGUuZXhwb3J0cyA9IHNoYXJlZFJlc01nclxuIl19