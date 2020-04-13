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
        title: "你知道么",
        content: "测试一下中文和英文，you know what?",
        options: [{
            showText: "ok",
            operationType: 1,
            operationPara: null
        }, {
            showText: "test option",
            operationType: 2,
            operationPara: {
                mailId: 10001,
                delay: 60
            }
        }, {
            showText: "test option1",
            operationType: 1,
            operationPara: null
        }]
    },
    "10001": {
        title: "test 10001",
        content: "test content of mail 10001",
        options: []
    },

    "1002": {
        title: "test 1002",
        content: "test content of mail 1002",
        options: []
    },

    "1003": {
        title: "test 1003",
        content: "test content of mail 1003",
        options: []
    },

    "1101": {
        title: "test 1101",
        content: "test content of mail 1101",
        options: []
    }
};

module.exports = mailConfig;

cc._RF.pop();