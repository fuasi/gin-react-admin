import { apiRequest } from "@/apis";
import { GetList , RouterResponse , SearchQuery } from "@/apis/common/base.ts";

export function getRouterList(query: SearchQuery<RouterResponse>) {
  return apiRequest<GetList<RouterResponse>>({
    url: "/router" ,
    method: "POST" ,
    data: query
  })
}

export function findRouterById(id: number) {
  return apiRequest({
    url: `/router/${id}` ,
    method: "GET" ,
  })
}

export function updateRouter(router: RouterResponse) {
  return apiRequest({
    url: "/router" ,
    method: "PATCH" ,
    data: router
  })
}

export function deleteRouter(id: number[]) {
  return apiRequest({
    url: "/router" ,
    method: "DELETE" ,
    data: id
  })
}

export function insertRouter(router: RouterResponse) {
  return apiRequest({
    url: "/router" ,
    method: "PUT" ,
    data: router
  })
}
