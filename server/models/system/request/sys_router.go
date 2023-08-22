package request

import (
	"server/models/common/request"
	"server/models/system"
)

type SearchRouter struct {
	request.PageInfo
	system.SysRouter
}
