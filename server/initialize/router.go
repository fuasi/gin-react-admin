package initialize

import (
	"fmt"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"server/global"
	"server/middlewares"
	"server/routers"
)

func InitRouter() *gin.Engine {
	Router := gin.Default()
	systemRouter := routers.RouterGroupApp.System
	{
		// swagger文档
		Router.GET(fmt.Sprintf("%s/swagger/*any", global.GRA_CONFIG.System.ApiPrefix), ginSwagger.WrapHandler(swaggerFiles.Handler))

	}
	fmt.Println(global.GRA_CONFIG.System.ApiPrefix)
	PublicRouter := Router.Group(global.GRA_CONFIG.System.ApiPrefix)
	{
		systemRouter.InitBaseRouter(PublicRouter)
	}
	PrivateRouter := Router.Group(global.GRA_CONFIG.System.ApiPrefix)
	PrivateRouter.Use(middlewares.AuthMiddleware)
	{
		systemRouter.InitUserRouter(PrivateRouter)
		systemRouter.InitApiRouter(PrivateRouter)
		systemRouter.InitRoleRouter(PrivateRouter)
		systemRouter.InitRoutersRouter(PrivateRouter)
	}
	return Router
}
