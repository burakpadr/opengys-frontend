import { createRouter, createWebHistory } from 'vue-router'
import AdvertPlaceView from '../views/AdvertPlaceView.vue'

const routes = [
    { path: "/advert-places", component: AdvertPlaceView }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;