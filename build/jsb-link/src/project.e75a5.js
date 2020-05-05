window.__require = function e(t, i, h) {
function n(g, o) {
if (!i[g]) {
if (!t[g]) {
var s = g.split("/");
s = s[s.length - 1];
if (!t[s]) {
var l = "function" == typeof __require && __require;
if (!o && l) return l(s, !0);
if (a) return a(s, !0);
throw new Error("Cannot find module '" + g + "'");
}
g = s;
}
var d = i[g] = {
exports: {}
};
t[g][0].call(d.exports, function(e) {
return n(t[g][1][e] || e);
}, d, d.exports, e, t, i, h);
}
return i[g].exports;
}
for (var a = "function" == typeof __require && __require, g = 0; g < h.length; g++) n(h[g]);
return n;
}({
_mainSceneMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "c5bd2cNtixMsrSjayquVQFU", "_mainSceneMgr");
cc.Class({
extends: cc.Component,
properties: {
playerData: null,
levelsStartPosition: cc.v2(0, 0),
levelsHorDis: 60,
levelsVerDis: 60,
levelsHorNum: 5,
levelNodePrefab: cc.Prefab,
lockedLevelColor: cc.color,
unlockedLevelColor: cc.color,
currentLevelColor: cc.color,
physicalPower: {
get: function() {
return this._physicalPower;
},
set: function(e) {
this._physicalPower = e;
this.node.getChildByName("physicalPowerLabel").getComponent(cc.Label).string = this.playerData.physicalPower.toString();
}
},
physicalPowerForChallengeCost: {
get: function() {
return this._physicalPowerForChallengeCost;
},
set: function(e) {
this._physicalPowerForChallengeCost = e;
var t = this.challengeButton.getChildByName("physicalPowerLabel"), i = cc.find("Canvas/commentLabel"), h = this.challengeButton.getChildByName("physicalPower");
if (null == e) {
h.active = !1;
t.active = !1;
} else {
h.active = !0;
t.active = !0;
t.getComponent(cc.Label).string = e.toString();
if (e <= this.physicalPower) {
this.challengeButton.getComponent(cc.Button).interactable = !0;
i.getComponent(cc.Label).string = 0 == e ? "已挑战过的关卡不会消耗体力" : "每天挑战每个新的关卡时会消耗体力";
} else {
this.challengeButton.getComponent(cc.Button).interactable = !1;
i.getComponent(cc.Label).string = "每天挑战每个新的关卡时会消耗体力";
}
}
}
},
heartForChallengeCost: {
get: function() {
return this._heartForChallengeCost;
},
set: function(e) {
this._heartForChallengeCost = e;
var t = this.challengeButton.getChildByName("heartLabel"), i = this.challengeButton.getChildByName("heart");
if (null == e) {
t.active = !1;
i.active = !1;
} else {
t.active = !0;
i.active = !0;
t.getComponent(cc.Label).string = e.toString();
e <= this.heart ? this.challengeButton.getComponent(cc.Button).interactable = !0 : this.challengeButton.getComponent(cc.Button).interactable = !1;
}
}
},
selectedLevel: {
get: function() {
return this._selectedLevel;
},
set: function(t) {
this._selectedLevel = t;
if (null != t) {
if (t == this.playerData.currentLevel && 0 == this.playerData.physicalPowerCostedFlag) {
this.heartForChallengeCost = null;
var i = e("levelConfig")[t].physicalPowerCost;
1 == this.playerData.initAdWatchedFlag && (i = Math.round(i / 2));
this.physicalPowerForChallengeCost = i;
} else if (t == this.playerData.currentLevel && 1 == this.playerData.physicalPowerCostedFlag) {
this.physicalPowerForChallengeCost = null;
this.heartForChallengeCost = e("levelConfig")[t].heartForRetryCost;
} else {
this.heartForChallengeCost = null;
this.physicalPowerForChallengeCost = 0;
}
null != this.levelAresNodes[t] && (this.selectedLevelAreaNode = this.levelAresNodes[t]);
}
}
},
selectedLevelAreaNode: {
get: function() {
return this._selectedLevelAreaNode;
},
set: function(e) {
this._selectedLevelAreaNode = e;
if (null != e) if (0 == this.selectedEffect.active) {
this.selectedEffect.x = this.selectedLevelAreaNode.x;
this.selectedEffect.y = this.selectedLevelAreaNode.y;
this.selectedEffect.active = !0;
} else cc.tween(this.selectedEffect).to(.2, {
x: this.selectedLevelAreaNode.x,
y: this.selectedLevelAreaNode.y
}).start(); else this.selectedEffect.active = !1;
}
},
selectedEffect: cc.Node,
levelAresNodes: {
default: {}
},
challengeButton: null,
heartLabel: cc.Label,
heart: {
get: function() {
return this._heart;
},
set: function(e) {
this._heart = e;
this.heartLabel.string = e.toString();
}
}
},
onLoad: function() {
this.playerData = e("dataMgr").playerData;
this.lockedLevelColor = cc.color(191, 191, 191);
this.unlockedLevelColor = cc.color(102, 102, 102);
this.currentLevelColor = cc.color(188, 36, 36);
this.challengeButton = this.node.getChildByName("challengeButton");
this.playerName = this.playerData.name;
this.physicalPower = this.playerData.physicalPower;
this.heart = this.playerData.heart;
e("networkMgr").delegate = this;
var t = this.node.getChildByName("signInButton");
t.on("click", function() {
e("systemsMgr").showSystem("signInSys");
});
t.getComponent("redPointMgr").redPointShowCondition = function() {
switch (e("dataMgr").playerData.signInStatus) {
case 1:
case 2:
return !0;

default:
return !1;
}
};
var i = this.node.getChildByName("welfaryButton");
if (1 == e("dataMgr").playerData.initAdWatchedFlag) i.active = !1; else {
i.on("click", function() {
e("systemsMgr").showSystem("welfarySys");
});
cc.tween(i).repeatForever(cc.tween().to(.3, {
angle: -45
}).to(.3, {
angle: 0
}).to(.3, {
angle: 45
}).to(.3, {
angle: 0
}).delay(1)).start();
}
this.node.getChildByName("addButton_heart").on("click", function() {
e("systemsMgr").showSystem("addPropertyNumSys", 2);
});
this.node.getChildByName("addButton_phy").on("click", function() {
e("systemsMgr").showSystem("addPropertyNumSys", 1);
});
var h = this.node.getChildByName("mailButton");
h.on("click", function() {
e("systemsMgr").showSystem("mailSys");
});
h.getComponent("redPointMgr").redPointShowCondition = function() {
var t = e("dataMgr").playerData.mails, i = 0;
for (var h in t) {
0 == t[h].status && (i += 1);
}
return i > 0;
};
this.setupSection(this.playerData.currentSection);
},
start: function() {},
setupSection: function(t) {
var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
this.selectedLevel = null;
var h = e("sectionConfig")[t];
this.node.getChildByName("sectionTitleLabel").getComponent(cc.Label).string = h.sectionTitle;
this.node.getChildByName("sectionDescripLabel").getComponent(cc.Label).string = h.sectionDescrip;
var n = h.levels;
this.levelAresNodes = {};
for (var a in n) {
var g = parseInt(a) + 1;
1 == (g = g.toString()).length && (g = "0" + g);
var o = cc.instantiate(this.levelNodePrefab);
o.getComponent(cc.Label).string = g;
o.x = a % this.levelsHorNum * (this.levelsHorDis + o.width) + this.levelsStartPosition.x;
o.y = -Math.floor(a / this.levelsHorNum) * (this.levelsVerDis + o.width) + this.levelsStartPosition.y;
switch (this.checkLevelStatus(n[a])) {
case 0:
o.color = this.lockedLevelColor;
break;

case 1:
o.color = this.unlockedLevelColor;
break;

case 2:
o.color = this.currentLevelColor;
}
o.getComponent("levelAreaNodeMgr").delegate = this;
o.getComponent("levelAreaNodeMgr").level = n[a];
this.levelAresNodes[n[a]] = o;
cc.find("Canvas/levelsArea").addChild(o);
}
var s = h.backgroundPath, l = this;
cc.loader.loadRes(s, cc.SpriteFrame, function(e, t) {
l.node.getChildByName("sectionBg").getComponent(cc.Sprite).spriteFrame = t;
i();
});
t == this.playerData.currentSection && (this.selectedLevel = this.playerData.currentLevel);
},
checkSectionStatus: function(e) {
var t = this.playerData.currentSection;
return e > t ? 0 : e < t ? 1 : e == t ? 2 : void 0;
},
checkLevelStatus: function(t) {
var i = e("sectionConfig"), h = function() {
for (var e in i) {
var h = i[e].levels;
for (var n in h) if (t == h[n]) return e;
}
return !1;
}();
if (0 == h) return !1;
h = parseInt(h);
switch (this.checkSectionStatus(h)) {
case 0:
return 0;

case 1:
return 1;

case 2:
var n = this.playerData.currentLevel;
if (n == t) return 2;
for (var a in e("sectionConfig")[h].levels) {
var g = e("sectionConfig")[h].levels[a];
if (g == t) return 1;
if (g == n) return 0;
}
}
},
onClickChallengeButton: function() {
var t = e("gameMgr");
this.challengeButton.getComponent(cc.Button).interactable = !1;
if (0 != this.physicalPowerForChallengeCost) {
var i = null, h = null;
if (null != this.physicalPowerForChallengeCost) {
if ((i = this.playerData.physicalPower - this.physicalPowerForChallengeCost) < 0) return;
var n = this.playerData.physicalPowerCostedFlag;
this.selectedLevel == this.playerData.currentLevel && 0 == this.playerData.physicalPowerCostedFlag && (n = 1);
h = {
physicalPower: i,
physicalPowerCostedFlag: n
};
}
if (null != this.heartForChallengeCost) {
if ((i = this.playerData.heart - this.heartForChallengeCost) < 0) return;
h = {
heart: i
};
}
var a = this;
e("dataMgr").commitPlayerDataToServer(h, function() {
if (null != a.physicalPowerForChallengeCost) {
a.playerData.physicalPower = i;
a.playerData.physicalPowerCostedFlag = n;
}
null != a.heartForChallengeCost && (a.playerData.heart = i);
t.enterLevelScene(a.selectedLevel);
});
} else t.enterLevelScene(this.selectedLevel);
},
onAllRetryFailed: function() {
this.challengeButton.getComponent(cc.Button).interactable = !0;
},
dataMonitored: function(e, t) {
"physicalPower" == e ? this.physicalPower = t : "heart" == e && (this.heart = t);
}
});
cc._RF.pop();
}, {
dataMgr: "dataMgr",
gameMgr: "gameMgr",
levelConfig: "levelConfig",
networkMgr: "networkMgr",
sectionConfig: "sectionConfig",
systemsMgr: "systemsMgr"
} ],
addPropertyNumSysMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "5666fBzlDdAnK8GSZS/8Y1e", "addPropertyNumSysMgr");
cc.Class({
extends: cc.Component,
properties: {
ensureButtonNode: cc.Node,
cancelButtonNode: cc.Node,
desLabelNode: cc.Node,
addTypeId: 1,
addConfig: null,
sysName: "addPropertyNumSys"
},
start: function() {
this.setupData();
this.setupUI();
},
setupData: function() {
var t = e("addPropertySysConfig");
t = t[this.addTypeId];
this.addConfig = t;
},
setupUI: function() {
var t = e("textConfig"), i = t.getTextByIdAndLanguageType(123), h = !0;
for (var n in this.addConfig) {
0 == h && (i += "，");
switch (n) {
case "physicalPower":
i += t.getTextByIdAndLanguageType(124) + this.addConfig[n].toString();
break;

case "heart":
i += t.getTextByIdAndLanguageType(125) + this.addConfig[n].toString();
}
h = !1;
}
i += t.getTextByIdAndLanguageType(126);
this.desLabelNode.getComponent(cc.Label).string = i;
this.ensureButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = t.getTextByIdAndLanguageType(113);
this.cancelButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = t.getTextByIdAndLanguageType(114);
},
onWillOpend: function(e) {
this.addTypeId = e;
},
onClickEnsureButton: function() {
var t = e("advertisMgr");
t.delegate = this;
t.showVideoAd();
},
onClickCancelButton: function() {
e("systemsMgr").closeSystem(this.sysName);
},
onVideoAdEnd: function() {
var t = {};
for (var i in this.addConfig) {
var h = e("dataMgr").playerData[i] + this.addConfig[i];
t[i] = h;
}
if (Object.keys(t).length > 0) {
e("dataMgr").commitPlayerDataToServer(t, function() {
for (var i in t) e("dataMgr").playerData[i] = t[i];
var h = e("textConfig").getTextByIdAndLanguageType(163);
e("notificationMgr").pushNoti(h);
});
e("systemsMgr").closeSystem(this.sysName, 2);
}
}
});
cc._RF.pop();
}, {
addPropertySysConfig: "addPropertySysConfig",
advertisMgr: "advertisMgr",
dataMgr: "dataMgr",
notificationMgr: "notificationMgr",
systemsMgr: "systemsMgr",
textConfig: "textConfig"
} ],
addPropertySysConfig: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "45f0cLMfpZENYbF+crI7T9N", "addPropertySysConfig");
t.exports = {
1: {
physicalPower: 5
},
2: {
heart: 10
}
};
cc._RF.pop();
}, {} ],
advertisMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d2cc9xBWpRNy65AgLl//eBO", "advertisMgr");
var h = new (cc.Class({
extends: cc.Component,
properties: {
videoAd: null,
delegate: null,
wechatAdId: "xxxxx",
isReady: {
get: function() {
return this._isReady;
},
set: function(t) {
this._isReady = t;
if (1 == t && 1 == this.showStatus) sdkbox.PluginAdMob.show("rewarded"); else if (3 == t && 1 == this.showStatus) {
this.showStatus = 0;
this.removeActivityNode();
e("notificationMgr").showNoti("something wrong with ad system , retry later");
} else 2 == t && 1 == this.showStatus && this.showActivityNode();
}
},
showStatus: {
get: function() {
return this._showStatus;
},
set: function(e) {
this._showStatus = e;
}
},
activityNode: null,
isRewardSend: !1
},
showActivityNode: function() {
var t = e("resMgr").reses.activityNodePrefab, i = cc.instantiate(t), h = i.getChildByName("bg");
h.width = cc.winSize.width;
h.height = cc.winSize.height;
h.on("touchstart", function() {});
var n = i.getChildByName("activity");
cc.tween(n).repeatForever(cc.tween().by(2, {
angle: 360
})).start();
this.activityNode = i;
cc.director.getScene().getChildByName("Canvas").addChild(this.activityNode);
},
removeActivityNode: function() {
if (null != this.activityNode && null != this.activityNode.parent) {
this.activityNode.destroy();
this.activityNode.removeFromParent();
this.activityNode = null;
}
},
onVideoAdEnd: function() {
null != this.delegate && "function" == typeof this.delegate.onVideoAdEnd && this.delegate.onVideoAdEnd();
},
onVideoAdNotEnd: function() {
if (1 == (!(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0])) {
var t = e("notificationMgr"), i = e("textConfig").getTextByIdAndLanguageType(162);
t.pushNoti(i);
}
null != this.delegate && "function" == typeof this.delegate.onVideoAdNotEnd && this.delegate.onVideoAdNotEnd();
},
onVideoAdLoadError: function(e) {
console.log("拉取广告失败");
null != this.delegate && "function" == typeof this.delegate.onVideoAdLoadError && this.delegate.onVideoAdLoadError(e);
},
onVideoAdShowError: function(e) {
null != this.delegate && "function" == typeof this.delegate.onVideoAdShowError && this.delegate.onVideoAdShowError(e);
},
initAds: function() {
if (null == this.videoAd) if (cc.sys.platform == cc.sys.WECHAT_GAME) {
var e = this;
this.videoAd = wx.createRewardedVideoAd({
adUnitId: this.wechatAdId
});
this.videoAd.onLoad(function() {
console.log("拉取广告成功");
});
this.videoAd.onError(function(t) {
e.onVideoAdLoadError(t);
});
this.videoAd.onClose(function(t) {
t && t.isEnded ? e.onVideoAdEnd() : e.onVideoAdNotEnd();
});
} else if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_ANDROID) {
e = this;
sdkbox.PluginAdMob.setListener({
adViewDidReceiveAd: function(t) {
e.isReady = 1;
},
adViewDidFailToReceiveAdWithError: function(t, i) {
e.isReady = 3;
e.onVideoAdLoadError(i);
},
adViewWillPresentScreen: function(t) {
e.removeActivityNode();
e.showStatus = 2;
e.isRewardSend = !1;
cc.audioEngine.pauseAll();
var i = cc.director.getScene().getChildByName("Canvas").getComponent("mainSceneMgr");
null != i && (i.canShowNoti = !1);
},
adViewDidDismissScreen: function(t) {
e.showStatus = 0;
0 == e.isRewardSend && e.onVideoAdNotEnd(!0);
e.isReady = 2;
sdkbox.PluginAdMob.cache("rewarded");
cc.audioEngine.resumeAll();
var i = cc.director.getScene().getChildByName("Canvas").getComponent("mainSceneMgr");
null != i && (i.canShowNoti = !0);
},
adViewWillDismissScreen: function(e) {},
adViewWillLeaveApplication: function(e) {},
reward: function(t, i, h) {
e.isRewardSend = !0;
e.onVideoAdEnd();
}
});
this.isReady = 2;
sdkbox.PluginAdMob.init();
sdkbox.PluginAdMob.cache("rewarded");
}
},
showVideoAd: function() {
if (cc.sys.platform == cc.sys.WECHAT_GAME) {
var t = this;
this.videoAd.load().then(function() {
t.videoAd.show();
}).catch(function(e) {
t.onVideoAdShowError(e);
});
} else if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS) {
this.showStatus = 1;
cc.log(this.isReady + " : current isready");
if (1 == this.isReady) {
this.showActivityNode();
sdkbox.PluginAdMob.show("rewarded");
} else if (2 == this.isReady) this.showActivityNode(); else if (3 == this.isReady) {
this.isReady = 2;
sdkbox.PluginAdMob.cache("rewarded");
}
} else {
var i = e("textConfig").getTextByIdAndLanguageType(166);
e("notificationMgr").pushNoti(i);
}
}
}))();
t.exports = h;
cc._RF.pop();
}, {
notificationMgr: "notificationMgr",
resMgr: "resMgr",
textConfig: "textConfig"
} ],
bgmMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "85e7aM+gYxGO7/681vwMtI2", "bgmMgr");
var h = new (cc.Class({
extends: cc.Component,
properties: {
selectedSection: {
get: function() {
return this._selectedSection;
},
set: function(e) {
e.toString() != this.selectedSection && this.playBgm(e);
this._selectedSection = e;
}
}
},
playBgm: function(t) {
cc.audioEngine.stopAll();
var i = e("sectionConfig")[t.toString()].bgmPath;
cc.loader.loadRes(i, function(e, t) {
cc.audioEngine.play(t, 1, 1);
});
},
start: function() {}
}))();
t.exports = h;
cc._RF.pop();
}, {
sectionConfig: "sectionConfig"
} ],
bulletMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "eb08bsyH2tHY7xzE8jRRDlt", "bulletMgr");
cc.Class({
extends: cc.Component,
properties: {
bulletType: 1,
status: 0,
disFromBorder: 5,
moveSpeed: 500,
movingDirection: null,
targetPosition: null,
movingTime: .3,
vx: null,
vy: null,
levelMgr: null,
helper: null,
_rayTestLength: 3e3,
pathWaysNode: cc.Node,
pathWaysHeight: 10,
sliderFrame: cc.SpriteFrame,
faltalTorence: .01
},
onLoad: function() {
this.levelMgr = cc.find("Canvas").getComponent("levelMgr");
var t = e("helper");
this.helper = new t();
},
start: function() {},
move: function(e) {},
checkWhetherCanMove: function(e) {},
update: function(e) {
this.moveUpdate(e);
},
moveUpdate: function(e) {
if (1 == this.status) {
var t = this.node.x + this.vx * e, i = this.node.y + this.vy * e;
if (cc.v2(t - this.node.x, i - this.node.y).mag() >= cc.v2(this.targetPosition.x - this.node.x, this.targetPosition.y - this.node.y).mag()) {
t = this.targetPosition.x;
i = this.targetPosition.y;
this.node.x = t;
this.node.y = i;
this.status = 0;
} else {
this.node.x = t;
this.node.y = i;
}
}
},
getNearestWallInfo: function(e) {
if (1 == this.bulletType) {
var t = null, i = this.levelMgr.walls, h = this.helper.getDisToSelfBorder(this.node, e);
for (var n in i) {
var a = i[n], g = this.helper.getLinesOfOneNode(a);
for (var o in g) {
var s = g[o];
if (0 != (w = this.helper.isOneNodeWillCollidWithOneLineInDirection(this.node, s, e))) {
var l = this.disFromBorder + h;
if (null == t || w < t.dis + l) {
var d = this.helper.getSuitablePoint(cc.v2(this.node.x, this.node.y), w, l, e);
t = {
dis: cc.v2(d.x - this.node.x, d.y - this.node.y).mag(),
suitablePosition: d
};
}
}
}
}
return t;
}
if (2 == this.bulletType) {
if (null == this.pathWaysNode || 0 == this.pathWaysNode.children.length) return {
dis: 0,
suitablePosition: this.node.position
};
var r = null;
for (var n in this.pathWaysNode.children) {
var c = this.pathWaysNode.children[n];
0 != this.helper.isTwoNodeCross(this.node, c) && (null != r && 1 != this._isPathNodeMoveDirection(c, e) || (r = c));
}
if (0 == this._isPathNodeMoveDirection(r, e)) return {
dis: 0,
suitablePosition: this.node.position
};
var y = this.helper.makeRay(this.node.position, 3e3, e), u = null, x = this.helper.getLinesOfOneNode(r);
for (var o in x) {
var w;
s = x[o];
"false" != (w = this.helper.rayTest(y, s)).toString() && (null == u || w > u) && (u = w);
}
null == u && (u = 5);
return {
suitablePosition: d = this.helper.getSuitablePoint(this.node.position, u, 0, e),
dis: w = cc.v2(d.x - this.node.x, d.y - this.node.y).mag()
};
}
},
getMaxDisFromPathNode: function(e, t) {
var i = this.helper.makeRay(this.node.position, 3e3, t), h = this.helper.makeRay(this.node.position, 3e3, cc.v2(-t.x, -t.y)), n = this.helper.getLinesOfOneNode(e), a = this, g = function(e) {
var t = null;
for (var i in n) {
var h = n[i], g = a.helper.rayTest(e, h);
if (0 != g) return g;
}
null == t && (t = 5);
return t;
}, o = g(i), s = g(h);
return o >= s ? o : s;
},
isPathNodeMoveDirection: function(e, t) {
var i = this.getMaxDisFromPathNode(e, t), h = t.rotate(Math.PI / 2);
return i > this.getMaxDisFromPathNode(e, h);
},
_isPathNodeMoveDirection: function(e, t) {
t.normalizeSelf();
var i = -e.angle * Math.PI / 180, h = cc.v2(1, 0).rotate(i);
return 1 == t.fuzzyEquals(h, .001) || 1 == t.fuzzyEquals(cc.v2(-h.x, -h.y), .001);
}
});
cc._RF.pop();
}, {
helper: "helper"
} ],
dataMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "0cd8087H/9I77MXIhlobXJP", "dataMgr");
function h(e) {
"@babel/helpers - typeof";
return (h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
})(e);
}
var n = new (cc.Class({
extends: cc.Component,
properties: {
playerData: {
get: function() {
return this._playerData;
},
set: function(e) {
this._playerData = new Proxy(e, this.dataMonitoredProxyHandler);
this.onPlayerDataUpdated();
}
},
dataMonitoredProxyHandler: {
get: function() {
if (null == this._dataMonitoredProxyHandler) {
var t = {
get: function(e, i) {
return "object" === h(e[i]) ? new Proxy(e[i], t) : e[i];
},
set: function(t, i, h) {
t[i] = h;
e("globalRedPointMgr").setupRedPoints();
var n = e("systemsMgr").systems;
e("systemsMgr").systemsGloableDataMonitored(i, h);
for (var a in n) {
var g = n[a];
if (null != g.opendNode) {
null != (l = g.opendNode.getComponent(g.mgrName)) && "function" == typeof l.dataMonitored && l.dataMonitored(i, h);
}
}
var o = cc.director.getScene(), s = null;
switch (o.name) {
case "mainScene":
s = "mainSceneMgr";
break;

case "levelScene":
s = "levelMgr";
}
if (null != s) {
var l;
null != (l = o.getChildByName("Canvas").getComponent(s)) && "function" == typeof l.dataMonitored && l.dataMonitored(i, h);
}
return !0;
}
};
this._dataMonitoredProxyHandler = t;
}
return this._dataMonitoredProxyHandler;
}
},
delegate: null
},
updatePlayerDataFromServer: function(t) {
var i = e("networkMgr"), h = i.makeMessageObj("dataModule", "queryMessageType");
h.message.playerId = t;
var n = this;
h.successCallBack = function(e) {
var t = e.responseText;
"success" == (t = JSON.parse(t)).type && (n.playerData = t.playerData);
};
i.sendMessageByMsgObj(h);
},
onPlayerDataUpdated: function() {
cc.log("now player data is " + JSON.stringify(this.playerData));
var t = e("timerSystemsMgr");
t.initSetup();
t.lunch();
if ("loginScene" == cc.director.getScene().name) {
cc.director.getScene().getChildByName("Canvas").getComponent("loginSceneMgr").onPlayerDataUpdated();
}
},
commitPlayerDataToServer: function(t, i) {
var h = e("networkMgr"), n = h.makeMessageObj("dataModule", "commitMessageTyp");
n.message.playerId = this.playerData.id;
if (null != n.message.playerId) {
n.message.commitBody = t;
n.successCallBack = function(e) {
var t = e.responseText;
"commitSuccess" == (t = JSON.parse(t)).type && i();
};
h.sendMessageByMsgObj(n);
} else cc.log("no player data");
}
}))();
t.exports = n;
cc._RF.pop();
}, {
globalRedPointMgr: "globalRedPointMgr",
networkMgr: "networkMgr",
systemsMgr: "systemsMgr",
timerSystemsMgr: "timerSystemsMgr"
} ],
ensureSystemNodeMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "96611KWWBZMSI+yqEf4pl0U", "ensureSystemNodeMgr");
cc.Class({
extends: cc.Component,
properties: {
desText: {
get: function() {
null == this._desText && (this.desText = "default value");
return this._desText;
},
set: function(e) {
this._desText = e;
this.node.getChildByName("others").getChildByName("desLabel").getComponent(cc.Label).string = e;
}
},
onEnsureButtonClick: null,
onCancleButtonClick: null,
canClose: {
get: function() {
return this._canClose;
},
set: function(e) {
this._canClose = e;
this.node.getChildByName("others").getChildByName("closeButton").active = e;
}
},
cancelButtonText: {
get: function() {
return this._cancelButtonText;
},
set: function(e) {
this._cancelButtonText = e;
this.node.getChildByName("others").getChildByName("cancelButton").getChildByName("textLabel").getComponent(cc.Label).string = e;
}
},
ensureButtonText: {
get: function() {
return this._ensureButtonText;
},
set: function(e) {
this._ensureButtonText = e;
this.node.getChildByName("others").getChildByName("ensureButton").getChildByName("textLabel").getComponent(cc.Label).string = e;
}
},
ensureButtonWillAutoCloseUi: !0,
cancelButtonWillAutoCloseUi: !0,
isExsistCancelButton: {
get: function() {
null == this._isExsistCancelButton && (this._isExsistCancelButton = !0);
return this._isExsistCancelButton;
},
set: function(e) {
this._isExsistCancelButton = e;
if (0 == e) {
this.node.getChildByName("others").getChildByName("cancelButton").active = !1;
this.node.getChildByName("others").getChildByName("ensureButton").x = 0;
}
}
}
},
onLoad: function() {
var e = this.node.getChildByName("bg");
e.on("touchstart", function() {}, this);
var t = cc.winSize;
e.width = t.width;
e.height = t.height;
var i = this.node.getChildByName("others");
i.getChildByName("closeButton").on("click", this.close, this);
i.getChildByName("ensureButton").on("click", this.onEnsure, this);
i.getChildByName("cancelButton").on("click", this.onCancel, this);
},
start: function() {},
onEnsure: function() {
1 == this.ensureButtonWillAutoCloseUi && this.close();
null != this.onEnsureButtonClick && this.onEnsureButtonClick();
},
onCancel: function() {
1 == this.cancelButtonWillAutoCloseUi && this.close();
null != this.onCancleButtonClick && this.onCancleButtonClick();
},
close: function() {
var e = this.node.getChildByName("others"), t = this;
cc.tween(e).to(.3, {
scale: 0
}).call(function() {
t.node.destroy();
}).start();
},
show: function(e) {
var t = this.node.getChildByName("others");
t.scale = 0;
e.addChild(this.node);
cc.tween(t).to(.3, {
scale: 1
}).start();
}
});
cc._RF.pop();
}, {} ],
ensureSystem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "2cfa2q87j1AbaAokGOxDLrP", "ensureSystem");
var h = new (cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {},
start: function() {},
create: function() {
var t = e("resMgr").reses.ensureSysPrefab;
return cc.instantiate(t);
}
}))();
t.exports = h;
cc._RF.pop();
}, {
resMgr: "resMgr"
} ],
gameMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "29a86GW8otIsI4PtNbaQyRE", "gameMgr");
var h = new (cc.Class({
extends: cc.Component,
properties: {},
start: function() {},
enterLevelScene: function(e) {
var t = this;
cc.director.preloadScene("levelScene", null, function(i, h) {
h.scene.getChildByName("Canvas").getComponent("levelMgr").level = e;
t.animatedToScene("levelScene");
});
},
animatedToScene: function(t) {
var i = e("resMgr").reses.coverNodePrefab;
(i = cc.instantiate(i)).width = cc.winSize.width;
i.height = cc.winSize.height;
i.opacity = 0;
i.on("touchstart", function() {});
cc.director.getScene().getChildByName("Canvas").addChild(i);
cc.tween(i).to(.3, {
opacity: 255
}).delay(.3).call(function() {
cc.director.loadScene(t);
}).start();
},
_generateLevelSceneConfig: function() {
var t = e("levelConfig"), i = {}, h = 0, n = function(h) {
if (h == Object.keys(t).length) {
var n = e("networkMgr"), a = n.makeMessageObj("helperModule", "generateLevelConfigFileMessageType");
a.message.data = i;
n.sendMessageByMsgObj(a);
}
};
for (var a in Object.keys(t)) {
var g = Object.keys(t)[a];
(function(e, t) {
cc.director.preloadScene(e, null, function(a, g) {
cc.log("preload scene: " + e);
var o = g.scene.children[0], s = {}, l = function(e) {
var t = {};
t.x = e.x;
t.y = e.y;
t.width = e.width;
t.height = e.height;
t.angle = e.angle;
return t;
}, d = o.getChildByName("fillNodes"), r = [];
cc.log("setup fillNodes");
for (var c in d.children) {
var y = l(d.children[c]);
r.push(y);
}
s.fillNodes = r;
var u = o.getChildByName("walls"), x = [];
cc.log("setup walls");
for (var c in u.children) {
var w = l(u.children[c]);
x.push(w);
}
s.walls = x;
var p = o.getChildByName("targets"), m = [];
cc.log("setup targets");
for (var c in p.children) {
var f = l(p.children[c]);
m.push(f);
}
s.targets = m;
var N = o.getChildByName("pathWaysNode"), v = [];
cc.log("setup pathWaysNode");
for (var c in N.children) {
var C = N.children[c], b = {};
b.name = C.name;
b.children = [];
for (var S in C.children) {
var M = l(C.children[S]);
b.children.push(M);
}
v.push(b);
}
s.pathWaysNode = v;
var T = o.getChildByName("bullets"), P = [];
cc.log("setup bullets");
for (var c in T.children) {
var B = T.children[c], I = {}, _ = l(B);
I.basic = _;
var L = B.getComponent("bulletMgr"), R = {};
R.bulletType = L.bulletType;
R.pathWaysNodeName = "";
null != L.pathWaysNode && (R.pathWaysNodeName = L.pathWaysNode.name);
I.mgr = R;
P.push(I);
}
s.bullets = P;
i[t.toString()] = s;
n(h += 1);
});
})(function(e) {
var t = e;
switch (t.toString().length) {
case 1:
t = "00" + t.toString();
break;

case 2:
t = "0" + t.toString();
}
return "level" + t;
}(g), g);
}
}
}))();
t.exports = h;
cc._RF.pop();
}, {
levelConfig: "levelConfig",
networkMgr: "networkMgr",
resMgr: "resMgr"
} ],
gestureMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "9fa79MbD2xKKJly3Hl8wtuT", "gestureMgr");
cc.Class({
extends: cc.Component,
properties: {
isDragEnable: !0,
isZoomEnable: !0,
zoomSpeed: .00333,
maxZoomRatio: 1.2,
minZoomRatio: .3,
dragSpeed: 1,
camaraNode: cc.Node,
minBoundX: -960,
maxBoundX: 960,
minBoundY: -640,
maxBoundY: 640,
touches: {
default: [],
visible: !1
}
},
onLoad: function() {
this.node.on("touchstart", function(e) {
this.onTouchStart(e);
}, this);
this.node.on("touchmove", function(e) {
this.onTouchMove(e);
}, this);
this.node.on("touchend", function(e) {
this.onTouchEnd(e);
}, this);
this.node.on("touchcancel", function(e) {
this.onTouchCancel(e);
}, this);
},
onTouchStart: function(e) {
var t = e;
this.touches.push(t);
},
onTouchMove: function(e) {
if (1 == this.isDragEnable && 1 == this.touches.length) {
var t = e.getDelta(), i = -1 * t.x, h = -1 * t.y;
i *= this.dragSpeed;
h *= this.dragSpeed;
var n = this.camaraNode.getComponent(cc.Camera), a = cc.find("Canvas"), g = this.camaraNode.x + i, o = this.camaraNode.y + h, s = g + a.width / 2 * (1 / n.zoomRatio), l = g - a.width / 2 * (1 / n.zoomRatio), d = o + a.height / 2 * (1 / n.zoomRatio), r = o - a.height / 2 * (1 / n.zoomRatio);
s <= this.maxBoundX && l >= this.minBoundX && (this.camaraNode.x = g);
d <= this.maxBoundY && r >= this.minBoundY && (this.camaraNode.y = o);
}
if (1 == this.isZoomEnable && 2 == this.touches.length) {
var c = this.touches[0], y = this.touches[1], u = c.getLocation(), x = y.getLocation(), w = this.distanceOfTwoVector(u, x), p = c.getPreviousLocation(), m = y.getPreviousLocation(), f = w - this.distanceOfTwoVector(p, m), N = (n = this.camaraNode.getComponent(cc.Camera)).zoomRatio + this.zoomRatio * f;
N >= minZoomRatio && N <= maxZoomRatio && (n.zoomRatio = N);
}
},
onTouchEnd: function(e) {
this.deleteTouchEventFromTouchesArry(e);
},
onTouchCancel: function(e) {
this.deleteTouchEventFromTouchesArry(e);
},
deleteTouchEventFromTouchesArry: function(e) {
var t = null;
for (var i in this.touches) {
if (this.touches[i].getID() == e.getID()) {
t = i;
break;
}
}
null != t && this.touches.splice(i, 1);
},
distanceOfTwoVector: function(e, t) {
var i = Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2);
return i = Math.sqrt(i);
}
});
cc._RF.pop();
}, {} ],
gloableConfig: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "30519IO6mJCyIUJ9xGqrBAW", "gloableConfig");
var h = new (cc.Class({
properties: {
basicIp: "diamonds.tdreamstudio.com",
basicPort: 8888,
netWorkMessageConfigs: {
get: function() {
return {
loginModule: {
suffix: "login",
loginMessageType: {
code: "asfdsfds",
codeType: 3
}
},
dataModule: {
suffix: "data",
queryMessageType: {
playerId: 100000001,
requestType: "query"
},
commitMessageTyp: {
playerId: 100000001,
requestType: "commit",
commitBody: {}
}
},
signInModule: {
suffix: "signIn",
signInMessageType: {
playerId: 100000001,
signType: 1
},
refreshMessageType: {
playerId: 100000001
}
},
mailModule: {
suffix: "mail",
readMailMessageType: {
playerId: 100000001,
mailId: 1001,
requestType: "readMail"
},
sendMailMessageType: {
playerId: 100000001,
mailId: 1001,
tag: "mainLine",
requestType: "sendMail",
delay: 0
},
reachConditionMessageType: {
playerId: 1001,
mailId: 1001,
tag: "mainLine",
selectedOptionIndex: 0,
requestType: "reachCondition"
}
},
helperModule: {
suffix: "helper",
generateLevelConfigFileMessageType: {
data: ""
}
},
longConnectModule: {
suffix: "longConnect",
heartBeatMessageType: {
playerId: 10001,
requestType: "heartBeat"
}
},
storyModule: {
suffix: "story",
completeCurrentMessageType: {
playerId: 10001,
requestType: "completeCurrent"
}
}
};
}
}
}
}))();
t.exports = h;
cc._RF.pop();
}, {} ],
globalRedPointMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d895aDdCFhBNIuhwEdMtJNe", "globalRedPointMgr");
var h = cc.Class({
extends: cc.Component,
properties: {
currentRedPointMgrs: []
},
setupRedPoints: function() {
this.getRedPointMgrs();
for (var e in this.currentRedPointMgrs) {
var t = this.currentRedPointMgrs[e];
"function" == typeof t.setupRedPoint && t.setupRedPoint();
}
},
getRedPointMgrs: function() {
this.currentRedPointMgrs = [];
var e = this;
(function t(i) {
for (var h in i.children) {
var n = i.children[h], a = n.getComponent("redPointMgr");
null != a && e.currentRedPointMgrs.push(a);
t(n);
}
})(cc.director.getScene().getChildByName("Canvas"));
}
});
t.exports = new h();
cc._RF.pop();
}, {} ],
guildNodeMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "4abf6f10txCYqgtMh4ibAyZ", "guildNodeMgr");
cc.Class({
extends: cc.Component,
properties: {
uibg: cc.Node,
guildBgNode: cc.Node,
guildLabelNode: cc.Node,
buttonNode: cc.Node,
header: 105,
footer: 105,
sectionDis: 50
},
start: function() {
this.setupUi();
},
setupUi: function() {
var t = e("textConfig"), i = this.node.getChildByName("bg");
i.width = cc.winSize.width;
i.height = cc.winSize.height;
i.on("touchstart", function() {});
this.guildLabelNode.getComponent(cc.Label).string = t.getTextByIdAndLanguageType(159);
this.guildLabelNode.getComponent(cc.Label)._forceUpdateRenderData();
var h = this.header + this.guildBgNode.height + this.sectionDis + this.guildLabelNode.height + this.sectionDis + this.buttonNode.height + this.footer;
this.uibg.height = h;
this.guildBgNode.y = this.uibg.height / 2 - this.header - this.guildBgNode.height / 2;
this.guildLabelNode.y = this.guildBgNode.y - this.guildBgNode.height / 2 - this.sectionDis;
this.buttonNode.y = -this.uibg.height / 2 + this.footer + this.buttonNode.height / 2;
var n = this;
this.buttonNode.on("click", function() {
n.node.destroy();
});
this.buttonNode.getChildByName("textLabel").getComponent(cc.Label).string = t.getTextByIdAndLanguageType(122);
}
});
cc._RF.pop();
}, {
textConfig: "textConfig"
} ],
helper: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "08b56AlCIJMzL7NY0hkRsv7", "helper");
var h = cc.Class({
properties: {},
segmentsIntr: function(e, t, i, h) {
var n = (t.y - e.y) * (h.x - i.x) - (e.x - t.x) * (i.y - h.y);
if (0 == n) return !1;
var a = ((t.x - e.x) * (h.x - i.x) * (i.y - e.y) + (t.y - e.y) * (h.x - i.x) * e.x - (h.y - i.y) * (t.x - e.x) * i.x) / n, g = -((t.y - e.y) * (h.y - i.y) * (i.x - e.x) + (t.x - e.x) * (h.y - i.y) * e.y - (h.x - i.x) * (t.y - e.y) * i.y) / n;
return this.similarMinus(a, e.x) * this.similarMinus(a, t.x) <= 0 && this.similarMinus(g, e.y) * this.similarMinus(g, t.y) <= 0 && this.similarMinus(a, i.x) * this.similarMinus(a, h.x) <= 0 && this.similarMinus(g, i.y) * this.similarMinus(g, h.y) <= 0 && {
x: a,
y: g
};
},
rotateSegment: function(e, t, i, h) {
return {
p1: this.rotateOnePoint(e, i, h),
p2: this.rotateOnePoint(t, i, h)
};
},
rotateOnePoint: function(e, t, i) {
var h = i * Math.PI / 180, n = cc.v2(e.x - t.x, e.y - t.y).rotate(h);
return cc.v2(n.x + t.x, n.y + t.y);
},
rayTest: function(e, t) {
var i = this.segmentsIntr(e.p1, e.p2, t.p1, t.p2);
return 0 != i && cc.v2(i.x - e.p1.x, i.y - e.p1.y).mag();
},
getSuitablePoint: function(e, t, i, h) {
if (i >= t) return e;
h.normalizeSelf();
var n = t * h.x, a = t * h.y, g = (t - i) / t, o = e.x + g * n, s = e.y + g * a;
return cc.v2(o, s);
},
makeRay: function(e, t, i) {
var h = {
p1: e,
p2: null
};
1 != i.mag() && i.normalizeSelf();
var n = i.x * t, a = i.y * t, g = e.x + n, o = e.y + a;
h.p2 = cc.v2(g, o);
return h;
},
getLinesOfOneNode: function(e) {
var t = e.height / 2, i = cc.v2(e.x - e.width / 2, e.y - t), h = cc.v2(e.x + e.width / 2, e.y - t), n = cc.v2(i.x, i.y + e.height), a = cc.v2(h.x, h.y + e.height), g = cc.v2(e.x - e.width / 2, e.y + e.height / 2), o = cc.v2(g.x, g.y - e.height), s = cc.v2(e.x + e.width / 2, e.y + e.height / 2), l = cc.v2(s.x, s.y - e.height), d = {
p1: i,
p2: h
}, r = {
p1: n,
p2: a
}, c = {
p1: g,
p2: o
}, y = {
p1: s,
p2: l
};
if (null != e.angle && void 0 != e.angle) {
d = this.rotateSegment(i, h, cc.v2(e.x, e.y), -e.angle);
r = this.rotateSegment(n, a, cc.v2(e.x, e.y), -e.angle);
c = this.rotateSegment(g, o, cc.v2(e.x, e.y), -e.angle);
y = this.rotateSegment(s, l, cc.v2(e.x, e.y), -e.angle);
}
var u = {
lowerLine: d,
upperLine: r,
leftLine: c,
rightLine: y
};
null != d && null != r && null != c && null != y || cc.error("NOT INVALID LINES");
return u;
},
isTwoNodeCross: function(e, t) {
var i = this.getInfoOfOneNode(e), h = this.getInfoOfOneNode(t);
return !(i.minY > h.maxY || h.minY > i.maxY || i.minX > h.maxX || h.minX > i.maxX);
},
getInfoOfOneNode: function(e) {
var t = cc.v2(e.x - e.width / 2, e.y + e.height / 2), i = cc.v2(e.x + e.width / 2, t.y), h = cc.v2(t.x, e.y - e.height / 2), n = cc.v2(i.x, h.y);
if (null != e.angle && void 0 != e.angle) {
t = this.rotateOnePoint(t, cc.v2(e.x, e.y), -e.angle);
i = this.rotateOnePoint(i, cc.v2(e.x, e.y), -e.angle);
h = this.rotateOnePoint(h, cc.v2(e.x, e.y), -e.angle);
n = this.rotateOnePoint(n, cc.v2(e.x, e.y), -e.angle);
}
var a = t.x, g = n.x, o = h.y, s = i.y, l = [ t, h, i, n ];
for (var d in l) {
var r = l[d];
a > r.x && (a = r.x);
g < r.x && (g = r.x);
o > r.y && (o = r.y);
s < r.y && (s = r.y);
}
return {
minX: a,
minY: o,
maxX: g,
maxY: s
};
},
getDisToSelfBorder: function(e, t) {
var i = this.makeRay(cc.v2(e.x, e.y), 1e3, t), h = this.getLinesOfOneNode(e);
for (var n in h) {
var a = h[n], g = this.rayTest(i, a);
if (0 != g) return g;
}
},
getPointsOfOneNode: function(e) {
var t = cc.v2(e.x - e.width / 2, e.y + e.height / 2), i = cc.v2(e.x + e.width / 2, t.y), h = cc.v2(t.x, e.y - e.height / 2), n = cc.v2(i.x, h.y);
if (null != e.angle && void 0 != e.angle) {
t = this.rotateOnePoint(t, cc.v2(e.x, e.y), -e.angle);
i = this.rotateOnePoint(i, cc.v2(e.x, e.y), -e.angle);
h = this.rotateOnePoint(h, cc.v2(e.x, e.y), -e.angle);
n = this.rotateOnePoint(n, cc.v2(e.x, e.y), -e.angle);
}
return {
leftUpPoint: t,
leftDownPoint: h,
rightUpPoint: i,
rightDownPoint: n
};
},
isOneNodeWillCollidWithOneLineInDirection: function(e, t, i) {
var h = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 3e3, n = this.getPointsOfOneNode(e), a = [];
for (var g in n) {
var o = n[g], s = this.makeRay(o, h, i);
a.push(s);
}
var l = null, d = null, r = null, c = null;
for (var y in a) {
var u = a[y], x = u.p1.x, w = u.p2.x;
if (x > u.p2.x) {
x = u.p2.x;
w = u.p1.x;
}
var p = u.p1.y, m = u.p2.y;
if (p > u.p2.y) {
p = u.p2.y;
m = u.p1.y;
}
if (null == l) {
l = x;
r = w;
} else {
l > x && (l = x);
r < w && (r = w);
}
if (null == d) {
d = p;
c = m;
} else {
d > p && (d = p);
c < m && (c = m);
}
}
var f = t.p1.x, N = t.p2.x, v = t.p1.y, C = t.p2.y;
if (f > t.p2.x) {
f = t.p2.x;
N = t.p1.x;
}
if (v > t.p2.y) {
v = t.p2.y;
C = t.p1.y;
}
if (d >= C || c <= v || l >= N || r <= f) return !1;
var b = cc.v2(t.p2.x - t.p1.x, t.p2.y - t.p1.y);
b.normalizeSelf();
var S = this.makeRay(t.p2, 3e3, b).p2, M = {
p1: this.makeRay(t.p1, 3e3, cc.v2(-b.x, -b.y)).p2,
p2: S
}, T = this.makeRay(cc.v2(e.x, e.y), 3e3, i), P = this.rayTest(T, M);
return 0 != P && P;
},
isTwoPositionSimilarEqual: function(e, t) {
var i = t.x - e.x, h = t.y - e.y;
return !(-.01 > i || .01 < i) && !(-.01 > h || .01 < h);
},
isTwoValueSimilarEqual: function(e, t) {
var i = t - e;
return !(-.01 > i || .01 < i);
},
similarMinus: function(e, t) {
var i = e - t;
-.001 < i && i < .001 && (i = 0);
return i;
}
});
t.exports = h;
cc._RF.pop();
}, {} ],
levelAreaNodeMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "a8a2eatdk5J5omtBp3UkdHJ", "levelAreaNodeMgr");
cc.Class({
extends: cc.Component,
properties: {
delegate: null,
level: null
},
onLoad: function() {
this.node.on("touchstart", this.onTouchStart, this);
},
start: function() {},
onTouchStart: function(e) {
this.delegate.selectedLevel != this.level && 0 != this.delegate.checkLevelStatus(this.level) && (this.delegate.selectedLevel = this.level);
}
});
cc._RF.pop();
}, {} ],
levelConfig: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "cb3edynoalP+oqr1exCykM8", "levelConfig");
t.exports = {
1: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
2: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
3: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
4: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
5: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
6: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
7: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
8: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
9: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
10: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
11: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
12: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
13: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
14: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
15: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
16: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
17: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
18: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
19: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
20: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
21: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
22: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
23: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
24: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
25: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
26: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
27: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
28: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
29: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
30: {
physicalPowerCost: 4,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
}
};
cc._RF.pop();
}, {} ],
levelMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "c4014NLpYFEZpXQI03LMFEP", "levelMgr");
cc.Class({
extends: cc.Component,
properties: {
bullets: [],
minDis: 50,
maxOffsetDegree: 45,
directionTryto: null,
flag: !1,
helper: null,
walls: [],
targetsNum: {
get: function() {
return this._targetsNum;
},
set: function(e) {
this._targetsNum = e;
0 == e && this.onSuccess();
}
},
linePrefab: cc.Prefab,
bulletPrefab: cc.Prefab,
playerData: null,
retryButton: cc.Node,
heartForRetryCost: {
get: function() {
return this._heartForRetryCostwe;
},
set: function(e) {
this._heartForRetryCostwe = e;
this.retryButton.getChildByName("heartCostLabel").getComponent(cc.Label).string = e.toString();
}
},
heart: {
get: function() {
return this._heart;
},
set: function(e) {
this._heart = e;
cc.find("Canvas/uiNode/heartLabel").getComponent(cc.Label).string = e.toString();
if (e < this.heartForRetryCost) this.retryButton.getComponent(cc.Button).interactable = !1; else {
if (0 == this.isMoved) return;
this.retryButton.getComponent(cc.Button).interactable = !0;
}
}
},
maxHeart: {
get: function() {
return this._maxHeart;
},
set: function(e) {
this._maxHeart = e;
}
},
isMoved: {
get: function() {
null == this._isMoved && (this._isMoved = !1);
return this._isMoved;
},
set: function(e) {
this._isMoved = e;
1 == e && this.heartForRetryCost <= this.heart && (this.retryButton.getComponent(cc.Button).interactable = !0);
}
},
currentStepNum: {
get: function() {
null == this._currentStepNum && (this._currentStepNum = 0);
return this._currentStepNum;
},
set: function(t) {
this._currentStepNum = t;
this.node.getChildByName("uiNode").getChildByName("currentStepNumLabel").getComponent(cc.Label).string = e("textConfig").getFormatedString(154, [ t.toString() ]);
}
},
level: null,
soundEffect: null
},
onLoad: function() {
var t = e("textConfig"), i = e("helper");
this.helper = new i();
this.setupNodesByConfig();
var h = this;
cc.loader.loadRes("effectSounds/hit", function(e, t) {
h.soundEffect = t;
});
this.retryButton.getChildByName("textLabel").getComponent(cc.Label).string = t.getTextByIdAndLanguageType(152);
cc.find("Canvas/uiNode/currentStepNumLabel").getComponent(cc.Label).string = t.getFormatedString(154, [ 0 ]);
},
start: function() {
this.node.on("touchstart", this.onTouchStart, this);
this.node.on("touchmove", this.onTouchMove, this);
this.node.on("touchend", this.onTouchEnd, this);
var t = cc.find("Canvas/bullets");
this.bullets = t.children;
this.playerData = e("dataMgr").playerData;
this.maxHeart = this.playerData.maxHeart;
this.level == this.playerData.currentLevel ? this.heartForRetryCost = e("levelConfig")[this.playerData.currentLevel.toString()].heartForRetryCost : this.heartForRetryCost = 0;
this.heart = this.playerData.heart;
e("networkMgr").delegate = this;
var i = cc.find("Canvas/walls");
this.walls = i.children;
this.targetsNum = cc.find("Canvas/targets").children.length;
var h = cc.find("Canvas/fillNodes").getComponent(cc.Graphics), n = null, a = cc.find("Canvas/fillNodes").children;
if (0 != a.length) {
for (var g in a) {
var o = a[g];
if (null == n) {
h.moveTo(o.x, o.y);
n = o;
}
h.lineTo(o.x, o.y);
}
h.close();
h.stroke();
h.fill();
var s = this.node.getChildByName("uiNode").getChildByName("minStepNumLabel"), l = "minStep_level_" + this.level.toString(), d = e("dataMgr").playerData.minSteps[l];
null != d && void 0 != d || (d = e("textConfig").getTextByIdAndLanguageType(155));
s.getComponent(cc.Label).string = e("textConfig").getFormatedString(153, [ d.toString() ]);
if (0 == e("dataMgr").playerData.isGuilded) {
var r = cc.instantiate(e("resMgr").reses.guildNodePrefab);
this.node.addChild(r);
}
}
},
playBgm: function() {
var t = e("levelConfig")[this.level].bgmPath;
cc.loader.loadRes(t, function(e, t) {
cc.audioEngine.stopAll();
cc.audioEngine.play(t);
});
},
onTouchStart: function(e) {
this.directionTryto = null;
this.flag = !0;
},
onTouchMove: function(e) {
if (0 != this.flag) {
var t = e.getStartLocation(), i = cc.v2(e.getLocationX() - t.x, e.getLocationY() - t.y);
if (!(i.mag() < this.minDis)) {
var h = this.getPossiableDirection(i);
if (-1 != h) {
null == this.directionTryto && (this.directionTryto = h);
this.flag = !1;
this.moveBullets(this.directionTryto);
} else this.flag = !1;
}
}
},
onTouchEnd: function(e) {},
onDestroy: function() {
this.node.off("touchstart", this.onTouchStart, this);
this.node.off("touchmove", this.onTouchMove, this);
this.node.off("touchend", this.onTouchEnd, this);
},
getPossiableDirection: function(e) {
return 1 == this.isPossiableWithGivenDirection(e, cc.v2(1, 0)) ? cc.v2(1, 0) : 1 == this.isPossiableWithGivenDirection(e, cc.v2(0, -1)) ? cc.v2(0, -1) : 1 == this.isPossiableWithGivenDirection(e, cc.v2(-1, 0)) ? cc.v2(-1, 0) : 1 == this.isPossiableWithGivenDirection(e, cc.v2(0, 1)) ? cc.v2(0, 1) : -1;
},
isPossiableWithGivenDirection: function(e, t) {
var i = e.signAngle(t) / Math.PI * 180;
return Math.abs(i) <= this.maxOffsetDegree;
},
moveBullets: function(e) {
for (var t in this.bullets) if (0 != this.bullets[t].getComponent("bulletMgr").status) return;
var i = [];
for (var t in this.bullets) {
var h = this.bullets[t], n = (l = h.getComponent("bulletMgr")).getNearestWallInfo(e), a = {
x: n.suitablePosition.x,
y: n.suitablePosition.y,
width: h.width,
height: h.height,
dis: n.dis,
originNode: h
};
i.push(a);
}
for (var g = 100; 0 == this.resolveShadows(i, e) && !(g <= 0); ) g -= 1;
var o = !1;
for (var t in i) {
var s = (a = i[t]).originNode;
if (1 != this.helper.isTwoPositionSimilarEqual(cc.v2(a.x, a.y), cc.v2(s.x, s.y))) {
var l;
(l = s.getComponent("bulletMgr")).targetPosition = cc.v2(a.x, a.y);
l.movingDirection = e;
l.movingDirection.normalizeSelf();
if (null != l.movingTime) {
var d = cc.v2(l.targetPosition.x - s.x, l.targetPosition.y - s.y).mag() / l.movingTime;
l.vx = d * l.movingDirection.x;
l.vy = d * l.movingDirection.y;
} else {
l.vx = l.movingDirection.x * l.movingSpeed;
l.vy = l.movingDirection.y * l.movingSpeed;
}
l.status = 1;
1 != this.isMoved && (this.isMoved = !0);
0 == o && (o = !0);
}
}
if (1 == o) {
this.currentStepNum += 1;
null != this.soundEffect && this.scheduleOnce(function() {
cc.audioEngine.play(this.soundEffect);
}, .3);
}
},
onSuccess: function() {
this.retryButton.getComponent(cc.Button).interactable = !1;
var t = e("sectionConfig")[this.playerData.currentSection].levels, i = t.indexOf(this.playerData.currentLevel), h = null, n = null, a = null;
if (i < t.length - 1) h = t[i += 1]; else {
n = this.playerData.currentSection + 1;
var g = e("sectionConfig")[n].levels;
h = g[0];
}
a = null == n ? {
currentLevel: h
} : {
currentSection: n,
currentLevel: h
};
this.level == e("dataMgr").playerData.currentLevel && (a.physicalPowerCostedFlag = 0);
0 == e("dataMgr").playerData.isGuilded && (a.isGuilded = 1);
var o = "minStep_level_" + this.level.toString(), s = e("dataMgr").playerData.minSteps[o];
if (null == s || void 0 == s || this.currentStepNum < s) {
a.minSteps = {};
a.minSteps[o] = this.currentStepNum;
}
a.preLevel = this.level;
var l = this;
e("dataMgr").commitPlayerDataToServer(a, function() {
null != n && (l.playerData.currentSection = n);
null != a.minSteps && void 0 != a.minSteps && (e("dataMgr").playerData.minSteps[o] = l.currentStepNum);
1 == a.isGuilded && (e("dataMgr").playerData.isGuilded = 1);
l.playerData.currentLevel = h;
l.playerData.physicalPowerCostedFlag = 0;
l.playerData.preLevel = l.level;
e("gameMgr").animatedToScene("mainScene");
});
},
resolveShadows: function(e, t) {
for (var i in e) {
var h = e[i];
for (var n in e) {
var a = e[n];
if (h != a) {
var g = this._selectStaticShadowAndShaodwForResolved(h, a, t);
if (0 != g) {
var o = g.staticShadow, s = g.shadowForResolved, l = this.helper.getLinesOfOneNode(o), d = null, r = this.helper.makeRay(cc.v2(o.x, o.y), 1e3, cc.v2(-t.x, -t.y));
for (var c in l) {
var y = l[c];
if (0 != this.helper.rayTest(r, y)) {
d = y;
break;
}
}
var u = this.helper.makeRay(d.p2, 1e3, cc.v2(d.p2.x - d.p1.x, d.p2.y - d.p1.y)).p2;
d = {
p1: this.helper.makeRay(d.p1, 1e3, cc.v2(d.p1.x - d.p2.x, d.p1.y - d.p2.y)).p2,
p2: u
};
var x = this.helper.makeRay(s.originNode.position, 3e3, t), w = this.helper.rayTest(x, d), p = this.helper.getDisToSelfBorder(s.originNode, t) + s.originNode.getComponent("bulletMgr").disFromBorder, m = this.helper.getSuitablePoint(s.originNode.position, w, p, t), f = cc.v2(m.x - s.originNode.x, m.y - s.originNode.y).mag();
s.x = m.x;
s.y = m.y;
s.dis = f;
return !1;
}
}
}
}
return !0;
},
_selectStaticShadowAndShaodwForResolved: function(e, t, i) {
var h = this, n = function(e, t) {
var n = e.dis, a = !1, g = !1, o = h.helper.getLinesOfOneNode(t);
for (var s in o) {
var l = o[s];
if (0 != h.helper.isOneNodeWillCollidWithOneLineInDirection(e.originNode, l, i, n)) {
a = !0;
break;
}
}
if (0 == a) return !1;
var d = h.helper.getLinesOfOneNode(t.originNode);
for (var s in d) {
l = d[s];
if (0 != h.helper.isOneNodeWillCollidWithOneLineInDirection(e.originNode, l, i, n)) {
g = !0;
break;
}
}
return 0 != g;
};
if (1 == n(e, t)) {
return {
staticShadow: t,
shadowForResolved: e
};
}
if (1 == n(t, e)) {
return {
staticShadow: e,
shadowForResolved: t
};
}
return !1;
},
generateWalls: function() {
var t = e("levelConfig")[this.level], i = cc.find("Canvas/walls");
for (var h in t.wallPathes) {
var n = t.wallPathes[h], a = n.points, g = [];
for (var o in a) {
var s = null;
if (0 == o) s = cc.v2(a[o].x, a[o].y); else {
var l = a[o];
s = cc.v2(g[o - 1].x + l.x, g[o - 1].y + l.y);
}
g.push(s);
}
var d = n.lineWidth, r = n.offset, c = [];
if (1 == n.isClosed) {
var y = g[0];
g.push(y);
}
for (var o in g) if (0 != o) {
var u = cc.instantiate(this.linePrefab);
u.height = d;
var x = cc.v2(g[o].x - g[o - 1].x, g[o].y - g[o - 1].y);
u.width = x.mag();
var w = x.signAngle(cc.v2(1, 0)) / Math.PI * 180;
u.angle = -w;
u.x = g[o].x - x.x / 2;
u.y = g[o].y - x.y / 2;
var p = x.rotate(Math.PI / 2);
p.normalizeSelf();
u.x += u.height / 2 * p.x;
u.y += u.height / 2 * p.y;
u.x += r.x;
u.y += r.y;
c.push(u);
i.addChild(u);
}
}
var m = t.bullets, f = cc.find("Canvas/bullets");
for (var h in m) {
var N = m[h], v = cc.instantiate(this.bulletPrefab);
v.x = N.x;
v.y = N.y;
v.width = v.width * N.scale;
v.height = v.height * N.scale;
f.addChild(v);
}
},
onClickRetryButton: function() {
var t = e("gameMgr");
if (0 != this.heartForRetryCost) {
var i = this.playerData.heart - this.heartForRetryCost;
if (!(i < 0)) {
var h = {
heart: i
}, n = this;
this.retryButton.getComponent(cc.Button).interactable = !1;
e("dataMgr").commitPlayerDataToServer(h, function() {
n.playerData.heart = i;
t.enterLevelScene(n.level);
});
}
} else t.enterLevelScene(this.level);
},
onAllRetryFailed: function() {
this.retryButton.getComponent(cc.Button).interactable = !0;
},
onClickBackButton: function() {
e("gameMgr").animatedToScene("mainScene");
},
setupNodesByConfig: function() {
var t = e("resMgr").reses.wallPrefab, i = e("resMgr").reses.bulletPrefab, h = e("resMgr").reses.targetPrefab, n = e("resMgr").reses.pathWayPrefab, a = e("levelSceneConfig")[this.level];
this._setupFillNodes(a);
this._setupWalls(a, t);
this._setupTargets(a, h);
this._setupPathWaysNode(a, n);
this._setupBullets(a, i);
},
_setupNodePropertyByConfig: function(e, t) {
for (var i in t) e[i] = t[i];
},
_setupFillNodes: function(e) {
var t = e.fillNodes, i = cc.find("Canvas/fillNodes");
for (var h in t) {
var n = t[h], a = new cc.Node();
this._setupNodePropertyByConfig(a, n);
i.addChild(a);
}
},
_setupWalls: function(e, t) {
var i = e.walls, h = cc.find("Canvas/walls");
for (var n in i) {
var a = i[n], g = cc.instantiate(t);
this._setupNodePropertyByConfig(g, a);
h.addChild(g);
}
},
_setupTargets: function(e, t) {
var i = e.targets, h = cc.find("Canvas/targets");
for (var n in i) {
var a = i[n], g = cc.instantiate(t);
this._setupNodePropertyByConfig(g, a);
h.addChild(g);
}
},
_setupPathWaysNode: function(e, t) {
var i = e.pathWaysNode, h = cc.find("Canvas/pathWaysNode");
for (var n in i) {
var a = i[n], g = new cc.Node(a.name);
for (var n in a.children) {
var o = a.children[n], s = cc.instantiate(t);
this._setupNodePropertyByConfig(s, o);
g.addChild(s);
}
h.addChild(g);
}
},
_setupBullets: function(e, t) {
var i = e.bullets, h = cc.find("Canvas/bullets");
for (var n in i) {
var a = i[n], g = cc.instantiate(t), o = a.basic, s = a.mgr, l = g.getComponent("bulletMgr");
l.bulletType = s.bulletType;
2 == s.bulletType && (g.getComponent(cc.Sprite).spriteFrame = l.sliderFrame);
this._setupNodePropertyByConfig(g, o);
if (2 == l.bulletType && "" != s.pathWaysNodeName && null != s.pathWaysNodeName) {
var d = "Canvas/pathWaysNode/" + s.pathWaysNodeName, r = cc.find(d);
l.pathWaysNode = r;
}
h.addChild(g);
}
},
dataMonitored: function(t, i) {
if (-1 != t.indexOf("minStep_level_")) {
var h = t.slice(14);
if (parseInt(h) == parseInt(this.level)) {
this.node.getChildByName("uiNode").getChildByName("minStepNumLabel").getComponent(cc.Label).string = e("textConfig").getFormatedString(153, [ i.toString() ]);
}
} else "heart" == t && (this.heart = i);
}
});
cc._RF.pop();
}, {
dataMgr: "dataMgr",
gameMgr: "gameMgr",
helper: "helper",
levelConfig: "levelConfig",
levelSceneConfig: "levelSceneConfig",
networkMgr: "networkMgr",
resMgr: "resMgr",
sectionConfig: "sectionConfig",
textConfig: "textConfig"
} ],
levelNodeMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "a65daQfIs1AIaVJClbi9PqX", "levelNodeMgr");
cc.Class({
extends: cc.Component,
properties: {
status: {
get: function() {
return this._status;
},
set: function(e) {
this._status = e;
0 != e && 2 != e || (this.node.getComponent(cc.Sprite).spriteFrame = this.graySpriteFrame);
2 == e && (this.isRecommanded = !0);
}
},
levelNumLabelNode: cc.Node,
mailTagNode: cc.Node,
selectedEffectNode: cc.Node,
graySpriteFrame: cc.SpriteFrame,
mailTagSendSpriteFrame: cc.SpriteFrame,
delegate: null,
level: null,
preChanllengeUIPrefab: cc.Prefab,
preChanllengeUIOpend: !1,
isRecommanded: {
get: function() {
return this._isRecommanded;
},
set: function(e) {
this._isRecommanded = e;
1 == e && (this.selectedEffectNode.active = !0);
}
}
},
onLoad: function() {
cc.tween(this.selectedEffectNode).repeatForever(cc.tween().to(.5, {
opacity: 0
}).to(.5, {
opacity: 255
})).start();
},
start: function() {},
onClick: function() {
if (0 != this.status) this.openPreChanllengeUI(); else {
var t = e("textConfig").getTextByIdAndLanguageType(168);
e("notificationMgr").pushNoti(t);
}
},
openPreChanllengeUI: function() {
if (1 != this.preChanllengeUIOpend) {
var e = cc.instantiate(this.preChanllengeUIPrefab), t = e.getComponent("preChallengeUIMgr");
t.level = this.level;
t.levelStatus = this.status;
t.delegate = this;
cc.director.getScene().getChildByName("Canvas").addChild(e);
this.preChanllengeUIOpend = !0;
}
},
setupMailTag: function() {
var e = this._checkLevelMailTagStatus();
if (0 != e) {
var t = e[1], i = e[0];
1 == t && (this.mailTagNode.getComponent(cc.Sprite).spriteFrame = this.mailTagSendSpriteFrame);
1 == i && (this.mailTagNode.active = !0);
}
},
_checkLevelMailTagStatus: function() {
var t = e("mailSysConfig"), i = !1, h = !1;
for (var n in t) {
var a = t[n].conditions;
for (var g in a) {
var o = a[g], s = o.conditionType, l = o.conditionPara;
if (1 == s) {
if (l == this.level) {
i = !0;
var d = e("dataMgr").playerData.mailConditionIndex[n];
2 == this.level && cc.log(g, d);
(g < d || -1 == d) && (h = !0);
return [ i, h ];
}
} else if (2 == s) {
l.levelId == this.level && (i = !0);
(g < (d = e("dataMgr").playerData.mailConditionIndex[n]) || -1 == d) && (h = !0);
return [ i, h ];
}
}
}
return !1;
},
dataMonitored: function(e, t) {}
});
cc._RF.pop();
}, {
dataMgr: "dataMgr",
mailSysConfig: "mailSysConfig",
notificationMgr: "notificationMgr",
textConfig: "textConfig"
} ],
levelSceneConfig: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d386cxk985M6LAkfFP1bktI", "levelSceneConfig");
t.exports = {
1: {
fillNodes: [ {
x: -246.303,
y: 96.712,
width: 0,
height: 0,
angle: 0
}, {
x: -247,
y: 223.639,
width: 0,
height: 0,
angle: 0
}, {
x: -136.049,
y: 227.128,
width: 0,
height: 0,
angle: 0
}, {
x: -137.325,
y: 336.456,
width: 0,
height: 0,
angle: 0
}, {
x: -6.301,
y: 336.456,
width: 0,
height: 0,
angle: 0
}, {
x: -6.301,
y: 227.554,
width: 0,
height: 0,
angle: 0
}, {
x: 215.992,
y: 227.554,
width: 0,
height: 0,
angle: 0
}, {
x: 215.992,
y: -119.27,
width: 0,
height: 0,
angle: 0
}, {
x: -136.651,
y: -119.27,
width: 0,
height: 0,
angle: 0
}, {
x: -135.487,
y: 97.204,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -246.144,
y: 162.539,
width: 110,
height: 10,
angle: 90
}, {
x: -86.144,
y: 327.539,
width: 120,
height: 10,
angle: 0
}, {
x: -141.144,
y: 270.039,
width: 105,
height: 10,
angle: 90
}, {
x: -141.1,
y: -10.2,
width: 235.6,
height: 10,
angle: 90
}, {
x: -21.144,
y: 275.039,
width: 115,
height: 10,
angle: 90
}, {
x: -193.644,
y: 222.539,
width: 115,
height: 10,
angle: 0
}, {
x: -193.644,
y: 102.539,
width: 115,
height: 10,
angle: 0
}, {
x: 78.856,
y: 222.539,
width: 210,
height: 10,
angle: 0
}, {
x: 188.856,
y: 52.539,
width: 350,
height: 10,
angle: 90
}, {
x: 24,
y: -127,
width: 339.6,
height: 10,
angle: 0
} ],
targets: [ {
x: -81.144,
y: 267.539,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: []
} ],
bullets: [ {
basic: {
x: -186.144,
y: 162.539,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 23.856,
y: 57.539,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: ""
}
} ]
},
2: {
fillNodes: [ {
x: -284.502,
y: -16.414,
width: 0,
height: 0,
angle: 0
}, {
x: -284.502,
y: 317.328,
width: 0,
height: 0,
angle: 0
}, {
x: -178.726,
y: 317.328,
width: 0,
height: 0,
angle: 0
}, {
x: -178.726,
y: 372.952,
width: 0,
height: 0,
angle: 0
}, {
x: -123.102,
y: 372.952,
width: 0,
height: 0,
angle: 0
}, {
x: -123.102,
y: 427.664,
width: 0,
height: 0,
angle: 0
}, {
x: 102.128,
y: 428.576,
width: 0,
height: 0,
angle: 0
}, {
x: 102.128,
y: 373.864,
width: 0,
height: 0,
angle: 0
}, {
x: 204.257,
y: 372.952,
width: 0,
height: 0,
angle: 0
}, {
x: 204.257,
y: 318.24,
width: 0,
height: 0,
angle: 0
}, {
x: 260.793,
y: 318.24,
width: 0,
height: 0,
angle: 0
}, {
x: 260.793,
y: 264.44,
width: 0,
height: 0,
angle: 0
}, {
x: 363.834,
y: 264.44,
width: 0,
height: 0,
angle: 0
}, {
x: 363.834,
y: 142.25,
width: 0,
height: 0,
angle: 0
}, {
x: 261.705,
y: 142.25,
width: 0,
height: 0,
angle: 0
}, {
x: 261.705,
y: 97.569,
width: 0,
height: 0,
angle: 0
}, {
x: 87.539,
y: 97.569,
width: 0,
height: 0,
angle: 0
}, {
x: 87.539,
y: 141.338,
width: 0,
height: 0,
angle: 0
}, {
x: 40.122,
y: 141.338,
width: 0,
height: 0,
angle: 0
}, {
x: 40.122,
y: 99.392,
width: 0,
height: 0,
angle: 0
}, {
x: -24.62,
y: 97.568,
width: 0,
height: 0,
angle: 0
}, {
x: -24.62,
y: 43.768,
width: 0,
height: 0,
angle: 0
}, {
x: -164.135,
y: 43.768,
width: 0,
height: 0,
angle: 0
}, {
x: -164.135,
y: -11.856,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -282.792,
y: 153.095,
width: 320,
height: 10,
angle: 90
}, {
x: -230.338,
y: 318.062,
width: 115,
height: 10,
angle: 0
}, {
x: -227.805,
y: -11.97,
width: 120,
height: 10,
angle: 0
}, {
x: 149.939,
y: 373.555,
width: 105,
height: 10,
angle: 0
}, {
x: 179.5,
y: 98.5,
width: 175.15,
height: 10,
angle: 0
}, {
x: -14.9,
y: 428.648,
width: 225,
height: 10,
angle: 0
}, {
x: -177.835,
y: 340.852,
width: 55,
height: 10,
angle: 90
}, {
x: 64.596,
y: 142.566,
width: 55,
height: 10,
angle: 0
}, {
x: 229.763,
y: 318.267,
width: 55,
height: 10,
angle: 0
}, {
x: 14.8,
y: 98.7,
width: 45,
height: 10,
angle: 0
}, {
x: -84.356,
y: 42.763,
width: 167.5,
height: 10,
angle: 0
}, {
x: 262.246,
y: 290.782,
width: 65,
height: 10,
angle: 90
}, {
x: 309.706,
y: 263.221,
width: 105,
height: 10,
angle: 0
}, {
x: 309.706,
y: 143.221,
width: 105,
height: 10,
angle: 0
}, {
x: 367.226,
y: 203.232,
width: 130,
height: 10,
angle: 90
}, {
x: 207.453,
y: 345.95,
width: 65,
height: 10,
angle: 90
}, {
x: -122.511,
y: 396.16,
width: 55,
height: 10,
angle: 90
}, {
x: 261.987,
y: 120.68,
width: 55,
height: 10,
angle: 90
}, {
x: -.619,
y: 70.797,
width: 65,
height: 10,
angle: 90
}, {
x: 87,
y: 120.52,
width: 54.1,
height: 10,
angle: 90
}, {
x: 42.06,
y: 120.58,
width: 54.02,
height: 10,
angle: 90
}, {
x: -162.898,
y: 15.454,
width: 65,
height: 10,
angle: 90
}, {
x: 102.382,
y: 401.191,
width: 65,
height: 10,
angle: 90
}, {
x: -150.459,
y: 373.511,
width: 65,
height: 10,
angle: 0
} ],
targets: [ {
x: 307.226,
y: 203.221,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: []
} ],
bullets: [ {
basic: {
x: -222.792,
y: 48.03,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
} ]
},
3: {
fillNodes: [ {
x: -285.304,
y: 92.657,
width: 0,
height: 0,
angle: 0
}, {
x: -285.304,
y: 212.645,
width: 0,
height: 0,
angle: 0
}, {
x: -177.982,
y: 211.978,
width: 0,
height: 0,
angle: 0
}, {
x: -179.982,
y: 423.29,
width: 0,
height: 0,
angle: 0
}, {
x: 151.318,
y: 424.623,
width: 0,
height: 0,
angle: 0
}, {
x: 151.985,
y: 319.967,
width: 0,
height: 0,
angle: 0
}, {
x: 255.308,
y: 317.301,
width: 0,
height: 0,
angle: 0
}, {
x: 255.308,
y: 195.98,
width: 0,
height: 0,
angle: 0
}, {
x: 151.319,
y: 195.98,
width: 0,
height: 0,
angle: 0
}, {
x: 151.319,
y: 93.99,
width: 0,
height: 0,
angle: 0
}, {
x: 31.091,
y: 94.975,
width: 0,
height: 0,
angle: 0
}, {
x: 29.12,
y: 303.896,
width: 0,
height: 0,
angle: 0
}, {
x: -59.573,
y: 305.867,
width: 0,
height: 0,
angle: 0
}, {
x: -61.544,
y: 94.975,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -282.792,
y: 153.095,
width: 110,
height: 10,
angle: 90
}, {
x: -177.792,
y: 313.095,
width: 210,
height: 10,
angle: 90
}, {
x: 152.208,
y: 370.595,
width: 115,
height: 10,
angle: 90
}, {
x: -17.792,
y: 423.095,
width: 330,
height: 10,
angle: 0
}, {
x: -230.292,
y: 213.095,
width: 115,
height: 10,
angle: 0
}, {
x: 199.708,
y: 318.095,
width: 105,
height: 10,
angle: 0
}, {
x: 204.708,
y: 198.095,
width: 115,
height: 10,
angle: 0
}, {
x: 257.208,
y: 263.095,
width: 120,
height: 10,
angle: 90
}, {
x: 152.208,
y: 150.595,
width: 105,
height: 10,
angle: 90
}, {
x: 92.208,
y: 93.095,
width: 130,
height: 10,
angle: 0
}, {
x: 32.208,
y: 203.095,
width: 210,
height: 10,
angle: 90
}, {
x: -57.792,
y: 203.095,
width: 210,
height: 10,
angle: 90
}, {
x: -170.292,
y: 93.095,
width: 235,
height: 10,
angle: 0
}, {
x: -12.792,
y: 303.095,
width: 100,
height: 10,
angle: 0
} ],
targets: [ {
x: -222.792,
y: 153.095,
width: 100,
height: 100,
angle: 0
}, {
x: 197.208,
y: 258.095,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: []
} ],
bullets: [ {
basic: {
x: -117.792,
y: 363.095,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 92.208,
y: 363.095,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
} ]
},
4: {
fillNodes: [ {
x: -285.304,
y: 92.657,
width: 0,
height: 0,
angle: 0
}, {
x: -285.304,
y: 212.645,
width: 0,
height: 0,
angle: 0
}, {
x: -177.982,
y: 211.978,
width: 0,
height: 0,
angle: 0
}, {
x: -179.982,
y: 423.29,
width: 0,
height: 0,
angle: 0
}, {
x: 151.318,
y: 424.623,
width: 0,
height: 0,
angle: 0
}, {
x: 151.985,
y: 319.967,
width: 0,
height: 0,
angle: 0
}, {
x: 255.308,
y: 317.301,
width: 0,
height: 0,
angle: 0
}, {
x: 255.308,
y: 195.98,
width: 0,
height: 0,
angle: 0
}, {
x: 151.319,
y: 195.98,
width: 0,
height: 0,
angle: 0
}, {
x: 151.319,
y: 93.99,
width: 0,
height: 0,
angle: 0
}, {
x: 31.091,
y: 94.975,
width: 0,
height: 0,
angle: 0
}, {
x: 29.12,
y: 303.896,
width: 0,
height: 0,
angle: 0
}, {
x: -59.573,
y: 305.867,
width: 0,
height: 0,
angle: 0
}, {
x: -61.544,
y: 94.975,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -282.792,
y: 153.095,
width: 110,
height: 10,
angle: 90
}, {
x: -177.792,
y: 313.095,
width: 210,
height: 10,
angle: 90
}, {
x: 152.208,
y: 370.595,
width: 115,
height: 10,
angle: 90
}, {
x: -17.792,
y: 423.095,
width: 330,
height: 10,
angle: 0
}, {
x: -230.292,
y: 213.095,
width: 115,
height: 10,
angle: 0
}, {
x: 199.708,
y: 318.095,
width: 105,
height: 10,
angle: 0
}, {
x: 204.708,
y: 198.095,
width: 115,
height: 10,
angle: 0
}, {
x: 257.208,
y: 263.095,
width: 120,
height: 10,
angle: 90
}, {
x: 152.208,
y: 150.595,
width: 105,
height: 10,
angle: 90
}, {
x: 92.208,
y: 93.095,
width: 130,
height: 10,
angle: 0
}, {
x: 32.208,
y: 203.095,
width: 210,
height: 10,
angle: 90
}, {
x: -57.792,
y: 203.095,
width: 210,
height: 10,
angle: 90
}, {
x: -170.292,
y: 93.095,
width: 235,
height: 10,
angle: 0
}, {
x: -12.792,
y: 303.095,
width: 100,
height: 10,
angle: 0
} ],
targets: [ {
x: -222.792,
y: 153.095,
width: 100,
height: 100,
angle: 0
}, {
x: 197.208,
y: 258.095,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: [ {
x: -12.792,
y: 363.095,
width: 210,
height: 10,
angle: 0
} ]
} ],
bullets: [ {
basic: {
x: -117.792,
y: 153.095,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 92.208,
y: 153.095,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: -12.792,
y: 363.095,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: "pathWay01"
}
} ]
},
5: {
fillNodes: [ {
x: -284.185,
y: 94.113,
width: 0,
height: 0,
angle: 0
}, {
x: -285.108,
y: 212.216,
width: 0,
height: 0,
angle: 0
}, {
x: -73.815,
y: 213.139,
width: 0,
height: 0,
angle: 0
}, {
x: -74.738,
y: 319.247,
width: 0,
height: 0,
angle: 0
}, {
x: 46.133,
y: 319.247,
width: 0,
height: 0,
angle: 0
}, {
x: 47.978,
y: 214.062,
width: 0,
height: 0,
angle: 0
}, {
x: 150.395,
y: 214.062,
width: 0,
height: 0,
angle: 0
}, {
x: 147.627,
y: 93.191,
width: 0,
height: 0,
angle: 0
}, {
x: -58.13,
y: 94.114,
width: 0,
height: 0,
angle: 0
}, {
x: -63.666,
y: -11.994,
width: 0,
height: 0,
angle: 0
}, {
x: -178.078,
y: -11.994,
width: 0,
height: 0,
angle: 0
}, {
x: -180.846,
y: 92.269,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -282.792,
y: 153.095,
width: 110,
height: 10,
angle: 90
}, {
x: -17.792,
y: 318.095,
width: 120,
height: 10,
angle: 0
}, {
x: -112.792,
y: -11.905,
width: 120,
height: 10,
angle: 0
}, {
x: -72.792,
y: 260.595,
width: 105,
height: 10,
angle: 90
}, {
x: 47.208,
y: 265.595,
width: 115,
height: 10,
angle: 90
}, {
x: -57.792,
y: 45.595,
width: 105,
height: 10,
angle: 90
}, {
x: -177.792,
y: 40.595,
width: 115,
height: 10,
angle: 90
}, {
x: -230.292,
y: 93.095,
width: 115,
height: 10,
angle: 0
}, {
x: 94.708,
y: 213.095,
width: 105,
height: 10,
angle: 0
}, {
x: 47.208,
y: 93.095,
width: 220,
height: 10,
angle: 0
}, {
x: 152.208,
y: 158.095,
width: 120,
height: 10,
angle: 90
}, {
x: -177.792,
y: 213.095,
width: 220,
height: 10,
angle: 0
} ],
targets: [ {
x: -12.792,
y: 258.095,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: [ {
x: -117.792,
y: 100.595,
width: 105,
height: 10,
angle: 90
} ]
} ],
bullets: [ {
basic: {
x: -222.792,
y: 153.095,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: -117.792,
y: 153.095,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: "pathWay01"
}
} ]
},
6: {
fillNodes: [ {
x: -53.126,
y: -114.868,
width: 0,
height: 0,
angle: 0
}, {
x: -56.723,
y: -13.548,
width: 0,
height: 0,
angle: 0
}, {
x: -159.242,
y: -12.948,
width: 0,
height: 0,
angle: 0
}, {
x: -159.242,
y: 91.37,
width: 0,
height: 0,
angle: 0
}, {
x: -262.96,
y: 90.171,
width: 0,
height: 0,
angle: 0
}, {
x: -264.159,
y: 213.674,
width: 0,
height: 0,
angle: 0
}, {
x: -160.441,
y: 211.875,
width: 0,
height: 0,
angle: 0
}, {
x: -159.242,
y: 317.991,
width: 0,
height: 0,
angle: 0
}, {
x: -55.524,
y: 315.593,
width: 0,
height: 0,
angle: 0
}, {
x: -55.524,
y: 407.92,
width: 0,
height: 0,
angle: 0
}, {
x: -158.643,
y: 407.32,
width: 0,
height: 0,
angle: 0
}, {
x: -159.243,
y: 529.024,
width: 0,
height: 0,
angle: 0
}, {
x: 66.779,
y: 526.626,
width: 0,
height: 0,
angle: 0
}, {
x: 66.779,
y: 421.709,
width: 0,
height: 0,
angle: 0
}, {
x: 171.097,
y: 422.908,
width: 0,
height: 0,
angle: 0
}, {
x: 171.697,
y: 301.204,
width: 0,
height: 0,
angle: 0
}, {
x: 65.581,
y: 298.806,
width: 0,
height: 0,
angle: 0
}, {
x: 66.78,
y: 211.874,
width: 0,
height: 0,
angle: 0
}, {
x: 172.896,
y: 211.274,
width: 0,
height: 0,
angle: 0
}, {
x: 171.097,
y: -14.748,
width: 0,
height: 0,
angle: 0
}, {
x: 66.18,
y: -14.148,
width: 0,
height: 0,
angle: 0
}, {
x: 66.78,
y: -119.665,
width: 0,
height: 0,
angle: 0
}, {
x: -52.526,
y: -119.665,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -261.967,
y: 152.284,
width: 110,
height: 10,
angle: 90
}, {
x: -156.967,
y: 44.784,
width: 105,
height: 10,
angle: 90
}, {
x: -51.967,
y: -60.216,
width: 105,
height: 10,
angle: 90
}, {
x: 68.033,
y: -65.216,
width: 115,
height: 10,
angle: 90
}, {
x: 173.033,
y: 94.784,
width: 225,
height: 10,
angle: 90
}, {
x: 115.533,
y: -12.716,
width: 105,
height: 10,
angle: 0
}, {
x: 120.533,
y: 212.284,
width: 115,
height: 10,
angle: 0
}, {
x: -104.467,
y: -12.716,
width: 115,
height: 10,
angle: 0
}, {
x: 3.033,
y: -117.716,
width: 120,
height: 10,
angle: 0
}, {
x: -156.967,
y: 259.784,
width: 105,
height: 10,
angle: 90
}, {
x: -156.967,
y: 462.284,
width: 120,
height: 10,
angle: 90
}, {
x: 68.033,
y: 474.784,
width: 115,
height: 10,
angle: 90
}, {
x: 173.033,
y: 367.284,
width: 120,
height: 10,
angle: 90
}, {
x: -51.967,
y: 362.284,
width: 100,
height: 10,
angle: 90
}, {
x: -209.467,
y: 212.284,
width: 115,
height: 10,
angle: 0
}, {
x: -209.467,
y: 92.284,
width: 115,
height: 10,
angle: 0
}, {
x: -49.467,
y: 527.284,
width: 225,
height: 10,
angle: 0
}, {
x: -99.467,
y: 407.284,
width: 105,
height: 10,
angle: 0
}, {
x: 115.533,
y: 422.284,
width: 105,
height: 10,
angle: 0
}, {
x: 120.533,
y: 302.284,
width: 115,
height: 10,
angle: 0
}, {
x: 68.033,
y: 257.284,
width: 100,
height: 10,
angle: 90
}, {
x: -104.467,
y: 317.284,
width: 115,
height: 10,
angle: 0
} ],
targets: [ {
x: -96.967,
y: 467.284,
width: 100,
height: 100,
angle: 0
}, {
x: 113.033,
y: 362.284,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: []
} ],
bullets: [ {
basic: {
x: -201.967,
y: 152.284,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 113.033,
y: 47.284,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
} ]
},
7: {
fillNodes: [ {
x: -65.714,
y: 86.196,
width: 0,
height: 0,
angle: 0
}, {
x: -66.567,
y: 192.021,
width: 0,
height: 0,
angle: 0
}, {
x: -170.685,
y: 190.314,
width: 0,
height: 0,
angle: 0
}, {
x: -170.685,
y: 259.683,
width: 0,
height: 0,
angle: 0
}, {
x: -118.658,
y: 259.683,
width: 0,
height: 0,
angle: 0
}, {
x: -118.016,
y: 313.637,
width: 0,
height: 0,
angle: 0
}, {
x: 105.507,
y: 313.637,
width: 0,
height: 0,
angle: 0
}, {
x: 108.719,
y: 260.325,
width: 0,
height: 0,
angle: 0
}, {
x: 157.534,
y: 260.325,
width: 0,
height: 0,
angle: 0
}, {
x: 160.103,
y: 192.883,
width: 0,
height: 0,
angle: 0
}, {
x: 54.764,
y: 191.598,
width: 0,
height: 0,
angle: 0
}, {
x: 55.406,
y: 87.544,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -169.889,
y: 227.311,
width: 57.5,
height: 10,
angle: 90
}, {
x: 160.111,
y: 232.311,
width: 67.5,
height: 10,
angle: 90
}, {
x: -143.639,
y: 261.061,
width: 62.5,
height: 10,
angle: 0
}, {
x: 128.861,
y: 261.061,
width: 52.5,
height: 10,
angle: 0
}, {
x: 107.611,
y: 193.561,
width: 115,
height: 10,
angle: 0
}, {
x: 55.111,
y: 146.061,
width: 105,
height: 10,
angle: 90
}, {
x: -64.889,
y: 141.061,
width: 115,
height: 10,
angle: 90
}, {
x: -117.389,
y: 193.561,
width: 115,
height: 10,
angle: 0
}, {
x: .111,
y: 88.561,
width: 120,
height: 10,
angle: 0
}, {
x: -117.389,
y: 282.311,
width: 52.5,
height: 10,
angle: 90
}, {
x: 107.611,
y: 287.311,
width: 62.5,
height: 10,
angle: 90
}, {
x: -9.889,
y: 313.561,
width: 225,
height: 10,
angle: 0
} ],
targets: [ {
x: -4.889,
y: 148.561,
width: 100,
height: 100,
angle: 0
}, {
x: -136.389,
y: 227.061,
width: 47.5,
height: 47.5,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: []
} ],
bullets: [ {
basic: {
x: -57.389,
y: 253.561,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 126.611,
y: 227.061,
width: 47.5,
height: 47.5,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
} ]
},
8: {
fillNodes: [ {
x: 26.664,
y: -28.232,
width: 0,
height: 0,
angle: 0
}, {
x: 25.096,
y: 76.854,
width: 0,
height: 0,
angle: 0
}, {
x: -133.317,
y: 76.854,
width: 0,
height: 0,
angle: 0
}, {
x: -131.749,
y: 144.297,
width: 0,
height: 0,
angle: 0
}, {
x: -76.853,
y: 144.297,
width: 0,
height: 0,
angle: 0
}, {
x: -76.853,
y: 302.71,
width: 0,
height: 0,
angle: 0
}, {
x: 197.626,
y: 302.71,
width: 0,
height: 0,
angle: 0
}, {
x: 197.626,
y: 79.99,
width: 0,
height: 0,
angle: 0
}, {
x: 145.867,
y: 76.853,
width: 0,
height: 0,
angle: 0
}, {
x: 145.867,
y: -26.665,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -131.128,
y: 112.528,
width: 57.5,
height: 10,
angle: 90
}, {
x: -52.378,
y: 78.778,
width: 167.5,
height: 10,
angle: 0
}, {
x: 172.622,
y: 78.778,
width: 62.5,
height: 10,
angle: 0
}, {
x: 146.372,
y: 31.278,
width: 105,
height: 10,
angle: 90
}, {
x: 26.372,
y: 26.278,
width: 115,
height: 10,
angle: 90
}, {
x: 91.372,
y: -26.222,
width: 120,
height: 10,
angle: 0
}, {
x: -104.878,
y: 146.278,
width: 62.5,
height: 10,
angle: 0
}, {
x: -78.628,
y: 220.028,
width: 157.5,
height: 10,
angle: 90
}, {
x: 55.122,
y: 303.778,
width: 277.5,
height: 10,
angle: 0
}, {
x: 198.872,
y: 196.278,
width: 225,
height: 10,
angle: 90
} ],
targets: [ {
x: 86.372,
y: 33.778,
width: 100,
height: 100,
angle: 0
}, {
x: -97.628,
y: 112.278,
width: 47.5,
height: 47.5,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: []
} ],
bullets: [ {
basic: {
x: 138.872,
y: 138.778,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 60.122,
y: 217.528,
width: 152.5,
height: 47.5,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: ""
}
}, {
basic: {
x: 60.122,
y: 112.278,
width: 47.5,
height: 47.5,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
} ]
},
9: {
fillNodes: [ {
x: -309,
y: -92.364,
width: 0,
height: 0,
angle: 0
}, {
x: -309.536,
y: 357.505,
width: 0,
height: 0,
angle: 0
}, {
x: 285.855,
y: 359.141,
width: 0,
height: 0,
angle: 0
}, {
x: 288.035,
y: -93.949,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -307.493,
y: 133.088,
width: 440,
height: 10,
angle: 90
}, {
x: 287.507,
y: 138.088,
width: 450,
height: 10,
angle: 90
}, {
x: -277.493,
y: -91.912,
width: 70,
height: 10,
angle: 0
}, {
x: -9.993,
y: 358.088,
width: 445,
height: 10,
angle: 0
}, {
x: -9.993,
y: -91.912,
width: 445,
height: 10,
angle: 0
}, {
x: 252.507,
y: 358.088,
width: 60,
height: 10,
angle: 0
}, {
x: 257.507,
y: -91.912,
width: 70,
height: 10,
angle: 0
}, {
x: 102.507,
y: 238.088,
width: 240,
height: 10,
angle: 0
}, {
x: -12.493,
y: 138.088,
width: 210,
height: 10,
angle: 90
}, {
x: 107.507,
y: 128.088,
width: 210,
height: 10,
angle: 90
}, {
x: 162.507,
y: 28.088,
width: 120,
height: 10,
angle: 0
}, {
x: -277.493,
y: 358.088,
width: 70,
height: 10,
angle: 0
}, {
x: -237.493,
y: 303.088,
width: 120,
height: 10,
angle: 90
}, {
x: 217.507,
y: 303.088,
width: 120,
height: 10,
angle: 90
}, {
x: 217.507,
y: -36.912,
width: 120,
height: 10,
angle: 90
}, {
x: -237.493,
y: 38.088,
width: 270,
height: 10,
angle: 90
}, {
x: -189.993,
y: 238.088,
width: 105,
height: 10,
angle: 0
}, {
x: -119.993,
y: 28.088,
width: 225,
height: 10,
angle: 0
}, {
x: -184.993,
y: 168.088,
width: 115,
height: 10,
angle: 0
}, {
x: -132.493,
y: 208.088,
width: 70,
height: 10,
angle: 90
} ],
targets: [ {
x: -177.493,
y: 88.088,
width: 100,
height: 100,
angle: 0
}, {
x: 47.507,
y: 178.088,
width: 100,
height: 100,
angle: 0
}, {
x: -167.493,
y: 203.088,
width: 50,
height: 50,
angle: 0
}, {
x: 142.507,
y: 63.088,
width: 50,
height: 50,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: []
} ],
bullets: [ {
basic: {
x: -72.493,
y: 193.088,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: -272.493,
y: 203.088,
width: 50,
height: 50,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 197.507,
y: 133.088,
width: 50,
height: 50,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 197.507,
y: 198.088,
width: 50,
height: 70,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: ""
}
}, {
basic: {
x: 197.507,
y: 68.088,
width: 50,
height: 70,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: ""
}
}, {
basic: {
x: 47.507,
y: 73.088,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
} ]
},
10: {
fillNodes: [ {
x: -156.535,
y: -114.391,
width: 0,
height: 0,
angle: 0
}, {
x: -159.545,
y: 0,
width: 0,
height: 0,
angle: 0
}, {
x: -53.817,
y: 2.057,
width: 0,
height: 0,
angle: 0
}, {
x: -55.799,
y: 303.962,
width: 0,
height: 0,
angle: 0
}, {
x: -160.838,
y: 303.301,
width: 0,
height: 0,
angle: 0
}, {
x: -158.062,
y: 530.91,
width: 0,
height: 0,
angle: 0
}, {
x: -39.631,
y: 529.06,
width: 0,
height: 0,
angle: 0
}, {
x: -39.631,
y: 426.358,
width: 0,
height: 0,
angle: 0
}, {
x: 67.697,
y: 423.582,
width: 0,
height: 0,
angle: 0
}, {
x: 67.697,
y: 216.328,
width: 0,
height: 0,
angle: 0
}, {
x: 171.324,
y: 214.478,
width: 0,
height: 0,
angle: 0
}, {
x: 171.324,
y: 93.272,
width: 0,
height: 0,
angle: 0
}, {
x: 64.921,
y: 92.347,
width: 0,
height: 0,
angle: 0
}, {
x: 66.771,
y: -100.103,
width: 0,
height: 0,
angle: 0
}, {
x: 169.473,
y: -101.953,
width: 0,
height: 0,
angle: 0
}, {
x: 172.249,
y: -220.383,
width: 0,
height: 0,
angle: 0
}, {
x: -50.734,
y: -220.383,
width: 0,
height: 0,
angle: 0
}, {
x: -56.285,
y: -115.831,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -157.787,
y: 415.383,
width: 215,
height: 10,
angle: 90
}, {
x: -102.787,
y: 527.883,
width: 120,
height: 10,
angle: 0
}, {
x: 67.213,
y: 317.883,
width: 220,
height: 10,
angle: 90
}, {
x: -37.787,
y: 475.383,
width: 115,
height: 10,
angle: 90
}, {
x: 9.713,
y: 422.883,
width: 105,
height: 10,
angle: 0
}, {
x: -105.287,
y: 302.883,
width: 115,
height: 10,
angle: 0
}, {
x: -105.287,
y: 2.883,
width: 115,
height: 10,
angle: 0
}, {
x: -105.287,
y: -117.117,
width: 115,
height: 10,
angle: 0
}, {
x: -52.787,
y: -164.617,
width: 105,
height: 10,
angle: 90
}, {
x: 172.213,
y: -167.117,
width: 120,
height: 10,
angle: 90
}, {
x: 54.713,
y: -222.117,
width: 225,
height: 10,
angle: 0
}, {
x: 119.713,
y: -102.117,
width: 115,
height: 10,
angle: 0
}, {
x: 114.713,
y: 212.883,
width: 105,
height: 10,
angle: 0
}, {
x: 119.713,
y: 92.883,
width: 115,
height: 10,
angle: 0
}, {
x: 67.213,
y: -4.617,
width: 205,
height: 10,
angle: 90
}, {
x: 172.213,
y: 157.883,
width: 120,
height: 10,
angle: 90
}, {
x: -157.787,
y: -52.117,
width: 120,
height: 10,
angle: 90
}, {
x: -52.787,
y: 152.883,
width: 310,
height: 10,
angle: 90
} ],
targets: [ {
x: -97.787,
y: -57.117,
width: 100,
height: 100,
angle: 0
}, {
x: 112.213,
y: -162.117,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: [ {
x: 59.713,
y: 152.883,
width: 105,
height: 10,
angle: 0
} ]
} ],
bullets: [ {
basic: {
x: -97.787,
y: 467.883,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 7.213,
y: 257.883,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 112.213,
y: 152.883,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: "pathWay01"
}
} ]
},
11: {
fillNodes: [ {
x: -79.376,
y: -16.916,
width: 0,
height: 0,
angle: 0
}, {
x: -80.677,
y: 192.585,
width: 0,
height: 0,
angle: 0
}, {
x: -183.476,
y: 192.585,
width: 0,
height: 0,
angle: 0
}, {
x: -184.777,
y: 314.903,
width: 0,
height: 0,
angle: 0
}, {
x: 23.423,
y: 308.397,
width: 0,
height: 0,
angle: 0
}, {
x: 23.423,
y: 417.703,
width: 0,
height: 0,
angle: 0
}, {
x: 147.042,
y: 417.703,
width: 0,
height: 0,
angle: 0
}, {
x: 147.042,
y: 209.503,
width: 0,
height: 0,
angle: 0
}, {
x: 249.841,
y: 208.202,
width: 0,
height: 0,
angle: 0
}, {
x: 253.745,
y: 88.487,
width: 0,
height: 0,
angle: 0
}, {
x: 40.34,
y: 88.487,
width: 0,
height: 0,
angle: 0
}, {
x: 42.943,
y: -16.914,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -182.283,
y: 253.09,
width: 110,
height: 10,
angle: 90
}, {
x: 27.717,
y: 360.59,
width: 105,
height: 10,
angle: 90
}, {
x: 82.717,
y: 418.09,
width: 120,
height: 10,
angle: 0
}, {
x: 195.217,
y: 208.09,
width: 105,
height: 10,
angle: 0
}, {
x: 252.717,
y: 153.09,
width: 120,
height: 10,
angle: 90
}, {
x: 42.717,
y: 40.59,
width: 105,
height: 10,
angle: 90
}, {
x: -12.283,
y: -16.91,
width: 120,
height: 10,
angle: 0
}, {
x: -77.283,
y: 313.09,
width: 220,
height: 10,
angle: 0
}, {
x: -129.783,
y: 193.09,
width: 115,
height: 10,
angle: 0
}, {
x: 147.717,
y: 313.09,
width: 220,
height: 10,
angle: 90
}, {
x: -77.283,
y: 88.09,
width: 220,
height: 10,
angle: 90
}, {
x: 147.717,
y: 88.09,
width: 220,
height: 10,
angle: 0
} ],
targets: [ {
x: -122.283,
y: 253.09,
width: 100,
height: 100,
angle: 0
}, {
x: 87.717,
y: 358.09,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: [ {
x: 35.217,
y: 148.09,
width: 105,
height: 10,
angle: 0
}, {
x: 35.217,
y: 253.09,
width: 105,
height: 10,
angle: 0
}, {
x: 87.717,
y: 200.59,
width: 105,
height: 10,
angle: 90
}, {
x: -17.283,
y: 200.59,
width: 105,
height: 10,
angle: 90
} ]
} ],
bullets: [ {
basic: {
x: -17.283,
y: 43.09,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 192.717,
y: 148.09,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: -17.283,
y: 148.09,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: "pathWay01"
}
}, {
basic: {
x: 87.717,
y: 148.09,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: "pathWay01"
}
} ]
},
12: {
fillNodes: [ {
x: -21.081,
y: -30.305,
width: 0,
height: 0,
angle: 0
}, {
x: -22.399,
y: 76.42,
width: 0,
height: 0,
angle: 0
}, {
x: -126.488,
y: 79.055,
width: 0,
height: 0,
angle: 0
}, {
x: -129.123,
y: 185.78,
width: 0,
height: 0,
angle: 0
}, {
x: -328.079,
y: 183.145,
width: 0,
height: 0,
angle: 0
}, {
x: -326.761,
y: 301.728,
width: 0,
height: 0,
angle: 0
}, {
x: -222.672,
y: 301.728,
width: 0,
height: 0,
angle: 0
}, {
x: -222.672,
y: 408.453,
width: 0,
height: 0,
angle: 0
}, {
x: -11.858,
y: 408.453,
width: 0,
height: 0,
angle: 0
}, {
x: -11.858,
y: 512.543,
width: 0,
height: 0,
angle: 0
}, {
x: 108.043,
y: 512.543,
width: 0,
height: 0,
angle: 0
}, {
x: 108.043,
y: 409.771,
width: 0,
height: 0,
angle: 0
}, {
x: 305.681,
y: 408.453,
width: 0,
height: 0,
angle: 0
}, {
x: 308.316,
y: 287.235,
width: 0,
height: 0,
angle: 0
}, {
x: 204.227,
y: 287.235,
width: 0,
height: 0,
angle: 0
}, {
x: 202.909,
y: 183.146,
width: 0,
height: 0,
angle: 0
}, {
x: 96.185,
y: 184.463,
width: 0,
height: 0,
angle: 0
}, {
x: 98.82,
y: -27.669,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -327.363,
y: 242.677,
width: 110,
height: 10,
angle: 90
}, {
x: -12.363,
y: 25.177,
width: 115,
height: 10,
angle: 90
}, {
x: -59.863,
y: 77.677,
width: 105,
height: 10,
angle: 0
}, {
x: -117.363,
y: 130.177,
width: 115,
height: 10,
angle: 90
}, {
x: 265.137,
y: 287.677,
width: 115,
height: 10,
angle: 0
}, {
x: 160.137,
y: 182.677,
width: 115,
height: 10,
angle: 0
}, {
x: 52.637,
y: -27.323,
width: 120,
height: 10,
angle: 0
}, {
x: 212.637,
y: 240.177,
width: 105,
height: 10,
angle: 90
}, {
x: 107.637,
y: 82.677,
width: 210,
height: 10,
angle: 90
}, {
x: -274.863,
y: 302.677,
width: 115,
height: 10,
angle: 0
}, {
x: -222.363,
y: 350.177,
width: 105,
height: 10,
angle: 90
}, {
x: 317.637,
y: 352.677,
width: 120,
height: 10,
angle: 90
}, {
x: -12.363,
y: 455.177,
width: 105,
height: 10,
angle: 90
}, {
x: 107.637,
y: 460.177,
width: 115,
height: 10,
angle: 90
}, {
x: 42.637,
y: 512.677,
width: 120,
height: 10,
angle: 0
}, {
x: -117.363,
y: 407.677,
width: 220,
height: 10,
angle: 0
}, {
x: -222.363,
y: 182.677,
width: 220,
height: 10,
angle: 0
}, {
x: 207.637,
y: 407.677,
width: 210,
height: 10,
angle: 0
} ],
targets: [ {
x: 47.637,
y: 452.677,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: [ {
x: -4.863,
y: 242.677,
width: 105,
height: 10,
angle: 0
}, {
x: 47.637,
y: 295.177,
width: 105,
height: 10,
angle: 90
}, {
x: -4.863,
y: 347.677,
width: 105,
height: 10,
angle: 0
}, {
x: -57.363,
y: 295.177,
width: 105,
height: 10,
angle: 90
} ]
} ],
bullets: [ {
basic: {
x: -267.363,
y: 242.677,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 47.637,
y: 347.677,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: "pathWay01"
}
}, {
basic: {
x: 47.637,
y: 242.677,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: "pathWay01"
}
}, {
basic: {
x: -57.363,
y: 242.677,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: "pathWay01"
}
} ]
},
13: {
fillNodes: [ {
x: -147.249,
y: -10.205,
width: 0,
height: 0,
angle: 0
}, {
x: -149.322,
y: 94.495,
width: 0,
height: 0,
angle: 0
}, {
x: -252.985,
y: 94.495,
width: 0,
height: 0,
angle: 0
}, {
x: -254.022,
y: 213.708,
width: 0,
height: 0,
angle: 0
}, {
x: -148.286,
y: 210.598,
width: 0,
height: 0,
angle: 0
}, {
x: -150.359,
y: 302.858,
width: 0,
height: 0,
angle: 0
}, {
x: -254.022,
y: 302.858,
width: 0,
height: 0,
angle: 0
}, {
x: -254.022,
y: 529.88,
width: 0,
height: 0,
angle: 0
}, {
x: -134.81,
y: 528.843,
width: 0,
height: 0,
angle: 0
}, {
x: -133.773,
y: 424.143,
width: 0,
height: 0,
angle: 0
}, {
x: 63.186,
y: 424.143,
width: 0,
height: 0,
angle: 0
}, {
x: 60.076,
y: 528.843,
width: 0,
height: 0,
angle: 0
}, {
x: 181.362,
y: 528.843,
width: 0,
height: 0,
angle: 0
}, {
x: 183.435,
y: 423.107,
width: 0,
height: 0,
angle: 0
}, {
x: 287.098,
y: 423.107,
width: 0,
height: 0,
angle: 0
}, {
x: 288.135,
y: 303.895,
width: 0,
height: 0,
angle: 0
}, {
x: 182.399,
y: 302.858,
width: 0,
height: 0,
angle: 0
}, {
x: 183.436,
y: 110.045,
width: 0,
height: 0,
angle: 0
}, {
x: 285.026,
y: 109.008,
width: 0,
height: 0,
angle: 0
}, {
x: 289.173,
y: -11.241,
width: 0,
height: 0,
angle: 0
}, {
x: 63.188,
y: -12.278,
width: 0,
height: 0,
angle: 0
}, {
x: 63.188,
y: 91.385,
width: 0,
height: 0,
angle: 0
}, {
x: -29.072,
y: 92.422,
width: 0,
height: 0,
angle: 0
}, {
x: -28.035,
y: -13.314,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -251.799,
y: 152.854,
width: 110,
height: 10,
angle: 90
}, {
x: -199.299,
y: 212.854,
width: 115,
height: 10,
angle: 0
}, {
x: -194.299,
y: 302.854,
width: 105,
height: 10,
angle: 0
}, {
x: -251.799,
y: 410.354,
width: 225,
height: 10,
angle: 90
}, {
x: -196.799,
y: 527.854,
width: 120,
height: 10,
angle: 0
}, {
x: -131.799,
y: 475.354,
width: 115,
height: 10,
angle: 90
}, {
x: 63.201,
y: 470.354,
width: 105,
height: 10,
angle: 90
}, {
x: 183.201,
y: 475.354,
width: 115,
height: 10,
angle: 90
}, {
x: 230.701,
y: 422.854,
width: 105,
height: 10,
angle: 0
}, {
x: 235.701,
y: 302.854,
width: 115,
height: 10,
angle: 0
}, {
x: 230.701,
y: 107.854,
width: 105,
height: 10,
angle: 0
}, {
x: 180.701,
y: -12.146,
width: 225,
height: 10,
angle: 0
}, {
x: 288.201,
y: 52.854,
width: 120,
height: 10,
angle: 90
}, {
x: 62.932,
y: 40.354,
width: 115,
height: 10,
angle: 90
}, {
x: -27.068,
y: 45.354,
width: 105,
height: 10,
angle: 90
}, {
x: -147.068,
y: 40.354,
width: 115,
height: 10,
angle: 90
}, {
x: -199.568,
y: 92.854,
width: 115,
height: 10,
angle: 0
}, {
x: 17.932,
y: 92.854,
width: 100,
height: 10,
angle: 0
}, {
x: -82.068,
y: -12.146,
width: 120,
height: 10,
angle: 0
}, {
x: 288.201,
y: 367.854,
width: 120,
height: 10,
angle: 90
}, {
x: 118.201,
y: 527.854,
width: 120,
height: 10,
angle: 0
}, {
x: -34.299,
y: 422.854,
width: 205,
height: 10,
angle: 0
}, {
x: 183.201,
y: 205.354,
width: 205,
height: 10,
angle: 90
}, {
x: -146.799,
y: 257.854,
width: 100,
height: 10,
angle: 90
} ],
targets: [ {
x: -191.799,
y: 467.854,
width: 100,
height: 100,
angle: 0
}, {
x: -87.068,
y: 47.854,
width: 100,
height: 100,
angle: 0
}, {
x: 228.201,
y: 47.854,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: []
} ],
bullets: [ {
basic: {
x: -191.799,
y: 152.854,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 122.932,
y: 47.854,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 17.932,
y: 362.854,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 17.932,
y: 257.854,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: ""
}
} ]
},
14: {
fillNodes: [ {
x: -90.937,
y: 17.549,
width: 0,
height: 0,
angle: 0
}, {
x: -299.932,
y: 19.144,
width: 0,
height: 0,
angle: 0
}, {
x: -301.527,
y: 445.111,
width: 0,
height: 0,
angle: 0
}, {
x: 15.953,
y: 445.111,
width: 0,
height: 0,
angle: 0
}, {
x: 14.358,
y: 548.811,
width: 0,
height: 0,
angle: 0
}, {
x: 134.011,
y: 550.406,
width: 0,
height: 0,
angle: 0
}, {
x: 135.606,
y: 445.111,
width: 0,
height: 0,
angle: 0
}, {
x: 344.601,
y: 446.706,
width: 0,
height: 0,
angle: 0
}, {
x: 343.006,
y: 323.862,
width: 0,
height: 0,
angle: 0
}, {
x: 239.306,
y: 325.457,
width: 0,
height: 0,
angle: 0
}, {
x: 239.306,
y: 236.116,
width: 0,
height: 0,
angle: 0
}, {
x: 344.601,
y: 234.521,
width: 0,
height: 0,
angle: 0
}, {
x: 346.196,
y: 11.168,
width: 0,
height: 0,
angle: 0
}, {
x: 224.947,
y: 9.573,
width: 0,
height: 0,
angle: 0
}, {
x: 224.947,
y: 114.868,
width: 0,
height: 0,
angle: 0
}, {
x: 28.715,
y: 118.059,
width: 0,
height: 0,
angle: 0
}, {
x: 28.715,
y: -82.959,
width: 0,
height: 0,
angle: 0
}, {
x: -87.748,
y: -84.554,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -89.799,
y: -37.566,
width: 105,
height: 10,
angle: 90
}, {
x: -34.799,
y: -94.894,
width: 120,
height: 10,
angle: 0
}, {
x: 15.201,
y: 492.434,
width: 105,
height: 10,
angle: 90
}, {
x: 70.201,
y: 549.934,
width: 120,
height: 10,
angle: 0
}, {
x: 135.201,
y: 497.434,
width: 115,
height: 10,
angle: 90
}, {
x: 235.201,
y: 444.934,
width: 210,
height: 10,
angle: 0
}, {
x: 345.201,
y: 389.934,
width: 120,
height: 10,
angle: 90
}, {
x: 292.701,
y: 324.934,
width: 115,
height: 10,
angle: 0
}, {
x: 240.201,
y: 279.934,
width: 100,
height: 10,
angle: 90
}, {
x: 287.701,
y: 234.934,
width: 105,
height: 10,
angle: 0
}, {
x: 290.201,
y: 9.934,
width: 120,
height: 10,
angle: 0
}, {
x: 225.201,
y: 62.434,
width: 115,
height: 10,
angle: 90
}, {
x: 127.701,
y: 114.934,
width: 205,
height: 10,
angle: 0
}, {
x: 30.201,
y: 9.934,
width: 220,
height: 10,
angle: 90
}, {
x: 345.201,
y: 127.434,
width: 225,
height: 10,
angle: 90
}, {
x: -189.799,
y: 9.934,
width: 210,
height: 10,
angle: 0
}, {
x: -299.799,
y: 222.434,
width: 435,
height: 10,
angle: 90
}, {
x: -142.299,
y: 444.934,
width: 325,
height: 10,
angle: 0
} ],
targets: [ {
x: 75.201,
y: 489.934,
width: 100,
height: 100,
angle: 0
}, {
x: 285.201,
y: 69.934,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: []
} ],
bullets: [ {
basic: {
x: -29.799,
y: -34.894,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: -239.799,
y: 384.934,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: -82.299,
y: 279.934,
width: 205,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: ""
}
}, {
basic: {
x: -134.799,
y: 177.434,
width: 100,
height: 105,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: ""
}
} ]
},
15: {
fillNodes: [ {
x: -20.613,
y: 95.894,
width: 0,
height: 0,
angle: 0
}, {
x: -23.302,
y: 411.358,
width: 0,
height: 0,
angle: 0
}, {
x: -111.13,
y: 411.358,
width: 0,
height: 0,
angle: 0
}, {
x: -112.026,
y: 303.813,
width: 0,
height: 0,
angle: 0
}, {
x: -335.181,
y: 305.605,
width: 0,
height: 0,
angle: 0
}, {
x: -335.181,
y: 424.8,
width: 0,
height: 0,
angle: 0
}, {
x: -232.118,
y: 423.008,
width: 0,
height: 0,
angle: 0
}, {
x: -231.222,
y: 532.345,
width: 0,
height: 0,
angle: 0
}, {
x: 205.229,
y: 531.449,
width: 0,
height: 0,
angle: 0
}, {
x: 203.437,
y: 319.945,
width: 0,
height: 0,
angle: 0
}, {
x: 308.293,
y: 320.841,
width: 0,
height: 0,
angle: 0
}, {
x: 309.189,
y: 199.854,
width: 0,
height: 0,
angle: 0
}, {
x: 201.644,
y: 197.165,
width: 0,
height: 0,
angle: 0
}, {
x: 201.644,
y: 94.177,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -335.69,
y: 365.146,
width: 110,
height: 10,
angle: 90
}, {
x: -283.19,
y: 425.146,
width: 115,
height: 10,
angle: 0
}, {
x: -65.69,
y: 410.146,
width: 100,
height: 10,
angle: 0
}, {
x: -110.69,
y: 362.646,
width: 105,
height: 10,
angle: 90
}, {
x: -223.19,
y: 305.146,
width: 235,
height: 10,
angle: 0
}, {
x: 251.81,
y: 320.146,
width: 105,
height: 10,
angle: 0
}, {
x: 256.81,
y: 200.146,
width: 115,
height: 10,
angle: 0
}, {
x: 204.31,
y: 152.646,
width: 105,
height: 10,
angle: 90
}, {
x: 96.81,
y: 95.146,
width: 225,
height: 10,
angle: 0
}, {
x: -20.69,
y: 252.646,
width: 325,
height: 10,
angle: 90
}, {
x: 309.31,
y: 265.146,
width: 120,
height: 10,
angle: 90
}, {
x: -230.69,
y: 472.646,
width: 105,
height: 10,
angle: 90
}, {
x: 204.31,
y: 425.146,
width: 220,
height: 10,
angle: 90
}, {
x: -18.19,
y: 530.146,
width: 435,
height: 10,
angle: 0
} ],
targets: [ {
x: -275.69,
y: 365.146,
width: 100,
height: 100,
angle: 0
}, {
x: 249.31,
y: 260.146,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: [ {
x: 144.31,
y: 417.646,
width: 105,
height: 10,
angle: 90
} ]
} ],
bullets: [ {
basic: {
x: 39.31,
y: 155.146,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 144.31,
y: 155.146,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 144.31,
y: 470.146,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: "pathWay01"
}
} ]
},
16: {
fillNodes: [ {
x: -73.888,
y: 18.808,
width: 0,
height: 0,
angle: 0
}, {
x: -76.575,
y: 120.907,
width: 0,
height: 0,
angle: 0
}, {
x: -178.674,
y: 123.594,
width: 0,
height: 0,
angle: 0
}, {
x: -184.048,
y: 331.823,
width: 0,
height: 0,
angle: 0
}, {
x: -284.804,
y: 331.823,
width: 0,
height: 0,
angle: 0
}, {
x: -284.804,
y: 451.386,
width: 0,
height: 0,
angle: 0
}, {
x: -180.018,
y: 452.729,
width: 0,
height: 0,
angle: 0
}, {
x: -182.705,
y: 659.614,
width: 0,
height: 0,
angle: 0
}, {
x: -59.111,
y: 663.644,
width: 0,
height: 0,
angle: 0
}, {
x: -60.454,
y: 558.858,
width: 0,
height: 0,
angle: 0
}, {
x: 44.332,
y: 557.515,
width: 0,
height: 0,
angle: 0
}, {
x: 47.019,
y: 437.952,
width: 0,
height: 0,
angle: 0
}, {
x: -60.454,
y: 433.922,
width: 0,
height: 0,
angle: 0
}, {
x: -60.454,
y: 347.944,
width: 0,
height: 0,
angle: 0
}, {
x: 138.371,
y: 346.601,
width: 0,
height: 0,
angle: 0
}, {
x: 138.371,
y: 451.387,
width: 0,
height: 0,
angle: 0
}, {
x: 252.561,
y: 448.7,
width: 0,
height: 0,
angle: 0
}, {
x: 256.591,
y: 227.037,
width: 0,
height: 0,
angle: 0
}, {
x: 149.118,
y: 227.037,
width: 0,
height: 0,
angle: 0
}, {
x: 149.118,
y: 134.342,
width: 0,
height: 0,
angle: 0
}, {
x: 255.247,
y: 135.685,
width: 0,
height: 0,
angle: 0
}, {
x: 255.247,
y: -87.321,
width: 0,
height: 0,
angle: 0
}, {
x: 30.898,
y: -87.321,
width: 0,
height: 0,
angle: 0
}, {
x: 30.898,
y: 16.122,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -285.496,
y: 391.439,
width: 110,
height: 10,
angle: 90
}, {
x: -232.996,
y: 331.439,
width: 115,
height: 10,
angle: 0
}, {
x: -232.996,
y: 451.439,
width: 115,
height: 10,
angle: 0
}, {
x: -180.496,
y: 551.439,
width: 210,
height: 10,
angle: 90
}, {
x: -125.496,
y: 661.439,
width: 120,
height: 10,
angle: 0
}, {
x: -60.496,
y: 608.939,
width: 115,
height: 10,
angle: 90
}, {
x: -12.996,
y: 556.439,
width: 105,
height: 10,
angle: 0
}, {
x: -7.996,
y: 436.439,
width: 115,
height: 10,
angle: 0
}, {
x: -60.496,
y: 391.439,
width: 100,
height: 10,
angle: 90
}, {
x: 134.504,
y: 393.939,
width: 105,
height: 10,
angle: 90
}, {
x: 189.504,
y: 451.439,
width: 120,
height: 10,
angle: 0
}, {
x: 202.004,
y: 226.439,
width: 115,
height: 10,
angle: 0
}, {
x: 149.504,
y: 181.439,
width: 100,
height: 10,
angle: 90
}, {
x: 29.504,
y: -36.061,
width: 115,
height: 10,
angle: 90
}, {
x: -17.996,
y: 16.439,
width: 105,
height: 10,
angle: 0
}, {
x: -75.496,
y: 68.939,
width: 115,
height: 10,
angle: 90
}, {
x: -122.996,
y: 121.439,
width: 105,
height: 10,
angle: 0
}, {
x: -180.496,
y: 226.439,
width: 220,
height: 10,
angle: 90
}, {
x: 197.004,
y: 136.439,
width: 105,
height: 10,
angle: 0
}, {
x: 254.504,
y: 28.939,
width: 225,
height: 10,
angle: 90
}, {
x: 147.004,
y: -88.561,
width: 225,
height: 10,
angle: 0
}, {
x: 254.504,
y: 343.939,
width: 225,
height: 10,
angle: 90
}, {
x: 37.004,
y: 346.439,
width: 205,
height: 10,
angle: 0
}, {
x: 44.504,
y: 501.439,
width: 120,
height: 10,
angle: 90
} ],
targets: [ {
x: -225.496,
y: 391.439,
width: 100,
height: 100,
angle: 0
}, {
x: -15.496,
y: 496.439,
width: 100,
height: 100,
angle: 0
}, {
x: 194.504,
y: 391.439,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: [ {
x: -120.496,
y: 286.439,
width: 210,
height: 10,
angle: 90
} ]
} ],
bullets: [ {
basic: {
x: -120.496,
y: 601.439,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 89.504,
y: -28.561,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 89.504,
y: 76.439,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: -120.496,
y: 181.439,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: "pathWay01"
}
} ]
},
17: {
fillNodes: [ {
x: -148.358,
y: -19.662,
width: 0,
height: 0,
angle: 0
}, {
x: -153.154,
y: 142.211,
width: 0,
height: 0,
angle: 0
}, {
x: -258.671,
y: 141.012,
width: 0,
height: 0,
angle: 0
}, {
x: -258.671,
y: 248.927,
width: 0,
height: 0,
angle: 0
}, {
x: -360.591,
y: 245.33,
width: 0,
height: 0,
angle: 0
}, {
x: -360.591,
y: 370.094,
width: 0,
height: 0,
angle: 0
}, {
x: -261.316,
y: 364.728,
width: 0,
height: 0,
angle: 0
}, {
x: -257.291,
y: 473.393,
width: 0,
height: 0,
angle: 0
}, {
x: -33.252,
y: 472.051,
width: 0,
height: 0,
angle: 0
}, {
x: -30.569,
y: 367.41,
width: 0,
height: 0,
angle: 0
}, {
x: 280.67,
y: 367.41,
width: 0,
height: 0,
angle: 0
}, {
x: 284.695,
y: 209.107,
width: 0,
height: 0,
angle: 0
}, {
x: 387.994,
y: 209.107,
width: 0,
height: 0,
angle: 0
}, {
x: 390.677,
y: 87.026,
width: 0,
height: 0,
angle: 0
}, {
x: 282.012,
y: 87.026,
width: 0,
height: 0,
angle: 0
}, {
x: 282.012,
y: 32.023,
width: 0,
height: 0,
angle: 0
}, {
x: 176.03,
y: 32.023,
width: 0,
height: 0,
angle: 0
}, {
x: 178.713,
y: -22.98,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -361.292,
y: 307.346,
width: 110,
height: 10,
angle: 90
}, {
x: -308.792,
y: 367.346,
width: 115,
height: 10,
angle: 0
}, {
x: -308.792,
y: 247.346,
width: 115,
height: 10,
angle: 0
}, {
x: -256.292,
y: 199.846,
width: 105,
height: 10,
angle: 90
}, {
x: -203.792,
y: 142.346,
width: 115,
height: 10,
angle: 0
}, {
x: -151.292,
y: 64.846,
width: 165,
height: 10,
angle: 90
}, {
x: -256.292,
y: 414.846,
width: 105,
height: 10,
angle: 90
}, {
x: -31.292,
y: 419.846,
width: 115,
height: 10,
angle: 90
}, {
x: 283.708,
y: 287.346,
width: 170,
height: 10,
angle: 90
}, {
x: 331.208,
y: 207.346,
width: 105,
height: 10,
angle: 0
}, {
x: 336.208,
y: 87.346,
width: 115,
height: 10,
angle: 0
}, {
x: 283.708,
y: 64.846,
width: 55,
height: 10,
angle: 90
}, {
x: 178.708,
y: 9.846,
width: 55,
height: 10,
angle: 90
}, {
x: 231.208,
y: 32.346,
width: 115,
height: 10,
angle: 0
}, {
x: 388.708,
y: 152.346,
width: 120,
height: 10,
angle: 90
}, {
x: 121.208,
y: 367.346,
width: 315,
height: 10,
angle: 0
}, {
x: 13.708,
y: -22.654,
width: 340,
height: 10,
angle: 0
}, {
x: -148.792,
y: 472.346,
width: 225,
height: 10,
angle: 0
} ],
targets: [ {
x: -301.292,
y: 307.346,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: [ {
x: 66.208,
y: 307.346,
width: 105,
height: 10,
angle: 0
}, {
x: 13.708,
y: 254.846,
width: 105,
height: 10,
angle: 90
}, {
x: -38.792,
y: 202.346,
width: 105,
height: 10,
angle: 0
} ]
} ],
bullets: [ {
basic: {
x: -196.292,
y: 202.346,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: -91.292,
y: 202.346,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: "pathWay01"
}
}, {
basic: {
x: 149.958,
y: 226.096,
width: 47.5,
height: 47.5,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: ""
}
} ]
},
18: {
fillNodes: [ {
x: -173.315,
y: -8.753,
width: 0,
height: 0,
angle: 0
}, {
x: -173.315,
y: 110.292,
width: 0,
height: 0,
angle: 0
}, {
x: -70.026,
y: 106.791,
width: 0,
height: 0,
angle: 0
}, {
x: -70.026,
y: 199.576,
width: 0,
height: 0,
angle: 0
}, {
x: -385.145,
y: 201.327,
width: 0,
height: 0,
angle: 0
}, {
x: -386.896,
y: 322.123,
width: 0,
height: 0,
angle: 0
}, {
x: -280.106,
y: 318.622,
width: 0,
height: 0,
angle: 0
}, {
x: -283.607,
y: 423.661,
width: 0,
height: 0,
angle: 0
}, {
x: -161.061,
y: 425.412,
width: 0,
height: 0,
angle: 0
}, {
x: -162.812,
y: 322.123,
width: 0,
height: 0,
angle: 0
}, {
x: -66.526,
y: 318.622,
width: 0,
height: 0,
angle: 0
}, {
x: -66.526,
y: 532.203,
width: 0,
height: 0,
angle: 0
}, {
x: 47.267,
y: 532.203,
width: 0,
height: 0,
angle: 0
}, {
x: 49.018,
y: 428.914,
width: 0,
height: 0,
angle: 0
}, {
x: 155.808,
y: 425.413,
width: 0,
height: 0,
angle: 0
}, {
x: 155.808,
y: 217.084,
width: 0,
height: 0,
angle: 0
}, {
x: 364.137,
y: 215.333,
width: 0,
height: 0,
angle: 0
}, {
x: 365.888,
y: 92.787,
width: 0,
height: 0,
angle: 0
}, {
x: 154.058,
y: 92.787,
width: 0,
height: 0,
angle: 0
}, {
x: 154.058,
y: -10.502,
width: 0,
height: 0,
angle: 0
}, {
x: -175.066,
y: -10.502,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -385.938,
y: 263.611,
width: 120,
height: 10,
angle: 90
}, {
x: -333.438,
y: 318.611,
width: 115,
height: 10,
angle: 0
}, {
x: -228.438,
y: 198.611,
width: 325,
height: 10,
angle: 0
}, {
x: -280.938,
y: 366.111,
width: 105,
height: 10,
angle: 90
}, {
x: -225.938,
y: 423.611,
width: 120,
height: 10,
angle: 0
}, {
x: -15.938,
y: 528.611,
width: 120,
height: 10,
angle: 0
}, {
x: 49.062,
y: 476.111,
width: 115,
height: 10,
angle: 90
}, {
x: 96.562,
y: 423.611,
width: 105,
height: 10,
angle: 0
}, {
x: 154.062,
y: 318.611,
width: 220,
height: 10,
angle: 90
}, {
x: 254.062,
y: 213.611,
width: 210,
height: 10,
angle: 0
}, {
x: 259.062,
y: 93.611,
width: 220,
height: 10,
angle: 0
}, {
x: 154.062,
y: 46.111,
width: 105,
height: 10,
angle: 90
}, {
x: -175.938,
y: 43.611,
width: 120,
height: 10,
angle: 90
}, {
x: -123.438,
y: 108.611,
width: 115,
height: 10,
angle: 0
}, {
x: -70.938,
y: 153.611,
width: 100,
height: 10,
angle: 90
}, {
x: -5.938,
y: -11.389,
width: 330,
height: 10,
angle: 0
}, {
x: 364.062,
y: 158.611,
width: 120,
height: 10,
angle: 90
}, {
x: -115.938,
y: 318.611,
width: 100,
height: 10,
angle: 0
}, {
x: -70.938,
y: 418.611,
width: 210,
height: 10,
angle: 90
}, {
x: -160.938,
y: 371.111,
width: 115,
height: 10,
angle: 90
} ],
targets: [ {
x: -220.938,
y: 363.611,
width: 100,
height: 100,
angle: 0
}, {
x: -10.938,
y: 468.611,
width: 100,
height: 100,
angle: 0
}, {
x: 304.062,
y: 153.611,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: [ {
x: 146.562,
y: 153.611,
width: 105,
height: 10,
angle: 0
}, {
x: 94.062,
y: 101.111,
width: 105,
height: 10,
angle: 90
} ]
}, {
name: "pathWay02",
children: [ {
x: -10.938,
y: 311.111,
width: 105,
height: 10,
angle: 90
}, {
x: -63.438,
y: 258.611,
width: 105,
height: 10,
angle: 0
} ]
} ],
bullets: [ {
basic: {
x: -115.938,
y: 48.611,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: -10.938,
y: 153.611,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 94.062,
y: 363.611,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 199.062,
y: 153.611,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: "pathWay01"
}
}, {
basic: {
x: -10.938,
y: 363.611,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: "pathWay02"
}
} ]
},
19: {
fillNodes: [ {
x: -152.523,
y: -16.947,
width: 0,
height: 0,
angle: 0
}, {
x: -152.523,
y: 297.986,
width: 0,
height: 0,
angle: 0
}, {
x: -245.732,
y: 297.986,
width: 0,
height: 0,
angle: 0
}, {
x: -245.732,
y: 193.479,
width: 0,
height: 0,
angle: 0
}, {
x: -362.949,
y: 192.067,
width: 0,
height: 0,
angle: 0
}, {
x: -362.949,
y: 418.028,
width: 0,
height: 0,
angle: 0
}, {
x: -46.604,
y: 418.028,
width: 0,
height: 0,
angle: 0
}, {
x: -48.016,
y: 523.947,
width: 0,
height: 0,
angle: 0
}, {
x: 70.613,
y: 525.359,
width: 0,
height: 0,
angle: 0
}, {
x: 73.438,
y: 419.44,
width: 0,
height: 0,
angle: 0
}, {
x: 388.371,
y: 419.44,
width: 0,
height: 0,
angle: 0
}, {
x: 388.371,
y: 297.986,
width: 0,
height: 0,
angle: 0
}, {
x: 176.533,
y: 299.398,
width: 0,
height: 0,
angle: 0
}, {
x: 176.533,
y: 207.601,
width: 0,
height: 0,
angle: 0
}, {
x: 279.628,
y: 210.426,
width: 0,
height: 0,
angle: 0
}, {
x: 282.453,
y: 87.56,
width: 0,
height: 0,
angle: 0
}, {
x: 176.534,
y: 88.972,
width: 0,
height: 0,
angle: 0
}, {
x: 175.122,
y: -16.947,
width: 0,
height: 0,
angle: 0
}, {
x: 56.493,
y: -19.772,
width: 0,
height: 0,
angle: 0
}, {
x: 55.081,
y: 87.559,
width: 0,
height: 0,
angle: 0
}, {
x: -33.891,
y: 86.147,
width: 0,
height: 0,
angle: 0
}, {
x: -33.891,
y: -18.36,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -362.312,
y: 304.684,
width: 215,
height: 10,
angle: 90
}, {
x: -204.812,
y: 417.184,
width: 325,
height: 10,
angle: 0
}, {
x: -47.312,
y: 464.684,
width: 105,
height: 10,
angle: 90
}, {
x: 7.688,
y: 522.184,
width: 120,
height: 10,
angle: 0
}, {
x: 72.688,
y: 469.684,
width: 115,
height: 10,
angle: 90
}, {
x: 225.188,
y: 417.184,
width: 315,
height: 10,
angle: 0
}, {
x: 387.688,
y: 362.184,
width: 120,
height: 10,
angle: 90
}, {
x: 282.688,
y: 297.184,
width: 220,
height: 10,
angle: 0
}, {
x: 177.688,
y: 252.184,
width: 100,
height: 10,
angle: 90
}, {
x: 225.188,
y: 207.184,
width: 105,
height: 10,
angle: 0
}, {
x: 230.188,
y: 87.184,
width: 115,
height: 10,
angle: 0
}, {
x: 177.688,
y: 39.684,
width: 105,
height: 10,
angle: 90
}, {
x: 122.688,
y: -17.816,
width: 120,
height: 10,
angle: 0
}, {
x: 57.688,
y: 34.684,
width: 115,
height: 10,
angle: 90
}, {
x: 12.688,
y: 87.184,
width: 100,
height: 10,
angle: 0
}, {
x: -197.312,
y: 297.184,
width: 100,
height: 10,
angle: 0
}, {
x: -242.312,
y: 249.684,
width: 105,
height: 10,
angle: 90
}, {
x: -302.312,
y: 192.184,
width: 130,
height: 10,
angle: 0
}, {
x: -32.312,
y: 39.684,
width: 105,
height: 10,
angle: 90
}, {
x: -87.312,
y: -17.816,
width: 120,
height: 10,
angle: 0
}, {
x: -152.312,
y: 139.684,
width: 325,
height: 10,
angle: 90
}, {
x: 282.688,
y: 152.184,
width: 120,
height: 10,
angle: 90
} ],
targets: [ {
x: -302.312,
y: 252.184,
width: 100,
height: 100,
angle: 0
}, {
x: 12.688,
y: 462.184,
width: 100,
height: 100,
angle: 0
}, {
x: 222.688,
y: 147.184,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: [ {
x: 12.688,
y: 357.184,
width: 420,
height: 10,
angle: 0
} ]
}, {
name: "pathWay02",
children: []
} ],
bullets: [ {
basic: {
x: -302.312,
y: 357.184,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 327.688,
y: 357.184,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: -92.312,
y: 42.184,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: -197.312,
y: 357.184,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: "pathWay01"
}
}, {
basic: {
x: 12.688,
y: 252.184,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: ""
}
} ]
},
20: {
fillNodes: [ {
x: -45.85,
y: -112.716,
width: 0,
height: 0,
angle: 0
}, {
x: -45.85,
y: 205.161,
width: 0,
height: 0,
angle: 0
}, {
x: -151.055,
y: 207.423,
width: 0,
height: 0,
angle: 0
}, {
x: -151.055,
y: 312.628,
width: 0,
height: 0,
angle: 0
}, {
x: -255.129,
y: 312.628,
width: 0,
height: 0,
angle: 0
}, {
x: -255.129,
y: 431.408,
width: 0,
height: 0,
angle: 0
}, {
x: -148.793,
y: 433.67,
width: 0,
height: 0,
angle: 0
}, {
x: -148.793,
y: 536.612,
width: 0,
height: 0,
angle: 0
}, {
x: -31.144,
y: 536.612,
width: 0,
height: 0,
angle: 0
}, {
x: -28.882,
y: 434.801,
width: 0,
height: 0,
angle: 0
}, {
x: 75.192,
y: 432.539,
width: 0,
height: 0,
angle: 0
}, {
x: 74.061,
y: 328.465,
width: 0,
height: 0,
angle: 0
}, {
x: 180.397,
y: 326.203,
width: 0,
height: 0,
angle: 0
}, {
x: 179.266,
y: 119.187,
width: 0,
height: 0,
angle: 0
}, {
x: 282.208,
y: 115.793,
width: 0,
height: 0,
angle: 0
}, {
x: 285.602,
y: -1.856,
width: 0,
height: 0,
angle: 0
}, {
x: 178.135,
y: -7.512,
width: 0,
height: 0,
angle: 0
}, {
x: 180.397,
y: -107.061,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -255.556,
y: 371.284,
width: 110,
height: 10,
angle: 90
}, {
x: -93.056,
y: 206.284,
width: 105,
height: 10,
angle: 0
}, {
x: -150.556,
y: 258.784,
width: 115,
height: 10,
angle: 90
}, {
x: -203.056,
y: 431.284,
width: 115,
height: 10,
angle: 0
}, {
x: -203.056,
y: 311.284,
width: 115,
height: 10,
angle: 0
}, {
x: -150.556,
y: 478.784,
width: 105,
height: 10,
angle: 90
}, {
x: -95.556,
y: 536.284,
width: 120,
height: 10,
angle: 0
}, {
x: -30.556,
y: 483.784,
width: 115,
height: 10,
angle: 90
}, {
x: 16.944,
y: 431.284,
width: 105,
height: 10,
angle: 0
}, {
x: 74.444,
y: 378.784,
width: 115,
height: 10,
angle: 90
}, {
x: 121.944,
y: 326.284,
width: 105,
height: 10,
angle: 0
}, {
x: 226.944,
y: 116.284,
width: 105,
height: 10,
angle: 0
}, {
x: 231.944,
y: -3.716,
width: 115,
height: 10,
angle: 0
}, {
x: 179.444,
y: -51.216,
width: 105,
height: 10,
angle: 90
}, {
x: 71.944,
y: -108.716,
width: 225,
height: 10,
angle: 0
}, {
x: -45.556,
y: 48.784,
width: 325,
height: 10,
angle: 90
}, {
x: 284.444,
y: 61.284,
width: 120,
height: 10,
angle: 90
}, {
x: 179.444,
y: 221.284,
width: 220,
height: 10,
angle: 90
} ],
targets: [ {
x: -90.556,
y: 476.284,
width: 100,
height: 100,
angle: 0
}, {
x: 224.444,
y: 56.284,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: [ {
x: 119.444,
y: 213.784,
width: 105,
height: 10,
angle: 90
} ]
}, {
name: "pathWay02",
children: []
} ],
bullets: [ {
basic: {
x: 14.444,
y: -48.716,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 119.444,
y: 56.284,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 119.444,
y: 266.284,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: "pathWay01"
}
} ]
},
21: {
fillNodes: [ {
x: -128.307,
y: -54.391,
width: 0,
height: 0,
angle: 0
}, {
x: -129.702,
y: 153.411,
width: 0,
height: 0,
angle: 0
}, {
x: -232.906,
y: 154.806,
width: 0,
height: 0,
angle: 0
}, {
x: -235.695,
y: 276.14,
width: 0,
height: 0,
angle: 0
}, {
x: -131.097,
y: 273.351,
width: 0,
height: 0,
angle: 0
}, {
x: -129.702,
y: 365.398,
width: 0,
height: 0,
angle: 0
}, {
x: -232.906,
y: 366.793,
width: 0,
height: 0,
angle: 0
}, {
x: -235.695,
y: 485.338,
width: 0,
height: 0,
angle: 0
}, {
x: -23.709,
y: 485.338,
width: 0,
height: 0,
angle: 0
}, {
x: -25.104,
y: 589.936,
width: 0,
height: 0,
angle: 0
}, {
x: 93.441,
y: 588.541,
width: 0,
height: 0,
angle: 0
}, {
x: 96.23,
y: 483.943,
width: 0,
height: 0,
angle: 0
}, {
x: 198.039,
y: 483.943,
width: 0,
height: 0,
angle: 0
}, {
x: 202.223,
y: 362.609,
width: 0,
height: 0,
angle: 0
}, {
x: 93.441,
y: 359.82,
width: 0,
height: 0,
angle: 0
}, {
x: 97.625,
y: 171.543,
width: 0,
height: 0,
angle: 0
}, {
x: 308.217,
y: 170.148,
width: 0,
height: 0,
angle: 0
}, {
x: 308.217,
y: 46.024,
width: 0,
height: 0,
angle: 0
}, {
x: -8.368,
y: 48.813,
width: 0,
height: 0,
angle: 0
}, {
x: -9.763,
y: -55.785,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -233.664,
y: 424.043,
width: 110,
height: 10,
angle: 90
}, {
x: -181.164,
y: 364.043,
width: 115,
height: 10,
angle: 0
}, {
x: -128.664,
y: 484.043,
width: 220,
height: 10,
angle: 0
}, {
x: -23.664,
y: 531.543,
width: 105,
height: 10,
angle: 90
}, {
x: 31.336,
y: 589.043,
width: 120,
height: 10,
angle: 0
}, {
x: 96.336,
y: 536.543,
width: 115,
height: 10,
angle: 90
}, {
x: 143.836,
y: 484.043,
width: 105,
height: 10,
angle: 0
}, {
x: 148.836,
y: 364.043,
width: 115,
height: 10,
angle: 0
}, {
x: 96.336,
y: 266.543,
width: 205,
height: 10,
angle: 90
}, {
x: 196.336,
y: 169.043,
width: 210,
height: 10,
angle: 0
}, {
x: 306.336,
y: 114.043,
width: 120,
height: 10,
angle: 90
}, {
x: -8.664,
y: 1.543,
width: 105,
height: 10,
angle: 90
}, {
x: -63.664,
y: -55.957,
width: 120,
height: 10,
angle: 0
}, {
x: -128.664,
y: 49.043,
width: 220,
height: 10,
angle: 90
}, {
x: -176.164,
y: 154.043,
width: 105,
height: 10,
angle: 0
}, {
x: -233.664,
y: 209.043,
width: 120,
height: 10,
angle: 90
}, {
x: -181.164,
y: 274.043,
width: 115,
height: 10,
angle: 0
}, {
x: -128.664,
y: 319.043,
width: 100,
height: 10,
angle: 90
}, {
x: 148.836,
y: 49.043,
width: 325,
height: 10,
angle: 0
}, {
x: 201.336,
y: 429.043,
width: 120,
height: 10,
angle: 90
} ],
targets: [ {
x: -173.664,
y: 214.043,
width: 100,
height: 100,
angle: 0
}, {
x: 141.336,
y: 424.043,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: [ {
x: 36.336,
y: 266.543,
width: 315,
height: 10,
angle: 90
}, {
x: -68.664,
y: 266.543,
width: 315,
height: 10,
angle: 90
}, {
x: -16.164,
y: 109.043,
width: 105,
height: 10,
angle: 0
}, {
x: -16.164,
y: 424.043,
width: 105,
height: 10,
angle: 0
} ]
}, {
name: "pathWay02",
children: []
} ],
bullets: [ {
basic: {
x: 246.336,
y: 109.043,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 141.336,
y: 109.043,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 36.336,
y: 424.043,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: "pathWay01"
}
} ]
},
22: {
fillNodes: [ {
x: -118.583,
y: -116.212,
width: 0,
height: 0,
angle: 0
}, {
x: -122.14,
y: -10.673,
width: 0,
height: 0,
angle: 0
}, {
x: -224.122,
y: -11.859,
width: 0,
height: 0,
angle: 0
}, {
x: -225.308,
y: 215.821,
width: 0,
height: 0,
angle: 0
}, {
x: -120.955,
y: 211.078,
width: 0,
height: 0,
angle: 0
}, {
x: -120.955,
y: 303.573,
width: 0,
height: 0,
angle: 0
}, {
x: -225.308,
y: 305.945,
width: 0,
height: 0,
angle: 0
}, {
x: -227.68,
y: 528.881,
width: 0,
height: 0,
angle: 0
}, {
x: -104.353,
y: 531.253,
width: 0,
height: 0,
angle: 0
}, {
x: -101.981,
y: 425.714,
width: 0,
height: 0,
angle: 0
}, {
x: -11.858,
y: 424.528,
width: 0,
height: 0,
angle: 0
}, {
x: -13.044,
y: 528.881,
width: 0,
height: 0,
angle: 0
}, {
x: 107.911,
y: 528.881,
width: 0,
height: 0,
angle: 0
}, {
x: 106.725,
y: 424.528,
width: 0,
height: 0,
angle: 0
}, {
x: 316.617,
y: 423.342,
width: 0,
height: 0,
angle: 0
}, {
x: 316.617,
y: 304.759,
width: 0,
height: 0,
angle: 0
}, {
x: 3.557,
y: 303.573,
width: 0,
height: 0,
angle: 0
}, {
x: 1.185,
y: 214.636,
width: 0,
height: 0,
angle: 0
}, {
x: 105.538,
y: 212.264,
width: 0,
height: 0,
angle: 0
}, {
x: 103.166,
y: 2.372,
width: 0,
height: 0,
angle: 0
}, {
x: 209.891,
y: 2.372,
width: 0,
height: 0,
angle: 0
}, {
x: 212.263,
y: -116.211,
width: 0,
height: 0,
angle: 0
}, {
x: -119.77,
y: -118.583,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -223.616,
y: 415.765,
width: 215,
height: 10,
angle: 90
}, {
x: -168.616,
y: 528.265,
width: 120,
height: 10,
angle: 0
}, {
x: -103.616,
y: 475.765,
width: 115,
height: 10,
angle: 90
}, {
x: -58.616,
y: 423.265,
width: 100,
height: 10,
angle: 0
}, {
x: -13.616,
y: 470.765,
width: 105,
height: 10,
angle: 90
}, {
x: 41.384,
y: 528.265,
width: 120,
height: 10,
angle: 0
}, {
x: 106.384,
y: 475.765,
width: 115,
height: 10,
angle: 90
}, {
x: 206.384,
y: 423.265,
width: 210,
height: 10,
angle: 0
}, {
x: 316.384,
y: 368.265,
width: 120,
height: 10,
angle: 90
}, {
x: 1.384,
y: 258.265,
width: 100,
height: 10,
angle: 90
}, {
x: 48.884,
y: 213.265,
width: 105,
height: 10,
angle: 0
}, {
x: 153.884,
y: 3.265,
width: 105,
height: 10,
angle: 0
}, {
x: 211.384,
y: -51.735,
width: 120,
height: 10,
angle: 90
}, {
x: -118.616,
y: -64.235,
width: 115,
height: 10,
angle: 90
}, {
x: -166.116,
y: -11.735,
width: 105,
height: 10,
angle: 0
}, {
x: -223.616,
y: 95.765,
width: 225,
height: 10,
angle: 90
}, {
x: -171.116,
y: 213.265,
width: 115,
height: 10,
angle: 0
}, {
x: -171.116,
y: 303.265,
width: 115,
height: 10,
angle: 0
}, {
x: -118.616,
y: 258.265,
width: 100,
height: 10,
angle: 90
}, {
x: 51.384,
y: -116.735,
width: 330,
height: 10,
angle: 0
}, {
x: 106.384,
y: 108.265,
width: 220,
height: 10,
angle: 90
}, {
x: 158.884,
y: 303.265,
width: 325,
height: 10,
angle: 0
} ],
targets: [ {
x: -163.616,
y: 468.265,
width: 100,
height: 100,
angle: 0
}, {
x: 46.384,
y: 468.265,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: [ {
x: -58.616,
y: 48.265,
width: 210,
height: 10,
angle: 0
}, {
x: -58.616,
y: 153.265,
width: 420,
height: 10,
angle: 90
} ]
}, {
name: "pathWay02",
children: []
} ],
bullets: [ {
basic: {
x: 256.384,
y: 363.265,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: -163.616,
y: 153.265,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 46.384,
y: 46.384,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: "pathWay01"
}
} ]
},
23: {
fillNodes: [ {
x: -95.749,
y: -72.384,
width: 0,
height: 0,
angle: 0
}, {
x: -96.961,
y: 34.268,
width: 0,
height: 0,
angle: 0
}, {
x: -199.977,
y: 33.056,
width: 0,
height: 0,
angle: 0
}, {
x: -201.189,
y: 154.252,
width: 0,
height: 0,
angle: 0
}, {
x: -98.173,
y: 154.252,
width: 0,
height: 0,
angle: 0
}, {
x: -98.173,
y: 193.035,
width: 0,
height: 0,
angle: 0
}, {
x: -146.937,
y: 191.557,
width: 0,
height: 0,
angle: 0
}, {
x: -147.676,
y: 258.792,
width: 0,
height: 0,
angle: 0
}, {
x: -95.957,
y: 258.792,
width: 0,
height: 0,
angle: 0
}, {
x: -93.74,
y: 362.969,
width: 0,
height: 0,
angle: 0
}, {
x: 22.997,
y: 365.186,
width: 0,
height: 0,
angle: 0
}, {
x: 25.952,
y: 294.996,
width: 0,
height: 0,
angle: 0
}, {
x: -26.506,
y: 297.213,
width: 0,
height: 0,
angle: 0
}, {
x: -26.506,
y: 258.793,
width: 0,
height: 0,
angle: 0
}, {
x: 115.352,
y: 258.054,
width: 0,
height: 0,
angle: 0
}, {
x: 114.613,
y: 309.773,
width: 0,
height: 0,
angle: 0
}, {
x: 181.109,
y: 311.251,
width: 0,
height: 0,
angle: 0
}, {
x: 183.326,
y: -2.757,
width: 0,
height: 0,
angle: 0
}, {
x: 235.045,
y: -4.235,
width: 0,
height: 0,
angle: 0
}, {
x: 235.045,
y: -69.253,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -199.745,
y: 94.586,
width: 110,
height: 10,
angle: 90
}, {
x: -147.245,
y: 34.586,
width: 115,
height: 10,
angle: 0
}, {
x: -94.745,
y: -12.914,
width: 105,
height: 10,
angle: 90
}, {
x: 235.255,
y: -41.664,
width: 67.5,
height: 10,
angle: 90
}, {
x: 209.005,
y: -2.914,
width: 62.5,
height: 10,
angle: 0
}, {
x: 182.755,
y: 154.586,
width: 325,
height: 10,
angle: 90
}, {
x: 65.255,
y: -70.414,
width: 330,
height: 10,
angle: 0
}, {
x: -147.245,
y: 154.586,
width: 115,
height: 10,
angle: 0
}, {
x: -94.745,
y: 173.336,
width: 47.5,
height: 10,
angle: 90
}, {
x: -115.995,
y: 192.086,
width: 52.5,
height: 10,
angle: 0
}, {
x: -147.245,
y: 220.836,
width: 67.5,
height: 10,
angle: 90
}, {
x: -120.995,
y: 259.586,
width: 62.5,
height: 10,
angle: 0
}, {
x: -94.745,
y: 307.086,
width: 105,
height: 10,
angle: 90
}, {
x: -39.745,
y: 364.586,
width: 120,
height: 10,
angle: 0
}, {
x: 25.255,
y: 335.836,
width: 67.5,
height: 10,
angle: 90
}, {
x: -.995,
y: 297.086,
width: 62.5,
height: 10,
angle: 0
}, {
x: -27.245,
y: 278.336,
width: 47.5,
height: 10,
angle: 90
}, {
x: 44.005,
y: 259.586,
width: 152.5,
height: 10,
angle: 0
}, {
x: 115.255,
y: 280.836,
width: 52.5,
height: 10,
angle: 90
}, {
x: 144.005,
y: 312.086,
width: 67.5,
height: 10,
angle: 0
} ],
targets: [ {
x: -139.745,
y: 94.586,
width: 100,
height: 100,
angle: 0
}, {
x: 201.505,
y: -36.664,
width: 47.5,
height: 47.5,
angle: 0
}, {
x: 149.005,
y: 278.336,
width: 47.5,
height: 47.5,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: []
} ],
bullets: [ {
basic: {
x: 70.255,
y: 199.586,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 70.255,
y: 15.836,
width: 100,
height: 47.5,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: ""
}
}, {
basic: {
x: 96.505,
y: 68.336,
width: 47.5,
height: 152.5,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: ""
}
}, {
basic: {
x: 149.005,
y: 225.836,
width: 47.5,
height: 47.5,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 149.005,
y: 173.336,
width: 47.5,
height: 47.5,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
} ]
},
24: {
fillNodes: [ {
x: -139.743,
y: -2.598,
width: 0,
height: 0,
angle: 0
}, {
x: -139.743,
y: 312.888,
width: 0,
height: 0,
angle: 0
}, {
x: -296.972,
y: 311.86,
width: 0,
height: 0,
angle: 0
}, {
x: -299.027,
y: 380.712,
width: 0,
height: 0,
angle: 0
}, {
x: -246.617,
y: 381.74,
width: 0,
height: 0,
angle: 0
}, {
x: -247.645,
y: 434.15,
width: 0,
height: 0,
angle: 0
}, {
x: 14.404,
y: 433.122,
width: 0,
height: 0,
angle: 0
}, {
x: 17.487,
y: 485.532,
width: 0,
height: 0,
angle: 0
}, {
x: 136.694,
y: 485.532,
width: 0,
height: 0,
angle: 0
}, {
x: 136.694,
y: 433.122,
width: 0,
height: 0,
angle: 0
}, {
x: 190.131,
y: 433.122,
width: 0,
height: 0,
angle: 0
}, {
x: 190.131,
y: 365.298,
width: 0,
height: 0,
angle: 0
}, {
x: 136.694,
y: 364.27,
width: 0,
height: 0,
angle: 0
}, {
x: 138.749,
y: 275.893,
width: 0,
height: 0,
angle: 0
}, {
x: 241.513,
y: 276.921,
width: 0,
height: 0,
angle: 0
}, {
x: 241.513,
y: 156.687,
width: 0,
height: 0,
angle: 0
}, {
x: 135.666,
y: 154.632,
width: 0,
height: 0,
angle: 0
}, {
x: 136.694,
y: 103.25,
width: 0,
height: 0,
angle: 0
}, {
x: 85.312,
y: 103.25,
width: 0,
height: 0,
angle: 0
}, {
x: 85.312,
y: -3.625,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -297.079,
y: 348.54,
width: 57.5,
height: 10,
angle: 90
}, {
x: -218.329,
y: 314.79,
width: 167.5,
height: 10,
angle: 0
}, {
x: -139.579,
y: 162.29,
width: 315,
height: 10,
angle: 90
}, {
x: -32.079,
y: -.21,
width: 225,
height: 10,
angle: 0
}, {
x: 85.421,
y: 52.29,
width: 115,
height: 10,
angle: 90
}, {
x: 106.671,
y: 104.79,
width: 52.5,
height: 10,
angle: 0
}, {
x: 137.921,
y: 131.04,
width: 62.5,
height: 10,
angle: 90
}, {
x: 185.421,
y: 157.29,
width: 105,
height: 10,
angle: 0
}, {
x: 242.921,
y: 212.29,
width: 120,
height: 10,
angle: 90
}, {
x: 190.421,
y: 277.29,
width: 115,
height: 10,
angle: 0
}, {
x: 137.921,
y: 322.29,
width: 100,
height: 10,
angle: 90
}, {
x: 159.171,
y: 367.29,
width: 52.5,
height: 10,
angle: 0
}, {
x: 190.421,
y: 396.04,
width: 67.5,
height: 10,
angle: 90
}, {
x: 164.171,
y: 434.79,
width: 62.5,
height: 10,
angle: 0
}, {
x: 137.921,
y: 456.04,
width: 52.5,
height: 10,
angle: 90
}, {
x: 82.921,
y: 487.29,
width: 120,
height: 10,
angle: 0
}, {
x: 17.921,
y: 461.04,
width: 62.5,
height: 10,
angle: 90
}, {
x: -113.329,
y: 434.79,
width: 272.5,
height: 10,
angle: 0
}, {
x: -270.829,
y: 382.29,
width: 62.5,
height: 10,
angle: 0
}, {
x: -244.579,
y: 403.54,
width: 52.5,
height: 10,
angle: 90
} ],
targets: [ {
x: 182.921,
y: 217.29,
width: 100,
height: 100,
angle: 0
}, {
x: 156.921,
y: 401.29,
width: 47.5,
height: 47.5,
angle: 0
}, {
x: -53.329,
y: 296.04,
width: 47.5,
height: 47.5,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: []
} ],
bullets: [ {
basic: {
x: 77.921,
y: 164.79,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: -27.079,
y: 164.79,
width: 100,
height: 205,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: ""
}
}, {
basic: {
x: -.829,
y: 293.54,
width: 47.5,
height: 52.5,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: ""
}
}, {
basic: {
x: 51.421,
y: 453.79,
width: 47.5,
height: 47.5,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 104.421,
y: 453.79,
width: 47.5,
height: 47.5,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
} ]
},
25: {
fillNodes: [ {
x: -179.903,
y: -34.363,
width: 0,
height: 0,
angle: 0
}, {
x: -179.903,
y: 69.663,
width: 0,
height: 0,
angle: 0
}, {
x: -285.874,
y: 70.635,
width: 0,
height: 0,
angle: 0
}, {
x: -286.846,
y: 186.328,
width: 0,
height: 0,
angle: 0
}, {
x: -183.792,
y: 187.3,
width: 0,
height: 0,
angle: 0
}, {
x: -180.875,
y: 279.66,
width: 0,
height: 0,
angle: 0
}, {
x: -286.846,
y: 279.66,
width: 0,
height: 0,
angle: 0
}, {
x: -284.902,
y: 400.214,
width: 0,
height: 0,
angle: 0
}, {
x: 29.122,
y: 398.27,
width: 0,
height: 0,
angle: 0
}, {
x: 28.15,
y: 505.213,
width: 0,
height: 0,
angle: 0
}, {
x: 148.704,
y: 505.213,
width: 0,
height: 0,
angle: 0
}, {
x: 150.649,
y: 293.272,
width: 0,
height: 0,
angle: 0
}, {
x: 253.703,
y: 295.216,
width: 0,
height: 0,
angle: 0
}, {
x: 255.647,
y: 174.662,
width: 0,
height: 0,
angle: 0
}, {
x: 148.704,
y: 174.662,
width: 0,
height: 0,
angle: 0
}, {
x: 150.648,
y: 68.691,
width: 0,
height: 0,
angle: 0
}, {
x: -61.293,
y: 67.719,
width: 0,
height: 0,
angle: 0
}, {
x: -60.321,
y: -35.335,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -285.436,
y: 130.242,
width: 110,
height: 10,
angle: 90
}, {
x: -232.936,
y: 190.242,
width: 115,
height: 10,
angle: 0
}, {
x: 197.064,
y: 295.242,
width: 105,
height: 10,
angle: 0
}, {
x: 254.564,
y: 240.242,
width: 120,
height: 10,
angle: 90
}, {
x: 202.064,
y: 175.242,
width: 115,
height: 10,
angle: 0
}, {
x: 149.564,
y: 127.742,
width: 105,
height: 10,
angle: 90
}, {
x: -60.436,
y: 22.742,
width: 105,
height: 10,
angle: 90
}, {
x: -115.436,
y: -34.758,
width: 120,
height: 10,
angle: 0
}, {
x: -180.436,
y: 17.742,
width: 115,
height: 10,
angle: 90
}, {
x: -232.936,
y: 70.242,
width: 115,
height: 10,
angle: 0
}, {
x: 44.564,
y: 70.242,
width: 220,
height: 10,
angle: 0
}, {
x: -180.436,
y: 235.242,
width: 100,
height: 10,
angle: 90
}, {
x: 29.564,
y: 447.742,
width: 105,
height: 10,
angle: 90
}, {
x: 84.564,
y: 505.242,
width: 120,
height: 10,
angle: 0
}, {
x: 149.564,
y: 400.242,
width: 220,
height: 10,
angle: 90
}, {
x: -227.936,
y: 280.242,
width: 105,
height: 10,
angle: 0
}, {
x: -285.436,
y: 335.242,
width: 120,
height: 10,
angle: 90
}, {
x: -127.936,
y: 400.242,
width: 325,
height: 10,
angle: 0
} ],
targets: [ {
x: -120.436,
y: 25.242,
width: 100,
height: 100,
angle: 0
}, {
x: -225.436,
y: 340.242,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: [ {
x: 37.064,
y: 235.242,
width: 315,
height: 10,
angle: 0
}, {
x: -15.436,
y: 235.242,
width: 210,
height: 10,
angle: 90
} ]
} ],
bullets: [ {
basic: {
x: -225.436,
y: 130.242,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: -15.436,
y: 235.242,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: "pathWay01"
}
}, {
basic: {
x: 89.564,
y: 445.242,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
} ]
},
26: {
fillNodes: [ {
x: 5.36,
y: 3.063,
width: 0,
height: 0,
angle: 0
}, {
x: -98.779,
y: 5.36,
width: 0,
height: 0,
angle: 0
}, {
x: -100.31,
y: 213.638,
width: 0,
height: 0,
angle: 0
}, {
x: -189.135,
y: 215.935,
width: 0,
height: 0,
angle: 0
}, {
x: -188.369,
y: 110.264,
width: 0,
height: 0,
angle: 0
}, {
x: -310.886,
y: 108.733,
width: 0,
height: 0,
angle: 0
}, {
x: -310.886,
y: 213.638,
width: 0,
height: 0,
angle: 0
}, {
x: -414.259,
y: 214.404,
width: 0,
height: 0,
angle: 0
}, {
x: -413.493,
y: 437.997,
width: 0,
height: 0,
angle: 0
}, {
x: -293.274,
y: 437.231,
width: 0,
height: 0,
angle: 0
}, {
x: -292.508,
y: 336.92,
width: 0,
height: 0,
angle: 0
}, {
x: -98.779,
y: 332.326,
width: 0,
height: 0,
angle: 0
}, {
x: -98.013,
y: 545.199,
width: 0,
height: 0,
angle: 0
}, {
x: 126.346,
y: 544.433,
width: 0,
height: 0,
angle: 0
}, {
x: 126.346,
y: 423.448,
width: 0,
height: 0,
angle: 0
}, {
x: 19.144,
y: 424.214,
width: 0,
height: 0,
angle: 0
}, {
x: 22.206,
y: 333.858,
width: 0,
height: 0,
angle: 0
}, {
x: 126.346,
y: 335.389,
width: 0,
height: 0,
angle: 0
}, {
x: 127.112,
y: 124.813,
width: 0,
height: 0,
angle: 0
}, {
x: 320.076,
y: 123.282,
width: 0,
height: 0,
angle: 0
}, {
x: 320.842,
y: 228.953,
width: 0,
height: 0,
angle: 0
}, {
x: 441.827,
y: 228.187,
width: 0,
height: 0,
angle: 0
}, {
x: 442.593,
y: 4.594,
width: 0,
height: 0,
angle: 0
}, {
x: 335.391,
y: 2.297,
width: 0,
height: 0,
angle: 0
}, {
x: 337.688,
y: -100.311,
width: 0,
height: 0,
angle: 0
}, {
x: 215.171,
y: -103.374,
width: 0,
height: 0,
angle: 0
}, {
x: 215.937,
y: 1.531,
width: 0,
height: 0,
angle: 0
}, {
x: 124.815,
y: 3.828,
width: 0,
height: 0,
angle: 0
}, {
x: 127.878,
y: -102.608,
width: 0,
height: 0,
angle: 0
}, {
x: 6.127,
y: -101.842,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -413.356,
y: 325.812,
width: 215,
height: 10,
angle: 90
}, {
x: -358.356,
y: 438.312,
width: 120,
height: 10,
angle: 0
}, {
x: -293.356,
y: 385.812,
width: 115,
height: 10,
angle: 90
}, {
x: -195.856,
y: 333.312,
width: 205,
height: 10,
angle: 0
}, {
x: -98.356,
y: 433.312,
width: 210,
height: 10,
angle: 90
}, {
x: 9.144,
y: 543.312,
width: 225,
height: 10,
angle: 0
}, {
x: 126.644,
y: 488.312,
width: 120,
height: 10,
angle: 90
}, {
x: 74.144,
y: 423.312,
width: 115,
height: 10,
angle: 0
}, {
x: 21.644,
y: 378.312,
width: 100,
height: 10,
angle: 90
}, {
x: 69.144,
y: 333.312,
width: 105,
height: 10,
angle: 0
}, {
x: 126.644,
y: 228.312,
width: 220,
height: 10,
angle: 90
}, {
x: 224.144,
y: 123.312,
width: 205,
height: 10,
angle: 0
}, {
x: 321.644,
y: 170.812,
width: 105,
height: 10,
angle: 90
}, {
x: 376.644,
y: 228.312,
width: 120,
height: 10,
angle: 0
}, {
x: 441.644,
y: 120.812,
width: 225,
height: 10,
angle: 90
}, {
x: 389.144,
y: 3.312,
width: 115,
height: 10,
angle: 0
}, {
x: 336.644,
y: -44.188,
width: 105,
height: 10,
angle: 90
}, {
x: 281.644,
y: -101.688,
width: 120,
height: 10,
angle: 0
}, {
x: 216.644,
y: -49.188,
width: 115,
height: 10,
angle: 90
}, {
x: 171.644,
y: 3.312,
width: 100,
height: 10,
angle: 0
}, {
x: 126.644,
y: -44.188,
width: 105,
height: 10,
angle: 90
}, {
x: 71.644,
y: -101.688,
width: 120,
height: 10,
angle: 0
}, {
x: 6.644,
y: -49.188,
width: 115,
height: 10,
angle: 90
}, {
x: -40.856,
y: 3.312,
width: 105,
height: 10,
angle: 0
}, {
x: -98.356,
y: 108.312,
width: 220,
height: 10,
angle: 90
}, {
x: -143.356,
y: 213.312,
width: 100,
height: 10,
angle: 0
}, {
x: -188.356,
y: 165.812,
width: 105,
height: 10,
angle: 90
}, {
x: -243.356,
y: 108.312,
width: 120,
height: 10,
angle: 0
}, {
x: -308.356,
y: 160.812,
width: 115,
height: 10,
angle: 90
}, {
x: -360.856,
y: 213.312,
width: 115,
height: 10,
angle: 0
} ],
targets: [ {
x: -353.356,
y: 378.312,
width: 100,
height: 100,
angle: 0
}, {
x: 66.644,
y: 483.312,
width: 100,
height: 100,
angle: 0
}, {
x: 276.644,
y: -41.688,
width: 100,
height: 100,
angle: 0
}, {
x: -248.356,
y: 168.312,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: [ {
x: 66.644,
y: 63.312,
width: 210,
height: 10,
angle: 0
} ]
} ],
bullets: [ {
basic: {
x: 381.644,
y: 63.312,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: -143.356,
y: 273.312,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: -38.356,
y: 273.312,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 171.644,
y: 63.312,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: "pathWay01"
}
}, {
basic: {
x: -38.356,
y: 378.312,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
} ]
},
27: {
fillNodes: [ {
x: -40.19,
y: -57.625,
width: 0,
height: 0,
angle: 0
}, {
x: -40.965,
y: 47.046,
width: 0,
height: 0,
angle: 0
}, {
x: -251.858,
y: 48.597,
width: 0,
height: 0,
angle: 0
}, {
x: -251.858,
y: 153.268,
width: 0,
height: 0,
angle: 0
}, {
x: -355.754,
y: 152.493,
width: 0,
height: 0,
angle: 0
}, {
x: -358.855,
y: 272.671,
width: 0,
height: 0,
angle: 0
}, {
x: -147.186,
y: 272.671,
width: 0,
height: 0,
angle: 0
}, {
x: -143.217,
y: 485.032,
width: 0,
height: 0,
angle: 0
}, {
x: 64.848,
y: 481.445,
width: 0,
height: 0,
angle: 0
}, {
x: 63.951,
y: 588.168,
width: 0,
height: 0,
angle: 0
}, {
x: 287.262,
y: 589.962,
width: 0,
height: 0,
angle: 0
}, {
x: 292.643,
y: 470.684,
width: 0,
height: 0,
angle: 0
}, {
x: 184.127,
y: 468.89,
width: 0,
height: 0,
angle: 0
}, {
x: 185.023,
y: 380.104,
width: 0,
height: 0,
angle: 0
}, {
x: 289.952,
y: 378.31,
width: 0,
height: 0,
angle: 0
}, {
x: 291.746,
y: 275.175,
width: 0,
height: 0,
angle: 0
}, {
x: 393.985,
y: 275.175,
width: 0,
height: 0,
angle: 0
}, {
x: 394.882,
y: 155,
width: 0,
height: 0,
angle: 0
}, {
x: 78.301,
y: 152.31,
width: 0,
height: 0,
angle: 0
}, {
x: 80.751,
y: -59.623,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -354.816,
y: 213.235,
width: 110,
height: 10,
angle: 90
}, {
x: -249.816,
y: 273.235,
width: 220,
height: 10,
angle: 0
}, {
x: -144.816,
y: 373.235,
width: 210,
height: 10,
angle: 90
}, {
x: -39.816,
y: 483.235,
width: 220,
height: 10,
angle: 0
}, {
x: 65.184,
y: 530.735,
width: 105,
height: 10,
angle: 90
}, {
x: 172.684,
y: 588.235,
width: 225,
height: 10,
angle: 0
}, {
x: 290.184,
y: 533.235,
width: 120,
height: 10,
angle: 90
}, {
x: 237.684,
y: 468.235,
width: 115,
height: 10,
angle: 0
}, {
x: 185.184,
y: 423.235,
width: 100,
height: 10,
angle: 90
}, {
x: 232.684,
y: 378.235,
width: 105,
height: 10,
angle: 0
}, {
x: 290.184,
y: 325.735,
width: 115,
height: 10,
angle: 90
}, {
x: 337.684,
y: 273.235,
width: 105,
height: 10,
angle: 0
}, {
x: 395.184,
y: 218.235,
width: 120,
height: 10,
angle: 90
}, {
x: 237.684,
y: 153.235,
width: 325,
height: 10,
angle: 0
}, {
x: 80.184,
y: 53.235,
width: 210,
height: 10,
angle: 90
}, {
x: 25.184,
y: -56.765,
width: 120,
height: 10,
angle: 0
}, {
x: -39.816,
y: -4.265,
width: 115,
height: 10,
angle: 90
}, {
x: -139.816,
y: 48.235,
width: 210,
height: 10,
angle: 0
}, {
x: -249.816,
y: 100.735,
width: 115,
height: 10,
angle: 90
}, {
x: -302.316,
y: 153.235,
width: 115,
height: 10,
angle: 0
} ],
targets: [ {
x: 230.184,
y: 318.235,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: [ {
x: 72.684,
y: 213.235,
width: 105,
height: 10,
angle: 0
}, {
x: 20.184,
y: 160.735,
width: 105,
height: 10,
angle: 90
} ]
} ],
bullets: [ {
basic: {
x: 230.184,
y: 528.235,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 20.184,
y: 318.235,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: ""
}
}, {
basic: {
x: 125.184,
y: 213.235,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: "pathWay01"
}
} ]
},
28: {
fillNodes: [ {
x: -151.339,
y: -119.458,
width: 0,
height: 0,
angle: 0
}, {
x: -154.339,
y: -15.962,
width: 0,
height: 0,
angle: 0
}, {
x: -257.835,
y: -14.462,
width: 0,
height: 0,
angle: 0
}, {
x: -257.835,
y: 104.033,
width: 0,
height: 0,
angle: 0
}, {
x: -152.839,
y: 102.533,
width: 0,
height: 0,
angle: 0
}, {
x: -154.339,
y: 525.516,
width: 0,
height: 0,
angle: 0
}, {
x: -34.344,
y: 522.517,
width: 0,
height: 0,
angle: 0
}, {
x: -31.344,
y: 422.021,
width: 0,
height: 0,
angle: 0
}, {
x: 177.148,
y: 419.021,
width: 0,
height: 0,
angle: 0
}, {
x: 178.648,
y: 212.029,
width: 0,
height: 0,
angle: 0
}, {
x: 282.144,
y: 210.529,
width: 0,
height: 0,
angle: 0
}, {
x: 285.144,
y: 92.034,
width: 0,
height: 0,
angle: 0
}, {
x: 177.148,
y: 90.534,
width: 0,
height: 0,
angle: 0
}, {
x: 178.648,
y: -120.958,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -256.977,
y: 44.24,
width: 110,
height: 10,
angle: 90
}, {
x: -151.977,
y: -68.26,
width: 115,
height: 10,
angle: 90
}, {
x: -204.477,
y: -15.76,
width: 115,
height: 10,
angle: 0
}, {
x: -204.477,
y: 104.24,
width: 115,
height: 10,
angle: 0
}, {
x: -96.977,
y: 524.24,
width: 120,
height: 10,
angle: 0
}, {
x: -31.977,
y: 471.74,
width: 115,
height: 10,
angle: 90
}, {
x: 68.023,
y: 419.24,
width: 210,
height: 10,
angle: 0
}, {
x: 178.023,
y: 314.24,
width: 220,
height: 10,
angle: 90
}, {
x: 225.523,
y: 209.24,
width: 105,
height: 10,
angle: 0
}, {
x: 283.023,
y: 154.24,
width: 120,
height: 10,
angle: 90
}, {
x: 230.523,
y: 89.24,
width: 115,
height: 10,
angle: 0
}, {
x: 178.023,
y: -10.76,
width: 210,
height: 10,
angle: 90
}, {
x: 18.023,
y: -120.76,
width: 330,
height: 10,
angle: 0
}, {
x: -151.977,
y: 309.24,
width: 420,
height: 10,
angle: 90
} ],
targets: [ {
x: -91.977,
y: 464.24,
width: 100,
height: 100,
angle: 0
}, {
x: 223.023,
y: 149.24,
width: 100,
height: 100,
angle: 0
}, {
x: -196.977,
y: 44.24,
width: 100,
height: 100,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: []
} ],
bullets: [ {
basic: {
x: -91.977,
y: 359.24,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: -91.977,
y: 44.24,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 118.023,
y: 44.24,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 12.798,
y: 149.24,
width: 100,
height: 310,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: ""
}
} ]
},
29: {
fillNodes: [ {
x: 15.577,
y: 159.364,
width: 0,
height: 0,
angle: 0
}, {
x: 16.775,
y: 263.61,
width: 0,
height: 0,
angle: 0
}, {
x: -73.092,
y: 267.205,
width: 0,
height: 0,
angle: 0
}, {
x: -73.092,
y: 214.483,
width: 0,
height: 0,
angle: 0
}, {
x: -140.193,
y: 215.681,
width: 0,
height: 0,
angle: 0
}, {
x: -141.391,
y: 264.808,
width: 0,
height: 0,
angle: 0
}, {
x: -244.439,
y: 267.205,
width: 0,
height: 0,
angle: 0
}, {
x: -248.034,
y: 334.306,
width: 0,
height: 0,
angle: 0
}, {
x: -196.51,
y: 331.909,
width: 0,
height: 0,
angle: 0
}, {
x: -196.51,
y: 384.631,
width: 0,
height: 0,
angle: 0
}, {
x: -124.616,
y: 384.631,
width: 0,
height: 0,
angle: 0
}, {
x: -124.616,
y: 335.504,
width: 0,
height: 0,
angle: 0
}, {
x: -39.542,
y: 331.909,
width: 0,
height: 0,
angle: 0
}, {
x: -35.947,
y: 440.948,
width: 0,
height: 0,
angle: 0
}, {
x: 134.202,
y: 438.552,
width: 0,
height: 0,
angle: 0
}, {
x: 134.202,
y: 385.83,
width: 0,
height: 0,
angle: 0
}, {
x: 186.924,
y: 388.226,
width: 0,
height: 0,
angle: 0
}, {
x: 189.321,
y: 336.702,
width: 0,
height: 0,
angle: 0
}, {
x: 239.646,
y: 335.504,
width: 0,
height: 0,
angle: 0
}, {
x: 243.241,
y: 266.007,
width: 0,
height: 0,
angle: 0
}, {
x: 189.321,
y: 264.808,
width: 0,
height: 0,
angle: 0
}, {
x: 191.717,
y: 215.681,
width: 0,
height: 0,
angle: 0
}, {
x: 137.797,
y: 212.086,
width: 0,
height: 0,
angle: 0
}, {
x: 137.797,
y: 164.157,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -246.509,
y: 298.953,
width: 57.5,
height: 10,
angle: 90
}, {
x: -220.259,
y: 332.703,
width: 62.5,
height: 10,
angle: 0
}, {
x: -194.009,
y: 353.953,
width: 52.5,
height: 10,
angle: 90
}, {
x: -165.259,
y: 385.203,
width: 67.5,
height: 10,
angle: 0
}, {
x: -126.509,
y: 358.953,
width: 62.5,
height: 10,
angle: 90
}, {
x: -81.509,
y: 332.703,
width: 100,
height: 10,
angle: 0
}, {
x: -36.509,
y: 380.203,
width: 105,
height: 10,
angle: 90
}, {
x: 44.741,
y: 437.703,
width: 172.5,
height: 10,
angle: 0
}, {
x: 135.991,
y: 411.453,
width: 62.5,
height: 10,
angle: 90
}, {
x: 157.241,
y: 385.203,
width: 52.5,
height: 10,
angle: 0
}, {
x: 188.491,
y: 358.953,
width: 62.5,
height: 10,
angle: 90
}, {
x: 209.741,
y: 332.703,
width: 52.5,
height: 10,
angle: 0
}, {
x: 240.991,
y: 303.953,
width: 67.5,
height: 10,
angle: 90
}, {
x: 214.741,
y: 265.203,
width: 62.5,
height: 10,
angle: 0
}, {
x: 188.491,
y: 243.953,
width: 52.5,
height: 10,
angle: 90
}, {
x: 162.241,
y: 212.703,
width: 62.5,
height: 10,
angle: 0
}, {
x: 135.991,
y: 191.453,
width: 52.5,
height: 10,
angle: 90
}, {
x: 80.991,
y: 160.203,
width: 120,
height: 10,
angle: 0
}, {
x: 15.991,
y: 212.703,
width: 115,
height: 10,
angle: 90
}, {
x: -29.009,
y: 265.203,
width: 100,
height: 10,
angle: 0
}, {
x: -74.009,
y: 243.953,
width: 52.5,
height: 10,
angle: 90
}, {
x: -102.759,
y: 212.703,
width: 67.5,
height: 10,
angle: 0
}, {
x: -141.509,
y: 238.953,
width: 62.5,
height: 10,
angle: 90
}, {
x: -194.009,
y: 265.203,
width: 115,
height: 10,
angle: 0
} ],
targets: [ {
x: 75.991,
y: 220.203,
width: 100,
height: 100,
angle: 0
}, {
x: -160.259,
y: 351.453,
width: 47.5,
height: 47.5,
angle: 0
}, {
x: -107.759,
y: 246.453,
width: 47.5,
height: 47.5,
angle: 0
}, {
x: 207.241,
y: 298.953,
width: 47.5,
height: 47.5,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: []
} ],
bullets: [ {
basic: {
x: 75.991,
y: 272.703,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 102.241,
y: 403.953,
width: 47.5,
height: 47.5,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 154.741,
y: 246.453,
width: 47.5,
height: 47.5,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: 49.741,
y: 193.953,
width: 47.5,
height: 47.5,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
} ]
},
30: {
fillNodes: [ {
x: -57.928,
y: -54.618,
width: 0,
height: 0,
angle: 0
}, {
x: -61.238,
y: 47.997,
width: 0,
height: 0,
angle: 0
}, {
x: -148.958,
y: 47.997,
width: 0,
height: 0,
angle: 0
}, {
x: -150.613,
y: 0,
width: 0,
height: 0,
angle: 0
}, {
x: -321.087,
y: -3.31,
width: 0,
height: 0,
angle: 0
}, {
x: -322.742,
y: 62.893,
width: 0,
height: 0,
angle: 0
}, {
x: -271.434,
y: 62.893,
width: 0,
height: 0,
angle: 0
}, {
x: -271.434,
y: 483.285,
width: 0,
height: 0,
angle: 0
}, {
x: 203.576,
y: 486.595,
width: 0,
height: 0,
angle: 0
}, {
x: 201.921,
y: 590.866,
width: 0,
height: 0,
angle: 0
}, {
x: 322.742,
y: 589.211,
width: 0,
height: 0,
angle: 0
}, {
x: 324.397,
y: 484.941,
width: 0,
height: 0,
angle: 0
}, {
x: 375.705,
y: 484.941,
width: 0,
height: 0,
angle: 0
}, {
x: 377.36,
y: 418.738,
width: 0,
height: 0,
angle: 0
}, {
x: 322.742,
y: 417.082,
width: 0,
height: 0,
angle: 0
}, {
x: 324.397,
y: 364.12,
width: 0,
height: 0,
angle: 0
}, {
x: 269.779,
y: 364.12,
width: 0,
height: 0,
angle: 0
}, {
x: 268.124,
y: 312.812,
width: 0,
height: 0,
angle: 0
}, {
x: 203.576,
y: 311.157,
width: 0,
height: 0,
angle: 0
}, {
x: 201.921,
y: 362.465,
width: 0,
height: 0,
angle: 0
}, {
x: 8.276,
y: 362.465,
width: 0,
height: 0,
angle: 0
}, {
x: 8.276,
y: 221.783,
width: 0,
height: 0,
angle: 0
}, {
x: 57.929,
y: 220.128,
width: 0,
height: 0,
angle: 0
}, {
x: 62.894,
y: -54.616,
width: 0,
height: 0,
angle: 0
} ],
walls: [ {
x: -321.38,
y: 30.098,
width: 57.5,
height: 10,
angle: 90
}, {
x: -295.13,
y: 63.848,
width: 62.5,
height: 10,
angle: 0
}, {
x: -268.88,
y: 268.848,
width: 420,
height: 10,
angle: 90
}, {
x: -32.63,
y: 483.848,
width: 482.5,
height: 10,
angle: 0
}, {
x: 203.62,
y: 531.348,
width: 105,
height: 10,
angle: 90
}, {
x: 258.62,
y: 588.848,
width: 120,
height: 10,
angle: 0
}, {
x: 323.62,
y: 536.348,
width: 115,
height: 10,
angle: 90
}, {
x: 344.87,
y: 483.848,
width: 52.5,
height: 10,
angle: 0
}, {
x: 376.12,
y: 455.098,
width: 67.5,
height: 10,
angle: 90
}, {
x: 349.87,
y: 416.348,
width: 62.5,
height: 10,
angle: 0
}, {
x: 323.62,
y: 395.098,
width: 52.5,
height: 10,
angle: 90
}, {
x: 297.37,
y: 363.848,
width: 62.5,
height: 10,
angle: 0
}, {
x: 271.12,
y: 342.598,
width: 52.5,
height: 10,
angle: 90
}, {
x: 203.62,
y: 337.598,
width: 62.5,
height: 10,
angle: 90
}, {
x: 106.12,
y: 363.848,
width: 205,
height: 10,
angle: 0
}, {
x: 8.62,
y: 292.598,
width: 152.5,
height: 10,
angle: 90
}, {
x: 29.87,
y: 221.348,
width: 52.5,
height: 10,
angle: 0
}, {
x: 61.12,
y: 87.598,
width: 277.5,
height: 10,
angle: 90
}, {
x: 6.12,
y: -56.152,
width: 120,
height: 10,
angle: 0
}, {
x: -58.88,
y: -3.652,
width: 115,
height: 10,
angle: 90
}, {
x: -103.88,
y: 48.848,
width: 100,
height: 10,
angle: 0
}, {
x: -148.88,
y: 27.598,
width: 52.5,
height: 10,
angle: 90
}, {
x: -235.13,
y: -3.652,
width: 182.5,
height: 10,
angle: 0
}, {
x: 242.37,
y: 311.348,
width: 67.5,
height: 10,
angle: 0
} ],
targets: [ {
x: 263.62,
y: 528.848,
width: 100,
height: 100,
angle: 0
}, {
x: -287.63,
y: 30.098,
width: 47.5,
height: 47.5,
angle: 0
}, {
x: 237.37,
y: 345.098,
width: 47.5,
height: 47.5,
angle: 0
} ],
pathWaysNode: [ {
name: "pathWay01",
children: []
} ],
bullets: [ {
basic: {
x: 1.12,
y: 3.848,
width: 100,
height: 100,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: -103.88,
y: 266.348,
width: 100,
height: 205,
angle: 0
},
mgr: {
bulletType: 2,
pathWaysNodeName: ""
}
}, {
basic: {
x: -130.13,
y: 450.098,
width: 47.5,
height: 47.5,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
}, {
basic: {
x: -182.63,
y: 450.098,
width: 47.5,
height: 47.5,
angle: 0
},
mgr: {
bulletType: 1,
pathWaysNodeName: ""
}
} ]
}
};
cc._RF.pop();
}, {} ],
loginMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d733bkMuPVAjJrq/tbVsVhw", "loginMgr");
var h = new (cc.Class({
properties: {
playerId: {
get: function() {
return this._playerId;
},
set: function(e) {
this._playerId = e;
e && this.onPlayerIdSet();
}
},
LoginType: {
get: function() {
return {
ACCOUNT: 1,
WE_CHAT_GAME: 2,
DEVICE_ID: 3
};
}
}
},
login: function(e) {
this._setPlayerIdFromServer(e);
},
onPlayerIdSet: function() {
this.updatePlayerDataFromServer(this.playerId);
},
updatePlayerDataFromServer: function(t) {
e("dataMgr").updatePlayerDataFromServer(t);
},
_genarateUUID: function() {
var e = cc.sys.now(), t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
var t = 16 * Math.random() | 0;
return ("x" == e ? t : 3 & t | 8).toString(16);
});
return t += e.toString();
},
_setPlayerIdFromServer: function(t) {
var i = e("networkMgr"), h = i.makeMessageObj("loginModule", "loginMessageType");
h.message.codeType = t;
var n = !1;
switch (t) {
case this.LoginType.ACCOUNT:
break;

case this.LoginType.WE_CHAT_GAME:
n = !0;
var a = this;
wx.login({
success: function(e) {
var t = e.code;
if (null != t) {
h.message.code = t;
h.successCallBack = function(e) {
var t = e.responseText;
if ("login_success" == (t = JSON.parse(t)).type) {
var i = t.playerId;
a.playerId = i;
} else t.type;
};
i.sendMessageByMsgObj(h);
}
}
});
break;

case this.LoginType.DEVICE_ID:
var g = cc.sys.localStorage.getItem("deviceId");
if (null == g) {
var o = this._genarateUUID();
cc.sys.localStorage.setItem("deviceId", o);
g = o;
}
h.message.code = g;
break;

default:
cc.log("Login type erro: now it's " + t);
}
if (1 != n) {
a = this;
h.successCallBack = function(e) {
var t = e.responseText;
if ("login_success" == (t = JSON.parse(t)).type) {
var i = t.playerId;
a.playerId = i;
} else t.type;
};
i.sendMessageByMsgObj(h);
}
}
}))();
t.exports = h;
cc._RF.pop();
}, {
dataMgr: "dataMgr",
networkMgr: "networkMgr"
} ],
loginSceneMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "81fbcyHVFlDhqJvCbUik6hX", "loginSceneMgr");
cc.Class({
extends: cc.Component,
properties: {
dataMgr: null,
loginMgr: null,
networkMgr: null,
isLogining: !1,
changeSceneAnimationTime: 2,
nameEnSpriteFrame: cc.SpriteFrame
},
onLoad: function() {
this.node.on("touchstart", this.onTouchStart, this);
1 != e("textConfig").languageType && (this.node.getChildByName("name").getComponent(cc.Sprite).spriteFrame = this.nameEnSpriteFrame);
},
start: function() {
this.dataMgr = e("dataMgr");
this.loginMgr = e("loginMgr");
this.networkMgr = e("networkMgr");
this.networkMgr.delegate = this;
var t = cc.find("Canvas/retry");
cc.tween(t).repeatForever(cc.tween().to(.5, {
scale: 1.2
}).to(.5, {
scale: .8
})).start();
this.login();
},
onPlayerDataUpdated: function() {
e("advertisMgr").initAds();
cc.find("Canvas/loginInfo/textNode").getComponent(cc.Label).string = e("textConfig").getTextByIdAndLanguageType(157);
for (var t in this.node.children) {
var i = this;
(function(e) {
var t = i.node.children[e];
cc.tween(t).to(i.changeSceneAnimationTime, {
opacity: 0
}).start();
})(t);
}
cc.tween(this.node).delay(this.changeSceneAnimationTime).call(function() {
e("resMgr").loadReses(function() {
cc.director.loadScene("mainScene");
});
}).start();
},
login: function() {
this.isLogining = !0;
cc.find("Canvas/retry").active = !1;
cc.find("Canvas/loginInfo/textNode").getComponent(cc.Label).string = e("textConfig").getTextByIdAndLanguageType(156);
var t = null;
t = cc.sys.platform == cc.sys.WECHAT_GAME ? this.loginMgr.LoginType.WE_CHAT_GAME : this.loginMgr.LoginType.DEVICE_ID;
this.loginMgr.login(t);
},
onTouchStart: function(e) {
0 == this.isLogining && this.login();
},
_debugLogin: function() {
this.dataMgr.playerData = {
id: 100000001,
name: "new Player",
physicalPower: 10,
maxPhysicalPower: 10,
heart: 10,
maxHeart: 10,
currentSection: 1,
currentLevel: 2,
physicalPowerCostedFlag: 0
};
this.onPlayerDataUpdated();
},
onDestroy: function() {
this.node.off("touchstart", this.onTouchStart, this);
},
onAllRetryFailed: function() {
var t = cc.find("Canvas/loginInfo");
t.getChildByName("textNode").getComponent(cc.Label).string = e("textConfig").getTextByIdAndLanguageType(161);
t.active = !0;
cc.find("Canvas/retry").active = !0;
this.isLogining = !1;
}
});
cc._RF.pop();
}, {
advertisMgr: "advertisMgr",
dataMgr: "dataMgr",
loginMgr: "loginMgr",
networkMgr: "networkMgr",
resMgr: "resMgr",
textConfig: "textConfig"
} ],
mailConfig: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "b8af6yKxwJNLpuWEyI5t8+/", "mailConfig");
t.exports = {
1001: {
titleTextId: 133,
contentTextId: 134,
options: [ {
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
} ]
},
10001: {
titleTextId: 138,
contentTextId: 139,
options: []
},
1002: {
titleTextId: 140,
contentTextId: 141,
options: []
},
1003: {
titleTextId: 142,
contentTextId: 143,
options: []
},
1101: {
titleTextId: 144,
contentTextId: 145,
options: []
}
};
cc._RF.pop();
}, {} ],
mailSysConfig: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "4a64feyfXJHbZN/RRBmqrAY", "mailSysConfig");
t.exports = {
mainLine: {
tagNameTextId: 127,
conditions: [ {
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
} ]
},
branchLine1: {
tagNameTextId: 128,
conditions: [ {
conditionType: 2,
conditionPara: {
levelId: 3,
minStepNum: 8
},
mailId: 1101
} ]
}
};
cc._RF.pop();
}, {} ],
mailSysMailMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "16bb9ye6UBAebul1F7cBbyY", "mailSysMailMgr");
cc.Class({
extends: cc.Component,
properties: {
mailId: null,
relatedMailSectionNode: cc.Node,
relatedMailSysMgr: null,
mailOptionNodePrefab: cc.Prefab,
disOfContentAndOptionSection: 200,
disOfOptionNodes: 25,
headerHeight: 82,
footerHeight: 80
},
onLoad: function() {
var e = this.node.getChildByName("bg");
e.width = cc.winSize.width;
e.height = cc.winSize.height;
e.on("touchstart", function() {});
this.setupContentSection();
this.setupOptionSection();
this.setupUiBg();
},
start: function() {},
close: function() {
this.node.destroy();
},
setupContentSection: function() {
var t = e("textConfig"), i = e("mailConfig")[this.mailId], h = this.node.getChildByName("others").getChildByName("contentSection").getChildByName("view").getChildByName("content"), n = h.getChildByName("titleLabel"), a = h.getChildByName("contentLabel");
n.getComponent(cc.Label).string = t.getTextByIdAndLanguageType(i.titleTextId);
a.getComponent(cc.Label).string = t.getTextByIdAndLanguageType(i.contentTextId);
h.height = -a.y + a.height;
},
setupOptionSection: function() {
var t = e("textConfig"), i = this.node.getChildByName("others").getChildByName("optionSection"), h = e("mailConfig")[this.mailId], n = h.options;
if (0 == (h = e("dataMgr").playerData.mails[this.mailId]).status) {
if (0 == n.length) {
(y = cc.instantiate(this.mailOptionNodePrefab)).getChildByName("label").getComponent(cc.Label).string = t.getTextByIdAndLanguageType(147);
var a = y.getChildByName("bg");
y.width = a.width;
y.height = a.height;
i.height += y.height;
var g = this;
y.on("click", function() {
g.relatedMailSysMgr.setOneMailReaded(g.mailId, -1, function() {
g.close();
}, g.relatedMailSectionNode);
});
y.y = -(i.height - y.height);
i.addChild(y);
return;
}
for (var o in n) {
var s = n[o];
(d = (l = cc.instantiate(this.mailOptionNodePrefab)).getChildByName("label")).getComponent(cc.Label).string = t.getTextByIdAndLanguageType(s.showTextId);
(r = l.getChildByName("bg")).height = d.height;
l.width = r.width;
l.height = r.height;
i.height += 0 == o ? l.height : l.height + this.disOfOptionNodes;
l.y = -(i.height - l.height);
g = this;
(function(t, i, n, a) {
t.on("click", function() {
g.relatedMailSysMgr.setOneMailReaded(g.mailId, a, function() {
if (1 == i) g.close(); else if (2 == i) {
e("systemsMgr").mailSysGloableSendOneMail(n.mailId, h.tag, function() {}, n.delay);
g.close();
}
}, g.relatedMailSectionNode);
});
})(l, s.operationType, s.operationPara, o);
i.addChild(l);
}
} else if (1 == h.status) if (-1 != h.selectedOptionIndex) {
var l, d, r, c = n[h.selectedOptionIndex];
(d = (l = cc.instantiate(this.mailOptionNodePrefab)).getChildByName("label")).getComponent(cc.Label).string = t.getTextByIdAndLanguageType(c.showTextId);
d.color = cc.color(255, 255, 255);
(r = l.getChildByName("bg_readed")).active = !0;
r.height = d.height;
l.width = r.width;
l.height = r.height;
i.height += l.height;
l.getComponent(cc.Button).interactable = !1;
l.y = -(i.height - l.height);
i.addChild(l);
(y = cc.instantiate(this.mailOptionNodePrefab)).getChildByName("label").getComponent(cc.Label).string = t.getTextByIdAndLanguageType(147);
a = y.getChildByName("bg");
y.width = a.width;
y.height = a.height;
i.height += y.height + this.disOfOptionNodes;
g = this;
y.on("click", function() {
g.close();
});
y.y = -(i.height - y.height);
i.addChild(y);
} else {
var y;
(y = cc.instantiate(this.mailOptionNodePrefab)).getChildByName("label").getComponent(cc.Label).string = t.getTextByIdAndLanguageType(147);
a = y.getChildByName("bg");
y.width = a.width;
y.height = a.height;
i.height += y.height;
g = this;
y.on("click", function() {
g.close();
});
y.y = -(i.height - y.height);
i.addChild(y);
}
},
setupUiBg: function() {
var e = this.node.getChildByName("others").getChildByName("uibg"), t = this.node.getChildByName("others").getChildByName("contentSection"), i = this.node.getChildByName("others").getChildByName("optionSection");
e.height = this.headerHeight + t.height + this.disOfContentAndOptionSection + i.height + this.footerHeight;
t.y = e.height / 2 - this.headerHeight;
i.y = t.y - t.height - this.disOfContentAndOptionSection;
}
});
cc._RF.pop();
}, {
dataMgr: "dataMgr",
mailConfig: "mailConfig",
systemsMgr: "systemsMgr",
textConfig: "textConfig"
} ],
mailSysMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "465278Wd2tOJrFKJYgx+b6s", "mailSysMgr");
cc.Class({
extends: cc.Component,
properties: {
uibg: cc.Node,
closeButtonNode: cc.Node,
tagSection: cc.Node,
mailSection: cc.Node,
notiSection: cc.Node,
mailSectionContentNode: cc.Node,
mailSectionEmptyLabelNode: cc.Node,
mailSectionPrefab: cc.Prefab,
tagSectionPrefab: cc.Prefab,
selectedTagEffectPrefab: cc.Prefab,
opendMailPrefab: cc.Prefab,
tags: null,
mailsByTag: {
default: {}
},
unReadedMailNums: {
default: {}
},
selectedTag: {
get: function() {
return this._selectedTag;
},
set: function(e) {
this._selectedTag = e;
this.setupMailSection();
this.setupNotiSection();
}
},
selectedTagNode: {
get: function() {
return this._selectedTagNode;
},
set: function(e) {
this._selectedTagNode = e;
if (null == this.selectedTagEffect.parent) {
this.selectedTagEffect.x = this.selectedTagNode.x;
this.selectedTagEffect.y = this.selectedTagNode.y;
this.tagSection.addChild(this.selectedTagEffect, 0);
} else {
var t = this.selectedTagNode.y;
cc.tween(this.selectedTagEffect).to(.1, {
y: t
}).start();
}
}
},
selectedTagEffect: {
get: function() {
if (null == this._selectedTagEffect) {
var e = cc.instantiate(this.selectedTagEffectPrefab);
this._selectedTagEffect = e;
}
return this._selectedTagEffect;
},
set: function(e) {
this._selectedTagEffect = e;
}
},
tagSectionStartY: -86.345,
tagSectionDis: 120,
mailSectionStartPosition: cc.v2(-125.788, 373.356),
mailSectionNodeDis: 32,
mailSectionNodeReadedColor: {
get: function() {
null == this._mailSectionNodeReadedColor && (this._mailSectionNodeReadedColor = cc.color(102, 102, 102));
return this._mailSectionNodeReadedColor;
},
set: function(e) {
this._mailSectionNodeReadedColor = e;
}
},
sysName: "mailSys"
},
onLoad: function() {
var t = this;
this.closeButtonNode.on("click", function() {
e("systemsMgr").closeSystem(t.sysName);
});
this.uibg.on("touchstart", function() {});
this.setupData();
this.setupUI();
},
start: function() {},
setupTagSection: function() {
var t = e("textConfig");
for (var i in this.tags) {
var h = this.tags[i], n = e("mailSysConfig")[h].tagNameTextId;
n = t.getTextByIdAndLanguageType(n);
var a = cc.instantiate(this.tagSectionPrefab);
a.getComponent(cc.Label).string = n;
a.getComponent(cc.Label)._forceUpdateRenderData();
var g = this;
(function(t, i) {
t.on("click", function() {
g.selectedTag != i && (g.selectedTag = i);
g.selectedTagNode != t && (g.selectedTagNode = t);
});
t.getComponent("redPointMgr").redPointShowCondition = function() {
var t = e("dataMgr").playerData.mails, h = 0;
for (var n in t) {
var a = t[n];
a.tag == i && 0 == a.status && (h += 1);
}
return h > 0;
};
})(a, h);
a.y = this.tagSectionStartY - i * this.tagSectionDis;
a.name = h;
this.tagSection.addChild(a, 1);
if (0 == i) {
this.selectedTag = h;
this.selectedTagNode = a;
}
}
},
setupMailSection: function() {
var t = e("textConfig"), i = this.mailsByTag[this.selectedTag], h = Object.keys(i);
this.mailSectionContentNode.destroyAllChildren();
if (0 != h.length) {
this.mailSectionEmptyLabelNode.active = !1;
var n = this;
h = h.sort(function(e, t) {
var i = n.mailsByTag[n.selectedTag][e], h = n.mailsByTag[n.selectedTag][t];
return 0 == i.status && 1 == h.status ? -1 : 1 == i.status && 0 == h.status ? 1 : i.timeStamp < h.timeStamp ? 1 : -1;
});
var a = e("mailConfig"), g = 0;
for (var o in h) {
var s = h[o], l = e("dataMgr").playerData.mails[s], d = cc.instantiate(this.mailSectionPrefab), r = d.getChildByName("icon_unread"), c = d.getChildByName("icon_readed"), y = d.getChildByName("titleLabel"), u = d.getChildByName("seperateLine");
if (1 == l.status) {
r.active = !1;
c.active = !0;
y.color = this.mailSectionNodeReadedColor;
}
var x = t.getTextByIdAndLanguageType(a[s].titleTextId);
y.getComponent(cc.Label).string = x;
u.y = -y.height;
d.y = -g;
var w = y.x + y.width / 2 - (r.x - r.width / 2), p = y.height;
d.width = w;
d.height = p;
d.name = s.toString();
g = g + y.height + 2;
o != h.length - 1 && (g += this.mailSectionNodeDis);
n = this;
(function(e, t) {
e.on("click", function() {
n.openOneMail(t, e);
});
})(d, s);
this.mailSectionContentNode.addChild(d);
}
g > this.mailSectionContentNode.height && (this.mailSectionContentNode.height = g);
} else {
this.mailSectionEmptyLabelNode.active = !0;
this.mailSectionEmptyLabelNode.getComponent(cc.Label).string = t.getTextByIdAndLanguageType(146);
this.mailSectionContentNode.height = 0;
}
},
setupNotiSection: function() {
var t = e("textConfig");
if (this.unReadedMailNums[this.selectedTag] > 0) {
var i = t.getTextByIdAndLanguageType(129);
this.notiSection.getChildByName("notiLabel").getComponent(cc.Label).string = i;
} else {
var h = e("dataMgr").playerData.mailConditionIndex[this.selectedTag];
if (-1 != h) {
var n = e("mailSysConfig")[this.selectedTag].conditions[h];
if (1 == n.conditionType) {
var a = n.conditionPara;
if (0 != (s = this._getSectionAndLevelNumOfSection(a))) {
var g = s[0], o = s[1];
i = t.getFormatedString(131, [ g.toString(), o.toString() ]);
this.notiSection.getChildByName("notiLabel").getComponent(cc.Label).string = i;
}
} else if (2 == n.conditionType) {
var s, l = n.conditionPara.levelId, d = n.conditionPara.minStepNum;
if (0 != (s = this._getSectionAndLevelNumOfSection(l))) {
g = s[0], a = s[1], i = t.getFormatedString(132, [ g.toString(), a.toString(), d.toString() ]);
this.notiSection.getChildByName("notiLabel").getComponent(cc.Label).string = i;
}
}
} else this.notiSection.getChildByName("notiLabel").getComponent(cc.Label).string = t.getTextByIdAndLanguageType(130);
}
},
_getSectionAndLevelNumOfSection: function(t) {
var i = e("sectionConfig");
for (var h in i) {
var n = i[h].levels.indexOf(t);
if (-1 != n) return [ h, n + 1 ];
}
return !1;
},
setupData: function() {
var t = e("dataMgr").playerData.mails;
this.tags = Object.keys(e("mailSysConfig"));
for (var i in this.tags) {
var h = this.tags[i];
this.mailsByTag[h] = {};
this.unReadedMailNums[h] = 0;
for (var n in t) {
var a = t[n];
if (a.tag == h) {
this.mailsByTag[h][n] = a;
0 == a.stauts && (this.unReadedMailNums[h] += 1);
}
}
}
},
setupUI: function() {
this.setupTagSection();
this.setupMailSection();
this.setupNotiSection();
},
_insertOneMail: function(e, t) {
if (t.tag == this.selectedTag) {
this.setupMailSection();
this.setupNotiSection();
}
},
openOneMail: function(e, t) {
var i = cc.instantiate(this.opendMailPrefab), h = i.getComponent("mailSysMailMgr");
h.mailId = e;
h.relatedMailSectionNode = t;
h.relatedMailSysMgr = this;
this.node.addChild(i);
},
setOneMailReaded: function(t, i) {
var h = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {}, n = arguments.length > 3 ? arguments[3] : void 0, a = e("dataMgr").playerData.mails[t];
if (1 != a.status) {
var g = e("networkMgr"), o = g.makeMessageObj("mailModule", "readMailMessageType");
o.message.playerId = e("dataMgr").playerData.id;
o.message.mailId = t;
o.message.selectedOptionIndex = i;
var s = this;
o.successCallBack = function(e) {
var t = e.responseText;
if ("success" == (t = JSON.parse(t)).type) {
a.status = 1;
a.selectedOptionIndex = i;
n.getChildByName("icon_readed").active = !0;
n.getChildByName("icon_unread").active = !1;
n.getChildByName("titleLabel").color = s.mailSectionNodeReadedColor;
s.unReadedMailNums[a.tag] -= 1;
s.setupNotiSection();
h();
}
};
g.sendMessageByMsgObj(o);
} else cc.log("this mail is already readed");
},
dataMonitored: function(t, i) {
var h = e("mailConfig");
if (-1 != Object.keys(h).indexOf(t)) {
this.setupData();
this._insertOneMail(t, i);
}
}
});
cc._RF.pop();
}, {
dataMgr: "dataMgr",
mailConfig: "mailConfig",
mailSysConfig: "mailSysConfig",
networkMgr: "networkMgr",
sectionConfig: "sectionConfig",
systemsMgr: "systemsMgr",
textConfig: "textConfig"
} ],
mainSceneMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "b1711iV+ldL4qhgqdK5YGYi", "mainSceneMgr");
cc.Class({
extends: cc.Component,
properties: {
sectionNameLabelNode: cc.Node,
levelNodes: cc.Node,
connectLineNodes: cc.Node,
levelNodePrefab: cc.Prefab,
levelNodesConnectLinePrefab: cc.Prefab,
selectedSection: null,
physicalLabelNode: cc.Node,
heartLabelNode: cc.Node,
mailSysButtonNode: cc.Node,
signInSysButtonNode: cc.Node,
welfarySysButtonNode: cc.Node,
addHeartButtonNode: cc.Node,
addPhysicalPowerButtonNode: cc.Node,
selectSectionButtonNode: cc.Node,
backToCurrentButtonNode: cc.Node,
levelNodeStartPosition: cc.v2(0, 0),
levelNodesHorDis: 10,
levelNodesVerDis: 20,
levelNodesNumPerLine: 4,
rotaedCopiedRadius: 300,
isShowingNoti: !1,
canShowNoti: !0
},
onLoad: function() {
this.setupData();
},
start: function() {
this.setupUI();
e("bgmMgr").selectedSection = this.selectedSection.toString();
},
setupUI: function() {
this.sectionNameLabelNode.getComponent(cc.Widget).updateAlignment();
this.heartLabelNode.getComponent(cc.Label).string = e("dataMgr").playerData.heart.toString();
this.physicalLabelNode.getComponent(cc.Label).string = e("dataMgr").playerData.physicalPower.toString();
var t = e("systemsMgr");
this.signInSysButtonNode.on("click", function() {
t.showSystem("signInSys");
});
this.signInSysButtonNode.getComponent("redPointMgr").redPointShowCondition = function() {
switch (e("dataMgr").playerData.signInStatus) {
case 1:
case 2:
return !0;

default:
return !1;
}
};
this.addPhysicalPowerButtonNode.on("click", function() {
t.showSystem("addPropertyNumSys", 1);
});
this.addHeartButtonNode.on("click", function() {
t.showSystem("addPropertyNumSys", 2);
});
if (1 == e("dataMgr").playerData.initAdWatchedFlag) this.welfarySysButtonNode.active = !1; else {
cc.tween(this.welfarySysButtonNode).repeatForever(cc.tween().to(.3, {
angle: -45
}).to(.3, {
angle: 0
}).to(.3, {
angle: 45
}).to(.3, {
angle: 0
}).delay(1)).start();
this.welfarySysButtonNode.on("click", function() {
t.showSystem("welfarySys");
});
}
this.selectSectionButtonNode.on("click", function() {
t.showSystem("selectSectionSys");
});
cc.tween(this.backToCurrentButtonNode).repeatForever(cc.tween().to(1, {
opacity: 0
}).to(1, {
opacity: 255
})).start();
this.backToCurrentButtonNode.getComponent(cc.Label).string = e("textConfig").getTextByIdAndLanguageType(167);
var i = this;
this.backToCurrentButtonNode.on("click", function() {
i.selectedSection = e("dataMgr").playerData.currentSection;
i.setupSectionPerformance();
i.playBgm();
});
this.backToCurrentButtonNode.y = this.sectionNameLabelNode.y - this.sectionNameLabelNode.height / 2 - 100;
this.setupSectionPerformance();
},
setupData: function() {
this.selectedSection = e("dataMgr").playerData.currentSection;
},
setupSectionPerformance: function() {
if (null != this.selectedSection) {
this.selectedSection == e("dataMgr").playerData.currentSection ? this.backToCurrentButtonNode.active = !1 : this.backToCurrentButtonNode.active = !0;
var t = e("textConfig");
this.levelNodes.destroyAllChildren();
this.levelNodes.removeAllChildren();
this.connectLineNodes.destroyAllChildren();
this.connectLineNodes.removeAllChildren();
var i = e("sectionConfig")[this.selectedSection], h = t.getTextByIdAndLanguageType(i.sectionTitleTextId) + " " + t.getTextByIdAndLanguageType(i.sectionDescripTextId);
this.sectionNameLabelNode.getComponent(cc.Label).string = h;
this.sectionNameLabelNode.getComponent(cc.Label)._forceUpdateRenderData();
this.selectSectionButtonNode.y = this.sectionNameLabelNode.y;
this.selectSectionButtonNode.x = this.sectionNameLabelNode.x - this.sectionNameLabelNode.width / 2 - 100;
var n = i.levels;
for (var a in n) {
var g = n[a], o = cc.instantiate(this.levelNodePrefab), s = o.getComponent("levelNodeMgr");
s.level = g;
s.levelNumLabelNode.getComponent(cc.Label).string = (parseInt(a) + 1).toString();
s.status = this._checkLevelStatus(g);
s.delegate = this;
this._setupLevelNodePosition(o, a);
this.levelNodes.addChild(o);
}
for (var a in this.levelNodes.children) if (0 != a) {
var l = this.levelNodes.children[a], d = this.levelNodes.children[a - 1], r = cc.instantiate(this.levelNodesConnectLinePrefab), c = cc.v2(d.x - l.x, d.y - l.y);
r.width = c.mag();
var y = c.signAngle(cc.v2(1, 0)) / Math.PI * 180;
r.angle = -y;
var u = this._getMidPointOfTwoPoints(l.position, d.position);
r.x = u.x;
r.y = u.y;
this.connectLineNodes.addChild(r);
}
} else cc.log("not selected one section, can not setup section of mainScene mgr");
},
_setupLevelNodePosition: function(t, i) {
var h = e("sectionConfig")[this.selectedSection], n = h.levelNodePositions;
if (null == n || 0 == n.length) {
var a = h.levels.length, g = 2 * Math.PI / a, o = cc.v2(this.rotaedCopiedRadius, 0).rotate(-i * g);
t.x = o.x;
t.y = o.y;
} else {
t.x = n[i].x;
t.y = n[i].y;
}
},
_getMidPointOfTwoPoints: function(e, t) {
var i = cc.v2(t.x - e.x, t.y - e.y), h = e.x + i.x / 2, n = e.y + i.y / 2;
return cc.v2(h, n);
},
_checkSectionStatus: function(t) {
var i = e("dataMgr").playerData.currentSection;
"number" != typeof t && (t = parseInt(t));
return t > i ? 0 : t < i ? 1 : t == i ? 2 : void 0;
},
_checkLevelStatus: function(t) {
var i = this._getSectionKeyByLevel(t);
if (0 == i) return !1;
switch (this._checkSectionStatus(i)) {
case 0:
return 0;

case 1:
return 1;

case 2:
var h = e("dataMgr").playerData.currentLevel;
if (h == t) return 2;
var n = e("sectionConfig")[i].levels;
return n.indexOf(t) > n.indexOf(h) ? 0 : 1;
}
},
_getSectionKeyByLevel: function(t) {
var i = parseInt(t), h = e("sectionConfig");
for (var n in h) {
if (-1 != h[n].levels.indexOf(i)) return n;
}
return !1;
},
dataMonitored: function(e, t) {
"physicalPower" == e ? this.physicalLabelNode.getComponent(cc.Label).string = t.toString() : "heart" == e && (this.heartLabelNode.getComponent(cc.Label).string = t.toString());
for (var i in this.levelNodes.children) {
this.levelNodes.children[i].getComponent("levelNodeMgr").dataMonitored(e, t);
}
},
update: function(t) {
var i = e("notificationMgr"), h = i.noties;
if (h.length > 0 && 0 == this.isShowingNoti && 1 == this.canShowNoti) {
this.isShowingNoti = !0;
var n = this;
(function e() {
if (0 != h.length) {
var t = h[0];
i.showNoti(t);
h.splice(0, 1);
cc.tween(n.node).delay(.3).call(function() {
e();
}).start();
} else n.isShowingNoti = !1;
})();
}
}
});
cc._RF.pop();
}, {
bgmMgr: "bgmMgr",
dataMgr: "dataMgr",
notificationMgr: "notificationMgr",
sectionConfig: "sectionConfig",
systemsMgr: "systemsMgr",
textConfig: "textConfig"
} ],
networkMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "06ef571V7VDkpNc4lgVqmds", "networkMgr");
var h = new (cc.Class({
extends: cc.Component,
properties: {
delegate: null,
retryDelta: 1.5,
maxRetryTime: 3,
retryWaitingNode: null,
retryAction: null
},
start: function() {},
sendMessage: function(e, t, i, h, n) {
var a = new XMLHttpRequest();
a.onreadystatechange = function() {
4 == a.readyState && a.status >= 200 && a.status < 400 && n(a);
};
var g = "http://" + i + ":" + t.toString() + "/" + h.toString();
a.open("POST", g);
a.send(e);
},
makeMessageObj: function(t, i) {
var h = e("gloableConfig"), n = h.netWorkMessageConfigs[t];
if (null != n) {
var a = h.basicIp, g = h.basicPort;
null != n.ip && (a = n.ip);
null != n.port && (g = n.port);
return {
ip: a,
port: g,
suffix: n.suffix,
message: n[i],
successCallBack: function(e) {}
};
}
cc.error("no such module name of " + t);
return null;
},
sendMessageByMsgObj: function(e) {
var t = "https://" + e.ip + ":" + e.port.toString() + "/" + e.suffix, i = null, h = this;
(i = new XMLHttpRequest()).onreadystatechange = function() {
if (4 == i.readyState && i.status >= 200 && i.status < 400) {
e.successCallBack(i);
1 == h.retryingFlag && (h.retryResult = !0);
}
};
var n = JSON.stringify(e.message);
i.onerror = function() {
cc.log("err");
null == h.retryAction && (h.retryAction = function() {
i.send(n);
i.currentRetryTime += 1;
});
null != i.currentRetryTime && void 0 != i.currentRetryTime || (i.currentRetryTime = 0);
var e = function(e) {
cc.log("retry", e.currentRetryTime);
if (e.currentRetryTime > h.maxRetryTime) {
h.retryWaitingNode.destroy();
h.retryWaitingNode.removeFromParent();
h.retryWaitingNode = null;
h.retryAction = null;
h.unscheduleAllCallbacks();
var t = cc.director.getScene();
if ("loginScene" == t.name) {
t.getChildByName("Canvas").getComponent("loginSceneMgr").onAllRetryFailed();
} else cc.loader.loadRes("prefabs/backToLoginScene", function(e, t) {
var i = cc.instantiate(t), h = i.getChildByName("bg");
h.width = cc.winSize.width;
h.height = cc.winSize.height;
h.on("touchstart", function() {});
i.getChildByName("others").getChildByName("ensureButton").on("click", function() {
cc.director.loadScene("loginScene");
});
cc.director.getScene().getChildByName("Canvas").addChild(i);
});
} else if (0 == e.currentRetryTime) {
cc.director.getScene().getChildByName("Canvas").addChild(h.retryWaitingNode);
h.schedule(h.retryAction, h.retryDelta);
}
};
null == h.retryWaitingNode ? cc.loader.loadRes("prefabs/retryWaitingNode", function(t, n) {
var a = cc.instantiate(n), g = a.getChildByName("bg");
g.width = cc.winSize.width;
g.height = cc.winSize.height;
g.on("touchstart", function() {});
h.retryWaitingNode = a;
e(i);
}) : e(i);
};
i.ontimeout = function() {
cc.log("time out!!!");
};
i.onabort = function() {
cc.log("abord");
};
0 == i.readyState && i.open("POST", t);
i.send(n);
},
onAllRetryFailed: function() {},
startHeartBeat: function() {
var t = this.makeMessageObj("longConnectModule", "heartBeatMessageType");
t.message.playerId = e("dataMgr").playerData.id;
t.successCallBack = function(t) {
var i = t.responseText;
if ("message" == (i = JSON.parse(i)).type) {
var h = i.messages;
for (var n in h) {
var a = h[n];
if ("mailSysSendMail" == a.type) {
var g = a.mailId, o = a.timeStamp, s = {
status: 0,
tag: a.tag,
timeStamp: o,
selectedOptionIndex: -1
};
e("dataMgr").playerData.mails[g] = s;
}
}
}
};
this.schedule(function() {
this.sendMessageByMsgObj(t);
}, 60);
}
}))();
t.exports = h;
cc._RF.pop();
}, {
dataMgr: "dataMgr",
gloableConfig: "gloableConfig"
} ],
notificationMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6adf2lw5wdC6oB912oNiN7C", "notificationMgr");
var h = new (cc.Class({
extends: cc.Component,
properties: {
lastTime: 2,
moveTime: .5,
moveDis: 200,
noties: []
},
start: function() {},
showNoti: function(t) {
var i = e("resMgr").reses.notiSysPrefab, h = cc.instantiate(i);
h.getChildByName("label").getComponent(cc.Label).string = t;
cc.director.getScene().getChildByName("Canvas").addChild(h);
cc.tween(h).by(this.moveTime, {
y: this.moveDis
}).delay(this.lastTime - this.moveTime).call(function() {
h.destroy();
}).start();
},
pushNoti: function(e) {
this.noties.push(e);
}
}))();
t.exports = h;
cc._RF.pop();
}, {
resMgr: "resMgr"
} ],
preChallengeUIMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "e5cd7mr4sZJ97Ekm5ipqXJu", "preChallengeUIMgr");
cc.Class({
extends: cc.Component,
properties: {
headerDis: 83,
footerDis: 124,
sectionDis: 66,
contentSpace: 99,
mailSectionElementDis: 30,
titleLabelNode: cc.Node,
challengeButtonNoe: cc.Node,
contentSectionNode: cc.Node,
mailSectionNode: cc.Node,
closeButtonNode: cc.Node,
mailSectionElementPrefab: cc.Prefab,
challengeButtonCostPhySprite: cc.SpriteFrame,
level: null,
levelStatus: null,
costResult: null,
delegate: null
},
onLoad: function() {
var t = e("textConfig"), i = this.node.getChildByName("bg");
i.width = cc.winSize.width;
i.height = cc.winSize.height;
i.on("touchstart", function() {}, this);
var h = this;
this.closeButtonNode.on("click", function() {
null != h.delegate ? h.delegate.preChanllengeUIOpend = !1 : cc.log("delegate is null");
h.node.destroy();
}, this);
this.challengeButtonNoe.getChildByName("New Label").getComponent(cc.Label).string = t.getTextByIdAndLanguageType(151);
},
start: function() {
this.setupUI();
},
getSectionAndIndexOfLevel: function() {
var t = cc.director.getScene().getChildByName("Canvas").getComponent("mainSceneMgr").selectedSection;
return [ t, e("sectionConfig")[t].levels.indexOf(this.level) + 1 ];
},
setupUI: function() {
this._setupUIContent();
this._setupUIPosition();
},
_setupUIContent: function() {
var t = this.getSectionAndIndexOfLevel();
this.titleLabelNode.getComponent(cc.Label).string = t[0].toString() + " - " + t[1];
e("levelConfig")[this.level];
var i = this.contentSectionNode.getChildByName("desLabel");
i.getComponent(cc.Label).string = this.titleLabelNode.getComponent(cc.Label).string;
i.getComponent(cc.Label)._forceUpdateRenderData();
var h = this.contentSectionNode.getChildByName("seperateLineUp"), n = this.contentSectionNode.getChildByName("seperateLineDown"), a = i.height + 2 * this.contentSpace + h.height + n.height;
this.contentSectionNode.height = a;
h.y = 0;
i.y = h.y - h.height - this.contentSpace;
n.y = -a + n.height;
e("textConfig"), t = this._getMailSectionInfo();
this.mailSectionNode.height = 0;
var g = this._getCostInfoOfChallenge();
"physicalPower" == g.type && (this.challengeButtonNoe.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = this.challengeButtonCostPhySprite);
this.challengeButtonNoe.getChildByName("costLabel").getComponent(cc.Label).string = g.num.toString();
this.costResult = g;
},
_setupUIPosition: function() {
var e = this.footerDis + this.titleLabelNode.height + this.sectionDis + this.contentSectionNode.height + this.sectionDis + this.mailSectionNode.height + this.sectionDis + this.challengeButtonNoe.height + this.footerDis, t = this.node.getChildByName("others").getChildByName("uiBg");
t.height = e;
this.titleLabelNode.y = t.height / 2 - this.headerDis;
this.contentSectionNode.y = this.titleLabelNode.y - this.titleLabelNode.height - this.sectionDis;
this.mailSectionNode.y = this.contentSectionNode.y - this.contentSectionNode.height - this.sectionDis;
this.challengeButtonNoe.y = this.mailSectionNode.y - this.mailSectionNode.height - this.sectionDis - this.challengeButtonNoe.height / 2;
},
_getMailSectionInfo: function() {
var t = e("mailSysConfig"), i = [], h = e("textConfig");
for (var n in t) {
var a = t[n], g = a.conditions, o = e("dataMgr").playerData.mailConditionIndex[n];
for (var s in g) {
var l = g[s], d = l.conditionType, r = l.conditionPara, c = null;
(1 == d && r == this.level || 2 == d && r.levelId == this.level) && (c = {
tag: h.getTextByIdAndLanguageType(a.tagNameTextId),
type: d,
status: null,
minStep: null
});
if (null != c) {
c.status = s < o;
2 == d && (c.minStep = r.minStepNum);
i.push(c);
break;
}
}
}
return i;
},
_getCostInfoOfChallenge: function() {
var t = {
type: "physicalPower",
num: 0
}, i = e("levelConfig");
if (1 == this.levelStatus) {
t.type = "heart";
t.num = i[this.level].heartForRetryCost;
} else if (2 == this.levelStatus) {
var h = e("dataMgr").playerData.physicalPowerCostedFlag;
if (0 == h) {
t.type = "physicalPower";
t.num = i[this.level].physicalPowerCost;
1 == e("dataMgr").playerData.initAdWatchedFlag && (t.num = Math.round(t.num / 2));
} else if (1 == h) {
t.type = "heart";
t.num = i[this.level].heartForRetryCost;
}
}
return t;
},
onClick: function() {
if (null != this.costResult && 0 != this.costResult.num) {
var t = null;
"heart" == this.costResult.type ? t = e("dataMgr").playerData.heart - this.costResult.num : "physicalPower" == this.costResult.type && (t = e("dataMgr").playerData.physicalPower - this.costResult.num);
if (null == t || t < 0) {
var i = e("notificationMgr"), h = "";
"heart" == this.costResult.type ? h = e("textConfig").getTextByIdAndLanguageType(169) : "physicalPower" == this.costResult.type && (h = e("textConfig").getTextByIdAndLanguageType(170));
i.pushNoti(h);
} else {
var n = e("networkMgr"), a = n.makeMessageObj("dataModule", "commitMessageTyp");
a.message.playerId = e("dataMgr").playerData.id;
var g = null;
"heart" == this.costResult.type ? g = {
heart: e("dataMgr").playerData.heart - this.costResult.num
} : "physicalPower" == this.costResult.type && (g = {
physicalPower: e("dataMgr").playerData.physicalPower - this.costResult.num
});
a.message.commitBody = g;
var o = this;
a.successCallBack = function() {
"heart" == o.costResult.type ? e("dataMgr").playerData.heart = g.heart : "physicalPower" == o.costResult.type && (e("dataMgr").playerData.physicalPower = g.physicalPower);
e("gameMgr").enterLevelScene(o.level);
};
this.challengeButtonNoe.getComponent(cc.Button).interactable = !1;
n.sendMessageByMsgObj(a);
}
}
}
});
cc._RF.pop();
}, {
dataMgr: "dataMgr",
gameMgr: "gameMgr",
levelConfig: "levelConfig",
mailSysConfig: "mailSysConfig",
networkMgr: "networkMgr",
notificationMgr: "notificationMgr",
sectionConfig: "sectionConfig",
textConfig: "textConfig"
} ],
redPointMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f34142gIJJJ4YCZvHxJkXfT", "redPointMgr");
cc.Class({
extends: cc.Component,
properties: {
redPointPrefab: cc.Prefab,
redPoint: null,
offset: cc.v2(5, 10),
redPointShowCondition: {
get: function() {
return this._redPointShowCondition;
},
set: function(e) {
this._redPointShowCondition = e;
this.setupRedPoint();
}
}
},
start: function() {},
setupRedPoint: function() {
null != this.redPointShowCondition && "function" == typeof this.redPointShowCondition ? 1 == this.redPointShowCondition() ? this.showRedPoint() : this.hideRedPoint() : cc.log("no condition of redpoint, or condition is not a function from node " + this.node.name);
},
showRedPoint: function() {
if (null == this.redPoint) {
var e = cc.instantiate(this.redPointPrefab), t = function(e) {
var t = (1 - e.anchorX) * e.width, i = (1 - e.anchorY) * e.height;
return cc.v2(t, i);
}, i = t(this.node).x + this.offset.x, h = t(this.node).y + this.offset.y;
e.x = i;
e.y = h;
this.redPoint = e;
this.node.addChild(e);
}
this.redPoint.active = !0;
},
hideRedPoint: function() {
if (null == this.redPoint) {
var e = cc.instantiate(this.redPointPrefab), t = function(e) {
var t = (1 - e.anchorX) * e.width, i = (1 - e.anchorY) * e.height;
return cc.v2(t, i);
}, i = t(this.node).x + this.offset.x, h = t(this.node).y + this.offset.y;
e.x = i;
e.y = h;
this.redPoint = e;
this.node.addChild(e);
}
this.redPoint.active = !1;
}
});
cc._RF.pop();
}, {} ],
resMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "df3f9Ff+ehEg4/MFicOafGk", "resMgr");
var h = new (cc.Class({
extends: cc.Component,
properties: {
reses: null,
resNum: null,
loadedResNum: 0
},
start: function() {},
loadReses: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {}, t = {
notiSysPrefab: "prefabs/notiNode",
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
}, i = Object.keys(t).length;
this.resNum = i;
this.reses = {};
var h = this;
for (var n in t) {
(function(i) {
var n = t[i];
cc.loader.loadRes(n, function(t, n) {
if (n) {
h.reses[i] = n;
h.loadedResNum += 1;
h.loadedResNum == h.resNum && e();
} else console.log("LOAD RES ERRO OF " + i + " :" + t);
});
})(n);
}
}
}))();
t.exports = h;
cc._RF.pop();
}, {} ],
sectionConfig: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "658e1kOKA9II7ENe3y2+Jif", "sectionConfig");
t.exports = {
1: {
sectionTitleTextId: 102,
sectionDescripTextId: 103,
levels: [ 1, 2, 3, 4, 5 ],
bgmPath: "musics/bgm_001",
levelNodePositions: []
},
2: {
sectionTitleTextId: 104,
sectionDescripTextId: 105,
levels: [ 6, 7, 8, 9, 10 ],
bgmPath: "musics/bgm_002",
levelNodePositions: []
},
3: {
sectionTitleTextId: 106,
sectionDescripTextId: 107,
levels: [ 11, 12, 13, 14, 15 ],
bgmPath: "musics/bgm_003",
levelNodePositions: []
},
4: {
sectionTitleTextId: 108,
sectionDescripTextId: 109,
levels: [ 16, 17, 18, 19, 20 ],
bgmPath: "musics/bgm_004",
levelNodePositions: []
},
5: {
sectionTitleTextId: 110,
sectionDescripTextId: 111,
levels: [ 21, 22, 23, 24, 25 ],
bgmPath: "musics/bgm_005",
levelNodePositions: []
},
6: {
sectionTitleTextId: 171,
sectionDescripTextId: 172,
levels: [ 26, 27, 28, 29, 30 ],
bgmPath: "musics/bgm_006",
levelNodePositions: []
}
};
cc._RF.pop();
}, {} ],
selectSectionElementMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "db60cQ2kgJNgK6qR9e+RnsV", "selectSectionElementMgr");
cc.Class({
extends: cc.Component,
properties: {
processBarNode: cc.Node,
processLabelNode: cc.Node,
iconNode: cc.Node,
iconLabelNode: cc.Node,
nameLabelNode: cc.Node,
lockedIconSpriteFrame: cc.SpriteFrame,
sectionKey: null,
config: null,
mailInfo: null,
selectSectionUINode: null
},
onLoad: function() {},
start: function() {
if (null != this.sectionKey) {
this.setupData();
this.nameLabelNode.getComponent(cc.Label).string = e("textConfig").getTextByIdAndLanguageType(this.config.sectionTitleTextId);
this.iconLabelNode.getComponent(cc.Label).string = this.sectionKey;
parseInt(this.sectionKey) > e("dataMgr").playerData.currentSection && (this.iconNode.getComponent(cc.Sprite).spriteFrame = this.lockedIconSpriteFrame);
this.processLabelNode.getComponent(cc.Label).string = this.mailInfo.sendNum.toString() + " / " + this.mailInfo.totalNum.toString();
this.processBarNode.getComponent(cc.ProgressBar).progress = this.mailInfo.sendNum / this.mailInfo.totalNum;
}
},
setupData: function() {
var t = e("sectionConfig");
this.config = t[this.sectionKey];
var i = [], h = this.config.levels, n = e("mailSysConfig");
for (var a in n) {
var g = n[a].conditions;
for (var o in g) {
var s = g[o], l = s.conditionType, d = s.conditionPara;
1 == l && -1 != h.indexOf(d) ? i.push(s.mailId) : 2 == l && -1 != h.indexOf(d.levelId) && i.push(s.mailId);
}
}
var r = i.length, c = 0;
if (r > 0) {
var y = Object.keys(e("dataMgr").playerData.mails);
for (var o in i) {
var u = i[o];
-1 != y.indexOf(u.toString()) && (c += 1);
}
}
var x = {
totalNum: r,
sendNum: c
};
this.mailInfo = x;
},
onClick: function() {
if (parseInt(this.sectionKey) > e("dataMgr").playerData.currentSection) e("notificationMgr").showNoti(e("textConfig").getTextByIdAndLanguageType(158)); else {
if (parseInt(this.sectionKey) <= e("dataMgr").playerData.currentSection) {
var t = cc.director.getScene().getChildByName("Canvas").getComponent("mainSceneMgr");
if (null == t) cc.log("现在不是主界面，无法选择章节，这种情况应该不会出现的才对！"); else if (parseInt(this.sectionKey) != t.selectedSection) {
t.selectedSection = parseInt(this.sectionKey);
t.setupSectionPerformance();
e("bgmMgr").selectedSection = this.sectionKey;
}
}
e("systemsMgr").closeSystem("selectSectionSys");
}
}
});
cc._RF.pop();
}, {
bgmMgr: "bgmMgr",
dataMgr: "dataMgr",
mailSysConfig: "mailSysConfig",
notificationMgr: "notificationMgr",
sectionConfig: "sectionConfig",
systemsMgr: "systemsMgr",
textConfig: "textConfig"
} ],
selectSectionUIMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d2250CWPMpIRr7o+jf81yog", "selectSectionUIMgr");
cc.Class({
extends: cc.Component,
properties: {
containerContentNode: cc.Node,
closeButtonNode: cc.Node,
bgNode: cc.Node,
othersNode: cc.Node,
elementPrefab: cc.Prefab,
elementDis: 100
},
start: function() {
this.setupUI();
},
setupUI: function() {
this.bgNode.width = cc.winSize.width;
this.bgNode.height = cc.winSize.height;
this.bgNode.on("touchstart", function() {
e("systemsMgr").closeSystem("selectSectionSys");
});
this.closeButtonNode.on("click", function() {
e("systemsMgr").closeSystem("selectSectionSys");
});
var t = e("sectionConfig"), i = 0;
for (var h in t) {
var n = cc.instantiate(this.elementPrefab), a = n.getComponent("selectSectionElementMgr");
a.sectionKey = h;
a.selectSectionUINode = this.node;
n.y = i;
i += n.height;
i += this.elementDis;
this.containerContentNode.addChild(n);
}
this.containerContentNode.height < i && (this.containerContentNode.height = i);
}
});
cc._RF.pop();
}, {
sectionConfig: "sectionConfig",
systemsMgr: "systemsMgr"
} ],
selectedEffectMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "7b478ZNvkdBy6Dqka/J/GBS", "selectedEffectMgr");
cc.Class({
extends: cc.Component,
properties: {
fadeOutTime: .5
},
start: function() {
cc.tween(this.node).repeatForever(cc.tween().to(this.fadeOutTime, {
opacity: 0
}).to(this.fadeOutTime, {
opacity: 255
})).start();
}
});
cc._RF.pop();
}, {} ],
signInSysConfig: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "51917pM+R1Dg5TFm0DDHJ3m", "signInSysConfig");
t.exports = {
physicalPowerAddNum: 10,
heartAddNum: 10,
addRateForAd: 2
};
cc._RF.pop();
}, {} ],
signInSysMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "a6895xyaLROOZK1s1NHLJeI", "signInSysMgr");
cc.Class({
extends: cc.Component,
properties: {
ensureButtonNode: cc.Node,
cancelButtonNode: cc.Node,
desLabelNode: cc.Label,
physicalPowerAddNum: 0,
heartAddNum: 0,
addRateForAd: 0,
sysName: "signInSys"
},
start: function() {
this.setupData();
this.setupUI();
},
setupUI: function() {
var t = e("dataMgr").playerData.signInStatus, i = "", h = e("textConfig");
switch (t) {
case 1:
i = h.getTextByIdAndLanguageType(115) + this.physicalPowerAddNum + h.getTextByIdAndLanguageType(116) + this.heartAddNum + ", ";
i += h.getTextByIdAndLanguageType(117);
this.cancelButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = h.getTextByIdAndLanguageType(118);
this.ensureButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = h.getTextByIdAndLanguageType(113);
break;

case 2:
i = (i = h.getTextByIdAndLanguageType(119) + ((this.addRateForAd - 1) * this.physicalPowerAddNum).toString()) + h.getTextByIdAndLanguageType(116) + ((this.addRateForAd - 1) * this.heartAddNum).toString();
i += h.getTextByIdAndLanguageType(120);
this.ensureButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = h.getTextByIdAndLanguageType(113);
this.cancelButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = h.getTextByIdAndLanguageType(114);
break;

case 3:
i = h.getTextByIdAndLanguageType(121);
this.cancelButtonNode.active = !1;
this.ensureButtonNode.x = 0;
var n = e("dataMgr").playerData.signInRefreshDelta, a = Math.floor(n / 3600), g = Math.floor(n % 3600 / 60), o = a.toString() + "h " + g.toString() + "m ";
this.ensureButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = h.getFormatedString(122, [ o ]);
}
"" != i ? this.desLabelNode.getComponent(cc.Label).string = i : cc.log("wrong signIn status");
},
setupData: function() {
var t = e("signInSysConfig");
this.physicalPowerAddNum = t.physicalPowerAddNum;
this.heartAddNum = t.heartAddNum;
this.addRateForAd = t.addRateForAd;
},
onClickEnsureButton: function() {
switch (e("dataMgr").playerData.signInStatus) {
case 1:
case 2:
var t;
(t = e("advertisMgr")).delegate = this;
t.showVideoAd();
break;

case 3:
e("systemsMgr").closeSystem(this.sysName);
}
},
onClickCancelButton: function() {
switch (e("dataMgr").playerData.signInStatus) {
case 1:
this.signIn(1);
break;

case 2:
e("systemsMgr").closeSystem(this.sysName);
break;

case 3:
cc.log("some wrong thing happen from onClickCancelButton");
}
},
signIn: function(t) {
var i = e("networkMgr"), h = i.makeMessageObj("signInModule", "signInMessageType");
h.message.signInType = t;
h.message.playerId = e("dataMgr").playerData.id;
var n = this;
h.successCallBack = function(e) {
var i = e.responseText;
if ("success" == (i = JSON.parse(i)).type) {
var h = i.physicalPower, a = i.heart;
n.onSignInSuccess(t, h, a);
}
};
i.sendMessageByMsgObj(h);
},
onSignInSuccess: function(t, i, h) {
switch (t) {
case 1:
e("dataMgr").playerData.signInStatus = 2;
break;

case 2:
case 3:
e("dataMgr").playerData.signInStatus = 3;
}
e("dataMgr").playerData.physicalPower = i;
e("dataMgr").playerData.heart = h;
var n = e("textConfig").getTextByIdAndLanguageType(164);
e("notificationMgr").pushNoti(n);
e("systemsMgr").closeSystem(this.sysName);
},
onVideoAdEnd: function() {
switch (e("dataMgr").playerData.signInStatus) {
case 1:
this.signIn(2);
break;

case 2:
this.signIn(3);
}
}
});
cc._RF.pop();
}, {
advertisMgr: "advertisMgr",
dataMgr: "dataMgr",
networkMgr: "networkMgr",
notificationMgr: "notificationMgr",
signInSysConfig: "signInSysConfig",
systemsMgr: "systemsMgr",
textConfig: "textConfig"
} ],
storyConfig: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "9bd8cDrCrJFmKs1dgH/hEgQ", "storyConfig");
t.exports = {
story_9001: {
id: 9001,
textIds: [ 160, 160 ],
bgmPath: "musics/bgm_006"
}
};
cc._RF.pop();
}, {} ],
storySysMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "e7a64OS7/RMK7rBUEbD4B4U", "storySysMgr");
cc.Class({
extends: cc.Component,
properties: {
contentNode: cc.Node,
storyTextNodePrefab: cc.Prefab,
disBetweenStoryTextNodes: 50,
continueLabelNode: cc.Node,
completeButtonNode: cc.Node,
startDelayTime: 1,
storyId: null,
storyTextNodes: [],
status: {
get: function() {
return this._status;
},
set: function(e) {
this._status = e;
switch (e) {
case 1:
this.continueLabelNode.active = !1;
this.completeButtonNode.active = !1;
this.node.getChildByName("tapMonitoredNode").active = !1;
break;

case 2:
this.continueLabelNode.active = !0;
this.completeButtonNode.active = !1;
this.node.getChildByName("tapMonitoredNode").active = !0;
break;

case 3:
this.continueLabelNode.active = !1;
this.completeButtonNode.active = !0;
this.node.getChildByName("tapMonitoredNode").active = !1;
break;

default:
cc.log("STORYSYSMGR: WRONG STATUS VALUE PROVIDED");
}
}
},
header: 100,
footer: 100,
sectionDis: 50,
totalHeight: 0,
totalTextNodeNum: null,
currentNum: null,
textIds: null
},
onLoad: function() {
var t = this, i = this.node.getChildByName("bg");
i.width = cc.winSize.width;
i.height = cc.winSize.height;
this.node.width = i.width;
this.node.height = i.height;
var h = this.node.getChildByName("tapMonitoredNode");
h.width = i.width;
h.height = i.height;
h.on("touchstart", function() {
if (2 == t.status) {
t.currentNum += 1;
var i = e("textConfig").getTextByIdAndLanguageType(t.textIds[t.currentNum - 1]);
t._showOneStoryText(i);
}
}, this);
this.completeButtonNode.on("click", function() {
3 == t.status && t.completeStory();
});
this.completeButtonNode.getChildByName("New Label").getComponent(cc.Label).string = e("textConfig").getTextByIdAndLanguageType(122);
cc.tween(this.continueLabelNode).repeatForever(cc.tween().to(.3, {
opacity: 0
}).to(.3, {
opacity: 255
})).start();
var n = this.node.getChildByName("scrollContainer");
n.y = i.height / 2 - this.footer;
this.continueLabelNode.y = -i.height / 2 + this.footer + this.completeButtonNode.height / 2;
this.completeButtonNode.y = -i.height / 2 + this.footer + this.completeButtonNode.height / 2;
var a = i.height - this.header - this.footer - this.completeButtonNode.height - this.sectionDis;
n.height = a;
n.getChildByName("view").height = a;
this.contentNode.height = a;
},
start: function() {
this.showStory();
},
showStory: function() {
if (null != this.storyId) {
var t = e("storyConfig")["story_" + this.storyId.toString()].textIds;
this.textIds = t;
this.totalTextNodeNum = t.length;
this.currentNum = 1;
var i = e("textConfig").getTextByIdAndLanguageType(t[0]), h = this;
cc.tween(this.node).delay(h.startDelayTime).call(function() {
h._showOneStoryText(i);
}).start();
} else cc.log("NO STORY ID PROVIDED");
},
completeStory: function() {
var t = e("networkMgr"), i = t.makeMessageObj("storyModule", "completeCurrentMessageType");
i.message.playerId = e("dataMgr").playerData.id;
i.successCallBack = function(t) {
var i = t.responseText;
if ("success" == (i = JSON.parse(i)).type) {
var h = i.storyId;
e("dataMgr").playerData.storySysId = h;
e("systemsMgr").closeSystem("storySys", 3);
}
};
this.completeButtonNode.getComponent(cc.Button).interactable = !1;
t.sendMessageByMsgObj(i);
},
_showOneStoryText: function(e) {
this.status = 1;
var t = cc.instantiate(this.storyTextNodePrefab);
t.getComponent(cc.Label).string = e;
t.getComponent(cc.Label)._forceUpdateRenderData();
t.y = -this.totalHeight;
this.totalHeight += t.height + this.disBetweenStoryTextNodes;
if (this.contentNode.height < this.totalHeight) {
this.contentNode.height = this.totalHeight;
this.node.getChildByName("scrollContainer").getComponent(cc.ScrollView).vertical = !0;
}
t.opacity = 0;
this.contentNode.addChild(t);
var i = this;
cc.tween(t).to(.5, {
opacity: 255
}).call(function() {
i.currentNum == i.totalTextNodeNum ? i.status = 3 : i.status = 2;
}).start();
},
onWillOpend: function(e) {
this.storyId = e;
}
});
cc._RF.pop();
}, {
dataMgr: "dataMgr",
networkMgr: "networkMgr",
storyConfig: "storyConfig",
systemsMgr: "systemsMgr",
textConfig: "textConfig"
} ],
systemsMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "90768z3BYZIyKcDPXY67Q3P", "systemsMgr");
var h = new (cc.Class({
extends: cc.Component,
properties: {
welfarySys: {
get: function() {
if (null == this._welfarySys) {
this._welfarySys = this.setupSysProperty("welfarySysPrefab", "welfarySys", "welfarySysMgr");
this.systems.welfarySys = this._welfarySys;
}
return this._welfarySys;
}
},
signInSys: {
get: function() {
if (null == this._signInSys) {
this._signInSys = this.setupSysProperty("signInSysPrefab", "signInSys", "signInSysMgr");
this.systems.signInSys = this._signInSys;
}
return this._signInSys;
}
},
addPropertyNumSys: {
get: function() {
if (null == this._addPropertyNumSys) {
this._addPropertyNumSys = this.setupSysProperty("addPropertyNumSysPrefab", "addPropertyNumSys", "addPropertyNumSysMgr");
this.systems.addPropertyNumSys = this._addPropertyNumSys;
}
return this._addPropertyNumSys;
}
},
mailSys: {
get: function() {
if (null == this._mailSys) {
this._mailSys = this.setupSysProperty("mailSysPrefab", "mailSys", "mailSysMgr");
this.systems.mailSys = this._mailSys;
}
return this._mailSys;
}
},
selectSectionSys: {
get: function() {
if (null == this._selectSectionSys) {
this._selectSectionSys = this.setupSysProperty("selectSectionSysPrefab", "selectSectionSys", "selectSectionUIMgr");
this.systems.selectSectionSys = this._selectSectionSys;
}
return this._selectSectionSys;
}
},
storySys: {
get: function() {
if (null == this._storySys) {
this._storySys = this.setupSysProperty("storySysPrefab", "storySys", "storySysMgr");
this.systems.storySys = this._storySys;
}
return this._storySys;
}
},
systems: {
get: function() {
null == this._systems && (this._systems = {});
return this._systems;
}
}
},
setupSysProperty: function(t, i, h) {
var n = {};
n.uiPrefab = e("resMgr").reses[t];
n.opendNode = null;
n.name = i;
n.mgrName = h;
return n;
},
showSystem: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1, h = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1, n = this.getSysBySysName(e);
if (null == n.opendNode) {
var a = cc.instantiate(n.uiPrefab), g = this.systems[n.name].mgrName, o = a.getComponent(g);
null != o && "function" == typeof o.onWillOpend && o.onWillOpend(t);
var s = a.getChildByName("others"), l = a.getChildByName("bg");
if (null != l) {
l.width = cc.winSize.width;
l.height = cc.winSize.height;
if (1 == h) l.on("touchstart", function() {}); else if (2 == h) {
var d = this;
l.on("touchstart", function() {
d.closeSystem(e);
});
}
}
if (2 != i) {
cc.director.getScene().getChildByName("Canvas").addChild(a);
n.opendNode = a;
if (null != s) {
s.scale = 0;
cc.tween(s).to(.3, {
scale: 1
}).start();
} else {
a.scale = 0;
cc.tween(a).to(.3, {
scale: 1
}).start();
}
} else {
cc.director.getScene().getChildByName("Canvas").addChild(a);
n.opendNode = a;
}
} else cc.log("this sys has been opend , can't reopen: " + n.name);
},
closeSystem: function(t) {
var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, h = this.getSysBySysName(t), n = h.opendNode;
if (null != n) {
if (1 == i) {
var a = n.getChildByName("others");
null != a ? cc.tween(a).to(.3, {
scale: 0
}).call(function() {
n.destroy();
h.opendNode = null;
}).start() : cc.tween(n).to(.3, {
scale: 0
}).call(function() {
n.destroy();
h.opendNode = null;
});
} else if (2 == i) {
n.destroy();
h.opendNode = null;
} else if (3 == i) {
var g = e("resMgr").reses.coverNodePrefab;
(g = cc.instantiate(g)).width = n.width;
g.height = n.height;
g.opacity = 0;
g.on("touchstart", function() {});
n.addChild(g);
cc.tween(g).to(.5, {
opacity: 255
}).delay(.5).call(function() {
n.destroy();
h.opendNode = null;
}).start();
}
} else cc.log(h.name + "has not been opend, no need to colse");
},
getSysBySysName: function(e) {
switch (e) {
case "welfarySys":
return this.welfarySys;

case "signInSys":
return this.signInSys;

case "addPropertyNumSys":
return this.addPropertyNumSys;

case "mailSys":
return this.mailSys;

case "selectSectionSys":
return this.selectSectionSys;

case "storySys":
return this.storySys;

default:
cc.log("no such sys");
return !1;
}
},
systemsGloableDataMonitored: function(e, t) {},
mailSysGloableMonitored: function(t, i) {
var h = e("textConfig"), n = function(t, i) {
var n = e("networkMgr"), a = n.makeMessageObj("mailModule", "reachConditionMessageType");
a.message.playerId = e("dataMgr").playerData.id;
a.message.tag = t;
a.message.mailId = i;
a.successCallBack = function(n) {
var a = n.responseText;
if ("success" == (a = JSON.parse(a)).type) {
0 == a.isEnd ? e("dataMgr").playerData.mailConditionIndex[t] += 1 : e("dataMgr").playerData.mailConditionIndex[t] = -1;
var g = a.mail;
e("dataMgr").playerData.mails[i] = g;
var o = e("notificationMgr"), s = h.getTextByIdAndLanguageType(148);
o.pushNoti(s);
}
};
n.sendMessageByMsgObj(a);
}, a = e("mailSysConfig"), g = Object.keys(a);
for (var o in g) {
var s = g[o], l = e("dataMgr").playerData.mailConditionIndex[s];
if (-1 != l) {
var d = a[s].conditions[l], r = d.conditionType, c = d.conditionPara;
if (1 == r) {
if ("preLevel" != t) continue;
if (i == c) {
n(s, d.mailId);
}
} else if (2 == r) {
if (-1 == t.indexOf("minStep_level_")) continue;
var y = t.slice(14);
if (parseInt(y) == c.levelId && i <= c.minStepNum) {
n(s, d.mailId);
}
}
}
}
},
mailSysGloableSendOneMail: function(t, i) {
var h = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {}, n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0, a = e("networkMgr"), g = a.makeMessageObj("mailModule", "sendMailMessageType");
g.message.playerId = e("dataMgr").playerData.id;
g.message.mailId = t;
g.message.tag = i;
g.message.delay = n;
g.successCallBack = function(e) {
var t = e.responseText;
"success" == (t = JSON.parse(t)).type && h();
};
a.sendMessageByMsgObj(g);
}
}))();
t.exports = h;
cc._RF.pop();
}, {
dataMgr: "dataMgr",
mailSysConfig: "mailSysConfig",
networkMgr: "networkMgr",
notificationMgr: "notificationMgr",
resMgr: "resMgr",
textConfig: "textConfig"
} ],
targetMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "dd98dJBJRlHoIaNxxkryLBz", "targetMgr");
cc.Class({
extends: cc.Component,
properties: {
fatalTolerance: .01,
bullets: null,
flag: !1,
helper: null
},
onLoad: function() {
var t = e("helper");
this.helper = new t();
},
start: function() {
this.bullets = cc.find("Canvas").getComponent("levelMgr").bullets;
},
update: function(e) {
if (1 != this.flag) for (var t in this.bullets) {
var i = this.bullets[t], h = i.getComponent("bulletMgr");
if (1 == h.bulletType && (0 == h.status && 1 == this.checkWhetherSatisfied(i))) {
this.onSatisfy(i);
break;
}
}
},
checkWhetherSatisfied: function(e) {
var t = this.helper.getPointsOfOneNode(this.node), i = this.helper.getPointsOfOneNode(e);
for (var h in t) {
var n = t[h], a = i[h];
if (cc.v2(a.x - n.x, a.y - n.y).mag() > this.fatalTolerance) return !1;
}
return !0;
},
onSatisfy: function(e) {
this.flag = !0;
e.getComponent("bulletMgr").status = 2;
var t = this;
cc.tween(e).to(.2, {
opacity: 0
}).call(function() {
e.destroy();
}).start();
cc.tween(this.node).to(.2, {
opacity: 0
}).call(function() {
t.node.destroy();
cc.find("Canvas").getComponent("levelMgr").targetsNum -= 1;
}).start();
},
onDestroy: function() {}
});
cc._RF.pop();
}, {
helper: "helper"
} ],
textConfig: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "9c22epK3DJMhqp2fQro2fYy", "textConfig");
function h(e) {
"@babel/helpers - typeof";
return (h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
})(e);
}
var n = {
languageType: 0,
text_101: {
id: 101,
zh: "测试",
en: "test",
comment: "测试专用"
},
text_102: {
id: 102,
zh: "第一章",
en: "Section 1",
comment: "第一章标题"
},
text_103: {
id: 103,
zh: "",
en: "",
comment: "第一章描述"
},
text_104: {
id: 104,
zh: "第二章",
en: "Section 2",
comment: "第二章标题"
},
text_105: {
id: 105,
zh: "",
en: "",
comment: "第二章描述"
},
text_106: {
id: 106,
zh: "第三章",
en: "Section 3",
comment: "第三章标题"
},
text_107: {
id: 107,
zh: "",
en: "",
comment: "第三章描述"
},
text_108: {
id: 108,
zh: "第四章",
en: "Section 4",
comment: "第四章标题"
},
text_109: {
id: 109,
zh: "",
en: "",
comment: "第四章描述"
},
text_110: {
id: 110,
zh: "第五章",
en: "Section 5",
comment: "第五章标题"
},
text_111: {
id: 111,
zh: "",
en: "",
comment: "第五章描述"
},
text_112: {
id: 112,
zh: "观看视频广告，挑战关卡消耗体力永久减半！您是否愿意观看？",
en: "the cost of physical powr for challenge levels will be permanent halving , by watching a video advertisment , would you want to watch?",
comment: "福利系统显示文字"
},
text_113: {
id: 113,
zh: "观看",
en: "Watch",
comment: "通用观看"
},
text_114: {
id: 114,
zh: "取消",
en: "Cancel",
comment: "通用取消"
},
text_115: {
id: 115,
zh: "每日签到可以获得 体力 * ",
en: "Sign in can get physical power * ",
comment: "签到系统01"
},
text_116: {
id: 116,
zh: "， 金币 * ",
en: ", gold * ",
comment: "签到系统02"
},
text_117: {
id: 117,
zh: "您是否愿意观看视频广告，获得双倍奖励？",
en: "would you want to watch a video advertisment to get double rewards?",
comment: "签到系统03"
},
text_118: {
id: 118,
zh: "普通签到",
en: "Common signIn",
comment: "签到系统"
},
text_119: {
id: 119,
zh: "您还可以观看视频广告获取体力 * ",
en: "you can still watch a video advertisment to get physical power * ",
comment: "签到系统"
},
text_120: {
id: 120,
zh: "，是否观看？",
en: ", would you want to watch?",
comment: "签到系统"
},
text_121: {
id: 121,
zh: "您今天已经签到过啦，明天再来吧~ 每日 05: 00 am (UTC 8) 刷新 ，当前距离刷新 %s",
en: "you have been signed in today, come again tomorrow please ~ it will refresh every 05:00 am (UTC 8), it will refresh in %s",
comment: "签到系统"
},
text_122: {
id: 122,
zh: "确定",
en: "OK",
comment: "通用确定"
},
text_123: {
id: 123,
zh: "您可以观看视频广告，获得",
en: "you can get ",
comment: ""
},
text_124: {
id: 124,
zh: " 体力 * ",
en: " physical power * ",
comment: ""
},
text_125: {
id: 125,
zh: " 金币 * ",
en: " gold * ",
comment: ""
},
text_126: {
id: 126,
zh: "，是否观看？",
en: ", by watching a video advertisment , would you want to watch?",
comment: ""
},
text_127: {
id: 127,
zh: "主线",
en: "Main Line",
comment: "邮件系统 mainline tag name"
},
text_128: {
id: 128,
zh: "支线",
en: "branch line",
comment: "邮件系统 branchline1 tag name"
},
text_129: {
id: 129,
zh: "您还有未读邮件，请先查看完哦，心急不是好习惯 -.-",
en: "you still have mail unread , please make them readed first , don't be impatient",
comment: "未读邮件提示"
},
text_130: {
id: 130,
zh: "此分支已结束",
en: "this branch has been finished",
comment: ""
},
text_131: {
id: 131,
zh: "通关 %s - %s , 会有新的邮件，加油吧少年",
en: "complete level %s - %s , will get a new mail , come on",
comment: ""
},
text_132: {
id: 132,
zh: "在 %s - %s 用最多 %s 步通关 ， 会有新的邮件，加油吧少年",
en: "complete level %s - %s in at most %s step , will get a new mail, come on",
comment: ""
},
text_133: {
id: 133,
zh: "你知道么",
en: "you know what",
comment: "邮件 1001 标题"
},
text_134: {
id: 134,
zh: "测试一下",
en: "have a test",
comment: "邮件 1001 内容"
},
text_135: {
id: 135,
zh: "好的",
en: "OK",
comment: "邮件 1001 选项1 通用OK"
},
text_136: {
id: 136,
zh: "测试选项",
en: "Test option",
comment: "邮件 1001 选项2"
},
text_137: {
id: 137,
zh: "测试选项1",
en: "test option 1",
comment: "邮件 1001 选项3"
},
text_138: {
id: 138,
zh: "测试 10001",
en: "test 10001",
comment: "邮件 10001 标题"
},
text_139: {
id: 139,
zh: "测试 10001",
en: "test 10001",
comment: "邮件 10001 内容"
},
text_140: {
id: 140,
zh: "测试 1002",
en: "test 1002",
comment: "邮件 1002 标题"
},
text_141: {
id: 141,
zh: "测试 1002",
en: "test 1002",
comment: "邮件 1002 内容"
},
text_142: {
id: 142,
zh: "测试 1003",
en: "test 1003",
comment: "邮件 1003 标题"
},
text_143: {
id: 143,
zh: "测试 1003",
en: "test 1003",
comment: "邮件 1003 内容"
},
text_144: {
id: 144,
zh: "测试 1101",
en: "test 1101",
comment: "邮件 1101 标题"
},
text_145: {
id: 145,
zh: "测试 1101",
en: "test 1101",
comment: "邮件 1101 内容"
},
text_146: {
id: 146,
zh: "啊哦，还没有任何邮件哦",
en: "wow , there is no mail yet",
comment: "邮件系统 没有邮件提示"
},
text_147: {
id: 147,
zh: "关闭",
en: "close",
comment: "通用关闭"
},
text_148: {
id: 148,
zh: "收到了一封新邮件，快去查看吧",
en: "get one new mail , go to check it",
comment: "收到新邮件提示"
},
text_149: {
id: 149,
zh: "通关后会收到 %s 分支的新邮件",
en: "complete this level will get one new mail from %s ",
comment: "关卡预览界面，邮件区文字提示"
},
text_150: {
id: 150,
zh: "用不多于 %s 步通关，会收到 %s 分支的新邮件",
en: "you will get one new mail from %s , by completing this level in at most %s step",
comment: "关卡预览界面，邮件区文字提示"
},
text_151: {
id: 151,
zh: "挑战",
en: "Enter",
comment: "关卡预览界面，挑战按钮文字"
},
text_152: {
id: 152,
zh: "重试",
en: "Retry",
comment: "关卡界面，重试按钮文字"
},
text_153: {
id: 153,
zh: "最小步数：%s",
en: "min step: %s",
comment: "关卡界面最小步数"
},
text_154: {
id: 154,
zh: "当前步数：%s",
en: "current step: %s",
comment: "关卡界面当前步数"
},
text_155: {
id: 155,
zh: "无",
en: "none",
comment: ""
},
text_156: {
id: 156,
zh: "登陆中，请稍候",
en: "loging in , please wait a moment",
comment: "登陆中提示"
},
text_157: {
id: 157,
zh: "登陆成功",
en: "log in success",
comment: "登陆成功"
},
text_158: {
id: 158,
zh: "这个章节还没有解锁哦",
en: "this section have no been unlocked",
comment: ""
},
text_159: {
id: 159,
zh: "在屏幕任何地方向四个方向滑动，让所有方块到达与之相匹配的目标，便可通关",
en: "Swipe to any of the 4 directions at any position in the screen, make all diamonds reached matched target , will pass the level ",
comment: ""
},
text_160: {
id: 160,
zh: "这是第一行\n这是第二行\n这是第三行\n就这样吧先",
en: "this is new story line 1\n        and this is new story line 2\n        this is new story line 3\n        ok , just complete first",
comment: "新手剧情测试"
},
text_161: {
id: 161,
zh: "连接服务器失败，请点击重试",
en: "failed to connect server, tap to retry",
comment: "连接失败"
},
text_162: {
id: 162,
zh: "看完视频才能获得奖励哦",
en: "you can only get reward by complete the video ad",
comment: "广告模块通用1"
},
text_163: {
id: 163,
zh: "增加成功",
en: "add success",
comment: "通用增加成功"
},
text_164: {
id: 164,
zh: "签到成功",
en: "sigin in success",
comment: ""
},
text_165: {
id: 165,
zh: "领取成功",
en: "get success",
comment: "福利系统"
},
text_166: {
id: 166,
zh: "这个平台现在还不支持广告哦",
en: "this platform do not support ads just now",
comment: "广告系统"
},
text_167: {
id: 167,
zh: "点击回到当前章节",
en: "tap to return current section",
comment: ""
},
text_168: {
id: 168,
zh: "这个关卡还未开放哦",
en: "this level is locked now",
comment: ""
},
text_169: {
id: 169,
zh: "金币不足",
en: "not enough gold",
comment: "通用金币不足"
},
text_170: {
id: 170,
zh: "体力不足",
en: "not enough physical power",
comment: "通用体力不足"
},
text_171: {
id: 171,
zh: "第六章",
en: "Section 6",
comment: "第六章标题"
},
text_172: {
id: 172,
zh: "",
en: "",
comment: "第六章内容"
},
text_173: {
id: 173,
zh: [ "" ],
en: "",
comment: "初始剧情"
},
getTextByIdAndLanguageType: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.languageType, i = this["text_" + e.toString()], n = null;
"object" == h(n = 1 == t ? i.zh : i.en) && (n = n.join("\n"));
return n;
},
getFormatedString: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.languageType, h = this["text_" + e.toString()], n = null;
n = 1 == i ? h.zh : h.en;
var a = [];
for (var g in n) {
var o = n[g], s = null;
if (g < n.length - 1) {
s = n[parseInt(g) + 1];
}
"%" == o && "s" == s && a.push(g);
}
if (a.length == t.length) {
for (var g in t) {
var l = t[g].toString();
n = n.replace("%s", l);
}
return n;
}
cc.log("para length not match of indexes length, indexes: " + a.length + " paras: " + t.length);
}
};
cc.sys.language == cc.sys.LANGUAGE_CHINESE && (n.languageType = 1);
t.exports = n;
cc._RF.pop();
}, {} ],
timerSystemsMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "db2d5jDzvdBm400iKuIvXTH", "timerSystemsMgr");
var h = new (cc.Class({
extends: cc.Component,
properties: {
signInSysTimer: {
get: function() {
return this._signInSysTimer;
},
set: function(e) {
this._signInSysTimer = e;
e <= 0 && this.onTimerReach("signInSys");
}
},
timers: []
},
start: function() {},
initSetup: function() {
this.timers.push(this.signInSysTimer);
this.signInSysTimer = e("dataMgr").playerData.signInRefreshDelta;
},
lunch: function() {
this.schedule(this.timerUpdate, 1);
},
timerUpdate: function() {
for (var e in this.timers) {
var t = this.timers[e];
t > 0 && (t -= 1);
}
},
stop: function() {
this.unschedule(this.timerUpdate, this);
},
onTimerReach: function(t) {
switch (t) {
case "signInSys":
var i = this, h = e("networkMgr"), n = h.makeMessageObj("signInModule", "refreshMessageType");
n.message.playerId = e("dataMgr").playerData.id;
n.successCallBack = function(t) {
var h = t.responseText;
if ("success" == (h = JSON.parse(h)).type) {
var n = h.signInRefreshDelta;
e("dataMgr").playerData.signInRefreshDelta = n;
i.signInSysTimer = n;
e("dataMgr").playerData.signInStatus = 1;
if (null != e("systemsMgr").signInSys.opendNode) {
e("systemsMgr").signInSys.opendNode.getComponent("signInSysMgr").setupUI();
}
}
};
h.sendMessageByMsgObj(n);
}
}
}))();
t.exports = h;
cc._RF.pop();
}, {
dataMgr: "dataMgr",
networkMgr: "networkMgr",
systemsMgr: "systemsMgr"
} ],
use_reversed_rotateTo: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f209f0V4P9PaLJOp7iXlB9H", "use_reversed_rotateTo");
cc.RotateTo._reverse = !0;
cc._RF.pop();
}, {} ],
welfarySysMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "b76ban9vyBAI6HjYNJk1oHH", "welfarySysMgr");
cc.Class({
extends: cc.Component,
properties: {
desLabelNode: cc.Node,
ensureButtonNode: cc.Node,
cancelButtonNode: cc.Node,
systemName: "welfarySys"
},
start: function() {
this.setupInitUI();
},
onClickEnsureButton: function() {
var t = e("advertisMgr");
t.delegate = this;
t.showVideoAd();
},
onClickCancelButton: function() {
e("systemsMgr").closeSystem(this.systemName);
},
setupInitUI: function() {
var t = e("dataMgr").playerData.initAdWatchedFlag;
if (0 == t) {
this.desLabelNode.getComponent(cc.Label).string = e("textConfig").getTextByIdAndLanguageType(112);
this.ensureButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = e("textConfig").getTextByIdAndLanguageType(113);
this.cancelButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = e("textConfig").getTextByIdAndLanguageType(114);
} else 1 == t && (this.desLabelNode.getComponent(cc.Label).string = "嗯？ 这个界面不应该出现的，你已经领取过福利啦~");
},
onVideoAdEnd: function() {
var t = this;
e("dataMgr").commitPlayerDataToServer({
initAdWatchedFlag: 1
}, function() {
e("dataMgr").playerData.initAdWatchedFlag = 1;
e("systemsMgr").closeSystem(t.systemName);
var i = cc.director.getScene();
"mainScene" == i.name && (i.getChildByName("Canvas").getChildByName("enterButtons").getChildByName("welfaryButton").active = !1);
var h = e("textConfig").getTextByIdAndLanguageType(165);
e("notificationMgr").pushNoti(h);
});
}
});
cc._RF.pop();
}, {
advertisMgr: "advertisMgr",
dataMgr: "dataMgr",
notificationMgr: "notificationMgr",
systemsMgr: "systemsMgr",
textConfig: "textConfig"
} ]
}, {}, [ "addPropertySysConfig", "levelConfig", "levelSceneConfig", "mailConfig", "mailSysConfig", "sectionConfig", "signInSysConfig", "storyConfig", "textConfig", "use_reversed_rotateTo", "_mainSceneMgr", "bulletMgr", "redPointMgr", "guildNodeMgr", "helper", "levelAreaNodeMgr", "levelMgr", "dataMgr", "gestureMgr", "gloableConfig", "loginMgr", "networkMgr", "resMgr", "timerSystemsMgr", "loginSceneMgr", "levelNodeMgr", "mainSceneMgr", "preChallengeUIMgr", "selectSectionElementMgr", "selectSectionUIMgr", "selectedEffectMgr", "advertisMgr", "bgmMgr", "gameMgr", "globalRedPointMgr", "notificationMgr", "addPropertyNumSysMgr", "ensureSystem", "ensureSystemNodeMgr", "mailSysMailMgr", "mailSysMgr", "signInSysMgr", "storySysMgr", "systemsMgr", "welfarySysMgr", "targetMgr" ]);
//# sourceMappingURL=project.js.map
