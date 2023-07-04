import {Route, useRoutes} from "react-router-dom";
import LoginLayout from "../views/loginLayout.tsx";
import BackendLayout from "../views/backend/backendLayout.tsx";
import PrivateRoute from "../components/PrivateRouteComponent.tsx";
import {ComponentType, lazy, LazyExoticComponent, useEffect} from "react";

interface Route {
    path: string
    element?: LazyExoticComponent<ComponentType<JSX.Element>>
    name: string
}

const getLazyComponent = (url: string) => {
    return lazy(() => import(url))
}

const InitRouteData: Route[] = [{
    path: "/dashboard",
    name: "../views/backend/dashboard",
    element: getLazyComponent("../views/backend/dashboard"),
}, {
    path: "/user",
    name: "../views/backend/user",
    element: getLazyComponent("../views/backend/user")
}]

// const Routes: RouteObject[]

const getRoutesComponent = () => {
    for (const item of InitRouteData) {
        if (item.element) {
            // Routes.push({path: item.path, element: <item.element/>})
        }
    }
}

const AddRoutes = () => {
    useEffect(() => {
        getRoutesComponent()
    }, [])
    return useRoutes([
        {
            path: "/login",
            element: <LoginLayout/>,
        },
        {
            path: "/",
            element: <PrivateRoute>
                <BackendLayout/>
            </PrivateRoute>,
            // children: Routes
        }
    ])
}

export default AddRoutes