package system

import (
	"github.com/gin-gonic/gin"
	v1 "server/apis/v1"
	"server/models/common"
	"server/utils"
)

type RoutersRouter struct {
}

func (r *RoutersRouter) InitRoutersRouter(Router *gin.RouterGroup, apiSet map[string]struct{}) {
	routersRouter := Router.Use()
	routerApi := v1.SystemApisApp.SystemApis.RouterApis
	utils.RegisterApi(routersRouter, apiSet,
		utils.NewRegisterApiParam(common.HttpGet, "/router/:id", "根据ID获取路由信息", routerApi.FindRouterById),
		utils.NewRegisterApiParam(common.HttpPost, "/router", "获取路由列表", routerApi.GetRouterList),
		utils.NewRegisterApiParam(common.HttpPut, "/router", "创建路由", routerApi.InsertRouter),
		utils.NewRegisterApiParam(common.HttpDelete, "/router", "根据ID删除路由", routerApi.DeleteRouter),
		utils.NewRegisterApiParam(common.HttpPatch, "/router", "根据ID更新路由信息", routerApi.UpdateRouter),
	)
}
