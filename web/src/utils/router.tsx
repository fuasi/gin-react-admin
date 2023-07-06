import {createElement, lazy, Suspense} from "react";
import * as icons from "@ant-design/icons"
import {RouteObject, useRoutes} from "react-router-dom";
import LoginLayout from "../views/loginLayout.tsx";
import PrivateRoute from "../components/PrivateRouteComponent.tsx";
import BackendLayout from "../views/backend/backendLayout.tsx";
import RouterLoadingComponent from "../components/RouterLoadingComponent.tsx";
import {RouterResponse} from "../apis/baseApis.ts";
import * as React from "react";
import {MenuProps} from "antd";

type MenuItem = Required<MenuProps>['items'][number];

export const LazyComponent = (url: string) => {
    const Component = lazy(() => import(url))
    return <Suspense fallback={<RouterLoadingComponent/>}>
        <Component/>
    </Suspense>
}

const IconComponent = (props: { icon: string }) => {
    const {icon} = props
    const antIcon: { [key: string]: any } = icons
    return createElement(antIcon[icon])
}

export const HandleRouters = (props: { handleRouters: RouterResponse[] | undefined }) => {
    const routersChildren: RouteObject[] = []
    if (props.handleRouters) {
        for (const handleRouter of props.handleRouters) {
            const router: RouteObject = {}
            router.element = LazyComponent(handleRouter.componentPath)
            router.path = handleRouter.path
            if (handleRouter.children) {
                router.children = HandleRouters({handleRouters: handleRouter.children})
            }
            routersChildren.push(router)
        }
    }
    return routersChildren
}
const getItem = (label: string, key?: React.Key | null, icon?: React.ReactNode, children?: MenuItem[], type?: 'group',): MenuItem => {
    return {key, icon, children, label, type} as MenuItem;
}
export const HandleRouterInfo = (props: { handleRouterInfo: RouterResponse[] }) => {
    const routersChildren: MenuItem[] = []
    if (props.handleRouterInfo) {
        for (const handleRouter of props.handleRouterInfo) {
            const router: MenuItem = getItem(handleRouter.name,
                handleRouter.path,
                IconComponent({icon: handleRouter.icon}),
                handleRouter.children ? HandleRouterInfo({
                    handleRouterInfo: handleRouter.children,
                }) : undefined)
            routersChildren.push(router)
        }
    }
    return routersChildren
}
const GenerateRouter = ({routers}: { routers: RouteObject[] | undefined }) => {

    return useRoutes([{
        path: "/login",
        element: <LoginLayout/>
    }, {
        path: "/",
        element: <PrivateRoute>
            <BackendLayout/>
        </PrivateRoute>,
        children: routers
    }, {
        path: "*",
        element: <PrivateRoute>
            <RouterLoadingComponent/>
        </PrivateRoute>
    }])
}

export default GenerateRouter