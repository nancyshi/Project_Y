
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/singleInstanceSystems/gameMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '29a86GW8otIsI4PtNbaQyRE', 'gameMgr');
// scripts/singleInstanceSystems/gameMgr.js

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
var GameMgr = cc.Class({
  "extends": cc.Component,
  properties: {// foo: {
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
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {},
  enterLevelScene: function enterLevelScene(givenLevel) {
    var self = this;
    cc.director.preloadScene("levelScene", null, function (err, res) {
      var levelMgr = res.scene.getChildByName("Canvas").getComponent("levelMgr");
      levelMgr.level = givenLevel;
      self.animatedToScene("levelScene");
    });
  },
  animatedToScene: function animatedToScene(sceneName) {
    var coverNode = require("resMgr").reses["coverNodePrefab"];

    coverNode = cc.instantiate(coverNode);
    coverNode.width = cc.winSize.width;
    coverNode.height = cc.winSize.height;
    coverNode.opacity = 0;
    coverNode.on("touchstart", function () {});
    cc.director.getScene().getChildByName("Canvas").addChild(coverNode);
    cc.tween(coverNode).to(0.3, {
      opacity: 255
    }).delay(0.3).call(function () {
      cc.director.loadScene(sceneName);
    }).start();
  },
  _generateLevelSceneConfig: function _generateLevelSceneConfig() {
    var levelConfig = require("levelConfig");

    var result = {};
    var completNum = 0;

    var check = function check(completNum) {
      if (completNum == Object.keys(levelConfig).length) {
        var networkMgr = require("networkMgr");

        var messageObj = networkMgr.makeMessageObj("helperModule", "generateLevelConfigFileMessageType");
        messageObj.message.data = result;
        networkMgr.sendMessageByMsgObj(messageObj);
      }
    };

    for (var index in Object.keys(levelConfig)) {
      var levelId = Object.keys(levelConfig)[index];

      var getSceneNameByLevelId = function getSceneNameByLevelId(givenLevelId) {
        var levelForName = givenLevelId;

        switch (levelForName.toString().length) {
          case 1:
            levelForName = "00" + levelForName.toString();
            break;

          case 2:
            levelForName = "0" + levelForName.toString();
            break;
        }

        var levelName = "level" + levelForName;
        return levelName;
      };

      var sceneName = getSceneNameByLevelId(levelId);

      var setupResult = function setupResult(sceneName, levelId) {
        cc.director.preloadScene(sceneName, null, function (err, res) {
          cc.log("preload scene: " + sceneName);
          var canvas = res.scene.children[0];
          var oneResult = {};

          var getNodeBasicResult = function getNodeBasicResult(node) {
            var oneResult = {};
            oneResult.x = node.x;
            oneResult.y = node.y;
            oneResult.width = node.width;
            oneResult.height = node.height;
            oneResult.angle = node.angle;
            return oneResult;
          }; //fillNodes


          var fillNodes = canvas.getChildByName("fillNodes");
          var fillNodesResult = [];
          cc.log("setup fillNodes");

          for (var index in fillNodes.children) {
            var oneFillNode = fillNodes.children[index];
            var oneFillNodeResult = getNodeBasicResult(oneFillNode);
            fillNodesResult.push(oneFillNodeResult);
          }

          oneResult.fillNodes = fillNodesResult; //walls

          var walls = canvas.getChildByName("walls");
          var wallsResult = [];
          cc.log("setup walls");

          for (var index in walls.children) {
            var oneWallNode = walls.children[index];
            var oneWallResult = getNodeBasicResult(oneWallNode);
            wallsResult.push(oneWallResult);
          }

          oneResult.walls = wallsResult; //targets

          var targets = canvas.getChildByName("targets");
          var targetsResult = [];
          cc.log("setup targets");

          for (var index in targets.children) {
            var oneTargetNode = targets.children[index];
            var oneTargetResult = getNodeBasicResult(oneTargetNode);
            targetsResult.push(oneTargetResult);
          }

          oneResult.targets = targetsResult; //pathWaysNode

          var pathWaysNode = canvas.getChildByName("pathWaysNode");
          var pathWaysNodeResult = [];
          cc.log("setup pathWaysNode");

          for (var index in pathWaysNode.children) {
            var onePathWayNode = pathWaysNode.children[index];
            var onePathWayResult = {};
            onePathWayResult.name = onePathWayNode.name;
            onePathWayResult.children = [];

            for (var i in onePathWayNode.children) {
              var oneChildNode = onePathWayNode.children[i];
              var oneChildResult = getNodeBasicResult(oneChildNode);
              onePathWayResult.children.push(oneChildResult);
            }

            pathWaysNodeResult.push(onePathWayResult);
          }

          oneResult.pathWaysNode = pathWaysNodeResult; //bullets

          var bullets = canvas.getChildByName("bullets");
          var bulletsResult = [];
          cc.log("setup bullets");

          for (var index in bullets.children) {
            var oneBulletNode = bullets.children[index];
            var oneBulletResult = {};
            var basicResult = getNodeBasicResult(oneBulletNode);
            oneBulletResult.basic = basicResult;
            var bulletMgr = oneBulletNode.getComponent("bulletMgr");
            var mgrResult = {};
            mgrResult.bulletType = bulletMgr.bulletType;
            mgrResult.pathWaysNodeName = "";

            if (bulletMgr.pathWaysNode != null) {
              mgrResult.pathWaysNodeName = bulletMgr.pathWaysNode.name;
            }

            oneBulletResult.mgr = mgrResult;
            bulletsResult.push(oneBulletResult);
          }

          oneResult.bullets = bulletsResult;
          result[levelId.toString()] = oneResult;
          completNum += 1;
          check(completNum);
        });
      };

      setupResult(sceneName, levelId);
    }
  } // update (dt) {},

});
var gameMgr = new GameMgr();
module.exports = gameMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3NpbmdsZUluc3RhbmNlU3lzdGVtcy9nYW1lTWdyLmpzIl0sIm5hbWVzIjpbIkdhbWVNZ3IiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInN0YXJ0IiwiZW50ZXJMZXZlbFNjZW5lIiwiZ2l2ZW5MZXZlbCIsInNlbGYiLCJkaXJlY3RvciIsInByZWxvYWRTY2VuZSIsImVyciIsInJlcyIsImxldmVsTWdyIiwic2NlbmUiLCJnZXRDaGlsZEJ5TmFtZSIsImdldENvbXBvbmVudCIsImxldmVsIiwiYW5pbWF0ZWRUb1NjZW5lIiwic2NlbmVOYW1lIiwiY292ZXJOb2RlIiwicmVxdWlyZSIsInJlc2VzIiwiaW5zdGFudGlhdGUiLCJ3aWR0aCIsIndpblNpemUiLCJoZWlnaHQiLCJvcGFjaXR5Iiwib24iLCJnZXRTY2VuZSIsImFkZENoaWxkIiwidHdlZW4iLCJ0byIsImRlbGF5IiwiY2FsbCIsImxvYWRTY2VuZSIsIl9nZW5lcmF0ZUxldmVsU2NlbmVDb25maWciLCJsZXZlbENvbmZpZyIsInJlc3VsdCIsImNvbXBsZXROdW0iLCJjaGVjayIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJuZXR3b3JrTWdyIiwibWVzc2FnZU9iaiIsIm1ha2VNZXNzYWdlT2JqIiwibWVzc2FnZSIsImRhdGEiLCJzZW5kTWVzc2FnZUJ5TXNnT2JqIiwiaW5kZXgiLCJsZXZlbElkIiwiZ2V0U2NlbmVOYW1lQnlMZXZlbElkIiwiZ2l2ZW5MZXZlbElkIiwibGV2ZWxGb3JOYW1lIiwidG9TdHJpbmciLCJsZXZlbE5hbWUiLCJzZXR1cFJlc3VsdCIsImxvZyIsImNhbnZhcyIsImNoaWxkcmVuIiwib25lUmVzdWx0IiwiZ2V0Tm9kZUJhc2ljUmVzdWx0Iiwibm9kZSIsIngiLCJ5IiwiYW5nbGUiLCJmaWxsTm9kZXMiLCJmaWxsTm9kZXNSZXN1bHQiLCJvbmVGaWxsTm9kZSIsIm9uZUZpbGxOb2RlUmVzdWx0IiwicHVzaCIsIndhbGxzIiwid2FsbHNSZXN1bHQiLCJvbmVXYWxsTm9kZSIsIm9uZVdhbGxSZXN1bHQiLCJ0YXJnZXRzIiwidGFyZ2V0c1Jlc3VsdCIsIm9uZVRhcmdldE5vZGUiLCJvbmVUYXJnZXRSZXN1bHQiLCJwYXRoV2F5c05vZGUiLCJwYXRoV2F5c05vZGVSZXN1bHQiLCJvbmVQYXRoV2F5Tm9kZSIsIm9uZVBhdGhXYXlSZXN1bHQiLCJuYW1lIiwiaSIsIm9uZUNoaWxkTm9kZSIsIm9uZUNoaWxkUmVzdWx0IiwiYnVsbGV0cyIsImJ1bGxldHNSZXN1bHQiLCJvbmVCdWxsZXROb2RlIiwib25lQnVsbGV0UmVzdWx0IiwiYmFzaWNSZXN1bHQiLCJiYXNpYyIsImJ1bGxldE1nciIsIm1nclJlc3VsdCIsImJ1bGxldFR5cGUiLCJwYXRoV2F5c05vZGVOYW1lIiwibWdyIiwiZ2FtZU1nciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsT0FBTyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNuQixhQUFTRCxFQUFFLENBQUNFLFNBRE87QUFHbkJDLEVBQUFBLFVBQVUsRUFBRSxDQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWZRLEdBSE87QUFxQm5CO0FBRUE7QUFFQUMsRUFBQUEsS0F6Qm1CLG1CQXlCVixDQUVSLENBM0JrQjtBQTRCbkJDLEVBQUFBLGVBNUJtQiwyQkE0QkhDLFVBNUJHLEVBNEJTO0FBQ3hCLFFBQUlDLElBQUksR0FBRyxJQUFYO0FBQ0FQLElBQUFBLEVBQUUsQ0FBQ1EsUUFBSCxDQUFZQyxZQUFaLENBQXlCLFlBQXpCLEVBQXNDLElBQXRDLEVBQTJDLFVBQVNDLEdBQVQsRUFBYUMsR0FBYixFQUFpQjtBQUN4RCxVQUFJQyxRQUFRLEdBQUdELEdBQUcsQ0FBQ0UsS0FB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RkQ7O0FBNkZBa0IsTUFBQUEsV0FBVyxDQUFDdEMsU0FBRCxFQUFXZ0MsT0FBWCxDQUFYO0FBQ0g7QUFDSixHQXRMa0IsQ0F1TG5COztBQXZMbUIsQ0FBVCxDQUFkO0FBMExBLElBQUlnRCxPQUFPLEdBQUcsSUFBSW5HLE9BQUosRUFBZDtBQUNBb0csTUFBTSxDQUFDQyxPQUFQLEdBQWlCRixPQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cHM6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbnZhciBHYW1lTWdyID0gY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9LFxuICAgIGVudGVyTGV2ZWxTY2VuZShnaXZlbkxldmVsKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoXCJsZXZlbFNjZW5lXCIsbnVsbCxmdW5jdGlvbihlcnIscmVzKXtcbiAgICAgICAgICAgIHZhciBsZXZlbE1nciA9IHJlcy5zY2VuZS5nZXRDaGlsZEJ5TmFtZShcIkNhbnZhc1wiKS5nZXRDb21wb25lbnQoXCJsZXZlbE1nclwiKVxuICAgICAgICAgICAgbGV2ZWxNZ3IubGV2ZWwgPSBnaXZlbkxldmVsXG4gICAgICAgICAgICBzZWxmLmFuaW1hdGVkVG9TY2VuZShcImxldmVsU2NlbmVcIilcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgYW5pbWF0ZWRUb1NjZW5lKHNjZW5lTmFtZSkge1xuICAgICAgICB2YXIgY292ZXJOb2RlID0gcmVxdWlyZShcInJlc01nclwiKS5yZXNlc1tcImNvdmVyTm9kZVByZWZhYlwiXVxuICAgICAgICBjb3Zlck5vZGUgPSBjYy5pbnN0YW50aWF0ZShjb3Zlck5vZGUpXG4gICAgICAgIGNvdmVyTm9kZS53aWR0aCA9IGNjLndpblNpemUud2lkdGhcbiAgICAgICAgY292ZXJOb2RlLmhlaWdodCA9IGNjLndpblNpemUuaGVpZ2h0XG4gICAgICAgIGNvdmVyTm9kZS5vcGFjaXR5ID0gMFxuICAgICAgICBjb3Zlck5vZGUub24oXCJ0b3VjaHN0YXJ0XCIsZnVuY3Rpb24oKXt9KVxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKFwiQ2FudmFzXCIpLmFkZENoaWxkKGNvdmVyTm9kZSlcblxuICAgICAgICBjYy50d2Vlbihjb3Zlck5vZGUpXG4gICAgICAgICAgICAudG8oMC4zLCB7b3BhY2l0eToyNTV9KVxuICAgICAgICAgICAgLmRlbGF5KDAuMylcbiAgICAgICAgICAgIC5jYWxsKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKHNjZW5lTmFtZSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhcnQoKVxuICAgIH0sXG5cbiAgICBcbiAgICBfZ2VuZXJhdGVMZXZlbFNjZW5lQ29uZmlnKCkge1xuICAgICAgICB2YXIgbGV2ZWxDb25maWcgPSByZXF1aXJlKFwibGV2ZWxDb25maWdcIilcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9XG4gICAgICAgIHZhciBjb21wbGV0TnVtID0gMFxuICAgICAgICB2YXIgY2hlY2sgPSBmdW5jdGlvbihjb21wbGV0TnVtKSB7XG4gICAgICAgICAgICBpZiAoY29tcGxldE51bSA9PSBPYmplY3Qua2V5cyhsZXZlbENvbmZpZykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ldHdvcmtNZ3IgPSByZXF1aXJlKFwibmV0d29ya01nclwiKVxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlT2JqID0gbmV0d29ya01nci5tYWtlTWVzc2FnZU9iaihcImhlbHBlck1vZHVsZVwiLFwiZ2VuZXJhdGVMZXZlbENvbmZpZ0ZpbGVNZXNzYWdlVHlwZVwiKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2VPYmoubWVzc2FnZS5kYXRhID0gcmVzdWx0XG4gICAgICAgICAgICAgICAgbmV0d29ya01nci5zZW5kTWVzc2FnZUJ5TXNnT2JqKG1lc3NhZ2VPYmopXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gT2JqZWN0LmtleXMobGV2ZWxDb25maWcpKSB7XG4gICAgICAgICAgICB2YXIgbGV2ZWxJZCA9IE9iamVjdC5rZXlzKGxldmVsQ29uZmlnKVtpbmRleF1cblxuICAgICAgICAgICAgdmFyIGdldFNjZW5lTmFtZUJ5TGV2ZWxJZCA9IGZ1bmN0aW9uKGdpdmVuTGV2ZWxJZCkge1xuICAgICAgICAgICAgICAgIHZhciBsZXZlbEZvck5hbWUgPSBnaXZlbkxldmVsSWRcbiAgICAgICAgICAgICAgICBzd2l0Y2gobGV2ZWxGb3JOYW1lLnRvU3RyaW5nKCkubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWxGb3JOYW1lID0gXCIwMFwiICsgbGV2ZWxGb3JOYW1lLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsRm9yTmFtZSA9IFwiMFwiICsgbGV2ZWxGb3JOYW1lLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGxldmVsTmFtZSA9IFwibGV2ZWxcIiArIGxldmVsRm9yTmFtZVxuICAgICAgICAgICAgICAgIHJldHVybiBsZXZlbE5hbWVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHNjZW5lTmFtZSA9IGdldFNjZW5lTmFtZUJ5TGV2ZWxJZChsZXZlbElkKVxuICAgICAgICAgICAgdmFyIHNldHVwUmVzdWx0ID0gZnVuY3Rpb24oc2NlbmVOYW1lLCBsZXZlbElkKSB7XG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKHNjZW5lTmFtZSxudWxsLGZ1bmN0aW9uKGVycixyZXMpe1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJwcmVsb2FkIHNjZW5lOiBcIiArIHNjZW5lTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhbnZhcyA9IHJlcy5zY2VuZS5jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgICAgICB2YXIgb25lUmVzdWx0ID0ge31cbiAgICAgICAgICAgICAgICAgICAgdmFyIGdldE5vZGVCYXNpY1Jlc3VsdCA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvbmVSZXN1bHQgPSB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25lUmVzdWx0LnggPSBub2RlLnhcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uZVJlc3VsdC55ID0gbm9kZS55XG4gICAgICAgICAgICAgICAgICAgICAgICBvbmVSZXN1bHQud2lkdGggPSBub2RlLndpZHRoXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmVSZXN1bHQuaGVpZ2h0ID0gbm9kZS5oZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uZVJlc3VsdC5hbmdsZSA9IG5vZGUuYW5nbGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvbmVSZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL2ZpbGxOb2Rlc1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsbE5vZGVzID0gY2FudmFzLmdldENoaWxkQnlOYW1lKFwiZmlsbE5vZGVzXCIpXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWxsTm9kZXNSZXN1bHQgPSBbXVxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJzZXR1cCBmaWxsTm9kZXNcIilcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpbmRleCBpbiBmaWxsTm9kZXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvbmVGaWxsTm9kZSA9IGZpbGxOb2Rlcy5jaGlsZHJlbltpbmRleF1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvbmVGaWxsTm9kZVJlc3VsdCA9IGdldE5vZGVCYXNpY1Jlc3VsdChvbmVGaWxsTm9kZSkgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxOb2Rlc1Jlc3VsdC5wdXNoKG9uZUZpbGxOb2RlUmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9uZVJlc3VsdC5maWxsTm9kZXMgPSBmaWxsTm9kZXNSZXN1bHRcblxuICAgICAgICAgICAgICAgICAgICAvL3dhbGxzXG4gICAgICAgICAgICAgICAgICAgIHZhciB3YWxscyA9IGNhbnZhcy5nZXRDaGlsZEJ5TmFtZShcIndhbGxzXCIpXG4gICAgICAgICAgICAgICAgICAgIHZhciB3YWxsc1Jlc3VsdCA9IFtdXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcInNldHVwIHdhbGxzXCIpXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4IGluIHdhbGxzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb25lV2FsbE5vZGUgPSB3YWxscy5jaGlsZHJlbltpbmRleF1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvbmVXYWxsUmVzdWx0ID0gZ2V0Tm9kZUJhc2ljUmVzdWx0KG9uZVdhbGxOb2RlKVxuICAgICAgICAgICAgICAgICAgICAgICAgd2FsbHNSZXN1bHQucHVzaChvbmVXYWxsUmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9uZVJlc3VsdC53YWxscyA9IHdhbGxzUmVzdWx0XG5cbiAgICAgICAgICAgICAgICAgICAgLy90YXJnZXRzXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldHMgPSBjYW52YXMuZ2V0Q2hpbGRCeU5hbWUoXCJ0YXJnZXRzXCIpXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXRzUmVzdWx0ID0gW11cbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwic2V0dXAgdGFyZ2V0c1wiKVxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGluZGV4IGluIHRhcmdldHMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvbmVUYXJnZXROb2RlID0gdGFyZ2V0cy5jaGlsZHJlbltpbmRleF1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvbmVUYXJnZXRSZXN1bHQgPSBnZXROb2RlQmFzaWNSZXN1bHQob25lVGFyZ2V0Tm9kZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldHNSZXN1bHQucHVzaChvbmVUYXJnZXRSZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb25lUmVzdWx0LnRhcmdldHMgPSB0YXJnZXRzUmVzdWx0XG5cbiAgICAgICAgICAgICAgICAgICAgLy9wYXRoV2F5c05vZGVcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGhXYXlzTm9kZSA9IGNhbnZhcy5nZXRDaGlsZEJ5TmFtZShcInBhdGhXYXlzTm9kZVwiKVxuICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aFdheXNOb2RlUmVzdWx0ID0gW11cbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwic2V0dXAgcGF0aFdheXNOb2RlXCIpXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4IGluIHBhdGhXYXlzTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9uZVBhdGhXYXlOb2RlID0gcGF0aFdheXNOb2RlLmNoaWxkcmVuW2luZGV4XVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9uZVBhdGhXYXlSZXN1bHQgPSB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25lUGF0aFdheVJlc3VsdC5uYW1lID0gb25lUGF0aFdheU5vZGUubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgb25lUGF0aFdheVJlc3VsdC5jaGlsZHJlbiA9IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIG9uZVBhdGhXYXlOb2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9uZUNoaWxkTm9kZSA9IG9uZVBhdGhXYXlOb2RlLmNoaWxkcmVuW2ldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9uZUNoaWxkUmVzdWx0ID0gZ2V0Tm9kZUJhc2ljUmVzdWx0KG9uZUNoaWxkTm9kZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmVQYXRoV2F5UmVzdWx0LmNoaWxkcmVuLnB1c2gob25lQ2hpbGRSZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoV2F5c05vZGVSZXN1bHQucHVzaChvbmVQYXRoV2F5UmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9uZVJlc3VsdC5wYXRoV2F5c05vZGUgPSBwYXRoV2F5c05vZGVSZXN1bHRcblxuICAgICAgICAgICAgICAgICAgICAvL2J1bGxldHNcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bGxldHMgPSBjYW52YXMuZ2V0Q2hpbGRCeU5hbWUoXCJidWxsZXRzXCIpXG4gICAgICAgICAgICAgICAgICAgIHZhciBidWxsZXRzUmVzdWx0ID0gW11cbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwic2V0dXAgYnVsbGV0c1wiKVxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBidWxsZXRzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb25lQnVsbGV0Tm9kZSA9IGJ1bGxldHMuY2hpbGRyZW5baW5kZXhdXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb25lQnVsbGV0UmVzdWx0ID0ge31cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiYXNpY1Jlc3VsdCAgPSBnZXROb2RlQmFzaWNSZXN1bHQob25lQnVsbGV0Tm9kZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uZUJ1bGxldFJlc3VsdC5iYXNpYyA9IGJhc2ljUmVzdWx0XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWxsZXRNZ3IgPSBvbmVCdWxsZXROb2RlLmdldENvbXBvbmVudChcImJ1bGxldE1nclwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1nclJlc3VsdCA9IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICBtZ3JSZXN1bHQuYnVsbGV0VHlwZSA9IGJ1bGxldE1nci5idWxsZXRUeXBlXG4gICAgICAgICAgICAgICAgICAgICAgICBtZ3JSZXN1bHQucGF0aFdheXNOb2RlTmFtZSA9IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidWxsZXRNZ3IucGF0aFdheXNOb2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZ3JSZXN1bHQucGF0aFdheXNOb2RlTmFtZSA9IGJ1bGxldE1nci5wYXRoV2F5c05vZGUubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25lQnVsbGV0UmVzdWx0Lm1nciA9IG1nclJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0c1Jlc3VsdC5wdXNoKG9uZUJ1bGxldFJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvbmVSZXN1bHQuYnVsbGV0cyA9IGJ1bGxldHNSZXN1bHRcblxuICAgICAgICAgICAgICAgICAgICByZXN1bHRbbGV2ZWxJZC50b1N0cmluZygpXSA9IG9uZVJlc3VsdFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0TnVtICs9IDFcbiAgICAgICAgICAgICAgICAgICAgY2hlY2soY29tcGxldE51bSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0dXBSZXN1bHQoc2NlbmVOYW1lLGxldmVsSWQpXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcblxudmFyIGdhbWVNZ3IgPSBuZXcgR2FtZU1ncigpXG5tb2R1bGUuZXhwb3J0cyA9IGdhbWVNZ3IiXX0=