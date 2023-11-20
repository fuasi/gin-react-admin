package system

import "server/models/common"

type SysFile struct {
	Id             uint   `json:"id,omitempty"`
	FileName       string `json:"fileName,omitempty"`
	SystemFileName string `json:"systemFileName,omitempty"`
	Tag            string `json:"tag,omitempty"`
	FileUrl        string `json:"fileUrl,omitempty"`
	FilePath       string `json:"filePath,omitempty"`
	common.BaseModel
}

func (SysFile) TableName() string {
	return "gra_files"
}
