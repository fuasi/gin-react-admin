package services

import "server/services/system"

type ServiceGroup struct {
	UserServices   system.UserServices
	BaseServices   system.BaseServices
	ApiServices    system.ApiServices
	RoleServices   system.RoleServices
	RouterServices system.RouterServices
	FileServices   system.FileServices
}

var ServiceGroupApp = new(ServiceGroup)
