package system

import "server/services"

type SystemApi struct {
	UserApi   UserApi
	BaseApi   BaseApi
	SysApiApi SysApiApi
	RoleApi   RoleApi
	RouterApi RouterApi
}

var (
	userService   = services.ServiceGroupApp.UserService
	baseService   = services.ServiceGroupApp.BaseService
	apiService    = services.ServiceGroupApp.ApiService
	roleService   = services.ServiceGroupApp.RoleService
	routerService = services.ServiceGroupApp.RouterService
)
