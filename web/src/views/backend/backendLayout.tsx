import { Outlet, useLocation } from "react-router-dom";
import { Breadcrumb, Button, Layout, Space, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useState } from "react";
import SideMenuComponent from "./components/SideMenuComponent.tsx";
import { BreadcrumbItemType, BreadcrumbSeparatorType } from "antd/es/breadcrumb/Breadcrumb";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import './BackendLayout.scss'

const { Header, Sider } = Layout;

const BackendLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [breadcrumb, setBreadcrumb] = useState<Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] | undefined>([])
    const {
        token : { colorBgContainer },
    } = theme.useToken();
    const location = useLocation()
    return (
        <Layout className={"w-screen h-screen"}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                {/*<div className="demo-logo-vertical">*/}
                {/*    logooo*/}
                {/*</div>*/}
                <SideMenuComponent setBreadcrumb={setBreadcrumb}/>
            </Sider>
            <Layout>
                <Header style={{ padding : 0, background : colorBgContainer }}>
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
                </Header>
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        unmountOnExit={true}
                        key={location.key}
                        timeout={300} classNames="fade" nodeRef={null}>
                        <div className={"overflow-auto"}>
                            <Outlet/>
                        </div>
                    </CSSTransition>
                </SwitchTransition>
            </Layout>
        </Layout>
    )
        ;
}

export default BackendLayout