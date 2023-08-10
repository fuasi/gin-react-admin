import { Image, message, Switch } from 'antd';
import { useState } from 'react';
import {
  deleteUser,
  getUserById,
  getUsers,
  insertUser,
  resetUserPassword,
  SearchUsersQuery,
  updateUserInfo,
  uploadAvatar,
  User
} from '@/apis/userApis.ts';
import { useLoading } from '@/hooks/useLoading'
import { InputAndColumns, useTable } from "@/hooks/useTable.tsx";
import UploadComponent from "@/components/UploadComponent.tsx";
import { useSystemActiveNotification } from "@/hooks/useSystemActiveNotification.ts";
import { GLOBAL_SYSTEM_TEXT, GLOBAL_TABLE_TEXT, GLOBAL_USER_TEXT } from "@/config";

type AvatarUploadProps = { upload : { file : File, avatarURL : string } }
const UserComponent = () => {
  const { loading, withLoading } = useLoading()
  const [data, setData] = useState<User[]>([])
  const [messageApi, contextHolder] = message.useMessage()
  const { withNotification } = useSystemActiveNotification()

  const handleFindUsers = async (page : SearchUsersQuery) => {
    await withLoading(async () => {
      const { data } = await getUsers(page)
      setData(data.list)
    })
  }
  const columns : InputAndColumns<User>[] = [
    {
      title : GLOBAL_USER_TEXT.USER_AVATAR,
      dataIndex : 'avatar',
      render : (avatar : string) => {
        return <Image src={ avatar } width={ 72 } preview={ { maskClassName : "rounded-2xl" } }
                      className={ "rounded-2xl" }/>
      },
      width : 64,
      loadingInputRender : (loading, avatarURL, setUpload, data) => <UploadComponent
        avatarURL={ avatarURL }
        image={ data?.avatar } setUpload={ setUpload }
        loading={ loading }/>,
    },
    {
      title : GLOBAL_USER_TEXT.USER_ID,
      dataIndex : 'id',
      width : 24,
      required : true,
      isShow : true,
      isSearch : true,
      isNumber : true
    },
    {
      title : GLOBAL_USER_TEXT.USER_USERNAME,
      dataIndex : 'username',
      width : 128,
      required : true,
      isSearch : true
    },
    {
      title : GLOBAL_USER_TEXT.USER_NICKNAME,
      dataIndex : 'nickname',
      width : 128,
      required : true,
      isSearch : true
    },
    {
      title : GLOBAL_USER_TEXT.USER_PHONE,
      dataIndex : 'phone',
      width : 128,
      required : true,
      isSearch : true
    },
    {
      title : GLOBAL_USER_TEXT.USER_ENABLE,
      dataIndex : 'enable',
      width : 64,
      render : (_, record, index) => {
        return (<Switch onChange={ (checked) => handleIsUserEnable(checked, index, record) }
                        checked={ record.enable === 1 }/>)
      },
      InputType : "Switch",
      required : true,
      isSearch : true,
      searchIsOption : [{
        label : "启用",
        value : 1
      }, {
        label : "禁用",
        value : -1
      }]
    },
  ]

  const handleAvatarUpload = async (file : File) => {
    const form = new FormData()
    form.append("avatar", file)
    const { data } = await uploadAvatar(form)
    return data
  }
  const handleUpdate = async (user : User, params : AvatarUploadProps) => {
    const { file } = params.upload
    let fileName = user.avatar
    if (file) fileName = await handleAvatarUpload(file)
    await updateUserInfo({ ...user, avatar : fileName })
  }
  const handleDeleteUser = async (ids : number[], user? : User) => {
    if (user) {
      await deleteUser([user.id])
      return;
    }
    await deleteUser([...ids])
  }
  const handleResetPassword = async (user : User) => {
    await withNotification(async () => {
      const { data } = await resetUserPassword(user.id)
      messageApi.info(GLOBAL_SYSTEM_TEXT.ACTIVE_RESETPASSWORD_ALERT(data), 4)
    }, GLOBAL_TABLE_TEXT.RESET_PASSWORD_TEXT)
  }
  const handleInsertUser = async (user : User, params : AvatarUploadProps) => {
    const { file } = params.upload
    let fileName = user.avatar
    if (file) fileName = await handleAvatarUpload(file)
    await insertUser({ ...user, avatar : fileName })
  }
  const getUpdateUserById = (user : User) => {
    return getUserById(user.id)
  }
  const handleIsUserEnable = async (enable : boolean, index : number, record : User) => {
    record.enable = enable ? 1 : -1
    const newDataList = [...data]
    newDataList.splice(index, 1, record)
    setData(newDataList)
    await updateUserInfo(record)
    messageApi.success(enable ? GLOBAL_USER_TEXT.USER_ACTIVE_ENABLE_ON : GLOBAL_USER_TEXT.USER_ACTIVE_ENABLE_OFF)
  }

  const { TableComponent } = useTable<User>({
    handleFindData : handleFindUsers,
    getUpdateData : getUpdateUserById,
    tableProps : { loading : loading, columns : columns, dataSource : data },
    columns : columns,
    handleUpdateData : handleUpdate,
    handleUserResetPassword : handleResetPassword,
    handleInsertData : handleInsertUser,
    handleDeleteData : handleDeleteUser
  })

  return (
    <div >
      { contextHolder }
      { TableComponent }
    </div>
  )
}
export default UserComponent
