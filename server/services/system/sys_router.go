package system

import (
	"server/global"
	commonRequest "server/models/common/request"
	"server/models/system"
	response "server/models/system/response"
	"server/utils"
)

type RouterServices struct {
}

func (r *RouterServices) GetRouterList(search commonRequest.Search[system.SysRouter]) (routers []system.SysRouter, total int64, err error) {
	limit, offset := utils.PageQuery(search.PageInfo)
	router := search.Condition
	db := global.GRA_DB.Scopes(
		utils.SearchWhere("id", router.Id, false),
		utils.SearchWhere("name", router.Name, true),
		utils.SearchWhere("path", router.Path, true),
		utils.SearchWhere("is_api_group", router.IsApiGroup, false),
	)
	err = db.Model(&routers).Count(&total).Error
	if err != nil {
		return routers, total, err
	}
	err = db.Limit(limit).Offset(offset).Order("id").Find(&routers).Error
	return routers, total, err
}

func (r *RouterServices) UpdateRouter(router system.SysRouter) error {
	return global.GRA_DB.Updates(&router).Error
}
func (r *RouterServices) InsertRouter(router system.SysRouter) error {
	return global.GRA_DB.Create(&router).Error
}

func (r *RouterServices) DeleteRouter(id []int) error {
	return global.GRA_DB.Delete(system.SysRouter{}, id).Error
}
func (r *RouterServices) FindRouterById(params system.SysRouter) (router system.SysRouter, err error) {
	err = global.GRA_DB.Where("id = ?", params.Id).First(&router).Error
	return router, err
}

func (r *RouterServices) FindRouterGroup() (router []response.SysRouterGroup, err error) {
	err = global.GRA_DB.Select("id,name").Where("is_api_group = ?", 1).Group("id,name").Find(&router).Error
	return router, err
}
