import { InputAndColumns, useTable } from "@/hooks/useTable.tsx";
import { GetList, RouterResponse, SearchQuery } from "@/apis/baseApis.ts";
import { useLoading } from "@/hooks/useLoading.ts";
import { useState } from "react";
import { findRouterById, getRouterList, insertRouter, updateRouter } from "@/apis/routerApis.ts";
import { IconComponent } from "@/utils/router.tsx";
import { Api, deleteApi } from "@/apis/apiApis.ts";
import api from "@/views/backend/admin/api";
import { Tag } from "antd";

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
    width : 144,
    required : true,
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
    width : 120,
    required : true,
  }, {
    title : "排序",
    dataIndex : 'routerOrder',
    width : 120,
    required : true,
  }, {
    title : "选项隐藏",
    dataIndex : 'hidden',
    width : 120,
    required : true,
    inputType : "Select",
    searchIsOption : [{
      label : "显示",
      value : false
    }, {
      label : "隐藏",
      value : true
    }],
    render : (_, record) =>
      record.hidden ? <Tag color={ "error" }>隐藏</Tag> : <Tag color={ "blue" }>未隐藏</Tag>
  }, {
    title : "权限",
    dataIndex : 'required',
    width : 120,
    inputType : "Select",
    searchIsOption : [{
      label : "必选",
      value : true
    }, {
      label : "非必选",
      value : false
    }],
    required : true,
    render : (_, record) =>
      record.required ? <Tag color={ "error" }>必选</Tag> : <Tag color={ "blue" }>非必选</Tag>
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
  const getUpdateData = (router : RouterResponse) => {
    return findRouterById(router.id)
  }
  const handleUpdateData = async (router : RouterResponse) => {
    await updateRouter(router)
  }
  const handleInsertData = async (router : RouterResponse) => {
    await insertRouter(router)
  }
  const handleDeleteData = async (ids : number[], router ? : RouterResponse) => {
    if (router) {
      await deleteApi([router.id])
      return;
    }
    await deleteApi([...ids])
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