import { InputAndColumns, useTable } from "@/hooks/useTable.tsx";
import { GetList, RouterResponse, SearchQuery } from "@/apis/baseApis.ts";
import { useLoading } from "@/hooks/useLoading.ts";
import { useState } from "react";
import { getRouterList } from "@/apis/routerApis.ts";
import { IconComponent } from "@/utils/router.tsx";

const RouterView = () => {
  const { withLoading, loading } = useLoading()
  const [data, setData] = useState<GetList<RouterResponse>>({ list : [], total : 0 })
  const columns : InputAndColumns<RouterResponse>[] = [{
    title : "ID",
    dataIndex : 'id',
    width : 24,
    isShow : true,
    required : true,
    isSearch : true,
    isNumber : true
  }, {
    title : "菜单名称",
    dataIndex : 'name',
    width : 240,
    required : true,
    isSearch : true,
  }, {
    title : "菜单图标",
    dataIndex : 'icon',
    width : 248,
    required : true,
    align : "center",
    render : (_, record) => {
      return <IconComponent icon={ record.icon }/>
    }
  }, {
    title : "菜单路径",
    dataIndex : 'path',
    width : 360,
    required : true,
    isSearch : true
  }, {
    title : "组件路径",
    dataIndex : 'componentPath',
    width : 420,
    required : true,
  }, {
    title : "父节点",
    dataIndex : 'parentId',
    width : 420,
    required : true,
  }, {
    title : "排序",
    dataIndex : 'routerOrder',
    width : 240,
    required : true,
  }, {
    title : "是否隐藏",
    dataIndex : 'hidden',
    width : 240,
    required : true,
    searchIsOption : [{
      label : "隐藏",
      value : "false"
    }],
  }, {
    title : "权限",
    dataIndex : 'required',
    width : 240,
    required : true,
  }, {
    title : " Api组别",
    dataIndex : 'IsApiGroup',
    width : 240,
    required : true,
  }]

  const handleFindData = async (query : SearchQuery<RouterResponse>) => {
    await withLoading(async () => {
      const { data } = await getRouterList(query)
      setData(data)
    })

  }
  const getUpdateData = () => {

  }
  const handleUpdateData = () => {

  }
  const handleInsertData = () => {

  }
  const handleDeleteData = () => {

  }
  const { TableComponent } = useTable({
    columns,
    handleFindData,
    getUpdateData,
    handleUpdateData,
    handleInsertData,
    handleDeleteData,
    tableProps : { dataSource : data.list, total : data.total, loading }
  })
  return (
    <div>
      { TableComponent }
    </div>
  )
}

export default RouterView