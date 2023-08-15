package routers

import "server/routers/system"

type RouterGroup struct {
	System system.SysRouterGroup
}

var RouterGroupApp = new(RouterGroup)
