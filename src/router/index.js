import Vue from 'vue'
import Router from 'vue-router'
import Factory from '@/pages/factory'
import Depository from '@/pages/depository'
import DepositoryComponent from '@/pages/depository-component'
import ExhibitionHall from '@/pages/exhibition-hall'
import NewMaterial from '@/pages/new-material'
import Index from '@/pages/index'

Vue.use(Router)

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
            path: '/factory',
            name: 'Factory',
            meta: {
                title: '首页'
            },
            component: Factory
        },
        {
            path: '/depository',
            name: 'Depository',
            meta: {
                title: '页面工厂'
            },
            component: Depository
        },
        {
            path: '/exhibition-hall',
            name: 'ExhibitionHall',
            meta: {
                title: '页面展示'
            },
            component: ExhibitionHall
        },
        {
            path: '/new-material',
            name: 'NewMaterial',
            meta: {
                title: '单位组件'
            },
            component: NewMaterial
        },
        {
            path: '/depository-component',
            name: 'DepositoryComponent',
            meta: {
                title: '组件工厂'
            },
            component: DepositoryComponent
        }
    ]
})
