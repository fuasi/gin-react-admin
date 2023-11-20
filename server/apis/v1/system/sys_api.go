package system

import (
	"github.com/gin-gonic/gin"
	"server/global"
	"server/models/common/response"
	"server/models/system"
	"server/models/system/request"
)

type SysApiApis struct {
}

func (api *SysApiApis) GetApiList(c *gin.Context) {
	var page request.SearchApi
	err := c.ShouldBind(&page)
	if err != nil {
		response.ParamErrorWithMessage(c, err.Error())
		return
	}
	list, total, err := apiServices.GetApiList(page)
	if err != nil {
		global.GRA_LOG.Error("获取API列表失败:", err.Error())
		response.ErrorWithMessage(c, err.Error())
		return
	}
	group, err := routerServices.FindRouterGroup()
	if err != nil {
		global.GRA_LOG.Error("获取API分组信息失败:", err.Error())
		response.ErrorWithMessage(c, err.Error())
		return
	}
	response.SuccessWithData(c, response.PageQueryAndGroupResponse[system.SysApi]{
		Total:           total,
		List:            list,
		ApiGroupOptions: group,
	})
}

func (api *SysApiApis) UpdateApi(c *gin.Context) {
	sysApi := system.SysApi{}
	err := c.ShouldBind(&sysApi)
	if err != nil {
		response.ParamError(c)
		return
	}
	err = apiServices.UpdateApi(sysApi)
	if err != nil {
		global.GRA_LOG.Error("更新Api失败:", err.Error())
		response.Error(c)
		return
	}
	response.Success(c)
}

func (api *SysApiApis) DeleteApi(c *gin.Context) {
	var ids []int
	err := c.ShouldBind(&ids)
	if err != nil {
		response.ParamError(c)
		return
	}
	err = apiServices.DeleteApi(ids)
	if err != nil {
		global.GRA_LOG.Error("删除Api失败:", err.Error())
		response.Error(c)
		return
	}
	response.Success(c)
}
func (api *SysApiApis) FindApiById(c *gin.Context) {
	var sysApi system.SysApi
	err := c.ShouldBindUri(&sysApi)
	if err != nil {
		response.ParamError(c)
		return
	}
	a, err := apiServices.FindApiById(sysApi)
	if err != nil {
		global.GRA_LOG.Error("根据ID查询API失败:", err.Error())
		response.Error(c)
		return
	}
	response.SuccessWithData(c, a)
}
func (api *SysApiApis) InsertApi(c *gin.Context) {
	var sysApi system.SysApi
	err := c.ShouldBind(&sysApi)
	if err != nil {
		response.ParamError(c)
		return
	}
	err = apiServices.InsertApi(sysApi)
	if err != nil {
		global.GRA_LOG.Error("根据ID查询API失败:", err.Error())
		response.Error(c)
		return
	}
	response.Success(c)
}

func (api *SysApiApis) GetApiGroupOptions(c *gin.Context) {

}

func (api *SysApiApis) GetAllowUserApi(c *gin.Context) {

}
