package request

import (
	"server/models/common/request"
	"server/models/system"
)

type SearchApi struct {
	request.PageInfo
	system.SysApi
}
