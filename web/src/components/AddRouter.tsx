import { Route , RouteObject } from "react-router-dom";

export const AddRouter = ({routers}: {routers: RouteObject[]}) => {
  return routers.map(item => {
    return <Route key={item.path} path={item.path} element={item.element}>
      {item.children ? AddRouter({routers: item.children}) : <></>}
    </Route>
  })

}

export default AddRouter
