
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
    // for (var index in this.node.getChildByName("bullets").children) {
    //     var oneElement = this.node.getChildByName("bullets").children[index]
    //     cc.log(oneElement.width, oneElement.height)
    // }

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
      } //cc.log(index,oneBulletNode.width, oneBulletNode.height)


      bullets.addChild(oneBulletNode); //cc.log(index,oneBulletNode.width, oneBulletNode.height)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsTWdyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiYnVsbGV0cyIsIm1pbkRpcyIsIm1heE9mZnNldERlZ3JlZSIsImRpcmVjdGlvblRyeXRvIiwiZmxhZyIsImhlbHBlciIsIndhbGxzIiwidGFyZ2V0c051bSIsImdldCIsIl90YXJnZXRzTnVtIiwic2V0IiwidmFsdWUiLCJvblN1Y2Nlc3MiLCJsaW5lUHJlZmFiIiwiUHJlZmFiIiwiYnVsbGV0UHJlZmFiIiwicGxheWVyRGF0YSIsInJldHJ5QnV0dG9uIiwiTm9kZSIsImhlYXJ0Rm9yUmV0cnlDb3N0IiwiX2hlYXJ0Rm9yUmV0cnlDb3N0d2UiLCJnZXRDaGlsZEJ5TmFtZSIsImdldENvbXBvbmVudCIsIkxhYmVsIiwic3RyaW5nIiwidG9TdHJpbmciLCJoZWFydCIsIl9oZWFydCIsImZpbmQiLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJpc01vdmVkIiwibWF4SGVhcnQiLCJfbWF4SGVhcnQiLCJfaXNNb3ZlZCIsImN1cnJlbnRTdGVwTnVtIiwiX2N1cnJlbnRTdGVwTnVtIiwiY3VycmVudFN0ZXBOdW1MYWJlbCIsIm5vZGUiLCJyZXF1aXJlIiwiZ2V0Rm9ybWF0ZWRTdHJpbmciLCJsZXZlbCIsInNvdW5kRWZmZWN0Iiwib25Mb2FkIiwidGV4dENvbmZpZyIsIkhlbHBlciIsInNldHVwTm9kZXNCeUNvbmZpZyIsInNlbGYiLCJsb2FkZXIiLCJsb2FkUmVzIiwiZXJyIiwicmVzIiwiZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUiLCJzdGFydCIsIm9uIiwib25Ub3VjaFN0YXJ0Iiwib25Ub3VjaE1vdmUiLCJvblRvdWNoRW5kIiwiYnVsbGV0c05vZGUiLCJjaGlsZHJlbiIsImN1cnJlbnRMZXZlbCIsImRlbGVnYXRlIiwid2FsbHNOb2RlIiwibGVuZ3RoIiwiZ3JhcGhpYyIsIkdyYXBoaWNzIiwic3RhcnRQb2ludCIsInBvaW50Tm9kZXMiLCJpbmRleCIsInBvaW50IiwibW92ZVRvIiwieCIsInkiLCJsaW5lVG8iLCJjbG9zZSIsInN0cm9rZSIsImZpbGwiLCJtaW5TdGVwTnVtTGFiZWwiLCJtaW5TdGVwS2V5IiwibWluU3RlcE51bSIsIm1pblN0ZXBzIiwidW5kZWZpbmVkIiwiaXNHdWlsZGVkIiwiZ3VpbGROb2RlIiwiaW5zdGFudGlhdGUiLCJyZXNlcyIsImFkZENoaWxkIiwicGxheUJnbSIsImxldmVsQ29uZmlnIiwiYmdtUGF0aCIsImF1ZGlvRW5naW5lIiwic3RvcEFsbCIsInBsYXkiLCJldmVudCIsInN0YXJ0TG9jYXRpb24iLCJnZXRTdGFydExvY2F0aW9uIiwidG1wRGlyZWN0aW9uIiwidjIiLCJnZXRMb2NhdGlvblgiLCJnZXRMb2NhdGlvblkiLCJkaXMiLCJtYWciLCJkaXJlY3Rpb24iLCJnZXRQb3NzaWFibGVEaXJlY3Rpb24iLCJtb3ZlQnVsbGV0cyIsIm9uRGVzdHJveSIsIm9mZiIsImRlbHRhIiwiaXNQb3NzaWFibGVXaXRoR2l2ZW5EaXJlY3Rpb24iLCJnaXZlbkRpcmVjdGlvbiIsImFuZ2xlIiwic2lnbkFuZ2xlIiwiZGVncmVlIiwiTWF0aCIsIlBJIiwiYWJzIiwic3RhdHVzIiwic2hhZG93cyIsImJ1bGxldCIsImJ1bGxldE1nciIsIm5lYXJlc3RXYWxsSW5mbyIsImdldE5lYXJlc3RXYWxsSW5mbyIsInNoYWRvd05vZGUiLCJzdWl0YWJsZVBvc2l0aW9uIiwid2lkdGgiLCJoZWlnaHQiLCJvcmlnaW5Ob2RlIiwicHVzaCIsIm1heFRyeVRpbWUiLCJyZXNvbHZlU2hhZG93cyIsIndpbGxBZGRTdGVwTnVtIiwiaXNUd29Qb3NpdGlvblNpbWlsYXJFcXVhbCIsInRhcmdldFBvc2l0aW9uIiwibW92aW5nRGlyZWN0aW9uIiwibm9ybWFsaXplU2VsZiIsIm1vdmluZ1RpbWUiLCJ2IiwidngiLCJ2eSIsIm1vdmluZ1NwZWVkIiwic2NoZWR1bGVPbmNlIiwibGV2ZWxzIiwiY3VycmVudFNlY3Rpb24iLCJpbmRleE9mIiwibmV3TGV2ZWwiLCJuZXdTZWN0aW9uIiwiY29tbWl0Qm9keSIsIm5ld0xldmVscyIsInBoeXNpY2FsUG93ZXJDb3N0ZWRGbGFnIiwicHJlTGV2ZWwiLCJzdWNjZXNzQ2FsbEJhY2siLCJhbmltYXRlZFRvU2NlbmUiLCJjb21taXRQbGF5ZXJEYXRhVG9TZXJ2ZXIiLCJvbmVTaGFkb3ciLCJpIiwiYW5vdGhlclNoYWRvdyIsInRlc3RSZXN1bHQiLCJfc2VsZWN0U3RhdGljU2hhZG93QW5kU2hhb2R3Rm9yUmVzb2x2ZWQiLCJzdGF0aWNTaGFkb3ciLCJ0ZW1wU2hhZG93Iiwic2hhZG93Rm9yUmVzb2x2ZWQiLCJzdGF0aWNCb3JkZXJMaW5lcyIsImdldExpbmVzT2ZPbmVOb2RlIiwic3RhdGljTGluZSIsInJheSIsIm1ha2VSYXkiLCJrIiwibGluZSIsInJheVRlc3QiLCJuZXdQb2ludDIiLCJwMiIsInAxIiwibmV3UG9pbnQxIiwicmF5MSIsInBvc2l0aW9uIiwiY3VycmVudERpc3RhbmNlIiwidGFyZ2V0RGlzIiwiZ2V0RGlzVG9TZWxmQm9yZGVyIiwiZGlzRnJvbUJvcmRlciIsImdldFN1aXRhYmxlUG9pbnQiLCJ1cGRhdGVkRGlzIiwic2hhZG93MSIsInNoYWRvdzIiLCJ0ZW1wIiwiczEiLCJzMiIsIm9yaWdpbkNyb3NzRmxhZyIsInNoYWRvd0Nyb3NzRmxhZyIsIm9yaWdpbkxpbmVzIiwia2V5Iiwib25lTGluZSIsImlzT25lTm9kZVdpbGxDb2xsaWRXaXRoT25lTGluZUluRGlyZWN0aW9uIiwic2hhZG93TGluZXMiLCJyZXN1bHQiLCJnZW5lcmF0ZVdhbGxzIiwiY29uZmlnIiwid2FsbFBhdGhlcyIsIm9uZVBhdGgiLCJwb2ludHMiLCJyZWFsUG9pbnRzIiwicmVhbFBvaW50IiwiY3VycmVudFBvaW50IiwibGluZVdpZHRoIiwib2Zmc2V0Iiwid2FsbE5vZGVzIiwiaXNDbG9zZWQiLCJkaXJlY3RlZExpbmUiLCJvZmZzZXREaXJlY3Rpb24iLCJyb3RhdGUiLCJidWxsZXRDb25maWciLCJjb24iLCJzY2FsZSIsIm9uQ2xpY2tSZXRyeUJ1dHRvbiIsImdhbWVNZ3IiLCJlbnRlckxldmVsU2NlbmUiLCJvbkFsbFJldHJ5RmFpbGVkIiwib25DbGlja0JhY2tCdXR0b24iLCJ3YWxsUHJlZmFiIiwidGFyZ2V0UHJlZmFiIiwicGF0aFdheVByZWZhYiIsImxldmVsU2NlbmVDb25maWciLCJfc2V0dXBGaWxsTm9kZXMiLCJfc2V0dXBXYWxscyIsIl9zZXR1cFRhcmdldHMiLCJfc2V0dXBQYXRoV2F5c05vZGUiLCJfc2V0dXBCdWxsZXRzIiwiX3NldHVwTm9kZVByb3BlcnR5QnlDb25maWciLCJnaXZlbk5vZGUiLCJnaXZlbkNvbmZpZyIsImZpbGxOb2Rlc0NvbmZpZyIsImZpbGxOb2RlcyIsIm9uZU5vZGVDb25maWciLCJvbmVOb2RlIiwid2FsbHNDb25maWciLCJvbmVXYWxsQ29uZmlnIiwib25lV2FsbE5vZGUiLCJ0YXJnZXRzQ29uZmlnIiwidGFyZ2V0cyIsIm9uZVRhcmdldENvbmZpZyIsIm9uZVRhcmdldE5vZGUiLCJwYXRoV2F5c0NvbmZpZyIsInBhdGhXYXlzTm9kZSIsIm9uZVBhdGhXYXlDb25maWciLCJvbmVQYXRoV2F5Tm9kZSIsIm5hbWUiLCJvbmVDaGlsZENvbmZpZyIsIm9uZUNoaWxkTm9kZSIsImJ1bGxldHNDb25maWciLCJvbmVCdWxsZXRDb25maWciLCJvbmVCdWxsZXROb2RlIiwiYmFzaWNDb25maWciLCJiYXNpYyIsIm1nckNvbmZpZyIsIm1nciIsImJ1bGxldFR5cGUiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsInNsaWRlckZyYW1lIiwicGF0aFdheXNOb2RlTmFtZSIsInBhdGhXYXlzTm9kZVBhdGgiLCJkYXRhTW9uaXRvcmVkIiwibGV2ZWxJZCIsInNsaWNlIiwicGFyc2VJbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFT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LFNBQVMsQ0FBQzBILFlBQVYsR0FBeUJBLFlBQXpCO0FBQ0g7QUFDSixPQW5CNEIsQ0FvQjdCOzs7QUFDQWpQLE1BQUFBLE9BQU8sQ0FBQ3NGLFFBQVIsQ0FBaUJtSyxhQUFqQixFQXJCNkIsQ0FzQjdCO0FBQ0g7QUFDSixHQTlzQkk7QUFpdEJMVyxFQUFBQSxhQWp0QksseUJBaXRCU3ZFLEdBanRCVCxFQWl0QmFsTCxLQWp0QmIsRUFpdEJvQjtBQUNyQixRQUFJa0wsR0FBRyxDQUFDOUMsT0FBSixDQUFZLGdCQUFaLEtBQWlDLENBQUMsQ0FBdEMsRUFBeUM7QUFDckM7QUFDQSxVQUFJc0gsT0FBTyxHQUFHeEUsR0FBRyxDQUFDeUUsS0FBSixDQUFVLEVBQVYsQ0FBZDs7QUFDQSxVQUFJQyxRQUFRLENBQUNGLE9BQUQsQ0FBUixJQUFxQkUsUUFBUSxDQUFDLEtBQUs5TixLQUFOLENBQWpDLEVBQStDO0FBQzNDLFlBQUlvQyxlQUFlLEdBQUcsS0FBS3ZDLElBQUwsQ0FBVWpCLGNBQVYsQ0FBeUIsUUFBekIsRUFBbUNBLGNBQW5DLENBQWtELGlCQUFsRCxDQUF0QixDQUQyQyxDQUUzQzs7QUFDQXdELFFBQUFBLGVBQWUsQ0FBQ3ZELFlBQWhCLENBQTZCMUIsRUFBRSxDQUFDMkIsS0FBaEMsRUFBdUNDLE1BQXZDLEdBQWdEZSxPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCQyxpQkFBdEIsQ0FBd0MsR0FBeEMsRUFBNEMsQ0FBQzdCLEtBQUssQ0FBQ2MsUUFBTixFQUFELENBQTVDLENBQWhEO0FBQ0g7QUFDSixLQVJELE1BVUssSUFBSW9LLEdBQUcsSUFBSSxPQUFYLEVBQW9CO0FBQ3JCLFdBQUtuSyxLQUFMLEdBQWFmLEtBQWI7QUFDSDtBQUNKO0FBL3RCSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cHM6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgICAgIGJ1bGxldHM6IFtdLFxuICAgICAgICBtaW5EaXM6IDUwLFxuICAgICAgICBtYXhPZmZzZXREZWdyZWU6IDQ1LFxuICAgICAgICBkaXJlY3Rpb25Ucnl0bzogbnVsbCxcbiAgICAgICAgZmxhZzogZmFsc2UsXG4gICAgICAgIGhlbHBlcjogbnVsbCxcblxuICAgICAgICB3YWxsczogW10sXG4gICAgICAgIHRhcmdldHNOdW06IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0c051bVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldHNOdW0gPSB2YWx1ZVxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25TdWNjZXNzKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbGluZVByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBidWxsZXRQcmVmYWI6IGNjLlByZWZhYixcblxuICAgICAgICBwbGF5ZXJEYXRhOiBudWxsLFxuICAgICAgICByZXRyeUJ1dHRvbjogY2MuTm9kZSxcbiAgICAgICAgaGVhcnRGb3JSZXRyeUNvc3Q6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faGVhcnRGb3JSZXRyeUNvc3R3ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5faGVhcnRGb3JSZXRyeUNvc3R3ZSA9IHZhbHVlXG4gICAgICAgICAgICAgICAgdGhpcy5yZXRyeUJ1dHRvbi5nZXRDaGlsZEJ5TmFtZShcImhlYXJ0Q29zdExhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdmFsdWUudG9TdHJpbmcoKVxuICAgICAgICAgICAgfSBcbiAgICAgICAgfSxcblxuICAgICAgICBoZWFydDoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZWFydFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hlYXJ0ID0gdmFsdWVcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL3VpTm9kZS9oZWFydExhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdmFsdWUudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IHRoaXMuaGVhcnRGb3JSZXRyeUNvc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXRyeUJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNNb3ZlZCA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXRyeUJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG1heEhlYXJ0OiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21heEhlYXJ0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4SGVhcnQgPSB2YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGlzTW92ZWQ6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNNb3ZlZCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzTW92ZWQgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faXNNb3ZlZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzTW92ZWQgPSB2YWx1ZVxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSB0cnVlICYmIHRoaXMuaGVhcnRGb3JSZXRyeUNvc3QgPD0gdGhpcy5oZWFydCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldHJ5QnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGN1cnJlbnRTdGVwTnVtOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRTdGVwTnVtID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0ZXBOdW0gPSAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50U3RlcE51bVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGVwTnVtID0gdmFsdWVcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudFN0ZXBOdW1MYWJlbCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVpTm9kZVwiKS5nZXRDaGlsZEJ5TmFtZShcImN1cnJlbnRTdGVwTnVtTGFiZWxcIilcbiAgICAgICAgICAgICAgICAvL2N1cnJlbnRTdGVwTnVtTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuW9k+WJjeatpeaVsO+8mlwiICsgdmFsdWUudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGVwTnVtTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKS5nZXRGb3JtYXRlZFN0cmluZygxNTQsW3ZhbHVlLnRvU3RyaW5nKCldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBsZXZlbDogbnVsbCxcbiAgICAgICAgc291bmRFZmZlY3Q6IG51bGxcbiAgICAgICAgXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdmFyIHRleHRDb25maWcgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKVxuICAgICAgICB2YXIgSGVscGVyID0gcmVxdWlyZShcImhlbHBlclwiKVxuICAgICAgICB0aGlzLmhlbHBlciA9IG5ldyBIZWxwZXIoKVxuICAgICAgICAvL3RoaXMubGV2ZWwgPSAxXG4gICAgICAgIHRoaXMuc2V0dXBOb2Rlc0J5Q29uZmlnKClcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwiZWZmZWN0U291bmRzL2hpdFwiLGZ1bmN0aW9uKGVycixyZXMpe1xuICAgICAgICAgICAgc2VsZi5zb3VuZEVmZmVjdCA9IHJlc1xuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMucmV0cnlCdXR0b24uZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0TGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0ZXh0Q29uZmlnLmdldFRleHRCeUlkQW5kTGFuZ3VhZ2VUeXBlKDE1MilcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy91aU5vZGUvY3VycmVudFN0ZXBOdW1MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRleHRDb25maWcuZ2V0Rm9ybWF0ZWRTdHJpbmcoMTU0LFswXSlcbiAgICB9LFxuXG4gICAgc3RhcnQgKCkge1xuICAgICAgICB0aGlzLm5vZGUub24oXCJ0b3VjaHN0YXJ0XCIsdGhpcy5vblRvdWNoU3RhcnQsdGhpcylcbiAgICAgICAgdGhpcy5ub2RlLm9uKFwidG91Y2htb3ZlXCIsdGhpcy5vblRvdWNoTW92ZSx0aGlzKVxuICAgICAgICB0aGlzLm5vZGUub24oXCJ0b3VjaGVuZFwiLHRoaXMub25Ub3VjaEVuZCx0aGlzKVxuICAgICAgICAvL3RoaXMuZ2VuZXJhdGVXYWxscygpXG4gICAgICAgIHZhciBidWxsZXRzTm9kZSA9IGNjLmZpbmQoXCJDYW52YXMvYnVsbGV0c1wiKVxuICAgICAgICB0aGlzLmJ1bGxldHMgPSBidWxsZXRzTm9kZS5jaGlsZHJlblxuICAgICAgICB0aGlzLnBsYXllckRhdGEgPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhXG5cbiAgICAgICAgdGhpcy5tYXhIZWFydCA9IHRoaXMucGxheWVyRGF0YS5tYXhIZWFydFxuICAgICAgICBpZiAodGhpcy5sZXZlbCA9PSB0aGlzLnBsYXllckRhdGEuY3VycmVudExldmVsKSB7XG4gICAgICAgICAgICB0aGlzLmhlYXJ0Rm9yUmV0cnlDb3N0ID0gcmVxdWlyZShcImxldmVsQ29uZmlnXCIpW3RoaXMucGxheWVyRGF0YS5jdXJyZW50TGV2ZWwudG9TdHJpbmcoKV0uaGVhcnRGb3JSZXRyeUNvc3RcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGVhcnRGb3JSZXRyeUNvc3QgPSAwXG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdGhpcy5oZWFydCA9IHRoaXMucGxheWVyRGF0YS5oZWFydFxuICAgICAgICByZXF1aXJlKFwibmV0d29ya01nclwiKS5kZWxlZ2F0ZSA9IHRoaXNcbiAgICAgICAgdmFyIHdhbGxzTm9kZSA9IGNjLmZpbmQoXCJDYW52YXMvd2FsbHNcIilcbiAgICAgICAgdGhpcy53YWxscyA9IHdhbGxzTm9kZS5jaGlsZHJlblxuICAgICAgICB0aGlzLnRhcmdldHNOdW0gPSBjYy5maW5kKFwiQ2FudmFzL3RhcmdldHNcIikuY2hpbGRyZW4ubGVuZ3RoXG5cbiAgICAgICAgdmFyIGdyYXBoaWMgPSBjYy5maW5kKFwiQ2FudmFzL2ZpbGxOb2Rlc1wiKS5nZXRDb21wb25lbnQoY2MuR3JhcGhpY3MpXG4gICAgICAgIHZhciBzdGFydFBvaW50ID0gbnVsbFxuICAgICAgICB2YXIgcG9pbnROb2RlcyA9IGNjLmZpbmQoXCJDYW52YXMvZmlsbE5vZGVzXCIpLmNoaWxkcmVuXG4gICAgICAgIGlmIChwb2ludE5vZGVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBwb2ludE5vZGVzKSB7XG4gICAgICAgICAgICB2YXIgcG9pbnQgPSBwb2ludE5vZGVzW2luZGV4XVxuICAgICAgICAgICAgaWYgKHN0YXJ0UG9pbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGdyYXBoaWMubW92ZVRvKHBvaW50LngsIHBvaW50LnkpXG4gICAgICAgICAgICAgICAgc3RhcnRQb2ludCA9IHBvaW50XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGdyYXBoaWMubGluZVRvKHBvaW50LngsIHBvaW50LnkpXG4gICAgICAgIH1cbiAgICAgICAgZ3JhcGhpYy5jbG9zZSgpXG4gICAgICAgIGdyYXBoaWMuc3Ryb2tlKClcbiAgICAgICAgZ3JhcGhpYy5maWxsKClcblxuICAgICAgICB2YXIgbWluU3RlcE51bUxhYmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidWlOb2RlXCIpLmdldENoaWxkQnlOYW1lKFwibWluU3RlcE51bUxhYmVsXCIpXG4gICAgICAgIHZhciBtaW5TdGVwS2V5ID0gXCJtaW5TdGVwX2xldmVsX1wiICsgdGhpcy5sZXZlbC50b1N0cmluZygpXG4gICAgICAgIHZhciBtaW5TdGVwTnVtID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5taW5TdGVwc1ttaW5TdGVwS2V5XVxuICAgICAgICBpZiAobWluU3RlcE51bSA9PSBudWxsIHx8IG1pblN0ZXBOdW0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBtaW5TdGVwTnVtID0gcmVxdWlyZShcInRleHRDb25maWdcIikuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTU1KVxuICAgICAgICB9XG4gICAgICAgIG1pblN0ZXBOdW1MYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJlcXVpcmUoXCJ0ZXh0Q29uZmlnXCIpLmdldEZvcm1hdGVkU3RyaW5nKDE1MyxbbWluU3RlcE51bS50b1N0cmluZygpXSlcblxuICAgICAgICBpZiAocmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5pc0d1aWxkZWQgPT0gMCkge1xuICAgICAgICAgICAgdmFyIGd1aWxkTm9kZSA9IGNjLmluc3RhbnRpYXRlKHJlcXVpcmUoXCJyZXNNZ3JcIikucmVzZXNbXCJndWlsZE5vZGVQcmVmYWJcIl0pXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoZ3VpbGROb2RlKVxuICAgICAgICB9IFxuICAgICAgICAvLyB2YXIgZ3VpbGROb2RlID0gY2MuaW5zdGFudGlhdGUocmVxdWlyZShcInJlc01nclwiKS5yZXNlc1tcImd1aWxkTm9kZVByZWZhYlwiXSlcbiAgICAgICAgLy8gdGhpcy5ub2RlLmFkZENoaWxkKGd1aWxkTm9kZSlcbiAgICAgICAgLy8gZm9yICh2YXIgaW5kZXggaW4gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnVsbGV0c1wiKS5jaGlsZHJlbikge1xuICAgICAgICAvLyAgICAgdmFyIG9uZUVsZW1lbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidWxsZXRzXCIpLmNoaWxkcmVuW2luZGV4XVxuICAgICAgICAvLyAgICAgY2MubG9nKG9uZUVsZW1lbnQud2lkdGgsIG9uZUVsZW1lbnQuaGVpZ2h0KVxuICAgICAgICAvLyB9XG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxuICAgIHBsYXlCZ20oKSB7XG4gICAgICAgIHZhciBsZXZlbENvbmZpZyA9IHJlcXVpcmUoXCJsZXZlbENvbmZpZ1wiKVxuICAgICAgICB2YXIgYmdtUGF0aCA9IGxldmVsQ29uZmlnW3RoaXMubGV2ZWxdLmJnbVBhdGhcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoYmdtUGF0aCxmdW5jdGlvbihlcnIscmVzKXtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKVxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheShyZXMpXG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIG9uVG91Y2hTdGFydChldmVudCl7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uVHJ5dG8gPSBudWxsXG4gICAgICAgIHRoaXMuZmxhZyA9IHRydWVcbiAgICB9LFxuXG4gICAgb25Ub3VjaE1vdmUoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZmxhZyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0YXJ0TG9jYXRpb24gPSBldmVudC5nZXRTdGFydExvY2F0aW9uKClcbiAgICAgICAgdmFyIHRtcERpcmVjdGlvbiA9IGNjLnYyKGV2ZW50LmdldExvY2F0aW9uWCgpIC0gc3RhcnRMb2NhdGlvbi54LCBldmVudC5nZXRMb2NhdGlvblkoKSAtIHN0YXJ0TG9jYXRpb24ueSlcbiAgICAgICAgdmFyIGRpcyA9IHRtcERpcmVjdGlvbi5tYWcoKVxuICAgICAgICBpZiAoZGlzIDwgdGhpcy5taW5EaXMpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IHRoaXMuZ2V0UG9zc2lhYmxlRGlyZWN0aW9uKHRtcERpcmVjdGlvbilcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZsYWcgPSBmYWxzZVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb25Ucnl0byA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25Ucnl0byA9IGRpcmVjdGlvblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmZsYWcgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5tb3ZlQnVsbGV0cyh0aGlzLmRpcmVjdGlvblRyeXRvKVxuICAgICAgICB9XG4gICAgfSxcbiAgICBvblRvdWNoRW5kKGV2ZW50KSB7XG5cbiAgICB9LFxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLm5vZGUub2ZmKFwidG91Y2hzdGFydFwiLHRoaXMub25Ub3VjaFN0YXJ0LHRoaXMpXG4gICAgICAgIHRoaXMubm9kZS5vZmYoXCJ0b3VjaG1vdmVcIix0aGlzLm9uVG91Y2hNb3ZlLHRoaXMpXG4gICAgICAgIHRoaXMubm9kZS5vZmYoXCJ0b3VjaGVuZFwiLHRoaXMub25Ub3VjaEVuZCx0aGlzKVxuICAgIH0sXG5cbiAgICBnZXRQb3NzaWFibGVEaXJlY3Rpb24oZGVsdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQb3NzaWFibGVXaXRoR2l2ZW5EaXJlY3Rpb24oZGVsdGEsY2MudjIoMSwwKSkgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNjLnYyKDEsMCkgLy9yaWdodFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNQb3NzaWFibGVXaXRoR2l2ZW5EaXJlY3Rpb24oZGVsdGEsY2MudjIoMCwtMSkpID09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiBjYy52MigwLC0xKSAvL2Rvd25cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzUG9zc2lhYmxlV2l0aEdpdmVuRGlyZWN0aW9uKGRlbHRhLGNjLnYyKC0xLDApKSA9PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gY2MudjIoLTEsMCkgLy9sZWZ0XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc1Bvc3NpYWJsZVdpdGhHaXZlbkRpcmVjdGlvbihkZWx0YSxjYy52MigwLDEpKSA9PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gY2MudjIoMCwxKSAvL3VwXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gLTEgLy9ubyBkaXJlY3Rpb24gbWF0Y2hcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgaXNQb3NzaWFibGVXaXRoR2l2ZW5EaXJlY3Rpb24oZGVsdGEsZ2l2ZW5EaXJlY3Rpb24pIHtcbiAgICAgICAgdmFyIGFuZ2xlID0gZGVsdGEuc2lnbkFuZ2xlKGdpdmVuRGlyZWN0aW9uKVxuICAgICAgICB2YXIgZGVncmVlID0gYW5nbGUgLyBNYXRoLlBJICogMTgwXG4gICAgICAgIGlmIChNYXRoLmFicyhkZWdyZWUpIDw9IHRoaXMubWF4T2Zmc2V0RGVncmVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIG1vdmVCdWxsZXRzKGRpcmVjdGlvbikge1xuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiB0aGlzLmJ1bGxldHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1bGxldHNbaW5kZXhdLmdldENvbXBvbmVudChcImJ1bGxldE1nclwiKS5zdGF0dXMgIT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBzaGFkb3dzID0gW11cbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gdGhpcy5idWxsZXRzKSB7XG4gICAgICAgICAgICB2YXIgYnVsbGV0ID0gdGhpcy5idWxsZXRzW2luZGV4XVxuICAgICAgICAgICAgdmFyIGJ1bGxldE1nciA9IGJ1bGxldC5nZXRDb21wb25lbnQoXCJidWxsZXRNZ3JcIilcbiAgICAgICAgICAgIHZhciBuZWFyZXN0V2FsbEluZm8gPSBidWxsZXRNZ3IuZ2V0TmVhcmVzdFdhbGxJbmZvKGRpcmVjdGlvbilcbiAgICAgICAgICAgIHZhciBzaGFkb3dOb2RlID0ge1xuICAgICAgICAgICAgICAgIHg6IG5lYXJlc3RXYWxsSW5mby5zdWl0YWJsZVBvc2l0aW9uLngsXG4gICAgICAgICAgICAgICAgeTogbmVhcmVzdFdhbGxJbmZvLnN1aXRhYmxlUG9zaXRpb24ueSxcbiAgICAgICAgICAgICAgICB3aWR0aDogYnVsbGV0LndpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogYnVsbGV0LmhlaWdodCxcbiAgICAgICAgICAgICAgICBkaXM6IG5lYXJlc3RXYWxsSW5mby5kaXMsXG4gICAgICAgICAgICAgICAgb3JpZ2luTm9kZTogYnVsbGV0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaGFkb3dzLnB1c2goc2hhZG93Tm9kZSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcmVzb2x2ZSBzaGFkb3dzXG4gICAgICAgIHZhciBtYXhUcnlUaW1lID0gMTAwXG4gICAgICAgIHdoaWxlKHRoaXMucmVzb2x2ZVNoYWRvd3Moc2hhZG93cyxkaXJlY3Rpb24pID09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAobWF4VHJ5VGltZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKFwiQ0FOJ1QgRklORCBBIFNVSVRBQkxFIFBPU0lUSU9OXCIpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1heFRyeVRpbWUgLT0gMVxuICAgICAgICB9XG4gICAgICAgIHZhciB3aWxsQWRkU3RlcE51bSA9IGZhbHNlXG4gICAgICAgIGZvciAodmFyIGluZGV4IGluIHNoYWRvd3MpIHtcbiAgICAgICAgICAgIHZhciBzaGFkb3dOb2RlID0gc2hhZG93c1tpbmRleF1cbiAgICAgICAgICAgIHZhciBvcmlnaW5Ob2RlID0gc2hhZG93Tm9kZS5vcmlnaW5Ob2RlXG4gICAgICAgICAgICBpZiAodGhpcy5oZWxwZXIuaXNUd29Qb3NpdGlvblNpbWlsYXJFcXVhbChjYy52MihzaGFkb3dOb2RlLngsc2hhZG93Tm9kZS55KSxjYy52MihvcmlnaW5Ob2RlLngsIG9yaWdpbk5vZGUueSkpID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgYnVsbGV0TWdyID0gb3JpZ2luTm9kZS5nZXRDb21wb25lbnQoXCJidWxsZXRNZ3JcIilcbiAgICAgICAgICAgIGJ1bGxldE1nci50YXJnZXRQb3NpdGlvbiA9IGNjLnYyKHNoYWRvd05vZGUueCwgc2hhZG93Tm9kZS55KVxuICAgICAgICAgICAgYnVsbGV0TWdyLm1vdmluZ0RpcmVjdGlvbiA9IGRpcmVjdGlvblxuICAgICAgICAgICAgXG4gICAgICAgICAgICBidWxsZXRNZ3IubW92aW5nRGlyZWN0aW9uLm5vcm1hbGl6ZVNlbGYoKVxuICAgICAgICAgICAgaWYgKGJ1bGxldE1nci5tb3ZpbmdUaW1lICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGlzID0gY2MudjIoYnVsbGV0TWdyLnRhcmdldFBvc2l0aW9uLnggLSBvcmlnaW5Ob2RlLngsIGJ1bGxldE1nci50YXJnZXRQb3NpdGlvbi55IC0gb3JpZ2luTm9kZS55KS5tYWcoKVxuICAgICAgICAgICAgICAgIHZhciB2ID0gZGlzIC8gYnVsbGV0TWdyLm1vdmluZ1RpbWVcblxuICAgICAgICAgICAgICAgIGJ1bGxldE1nci52eCA9IHYgKiBidWxsZXRNZ3IubW92aW5nRGlyZWN0aW9uLnhcbiAgICAgICAgICAgICAgICBidWxsZXRNZ3IudnkgPSB2ICogYnVsbGV0TWdyLm1vdmluZ0RpcmVjdGlvbi55XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBidWxsZXRNZ3IudnggPSBidWxsZXRNZ3IubW92aW5nRGlyZWN0aW9uLnggKiBidWxsZXRNZ3IubW92aW5nU3BlZWRcbiAgICAgICAgICAgICAgICBidWxsZXRNZ3IudnkgPSBidWxsZXRNZ3IubW92aW5nRGlyZWN0aW9uLnkgKiBidWxsZXRNZ3IubW92aW5nU3BlZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ1bGxldE1nci5zdGF0dXMgPSAxXG4gICAgICAgICAgICBpZiAodGhpcy5pc01vdmVkICE9IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzTW92ZWQgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAod2lsbEFkZFN0ZXBOdW0gPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB3aWxsQWRkU3RlcE51bSA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAod2lsbEFkZFN0ZXBOdW0gPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RlcE51bSArPSAxXG4gICAgICAgICAgICBpZiAodGhpcy5zb3VuZEVmZmVjdCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnNvdW5kRWZmZWN0KVxuICAgICAgICAgICAgICAgIH0sMC4zKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uU3VjY2VzcygpIHtcbiAgICAgICAgdGhpcy5yZXRyeUJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZVxuICAgICAgICAvLyBpZiAodGhpcy5sZXZlbCAhPSB0aGlzLnBsYXllckRhdGEuY3VycmVudExldmVsKSB7XG4gICAgICAgIC8vICAgICAvLyBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJtYWluU2NlbmVcIilcbiAgICAgICAgLy8gICAgIHJlcXVpcmUoXCJnYW1lTWdyXCIpLmFuaW1hdGVkVG9TY2VuZShcIm1haW5TY2VuZVwiKVxuICAgICAgICAvLyAgICAgcmV0dXJuXG4gICAgICAgIC8vIH1cblxuICAgICAgICB2YXIgbGV2ZWxzID0gcmVxdWlyZShcInNlY3Rpb25Db25maWdcIilbdGhpcy5wbGF5ZXJEYXRhLmN1cnJlbnRTZWN0aW9uXS5sZXZlbHNcbiAgICAgICAgdmFyIGluZGV4ID0gbGV2ZWxzLmluZGV4T2YodGhpcy5wbGF5ZXJEYXRhLmN1cnJlbnRMZXZlbClcbiAgICAgICAgdmFyIG5ld0xldmVsID0gbnVsbFxuICAgICAgICB2YXIgbmV3U2VjdGlvbiA9IG51bGxcbiAgICAgICAgdmFyIGNvbW1pdEJvZHkgPSBudWxsXG4gICAgICAgIGlmIChpbmRleCA8IGxldmVscy5sZW5ndGggLTEpIHtcbiAgICAgICAgICAgIGluZGV4ICs9IDFcbiAgICAgICAgICAgIG5ld0xldmVsID0gbGV2ZWxzW2luZGV4XVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbmV3U2VjdGlvbiA9IHRoaXMucGxheWVyRGF0YS5jdXJyZW50U2VjdGlvbiArIDFcbiAgICAgICAgICAgIHZhciBuZXdMZXZlbHMgPSByZXF1aXJlKFwic2VjdGlvbkNvbmZpZ1wiKVtuZXdTZWN0aW9uXS5sZXZlbHNcbiAgICAgICAgICAgIG5ld0xldmVsID0gbmV3TGV2ZWxzWzBdXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChuZXdTZWN0aW9uID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbW1pdEJvZHkgPSB7XG4gICAgICAgICAgICAgICAgY3VycmVudExldmVsOiBuZXdMZXZlbCwgXG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29tbWl0Qm9keSA9IHtcbiAgICAgICAgICAgICAgICBjdXJyZW50U2VjdGlvbjogbmV3U2VjdGlvbixcbiAgICAgICAgICAgICAgICBjdXJyZW50TGV2ZWw6IG5ld0xldmVsLCAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGV2ZWwgPT0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5jdXJyZW50TGV2ZWwpIHtcbiAgICAgICAgICAgIGNvbW1pdEJvZHkucGh5c2ljYWxQb3dlckNvc3RlZEZsYWcgPSAwXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuaXNHdWlsZGVkID09IDApIHtcbiAgICAgICAgICAgIGNvbW1pdEJvZHkuaXNHdWlsZGVkID0gMVxuICAgICAgICB9XG4gICAgICAgIHZhciBtaW5TdGVwS2V5ID0gXCJtaW5TdGVwX2xldmVsX1wiICsgdGhpcy5sZXZlbC50b1N0cmluZygpXG4gICAgICAgIHZhciBtaW5TdGVwTnVtID0gcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5taW5TdGVwc1ttaW5TdGVwS2V5XVxuXG4gICAgICAgIGlmIChtaW5TdGVwTnVtID09IG51bGwgfHwgbWluU3RlcE51bSA9PSB1bmRlZmluZWQgfHwgdGhpcy5jdXJyZW50U3RlcE51bSA8IG1pblN0ZXBOdW0pIHtcbiAgICAgICAgICAgIGNvbW1pdEJvZHkubWluU3RlcHMgPSB7fVxuICAgICAgICAgICAgY29tbWl0Qm9keS5taW5TdGVwc1ttaW5TdGVwS2V5XSA9IHRoaXMuY3VycmVudFN0ZXBOdW1cbiAgICAgICAgfVxuICAgICAgICBjb21taXRCb2R5LnByZUxldmVsID0gdGhpcy5sZXZlbFxuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgdmFyIHN1Y2Nlc3NDYWxsQmFjayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZiAobmV3U2VjdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5wbGF5ZXJEYXRhLmN1cnJlbnRTZWN0aW9uID0gbmV3U2VjdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbW1pdEJvZHkubWluU3RlcHMgIT0gbnVsbCAmJiBjb21taXRCb2R5Lm1pblN0ZXBzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEubWluU3RlcHNbbWluU3RlcEtleV0gPSBzZWxmLmN1cnJlbnRTdGVwTnVtXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29tbWl0Qm9keS5pc0d1aWxkZWQgPT0gMSkge1xuICAgICAgICAgICAgICAgIHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGEuaXNHdWlsZGVkID0gMVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5wbGF5ZXJEYXRhLmN1cnJlbnRMZXZlbCA9IG5ld0xldmVsXG4gICAgICAgICAgICBzZWxmLnBsYXllckRhdGEucGh5c2ljYWxQb3dlckNvc3RlZEZsYWcgPSAwXG4gICAgICAgICAgICBzZWxmLnBsYXllckRhdGEucHJlTGV2ZWwgPSBzZWxmLmxldmVsXG4gICAgICAgICAgICByZXF1aXJlKFwiZ2FtZU1nclwiKS5hbmltYXRlZFRvU2NlbmUoXCJtYWluU2NlbmVcIilcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgICAgICByZXF1aXJlKFwiZGF0YU1nclwiKS5jb21taXRQbGF5ZXJEYXRhVG9TZXJ2ZXIoY29tbWl0Qm9keSxzdWNjZXNzQ2FsbEJhY2spXG4gICAgICAgIFxuICAgIH0sXG5cbiAgICByZXNvbHZlU2hhZG93cyhzaGFkb3dzLGRpcmVjdGlvbikge1xuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBzaGFkb3dzKSB7XG4gICAgICAgICAgICB2YXIgb25lU2hhZG93ID0gc2hhZG93c1tpbmRleF1cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gc2hhZG93cykge1xuICAgICAgICAgICAgICAgIHZhciBhbm90aGVyU2hhZG93ID0gc2hhZG93c1tpXVxuICAgICAgICAgICAgICAgIGlmIChvbmVTaGFkb3cgPT0gYW5vdGhlclNoYWRvdykge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciB0ZXN0UmVzdWx0ID0gdGhpcy5fc2VsZWN0U3RhdGljU2hhZG93QW5kU2hhb2R3Rm9yUmVzb2x2ZWQob25lU2hhZG93LGFub3RoZXJTaGFkb3csZGlyZWN0aW9uKVxuICAgICAgICAgICAgICAgIGlmICh0ZXN0UmVzdWx0ICE9IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGF0aWNTaGFkb3cgPSB0ZXN0UmVzdWx0LnN0YXRpY1NoYWRvd1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcFNoYWRvdyA9IHRlc3RSZXN1bHQuc2hhZG93Rm9yUmVzb2x2ZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKFwic3RhdGljOiBcIiArIHN0YXRpY1NoYWRvdy5vcmlnaW5Ob2RlLm5hbWUsIFwidGVtcDogXCIgKyB0ZW1wU2hhZG93Lm9yaWdpbk5vZGUubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXRpY0JvcmRlckxpbmVzID0gdGhpcy5oZWxwZXIuZ2V0TGluZXNPZk9uZU5vZGUoc3RhdGljU2hhZG93KVxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdGljTGluZSA9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJheSA9IHRoaXMuaGVscGVyLm1ha2VSYXkoY2MudjIoc3RhdGljU2hhZG93Lngsc3RhdGljU2hhZG93LnkpLDEwMDAsY2MudjIoLWRpcmVjdGlvbi54LC1kaXJlY3Rpb24ueSkpXG5cbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBrIGluIHN0YXRpY0JvcmRlckxpbmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGluZSA9IHN0YXRpY0JvcmRlckxpbmVzW2tdXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlzID0gdGhpcy5oZWxwZXIucmF5VGVzdChyYXksbGluZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXMgIT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNMaW5lID0gbGluZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1BvaW50MiA9IHRoaXMuaGVscGVyLm1ha2VSYXkoc3RhdGljTGluZS5wMiwxMDAwLGNjLnYyKHN0YXRpY0xpbmUucDIueCAtIHN0YXRpY0xpbmUucDEueCwgc3RhdGljTGluZS5wMi55IC0gc3RhdGljTGluZS5wMS55KSkucDJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1BvaW50MSA9IHRoaXMuaGVscGVyLm1ha2VSYXkoc3RhdGljTGluZS5wMSwxMDAwLGNjLnYyKHN0YXRpY0xpbmUucDEueCAtIHN0YXRpY0xpbmUucDIueCwgc3RhdGljTGluZS5wMS55IC0gc3RhdGljTGluZS5wMi55KSkucDJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljTGluZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHAxOiBuZXdQb2ludDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBwMjogbmV3UG9pbnQyXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJheTEgPSB0aGlzLmhlbHBlci5tYWtlUmF5KHRlbXBTaGFkb3cub3JpZ2luTm9kZS5wb3NpdGlvbiwzMDAwLGRpcmVjdGlvbilcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnREaXN0YW5jZSA9IHRoaXMuaGVscGVyLnJheVRlc3QocmF5MSxzdGF0aWNMaW5lKVxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0RGlzID0gdGhpcy5oZWxwZXIuZ2V0RGlzVG9TZWxmQm9yZGVyKHRlbXBTaGFkb3cub3JpZ2luTm9kZSxkaXJlY3Rpb24pICsgdGVtcFNoYWRvdy5vcmlnaW5Ob2RlLmdldENvbXBvbmVudChcImJ1bGxldE1nclwiKS5kaXNGcm9tQm9yZGVyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWl0YWJsZVBvc2l0aW9uID0gdGhpcy5oZWxwZXIuZ2V0U3VpdGFibGVQb2ludCh0ZW1wU2hhZG93Lm9yaWdpbk5vZGUucG9zaXRpb24sY3VycmVudERpc3RhbmNlLHRhcmdldERpcyxkaXJlY3Rpb24pXG4gICAgICAgICAgICAgICAgICAgIHZhciB1cGRhdGVkRGlzID0gY2MudjIoc3VpdGFibGVQb3NpdGlvbi54IC0gdGVtcFNoYWRvdy5vcmlnaW5Ob2RlLngsIHN1aXRhYmxlUG9zaXRpb24ueSAtIHRlbXBTaGFkb3cub3JpZ2luTm9kZS55KS5tYWcoKVxuICAgICAgICAgICAgICAgICAgICB0ZW1wU2hhZG93LnggPSBzdWl0YWJsZVBvc2l0aW9uLnhcbiAgICAgICAgICAgICAgICAgICAgdGVtcFNoYWRvdy55ID0gc3VpdGFibGVQb3NpdGlvbi55XG4gICAgICAgICAgICAgICAgICAgIHRlbXBTaGFkb3cuZGlzID0gdXBkYXRlZERpc1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH0sXG4gICAgX3NlbGVjdFN0YXRpY1NoYWRvd0FuZFNoYW9kd0ZvclJlc29sdmVkKHNoYWRvdzEsIHNoYWRvdzIsIGRpcmVjdGlvbikge1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICB2YXIgdGVtcCA9IGZ1bmN0aW9uKHMxLCBzMikge1xuICAgICAgICAgICAgdmFyIGRpcyA9IHMxLmRpc1xuICAgICAgICAgICAgdmFyIG9yaWdpbkNyb3NzRmxhZyA9IGZhbHNlXG4gICAgICAgICAgICB2YXIgc2hhZG93Q3Jvc3NGbGFnID0gZmFsc2VcblxuICAgICAgICAgICAgdmFyIG9yaWdpbkxpbmVzID0gc2VsZi5oZWxwZXIuZ2V0TGluZXNPZk9uZU5vZGUoczIpXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gb3JpZ2luTGluZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgb25lTGluZSA9IG9yaWdpbkxpbmVzW2tleV1cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5oZWxwZXIuaXNPbmVOb2RlV2lsbENvbGxpZFdpdGhPbmVMaW5lSW5EaXJlY3Rpb24oczEub3JpZ2luTm9kZSxvbmVMaW5lLGRpcmVjdGlvbixkaXMpICE9IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbkNyb3NzRmxhZyA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcmlnaW5Dcm9zc0ZsYWcgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHNoYWRvd0xpbmVzID0gc2VsZi5oZWxwZXIuZ2V0TGluZXNPZk9uZU5vZGUoczIub3JpZ2luTm9kZSlcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBzaGFkb3dMaW5lcykge1xuICAgICAgICAgICAgICAgIHZhciBvbmVMaW5lID0gc2hhZG93TGluZXNba2V5XVxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmhlbHBlci5pc09uZU5vZGVXaWxsQ29sbGlkV2l0aE9uZUxpbmVJbkRpcmVjdGlvbihzMS5vcmlnaW5Ob2RlLG9uZUxpbmUsZGlyZWN0aW9uLGRpcykgIT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hhZG93Q3Jvc3NGbGFnID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNoYWRvd0Nyb3NzRmxhZyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRlbXAoc2hhZG93MSxzaGFkb3cyKSA9PSB0cnVlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgIHN0YXRpY1NoYWRvdzogc2hhZG93MixcbiAgICAgICAgICAgICAgICBzaGFkb3dGb3JSZXNvbHZlZDogc2hhZG93MVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRlbXAoc2hhZG93MixzaGFkb3cxKSA9PSB0cnVlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgIHN0YXRpY1NoYWRvdzogc2hhZG93MSxcbiAgICAgICAgICAgICAgICBzaGFkb3dGb3JSZXNvbHZlZDogc2hhZG93MlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVdhbGxzKCkge1xuICAgICAgICB2YXIgbGV2ZWxDb25maWcgPSByZXF1aXJlKFwibGV2ZWxDb25maWdcIilcbiAgICAgICAgdmFyIGN1cnJlbnRMZXZlbCA9IHRoaXMubGV2ZWxcblxuICAgICAgICB2YXIgY29uZmlnID0gbGV2ZWxDb25maWdbY3VycmVudExldmVsXVxuICAgICAgICB2YXIgd2FsbHNOb2RlID0gY2MuZmluZChcIkNhbnZhcy93YWxsc1wiKVxuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBjb25maWcud2FsbFBhdGhlcykge1xuICAgICAgICAgICAgdmFyIG9uZVBhdGggPSBjb25maWcud2FsbFBhdGhlc1tpbmRleF1cblxuICAgICAgICAgICAgdmFyIHBvaW50cyA9IG9uZVBhdGgucG9pbnRzXG4gICAgICAgICAgICB2YXIgcmVhbFBvaW50cyA9IFtdXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHBvaW50cykge1xuICAgICAgICAgICAgICAgIHZhciByZWFsUG9pbnQgPSBudWxsXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZWFsUG9pbnQgPSBjYy52Mihwb2ludHNbaV0ueCwgcG9pbnRzW2ldLnkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudFBvaW50ID0gcG9pbnRzW2ldXG4gICAgICAgICAgICAgICAgICAgIHJlYWxQb2ludCA9IGNjLnYyKHJlYWxQb2ludHNbaSAtIDFdLnggKyBjdXJyZW50UG9pbnQueCwgcmVhbFBvaW50c1tpIC0gMV0ueSArIGN1cnJlbnRQb2ludC55KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZWFsUG9pbnRzLnB1c2gocmVhbFBvaW50KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGxpbmVXaWR0aCA9IG9uZVBhdGgubGluZVdpZHRoXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gb25lUGF0aC5vZmZzZXRcbiAgICAgICAgICAgIHZhciB3YWxsTm9kZXMgPSBbXVxuICAgICAgICAgICAgdmFyIGlzQ2xvc2VkID0gb25lUGF0aC5pc0Nsb3NlZFxuICAgICAgICAgICAgaWYgKGlzQ2xvc2VkID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnRQb2ludCA9IHJlYWxQb2ludHNbMF1cbiAgICAgICAgICAgICAgICByZWFsUG9pbnRzLnB1c2goc3RhcnRQb2ludClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcmVhbFBvaW50cykge1xuICAgICAgICAgICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmxpbmVQcmVmYWIpXG4gICAgICAgICAgICAgICAgbm9kZS5oZWlnaHQgPSBsaW5lV2lkdGhcbiAgICAgICAgICAgICAgICB2YXIgZGlyZWN0ZWRMaW5lID0gY2MudjIocmVhbFBvaW50c1tpXS54IC0gcmVhbFBvaW50c1tpIC0gMV0ueCwgcmVhbFBvaW50c1tpXS55IC0gcmVhbFBvaW50c1tpIC0gMV0ueSlcbiAgICAgICAgICAgICAgICBub2RlLndpZHRoID0gZGlyZWN0ZWRMaW5lLm1hZygpXG4gICAgXG4gICAgICAgICAgICAgICAgdmFyIGRlZ3JlZSA9IGRpcmVjdGVkTGluZS5zaWduQW5nbGUoY2MudjIoMSwwKSkgLyBNYXRoLlBJICogMTgwXG4gICAgICAgICAgICAgICAgbm9kZS5hbmdsZSA9IC1kZWdyZWVcbiAgICAgICAgICAgICAgICBub2RlLnggPSByZWFsUG9pbnRzW2ldLnggLSBkaXJlY3RlZExpbmUueCAvIDJcbiAgICAgICAgICAgICAgICBub2RlLnkgPSByZWFsUG9pbnRzW2ldLnkgLSBkaXJlY3RlZExpbmUueSAvIDJcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0RGlyZWN0aW9uID0gZGlyZWN0ZWRMaW5lLnJvdGF0ZShNYXRoLlBJIC8gMilcbiAgICAgICAgICAgICAgICBvZmZzZXREaXJlY3Rpb24ubm9ybWFsaXplU2VsZigpXG4gICAgICAgICAgICAgICAgbm9kZS54ICs9IG5vZGUuaGVpZ2h0IC8gMiAqIG9mZnNldERpcmVjdGlvbi54XG4gICAgICAgICAgICAgICAgbm9kZS55ICs9IG5vZGUuaGVpZ2h0IC8gMiAqIG9mZnNldERpcmVjdGlvbi55XG5cbiAgICAgICAgICAgICAgICBub2RlLnggKz0gb2Zmc2V0LnhcbiAgICAgICAgICAgICAgICBub2RlLnkgKz0gb2Zmc2V0LnlcbiAgICAgICAgICAgICAgICB3YWxsTm9kZXMucHVzaChub2RlKVxuICAgICAgICAgICAgICAgIHdhbGxzTm9kZS5hZGRDaGlsZChub2RlKSAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBidWxsZXRDb25maWcgPSBjb25maWcuYnVsbGV0c1xuICAgICAgICB2YXIgYnVsbGV0c05vZGUgPSBjYy5maW5kKFwiQ2FudmFzL2J1bGxldHNcIilcbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gYnVsbGV0Q29uZmlnKSB7XG4gICAgICAgICAgICB2YXIgY29uID0gYnVsbGV0Q29uZmlnW2luZGV4XVxuICAgICAgICAgICAgdmFyIGJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYnVsbGV0UHJlZmFiKVxuICAgICAgICAgICAgYnVsbGV0LnggPSBjb24ueFxuICAgICAgICAgICAgYnVsbGV0LnkgPSBjb24ueVxuICAgICAgICAgICAgYnVsbGV0LndpZHRoID0gYnVsbGV0LndpZHRoICogY29uLnNjYWxlXG4gICAgICAgICAgICBidWxsZXQuaGVpZ2h0ID0gYnVsbGV0LmhlaWdodCAqIGNvbi5zY2FsZVxuICAgICAgICAgICAgYnVsbGV0c05vZGUuYWRkQ2hpbGQoYnVsbGV0KVxuICAgICAgICB9IFxuICAgIH0sXG5cblxuICAgIG9uQ2xpY2tSZXRyeUJ1dHRvbigpIHtcbiAgICAgICAgdmFyIGdhbWVNZ3IgPSByZXF1aXJlKFwiZ2FtZU1nclwiKVxuICAgICAgICBpZiAodGhpcy5oZWFydEZvclJldHJ5Q29zdCA9PSAwKSB7XG4gICAgICAgICAgICBnYW1lTWdyLmVudGVyTGV2ZWxTY2VuZSh0aGlzLmxldmVsKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRlbXAgPSB0aGlzLnBsYXllckRhdGEuaGVhcnQgLSB0aGlzLmhlYXJ0Rm9yUmV0cnlDb3N0XG4gICAgICAgIGlmICh0ZW1wIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY29tbWl0Qm9keSA9IHtcbiAgICAgICAgICAgIGhlYXJ0OiB0ZW1wXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgIHZhciBzdWNjZXNzQ2FsbEJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYucGxheWVyRGF0YS5oZWFydCA9IHRlbXBcbiAgICAgICAgICAgIC8vIHNlbGYuaGVhcnQgPSB0ZW1wXG4gICAgICAgICAgICBnYW1lTWdyLmVudGVyTGV2ZWxTY2VuZShzZWxmLmxldmVsKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmV0cnlCdXR0b24uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2VcbiAgICAgICAgcmVxdWlyZShcImRhdGFNZ3JcIikuY29tbWl0UGxheWVyRGF0YVRvU2VydmVyKGNvbW1pdEJvZHksc3VjY2Vzc0NhbGxCYWNrKVxuICAgIH0sXG4gICAgb25BbGxSZXRyeUZhaWxlZCgpIHtcbiAgICAgICAgdGhpcy5yZXRyeUJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlXG4gICAgfSxcblxuICAgIG9uQ2xpY2tCYWNrQnV0dG9uKCkge1xuICAgICAgICAvLyBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJtYWluU2NlbmVcIilcbiAgICAgICAgcmVxdWlyZShcImdhbWVNZ3JcIikuYW5pbWF0ZWRUb1NjZW5lKFwibWFpblNjZW5lXCIpXG4gICAgfSxcblxuICAgIHNldHVwTm9kZXNCeUNvbmZpZygpIHtcbiAgICAgICAgdmFyIHdhbGxQcmVmYWIgPSByZXF1aXJlKFwicmVzTWdyXCIpLnJlc2VzW1wid2FsbFByZWZhYlwiXVxuICAgICAgICB2YXIgYnVsbGV0UHJlZmFiID0gcmVxdWlyZShcInJlc01nclwiKS5yZXNlc1tcImJ1bGxldFByZWZhYlwiXVxuICAgICAgICB2YXIgdGFyZ2V0UHJlZmFiID0gcmVxdWlyZShcInJlc01nclwiKS5yZXNlc1tcInRhcmdldFByZWZhYlwiXVxuICAgICAgICB2YXIgcGF0aFdheVByZWZhYiA9IHJlcXVpcmUoXCJyZXNNZ3JcIikucmVzZXNbXCJwYXRoV2F5UHJlZmFiXCJdXG4gICAgICAgIHZhciBsZXZlbFNjZW5lQ29uZmlnID0gcmVxdWlyZShcImxldmVsU2NlbmVDb25maWdcIilbdGhpcy5sZXZlbF1cblxuICAgICAgICB0aGlzLl9zZXR1cEZpbGxOb2RlcyhsZXZlbFNjZW5lQ29uZmlnKVxuICAgICAgICB0aGlzLl9zZXR1cFdhbGxzKGxldmVsU2NlbmVDb25maWcsd2FsbFByZWZhYilcbiAgICAgICAgdGhpcy5fc2V0dXBUYXJnZXRzKGxldmVsU2NlbmVDb25maWcsdGFyZ2V0UHJlZmFiKVxuICAgICAgICB0aGlzLl9zZXR1cFBhdGhXYXlzTm9kZShsZXZlbFNjZW5lQ29uZmlnLHBhdGhXYXlQcmVmYWIpXG4gICAgICAgIHRoaXMuX3NldHVwQnVsbGV0cyhsZXZlbFNjZW5lQ29uZmlnLGJ1bGxldFByZWZhYilcbiAgICB9LFxuICAgIF9zZXR1cE5vZGVQcm9wZXJ0eUJ5Q29uZmlnKGdpdmVuTm9kZSwgZ2l2ZW5Db25maWcpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGdpdmVuQ29uZmlnKSB7XG4gICAgICAgICAgICBnaXZlbk5vZGVba2V5XSA9IGdpdmVuQ29uZmlnW2tleV1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgX3NldHVwRmlsbE5vZGVzKGxldmVsU2NlbmVDb25maWcpIHtcbiAgICAgICAgdmFyIGZpbGxOb2Rlc0NvbmZpZyA9IGxldmVsU2NlbmVDb25maWcuZmlsbE5vZGVzXG4gICAgICAgIHZhciBmaWxsTm9kZXMgPSBjYy5maW5kKFwiQ2FudmFzL2ZpbGxOb2Rlc1wiKVxuICAgICAgICBmb3IodmFyIGluZGV4IGluIGZpbGxOb2Rlc0NvbmZpZykge1xuICAgICAgICAgICAgdmFyIG9uZU5vZGVDb25maWcgPSBmaWxsTm9kZXNDb25maWdbaW5kZXhdXG4gICAgICAgICAgICB2YXIgb25lTm9kZSA9IG5ldyBjYy5Ob2RlKClcbiAgICAgICAgICAgIHRoaXMuX3NldHVwTm9kZVByb3BlcnR5QnlDb25maWcob25lTm9kZSxvbmVOb2RlQ29uZmlnKVxuICAgICAgICAgICAgZmlsbE5vZGVzLmFkZENoaWxkKG9uZU5vZGUpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3NldHVwV2FsbHMobGV2ZWxTY2VuZUNvbmZpZyx3YWxsUHJlZmFiKSB7XG4gICAgICAgIHZhciB3YWxsc0NvbmZpZyA9IGxldmVsU2NlbmVDb25maWcud2FsbHNcbiAgICAgICAgdmFyIHdhbGxzID0gY2MuZmluZChcIkNhbnZhcy93YWxsc1wiKVxuICAgICAgICBmb3IodmFyIGluZGV4IGluIHdhbGxzQ29uZmlnKSB7XG4gICAgICAgICAgICB2YXIgb25lV2FsbENvbmZpZyA9IHdhbGxzQ29uZmlnW2luZGV4XVxuICAgICAgICAgICAgdmFyIG9uZVdhbGxOb2RlID0gY2MuaW5zdGFudGlhdGUod2FsbFByZWZhYilcbiAgICAgICAgICAgIHRoaXMuX3NldHVwTm9kZVByb3BlcnR5QnlDb25maWcob25lV2FsbE5vZGUsb25lV2FsbENvbmZpZylcbiAgICAgICAgICAgIHdhbGxzLmFkZENoaWxkKG9uZVdhbGxOb2RlKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9zZXR1cFRhcmdldHMobGV2ZWxTY2VuZUNvbmZpZywgdGFyZ2V0UHJlZmFiKSB7XG4gICAgICAgIHZhciB0YXJnZXRzQ29uZmlnID0gbGV2ZWxTY2VuZUNvbmZpZy50YXJnZXRzXG4gICAgICAgIHZhciB0YXJnZXRzID0gY2MuZmluZChcIkNhbnZhcy90YXJnZXRzXCIpIFxuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiB0YXJnZXRzQ29uZmlnKSB7XG4gICAgICAgICAgICB2YXIgb25lVGFyZ2V0Q29uZmlnID0gdGFyZ2V0c0NvbmZpZ1tpbmRleF1cbiAgICAgICAgICAgIHZhciBvbmVUYXJnZXROb2RlID0gY2MuaW5zdGFudGlhdGUodGFyZ2V0UHJlZmFiKVxuICAgICAgICAgICAgdGhpcy5fc2V0dXBOb2RlUHJvcGVydHlCeUNvbmZpZyhvbmVUYXJnZXROb2RlLG9uZVRhcmdldENvbmZpZylcbiAgICAgICAgICAgIHRhcmdldHMuYWRkQ2hpbGQob25lVGFyZ2V0Tm9kZSlcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgX3NldHVwUGF0aFdheXNOb2RlKGxldmVsU2NlbmVDb25maWcscGF0aFdheVByZWZhYikge1xuICAgICAgICB2YXIgcGF0aFdheXNDb25maWcgPSBsZXZlbFNjZW5lQ29uZmlnLnBhdGhXYXlzTm9kZVxuICAgICAgICB2YXIgcGF0aFdheXNOb2RlID0gY2MuZmluZChcIkNhbnZhcy9wYXRoV2F5c05vZGVcIilcbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gcGF0aFdheXNDb25maWcpIHtcbiAgICAgICAgICAgIHZhciBvbmVQYXRoV2F5Q29uZmlnID0gcGF0aFdheXNDb25maWdbaW5kZXhdXG4gICAgICAgICAgICB2YXIgb25lUGF0aFdheU5vZGUgPSBuZXcgY2MuTm9kZShvbmVQYXRoV2F5Q29uZmlnLm5hbWUpXG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBvbmVQYXRoV2F5Q29uZmlnLmNoaWxkcmVuKXtcbiAgICAgICAgICAgICAgICB2YXIgb25lQ2hpbGRDb25maWcgPSBvbmVQYXRoV2F5Q29uZmlnLmNoaWxkcmVuW2luZGV4XVxuICAgICAgICAgICAgICAgIHZhciBvbmVDaGlsZE5vZGUgPSBjYy5pbnN0YW50aWF0ZShwYXRoV2F5UHJlZmFiKVxuICAgICAgICAgICAgICAgIHRoaXMuX3NldHVwTm9kZVByb3BlcnR5QnlDb25maWcob25lQ2hpbGROb2RlLG9uZUNoaWxkQ29uZmlnKVxuICAgICAgICAgICAgICAgIG9uZVBhdGhXYXlOb2RlLmFkZENoaWxkKG9uZUNoaWxkTm9kZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhdGhXYXlzTm9kZS5hZGRDaGlsZChvbmVQYXRoV2F5Tm9kZSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfc2V0dXBCdWxsZXRzKGxldmVsU2NlbmVDb25maWcsIGJ1bGxldFByZWZhYikge1xuICAgICAgICB2YXIgYnVsbGV0c0NvbmZpZyA9IGxldmVsU2NlbmVDb25maWcuYnVsbGV0c1xuICAgICAgICB2YXIgYnVsbGV0cyA9IGNjLmZpbmQoXCJDYW52YXMvYnVsbGV0c1wiKVxuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBidWxsZXRzQ29uZmlnKSB7XG4gICAgICAgICAgICB2YXIgb25lQnVsbGV0Q29uZmlnID0gYnVsbGV0c0NvbmZpZ1tpbmRleF1cbiAgICAgICAgICAgIHZhciBvbmVCdWxsZXROb2RlID0gY2MuaW5zdGFudGlhdGUoYnVsbGV0UHJlZmFiKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgYmFzaWNDb25maWcgPSBvbmVCdWxsZXRDb25maWcuYmFzaWNcbiAgICAgICAgICAgIC8vdGhpcy5fc2V0dXBOb2RlUHJvcGVydHlCeUNvbmZpZyhvbmVCdWxsZXROb2RlLGJhc2ljQ29uZmlnKVxuICAgICAgICAgICAgdmFyIG1nckNvbmZpZyA9IG9uZUJ1bGxldENvbmZpZy5tZ3JcbiAgICAgICAgICAgIHZhciBidWxsZXRNZ3IgPSBvbmVCdWxsZXROb2RlLmdldENvbXBvbmVudChcImJ1bGxldE1nclwiKVxuICAgICAgICAgICAgYnVsbGV0TWdyLmJ1bGxldFR5cGUgPSBtZ3JDb25maWcuYnVsbGV0VHlwZVxuICAgICAgICAgICAgaWYgKG1nckNvbmZpZy5idWxsZXRUeXBlID09IDIpIHtcbiAgICAgICAgICAgICAgICBvbmVCdWxsZXROb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gYnVsbGV0TWdyLnNsaWRlckZyYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zZXR1cE5vZGVQcm9wZXJ0eUJ5Q29uZmlnKG9uZUJ1bGxldE5vZGUsYmFzaWNDb25maWcpXG4gICAgICAgICAgICBpZiAoYnVsbGV0TWdyLmJ1bGxldFR5cGUgPT0gMikge1xuICAgICAgICAgICAgICAgIGlmIChtZ3JDb25maWcucGF0aFdheXNOb2RlTmFtZSAhPSBcIlwiICYmIG1nckNvbmZpZy5wYXRoV2F5c05vZGVOYW1lICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGhXYXlzTm9kZVBhdGggPSBcIkNhbnZhcy9wYXRoV2F5c05vZGUvXCIgKyBtZ3JDb25maWcucGF0aFdheXNOb2RlTmFtZVxuICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aFdheXNOb2RlID0gY2MuZmluZChwYXRoV2F5c05vZGVQYXRoKVxuICAgICAgICAgICAgICAgICAgICBidWxsZXRNZ3IucGF0aFdheXNOb2RlID0gcGF0aFdheXNOb2RlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9jYy5sb2coaW5kZXgsb25lQnVsbGV0Tm9kZS53aWR0aCwgb25lQnVsbGV0Tm9kZS5oZWlnaHQpXG4gICAgICAgICAgICBidWxsZXRzLmFkZENoaWxkKG9uZUJ1bGxldE5vZGUpXG4gICAgICAgICAgICAvL2NjLmxvZyhpbmRleCxvbmVCdWxsZXROb2RlLndpZHRoLCBvbmVCdWxsZXROb2RlLmhlaWdodClcbiAgICAgICAgfVxuICAgIH0sXG5cblxuICAgIGRhdGFNb25pdG9yZWQoa2V5LHZhbHVlKSB7XG4gICAgICAgIGlmIChrZXkuaW5kZXhPZihcIm1pblN0ZXBfbGV2ZWxfXCIpICE9IC0xKSB7XG4gICAgICAgICAgICAvL3R5cGljYWxseSBvbmUga2V5IGlzIFwibWluU3RlcF9sZXZlbF8xXCJcbiAgICAgICAgICAgIHZhciBsZXZlbElkID0ga2V5LnNsaWNlKDE0KVxuICAgICAgICAgICAgaWYgKHBhcnNlSW50KGxldmVsSWQpID09IHBhcnNlSW50KHRoaXMubGV2ZWwpKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1pblN0ZXBOdW1MYWJlbCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVpTm9kZVwiKS5nZXRDaGlsZEJ5TmFtZShcIm1pblN0ZXBOdW1MYWJlbFwiKVxuICAgICAgICAgICAgICAgIC8vbWluU3RlcE51bUxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLmnIDlsI/mraXmlbDvvJpcIiArIHZhbHVlLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICBtaW5TdGVwTnVtTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKS5nZXRGb3JtYXRlZFN0cmluZygxNTMsW3ZhbHVlLnRvU3RyaW5nKCldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09IFwiaGVhcnRcIikge1xuICAgICAgICAgICAgdGhpcy5oZWFydCA9IHZhbHVlXG4gICAgICAgIH1cbiAgICB9XG5cbn0pO1xuXG4iXX0=