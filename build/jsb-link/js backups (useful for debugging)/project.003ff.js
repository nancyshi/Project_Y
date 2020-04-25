window.__require = function e(t, i, n) {
function a(l, o) {
if (!i[l]) {
if (!t[l]) {
var s = l.split("/");
s = s[s.length - 1];
if (!t[s]) {
var g = "function" == typeof __require && __require;
if (!o && g) return g(s, !0);
if (h) return h(s, !0);
throw new Error("Cannot find module '" + l + "'");
}
}
var r = i[l] = {
exports: {}
};
t[l][0].call(r.exports, function(e) {
return a(t[l][1][e] || e);
}, r, r.exports, e, t, i, n);
}
return i[l].exports;
}
for (var h = "function" == typeof __require && __require, l = 0; l < n.length; l++) a(n[l]);
return a;
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
var t = this.challengeButton.getChildByName("physicalPowerLabel"), i = cc.find("Canvas/commentLabel"), n = this.challengeButton.getChildByName("physicalPower");
if (null == e) {
n.active = !1;
t.active = !1;
} else {
n.active = !0;
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
var n = this.node.getChildByName("mailButton");
n.on("click", function() {
e("systemsMgr").showSystem("mailSys");
});
n.getComponent("redPointMgr").redPointShowCondition = function() {
var t = e("dataMgr").playerData.mails, i = 0;
for (var n in t) {
0 == t[n].status && (i += 1);
}
return i > 0;
};
this.setupSection(this.playerData.currentSection);
},
start: function() {},
setupSection: function(t) {
var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
this.selectedLevel = null;
var n = e("sectionConfig")[t];
this.node.getChildByName("sectionTitleLabel").getComponent(cc.Label).string = n.sectionTitle;
this.node.getChildByName("sectionDescripLabel").getComponent(cc.Label).string = n.sectionDescrip;
var a = n.levels;
this.levelAresNodes = {};
for (var h in a) {
var l = parseInt(h) + 1;
1 == (l = l.toString()).length && (l = "0" + l);
var o = cc.instantiate(this.levelNodePrefab);
o.getComponent(cc.Label).string = l;
o.x = h % this.levelsHorNum * (this.levelsHorDis + o.width) + this.levelsStartPosition.x;
o.y = -Math.floor(h / this.levelsHorNum) * (this.levelsVerDis + o.width) + this.levelsStartPosition.y;
switch (this.checkLevelStatus(a[h])) {
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
o.getComponent("levelAreaNodeMgr").level = a[h];
this.levelAresNodes[a[h]] = o;
cc.find("Canvas/levelsArea").addChild(o);
}
var s = n.backgroundPath, g = this;
cc.loader.loadRes(s, cc.SpriteFrame, function(e, t) {
g.node.getChildByName("sectionBg").getComponent(cc.Sprite).spriteFrame = t;
i();
});
t == this.playerData.currentSection && (this.selectedLevel = this.playerData.currentLevel);
},
checkSectionStatus: function(e) {
var t = this.playerData.currentSection;
return e > t ? 0 : e < t ? 1 : e == t ? 2 : void 0;
},
checkLevelStatus: function(t) {
var i = e("sectionConfig"), n = function() {
for (var e in i) {
var n = i[e].levels;
for (var a in n) if (t == n[a]) return e;
}
return !1;
}();
if (0 == n) return !1;
n = parseInt(n);
switch (this.checkSectionStatus(n)) {
case 0:
return 0;

case 1:
return 1;

case 2:
var a = this.playerData.currentLevel;
if (a == t) return 2;
for (var h in e("sectionConfig")[n].levels) {
var l = e("sectionConfig")[n].levels[h];
if (l == t) return 1;
if (l == a) return 0;
}
}
},
onClickChallengeButton: function() {
var t = e("gameMgr");
this.challengeButton.getComponent(cc.Button).interactable = !1;
if (0 != this.physicalPowerForChallengeCost) {
var i = null, n = null;
if (null != this.physicalPowerForChallengeCost) {
if ((i = this.playerData.physicalPower - this.physicalPowerForChallengeCost) < 0) return;
var a = this.playerData.physicalPowerCostedFlag;
this.selectedLevel == this.playerData.currentLevel && 0 == this.playerData.physicalPowerCostedFlag && (a = 1);
n = {
physicalPower: i,
physicalPowerCostedFlag: a
};
}
if (null != this.heartForChallengeCost) {
if ((i = this.playerData.heart - this.heartForChallengeCost) < 0) return;
n = {
heart: i
};
}
var h = this;
e("dataMgr").commitPlayerDataToServer(n, function() {
if (null != h.physicalPowerForChallengeCost) {
h.playerData.physicalPower = i;
h.playerData.physicalPowerCostedFlag = a;
}
null != h.heartForChallengeCost && (h.playerData.heart = i);
t.enterLevelScene(h.selectedLevel);
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
var t = e("textConfig"), i = t.getTextByIdAndLanguageType(123), n = !0;
for (var a in this.addConfig) {
0 == n && (i += "，");
switch (a) {
case "physicalPower":
i += t.getTextByIdAndLanguageType(124) + this.addConfig[a].toString();
break;

case "heart":
i += t.getTextByIdAndLanguageType(125) + this.addConfig[a].toString();
}
n = !1;
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
for (var i in this.config) {
var n = e("dataMgr").playerData[i] + this.config[i];
t[i] = n;
}
if (Object.keys(t).length > 0) {
e("dataMgr").commitPlayerDataToServer(t, function() {
for (var i in t) e("dataMgr").playerData[i] = t[i];
});
}
}
});
cc._RF.pop();
}, {
addPropertySysConfig: "addPropertySysConfig",
advertisMgr: "advertisMgr",
dataMgr: "dataMgr",
systemsMgr: "systemsMgr",
textConfig: "textConfig"
} ],
addPropertySysConfig: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "45f0cLMfpZENYbF+crI7T9N", "addPropertySysConfig");
t.exports = {
1: {
physicalPower: 10
},
2: {
heart: 20
}
};
cc._RF.pop();
}, {} ],
advertisMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d2cc9xBWpRNy65AgLl//eBO", "advertisMgr");
var n = new (cc.Class({
extends: cc.Component,
properties: {
videoAd: null,
delegate: null,
wechatAdId: "xxxxx"
},
onVideoAdEnd: function() {
null != this.delegate && "function" == typeof this.delegate.onVideoAdEnd && this.delegate.onVideoAdEnd();
},
onVideoAdNotEnd: function() {
if (1 == (!(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0])) {
e("notificationMgr").showNoti("看完视频才能获得奖励哦~");
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
if (null == this.videoAd && cc.sys.platform == cc.sys.WECHAT_GAME) {
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
}
},
showVideoAd: function() {
if (cc.sys.platform == cc.sys.WECHAT_GAME) {
var e = this;
this.videoAd.load().then(function() {
e.videoAd.show();
}).catch(function(t) {
e.onVideoAdShowError(t);
});
}
}
}))();
t.exports = n;
cc._RF.pop();
}, {
notificationMgr: "notificationMgr"
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
var t = null, i = this.levelMgr.walls, n = this.helper.getDisToSelfBorder(this.node, e);
for (var a in i) {
var h = i[a], l = this.helper.getLinesOfOneNode(h);
for (var o in l) {
var s = l[o];
if (0 != (x = this.helper.isOneNodeWillCollidWithOneLineInDirection(this.node, s, e))) {
var g = this.disFromBorder + n;
if (null == t || x < t.dis + g) {
var r = this.helper.getSuitablePoint(cc.v2(this.node.x, this.node.y), x, g, e);
t = {
dis: cc.v2(r.x - this.node.x, r.y - this.node.y).mag(),
suitablePosition: r
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
var d = null;
for (var a in this.pathWaysNode.children) {
var c = this.pathWaysNode.children[a];
0 != this.helper.isTwoNodeCross(this.node, c) && (null != d && 1 != this._isPathNodeMoveDirection(c, e) || (d = c));
}
if (0 == this._isPathNodeMoveDirection(d, e)) return {
dis: 0,
suitablePosition: this.node.position
};
var y = this.helper.makeRay(this.node.position, 3e3, e), u = null, p = this.helper.getLinesOfOneNode(d);
for (var o in p) {
var x;
s = p[o];
"false" != (x = this.helper.rayTest(y, s)).toString() && (null == u || x > u) && (u = x);
}
null == u && (u = 5);
return {
suitablePosition: r = this.helper.getSuitablePoint(this.node.position, u, 0, e),
dis: x = cc.v2(r.x - this.node.x, r.y - this.node.y).mag()
};
}
},
getMaxDisFromPathNode: function(e, t) {
var i = this.helper.makeRay(this.node.position, 3e3, t), n = this.helper.makeRay(this.node.position, 3e3, cc.v2(-t.x, -t.y)), a = this.helper.getLinesOfOneNode(e), h = this, l = function(e) {
var t = null;
for (var i in a) {
var n = a[i], l = h.helper.rayTest(e, n);
if (0 != l) return l;
}
null == t && (t = 5);
return t;
}, o = l(i), s = l(n);
return o >= s ? o : s;
},
isPathNodeMoveDirection: function(e, t) {
var i = this.getMaxDisFromPathNode(e, t), n = t.rotate(Math.PI / 2);
return i > this.getMaxDisFromPathNode(e, n);
},
_isPathNodeMoveDirection: function(e, t) {
t.normalizeSelf();
var i = -e.angle * Math.PI / 180, n = cc.v2(1, 0).rotate(i);
return 1 == t.fuzzyEquals(n, .001) || 1 == t.fuzzyEquals(cc.v2(-n.x, -n.y), .001);
}
});
cc._RF.pop();
}, {
helper: "helper"
} ],
dataMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "0cd8087H/9I77MXIhlobXJP", "dataMgr");
var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = new (cc.Class({
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
return "object" === n(e[i]) ? new Proxy(e[i], t) : e[i];
},
set: function(t, i, n) {
t[i] = n;
e("globalRedPointMgr").setupRedPoints();
var a = e("systemsMgr").systems;
e("systemsMgr").systemsGloableDataMonitored(i, n);
for (var h in a) {
var l = a[h];
if (null != l.opendNode) {
null != (g = l.opendNode.getComponent(l.mgrName)) && "function" == typeof g.dataMonitored && g.dataMonitored(i, n);
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
var g;
null != (g = o.getChildByName("Canvas").getComponent(s)) && "function" == typeof g.dataMonitored && g.dataMonitored(i, n);
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
var i = e("networkMgr"), n = i.makeMessageObj("dataModule", "queryMessageType");
n.message.playerId = t;
var a = this;
n.successCallBack = function(e) {
var t = e.responseText;
"success" == (t = JSON.parse(t)).type && (a.playerData = t.playerData);
};
i.sendMessageByMsgObj(n);
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
var n = e("networkMgr"), a = n.makeMessageObj("dataModule", "commitMessageTyp");
a.message.playerId = this.playerData.id;
if (null != a.message.playerId) {
a.message.commitBody = t;
a.successCallBack = function(e) {
var t = e.responseText;
"commitSuccess" == (t = JSON.parse(t)).type && i();
};
n.sendMessageByMsgObj(a);
} else cc.log("no player data");
}
}))();
t.exports = a;
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
var n = new (cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {},
start: function() {},
create: function() {
var t = e("resMgr").reses.ensureSysPrefab;
return cc.instantiate(t);
}
}))();
t.exports = n;
cc._RF.pop();
}, {
resMgr: "resMgr"
} ],
gameMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "29a86GW8otIsI4PtNbaQyRE", "gameMgr");
var n = new (cc.Class({
extends: cc.Component,
properties: {},
start: function() {},
enterLevelScene: function(e) {
var t = this;
cc.director.preloadScene("levelScene", null, function(i, n) {
n.scene.getChildByName("Canvas").getComponent("levelMgr").level = e;
t.animatedToScene("levelScene");
});
},
_enterLevelScene: function(e) {
var t = e;
switch (t.toString().length) {
case 1:
t = "00" + t.toString();
break;

case 2:
t = "0" + t.toString();
}
var i = "level" + t, n = this;
cc.director.preloadScene(i, null, function(t, a) {
a.scene.getChildByName("Canvas").getComponent("levelMgr").level = e;
n.animatedToScene(i);
});
},
animatedToScene: function(e) {
var t = cc.director.getScene();
cc.tween(t.children[0]).to(.5, {
opacity: 0
}).delay(1).call(function() {
cc.director.preloadScene(e, null, function(t, i) {
var n = i.scene;
n.children[0].opacity = 0;
cc.director.loadScene(e, function() {
cc.tween(n.children[0]).to(.5, {
opacity: 255
}).start();
});
});
}).start();
},
_generateLevelSceneConfig: function() {
var t = e("levelConfig"), i = {}, n = 0, a = function(n) {
if (n == Object.keys(t).length) {
var a = e("networkMgr"), h = a.makeMessageObj("helperModule", "generateLevelConfigFileMessageType");
h.message.data = i;
a.sendMessageByMsgObj(h);
}
};
for (var h in Object.keys(t)) {
var l = Object.keys(t)[h];
(function(e, t) {
cc.director.preloadScene(e, null, function(h, l) {
cc.log("preload scene: " + e);
var o = l.scene.children[0], s = {}, g = function(e) {
var t = {};
t.x = e.x;
t.y = e.y;
t.width = e.width;
t.height = e.height;
t.angle = e.angle;
return t;
}, r = o.getChildByName("fillNodes"), d = [];
cc.log("setup fillNodes");
for (var c in r.children) {
var y = g(r.children[c]);
d.push(y);
}
s.fillNodes = d;
var u = o.getChildByName("walls"), p = [];
cc.log("setup walls");
for (var c in u.children) {
var x = g(u.children[c]);
p.push(x);
}
s.walls = p;
var m = o.getChildByName("targets"), w = [];
cc.log("setup targets");
for (var c in m.children) {
var f = g(m.children[c]);
w.push(f);
}
s.targets = w;
var v = o.getChildByName("pathWaysNode"), N = [];
cc.log("setup pathWaysNode");
for (var c in v.children) {
var C = v.children[c], S = {};
S.name = C.name;
S.children = [];
for (var b in C.children) {
var M = g(C.children[b]);
S.children.push(M);
}
N.push(S);
}
s.pathWaysNode = N;
var T = o.getChildByName("bullets"), P = [];
cc.log("setup bullets");
for (var c in T.children) {
var B = T.children[c], I = {}, _ = g(B);
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
a(n += 1);
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
}(l), l);
}
}
}))();
t.exports = n;
cc._RF.pop();
}, {
levelConfig: "levelConfig",
networkMgr: "networkMgr"
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
var t = e.getDelta(), i = -1 * t.x, n = -1 * t.y;
i *= this.dragSpeed;
n *= this.dragSpeed;
var a = this.camaraNode.getComponent(cc.Camera), h = cc.find("Canvas"), l = this.camaraNode.x + i, o = this.camaraNode.y + n, s = l + h.width / 2 * (1 / a.zoomRatio), g = l - h.width / 2 * (1 / a.zoomRatio), r = o + h.height / 2 * (1 / a.zoomRatio), d = o - h.height / 2 * (1 / a.zoomRatio);
s <= this.maxBoundX && g >= this.minBoundX && (this.camaraNode.x = l);
r <= this.maxBoundY && d >= this.minBoundY && (this.camaraNode.y = o);
}
if (1 == this.isZoomEnable && 2 == this.touches.length) {
var c = this.touches[0], y = this.touches[1], u = c.getLocation(), p = y.getLocation(), x = this.distanceOfTwoVector(u, p), m = c.getPreviousLocation(), w = y.getPreviousLocation(), f = x - this.distanceOfTwoVector(m, w), v = (a = this.camaraNode.getComponent(cc.Camera)).zoomRatio + this.zoomRatio * f;
v >= minZoomRatio && v <= maxZoomRatio && (a.zoomRatio = v);
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
var n = new (cc.Class({
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
}
};
}
}
}
}))();
t.exports = n;
cc._RF.pop();
}, {} ],
globalRedPointMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d895aDdCFhBNIuhwEdMtJNe", "globalRedPointMgr");
var n = cc.Class({
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
for (var n in i.children) {
var a = i.children[n], h = a.getComponent("redPointMgr");
null != h && e.currentRedPointMgrs.push(h);
t(a);
}
})(cc.director.getScene().getChildByName("Canvas"));
}
});
t.exports = new n();
cc._RF.pop();
}, {} ],
helper: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "08b56AlCIJMzL7NY0hkRsv7", "helper");
var n = cc.Class({
properties: {},
segmentsIntr: function(e, t, i, n) {
var a = (t.y - e.y) * (n.x - i.x) - (e.x - t.x) * (i.y - n.y);
if (0 == a) return !1;
var h = ((t.x - e.x) * (n.x - i.x) * (i.y - e.y) + (t.y - e.y) * (n.x - i.x) * e.x - (n.y - i.y) * (t.x - e.x) * i.x) / a, l = -((t.y - e.y) * (n.y - i.y) * (i.x - e.x) + (t.x - e.x) * (n.y - i.y) * e.y - (n.x - i.x) * (t.y - e.y) * i.y) / a;
return this.similarMinus(h, e.x) * this.similarMinus(h, t.x) <= 0 && this.similarMinus(l, e.y) * this.similarMinus(l, t.y) <= 0 && this.similarMinus(h, i.x) * this.similarMinus(h, n.x) <= 0 && this.similarMinus(l, i.y) * this.similarMinus(l, n.y) <= 0 && {
x: h,
y: l
};
},
rotateSegment: function(e, t, i, n) {
return {
p1: this.rotateOnePoint(e, i, n),
p2: this.rotateOnePoint(t, i, n)
};
},
rotateOnePoint: function(e, t, i) {
var n = i * Math.PI / 180, a = cc.v2(e.x - t.x, e.y - t.y).rotate(n);
return cc.v2(a.x + t.x, a.y + t.y);
},
rayTest: function(e, t) {
var i = this.segmentsIntr(e.p1, e.p2, t.p1, t.p2);
return 0 != i && cc.v2(i.x - e.p1.x, i.y - e.p1.y).mag();
},
getSuitablePoint: function(e, t, i, n) {
if (i >= t) return e;
n.normalizeSelf();
var a = t * n.x, h = t * n.y, l = (t - i) / t, o = e.x + l * a, s = e.y + l * h;
return cc.v2(o, s);
},
makeRay: function(e, t, i) {
var n = {
p1: e,
p2: null
};
1 != i.mag() && i.normalizeSelf();
var a = i.x * t, h = i.y * t, l = e.x + a, o = e.y + h;
n.p2 = cc.v2(l, o);
return n;
},
getLinesOfOneNode: function(e) {
var t = e.height / 2, i = cc.v2(e.x - e.width / 2, e.y - t), n = cc.v2(e.x + e.width / 2, e.y - t), a = cc.v2(i.x, i.y + e.height), h = cc.v2(n.x, n.y + e.height), l = cc.v2(e.x - e.width / 2, e.y + e.height / 2), o = cc.v2(l.x, l.y - e.height), s = cc.v2(e.x + e.width / 2, e.y + e.height / 2), g = cc.v2(s.x, s.y - e.height), r = {
p1: i,
p2: n
}, d = {
p1: a,
p2: h
}, c = {
p1: l,
p2: o
}, y = {
p1: s,
p2: g
};
if (null != e.angle && void 0 != e.angle) {
r = this.rotateSegment(i, n, cc.v2(e.x, e.y), -e.angle);
d = this.rotateSegment(a, h, cc.v2(e.x, e.y), -e.angle);
c = this.rotateSegment(l, o, cc.v2(e.x, e.y), -e.angle);
y = this.rotateSegment(s, g, cc.v2(e.x, e.y), -e.angle);
}
var u = {
lowerLine: r,
upperLine: d,
leftLine: c,
rightLine: y
};
null != r && null != d && null != c && null != y || cc.error("NOT INVALID LINES");
return u;
},
isTwoNodeCross: function(e, t) {
var i = this.getInfoOfOneNode(e), n = this.getInfoOfOneNode(t);
return !(i.minY > n.maxY || n.minY > i.maxY || i.minX > n.maxX || n.minX > i.maxX);
},
getInfoOfOneNode: function(e) {
var t = cc.v2(e.x - e.width / 2, e.y + e.height / 2), i = cc.v2(e.x + e.width / 2, t.y), n = cc.v2(t.x, e.y - e.height / 2), a = cc.v2(i.x, n.y);
if (null != e.angle && void 0 != e.angle) {
t = this.rotateOnePoint(t, cc.v2(e.x, e.y), -e.angle);
i = this.rotateOnePoint(i, cc.v2(e.x, e.y), -e.angle);
n = this.rotateOnePoint(n, cc.v2(e.x, e.y), -e.angle);
a = this.rotateOnePoint(a, cc.v2(e.x, e.y), -e.angle);
}
var h = t.x, l = a.x, o = n.y, s = i.y, g = [ t, n, i, a ];
for (var r in g) {
var d = g[r];
h > d.x && (h = d.x);
l < d.x && (l = d.x);
o > d.y && (o = d.y);
s < d.y && (s = d.y);
}
return {
minX: h,
minY: o,
maxX: l,
maxY: s
};
},
getDisToSelfBorder: function(e, t) {
var i = this.makeRay(cc.v2(e.x, e.y), 1e3, t), n = this.getLinesOfOneNode(e);
for (var a in n) {
var h = n[a], l = this.rayTest(i, h);
if (0 != l) return l;
}
},
getPointsOfOneNode: function(e) {
var t = cc.v2(e.x - e.width / 2, e.y + e.height / 2), i = cc.v2(e.x + e.width / 2, t.y), n = cc.v2(t.x, e.y - e.height / 2), a = cc.v2(i.x, n.y);
if (null != e.angle && void 0 != e.angle) {
t = this.rotateOnePoint(t, cc.v2(e.x, e.y), -e.angle);
i = this.rotateOnePoint(i, cc.v2(e.x, e.y), -e.angle);
n = this.rotateOnePoint(n, cc.v2(e.x, e.y), -e.angle);
a = this.rotateOnePoint(a, cc.v2(e.x, e.y), -e.angle);
}
return {
leftUpPoint: t,
leftDownPoint: n,
rightUpPoint: i,
rightDownPoint: a
};
},
isOneNodeWillCollidWithOneLineInDirection: function(e, t, i) {
var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 3e3, a = this.getPointsOfOneNode(e), h = [];
for (var l in a) {
var o = a[l], s = this.makeRay(o, n, i);
h.push(s);
}
var g = null, r = null, d = null, c = null;
for (var y in h) {
var u = h[y], p = u.p1.x, x = u.p2.x;
if (p > u.p2.x) {
p = u.p2.x;
x = u.p1.x;
}
var m = u.p1.y, w = u.p2.y;
if (m > u.p2.y) {
m = u.p2.y;
w = u.p1.y;
}
if (null == g) {
g = p;
d = x;
} else {
g > p && (g = p);
d < x && (d = x);
}
if (null == r) {
r = m;
c = w;
} else {
r > m && (r = m);
c < w && (c = w);
}
}
var f = t.p1.x, v = t.p2.x, N = t.p1.y, C = t.p2.y;
if (f > t.p2.x) {
f = t.p2.x;
v = t.p1.x;
}
if (N > t.p2.y) {
N = t.p2.y;
C = t.p1.y;
}
if (r >= C || c <= N || g >= v || d <= f) return !1;
var S = cc.v2(t.p2.x - t.p1.x, t.p2.y - t.p1.y);
S.normalizeSelf();
var b = this.makeRay(t.p2, 3e3, S).p2, M = {
p1: this.makeRay(t.p1, 3e3, cc.v2(-S.x, -S.y)).p2,
p2: b
}, T = this.makeRay(cc.v2(e.x, e.y), 3e3, i), P = this.rayTest(T, M);
return 0 != P && P;
},
isTwoPositionSimilarEqual: function(e, t) {
var i = t.x - e.x, n = t.y - e.y;
return !(-.01 > i || .01 < i) && !(-.01 > n || .01 < n);
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
t.exports = n;
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
physicalPowerCost: 2,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
2: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
3: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
4: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
5: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
6: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
7: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
8: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
9: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
10: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
11: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
12: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
13: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
14: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
15: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
16: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
17: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
18: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
19: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
20: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
21: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
22: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
23: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
24: {
physicalPowerCost: 3,
heartForRetryCost: 2,
desTextId: 101,
bgmPath: "musics/bgm_001"
},
25: {
physicalPowerCost: 3,
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
var n = this;
cc.loader.loadRes("effectSounds/hit", function(e, t) {
n.soundEffect = t;
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
var n = cc.find("Canvas/fillNodes").getComponent(cc.Graphics), a = null, h = cc.find("Canvas/fillNodes").children;
if (0 != h.length) {
for (var l in h) {
var o = h[l];
if (null == a) {
n.moveTo(o.x, o.y);
a = o;
}
n.lineTo(o.x, o.y);
}
n.close();
n.stroke();
n.fill();
var s = this.node.getChildByName("uiNode").getChildByName("minStepNumLabel"), g = "minStep_level_" + this.level.toString(), r = e("dataMgr").playerData.minSteps[g];
null != r && void 0 != r || (r = e("textConfig").getTextByIdAndLanguageType(155));
s.getComponent(cc.Label).string = e("textConfig").getFormatedString(153, [ r.toString() ]);
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
var n = this.getPossiableDirection(i);
if (-1 != n) {
null == this.directionTryto && (this.directionTryto = n);
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
var n = this.bullets[t], a = (g = n.getComponent("bulletMgr")).getNearestWallInfo(e), h = {
x: a.suitablePosition.x,
y: a.suitablePosition.y,
width: n.width,
height: n.height,
dis: a.dis,
originNode: n
};
i.push(h);
}
for (var l = 100; 0 == this.resolveShadows(i, e) && !(l <= 0); ) l -= 1;
var o = !1;
for (var t in i) {
var s = (h = i[t]).originNode;
if (1 != this.helper.isTwoPositionSimilarEqual(cc.v2(h.x, h.y), cc.v2(s.x, s.y))) {
var g;
(g = s.getComponent("bulletMgr")).targetPosition = cc.v2(h.x, h.y);
g.movingDirection = e;
g.movingDirection.normalizeSelf();
if (null != g.movingTime) {
var r = cc.v2(g.targetPosition.x - s.x, g.targetPosition.y - s.y).mag() / g.movingTime;
g.vx = r * g.movingDirection.x;
g.vy = r * g.movingDirection.y;
} else {
g.vx = g.movingDirection.x * g.movingSpeed;
g.vy = g.movingDirection.y * g.movingSpeed;
}
g.status = 1;
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
var t = e("sectionConfig")[this.playerData.currentSection].levels, i = t.indexOf(this.playerData.currentLevel), n = null, a = null, h = null;
if (i < t.length - 1) n = t[i += 1]; else {
a = this.playerData.currentSection + 1;
var l = e("sectionConfig")[a].levels;
n = l[0];
}
h = null == a ? {
currentLevel: n
} : {
currentSection: a,
currentLevel: n
};
this.level == e("dataMgr").playerData.currentLevel && (h.physicalPowerCostedFlag = 0);
var o = "minStep_level_" + this.level.toString(), s = e("dataMgr").playerData.minSteps[o];
if (null == s || void 0 == s || this.currentStepNum < s) {
h.minSteps = {};
h.minSteps[o] = this.currentStepNum;
}
h.preLevel = this.level;
var g = this;
e("dataMgr").commitPlayerDataToServer(h, function() {
null != a && (g.playerData.currentSection = a);
null != h.minSteps && void 0 != h.minSteps && (e("dataMgr").playerData.minSteps[o] = g.currentStepNum);
g.playerData.currentLevel = n;
g.playerData.physicalPowerCostedFlag = 0;
g.playerData.preLevel = g.level;
e("gameMgr").animatedToScene("mainScene");
});
},
resolveShadows: function(e, t) {
for (var i in e) {
var n = e[i];
for (var a in e) {
var h = e[a];
if (n != h) {
var l = this._selectStaticShadowAndShaodwForResolved(n, h, t);
if (0 != l) {
var o = l.staticShadow, s = l.shadowForResolved, g = this.helper.getLinesOfOneNode(o), r = null, d = this.helper.makeRay(cc.v2(o.x, o.y), 1e3, cc.v2(-t.x, -t.y));
for (var c in g) {
var y = g[c];
if (0 != this.helper.rayTest(d, y)) {
r = y;
break;
}
}
var u = this.helper.makeRay(r.p2, 1e3, cc.v2(r.p2.x - r.p1.x, r.p2.y - r.p1.y)).p2;
r = {
p1: this.helper.makeRay(r.p1, 1e3, cc.v2(r.p1.x - r.p2.x, r.p1.y - r.p2.y)).p2,
p2: u
};
var p = this.helper.makeRay(s.originNode.position, 3e3, t), x = this.helper.rayTest(p, r), m = this.helper.getDisToSelfBorder(s.originNode, t) + s.originNode.getComponent("bulletMgr").disFromBorder, w = this.helper.getSuitablePoint(s.originNode.position, x, m, t), f = cc.v2(w.x - s.originNode.x, w.y - s.originNode.y).mag();
s.x = w.x;
s.y = w.y;
s.dis = f;
return !1;
}
}
}
}
return !0;
},
_selectStaticShadowAndShaodwForResolved: function(e, t, i) {
var n = this, a = function(e, t) {
var a = e.dis, h = !1, l = !1, o = n.helper.getLinesOfOneNode(t);
for (var s in o) {
var g = o[s];
if (0 != n.helper.isOneNodeWillCollidWithOneLineInDirection(e.originNode, g, i, a)) {
h = !0;
break;
}
}
if (0 == h) return !1;
var r = n.helper.getLinesOfOneNode(t.originNode);
for (var s in r) {
g = r[s];
if (0 != n.helper.isOneNodeWillCollidWithOneLineInDirection(e.originNode, g, i, a)) {
l = !0;
break;
}
}
return 0 != l;
};
if (1 == a(e, t)) {
return {
staticShadow: t,
shadowForResolved: e
};
}
if (1 == a(t, e)) {
return {
staticShadow: e,
shadowForResolved: t
};
}
return !1;
},
generateWalls: function() {
var t = e("levelConfig")[this.level], i = cc.find("Canvas/walls");
for (var n in t.wallPathes) {
var a = t.wallPathes[n], h = a.points, l = [];
for (var o in h) {
var s = null;
if (0 == o) s = cc.v2(h[o].x, h[o].y); else {
var g = h[o];
s = cc.v2(l[o - 1].x + g.x, l[o - 1].y + g.y);
}
l.push(s);
}
var r = a.lineWidth, d = a.offset, c = [];
if (1 == a.isClosed) {
var y = l[0];
l.push(y);
}
for (var o in l) if (0 != o) {
var u = cc.instantiate(this.linePrefab);
u.height = r;
var p = cc.v2(l[o].x - l[o - 1].x, l[o].y - l[o - 1].y);
u.width = p.mag();
var x = p.signAngle(cc.v2(1, 0)) / Math.PI * 180;
u.angle = -x;
u.x = l[o].x - p.x / 2;
u.y = l[o].y - p.y / 2;
var m = p.rotate(Math.PI / 2);
m.normalizeSelf();
u.x += u.height / 2 * m.x;
u.y += u.height / 2 * m.y;
u.x += d.x;
u.y += d.y;
c.push(u);
i.addChild(u);
}
}
var w = t.bullets, f = cc.find("Canvas/bullets");
for (var n in w) {
var v = w[n], N = cc.instantiate(this.bulletPrefab);
N.x = v.x;
N.y = v.y;
N.width = N.width * v.scale;
N.height = N.height * v.scale;
f.addChild(N);
}
},
onClickRetryButton: function() {
var t = e("gameMgr");
if (0 != this.heartForRetryCost) {
var i = this.playerData.heart - this.heartForRetryCost;
if (!(i < 0)) {
var n = {
heart: i
}, a = this;
this.retryButton.getComponent(cc.Button).interactable = !1;
e("dataMgr").commitPlayerDataToServer(n, function() {
a.playerData.heart = i;
t.enterLevelScene(a.level);
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
var t = e("resMgr").reses.wallPrefab, i = e("resMgr").reses.bulletPrefab, n = e("resMgr").reses.targetPrefab, a = e("resMgr").reses.pathWayPrefab, h = e("levelSceneConfig")[this.level];
this._setupFillNodes(h);
this._setupWalls(h, t);
this._setupTargets(h, n);
this._setupPathWaysNode(h, a);
this._setupBullets(h, i);
},
_setupNodePropertyByConfig: function(e, t) {
for (var i in t) e[i] = t[i];
},
_setupFillNodes: function(e) {
var t = e.fillNodes, i = cc.find("Canvas/fillNodes");
for (var n in t) {
var a = t[n], h = new cc.Node();
this._setupNodePropertyByConfig(h, a);
i.addChild(h);
}
},
_setupWalls: function(e, t) {
var i = e.walls, n = cc.find("Canvas/walls");
for (var a in i) {
var h = i[a], l = cc.instantiate(t);
this._setupNodePropertyByConfig(l, h);
n.addChild(l);
}
},
_setupTargets: function(e, t) {
var i = e.targets, n = cc.find("Canvas/targets");
for (var a in i) {
var h = i[a], l = cc.instantiate(t);
this._setupNodePropertyByConfig(l, h);
n.addChild(l);
}
},
_setupPathWaysNode: function(e, t) {
var i = e.pathWaysNode, n = cc.find("Canvas/pathWaysNode");
for (var a in i) {
var h = i[a], l = new cc.Node(h.name);
for (var a in h.children) {
var o = h.children[a], s = cc.instantiate(t);
this._setupNodePropertyByConfig(s, o);
l.addChild(s);
}
n.addChild(l);
}
},
_setupBullets: function(e, t) {
var i = e.bullets, n = cc.find("Canvas/bullets");
for (var a in i) {
var h = i[a], l = cc.instantiate(t), o = h.basic, s = h.mgr, g = l.getComponent("bulletMgr");
g.bulletType = s.bulletType;
2 == s.bulletType && (l.getComponent(cc.Sprite).spriteFrame = g.sliderFrame);
this._setupNodePropertyByConfig(l, o);
if (2 == g.bulletType && "" != s.pathWaysNodeName && null != s.pathWaysNodeName) {
var r = "Canvas/pathWaysNode/" + s.pathWaysNodeName, d = cc.find(r);
g.pathWaysNode = d;
}
n.addChild(l);
}
},
dataMonitored: function(t, i) {
if (-1 != t.indexOf("minStep_level_")) {
var n = t.slice(14);
if (parseInt(n) == parseInt(this.level)) {
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
this.setupMailTag();
},
start: function() {},
onClick: function() {
0 != this.status && this.openPreChanllengeUI();
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
var t = e("mailSysConfig"), i = !1, n = !1;
for (var a in t) {
var h = t[a].conditions;
for (var l in h) {
var o = h[l], s = o.conditionType, g = o.conditionPara;
if (1 == s) {
if (g == this.level) {
i = !0;
var r = e("dataMgr").playerData.mailConditionIndex[a];
2 == this.level && cc.log(l, r);
(l < r || -1 == r) && (n = !0);
return [ i, n ];
}
} else if (2 == s) {
g.levelId == this.level && (i = !0);
(l < (r = e("dataMgr").playerData.mailConditionIndex[a]) || -1 == r) && (n = !0);
return [ i, n ];
}
}
}
return !1;
},
dataMonitored: function(t, i) {
var n = e("mailConfig");
-1 != Object.keys(n).indexOf(t) && this.setupMailTag();
}
});
cc._RF.pop();
}, {
dataMgr: "dataMgr",
mailConfig: "mailConfig",
mailSysConfig: "mailSysConfig"
} ],
levelSceneConfig: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "32cc930TbVCP6zdMVgYejeo", "levelSceneConfig");
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
pathWaysNodeName: "pathWay01"
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
pathWaysNodeName: "pathWay"
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
}
};
cc._RF.pop();
}, {} ],
loginMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d733bkMuPVAjJrq/tbVsVhw", "loginMgr");
var n = new (cc.Class({
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
var i = e("networkMgr"), n = i.makeMessageObj("loginModule", "loginMessageType");
n.message.codeType = t;
var a = !1;
switch (t) {
case this.LoginType.ACCOUNT:
break;

case this.LoginType.WE_CHAT_GAME:
a = !0;
var h = this;
wx.login({
success: function(e) {
var t = e.code;
if (null != t) {
n.message.code = t;
n.successCallBack = function(e) {
var t = e.responseText;
if ("login_success" == (t = JSON.parse(t)).type) {
var i = t.playerId;
h.playerId = i;
} else t.type;
};
i.sendMessageByMsgObj(n);
}
}
});
break;

case this.LoginType.DEVICE_ID:
var l = cc.sys.localStorage.getItem("deviceId");
if (null == l) {
var o = this._genarateUUID();
cc.sys.localStorage.setItem("deviceId", o);
l = o;
}
n.message.code = l;
break;

default:
cc.log("Login type erro: now it's " + t);
}
if (1 != a) {
h = this;
n.successCallBack = function(e) {
var t = e.responseText;
if ("login_success" == (t = JSON.parse(t)).type) {
var i = t.playerId;
h.playerId = i;
} else t.type;
};
i.sendMessageByMsgObj(n);
}
}
}))();
t.exports = n;
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
e("networkMgr").startHeartBeat();
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
var e = cc.find("Canvas/loginInfo");
e.getChildByName("textNode").getComponent(cc.Label).string = "连接服务器失败，请点击重试";
e.active = !0;
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
var t = e("textConfig"), i = e("mailConfig")[this.mailId], n = this.node.getChildByName("others").getChildByName("contentSection").getChildByName("view").getChildByName("content"), a = n.getChildByName("titleLabel"), h = n.getChildByName("contentLabel");
a.getComponent(cc.Label).string = t.getTextByIdAndLanguageType(i.titleTextId);
h.getComponent(cc.Label).string = t.getTextByIdAndLanguageType(i.contentTextId);
n.height = -h.y + h.height;
},
setupOptionSection: function() {
var t = e("textConfig"), i = this.node.getChildByName("others").getChildByName("optionSection"), n = e("mailConfig")[this.mailId], a = n.options;
if (0 == (n = e("dataMgr").playerData.mails[this.mailId]).status) {
if (0 == a.length) {
(y = cc.instantiate(this.mailOptionNodePrefab)).getChildByName("label").getComponent(cc.Label).string = t.getTextByIdAndLanguageType(147);
var h = y.getChildByName("bg");
y.width = h.width;
y.height = h.height;
i.height += y.height;
var l = this;
y.on("click", function() {
l.relatedMailSysMgr.setOneMailReaded(l.mailId, -1, function() {
l.close();
}, l.relatedMailSectionNode);
});
y.y = -(i.height - y.height);
i.addChild(y);
return;
}
for (var o in a) {
var s = a[o];
(r = (g = cc.instantiate(this.mailOptionNodePrefab)).getChildByName("label")).getComponent(cc.Label).string = t.getTextByIdAndLanguageType(s.showTextId);
(d = g.getChildByName("bg")).height = r.height;
g.width = d.width;
g.height = d.height;
i.height += 0 == o ? g.height : g.height + this.disOfOptionNodes;
g.y = -(i.height - g.height);
l = this;
(function(t, i, a, h) {
t.on("click", function() {
l.relatedMailSysMgr.setOneMailReaded(l.mailId, h, function() {
if (1 == i) l.close(); else if (2 == i) {
e("systemsMgr").mailSysGloableSendOneMail(a.mailId, n.tag, function() {}, a.delay);
l.close();
}
}, l.relatedMailSectionNode);
});
})(g, s.operationType, s.operationPara, o);
i.addChild(g);
}
} else if (1 == n.status) if (-1 != n.selectedOptionIndex) {
var g, r, d, c = a[n.selectedOptionIndex];
(r = (g = cc.instantiate(this.mailOptionNodePrefab)).getChildByName("label")).getComponent(cc.Label).string = t.getTextByIdAndLanguageType(c.showTextId);
r.color = cc.color(255, 255, 255);
(d = g.getChildByName("bg_readed")).active = !0;
d.height = r.height;
g.width = d.width;
g.height = d.height;
i.height += g.height;
g.getComponent(cc.Button).interactable = !1;
g.y = -(i.height - g.height);
i.addChild(g);
(y = cc.instantiate(this.mailOptionNodePrefab)).getChildByName("label").getComponent(cc.Label).string = t.getTextByIdAndLanguageType(147);
h = y.getChildByName("bg");
y.width = h.width;
y.height = h.height;
i.height += y.height + this.disOfOptionNodes;
l = this;
y.on("click", function() {
l.close();
});
y.y = -(i.height - y.height);
i.addChild(y);
} else {
var y;
(y = cc.instantiate(this.mailOptionNodePrefab)).getChildByName("label").getComponent(cc.Label).string = t.getTextByIdAndLanguageType(147);
h = y.getChildByName("bg");
y.width = h.width;
y.height = h.height;
i.height += y.height;
l = this;
y.on("click", function() {
l.close();
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
this.setupData();
this.setupUI();
},
start: function() {},
setupTagSection: function() {
var t = e("textConfig");
for (var i in this.tags) {
var n = this.tags[i], a = e("mailSysConfig")[n].tagNameTextId;
a = t.getTextByIdAndLanguageType(a);
var h = cc.instantiate(this.tagSectionPrefab);
h.getComponent(cc.Label).string = a;
h.getComponent(cc.Label)._forceUpdateRenderData();
var l = this;
(function(t, i) {
t.on("click", function() {
l.selectedTag != i && (l.selectedTag = i);
l.selectedTagNode != t && (l.selectedTagNode = t);
});
t.getComponent("redPointMgr").redPointShowCondition = function() {
var t = e("dataMgr").playerData.mails, n = 0;
for (var a in t) {
var h = t[a];
h.tag == i && 0 == h.status && (n += 1);
}
return n > 0;
};
})(h, n);
h.y = this.tagSectionStartY - i * this.tagSectionDis;
h.name = n;
this.tagSection.addChild(h, 1);
if (0 == i) {
this.selectedTag = n;
this.selectedTagNode = h;
}
}
},
setupMailSection: function() {
var t = e("textConfig"), i = this.mailsByTag[this.selectedTag], n = Object.keys(i);
this.mailSectionContentNode.destroyAllChildren();
if (0 != n.length) {
this.mailSectionEmptyLabelNode.active = !1;
var a = this;
n = n.sort(function(e, t) {
var i = a.mailsByTag[a.selectedTag][e], n = a.mailsByTag[a.selectedTag][t];
return 0 == i.status && 1 == n.status ? -1 : 1 == i.status && 0 == n.status ? 1 : i.timeStamp < n.timeStamp ? 1 : -1;
});
var h = e("mailConfig"), l = 0;
for (var o in n) {
var s = n[o], g = e("dataMgr").playerData.mails[s], r = cc.instantiate(this.mailSectionPrefab), d = r.getChildByName("icon_unread"), c = r.getChildByName("icon_readed"), y = r.getChildByName("titleLabel"), u = r.getChildByName("seperateLine");
if (1 == g.status) {
d.active = !1;
c.active = !0;
y.color = this.mailSectionNodeReadedColor;
}
var p = t.getTextByIdAndLanguageType(h[s].titleTextId);
y.getComponent(cc.Label).string = p;
u.y = -y.height;
r.y = -l;
var x = y.x + y.width / 2 - (d.x - d.width / 2), m = y.height;
r.width = x;
r.height = m;
r.name = s.toString();
l = l + y.height + 2;
o != n.length - 1 && (l += this.mailSectionNodeDis);
a = this;
(function(e, t) {
e.on("click", function() {
a.openOneMail(t, e);
});
})(r, s);
this.mailSectionContentNode.addChild(r);
}
l > this.mailSectionContentNode.height && (this.mailSectionContentNode.height = l);
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
var n = e("dataMgr").playerData.mailConditionIndex[this.selectedTag];
if (-1 != n) {
var a = e("mailSysConfig")[this.selectedTag].conditions[n];
if (1 == a.conditionType) {
var h = a.conditionPara;
if (0 != (s = this._getSectionAndLevelNumOfSection(h))) {
var l = s[0], o = s[1];
i = t.getFormatedString(131, [ l.toString(), o.toString() ]);
this.notiSection.getChildByName("notiLabel").getComponent(cc.Label).string = i;
}
} else if (2 == a.conditionType) {
var s, g = a.conditionPara.levelId, r = a.conditionPara.minStepNum;
if (0 != (s = this._getSectionAndLevelNumOfSection(g))) {
l = s[0], h = s[1], i = t.getFormatedString(132, [ l.toString(), h.toString(), r.toString() ]);
this.notiSection.getChildByName("notiLabel").getComponent(cc.Label).string = i;
}
}
} else this.notiSection.getChildByName("notiLabel").getComponent(cc.Label).string = t.getTextByIdAndLanguageType(130);
}
},
_getSectionAndLevelNumOfSection: function(t) {
var i = e("sectionConfig");
for (var n in i) {
var a = i[n].levels.indexOf(t);
if (-1 != a) return [ n, a + 1 ];
}
return !1;
},
setupData: function() {
var t = e("dataMgr").playerData.mails;
this.tags = Object.keys(e("mailSysConfig"));
for (var i in this.tags) {
var n = this.tags[i];
this.mailsByTag[n] = {};
this.unReadedMailNums[n] = 0;
for (var a in t) {
var h = t[a];
if (h.tag == n) {
this.mailsByTag[n][a] = h;
0 == h.stauts && (this.unReadedMailNums[n] += 1);
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
var i = cc.instantiate(this.opendMailPrefab), n = i.getComponent("mailSysMailMgr");
n.mailId = e;
n.relatedMailSectionNode = t;
n.relatedMailSysMgr = this;
this.node.addChild(i);
},
setOneMailReaded: function(t, i) {
var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {}, a = arguments[3], h = e("dataMgr").playerData.mails[t];
if (1 != h.status) {
var l = e("networkMgr"), o = l.makeMessageObj("mailModule", "readMailMessageType");
o.message.playerId = e("dataMgr").playerData.id;
o.message.mailId = t;
o.message.selectedOptionIndex = i;
var s = this;
o.successCallBack = function(e) {
var t = e.responseText;
if ("success" == (t = JSON.parse(t)).type) {
h.status = 1;
h.selectedOptionIndex = i;
a.getChildByName("icon_readed").active = !0;
a.getChildByName("icon_unread").active = !1;
a.getChildByName("titleLabel").color = s.mailSectionNodeReadedColor;
s.unReadedMailNums[h.tag] -= 1;
s.setupNotiSection();
n();
}
};
l.sendMessageByMsgObj(o);
} else cc.log("this mail is already readed");
},
dataMonitored: function(t, i) {
var n = e("mailConfig");
if (-1 != Object.keys(n).indexOf(t)) {
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
levelNodeStartPosition: cc.v2(0, 0),
levelNodesHorDis: 10,
levelNodesVerDis: 20,
levelNodesNumPerLine: 4,
rotaedCopiedRadius: 300,
isShowingNoti: !1
},
onLoad: function() {
this.setupData();
this.setupUI();
this.playBgm();
this.rotaedCopiedRadius = 500;
},
start: function() {},
playBgm: function() {
var t = e("sectionConfig")[this.selectedSection].bgmPath;
cc.loader.loadRes(t, function(e, t) {
cc.audioEngine.stopAll();
cc.audioEngine.play(t, !0, 1);
});
},
setupUI: function() {
this.heartLabelNode.getComponent(cc.Label).string = e("dataMgr").playerData.heart.toString();
this.physicalLabelNode.getComponent(cc.Label).string = e("dataMgr").playerData.physicalPower.toString();
var t = e("systemsMgr");
this.mailSysButtonNode.on("click", function() {
t.showSystem("mailSys");
});
this.mailSysButtonNode.getComponent("redPointMgr").redPointShowCondition = function() {
var t = e("dataMgr").playerData.mails, i = 0;
for (var n in t) {
0 == t[n].status && (i += 1);
}
return i > 0;
};
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
this.setupSectionPerformance();
},
setupData: function() {
this.selectedSection = e("dataMgr").playerData.currentSection;
},
setupSectionPerformance: function() {
if (null != this.selectedSection) {
var t = e("textConfig");
this.levelNodes.destroyAllChildren();
this.levelNodes.removeAllChildren();
this.connectLineNodes.destroyAllChildren();
this.connectLineNodes.removeAllChildren();
var i = e("sectionConfig")[this.selectedSection], n = t.getTextByIdAndLanguageType(i.sectionTitleTextId) + " " + t.getTextByIdAndLanguageType(i.sectionDescripTextId);
this.sectionNameLabelNode.getComponent(cc.Label).string = n;
var a = i.levels;
for (var h in a) {
var l = a[h], o = cc.instantiate(this.levelNodePrefab), s = o.getComponent("levelNodeMgr");
s.level = l;
s.levelNumLabelNode.getComponent(cc.Label).string = (parseInt(h) + 1).toString();
s.status = this._checkLevelStatus(l);
s.delegate = this;
this._setupLevelNodePosition(o, h);
this.levelNodes.addChild(o);
}
for (var h in this.levelNodes.children) if (0 != h) {
var g = this.levelNodes.children[h], r = this.levelNodes.children[h - 1], d = cc.instantiate(this.levelNodesConnectLinePrefab), c = cc.v2(r.x - g.x, r.y - g.y);
d.width = c.mag();
var y = c.signAngle(cc.v2(1, 0)) / Math.PI * 180;
d.angle = -y;
var u = this._getMidPointOfTwoPoints(g.position, r.position);
d.x = u.x;
d.y = u.y;
this.connectLineNodes.addChild(d);
}
} else cc.log("not selected one section, can not setup section of mainScene mgr");
},
_setupLevelNodePosition: function(t, i) {
var n = e("sectionConfig")[this.selectedSection], a = n.levelNodePositions;
if (null == a || 0 == a.length) {
var h = n.levels.length, l = 2 * Math.PI / h, o = cc.v2(this.rotaedCopiedRadius, 0).rotate(-i * l);
t.x = o.x;
t.y = o.y;
} else {
t.x = a[i].x;
t.y = a[i].y;
}
},
_getMidPointOfTwoPoints: function(e, t) {
var i = cc.v2(t.x - e.x, t.y - e.y), n = e.x + i.x / 2, a = e.y + i.y / 2;
return cc.v2(n, a);
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
var n = e("dataMgr").playerData.currentLevel;
if (n == t) return 2;
var a = e("sectionConfig")[i].levels;
return a.indexOf(t) > a.indexOf(n) ? 0 : 1;
}
},
_getSectionKeyByLevel: function(t) {
var i = parseInt(t), n = e("sectionConfig");
for (var a in n) {
if (-1 != n[a].levels.indexOf(i)) return a;
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
var i = e("notificationMgr"), n = i.noties;
if (n.length > 0 && 0 == this.isShowingNoti) {
this.isShowingNoti = !0;
var a = this;
(function e() {
if (0 != n.length) {
var t = n[0];
i.showNoti(t);
n.splice(0, 1);
cc.tween(a.node).delay(.3).call(function() {
e();
});
} else a.isShowingNoti = !1;
})();
}
}
});
cc._RF.pop();
}, {
dataMgr: "dataMgr",
notificationMgr: "notificationMgr",
sectionConfig: "sectionConfig",
systemsMgr: "systemsMgr",
textConfig: "textConfig"
} ],
networkMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "06ef571V7VDkpNc4lgVqmds", "networkMgr");
var n = new (cc.Class({
extends: cc.Component,
properties: {
delegate: null,
retryDelta: 1.5,
maxRetryTime: 3,
retryWaitingNode: null,
retryAction: null
},
start: function() {},
sendMessage: function(e, t, i, n, a) {
var h = new XMLHttpRequest();
h.onreadystatechange = function() {
4 == h.readyState && h.status >= 200 && h.status < 400 && a(h);
};
var l = "http://" + i + ":" + t.toString() + "/" + n.toString();
h.open("POST", l);
h.send(e);
},
makeMessageObj: function(t, i) {
var n = e("gloableConfig"), a = n.netWorkMessageConfigs[t];
if (null != a) {
var h = n.basicIp, l = n.basicPort;
null != a.ip && (h = a.ip);
null != a.port && (l = a.port);
return {
ip: h,
port: l,
suffix: a.suffix,
message: a[i],
successCallBack: function(e) {}
};
}
cc.error("no such module name of " + t);
return null;
},
sendMessageByMsgObj: function(e) {
var t = "https://" + e.ip + ":" + e.port.toString() + "/" + e.suffix, i = null, n = this;
(i = new XMLHttpRequest()).onreadystatechange = function() {
if (4 == i.readyState && i.status >= 200 && i.status < 400) {
e.successCallBack(i);
1 == n.retryingFlag && (n.retryResult = !0);
}
};
var a = JSON.stringify(e.message);
i.onerror = function() {
cc.log("err");
null == n.retryAction && (n.retryAction = function() {
i.send(a);
i.currentRetryTime += 1;
});
null != i.currentRetryTime && void 0 != i.currentRetryTime || (i.currentRetryTime = 0);
var e = function(e) {
cc.log("retry", e.currentRetryTime);
if (e.currentRetryTime > n.maxRetryTime) {
n.retryWaitingNode.destroy();
n.retryWaitingNode.removeFromParent();
n.retryWaitingNode = null;
n.retryAction = null;
n.unscheduleAllCallbacks();
var t = cc.director.getScene();
if ("loginScene" == t.name) {
t.getChildByName("Canvas").getComponent("loginSceneMgr").onAllRetryFailed();
} else cc.loader.loadRes("prefabs/backToLoginScene", function(e, t) {
var i = cc.instantiate(t), n = i.getChildByName("bg");
n.width = cc.winSize.width;
n.height = cc.winSize.height;
n.on("touchstart", function() {});
i.getChildByName("others").getChildByName("ensureButton").on("click", function() {
cc.director.loadScene("loginScene");
});
cc.director.getScene().getChildByName("Canvas").addChild(i);
});
} else if (0 == e.currentRetryTime) {
cc.director.getScene().getChildByName("Canvas").addChild(n.retryWaitingNode);
n.schedule(n.retryAction, n.retryDelta);
}
};
null == n.retryWaitingNode ? cc.loader.loadRes("prefabs/retryWaitingNode", function(t, a) {
var h = cc.instantiate(a), l = h.getChildByName("bg");
l.width = cc.winSize.width;
l.height = cc.winSize.height;
l.on("touchstart", function() {});
n.retryWaitingNode = h;
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
i.send(a);
},
onAllRetryFailed: function() {},
startHeartBeat: function() {
var t = this.makeMessageObj("longConnectModule", "heartBeatMessageType");
t.message.playerId = e("dataMgr").playerData.id;
t.successCallBack = function(t) {
var i = t.responseText;
if ("message" == (i = JSON.parse(i)).type) {
var n = i.messages;
for (var a in n) {
var h = n[a];
if ("mailSysSendMail" == h.type) {
var l = h.mailId, o = h.timeStamp, s = {
status: 0,
tag: h.tag,
timeStamp: o,
selectedOptionIndex: -1
};
e("dataMgr").playerData.mails[l] = s;
}
}
}
};
this.schedule(function() {
this.sendMessageByMsgObj(t);
}, 60);
}
}))();
t.exports = n;
cc._RF.pop();
}, {
dataMgr: "dataMgr",
gloableConfig: "gloableConfig"
} ],
notificationMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6adf2lw5wdC6oB912oNiN7C", "notificationMgr");
var n = new (cc.Class({
extends: cc.Component,
properties: {
lastTime: 2,
moveTime: .5,
moveDis: 200,
noties: []
},
start: function() {},
showNoti: function(t) {
var i = e("resMgr").reses.notiSysPrefab, n = cc.instantiate(i);
n.getChildByName("label").getComponent(cc.Label).string = t;
cc.director.getScene().getChildByName("Canvas").addChild(n);
cc.tween(n).by(this.moveTime, {
y: this.moveDis
}).delay(this.lastTime - this.moveTime).call(function() {
n.destroy();
}).start();
},
pushNoti: function(e) {
this.noties.push(e);
}
}))();
t.exports = n;
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
var n = this;
this.closeButtonNode.on("click", function() {
null != n.delegate ? n.delegate.preChanllengeUIOpend = !1 : cc.log("delegate is null");
n.node.destroy();
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
var i = e("levelConfig")[this.level], n = this.contentSectionNode.getChildByName("desLabel");
n.getComponent(cc.Label).string = e("textConfig").getTextByIdAndLanguageType(i.desTextId);
n.getComponent(cc.Label)._forceUpdateRenderData();
var a = this.contentSectionNode.getChildByName("seperateLineUp"), h = this.contentSectionNode.getChildByName("seperateLineDown"), l = n.height + 2 * this.contentSpace + a.height + h.height;
this.contentSectionNode.height = l;
a.y = 0;
n.y = a.y - a.height - this.contentSpace;
h.y = -l + h.height;
var o = e("textConfig"), s = (t = this._getMailSectionInfo(), 0);
for (var g in t) {
var r = t[g], d = cc.instantiate(this.mailSectionElementPrefab), c = d.getChildByName("desLabel"), y = "";
1 == r.type ? y = o.getFormatedString(149, [ r.tag ]) : 2 == r.type && (y = o.getFormatedString(150, [ r.minStep, r.tag ]));
c.getComponent(cc.Label).string = y;
c.getComponent(cc.Label)._forceUpdateRenderData();
var u = d.getChildByName("completeIcon");
1 == r.status && (u.active = !0);
c.height > u.height ? d.height = c.height : d.height = u.height;
d.y = s;
s += d.height;
g != t.length - 1 && (s += this.mailSectionElementDis);
this.mailSectionNode.addChild(d);
}
this.mailSectionNode.height = s;
var p = this._getCostInfoOfChallenge();
"physicalPower" == p.type && (this.challengeButtonNoe.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = this.challengeButtonCostPhySprite);
this.challengeButtonNoe.getChildByName("costLabel").getComponent(cc.Label).string = p.num.toString();
this.costResult = p;
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
var t = e("mailSysConfig"), i = [], n = e("textConfig");
for (var a in t) {
var h = t[a], l = h.conditions, o = e("dataMgr").playerData.mailConditionIndex[a];
for (var s in l) {
var g = l[s], r = g.conditionType, d = g.conditionPara, c = null;
(1 == r && d == this.level || 2 == r && d.levelId == this.level) && (c = {
tag: n.getTextByIdAndLanguageType(h.tagNameTextId),
type: r,
status: null,
minStep: null
});
if (null != c) {
c.status = s < o;
2 == r && (c.minStep = d.minStepNum);
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
var n = e("dataMgr").playerData.physicalPowerCostedFlag;
if (0 == n) {
t.type = "physicalPower";
t.num = i[this.level].physicalPowerCost;
} else if (1 == n) {
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
var i = e("notificationMgr"), n = "";
"heart" == this.costResult.type ? n = "金币不足" : "physicalPower" == this.costResult.type && (n = "体力不足");
i.showNoti(n);
} else {
var a = e("networkMgr"), h = a.makeMessageObj("dataModule", "commitMessageTyp");
h.message.playerId = e("dataMgr").playerData.id;
var l = null;
"heart" == this.costResult.type ? l = {
heart: e("dataMgr").playerData.heart - this.costResult.num
} : "physicalPower" == this.costResult.type && (l = {
physicalPower: e("dataMgr").playerData.physicalPower - this.costResult.num
});
h.message.commitBody = l;
var o = this;
h.successCallBack = function() {
"heart" == o.costResult.type ? e("dataMgr").playerData.heart = l.heart : "physicalPower" == o.costResult.type && (e("dataMgr").playerData.physicalPower = l.physicalPower);
e("gameMgr").enterLevelScene(o.level);
};
this.challengeButtonNoe.getComponent(cc.Button).interactable = !1;
a.sendMessageByMsgObj(h);
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
}, i = t(this.node).x + this.offset.x, n = t(this.node).y + this.offset.y;
e.x = i;
e.y = n;
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
}, i = t(this.node).x + this.offset.x, n = t(this.node).y + this.offset.y;
e.x = i;
e.y = n;
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
var n = new (cc.Class({
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
selectSectionSysPrefab: "prefabs/selectSectionUI"
}, i = Object.keys(t).length;
this.resNum = i;
this.reses = {};
var n = this;
for (var a in t) {
(function(i) {
var a = t[i];
cc.loader.loadRes(a, function(t, a) {
if (a) {
n.reses[i] = a;
n.loadedResNum += 1;
n.loadedResNum == n.resNum && e();
} else console.log("LOAD RES ERRO OF " + i + " :" + t);
});
})(a);
}
}
}))();
t.exports = n;
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
levels: [ 21, 22, 23 ],
bgmPath: "musics/bgm_004",
levelNodePositions: [ 16, 17, 18, 19, 20 ]
},
5: {
sectionTitleTextId: 110,
sectionDescripTextId: 111,
levels: [ 21, 22, 23, 24, 25 ],
bgmPath: "musics/bgm_005",
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
this.nameLabelNode.getComponent(cc.Label).string = this.config.sectionDescrip;
this.iconLabelNode.getComponent(cc.Label).string = this.sectionKey;
parseInt(this.sectionKey) > e("dataMgr").playerData.currentSection && (this.iconNode.getComponent(cc.Sprite).spriteFrame = this.lockedIconSpriteFrame);
this.processLabelNode.getComponent(cc.Label).string = this.mailInfo.sendNum.toString() + " / " + this.mailInfo.totalNum.toString();
this.processBarNode.getComponent(cc.ProgressBar).progress = this.mailInfo.sendNum / this.mailInfo.totalNum;
}
},
setupData: function() {
var t = e("sectionConfig");
this.config = t[this.sectionKey];
var i = [], n = this.config.levels, a = e("mailSysConfig");
for (var h in a) {
var l = a[h].conditions;
for (var o in l) {
var s = l[o], g = s.conditionType, r = s.conditionPara;
1 == g && -1 != n.indexOf(r) ? i.push(s.mailId) : 2 == g && -1 != n.indexOf(r.levelId) && i.push(s.mailId);
}
}
var d = i.length, c = 0;
if (d > 0) {
var y = Object.keys(e("dataMgr").playerData.mails);
for (var o in i) {
var u = i[o];
-1 != y.indexOf(u.toString()) && (c += 1);
}
}
var p = {
totalNum: d,
sendNum: c
};
this.mailInfo = p;
},
onClick: function() {
if (parseInt(this.sectionKey) > e("dataMgr").playerData.currentSection) e("notificationMgr").showNoti("这个章节还没有解锁哦"); else {
if (parseInt(this.sectionKey) <= e("dataMgr").playerData.currentSection) {
var t = cc.director.getScene().getChildByName("Canvas").getComponent("mainSceneMgr");
if (null == t) cc.log("现在不是主界面，无法选择章节，这种情况应该不会出现的才对！"); else if (parseInt(this.sectionKey) != t.selectedSection) {
t.selectedSection = parseInt(this.sectionKey);
t.setupSectionPerformance();
t.playBgm();
}
}
e("systemsMgr").closeSystem("selectSectionSys");
}
}
});
cc._RF.pop();
}, {
dataMgr: "dataMgr",
mailSysConfig: "mailSysConfig",
notificationMgr: "notificationMgr",
sectionConfig: "sectionConfig",
systemsMgr: "systemsMgr"
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
for (var n in t) {
var a = cc.instantiate(this.elementPrefab), h = a.getComponent("selectSectionElementMgr");
h.sectionKey = n;
h.selectSectionUINode = this.node;
a.y = i;
i += a.height;
i += this.elementDis;
this.containerContentNode.addChild(a);
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
heartAddNum: 20,
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
var t = e("dataMgr").playerData.signInStatus, i = "", n = e("textConfig");
switch (t) {
case 1:
i = n.getTextByIdAndLanguageType(115) + this.physicalPowerAddNum + n.getTextByIdAndLanguageType(116) + this.heartAddNum + ", ";
i += n.getTextByIdAndLanguageType(117);
this.cancelButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = n.getTextByIdAndLanguageType(118);
this.ensureButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = n.getTextByIdAndLanguageType(113);
break;

case 2:
i = (i = n.getTextByIdAndLanguageType(119) + ((this.addRateForAd - 1) * this.physicalPowerAddNum).toString()) + n.getTextByIdAndLanguageType(116) + ((this.addRateForAd - 1) * this.heartAddNum).toString();
i += n.getTextByIdAndLanguageType(120);
this.ensureButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = n.getTextByIdAndLanguageType(113);
this.cancelButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = n.getTextByIdAndLanguageType(114);
break;

case 3:
i = n.getTextByIdAndLanguageType(121);
this.cancelButtonNode.active = !1;
this.ensureButtonNode.x = 0;
this.ensureButtonNode.getChildByName("textLabel").getComponent(cc.Label).string = n.getTextByIdAndLanguageType(122);
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
var i = e("networkMgr"), n = i.makeMessageObj("signInModule", "signInMessageType");
n.message.signInType = t;
n.message.playerId = e("dataMgr").playerData.id;
var a = this;
n.successCallBack = function(e) {
var i = e.responseText;
if ("success" == (i = JSON.parse(i)).type) {
var n = i.physicalPower, h = i.heart;
a.onSignInSuccess(t, n, h);
}
};
i.sendMessageByMsgObj(n);
},
onSignInSuccess: function(t, i, n) {
switch (t) {
case 1:
e("dataMgr").playerData.signInStatus = 2;
break;

case 2:
case 3:
e("dataMgr").playerData.signInStatus = 3;
}
e("dataMgr").playerData.physicalPower = i;
e("dataMgr").playerData.heart = n;
e("notificationMgr").showNoti("签到成功");
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
systemsMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "90768z3BYZIyKcDPXY67Q3P", "systemsMgr");
var n = new (cc.Class({
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
systems: {
get: function() {
null == this._systems && (this._systems = {});
return this._systems;
}
}
},
setupSysProperty: function(t, i, n) {
var a = {};
a.uiPrefab = e("resMgr").reses[t];
a.opendNode = null;
a.name = i;
a.mgrName = n;
return a;
},
showSystem: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = this.getSysBySysName(e);
if (null == i.opendNode) {
var n = cc.instantiate(i.uiPrefab), a = this.systems[i.name].mgrName, h = n.getComponent(a);
null != h && "function" == typeof h.onWillOpend && h.onWillOpend(t);
var l = n.getChildByName("others"), o = n.getChildByName("bg");
if (null != o) {
o.width = cc.winSize.width;
o.height = cc.winSize.height;
o.on("touchstart", function() {});
}
cc.director.getScene().getChildByName("Canvas").addChild(n);
i.opendNode = n;
if (null != l) {
l.scale = 0;
cc.tween(l).to(.3, {
scale: 1
}).start();
} else {
n.scale = 0;
cc.tween(n).to(.3, {
scale: 1
}).start();
}
} else cc.log("this sys has been opend , can't reopen: " + i.name);
},
closeSystem: function(e) {
var t = this.getSysBySysName(e), i = t.opendNode;
if (null != i) {
var n = i.getChildByName("others");
null != n ? cc.tween(n).to(.3, {
scale: 0
}).call(function() {
i.destroy();
t.opendNode = null;
}).start() : cc.tween(i).to(.3, {
scale: 0
}).call(function() {
i.destroy();
t.opendNode = null;
});
} else cc.log(t.name + "has not been opend, no need to colse");
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

default:
cc.log("no such sys");
return !1;
}
},
systemsGloableDataMonitored: function(e, t) {
this.mailSysGloableMonitored(e, t);
},
mailSysGloableMonitored: function(t, i) {
var n = e("textConfig"), a = function(t, i) {
var a = e("networkMgr"), h = a.makeMessageObj("mailModule", "reachConditionMessageType");
h.message.playerId = e("dataMgr").playerData.id;
h.message.tag = t;
h.message.mailId = i;
h.successCallBack = function(a) {
var h = a.responseText;
if ("success" == (h = JSON.parse(h)).type) {
0 == h.isEnd ? e("dataMgr").playerData.mailConditionIndex[t] += 1 : e("dataMgr").playerData.mailConditionIndex[t] = -1;
var l = h.mail;
e("dataMgr").playerData.mails[i] = l;
var o = e("notificationMgr"), s = n.getTextByIdAndLanguageType(148);
o.pushNoti(s);
}
};
a.sendMessageByMsgObj(h);
}, h = e("mailSysConfig"), l = Object.keys(h);
for (var o in l) {
var s = l[o], g = e("dataMgr").playerData.mailConditionIndex[s];
if (-1 != g) {
var r = h[s].conditions[g], d = r.conditionType, c = r.conditionPara;
if (1 == d) {
if ("preLevel" != t) continue;
if (i == c) {
a(s, r.mailId);
}
} else if (2 == d) {
if (-1 == t.indexOf("minStep_level_")) continue;
var y = t.slice(14);
if (parseInt(y) == c.levelId && i <= c.minStepNum) {
a(s, r.mailId);
}
}
}
}
},
mailSysGloableSendOneMail: function(t, i) {
var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {}, a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0, h = e("networkMgr"), l = h.makeMessageObj("mailModule", "sendMailMessageType");
l.message.playerId = e("dataMgr").playerData.id;
l.message.mailId = t;
l.message.tag = i;
l.message.delay = a;
l.successCallBack = function(e) {
var t = e.responseText;
"success" == (t = JSON.parse(t)).type && n();
};
h.sendMessageByMsgObj(l);
}
}))();
t.exports = n;
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
var i = this.bullets[t], n = i.getComponent("bulletMgr");
if (1 == n.bulletType && (0 == n.status && 1 == this.checkWhetherSatisfied(i))) {
this.onSatisfy(i);
break;
}
}
},
checkWhetherSatisfied: function(e) {
var t = this.helper.getPointsOfOneNode(this.node), i = this.helper.getPointsOfOneNode(e);
for (var n in t) {
var a = t[n], h = i[n];
if (cc.v2(h.x - a.x, h.y - a.y).mag() > this.fatalTolerance) return !1;
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
zh: "您今天已经签到过啦，明天再来吧~",
en: "you have been signed in today, come again tomorrow please ~",
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
getTextByIdAndLanguageType: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.languageType, i = this["text_" + e.toString()];
return 1 == t ? i.zh : i.en;
},
getFormatedString: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.languageType, n = this["text_" + e.toString()], a = null;
a = 1 == i ? n.zh : n.en;
var h = [];
for (var l in a) {
var o = a[l], s = null;
if (l < a.length - 1) {
s = a[parseInt(l) + 1];
}
"%" == o && "s" == s && h.push(l);
}
if (h.length == t.length) {
for (var l in t) {
var g = t[l].toString();
a = a.replace("%s", g);
}
return a;
}
cc.log("para length not match of indexes length, indexes: " + h.length + " paras: " + t.length);
}
};
t.exports = n;
cc._RF.pop();
}, {} ],
timerSystemsMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "db2d5jDzvdBm400iKuIvXTH", "timerSystemsMgr");
var n = new (cc.Class({
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
var i = this, n = e("networkMgr"), a = n.makeMessageObj("signInModule", "refreshMessageType");
a.message.playerId = e("dataMgr").playerData.id;
a.successCallBack = function(t) {
var n = t.responseText;
if ("success" == (n = JSON.parse(n)).type) {
var a = n.signInRefreshDelta;
e("dataMgr").playerData.signInRefreshDelta = a;
i.signInSysTimer = a;
e("dataMgr").playerData.signInStatus = 1;
if (null != e("systemsMgr").signInSys.opendNode) {
e("systemsMgr").signInSys.opendNode.getComponent("signInSysMgr").setupUI();
}
}
};
n.sendMessageByMsgObj(a);
}
}
}))();
t.exports = n;
cc._RF.pop();
}, {
dataMgr: "dataMgr",
networkMgr: "networkMgr",
systemsMgr: "systemsMgr"
} ],
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
"mainScene" == i.name && (i.getChildByName("Canvas").getChildByName("welfaryButton").active = !1);
});
}
});
cc._RF.pop();
}, {
advertisMgr: "advertisMgr",
dataMgr: "dataMgr",
systemsMgr: "systemsMgr",
textConfig: "textConfig"
} ]
}, {}, [ "addPropertySysConfig", "levelConfig", "levelSceneConfig", "mailConfig", "mailSysConfig", "sectionConfig", "signInSysConfig", "textConfig", "_mainSceneMgr", "bulletMgr", "redPointMgr", "helper", "levelAreaNodeMgr", "levelMgr", "dataMgr", "gestureMgr", "gloableConfig", "loginMgr", "networkMgr", "resMgr", "timerSystemsMgr", "loginSceneMgr", "levelNodeMgr", "mainSceneMgr", "preChallengeUIMgr", "selectSectionElementMgr", "selectSectionUIMgr", "selectedEffectMgr", "advertisMgr", "gameMgr", "globalRedPointMgr", "notificationMgr", "addPropertyNumSysMgr", "ensureSystem", "ensureSystemNodeMgr", "mailSysMailMgr", "mailSysMgr", "signInSysMgr", "systemsMgr", "welfarySysMgr", "targetMgr" ]);