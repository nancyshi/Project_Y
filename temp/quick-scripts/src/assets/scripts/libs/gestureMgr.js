"use strict";
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