package system

import (
	"github.com/gin-gonic/gin"
	"server/models/common"
)

type SysApi struct {
	common.BaseModel
	Id         uint   `json:"id,omitempty" uri:"id"`
	ApiPath    string `json:"apiPath,omitempty"`
	ApiComment string `json:"apiComment,omitempty"`
	ApiMethod  string `json:"apiMethod,omitempty"`
	ApiGroup   string `json:"apiGroup,omitempty"`
	ApiGroupId uint   `json:"apiGroupId,omitempty"`
	Required   bool   `json:"required"`
}

func (SysApi) TableName() string {
	return "gra_apis"
}

type RegisterApiParam struct {
	ApiMethod  common.HttpType
	ApiUrl     string
	ApiComment string
	Handle     func(ctx *gin.Context)
}
