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
            component: Index
        },
        {
            path: '/factory',
            name: 'Factory',
            component: Factory
        },
        {
            path: '/depository',
            name: 'Depository',
            component: Depository
        },
        {
            path: '/exhibition-hall',
            name: 'ExhibitionHall',
            component: ExhibitionHall
        },
        {
            path: '/new-material',
            name: 'NewMaterial',
            component: NewMaterial
        },
        {
            path: '/depository-component',
            name: 'DepositoryComponent',
            component: DepositoryComponent
        }
    ]
})
