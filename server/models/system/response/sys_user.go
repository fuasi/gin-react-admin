package request

import "server/models/system"

type GetUserListResponse struct {
	List  []system.SysUserPublic
	Total int64
}
