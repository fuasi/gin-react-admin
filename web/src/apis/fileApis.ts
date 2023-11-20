import { apiRequest } from "@/apis/index.ts";

export function uploadFile(form: FormData) {
  return apiRequest<string>({
    url: "/file" ,
    method: "POST" ,
    data: form
  })
}
