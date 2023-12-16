import axios from "axios"

export const gysClient = axios.create({
    baseURL: process.env.VUE_APP_GYS_REST_API_URL
});

gysClient.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzAyODMxNjcyfQ.YamXp6QVFnVff2TaQb_uoQUYxB-U9xukZTfRc-Xrql8"