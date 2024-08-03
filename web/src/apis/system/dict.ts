import { apiRequest } from "@/apis";

export interface Dict {
  id : number
}

export function getDictById( id : number ) {
  return apiRequest({
    url: `/dict/${id}`,
    method: 'GET',
  })
}