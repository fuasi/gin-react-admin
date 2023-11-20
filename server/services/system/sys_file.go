package system

import (
	"os"
	"server/global"
	"server/models/common/request"
	"server/models/system"
	"server/utils"
)

type FileServices struct {
}

func (FileServices) InsertFile(file system.SysFile) error {
	return global.GRA_DB.Create(&file).Error
}

func (FileServices) UpdateFile(file system.SysFile) error {
	return global.GRA_DB.Model(file).Where("id = ?", file.Id).Update("file_name", file.FileName).Error
}
func (service FileServices) DeleteFile(file system.SysFile) error {
	firstFile, err := service.GetFirstFile(file.Id)
	if err != nil {
		return err
	}
	err = global.GRA_DB.Delete(system.SysFile{}, file.Id).Error
	if err != nil {
		return err
	}
	err = os.Remove(firstFile.FilePath)
	if err != nil {
		global.GRA_LOG.Error("id: ", file.Id, "path:", file.FilePath, "删除硬盘文件失败:", err.Error())
	}
	return err
}
func (FileServices) GetFirstFile(id uint) (file system.SysFile, err error) {
	err = global.GRA_DB.Where("id = ?", id).First(&file).Error
	return file, err
}

func (FileServices) GetFileList(search request.Search[system.SysFile]) (files []system.SysFile, total int64, err error) {
	file := search.Condition
	limit, offset := utils.PageQuery(search.PageInfo)
	tx := global.GRA_DB.Scopes(utils.SearchWhere("file_name", file.FileName, true))
	err = tx.Model(system.SysFile{}).Count(&total).Error
	if err != nil {
		return files, total, err
	}
	err = tx.Order("updated_at desc").Limit(limit).Offset(offset).Find(&files).Error
	return files, total, err
}
