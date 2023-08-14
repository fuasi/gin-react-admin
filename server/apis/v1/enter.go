package v1

import (
	"server/apis/v1/system"
)

type SystemApis struct {
	SystemApis system.SystemApi
}

var SystemApisApp = new(SystemApis)
