package system

import (
	"github.com/gin-gonic/gin"
	"server/apis/v1"
	_ "server/docs"
	"server/models/common"
	"server/utils"
)

type BaseRouter struct {
}

func (u *BaseRouter) InitBaseRouter(Router *gin.RouterGroup, apiSet map[string]struct{}) {
	baseRouter := Router.Use()
	baseApi := v1.SystemApisApp.SystemApis.BaseApis
	utils.RegisterApi(baseRouter, apiSet,
		utils.NewRegisterApiParam(common.HttpPost, "/login", "用户登录", baseApi.Login),
	)
}
