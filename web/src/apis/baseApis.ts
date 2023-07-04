import {apiRequest, Response} from "./index.ts";

interface LoginQuery {
    username: string
    password: string
}

const baseApis = {
    login: (query: LoginQuery): Promise<Response<string>> => {
        return apiRequest({
            url: "/login",
            method: "POST",
            data: query
        })
    },
    checkLogin: (): Promise<Response<string>> => {
        return apiRequest({
            url: "/check",
            method: "POST",
        })
    }

}

export default baseApis

