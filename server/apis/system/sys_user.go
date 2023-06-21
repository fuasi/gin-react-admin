package system

import (
	"github.com/gin-gonic/gin"
	"server/global"
	"server/models/common/response"
	"server/models/system"
	"server/models/system/request"
	"server/utils"
)

type UserApi struct {
}

func (u *UserApi) Login(c *gin.Context) {
	var l = request.Login{}
	err := c.ShouldBindJSON(l)
	if err != nil {
		response.ParamErrorWithMessage(c, err.Error())
		return
	}
	var user = system.SysUser{
		SysUserPublic: system.SysUserPublic{
			Username: l.Username,
		},
		SysUserPrivate: system.SysUserPrivate{
			Password: l.Password,
		},
	}
	login, err := userService.Login(user)
	if err != nil {
		global.GRA_LOG.Error("登录失败:", err.Error(), "login:", login)
		response.ErrorWithMessage(c, err.Error())
		return
	}

	jwt := utils.NewJWT()
	token, err := jwt.CreateToken(user)
	if err != nil {
		global.GRA_LOG.Error("token创建失败:", err.Error(), "login:", login)
		response.ErrorWithMessage(c, err.Error())
	}
	response.SuccessWithData(c, token)
}

func (u *UserApi) GetUserById(c *gin.Context) {
	var user system.SysUser
	err := c.ShouldBindQuery(&user)
	if err != nil {
		response.ParamErrorWithMessage(c, err.Error())
		return
	}
	getUser, err := userService.GetUser(user)
	if err != nil {
		response.ErrorWithMessage(c, err.Error())
		return
	}
	response.SuccessWithData(c, getUser)
}
