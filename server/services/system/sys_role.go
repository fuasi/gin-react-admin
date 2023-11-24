package system

import (
	"github.com/pkg/errors"
	"gorm.io/gorm"
	"server/global"
	commonRequest "server/models/common/request"
	"server/models/system"
	"server/utils"
)

type RoleServices struct {
}

func (roleService *RoleServices) GetRoleList(search commonRequest.Search[system.SysRole]) (roles []system.SysRole, total int64, err error) {
	limit, offset := utils.PageQuery(search.PageInfo)
	role := search.Condition
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

func (roleService *RoleServices) UpdateRole(role system.SysRole) error {
	apis, err := roleService.UserAllowApi(role)
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}
	var casbinServices CasbinServices
	err = casbinServices.DeleteCasbinRule(role.RoleName)
	if err != nil {
		return err
	}
	var roles = make([][]string, len(apis))

	for idx, api := range apis {
		roles[idx] = []string{role.RoleName, api.ApiPath, api.Method}
	}
	if len(roles) >= 1 {
		policies, err := global.GRA_CASBIN.AddPoliciesEx(roles)
		if err != nil {
			return err
		}
		if policies == false {
			global.GRA_LOG.Error("添加权限失败:", roles)
			return errors.New("添加权限失败")
		}
	}
	err = casbinServices.ReloadCasbin()
	if err != nil {
		return err
	}
	return global.GRA_DB.Where("id = ?", role.Id).Updates(&role).Error
}

func (roleService *RoleServices) DeleteRole(ids []int64) error {
	roles := make([]system.SysRole, len(ids))
	err := global.GRA_DB.Where("id in ?", ids).Find(&roles).Error
	if err != nil {
		return err
	}
	var casbinServices CasbinServices
	var rolesName = make([]string, len(ids))
	for idx, role := range roles {
		rolesName[idx] = role.RoleName
	}
	err = casbinServices.DeleteCasbinRules(rolesName)
	if err != nil {
		return err
	}
	err = casbinServices.ReloadCasbin()
	if err != nil {
		return err
	}
	return global.GRA_DB.Delete(system.SysRole{}, &ids).Error
}

func (roleService *RoleServices) FindRoleById(role system.SysRole) (system.SysRole, error) {
	err := global.GRA_DB.Where("id = ?", role.Id).Select("id,role_name").Find(&role).Error
	return role, err
}
func (roleService *RoleServices) InsertRole(role system.SysRole) error {
	err := global.GRA_DB.Model(&role).Where("role_name = ?", role.RoleName).First(&role).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return global.GRA_DB.Select("role_name").Create(&role).Error
	}
	return errors.New("角色姓名重复,请修改后重试")
}
func (roleService *RoleServices) GetRoleMenuTree(id string) (routers []system.SysRouter, role system.SysRole, err error) {
	err = global.GRA_DB.Where("id = ?", id).Select("allow_router_id,default_router_id").Find(&role).Error
	if err != nil {
		return nil, role, err
	}
	err = global.GRA_DB.Order("id,router_order").Find(&routers).Error
	return routers, role, err
}
func (roleService *RoleServices) GetRoleAuthority(id string) (role system.SysRole, err error) {
	err = global.GRA_DB.Where("id = ?", id).Select("allow_api_id").Find(&role).Error
	if err != nil {
		return role, err
	}
	return role, err
}
func (roleService *RoleServices) UserAllowApi(role system.SysRole) (apis []system.SysApi, err error) {
	err = global.GRA_DB.Where("id = any(?)", role.AllowApiId).Find(&apis).Error
	return apis, err
}
