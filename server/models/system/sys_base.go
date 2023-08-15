package system

type Router struct {
	Id            int      `json:"id,omitempty"`                //主键ID
	Name          string   `json:"name,omitempty"`              //菜单名称
	Icon          string   `json:"icon,omitempty"`              //菜单标识图
	Path          string   `json:"path,omitempty"`              //前端路由访问路径
	ComponentPath string   `json:"componentPath,omitempty"`     //组件路径
	ParentId      int      `json:"parentId,omitempty"`          //父ID
	RouterOrder   int      `json:"routerOrder,omitempty"`       //路由排序,由小到大,如{1,2,3,4}
	Hidden        bool     `json:"hidden"`                      //是否显示在菜单
	Children      []Router `json:"children,omitempty" gorm:"-"` //子路由
}

func (Router) TableName() string {
	return "gra_routers"
}
