import axios from "axios"

export const gysClient = axios.create({
    baseURL: process.env.VUE_APP_GYS_REST_API_URL
});

gysClient.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzA0MzA1NjMyfQ.nQ70s42Bxic0OSVk-vAq7jU3U9t5P2oOVm7wv3aCb80"