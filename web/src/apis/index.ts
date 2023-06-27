import axios, {AxiosResponse} from "axios";
import userApi from "@/apis/user_api";
import {getToken} from "@/utils/cookie";
import {baseConfig} from "@/config";
import {consumeIterator} from "next/dist/build/babel/loader/util";
import {rejects} from "assert";

interface Response<T> {
    code: number
    msg: string
    data: T
}

interface RequestParams<T> {
    url: string,
    data?: T
}

const request = axios.create({
    baseURL: baseConfig.BASE_URL,
    timeout: baseConfig.TIME_OUT
})

request.interceptors.request.use((config) => {
    config.headers['Authorization'] = `bearer ${getToken()}`
    return config
})

request.interceptors.response.use((config) => {
    if (config.data.code === 20000) {
        return config.data
    }
    return new Promise(rejects => {
        rejects(config.data.msg || "系统异常")
    })
})

export const getRequest = <T, V>(params: RequestParams<T>): Promise<Response<V>> => {
    return request({
        method: "GET",
        url: params.url,
        data: params.data
    })
}

export const postRequest = <T, V>(params: RequestParams<T>): Promise<Response<V>> => {
    return request({
        method: "POST",
        url: params.url,
        data: params.data
    })
}
export const putRequest = <T, V>(params: RequestParams<T>): Promise<Response<V>> => {
    return request({
        method: "PUT",
        url: params.url,
        data: params.data
    })
}
export const deleteRequest = <T, V>(params: RequestParams<T>): Promise<Response<V>> => {
    return request({
        method: "DELETE",
        url: params.url,
        data: params.data
    })
}
export {userApi}