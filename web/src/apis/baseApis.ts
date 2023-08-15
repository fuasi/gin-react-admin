import { apiRequest } from './index.ts';
import { User } from "@/apis/userApis.ts";

export interface GetList<T> {
  list : T[]
  total : number
}

export interface PageInfo {
  pageSize : number
  page : number
}

export interface LoginQuery {
  username : string
  password : string
}

export interface RouterResponse {
  id : number
  name : string
  icon : string
  path : string
  componentPath : string
  parentId : number
  routerOrder : number
  children? : RouterResponse[]
  hidden : boolean
}

export function login(query : LoginQuery) {
  return apiRequest<{ user : User, token : string }>({
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
    url : '/routers',
    method : 'GET'
  })
}
