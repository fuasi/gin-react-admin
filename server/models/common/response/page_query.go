package response

type PageQueryResponse[T any] struct {
	List  []T   `json:"list,omitempty"`  //用户列表
	Total int64 `json:"total,omitempty"` //数量
}
