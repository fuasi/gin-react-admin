package system

import "server/models/common"

type SysApi struct {
	common.BaseModel
	Id         uint   `json:"id,omitempty" uri:"id"`
	ApiPath    string `json:"apiPath,omitempty"`
	ApiComment string `json:"apiComment,omitempty"`
	ApiMethod  string `json:"apiMethod,omitempty"`
	ApiGroup   string `json:"apiGroup,omitempty"`
	Required   bool   `json:"required"`
}

func (SysApi) TableName() string {
	return "gra_apis"
}
