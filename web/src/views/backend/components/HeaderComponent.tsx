import { Avatar, Breadcrumb, Button, Dropdown, MenuProps, Space } from 'antd';
import {
    ExpandOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ReloadOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { BreadcrumbItemType, BreadcrumbSeparatorType } from 'antd/es/breadcrumb/Breadcrumb';
import { tokenStore } from '@/store/localstrageStore.ts';
import { useNavigate } from 'react-router-dom';


interface HeaderComponentProps {
    setCollapsed: (c: boolean) => void
    breadcrumb: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] | undefined
    colorBgContainer: string
    collapsed: boolean
    handleFunc: () => void
}

const HeaderComponent = (props: HeaderComponentProps) => {
    const { handleFunc, collapsed, setCollapsed, breadcrumb, colorBgContainer } = props
    const handleFullScreen = async() => {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
            return
        }
        if (document.exitFullscreen) {
            await document.exitFullscreen();
            return
        }
    }
    const navigate = useNavigate()
    const handleUserLogout = () => {
        tokenStore.token = undefined
        navigate('/login', { replace : true })
    }
    const handleReload = () => {
        handleFunc()
    }
    const items: MenuProps['items'] = [
        {
            key : '1',
            label : '个人中心',
        },
        {
            key : '2',
            danger : true,
            label : '退出登录',
            onClick : handleUserLogout
        },
    ];
    return (
        <Header style={{ padding : 0, background : colorBgContainer }}>
            <div className={'flex flex-row justify-between items-center'}>
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
                    <Breadcrumb className={"text-[15px]"} items={breadcrumb}
                    />
                </Space>
                <div className={'flex justify-center items-center mr-10'}>
                    <ReloadOutlined onClick={handleReload} className={'text-[20px] mr-6 cursor-pointer'}/>
                    <ExpandOutlined onClick={handleFullScreen} className={'text-[20px] mr-6 cursor-pointer select-none'}/>
                    <Dropdown trigger={['hover', 'click']} menu={{ items }}>
                        <Avatar shape="square" size={48} className={'select-none'}
                                src={'https://tupian.qqw21.com/article/UploadPic/2020-7/202071222374427898.jpg'}
                                icon={<UserOutlined/>}/>
                    </Dropdown>
                </div>
            </div>
        </Header>
    )
}

export default HeaderComponent
