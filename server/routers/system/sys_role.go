package system

import (
	"github.com/gin-gonic/gin"
	v1 "server/apis/v1"
)

type RoleRouter struct {
}

func (r *RoleRouter) InitRoleRouter(Router *gin.RouterGroup) {
	roleRouter := Router.Use()
	roleApis := v1.SystemApisApp.SystemApis.RoleApis
	{
		roleRouter.POST("/roles", roleApis.GetRoleList)
		roleRouter.PATCH("/role", roleApis.UpdateRole)
		roleRouter.DELETE("/role", roleApis.DeleteRole)
		roleRouter.GET("/role/:id", roleApis.FindRoleById)
		roleRouter.PUT("/role", roleApis.InsertRole)
		roleRouter.GET("/routers/:id", roleApis.GetRoleMenuTree)
		roleRouter.GET("/authority/:id", roleApis.GetRoleAuthority)
		roleRouter.GET("/roles", roleApis.GetAllRole)
	}
}
