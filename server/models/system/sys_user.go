package system

type SysUser struct {
	Id       float64 `json:"id,omitempty"`
	Username string  `json:"username,omitempty"`
	Password string  `json:"password,omitempty"`
	Avatar   string  `json:"avatar,omitempty"`
}

func (SysUser) TableName() string {
	return "users"
}
