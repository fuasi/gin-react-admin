import { apiRequest } from "@/apis";
import { GetList , SearchQuery } from "@/apis/common/base.ts";

export interface FileModel {
  id: number
  fileName: string
  systemFileName: string
  tag: string
  fileUrl: string
  filePath: string
  createdAt: string
  updatedAt: string
}

export interface FileCondition {
  fileName: string
}

export interface ActionFile {
  id: number
  fileName?: string
}

export function uploadFile(form: FormData) {
  return apiRequest<string>({
    url: "/file" ,
    method: "POST" ,
    data: form
  })
}

export function getFileList(query: SearchQuery<FileCondition>) {
  return apiRequest<GetList<FileModel>>({
    url: "/files" ,
    method: "POST" ,
    data: query
  })
}


export function updateFile(query: ActionFile) {
  return apiRequest({
    url: "/file" ,
    method: "PATCH" ,
    data: query
  })
}

export function deleteFile(query: ActionFile) {
  return apiRequest({
    url: "/file" ,
    method: "DELETE" ,
    data: query
  })
}
