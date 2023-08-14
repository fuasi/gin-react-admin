package request

import "server/models/system"

type LoginResponse struct {
	Token string               //令牌
	User  system.SysUserPublic //用户信息
}
