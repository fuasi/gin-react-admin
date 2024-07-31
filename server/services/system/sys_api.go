package system

import (
	"github.com/pkg/errors"
	"gorm.io/gorm"
	"server/global"
	commonRequest "server/models/common/request"
	"server/models/system"
	"server/utils"
)

type ApiServices struct {
}

func (ApiServices) GetApiList(search commonRequest.Search[system.SysApi]) (apis []system.SysApi, total int64, err error) {
	limit, offset := utils.PageQuery(search.PageInfo)
	api := search.Condition
	tx := global.GRA_DB.Model(&apis).Scopes(
		utils.SearchWhere("id", api.Id, false),
		utils.SearchWhere("api_path", api.ApiPath, true),
		utils.SearchWhere("api_comment", api.ApiComment, true),
		utils.SearchWhere("api_method", api.ApiMethod, false))
	err = tx.Count(&total).Error
	if err != nil {
		return nil, 0, errors.New("查询数据数量失败")
	}
	err = tx.Model(&apis).Order("id").Offset(offset).Limit(limit).Find(&apis).Error
	return apis, total, err
}

func (api ApiServices) UpdateApi(a system.SysApi) error {
	return global.GRA_DB.Model(&a).Where("id = ?", a.Id).Updates(map[string]any{
		"api_path":    a.ApiPath,
		"api_comment": a.ApiComment,
		"required":    a.Required,
		"api_method":  a.ApiMethod,
	}).Error
}

func (api ApiServices) DeleteApi(ids []int) error {
	return global.GRA_DB.Delete(system.SysApi{}, ids).Error
}
func (api ApiServices) FindApiById(a system.SysApi) (resultApi system.SysApi, err error) {
	if errors.Is(global.GRA_DB.Where("id = ?", a.Id).First(&resultApi).Error, gorm.ErrRecordNotFound) {
		return resultApi, errors.New("未找到该API")
	}
	return resultApi, err
}
func (api ApiServices) InsertApi(sysApi system.SysApi) error {
	return global.GRA_DB.Model(&sysApi).Create(map[string]any{
		"api_path":    sysApi.ApiPath,
		"api_comment": sysApi.ApiComment,
		"required":    sysApi.Required,
		"api_method":  sysApi.ApiMethod,
	}).Error
}
