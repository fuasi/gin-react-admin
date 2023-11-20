package system

import (
	"github.com/gin-gonic/gin"
	v1 "server/apis/v1"
)

type ApiRouter struct {
}

func (u *ApiRouter) InitApiRouter(Router *gin.RouterGroup) {
	apiRouter := Router.Use()
	apiApi := v1.SystemApisApp.SystemApis.SysApiApis
	{
		apiRouter.POST("/apis", apiApi.GetApiList)
		apiRouter.PATCH("/api", apiApi.UpdateApi)
		apiRouter.DELETE("/api", apiApi.DeleteApi)
		apiRouter.GET("/api/:id", apiApi.FindApiById)
		apiRouter.POST("/api", apiApi.InsertApi)
	}
}
