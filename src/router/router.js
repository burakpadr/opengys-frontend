import { createRouter, createWebHistory } from 'vue-router'

import AdvertPlaceView from '../views/AdvertPlaceView.vue'
import CategoryView from '../views/CategoryView.vue'
import RealEstateListView from '../views/RealEstateListView.vue'
import AttributeView from '../views/AttributeView.vue'
import RoleView from '../views/RoleView.vue'
import StaffView from '@/views/StaffView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import TenantView from '@/views/TenantView.vue'

const routes = [
    { path: "/advert-places", component: AdvertPlaceView },
    { path: "/categories", component: CategoryView },
    { path: "/real-estates", component: RealEstateListView },
    { path: "/attributes", component: AttributeView },
    { path: "/roles", component: RoleView},
    { path: "/staffs", component: StaffView },
    { path: "/reset-password", component: ResetPasswordView },
    { path: "/tenants", component: TenantView }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;