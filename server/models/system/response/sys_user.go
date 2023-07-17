package request

import "server/models/system"

type GetUserListResponse struct {
	List  []system.SysUserPublic `json:"list,omitempty"`
	Total int64                  `json:"total,omitempty"`
}
