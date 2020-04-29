
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
      }

      cc.log(index, oneBulletNode.width, oneBulletNode.height);
      bullets.addChild(oneBulletNode);
      cc.log(index, oneBulletNode.width, oneBulletNode.height);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsTWdyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiYnVsbGV0cyIsIm1pbkRpcyIsIm1heE9mZnNldERlZ3JlZSIsImRpcmVjdGlvblRyeXRvIiwiZmxhZyIsImhlbHBlciIsIndhbGxzIiwidGFyZ2V0c051bSIsImdldCIsIl90YXJnZXRzTnVtIiwic2V0IiwidmFsdWUiLCJvblN1Y2Nlc3MiLCJsaW5lUHJlZmFiIiwiUHJlZmFiIiwiYnVsbGV0UHJlZmFiIiwicGxheWVyRGF0YSIsInJldHJ5QnV0dG9uIiwiTm9kZSIsImhlYXJ0Rm9yUmV0cnlDb3N0IiwiX2hlYXJ0Rm9yUmV0cnlDb3N0d2UiLCJnZXRDaGlsZEJ5TmFtZSIsImdldENvbXBvbmVudCIsIkxhYmVsIiwic3RyaW5nIiwidG9TdHJpbmciLCJoZWFydCIsIl9oZWFydCIsImZpbmQiLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJpc01vdmVkIiwibWF4SGVhcnQiLCJfbWF4SGVhcnQiLCJfaXNNb3ZlZCIsImN1cnJlbnRTdGVwTnVtIiwiX2N1cnJlbnRTdGVwTnVtIiwiY3VycmVudFN0ZXBOdW1MYWJlbCIsIm5vZGUiLCJyZXF1aXJlIiwiZ2V0Rm9ybWF0ZWRTdHJpbmciLCJsZXZlbCIsInNvdW5kRWZmZWN0Iiwib25Mb2FkIiwidGV4dENvbmZpZyIsIkhlbHBlciIsInNldHVwTm9kZXNCeUNvbmZpZyIsInNlbGYiLCJsb2FkZXIiLCJsb2FkUmVzIiwiZXJyIiwicmVzIiwiZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUiLCJzdGFydCIsIm9uIiwib25Ub3VjaFN0YXJ0Iiwib25Ub3VjaE1vdmUiLCJvblRvdWNoRW5kIiwiYnVsbGV0c05vZGUiLCJjaGlsZHJlbiIsImN1cnJlbnRMZXZlbCIsImRlbGVnYXRlIiwid2FsbHNOb2RlIiwibGVuZ3RoIiwiZ3JhcGhpYyIsIkdyYXBoaWNzIiwic3RhcnRQb2ludCIsInBvaW50Tm9kZXMiLCJpbmRleCIsInBvaW50IiwibW92ZVRvIiwieCIsInkiLCJsaW5lVG8iLCJjbG9zZSIsInN0cm9rZSIsImZpbGwiLCJtaW5TdGVwTnVtTGFiZWwiLCJtaW5TdGVwS2V5IiwibWluU3RlcE51bSIsIm1pblN0ZXBzIiwidW5kZWZpbmVkIiwiaXNHdWlsZGVkIiwiZ3VpbGROb2RlIiwiaW5zdGFudGlhdGUiLCJyZXNlcyIsImFkZENoaWxkIiwicGxheUJnbSIsImxldmVsQ29uZmlnIiwiYmdtUGF0aCIsImF1ZGlvRW5naW5lIiwic3RvcEFsbCIsInBsYXkiLCJldmVudCIsInN0YXJ0TG9jYXRpb24iLCJnZXRTdGFydExvY2F0aW9uIiwidG1wRGlyZWN0aW9uIiwidjIiLCJnZXRMb2NhdGlvblgiLCJnZXRMb2NhdGlvblkiLCJkaXMiLCJtYWciLCJkaXJlY3Rpb24iLCJnZXRQb3NzaWFibGVEaXJlY3Rpb24iLCJtb3ZlQnVsbGV0cyIsIm9uRGVzdHJveSIsIm9mZiIsImRlbHRhIiwiaXNQb3NzaWFibGVXaXRoR2l2ZW5EaXJlY3Rpb24iLCJnaXZlbkRpcmVjdGlvbiIsImFuZ2xlIiwic2lnbkFuZ2xlIiwiZGVncmVlIiwiTWF0aCIsIlBJIiwiYWJzIiwic3RhdHVzIiwic2hhZG93cyIsImJ1bGxldCIsImJ1bGxldE1nciIsIm5lYXJlc3RXYWxsSW5mbyIsImdldE5lYXJlc3RXYWxsSW5mbyIsInNoYWRvd05vZGUiLCJzdWl0YWJsZVBvc2l0aW9uIiwid2lkdGgiLCJoZWlnaHQiLCJvcmlnaW5Ob2RlIiwicHVzaCIsIm1heFRyeVRpbWUiLCJyZXNvbHZlU2hhZG93cyIsIndpbGxBZGRTdGVwTnVtIiwiaXNUd29Qb3NpdGlvblNpbWlsYXJFcXVhbCIsInRhcmdldFBvc2l0aW9uIiwibW92aW5nRGlyZWN0aW9uIiwibm9ybWFsaXplU2VsZiIsIm1vdmluZ1RpbWUiLCJ2IiwidngiLCJ2eSIsIm1vdmluZ1NwZWVkIiwic2NoZWR1bGVPbmNlIiwibGV2ZWxzIiwiY3VycmVudFNlY3Rpb24iLCJpbmRleE9mIiwibmV3TGV2ZWwiLCJuZXdTZWN0aW9uIiwiY29tbWl0Qm9keSIsIm5ld0xldmVscyIsInBoeXNpY2FsUG93ZXJDb3N0ZWRGbGFnIiwicHJlTGV2ZWwiLCJzdWNjZXNzQ2FsbEJhY2siLCJhbmltYXRlZFRvU2NlbmUiLCJjb21taXRQbGF5ZXJEYXRhVG9TZXJ2ZXIiLCJvbmVTaGFkb3ciLCJpIiwiYW5vdGhlclNoYWRvdyIsInRlc3RSZXN1bHQiLCJfc2VsZWN0U3RhdGljU2hhZG93QW5kU2hhb2R3Rm9yUmVzb2x2ZWQiLCJzdGF0aWNTaGFkb3ciLCJ0ZW1wU2hhZG93Iiwic2hhZG93Rm9yUmVzb2x2ZWQiLCJzdGF0aWNCb3JkZXJMaW5lcyIsImdldExpbmVzT2ZPbmVOb2RlIiwic3RhdGljTGluZSIsInJheSIsIm1ha2VSYXkiLCJrIiwibGluZSIsInJheVRlc3QiLCJuZXdQb2ludDIiLCJwMiIsInAxIiwibmV3UG9pbnQxIiwicmF5MSIsInBvc2l0aW9uIiwiY3VycmVudERpc3RhbmNlIiwidGFyZ2V0RGlzIiwiZ2V0RGlzVG9TZWxmQm9yZGVyIiwiZGlzRnJvbUJvcmRlciIsImdldFN1aXRhYmxlUG9pbnQiLCJ1cGRhdGVkRGlzIiwic2hhZG93MSIsInNoYWRvdzIiLCJ0ZW1wIiwiczEiLCJzMiIsIm9yaWdpbkNyb3NzRmxhZyIsInNoYWRvd0Nyb3NzRmxhZyIsIm9yaWdpbkxpbmVzIiwia2V5Iiwib25lTGluZSIsImlzT25lTm9kZVdpbGxDb2xsaWRXaXRoT25lTGluZUluRGlyZWN0aW9uIiwic2hhZG93TGluZXMiLCJyZXN1bHQiLCJnZW5lcmF0ZVdhbGxzIiwiY29uZmlnIiwid2FsbFBhdGhlcyIsIm9uZVBhdGgiLCJwb2ludHMiLCJyZWFsUG9pbnRzIiwicmVhbFBvaW50IiwiY3VycmVudFBvaW50IiwibGluZVdpZHRoIiwib2Zmc2V0Iiwid2FsbE5vZGVzIiwiaXNDbG9zZWQiLCJkaXJlY3RlZExpbmUiLCJvZmZzZXREaXJlY3Rpb24iLCJyb3RhdGUiLCJidWxsZXRDb25maWciLCJjb24iLCJzY2FsZSIsIm9uQ2xpY2tSZXRyeUJ1dHRvbiIsImdhbWVNZ3IiLCJlbnRlckxldmVsU2NlbmUiLCJvbkFsbFJldHJ5RmFpbGVkIiwib25DbGlja0JhY2tCdXR0b24iLCJ3YWxsUHJlZmFiIiwidGFyZ2V0UHJlZmFiIiwicGF0aFdheVByZWZhYiIsImxldmVsU2NlbmVDb25maWciLCJfc2V0dXBGaWxsTm9kZXMiLCJfc2V0dXBXYWxscyIsIl9zZXR1cFRhcmdldHMiLCJfc2V0dXBQYXRoV2F5c05vZGUiLCJfc2V0dXBCdWxsZXRzIiwiX3NldHVwTm9kZVByb3BlcnR5QnlDb25maWciLCJnaXZlbk5vZGUiLCJnaXZlbkNvbmZpZyIsImZpbGxOb2Rlc0NvbmZpZyIsImZpbGxOb2RlcyIsIm9uZU5vZGVDb25maWciLCJvbmVOb2RlIiwid2FsbHNDb25maWciLCJvbmVXYWxsQ29uZmlnIiwib25lV2FsbE5vZGUiLCJ0YXJnZXRzQ29uZmlnIiwidGFyZ2V0cyIsIm9uZVRhcmdldENvbmZpZyIsIm9uZVRhcmdldE5vZGUiLCJwYXRoV2F5c0NvbmZpZyIsInBhdGhXYXlzTm9kZSIsIm9uZVBhdGhXYXlDb25maWciLCJvbmVQYXRoV2F5Tm9kZSIsIm5hbWUiLCJvbmVDaGlsZENvbmZpZyIsIm9uZUNoaWxkTm9kZSIsImJ1bGxldHNDb25maWciLCJvbmVCdWxsZXRDb25maWciLCJvbmVCdWxsZXROb2RlIiwiYmFzaWNDb25maWciLCJiYXNpYyIsIm1nckNvbmZpZyIsIm1nciIsImJ1bGxldFR5cGUiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsInNsaWRlckZyYW1lIiwicGF0aFdheXNOb2RlTmFtZSIsInBhdGhXYXlzTm9kZVBhdGgiLCJsb2ciLCJkYXRhTW9uaXRvcmVkIiwibGV2ZWxJZCIsInNsaWNlIiwicGFyc2VJbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FB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YWYsS0FBYjtBQUNIO0FBQ0o7QUEvdEJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICAgICAgYnVsbGV0czogW10sXG4gICAgICAgIG1pbkRpczogNTAsXG4gICAgICAgIG1heE9mZnNldERlZ3JlZTogNDUsXG4gICAgICAgIGRpcmVjdGlvblRyeXRvOiBudWxsLFxuICAgICAgICBmbGFnOiBmYWxzZSxcbiAgICAgICAgaGVscGVyOiBudWxsLFxuXG4gICAgICAgIHdhbGxzOiBbXSxcbiAgICAgICAgdGFyZ2V0c051bToge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90YXJnZXRzTnVtXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0c051bSA9IHZhbHVlXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblN1Y2Nlc3MoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBsaW5lUHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGJ1bGxldFByZWZhYjogY2MuUHJlZmFiLFxuXG4gICAgICAgIHBsYXllckRhdGE6IG51bGwsXG4gICAgICAgIHJldHJ5QnV0dG9uOiBjYy5Ob2RlLFxuICAgICAgICBoZWFydEZvclJldHJ5Q29zdDoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZWFydEZvclJldHJ5Q29zdHdlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWFydEZvclJldHJ5Q29zdHdlID0gdmFsdWVcbiAgICAgICAgICAgICAgICB0aGlzLnJldHJ5QnV0dG9uLmdldENoaWxkQnlOYW1lKFwiaGVhcnRDb3N0TGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB2YWx1ZS50b1N0cmluZygpXG4gICAgICAgICAgICB9IFxuICAgICAgICB9LFxuXG4gICAgICAgIGhlYXJ0OiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hlYXJ0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faGVhcnQgPSB2YWx1ZVxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvdWlOb2RlL2hlYXJ0TGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB2YWx1ZS50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgdGhpcy5oZWFydEZvclJldHJ5Q29zdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldHJ5QnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc01vdmVkID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldHJ5QnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWF4SGVhcnQ6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWF4SGVhcnRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXhIZWFydCA9IHZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNNb3ZlZDoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc01vdmVkID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNNb3ZlZCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc01vdmVkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNNb3ZlZCA9IHZhbHVlXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IHRydWUgJiYgdGhpcy5oZWFydEZvclJldHJ5Q29zdCA8PSB0aGlzLmhlYXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV0cnlCdXR0b24uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY3VycmVudFN0ZXBOdW06IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudFN0ZXBOdW0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RlcE51bSA9IDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTdGVwTnVtXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0ZXBOdW0gPSB2YWx1ZVxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50U3RlcE51bUxhYmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidWlOb2RlXCIpLmdldENoaWxkQnlOYW1lKFwiY3VycmVudFN0ZXBOdW1MYWJlbFwiKVxuICAgICAgICAgICAgICAgIC8vY3VycmVudFN0ZXBOdW1MYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi5b2T5YmN5q2l5pWw77yaXCIgKyB2YWx1ZS50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgY3VycmVudFN0ZXBOdW1MYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHJlcXVpcmUoXCJ0ZXh0Q29uZmlnXCIpLmdldEZvcm1hdGVkU3RyaW5nKDE1NCxbdmFsdWUudG9TdHJpbmcoKV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGxldmVsOiBudWxsLFxuICAgICAgICBzb3VuZEVmZmVjdDogbnVsbFxuICAgICAgICBcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB2YXIgdGV4dENvbmZpZyA9IHJlcXVpcmUoXCJ0ZXh0Q29uZmlnXCIpXG4gICAgICAgIHZhciBIZWxwZXIgPSByZXF1aXJlKFwiaGVscGVyXCIpXG4gICAgICAgIHRoaXMuaGVscGVyID0gbmV3IEhlbHBlcigpXG4gICAgICAgIC8vdGhpcy5sZXZlbCA9IDFcbiAgICAgICAgdGhpcy5zZXR1cE5vZGVzQnlDb25maWcoKVxuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJlZmZlY3RTb3VuZHMvaGl0XCIsZnVuY3Rpb24oZXJyLHJlcyl7XG4gICAgICAgICAgICBzZWxmLnNvdW5kRWZmZWN0ID0gcmVzXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5yZXRyeUJ1dHRvbi5nZXRDaGlsZEJ5TmFtZShcInRleHRMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRleHRDb25maWcuZ2V0VGV4dEJ5SWRBbmRMYW5ndWFnZVR5cGUoMTUyKVxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL3VpTm9kZS9jdXJyZW50U3RlcE51bUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGV4dENvbmZpZy5nZXRGb3JtYXRlZFN0cmluZygxNTQsWzBdKVxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vbihcInRvdWNoc3RhcnRcIix0aGlzLm9uVG91Y2hTdGFydCx0aGlzKVxuICAgICAgICB0aGlzLm5vZGUub24oXCJ0b3VjaG1vdmVcIix0aGlzLm9uVG91Y2hNb3ZlLHRoaXMpXG4gICAgICAgIHRoaXMubm9kZS5vbihcInRvdWNoZW5kXCIsdGhpcy5vblRvdWNoRW5kLHRoaXMpXG4gICAgICAgIC8vdGhpcy5nZW5lcmF0ZVdhbGxzKClcbiAgICAgICAgdmFyIGJ1bGxldHNOb2RlID0gY2MuZmluZChcIkNhbnZhcy9idWxsZXRzXCIpXG4gICAgICAgIHRoaXMuYnVsbGV0cyA9IGJ1bGxldHNOb2RlLmNoaWxkcmVuXG4gICAgICAgIHRoaXMucGxheWVyRGF0YSA9IHJlcXVpcmUoXCJkYXRhTWdyXCIpLnBsYXllckRhdGFcblxuICAgICAgICB0aGlzLm1heEhlYXJ0ID0gdGhpcy5wbGF5ZXJEYXRhLm1heEhlYXJ0XG4gICAgICAgIGlmICh0aGlzLmxldmVsID09IHRoaXMucGxheWVyRGF0YS5jdXJyZW50TGV2ZWwpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhcnRGb3JSZXRyeUNvc3QgPSByZXF1aXJlKFwibGV2ZWxDb25maWdcIilbdGhpcy5wbGF5ZXJEYXRhLmN1cnJlbnRMZXZlbC50b1N0cmluZygpXS5oZWFydEZvclJldHJ5Q29zdFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oZWFydEZvclJldHJ5Q29zdCA9IDBcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB0aGlzLmhlYXJ0ID0gdGhpcy5wbGF5ZXJEYXRhLmhlYXJ0XG4gICAgICAgIHJlcXVpcmUoXCJuZXR3b3JrTWdyXCIpLmRlbGVnYXRlID0gdGhpc1xuICAgICAgICB2YXIgd2FsbHNOb2RlID0gY2MuZmluZChcIkNhbnZhcy93YWxsc1wiKVxuICAgICAgICB0aGlzLndhbGxzID0gd2FsbHNOb2RlLmNoaWxkcmVuXG4gICAgICAgIHRoaXMudGFyZ2V0c051bSA9IGNjLmZpbmQoXCJDYW52YXMvdGFyZ2V0c1wiKS5jaGlsZHJlbi5sZW5ndGhcblxuICAgICAgICB2YXIgZ3JhcGhpYyA9IGNjLmZpbmQoXCJDYW52YXMvZmlsbE5vZGVzXCIpLmdldENvbXBvbmVudChjYy5HcmFwaGljcylcbiAgICAgICAgdmFyIHN0YXJ0UG9pbnQgPSBudWxsXG4gICAgICAgIHZhciBwb2ludE5vZGVzID0gY2MuZmluZChcIkNhbnZhcy9maWxsTm9kZXNcIikuY2hpbGRyZW5cbiAgICAgICAgaWYgKHBvaW50Tm9kZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGluZGV4IGluIHBvaW50Tm9kZXMpIHtcbiAgICAgICAgICAgIHZhciBwb2ludCA9IHBvaW50Tm9kZXNbaW5kZXhdXG4gICAgICAgICAgICBpZiAoc3RhcnRQb2ludCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZ3JhcGhpYy5tb3ZlVG8ocG9pbnQueCwgcG9pbnQueSlcbiAgICAgICAgICAgICAgICBzdGFydFBvaW50ID0gcG9pbnRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ3JhcGhpYy5saW5lVG8ocG9pbnQueCwgcG9pbnQueSlcbiAgICAgICAgfVxuICAgICAgICBncmFwaGljLmNsb3NlKClcbiAgICAgICAgZ3JhcGhpYy5zdHJva2UoKVxuICAgICAgICBncmFwaGljLmZpbGwoKVxuXG4gICAgICAgIHZhciBtaW5TdGVwTnVtTGFiZWwgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1aU5vZGVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJtaW5TdGVwTnVtTGFiZWxcIilcbiAgICAgICAgdmFyIG1pblN0ZXBLZXkgPSBcIm1pblN0ZXBfbGV2ZWxfXCIgKyB0aGlzLmxldmVsLnRvU3RyaW5nKClcbiAgICAgICAgdmFyIG1pblN0ZXBOdW0gPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLm1pblN0ZXBzW21pblN0ZXBLZXldXG4gICAgICAgIGlmIChtaW5TdGVwTnVtID09IG51bGwgfHwgbWluU3RlcE51bSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG1pblN0ZXBOdW0gPSByZXF1aXJlKFwidGV4dENvbmZpZ1wiKS5nZXRUZXh0QnlJZEFuZExhbmd1YWdlVHlwZSgxNTUpXG4gICAgICAgIH1cbiAgICAgICAgbWluU3RlcE51bUxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVxdWlyZShcInRleHRDb25maWdcIikuZ2V0Rm9ybWF0ZWRTdHJpbmcoMTUzLFttaW5TdGVwTnVtLnRvU3RyaW5nKCldKVxuXG4gICAgICAgIGlmIChyZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmlzR3VpbGRlZCA9PSAwKSB7XG4gICAgICAgICAgICB2YXIgZ3VpbGROb2RlID0gY2MuaW5zdGFudGlhdGUocmVxdWlyZShcInJlc01nclwiKS5yZXNlc1tcImd1aWxkTm9kZVByZWZhYlwiXSlcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChndWlsZE5vZGUpXG4gICAgICAgIH0gXG4gICAgICAgIC8vIHZhciBndWlsZE5vZGUgPSBjYy5pbnN0YW50aWF0ZShyZXF1aXJlKFwicmVzTWdyXCIpLnJlc2VzW1wiZ3VpbGROb2RlUHJlZmFiXCJdKVxuICAgICAgICAvLyB0aGlzLm5vZGUuYWRkQ2hpbGQoZ3VpbGROb2RlKVxuICAgICAgICAvLyBmb3IgKHZhciBpbmRleCBpbiB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidWxsZXRzXCIpLmNoaWxkcmVuKSB7XG4gICAgICAgIC8vICAgICB2YXIgb25lRWxlbWVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ1bGxldHNcIikuY2hpbGRyZW5baW5kZXhdXG4gICAgICAgIC8vICAgICBjYy5sb2cob25lRWxlbWVudC53aWR0aCwgb25lRWxlbWVudC5oZWlnaHQpXG4gICAgICAgIC8vIH1cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG4gICAgcGxheUJnbSgpIHtcbiAgICAgICAgdmFyIGxldmVsQ29uZmlnID0gcmVxdWlyZShcImxldmVsQ29uZmlnXCIpXG4gICAgICAgIHZhciBiZ21QYXRoID0gbGV2ZWxDb25maWdbdGhpcy5sZXZlbF0uYmdtUGF0aFxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhiZ21QYXRoLGZ1bmN0aW9uKGVycixyZXMpe1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHJlcylcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgb25Ub3VjaFN0YXJ0KGV2ZW50KXtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25Ucnl0byA9IG51bGxcbiAgICAgICAgdGhpcy5mbGFnID0gdHJ1ZVxuICAgIH0sXG5cbiAgICBvblRvdWNoTW92ZShldmVudCkge1xuICAgICAgICBpZiAodGhpcy5mbGFnID09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RhcnRMb2NhdGlvbiA9IGV2ZW50LmdldFN0YXJ0TG9jYXRpb24oKVxuICAgICAgICB2YXIgdG1wRGlyZWN0aW9uID0gY2MudjIoZXZlbnQuZ2V0TG9jYXRpb25YKCkgLSBzdGFydExvY2F0aW9uLngsIGV2ZW50LmdldExvY2F0aW9uWSgpIC0gc3RhcnRMb2NhdGlvbi55KVxuICAgICAgICB2YXIgZGlzID0gdG1wRGlyZWN0aW9uLm1hZygpXG4gICAgICAgIGlmIChkaXMgPCB0aGlzLm1pbkRpcykge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gdGhpcy5nZXRQb3NzaWFibGVEaXJlY3Rpb24odG1wRGlyZWN0aW9uKVxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmxhZyA9IGZhbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvblRyeXRvID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvblRyeXRvID0gZGlyZWN0aW9uXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZmxhZyA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLm1vdmVCdWxsZXRzKHRoaXMuZGlyZWN0aW9uVHJ5dG8pXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG9uVG91Y2hFbmQoZXZlbnQpIHtcblxuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoXCJ0b3VjaHN0YXJ0XCIsdGhpcy5vblRvdWNoU3RhcnQsdGhpcylcbiAgICAgICAgdGhpcy5ub2RlLm9mZihcInRvdWNobW92ZVwiLHRoaXMub25Ub3VjaE1vdmUsdGhpcylcbiAgICAgICAgdGhpcy5ub2RlLm9mZihcInRvdWNoZW5kXCIsdGhpcy5vblRvdWNoRW5kLHRoaXMpXG4gICAgfSxcblxuICAgIGdldFBvc3NpYWJsZURpcmVjdGlvbihkZWx0YSkge1xuICAgICAgICBpZiAodGhpcy5pc1Bvc3NpYWJsZVdpdGhHaXZlbkRpcmVjdGlvbihkZWx0YSxjYy52MigxLDApKSA9PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gY2MudjIoMSwwKSAvL3JpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc1Bvc3NpYWJsZVdpdGhHaXZlbkRpcmVjdGlvbihkZWx0YSxjYy52MigwLC0xKSkgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNjLnYyKDAsLTEpIC8vZG93blxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNQb3NzaWFibGVXaXRoR2l2ZW5EaXJlY3Rpb24oZGVsdGEsY2MudjIoLTEsMCkpID09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiBjYy52MigtMSwwKSAvL2xlZnRcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzUG9zc2lhYmxlV2l0aEdpdmVuRGlyZWN0aW9uKGRlbHRhLGNjLnYyKDAsMSkpID09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiBjYy52MigwLDEpIC8vdXBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAtMSAvL25vIGRpcmVjdGlvbiBtYXRjaFxuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBpc1Bvc3NpYWJsZVdpdGhHaXZlbkRpcmVjdGlvbihkZWx0YSxnaXZlbkRpcmVjdGlvbikge1xuICAgICAgICB2YXIgYW5nbGUgPSBkZWx0YS5zaWduQW5nbGUoZ2l2ZW5EaXJlY3Rpb24pXG4gICAgICAgIHZhciBkZWdyZWUgPSBhbmdsZSAvIE1hdGguUEkgKiAxODBcbiAgICAgICAgaWYgKE1hdGguYWJzKGRlZ3JlZSkgPD0gdGhpcy5tYXhPZmZzZXREZWdyZWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgbW92ZUJ1bGxldHMoZGlyZWN0aW9uKSB7XG4gICAgICAgIGZvciAodmFyIGluZGV4IGluIHRoaXMuYnVsbGV0cykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYnVsbGV0c1tpbmRleF0uZ2V0Q29tcG9uZW50KFwiYnVsbGV0TWdyXCIpLnN0YXR1cyAhPSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNoYWRvd3MgPSBbXVxuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiB0aGlzLmJ1bGxldHMpIHtcbiAgICAgICAgICAgIHZhciBidWxsZXQgPSB0aGlzLmJ1bGxldHNbaW5kZXhdXG4gICAgICAgICAgICB2YXIgYnVsbGV0TWdyID0gYnVsbGV0LmdldENvbXBvbmVudChcImJ1bGxldE1nclwiKVxuICAgICAgICAgICAgdmFyIG5lYXJlc3RXYWxsSW5mbyA9IGJ1bGxldE1nci5nZXROZWFyZXN0V2FsbEluZm8oZGlyZWN0aW9uKVxuICAgICAgICAgICAgdmFyIHNoYWRvd05vZGUgPSB7XG4gICAgICAgICAgICAgICAgeDogbmVhcmVzdFdhbGxJbmZvLnN1aXRhYmxlUG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICB5OiBuZWFyZXN0V2FsbEluZm8uc3VpdGFibGVQb3NpdGlvbi55LFxuICAgICAgICAgICAgICAgIHdpZHRoOiBidWxsZXQud2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBidWxsZXQuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIGRpczogbmVhcmVzdFdhbGxJbmZvLmRpcyxcbiAgICAgICAgICAgICAgICBvcmlnaW5Ob2RlOiBidWxsZXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNoYWRvd3MucHVzaChzaGFkb3dOb2RlKVxuICAgICAgICB9XG5cbiAgICAgICAgLy9yZXNvbHZlIHNoYWRvd3NcbiAgICAgICAgdmFyIG1heFRyeVRpbWUgPSAxMDBcbiAgICAgICAgd2hpbGUodGhpcy5yZXNvbHZlU2hhZG93cyhzaGFkb3dzLGRpcmVjdGlvbikgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChtYXhUcnlUaW1lIDw9IDApIHtcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCJDQU4nVCBGSU5EIEEgU1VJVEFCTEUgUE9TSVRJT05cIilcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWF4VHJ5VGltZSAtPSAxXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdpbGxBZGRTdGVwTnVtID0gZmFsc2VcbiAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gc2hhZG93cykge1xuICAgICAgICAgICAgdmFyIHNoYWRvd05vZGUgPSBzaGFkb3dzW2luZGV4XVxuICAgICAgICAgICAgdmFyIG9yaWdpbk5vZGUgPSBzaGFkb3dOb2RlLm9yaWdpbk5vZGVcbiAgICAgICAgICAgIGlmICh0aGlzLmhlbHBlci5pc1R3b1Bvc2l0aW9uU2ltaWxhckVxdWFsKGNjLnYyKHNoYWRvd05vZGUueCxzaGFkb3dOb2RlLnkpLGNjLnYyKG9yaWdpbk5vZGUueCwgb3JpZ2luTm9kZS55KSkgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBidWxsZXRNZ3IgPSBvcmlnaW5Ob2RlLmdldENvbXBvbmVudChcImJ1bGxldE1nclwiKVxuICAgICAgICAgICAgYnVsbGV0TWdyLnRhcmdldFBvc2l0aW9uID0gY2MudjIoc2hhZG93Tm9kZS54LCBzaGFkb3dOb2RlLnkpXG4gICAgICAgICAgICBidWxsZXRNZ3IubW92aW5nRGlyZWN0aW9uID0gZGlyZWN0aW9uXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJ1bGxldE1nci5tb3ZpbmdEaXJlY3Rpb24ubm9ybWFsaXplU2VsZigpXG4gICAgICAgICAgICBpZiAoYnVsbGV0TWdyLm1vdmluZ1RpbWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZhciBkaXMgPSBjYy52MihidWxsZXRNZ3IudGFyZ2V0UG9zaXRpb24ueCAtIG9yaWdpbk5vZGUueCwgYnVsbGV0TWdyLnRhcmdldFBvc2l0aW9uLnkgLSBvcmlnaW5Ob2RlLnkpLm1hZygpXG4gICAgICAgICAgICAgICAgdmFyIHYgPSBkaXMgLyBidWxsZXRNZ3IubW92aW5nVGltZVxuXG4gICAgICAgICAgICAgICAgYnVsbGV0TWdyLnZ4ID0gdiAqIGJ1bGxldE1nci5tb3ZpbmdEaXJlY3Rpb24ueFxuICAgICAgICAgICAgICAgIGJ1bGxldE1nci52eSA9IHYgKiBidWxsZXRNZ3IubW92aW5nRGlyZWN0aW9uLnlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJ1bGxldE1nci52eCA9IGJ1bGxldE1nci5tb3ZpbmdEaXJlY3Rpb24ueCAqIGJ1bGxldE1nci5tb3ZpbmdTcGVlZFxuICAgICAgICAgICAgICAgIGJ1bGxldE1nci52eSA9IGJ1bGxldE1nci5tb3ZpbmdEaXJlY3Rpb24ueSAqIGJ1bGxldE1nci5tb3ZpbmdTcGVlZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnVsbGV0TWdyLnN0YXR1cyA9IDFcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTW92ZWQgIT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNNb3ZlZCA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh3aWxsQWRkU3RlcE51bSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHdpbGxBZGRTdGVwTnVtID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh3aWxsQWRkU3RlcE51bSA9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGVwTnVtICs9IDFcbiAgICAgICAgICAgIGlmICh0aGlzLnNvdW5kRWZmZWN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuc291bmRFZmZlY3QpXG4gICAgICAgICAgICAgICAgfSwwLjMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25TdWNjZXNzKCkge1xuICAgICAgICB0aGlzLnJldHJ5QnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlXG4gICAgICAgIC8vIGlmICh0aGlzLmxldmVsICE9IHRoaXMucGxheWVyRGF0YS5jdXJyZW50TGV2ZWwpIHtcbiAgICAgICAgLy8gICAgIC8vIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIm1haW5TY2VuZVwiKVxuICAgICAgICAvLyAgICAgcmVxdWlyZShcImdhbWVNZ3JcIikuYW5pbWF0ZWRUb1NjZW5lKFwibWFpblNjZW5lXCIpXG4gICAgICAgIC8vICAgICByZXR1cm5cbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHZhciBsZXZlbHMgPSByZXF1aXJlKFwic2VjdGlvbkNvbmZpZ1wiKVt0aGlzLnBsYXllckRhdGEuY3VycmVudFNlY3Rpb25dLmxldmVsc1xuICAgICAgICB2YXIgaW5kZXggPSBsZXZlbHMuaW5kZXhPZih0aGlzLnBsYXllckRhdGEuY3VycmVudExldmVsKVxuICAgICAgICB2YXIgbmV3TGV2ZWwgPSBudWxsXG4gICAgICAgIHZhciBuZXdTZWN0aW9uID0gbnVsbFxuICAgICAgICB2YXIgY29tbWl0Qm9keSA9IG51bGxcbiAgICAgICAgaWYgKGluZGV4IDwgbGV2ZWxzLmxlbmd0aCAtMSkge1xuICAgICAgICAgICAgaW5kZXggKz0gMVxuICAgICAgICAgICAgbmV3TGV2ZWwgPSBsZXZlbHNbaW5kZXhdXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuZXdTZWN0aW9uID0gdGhpcy5wbGF5ZXJEYXRhLmN1cnJlbnRTZWN0aW9uICsgMVxuICAgICAgICAgICAgdmFyIG5ld0xldmVscyA9IHJlcXVpcmUoXCJzZWN0aW9uQ29uZmlnXCIpW25ld1NlY3Rpb25dLmxldmVsc1xuICAgICAgICAgICAgbmV3TGV2ZWwgPSBuZXdMZXZlbHNbMF1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKG5ld1NlY3Rpb24gPT0gbnVsbCkge1xuICAgICAgICAgICAgY29tbWl0Qm9keSA9IHtcbiAgICAgICAgICAgICAgICBjdXJyZW50TGV2ZWw6IG5ld0xldmVsLCBcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb21taXRCb2R5ID0ge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTZWN0aW9uOiBuZXdTZWN0aW9uLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRMZXZlbDogbmV3TGV2ZWwsICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sZXZlbCA9PSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLmN1cnJlbnRMZXZlbCkge1xuICAgICAgICAgICAgY29tbWl0Qm9keS5waHlzaWNhbFBvd2VyQ29zdGVkRmxhZyA9IDBcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5pc0d1aWxkZWQgPT0gMCkge1xuICAgICAgICAgICAgY29tbWl0Qm9keS5pc0d1aWxkZWQgPSAxXG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1pblN0ZXBLZXkgPSBcIm1pblN0ZXBfbGV2ZWxfXCIgKyB0aGlzLmxldmVsLnRvU3RyaW5nKClcbiAgICAgICAgdmFyIG1pblN0ZXBOdW0gPSByZXF1aXJlKFwiZGF0YU1nclwiKS5wbGF5ZXJEYXRhLm1pblN0ZXBzW21pblN0ZXBLZXldXG5cbiAgICAgICAgaWYgKG1pblN0ZXBOdW0gPT0gbnVsbCB8fCBtaW5TdGVwTnVtID09IHVuZGVmaW5lZCB8fCB0aGlzLmN1cnJlbnRTdGVwTnVtIDwgbWluU3RlcE51bSkge1xuICAgICAgICAgICAgY29tbWl0Qm9keS5taW5TdGVwcyA9IHt9XG4gICAgICAgICAgICBjb21taXRCb2R5Lm1pblN0ZXBzW21pblN0ZXBLZXldID0gdGhpcy5jdXJyZW50U3RlcE51bVxuICAgICAgICB9XG4gICAgICAgIGNvbW1pdEJvZHkucHJlTGV2ZWwgPSB0aGlzLmxldmVsXG4gICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICB2YXIgc3VjY2Vzc0NhbGxCYWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmIChuZXdTZWN0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnBsYXllckRhdGEuY3VycmVudFNlY3Rpb24gPSBuZXdTZWN0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29tbWl0Qm9keS5taW5TdGVwcyAhPSBudWxsICYmIGNvbW1pdEJvZHkubWluU3RlcHMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5taW5TdGVwc1ttaW5TdGVwS2V5XSA9IHNlbGYuY3VycmVudFN0ZXBOdW1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb21taXRCb2R5LmlzR3VpbGRlZCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgcmVxdWlyZShcImRhdGFNZ3JcIikucGxheWVyRGF0YS5pc0d1aWxkZWQgPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLnBsYXllckRhdGEuY3VycmVudExldmVsID0gbmV3TGV2ZWxcbiAgICAgICAgICAgIHNlbGYucGxheWVyRGF0YS5waHlzaWNhbFBvd2VyQ29zdGVkRmxhZyA9IDBcbiAgICAgICAgICAgIHNlbGYucGxheWVyRGF0YS5wcmVMZXZlbCA9IHNlbGYubGV2ZWxcbiAgICAgICAgICAgIHJlcXVpcmUoXCJnYW1lTWdyXCIpLmFuaW1hdGVkVG9TY2VuZShcIm1haW5TY2VuZVwiKVxuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIHJlcXVpcmUoXCJkYXRhTWdyXCIpLmNvbW1pdFBsYXllckRhdGFUb1NlcnZlcihjb21taXRCb2R5LHN1Y2Nlc3NDYWxsQmFjaylcbiAgICAgICAgXG4gICAgfSxcblxuICAgIHJlc29sdmVTaGFkb3dzKHNoYWRvd3MsZGlyZWN0aW9uKSB7XG4gICAgICAgIGZvciAodmFyIGluZGV4IGluIHNoYWRvd3MpIHtcbiAgICAgICAgICAgIHZhciBvbmVTaGFkb3cgPSBzaGFkb3dzW2luZGV4XVxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBzaGFkb3dzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFub3RoZXJTaGFkb3cgPSBzaGFkb3dzW2ldXG4gICAgICAgICAgICAgICAgaWYgKG9uZVNoYWRvdyA9PSBhbm90aGVyU2hhZG93KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHRlc3RSZXN1bHQgPSB0aGlzLl9zZWxlY3RTdGF0aWNTaGFkb3dBbmRTaGFvZHdGb3JSZXNvbHZlZChvbmVTaGFkb3csYW5vdGhlclNoYWRvdyxkaXJlY3Rpb24pXG4gICAgICAgICAgICAgICAgaWYgKHRlc3RSZXN1bHQgIT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXRpY1NoYWRvdyA9IHRlc3RSZXN1bHQuc3RhdGljU2hhZG93XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wU2hhZG93ID0gdGVzdFJlc3VsdC5zaGFkb3dGb3JSZXNvbHZlZFxuICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCJzdGF0aWM6IFwiICsgc3RhdGljU2hhZG93Lm9yaWdpbk5vZGUubmFtZSwgXCJ0ZW1wOiBcIiArIHRlbXBTaGFkb3cub3JpZ2luTm9kZS5uYW1lKVxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdGljQm9yZGVyTGluZXMgPSB0aGlzLmhlbHBlci5nZXRMaW5lc09mT25lTm9kZShzdGF0aWNTaGFkb3cpXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGF0aWNMaW5lID0gbnVsbFxuICAgICAgICAgICAgICAgICAgICB2YXIgcmF5ID0gdGhpcy5oZWxwZXIubWFrZVJheShjYy52MihzdGF0aWNTaGFkb3cueCxzdGF0aWNTaGFkb3cueSksMTAwMCxjYy52MigtZGlyZWN0aW9uLngsLWRpcmVjdGlvbi55KSlcblxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGsgaW4gc3RhdGljQm9yZGVyTGluZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaW5lID0gc3RhdGljQm9yZGVyTGluZXNba11cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaXMgPSB0aGlzLmhlbHBlci5yYXlUZXN0KHJheSxsaW5lKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpcyAhPSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0xpbmUgPSBsaW5lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3UG9pbnQyID0gdGhpcy5oZWxwZXIubWFrZVJheShzdGF0aWNMaW5lLnAyLDEwMDAsY2MudjIoc3RhdGljTGluZS5wMi54IC0gc3RhdGljTGluZS5wMS54LCBzdGF0aWNMaW5lLnAyLnkgLSBzdGF0aWNMaW5lLnAxLnkpKS5wMlxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3UG9pbnQxID0gdGhpcy5oZWxwZXIubWFrZVJheShzdGF0aWNMaW5lLnAxLDEwMDAsY2MudjIoc3RhdGljTGluZS5wMS54IC0gc3RhdGljTGluZS5wMi54LCBzdGF0aWNMaW5lLnAxLnkgLSBzdGF0aWNMaW5lLnAyLnkpKS5wMlxuICAgICAgICAgICAgICAgICAgICBzdGF0aWNMaW5lID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcDE6IG5ld1BvaW50MSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHAyOiBuZXdQb2ludDJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgcmF5MSA9IHRoaXMuaGVscGVyLm1ha2VSYXkodGVtcFNoYWRvdy5vcmlnaW5Ob2RlLnBvc2l0aW9uLDMwMDAsZGlyZWN0aW9uKVxuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudERpc3RhbmNlID0gdGhpcy5oZWxwZXIucmF5VGVzdChyYXkxLHN0YXRpY0xpbmUpXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXREaXMgPSB0aGlzLmhlbHBlci5nZXREaXNUb1NlbGZCb3JkZXIodGVtcFNoYWRvdy5vcmlnaW5Ob2RlLGRpcmVjdGlvbikgKyB0ZW1wU2hhZG93Lm9yaWdpbk5vZGUuZ2V0Q29tcG9uZW50KFwiYnVsbGV0TWdyXCIpLmRpc0Zyb21Cb3JkZXJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1aXRhYmxlUG9zaXRpb24gPSB0aGlzLmhlbHBlci5nZXRTdWl0YWJsZVBvaW50KHRlbXBTaGFkb3cub3JpZ2luTm9kZS5wb3NpdGlvbixjdXJyZW50RGlzdGFuY2UsdGFyZ2V0RGlzLGRpcmVjdGlvbilcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVwZGF0ZWREaXMgPSBjYy52MihzdWl0YWJsZVBvc2l0aW9uLnggLSB0ZW1wU2hhZG93Lm9yaWdpbk5vZGUueCwgc3VpdGFibGVQb3NpdGlvbi55IC0gdGVtcFNoYWRvdy5vcmlnaW5Ob2RlLnkpLm1hZygpXG4gICAgICAgICAgICAgICAgICAgIHRlbXBTaGFkb3cueCA9IHN1aXRhYmxlUG9zaXRpb24ueFxuICAgICAgICAgICAgICAgICAgICB0ZW1wU2hhZG93LnkgPSBzdWl0YWJsZVBvc2l0aW9uLnlcbiAgICAgICAgICAgICAgICAgICAgdGVtcFNoYWRvdy5kaXMgPSB1cGRhdGVkRGlzXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfSxcbiAgICBfc2VsZWN0U3RhdGljU2hhZG93QW5kU2hhb2R3Rm9yUmVzb2x2ZWQoc2hhZG93MSwgc2hhZG93MiwgZGlyZWN0aW9uKSB7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgIHZhciB0ZW1wID0gZnVuY3Rpb24oczEsIHMyKSB7XG4gICAgICAgICAgICB2YXIgZGlzID0gczEuZGlzXG4gICAgICAgICAgICB2YXIgb3JpZ2luQ3Jvc3NGbGFnID0gZmFsc2VcbiAgICAgICAgICAgIHZhciBzaGFkb3dDcm9zc0ZsYWcgPSBmYWxzZVxuXG4gICAgICAgICAgICB2YXIgb3JpZ2luTGluZXMgPSBzZWxmLmhlbHBlci5nZXRMaW5lc09mT25lTm9kZShzMilcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBvcmlnaW5MaW5lcykge1xuICAgICAgICAgICAgICAgIHZhciBvbmVMaW5lID0gb3JpZ2luTGluZXNba2V5XVxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmhlbHBlci5pc09uZU5vZGVXaWxsQ29sbGlkV2l0aE9uZUxpbmVJbkRpcmVjdGlvbihzMS5vcmlnaW5Ob2RlLG9uZUxpbmUsZGlyZWN0aW9uLGRpcykgIT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luQ3Jvc3NGbGFnID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9yaWdpbkNyb3NzRmxhZyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2hhZG93TGluZXMgPSBzZWxmLmhlbHBlci5nZXRMaW5lc09mT25lTm9kZShzMi5vcmlnaW5Ob2RlKVxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHNoYWRvd0xpbmVzKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9uZUxpbmUgPSBzaGFkb3dMaW5lc1trZXldXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuaGVscGVyLmlzT25lTm9kZVdpbGxDb2xsaWRXaXRoT25lTGluZUluRGlyZWN0aW9uKHMxLm9yaWdpbk5vZGUsb25lTGluZSxkaXJlY3Rpb24sZGlzKSAhPSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBzaGFkb3dDcm9zc0ZsYWcgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2hhZG93Q3Jvc3NGbGFnID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGVtcChzaGFkb3cxLHNoYWRvdzIpID09IHRydWUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgc3RhdGljU2hhZG93OiBzaGFkb3cyLFxuICAgICAgICAgICAgICAgIHNoYWRvd0ZvclJlc29sdmVkOiBzaGFkb3cxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGVtcChzaGFkb3cyLHNoYWRvdzEpID09IHRydWUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgc3RhdGljU2hhZG93OiBzaGFkb3cxLFxuICAgICAgICAgICAgICAgIHNoYWRvd0ZvclJlc29sdmVkOiBzaGFkb3cyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSxcblxuICAgIGdlbmVyYXRlV2FsbHMoKSB7XG4gICAgICAgIHZhciBsZXZlbENvbmZpZyA9IHJlcXVpcmUoXCJsZXZlbENvbmZpZ1wiKVxuICAgICAgICB2YXIgY3VycmVudExldmVsID0gdGhpcy5sZXZlbFxuXG4gICAgICAgIHZhciBjb25maWcgPSBsZXZlbENvbmZpZ1tjdXJyZW50TGV2ZWxdXG4gICAgICAgIHZhciB3YWxsc05vZGUgPSBjYy5maW5kKFwiQ2FudmFzL3dhbGxzXCIpXG4gICAgICAgIGZvciAodmFyIGluZGV4IGluIGNvbmZpZy53YWxsUGF0aGVzKSB7XG4gICAgICAgICAgICB2YXIgb25lUGF0aCA9IGNvbmZpZy53YWxsUGF0aGVzW2luZGV4XVxuXG4gICAgICAgICAgICB2YXIgcG9pbnRzID0gb25lUGF0aC5wb2ludHNcbiAgICAgICAgICAgIHZhciByZWFsUG9pbnRzID0gW11cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlYWxQb2ludCA9IG51bGxcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWxQb2ludCA9IGNjLnYyKHBvaW50c1tpXS54LCBwb2ludHNbaV0ueSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50UG9pbnQgPSBwb2ludHNbaV1cbiAgICAgICAgICAgICAgICAgICAgcmVhbFBvaW50ID0gY2MudjIocmVhbFBvaW50c1tpIC0gMV0ueCArIGN1cnJlbnRQb2ludC54LCByZWFsUG9pbnRzW2kgLSAxXS55ICsgY3VycmVudFBvaW50LnkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJlYWxQb2ludHMucHVzaChyZWFsUG9pbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbGluZVdpZHRoID0gb25lUGF0aC5saW5lV2lkdGhcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSBvbmVQYXRoLm9mZnNldFxuICAgICAgICAgICAgdmFyIHdhbGxOb2RlcyA9IFtdXG4gICAgICAgICAgICB2YXIgaXNDbG9zZWQgPSBvbmVQYXRoLmlzQ2xvc2VkXG4gICAgICAgICAgICBpZiAoaXNDbG9zZWQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBzdGFydFBvaW50ID0gcmVhbFBvaW50c1swXVxuICAgICAgICAgICAgICAgIHJlYWxQb2ludHMucHVzaChzdGFydFBvaW50KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiByZWFsUG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGluZVByZWZhYilcbiAgICAgICAgICAgICAgICBub2RlLmhlaWdodCA9IGxpbmVXaWR0aFxuICAgICAgICAgICAgICAgIHZhciBkaXJlY3RlZExpbmUgPSBjYy52MihyZWFsUG9pbnRzW2ldLnggLSByZWFsUG9pbnRzW2kgLSAxXS54LCByZWFsUG9pbnRzW2ldLnkgLSByZWFsUG9pbnRzW2kgLSAxXS55KVxuICAgICAgICAgICAgICAgIG5vZGUud2lkdGggPSBkaXJlY3RlZExpbmUubWFnKClcbiAgICBcbiAgICAgICAgICAgICAgICB2YXIgZGVncmVlID0gZGlyZWN0ZWRMaW5lLnNpZ25BbmdsZShjYy52MigxLDApKSAvIE1hdGguUEkgKiAxODBcbiAgICAgICAgICAgICAgICBub2RlLmFuZ2xlID0gLWRlZ3JlZVxuICAgICAgICAgICAgICAgIG5vZGUueCA9IHJlYWxQb2ludHNbaV0ueCAtIGRpcmVjdGVkTGluZS54IC8gMlxuICAgICAgICAgICAgICAgIG5vZGUueSA9IHJlYWxQb2ludHNbaV0ueSAtIGRpcmVjdGVkTGluZS55IC8gMlxuICAgICAgICAgICAgICAgIHZhciBvZmZzZXREaXJlY3Rpb24gPSBkaXJlY3RlZExpbmUucm90YXRlKE1hdGguUEkgLyAyKVxuICAgICAgICAgICAgICAgIG9mZnNldERpcmVjdGlvbi5ub3JtYWxpemVTZWxmKClcbiAgICAgICAgICAgICAgICBub2RlLnggKz0gbm9kZS5oZWlnaHQgLyAyICogb2Zmc2V0RGlyZWN0aW9uLnhcbiAgICAgICAgICAgICAgICBub2RlLnkgKz0gbm9kZS5oZWlnaHQgLyAyICogb2Zmc2V0RGlyZWN0aW9uLnlcblxuICAgICAgICAgICAgICAgIG5vZGUueCArPSBvZmZzZXQueFxuICAgICAgICAgICAgICAgIG5vZGUueSArPSBvZmZzZXQueVxuICAgICAgICAgICAgICAgIHdhbGxOb2Rlcy5wdXNoKG5vZGUpXG4gICAgICAgICAgICAgICAgd2FsbHNOb2RlLmFkZENoaWxkKG5vZGUpICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGJ1bGxldENvbmZpZyA9IGNvbmZpZy5idWxsZXRzXG4gICAgICAgIHZhciBidWxsZXRzTm9kZSA9IGNjLmZpbmQoXCJDYW52YXMvYnVsbGV0c1wiKVxuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBidWxsZXRDb25maWcpIHtcbiAgICAgICAgICAgIHZhciBjb24gPSBidWxsZXRDb25maWdbaW5kZXhdXG4gICAgICAgICAgICB2YXIgYnVsbGV0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5idWxsZXRQcmVmYWIpXG4gICAgICAgICAgICBidWxsZXQueCA9IGNvbi54XG4gICAgICAgICAgICBidWxsZXQueSA9IGNvbi55XG4gICAgICAgICAgICBidWxsZXQud2lkdGggPSBidWxsZXQud2lkdGggKiBjb24uc2NhbGVcbiAgICAgICAgICAgIGJ1bGxldC5oZWlnaHQgPSBidWxsZXQuaGVpZ2h0ICogY29uLnNjYWxlXG4gICAgICAgICAgICBidWxsZXRzTm9kZS5hZGRDaGlsZChidWxsZXQpXG4gICAgICAgIH0gXG4gICAgfSxcblxuXG4gICAgb25DbGlja1JldHJ5QnV0dG9uKCkge1xuICAgICAgICB2YXIgZ2FtZU1nciA9IHJlcXVpcmUoXCJnYW1lTWdyXCIpXG4gICAgICAgIGlmICh0aGlzLmhlYXJ0Rm9yUmV0cnlDb3N0ID09IDApIHtcbiAgICAgICAgICAgIGdhbWVNZ3IuZW50ZXJMZXZlbFNjZW5lKHRoaXMubGV2ZWwpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB2YXIgdGVtcCA9IHRoaXMucGxheWVyRGF0YS5oZWFydCAtIHRoaXMuaGVhcnRGb3JSZXRyeUNvc3RcbiAgICAgICAgaWYgKHRlbXAgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjb21taXRCb2R5ID0ge1xuICAgICAgICAgICAgaGVhcnQ6IHRlbXBcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgdmFyIHN1Y2Nlc3NDYWxsQmFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5wbGF5ZXJEYXRhLmhlYXJ0ID0gdGVtcFxuICAgICAgICAgICAgLy8gc2VsZi5oZWFydCA9IHRlbXBcbiAgICAgICAgICAgIGdhbWVNZ3IuZW50ZXJMZXZlbFNjZW5lKHNlbGYubGV2ZWwpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXRyeUJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZVxuICAgICAgICByZXF1aXJlKFwiZGF0YU1nclwiKS5jb21taXRQbGF5ZXJEYXRhVG9TZXJ2ZXIoY29tbWl0Qm9keSxzdWNjZXNzQ2FsbEJhY2spXG4gICAgfSxcbiAgICBvbkFsbFJldHJ5RmFpbGVkKCkge1xuICAgICAgICB0aGlzLnJldHJ5QnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWVcbiAgICB9LFxuXG4gICAgb25DbGlja0JhY2tCdXR0b24oKSB7XG4gICAgICAgIC8vIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIm1haW5TY2VuZVwiKVxuICAgICAgICByZXF1aXJlKFwiZ2FtZU1nclwiKS5hbmltYXRlZFRvU2NlbmUoXCJtYWluU2NlbmVcIilcbiAgICB9LFxuXG4gICAgc2V0dXBOb2Rlc0J5Q29uZmlnKCkge1xuICAgICAgICB2YXIgd2FsbFByZWZhYiA9IHJlcXVpcmUoXCJyZXNNZ3JcIikucmVzZXNbXCJ3YWxsUHJlZmFiXCJdXG4gICAgICAgIHZhciBidWxsZXRQcmVmYWIgPSByZXF1aXJlKFwicmVzTWdyXCIpLnJlc2VzW1wiYnVsbGV0UHJlZmFiXCJdXG4gICAgICAgIHZhciB0YXJnZXRQcmVmYWIgPSByZXF1aXJlKFwicmVzTWdyXCIpLnJlc2VzW1widGFyZ2V0UHJlZmFiXCJdXG4gICAgICAgIHZhciBwYXRoV2F5UHJlZmFiID0gcmVxdWlyZShcInJlc01nclwiKS5yZXNlc1tcInBhdGhXYXlQcmVmYWJcIl1cbiAgICAgICAgdmFyIGxldmVsU2NlbmVDb25maWcgPSByZXF1aXJlKFwibGV2ZWxTY2VuZUNvbmZpZ1wiKVt0aGlzLmxldmVsXVxuXG4gICAgICAgIHRoaXMuX3NldHVwRmlsbE5vZGVzKGxldmVsU2NlbmVDb25maWcpXG4gICAgICAgIHRoaXMuX3NldHVwV2FsbHMobGV2ZWxTY2VuZUNvbmZpZyx3YWxsUHJlZmFiKVxuICAgICAgICB0aGlzLl9zZXR1cFRhcmdldHMobGV2ZWxTY2VuZUNvbmZpZyx0YXJnZXRQcmVmYWIpXG4gICAgICAgIHRoaXMuX3NldHVwUGF0aFdheXNOb2RlKGxldmVsU2NlbmVDb25maWcscGF0aFdheVByZWZhYilcbiAgICAgICAgdGhpcy5fc2V0dXBCdWxsZXRzKGxldmVsU2NlbmVDb25maWcsYnVsbGV0UHJlZmFiKVxuICAgIH0sXG4gICAgX3NldHVwTm9kZVByb3BlcnR5QnlDb25maWcoZ2l2ZW5Ob2RlLCBnaXZlbkNvbmZpZykge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gZ2l2ZW5Db25maWcpIHtcbiAgICAgICAgICAgIGdpdmVuTm9kZVtrZXldID0gZ2l2ZW5Db25maWdba2V5XVxuICAgICAgICB9XG4gICAgfSxcbiAgICBfc2V0dXBGaWxsTm9kZXMobGV2ZWxTY2VuZUNvbmZpZykge1xuICAgICAgICB2YXIgZmlsbE5vZGVzQ29uZmlnID0gbGV2ZWxTY2VuZUNvbmZpZy5maWxsTm9kZXNcbiAgICAgICAgdmFyIGZpbGxOb2RlcyA9IGNjLmZpbmQoXCJDYW52YXMvZmlsbE5vZGVzXCIpXG4gICAgICAgIGZvcih2YXIgaW5kZXggaW4gZmlsbE5vZGVzQ29uZmlnKSB7XG4gICAgICAgICAgICB2YXIgb25lTm9kZUNvbmZpZyA9IGZpbGxOb2Rlc0NvbmZpZ1tpbmRleF1cbiAgICAgICAgICAgIHZhciBvbmVOb2RlID0gbmV3IGNjLk5vZGUoKVxuICAgICAgICAgICAgdGhpcy5fc2V0dXBOb2RlUHJvcGVydHlCeUNvbmZpZyhvbmVOb2RlLG9uZU5vZGVDb25maWcpXG4gICAgICAgICAgICBmaWxsTm9kZXMuYWRkQ2hpbGQob25lTm9kZSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfc2V0dXBXYWxscyhsZXZlbFNjZW5lQ29uZmlnLHdhbGxQcmVmYWIpIHtcbiAgICAgICAgdmFyIHdhbGxzQ29uZmlnID0gbGV2ZWxTY2VuZUNvbmZpZy53YWxsc1xuICAgICAgICB2YXIgd2FsbHMgPSBjYy5maW5kKFwiQ2FudmFzL3dhbGxzXCIpXG4gICAgICAgIGZvcih2YXIgaW5kZXggaW4gd2FsbHNDb25maWcpIHtcbiAgICAgICAgICAgIHZhciBvbmVXYWxsQ29uZmlnID0gd2FsbHNDb25maWdbaW5kZXhdXG4gICAgICAgICAgICB2YXIgb25lV2FsbE5vZGUgPSBjYy5pbnN0YW50aWF0ZSh3YWxsUHJlZmFiKVxuICAgICAgICAgICAgdGhpcy5fc2V0dXBOb2RlUHJvcGVydHlCeUNvbmZpZyhvbmVXYWxsTm9kZSxvbmVXYWxsQ29uZmlnKVxuICAgICAgICAgICAgd2FsbHMuYWRkQ2hpbGQob25lV2FsbE5vZGUpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3NldHVwVGFyZ2V0cyhsZXZlbFNjZW5lQ29uZmlnLCB0YXJnZXRQcmVmYWIpIHtcbiAgICAgICAgdmFyIHRhcmdldHNDb25maWcgPSBsZXZlbFNjZW5lQ29uZmlnLnRhcmdldHNcbiAgICAgICAgdmFyIHRhcmdldHMgPSBjYy5maW5kKFwiQ2FudmFzL3RhcmdldHNcIikgXG4gICAgICAgIGZvciAodmFyIGluZGV4IGluIHRhcmdldHNDb25maWcpIHtcbiAgICAgICAgICAgIHZhciBvbmVUYXJnZXRDb25maWcgPSB0YXJnZXRzQ29uZmlnW2luZGV4XVxuICAgICAgICAgICAgdmFyIG9uZVRhcmdldE5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0YXJnZXRQcmVmYWIpXG4gICAgICAgICAgICB0aGlzLl9zZXR1cE5vZGVQcm9wZXJ0eUJ5Q29uZmlnKG9uZVRhcmdldE5vZGUsb25lVGFyZ2V0Q29uZmlnKVxuICAgICAgICAgICAgdGFyZ2V0cy5hZGRDaGlsZChvbmVUYXJnZXROb2RlKVxuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBfc2V0dXBQYXRoV2F5c05vZGUobGV2ZWxTY2VuZUNvbmZpZyxwYXRoV2F5UHJlZmFiKSB7XG4gICAgICAgIHZhciBwYXRoV2F5c0NvbmZpZyA9IGxldmVsU2NlbmVDb25maWcucGF0aFdheXNOb2RlXG4gICAgICAgIHZhciBwYXRoV2F5c05vZGUgPSBjYy5maW5kKFwiQ2FudmFzL3BhdGhXYXlzTm9kZVwiKVxuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBwYXRoV2F5c0NvbmZpZykge1xuICAgICAgICAgICAgdmFyIG9uZVBhdGhXYXlDb25maWcgPSBwYXRoV2F5c0NvbmZpZ1tpbmRleF1cbiAgICAgICAgICAgIHZhciBvbmVQYXRoV2F5Tm9kZSA9IG5ldyBjYy5Ob2RlKG9uZVBhdGhXYXlDb25maWcubmFtZSlcbiAgICAgICAgICAgIGZvciAodmFyIGluZGV4IGluIG9uZVBhdGhXYXlDb25maWcuY2hpbGRyZW4pe1xuICAgICAgICAgICAgICAgIHZhciBvbmVDaGlsZENvbmZpZyA9IG9uZVBhdGhXYXlDb25maWcuY2hpbGRyZW5baW5kZXhdXG4gICAgICAgICAgICAgICAgdmFyIG9uZUNoaWxkTm9kZSA9IGNjLmluc3RhbnRpYXRlKHBhdGhXYXlQcmVmYWIpXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0dXBOb2RlUHJvcGVydHlCeUNvbmZpZyhvbmVDaGlsZE5vZGUsb25lQ2hpbGRDb25maWcpXG4gICAgICAgICAgICAgICAgb25lUGF0aFdheU5vZGUuYWRkQ2hpbGQob25lQ2hpbGROb2RlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF0aFdheXNOb2RlLmFkZENoaWxkKG9uZVBhdGhXYXlOb2RlKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9zZXR1cEJ1bGxldHMobGV2ZWxTY2VuZUNvbmZpZywgYnVsbGV0UHJlZmFiKSB7XG4gICAgICAgIHZhciBidWxsZXRzQ29uZmlnID0gbGV2ZWxTY2VuZUNvbmZpZy5idWxsZXRzXG4gICAgICAgIHZhciBidWxsZXRzID0gY2MuZmluZChcIkNhbnZhcy9idWxsZXRzXCIpXG4gICAgICAgIGZvciAodmFyIGluZGV4IGluIGJ1bGxldHNDb25maWcpIHtcbiAgICAgICAgICAgIHZhciBvbmVCdWxsZXRDb25maWcgPSBidWxsZXRzQ29uZmlnW2luZGV4XVxuICAgICAgICAgICAgdmFyIG9uZUJ1bGxldE5vZGUgPSBjYy5pbnN0YW50aWF0ZShidWxsZXRQcmVmYWIpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBiYXNpY0NvbmZpZyA9IG9uZUJ1bGxldENvbmZpZy5iYXNpY1xuICAgICAgICAgICAgLy90aGlzLl9zZXR1cE5vZGVQcm9wZXJ0eUJ5Q29uZmlnKG9uZUJ1bGxldE5vZGUsYmFzaWNDb25maWcpXG4gICAgICAgICAgICB2YXIgbWdyQ29uZmlnID0gb25lQnVsbGV0Q29uZmlnLm1nclxuICAgICAgICAgICAgdmFyIGJ1bGxldE1nciA9IG9uZUJ1bGxldE5vZGUuZ2V0Q29tcG9uZW50KFwiYnVsbGV0TWdyXCIpXG4gICAgICAgICAgICBidWxsZXRNZ3IuYnVsbGV0VHlwZSA9IG1nckNvbmZpZy5idWxsZXRUeXBlXG4gICAgICAgICAgICBpZiAobWdyQ29uZmlnLmJ1bGxldFR5cGUgPT0gMikge1xuICAgICAgICAgICAgICAgIG9uZUJ1bGxldE5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBidWxsZXRNZ3Iuc2xpZGVyRnJhbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3NldHVwTm9kZVByb3BlcnR5QnlDb25maWcob25lQnVsbGV0Tm9kZSxiYXNpY0NvbmZpZylcbiAgICAgICAgICAgIGlmIChidWxsZXRNZ3IuYnVsbGV0VHlwZSA9PSAyKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1nckNvbmZpZy5wYXRoV2F5c05vZGVOYW1lICE9IFwiXCIgJiYgbWdyQ29uZmlnLnBhdGhXYXlzTm9kZU5hbWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aFdheXNOb2RlUGF0aCA9IFwiQ2FudmFzL3BhdGhXYXlzTm9kZS9cIiArIG1nckNvbmZpZy5wYXRoV2F5c05vZGVOYW1lXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXRoV2F5c05vZGUgPSBjYy5maW5kKHBhdGhXYXlzTm9kZVBhdGgpXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldE1nci5wYXRoV2F5c05vZGUgPSBwYXRoV2F5c05vZGVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYy5sb2coaW5kZXgsb25lQnVsbGV0Tm9kZS53aWR0aCwgb25lQnVsbGV0Tm9kZS5oZWlnaHQpXG4gICAgICAgICAgICBidWxsZXRzLmFkZENoaWxkKG9uZUJ1bGxldE5vZGUpXG4gICAgICAgICAgICBjYy5sb2coaW5kZXgsb25lQnVsbGV0Tm9kZS53aWR0aCwgb25lQnVsbGV0Tm9kZS5oZWlnaHQpXG4gICAgICAgIH1cbiAgICB9LFxuXG5cbiAgICBkYXRhTW9uaXRvcmVkKGtleSx2YWx1ZSkge1xuICAgICAgICBpZiAoa2V5LmluZGV4T2YoXCJtaW5TdGVwX2xldmVsX1wiKSAhPSAtMSkge1xuICAgICAgICAgICAgLy90eXBpY2FsbHkgb25lIGtleSBpcyBcIm1pblN0ZXBfbGV2ZWxfMVwiXG4gICAgICAgICAgICB2YXIgbGV2ZWxJZCA9IGtleS5zbGljZSgxNClcbiAgICAgICAgICAgIGlmIChwYXJzZUludChsZXZlbElkKSA9PSBwYXJzZUludCh0aGlzLmxldmVsKSkge1xuICAgICAgICAgICAgICAgIHZhciBtaW5TdGVwTnVtTGFiZWwgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1aU5vZGVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJtaW5TdGVwTnVtTGFiZWxcIilcbiAgICAgICAgICAgICAgICAvL21pblN0ZXBOdW1MYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi5pyA5bCP5q2l5pWw77yaXCIgKyB2YWx1ZS50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgbWluU3RlcE51bUxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcmVxdWlyZShcInRleHRDb25maWdcIikuZ2V0Rm9ybWF0ZWRTdHJpbmcoMTUzLFt2YWx1ZS50b1N0cmluZygpXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgaWYgKGtleSA9PSBcImhlYXJ0XCIpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhcnQgPSB2YWx1ZVxuICAgICAgICB9XG4gICAgfVxuXG59KTtcblxuIl19