package initialize

import (
	"github.com/gin-gonic/gin"
	"server/router"
)

func InitRouter() *gin.Engine {
	Router := gin.Default()
	systemRouter := router.RouterGroupApp.System
	systemRouterGroup := Router.Group("/api")
	{
		systemRouter.InitUserRouter(systemRouterGroup)
		systemRouter.InitBaseRouter(systemRouterGroup)
	}
	return Router
}
