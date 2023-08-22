package system

import (
	"github.com/gin-gonic/gin"
	"server/global"
	"server/models/common/response"
	"server/models/system"
	"server/models/system/request"
	baseResponse "server/models/system/response"
	"server/utils"
)

type BaseApi struct {
}

// Login
// @Tags BaseApis
// @Summary 用户登录
// @Produce  json
// @Param data body request.Login true "用户账号,用户密码"
// @Success 20000 {object} response.Response{code=int,data=baseResponse.LoginResponse,msg=string} "成功"
// @Failure 40000 {object} response.Response{code=int,msg=string} "请求错误"
// @Failure 50000 {object} response.Response{code=int,msg=string} "内部错误"
// @SysRouter /api/login [post]
func (b *BaseApi) Login(c *gin.Context) {
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
	login, err := baseService.Login(user)
	if err != nil {
		global.GRA_LOG.Error("登录失败:", err.Error(), "login:", login)
		response.ErrorWithMessage(c, err.Error())
		return
	}
	jwt := utils.NewJWT()
	token, err := jwt.CreateToken(login)
	if err != nil {
		global.GRA_LOG.Error("token创建失败:", err.Error(), "login:", login)
		response.ErrorWithMessage(c, err.Error())
		return
	}
	response.SuccessWithData(c, baseResponse.LoginResponse{
		Token: token,
		User:  login.SysUserPublic,
	})
}
