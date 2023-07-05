package system

import "server/service"

type SystemApi struct {
	UserApi UserApi
	BaseApi BaseApi
}

var (
	userService = service.ServiceGroupApp.UserService
	baseService = service.ServiceGroupApp.BaseService
)
