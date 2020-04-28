
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/configs/mailSysConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4a64feyfXJHbZN/RRBmqrAY', 'mailSysConfig');
// configs/mailSysConfig.js

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
var mailSysConfig = {
  mainLine: {
    tagNameTextId: 127,
    conditions: [{
      conditionType: 1,
      conditionPara: 2,
      mailId: 1001
    }, {
      conditionType: 1,
      conditionPara: 5,
      mailId: 1002
    }, {
      conditionType: 1,
      conditionPara: 10,
      mailId: 1003
    }]
  },
  branchLine1: {
    tagNameTextId: 128,
    conditions: [{
      conditionType: 2,
      conditionPara: {
        levelId: 3,
        minStepNum: 8
      },
      mailId: 1101
    }]
  }
};
module.exports = mailSysConfig;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9jb25maWdzL21haWxTeXNDb25maWcuanMiXSwibmFtZXMiOlsibWFpbFN5c0NvbmZpZyIsIm1haW5MaW5lIiwidGFnTmFtZVRleHRJZCIsImNvbmRpdGlvbnMiLCJjb25kaXRpb25UeXBlIiwiY29uZGl0aW9uUGFyYSIsIm1haWxJZCIsImJyYW5jaExpbmUxIiwibGV2ZWxJZCIsIm1pblN0ZXBOdW0iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLGFBQWEsR0FBRztBQUNoQkMsRUFBQUEsUUFBUSxFQUFFO0FBQ05DLElBQUFBLGFBQWEsRUFBRSxHQURUO0FBRU5DLElBQUFBLFVBQVUsRUFBRSxDQUNSO0FBQ0lDLE1BQUFBLGFBQWEsRUFBRSxDQURuQjtBQUVJQyxNQUFBQSxhQUFhLEVBQUUsQ0FGbkI7QUFHSUMsTUFBQUEsTUFBTSxFQUFFO0FBSFosS0FEUSxFQU1SO0FBQ0lGLE1BQUFBLGFBQWEsRUFBRSxDQURuQjtBQUVJQyxNQUFBQSxhQUFhLEVBQUUsQ0FGbkI7QUFHSUMsTUFBQUEsTUFBTSxFQUFFO0FBSFosS0FOUSxFQVdSO0FBQ0lGLE1BQUFBLGFBQWEsRUFBRSxDQURuQjtBQUVJQyxNQUFBQSxhQUFhLEVBQUUsRUFGbkI7QUFHSUMsTUFBQUEsTUFBTSxFQUFFO0FBSFosS0FYUTtBQUZOLEdBRE07QUFzQmhCQyxFQUFBQSxXQUFXLEVBQUU7QUFDVEwsSUFBQUEsYUFBYSxFQUFFLEdBRE47QUFFVEMsSUFBQUEsVUFBVSxFQUFFLENBQ1I7QUFDSUMsTUFBQUEsYUFBYSxFQUFFLENBRG5CO0FBRUlDLE1BQUFBLGFBQWEsRUFBRTtBQUNYRyxRQUFBQSxPQUFPLEVBQUUsQ0FERTtBQUVYQyxRQUFBQSxVQUFVLEVBQUU7QUFGRCxPQUZuQjtBQU1JSCxNQUFBQSxNQUFNLEVBQUU7QUFOWixLQURRO0FBRkg7QUF0QkcsQ0FBcEI7QUFzQ0FJLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQlgsYUFBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxudmFyIG1haWxTeXNDb25maWcgPSB7XG4gICAgbWFpbkxpbmU6IHtcbiAgICAgICAgdGFnTmFtZVRleHRJZDogMTI3LFxuICAgICAgICBjb25kaXRpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29uZGl0aW9uVHlwZTogMSxcbiAgICAgICAgICAgICAgICBjb25kaXRpb25QYXJhOiAyLFxuICAgICAgICAgICAgICAgIG1haWxJZDogMTAwMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25kaXRpb25UeXBlOiAxLFxuICAgICAgICAgICAgICAgIGNvbmRpdGlvblBhcmE6IDUsXG4gICAgICAgICAgICAgICAgbWFpbElkOiAxMDAyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbmRpdGlvblR5cGU6IDEsXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uUGFyYTogMTAsXG4gICAgICAgICAgICAgICAgbWFpbElkOiAxMDAzXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuXG4gICAgYnJhbmNoTGluZTE6IHtcbiAgICAgICAgdGFnTmFtZVRleHRJZDogMTI4LFxuICAgICAgICBjb25kaXRpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29uZGl0aW9uVHlwZTogMixcbiAgICAgICAgICAgICAgICBjb25kaXRpb25QYXJhOiB7XG4gICAgICAgICAgICAgICAgICAgIGxldmVsSWQ6IDMsXG4gICAgICAgICAgICAgICAgICAgIG1pblN0ZXBOdW06IDhcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1haWxJZDogMTEwMVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFpbFN5c0NvbmZpZyJdfQ==