package services

import "server/services/system"

type ServiceGroup struct {
	system.UserService
	system.BaseService
	system.ApiService
	system.RoleService
	system.RouterService
}

var ServiceGroupApp = new(ServiceGroup)