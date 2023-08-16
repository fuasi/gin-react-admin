package request

import "server/models/system"

type GetSelfInfoResponse struct {
	system.SysUserPublic
	Path string `json:"path,omitempty"`
}
