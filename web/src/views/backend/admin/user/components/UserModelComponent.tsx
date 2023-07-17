import { Avatar, Form, Input, message, Modal, Switch, Upload, UploadFile, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { updateUserInfo, User } from "@/apis/userApis.ts";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/es/upload";
import GLOBAL_CONFIG from "@/config";
import { tokenStore } from "@/store/localstrageStore.ts";

interface UserModelComponentProps {
    switchModal: () => void
    isModalOpen: boolean
    updateUser: User | undefined
}

const UserModelComponent = (props: UserModelComponentProps) => {
    const { updateUser, switchModal, isModalOpen } = props
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm<User | undefined>()
    const [messageApi, contextHolder] = message.useMessage()
    useEffect(() => {
        if (updateUser) {
            form.setFieldsValue(updateUser)
        }
    }, [form, updateUser])
    const handleUpdateUser = async() => {
        if (updateUser) {
            const { code } = await updateUserInfo(form.getFieldsValue() as User)
            if (code !== GLOBAL_CONFIG.SUCCESS_STATUS) {
                messageApi.open({
                    type : "error",
                    content : "编辑用户信息失败"
                })
            } else {
                messageApi.open({
                    type : "success",
                    content : "编辑用户信息成功"
                })
            }
        }
        form.resetFields()
        switchModal()
        setLoading(false)
    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{ marginTop : 8 }}>Upload</div>
        </div>
    );
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        console.log(info)
        setLoading(false)
    };

    const handleCancel = () => {
        form.resetFields()
        switchModal()
    }
    return (
        <Modal onOk={() => handleUpdateUser()} onCancel={() => handleCancel()} title={"用户"}
               open={isModalOpen}>
            {contextHolder}
            <Form initialValues={updateUser} form={form}>
                <Form.Item
                    label={"ID"}
                    name="id"
                >
                    <Input disabled/>
                </Form.Item>
                <Form.Item
                    label={"昵称"}
                    name="nickname"
                    rules={[{ required : true, message : '昵称不能为空' }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label={"手机"}
                    name="phone"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    valuePropName={"checked"}
                    label={"启用"}
                    name="enable"
                >
                    <Switch/>
                </Form.Item>
                <Form.Item
                    label={"头像"}
                    name="avatar"
                >
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        showUploadList={false}
                        maxCount={1}
                        fileList={[]}
                        headers={{ Authorization : `Bearer ${tokenStore.token}` }}
                        action={`${GLOBAL_CONFIG.API_BASEURL}/avatar`}
                        onChange={handleChange}
                    >
                        {updateUser ? <Avatar shape={"square"} src={updateUser?.avatar} alt="avatar"
                                              style={{ width : '100%', height : "100%" }}/> : uploadButton}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default UserModelComponent




