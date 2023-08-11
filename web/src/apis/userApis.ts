import { apiRequest } from "@/apis/index.ts";
import { PageInfo } from "@/apis/baseApis.ts";

export interface GetUsers {
  list : User[]
  total : number
}

export interface User {
  id : number
  username? : string
  nickname? : string
  avatar? : string
  phone? : string
  enable? : number
  createdAt? : string
  updatedAt? : string
}

export type SearchUsersQuery = User & PageInfo

export function getUsers(query : SearchUsersQuery) {
  return apiRequest<GetUsers>({
    url : "/users",
    method : "POST",
    data : query
  })
}

export function updateUserInfo(user : User) {
  return apiRequest<string>({
    url : `/user`,
    method : "PATCH",
    data : user
  })
}

export function getUserById(query : number) {
  return apiRequest<User>({
    url : `/user/${ query }`,
    method : "GET"
  })
}

export function uploadAvatar(form : FormData) {
  return apiRequest<string>({
    url : "/avatar",
    method : "POST",
    data : form
  })
}

export function deleteUser(id : number[]) {
  return apiRequest<string>({
    url : `/user`,
    method : "DELETE",
    data : id
  })
}

export function insertUser(user : User) {
  return apiRequest<string>({
    url : "/user",
    method : "PUT",
    data : user
  })
}

export function resetUserPassword(id : number) {
  return apiRequest<string>({
    url : `/user/${ id }`,
    method : "PATCH",
  })
}

export function getSelfInfo() {
  return apiRequest<User>({
    url : "/user",
    method : "GET"
  })
}