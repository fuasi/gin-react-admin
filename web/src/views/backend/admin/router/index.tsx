import { InputAndColumns , SelectOptionType , useTable } from "@/hooks/useTable.tsx";
import { GetList , RouterResponse , SearchQuery } from "@/apis/baseApis.ts";
import { useLoading } from "@/hooks/useLoading.ts";
import { useEffect , useState } from "react";
import { deleteRouter , findRouterById , getRouterList , insertRouter , updateRouter } from "@/apis/routerApis.ts";
import { IconComponent , RouterTree } from "@/utils/router.tsx";
import { Input , InputNumber , Select , Tag } from "antd";
import * as icons from '@ant-design/icons'

const RouterView = () => {
  const { withLoading , loading } = useLoading()
  const [data , setData] = useState<GetList<RouterResponse>>({ list : [] , total : 0 })
  const [iconList , setIconList] = useState<SelectOptionType>([])
  useEffect(() => {
    const RouterIcons : SelectOptionType = []
    for (const key in icons) RouterIcons.push({ label : <><IconComponent icon={key}/> {key}</> , value : key })
    setIconList(RouterIcons)
  } , [])
  const columns : InputAndColumns<RouterResponse>[] = [{
    title : "菜单名称" ,
    dataIndex : 'name' ,
    width : 240 ,
    required : true ,
    isSearch : true ,
    dataInput : <Input placeholder={"请输入菜单名称"}/>
  } , {
    title : "菜单图标" ,
    dataIndex : 'icon' ,
    width : 144 ,
    required : true ,
    dataInput : <Select options={iconList} placeholder={"请选择菜单图标"}/> ,
    selectOrSwitchOption : iconList ,
    render : ( _ , record ) => {
      return <IconComponent icon={record.icon}/>
    }
  } , {
    title : "菜单路径" ,
    dataIndex : 'path' ,
    width : 360 ,
    required : true ,
    isSearch : true ,
    dataInput : <Input placeholder={"请输入菜单路径"}/>
  } , {
    title : "组件路径" ,
    dataIndex : 'componentPath' ,
    width : 420 ,
    required : true ,
    dataInput : <Input placeholder={"请输入组件路径"}/>
  } , {
    title : "排序" ,
    dataIndex : 'routerOrder' ,
    dataInput : <InputNumber style={{ width : "240px" }} placeholder={"请输入排序"}/> ,
    width : 240 ,
    required : true ,
  } , {
    title : "选项隐藏" ,
    dataIndex : 'hidden' ,
    width : 120 ,
    required : true ,
    dataInput : <Select options={[{
      label : "显示" ,
      value : false
    } , {
      label : "隐藏" ,
      value : true
    }]} placeholder={"请选择是否隐藏选项"}/> ,
    selectOrSwitchOption : [{
      label : "显示" ,
      value : false
    } , {
      label : "隐藏" ,
      value : true
    }] ,
    render : ( _ , record ) =>
        record.hidden ? <Tag color={"error"}>隐藏</Tag>:<Tag color={"blue"}>未隐藏</Tag>
  } , {
    title : "权限" ,
    dataIndex : 'required' ,
    width : 120 ,
    dataInput : <Select placeholder={"该权限是否必选"} options={[{
      label : "必选" ,
      value : true
    } , {
      label : "非必选" ,
      value : false
    }]}/> ,
    selectOrSwitchOption : [{
      label : "必选" ,
      value : true
    } , {
      label : "非必选" ,
      value : false
    }] ,
    required : true ,
    render : ( _ , record ) =>
        record.required ? <Tag color={"error"}>必选</Tag>:<Tag color={"blue"}>非必选</Tag>
  }]
  const handleFindData = async ( query : SearchQuery<RouterResponse> ) => {
    await withLoading(async () => {
      const { data } = await getRouterList({ ...query , pageSize : -1 })
      setData({ ...data , list : RouterTree(data.list) })
    })

  }
  const getUpdateData = ( router : RouterResponse ) => {
    return findRouterById(router.id)
  }
  const handleUpdateData = async ( router : RouterResponse ) => {
    await updateRouter(router)
  }
  const handleInsertData = async ( router : RouterResponse ) => {
    await insertRouter(router)
  }
  const handleDeleteData = async ( ids : number[] , router ? : RouterResponse ) => {
    if (router) {
      await deleteRouter([router.id])
      return;
    }
    await deleteRouter([...ids])
  }
  const { TableComponent } = useTable({
    isPage : false ,
    columns ,
    handleFindData ,
    getUpdateData ,
    handleUpdateData ,
    handleInsertData ,
    handleDeleteData ,
    tableProps : { dataSource : data.list , total : data.total , loading }
  })
  return (
      <div>
        {TableComponent}
      </div>
  )
}

export default RouterView
