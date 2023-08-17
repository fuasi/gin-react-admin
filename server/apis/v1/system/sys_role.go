package system

import (
	"github.com/gin-gonic/gin"
	"server/global"
	"server/models/common/response"
	"server/models/system"
	"server/models/system/request"
	roleResponse "server/models/system/response"
	"server/utils"
)

type RoleApi struct {
}

func (r *RoleApi) GetRoleList(c *gin.Context) {
	var role request.SearchRole
	err := c.ShouldBind(&role)
	if err != nil {
		response.ParamError(c)
		return
	}
	list, total, err := roleService.GetRoleList(role)
	if err != nil {
		global.GRA_LOG.Error("查询角色列表失败:", err.Error())
		response.Error(c)
		return
	}
	response.SuccessWithData(c, response.PageQueryResponse[system.SysRole]{
		Total: total,
		List:  list,
	})
}

func (r *RoleApi) UpdateRole(c *gin.Context) {
	var role system.SysRole
	err := c.ShouldBind(&role)
	if err != nil {
		response.ParamError(c)
		return
	}
	err = roleService.UpdateRole(role)
	if err != nil {
		global.GRA_LOG.Error("更新角色失败:", err.Error())
		response.Error(c)
		return
	}
	response.Success(c)
}

func (r *RoleApi) DeleteRole(c *gin.Context) {
	var id []uint
	err := c.ShouldBind(&id)
	if err != nil {
		response.ParamError(c)
		return
	}
	err = roleService.DeleteRole(id)
	if err != nil {
		global.GRA_LOG.Error("删除角色失败:", err.Error())
		response.Error(c)
		return
	}
	response.Success(c)
}
func (r *RoleApi) FindRoleById(c *gin.Context) {
	var role system.SysRole
	err := c.ShouldBindUri(&role)
	if err != nil {
		response.ParamError(c)
		return
	}
	role, err = roleService.FindRoleById(role)
	if err != nil {
		return
	}
	response.SuccessWithData(c, role)
}

func (r *RoleApi) InsertRole(c *gin.Context) {
	var role system.SysRole
	err := c.ShouldBind(&role)
	if err != nil {
		response.ParamError(c)
		return
	}
	err = roleService.InsertRole(role)
	if err != nil {
		response.Error(c)
		return
	}
	response.Success(c)
}

func (r *RoleApi) GetRoleMenuTree(c *gin.Context) {
	id := c.Param("id")
	tree, role, err := roleService.GetRoleMenuTree(id)
	if err != nil {
		global.GRA_LOG.Error("获取角色路由树失败:", err.Error())
		response.Error(c)
		return
	}
	routerTree := utils.GetRouterTree(&tree)
	response.SuccessWithData(c, roleResponse.RouterTreeResponse{
		Selected: role.AllowRouterId,
		Routers:  routerTree,
	})
}
func (r *RoleApi) GetRoleAuthority(c *gin.Context) {
	id := c.Param("id")
	apis, role, err := roleService.GetRoleAuthority(id)
	if err != nil {
		global.GRA_LOG.Error("获取Api权限失败:", err.Error())
		return
	}
	response.SuccessWithData(c, roleResponse.ApiResponse{
		Selected: role.AllowApiId,
		Apis:     apis,
	})
}
func (r *RoleApi) GetAllRole(c *gin.Context) {
	roles, err := roleService.GetAllRole()
	if err != nil {
		global.GRA_LOG.Error("获取全部角色失败:", err.Error())
		response.Error(c)
		return
	}
	response.SuccessWithData(c, roles)
}
