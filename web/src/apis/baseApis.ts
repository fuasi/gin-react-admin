import { apiRequest } from './index.ts';
import { SearchIsOptionType } from "@/hooks/useTable.tsx";

export type SearchQuery<T> = T & PageInfo

export interface GetList<T> {
  list : T[]
  total : number
}

export interface GetApiGroupList<T> {
  list : T[]
  total : number
  apiGroupOptions : SearchIsOptionType
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
  required : boolean
  isApiGroup : number
}

export function login(query : LoginQuery) {
  return apiRequest<{ token : string }>({
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
