package request

import (
	"server/models/common/request"
	"server/models/system"
)

type SearchRole struct {
	request.PageInfo
	system.SysRole
}
