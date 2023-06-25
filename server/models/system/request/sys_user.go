package request

type Login struct {
	Username string `json:"username,omitempty"` // 用户名
	Password string `json:"password,omitempty"` // 密码
}
