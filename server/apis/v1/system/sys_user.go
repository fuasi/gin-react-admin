package system

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"server/global"
	"server/models/common/response"
	"server/models/system"
	"server/models/system/request"
	"server/utils"
	"time"
)

type UserApi struct {
}

// GetUserById
// @Tags UserApis
// @Summary 根据ID获取用户信息
// @Produce json
// @Param id path int true "用户主键ID"
// @Success 20000 {object} response.Response{code=int,data=system.SysUserPublic,msg=string} "成功"
// @Failure 40000 {object} response.Response{code=int,msg=string} "请求错误"
// @Failure 50000 {object} response.Response{code=int,msg=string} "内部错误"
// @Router /api/user/:id [GET]
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

// UpdateUserById
// @Tags UserApis
// @Summary 根据ID更新用户信息
// @Produce json
// @Param data body system.SysUserPublic true "用户信息"
// @Success 20000 {object} response.Response{code=int,data=string,msg=string} "上传成功"
// @Failure 40000 {object} response.Response{code=int,msg=string} "请求错误"
// @Failure 50000 {object} response.Response{code=int,msg=string} "内部错误"
// @Router /api/user [PATCH]
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

// DeleteUserById
// @Tags UserApis
// @Summary 根据ID删除用户
// @Produce  json
// @Param id body []int true "用户主键"
// @Success 20000 {object} response.Response{code=int,msg=string} "成功"
// @Failure 40000 {object} response.Response{code=int,msg=string} "请求错误"
// @Failure 50000 {object} response.Response{code=int,msg=string} "内部错误"
// @Router /api/user [DELETE]
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

// GetUserList
// @Tags UserApis
// @Summary 获取用户列表
// @Produce json
// @Param data body request.SearchUser true "页数和页码为必传,传用户信息表示条件查询"
// @Success 20000 {object} response.Response{code=int,data=UserResponse.GetUserListResponse,msg=string} "成功"
// @Failure 40000 {object} response.Response{code=int,msg=string} "请求错误"
// @Failure 50000 {object} response.Response{code=int,msg=string} "内部错误"
// @Router /api/users [POST]
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

	response.SuccessWithData(c, response.PageQueryResponse[system.SysUserPublic]{
		Total: total,
		List:  list,
	})
}

// CheckLogin
// @Tags UserApis
// @Summary 检查是否登录
// @Produce json
// @Success 20000 {object} response.Response{code=int,data=UserResponse.GetUserListResponse,msg=string} "成功"
// @Failure 40000 {object} response.Response{code=int,msg=string} "请求错误"
// @Failure 50000 {object} response.Response{code=int,msg=string} "内部错误"
// @Router /api/check [POST]
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

// ResetUserPassword
// @Tags UserApis
// @Summary 重置用户密码
// @Produce json
// @Success 20000 {object} response.Response{code=int,data=string,msg=string} "成功"
// @Failure 40000 {object} response.Response{code=int,msg=string} "请求错误"
// @Failure 50000 {object} response.Response{code=int,msg=string} "内部错误"
// @Router /api/user/:id [PATCH]
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

// GetSelfInfo
// @Tags UserApis
// @Summary 获取自身信息
// @Produce json
// @Success 20000 {object} response.Response{code=int,data=system.SysUserPublic,msg=string} "成功"
// @Failure 40000 {object} response.Response{code=int,msg=string} "请求错误"
// @Failure 50000 {object} response.Response{code=int,msg=string} "内部错误"
// @Router /api/user [GET]
func (u *UserApi) GetSelfInfo(c *gin.Context) {
	id := c.GetUint("userId")
	user, err := userService.GetSelfInfo(id)
	if err != nil {
		response.ErrorWithMessage(c, err.Error())
		return
	}
	response.SuccessWithData(c, user)
}

// GetRouter
// @Tags UserApis
// @Summary 获取路由树
// @Produce json
// @Success 20000 {object} response.Response{code=int,data=[]system.Router,msg=string} "成功"
// @Failure 40000 {object} response.Response{code=int,msg=string} "请求错误"
// @Failure 50000 {object} response.Response{code=int,msg=string} "内部错误"
// @Router /api/user [GET]
func (u *UserApi) GetRouter(c *gin.Context) {
	routers, err := userService.GetRouter(c.GetUint("userId"))
	if err != nil {
		response.ErrorWithMessage(c, err.Error())
		global.GRA_LOG.Error("查询路由失败:", err.Error())
		return
	}
	tree := utils.GetRouterTree(&routers)
	response.SuccessWithData(c, tree)
}

// UploadFile
// @Tags UserApis
// @Summary 头像上传
// @Produce json
// @accept multipart/form-data
// @Param file formData file true "上传的文件"
// @Success 20000 {object} response.Response{code=int,data=string,msg=string} "上传成功"
// @Failure 40000 {object} response.Response{code=int,msg=string} "请求错误"
// @Failure 50000 {object} response.Response{code=int,msg=string} "内部错误"
// @Router /api/file [POST]
func (u *UserApi) UploadFile(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		response.ErrorWithMessage(c, "上传失败:"+err.Error())
		return
	}
	var fileName = fmt.Sprintf("/%d.png", time.Now().Unix())
	err = c.SaveUploadedFile(file, fmt.Sprintf("%s%s", global.GRA_CONFIG.Upload.Path, fileName))
	if err != nil {
		response.ErrorWithMessage(c, "上传失败:"+err.Error())
		return
	}
	response.SuccessWithData(c, fmt.Sprintf("%s%s", global.GRA_CONFIG.Upload.GetImagePath, fileName))
}
