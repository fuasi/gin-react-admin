package system

import (
	"github.com/gin-gonic/gin"
	"server/apis/v1"
	"server/models/common"
	"server/utils"
)

type UserRouter struct {
}

func (u *UserRouter) InitUserRouter(Router *gin.RouterGroup, apiSet map[string]struct{}) {
	userRouter := Router.Use()
	userApi := v1.SystemApisApp.SystemApis.UserApis
	utils.RegisterApi(userRouter, apiSet,
		utils.NewRegisterApiParam(common.HttpGet, "/user/:id", "根据ID获取用户信息", userApi.GetUserById),
		utils.NewRegisterApiParam(common.HttpPatch, "/user", "根据ID更新用户信息", userApi.UpdateUserById),
		utils.NewRegisterApiParam(common.HttpDelete, "/user", "根据ID删除用户", userApi.DeleteUserById),
		utils.NewRegisterApiParam(common.HttpPost, "/users", "获取用户列表", userApi.GetUserList),
		utils.NewRegisterApiParam(common.HttpPost, "/check", "检查用户是否登录", userApi.CheckLogin),
		utils.NewRegisterApiParam(common.HttpPatch, "/user/:id", "根据ID重置用户密码", userApi.ResetUserPassword),
		utils.NewRegisterApiParam(common.HttpGet, "/user", "获取用户自身信息", userApi.GetSelfInfo),
		utils.NewRegisterApiParam(common.HttpPut, "/user", "创建用户", userApi.InsertUser),
		utils.NewRegisterApiParam(common.HttpGet, "/routers", "获取路由树", userApi.GetRouter),
	)
}
