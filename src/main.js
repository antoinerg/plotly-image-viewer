import Vue from 'vue/dist/vue.js'

// Main app
import App from './App.vue'

// Router
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    { path: '/:id?', component: App }
];

const router = new VueRouter({
    routes: routes
})

// FontAwesome: https://fontawesome.com/how-to-use/on-the-web/using-with/vuejs
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamation, faCheck,  faDownload, faSquare, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'

library.add(faExclamation, faCheck, faDownload, faSquare, faCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)

Vue.config.productionTip = false

new Vue({
  router: router
}).$mount('#app')
