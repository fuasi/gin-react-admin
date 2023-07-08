import { apiRequest, HTTPResponse } from './index.ts';

interface LoginQuery {
    username: string
    password: string
}

export interface RouterResponse {
    id: number
    name: string
    icon: string
    path: string
    componentPath: string
    parentId: number
    routerOrder: number
    children?: RouterResponse[]
}

const baseApis = {
    login: (query: LoginQuery): HTTPResponse<string> => {
        return apiRequest({
            url: '/login',
            method: 'POST',
            data: query
        })
    },
    checkLogin: (): HTTPResponse<string> => {
        return apiRequest({
            url: '/check',
            method: 'POST',
        })
    },
    getRouter: (): HTTPResponse<RouterResponse[]> => {
        return apiRequest({
            url: '/router',
            method: 'GET'
        })
    }

}

export default baseApis

