(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/configs/mailConfig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b8af6yKxwJNLpuWEyI5t8+/', 'mailConfig', __filename);
// configs/mailConfig.js

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

var mailConfig = {
    "1001": {
        titleTextId: 133,
        contentTextId: 134,
        options: [{
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
        }]
    },
    "10001": {
        titleTextId: 138,
        contentTextId: 139,
        options: []
    },

    "1002": {
        titleTextId: 140,
        contentTextId: 141,
        options: []
    },

    "1003": {
        titleTextId: 142,
        contentTextId: 143,
        options: []
    },

    "1101": {
        titleTextId: 144,
        contentTextId: 145,
        options: []
    }
};

module.exports = mailConfig;

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
        //# sourceMappingURL=mailConfig.js.map
        