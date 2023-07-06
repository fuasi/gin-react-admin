import {Outlet} from "react-router-dom";
import {Breadcrumb, Button, Layout, Space, theme} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {useState} from "react";
import SideMenuComponent from "./components/SideMenuComponent.tsx";
import {BreadcrumbItemType, BreadcrumbSeparatorType} from "antd/es/breadcrumb/Breadcrumb";

const {Header, Content, Sider} = Layout;

const BackendLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [breadcrumb, setBreadcrumb] = useState<Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] | undefined>([])
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Layout className={"w-screen h-screen"}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                {/*<div className="demo-logo-vertical">*/}
                {/*    logooo*/}
                {/*</div>*/}
                <SideMenuComponent setBreadcrumb={setBreadcrumb}/>
            </Sider>
            <Layout>
                <Header style={{padding: 0, background: colorBgContainer}}>
                    <Space size={33}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <Breadcrumb
                            items={breadcrumb}
                        />
                    </Space>
                </Header>
                <Content
                    style={{
                        margin: '16px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    )
        ;
}

export default BackendLayout