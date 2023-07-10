import { observable } from 'mobx'
import { RouteObject } from "react-router-dom";
import { MenuItem } from "@/App.tsx";

const routerStorage = observable<{routerInfo: MenuItem[], routers: RouteObject[]}>({
    routerInfo : [],
    routers : []
}, {})


export {
    routerStorage
}
