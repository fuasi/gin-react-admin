package system

import (
	"encoding/json"
	"github.com/pkg/errors"
	"gorm.io/gorm"
	global "server/global"
	commonRequest "server/models/common/request"
	"server/models/system"
	"server/utils"
)

type UserServices struct {
}

func (userService *UserServices) GetUserById(u system.SysUser) (resultUser system.SysUser, err error) {
	if errors.Is(global.GRA_DB.Where("id = ?", u.Id).First(&resultUser.SysUserPublic).Error, gorm.ErrRecordNotFound) {
		return resultUser, errors.New("未找到用户")
	}
	return resultUser, err
}

func (userService *UserServices) UpdateUserById(u system.SysUser) error {
	//var roleServices RoleServices
	//role, err := roleServices.FindRoleById(system.SysRole{Id: u.RoleId})
	//if err != nil {
	//	return err
	//}
	//global.GRA_CASBIN.UpdateGroupingPolicy([]string{}, []string{})
	return global.GRA_DB.Model(&system.SysUser{}).Select("avatar", "nickname", "phone", "enable", "role_id").
		Where("id = ?", u.Id).
		Updates(map[string]interface{}{
			"avatar":   u.Avatar,
			"nickname": u.Nickname,
			"phone":    u.Phone,
			"enable":   u.Enable,
			"role_id":  u.RoleId,
		}).Error
}

func (userService *UserServices) DeleteUserByIds(ids []uint) error {
	return global.GRA_DB.Delete(system.SysUser{}, ids).Error
}

func (userService *UserServices) GetUserList(search commonRequest.Search[system.SysUserPublic]) (resultUser []system.SysUserPublic, total int64, err error) {
	limit, offset := utils.PageQuery(search.PageInfo)
	user := search.Condition
	tx := global.GRA_DB.Model(system.SysUser{}).Scopes(
		utils.SearchWhere("id", user.Id, false),
		utils.SearchWhere("username", user.Username, true),
		utils.SearchWhere("nickname", user.Nickname, true),
		utils.SearchWhere("phone", user.Phone, true),
		utils.SearchWhere("enable", user.Enable, false),
	)
	err = tx.Count(&total).Error
	if err != nil {
		return
	}
	err = tx.Order("id").Limit(limit).Offset(offset).Find(&resultUser).Error
	return resultUser, total, err
}

func (userService *UserServices) InsertUser(u system.SysUser) error {
	u.Password = utils.GetPasswordEncrypt(global.GRA_CONFIG.User.CreateUserPassword)
	return global.GRA_DB.Create(&u).Error
}

func (userService *UserServices) ResetUserPassword(u system.SysUser) (defaultPassword string, err error) {
	return global.GRA_CONFIG.User.ResetPassword, global.GRA_DB.Model(&u).Where("id = ?", u.Id).UpdateColumn("password", utils.GetPasswordEncrypt(global.GRA_CONFIG.User.ResetPassword)).Error
}

func (userService *UserServices) GetSelfInfo(uid uint) (user system.SysUserPublic, path string, err error) {
	err = global.GRA_DB.Where("id = ?", uid).Find(&user).Error
	if err != nil {
		return user, path, err
	}
	var role system.SysRole
	err = global.GRA_DB.Select("default_router_id").Where("id = any(?)", user.RoleId).First(&role).Error
	if err != nil {
		return user, path, err
	}
	var router system.SysRouter
	err = global.GRA_DB.Select("path").Where("id = ?", role.DefaultRouterId).First(&router).Error
	if err != nil {
		return user, router.Path, err
	}
	return user, router.Path, err
}

// GetRouter 获取路由
func (userService *UserServices) GetRouter(id uint) (routers []system.SysRouter, err error) {
	var roles []system.SysRole
	var user system.SysUser
	// 获取用户的角色ID
	if err = global.GRA_DB.Select("role_id").Where("id = ?", id).First(&user).Error; err != nil {
		return routers, err
	}
	//用户可能会有多个角色,使用any全部查询出
	err = global.GRA_DB.Where("id = any(?)", user.RoleId).Select("allow_router_id").Find(&roles).Error
	if err != nil {
		return nil, err
	}
	var allowRouterId []int64
	//将多个角色的路由Id合并,进行查询路由
	for _, role := range roles {
		var cacheAllowRouterId []int64
		marshal, err := json.Marshal(role.AllowRouterId)
		if err != nil {
			return nil, err
		}
		err = json.Unmarshal(marshal, &cacheAllowRouterId)
		if err != nil {
			return nil, err
		}
		allowRouterId = append(allowRouterId, cacheAllowRouterId...)
	}
	//因为一个用户可能不止一个角色,使用in查询多个角色的路由
	err = global.GRA_DB.Model(&routers).Where("id in ?", allowRouterId).Order("id,router_order").Find(&routers).Error
	if err != nil {
		return nil, err
	}
	//返回路由
	return routers, err
}
