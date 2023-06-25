package system

import "server/service"

type SystemApiGroup struct {
	UserApi
}

var (
	userService = service.ServiceGroupApp.UserService
)
