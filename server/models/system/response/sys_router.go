package request

type SysRouterGroup struct {
	Id   int    `json:"value,omitempty"` //主键ID
	Name string `json:"label,omitempty"` //菜单名称
}

func (SysRouterGroup) TableName() string {
	return "gra_routers"
}
