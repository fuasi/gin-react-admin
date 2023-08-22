package utils

import "server/models/system"

// GetRouterTree
// -------- 返回组装后的路由 --------
func GetRouterTree(routers *[]system.SysRouter) []system.SysRouter {
	routerMap := map[int][]system.SysRouter{}
	for _, router := range *routers {
		routerMap[router.ParentId] = append(routerMap[router.ParentId], router)
	}
	var routerTree []system.SysRouter
	for _, router := range *routers {
		router.Children = routerMap[router.Id]
		if router.ParentId == -1 {
			routerTree = append(routerTree, router)
		}
	}
	return routerTree
}
