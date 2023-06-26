package apis

import "server/apis/system"

type SystemApis struct {
	SystemApis system.SystemApi
}

var SystemApisApp = new(SystemApis)
