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
		utils.SearchWhere("api_group", request.ApiGroup, true),
		utils.SearchWhere("api_comment", request.ApiComment, true),
		utils.SearchWhere("api_method", request.ApiMethod, false))
	err = tx.Count(&total).Error
	if err != nil {
		return nil, 0, errors.New("查询数据数量失败")
	}
	err = tx.Order("id").Offset(offset).Limit(limit).Find(&apis).Error
	return apis, total, err
}

func (api ApiService) UpdateApi(a system.SysApi) error {
	return global.GRA_DB.Where("id = ?", a.Id).Updates(a).Error
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
	return global.GRA_DB.Create(&sysApi).Error
}
