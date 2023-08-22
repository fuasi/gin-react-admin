package system

import (
	"github.com/gin-gonic/gin"
	v1 "server/apis/v1"
)

type RoutersRouter struct {
}

func (r *RoutersRouter) InitRoutersRouter(Router *gin.Engine) {
	routersRouter := Router.Use()
	routerApi := v1.SystemApisApp.SystemApis.RouterApi
	{
		routersRouter.GET("/router", routerApi.GetRouterList)
		routersRouter.POST("/router", routerApi.GetRouterList)
		routersRouter.GET("/router", routerApi.GetRouterList)
		routersRouter.GET("/router", routerApi.GetRouterList)

	}
}
