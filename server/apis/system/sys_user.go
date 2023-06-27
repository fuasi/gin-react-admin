package system

import (
	"github.com/gin-gonic/gin"
	"server/global"
	CommonRequest "server/models/common/request"
	"server/models/common/response"
	"server/models/system"
	"server/models/system/request"
	UserResponse "server/models/system/response"
	"server/utils"
)

type UserApi struct {
}

func (u *UserApi) Login(c *gin.Context) {
	var l = request.Login{}
	err := c.ShouldBindJSON(&l)
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
		global.GRA_LOG.Error("token创建失败:", err.Error(), "\tlogin:", login)
		response.ErrorWithMessage(c, err.Error())
		return
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
	getUser, err := userService.GetUserById(user)
	if err != nil {
		response.ErrorWithMessage(c, err.Error())
		return
	}
	response.SuccessWithData(c, getUser)
}

func (u *UserApi) UpdateUserById(c *gin.Context) {
	var user system.SysUser
	err := c.ShouldBindQuery(&user)
	if err != nil {
		response.ParamErrorWithMessage(c, err.Error())
		return
	}
	_, err = userService.UpdateUserById(user)
	if err != nil {
		response.ErrorWithMessage(c, err.Error())
		return
	}
	response.SuccessWithMessage(c, "操作成功")
}

func (u *UserApi) DeleteUserById(c *gin.Context) {
	var user system.SysUser
	err := c.ShouldBindQuery(&user)
	if err != nil {
		response.ParamErrorWithMessage(c, err.Error())
		return
	}
	_, err = userService.DeleteUserById(user)
	if err != nil {
		response.ErrorWithMessage(c, err.Error())
		return
	}
	response.SuccessWithMessage(c, "操作成功")
}

func (u *UserApi) GetUserList(c *gin.Context) {
	var page CommonRequest.PageInfo
	err := c.ShouldBindUri(page)
	if err != nil {
		response.ParamErrorWithMessage(c, err.Error())
		return
	}
	list, total, err := userService.GetUserList(page)
	if err != nil {
		response.ErrorWithMessage(c, err.Error())
		return
	}
	response.SuccessWithData(c, UserResponse.GetUserListResponse{
		Total: total,
		List:  list,
	})
}

func (u *UserApi) CheckLogin(c *gin.Context) {
	response.Success(c)
}
