package system

import (
	"server/global"
	"server/models/system"
	"server/models/system/request"
	"server/utils"
)

type RouterService struct {
}

func (r *RouterService) GetRouterList(page request.SearchRouter) (routers []system.SysRouter, total int64, err error) {
	limit, offset := utils.PageQuery(page.PageInfo)
	db := global.GRA_DB.Scopes(
		utils.SearchWhere("id", page.Id, false),
		utils.SearchWhere("name", page.Name, true),
		utils.SearchWhere("path", page.Path, true),
		utils.SearchWhere("is_api_group", page.IsApiGroup, false),
	)
	err = db.Count(&total).Error
	if err != nil {
		return routers, total, err
	}
	err = db.Limit(limit).Offset(offset).Find(&routers).Error
	return routers, total, err
}

func (r *RouterService) UpdateRouter(router system.SysRouter) error {
	return global.GRA_DB.Where("id = ?", router.Id).Updates(&router).Error
}
func (r *RouterService) InsertRouter(router system.SysRouter) error {
	return global.GRA_DB.Create(&router).Error
}

func (r *RouterService) DeleteRouter(id []int) error {
	return global.GRA_DB.Delete(system.SysRouter{}, id).Error
}
func (r *RouterService) FindRouterById(params system.SysRouter) (router system.SysRouter, err error) {
	err = global.GRA_DB.Where("id = ?", params.Id).First(&router).Error
	return router, err
}
