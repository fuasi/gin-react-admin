import { HashRouter, RouteObject } from 'react-router-dom';
import GenerateRouter, { HandleRouterInfo, HandleRouters } from '@/utils/router';
import { useEffect, useState } from 'react';
import { getRouter } from '@/apis/baseApis.ts';
import { MenuProps } from 'antd';
import { tokenStore } from '@/store/localstrageStore'
import { routerStorage } from "@/store/routerStorage.ts";
import { autorun } from "mobx";

export type MenuItem = Required<MenuProps>['items'][number];

const App = () => {
    const [routers, setRouters] = useState<RouteObject[]>()

    useEffect(() => autorun(() => {
        if (routerStorage.routers.length && routerStorage.routerInfo) {
            setRouters(routerStorage.routers)
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
        <HashRouter>
            <GenerateRouter routers={routers}/>
        </HashRouter>
    )
}

export default App
