import Vue from 'vue';
import axios from 'axios';
import App from './App';
import { install, Prototypes, ColorPicker, Slider } from 'heyui';
import 'default-passive-events';
import '@/assets/system-icons/iconfont.css';
require('../css/heyui.less');
// 指令
const req = require.context('./utils/directives/', false, /\.js/);
const directives = req.keys().reduce((directives, module) => {
    const mod = req(module);
    directives[module.replace('./', '').replace('.js', '')] = mod.default;
    return directives;
}, {});
Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key]);
})

Vue.config.errorHandler = function (err, vm, info) {
    var errBox = document.getElementById('error-box');
    if (errBox) {
        var div = document.createElement('div');
        div.innerHTML = err;
        errBox.appendChild(div);
    }
};

Vue.config.productionTip = false;
Vue.use(install, { components: { ColorPicker, Slider }, prototypes: Prototypes });

const ajax = axios.create({
    headers: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' }
});
const BASE_URL = 'mini-lab-cloudbase-4dxr8e7b614a4-1259082755.ap-shanghai.app.tcloudbase.com/container-gahoulab';
window.basicUrl = 'https://' + BASE_URL;
var whiteList = [
    '/saveMeta',
    '/getMeta',
    '/getList',
    '/getListMock',
    '/saveMock',
    '/updateMock',
    '/getPreScript',
    '/updatePreScript'
].map(url => {
    return 'https://' + BASE_URL + url
});
Vue.prototype.$ajax = axios;
Vue.prototype.$ajax.post = function (url, options) {
    if (url[0] === '/') {
        url = window.basicUrl + url;
    }
    if (window.mock && whiteList.indexOf(url) === -1) {
        url = url.replace(BASE_URL, BASE_URL + '/mock');
    }
    return ajax.post(url, options).then(res => Promise.resolve(res.data));
};
Vue.prototype.$ajax.get = function (url, options) {
    if (url[0] === '/') {
        url = window.basicUrl + url;
    }
    if (window.mock && whiteList.indexOf(url) === -1) {
        url = url.replace(BASE_URL, BASE_URL + '/mock');
    }
    return ajax.get(url, options).then(res => Promise.resolve(res.data));
}

/* eslint-disable */
Date.prototype.Format = function (fmt) {
    var o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S': this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}
function loadScript (src, callback) {
    var script = document.createElement('script');
    var head = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.async = false;
    script.src = src;
    // function answer () {
    //     if (!script.readyState || script.readyState === 'loaded' || script.readyState === 'complete') {
    //         if (callback) {
    //             callback();
    //         }
    //         script.onload = script.onreadystatechange = null;
    //     }
    // };
    if (script.addEventListener) {
        script.addEventListener('load', function () {
            callback();
        }, false);
    } else if (script.attachEvent) {
        script.attachEvent('onreadystatechange', function () {
            var target = window.event.srcElement;
            if (target.readyState === 'loaded') {
                callback();
            }
        });
    }
    head.appendChild(script);
};
function loadLink (src, callback) {
    var linkTag = document.createElement('link');
    var head = document.getElementsByTagName('head')[0];
    linkTag.id = 'dynamic-style';
    linkTag.href = src;
    linkTag.setAttribute('rel', 'stylesheet');
    linkTag.setAttribute('type', 'text/css');
    if (linkTag.addEventListener) {
        linkTag.addEventListener('load', function () {
            callback();
        }, false);
    } else if (linkTag.attachEvent) {
        linkTag.attachEvent('onreadystatechange', function () {
            var target = window.event.srcElement;
            if (target.readyState === 'loaded') {
                callback();
            }
        });
    }
    head.appendChild(linkTag);
};

// 获取前置脚本信息
Vue.prototype.$ajax.get('/getPreScript').then(res => {
    if (res.code === 0) {
        window.preScript = res.data.script;
        if (window.preScript.useScript) {
            window.preScript.scriptList.forEach(url => {
                loadScript(url, function () {
                    scriptMaps.count++;
                });
            });
            window.preScript.styleList.forEach(url => {
                loadLink(url, function () {
                    scriptMaps.count++;
                });
            });
            var scriptMaps = {};
            var scriptMapsCount = 0;
            var check = window.preScript.scriptList.length + window.preScript.styleList.length;
            Object.defineProperty(scriptMaps, 'count', {
                get: () => {
                    return scriptMapsCount;
                },
                set: function (newValue) {
                    scriptMapsCount = newValue;
                    if (newValue === check) {
                        // 前置脚本
                        try {
                            /* eslint-disable */
                            var resFunc = new Function('return ' + window.preScript.script).call(this);
                            /* eslint-enable */
                            resFunc.call(this, Vue);
                        } catch (e) {
                            console.log(e);
                        }
                        // new Vue
                        var router = require('./router').default;
                        /* eslint-enable */
                        router.beforeEach((to, from, next) => {
                            document.title = 'Vv Page - ' + to.meta.title;
                            next();
                        });
                        /* eslint-disable no-new */
                        new Vue({
                            el: '#app',
                            router,
                            components: { App },
                            template: '<App/>'
                        });
                    }
                }
            });
        } else {
            window.customerCamps = {};
            window.customerCampsConfig = [];
            // new Vue
            var router = require('./router').default;
            /* eslint-enable */
            router.beforeEach((to, from, next) => {
                document.title = 'Vv Page - ' + to.meta.title;
                next();
            });
            /* eslint-disable no-new */
            new Vue({
                el: '#app',
                router,
                components: { App },
                template: '<App/>'
            });
        }
    } else {
        alert('获取前置脚本失败！')
    }
});
