import { Image , Input , message , Select , Switch , Switch as AntdSwitch } from 'antd';
import { ReactNode , useEffect , useState } from 'react';
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
import { InputAndColumns , SelectOptionType , useTable } from "@/hooks/useTable.tsx";
import { useSystemActiveNotification } from "@/hooks/useSystemActiveNotification.ts";
import { GLOBAL_SYSTEM_TEXT , GLOBAL_TABLE_TEXT , GLOBAL_USER_TEXT } from "@/config";
import { GetList , SearchQuery } from "@/apis/baseApis.ts";
import { getAllRole } from "@/apis/roleApis.ts";
import { notificationActiveSuccess } from "@/utils/notification.tsx";

const UserComponent = () => {
  const { loading , withLoading } = useLoading()
  const [data , setData] = useState<GetList<User>>({ list : [] , total : 0 })
  const [messageApi , contextHolder] = message.useMessage()
  const { withNotification } = useSystemActiveNotification()
  const [roles , setRoles] = useState<SelectOptionType>([])
  useEffect(() => {
    getAllRole().then(res => {
      const initRoles : SelectOptionType = []
      for (const role of res.data) {
        initRoles.push({ label : role.roleName , value : role.id })
      }
      setRoles(initRoles)
    })
  } , [])
  const handleFindUsers = async ( page : SearchQuery<User> ) => {
    await withLoading(async () => {
      const { data } = await getUsers(page)
      setData(data)
    })
  }
  const columns : InputAndColumns<User>[] = [
    {
      title : GLOBAL_USER_TEXT.USER_AVATAR ,
      dataIndex : 'avatar' ,
      render : ( avatar : string ) => {
        return <Image src={avatar} width={72} preview={{ maskClassName : "rounded-2xl" }}
                      className={"rounded-2xl"}/>
      } ,
      width : 64 ,
      dataInput : "Avatar"
    } ,
    {
      title : GLOBAL_USER_TEXT.USER_USERNAME ,
      dataIndex : 'username' ,
      width : 124 ,
      required : true ,
      isSearch : true ,
      dataInput : <Input placeholder={"请输入用户名"}/>
    } ,
    {
      title : GLOBAL_USER_TEXT.USER_NICKNAME ,
      dataIndex : 'nickname' ,
      width : 112 ,
      required : true ,
      isSearch : true ,
      dataInput : <Input placeholder={"请输入昵称"}/>
    } ,
    {
      title : GLOBAL_USER_TEXT.USER_PHONE ,
      dataIndex : 'phone' ,
      width : 64 ,
      isSearch : true ,
      dataInput : <Input placeholder={"请输入手机号"}/>
    } ,
    {
      title : "角色" ,
      dataIndex : "roleId" ,
      required : true ,
      width : 172 ,
      align : "center" ,
      render : ( _ , record ) => {
        return <Select
            maxTagCount={3}
            mode={"multiple"}
            style={{ width : "100%" }}
            placeholder="Please select"
            defaultValue={record.roleId}
            filterOption={( inputValue , option ) => {
              const optionLabel : string | React.ReactNode | undefined = option?.label
              if (typeof optionLabel === "string") {
                return optionLabel.includes(inputValue)
              }
              return false
            }}
            onChange={async ( value ) => {
              await handleUpdate({ ...record , roleId : value })
              notificationActiveSuccess("角色设置")
            }}
            options={roles}
        />
      } ,
      dataInput : <Select placeholder={"请选择用户角色"} mode={"multiple"}
                          style={{ width : "100%" }}
                          filterOption={( inputValue , option ) => {
                            const optionLabel : string | ReactNode | undefined = option?.label
                            if (typeof optionLabel === "string") {
                              return optionLabel.includes(inputValue)
                            }
                            return false
                          }}
                          options={roles}
      /> ,
      selectOrSwitchOption : roles
    } ,
    {
      title : GLOBAL_USER_TEXT.USER_ENABLE ,
      dataIndex : 'enable' ,
      width : 64 ,
      render : ( _ , record , index ) => {
        return (<AntdSwitch onChange={( checked ) => handleIsUserEnable(checked , index , record)}
                            checked={record.enable === 1}/>)
      } ,
      dataInput : <Switch defaultValue={true}/> ,
      required : true ,
      isSearch : true ,
      selectOrSwitchOption : [{
        label : "启用" ,
        value : 1
      } , {
        label : "禁用" ,
        value : -1
      }] ,
    }
  ]
  const handleUpdate = async ( user : User ) => {
    await updateUserInfo(user)
  }
  const handleDeleteUser = async ( ids : number[] , user? : User ) => {
    if (user) {
      await deleteUser([user.id])
      return;
    }
    await deleteUser([...ids])
  }
  const handleResetPassword = async ( user : User ) => {
    await withNotification(async () => {
      const { data } = await resetUserPassword(user.id)
      messageApi.info(GLOBAL_SYSTEM_TEXT.ACTIVE_RESETPASSWORD_ALERT(data) , 4)
    } , GLOBAL_TABLE_TEXT.RESET_PASSWORD_TEXT)
  }
  const handleInsertUser = async ( user : User ) => {
    await insertUser({ ...user , enable : user.enable ? 1:-1 })
  }
  const getUpdateUserById = ( user : User ) => {
    return getUserById(user.id)
  }
  const handleIsUserEnable = async ( enable : boolean , index : number , record : User ) => {
    record.enable = enable ? 1:-1
    const newDataList = [...data.list]
    newDataList.splice(index , 1 , record)
    setData(( item ) => {
      return { ...item , list : item.list = newDataList }
    })
    await updateUserInfo(record)
    messageApi.success(enable ? GLOBAL_USER_TEXT.USER_ACTIVE_ENABLE_ON:GLOBAL_USER_TEXT.USER_ACTIVE_ENABLE_OFF)
  }

  const { TableComponent } = useTable<User>({
    isPage : true ,
    handleFindData : handleFindUsers ,
    getUpdateData : getUpdateUserById ,
    tableProps : { loading : loading , columns : columns , dataSource : data.list , total : data.total } ,
    columns : columns ,
    handleUpdateData : handleUpdate ,
    handleUserResetPassword : handleResetPassword ,
    handleInsertData : handleInsertUser ,
    handleDeleteData : handleDeleteUser
  })

  return (
      <div>
        {contextHolder}
        {TableComponent}
      </div>
  )
}
export default UserComponent
