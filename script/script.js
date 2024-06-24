const axios = require('axios');

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

console.log("Script is running");

const gysClient = axios.create({
    baseURL: process.env.VUE_APP_GYS_REST_API_URL
});

const COMPONENTS = [
    {
        componentName: "AdvertInformation",
        label: "Gayrimenkul > İlanlar"
    },
    {
        componentName: "RealEstateBasicInformation",
        label: "Gayrimenkul > Temel Bilgiler"
    },
    {
        componentName: "RealEstatePhoto",
        label: "Gayrimenkul > Fotoğraflar"
    },
    {
        componentName: "RealEstateListView",
        label: "Gayrimenkuller"
    },
    {
        componentName: "CategoryView",
        label: "Sistem Tanımları > Kategoriler"
    },
    {
        componentName: "AttributeView",
        label: "Sistem Tanımları > Özellikler"
    },
    {
        componentName: "AdvertPlaceView",
        label: "Sistem Tanımları > İlan Yerleri"
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
        label: "Gayrimenkul > Sözleşmeler"
    },
    {
        componentName: "PaymentDeclarationStaffView",
        label: "Ödeme İşlemleri > Ödeme Beyanları"
    },
    {
        componentName: "DashboardStaffView",
        label: "Dashboard"
    },
    {
        componentName: "RentPaymentPlanInformation",
        label: "Gayrimenkul > Sözleşmeler > Kira Ödeme Planı"
    }
]

gysClient.post("ui-elements", COMPONENTS).then(() => {
    console.log("UI components has been registered.")
});