import { Route , RouteObject , Routes , useLocation , useNavigate } from 'react-router-dom';
import { HandleRouterInfo , HandleRouters } from '@/utils/router';
import { useEffect , useState } from 'react';
import { getRouter } from '@/apis/baseApis.ts';
import { MenuProps , notification } from 'antd';
import { tokenStore } from '@/store/localstrageStore'
import { routerStorage } from "@/store/routerStorage.ts";
import { autorun } from "mobx";
import { notificationStorage } from "@/store/notificationStorage.ts";
import { getSelfInfo } from "@/apis/userApis.ts";
import { userStorage } from "@/store/userStorage.ts";
import { AnimatePresence } from "framer-motion";
import LoginLayout from "@/views/loginLayout.tsx";
import PrivateRoute from "@/components/PrivateRoute.tsx";
import RouterLoading from "@/components/RouterLoading.tsx";
import BackendLayout from "@/views/backend/backendLayout.tsx";
import AddRouter from "@/components/AddRouter.tsx";

export type MenuItem = Required<MenuProps>['items'][number] & {hidden: boolean, id: number};

const App = () => {
  const [routers , setRouters] = useState<RouteObject[]>()
  const [api , contextHolder] = notification.useNotification({maxCount: 3 , top: 64})
  const navigate = useNavigate()
  useEffect(() => autorun(() => {
    if (routerStorage.routers.length && routerStorage.routerInfo) {
      setRouters(routerStorage.routers)
    }
    if (notificationStorage.type === "active") {
      const {type , message , description , duration} = notificationStorage.globalNotification
      api.open({type , message , description , duration})
      notificationStorage.type = "sleep"
    }
  }) , [])

  useEffect(() => {
    if (tokenStore.token) {
      getSelfInfo().then(res => {
        const {data} = res
        userStorage.user = data
      })
      getRouter().then(res => {
        const {data} = res
        routerStorage.routers = HandleRouters({handleRouters: data})
        routerStorage.routerInfo = HandleRouterInfo({handleRouterInfo: data})
      }).catch(() => {
        navigate("/login")
      })
    }
  } , [])
  const location = useLocation();
  return (
    <div>
      {contextHolder}
        <Routes>
          <Route element={<LoginLayout/>} path={"/login"}/>
          <Route element={
            <PrivateRoute>
              <BackendLayout/>
            </PrivateRoute>} path={"/"}>
            {routers ? AddRouter({routers}) : <></>}
          </Route>
          <Route element={<PrivateRoute>
            <RouterLoading/>
          </PrivateRoute>} path={"*"}/>
        </Routes>
    </div>
  )
}

export default App
