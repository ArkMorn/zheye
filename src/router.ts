import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import CreatePost from '@/views/CreatePost.vue'
import ColumnDetail from '@/views/ColumnDetail.vue'

const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [{
        path: "/",
        name: "home",
        component: Home
    }, {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            redirectAlreadyLogin: true
        }
    }, {
        path: "/create",
        name: "create",
        component: CreatePost,
        meta: {
            requireLogin: true
        }
    }, {
        path: "/column/:id",
        name: "column",
        component: ColumnDetail,
        meta: {
            requireLogin: true
        }
    },]
})
router.beforeEach((to, from, next) => {
    const { isLogin } = store.state.user
    const { requireLogin, redirectAlreadyLogin } = to.meta
    if (requireLogin&&!isLogin) {
        next('/login')
    } else if (redirectAlreadyLogin && isLogin) {
        next('/')

    } else {
        next()
    }
})
export default router