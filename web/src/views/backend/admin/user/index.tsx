import { Image , message , Select , Switch as AntdSwitch } from 'antd';
import { useEffect , useState } from 'react';
import {
  deleteUser ,
  getUserById ,
  getUsers ,
  insertUser ,
  resetUserPassword ,
  updateUserInfo ,
  User
} from '@/apis/userApis.ts';
import { useLoading } from '@/hooks/useLoading'
import { InputAndColumns , SearchIsOptionType , useTable } from "@/hooks/useTable.tsx";
import { useSystemActiveNotification } from "@/hooks/useSystemActiveNotification.ts";
import { GLOBAL_SYSTEM_TEXT , GLOBAL_TABLE_TEXT , GLOBAL_USER_TEXT } from "@/config";
import { GetList , SearchQuery } from "@/apis/baseApis.ts";
import { getAllRole } from "@/apis/roleApis.ts";

const UserComponent = () => {
  const {loading , withLoading} = useLoading()
  const [data , setData] = useState<GetList<User>>({list: [] , total: 0})
  const [messageApi , contextHolder] = message.useMessage()
  const [options , setOptions] = useState([{label: "" , value: 1}])
  const {withNotification} = useSystemActiveNotification()
  const [roles , setRoles] = useState<SearchIsOptionType>([])
  useEffect(() => {
    getAllRole().then(res => {
      const initRoles: SearchIsOptionType = []
      for (const role of res.data) {
        initRoles.push({label: role.roleName , value: role.id})
      }
      setRoles(initRoles)
    })
  } , [])
  const handleFindUsers = async (page: SearchQuery<User>) => {
    await withLoading(async () => {
      const {data} = await getUsers(page)
      setData(data)
    })
  }
  const columns: InputAndColumns<User>[] = [
    {
      title: GLOBAL_USER_TEXT.USER_AVATAR ,
      dataIndex: 'avatar' ,
      render: (avatar: string) => {
        return <Image src={avatar} width={72} preview={{maskClassName: "rounded-2xl"}}
                      className={"rounded-2xl"}/>
      } ,
      width: 64 ,
      inputType: "Avatar"
    } ,
    {
      title: GLOBAL_USER_TEXT.USER_ID ,
      dataIndex: 'id' ,
      width: 24 ,
      required: true ,
      isShow: true ,
      isSearch: true ,
      isNumber: true
    } ,
    {
      title: GLOBAL_USER_TEXT.USER_USERNAME ,
      dataIndex: 'username' ,
      width: 24 ,
      required: true ,
      isSearch: true
    } ,
    {
      title: GLOBAL_USER_TEXT.USER_NICKNAME ,
      dataIndex: 'nickname' ,
      width: 112 ,
      required: true ,
      isSearch: true
    } ,
    {
      title: GLOBAL_USER_TEXT.USER_PHONE ,
      dataIndex: 'phone' ,
      width: 64 ,
      isSearch: true
    } ,
    {
      title: "角色" ,
      dataIndex: "roleId" ,
      required: true ,
      width: 128 ,
      align: "center" ,
      render: (_ , record) => {
        return <Select
          mode="multiple"
          allowClear
          maxTagCount={3}
          style={{width: "100%"}}
          placeholder="Please select"
          defaultValue={record.roleId}
          onChange={() => {
          }}
          options={roles}
        />
      } ,
      inputType: "Select" ,
      searchIsOption: roles
    } ,
    {
      title: GLOBAL_USER_TEXT.USER_ENABLE ,
      dataIndex: 'enable' ,
      width: 64 ,
      render: (_ , record , index) => {
        return (<AntdSwitch onChange={(checked) => handleIsUserEnable(checked , index , record)}
                            checked={record.enable === 1}/>)
      } ,
      inputType: "Switch" ,
      required: true ,
      isSearch: true ,
      searchIsOption: [{
        label: "启用" ,
        value: 1
      } , {
        label: "禁用" ,
        value: -1
      }] ,
    }
  ]
  const handleUpdate = async (user: User) => {
    await updateUserInfo(user)
  }
  const handleDeleteUser = async (ids: number[] , user?: User) => {
    if (user) {
      await deleteUser([user.id])
      return;
    }
    await deleteUser([...ids])
  }
  const handleResetPassword = async (user: User) => {
    await withNotification(async () => {
      const {data} = await resetUserPassword(user.id)
      messageApi.info(GLOBAL_SYSTEM_TEXT.ACTIVE_RESETPASSWORD_ALERT(data) , 4)
    } , GLOBAL_TABLE_TEXT.RESET_PASSWORD_TEXT)
  }
  const handleInsertUser = async (user: User) => {
    await insertUser({...user , enable: user.enable ? 1 : -1})
  }
  const getUpdateUserById = (user: User) => {
    return getUserById(user.id)
  }
  const handleIsUserEnable = async (enable: boolean , index: number , record: User) => {
    record.enable = enable ? 1 : -1
    const newDataList = [...data.list]
    newDataList.splice(index , 1 , record)
    setData((item) => {
      return {...item , list: item.list = newDataList}
    })
    await updateUserInfo(record)
    messageApi.success(enable ? GLOBAL_USER_TEXT.USER_ACTIVE_ENABLE_ON : GLOBAL_USER_TEXT.USER_ACTIVE_ENABLE_OFF)
  }

  const {TableComponent} = useTable<User>({
    handleFindData: handleFindUsers ,
    getUpdateData: getUpdateUserById ,
    tableProps: {loading: loading , columns: columns , dataSource: data.list , total: data.total} ,
    columns: columns ,
    handleUpdateData: handleUpdate ,
    handleUserResetPassword: handleResetPassword ,
    handleInsertData: handleInsertUser ,
    handleDeleteData: handleDeleteUser
  })

  return (
    <div>
      {contextHolder}
      {TableComponent}
    </div>
  )
}
export default UserComponent
