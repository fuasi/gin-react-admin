package system

import (
	"github.com/gin-gonic/gin"
	"server/apis/v1"
	_ "server/docs"
)

type BaseRouter struct {
}

func (u *BaseRouter) InitBaseRouter(Router *gin.RouterGroup) {
	baseRouter := Router.Use()
	baseApi := v1.SystemApisApp.SystemApis.BaseApis
	{
		baseRouter.POST("/login", baseApi.Login)
	}
}
