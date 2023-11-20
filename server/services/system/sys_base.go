package system

import (
	"github.com/pkg/errors"
	"gorm.io/gorm"
	"server/global"
	"server/models/system"
	"server/utils"
)

type BaseServices struct {
}

func (BaseService *BaseServices) Login(u system.SysUser) (resultUser system.SysUser, err error) {
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
