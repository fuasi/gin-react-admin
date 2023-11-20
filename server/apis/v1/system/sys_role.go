package system

import (
	"github.com/gin-gonic/gin"
	"server/global"
	commonRequest "server/models/common/request"
	"server/models/common/response"
	"server/models/system"
	"server/models/system/request"
	roleResponse "server/models/system/response"
	"server/utils"
)

type RoleApis struct {
}

func (r *RoleApis) GetRoleList(c *gin.Context) {
	var role request.SearchRole
	err := c.ShouldBind(&role)
	if err != nil {
		response.ParamError(c)
		return
	}
	list, total, err := roleServices.GetRoleList(role)
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

func (r *RoleApis) UpdateRole(c *gin.Context) {
	var role system.SysRole
	err := c.ShouldBind(&role)
	if err != nil {
		response.ParamError(c)
		return
	}
	err = roleServices.UpdateRole(role)
	if err != nil {
		global.GRA_LOG.Error("更新角色失败:", err.Error())
		response.Error(c)
		return
	}
	response.Success(c)
}

func (r *RoleApis) DeleteRole(c *gin.Context) {
	var id []uint
	err := c.ShouldBind(&id)
	if err != nil {
		response.ParamError(c)
		return
	}
	err = roleServices.DeleteRole(id)
	if err != nil {
		global.GRA_LOG.Error("删除角色失败:", err.Error())
		response.Error(c)
		return
	}
	response.Success(c)
}
func (r *RoleApis) FindRoleById(c *gin.Context) {
	var role system.SysRole
	err := c.ShouldBindUri(&role)
	if err != nil {
		response.ParamError(c)
		return
	}
	role, err = roleServices.FindRoleById(role)
	if err != nil {
		return
	}
	response.SuccessWithData(c, role)
}

func (r *RoleApis) InsertRole(c *gin.Context) {
	var role system.SysRole
	err := c.ShouldBind(&role)
	if err != nil {
		response.ParamError(c)
		return
	}
	err = roleServices.InsertRole(role)
	if err != nil {
		response.Error(c)
		return
	}
	response.Success(c)
}

func (r *RoleApis) GetRoleMenuTree(c *gin.Context) {
	id := c.Param("id")
	tree, role, err := roleServices.GetRoleMenuTree(id)
	if err != nil {
		global.GRA_LOG.Error("获取角色路由树失败:", err.Error())
		response.Error(c)
		return
	}
	routerTree := utils.GetRouterTree(&tree)
	response.SuccessWithData(c, roleResponse.RouterTreeResponse{
		Selected:        role.AllowRouterId,
		Routers:         routerTree,
		DefaultRouterId: role.DefaultRouterId,
	})
}
func (r *RoleApis) GetRoleAuthority(c *gin.Context) {
	id := c.Param("id")
	role, err := roleServices.GetRoleAuthority(id)
	if err != nil {
		global.GRA_LOG.Error("获取Api权限失败:", err.Error())
		return
	}
	list, _, err := apiServices.GetApiList(request.SearchApi{
		PageInfo: commonRequest.PageInfo{
			Page:     1,
			PageSize: -1,
		},
	})
	response.SuccessWithData(c, roleResponse.ApiResponse{
		Selected: role.AllowApiId,
		Apis:     list,
	})
}
func (r *RoleApis) GetAllRole(c *gin.Context) {
	roles, err := roleServices.GetAllRole()
	if err != nil {
		global.GRA_LOG.Error("获取全部角色失败:", err.Error())
		response.Error(c)
		return
	}
	response.SuccessWithData(c, roles)
}
