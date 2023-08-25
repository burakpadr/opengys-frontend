import axios from "axios"

export const gysClient = axios.create({
    baseURL: process.env.VUE_APP_GYS_REST_API_URL
});

gysClient.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNjkzMTY4MTkzfQ.SP09lWD6zFTz3QtoJ34QBi1nJ_8xN_MgIpAd9KXSs9w"