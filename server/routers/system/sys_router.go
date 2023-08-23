package system

import (
	"github.com/gin-gonic/gin"
	v1 "server/apis/v1"
)

type RoutersRouter struct {
}

func (r *RoutersRouter) InitRoutersRouter(Router *gin.RouterGroup) {
	routersRouter := Router.Use()
	routerApi := v1.SystemApisApp.SystemApis.RouterApi
	{
		routersRouter.GET("/router/:id", routerApi.FindRouterById)
		routersRouter.POST("/router", routerApi.GetRouterList)
		routersRouter.PUT("/router", routerApi.InsertRouter)
		routersRouter.DELETE("/router", routerApi.DeleteRouter)
		routersRouter.PATCH("/router", routerApi.UpdateRouter)
	}
}
