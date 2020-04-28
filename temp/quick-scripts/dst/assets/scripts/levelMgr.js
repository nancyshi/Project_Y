
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c4014NLpYFEZpXQI03LMFEP', 'levelMgr');
// scripts/levelMgr.js

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
    bullets: [],
    minDis: 50,
    maxOffsetDegree: 45,
    directionTryto: null,
    flag: false,
    helper: null,
    walls: [],
    targetsNum: {
      get: function get() {
        return this._targetsNum;
      },
      set: function set(value) {
        this._targetsNum = value;

        if (value == 0) {
          this.onSuccess();
        }
      }
    },
    linePrefab: cc.Prefab,
    bulletPrefab: cc.Prefab,
    playerData: null,
    retryButton: cc.Node,
    heartForRetryCost: {
      get: function get() {
        return this._heartForRetryCostwe;
      },
      set: function set(value) {
        this._heartForRetryCostwe = value;
        this.retryButton.getChildByName("heartCostLabel").getComponent(cc.Label).string = value.toString();
      }
    },
    heart: {
      get: function get() {
        return this._heart;
      },
      set: function set(value) {
        this._heart = value;
        cc.find("Canvas/uiNode/heartLabel").getComponent(cc.Label).string = value.toString();

        if (value < this.heartForRetryCost) {
          this.retryButton.getComponent(cc.Button).interactable = false;
        } else {
          if (this.isMoved == false) {
            return;
          }

          this.retryButton.getComponent(cc.Button).interactable = true;
        }
      }
    },
    maxHeart: {
      get: function get() {
        return this._maxHeart;
      },
      set: function set(value) {
        this._maxHeart = value;
      }
    },
    isMoved: {
      get: function get() {
        if (this._isMoved == null) {
          this._isMoved = false;
        }

        return this._isMoved;
      },
      set: function set(value) {
        this._isMoved = value;

        if (value == true && this.heartForRetryCost <= this.heart) {
          this.retryButton.getComponent(cc.Button).interactable = true;
        }
      }
    },
    currentStepNum: {
      get: function get() {
        if (this._currentStepNum == null) {
          this._currentStepNum = 0;
        }

        return this._currentStepNum;
      },
      set: function set(value) {
        this._currentStepNum = value;
        var currentStepNumLabel = this.node.getChildByName("uiNode").getChildByName("currentStepNumLabel"); //currentStepNumLabel.getComponent(cc.Label).string = "当前步数：" + value.toString()

        currentStepNumLabel.getComponent(cc.Label).string = require("textConfig").getFormatedString(154, [value.toString()]);
      }
    },
    level: null,
    soundEffect: null
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    var textConfig = require("textConfig");

    var Helper = require("helper");

    this.helper = new Helper(); //this.level = 1

    this.setupNodesByConfig();
    var self = this;
    cc.loader.loadRes("effectSounds/hit", function (err, res) {
      self.soundEffect = res;
    });
    this.retryButton.getChildByName("textLabel").getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(152);
    cc.find("Canvas/uiNode/currentStepNumLabel").getComponent(cc.Label).string = textConfig.getFormatedString(154, [0]);
  },
  start: function start() {
    this.node.on("touchstart", this.onTouchStart, this);
    this.node.on("touchmove", this.onTouchMove, this);
    this.node.on("touchend", this.onTouchEnd, this); //this.generateWalls()

    var bulletsNode = cc.find("Canvas/bullets");
    this.bullets = bulletsNode.children;
    this.playerData = require("dataMgr").playerData;
    this.maxHeart = this.playerData.maxHeart;

    if (this.level == this.playerData.currentLevel) {
      this.heartForRetryCost = require("levelConfig")[this.playerData.currentLevel.toString()].heartForRetryCost;
    } else {
      this.heartForRetryCost = 0;
    }

    this.heart = this.playerData.heart;
    require("networkMgr").delegate = this;
    var wallsNode = cc.find("Canvas/walls");
    this.walls = wallsNode.children;
    this.targetsNum = cc.find("Canvas/targets").children.length;
    var graphic = cc.find("Canvas/fillNodes").getComponent(cc.Graphics);
    var startPoint = null;
    var pointNodes = cc.find("Canvas/fillNodes").children;

    if (pointNodes.length == 0) {
      return;
    }

    for (var index in pointNodes) {
      var point = pointNodes[index];

      if (startPoint == null) {
        graphic.moveTo(point.x, point.y);
        startPoint = point;
      }

      graphic.lineTo(point.x, point.y);
    }

    graphic.close();
    graphic.stroke();
    graphic.fill();
    var minStepNumLabel = this.node.getChildByName("uiNode").getChildByName("minStepNumLabel");
    var minStepKey = "minStep_level_" + this.level.toString();

    var minStepNum = require("dataMgr").playerData.minSteps[minStepKey];

    if (minStepNum == null || minStepNum == undefined) {
      minStepNum = require("textConfig").getTextByIdAndLanguageType(155);
    }

    minStepNumLabel.getComponent(cc.Label).string = require("textConfig").getFormatedString(153, [minStepNum.toString()]);

    if (require("dataMgr").playerData.isGuilded == 0) {
      var guildNode = cc.instantiate(require("resMgr").reses["guildNodePrefab"]);
      this.node.addChild(guildNode);
    } // var guildNode = cc.instantiate(require("resMgr").reses["guildNodePrefab"])
    // this.node.addChild(guildNode)

  },
  // update (dt) {},
  playBgm: function playBgm() {
    var levelConfig = require("levelConfig");

    var bgmPath = levelConfig[this.level].bgmPath;
    cc.loader.loadRes(bgmPath, function (err, res) {
      cc.audioEngine.stopAll();
      cc.audioEngine.play(res);
    });
  },
  onTouchStart: function onTouchStart(event) {
    this.directionTryto = null;
    this.flag = true;
  },
  onTouchMove: function onTouchMove(event) {
    if (this.flag == false) {
      return;
    }

    var startLocation = event.getStartLocation();
    var tmpDirection = cc.v2(event.getLocationX() - startLocation.x, event.getLocationY() - startLocation.y);
    var dis = tmpDirection.mag();

    if (dis < this.minDis) {
      return;
    } else {
      var direction = this.getPossiableDirection(tmpDirection);

      if (direction == -1) {
        this.flag = false;
        return;
      }

      if (this.directionTryto == null) {
        this.directionTryto = direction;
      }

      this.flag = false;
      this.moveBullets(this.directionTryto);
    }
  },
  onTouchEnd: function onTouchEnd(event) {},
  onDestroy: function onDestroy() {
    this.node.off("touchstart", this.onTouchStart, this);
    this.node.off("touchmove", this.onTouchMove, this);
    this.node.off("touchend", this.onTouchEnd, this);
  },
  getPossiableDirection: function getPossiableDirection(delta) {
    if (this.isPossiableWithGivenDirection(delta, cc.v2(1, 0)) == true) {
      return cc.v2(1, 0); //right
    } else if (this.isPossiableWithGivenDirection(delta, cc.v2(0, -1)) == true) {
      return cc.v2(0, -1); //down
    } else if (this.isPossiableWithGivenDirection(delta, cc.v2(-1, 0)) == true) {
      return cc.v2(-1, 0); //left
    } else if (this.isPossiableWithGivenDirection(delta, cc.v2(0, 1)) == true) {
      return cc.v2(0, 1); //up
    } else {
        return -1; //no direction match
      }
  },
  isPossiableWithGivenDirection: function isPossiableWithGivenDirection(delta, givenDirection) {
    var angle = delta.signAngle(givenDirection);
    var degree = angle / Math.PI * 180;

    if (Math.abs(degree) <= this.maxOffsetDegree) {
      return true;
    } else {
      return false;
    }
  },
  moveBullets: function moveBullets(direction) {
    for (var index in this.bullets) {
      if (this.bullets[index].getComponent("bulletMgr").status != 0) {
        return;
      }
    }

    var shadows = [];

    for (var index in this.bullets) {
      var bullet = this.bullets[index];
      var bulletMgr = bullet.getComponent("bulletMgr");
      var nearestWallInfo = bulletMgr.getNearestWallInfo(direction);
      var shadowNode = {
        x: nearestWallInfo.suitablePosition.x,
        y: nearestWallInfo.suitablePosition.y,
        width: bullet.width,
        height: bullet.height,
        dis: nearestWallInfo.dis,
        originNode: bullet
      };
      shadows.push(shadowNode);
    } //resolve shadows


    var maxTryTime = 100;

    while (this.resolveShadows(shadows, direction) == false) {
      if (maxTryTime <= 0) {
        // cc.log("CAN'T FIND A SUITABLE POSITION")
        break;
      }

      maxTryTime -= 1;
    }

    var willAddStepNum = false;

    for (var index in shadows) {
      var shadowNode = shadows[index];
      var originNode = shadowNode.originNode;

      if (this.helper.isTwoPositionSimilarEqual(cc.v2(shadowNode.x, shadowNode.y), cc.v2(originNode.x, originNode.y)) == true) {
        continue;
      }

      var bulletMgr = originNode.getComponent("bulletMgr");
      bulletMgr.targetPosition = cc.v2(shadowNode.x, shadowNode.y);
      bulletMgr.movingDirection = direction;
      bulletMgr.movingDirection.normalizeSelf();

      if (bulletMgr.movingTime != null) {
        var dis = cc.v2(bulletMgr.targetPosition.x - originNode.x, bulletMgr.targetPosition.y - originNode.y).mag();
        var v = dis / bulletMgr.movingTime;
        bulletMgr.vx = v * bulletMgr.movingDirection.x;
        bulletMgr.vy = v * bulletMgr.movingDirection.y;
      } else {
        bulletMgr.vx = bulletMgr.movingDirection.x * bulletMgr.movingSpeed;
        bulletMgr.vy = bulletMgr.movingDirection.y * bulletMgr.movingSpeed;
      }

      bulletMgr.status = 1;

      if (this.isMoved != true) {
        this.isMoved = true;
      }

      if (willAddStepNum == false) {
        willAddStepNum = true;
      }
    }

    if (willAddStepNum == true) {
      this.currentStepNum += 1;

      if (this.soundEffect != null) {
        this.scheduleOnce(function () {
          cc.audioEngine.play(this.soundEffect);
        }, 0.3);
      }
    }
  },
  onSuccess: function onSuccess() {
    this.retryButton.getComponent(cc.Button).interactable = false; // if (this.level != this.playerData.currentLevel) {
    //     // cc.director.loadScene("mainScene")
    //     require("gameMgr").animatedToScene("mainScene")
    //     return
    // }

    var levels = require("sectionConfig")[this.playerData.currentSection].levels;

    var index = levels.indexOf(this.playerData.currentLevel);
    var newLevel = null;
    var newSection = null;
    var commitBody = null;

    if (index < levels.length - 1) {
      index += 1;
      newLevel = levels[index];
    } else {
      newSection = this.playerData.currentSection + 1;

      var newLevels = require("sectionConfig")[newSection].levels;

      newLevel = newLevels[0];
    }

    if (newSection == null) {
      commitBody = {
        currentLevel: newLevel
      };
    } else {
      commitBody = {
        currentSection: newSection,
        currentLevel: newLevel
      };
    }

    if (this.level == require("dataMgr").playerData.currentLevel) {
      commitBody.physicalPowerCostedFlag = 0;
    }

    if (require("dataMgr").playerData.isGuilded == 0) {
      commitBody.isGuilded = 1;
    }

    var minStepKey = "minStep_level_" + this.level.toString();

    var minStepNum = require("dataMgr").playerData.minSteps[minStepKey];

    if (minStepNum == null || minStepNum == undefined || this.currentStepNum < minStepNum) {
      commitBody.minSteps = {};
      commitBody.minSteps[minStepKey] = this.currentStepNum;
    }

    commitBody.preLevel = this.level;
    var self = this;

    var successCallBack = function successCallBack() {
      if (newSection != null) {
        self.playerData.currentSection = newSection;
      }

      if (commitBody.minSteps != null && commitBody.minSteps != undefined) {
        require("dataMgr").playerData.minSteps[minStepKey] = self.currentStepNum;
      }

      if (commitBody.isGuilded == 1) {
        require("dataMgr").playerData.isGuilded = 1;
      }

      self.playerData.currentLevel = newLevel;
      self.playerData.physicalPowerCostedFlag = 0;
      self.playerData.preLevel = self.level;

      require("gameMgr").animatedToScene("mainScene");
    };

    require("dataMgr").commitPlayerDataToServer(commitBody, successCallBack);
  },
  resolveShadows: function resolveShadows(shadows, direction) {
    for (var index in shadows) {
      var oneShadow = shadows[index];

      for (var i in shadows) {
        var anotherShadow = shadows[i];

        if (oneShadow == anotherShadow) {
          continue;
        }

        var testResult = this._selectStaticShadowAndShaodwForResolved(oneShadow, anotherShadow, direction);

        if (testResult != false) {
          var staticShadow = testResult.staticShadow;
          var tempShadow = testResult.shadowForResolved; // cc.log("static: " + staticShadow.originNode.name, "temp: " + tempShadow.originNode.name)

          var staticBorderLines = this.helper.getLinesOfOneNode(staticShadow);
          var staticLine = null;
          var ray = this.helper.makeRay(cc.v2(staticShadow.x, staticShadow.y), 1000, cc.v2(-direction.x, -direction.y));

          for (var k in staticBorderLines) {
            var line = staticBorderLines[k];
            var dis = this.helper.rayTest(ray, line);

            if (dis != false) {
              staticLine = line;
              break;
            }
          }

          var newPoint2 = this.helper.makeRay(staticLine.p2, 1000, cc.v2(staticLine.p2.x - staticLine.p1.x, staticLine.p2.y - staticLine.p1.y)).p2;
          var newPoint1 = this.helper.makeRay(staticLine.p1, 1000, cc.v2(staticLine.p1.x - staticLine.p2.x, staticLine.p1.y - staticLine.p2.y)).p2;
          staticLine = {
            p1: newPoint1,
            p2: newPoint2
          };
          var ray1 = this.helper.makeRay(tempShadow.originNode.position, 3000, direction);
          var currentDistance = this.helper.rayTest(ray1, staticLine);
          var targetDis = this.helper.getDisToSelfBorder(tempShadow.originNode, direction) + tempShadow.originNode.getComponent("bulletMgr").disFromBorder;
          var suitablePosition = this.helper.getSuitablePoint(tempShadow.originNode.position, currentDistance, targetDis, direction);
          var updatedDis = cc.v2(suitablePosition.x - tempShadow.originNode.x, suitablePosition.y - tempShadow.originNode.y).mag();
          tempShadow.x = suitablePosition.x;
          tempShadow.y = suitablePosition.y;
          tempShadow.dis = updatedDis;
          return false;
        }
      }
    }

    return true;
  },
  _selectStaticShadowAndShaodwForResolved: function _selectStaticShadowAndShaodwForResolved(shadow1, shadow2, direction) {
    var self = this;

    var temp = function temp(s1, s2) {
      var dis = s1.dis;
      var originCrossFlag = false;
      var shadowCrossFlag = false;
      var originLines = self.helper.getLinesOfOneNode(s2);

      for (var key in originLines) {
        var oneLine = originLines[key];

        if (self.helper.isOneNodeWillCollidWithOneLineInDirection(s1.originNode, oneLine, direction, dis) != false) {
          originCrossFlag = true;
          break;
        }
      }

      if (originCrossFlag == false) {
        return false;
      }

      var shadowLines = self.helper.getLinesOfOneNode(s2.originNode);

      for (var key in shadowLines) {
        var oneLine = shadowLines[key];

        if (self.helper.isOneNodeWillCollidWithOneLineInDirection(s1.originNode, oneLine, direction, dis) != false) {
          shadowCrossFlag = true;
          break;
        }
      }

      if (shadowCrossFlag == false) {
        return false;
      }

      return true;
    };

    if (temp(shadow1, shadow2) == true) {
      var result = {
        staticShadow: shadow2,
        shadowForResolved: shadow1
      };
      return result;
    }

    if (temp(shadow2, shadow1) == true) {
      var result = {
        staticShadow: shadow1,
        shadowForResolved: shadow2
      };
      return result;
    }

    return false;
  },
  generateWalls: function generateWalls() {
    var levelConfig = require("levelConfig");

    var currentLevel = this.level;
    var config = levelConfig[currentLevel];
    var wallsNode = cc.find("Canvas/walls");

    for (var index in config.wallPathes) {
      var onePath = config.wallPathes[index];
      var points = onePath.points;
      var realPoints = [];

      for (var i in points) {
        var realPoint = null;

        if (i == 0) {
          realPoint = cc.v2(points[i].x, points[i].y);
        } else {
          var currentPoint = points[i];
          realPoint = cc.v2(realPoints[i - 1].x + currentPoint.x, realPoints[i - 1].y + currentPoint.y);
        }

        realPoints.push(realPoint);
      }

      var lineWidth = onePath.lineWidth;
      var offset = onePath.offset;
      var wallNodes = [];
      var isClosed = onePath.isClosed;

      if (isClosed == true) {
        var startPoint = realPoints[0];
        realPoints.push(startPoint);
      }

      for (var i in realPoints) {
        if (i == 0) {
          continue;
        }

        var node = cc.instantiate(this.linePrefab);
        node.height = lineWidth;
        var directedLine = cc.v2(realPoints[i].x - realPoints[i - 1].x, realPoints[i].y - realPoints[i - 1].y);
        node.width = directedLine.mag();
        var degree = directedLine.signAngle(cc.v2(1, 0)) / Math.PI * 180;
        node.angle = -degree;
        node.x = realPoints[i].x - directedLine.x / 2;
        node.y = realPoints[i].y - directedLine.y / 2;
        var offsetDirection = directedLine.rotate(Math.PI / 2);
        offsetDirection.normalizeSelf();
        node.x += node.height / 2 * offsetDirection.x;
        node.y += node.height / 2 * offsetDirection.y;
        node.x += offset.x;
        node.y += offset.y;
        wallNodes.push(node);
        wallsNode.addChild(node);
      }
    }

    var bulletConfig = config.bullets;
    var bulletsNode = cc.find("Canvas/bullets");

    for (var index in bulletConfig) {
      var con = bulletConfig[index];
      var bullet = cc.instantiate(this.bulletPrefab);
      bullet.x = con.x;
      bullet.y = con.y;
      bullet.width = bullet.width * con.scale;
      bullet.height = bullet.height * con.scale;
      bulletsNode.addChild(bullet);
    }
  },
  onClickRetryButton: function onClickRetryButton() {
    var gameMgr = require("gameMgr");

    if (this.heartForRetryCost == 0) {
      gameMgr.enterLevelScene(this.level);
      return;
    }

    var temp = this.playerData.heart - this.heartForRetryCost;

    if (temp < 0) {
      return;
    }

    var commitBody = {
      heart: temp
    };
    var self = this;

    var successCallBack = function successCallBack() {
      self.playerData.heart = temp; // self.heart = temp

      gameMgr.enterLevelScene(self.level);
    };

    this.retryButton.getComponent(cc.Button).interactable = false;

    require("dataMgr").commitPlayerDataToServer(commitBody, successCallBack);
  },
  onAllRetryFailed: function onAllRetryFailed() {
    this.retryButton.getComponent(cc.Button).interactable = true;
  },
  onClickBackButton: function onClickBackButton() {
    // cc.director.loadScene("mainScene")
    require("gameMgr").animatedToScene("mainScene");
  },
  setupNodesByConfig: function setupNodesByConfig() {
    var wallPrefab = require("resMgr").reses["wallPrefab"];

    var bulletPrefab = require("resMgr").reses["bulletPrefab"];

    var targetPrefab = require("resMgr").reses["targetPrefab"];

    var pathWayPrefab = require("resMgr").reses["pathWayPrefab"];

    var levelSceneConfig = require("levelSceneConfig")[this.level];

    this._setupFillNodes(levelSceneConfig);

    this._setupWalls(levelSceneConfig, wallPrefab);

    this._setupTargets(levelSceneConfig, targetPrefab);

    this._setupPathWaysNode(levelSceneConfig, pathWayPrefab);

    this._setupBullets(levelSceneConfig, bulletPrefab);
  },
  _setupNodePropertyByConfig: function _setupNodePropertyByConfig(givenNode, givenConfig) {
    for (var key in givenConfig) {
      givenNode[key] = givenConfig[key];
    }
  },
  _setupFillNodes: function _setupFillNodes(levelSceneConfig) {
    var fillNodesConfig = levelSceneConfig.fillNodes;
    var fillNodes = cc.find("Canvas/fillNodes");

    for (var index in fillNodesConfig) {
      var oneNodeConfig = fillNodesConfig[index];
      var oneNode = new cc.Node();

      this._setupNodePropertyByConfig(oneNode, oneNodeConfig);

      fillNodes.addChild(oneNode);
    }
  },
  _setupWalls: function _setupWalls(levelSceneConfig, wallPrefab) {
    var wallsConfig = levelSceneConfig.walls;
    var walls = cc.find("Canvas/walls");

    for (var index in wallsConfig) {
      var oneWallConfig = wallsConfig[index];
      var oneWallNode = cc.instantiate(wallPrefab);

      this._setupNodePropertyByConfig(oneWallNode, oneWallConfig);

      walls.addChild(oneWallNode);
    }
  },
  _setupTargets: function _setupTargets(levelSceneConfig, targetPrefab) {
    var targetsConfig = levelSceneConfig.targets;
    var targets = cc.find("Canvas/targets");

    for (var index in targetsConfig) {
      var oneTargetConfig = targetsConfig[index];
      var oneTargetNode = cc.instantiate(targetPrefab);

      this._setupNodePropertyByConfig(oneTargetNode, oneTargetConfig);

      targets.addChild(oneTargetNode);
    }
  },
  _setupPathWaysNode: function _setupPathWaysNode(levelSceneConfig, pathWayPrefab) {
    var pathWaysConfig = levelSceneConfig.pathWaysNode;
    var pathWaysNode = cc.find("Canvas/pathWaysNode");

    for (var index in pathWaysConfig) {
      var onePathWayConfig = pathWaysConfig[index];
      var onePathWayNode = new cc.Node(onePathWayConfig.name);

      for (var index in onePathWayConfig.children) {
        var oneChildConfig = onePathWayConfig.children[index];
        var oneChildNode = cc.instantiate(pathWayPrefab);

        this._setupNodePropertyByConfig(oneChildNode, oneChildConfig);

        onePathWayNode.addChild(oneChildNode);
      }

      pathWaysNode.addChild(onePathWayNode);
    }
  },
  _setupBullets: function _setupBullets(levelSceneConfig, bulletPrefab) {
    var bulletsConfig = levelSceneConfig.bullets;
    var bullets = cc.find("Canvas/bullets");

    for (var index in bulletsConfig) {
      var oneBulletConfig = bulletsConfig[index];
      var oneBulletNode = cc.instantiate(bulletPrefab);
      var basicConfig = oneBulletConfig.basic; //this._setupNodePropertyByConfig(oneBulletNode,basicConfig)

      var mgrConfig = oneBulletConfig.mgr;
      var bulletMgr = oneBulletNode.getComponent("bulletMgr");
      bulletMgr.bulletType = mgrConfig.bulletType;

      if (mgrConfig.bulletType == 2) {
        oneBulletNode.getComponent(cc.Sprite).spriteFrame = bulletMgr.sliderFrame;
      }

      this._setupNodePropertyByConfig(oneBulletNode, basicConfig);

      if (bulletMgr.bulletType == 2) {
        if (mgrConfig.pathWaysNodeName != "" && mgrConfig.pathWaysNodeName != null) {
          var pathWaysNodePath = "Canvas/pathWaysNode/" + mgrConfig.pathWaysNodeName;
          var pathWaysNode = cc.find(pathWaysNodePath);
          bulletMgr.pathWaysNode = pathWaysNode;
        }
      }

      bullets.addChild(oneBulletNode);
    }
  },
  dataMonitored: function dataMonitored(key, value) {
    if (key.indexOf("minStep_level_") != -1) {
      //typically one key is "minStep_level_1"
      var levelId = key.slice(14);

      if (parseInt(levelId) == parseInt(this.level)) {
        var minStepNumLabel = this.node.getChildByName("uiNode").getChildByName("minStepNumLabel"); //minStepNumLabel.getComponent(cc.Label).string = "最小步数：" + value.toString()

        minStepNumLabel.getComponent(cc.Label).string = require("textConfig").getFormatedString(153, [value.toString()]);
      }
    } else if (key == "heart") {
      this.heart = value;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsTWdyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiYnVsbGV0cyIsIm1pbkRpcyIsIm1heE9mZnNldERlZ3JlZSIsImRpcmVjdGlvblRyeXRvIiwiZmxhZyIsImhlbHBlciIsIndhbGxzIiwidGFyZ2V0c051bSIsImdldCIsIl90YXJnZXRzTnVtIiwic2V0IiwidmFsdWUiLCJvblN1Y2Nlc3MiLCJsaW5lUHJlZmFiIiwiUHJlZmFiIiwiYnVsbGV0UHJlZmFiIiwicGxheWVyRGF0YSIsInJldHJ5QnV0dG9uIiwiTm9kZSIsImhlYXJ0Rm9yUmV0cnlDb3N0IiwiX2hlYXJ0Rm9yUmV0cnlDb3N0d2UiLCJnZXRDaGlsZEJ5TmFtZSIsImdldENvbXBvbmVudCIsIkxhYmVsIiwic3RyaW5nIiwidG9TdHJpbmciLCJoZWFydCIsIl9oZWFydCIsImZpbmQiLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJpc01vdmVkIiwibWF4SGVhcnQiLCJfbWF4SGVhcnQiLCJfaXNNb3ZlZCIsImN1cnJlbnRTdGVwTnVtIiwiX2N1cnJlbnRTdGVwTnVtIiwiY3VycmVudFN0ZXBOdW1MYWJlbCIsIm5vZGUiLCJyZXF1aXJlIiwiZ2V0Rm9ybWF0ZWRTdHJpbmciLCJsZXZlbCIsInNvdW5kRWZmZWN0Iiwib25Mb2FkIiwidGV4dENvbmZpZyIsIkhlbHBlciIsInNldHVwTm9kZXNCeUNvbmZpZyIsInNlbGYiLCJsb2FkZXIiLCJsb2FkUmVzIiwiZXJyIiwicmVzIiwiZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUiLCJzdGFydCIsIm9uIiwib25Ub3VjaFN0YXJ0Iiwib25Ub3VjaE1vdmUiLCJvblRvdWNoRW5kIiwiYnVsbGV0c05vZGUiLCJjaGlsZHJlbiIsImN1cnJlbnRMZXZlbCIsImRlbGVnYXRlIiwid2FsbHNOb2RlIiwibGVuZ3RoIiwiZ3JhcGhpYyIsIkdyYXBoaWNzIiwic3RhcnRQb2ludCIsInBvaW50Tm9kZXMiLCJpbmRleCIsInBvaW50IiwibW92ZVRvIiwieCIsInkiLCJsaW5lVG8iLCJjbG9zZSIsInN0cm9rZSIsImZpbGwiLCJtaW5TdGVwTnVtTGFiZWwiLCJtaW5TdGVwS2V5IiwibWluU3RlcE51bSIsIm1pblN0ZXBzIiwidW5kZWZpbmVkIiwiaXNHdWlsZGVkIiwiZ3VpbGROb2RlIiwiaW5zdGFudGlhdGUiLCJyZXNlcyIsImFkZENoaWxkIiwicGxheUJnbSIsImxldmVsQ29uZmlnIiwiYmdtUGF0aCIsImF1ZGlvRW5naW5lIiwic3RvcEFsbCIsInBsYXkiLCJldmVudCIsInN0YXJ0TG9jYXRpb24iLCJnZXRTdGFydExvY2F0aW9uIiwidG1wRGlyZWN0aW9uIiwidjIiLCJnZXRMb2NhdGlvblgiLCJnZXRMb2NhdGlvblkiLCJkaXMiLCJtYWciLCJkaXJlY3Rpb24iLCJnZXRQb3NzaWFibGVEaXJlY3Rpb24iLCJtb3ZlQnVsbGV0cyIsIm9uRGVzdHJveSIsIm9mZiIsImRlbHRhIiwiaXNQb3NzaWFibGVXaXRoR2l2ZW5EaXJlY3Rpb24iLCJnaXZlbkRpcmVjdGlvbiIsImFuZ2xlIiwic2lnbkFuZ2xlIiwiZGVncmVlIiwiTWF0aCIsIlBJIiwiYWJzIiwic3RhdHVzIiwic2hhZG93cyIsImJ1bGxldCIsImJ1bGxldE1nciIsIm5lYXJlc3RXYWxsSW5mbyIsImdldE5lYXJlc3RXYWxsSW5mbyIsInNoYWRvd05vZGUiLCJzdWl0YWJsZVBvc2l0aW9uIiwid2lkdGgiLCJoZWlnaHQiLCJvcmlnaW5Ob2RlIiwicHVzaCIsIm1heFRyeVRpbWUiLCJyZXNvbHZlU2hhZG93cyIsIndpbGxBZGRTdGVwTnVtIiwiaXNUd29Qb3NpdGlvblNpbWlsYXJFcXVhbCIsInRhcmdldFBvc2l0aW9uIiwibW92aW5nRGlyZWN0aW9uIiwibm9ybWFsaXplU2VsZiIsIm1vdmluZ1RpbWUiLCJ2IiwidngiLCJ2eSIsIm1vdmluZ1NwZWVkIiwic2NoZWR1bGVPbmNlIiwibGV2ZWxzIiwiY3VycmVudFNlY3Rpb24iLCJpbmRleE9mIiwibmV3TGV2ZWwiLCJuZXdTZWN0aW9uIiwiY29tbWl0Qm9keSIsIm5ld0xldmVscyIsInBoeXNpY2FsUG93ZXJDb3N0ZWRGbGFnIiwicHJlTGV2ZWwiLCJzdWNjZXNzQ2FsbEJhY2siLCJhbmltYXRlZFRvU2NlbmUiLCJjb21taXRQbGF5ZXJEYXRhVG9TZXJ2ZXIiLCJvbmVTaGFkb3ciLCJpIiwiYW5vdGhlclNoYWRvdyIsInRlc3RSZXN1bHQiLCJfc2VsZWN0U3RhdGljU2hhZG93QW5kU2hhb2R3Rm9yUmVzb2x2ZWQiLCJzdGF0aWNTaGFkb3ciLCJ0ZW1wU2hhZG93Iiwic2hhZG93Rm9yUmVzb2x2ZWQiLCJzdGF0aWNCb3JkZXJMaW5lcyIsImdldExpbmVzT2ZPbmVOb2RlIiwic3RhdGljTGluZSIsInJheSIsIm1ha2VSYXkiLCJrIiwibGluZSIsInJheVRlc3QiLCJuZXdQb2ludDIiLCJwMiIsInAxIiwibmV3UG9pbnQxIiwicmF5MSIsInBvc2l0aW9uIiwiY3VycmVudERpc3RhbmNlIiwidGFyZ2V0RGlzIiwiZ2V0RGlzVG9TZWxmQm9yZGVyIiwiZGlzRnJvbUJvcmRlciIsImdldFN1aXRhYmxlUG9pbnQiLCJ1cGRhdGVkRGlzIiwic2hhZG93MSIsInNoYWRvdzIiLCJ0ZW1wIiwiczEiLCJzMiIsIm9yaWdpbkNyb3NzRmxhZyIsInNoYWRvd0Nyb3NzRmxhZyIsIm9yaWdpbkxpbmVzIiwia2V5Iiwib25lTGluZSIsImlzT25lTm9kZVdpbGxDb2xsaWRXaXRoT25lTGluZUluRGlyZWN0aW9uIiwic2hhZG93TGluZXMiLCJyZXN1bHQiLCJnZW5lcmF0ZVdhbGxzIiwiY29uZmlnIiwid2FsbFBhdGhlcyIsIm9uZVBhdGgiLCJwb2ludHMiLCJyZWFsUG9pbnRzIiwicmVhbFBvaW50IiwiY3VycmVudFBvaW50IiwibGluZVdpZHRoIiwib2Zmc2V0Iiwid2FsbE5vZGVzIiwiaXNDbG9zZWQiLCJkaXJlY3RlZExpbmUiLCJvZmZzZXREaXJlY3Rpb24iLCJyb3RhdGUiLCJidWxsZXRDb25maWciLCJjb24iLCJzY2FsZSIsIm9uQ2xpY2tSZXRyeUJ1dHRvbiIsImdhbWVNZ3IiLCJlbnRlckxldmVsU2NlbmUiLCJvbkFsbFJldHJ5RmFpbGVkIiwib25DbGlja0JhY2tCdXR0b24iLCJ3YWxsUHJlZmFiIiwidGFyZ2V0UHJlZmFiIiwicGF0aFdheVByZWZhYiIsImxldmVsU2NlbmVDb25maWciLCJfc2V0dXBGaWxsTm9kZXMiLCJfc2V0dXBXYWxscyIsIl9zZXR1cFRhcmdldHMiLCJfc2V0dXBQYXRoV2F5c05vZGUiLCJfc2V0dXBCdWxsZXRzIiwiX3NldHVwTm9kZVByb3BlcnR5QnlDb25maWciLCJnaXZlbk5vZGUiLCJnaXZlbkNvbmZpZyIsImZpbGxOb2Rlc0NvbmZpZyIsImZpbGxOb2RlcyIsIm9uZU5vZGVDb25maWciLCJvbmVOb2RlIiwid2FsbHNDb25maWciLCJvbmVXYWxsQ29uZmlnIiwib25lV2FsbE5vZGUiLCJ0YXJnZXRzQ29uZmlnIiwidGFyZ2V0cyIsIm9uZVRhcmdldENvbmZpZyIsIm9uZVRhcmdldE5vZGUiLCJwYXRoV2F5c0NvbmZpZyIsInBhdGhXYXlzTm9kZSIsIm9uZVBhdGhXYXlDb25maWciLCJvbmVQYXRoV2F5Tm9kZSIsIm5hbWUiLCJvbmVDaGlsZENvbmZpZyIsIm9uZUNoaWxkTm9kZSIsImJ1bGxldHNDb25maWciLCJvbmVCdWxsZXRDb25maWciLCJvbmVCdWxsZXROb2RlIiwiYmFzaWNDb25maWciLCJiYXNpYyIsIm1nckNvbmZpZyIsIm1nciIsImJ1bGxldFR5cGUiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsInNsaWRlckZyYW1lIiwicGF0aFdheXNOb2RlTmFtZSIsInBhdGhXYXlzTm9kZVBhdGgiLCJkYXRhTW9uaXRvcmVkIiwibGV2ZWxJZCIsInNsaWNlIiwicGFyc2VJbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFT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QXlCQSxZQUF6QjtBQUNIO0FBQ0o7O0FBRURqUCxNQUFBQSxPQUFPLENBQUNzRixRQUFSLENBQWlCbUssYUFBakI7QUFDSDtBQUNKLEdBenNCSTtBQTRzQkxXLEVBQUFBLGFBNXNCSyx5QkE0c0JTdkUsR0E1c0JULEVBNHNCYWxMLEtBNXNCYixFQTRzQm9CO0FBQ3JCLFFBQUlrTCxHQUFHLENBQUM5QyxPQUFKLENBQVksZ0JBQVosS0FBaUMsQ0FBQyxDQUF0QyxFQUF5QztBQUNyQztBQUNBLFVBQUlzSCxPQUFPLEdBQUd4RSxHQUFHLENBQUN5RSxLQUFKLENBQVUsRUFBVixDQUFkOztBQUNBLFVBQUlDLFFBQVEsQ0FBQ0YsT0FBRCxDQUFSLElBQXFCRSxRQUFRLENBQUMsS0FBSzlOLEtBQU4sQ0FBakMsRUFBK0M7QUFDM0MsWUFBSW9DLGVBQWUsR0FBRyxLQUFLdkMsSUFBTCxDQUFVakIsY0FBVixDQUF5QixRQUF6QixFQUFtQ0EsY0FBbkMsQ0FBa0QsaUJBQWxELENBQXRCLENBRDJDLENBRTNDOztBQUNBd0QsUUFBQUEsZUFBZSxDQUFDdkQsWUFBaEIsQ0FBNkIxQixFQUFFLENBQUMyQixLQUFoQyxFQUF1Q0MsTUFBdkMsR0FBZ0RlLE9BQU8sQ0FBQyxZQUFELENBQVAsQ0FBc0JDLGlCQUF0QixDQUF3QyxHQUF4QyxFQUE0QyxDQUFDN0IsS0FBSyxDQUFDYyxRQUFOLEVBQUQsQ0FBNUMsQ0FBaEQ7QUFDSDtBQUNKLEtBUkQsTUFVSyxJQUFJb0ssR0FBRyxJQUFJLE9BQVgsRUFBb0I7QUFDckIsV0FBS25LLEtBQUwsR0FBYWYsS0FBYjtBQUNIO0FBQ0o7QUExdEJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICAgICAgYnVsbGV0czogW10sXG4gICAgICAgIG1pbkRpczogNTAsXG4gICAgICAgIG1heE9mZnNldERlZ3JlZTogNDUsXG4gICAgICAgIGRpcmVjdGlvblRyeXRvOiBudWxsLFxuICAgICAgICBmbGFnOiBmYWxzZSxcbiAgICAgICAgaGVscGVyOiBudWxsLFxuXG4gICAgICAgIHdhbGxzOiBbXSxcbiAgICAgICAgdGFyZ2V0c051bToge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90YXJnZXRzTnVtXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0c051bSA9IHZhbHVlXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblN1Y2Nlc3MoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBsaW5lUHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGJ1bGxldFByZWZhYjogY2MuUHJlZmFiLFxuXG4gICAgICAgIHBsYXllckRhdGE6IG51bGwsXG4gICAgICAgIHJldHJ5QnV0dG9uOiBjYy5Ob2RlLFxuICAgICAgICBoZWFydEZvclJldHJ5Q29zdDoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZWFydEZvclJldHJ5Q29zdHdlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWFydEZvclJldHJ5Q29zdHdlID0gdmFsdWVcbiAgICAgICAgICAgICAgICB0aGlzLnJldHJ5QnV0dG9uLmdldENoaWxkQnlOYW1lKFwiaGVhcnRDb3N0TGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB2YWx1ZS50b1N0cmluZygpXG4gICAgICAgICAgICB9IFxuICAgICAgICB9LFxuXG4gICAgICAgIGhlYXJ0OiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hlYXJ0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faGVhcnQgPSB2YWx1ZVxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvdWlOb2RlL2hlYXJ0TGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB2YWx1ZS50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgdGhpcy5oZWFydEZvclJldHJ5Q29zdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldHJ5QnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc01vdmVkID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldHJ5QnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWF4SGVhcnQ6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWF4SGVhcnRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXhIZWFydCA9IHZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNNb3ZlZDoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc01vdmVkID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNNb3ZlZCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc01vdmVkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNNb3ZlZCA9IHZhbHVlXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IHRydWUgJiYgdGhpcy5oZWFydEZvclJldHJ5Q29zdCA8PSB0aGlzLmhlYXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV0cnlCdXR0b24uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY3VycmVudFN0ZXBOdW06IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudFN0ZXBOdW0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RlcE51bSA9IDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTdGVwTnVtXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0ZXBOdW0gPSB2YWx1ZVxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50U3RlcE51bUxhYmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidWlOb2RlXCIpLmdldENoaWxkQnlOYW1lKFwiY3VycmVudFN0ZXBOdW1MYWJlbFwiKVxuICAgICAgICAgICAgICAgIC8vY3VycmVudFN0ZXBOdW1MYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi5b2T5YmN5q2l5pWw77yaXCIgKyB2YWx1ZS50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgY3VycmVudFN0ZXBOdW1MYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJlcXVpcmUoXCJ0ZXh0Q29uZmlnXCIpLmdldEZvcm1hdGVkU3RyaW5nKDE1NCxbdmFsdWUudG9TdHJpbmcoKV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGxldmVsOiBudWxsLFxuICAgICAgICBzb3VuZEVmZmVjdDogbnVsbFxuICAgICAgICBcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB2YXIgdGV4dENvbmZpZyA9IHJlcXVpcmUoXCJ0ZXh0Q29uZmlnXCIpXG4gICAgICAgIHZhciBIZWxwZXIgPSByZXF1aXJlKFwiaGVscGVyXCIpXG4gICAgICAgIHRoaXMuaGVscGVyID0gbmV3IEhlbHBlcigpXG4gICAgICAgIC8vdGhpcy5sZXZlbCA9IDFcbiAgICAgICAgdGhpcy5zZXR1cE5vZGVzQnlDb25maWcoKVxuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJlZmZlY3RTb3VuZHMvaGl0XCIsZnVuY3Rpb24oZXJyLHJlcyl7XG4gICAgICAgICAgICBzZWxmLnNvdW5kRWZmZWN0ID0gcmVzXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5yZXRyeUJ1dHRvbi5nZXRDaGlsZEJ5TmFtZShcInRleHRMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRleHRDb25maWcuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTUyKVxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL3VpTm9kZS9jdXJyZW50U3RlcE51bUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGV4dENvbmZpZy5nZXRGb3JtYXRlZFN0cmluZygxNTQsWzBdKVxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vbihcInRvdWNoc3RhcnRcIix0aGlzLm9uVG91Y2hTdGFydCx0aGlzKVxuICAgICAgICB0aGlzLm5vZGUub24oXCJ0b3VjaG1vdmVcIix0aGlzLm9uVG91Y2hNb3ZlLHRoaXMpXG4gICAgICAgIHRoaXMubm9kZS5vbihcInRvdWNoZW5kXCIsdGhpcy5vblRvdWNoRW5kLHRoaXMpXG4gICAgICAgIC8vdGhpcy5nZW5lcmF0ZVdhbGxzKClcbiAgICAgICAgdmFyIGJ1bGxldHNOb2RlID0gY2MuZmluZChcIkNhbnZhcy9idWxsZXRzXCIpXG4gICAgICAgIHRoaXMuYnVsbGV0cyA9IGJ1bGxldHNOb2RlLmNoaWxkcmVuXG4gICAgICAgIHRoaXMucGxheWVyRGF0YSA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGFcblxuICAgICAgICB0aGlzLm1heEhlYXJ0ID0gdGhpcy5wbGF5ZXJEYXRhLm1heEhlYXJ0XG4gICAgICAgIGlmICh0aGlzLmxldmVsID09IHRoaXMucGxheWVyRGF0YS5jdXJyZW50TGV2ZWwpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhcnRGb3JSZXRyeUNvc3QgPSByZXF1aXJlKFwibGV2ZWxDb25maWdcIilbdGhpcy5wbGF5ZXJEYXRhLmN1cnJlbnRMZXZlbC50b1N0cmluZygpXS5oZWFydEZvclJldHJ5Q29zdFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oZWFydEZvclJldHJ5Q29zdCA9IDBcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB0aGlzLmhlYXJ0ID0gdGhpcy5wbGF5ZXJEYXRhLmhlYXJ0XG4gICAgICAgIHJlcXVpcmUoXCJuZXR3b3JrTWdyXCIpLmRlbGVnYXRlID0gdGhpc1xuICAgICAgICB2YXIgd2FsbHNOb2RlID0gY2MuZmluZChcIkNhbnZhcy93YWxsc1wiKVxuICAgICAgICB0aGlzLndhbGxzID0gd2FsbHNOb2RlLmNoaWxkcmVuXG4gICAgICAgIHRoaXMudGFyZ2V0c051bSA9IGNjLmZpbmQoXCJDYW52YXMvdGFyZ2V0c1wiKS5jaGlsZHJlbi5sZW5ndGhcblxuICAgICAgICB2YXIgZ3JhcGhpYyA9IGNjLmZpbmQoXCJDYW52YXMvZmlsbE5vZGVzXCIpLmdldENvbXBvbmVudChjYy5HcmFwaGljcylcbiAgICAgICAgdmFyIHN0YXJ0UG9pbnQgPSBudWxsXG4gICAgICAgIHZhciBwb2ludE5vZGVzID0gY2MuZmluZChcIkNhbnZhcy9maWxsTm9kZXNcIikuY2hpbGRyZW5cbiAgICAgICAgaWYgKHBvaW50Tm9kZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGluZGV4IGluIHBvaW50Tm9kZXMpIHtcbiAgICAgICAgICAgIHZhciBwb2ludCA9IHBvaW50Tm9kZXNbaW5kZXhdXG4gICAgICAgICAgICBpZiAoc3RhcnRQb2ludCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZ3JhcGhpYy5tb3ZlVG8ocG9pbnQueCwgcG9pbnQueSlcbiAgICAgICAgICAgICAgICBzdGFydFBvaW50ID0gcG9pbnRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ3JhcGhpYy5saW5lVG8ocG9pbnQueCwgcG9pbnQueSlcbiAgICAgICAgfVxuICAgICAgICBncmFwaGljLmNsb3NlKClcbiAgICAgICAgZ3JhcGhpYy5zdHJva2UoKVxuICAgICAgICBncmFwaGljLmZpbGwoKVxuXG4gICAgICAgIHZhciBtaW5TdGVwTnVtTGFiZWwgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1aU5vZGVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJtaW5TdGVwTnVtTGFiZWxcIilcbiAgICAgICAgdmFyIG1pblN0ZXBLZXkgPSBcIm1pblN0ZXBfbGV2ZWxfXCIgKyB0aGlzLmxldmVsLnRvU3RyaW5nKClcbiAgICAgICAgdmFyIG1pblN0ZXBOdW0gPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLm1pblN0ZXBzW21pblN0ZXBLZXldXG4gICAgICAgIGlmIChtaW5TdGVwTnVtID09IG51bGwgfHwgbWluU3RlcE51bSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG1pblN0ZXBOdW0gPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKS5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxNTUpXG4gICAgICAgIH1cbiAgICAgICAgbWluU3RlcE51bUxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVxdWlyZShcInRleHRDb25maWdcIikuZ2V0Rm9ybWF0ZWRTdHJpbmcoMTUzLFttaW5TdGVwTnVtLnRvU3RyaW5nKCldKVxuXG4gICAgICAgIGlmIChyZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmlzR3VpbGRlZCA9PSAwKSB7XG4gICAgICAgICAgICB2YXIgZ3VpbGROb2RlID0gY2MuaW5zdGFudGlhdGUocmVxdWlyZShcInJlc01nclwiKS5yZXNlc1tcImd1aWxkTm9kZVByZWZhYlwiXSlcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChndWlsZE5vZGUpXG4gICAgICAgIH0gXG4gICAgICAgIC8vIHZhciBndWlsZE5vZGUgPSBjYy5pbnN0YW50aWF0ZShyZXF1aXJlKFwicmVzTWdyXCIpLnJlc2VzW1wiZ3VpbGROb2RlUHJlZmFiXCJdKVxuICAgICAgICAvLyB0aGlzLm5vZGUuYWRkQ2hpbGQoZ3VpbGROb2RlKVxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbiAgICBwbGF5QmdtKCkge1xuICAgICAgICB2YXIgbGV2ZWxDb25maWcgPSByZXF1aXJlKFwibGV2ZWxDb25maWdcIilcbiAgICAgICAgdmFyIGJnbVBhdGggPSBsZXZlbENvbmZpZ1t0aGlzLmxldmVsXS5iZ21QYXRoXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKGJnbVBhdGgsZnVuY3Rpb24oZXJyLHJlcyl7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsKClcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkocmVzKVxuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBvblRvdWNoU3RhcnQoZXZlbnQpe1xuICAgICAgICB0aGlzLmRpcmVjdGlvblRyeXRvID0gbnVsbFxuICAgICAgICB0aGlzLmZsYWcgPSB0cnVlXG4gICAgfSxcblxuICAgIG9uVG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmZsYWcgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHZhciBzdGFydExvY2F0aW9uID0gZXZlbnQuZ2V0U3RhcnRMb2NhdGlvbigpXG4gICAgICAgIHZhciB0bXBEaXJlY3Rpb24gPSBjYy52MihldmVudC5nZXRMb2NhdGlvblgoKSAtIHN0YXJ0TG9jYXRpb24ueCwgZXZlbnQuZ2V0TG9jYXRpb25ZKCkgLSBzdGFydExvY2F0aW9uLnkpXG4gICAgICAgIHZhciBkaXMgPSB0bXBEaXJlY3Rpb24ubWFnKClcbiAgICAgICAgaWYgKGRpcyA8IHRoaXMubWluRGlzKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSB0aGlzLmdldFBvc3NpYWJsZURpcmVjdGlvbih0bXBEaXJlY3Rpb24pXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mbGFnID0gZmFsc2VcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uVHJ5dG8gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uVHJ5dG8gPSBkaXJlY3Rpb25cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5mbGFnID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMubW92ZUJ1bGxldHModGhpcy5kaXJlY3Rpb25Ucnl0bylcbiAgICAgICAgfVxuICAgIH0sXG4gICAgb25Ub3VjaEVuZChldmVudCkge1xuXG4gICAgfSxcblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihcInRvdWNoc3RhcnRcIix0aGlzLm9uVG91Y2hTdGFydCx0aGlzKVxuICAgICAgICB0aGlzLm5vZGUub2ZmKFwidG91Y2htb3ZlXCIsdGhpcy5vblRvdWNoTW92ZSx0aGlzKVxuICAgICAgICB0aGlzLm5vZGUub2ZmKFwidG91Y2hlbmRcIix0aGlzLm9uVG91Y2hFbmQsdGhpcylcbiAgICB9LFxuXG4gICAgZ2V0UG9zc2lhYmxlRGlyZWN0aW9uKGRlbHRhKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUG9zc2lhYmxlV2l0aEdpdmVuRGlyZWN0aW9uKGRlbHRhLGNjLnYyKDEsMCkpID09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiBjYy52MigxLDApIC8vcmlnaHRcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzUG9zc2lhYmxlV2l0aEdpdmVuRGlyZWN0aW9uKGRlbHRhLGNjLnYyKDAsLTEpKSA9PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gY2MudjIoMCwtMSkgLy9kb3duXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc1Bvc3NpYWJsZVdpdGhHaXZlbkRpcmVjdGlvbihkZWx0YSxjYy52MigtMSwwKSkgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNjLnYyKC0xLDApIC8vbGVmdFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNQb3NzaWFibGVXaXRoR2l2ZW5EaXJlY3Rpb24oZGVsdGEsY2MudjIoMCwxKSkgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNjLnYyKDAsMSkgLy91cFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIC0xIC8vbm8gZGlyZWN0aW9uIG1hdGNoXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIGlzUG9zc2lhYmxlV2l0aEdpdmVuRGlyZWN0aW9uKGRlbHRhLGdpdmVuRGlyZWN0aW9uKSB7XG4gICAgICAgIHZhciBhbmdsZSA9IGRlbHRhLnNpZ25BbmdsZShnaXZlbkRpcmVjdGlvbilcbiAgICAgICAgdmFyIGRlZ3JlZSA9IGFuZ2xlIC8gTWF0aC5QSSAqIDE4MFxuICAgICAgICBpZiAoTWF0aC5hYnMoZGVncmVlKSA8PSB0aGlzLm1heE9mZnNldERlZ3JlZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBtb3ZlQnVsbGV0cyhkaXJlY3Rpb24pIHtcbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gdGhpcy5idWxsZXRzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5idWxsZXRzW2luZGV4XS5nZXRDb21wb25lbnQoXCJidWxsZXRNZ3JcIikuc3RhdHVzICE9IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgc2hhZG93cyA9IFtdXG4gICAgICAgIGZvciAodmFyIGluZGV4IGluIHRoaXMuYnVsbGV0cykge1xuICAgICAgICAgICAgdmFyIGJ1bGxldCA9IHRoaXMuYnVsbGV0c1tpbmRleF1cbiAgICAgICAgICAgIHZhciBidWxsZXRNZ3IgPSBidWxsZXQuZ2V0Q29tcG9uZW50KFwiYnVsbGV0TWdyXCIpXG4gICAgICAgICAgICB2YXIgbmVhcmVzdFdhbGxJbmZvID0gYnVsbGV0TWdyLmdldE5lYXJlc3RXYWxsSW5mbyhkaXJlY3Rpb24pXG4gICAgICAgICAgICB2YXIgc2hhZG93Tm9kZSA9IHtcbiAgICAgICAgICAgICAgICB4OiBuZWFyZXN0V2FsbEluZm8uc3VpdGFibGVQb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgIHk6IG5lYXJlc3RXYWxsSW5mby5zdWl0YWJsZVBvc2l0aW9uLnksXG4gICAgICAgICAgICAgICAgd2lkdGg6IGJ1bGxldC53aWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGJ1bGxldC5oZWlnaHQsXG4gICAgICAgICAgICAgICAgZGlzOiBuZWFyZXN0V2FsbEluZm8uZGlzLFxuICAgICAgICAgICAgICAgIG9yaWdpbk5vZGU6IGJ1bGxldFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2hhZG93cy5wdXNoKHNoYWRvd05vZGUpXG4gICAgICAgIH1cblxuICAgICAgICAvL3Jlc29sdmUgc2hhZG93c1xuICAgICAgICB2YXIgbWF4VHJ5VGltZSA9IDEwMFxuICAgICAgICB3aGlsZSh0aGlzLnJlc29sdmVTaGFkb3dzKHNoYWRvd3MsZGlyZWN0aW9uKSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKG1heFRyeVRpbWUgPD0gMCkge1xuICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhcIkNBTidUIEZJTkQgQSBTVUlUQUJMRSBQT1NJVElPTlwiKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYXhUcnlUaW1lIC09IDFcbiAgICAgICAgfVxuICAgICAgICB2YXIgd2lsbEFkZFN0ZXBOdW0gPSBmYWxzZVxuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBzaGFkb3dzKSB7XG4gICAgICAgICAgICB2YXIgc2hhZG93Tm9kZSA9IHNoYWRvd3NbaW5kZXhdXG4gICAgICAgICAgICB2YXIgb3JpZ2luTm9kZSA9IHNoYWRvd05vZGUub3JpZ2luTm9kZVxuICAgICAgICAgICAgaWYgKHRoaXMuaGVscGVyLmlzVHdvUG9zaXRpb25TaW1pbGFyRXF1YWwoY2MudjIoc2hhZG93Tm9kZS54LHNoYWRvd05vZGUueSksY2MudjIob3JpZ2luTm9kZS54LCBvcmlnaW5Ob2RlLnkpKSA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGJ1bGxldE1nciA9IG9yaWdpbk5vZGUuZ2V0Q29tcG9uZW50KFwiYnVsbGV0TWdyXCIpXG4gICAgICAgICAgICBidWxsZXRNZ3IudGFyZ2V0UG9zaXRpb24gPSBjYy52MihzaGFkb3dOb2RlLngsIHNoYWRvd05vZGUueSlcbiAgICAgICAgICAgIGJ1bGxldE1nci5tb3ZpbmdEaXJlY3Rpb24gPSBkaXJlY3Rpb25cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYnVsbGV0TWdyLm1vdmluZ0RpcmVjdGlvbi5ub3JtYWxpemVTZWxmKClcbiAgICAgICAgICAgIGlmIChidWxsZXRNZ3IubW92aW5nVGltZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRpcyA9IGNjLnYyKGJ1bGxldE1nci50YXJnZXRQb3NpdGlvbi54IC0gb3JpZ2luTm9kZS54LCBidWxsZXRNZ3IudGFyZ2V0UG9zaXRpb24ueSAtIG9yaWdpbk5vZGUueSkubWFnKClcbiAgICAgICAgICAgICAgICB2YXIgdiA9IGRpcyAvIGJ1bGxldE1nci5tb3ZpbmdUaW1lXG5cbiAgICAgICAgICAgICAgICBidWxsZXRNZ3IudnggPSB2ICogYnVsbGV0TWdyLm1vdmluZ0RpcmVjdGlvbi54XG4gICAgICAgICAgICAgICAgYnVsbGV0TWdyLnZ5ID0gdiAqIGJ1bGxldE1nci5tb3ZpbmdEaXJlY3Rpb24ueVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYnVsbGV0TWdyLnZ4ID0gYnVsbGV0TWdyLm1vdmluZ0RpcmVjdGlvbi54ICogYnVsbGV0TWdyLm1vdmluZ1NwZWVkXG4gICAgICAgICAgICAgICAgYnVsbGV0TWdyLnZ5ID0gYnVsbGV0TWdyLm1vdmluZ0RpcmVjdGlvbi55ICogYnVsbGV0TWdyLm1vdmluZ1NwZWVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBidWxsZXRNZ3Iuc3RhdHVzID0gMVxuICAgICAgICAgICAgaWYgKHRoaXMuaXNNb3ZlZCAhPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc01vdmVkID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHdpbGxBZGRTdGVwTnVtID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgd2lsbEFkZFN0ZXBOdW0gPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbGxBZGRTdGVwTnVtID09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0ZXBOdW0gKz0gMVxuICAgICAgICAgICAgaWYgKHRoaXMuc291bmRFZmZlY3QgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5zb3VuZEVmZmVjdClcbiAgICAgICAgICAgICAgICB9LDAuMylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvblN1Y2Nlc3MoKSB7XG4gICAgICAgIHRoaXMucmV0cnlCdXR0b24uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2VcbiAgICAgICAgLy8gaWYgKHRoaXMubGV2ZWwgIT0gdGhpcy5wbGF5ZXJEYXRhLmN1cnJlbnRMZXZlbCkge1xuICAgICAgICAvLyAgICAgLy8gY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwibWFpblNjZW5lXCIpXG4gICAgICAgIC8vICAgICByZXF1aXJlKFwiZ2FtZU1nclwiKS5hbmltYXRlZFRvU2NlbmUoXCJtYWluU2NlbmVcIilcbiAgICAgICAgLy8gICAgIHJldHVyblxuICAgICAgICAvLyB9XG5cbiAgICAgICAgdmFyIGxldmVscyA9IHJlcXVpcmUoXCJzZWN0aW9uQ29uZmlnXCIpW3RoaXMucGxheWVyRGF0YS5jdXJyZW50U2VjdGlvbl0ubGV2ZWxzXG4gICAgICAgIHZhciBpbmRleCA9IGxldmVscy5pbmRleE9mKHRoaXMucGxheWVyRGF0YS5jdXJyZW50TGV2ZWwpXG4gICAgICAgIHZhciBuZXdMZXZlbCA9IG51bGxcbiAgICAgICAgdmFyIG5ld1NlY3Rpb24gPSBudWxsXG4gICAgICAgIHZhciBjb21taXRCb2R5ID0gbnVsbFxuICAgICAgICBpZiAoaW5kZXggPCBsZXZlbHMubGVuZ3RoIC0xKSB7XG4gICAgICAgICAgICBpbmRleCArPSAxXG4gICAgICAgICAgICBuZXdMZXZlbCA9IGxldmVsc1tpbmRleF1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5ld1NlY3Rpb24gPSB0aGlzLnBsYXllckRhdGEuY3VycmVudFNlY3Rpb24gKyAxXG4gICAgICAgICAgICB2YXIgbmV3TGV2ZWxzID0gcmVxdWlyZShcInNlY3Rpb25Db25maWdcIilbbmV3U2VjdGlvbl0ubGV2ZWxzXG4gICAgICAgICAgICBuZXdMZXZlbCA9IG5ld0xldmVsc1swXVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAobmV3U2VjdGlvbiA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb21taXRCb2R5ID0ge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRMZXZlbDogbmV3TGV2ZWwsIFxuICAgICAgICAgICAgfSBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbW1pdEJvZHkgPSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFNlY3Rpb246IG5ld1NlY3Rpb24sXG4gICAgICAgICAgICAgICAgY3VycmVudExldmVsOiBuZXdMZXZlbCwgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxldmVsID09IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuY3VycmVudExldmVsKSB7XG4gICAgICAgICAgICBjb21taXRCb2R5LnBoeXNpY2FsUG93ZXJDb3N0ZWRGbGFnID0gMFxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmlzR3VpbGRlZCA9PSAwKSB7XG4gICAgICAgICAgICBjb21taXRCb2R5LmlzR3VpbGRlZCA9IDFcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWluU3RlcEtleSA9IFwibWluU3RlcF9sZXZlbF9cIiArIHRoaXMubGV2ZWwudG9TdHJpbmcoKVxuICAgICAgICB2YXIgbWluU3RlcE51bSA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEubWluU3RlcHNbbWluU3RlcEtleV1cblxuICAgICAgICBpZiAobWluU3RlcE51bSA9PSBudWxsIHx8IG1pblN0ZXBOdW0gPT0gdW5kZWZpbmVkIHx8IHRoaXMuY3VycmVudFN0ZXBOdW0gPCBtaW5TdGVwTnVtKSB7XG4gICAgICAgICAgICBjb21taXRCb2R5Lm1pblN0ZXBzID0ge31cbiAgICAgICAgICAgIGNvbW1pdEJvZHkubWluU3RlcHNbbWluU3RlcEtleV0gPSB0aGlzLmN1cnJlbnRTdGVwTnVtXG4gICAgICAgIH1cbiAgICAgICAgY29tbWl0Qm9keS5wcmVMZXZlbCA9IHRoaXMubGV2ZWxcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgIHZhciBzdWNjZXNzQ2FsbEJhY2sgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYgKG5ld1NlY3Rpb24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHNlbGYucGxheWVyRGF0YS5jdXJyZW50U2VjdGlvbiA9IG5ld1NlY3Rpb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb21taXRCb2R5Lm1pblN0ZXBzICE9IG51bGwgJiYgY29tbWl0Qm9keS5taW5TdGVwcyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLm1pblN0ZXBzW21pblN0ZXBLZXldID0gc2VsZi5jdXJyZW50U3RlcE51bVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbW1pdEJvZHkuaXNHdWlsZGVkID09IDEpIHtcbiAgICAgICAgICAgICAgICByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmlzR3VpbGRlZCA9IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYucGxheWVyRGF0YS5jdXJyZW50TGV2ZWwgPSBuZXdMZXZlbFxuICAgICAgICAgICAgc2VsZi5wbGF5ZXJEYXRhLnBoeXNpY2FsUG93ZXJDb3N0ZWRGbGFnID0gMFxuICAgICAgICAgICAgc2VsZi5wbGF5ZXJEYXRhLnByZUxldmVsID0gc2VsZi5sZXZlbFxuICAgICAgICAgICAgcmVxdWlyZShcImdhbWVNZ3JcIikuYW5pbWF0ZWRUb1NjZW5lKFwibWFpblNjZW5lXCIpXG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICAgICAgcmVxdWlyZShcImRhdGFNZ3JcIikuY29tbWl0UGxheWVyRGF0YVRvU2VydmVyKGNvbW1pdEJvZHksc3VjY2Vzc0NhbGxCYWNrKVxuICAgICAgICBcbiAgICB9LFxuXG4gICAgcmVzb2x2ZVNoYWRvd3Moc2hhZG93cyxkaXJlY3Rpb24pIHtcbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gc2hhZG93cykge1xuICAgICAgICAgICAgdmFyIG9uZVNoYWRvdyA9IHNoYWRvd3NbaW5kZXhdXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHNoYWRvd3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgYW5vdGhlclNoYWRvdyA9IHNoYWRvd3NbaV1cbiAgICAgICAgICAgICAgICBpZiAob25lU2hhZG93ID09IGFub3RoZXJTaGFkb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgdGVzdFJlc3VsdCA9IHRoaXMuX3NlbGVjdFN0YXRpY1NoYWRvd0FuZFNoYW9kd0ZvclJlc29sdmVkKG9uZVNoYWRvdyxhbm90aGVyU2hhZG93LGRpcmVjdGlvbilcbiAgICAgICAgICAgICAgICBpZiAodGVzdFJlc3VsdCAhPSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdGljU2hhZG93ID0gdGVzdFJlc3VsdC5zdGF0aWNTaGFkb3dcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXBTaGFkb3cgPSB0ZXN0UmVzdWx0LnNoYWRvd0ZvclJlc29sdmVkXG4gICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhcInN0YXRpYzogXCIgKyBzdGF0aWNTaGFkb3cub3JpZ2luTm9kZS5uYW1lLCBcInRlbXA6IFwiICsgdGVtcFNoYWRvdy5vcmlnaW5Ob2RlLm5hbWUpXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGF0aWNCb3JkZXJMaW5lcyA9IHRoaXMuaGVscGVyLmdldExpbmVzT2ZPbmVOb2RlKHN0YXRpY1NoYWRvdylcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXRpY0xpbmUgPSBudWxsXG4gICAgICAgICAgICAgICAgICAgIHZhciByYXkgPSB0aGlzLmhlbHBlci5tYWtlUmF5KGNjLnYyKHN0YXRpY1NoYWRvdy54LHN0YXRpY1NoYWRvdy55KSwxMDAwLGNjLnYyKC1kaXJlY3Rpb24ueCwtZGlyZWN0aW9uLnkpKVxuXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgayBpbiBzdGF0aWNCb3JkZXJMaW5lcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmUgPSBzdGF0aWNCb3JkZXJMaW5lc1trXVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpcyA9IHRoaXMuaGVscGVyLnJheVRlc3QocmF5LGxpbmUpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzICE9IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljTGluZSA9IGxpbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdQb2ludDIgPSB0aGlzLmhlbHBlci5tYWtlUmF5KHN0YXRpY0xpbmUucDIsMTAwMCxjYy52MihzdGF0aWNMaW5lLnAyLnggLSBzdGF0aWNMaW5lLnAxLngsIHN0YXRpY0xpbmUucDIueSAtIHN0YXRpY0xpbmUucDEueSkpLnAyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdQb2ludDEgPSB0aGlzLmhlbHBlci5tYWtlUmF5KHN0YXRpY0xpbmUucDEsMTAwMCxjYy52MihzdGF0aWNMaW5lLnAxLnggLSBzdGF0aWNMaW5lLnAyLngsIHN0YXRpY0xpbmUucDEueSAtIHN0YXRpY0xpbmUucDIueSkpLnAyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0xpbmUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwMTogbmV3UG9pbnQxLFxuICAgICAgICAgICAgICAgICAgICAgICAgcDI6IG5ld1BvaW50MlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciByYXkxID0gdGhpcy5oZWxwZXIubWFrZVJheSh0ZW1wU2hhZG93Lm9yaWdpbk5vZGUucG9zaXRpb24sMzAwMCxkaXJlY3Rpb24pXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50RGlzdGFuY2UgPSB0aGlzLmhlbHBlci5yYXlUZXN0KHJheTEsc3RhdGljTGluZSlcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldERpcyA9IHRoaXMuaGVscGVyLmdldERpc1RvU2VsZkJvcmRlcih0ZW1wU2hhZG93Lm9yaWdpbk5vZGUsZGlyZWN0aW9uKSArIHRlbXBTaGFkb3cub3JpZ2luTm9kZS5nZXRDb21wb25lbnQoXCJidWxsZXRNZ3JcIikuZGlzRnJvbUJvcmRlclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VpdGFibGVQb3NpdGlvbiA9IHRoaXMuaGVscGVyLmdldFN1aXRhYmxlUG9pbnQodGVtcFNoYWRvdy5vcmlnaW5Ob2RlLnBvc2l0aW9uLGN1cnJlbnREaXN0YW5jZSx0YXJnZXREaXMsZGlyZWN0aW9uKVxuICAgICAgICAgICAgICAgICAgICB2YXIgdXBkYXRlZERpcyA9IGNjLnYyKHN1aXRhYmxlUG9zaXRpb24ueCAtIHRlbXBTaGFkb3cub3JpZ2luTm9kZS54LCBzdWl0YWJsZVBvc2l0aW9uLnkgLSB0ZW1wU2hhZG93Lm9yaWdpbk5vZGUueSkubWFnKClcbiAgICAgICAgICAgICAgICAgICAgdGVtcFNoYWRvdy54ID0gc3VpdGFibGVQb3NpdGlvbi54XG4gICAgICAgICAgICAgICAgICAgIHRlbXBTaGFkb3cueSA9IHN1aXRhYmxlUG9zaXRpb24ueVxuICAgICAgICAgICAgICAgICAgICB0ZW1wU2hhZG93LmRpcyA9IHVwZGF0ZWREaXNcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9LFxuICAgIF9zZWxlY3RTdGF0aWNTaGFkb3dBbmRTaGFvZHdGb3JSZXNvbHZlZChzaGFkb3cxLCBzaGFkb3cyLCBkaXJlY3Rpb24pIHtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgdmFyIHRlbXAgPSBmdW5jdGlvbihzMSwgczIpIHtcbiAgICAgICAgICAgIHZhciBkaXMgPSBzMS5kaXNcbiAgICAgICAgICAgIHZhciBvcmlnaW5Dcm9zc0ZsYWcgPSBmYWxzZVxuICAgICAgICAgICAgdmFyIHNoYWRvd0Nyb3NzRmxhZyA9IGZhbHNlXG5cbiAgICAgICAgICAgIHZhciBvcmlnaW5MaW5lcyA9IHNlbGYuaGVscGVyLmdldExpbmVzT2ZPbmVOb2RlKHMyKVxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG9yaWdpbkxpbmVzKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9uZUxpbmUgPSBvcmlnaW5MaW5lc1trZXldXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuaGVscGVyLmlzT25lTm9kZVdpbGxDb2xsaWRXaXRoT25lTGluZUluRGlyZWN0aW9uKHMxLm9yaWdpbk5vZGUsb25lTGluZSxkaXJlY3Rpb24sZGlzKSAhPSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5Dcm9zc0ZsYWcgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3JpZ2luQ3Jvc3NGbGFnID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzaGFkb3dMaW5lcyA9IHNlbGYuaGVscGVyLmdldExpbmVzT2ZPbmVOb2RlKHMyLm9yaWdpbk5vZGUpXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gc2hhZG93TGluZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgb25lTGluZSA9IHNoYWRvd0xpbmVzW2tleV1cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5oZWxwZXIuaXNPbmVOb2RlV2lsbENvbGxpZFdpdGhPbmVMaW5lSW5EaXJlY3Rpb24oczEub3JpZ2luTm9kZSxvbmVMaW5lLGRpcmVjdGlvbixkaXMpICE9IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoYWRvd0Nyb3NzRmxhZyA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzaGFkb3dDcm9zc0ZsYWcgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0ZW1wKHNoYWRvdzEsc2hhZG93MikgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICBzdGF0aWNTaGFkb3c6IHNoYWRvdzIsXG4gICAgICAgICAgICAgICAgc2hhZG93Rm9yUmVzb2x2ZWQ6IHNoYWRvdzFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0ZW1wKHNoYWRvdzIsc2hhZG93MSkgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICBzdGF0aWNTaGFkb3c6IHNoYWRvdzEsXG4gICAgICAgICAgICAgICAgc2hhZG93Rm9yUmVzb2x2ZWQ6IHNoYWRvdzJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVXYWxscygpIHtcbiAgICAgICAgdmFyIGxldmVsQ29uZmlnID0gcmVxdWlyZShcImxldmVsQ29uZmlnXCIpXG4gICAgICAgIHZhciBjdXJyZW50TGV2ZWwgPSB0aGlzLmxldmVsXG5cbiAgICAgICAgdmFyIGNvbmZpZyA9IGxldmVsQ29uZmlnW2N1cnJlbnRMZXZlbF1cbiAgICAgICAgdmFyIHdhbGxzTm9kZSA9IGNjLmZpbmQoXCJDYW52YXMvd2FsbHNcIilcbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gY29uZmlnLndhbGxQYXRoZXMpIHtcbiAgICAgICAgICAgIHZhciBvbmVQYXRoID0gY29uZmlnLndhbGxQYXRoZXNbaW5kZXhdXG5cbiAgICAgICAgICAgIHZhciBwb2ludHMgPSBvbmVQYXRoLnBvaW50c1xuICAgICAgICAgICAgdmFyIHJlYWxQb2ludHMgPSBbXVxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBwb2ludHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVhbFBvaW50ID0gbnVsbFxuICAgICAgICAgICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVhbFBvaW50ID0gY2MudjIocG9pbnRzW2ldLngsIHBvaW50c1tpXS55KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRQb2ludCA9IHBvaW50c1tpXVxuICAgICAgICAgICAgICAgICAgICByZWFsUG9pbnQgPSBjYy52MihyZWFsUG9pbnRzW2kgLSAxXS54ICsgY3VycmVudFBvaW50LngsIHJlYWxQb2ludHNbaSAtIDFdLnkgKyBjdXJyZW50UG9pbnQueSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmVhbFBvaW50cy5wdXNoKHJlYWxQb2ludClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBsaW5lV2lkdGggPSBvbmVQYXRoLmxpbmVXaWR0aFxuICAgICAgICAgICAgdmFyIG9mZnNldCA9IG9uZVBhdGgub2Zmc2V0XG4gICAgICAgICAgICB2YXIgd2FsbE5vZGVzID0gW11cbiAgICAgICAgICAgIHZhciBpc0Nsb3NlZCA9IG9uZVBhdGguaXNDbG9zZWRcbiAgICAgICAgICAgIGlmIChpc0Nsb3NlZCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0UG9pbnQgPSByZWFsUG9pbnRzWzBdXG4gICAgICAgICAgICAgICAgcmVhbFBvaW50cy5wdXNoKHN0YXJ0UG9pbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHJlYWxQb2ludHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5saW5lUHJlZmFiKVxuICAgICAgICAgICAgICAgIG5vZGUuaGVpZ2h0ID0gbGluZVdpZHRoXG4gICAgICAgICAgICAgICAgdmFyIGRpcmVjdGVkTGluZSA9IGNjLnYyKHJlYWxQb2ludHNbaV0ueCAtIHJlYWxQb2ludHNbaSAtIDFdLngsIHJlYWxQb2ludHNbaV0ueSAtIHJlYWxQb2ludHNbaSAtIDFdLnkpXG4gICAgICAgICAgICAgICAgbm9kZS53aWR0aCA9IGRpcmVjdGVkTGluZS5tYWcoKVxuICAgIFxuICAgICAgICAgICAgICAgIHZhciBkZWdyZWUgPSBkaXJlY3RlZExpbmUuc2lnbkFuZ2xlKGNjLnYyKDEsMCkpIC8gTWF0aC5QSSAqIDE4MFxuICAgICAgICAgICAgICAgIG5vZGUuYW5nbGUgPSAtZGVncmVlXG4gICAgICAgICAgICAgICAgbm9kZS54ID0gcmVhbFBvaW50c1tpXS54IC0gZGlyZWN0ZWRMaW5lLnggLyAyXG4gICAgICAgICAgICAgICAgbm9kZS55ID0gcmVhbFBvaW50c1tpXS55IC0gZGlyZWN0ZWRMaW5lLnkgLyAyXG4gICAgICAgICAgICAgICAgdmFyIG9mZnNldERpcmVjdGlvbiA9IGRpcmVjdGVkTGluZS5yb3RhdGUoTWF0aC5QSSAvIDIpXG4gICAgICAgICAgICAgICAgb2Zmc2V0RGlyZWN0aW9uLm5vcm1hbGl6ZVNlbGYoKVxuICAgICAgICAgICAgICAgIG5vZGUueCArPSBub2RlLmhlaWdodCAvIDIgKiBvZmZzZXREaXJlY3Rpb24ueFxuICAgICAgICAgICAgICAgIG5vZGUueSArPSBub2RlLmhlaWdodCAvIDIgKiBvZmZzZXREaXJlY3Rpb24ueVxuXG4gICAgICAgICAgICAgICAgbm9kZS54ICs9IG9mZnNldC54XG4gICAgICAgICAgICAgICAgbm9kZS55ICs9IG9mZnNldC55XG4gICAgICAgICAgICAgICAgd2FsbE5vZGVzLnB1c2gobm9kZSlcbiAgICAgICAgICAgICAgICB3YWxsc05vZGUuYWRkQ2hpbGQobm9kZSkgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYnVsbGV0Q29uZmlnID0gY29uZmlnLmJ1bGxldHNcbiAgICAgICAgdmFyIGJ1bGxldHNOb2RlID0gY2MuZmluZChcIkNhbnZhcy9idWxsZXRzXCIpXG4gICAgICAgIGZvciAodmFyIGluZGV4IGluIGJ1bGxldENvbmZpZykge1xuICAgICAgICAgICAgdmFyIGNvbiA9IGJ1bGxldENvbmZpZ1tpbmRleF1cbiAgICAgICAgICAgIHZhciBidWxsZXQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJ1bGxldFByZWZhYilcbiAgICAgICAgICAgIGJ1bGxldC54ID0gY29uLnhcbiAgICAgICAgICAgIGJ1bGxldC55ID0gY29uLnlcbiAgICAgICAgICAgIGJ1bGxldC53aWR0aCA9IGJ1bGxldC53aWR0aCAqIGNvbi5zY2FsZVxuICAgICAgICAgICAgYnVsbGV0LmhlaWdodCA9IGJ1bGxldC5oZWlnaHQgKiBjb24uc2NhbGVcbiAgICAgICAgICAgIGJ1bGxldHNOb2RlLmFkZENoaWxkKGJ1bGxldClcbiAgICAgICAgfSBcbiAgICB9LFxuXG5cbiAgICBvbkNsaWNrUmV0cnlCdXR0b24oKSB7XG4gICAgICAgIHZhciBnYW1lTWdyID0gcmVxdWlyZShcImdhbWVNZ3JcIilcbiAgICAgICAgaWYgKHRoaXMuaGVhcnRGb3JSZXRyeUNvc3QgPT0gMCkge1xuICAgICAgICAgICAgZ2FtZU1nci5lbnRlckxldmVsU2NlbmUodGhpcy5sZXZlbClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHZhciB0ZW1wID0gdGhpcy5wbGF5ZXJEYXRhLmhlYXJ0IC0gdGhpcy5oZWFydEZvclJldHJ5Q29zdFxuICAgICAgICBpZiAodGVtcCA8IDApIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNvbW1pdEJvZHkgPSB7XG4gICAgICAgICAgICBoZWFydDogdGVtcFxuICAgICAgICB9XG4gICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICB2YXIgc3VjY2Vzc0NhbGxCYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLnBsYXllckRhdGEuaGVhcnQgPSB0ZW1wXG4gICAgICAgICAgICAvLyBzZWxmLmhlYXJ0ID0gdGVtcFxuICAgICAgICAgICAgZ2FtZU1nci5lbnRlckxldmVsU2NlbmUoc2VsZi5sZXZlbClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJldHJ5QnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlXG4gICAgICAgIHJlcXVpcmUoXCJkYXRhTWdyXCIpLmNvbW1pdFBsYXllckRhdGFUb1NlcnZlcihjb21taXRCb2R5LHN1Y2Nlc3NDYWxsQmFjaylcbiAgICB9LFxuICAgIG9uQWxsUmV0cnlGYWlsZWQoKSB7XG4gICAgICAgIHRoaXMucmV0cnlCdXR0b24uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZVxuICAgIH0sXG5cbiAgICBvbkNsaWNrQmFja0J1dHRvbigpIHtcbiAgICAgICAgLy8gY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwibWFpblNjZW5lXCIpXG4gICAgICAgIHJlcXVpcmUoXCJnYW1lTWdyXCIpLmFuaW1hdGVkVG9TY2VuZShcIm1haW5TY2VuZVwiKVxuICAgIH0sXG5cbiAgICBzZXR1cE5vZGVzQnlDb25maWcoKSB7XG4gICAgICAgIHZhciB3YWxsUHJlZmFiID0gcmVxdWlyZShcInJlc01nclwiKS5yZXNlc1tcIndhbGxQcmVmYWJcIl1cbiAgICAgICAgdmFyIGJ1bGxldFByZWZhYiA9IHJlcXVpcmUoXCJyZXNNZ3JcIikucmVzZXNbXCJidWxsZXRQcmVmYWJcIl1cbiAgICAgICAgdmFyIHRhcmdldFByZWZhYiA9IHJlcXVpcmUoXCJyZXNNZ3JcIikucmVzZXNbXCJ0YXJnZXRQcmVmYWJcIl1cbiAgICAgICAgdmFyIHBhdGhXYXlQcmVmYWIgPSByZXF1aXJlKFwicmVzTWdyXCIpLnJlc2VzW1wicGF0aFdheVByZWZhYlwiXVxuICAgICAgICB2YXIgbGV2ZWxTY2VuZUNvbmZpZyA9IHJlcXVpcmUoXCJsZXZlbFNjZW5lQ29uZmlnXCIpW3RoaXMubGV2ZWxdXG5cbiAgICAgICAgdGhpcy5fc2V0dXBGaWxsTm9kZXMobGV2ZWxTY2VuZUNvbmZpZylcbiAgICAgICAgdGhpcy5fc2V0dXBXYWxscyhsZXZlbFNjZW5lQ29uZmlnLHdhbGxQcmVmYWIpXG4gICAgICAgIHRoaXMuX3NldHVwVGFyZ2V0cyhsZXZlbFNjZW5lQ29uZmlnLHRhcmdldFByZWZhYilcbiAgICAgICAgdGhpcy5fc2V0dXBQYXRoV2F5c05vZGUobGV2ZWxTY2VuZUNvbmZpZyxwYXRoV2F5UHJlZmFiKVxuICAgICAgICB0aGlzLl9zZXR1cEJ1bGxldHMobGV2ZWxTY2VuZUNvbmZpZyxidWxsZXRQcmVmYWIpXG4gICAgfSxcbiAgICBfc2V0dXBOb2RlUHJvcGVydHlCeUNvbmZpZyhnaXZlbk5vZGUsIGdpdmVuQ29uZmlnKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBnaXZlbkNvbmZpZykge1xuICAgICAgICAgICAgZ2l2ZW5Ob2RlW2tleV0gPSBnaXZlbkNvbmZpZ1trZXldXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9zZXR1cEZpbGxOb2RlcyhsZXZlbFNjZW5lQ29uZmlnKSB7XG4gICAgICAgIHZhciBmaWxsTm9kZXNDb25maWcgPSBsZXZlbFNjZW5lQ29uZmlnLmZpbGxOb2Rlc1xuICAgICAgICB2YXIgZmlsbE5vZGVzID0gY2MuZmluZChcIkNhbnZhcy9maWxsTm9kZXNcIilcbiAgICAgICAgZm9yKHZhciBpbmRleCBpbiBmaWxsTm9kZXNDb25maWcpIHtcbiAgICAgICAgICAgIHZhciBvbmVOb2RlQ29uZmlnID0gZmlsbE5vZGVzQ29uZmlnW2luZGV4XVxuICAgICAgICAgICAgdmFyIG9uZU5vZGUgPSBuZXcgY2MuTm9kZSgpXG4gICAgICAgICAgICB0aGlzLl9zZXR1cE5vZGVQcm9wZXJ0eUJ5Q29uZmlnKG9uZU5vZGUsb25lTm9kZUNvbmZpZylcbiAgICAgICAgICAgIGZpbGxOb2Rlcy5hZGRDaGlsZChvbmVOb2RlKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9zZXR1cFdhbGxzKGxldmVsU2NlbmVDb25maWcsd2FsbFByZWZhYikge1xuICAgICAgICB2YXIgd2FsbHNDb25maWcgPSBsZXZlbFNjZW5lQ29uZmlnLndhbGxzXG4gICAgICAgIHZhciB3YWxscyA9IGNjLmZpbmQoXCJDYW52YXMvd2FsbHNcIilcbiAgICAgICAgZm9yKHZhciBpbmRleCBpbiB3YWxsc0NvbmZpZykge1xuICAgICAgICAgICAgdmFyIG9uZVdhbGxDb25maWcgPSB3YWxsc0NvbmZpZ1tpbmRleF1cbiAgICAgICAgICAgIHZhciBvbmVXYWxsTm9kZSA9IGNjLmluc3RhbnRpYXRlKHdhbGxQcmVmYWIpXG4gICAgICAgICAgICB0aGlzLl9zZXR1cE5vZGVQcm9wZXJ0eUJ5Q29uZmlnKG9uZVdhbGxOb2RlLG9uZVdhbGxDb25maWcpXG4gICAgICAgICAgICB3YWxscy5hZGRDaGlsZChvbmVXYWxsTm9kZSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfc2V0dXBUYXJnZXRzKGxldmVsU2NlbmVDb25maWcsIHRhcmdldFByZWZhYikge1xuICAgICAgICB2YXIgdGFyZ2V0c0NvbmZpZyA9IGxldmVsU2NlbmVDb25maWcudGFyZ2V0c1xuICAgICAgICB2YXIgdGFyZ2V0cyA9IGNjLmZpbmQoXCJDYW52YXMvdGFyZ2V0c1wiKSBcbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gdGFyZ2V0c0NvbmZpZykge1xuICAgICAgICAgICAgdmFyIG9uZVRhcmdldENvbmZpZyA9IHRhcmdldHNDb25maWdbaW5kZXhdXG4gICAgICAgICAgICB2YXIgb25lVGFyZ2V0Tm9kZSA9IGNjLmluc3RhbnRpYXRlKHRhcmdldFByZWZhYilcbiAgICAgICAgICAgIHRoaXMuX3NldHVwTm9kZVByb3BlcnR5QnlDb25maWcob25lVGFyZ2V0Tm9kZSxvbmVUYXJnZXRDb25maWcpXG4gICAgICAgICAgICB0YXJnZXRzLmFkZENoaWxkKG9uZVRhcmdldE5vZGUpXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIF9zZXR1cFBhdGhXYXlzTm9kZShsZXZlbFNjZW5lQ29uZmlnLHBhdGhXYXlQcmVmYWIpIHtcbiAgICAgICAgdmFyIHBhdGhXYXlzQ29uZmlnID0gbGV2ZWxTY2VuZUNvbmZpZy5wYXRoV2F5c05vZGVcbiAgICAgICAgdmFyIHBhdGhXYXlzTm9kZSA9IGNjLmZpbmQoXCJDYW52YXMvcGF0aFdheXNOb2RlXCIpXG4gICAgICAgIGZvciAodmFyIGluZGV4IGluIHBhdGhXYXlzQ29uZmlnKSB7XG4gICAgICAgICAgICB2YXIgb25lUGF0aFdheUNvbmZpZyA9IHBhdGhXYXlzQ29uZmlnW2luZGV4XVxuICAgICAgICAgICAgdmFyIG9uZVBhdGhXYXlOb2RlID0gbmV3IGNjLk5vZGUob25lUGF0aFdheUNvbmZpZy5uYW1lKVxuICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gb25lUGF0aFdheUNvbmZpZy5jaGlsZHJlbil7XG4gICAgICAgICAgICAgICAgdmFyIG9uZUNoaWxkQ29uZmlnID0gb25lUGF0aFdheUNvbmZpZy5jaGlsZHJlbltpbmRleF1cbiAgICAgICAgICAgICAgICB2YXIgb25lQ2hpbGROb2RlID0gY2MuaW5zdGFudGlhdGUocGF0aFdheVByZWZhYilcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXR1cE5vZGVQcm9wZXJ0eUJ5Q29uZmlnKG9uZUNoaWxkTm9kZSxvbmVDaGlsZENvbmZpZylcbiAgICAgICAgICAgICAgICBvbmVQYXRoV2F5Tm9kZS5hZGRDaGlsZChvbmVDaGlsZE5vZGUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXRoV2F5c05vZGUuYWRkQ2hpbGQob25lUGF0aFdheU5vZGUpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3NldHVwQnVsbGV0cyhsZXZlbFNjZW5lQ29uZmlnLCBidWxsZXRQcmVmYWIpIHtcbiAgICAgICAgdmFyIGJ1bGxldHNDb25maWcgPSBsZXZlbFNjZW5lQ29uZmlnLmJ1bGxldHNcbiAgICAgICAgdmFyIGJ1bGxldHMgPSBjYy5maW5kKFwiQ2FudmFzL2J1bGxldHNcIilcbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gYnVsbGV0c0NvbmZpZykge1xuICAgICAgICAgICAgdmFyIG9uZUJ1bGxldENvbmZpZyA9IGJ1bGxldHNDb25maWdbaW5kZXhdXG4gICAgICAgICAgICB2YXIgb25lQnVsbGV0Tm9kZSA9IGNjLmluc3RhbnRpYXRlKGJ1bGxldFByZWZhYilcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGJhc2ljQ29uZmlnID0gb25lQnVsbGV0Q29uZmlnLmJhc2ljXG4gICAgICAgICAgICAvL3RoaXMuX3NldHVwTm9kZVByb3BlcnR5QnlDb25maWcob25lQnVsbGV0Tm9kZSxiYXNpY0NvbmZpZylcbiAgICAgICAgICAgIHZhciBtZ3JDb25maWcgPSBvbmVCdWxsZXRDb25maWcubWdyXG4gICAgICAgICAgICB2YXIgYnVsbGV0TWdyID0gb25lQnVsbGV0Tm9kZS5nZXRDb21wb25lbnQoXCJidWxsZXRNZ3JcIilcbiAgICAgICAgICAgIGJ1bGxldE1nci5idWxsZXRUeXBlID0gbWdyQ29uZmlnLmJ1bGxldFR5cGVcbiAgICAgICAgICAgIGlmIChtZ3JDb25maWcuYnVsbGV0VHlwZSA9PSAyKSB7XG4gICAgICAgICAgICAgICAgb25lQnVsbGV0Tm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IGJ1bGxldE1nci5zbGlkZXJGcmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc2V0dXBOb2RlUHJvcGVydHlCeUNvbmZpZyhvbmVCdWxsZXROb2RlLGJhc2ljQ29uZmlnKVxuICAgICAgICAgICAgaWYgKGJ1bGxldE1nci5idWxsZXRUeXBlID09IDIpIHtcbiAgICAgICAgICAgICAgICBpZiAobWdyQ29uZmlnLnBhdGhXYXlzTm9kZU5hbWUgIT0gXCJcIiAmJiBtZ3JDb25maWcucGF0aFdheXNOb2RlTmFtZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXRoV2F5c05vZGVQYXRoID0gXCJDYW52YXMvcGF0aFdheXNOb2RlL1wiICsgbWdyQ29uZmlnLnBhdGhXYXlzTm9kZU5hbWVcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGhXYXlzTm9kZSA9IGNjLmZpbmQocGF0aFdheXNOb2RlUGF0aClcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0TWdyLnBhdGhXYXlzTm9kZSA9IHBhdGhXYXlzTm9kZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnVsbGV0cy5hZGRDaGlsZChvbmVCdWxsZXROb2RlKVxuICAgICAgICB9XG4gICAgfSxcblxuXG4gICAgZGF0YU1vbml0b3JlZChrZXksdmFsdWUpIHtcbiAgICAgICAgaWYgKGtleS5pbmRleE9mKFwibWluU3RlcF9sZXZlbF9cIikgIT0gLTEpIHtcbiAgICAgICAgICAgIC8vdHlwaWNhbGx5IG9uZSBrZXkgaXMgXCJtaW5TdGVwX2xldmVsXzFcIlxuICAgICAgICAgICAgdmFyIGxldmVsSWQgPSBrZXkuc2xpY2UoMTQpXG4gICAgICAgICAgICBpZiAocGFyc2VJbnQobGV2ZWxJZCkgPT0gcGFyc2VJbnQodGhpcy5sZXZlbCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWluU3RlcE51bUxhYmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidWlOb2RlXCIpLmdldENoaWxkQnlOYW1lKFwibWluU3RlcE51bUxhYmVsXCIpXG4gICAgICAgICAgICAgICAgLy9taW5TdGVwTnVtTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuacgOWwj+atpeaVsO+8mlwiICsgdmFsdWUudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIG1pblN0ZXBOdW1MYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJlcXVpcmUoXCJ0ZXh0Q29uZmlnXCIpLmdldEZvcm1hdGVkU3RyaW5nKDE1MyxbdmFsdWUudG9TdHJpbmcoKV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmIChrZXkgPT0gXCJoZWFydFwiKSB7XG4gICAgICAgICAgICB0aGlzLmhlYXJ0ID0gdmFsdWVcbiAgICAgICAgfVxuICAgIH1cblxufSk7XG5cbiJdfQ==