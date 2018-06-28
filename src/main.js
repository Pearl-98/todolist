// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import vueg from 'vueg'
import $ from 'expose-loader?$!jquery';
import 'vueg/css/transition-min.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(vueg, router, {
    forwardAnim: 'fadeInRight',
    duration:'0.6'
})

const store = new Vuex.Store({
    state: {
        page3: {
            forwardAnim: 'lightSpeedIn',
            duration: '0.6',
            backAnim: 'lightSpeedOut'
        }
    },
    mutations: {
        setState(state, val) {
            state[val.key] = val.value
        }
    }
})
//定义store存放全局状态

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
