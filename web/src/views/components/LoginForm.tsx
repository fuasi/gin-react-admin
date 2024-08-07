import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { checkLogin, getRouter, login, LoginQuery } from '@/apis/baseApis.ts';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HandleRouterInfo, HandleRouters } from '@/utils/router.tsx';
import { routerStorage } from '@/store/routerStorage'
import { tokenStore } from '@/store/localstrageStore'
import { notificationLoginFail, notificationLoginSuccess } from "@/utils/notification.tsx";
import { GLOBAL_LOGIN_TEXT } from "@/config";
import { userStorage } from "@/store/userStorage.ts";
import { getSelfInfo } from "@/apis/userApis.ts";

const LoginForm = () => {
  const [buttonLoading, setButtonLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    checkLogin().then(handleGetRouter).then(() => navigate(userStorage.user.path))
  }, [])
  const handleGetRouter = async () => {
    const { data } = await getRouter()
    routerStorage.routers = HandleRouters({ handleRouters : data })
    routerStorage.routerInfo = HandleRouterInfo({ handleRouterInfo : data })
  }

  const setLoginUser = async () => {
    const { data } = await getSelfInfo()
    userStorage.user = data
  }
  const onFinish = async (values : LoginQuery) => {
    try {
      setButtonLoading(true)
      const { data } = await login(values)
      tokenStore.token = data.token
      await setLoginUser()
      await handleGetRouter()
      notificationLoginSuccess(GLOBAL_LOGIN_TEXT.LOGIN_SUCCESS)
      navigate(userStorage.user.path)
    } catch (e) {
      notificationLoginFail(GLOBAL_LOGIN_TEXT.LOGIN_FAIL)
    } finally {
      setButtonLoading(false)
    }

  }

  return (
    <div className={ 'w-96 h-96' }>
      <div className={ 'text-black text-3xl font-bold text-center mb-12 mt-12' }>
        { GLOBAL_LOGIN_TEXT.LOGIN_TITLE }
      </div>
      <Form
        name="login-form"
        style={ { maxWidth : 600 } }
        onFinish={ onFinish }
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={ [{ required : true, message : 'Please enter the correct user name' }] }
          initialValue={ "super_admin" }
        >
          <Input className={ 'h-10' } placeholder={ '请输入账号' } prefix={ <UserOutlined/> }/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={ [{ required : true, message : 'Please enter the correct password' }] }
          initialValue={ "123456" }
        >
          <Input.Password className={ 'h-10' } placeholder={ '请输入密码' } prefix={ <LockOutlined/> }/>
        </Form.Item>
        <div className={ 'w-56 h-10 ml-auto mr-auto' }>
          <Form.Item>
            <Button loading={ buttonLoading } className={ 'w-56 h-10' } type="primary" htmlType="submit">
              { GLOBAL_LOGIN_TEXT.LOGIN_BUTTON_TEXT }
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default LoginForm
