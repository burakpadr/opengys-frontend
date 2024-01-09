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
    }
]

gysClient.post("ui-elements", COMPONENTS).then(() => {
    console.log("UI components has been registered.")
});