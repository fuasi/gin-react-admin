package system

type SysRouterGroup struct {
	UserRouter
	BaseRouter
	ApiRouter
	RoleRouter
	RoutersRouter
	FileRouter
}
