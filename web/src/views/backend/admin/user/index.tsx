import { Avatar, Button, ConfigProvider, Space, Switch, Table } from 'antd';
import { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import Styles from './user.module.scss'
import zhCN from 'antd/es/locale/zh_CN';
import { getUsers, PageInfo, User } from '@/apis/userApis.ts';
import {} from '@/apis/userApis.ts';
import { DeleteOutlined, EditOutlined, KeyOutlined } from '@ant-design/icons';
import { useLoading } from '@/hooks/useLoading'
import UserModelComponent from "@/views/backend/admin/user/components/UserModelComponent.tsx";


const UserComponent = () => {
    const [pageInfo, setPageInfo] = useState<PageInfo>({ pageSize : 10, page : 1 })
    const { loading, withLoading } = useLoading()
    const [data, setData] = useState<User[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [user, setUser] = useState<User>()
    useEffect(() => {
        withLoading(() => {
            getUsers(pageInfo).then(res => {
                const { data } = res
                setData(data.list)
            })
        })
    }, [pageInfo])
    const columns: ColumnsType<User> = [
        {
            title : '头像',
            dataIndex : 'avatar',
            render : (avatar: string) => {
                return <Avatar size={48} shape={'square'} src={avatar}/>
            },
            width : 48
        },
        {
            title : 'ID',
            dataIndex : 'id',
            width : 24
        },
        {
            title : '用户名',
            dataIndex : 'username',
            width : 128

        },
        {
            title : '昵称',
            dataIndex : 'nickname',
            width : 128
        },
        {
            title : '手机号',
            dataIndex : 'phone',
            width : 128
        },
        {
            title : '启用',
            dataIndex : 'enable',
            width : 64,
            render : (enable: boolean) => {
                return (<Switch defaultChecked={enable}/>)
            }
        },
        {
            title : '操作',
            key : 'action',
            width : 256,
            render : (_, record) => (<Space size="middle">
                <a onClick={() => handleOpenUpdateModal(record)}><EditOutlined className={'mr-2'}/>编辑</a>

                <a onClick={() => handleDeleteUser(record.id)}><DeleteOutlined className={'mr-2'}/>删除</a>

                <a onClick={() => handleResetPassword(record.id)}><KeyOutlined className={'mr-2'}/>重置密码</a>
            </Space>)
        },
    ];
    const handleOpenUpdateModal = (user: User) => {
        setIsModalOpen(true)
        setUser(user)
    }
    const handleDeleteUser = (id: number) => {

    }
    const handleResetPassword = (id: number) => {

    }

    const handlePageInfo = (page: number, pageSize: number) => {
        setPageInfo({ page, pageSize })
    }

    return (
        <div>
            <div className={Styles.userButtonContainer}>
                <Button type="primary">
                    新增用户
                </Button>
            </div>
            <UserModelComponent switchModal={() => setIsModalOpen(!isModalOpen)} isModalOpen={isModalOpen}
                                updateUser={user}/>
            <div className={Styles.userTableContainer}>
                <ConfigProvider locale={zhCN}>
                    <Table
                        pagination={{
                            position : ['bottomCenter'],
                            pageSize : pageInfo.pageSize,
                            onChange : handlePageInfo,
                            showQuickJumper : true
                        }}
                        loading={loading}
                        bordered
                        columns={columns}
                        rowKey={'id'}
                        dataSource={data}/>
                </ConfigProvider>
            </div>
        </div>
    )
}
export default UserComponent
