import axios from "axios"

export const gysClient = axios.create({
    baseURL: process.env.VUE_APP_GYS_REST_API_URL
});

gysClient.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaXNTdGFmZiI6dHJ1ZSwiZXhwIjoxNzA0OTk1NzA3fQ.nVlSW1O00zz2z5ZDarOCDYDRicv5MlMt98rov_dNTog"