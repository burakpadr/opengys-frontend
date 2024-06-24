import axios from "axios"

export const gysClient = axios.create({
    baseURL: process.env.VUE_APP_GYS_REST_API_URL
});

export function refreshAcceptLanguage() {
    let locale = localStorage.getItem("locale");

    if (locale) {
        if (locale === 'en') {
            gysClient.defaults.headers.common['Accept-Language'] = "en-US";
        }
        else if (locale === 'tr') {
            gysClient.defaults.headers.common['Accept-Language'] = "en-TR";
        }
    }
}

gysClient.defaults.headers.common['Authorization'] = localStorage.getItem("token");

refreshAcceptLanguage();