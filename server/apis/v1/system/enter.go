package system

import "server/services"

type SystemApi struct {
	UserApis   UserApis
	BaseApis   BaseApis
	SysApiApis SysApiApis
	RoleApis   RoleApis
	RouterApis RouterApis
	FileApis   FileApis
}

var (
	userServices   = services.ServiceGroupApp.UserServices
	baseServices   = services.ServiceGroupApp.BaseServices
	apiServices    = services.ServiceGroupApp.ApiServices
	roleServices   = services.ServiceGroupApp.RoleServices
	routerServices = services.ServiceGroupApp.RouterServices

	fileServices = services.ServiceGroupApp.FileServices
)
