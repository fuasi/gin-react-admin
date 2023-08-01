import { apiRequest } from './index.ts';

export interface PageInfo {
    pageSize: number
    page: number
}

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

export function login(query: LoginQuery) {
    return apiRequest<string>({
        url : '/login',
        method : 'POST',
        data : query
    })
}

export function checkLogin() {
    return apiRequest<string>({
        url : '/check',
        method : 'POST',
    })
}

export function getRouter() {
    return apiRequest<RouterResponse[]>({
        url : '/router',
        method : 'GET'
    })
}
