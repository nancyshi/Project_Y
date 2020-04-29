
(function () {
var scripts = [{"deps":{"./assets/configs/levelConfig":44,"./assets/configs/mailConfig":10,"./assets/configs/mailSysConfig":20,"./assets/configs/sectionConfig":21,"./assets/configs/signInSysConfig":25,"./assets/configs/storyConfig":19,"./assets/configs/textConfig":1,"./assets/configs/levelSceneConfig":45,"./assets/migration/use_reversed_rotateTo":11,"./assets/scripts/bulletMgr":29,"./assets/scripts/guildNodeMgr":23,"./assets/scripts/levelAreaNodeMgr":22,"./assets/scripts/helper":5,"./assets/scripts/levelMgr":26,"./assets/scripts/loginSceneMgr":27,"./assets/scripts/selectedEffectMgr":30,"./assets/scripts/targetMgr":28,"./assets/scripts/_mainSceneMgr":2,"./assets/scripts/components/redPointMgr":12,"./assets/scripts/libs/gestureMgr":32,"./assets/scripts/libs/gloableConfig":13,"./assets/scripts/libs/loginMgr":34,"./assets/scripts/libs/networkMgr":36,"./assets/scripts/libs/resMgr":33,"./assets/scripts/libs/timerSystemsMgr":31,"./assets/scripts/libs/dataMgr":37,"./assets/scripts/mainScene/preChallengeUIMgr":6,"./assets/scripts/mainScene/mainSceneMgr":3,"./assets/scripts/mainScene/selectSectionElementMgr":35,"./assets/scripts/mainScene/selectSectionUIMgr":39,"./assets/scripts/mainScene/levelNodeMgr":40,"./assets/scripts/singleInstanceSystems/gameMgr":43,"./assets/scripts/singleInstanceSystems/globalRedPointMgr":14,"./assets/scripts/singleInstanceSystems/notificationMgr":38,"./assets/scripts/singleInstanceSystems/advertisMgr":42,"./assets/scripts/systems/ensureSys_notUse/ensureSystemNodeMgr":16,"./assets/scripts/systems/ensureSys_notUse/ensureSystem":41,"./assets/scripts/systems/addPropertyNumSys/addPropertyNumSysMgr":8,"./assets/scripts/systems/mailSys/mailSysMgr":4,"./assets/scripts/systems/mailSys/mailSysMailMgr":7,"./assets/scripts/systems/signInSys/signInSysMgr":17,"./assets/scripts/systems/systemsMgr":9,"./assets/scripts/systems/storySys/storySysMgr":15,"./assets/scripts/systems/welfarySys/welfarySysMgr":18,"./assets/configs/addPropertySysConfig":24},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/configs/textConfig.js"},{"deps":{"levelConfig":44,"dataMgr":37,"networkMgr":36,"systemsMgr":9,"sectionConfig":21,"gameMgr":43},"path":"preview-scripts/assets/scripts/_mainSceneMgr.js"},{"deps":{"dataMgr":37,"systemsMgr":9,"textConfig":1,"sectionConfig":21,"notificationMgr":38},"path":"preview-scripts/assets/scripts/mainScene/mainSceneMgr.js"},{"deps":{"systemsMgr":9,"textConfig":1,"mailSysConfig":20,"dataMgr":37,"mailConfig":10,"sectionConfig":21,"networkMgr":36},"path":"preview-scripts/assets/scripts/systems/mailSys/mailSysMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/helper.js"},{"deps":{"textConfig":1,"sectionConfig":21,"levelConfig":44,"mailSysConfig":20,"dataMgr":37,"notificationMgr":38,"networkMgr":36,"gameMgr":43},"path":"preview-scripts/assets/scripts/mainScene/preChallengeUIMgr.js"},{"deps":{"textConfig":1,"mailConfig":10,"dataMgr":37,"systemsMgr":9},"path":"preview-scripts/assets/scripts/systems/mailSys/mailSysMailMgr.js"},{"deps":{"addPropertySysConfig":24,"textConfig":1,"advertisMgr":42,"systemsMgr":9,"dataMgr":37,"notificationMgr":38},"path":"preview-scripts/assets/scripts/systems/addPropertyNumSys/addPropertyNumSysMgr.js"},{"deps":{"mailSysConfig":20,"textConfig":1,"networkMgr":36,"dataMgr":37,"resMgr":33,"notificationMgr":38},"path":"preview-scripts/assets/scripts/systems/systemsMgr.js"},{"deps":{},"path":"preview-scripts/assets/configs/mailConfig.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_reversed_rotateTo.js"},{"deps":{},"path":"preview-scripts/assets/scripts/components/redPointMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/libs/gloableConfig.js"},{"deps":{},"path":"preview-scripts/assets/scripts/singleInstanceSystems/globalRedPointMgr.js"},{"deps":{"textConfig":1,"storyConfig":19,"networkMgr":36,"dataMgr":37,"systemsMgr":9},"path":"preview-scripts/assets/scripts/systems/storySys/storySysMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/systems/ensureSys_notUse/ensureSystemNodeMgr.js"},{"deps":{"dataMgr":37,"textConfig":1,"signInSysConfig":25,"advertisMgr":42,"systemsMgr":9,"networkMgr":36,"notificationMgr":38},"path":"preview-scripts/assets/scripts/systems/signInSys/signInSysMgr.js"},{"deps":{"advertisMgr":42,"systemsMgr":9,"dataMgr":37,"textConfig":1,"notificationMgr":38},"path":"preview-scripts/assets/scripts/systems/welfarySys/welfarySysMgr.js"},{"deps":{},"path":"preview-scripts/assets/configs/storyConfig.js"},{"deps":{},"path":"preview-scripts/assets/configs/mailSysConfig.js"},{"deps":{},"path":"preview-scripts/assets/configs/sectionConfig.js"},{"deps":{},"path":"preview-scripts/assets/scripts/levelAreaNodeMgr.js"},{"deps":{"textConfig":1},"path":"preview-scripts/assets/scripts/guildNodeMgr.js"},{"deps":{},"path":"preview-scripts/assets/configs/addPropertySysConfig.js"},{"deps":{},"path":"preview-scripts/assets/configs/signInSysConfig.js"},{"deps":{"textConfig":1,"helper":5,"dataMgr":37,"levelConfig":44,"networkMgr":36,"resMgr":33,"sectionConfig":21,"gameMgr":43,"levelSceneConfig":45},"path":"preview-scripts/assets/scripts/levelMgr.js"},{"deps":{"textConfig":1,"dataMgr":37,"loginMgr":34,"networkMgr":36,"advertisMgr":42,"resMgr":33},"path":"preview-scripts/assets/scripts/loginSceneMgr.js"},{"deps":{"helper":5},"path":"preview-scripts/assets/scripts/targetMgr.js"},{"deps":{"helper":5},"path":"preview-scripts/assets/scripts/bulletMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/selectedEffectMgr.js"},{"deps":{"dataMgr":37,"networkMgr":36,"systemsMgr":9},"path":"preview-scripts/assets/scripts/libs/timerSystemsMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/libs/gestureMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/libs/resMgr.js"},{"deps":{"dataMgr":37,"networkMgr":36},"path":"preview-scripts/assets/scripts/libs/loginMgr.js"},{"deps":{"sectionConfig":21,"mailSysConfig":20,"textConfig":1,"dataMgr":37,"notificationMgr":38,"systemsMgr":9},"path":"preview-scripts/assets/scripts/mainScene/selectSectionElementMgr.js"},{"deps":{"gloableConfig":13,"dataMgr":37},"path":"preview-scripts/assets/scripts/libs/networkMgr.js"},{"deps":{"globalRedPointMgr":14,"systemsMgr":9,"networkMgr":36,"timerSystemsMgr":31},"path":"preview-scripts/assets/scripts/libs/dataMgr.js"},{"deps":{"resMgr":33},"path":"preview-scripts/assets/scripts/singleInstanceSystems/notificationMgr.js"},{"deps":{"systemsMgr":9,"sectionConfig":21},"path":"preview-scripts/assets/scripts/mainScene/selectSectionUIMgr.js"},{"deps":{"mailSysConfig":20,"mailConfig":10,"textConfig":1,"notificationMgr":38,"dataMgr":37},"path":"preview-scripts/assets/scripts/mainScene/levelNodeMgr.js"},{"deps":{"resMgr":33},"path":"preview-scripts/assets/scripts/systems/ensureSys_notUse/ensureSystem.js"},{"deps":{"notificationMgr":38,"resMgr":33,"textConfig":1},"path":"preview-scripts/assets/scripts/singleInstanceSystems/advertisMgr.js"},{"deps":{"resMgr":33,"levelConfig":44,"networkMgr":36},"path":"preview-scripts/assets/scripts/singleInstanceSystems/gameMgr.js"},{"deps":{},"path":"preview-scripts/assets/configs/levelConfig.js"},{"deps":{},"path":"preview-scripts/assets/configs/levelSceneConfig.js"}];
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
    