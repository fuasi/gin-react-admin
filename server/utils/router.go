package utils

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"server/global"
	"server/models/common"
	"server/models/system"
)

// GetRouterTree
// -------- 返回组装后的路由 --------
func GetRouterTree(routers *[]system.SysRouter) []system.SysRouter {
	routerMap := map[int][]system.SysRouter{}
	for _, router := range *routers {
		routerMap[router.ParentId] = append(routerMap[router.ParentId], router)
	}
	var routerTree []system.SysRouter
	for _, router := range *routers {
		router.Children = routerMap[router.Id]
		if router.ParentId == -1 {
			routerTree = append(routerTree, router)
		}
	}
	return routerTree
}

func NewRegisterApiParam(apiMethod common.HttpType, apiUrl, apiComment string, handle func(ctx *gin.Context)) system.RegisterApiParam {
	return system.RegisterApiParam{
		ApiMethod:  apiMethod,
		ApiUrl:     apiUrl,
		ApiComment: apiComment,
		Handle:     handle,
	}
}

// RegisterApi 根据Api接口简介是否存在,进行判断是否已注册
func RegisterApi(router gin.IRoutes, apiSet map[string]struct{}, params ...system.RegisterApiParam) {

	for _, param := range params {
		_, exist := apiSet[param.ApiComment]
		if !exist {
			if err := global.GRA_DB.Table("gra_apis").Create(map[string]any{
				"api_path":    fmt.Sprintf("%s%s", global.GRA_CONFIG.System.ApiPrefix, param.ApiUrl),
				"api_comment": param.ApiComment,
				"api_method":  param.ApiMethod,
				"method":      param.ApiMethod.MethodString(),
			}).Error; err != nil {
				panic(fmt.Sprintf("Api注册失败,%s", err.Error()))
			}
		}
		switch param.ApiMethod {
		case common.HttpGet:
			router.GET(param.ApiUrl, param.Handle)
		case common.HttpPost:
			router.POST(param.ApiUrl, param.Handle)
		case common.HttpPatch:
			router.PATCH(param.ApiUrl, param.Handle)
		case common.HttpDelete:
			router.DELETE(param.ApiUrl, param.Handle)
		default:
			router.PUT(param.ApiUrl, param.Handle)
		}
	}
}
