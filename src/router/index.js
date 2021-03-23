import Vue from 'vue';
import Router from 'vue-router';
import GHtml from '@/pages/ghtml/index';
import ViewPage from '@/pages/view/index';
import PageList from '@/pages/view/list';
import VvPage from '@/pages/vvPage/index';
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
            path: '/ghtml',
            name: 'GHtml',
            meta: {
                title: 'G HTML'
            },
            component: GHtml
        },
        {
            path: '/pageList',
            name: 'pageList',
            meta: {
                title: '页面列表'
            },
            component: PageList
        },
        {
            path: '/view',
            name: 'View',
            meta: {
                title: '页面'
            },
            component: ViewPage
        },
        {
            path: '/vvPage',
            name: 'VvPage',
            meta: {
                title: '组件工厂'
            },
            component: VvPage
        }
    ]
});
