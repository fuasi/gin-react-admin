import {Menu} from "antd";
import {RouterContext} from "../../../App.tsx";
import {useContext, useEffect, useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {BreadcrumbItemType, BreadcrumbSeparatorType} from "antd/es/breadcrumb/Breadcrumb";

interface SideMenuComponentProps {
    setBreadcrumb: React.Dispatch<React.SetStateAction<Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] | undefined>>
}

export interface MenuItems {
    label: string,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItems[],
    type?: 'group'
}

type BreadcrumbCache = Map<string, { path: string, title: string }>
const SideMenuComponent = (props: SideMenuComponentProps) => {
    const location = useLocation()
    const {routerInfo} = useContext(RouterContext)
    const navigate = useNavigate()
    const [breadcrumbCache, setBreadcrumbCache] = useState<BreadcrumbCache>(new Map())
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState("")
    useEffect(() => {
        initBreadcrumbCache()
        setDefaultSelectedKeys(location.pathname)
    }, [location.key])
    const initBreadcrumbCacheChildren = (children: MenuItems[], cache: BreadcrumbCache) => {
        for (const router of children) {
            if (router.key) {
                cache.set(router.key.toString(), {path: router.key.toString(), title: router.label})
            }
            if (router.children) {
                initBreadcrumbCacheChildren(router.children, cache)
            }
        }
    }
    const initBreadcrumbCache = () => {
        const cache = new Map<string, { path: string, title: string }>()
        if (routerInfo) {
            const cacheRouter = routerInfo as MenuItems[]
            initBreadcrumbCacheChildren(cacheRouter, cache)
        }
        setBreadcrumbCache(cache)
        const urlPath = handleDefaultOpenKeys
        const breadcrumb: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = []
        breadcrumb.push({title: <span>{cache.get(urlPath[0])?.title}</span>})
        for (let i = 1; i < urlPath.length; i++) {
            breadcrumb.push({
                title: cache.get(urlPath[i])?.title
            })
        }
        props.setBreadcrumb(breadcrumb)
    }
    const handleBreadcrumb = (params: { keyPath: string[] }) => {
        const {keyPath} = params
        const breadcrumb: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = []
        breadcrumb.push({title: <span>{breadcrumbCache.get(keyPath[keyPath.length - 1])?.title}</span>})
        for (let i = keyPath.length - 2; i >= 0; i--) {
            breadcrumb.push({
                title: breadcrumbCache.get(keyPath[i])?.title
            })
        }
        props.setBreadcrumb(breadcrumb)
    }

    const handleSelect = (props: { key: string }) => {
        const {key} = props
        navigate(key)
    }

    const handleDefaultOpenKeys = useMemo(() => {
        const cacheOpenKeys: string[] = []
        let cachePath = "/"
        for (let i = 1; i < location.pathname.length; i++) {
            if (location.pathname[i] === '/') {
                cacheOpenKeys.push(cachePath)
            }
            cachePath += location.pathname[i]
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
            items={routerInfo}
            onClick={handleBreadcrumb}
            onSelect={handleSelect}
        />
    )
}
export default SideMenuComponent