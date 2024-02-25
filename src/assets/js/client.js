import axios from "axios"

export const gysClient = axios.create({
    baseURL: process.env.VUE_APP_GYS_REST_API_URL
});

gysClient.defaults.headers.common['Authorization'] = localStorage.getItem("token");
gysClient.defaults.headers.common['Accept-Language'] = "en-tr"