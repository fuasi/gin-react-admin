package response

import (
	response "server/models/system/response"
)

type PageQueryResponse[T any] struct {
	List  []T   `json:"list,omitempty"`  //用户列表
	Total int64 `json:"total,omitempty"` //数量
}
type PageQueryAndGroupResponse[T any] struct {
	List            []T                       `json:"list,omitempty"`  //用户列表
	Total           int64                     `json:"total,omitempty"` //数量
	ApiGroupOptions []response.SysRouterGroup `json:"apiGroupOptions,omitempty"`
}
