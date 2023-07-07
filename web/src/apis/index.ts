import axios from "axios";
import GLOBAL_CONFIG from "../config";
import {getToken} from "../utils/cookie.ts";
import baseApis from "./baseApis.ts";
import NProgress from "../utils/nprogress.ts";



export interface Response<T> {
    code: number
    msg: string
    data: T
}

const apiRequest = axios.create({
    baseURL: GLOBAL_CONFIG.API_BASEURL,
    timeout: GLOBAL_CONFIG.API_TIMEOUT
})


apiRequest.interceptors.request.use((config) => {
    config.headers.setAuthorization(`Bearer ${getToken()}`)
    NProgress.start()
    return config
})
apiRequest.interceptors.response.use((config) => {
    const {data} = config
    NProgress.done()
    return data
})


export {apiRequest, baseApis}

