import Vue from 'vue';
import App from './App';
import router from './router';
import { install, Prototypes, ColorPicker, Slider } from 'heyui';
import 'default-passive-events';
import '@/assets/system-icons/iconfont.css';
require('../css/heyui.less');

Vue.config.productionTip = false;
Vue.use(install, { components: { ColorPicker, Slider }, prototypes: Prototypes });

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
