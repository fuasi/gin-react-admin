import axios from 'axios';
import GLOBAL_CONFIG from '@/config';
import { getToken } from '@/utils/token.ts';
import baseApis from './baseApis.ts';


interface Response<T> {
    code: number
    msg: string
    data: T
}

export type HTTPResponse<T> = Promise<Response<T>>


const apiRequest = axios.create({
    baseURL: GLOBAL_CONFIG.API_BASEURL,
    timeout: GLOBAL_CONFIG.API_TIMEOUT
})


apiRequest.interceptors.request.use((config) => {
    const token = getToken()
    if (token)
        config.headers.setAuthorization(`Bearer ${ token }`)
    // NProgress.start()
    return config
})
apiRequest.interceptors.response.use((response) => {
    const { data } = response
    const { code, msg } = data
    if (code != GLOBAL_CONFIG.SUCCESS_STATUS) {
        throw new Error(msg || '异常错误')
    }
    // NProgress.done()
    return data
})


export { apiRequest, baseApis }

