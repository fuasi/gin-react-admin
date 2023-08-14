package system

import (
	"github.com/gin-gonic/gin"
	"server/apis/v1"
	_ "server/docs"
	"server/middlewares"
)

type BaseRouter struct {
}

func (u *BaseRouter) InitBaseRouter(Router *gin.RouterGroup) {
	baseRouter := Router.Use(middlewares.AuthMiddleware)
	baseApi := v1.SystemApisApp.SystemApis.BaseApi
	{
		baseRouter.POST("/login", baseApi.Login)
	}
}
