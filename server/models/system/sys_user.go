package system

type SysUser struct {
	SysUserPublic
	SysUserPrivate
}

type SysUserPublic struct {
	Id       uint   `json:"id,omitempty"`
	Username string `json:"username,omitempty"`
	Avatar   string `json:"avatar,omitempty"`
}

type SysUserPrivate struct {
	Password string `json:"password,omitempty"`
}

func (SysUser) TableName() string {
	return "gra_users"
}
