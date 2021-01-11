// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import '@/assets/system-icons/iconfont.css';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    document.title = '1TAK - ' + to.meta.title;
    next();
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});
