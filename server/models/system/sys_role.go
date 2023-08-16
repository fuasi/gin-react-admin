package system

import (
	"github.com/lib/pq"
)

type SysRole struct {
	Id              uint          `json:"id,omitempty" uri:"id"`
	RoleName        string        `json:"roleName,omitempty"`
	AllowApiId      pq.Int64Array `json:"allowApiId,omitempty" gorm:"type:integer[]"`
	AllowRouterId   pq.Int64Array `json:"allowRouterId,omitempty" gorm:"type:integer[]"`
	DefaultRouterId uint          `json:"defaultRouterId,omitempty"`
}

func (SysRole) TableName() string {
	return "gra_casbin_role"
}
