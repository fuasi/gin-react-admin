import { Route, RouteObject, Routes, useNavigate } from 'react-router-dom';
import { HandleRouterInfo, HandleRouters } from '@/utils/router';
import { useEffect, useState } from 'react';
import { getRouter } from '@/apis/common/base.ts';
import { ConfigProvider, MenuProps, notification } from 'antd';
import { tokenStore } from '@/store/localstrageStore'
import { routerStorage } from "@/store/routerStorage.ts";
import { autorun } from "mobx";
import { notificationStorage } from "@/store/notificationStorage.ts";
import { getSelfInfo } from "@/apis/system/user.ts";
import { userStorage } from "@/store/userStorage.ts";
import LoginLayout from "@/views/loginLayout.tsx";
import PrivateRoute from "@/components/PrivateRoute.tsx";
import RouterLoading from "@/components/RouterLoading.tsx";
import BackendLayout from "@/views/backend/backendLayout.tsx";
import AddRouter from "@/components/AddRouter.tsx";
import zhCN from "antd/es/locale/zh_CN";

export type MenuItem = Required<MenuProps>['items'][number] & { hidden : boolean, id : number };

const App = () => {
  const [routers, setRouters] = useState<RouteObject[]>()
  const [api, contextHolder] = notification.useNotification({ maxCount: 3, top: 64 })
  const navigate = useNavigate()
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
      getSelfInfo().then(res => {
        const { data } = res
        userStorage.user = data
      })
      getRouter().then(res => {
        const { data } = res
        routerStorage.routers = HandleRouters({ handleRouters: data })
        routerStorage.routerInfo = HandleRouterInfo({ handleRouterInfo: data })
      }).catch(() => {
        navigate("/login")
      })
    }
  }, [])
  return (
      <div>
        <ConfigProvider locale={zhCN}>
          {contextHolder}
          <Routes>
            <Route element={<LoginLayout/>} path={"/login"}/>
            <Route element={
              <PrivateRoute>
                <BackendLayout/>
              </PrivateRoute>} path={"/"}>
              {routers ? AddRouter({ routers }):<></>}
            </Route>
            <Route element={<PrivateRoute>
              <RouterLoading/>
            </PrivateRoute>} path={"*"}/>
          </Routes>
        </ConfigProvider>
      </div>
  )
}

export default App
