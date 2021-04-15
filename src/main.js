import Vue from 'vue';
import axios from 'axios';
import App from './App';
import router from './router';
import { install, Prototypes, ColorPicker, Slider } from 'heyui';
import 'default-passive-events';
import '@/assets/system-icons/iconfont.css';
require('../css/heyui.less');

Vue.config.productionTip = false;
Vue.use(install, { components: { ColorPicker, Slider }, prototypes: Prototypes });
const ajaxP = axios.create({
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
    '/updateMock'
].map(url => {
    return 'https://' + BASE_URL + url
});
Vue.prototype.$ajax = axios;
Vue.prototype.$ajax.post = function (url, options) {
    if (window.mock && whiteList.indexOf(url) === -1) {
        url = url.replace(BASE_URL, BASE_URL + '/mock');
    }
    return ajaxP.post(url, options).then(res => Promise.resolve(res.data));
};
Vue.prototype.$ajax.get = function (url, options) {
    if (window.mock && whiteList.indexOf(url) === -1) {
        url = url.replace(BASE_URL, BASE_URL + '/mock');
    }
    return ajaxP.get(url, options).then(res => Promise.resolve(res.data));
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
