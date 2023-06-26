import axios from "axios";
import userApi from "./userApi.ts";

const request = axios.create({
    baseURL: "/api",
    timeout: 10000
})

request.interceptors.request.use((config) => {
    return config
})
request.interceptors.response.use((config) => {
    return config
})
export {request, userApi}
