
(function () {
var scripts = [{"deps":{"./assets/configs/textConfig":1,"./assets/scripts/helper":2,"./assets/scripts/mainScene/mainSceneMgr":3,"./assets/scripts/systems/mailSys/mailSysMgr":4,"./assets/scripts/_mainSceneMgr":5,"./assets/scripts/mainScene/preChallengeUIMgr":6,"./assets/scripts/systems/addPropertyNumSys/addPropertyNumSysMgr":7,"./assets/scripts/systems/mailSys/mailSysMailMgr":8,"./assets/scripts/systems/systemsMgr":9,"./assets/configs/mailConfig":10,"./assets/migration/use_reversed_rotateTo":11,"./assets/scripts/components/redPointMgr":12,"./assets/scripts/libs/gloableConfig":13,"./assets/scripts/singleInstanceSystems/bgmMgr":14,"./assets/scripts/systems/ensureSys_notUse/ensureSystemNodeMgr":15,"./assets/scripts/systems/signInSys/signInSysMgr":16,"./assets/scripts/systems/storySys/storySysMgr":17,"./assets/configs/mailSysConfig":18,"./assets/configs/storyConfig":19,"./assets/configs/signInSysConfig":20,"./assets/scripts/bulletMgr":21,"./assets/scripts/levelAreaNodeMgr":22,"./assets/scripts/guildNodeMgr":23,"./assets/configs/sectionConfig":24,"./assets/scripts/targetMgr":25,"./assets/scripts/systems/welfarySys/welfarySysMgr":26,"./assets/scripts/selectedEffectMgr":27,"./assets/configs/addPropertySysConfig":28,"./assets/scripts/libs/networkMgr":29,"./assets/scripts/levelMgr":30,"./assets/scripts/libs/loginMgr":31,"./assets/scripts/loginSceneMgr":32,"./assets/scripts/libs/dataMgr":33,"./assets/scripts/libs/resMgr":34,"./assets/scripts/libs/gestureMgr":35,"./assets/scripts/libs/timerSystemsMgr":36,"./assets/scripts/mainScene/selectSectionUIMgr":37,"./assets/scripts/singleInstanceSystems/globalRedPointMgr":38,"./assets/scripts/mainScene/selectSectionElementMgr":39,"./assets/scripts/mainScene/levelNodeMgr":40,"./assets/scripts/singleInstanceSystems/gameMgr":41,"./assets/scripts/singleInstanceSystems/advertisMgr":42,"./assets/scripts/singleInstanceSystems/notificationMgr":43,"./assets/scripts/systems/ensureSys_notUse/ensureSystem":44,"./assets/configs/levelConfig":45,"./assets/configs/levelSceneConfig":46},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/configs/textConfig.js"},{"deps":{},"path":"preview-scripts/assets/scripts/helper.js"},{"deps":{"bgmMgr":14,"dataMgr":33,"systemsMgr":9,"textConfig":1,"sectionConfig":24,"notificationMgr":43},"path":"preview-scripts/assets/scripts/mainScene/mainSceneMgr.js"},{"deps":{"systemsMgr":9,"textConfig":1,"mailSysConfig":18,"dataMgr":33,"mailConfig":10,"sectionConfig":24,"networkMgr":29},"path":"preview-scripts/assets/scripts/systems/mailSys/mailSysMgr.js"},{"deps":{"levelConfig":45,"dataMgr":33,"networkMgr":29,"systemsMgr":9,"sectionConfig":24,"gameMgr":41},"path":"preview-scripts/assets/scripts/_mainSceneMgr.js"},{"deps":{"textConfig":1,"sectionConfig":24,"levelConfig":45,"mailSysConfig":18,"dataMgr":33,"notificationMgr":43,"networkMgr":29,"gameMgr":41},"path":"preview-scripts/assets/scripts/mainScene/preChallengeUIMgr.js"},{"deps":{"addPropertySysConfig":28,"textConfig":1,"advertisMgr":42,"systemsMgr":9,"dataMgr":33,"notificationMgr":43},"path":"preview-scripts/assets/scripts/systems/addPropertyNumSys/addPropertyNumSysMgr.js"},{"deps":{"textConfig":1,"mailConfig":10,"dataMgr":33,"systemsMgr":9},"path":"preview-scripts/assets/scripts/systems/mailSys/mailSysMailMgr.js"},{"deps":{"resMgr":34,"textConfig":1,"networkMgr":29,"dataMgr":33,"notificationMgr":43,"mailSysConfig":18},"path":"preview-scripts/assets/scripts/systems/systemsMgr.js"},{"deps":{},"path":"preview-scripts/assets/configs/mailConfig.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_reversed_rotateTo.js"},{"deps":{},"path":"preview-scripts/assets/scripts/components/redPointMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/libs/gloableConfig.js"},{"deps":{"sectionConfig":24},"path":"preview-scripts/assets/scripts/singleInstanceSystems/bgmMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/systems/ensureSys_notUse/ensureSystemNodeMgr.js"},{"deps":{"dataMgr":33,"textConfig":1,"signInSysConfig":20,"advertisMgr":42,"systemsMgr":9,"networkMgr":29,"notificationMgr":43},"path":"preview-scripts/assets/scripts/systems/signInSys/signInSysMgr.js"},{"deps":{"textConfig":1,"storyConfig":19,"networkMgr":29,"dataMgr":33,"systemsMgr":9},"path":"preview-scripts/assets/scripts/systems/storySys/storySysMgr.js"},{"deps":{},"path":"preview-scripts/assets/configs/mailSysConfig.js"},{"deps":{},"path":"preview-scripts/assets/configs/storyConfig.js"},{"deps":{},"path":"preview-scripts/assets/configs/signInSysConfig.js"},{"deps":{"helper":2},"path":"preview-scripts/assets/scripts/bulletMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/levelAreaNodeMgr.js"},{"deps":{"textConfig":1},"path":"preview-scripts/assets/scripts/guildNodeMgr.js"},{"deps":{},"path":"preview-scripts/assets/configs/sectionConfig.js"},{"deps":{"helper":2},"path":"preview-scripts/assets/scripts/targetMgr.js"},{"deps":{"advertisMgr":42,"systemsMgr":9,"dataMgr":33,"textConfig":1,"notificationMgr":43},"path":"preview-scripts/assets/scripts/systems/welfarySys/welfarySysMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/selectedEffectMgr.js"},{"deps":{},"path":"preview-scripts/assets/configs/addPropertySysConfig.js"},{"deps":{"gloableConfig":13,"dataMgr":33},"path":"preview-scripts/assets/scripts/libs/networkMgr.js"},{"deps":{"textConfig":1,"helper":2,"dataMgr":33,"levelConfig":45,"networkMgr":29,"resMgr":34,"sectionConfig":24,"gameMgr":41,"levelSceneConfig":46},"path":"preview-scripts/assets/scripts/levelMgr.js"},{"deps":{"dataMgr":33,"networkMgr":29},"path":"preview-scripts/assets/scripts/libs/loginMgr.js"},{"deps":{"textConfig":1,"dataMgr":33,"loginMgr":31,"networkMgr":29,"advertisMgr":42,"resMgr":34},"path":"preview-scripts/assets/scripts/loginSceneMgr.js"},{"deps":{"globalRedPointMgr":38,"systemsMgr":9,"networkMgr":29,"timerSystemsMgr":36},"path":"preview-scripts/assets/scripts/libs/dataMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/libs/resMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/libs/gestureMgr.js"},{"deps":{"dataMgr":33,"networkMgr":29,"systemsMgr":9},"path":"preview-scripts/assets/scripts/libs/timerSystemsMgr.js"},{"deps":{"systemsMgr":9,"sectionConfig":24},"path":"preview-scripts/assets/scripts/mainScene/selectSectionUIMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/singleInstanceSystems/globalRedPointMgr.js"},{"deps":{"textConfig":1,"dataMgr":33,"sectionConfig":24,"mailSysConfig":18,"notificationMgr":43,"bgmMgr":14,"systemsMgr":9},"path":"preview-scripts/assets/scripts/mainScene/selectSectionElementMgr.js"},{"deps":{"textConfig":1,"notificationMgr":43,"mailSysConfig":18,"dataMgr":33},"path":"preview-scripts/assets/scripts/mainScene/levelNodeMgr.js"},{"deps":{"resMgr":34,"levelConfig":45,"networkMgr":29},"path":"preview-scripts/assets/scripts/singleInstanceSystems/gameMgr.js"},{"deps":{"notificationMgr":43,"resMgr":34,"textConfig":1},"path":"preview-scripts/assets/scripts/singleInstanceSystems/advertisMgr.js"},{"deps":{"resMgr":34},"path":"preview-scripts/assets/scripts/singleInstanceSystems/notificationMgr.js"},{"deps":{"resMgr":34},"path":"preview-scripts/assets/scripts/systems/ensureSys_notUse/ensureSystem.js"},{"deps":{},"path":"preview-scripts/assets/configs/levelConfig.js"},{"deps":{},"path":"preview-scripts/assets/configs/levelSceneConfig.js"}];
var entries = ["preview-scripts/__qc_index__.js"];

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

if (typeof global === 'undefined') {
    window.global = window;
}

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            requestScript = scripts[ m.deps[request] ];
        }
        
        path = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                path = name2path[request];
            }

            if (!path) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            path = formatPath(requestScript.path);
        }

        m = modules[path];
        
        if (!m) {
            console.warn('Can not find module for path : ' + path);
            return null;
        }

        if (!m.module && m.func) {
            m.func();
        }

        if (!m.module) {
            console.warn('Can not find module.module for path : ' + path);
            return null;
        }

        return m.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;
        
            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
        
            return path;
        });

        loadScripts(srcs, function () {
            self.run();
            cb();
        });
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    