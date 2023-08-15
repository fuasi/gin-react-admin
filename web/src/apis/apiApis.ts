import { apiRequest } from "@/apis/index.ts";
import { GetList, PageInfo } from "@/apis/baseApis.ts";

export interface Api {
  id : number,
  apiPath : string,
  apiMethod : string,
  apiGroup : string,
}

export type SearchApisQuery = Api & PageInfo

export function getApis(query : SearchApisQuery) {
  return apiRequest<GetList<Api>>({
    url : "/apis",
    method : "POST",
    data : query
  })
}

export function updateApi(query : Api) {
  return apiRequest({
    url : "/api",
    method : "PATCH",
    data : query
  })
}

export function deleteApi(query : number[]) {
  return apiRequest({
    url : "/api",
    method : "DELETE",
    data : query
  })
}

export function getApiById(query : number) {
  return apiRequest({
    url : `/api/${ query }`,
    method : "GET",
  })
}

export function insertApi(api : Api) {
  return apiRequest({
    url : "/api",
    method : "POST",
    data : api
  })
}