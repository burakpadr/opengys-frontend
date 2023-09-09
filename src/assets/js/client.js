import axios from "axios"

export const gysClient = axios.create({
    baseURL: process.env.VUE_APP_GYS_REST_API_URL
});

gysClient.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNjk0NDY3NzAyfQ.msrjYV7kWZEw7r-UVGvrfnz_Tpv0rUFUyg5EMMA4CKQ"