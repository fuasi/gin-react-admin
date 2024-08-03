import { apiRequest } from "@/apis";
import { GetList, SearchQuery } from "@/apis/common/base.ts";


export interface User {
  id : number
  username? : string
  nickname? : string
  avatar? : string
  phone? : string
  enable? : number
  createdAt? : string
  updatedAt? : string
  path : string
  roleId : number[]
}

export function getUsers(query : SearchQuery<User>) {
  return apiRequest<GetList<User>>({
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
