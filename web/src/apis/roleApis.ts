import { apiRequest } from "@/apis/index.ts";
import { GetList, RouterResponse, SearchQuery } from "@/apis/baseApis.ts";
import { Api } from "@/apis/apiApis.ts";

export interface Role {
  id : number;
  roleName : string;
  allowApiId : number[];
  allowRouterId : number[];
  defaultHome : number;
}

export interface RoleRouterTree {
  routers : RouterResponse[]
  selected : number[]
}

export interface RoleApis {
  apis : Api[]
  selected : number[]
}

export function getRoleList(query : SearchQuery<Role>) {
  return apiRequest<GetList<Role>>({
    url : "/roles",
    method : "POST",
    data : query
  })
}

export function deleteRole(id : number[]) {
  return apiRequest({
    url : "/role",
    method : "DELETE",
    data : id
  })
}

export function insertRole(role : Role) {
  return apiRequest({
    url : "/role",
    method : "PUT",
    data : role
  })
}

export function updateRole(role : Role) {
  return apiRequest({
    url : "/role",
    method : "PATCH",
    data : role
  })
}

export function getRoleById(query : number) {
  return apiRequest<Role>({
    url : `/role/${ query }`,
    method : "GET"
  })
}

export function getMenu(query : number) {
  return apiRequest<RoleRouterTree>({
    url : `/routers/${ query }`,
    method : "GET"
  })
}

export function getAuthority(query : number) {
  return apiRequest<RoleApis>({
    url : `/authority/${ query }`,
    method : "GET"
  })
}