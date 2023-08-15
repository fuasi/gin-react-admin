package system

import (
	"github.com/gin-gonic/gin"
	"server/global"
	"server/models/common/response"
	"server/models/system"
	"server/models/system/request"
)

type SysApiApi struct {
}

func (api *SysApiApi) GetApiList(c *gin.Context) {
	var page request.SearchApi
	err := c.ShouldBind(&page)
	if err != nil {
		response.ParamErrorWithMessage(c, err.Error())
		return
	}
	list, total, err := apiService.GetApiList(page)
	if err != nil {
		global.GRA_LOG.Error("获取API列表失败:", err.Error())
		response.ErrorWithMessage(c, err.Error())
		return
	}

	response.SuccessWithData(c, response.PageQueryResponse[system.SysApi]{
		Total: total,
		List:  list,
	})
}

func (api *SysApiApi) UpdateApi(c *gin.Context) {
	sysApi := system.SysApi{}
	err := c.ShouldBind(&sysApi)
	if err != nil {
		response.ParamError(c)
		return
	}
	err = apiService.UpdateApi(sysApi)
	if err != nil {
		global.GRA_LOG.Error("更新Api失败:", err.Error())
		response.Error(c)
		return
	}
	response.Success(c)
}

func (api *SysApiApi) DeleteApi(c *gin.Context) {
	var ids []int
	err := c.ShouldBind(&ids)
	if err != nil {
		response.ParamError(c)
		return
	}
	err = apiService.DeleteApi(ids)
	if err != nil {
		global.GRA_LOG.Error("删除Api失败:", err.Error())
		response.Error(c)
		return
	}
	response.Success(c)
}
func (api *SysApiApi) FindApiById(c *gin.Context) {
	var sysApi system.SysApi
	err := c.ShouldBindUri(&sysApi)
	if err != nil {
		response.ParamError(c)
		return
	}
	a, err := apiService.FindApiById(sysApi)
	if err != nil {
		global.GRA_LOG.Error("根据ID查询API失败:", err.Error())
		response.Error(c)
		return
	}
	response.SuccessWithData(c, a)
}
func (api *SysApiApi) InsertApi(c *gin.Context) {
	var sysApi system.SysApi
	err := c.ShouldBind(&sysApi)
	if err != nil {
		response.ParamError(c)
		return
	}
	err = apiService.InsertApi(sysApi)
	if err != nil {
		global.GRA_LOG.Error("根据ID查询API失败:", err.Error())
		response.Error(c)
		return
	}
	response.Success(c)
}
