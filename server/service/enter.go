package service

import "server/service/system"

type ServiceGroup struct {
	system.UserService
}

var ServiceGroupApp = new(ServiceGroup)
