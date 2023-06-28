import userApi from "@/apis/user_api";
import {getToken} from "@/utils/cookie";
import {baseConfig} from "@/config";

interface RequestParams {
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: any
}

interface SelectRequestParams<T> {
    url: string
    data?: T
}


export const fetchRequest = async (url: string, requestInit: RequestInit) => {
    const data = await fetch(`${baseConfig.BASE_URL}${url}`, requestInit)
    return data.json()
}

export const baseRequestInit = (params: RequestInit): RequestInit => {
    return {
        ...params,
        headers: {
            Authorization: getToken()
        },
    }
}

export {userApi}