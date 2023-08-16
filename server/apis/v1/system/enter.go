package system

import "server/services"

type SystemApi struct {
	UserApi   UserApi
	BaseApi   BaseApi
	SysApiApi SysApiApi
	RoleApi   RoleApi
}

var (
	userService = services.ServiceGroupApp.UserService
	baseService = services.ServiceGroupApp.BaseService
	apiService  = services.ServiceGroupApp.ApiService
	roleService = services.ServiceGroupApp.RoleService
)
