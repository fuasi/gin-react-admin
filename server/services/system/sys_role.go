package system

import (
	"server/global"
	"server/models/system"
	"server/models/system/request"
	"server/utils"
)

type RoleService struct {
}

func (RoleService *RoleService) GetRoleList(role request.SearchRole) (roles []system.SysRole, total int64, err error) {
	limit, offset := utils.PageQuery(role.PageInfo)
	tx := global.GRA_DB.Model(system.SysRole{}).Scopes(
		utils.SearchWhere("id", role.Id, false),
		utils.SearchWhere("role_name", role.RoleName, true))
	err = tx.Count(&total).Error
	if err != nil {
		return roles, 0, err
	}
	err = tx.Offset(offset).Limit(limit).Select("id,role_name,default_router_id").Order("id").Find(&roles).Error
	return roles, total, err
}

func (RoleService *RoleService) UpdateRole(role system.SysRole) error {
	return global.GRA_DB.Where("id = ?", role.Id).Updates(&role).Error
}

func (RoleService *RoleService) DeleteRole(id []uint) error {
	return global.GRA_DB.Delete(system.SysRole{}, &id).Error
}

func (RoleService *RoleService) FindRoleById(role system.SysRole) (system.SysRole, error) {
	err := global.GRA_DB.Where("id = ?", role.Id).Select("id,role_name").Find(&role).Error
	return role, err
}
func (RoleService *RoleService) InsertRole(role system.SysRole) error {
	return global.GRA_DB.Select("role_name").Create(&role).Error
}
func (RoleService *RoleService) GetRoleMenuTree(id string) (routers []system.Router, role system.SysRole, err error) {
	err = global.GRA_DB.Where("id = ?", id).Select("allow_router_id,default_router_id").Find(&role).Error
	if err != nil {
		return nil, role, err
	}
	err = global.GRA_DB.Find(&routers).Error
	return routers, role, err
}
func (RoleService *RoleService) GetRoleAuthority(id string) (apis []system.SysApi, role system.SysRole, err error) {
	err = global.GRA_DB.Where("id = ?", id).Select("allow_api_id").Find(&role).Error
	if err != nil {
		return nil, role, err
	}
	err = global.GRA_DB.Find(&apis).Error
	return apis, role, err
}

func (RoleService *RoleService) GetAllRole() (roles []system.SysRole, err error) {
	err = global.GRA_DB.Select("id,role_name").Find(&roles).Error
	return roles, err
}
