const axios = require('axios');

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

console.log("Script is running");

const gysClient = axios.create({
    baseURL: process.env.VUE_APP_GYS_REST_API_URL
});

const COMPONENTS = [
    {
        componentName: "AdvertInformation",
        label: "page.advertInformation"
    },
    {
        componentName: "RealEstateBasicInformation",
        label: "page.realEstateBasicInformation"
    },
    {
        componentName: "RealEstatePhoto",
        label: "page.realEstatePhoto"
    },
    {
        componentName: "RealEstateListView",
        label: "page.realEstateListView"
    },
    {
        componentName: "CategoryView",
        label: "page.categoryView"
    },
    {
        componentName: "AttributeView",
        label: "page.attributeView"
    },
    {
        componentName: "AdvertPlaceView",
        label: "page.advertPlaceView"
    },
    {
        componentName: "RoleView",
        label: "page.roleView"
    },
    {
        componentName: "StaffView",
        label: "page.staffView"
    },
    {
        componentName: "TenantView",
        label: "page.tenantView"
    },
    {
        componentName: "RentalContractInformation",
        label: "page.rentalContractInformation"
    },
    {
        componentName: "PaymentDeclarationStaffView",
        label: "page.paymentDeclarationStaffView"
    },
    {
        componentName: "DashboardStaffView",
        label: "page.dashboardStaffView"
    },
    {
        componentName: "RentPaymentPlanInformation",
        label: "page.rentPaymentPlanInformation"
    }
]

gysClient.post("ui-elements", COMPONENTS).then(() => {
    console.log("UI components has been registered.")
});