"use strict";
cc._RF.push(module, 'b8af6yKxwJNLpuWEyI5t8+/', 'mailConfig');
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