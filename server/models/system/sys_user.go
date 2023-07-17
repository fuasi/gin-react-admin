package system

import "server/models/common"

type SysUser struct {
	SysUserPublic
	SysUserPrivate
}

type SysUserPublic struct {
	Id       uint   `json:"id,omitempty"`
	Username string `json:"username,omitempty"`
	Avatar   string `json:"avatar,omitempty"`
	Nickname string `json:"nickname,omitempty"`
	Phone    string `json:"phone,omitempty"`
	Enable   string
	common.BaseModel
}

type SysUserPrivate struct {
	Password string `json:"password,omitempty"`
}

func (SysUser) TableName() string {
	return "gra_users"
}
func (SysUserPublic) TableName() string {
	return "gra_users"
}
