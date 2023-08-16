package utils

import "server/models/system"

// GetRouterTree
// -------- 返回组装后的路由 --------
func GetRouterTree(routers *[]system.Router) []system.Router {
	routerMap := map[int][]system.Router{}
	for _, router := range *routers {
		routerMap[router.ParentId] = append(routerMap[router.ParentId], router)
	}
	var routerTree []system.Router
	for _, router := range *routers {
		router.Children = routerMap[router.Id]
		if router.ParentId == -1 {
			routerTree = append(routerTree, router)
		}
	}
	return routerTree
}
