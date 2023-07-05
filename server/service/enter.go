package service

import "server/service/system"

type ServiceGroup struct {
	system.UserService
	system.BaseService
}

var ServiceGroupApp = new(ServiceGroup)
