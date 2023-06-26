package system

import "server/service"

type SystemApi struct {
	UserApi UserApi
}

var (
	userService = service.ServiceGroupApp.UserService
)
