import { Menu } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BreadcrumbItemType, BreadcrumbSeparatorType } from 'antd/es/breadcrumb/Breadcrumb';
import { routerStorage } from "@/store/routerStorage.ts";
import { MenuItem } from "@/App.tsx";


interface SideMenuComponentProps {
  setBreadcrumb : React.Dispatch<React.SetStateAction<Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] | undefined>>;
  addTabs : ( path : string ) => void;
  breadcrumbCache : BreadcrumbCache
}

export interface MenuItems {
  label : string,
  key? : React.Key | null,
  icon? : React.ReactNode,
  children? : MenuItems[],
  type? : 'group'
}

export type RouterInfo = { path : string, title : string, icon : React.ReactNode }
export type BreadcrumbCache = Map<string, RouterInfo>
const SideMenu = ( props : SideMenuComponentProps ) => {
  const { breadcrumbCache, setBreadcrumb, addTabs } = props
  const location = useLocation()
  const { routerInfo } = routerStorage
  const navigate = useNavigate()
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState('')
  useEffect(() => {
    initBreadcrumbCache()
    setDefaultSelectedKeys(location.pathname)
  }, [location.key, breadcrumbCache])


  const initBreadcrumbCache = () => {
    const urlPath = handleDefaultOpenKeys
    const breadcrumb : Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = []
    breadcrumb.push({ title: <span>{breadcrumbCache.get(urlPath[ 0 ])?.title}</span> })
    for (let i = 1; i < urlPath.length; i++) {
      breadcrumb.push({
        title: breadcrumbCache.get(urlPath[ i ])?.title
      })
    }
    setBreadcrumb(breadcrumb)
  }
  const handleBreadcrumb = ( params : { keyPath : string[] } ) => {
    const { keyPath } = params
    const breadcrumb : Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = []
    breadcrumb.push({ title: <span>{breadcrumbCache.get(keyPath[ keyPath.length - 1 ])?.title}</span> })
    for (let i = keyPath.length - 2; i >= 0; i--) {
      breadcrumb.push({
        title: breadcrumbCache.get(keyPath[ i ])?.title
      })
    }
    setBreadcrumb(breadcrumb)
  }

  const handleSelect = ( props : { key : string } ) => {
    const { key } = props
    addTabs(key)
    navigate(key)
  }

  const handleDefaultOpenKeys = useMemo(() => {
    const cacheOpenKeys : string[] = []
    let cachePath = '/'
    for (let i = 1; i < location.pathname.length; i++) {
      if (location.pathname[ i ] === '/') {
        cacheOpenKeys.push(cachePath)
      }
      cachePath += location.pathname[ i ]
    }
    cacheOpenKeys.push(cachePath)
    return cacheOpenKeys
  }, [location.pathname])
  return (
      <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={handleDefaultOpenKeys}
          selectedKeys={[defaultSelectedKeys]}
          items={routerInfo.filter(( item : MenuItem ) => {
            return !item.hidden
          })}
          onClick={handleBreadcrumb}
          onSelect={handleSelect}
      />
  )
}
export default SideMenu
