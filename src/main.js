import Vue from 'vue';
import App from './App';
import router from './router';
import '@/assets/system-icons/iconfont.css';

Vue.config.productionTip = false;

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
