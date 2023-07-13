import { Avatar, Button, ConfigProvider, Space, Switch, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import Styles from './user.module.scss'
import zhCN from 'antd/es/locale/zh_CN';
import { PageInfo, User } from '@/apis/userApis.ts';
import { userApis } from '@/apis';
import { DeleteOutlined, EditOutlined, KeyOutlined } from '@ant-design/icons';
import { useLoading } from '@/hooks/useLoading'


const UserComponent = () => {
    const [ selectedRowKeys, setSelectedRowKeys ] = useState<React.Key[]>([]);
    const [ pageInfo, setPageInfo ] = useState<PageInfo>({ pageSize: 10, page: 1 })
    const { loading, withLoading } = useLoading(true)
    const [ data, setDate ] = useState<User[]>([])
    useEffect(() => {
        withLoading(() => {
            userApis.getUsers(pageInfo).then(res => {
                const { data } = res
                setDate(data.list)
            })
        })
    }, [ pageInfo ])
    const columns: ColumnsType<User> = [
        {
            title: '头像',
            dataIndex: 'avatar',
            render: (avatar: string) => {
                return <Avatar size={ 48 } shape={ 'square' } src={ avatar }/>
            },
            width: 48
        },
        {
            title: 'ID',
            dataIndex: 'id',
            width: 24
        },
        {
            title: '用户名',
            dataIndex: 'username',
            width: 128

        },
        {
            title: '昵称',
            dataIndex: 'nickname',
            width: 128
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            width: 128
        },
        {
            title: '启用',
            dataIndex: 'enable',
            width: 64,
            render: (enable: boolean) => {
                return (<Switch defaultChecked={ enable }/>)
            }
        },
        {
            title: '操作',
            key: 'action',
            width: 256,
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={ () => handleUpdateUser(record) }><EditOutlined className={ 'mr-2' }/>编辑</a>

                    <a onClick={ () => handleDeleteUser(record) }><DeleteOutlined className={ 'mr-2' }/>删除</a>

                    <a onClick={ () => handleResetPassword(record) }><KeyOutlined className={ 'mr-2' }/>重置密码</a>
                </Space>
            )
        },
    ];
    const handleUpdateUser = (user: User) => {

    }
    const handleDeleteUser = (user: User) => {

    }
    const handleResetPassword = (user: User) => {

    }

    const handlePageInfo = (page: number, pageSize: number) => {
        setPageInfo({ page, pageSize })
    }

    return (
        <div>
            <div className={ Styles.userButtonContainer }>
                <Button type="primary">
                    新增用户
                </Button>
            </div>
            <div className={ Styles.userTableContainer }>
                <ConfigProvider locale={ zhCN }>
                    <Table
                        pagination={ {
                            position: [ 'bottomCenter' ],
                            pageSize: pageInfo.pageSize,
                            onChange: handlePageInfo,
                            showQuickJumper: true
                        } }
                        loading={ loading }
                        bordered
                        columns={ columns }
                        rowKey={ 'id' }
                        dataSource={ data }/>
                </ConfigProvider>
            </div>
        </div>
    )
}
export default UserComponent
