package initialize

import (
	"fmt"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"server/global"
	"server/middlewares"
	"server/models/common/request"
	"server/models/system"
	"server/routers"
	"server/services"
)

func InitRouter() *gin.Engine {
	Router := gin.Default()
	systemRouter := routers.RouterGroupApp.System

	apiSet := getApiSetStructCommonAsKey()
	{
		// swagger文档
		Router.GET(fmt.Sprintf("%s/swagger/*any", global.GRA_CONFIG.System.ApiPrefix), ginSwagger.WrapHandler(swaggerFiles.Handler))
	}
	PublicRouter := Router.Group(global.GRA_CONFIG.System.ApiPrefix)
	//PublicRouter.Use(middlewares.CasbinMiddleware)
	{
		systemRouter.InitBaseRouter(PublicRouter, apiSet)
	}
	PrivateRouter := Router.Group(global.GRA_CONFIG.System.ApiPrefix)
	PrivateRouter.Use(middlewares.AuthMiddleware)
	//middlewares.CasbinMiddleware)
	{
		systemRouter.InitUserRouter(PrivateRouter, apiSet)
		systemRouter.InitApiRouter(PrivateRouter, apiSet)
		systemRouter.InitRoleRouter(PrivateRouter, apiSet)
		systemRouter.InitRoutersRouter(PrivateRouter, apiSet)
		systemRouter.InitFileRouter(PrivateRouter, apiSet)
	}
	return Router
}

func getApiSetStructCommonAsKey() map[string]struct{} {
	list, total, err := services.ServiceGroupApp.ApiServices.GetApiList(request.Search[system.SysApi]{
		PageInfo: request.PageInfo{
			Page:     1,
			PageSize: -1,
		},
	})
	if err != nil {
		return nil
	}
	apiSet := make(map[string]struct{}, total)
	for _, api := range list {
		apiSet[api.ApiComment] = struct{}{}
	}
	//_, exist := apiSet[key]
	return apiSet
}
