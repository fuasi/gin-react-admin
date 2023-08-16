package system

import (
	"server/models/common"
)

type SysUser struct {
	SysUserPublic
	SysUserPrivate
}

type SysUserPublic struct {
	Id       uint   `json:"id,omitempty" uri:"id"` //主键ID
	Username string `json:"username,omitempty"`    //用户名
	Avatar   string `json:"avatar,omitempty"`      //头像
	Nickname string `json:"nickname,omitempty"`    //昵称
	Phone    string `json:"phone,omitempty"`       //手机号
	Enable   int    `json:"enable,omitempty"`      //账号是否启用(启用:1,不启用:-1)
	common.BaseModel
}

type SysUserPrivate struct {
	Password string `json:"password,omitempty"` //密码
}

func (SysUser) TableName() string {
	return "gra_users"
}
func (SysUserPublic) TableName() string {
	return "gra_users"
}

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
	Required      bool     `json:"required"`                    //权限中是否为必须
}

func (Router) TableName() string {
	return "gra_routers"
}
