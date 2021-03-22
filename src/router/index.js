import Vue from 'vue';
import Router from 'vue-router';
import ViewPage from '@/pages/view/index';
import Factory from '@/pages/factory/index';
import Index from '@/pages/index';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            meta: {
                title: '首页'
            },
            component: Index
        },
        {
            path: '/page',
            name: 'View',
            meta: {
                title: '页面列表'
            },
            component: ViewPage
        },
        {
            path: '/factory',
            name: 'Factory',
            meta: {
                title: '组件工厂'
            },
            component: Factory
        }
    ]
});
