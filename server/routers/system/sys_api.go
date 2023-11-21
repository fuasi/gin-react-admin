package system

import (
	"github.com/gin-gonic/gin"
	v1 "server/apis/v1"
	"server/models/common"
	"server/utils"
)

type ApiRouter struct {
}

func (u *ApiRouter) InitApiRouter(Router *gin.RouterGroup, apiSet map[string]struct{}) {
	apiRouter := Router.Use()
	apiApi := v1.SystemApisApp.SystemApis.SysApiApis
	utils.RegisterApi(apiRouter, apiSet,
		utils.NewRegisterApiParam(common.HttpPost, "/apis", "获取Api列表", apiApi.GetApiList),
		utils.NewRegisterApiParam(common.HttpPatch, "/api", "根据ID更新Api信息", apiApi.UpdateApi),
		utils.NewRegisterApiParam(common.HttpDelete, "/api", "根据ID删除Api", apiApi.DeleteApi),
		utils.NewRegisterApiParam(common.HttpGet, "/api/:id", "根据ID获取Api信息", apiApi.FindApiById),
		utils.NewRegisterApiParam(common.HttpPost, "/api", "创建Api", apiApi.InsertApi),
	)
}
