package system

import (
	"github.com/pkg/errors"
	"gorm.io/gorm"
	"server/global"
	"server/models/system"
	"server/models/system/request"
	"server/utils"
)

type ApiService struct {
}

func (api ApiService) GetApiList(request request.SearchApi) (apis []system.SysApi, total int64, err error) {
	limit, offset := utils.PageQuery(request.PageInfo)
	tx := global.GRA_DB.Model(&apis).Scopes(
		utils.SearchWhere("id", request.Id, false),
		utils.SearchWhere("api_path", request.ApiPath, true),
		utils.SearchWhere("api_group_id", request.ApiGroupId, false),
		utils.SearchWhere("api_comment", request.ApiComment, true),
		utils.SearchWhere("api_method", request.ApiMethod, false))
	err = tx.Count(&total).Error
	if err != nil {
		return nil, 0, errors.New("查询数据数量失败")
	}
	err = tx.Model(&apis).Order("id").Joins("right join gra_routers on gra_routers.id = gra_apis.api_group_id where gra_routers.id = gra_apis.api_group_id").Select("gra_apis.*,gra_routers.name as api_group").Offset(offset).Limit(limit).Find(&apis).Error
	return apis, total, err
}

func (api ApiService) UpdateApi(a system.SysApi) error {
	return global.GRA_DB.Model(&a).Where("id = ?", a.Id).Updates(map[string]any{
		"api_group_id": a.ApiGroupId,
		"api_path":     a.ApiPath,
		"api_comment":  a.ApiComment,
		"required":     a.Required,
		"api_method":   a.ApiMethod,
	}).Error
}

func (api ApiService) DeleteApi(ids []int) error {
	return global.GRA_DB.Delete(system.SysApi{}, ids).Error
}
func (api ApiService) FindApiById(a system.SysApi) (resultApi system.SysApi, err error) {
	if errors.Is(global.GRA_DB.Where("id = ?", a.Id).First(&resultApi).Error, gorm.ErrRecordNotFound) {
		return resultApi, errors.New("未找到该API")
	}
	return resultApi, err
}
func (api ApiService) InsertApi(sysApi system.SysApi) error {
	return global.GRA_DB.Model(&sysApi).Create(map[string]any{
		"api_group_id": sysApi.ApiGroupId,
		"api_path":     sysApi.ApiPath,
		"api_comment":  sysApi.ApiComment,
		"required":     sysApi.Required,
		"api_method":   sysApi.ApiMethod,
	}).Error
}
