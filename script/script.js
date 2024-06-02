const axios = require('axios');

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

console.log("Script is running");

const gysClient = axios.create({
    baseURL: process.env.VUE_APP_GYS_REST_API_URL
});

const COMPONENTS = [
    {
        componentName: "AdvertInformation",
        label: "İlanlar"
    },
    {
        componentName: "RealEstateBasicInformation",
        label: "Gayrimenkul temel bilgileri"
    },
    {
        componentName: "RealEstatePhoto",
        label: "Gayrimenkul fotoğrafları"
    },
    {
        componentName: "RealEstateListView",
        label: "Gayrimenkul listesi"
    },
    {
        componentName: "CategoryView",
        label: "Kategori tanımı"
    },
    {
        componentName: "AttributeView",
        label: "Gayrimenkul özelliği tanımı"
    },
    {
        componentName: "AdvertPlaceView",
        label: "İlan teri tanımı"
    },
    {
        componentName: "RoleView",
        label: "Güvenlik > Rol Mekanizması"
    },
    {
        componentName: "StaffView",
        label: "Kullanıcı Yönetimi > Alt Kullanıcı"
    },
    {
        componentName: "TenantView",
        label: "Kullanıcı Yönetimi > Kiracılar"
    },
    {
        componentName: "RentalContractInformation",
        label: "Sözleşmeler"
    },
    {
        componentName: "PaymentDeclarationStaffView",
        label: "Ödeme İşlemleri > Ödeme Beyanları"
    },
    {
        componentName: "DashboardStaffView",
        label: "Dashboard"
    }
]

gysClient.post("ui-elements", COMPONENTS).then(() => {
    console.log("UI components has been registered.")
});