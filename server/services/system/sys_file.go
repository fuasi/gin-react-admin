package system

import (
	"server/global"
	"server/models/system"
)

type FileServices struct {
}

func (FileServices) InsertFile(file system.SysFile) error {
	return global.GRA_DB.Create(&file).Error
}

func (FileServices) UpdateFile() {

}
func (FileServices) DeleteFile() {

}

func (FileServices) GetFileList() {

}
