package system

import (
	"github.com/pkg/errors"
	"gorm.io/gorm"
	global "server/global"
	"server/models/system"
	"server/models/system/request"
	"server/utils"
)

type UserService struct {
}

func (UserService *UserService) GetUserById(u system.SysUser) (resultUser system.SysUser, err error) {
	if errors.Is(global.GRA_DB.Where("id = ?", u.Id).First(&resultUser.SysUserPublic).Error, gorm.ErrRecordNotFound) {
		return resultUser, errors.New("未找到用户")
	}
	return resultUser, err
}

func (UserService *UserService) UpdateUserById(u system.SysUser) error {
	return global.GRA_DB.Model(&system.SysUser{}).Select("avatar", "nickname", "phone", "enable").
		Where("id = ?", u.Id).
		Updates(map[string]interface{}{
			"avatar":   u.Avatar,
			"nickname": u.Nickname,
			"phone":    u.Phone,
			"enable":   u.Enable,
		}).Error
}

func (UserService *UserService) DeleteUserByIds(ids []uint) error {
	return global.GRA_DB.Delete(system.SysUser{}, ids).Error
}

func (UserService *UserService) GetUserList(request request.SearchUser) (resultUser []system.SysUserPublic, total int64, err error) {
	limit, offset := utils.PageQuery(request.PageInfo)
	tx := global.GRA_DB.Model(system.SysUser{}).Scopes(
		utils.SearchWhere("id", request.Id, false),
		utils.SearchWhere("username", request.Username, true),
		utils.SearchWhere("nickname", request.Nickname, true),
		utils.SearchWhere("phone", request.Phone, true),
		utils.SearchWhere("enable", request.Enable, false),
	)
	err = tx.Count(&total).Error
	if err != nil {
		return
	}
	err = tx.Order("id").Limit(limit).Offset(offset).Find(&resultUser).Error
	return resultUser, total, err
}

func (UserService *UserService) InsertUser(u system.SysUser) error {
	u.Password = utils.GetPasswordEncrypt(global.GRA_CONFIG.User.CreateUserPassword)
	return global.GRA_DB.Create(&u).Error
}

func (UserService *UserService) ResetUserPassword(u system.SysUser) (defaultPassword string, err error) {
	return global.GRA_CONFIG.User.ResetPassword, global.GRA_DB.Model(&u).Where("id = ?", u.Id).UpdateColumn("password", utils.GetPasswordEncrypt(global.GRA_CONFIG.User.ResetPassword)).Error
}

func (UserService *UserService) GetSelfInfo(uid uint) (s system.SysUserPublic, err error) {
	err = global.GRA_DB.Where("id = ?", uid).Find(&s).Error
	return s, err
}
func (UserService *UserService) GetRouter(id uint) (routers []system.Router, err error) {
	var role system.SysRole
	err = global.GRA_DB.Where("id = ?", id).Select("allow_router_id").Find(&role).Error
	if err != nil {
		return nil, err
	}
	err = global.GRA_DB.Model(&routers).Where("id = any (?)", role.AllowRouterId).Find(&routers).Order("id,router_order").Error
	if err != nil {
		return nil, err
	}
	return routers, err
}
