import { Avatar, Breadcrumb, Button, Dropdown, MenuProps, Space } from "antd";
import {
    ExpandOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ReloadOutlined,
    UserOutlined
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { BreadcrumbItemType, BreadcrumbSeparatorType } from "antd/es/breadcrumb/Breadcrumb";
import React from "react";

const items: MenuProps['items'] = [
    {
        key : '1',
        label : "个人中心",
    },
    {
        key : '2',
        danger : true,
        label : '退出登录',
    },
];

interface HeaderComponentProps {
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
    breadcrumb: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] | undefined
    colorBgContainer: string
    collapsed: boolean
}

const HeaderComponent = (props: HeaderComponentProps) => {
    const { collapsed, setCollapsed, breadcrumb, colorBgContainer } = props
    return (
        <Header style={{ padding : 0, background : colorBgContainer }}>
            <div className={"flex flex-row justify-between items-center"}>
                <Space size={12}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize : '16px',
                            width : 64,
                            height : 64,
                        }}
                    />
                    <Breadcrumb
                        style={{ fontSize : 18 }}
                        items={breadcrumb}
                    />
                </Space>
                <div className={"flex justify-center items-center mr-10"}>
                    <ReloadOutlined className={"mr-6 cursor-pointer"} style={{ fontSize : "20px" }}/>
                    <ExpandOutlined className={"mr-6 cursor-pointer"} style={{ fontSize : "20px" }}/>
                    {/*<Avatar shape="square" size={48} icon={<UserOutlined/>}/>*/}
                    <Dropdown trigger={["hover", "click"]} menu={{ items }}>
                        <Avatar shape="square" size={48}
                                src={'https://tupian.qqw21.com/article/UploadPic/2020-7/202071222374427898.jpg'}
                                icon={<UserOutlined/>}/>
                    </Dropdown>
                </div>
            </div>
        </Header>
    )
}

export default HeaderComponent