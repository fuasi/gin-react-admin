import { useLocation , useNavigate , useOutlet } from 'react-router-dom';
import { ConfigProvider , Layout , Tabs , theme } from 'antd';
import { useEffect , useState } from 'react';
import SideMenu , { BreadcrumbCache , MenuItems } from './components/SideMenu.tsx';
import { BreadcrumbItemType , BreadcrumbSeparatorType } from 'antd/es/breadcrumb/Breadcrumb';
import './backendLayout.scss'
import Header from '@/views/backend/components/Header.tsx';
import { useKeyCounter } from '@/hooks/useKeyCounter'
import { routerStorage } from "@/store/routerStorage.ts";
import { deleteHistory , historyStore } from "@/store/localstrageStore.ts";
import zhCN from "antd/es/locale/zh_CN";
import { userStorage } from "@/store/userStorage.ts";
import ViewAnimated from "@/components/ViewAnimated.tsx";
import { AnimatePresence } from "framer-motion";

const { Sider , Content } = Layout;
export type TabItem = { key : string }
export type Tab = { label : JSX.Element, key : string }

const BackendLayout = () => {
  const [collapsed , setCollapsed] = useState(false);
  const [breadcrumb , setBreadcrumb] = useState<Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] | undefined>([])
  const { token : { colorBgContainer } } = theme.useToken();
  const { key , incr } = useKeyCounter()
  const [tabItem , setTabItem] = useState<Tab[]>([])
  const [currentActiveTab , setCurrentActiveTab] = useState<string>("")
  const [breadcrumbCache , setBreadcrumbCache] = useState<BreadcrumbCache>(new Map())
  const { routerInfo } = routerStorage
  const navigate = useNavigate()
  const location = useLocation()
  const outlet = useOutlet()
  useEffect(() => {
    const cache = getBreadcrumbCache()
    setBreadcrumbCache(cache)
    if (tabItem.length <= 0) {
      if (historyStore.history?.length >= 1) {
        const history : Tab[] = []
        for (const item of historyStore.history) {
          if (cache.get(item.key)) {
            const { title , path , icon } = cache.get(item.key)!;
            history.push({ label : <span>{icon}{title}</span> , key : path })
            continue
          }
          deleteHistory()
          navigate(userStorage.user.path)
        }
        setTabItem(history)
        setCurrentActiveTab(location.hash.split('#')[ 1 ])
        return
      }
      if (cache.get(location.hash.split('#')[ 1 ])) {
        const { title , path , icon } = cache.get(location.hash.split('#')[ 1 ])!;
        historyStore.history = [{ key : path }]
        setTabItem([{
          label : <span>{icon}{title}</span> ,
          key : path
        }])
        setCurrentActiveTab(path)
        navigate(path)
      }
    }
  } , [location.pathname])


  const initBreadcrumbCacheChildren = ( children : MenuItems[] , cache : BreadcrumbCache ) => {
    for (const router of children) {
      if (router.key) {
        cache.set(router.key.toString() , { path : router.key.toString() , title : router.label , icon : router.icon })
      }
      if (router.children) {
        initBreadcrumbCacheChildren(router.children , cache)
      }
    }
  }
  const getBreadcrumbCache = () => {
    const cache = new Map<string , { path : string, title : string, icon : React.ReactNode }>()
    if (routerInfo) {
      const cacheRouter = routerInfo as MenuItems[]
      initBreadcrumbCacheChildren(cacheRouter , cache)
    }
    return cache
  }

  // 添加标签页方法
  const handleAddTabItem = ( path : string ) => {
    const menu = breadcrumbCache.get(path)
    if (menu) {
      const { icon , title , path } = menu
      const newItem : TabItem[] = []
      for (const item of tabItem) {
        newItem.push({ key : item.key })
        if (item.key === path) {
          setCurrentActiveTab(path)
          navigate(path)
          return
        }
      }
      newItem.push({ key : path })
      historyStore.history = newItem
      setCurrentActiveTab(path)
      setTabItem(( item ) => {
        return [...item , { label : <span>{icon}{title}</span> , key : path , }]
      })
    }
  }
  const handleTabChange = ( key : string ) => {
    setCurrentActiveTab(key)
    navigate(key)
  }

  const handleTabEdit = ( e : string | React.MouseEvent<Element , MouseEvent> | React.KeyboardEvent<Element> ) => {
    if (tabItem.length <= 1) return;
    let selectTabItem = "";
    const filter = tabItem.filter(( item , index ) => {
      if (item.key === e && e === currentActiveTab) {
        selectTabItem = tabItem[ index - 1 >= 0 ? index - 1:index + 1 ].key
        setCurrentActiveTab(selectTabItem)
      }
      return item.key !== e
    })
    setTabItem(filter)
    historyStore.history = historyStore.history?.filter(( item ) => item.key !== e)
    if (selectTabItem !== "") navigate(selectTabItem)
  }

  return (
      <Layout>
        <Sider className={"h-screen"} trigger={null}
               collapsible
               collapsed={collapsed}>
          {/*<div className="demo-logo-vertical">*/}
          {/*    logooo*/}
          {/*</div>*/}
          <SideMenu breadcrumbCache={breadcrumbCache} addTabs={handleAddTabItem}
                    setBreadcrumb={setBreadcrumb}/>
        </Sider>
        <Layout >
          <Header addTab={handleAddTabItem} handleFunc={incr}
                  setCollapsed={setCollapsed}
                  breadcrumb={breadcrumb}
                  colorBgContainer={colorBgContainer}
                  collapsed={collapsed}/>
          <Content className={"overflow-y-auto"}>
            <div>
              <Tabs type={"editable-card"} hideAdd onChange={handleTabChange} activeKey={currentActiveTab}
                    onEdit={handleTabEdit}
                    tabBarStyle={{ marginLeft : "24px" , marginRight : "24px" }}
                    className={"bg-white"} size={"large"}
                    items={tabItem}> </Tabs>
            </div>
            <div key={key}>
              <AnimatePresence mode={"wait"}>
                <ViewAnimated key={location.pathname}>
                  <ConfigProvider locale={zhCN}>
                    {outlet}
                  </ConfigProvider>
                </ViewAnimated>
              </AnimatePresence>
            </div>
          </Content>
        </Layout>
      </Layout>
  )
}

export default BackendLayout


