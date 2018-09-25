import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import App from './App.vue'

Vue.config.productionTip = false

const routes = [
    { path: '/:id?', component: App }
];

const router = new VueRouter({
    routes: routes
})

new Vue({
  router: router
}).$mount('#app')
