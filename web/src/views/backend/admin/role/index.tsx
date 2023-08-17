import { InputAndColumns, useTable } from "@/hooks/useTable.tsx";
import { useLoading } from "@/hooks/useLoading.ts";
import {
  deleteRole,
  getAuthority,
  getMenu,
  getRoleById,
  getRoleList,
  insertRole,
  Role,
  RoleApis,
  RoleRouterTree,
  updateRole
} from "@/apis/roleApis.ts";
import { GetList, SearchQuery } from "@/apis/baseApis.ts";
import { Key, useState } from "react";
import { Button, Drawer, Space, Tabs, TabsProps } from "antd";
import Menu from "@/views/backend/admin/role/components/Menu.tsx";
import Authority from "@/views/backend/admin/role/components/Authority.tsx";
import { notificationActiveSuccess } from "@/utils/notification.tsx";

export type CheckedKey = { keys : Key[], parent : number[] }
const RoleView = () => {
  const { withLoading, loading } = useLoading()
  const [checkMenu, setCheckMenu] = useState(false)
  const [data, setData] = useState<GetList<Role>>({ list : [], total : 0 })
  const [drawerOpen, setDrawerOpen] = useState({ isOpen : false, roleId : -1 })
  const [roleRouterTree, setRoleRouterTree] = useState<RoleRouterTree>({
    routers : [],
    selected : [],
    defaultRouterId : 0
  })
  const [roleAuthority, setRoleAuthority] = useState<RoleApis>({ apis : [], selected : [] })
  const [checkedKeys, setCheckedKeys] = useState<CheckedKey>({ keys : [], parent : [] });
  const [checkedAuthorityKeys, setCheckedAuthorityKeys] = useState<Key[]>([]);
  const tabItems : TabsProps['items'] = [{
    key : "menu",
    label : "菜单",
    children : <Menu setRoleRouterTree={ setRoleRouterTree } setCheckedKeys={ setCheckedKeys }
                     checkedKeys={ checkedKeys } checkMenu={ checkMenu }
                     setCheckMenu={ () => setCheckMenu(false) }
                     roleRouterTree={ roleRouterTree }/>
  }, {
    key : "authority",
    label : "权限",
    children : <Authority checkedKeys={ checkedAuthorityKeys } setCheckedKeys={ setCheckedAuthorityKeys }
                          roleAuthority={ roleAuthority }/>
  }]
  const columns : InputAndColumns<Role>[] = [{
    title : "ID",
    dataIndex : 'id',
    width : 24,
    isShow : true,
    required : true,
    isSearch : true,
    isNumber : true
  }, {
    title : "角色名称",
    dataIndex : 'roleName',
    width : 420,
    required : true,
    isSearch : true,
  }]
  const handleFindData = async (query : SearchQuery<Role>) => {
    await withLoading(async () => {
      const { data } = await getRoleList(query)
      setData(data)
    })
  }
  const handleUpdateData = async (role : Role) => {
    await updateRole(role)
  }

  const handleInsertData = async (role : Role) => {
    await insertRole(role)
  }

  const handleDeleteData = async (id : number[], role? : Role) => {
    if (role) {
      await deleteRole([role.id])
      return
    }
    await deleteRole([...id])
  }

  const getUpdateData = (role : Role) => {
    return getRoleById(role.id)
  }

  const handleGetAuthority = async (id : number) => {
    const { data } = await getAuthority(id)
    setRoleAuthority(data)
    setCheckedAuthorityKeys(data.selected)
  }
  const handleGetRouters = async (id : number) => {
    const { data } = await getMenu(id)
    setRoleRouterTree(data)
    setCheckedKeys({ ...checkedKeys, keys : data.selected })
  }

  const handleOpenRoleAuthority = async (role : Role) => {
    const { id } = role
    await handleGetAuthority(id)
    await handleGetRouters(id)
    setDrawerOpen({ isOpen : true, roleId : id })
  }

  const { TableComponent } = useTable({
    columns,
    handleFindData,
    getUpdateData,
    handleUpdateData,
    handleInsertData,
    handleDeleteData,
    handleRoleAuthority : handleOpenRoleAuthority,
    tableProps : { dataSource : data.list, total : data.total, loading }
  })

  const onClose = () => {
    setDrawerOpen({ isOpen : false, roleId : -1 })
  }
  const onSure = async () => {
    await updateRole({
      id : drawerOpen.roleId,
      roleName : "",
      allowRouterId : [...checkedKeys.keys, ...checkedKeys.parent] as number[],
      allowApiId : checkedAuthorityKeys.filter(item => typeof item === "number") as number[],
      defaultRouterId : roleRouterTree.defaultRouterId
    })
    notificationActiveSuccess("更新权限")
    onClose()
  }
  return (
    <div>
      <Drawer destroyOnClose extra={ <Space>
        <Button onClick={ () => setCheckMenu(true) }>
          预览菜单
        </Button>
        <Button onClick={ onSure } type="primary">
          提交
        </Button>
      </Space> } width={ 720 } onClose={ onClose }
              open={ drawerOpen.isOpen } title={ "权限" }>
        <Tabs size={ "large" } items={ tabItems }/>
      </Drawer>
      { TableComponent }
    </div>
  )
}

export default RoleView