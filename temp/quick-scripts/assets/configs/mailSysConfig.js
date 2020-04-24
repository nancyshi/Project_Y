(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/configs/mailSysConfig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4a64feyfXJHbZN/RRBmqrAY', 'mailSysConfig', __filename);
// configs/mailSysConfig.js

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

var mailSysConfig = {
    mainLine: {
        tagNameTextId: 127,
        conditions: [{
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
        }]
    },

    branchLine1: {
        tagNameTextId: 128,
        conditions: [{
            conditionType: 2,
            conditionPara: {
                levelId: 3,
                minStepNum: 8
            },
            mailId: 1101
        }]
    }

};

module.exports = mailSysConfig;

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
        //# sourceMappingURL=mailSysConfig.js.map
        