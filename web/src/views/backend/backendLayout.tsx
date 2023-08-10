import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Tabs, theme } from 'antd';
import { useEffect, useState } from 'react';
import SideMenuComponent, { BreadcrumbCache, MenuItems } from './components/SideMenuComponent.tsx';
import { BreadcrumbItemType, BreadcrumbSeparatorType } from 'antd/es/breadcrumb/Breadcrumb';
import './backendLayout.scss'
import HeaderComponent from '@/views/backend/components/HeaderComponent.tsx';
import { useKeyCounter } from '@/hooks/useKeyCounter'
import { routerStorage } from "@/store/routerStorage.ts";
import { historyStore } from "@/store/localstrageStore.ts";

const { Sider } = Layout;
export type RouterMenu = { icon : JSX.Element, label : string, key : string }
export type TabItem = { key : string }
export type Tab = { label : JSX.Element, key : string }

const BackendLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState<Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] | undefined>([])
  const { token : { colorBgContainer } } = theme.useToken();
  const { key, incr } = useKeyCounter()
  const [tabItem, setTabItem] = useState<Tab[]>([])
  const [currentActiveTab, setCurrentActiveTab] = useState<string>("")
  const [breadcrumbCache, setBreadcrumbCache] = useState<BreadcrumbCache>(new Map())
  const { routerInfo } = routerStorage

  const navigate = useNavigate()
  useEffect(() => {
    const cache = getBreadcrumbCache()
    setBreadcrumbCache(cache)
    if (tabItem.length <= 0) {
      if (historyStore.history) {
        const history : Tab[] = []
        for (const item of historyStore.history) {
          const { title, path, icon } = cache.get(item.key)!;
          history.push({ label : <span>{ icon }{ title }</span>, key : path })
        }
        setTabItem(history)
        setCurrentActiveTab(location.hash.split('#')[1])
        return
      }
      const { title, path, icon } = cache.get(location.hash.split('#')[1])!;
      historyStore.history = [{ key : path }]
      setTabItem([{
        label : <span>{ icon }{ title }</span>,
        key : path
      }])
      setCurrentActiveTab(path)
      navigate(path)
    }
  }, [location.pathname])
  const initBreadcrumbCacheChildren = (children : MenuItems[], cache : BreadcrumbCache) => {
    for (const router of children) {
      if (router.key) {
        cache.set(router.key.toString(), { path : router.key.toString(), title : router.label, icon : router.icon })
      }
      if (router.children) {
        initBreadcrumbCacheChildren(router.children, cache)
      }
    }
  }
  const getBreadcrumbCache = () => {
    const cache = new Map<string, { path : string, title : string, icon : React.ReactNode }>()
    if (routerInfo) {
      const cacheRouter = routerInfo as MenuItems[]
      initBreadcrumbCacheChildren(cacheRouter, cache)
    }
    return cache
  }
  const handleAddTabItem = (tab : Tab) => {
    setTabItem((item) => {
      return [...item, tab]
    })
  }
  const handleTabActive = (key : string) => {
    setCurrentActiveTab(key)
  }
  const handleTabChange = (key : string) => {
    setCurrentActiveTab(key)
    navigate(key)
  }

  const handleTabEdit = (e : string | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => {
    if (tabItem.length <= 1) return;
    let selectTabItem = "";
    const filter = tabItem.filter((item, index) => {
      if (item.key === e) {
        selectTabItem = tabItem[index - 1 >= 0 ? index - 1 : index + 1].key
        setCurrentActiveTab(selectTabItem)
      }
      return item.key !== e
    })
    setTabItem(filter)
    historyStore.history = filter
    navigate(selectTabItem)
  }

  return (
    <Layout className={ 'w-screen h-screen' }>
      <Sider trigger={ null }
             collapsible
             collapsed={ collapsed }
      >
        {/*<div className="demo-logo-vertical">*/ }
        {/*    logooo*/ }
        {/*</div>*/ }
        <SideMenuComponent breadcrumbCache={ breadcrumbCache }
                           setCurrentActiveTab={ handleTabActive } tabItems={ tabItem } addTabs={ handleAddTabItem }
                           setBreadcrumb={ setBreadcrumb }/>
      </Sider>
      <Layout className={ "relative" }>
        <HeaderComponent handleFunc={ incr }
                         setCollapsed={ setCollapsed }
                         breadcrumb={ breadcrumb }
                         colorBgContainer={ colorBgContainer }
                         collapsed={ collapsed }/>
        <div>
          <Tabs type={ "editable-card" } hideAdd onChange={ handleTabChange } activeKey={ currentActiveTab }
                onEdit={ handleTabEdit }
                tabBarStyle={ { marginLeft : "24px", marginRight : "24px" } }
                className={ "bg-white" } size={ "large" }
                items={ tabItem }> </Tabs>
        </div>
        <div key={ key } className={ 'overflow-auto' }>
          <Outlet/>
        </div>
      </Layout>
    </Layout>
  )
}

export default BackendLayout


