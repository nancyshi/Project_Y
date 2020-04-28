
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/libs/gestureMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9fa79MbD2xKKJly3Hl8wtuT', 'gestureMgr');
// scripts/libs/gestureMgr.js

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
    isDragEnable: true,
    isZoomEnable: true,
    zoomSpeed: 0.00333,
    maxZoomRatio: 1.2,
    minZoomRatio: 0.3,
    dragSpeed: 1,
    camaraNode: cc.Node,
    minBoundX: -960,
    maxBoundX: 960,
    minBoundY: -640,
    maxBoundY: 640,
    //logic properties
    touches: {
      "default": [],
      visible: false
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.node.on("touchstart", function (event) {
      this.onTouchStart(event);
    }, this);
    this.node.on("touchmove", function (event) {
      this.onTouchMove(event);
    }, this);
    this.node.on("touchend", function (event) {
      this.onTouchEnd(event);
    }, this);
    this.node.on("touchcancel", function (event) {
      this.onTouchCancel(event);
    }, this);
  },
  // start () {
  // },
  // update (dt) {},
  onTouchStart: function onTouchStart(event) {
    var touchEvent = event;
    this.touches.push(touchEvent);
  },
  onTouchMove: function onTouchMove(event) {
    if (this.isDragEnable == true && this.touches.length == 1) {
      var delta = event.getDelta();
      var tempX = delta.x * -1;
      var tempY = delta.y * -1;
      tempX = tempX * this.dragSpeed;
      tempY = tempY * this.dragSpeed;
      var cama = this.camaraNode.getComponent(cc.Camera);
      var canvas = cc.find("Canvas");
      var tempCamaX = this.camaraNode.x + tempX;
      var tempCamaY = this.camaraNode.y + tempY;
      var camaMaxBoundX = tempCamaX + canvas.width / 2 * (1 / cama.zoomRatio);
      var camaMinBoundX = tempCamaX - canvas.width / 2 * (1 / cama.zoomRatio);
      var camaMaxBoundY = tempCamaY + canvas.height / 2 * (1 / cama.zoomRatio);
      var camaMinBoundY = tempCamaY - canvas.height / 2 * (1 / cama.zoomRatio);

      if (camaMaxBoundX <= this.maxBoundX && camaMinBoundX >= this.minBoundX) {
        this.camaraNode.x = tempCamaX;
      }

      if (camaMaxBoundY <= this.maxBoundY && camaMinBoundY >= this.minBoundY) {
        this.camaraNode.y = tempCamaY;
      }
    }

    if (this.isZoomEnable == true && this.touches.length == 2) {
      var firstTouch = this.touches[0];
      var seceondTouch = this.touches[1];
      var firstTouchLocation = firstTouch.getLocation();
      var seceondTouchLocation = seceondTouch.getLocation();
      var distance = this.distanceOfTwoVector(firstTouchLocation, seceondTouchLocation);
      var preFirstTouchLocation = firstTouch.getPreviousLocation();
      var preSeceondTouchLocation = seceondTouch.getPreviousLocation();
      var preDistance = this.distanceOfTwoVector(preFirstTouchLocation, preSeceondTouchLocation);
      var disDelta = distance - preDistance;
      var cama = this.camaraNode.getComponent(cc.Camera);
      var tempZoomRatio = cama.zoomRatio + this.zoomRatio * disDelta;

      if (tempZoomRatio >= minZoomRatio && tempZoomRatio <= maxZoomRatio) {
        cama.zoomRatio = tempZoomRatio;
      }
    }
  },
  onTouchEnd: function onTouchEnd(event) {
    this.deleteTouchEventFromTouchesArry(event);
  },
  onTouchCancel: function onTouchCancel(event) {
    this.deleteTouchEventFromTouchesArry(event);
  },
  deleteTouchEventFromTouchesArry: function deleteTouchEventFromTouchesArry(event) {
    var tempIndex = null;

    for (var index in this.touches) {
      var oneTouchEvent = this.touches[index];

      if (oneTouchEvent.getID() == event.getID()) {
        tempIndex = index;
        break;
      }
    }

    if (tempIndex != null) {
      this.touches.splice(index, 1);
    }
  },
  distanceOfTwoVector: function distanceOfTwoVector(a, b) {
    var distance = Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2);
    distance = Math.sqrt(distance);
    return distance;
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xpYnMvZ2VzdHVyZU1nci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImlzRHJhZ0VuYWJsZSIsImlzWm9vbUVuYWJsZSIsInpvb21TcGVlZCIsIm1heFpvb21SYXRpbyIsIm1pblpvb21SYXRpbyIsImRyYWdTcGVlZCIsImNhbWFyYU5vZGUiLCJOb2RlIiwibWluQm91bmRYIiwibWF4Qm91bmRYIiwibWluQm91bmRZIiwibWF4Qm91bmRZIiwidG91Y2hlcyIsInZpc2libGUiLCJvbkxvYWQiLCJub2RlIiwib24iLCJldmVudCIsIm9uVG91Y2hTdGFydCIsIm9uVG91Y2hNb3ZlIiwib25Ub3VjaEVuZCIsIm9uVG91Y2hDYW5jZWwiLCJ0b3VjaEV2ZW50IiwicHVzaCIsImxlbmd0aCIsImRlbHRhIiwiZ2V0RGVsdGEiLCJ0ZW1wWCIsIngiLCJ0ZW1wWSIsInkiLCJjYW1hIiwiZ2V0Q29tcG9uZW50IiwiQ2FtZXJhIiwiY2FudmFzIiwiZmluZCIsInRlbXBDYW1hWCIsInRlbXBDYW1hWSIsImNhbWFNYXhCb3VuZFgiLCJ3aWR0aCIsInpvb21SYXRpbyIsImNhbWFNaW5Cb3VuZFgiLCJjYW1hTWF4Qm91bmRZIiwiaGVpZ2h0IiwiY2FtYU1pbkJvdW5kWSIsImZpcnN0VG91Y2giLCJzZWNlb25kVG91Y2giLCJmaXJzdFRvdWNoTG9jYXRpb24iLCJnZXRMb2NhdGlvbiIsInNlY2VvbmRUb3VjaExvY2F0aW9uIiwiZGlzdGFuY2UiLCJkaXN0YW5jZU9mVHdvVmVjdG9yIiwicHJlRmlyc3RUb3VjaExvY2F0aW9uIiwiZ2V0UHJldmlvdXNMb2NhdGlvbiIsInByZVNlY2VvbmRUb3VjaExvY2F0aW9uIiwicHJlRGlzdGFuY2UiLCJkaXNEZWx0YSIsInRlbXBab29tUmF0aW8iLCJkZWxldGVUb3VjaEV2ZW50RnJvbVRvdWNoZXNBcnJ5IiwidGVtcEluZGV4IiwiaW5kZXgiLCJvbmVUb3VjaEV2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S0FBYixDQUFwQjs7QUFDQSxVQUFJQyxhQUFhLENBQUNDLEtBQWQsTUFBeUI3QyxLQUFLLENBQUM2QyxLQUFOLEVBQTdCLEVBQTRDO0FBQ3hDSCxRQUFBQSxTQUFTLEdBQUdDLEtBQVo7QUFDQTtBQUNIO0FBQ0o7O0FBQ0QsUUFBSUQsU0FBUyxJQUFJLElBQWpCLEVBQXVCO0FBQ25CLFdBQUsvQyxPQUFMLENBQWFtRCxNQUFiLENBQW9CSCxLQUFwQixFQUEwQixDQUExQjtBQUNIO0FBQ0osR0F2SEk7QUF3SExULEVBQUFBLG1CQXhISywrQkF3SGVhLENBeEhmLEVBd0hpQkMsQ0F4SGpCLEVBd0hvQjtBQUNyQixRQUFJZixRQUFRLEdBQUdnQixJQUFJLENBQUNDLEdBQUwsQ0FBVUYsQ0FBQyxDQUFDckMsQ0FBRixHQUFNb0MsQ0FBQyxDQUFDcEMsQ0FBbEIsRUFBcUIsQ0FBckIsSUFBMEJzQyxJQUFJLENBQUNDLEdBQUwsQ0FBVUYsQ0FBQyxDQUFDbkMsQ0FBRixHQUFNa0MsQ0FBQyxDQUFDbEMsQ0FBbEIsRUFBcUIsQ0FBckIsQ0FBekM7QUFDQW9CLElBQUFBLFFBQVEsR0FBR2dCLElBQUksQ0FBQ0UsSUFBTCxDQUFVbEIsUUFBVixDQUFYO0FBQ0EsV0FBT0EsUUFBUDtBQUNIO0FBNUhJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaXNEcmFnRW5hYmxlOiB0cnVlLFxuICAgICAgICBpc1pvb21FbmFibGU6IHRydWUsXG5cbiAgICAgICAgem9vbVNwZWVkOiAwLjAwMzMzLFxuICAgICAgICBtYXhab29tUmF0aW86IDEuMixcbiAgICAgICAgbWluWm9vbVJhdGlvOiAwLjMsXG5cbiAgICAgICAgZHJhZ1NwZWVkOiAxLFxuICAgICAgICBjYW1hcmFOb2RlOiBjYy5Ob2RlLFxuICAgICAgICBtaW5Cb3VuZFg6IC05NjAsXG4gICAgICAgIG1heEJvdW5kWDogOTYwLFxuICAgICAgICBtaW5Cb3VuZFk6IC02NDAsXG4gICAgICAgIG1heEJvdW5kWTogNjQwLFxuXG4gICAgICAgIC8vbG9naWMgcHJvcGVydGllc1xuICAgICAgICB0b3VjaGVzOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5ub2RlLm9uKFwidG91Y2hzdGFydFwiLGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICB0aGlzLm9uVG91Y2hTdGFydChldmVudClcbiAgICAgIH0sdGhpcykgIFxuICAgICAgdGhpcy5ub2RlLm9uKFwidG91Y2htb3ZlXCIsZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgIHRoaXMub25Ub3VjaE1vdmUoZXZlbnQpXG4gICAgICB9LHRoaXMpIFxuICAgICAgdGhpcy5ub2RlLm9uKFwidG91Y2hlbmRcIixmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgdGhpcy5vblRvdWNoRW5kKGV2ZW50KVxuICAgICAgfSx0aGlzKSBcbiAgICAgIHRoaXMubm9kZS5vbihcInRvdWNoY2FuY2VsXCIsZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgIHRoaXMub25Ub3VjaENhbmNlbChldmVudClcbiAgICAgIH0sdGhpcykgXG4gICAgfSxcblxuICAgIC8vIHN0YXJ0ICgpIHtcblxuICAgIC8vIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbiAgICBvblRvdWNoU3RhcnQoZXZlbnQpe1xuICAgICAgICB2YXIgdG91Y2hFdmVudCA9IGV2ZW50XG4gICAgICAgIHRoaXMudG91Y2hlcy5wdXNoKHRvdWNoRXZlbnQpXG4gICAgfSxcbiAgICBvblRvdWNoTW92ZShldmVudCl7XG4gICAgICAgIGlmICh0aGlzLmlzRHJhZ0VuYWJsZSA9PSB0cnVlICYmIHRoaXMudG91Y2hlcy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgdmFyIGRlbHRhID0gZXZlbnQuZ2V0RGVsdGEoKVxuICAgICAgICAgICAgdmFyIHRlbXBYID0gZGVsdGEueCAqIC0xXG4gICAgICAgICAgICB2YXIgdGVtcFkgPSBkZWx0YS55ICogLTFcbiAgICBcbiAgICAgICAgICAgIHRlbXBYID0gdGVtcFggKiB0aGlzLmRyYWdTcGVlZFxuICAgICAgICAgICAgdGVtcFkgPSB0ZW1wWSAqIHRoaXMuZHJhZ1NwZWVkXG4gICAgXG4gICAgICAgICAgICB2YXIgY2FtYSA9IHRoaXMuY2FtYXJhTm9kZS5nZXRDb21wb25lbnQoY2MuQ2FtZXJhKVxuICAgICAgICAgICAgdmFyIGNhbnZhcyA9IGNjLmZpbmQoXCJDYW52YXNcIilcbiAgICBcbiAgICAgICAgICAgIHZhciB0ZW1wQ2FtYVggPSB0aGlzLmNhbWFyYU5vZGUueCArIHRlbXBYXG4gICAgICAgICAgICB2YXIgdGVtcENhbWFZID0gdGhpcy5jYW1hcmFOb2RlLnkgKyB0ZW1wWVxuICAgIFxuICAgICAgICAgICAgdmFyIGNhbWFNYXhCb3VuZFggPSB0ZW1wQ2FtYVggKyAoY2FudmFzLndpZHRoLzIpICogKDEvY2FtYS56b29tUmF0aW8pXG4gICAgICAgICAgICB2YXIgY2FtYU1pbkJvdW5kWCA9IHRlbXBDYW1hWCAtIChjYW52YXMud2lkdGgvMikgKiAoMS9jYW1hLnpvb21SYXRpbylcbiAgICAgICAgICAgIHZhciBjYW1hTWF4Qm91bmRZID0gdGVtcENhbWFZICsgKGNhbnZhcy5oZWlnaHQvMikgKiAoMS9jYW1hLnpvb21SYXRpbylcbiAgICAgICAgICAgIHZhciBjYW1hTWluQm91bmRZID0gdGVtcENhbWFZIC0gKGNhbnZhcy5oZWlnaHQvMikgKiAoMS9jYW1hLnpvb21SYXRpbylcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGNhbWFNYXhCb3VuZFggPD0gdGhpcy5tYXhCb3VuZFggJiYgY2FtYU1pbkJvdW5kWCA+PSB0aGlzLm1pbkJvdW5kWCApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbWFyYU5vZGUueCA9IHRlbXBDYW1hWFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhbWFNYXhCb3VuZFkgPD0gdGhpcy5tYXhCb3VuZFkgJiYgY2FtYU1pbkJvdW5kWSA+PSB0aGlzLm1pbkJvdW5kWSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FtYXJhTm9kZS55ID0gdGVtcENhbWFZXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLmlzWm9vbUVuYWJsZSA9PSB0cnVlICYmIHRoaXMudG91Y2hlcy5sZW5ndGggPT0gMikge1xuICAgICAgICAgICAgdmFyIGZpcnN0VG91Y2ggPSB0aGlzLnRvdWNoZXNbMF1cbiAgICAgICAgICAgIHZhciBzZWNlb25kVG91Y2ggPSB0aGlzLnRvdWNoZXNbMV1cbiAgICAgICAgICAgIHZhciBmaXJzdFRvdWNoTG9jYXRpb24gPSBmaXJzdFRvdWNoLmdldExvY2F0aW9uKClcbiAgICAgICAgICAgIHZhciBzZWNlb25kVG91Y2hMb2NhdGlvbiA9IHNlY2VvbmRUb3VjaC5nZXRMb2NhdGlvbigpXG5cbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IHRoaXMuZGlzdGFuY2VPZlR3b1ZlY3RvcihmaXJzdFRvdWNoTG9jYXRpb24sc2VjZW9uZFRvdWNoTG9jYXRpb24pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBwcmVGaXJzdFRvdWNoTG9jYXRpb24gPSBmaXJzdFRvdWNoLmdldFByZXZpb3VzTG9jYXRpb24oKVxuICAgICAgICAgICAgdmFyIHByZVNlY2VvbmRUb3VjaExvY2F0aW9uID0gc2VjZW9uZFRvdWNoLmdldFByZXZpb3VzTG9jYXRpb24oKVxuICAgICAgICAgICAgdmFyIHByZURpc3RhbmNlID0gdGhpcy5kaXN0YW5jZU9mVHdvVmVjdG9yKHByZUZpcnN0VG91Y2hMb2NhdGlvbixwcmVTZWNlb25kVG91Y2hMb2NhdGlvbilcblxuICAgICAgICAgICAgdmFyIGRpc0RlbHRhID0gZGlzdGFuY2UgLSBwcmVEaXN0YW5jZVxuXG4gICAgICAgICAgICB2YXIgY2FtYSA9IHRoaXMuY2FtYXJhTm9kZS5nZXRDb21wb25lbnQoY2MuQ2FtZXJhKVxuICAgICAgICAgICAgdmFyIHRlbXBab29tUmF0aW8gPSBjYW1hLnpvb21SYXRpbyArIHRoaXMuem9vbVJhdGlvICogZGlzRGVsdGFcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRlbXBab29tUmF0aW8gPj0gbWluWm9vbVJhdGlvICYmIHRlbXBab29tUmF0aW8gPD0gbWF4Wm9vbVJhdGlvKSB7XG4gICAgICAgICAgICAgICAgY2FtYS56b29tUmF0aW8gPSB0ZW1wWm9vbVJhdGlvXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG9uVG91Y2hFbmQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5kZWxldGVUb3VjaEV2ZW50RnJvbVRvdWNoZXNBcnJ5KGV2ZW50KVxuICAgIH0sXG4gICAgb25Ub3VjaENhbmNlbChldmVudCl7XG4gICAgICAgIHRoaXMuZGVsZXRlVG91Y2hFdmVudEZyb21Ub3VjaGVzQXJyeShldmVudClcbiAgICB9LFxuICAgIGRlbGV0ZVRvdWNoRXZlbnRGcm9tVG91Y2hlc0FycnkoZXZlbnQpIHtcbiAgICAgICAgdmFyIHRlbXBJbmRleCA9IG51bGxcbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gdGhpcy50b3VjaGVzKSB7XG4gICAgICAgICAgICB2YXIgb25lVG91Y2hFdmVudCA9IHRoaXMudG91Y2hlc1tpbmRleF1cbiAgICAgICAgICAgIGlmIChvbmVUb3VjaEV2ZW50LmdldElEKCkgPT0gZXZlbnQuZ2V0SUQoKSkge1xuICAgICAgICAgICAgICAgIHRlbXBJbmRleCA9IGluZGV4XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGVtcEluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudG91Y2hlcy5zcGxpY2UoaW5kZXgsMSlcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZGlzdGFuY2VPZlR3b1ZlY3RvcihhLGIpIHtcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gTWF0aC5wb3coKGIueCAtIGEueCksMikgKyBNYXRoLnBvdygoYi55IC0gYS55KSwyKVxuICAgICAgICBkaXN0YW5jZSA9IE1hdGguc3FydChkaXN0YW5jZSlcbiAgICAgICAgcmV0dXJuIGRpc3RhbmNlXG4gICAgfVxufSk7XG4iXX0=