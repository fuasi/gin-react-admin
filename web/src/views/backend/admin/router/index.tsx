import { InputAndColumns, SelectOptionType, useTable } from "@/hooks/useTable.tsx";
import { GetList, RouterResponse, SearchQuery } from "@/apis/common/base.ts";
import { useLoading } from "@/hooks/useLoading.ts";
import { useEffect, useState } from "react";
import { deleteRouter, findRouterById, getRouterList, insertRouter, updateRouter } from "@/apis/system/router.ts";
import { IconComponent, RouterTree } from "@/utils/router.tsx";
import { Button, Drawer, Form, Input, InputNumber, Select, Tag } from "antd";
import * as icons from '@ant-design/icons'
import FormItems from "@/views/backend/admin/router/components/Formitems.tsx";
import { notificationActiveSuccess } from "@/utils/notification.tsx";

const RouterView = () => {
  // 加载hook
  const { withLoading, loading } = useLoading()
  // 路由数据列表
  const [data, setData] = useState<GetList<RouterResponse>>({ list: [], total: 0 })
  const [iconList, setIconList] = useState<SelectOptionType>([])
  // 控制drawer显示与隐藏
  const [drawerOpen, setDrawerOpen] = useState(false)
  // 控制drawer组件标题
  const [drawerTitle, setDrawerTitle] = useState<"insert" | "update">("insert")
  useEffect(() => {
    const RouterIcons: SelectOptionType = []
    const iconList: { [key: string]: any } = icons
    // icons全部导入会有方法,过滤
    for (const key in iconList) {
      if (typeof iconList[key] !== 'object' || key === "default") continue
      RouterIcons.push({ label: <><IconComponent icon={key}/> {key}</>, value: key })
    }
    setIconList(RouterIcons)
  }, [])
  const [form] = Form.useForm();
  // 路由初始化
  const initRouter: RouterResponse = {
    componentPath: "", hidden: false, icon: "", id: 0, name: "", parentId: 0, path: "", required: true, routerOrder: 0
  }
  const columns: InputAndColumns<RouterResponse>[] = [{
    title: "菜单名称",
    dataIndex: 'name',
    width: 240,
    required: true,
    isSearch: true,
    dataInput: <Input placeholder={"请输入菜单名称"}/>
  }, {
    title: "菜单图标",
    dataIndex: 'icon',
    width: 144,
    required: true,
    dataInput: <Select options={iconList} placeholder={"请选择菜单图标"}/>,
    selectOrSwitchOption: iconList,
    render: ( _, record ) => {
      return <IconComponent icon={record.icon || ""}/>
    }
  }, {
    title: "访问地址",
    dataIndex: 'path',
    width: 360,
    required: true,
    isSearch: true,
    dataInput: <Input placeholder={"请输入访问地址"}/>
  }, {
    title: "组件路径",
    dataIndex: 'componentPath',
    width: 420,
    required: true,
    dataInput: <Input placeholder={"请输入组件路径"}/>
  }, {
    title: "排序",
    dataIndex: 'routerOrder',
    dataInput: <InputNumber style={{ width: "240px" }} placeholder={"请输入排序"}/>,
    width: 120,
    required: true,
  }, {
    title: "显示状态",
    dataIndex: 'hidden',
    width: 120,
    required: true,
    dataInput: <Select options={[{
      label: "显示",
      value: false
    }, {
      label: "隐藏",
      value: true
    }]} placeholder={"请选择是否隐藏选项"}/>,
    selectOrSwitchOption: [{
      label: "显示",
      value: false
    }, {
      label: "隐藏",
      value: true
    }],
    render: ( _, record ) =>
        record.hidden ? <Tag color={"error"}>隐藏</Tag>:<Tag color={"blue"}>显示</Tag>
  }, {
    title: "路由状态",
    dataIndex: 'required',
    width: 120,
    dataInput: <Select placeholder={"该权限是否必选"} options={[{
      label: "必选",
      value: true
    }, {
      label: "非必选",
      value: false
    }]}/>,
    selectOrSwitchOption: [{
      label: "必选",
      value: true
    }, {
      label: "非必选",
      value: false
    }],
    required: true,
    render: ( _, record ) =>
        record.required ? <Tag color={"error"}>必选</Tag>:<Tag color={"blue"}>可选</Tag>
  }]

  const handleFindData = async ( query: SearchQuery<RouterResponse> ) => {
    await withLoading(async () => {
      const { data } = await getRouterList({ ...query, pageSize: -1 })
      setData({ ...data, list: RouterTree(data.list) })
    })
  }
  // 根据id获取数据
  const getUpdateData = ( router: RouterResponse ) => {
    return findRouterById(router.id)
  }
  // 修改数据
  const handleUpdateData = async () => {
    form.validateFields().then(async router => {
      await withLoading(async () => {
        await updateRouter(router)
        await handleFindData({ page: 1, pageSize: -1 })
        notificationActiveSuccess("编辑")
      })
    })
    setDrawerOpen(false)

  }
  // 添加数据
  const handleInsertData = async () => {
    form.validateFields().then(async router => {
      await withLoading(async () => {
        await insertRouter(router)
        await handleFindData({ page: 1, pageSize: -1 })
        notificationActiveSuccess("添加")
      })
    })
    setDrawerOpen(false)
  }
  // 删除数据
  const handleDeleteData = async ( ids: number[], router ?: RouterResponse ) => {
    if (router) {
      await deleteRouter([router.id])
      return;
    }
    await deleteRouter([...ids])
  }
  // 打开或关闭Drawer并且修改标题
  const handleDrawerIsOpen = ( isOpen: boolean, title?: "insert" | "update" ) => {
    if (title) {
      setDrawerTitle(title)
    }
    setDrawerOpen(isOpen)
  }
  // 表格中添加按钮事件
  const handleTableColumnInsert = ( router: RouterResponse ) => {
    form.setFieldsValue({ ...initRouter, parentId: router.id })
    handleDrawerIsOpen(true, "insert")
  }
  // 添加按钮事件
  const handleInsertButton = () => {
    form.setFieldsValue({ ...initRouter, parentId: -1 })
    handleDrawerIsOpen(true, "insert")
  }
  // 表格中修改按钮事件
  const handleTableColumnUpdate = ( router: RouterResponse ) => {
    form.setFieldsValue(router)
    handleDrawerIsOpen(true, "update")
  }

  const { TableComponent } = useTable<RouterResponse>({
    isPage: false,
    columns,
    handleInsertButton,
    handleTableColumnInsert,
    handleFindData,
    getUpdateData,
    handleDeleteData,
    handleTableColumnUpdate,
    tableProps: { dataSource: data.list, total: data.total, loading }
  })
  return (
      <div>
        <Drawer footer={<div>
          <Button loading={loading} onClick={() => drawerTitle === 'insert' ? handleInsertData():handleUpdateData()}
                  type={"primary"}
                  className={"w-full"}>提交</Button>
        </div>} destroyOnClose={true} title={drawerTitle === 'insert' ? "新增菜单":"编辑菜单"} width={600}
                onClose={() => handleDrawerIsOpen(false)}
                open={drawerOpen}>
          <Form layout={"vertical"} form={form}>
            <FormItems iconList={iconList} treeList={data.list}/>
          </Form>
        </Drawer>
        {
          TableComponent
        }
      </div>
  )
}

export default RouterView
