import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import page1 from '@/components/page1'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '',
        name: 'default',
        component: Login
    }, {
        path: '/',
        name: 'Login',
        component: Login
    }, {
        path: '/page1',
        name: 'page1',
        component: page1
    }]
})
