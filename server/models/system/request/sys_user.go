package request

import (
	"server/models/common/request"
	"server/models/system"
)

type Login struct {
	Username string `json:"username,omitempty"` // 用户名
	Password string `json:"password,omitempty"` // 密码
}

type SearchUser struct {
	request.PageInfo
	system.SysUser
}
