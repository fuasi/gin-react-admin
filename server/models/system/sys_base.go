package system

type Router struct {
	Id            int      `json:"id,omitempty"`
	Name          string   `json:"name,omitempty"`
	Icon          string   `json:"icon,omitempty"`
	Path          string   `json:"path,omitempty"`
	ComponentPath string   `json:"componentPath,omitempty"`
	ParentId      int      `json:"parentId,omitempty"`
	RouterOrder   int      `json:"routerOrder,omitempty"`
	Children      []Router `json:"children,omitempty" gorm:"-"`
}

func (Router) TableName() string {
	return "gra_router"
}
