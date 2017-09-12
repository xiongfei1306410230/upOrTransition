import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue';

Vue.use(VueRouter)
import sql from './components/sql.vue'
import download from './components/download.vue'
import upload from './components/upload.vue'

const Routers= [
                {
                    path: '/download1',
                    name:'download',
                    component: download 
                },
                { 
                    path: '/sql',
                    name:'sql',
                    component: sql 
                },
                { 
                    path: '/upload',
                    name:'upload',
                    component: upload
                }
    ]

const router = new VueRouter({
    history: false,
    hashbang: true,
    base: __dirname,
    routes: Routers
});



new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
