
(function () {
var scripts = [{"deps":{"./assets/configs/mailSysConfig":19,"./assets/configs/levelConfig":44,"./assets/configs/sectionConfig":21,"./assets/configs/signInSysConfig":20,"./assets/configs/mailConfig":10,"./assets/configs/textConfig":1,"./assets/configs/storyConfig":22,"./assets/configs/addPropertySysConfig":24,"./assets/migration/use_reversed_rotateTo":11,"./assets/scripts/bulletMgr":25,"./assets/scripts/guildNodeMgr":23,"./assets/scripts/levelAreaNodeMgr":33,"./assets/scripts/helper":2,"./assets/scripts/levelMgr":26,"./assets/scripts/loginSceneMgr":28,"./assets/scripts/selectedEffectMgr":37,"./assets/scripts/targetMgr":30,"./assets/scripts/_mainSceneMgr":5,"./assets/scripts/components/redPointMgr":13,"./assets/scripts/libs/gloableConfig":12,"./assets/scripts/libs/gestureMgr":31,"./assets/scripts/libs/loginMgr":27,"./assets/scripts/libs/networkMgr":29,"./assets/scripts/libs/resMgr":32,"./assets/scripts/libs/timerSystemsMgr":34,"./assets/scripts/libs/dataMgr":35,"./assets/scripts/mainScene/levelNodeMgr":43,"./assets/scripts/mainScene/preChallengeUIMgr":3,"./assets/scripts/mainScene/selectSectionElementMgr":38,"./assets/scripts/mainScene/selectSectionUIMgr":36,"./assets/scripts/mainScene/mainSceneMgr":6,"./assets/scripts/singleInstanceSystems/bgmMgr":46,"./assets/scripts/singleInstanceSystems/globalRedPointMgr":40,"./assets/scripts/singleInstanceSystems/gameMgr":14,"./assets/scripts/singleInstanceSystems/notificationMgr":39,"./assets/scripts/singleInstanceSystems/advertisMgr":41,"./assets/scripts/systems/addPropertyNumSys/addPropertyNumSysMgr":7,"./assets/scripts/systems/ensureSys_notUse/ensureSystem":18,"./assets/scripts/systems/ensureSys_notUse/ensureSystemNodeMgr":42,"./assets/scripts/systems/mailSys/mailSysMgr":8,"./assets/scripts/systems/mailSys/mailSysMailMgr":4,"./assets/scripts/systems/signInSys/signInSysMgr":15,"./assets/scripts/systems/storySys/storySysMgr":17,"./assets/scripts/systems/systemsMgr":9,"./assets/scripts/systems/welfarySys/welfarySysMgr":16,"./assets/configs/levelSceneConfig":45},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/configs/textConfig.js"},{"deps":{},"path":"preview-scripts/assets/scripts/helper.js"},{"deps":{"sectionConfig":21,"levelConfig":44,"mailSysConfig":19,"textConfig":1,"networkMgr":29,"dataMgr":35,"gameMgr":14,"notificationMgr":39},"path":"preview-scripts/assets/scripts/mainScene/preChallengeUIMgr.js"},{"deps":{"textConfig":1,"mailConfig":10,"dataMgr":35,"systemsMgr":9},"path":"preview-scripts/assets/scripts/systems/mailSys/mailSysMailMgr.js"},{"deps":{"levelConfig":44,"dataMgr":35,"networkMgr":29,"systemsMgr":9,"sectionConfig":21,"gameMgr":14},"path":"preview-scripts/assets/scripts/_mainSceneMgr.js"},{"deps":{"dataMgr":35,"systemsMgr":9,"notificationMgr":39,"bgmMgr":46,"sectionConfig":21,"textConfig":1},"path":"preview-scripts/assets/scripts/mainScene/mainSceneMgr.js"},{"deps":{"addPropertySysConfig":24,"textConfig":1,"advertisMgr":41,"systemsMgr":9,"dataMgr":35,"notificationMgr":39},"path":"preview-scripts/assets/scripts/systems/addPropertyNumSys/addPropertyNumSysMgr.js"},{"deps":{"systemsMgr":9,"mailSysConfig":19,"mailConfig":10,"sectionConfig":21,"textConfig":1,"networkMgr":29,"dataMgr":35},"path":"preview-scripts/assets/scripts/systems/mailSys/mailSysMgr.js"},{"deps":{"networkMgr":29,"dataMgr":35,"resMgr":32,"mailSysConfig":19,"textConfig":1,"notificationMgr":39},"path":"preview-scripts/assets/scripts/systems/systemsMgr.js"},{"deps":{},"path":"preview-scripts/assets/configs/mailConfig.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_reversed_rotateTo.js"},{"deps":{},"path":"preview-scripts/assets/scripts/libs/gloableConfig.js"},{"deps":{},"path":"preview-scripts/assets/scripts/components/redPointMgr.js"},{"deps":{"resMgr":32,"levelConfig":44,"networkMgr":29},"path":"preview-scripts/assets/scripts/singleInstanceSystems/gameMgr.js"},{"deps":{"dataMgr":35,"textConfig":1,"signInSysConfig":20,"advertisMgr":41,"systemsMgr":9,"networkMgr":29,"notificationMgr":39},"path":"preview-scripts/assets/scripts/systems/signInSys/signInSysMgr.js"},{"deps":{"advertisMgr":41,"systemsMgr":9,"dataMgr":35,"textConfig":1,"notificationMgr":39},"path":"preview-scripts/assets/scripts/systems/welfarySys/welfarySysMgr.js"},{"deps":{"textConfig":1,"storyConfig":22,"networkMgr":29,"dataMgr":35,"systemsMgr":9},"path":"preview-scripts/assets/scripts/systems/storySys/storySysMgr.js"},{"deps":{"resMgr":32},"path":"preview-scripts/assets/scripts/systems/ensureSys_notUse/ensureSystem.js"},{"deps":{},"path":"preview-scripts/assets/configs/mailSysConfig.js"},{"deps":{},"path":"preview-scripts/assets/configs/signInSysConfig.js"},{"deps":{},"path":"preview-scripts/assets/configs/sectionConfig.js"},{"deps":{},"path":"preview-scripts/assets/configs/storyConfig.js"},{"deps":{"textConfig":1},"path":"preview-scripts/assets/scripts/guildNodeMgr.js"},{"deps":{},"path":"preview-scripts/assets/configs/addPropertySysConfig.js"},{"deps":{"helper":2},"path":"preview-scripts/assets/scripts/bulletMgr.js"},{"deps":{"textConfig":1,"helper":2,"dataMgr":35,"levelConfig":44,"networkMgr":29,"resMgr":32,"sectionConfig":21,"gameMgr":14,"levelSceneConfig":45},"path":"preview-scripts/assets/scripts/levelMgr.js"},{"deps":{"dataMgr":35,"networkMgr":29},"path":"preview-scripts/assets/scripts/libs/loginMgr.js"},{"deps":{"textConfig":1,"dataMgr":35,"loginMgr":27,"networkMgr":29,"advertisMgr":41,"resMgr":32},"path":"preview-scripts/assets/scripts/loginSceneMgr.js"},{"deps":{"gloableConfig":12,"dataMgr":35},"path":"preview-scripts/assets/scripts/libs/networkMgr.js"},{"deps":{"helper":2},"path":"preview-scripts/assets/scripts/targetMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/libs/gestureMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/libs/resMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/levelAreaNodeMgr.js"},{"deps":{"dataMgr":35,"networkMgr":29,"systemsMgr":9},"path":"preview-scripts/assets/scripts/libs/timerSystemsMgr.js"},{"deps":{"globalRedPointMgr":40,"systemsMgr":9,"networkMgr":29,"timerSystemsMgr":34},"path":"preview-scripts/assets/scripts/libs/dataMgr.js"},{"deps":{"systemsMgr":9,"sectionConfig":21},"path":"preview-scripts/assets/scripts/mainScene/selectSectionUIMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/selectedEffectMgr.js"},{"deps":{"sectionConfig":21,"mailSysConfig":19,"textConfig":1,"dataMgr":35,"bgmMgr":46,"notificationMgr":39,"systemsMgr":9},"path":"preview-scripts/assets/scripts/mainScene/selectSectionElementMgr.js"},{"deps":{"resMgr":32},"path":"preview-scripts/assets/scripts/singleInstanceSystems/notificationMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/singleInstanceSystems/globalRedPointMgr.js"},{"deps":{"notificationMgr":39,"resMgr":32,"textConfig":1},"path":"preview-scripts/assets/scripts/singleInstanceSystems/advertisMgr.js"},{"deps":{},"path":"preview-scripts/assets/scripts/systems/ensureSys_notUse/ensureSystemNodeMgr.js"},{"deps":{"textConfig":1,"notificationMgr":39,"mailSysConfig":19,"dataMgr":35,"mailConfig":10},"path":"preview-scripts/assets/scripts/mainScene/levelNodeMgr.js"},{"deps":{},"path":"preview-scripts/assets/configs/levelConfig.js"},{"deps":{},"path":"preview-scripts/assets/configs/levelSceneConfig.js"},{"deps":{"sectionConfig":21},"path":"preview-scripts/assets/scripts/singleInstanceSystems/bgmMgr.js"}];
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
    