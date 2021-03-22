import Vue from 'vue';
import Router from 'vue-router';
import FactoryPage from '@/pages/factory-page/index';
import Factory from '@/pages/factory/index';
import PageExhibition from '@/pages/page-exhibition/index';
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
            path: '/factory/page',
            name: 'FactoryPage',
            meta: {
                title: '页面工厂'
            },
            component: FactoryPage
        },
        {
            path: '/factory',
            name: 'Factory',
            meta: {
                title: '组件工厂'
            },
            component: Factory
        },
        {
            path: '/page/exhibition',
            name: 'PageExhibition',
            meta: {
                title: '页面展示'
            },
            component: PageExhibition
        }
    ]
});
