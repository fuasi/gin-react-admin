import { Outlet, useLocation } from 'react-router-dom';
import { Layout, theme } from 'antd';
import { useState } from 'react';
import SideMenuComponent from './components/SideMenuComponent.tsx';
import { BreadcrumbItemType, BreadcrumbSeparatorType } from 'antd/es/breadcrumb/Breadcrumb';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './backendLayout.scss'
import HeaderComponent from '@/views/backend/components/HeaderComponent.tsx';
import { useKeyCounter } from '@/hooks/useKeyCounter'

const { Sider } = Layout;

const BackendLayout = () => {
    const [ collapsed, setCollapsed ] = useState(false);
    const [ breadcrumb, setBreadcrumb ] = useState<Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] | undefined>([])
    const { token: { colorBgContainer } } = theme.useToken();
    const location = useLocation()
    const { key, incr } = useKeyCounter()

    // const [forceUpdate, count] = useForceUpdate()

    return (
        <Layout className={ 'w-screen h-screen' }>
            <Sider trigger={ null } collapsible collapsed={ collapsed }>
                {/*<div className="demo-logo-vertical">*/ }
                {/*    logooo*/ }
                {/*</div>*/ }
                <SideMenuComponent setBreadcrumb={ setBreadcrumb }/>
            </Sider>
            <Layout>
                <HeaderComponent forceUpdate={ incr } setCollapsed={ setCollapsed } breadcrumb={ breadcrumb }
                                 colorBgContainer={ colorBgContainer }
                                 collapsed={ collapsed }/>
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        unmountOnExit={ true }
                        key={ location.key }
                        timeout={ 300 } classNames="fade" nodeRef={ null }>
                        <div key={ key } className={ 'overflow-auto' }>
                            <Outlet/>
                        </div>
                    </CSSTransition>
                </SwitchTransition>
            </Layout>
        </Layout>
    );
}

export default BackendLayout
