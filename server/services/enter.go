package services

import "server/services/system"

type ServiceGroup struct {
	system.UserService
	system.BaseService
	system.ApiService
}

var ServiceGroupApp = new(ServiceGroup)
