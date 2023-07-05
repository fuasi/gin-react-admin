import {createElement, lazy, Suspense} from "react";
import * as icons from "@ant-design/icons"
import {RouteObject, useRoutes} from "react-router-dom";
import LoginLayout from "../views/loginLayout.tsx";
import PrivateRoute from "../components/PrivateRouteComponent.tsx";
import BackendLayout from "../views/backend/backendLayout.tsx";
import RouterLoadingComponent from "../components/RouterLoadingComponent.tsx";

export const LazyComponent = (url: string) => {
    const Component = lazy(() => import(url))
    return <Suspense fallback={<RouterLoadingComponent/>}>
        <Component/>
    </Suspense>
}

export const IconComponent = (props: { icon: string }) => {
    const {icon} = props
    const antIcon: { [key: string]: any } = icons
    return createElement(antIcon[icon])
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
        element: <RouterLoadingComponent/>
    }])
}

export default GenerateRouter