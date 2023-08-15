package system

import "server/services"

type SystemApi struct {
	UserApi   UserApi
	BaseApi   BaseApi
	SysApiApi SysApiApi
}

var (
	userService = services.ServiceGroupApp.UserService
	baseService = services.ServiceGroupApp.BaseService
	apiService  = services.ServiceGroupApp.ApiService
)
