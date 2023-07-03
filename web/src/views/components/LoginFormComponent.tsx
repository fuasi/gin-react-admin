import {Button, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useForm} from "antd/es/form/Form";

const LoginFormComponent = () => {
    const [loginForm] = useForm()
    const onFinish = () => {
        console.log()
    }
    const onFinishFailed = () => {
        console.log()
    }
    return (
        <div className={"w-96 h-96"}>
            <div className={"text-black text-3xl font-bold text-center mb-12 mt-12"}>
                系统登录
            </div>
            <Form
                form={loginForm}
                name="login-form"
                style={{maxWidth: 600}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="username"
                    rules={[{required: true, message: 'Please enter the correct user name'}]}
                >
                    <Input className={"h-10"} placeholder={"请输入账号"} prefix={<UserOutlined/>}/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Please enter the correct password'}]}
                >
                    <Input.Password className={"h-10"} placeholder={"请输入密码"} prefix={<LockOutlined/>}/>
                </Form.Item>
                <div className={"w-56 h-10 ml-auto mr-auto"}>
                    <Form.Item>
                        <Button className={"w-56 h-10"} type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default LoginFormComponent