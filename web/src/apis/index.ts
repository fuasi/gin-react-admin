import axios, { AxiosRequestConfig } from 'axios';
import GLOBAL_CONFIG from '@/config';
import { tokenStore } from '@/store/localstrageStore.ts';


interface Response<T> {
    code: number
    msg: string
    data: T
}

export type HTTPResponse<T> = Promise<Response<T>>


const ins = axios.create({
    baseURL : GLOBAL_CONFIG.API_BASEURL,
    timeout : GLOBAL_CONFIG.API_TIMEOUT
})


ins.interceptors.request.use((config) => {
    const token = tokenStore.token
    if (token)
        config.headers.setAuthorization(`Bearer ${token}`)
    // NProgress.start()
    return config
})
ins.interceptors.response.use((response) => {
    const { data } = response
    const { code, msg } = data
    if (code != GLOBAL_CONFIG.SUCCESS_STATUS) {
        throw new Error(msg || '异常错误')
    }
    // NProgress.done()
    return data
})

const apiRequest = <T = any>(config: AxiosRequestConfig): HTTPResponse<T> => {
    return ins(config)
}


export { apiRequest }

