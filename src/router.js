import Vue from 'vue';
import Router from 'vue-router'
import MainPage from "./components/MainPage";
import Shop from "./components/Shop";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path:'/',
            component: MainPage,
            name:'main_page',
        },
        {
            path:'/shop/:shopId',
            component: Shop,
            props:true,
            name: 'shop',
        }
    ]
})

