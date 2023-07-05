import {HashRouter, RouteObject} from "react-router-dom";
import GenerateRouter, {LazyComponent} from "./utils/router.tsx";
import {createContext, useEffect, useState} from "react";
import {baseApis} from "./apis";
import {RouterResponse} from "./apis/baseApis.ts";
import {MenuProps} from "antd";

type MenuItem = Required<MenuProps>['items'][number];

export const RouterContext = createContext<MenuItem[] | undefined>([])
const App = () => {
    const [routers, setRouters] = useState<RouteObject[]>()
    const [routerInfo, setRouterInfo] = useState<MenuItem[]>()
    useEffect(() => {
        baseApis.getRouter().then(res => {
            const {data} = res
            setRouters(handleRouters({handleRouters: data}))
            setRouterInfo(handleRouterInfo({handleRouterInfo: data}))
        })
    }, [])

    const handleRouters = (props: { handleRouters: RouterResponse[] | undefined }) => {
        const routersChildren: RouteObject[] = []
        if (props.handleRouters) {
            for (const handleRouter of props.handleRouters) {
                const router: RouteObject = {}
                router.element = LazyComponent(handleRouter.componentPath)
                router.path = handleRouter.path
                if (handleRouter.children) {
                    router.children = handleRouters({handleRouters: handleRouter.children})
                }
                routersChildren.push(router)
            }
        }
        return routersChildren
    }

    // function getItem(
    //     label: string,
    //     key?: React.Key | null,
    //     icon?: React.ReactNode,
    //     children?: MenuItem[],
    //     type?: 'group',
    // ): MenuItem {
    //     return {key, icon, children, label, type,} as MenuItem;
    // }

    const handleRouterInfo = (props: { handleRouterInfo: RouterResponse[] }) => {
        const routersChildren: MenuItem[] = []
        if (props.handleRouterInfo) {
            for (const handleRouter of props.handleRouterInfo) {
                if (handleRouter.children) {
                    // const router: MenuItem = getItem(handleRouter.name,
                    //     handleRouter.path,
                    //     IconComponent({icon: handleRouter.icon}),
                    //     handleRouters({handleRouters: handleRouter.children}))
                }
                // routersChildren.push(router)
            }
        }
        return routersChildren
    }

    return (
        <RouterContext.Provider value={routerInfo}>
            <HashRouter>
                <GenerateRouter routers={routers}/>
            </HashRouter>
        </RouterContext.Provider>
    )
}

export default App
