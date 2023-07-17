package system

import (
	"github.com/pkg/errors"
	"gorm.io/gorm"
	"server/global"
	"server/models/common/request"
	"server/models/system"
	"server/utils"
)

type UserService struct {
}

func (UserService *UserService) Login(u system.SysUser) (resultUser system.SysUser, err error) {
	var user system.SysUser

	if errors.Is(global.GRA_DB.Where("username = ?", u.Username).First(&user).Error, gorm.ErrRecordNotFound) {
		return resultUser, errors.New("账号或密码错误")
	}
	login := utils.VerifyPassword(user.Password, u.Password)
	if !login {
		return resultUser, errors.New("账号或密码错误")
	}
	return u, err
}

func (UserService *UserService) GetUserById(u system.SysUser) (resultUser system.SysUser, err error) {
	if errors.Is(global.GRA_DB.Where("id = ?", u.Id).First(&resultUser).Error, gorm.ErrRecordNotFound) {
		return resultUser, errors.New("未找到用户")
	}
	return resultUser, err
}

func (UserService *UserService) UpdateUserById(u system.SysUser) (resultUser system.SysUser, err error) {
	err = global.GRA_DB.Updates(u).Error
	return resultUser, err
}

func (UserService *UserService) DeleteUserById(u system.SysUser) (resultUser system.SysUser, err error) {
	err = global.GRA_DB.Delete(u).Error
	return resultUser, err
}

func (UserService *UserService) GetUserList(info request.PageInfo) (resultUser []system.SysUserPublic, total int64, err error) {
	limit := info.PageSize
	offset := (info.Page - 1) * info.PageSize
	err = global.GRA_DB.Model(resultUser).Count(&total).Error
	if err != nil {
		return
	}
	err = global.GRA_DB.Limit(limit).Offset(offset).Find(&resultUser).Error
	return resultUser, total, err
}
