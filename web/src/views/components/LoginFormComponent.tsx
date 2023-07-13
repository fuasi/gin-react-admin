import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { checkLogin, getRouter, login } from '@/apis/baseApis.ts';
import useMessage from 'antd/es/message/useMessage';
import GLOBAL_CONFIG from '@/config';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { HandleRouterInfo, HandleRouters } from '@/utils/router.tsx';
import { routerStorage } from '@/store/routerStorage'
import { tokenStore } from '@/store/localstrageStore'

const LoginFormComponent = () => {
    const [messageApi, contextHolder] = useMessage()
    const navigate = useNavigate()
    useEffect(() => {
        checkLogin().then(handleGetRouter).then(() => navigate('/dashboard'))
    }, [])
    const handleGetRouter = async() => {
        const { data } = await getRouter()
        routerStorage.routers = HandleRouters({ handleRouters : data })
        routerStorage.routerInfo = HandleRouterInfo({ handleRouterInfo : data })
    }
    const onFinish = async(values: never) => {
        const { code, data } = await login(values)
        if (code !== GLOBAL_CONFIG.SUCCESS_STATUS) {
            messageApi.error('请输入正确的信息')
            return
        }
        tokenStore.token = data
        await handleGetRouter()
        navigate('/dashboard')
    }

    return (
        <div className={'w-96 h-96'}>
            {contextHolder}
            <div className={'text-black text-3xl font-bold text-center mb-12 mt-12'}>
                系统登录
            </div>
            <Form
                name="login-form"
                style={{ maxWidth : 600 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    name="username"
                    rules={[{ required : true, message : 'Please enter the correct user name' }]}
                >
                    <Input className={'h-10'} placeholder={'请输入账号'} prefix={<UserOutlined/>}/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required : true, message : 'Please enter the correct password' }]}
                >
                    <Input.Password className={'h-10'} placeholder={'请输入密码'} prefix={<LockOutlined/>}/>
                </Form.Item>
                <div className={'w-56 h-10 ml-auto mr-auto'}>
                    <Form.Item>
                        <Button className={'w-56 h-10'} type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default LoginFormComponent
