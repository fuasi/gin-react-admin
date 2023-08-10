package system

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"server/global"
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
		global.GRA_LOG.Error("token创建失败:", err.Error(), "login:", login)
		response.ErrorWithMessage(c, err.Error())
		return
	}
	response.SuccessWithData(c, gin.H{
		"token": token,
		"user":  login.SysUserPublic,
	})
}

func (u *UserApi) GetUserById(c *gin.Context) {
	var user system.SysUser
	err := c.ShouldBindUri(&user)
	if err != nil {
		response.ParamErrorWithMessage(c, err.Error())
		return
	}
	getUser, err := userService.GetUserById(user)
	if err != nil {
		global.GRA_LOG.Error(" 根据ID获取用户失败:", err.Error())
		response.ErrorWithMessage(c, err.Error())
		return
	}
	response.SuccessWithData(c, getUser.SysUserPublic)
}

func (u *UserApi) UpdateUserById(c *gin.Context) {
	var user system.SysUser
	err := c.ShouldBind(&user)
	if err != nil {
		response.ParamErrorWithMessage(c, err.Error())
		return
	}
	err = userService.UpdateUserById(user)
	if err != nil {
		global.GRA_LOG.Error(" 根据ID修改用户失败:", err.Error())
		response.ErrorWithMessage(c, err.Error())
		return
	}
	response.SuccessWithMessage(c, "操作成功")
}

func (u *UserApi) DeleteUserById(c *gin.Context) {
	var ids []uint
	err := c.ShouldBind(&ids)
	if err != nil {
		response.ParamErrorWithMessage(c, err.Error())
		return
	}
	err = userService.DeleteUserByIds(ids)
	if err != nil {
		global.GRA_LOG.Error(" 根据ID删除用户失败:", err.Error())
		response.ErrorWithMessage(c, err.Error())
		return
	}
	response.SuccessWithMessage(c, "操作成功")
}

func (u *UserApi) GetUserList(c *gin.Context) {
	var page request.SearchUser
	err := c.ShouldBind(&page)
	if err != nil {
		response.ParamErrorWithMessage(c, err.Error())
		return
	}
	list, total, err := userService.GetUserList(page)
	if err != nil {
		global.GRA_LOG.Error(" 获取用户列表失败:", err.Error())
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
func (u *UserApi) InsertUser(c *gin.Context) {
	var user system.SysUser
	err := c.ShouldBind(&user)
	if err != nil {
		response.ParamErrorWithMessage(c, err.Error())
		return
	}
	err = userService.InsertUser(user)
	if err != nil {
		global.GRA_LOG.Error(" 添加用户失败:", err.Error())
		response.ErrorWithMessage(c, err.Error())
		return
	}
	response.Success(c)
}

func (u *UserApi) ResetUserPassword(c *gin.Context) {
	var user system.SysUser
	if err := c.ShouldBindUri(&user); err != nil {
		response.ParamErrorWithMessage(c, err.Error())
		return
	}
	var password, err = userService.ResetUserPassword(user)
	if err != nil {
		marshal, err := json.Marshal(user)
		if err != nil {
			global.GRA_LOG.Error("重置密码失败:", err.Error())
			return
		}
		global.GRA_LOG.Error("重置密码失败:", err.Error(), "data:\t", string(marshal))
		response.ErrorWithMessage(c, err.Error())
		return
	}
	response.SuccessWithData(c, password)
}
