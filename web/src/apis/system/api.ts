import { apiRequest } from "@/apis";
import { GetApiGroupList , SearchQuery } from "@/apis/common/base.ts";

export interface Api {
  id: number,
  apiPath: string,
  apiMethod: string,
  apiGroup: string,
  required: boolean
}

export function getApis(query: SearchQuery<Api>) {
  return apiRequest<GetApiGroupList<Api>>({
    url: "/apis" ,
    method: "POST" ,
    data: query
  })
}

export function updateApi(query: Api) {
  return apiRequest({
    url: "/api" ,
    method: "PATCH" ,
    data: query
  })
}

export function deleteApi(query: number[]) {
  return apiRequest({
    url: "/api" ,
    method: "DELETE" ,
    data: query
  })
}

export function getApiById(query: number) {
  return apiRequest({
    url: `/api/${query}` ,
    method: "GET" ,
  })
}

export function insertApi(api: Api) {
  return apiRequest({
    url: "/api" ,
    method: "POST" ,
    data: api
  })
}
