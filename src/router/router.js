import { createRouter, createWebHistory } from 'vue-router'

import AdvertPlaceView from '../views/AdvertPlaceView.vue'
import CategoryView from '../views/CategoryView.vue'
import RealEstateListView from '../views/RealEstateListView.vue'
import AttributeView from '../views/AttributeView.vue'
import RoleView from '../views/RoleView.vue'
import StaffView from '@/views/StaffView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import TenantView from '@/views/TenantView.vue'
import PaymentDeclarationStaffView from '@/views/PaymentDeclarationStaffView.vue'

import PaymentDeclarationTenantView from '@/views/PaymentDeclarationTenantView.vue'

const routes = [
    { path: "/administration/advert-places", component: AdvertPlaceView },
    { path: "/administration/categories", component: CategoryView },
    { path: "/administration/real-estates", component: RealEstateListView },
    { path: "/administration/attributes", component: AttributeView },
    { path: "/administration/roles", component: RoleView},
    { path: "/administration/staffs", component: StaffView },
    { path: "/administration/reset-password", component: ResetPasswordView },
    { path: "/administration/tenants", component: TenantView },
    { path: "/administration/payment-declarations", component: PaymentDeclarationStaffView },
    { path: "/customer/payment-declarations", component: PaymentDeclarationTenantView }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;