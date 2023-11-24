package system

import (
	"github.com/gin-gonic/gin"
	v1 "server/apis/v1"
	"server/models/common"
	"server/utils"
)

type RoleRouter struct {
}

func (r *RoleRouter) InitRoleRouter(Router *gin.RouterGroup, apiSet map[string]struct{}) {
	roleRouter := Router.Use()
	roleApis := v1.SystemApisApp.SystemApis.RoleApis
	utils.RegisterApi(roleRouter, apiSet,
		utils.NewRegisterApiParam(common.HttpPost, "/roles", "获取角色列表", roleApis.GetRoleList),
		utils.NewRegisterApiParam(common.HttpPatch, "/role", "根据ID更新角色", roleApis.UpdateRole),
		utils.NewRegisterApiParam(common.HttpDelete, "/role", "根据ID删除角色", roleApis.DeleteRole),
		utils.NewRegisterApiParam(common.HttpGet, "/role/:id", "根据ID获取角色信息", roleApis.FindRoleById),
		utils.NewRegisterApiParam(common.HttpGet, "/authority/:id", "获取角色允许访问的Api", roleApis.GetRoleAuthority),
		utils.NewRegisterApiParam(common.HttpPut, "/role", "创建角色", roleApis.InsertRole),
		utils.NewRegisterApiParam(common.HttpGet, "/routers/:id", "获取路由菜单树", roleApis.GetRoleMenuTree),
		utils.NewRegisterApiParam(common.HttpGet, "/roles", "获取全部角色", roleApis.GetAllRole),
	)
}
