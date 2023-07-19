import { apiRequest } from "@/apis/index.ts";

export interface PageInfo {
    pageSize: number
    page: number
}

export interface GetUsers {
    list: User[]
    total: number
}

export interface User {
    id: number
    username?: string
    nickname?: string
    avatar?: string
    phone?: string
    enable?: boolean
    createdAt?: string
    updatedAt?: string
}

export function getUsers(query: PageInfo) {
    return apiRequest<GetUsers>({
        url : "/users",
        method : "POST",
        data : query
    })
}

export function updateUserInfo(query: User) {
    return apiRequest<string>({
        url : `/user`,
        method : "PATCH",
        data : query
    })
}

export function uploadAvatar() {
    return apiRequest<string>({
        url : "/avatar",
        method : "POST"
    })
}

