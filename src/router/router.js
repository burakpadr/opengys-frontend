import { createRouter, createWebHistory } from 'vue-router'

import AdvertPlaceView from '../views/AdvertPlaceView.vue'
import CategoryView from '../views/CategoryView.vue'

const routes = [
    { path: "/advert-places", component: AdvertPlaceView },
    { path: "/categories", component: CategoryView }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;