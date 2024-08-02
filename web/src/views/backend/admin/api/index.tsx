import { InputAndColumns , useTable } from "@/hooks/useTable.tsx";
import { Api , deleteApi , getApiById , getApis , insertApi , updateApi } from "@/apis/apiApis.ts";
import { GLOBAL_API_TEXT } from "@/config";
import { useState } from "react";
import { useLoading } from "@/hooks/useLoading.ts";
import { GetApiGroupList , SearchQuery } from "@/apis/baseApis.ts";
import { Input , Select , Tag } from "antd";

const ApiView = () => {
  const [data , setData] = useState<GetApiGroupList<Api>>({ list : [] , total : 0 , apiGroupOptions : [] })
  const { withLoading , loading } = useLoading()
  const columns : InputAndColumns<Api>[] = [
    {
      title : GLOBAL_API_TEXT.API_PATH ,
      dataIndex : 'apiPath' ,
      width : 128 ,
      required : true ,
      isSearch : true ,
      dataInput : <Input placeholder={"请输入API路径"}/>
    } , {
      title : GLOBAL_API_TEXT.API_COMMENT ,
      dataIndex : 'apiComment' ,
      width : 128 ,
      required : true ,
      isSearch : true ,
      dataInput : <Input placeholder={"请输入API简介"}/>
    } ,
    {
      title : GLOBAL_API_TEXT.API_METHOD ,
      dataIndex : 'apiMethod' ,
      width : 128 ,
      dataInput : <Select placeholder={"请选择API方法"} options={[{
        label : "GET / 查询" , value : "GET / 查询"
      } , {
        label : "POST / 多条件查询|创建" , value : "POST / 多条件查询|创建"
      } , {
        label : "PUT / 创建" , value : "PUT / 创建"
      } , {
        label : "DELETE / 删除" , value : "DELETE / 删除"
      } , {
        label : "PATCH / 更新" , value : "PATCH / 更新"
      }]}/> ,
      required : true ,
      isSearch : true ,
      selectOrSwitchOption : [{
        label : "GET / 查询" , value : "GET / 查询"
      } , {
        label : "POST / 多条件查询|创建" , value : "POST / 多条件查询|创建"
      } , {
        label : "PUT / 创建" , value : "PUT / 创建"
      } , {
        label : "DELETE / 删除" , value : "DELETE / 删除"
      } , {
        label : "PATCH / 更新" , value : "PATCH / 更新"
      }]
    } ,
    {
      title : GLOBAL_API_TEXT.REQUIRED ,
      dataIndex : 'required' ,
      width : 72 ,
      align : "center" ,
      dataInput : <Select options={[{ label : "必选" , value : true } , { label : "非必选" , value : false }]}
                          placeholder={"API是否必选"}/> ,
      required : true ,
      selectOrSwitchOption : [{ label : "必选" , value : true } , { label : "非必选" , value : false }] ,
      render : ( record ) => {
        return <>{record ? <Tag color={"error"}>必选</Tag>:<Tag color={"processing"}>非必选</Tag>}</>
      }
    }
  ]

  const handleFindData = async ( query : SearchQuery<Api> ) => {
    await withLoading(async () => {
      const { data } = await getApis(query)
      setData(data)
    })
  }
  const getUpdateData = ( record : Api ) => {
    return getApiById(record.id)
  }
  const handleDeleteData = async ( ids : number[] , api ? : Api ) => {
    if (api) {
      await deleteApi([api.id])
      return;
    }
    await deleteApi([...ids])
  }

  const handleUpdateData = async ( api : Api ) => {
    await updateApi(api)
  }

  const handleInsertData = async ( api : Api ) => {
    await insertApi(api)
  }
  const { TableComponent } = useTable<Api>({
    isPage : true ,
    columns : columns ,
    handleFindData ,
    getUpdateData ,
    handleDeleteData ,
    handleUpdateData ,
    handleInsertData ,
    tableProps : {
      loading : loading ,
      dataSource : data.list ,
      columns : columns ,
      total : data.total
    }
  })
  return (
      <div>
        {TableComponent}
      </div>
  )
}
export default ApiView
