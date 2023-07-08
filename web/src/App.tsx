import {HashRouter, RouteObject} from "react-router-dom";
import GenerateRouter, {HandleRouterInfo, HandleRouters} from "@/utils/router";
import {createContext, useEffect, useState} from "react";
import {baseApis} from "@/apis";
import {MenuProps} from "antd";
import {getToken} from "@/utils/token";
import * as React from "react";

type MenuItem = Required<MenuProps>['items'][number];

export const RouterContext = createContext<{
    routerInfo: MenuItem[] | undefined,
    setRouters: React.Dispatch<React.SetStateAction<RouteObject[] | undefined>>,
    setRouterInfo: React.Dispatch<React.SetStateAction<MenuItem[] | undefined>>
}>({
    routerInfo: [],
    setRouters: value => {
        return value
    },
    setRouterInfo: value => {
        return value
    }
})
const App = () => {
    const [routers, setRouters] = useState<RouteObject[]>()
    const [routerInfo, setRouterInfo] = useState<MenuItem[]>()
    useEffect(() => {
        if (getToken()) {
            baseApis.getRouter().then(res => {
                const {data} = res
                setRouters(HandleRouters({handleRouters: data}))
                setRouterInfo(HandleRouterInfo({handleRouterInfo: data}))
            })
        }
    }, [])


    return (
        <RouterContext.Provider value={{routerInfo, setRouters, setRouterInfo}}>
            <HashRouter>
                <GenerateRouter routers={routers}/>
            </HashRouter>
        </RouterContext.Provider>
    )
}

export default App
