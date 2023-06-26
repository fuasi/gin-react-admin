package router

import "server/router/system"

type RouterGroup struct {
	System system.SystemRouterGroup
}

var RouterGroupApp = new(RouterGroup)
