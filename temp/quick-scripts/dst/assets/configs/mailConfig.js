
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/configs/mailConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b8af6yKxwJNLpuWEyI5t8+/', 'mailConfig');
// configs/mailConfig.js

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
var mailConfig = {
  "1001": {
    titleTextId: 133,
    contentTextId: 134,
    options: [{
      showTextId: 135,
      operationType: 1,
      operationPara: null
    }, {
      showTextId: 136,
      operationType: 2,
      operationPara: {
        mailId: 10001,
        delay: 60
      }
    }, {
      showTextId: 137,
      operationType: 1,
      operationPara: null
    }]
  },
  "10001": {
    titleTextId: 138,
    contentTextId: 139,
    options: []
  },
  "1002": {
    titleTextId: 140,
    contentTextId: 141,
    options: []
  },
  "1003": {
    titleTextId: 142,
    contentTextId: 143,
    options: []
  },
  "1101": {
    titleTextId: 144,
    contentTextId: 145,
    options: []
  }
};
module.exports = mailConfig;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9jb25maWdzL21haWxDb25maWcuanMiXSwibmFtZXMiOlsibWFpbENvbmZpZyIsInRpdGxlVGV4dElkIiwiY29udGVudFRleHRJZCIsIm9wdGlvbnMiLCJzaG93VGV4dElkIiwib3BlcmF0aW9uVHlwZSIsIm9wZXJhdGlvblBhcmEiLCJtYWlsSWQiLCJkZWxheSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsVUFBVSxHQUFHO0FBQ2IsVUFBUTtBQUNKQyxJQUFBQSxXQUFXLEVBQUUsR0FEVDtBQUVKQyxJQUFBQSxhQUFhLEVBQUUsR0FGWDtBQUdKQyxJQUFBQSxPQUFPLEVBQUUsQ0FDTDtBQUNJQyxNQUFBQSxVQUFVLEVBQUUsR0FEaEI7QUFFSUMsTUFBQUEsYUFBYSxFQUFFLENBRm5CO0FBR0lDLE1BQUFBLGFBQWEsRUFBRTtBQUhuQixLQURLLEVBTUw7QUFDSUYsTUFBQUEsVUFBVSxFQUFFLEdBRGhCO0FBRUlDLE1BQUFBLGFBQWEsRUFBRSxDQUZuQjtBQUdJQyxNQUFBQSxhQUFhLEVBQUU7QUFDWEMsUUFBQUEsTUFBTSxFQUFFLEtBREc7QUFFWEMsUUFBQUEsS0FBSyxFQUFFO0FBRkk7QUFIbkIsS0FOSyxFQWNMO0FBQ0lKLE1BQUFBLFVBQVUsRUFBRSxHQURoQjtBQUVJQyxNQUFBQSxhQUFhLEVBQUUsQ0FGbkI7QUFHSUMsTUFBQUEsYUFBYSxFQUFFO0FBSG5CLEtBZEs7QUFITCxHQURLO0FBeUJiLFdBQVM7QUFDTEwsSUFBQUEsV0FBVyxFQUFFLEdBRFI7QUFFTEMsSUFBQUEsYUFBYSxFQUFFLEdBRlY7QUFHTEMsSUFBQUEsT0FBTyxFQUFDO0FBSEgsR0F6Qkk7QUErQmIsVUFBUTtBQUNKRixJQUFBQSxXQUFXLEVBQUUsR0FEVDtBQUVKQyxJQUFBQSxhQUFhLEVBQUUsR0FGWDtBQUdKQyxJQUFBQSxPQUFPLEVBQUU7QUFITCxHQS9CSztBQXFDYixVQUFRO0FBQ0pGLElBQUFBLFdBQVcsRUFBRSxHQURUO0FBRUpDLElBQUFBLGFBQWEsRUFBRSxHQUZYO0FBR0pDLElBQUFBLE9BQU8sRUFBRTtBQUhMLEdBckNLO0FBNENiLFVBQVE7QUFDSkYsSUFBQUEsV0FBVyxFQUFFLEdBRFQ7QUFFSkMsSUFBQUEsYUFBYSxFQUFFLEdBRlg7QUFHSkMsSUFBQUEsT0FBTyxFQUFFO0FBSEw7QUE1Q0ssQ0FBakI7QUFtREFNLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQlYsVUFBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxudmFyIG1haWxDb25maWcgPSB7XG4gICAgXCIxMDAxXCI6IHtcbiAgICAgICAgdGl0bGVUZXh0SWQ6IDEzMyxcbiAgICAgICAgY29udGVudFRleHRJZDogMTM0LFxuICAgICAgICBvcHRpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2hvd1RleHRJZDogMTM1LFxuICAgICAgICAgICAgICAgIG9wZXJhdGlvblR5cGU6IDEsXG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uUGFyYTogbnVsbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzaG93VGV4dElkOiAxMzYsXG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uVHlwZTogMixcbiAgICAgICAgICAgICAgICBvcGVyYXRpb25QYXJhOiB7XG4gICAgICAgICAgICAgICAgICAgIG1haWxJZDogMTAwMDEsXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5OiA2MCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNob3dUZXh0SWQ6IDEzNyxcbiAgICAgICAgICAgICAgICBvcGVyYXRpb25UeXBlOiAxLFxuICAgICAgICAgICAgICAgIG9wZXJhdGlvblBhcmE6IG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAgXCIxMDAwMVwiOiB7XG4gICAgICAgIHRpdGxlVGV4dElkOiAxMzgsXG4gICAgICAgIGNvbnRlbnRUZXh0SWQ6IDEzOSxcbiAgICAgICAgb3B0aW9uczpbXVxuICAgIH0sXG5cbiAgICBcIjEwMDJcIjoge1xuICAgICAgICB0aXRsZVRleHRJZDogMTQwLFxuICAgICAgICBjb250ZW50VGV4dElkOiAxNDEsXG4gICAgICAgIG9wdGlvbnM6IFtdXG4gICAgfSxcblxuICAgIFwiMTAwM1wiOiB7XG4gICAgICAgIHRpdGxlVGV4dElkOiAxNDIsXG4gICAgICAgIGNvbnRlbnRUZXh0SWQ6IDE0MyxcbiAgICAgICAgb3B0aW9uczogW11cbiAgICB9LFxuXG5cbiAgICBcIjExMDFcIjoge1xuICAgICAgICB0aXRsZVRleHRJZDogMTQ0LFxuICAgICAgICBjb250ZW50VGV4dElkOiAxNDUsXG4gICAgICAgIG9wdGlvbnM6IFtdXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1haWxDb25maWciXX0=