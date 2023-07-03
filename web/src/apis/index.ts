import axios from "axios";
import GLOBAL_CONFIG from "../config";
import {getToken} from "../utils/cookie.ts";

const apiRequest = axios.create({
    baseURL: GLOBAL_CONFIG.API_BASEURL,
    timeout: GLOBAL_CONFIG.API_TIMEOUT
})


apiRequest.interceptors.request.use((config) => {
    config.headers.setAuthorization(getToken())
    return config
})
apiRequest.interceptors.response.use((config) => {
    console.log(config)
    return config
})

