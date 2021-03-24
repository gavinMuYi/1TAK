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
Vue.prototype.$ajax = axios;

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
