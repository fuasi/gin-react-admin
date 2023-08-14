package request

import "server/models/system"

type LoginResponse struct {
	Token string               `json:"token,omitempty"` //令牌
	User  system.SysUserPublic `json:"user,omitempty"`  //用户信息
}
