package system

import (
	"github.com/lib/pq"
	"server/models/common"
)

type SysUser struct {
	SysUserPublic
	SysUserPrivate
}

type SysUserPublic struct {
	Id       uint          `json:"id,omitempty" uri:"id"` //主键ID
	Username string        `json:"username,omitempty"`    //用户名
	Avatar   string        `json:"avatar,omitempty"`      //头像
	Nickname string        `json:"nickname,omitempty"`    //昵称
	Phone    string        `json:"phone,omitempty"`       //手机号
	Enable   int           `json:"enable,omitempty"`      //账号是否启用(启用:1,不启用:-1)
	RoleId   pq.Int64Array `json:"roleId,omitempty" gorm:"type: integer[]"`
	RoleName string        `json:"roleName,omitempty" gorm:"-"`
	Path     string        `json:"path,omitempty" gorm:"-"`
	common.BaseModel
}

type SysUserPrivate struct {
	Password string `json:"password,omitempty"` //密码
}

func (SysUser) TableName() string {
	return "gra_users"
}
func (SysUserPublic) TableName() string {
	return "gra_users"
}
