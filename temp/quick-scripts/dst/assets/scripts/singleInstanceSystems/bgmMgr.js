
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/singleInstanceSystems/bgmMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '85e7aM+gYxGO7/681vwMtI2', 'bgmMgr');
// scripts/singleInstanceSystems/bgmMgr.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var BgmMgr = cc.Class({
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
    selectedSection: {
      get: function get() {
        return this._selectedSection;
      },
      set: function set(value) {
        if (value.toString() != this.selectedSection) {
          this.playBgm(value);
        }

        this._selectedSection = value;
      }
    }
  },
  playBgm: function playBgm(section) {
    cc.audioEngine.stopAll();

    var path = require("sectionConfig")[section.toString()].bgmPath;

    cc.loader.loadRes(path, function (err, res) {
      cc.audioEngine.play(res);
    });
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {} // update (dt) {},

});
var sharedBgmMgr = new BgmMgr();
module.exports = sharedBgmMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3NpbmdsZUluc3RhbmNlU3lzdGVtcy9iZ21NZ3IuanMiXSwibmFtZXMiOlsiQmdtTWdyIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzZWxlY3RlZFNlY3Rpb24iLCJnZXQiLCJfc2VsZWN0ZWRTZWN0aW9uIiwic2V0IiwidmFsdWUiLCJ0b1N0cmluZyIsInBsYXlCZ20iLCJzZWN0aW9uIiwiYXVkaW9FbmdpbmUiLCJzdG9wQWxsIiwicGF0aCIsInJlcXVpcmUiLCJiZ21QYXRoIiwibG9hZGVyIiwibG9hZFJlcyIsImVyciIsInJlcyIsInBsYXkiLCJzdGFydCIsInNoYXJlZEJnbU1nciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsTUFBTSxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNsQixhQUFTRCxFQUFFLENBQUNFLFNBRE07QUFHbEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxJQUFBQSxlQUFlLEVBQUU7QUFDYkMsTUFBQUEsR0FEYSxpQkFDUDtBQUNGLGVBQU8sS0FBS0MsZ0JBQVo7QUFDSCxPQUhZO0FBSWJDLE1BQUFBLEdBSmEsZUFJVEMsS0FKUyxFQUlGO0FBRVAsWUFBSUEsS0FBSyxDQUFDQyxRQUFOLE1BQW9CLEtBQUtMLGVBQTdCLEVBQThDO0FBQzFDLGVBQUtNLE9BQUwsQ0FBYUYsS0FBYjtBQUNIOztBQUNELGFBQUtGLGdCQUFMLEdBQXdCRSxLQUF4QjtBQUNIO0FBVlk7QUFoQlQsR0FITTtBQWlDbEJFLEVBQUFBLE9BakNrQixtQkFpQ1ZDLE9BakNVLEVBaUNEO0FBQ2JYLElBQUFBLEVBQUUsQ0FBQ1ksV0FBSCxDQUFlQyxPQUFmOztBQUNBLFFBQUlDLElBQUksR0FBR0MsT0FBTyxDQUFDLGVBQUQsQ0FBUCxDQUF5QkosT0FBTyxDQUFDRixRQUFSLEVBQXpCLEVBQTZDTyxPQUF4RDs7QUFDQWhCLElBQUFBLEVBQUUsQ0FBQ2lCLE1BQUgsQ0FBVUMsT0FBVixDQUFrQkosSUFBbEIsRUFBdUIsVUFBU0ssR0FBVCxFQUFhQyxHQUFiLEVBQWlCO0FBQ3BDcEIsTUFBQUEsRUFBRSxDQUFDWSxXQUFILENBQWVTLElBQWYsQ0FBb0JELEdBQXBCO0FBQ0gsS0FGRDtBQUdILEdBdkNpQjtBQXdDbEI7QUFFQTtBQUVBRSxFQUFBQSxLQTVDa0IsbUJBNENULENBRVIsQ0E5Q2lCLENBZ0RsQjs7QUFoRGtCLENBQVQsQ0FBYjtBQW1EQSxJQUFJQyxZQUFZLEdBQUcsSUFBSXhCLE1BQUosRUFBbkI7QUFDQXlCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQkYsWUFBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbnZhciBCZ21NZ3IgPSBjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICBzZWxlY3RlZFNlY3Rpb246IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRTZWN0aW9uXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnRvU3RyaW5nKCkgIT0gdGhpcy5zZWxlY3RlZFNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5QmdtKHZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZFNlY3Rpb24gPSB2YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICBwbGF5QmdtKHNlY3Rpb24pIHtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpXG4gICAgICAgIHZhciBwYXRoID0gcmVxdWlyZShcInNlY3Rpb25Db25maWdcIilbc2VjdGlvbi50b1N0cmluZygpXS5iZ21QYXRoXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHBhdGgsZnVuY3Rpb24oZXJyLHJlcyl7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHJlcylcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG5cbnZhciBzaGFyZWRCZ21NZ3IgPSBuZXcgQmdtTWdyKClcbm1vZHVsZS5leHBvcnRzID0gc2hhcmVkQmdtTWdyIl19