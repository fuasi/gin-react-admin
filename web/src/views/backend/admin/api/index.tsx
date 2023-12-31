import { InputAndColumns , useTable } from "@/hooks/useTable.tsx";
import { Api , deleteApi , getApiById , getApis , insertApi , updateApi } from "@/apis/apiApis.ts";
import { GLOBAL_API_TEXT } from "@/config";
import { useState } from "react";
import { useLoading } from "@/hooks/useLoading.ts";
import { GetApiGroupList , SearchQuery } from "@/apis/baseApis.ts";
import { Tag } from "antd";

const ApiView = () => {
  const [data , setData] = useState<GetApiGroupList<Api>>({list: [] , total: 0 , apiGroupOptions: []})
  const {withLoading , loading} = useLoading()
  const columns: InputAndColumns<Api>[] = [
    {
      title: GLOBAL_API_TEXT.API_ID ,
      dataIndex: 'id' ,
      width: 24 ,
      required: true ,
      isShow: true ,
      isSearch: true ,
      isNumber: true
    } ,
    {
      title: GLOBAL_API_TEXT.API_PATH ,
      dataIndex: 'apiPath' ,
      width: 128 ,
      required: true ,
      isSearch: true
    } , {
      title: GLOBAL_API_TEXT.API_COMMENT ,
      dataIndex: 'apiComment' ,
      width: 128 ,
      required: true ,
      isSearch: true
    } ,
    {
      title: GLOBAL_API_TEXT.API_GROUP ,
      dataIndex: 'apiGroupId' ,
      width: 128 ,
      required: true ,
      isSearch: true ,
      inputType: "Select" ,
      render: (_ , record) => <>{record.apiGroup}</> ,
      searchIsOption: data.apiGroupOptions
    } ,
    {
      title: GLOBAL_API_TEXT.API_METHOD ,
      dataIndex: 'apiMethod' ,
      width: 128 ,
      inputType: "Select" ,
      required: true ,
      isSearch: true ,
      searchIsOption: [{
        label: "GET / 查询" , value: "GET / 查询"
      } , {
        label: "POST / 多条件查询|创建" , value: "POST / 多条件查询|创建"
      } , {
        label: "PUT / 创建" , value: "PUT / 创建"
      } , {
        label: "DELETE / 删除" , value: "DELETE / 删除"
      } , {
        label: "PATCH / 更新" , value: "PATCH / 更新"
      }]
    } ,
    {
      title: GLOBAL_API_TEXT.REQUIRED ,
      dataIndex: 'required' ,
      width: 72 ,
      align: "center" ,
      inputType: "Select" ,
      required: true ,
      searchIsOption: [{label: "必选" , value: true} , {label: "非必选" , value: false}] ,
      render: (record) => {
        return <>{record ? <Tag color={"error"}>必选</Tag> : <Tag color={"processing"}>非必选</Tag>}</>
      }
    }
  ]

  const handleFindData = async (query: SearchQuery<Api>) => {
    await withLoading(async () => {
      const {data} = await getApis(query)
      setData(data)
    })
  }
  const getUpdateData = (record: Api) => {
    return getApiById(record.id)
  }
  const handleDeleteData = async (ids: number[] , api ?: Api) => {
    if (api) {
      await deleteApi([api.id])
      return;
    }
    await deleteApi([...ids])
  }

  const handleUpdateData = async (api: Api) => {
    await updateApi(api)
  }

  const handleInsertData = async (api: Api) => {
    await insertApi(api)
  }
  const {TableComponent} = useTable<Api>({
    columns: columns ,
    handleFindData ,
    getUpdateData ,
    handleDeleteData ,
    handleUpdateData ,
    handleInsertData ,
    tableProps: {
      loading: loading ,
      dataSource: data.list ,
      columns: columns ,
      total: data.total
    }
  })
  return (
    <div>
      {TableComponent}
    </div>
  )
}
export default ApiView
