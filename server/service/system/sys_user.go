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

func (UserService *UserService) Login(u system.SysUser) (resultUser system.SysUser, err error) {
	var user system.SysUser
	if errors.Is(global.GRA_DB.Where("username = ?", u.Username).First(&user).Error, gorm.ErrRecordNotFound) {
		return resultUser, errors.New("账号或密码错误")
	}
	if user.Enable == -1 {
		return resultUser, errors.New("账号已被禁用,请联系管理员启用!")
	}
	login := utils.VerifyPassword(user.Password, u.Password)
	if !login {
		return resultUser, errors.New("账号或密码错误")
	}
	return user, err
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
	limit := request.PageSize
	offset := (request.Page - 1) * request.PageSize
	tx := global.GRA_DB.Debug().Model(system.SysUser{}).Scopes(
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
