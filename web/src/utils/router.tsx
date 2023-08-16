import * as React from 'react';
import { createElement, lazy, Suspense } from 'react';
import * as icons from '@ant-design/icons'
import { RouteObject, useRoutes } from 'react-router-dom';
import LoginLayout from '@/views/loginLayout';
import PrivateRoute from '@/components/PrivateRoute.tsx';
import BackendLayout from '@/views/backend/backendLayout';
import RouterLoading from '@/components/RouterLoading.tsx';
import { RouterResponse } from '@/apis/baseApis.ts';
import { MenuItem } from "@/App.tsx";


export const LazyComponent = (url : string) => {
  const Component = lazy(() => import(url))
  return <Suspense fallback={ <RouterLoading/> }>
    <Component/>
  </Suspense>
}

const IconComponent = (props : { icon : string }) => {
  const { icon } = props
  const antIcon : { [key : string] : any } = icons
  return createElement(antIcon[icon])
}
//生成路由树
export const RouterTree = (props : RouterResponse[]) => {
  const routerMap = new Map<number, RouterResponse[]>()
  props.forEach(value => {
    const routers = routerMap.get(value.parentId)
    routers ? routerMap.set(value.parentId, [...routers, value]) : routerMap.set(value.parentId, [value])
  })
  const routerTree : RouterResponse[] = []
  props.forEach(value => {
    value.children = routerMap.get(value.id)
    if (value.parentId === -1) {
      routerTree.push(value)
    }
  })
  return routerTree
}

// 处理路由树
export const HandleRouters = (props : { handleRouters : RouterResponse[] | undefined }) => {
  const routersChildren : RouteObject[] = []
  if (props.handleRouters) {
    for (const handleRouter of props.handleRouters) {
      const router : RouteObject = {}
      router.element = LazyComponent(handleRouter.componentPath)
      router.path = handleRouter.path
      if (handleRouter.children) {
        router.children = HandleRouters({ handleRouters : handleRouter.children })
      }
      routersChildren.push(router)
    }
  }
  return routersChildren
}
const getItem = (label : string, hidden : boolean, key? : React.Key | null, icon? : React.ReactNode, children? : MenuItem[], id ? : number) : MenuItem => {
  return { id, key, icon, children, label, hidden } as MenuItem;
}
// 组装菜单
export const HandleRouterInfo = (props : { handleRouterInfo : RouterResponse[] }) => {
  const routersChildren : MenuItem[] = []
  if (props.handleRouterInfo) {
    for (const handleRouter of props.handleRouterInfo) {
      const router : MenuItem = getItem(
        handleRouter.name,
        handleRouter.hidden,
        handleRouter.path,
        IconComponent({ icon : handleRouter.icon }),
        handleRouter.children ? HandleRouterInfo({
          handleRouterInfo : handleRouter.children,
        },) : undefined, handleRouter.id)
      routersChildren.push(router)
    }
  }
  return routersChildren
}
const GenerateRouter = ({ routers } : { routers : RouteObject[] | undefined }) => {
  return useRoutes([{
    path : '/login',
    element : <LoginLayout/>
  }, {
    path : '/',
    element : <PrivateRoute>
      <BackendLayout/>
    </PrivateRoute>,
    children : routers
  }, {
    path : '*',
    element : <PrivateRoute>
      <RouterLoading/>
    </PrivateRoute>
  }])
}

export default GenerateRouter
