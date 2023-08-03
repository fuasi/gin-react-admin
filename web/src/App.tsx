import { HashRouter, RouteObject } from 'react-router-dom';
import GenerateRouter, { HandleRouterInfo, HandleRouters } from '@/utils/router';
import { useEffect, useState } from 'react';
import { getRouter } from '@/apis/baseApis.ts';
import { MenuProps, notification } from 'antd';
import { tokenStore } from '@/store/localstrageStore'
import { routerStorage } from "@/store/routerStorage.ts";
import { autorun } from "mobx";
import { notificationStorage } from "@/store/notificationStorage.ts";

export type MenuItem = Required<MenuProps>['items'][number];

const App = () => {
    const [routers, setRouters] = useState<RouteObject[]>()
    const [api, contextHolder] = notification.useNotification({ maxCount : 3, top : 64 })
    useEffect(() => autorun(() => {
        if (routerStorage.routers.length && routerStorage.routerInfo) {
            setRouters(routerStorage.routers)
        }
        if (notificationStorage.type === "active") {
            const { type, message, description, duration } = notificationStorage.globalNotification
            api.open({ type, message, description, duration })
            notificationStorage.type = "sleep"
        }
    }), [])

    useEffect(() => {
        if (tokenStore.token) {
            getRouter().then(res => {
                const { data } = res
                routerStorage.routers = HandleRouters({ handleRouters : data })
                routerStorage.routerInfo = HandleRouterInfo({ handleRouterInfo : data })
            }).catch(() => {
                location.hash = "/login"
            })
        }
    }, [])
    return (
        <div>
            { contextHolder }
            <HashRouter>
                <GenerateRouter routers={ routers }/>
            </HashRouter>
        </div>
    )
}

export default App
