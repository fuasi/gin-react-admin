package request

import "server/models/system"

type GetUserListResponse struct {
	List  []system.SysUserPublic `json:"list,omitempty"`  //用户列表
	Total int64                  `json:"total,omitempty"` //数量
}
