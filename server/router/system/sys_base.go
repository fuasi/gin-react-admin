package system

import (
	"github.com/gin-gonic/gin"
	"server/apis"
	"server/middlewares"
)

type BaseRouter struct {
}

func (u *BaseRouter) InitBaseRouter(Router *gin.RouterGroup) {
	baseRouter := Router.Use(middlewares.AuthMiddleware)
	baseApi := apis.SystemApisApp.SystemApis.BaseApi
	{
		baseRouter.GET("/router", baseApi.GetRouter)
		baseRouter.POST("/avatar", baseApi.UploadAvatar)
	}
}
