package system

import (
	"github.com/pkg/errors"
	"gorm.io/gorm"
	"server/global"
	"server/models/system"
	"server/utils"
)

type UserService struct {
}

func (UserService *UserService) Login(u system.SysUser) (resultUser system.SysUser, err error) {
	var user system.SysUser
	if errors.Is(global.GRA_DB.Where("username = ? and password = ?", u.Username, utils.GetPasswordEncrypt(u.Password)).First(&user).Error, gorm.ErrRecordNotFound) {
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
func (UserService *UserService) DeleteUserById(u system.SysUser) (resultUser system.SysUser, err error) {
	err = global.GRA_DB.Delete(u).Error
	return resultUser, err
}
