(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/configs/sectionConfig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '658e1kOKA9II7ENe3y2+Jif', 'sectionConfig', __filename);
// configs/sectionConfig.js

"use strict";

var sectionConfig = {
    "1": {
        sectionTitle: "第一章",
        sectionDescrip: "新的旅途",
        levels: [1, 2, 3, 4, 5],
        bgmPath: "musics/bgm_001",
        levelNodePositions: []
    },
    "2": {
        sectionTitle: "第二章",
        sectionDescrip: "挑战",
        levels: [6, 7, 8, 9, 10],
        bgmPath: "musics/bgm_001",
        levelNodePositions: []
    },
    "3": {
        sectionTitle: "第三章",
        sectionDescrip: "新生",
        levels: [11, 12, 13, 14, 15],
        bgmPath: "musics/bgm_001",
        levelNodePositions: []
    },
    "4": {
        sectionTitle: "第四章",
        sectionDescrip: "Section 4",
        levels: [21, 22, 23],
        bgmPath: "musics/bgm_001",
        levelNodePositions: [16, 17, 18, 19, 20]
    },
    "5": {
        sectionTitle: "第五章",
        sectionDescrip: "Section 5",
        levels: [21, 22, 23, 24, 25],
        bgmPath: "musics/bgm_001",
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
        