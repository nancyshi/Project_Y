
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/configs/addPropertySysConfig');
require('./assets/configs/levelConfig');
require('./assets/configs/levelSceneConfig');
require('./assets/configs/mailConfig');
require('./assets/configs/mailSysConfig');
require('./assets/configs/sectionConfig');
require('./assets/configs/signInSysConfig');
require('./assets/configs/storyConfig');
require('./assets/configs/textConfig');
require('./assets/migration/use_reversed_rotateTo');
require('./assets/scripts/_mainSceneMgr');
require('./assets/scripts/bulletMgr');
require('./assets/scripts/components/redPointMgr');
require('./assets/scripts/guildNodeMgr');
require('./assets/scripts/helper');
require('./assets/scripts/levelAreaNodeMgr');
require('./assets/scripts/levelMgr');
require('./assets/scripts/libs/dataMgr');
require('./assets/scripts/libs/gestureMgr');
require('./assets/scripts/libs/gloableConfig');
require('./assets/scripts/libs/loginMgr');
require('./assets/scripts/libs/networkMgr');
require('./assets/scripts/libs/resMgr');
require('./assets/scripts/libs/timerSystemsMgr');
require('./assets/scripts/loginSceneMgr');
require('./assets/scripts/mainScene/levelNodeMgr');
require('./assets/scripts/mainScene/mainSceneMgr');
require('./assets/scripts/mainScene/preChallengeUIMgr');
require('./assets/scripts/mainScene/selectSectionElementMgr');
require('./assets/scripts/mainScene/selectSectionUIMgr');
require('./assets/scripts/selectedEffectMgr');
require('./assets/scripts/singleInstanceSystems/advertisMgr');
require('./assets/scripts/singleInstanceSystems/bgmMgr');
require('./assets/scripts/singleInstanceSystems/gameMgr');
require('./assets/scripts/singleInstanceSystems/globalRedPointMgr');
require('./assets/scripts/singleInstanceSystems/notificationMgr');
require('./assets/scripts/systems/addPropertyNumSys/addPropertyNumSysMgr');
require('./assets/scripts/systems/ensureSys_notUse/ensureSystem');
require('./assets/scripts/systems/ensureSys_notUse/ensureSystemNodeMgr');
require('./assets/scripts/systems/mailSys/mailSysMailMgr');
require('./assets/scripts/systems/mailSys/mailSysMgr');
require('./assets/scripts/systems/signInSys/signInSysMgr');
require('./assets/scripts/systems/storySys/storySysMgr');
require('./assets/scripts/systems/systemsMgr');
require('./assets/scripts/systems/welfarySys/welfarySysMgr');
require('./assets/scripts/targetMgr');

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