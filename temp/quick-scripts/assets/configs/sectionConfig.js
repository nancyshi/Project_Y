(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/configs/sectionConfig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '658e1kOKA9II7ENe3y2+Jif', 'sectionConfig', __filename);
// configs/sectionConfig.js

"use strict";

var sectionConfig = {
    "1": {
        sectionTitleTextId: 102,
        sectionDescripTextId: 103,
        levels: [1, 2, 3, 4, 5],
        bgmPath: "musics/bgm_001",
        levelNodePositions: []
    },
    "2": {
        sectionTitleTextId: 104,
        sectionDescripTextId: 105,
        levels: [6, 7, 8, 9, 10],
        bgmPath: "musics/bgm_002",
        levelNodePositions: []
    },
    "3": {
        sectionTitleTextId: 106,
        sectionDescripTextId: 107,
        levels: [11, 12, 13, 14, 15],
        bgmPath: "musics/bgm_003",
        levelNodePositions: []
    },
    "4": {
        sectionTitleTextId: 108,
        sectionDescripTextId: 109,
        levels: [21, 22, 23],
        bgmPath: "musics/bgm_004",
        levelNodePositions: [16, 17, 18, 19, 20]
    },
    "5": {
        sectionTitleTextId: 110,
        sectionDescripTextId: 111,
        levels: [21, 22, 23, 24, 25],
        bgmPath: "musics/bgm_005",
        levelNodePositions: []
    }
};

module.exports = sectionConfig;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=sectionConfig.js.map
        