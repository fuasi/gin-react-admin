package system

import (
	"github.com/gin-gonic/gin"
	"server/global"
	"server/models/common/response"
	"server/models/system"
	"server/models/system/request"
)

type RouterApi struct {
}

func (api *RouterApi) GetRouterList(c *gin.Context) {
	var page request.SearchRouter
	err := c.ShouldBind(&page)
	if err != nil {
		response.ParamError(c)
		return
	}
	list, total, err := routerService.GetRouterList(page)
	if err != nil {
		global.GRA_LOG.Error("获取路由列表失败:", err.Error())
		response.Error(c)
		return
	}
	response.SuccessWithData(c, response.PageQueryResponse[system.SysRouter]{
		List:  list,
		Total: total,
	})
}

func (api *RouterApi) UpdateRouter(c *gin.Context) {
	var r system.SysRouter
	err := c.ShouldBind(&r)
	if err != nil {
		response.ParamError(c)
		return
	}
	err = routerService.UpdateRouter(r)
	if err != nil {
		global.GRA_LOG.Error("更新路由数据失败:", err.Error())
		response.Error(c)
		return
	}
	response.Success(c)
}
func (api *RouterApi) InsertRouter(c *gin.Context) {
	var r system.SysRouter
	err := c.ShouldBind(&r)
	if err != nil {
		response.ParamErrorWithMessage(c, err.Error())
		return
	}
	err = routerService.InsertRouter(r)
	if err != nil {
		global.GRA_LOG.Error("创建路由失败:", err.Error())
		response.Error(c)
		return
	}
	response.Success(c)
}
func (api *RouterApi) DeleteRouter(c *gin.Context) {
	var id []int
	err := c.ShouldBind(&id)
	if err != nil {
		response.ParamErrorWithMessage(c, err.Error())
		return
	}
	err = routerService.DeleteRouter(id)
	if err != nil {
		global.GRA_LOG.Error("删除路由失败:", err.Error())
		response.Error(c)
		return
	}
	response.Success(c)
}
func (api *RouterApi) FindRouterById(c *gin.Context) {
	var r system.SysRouter
	err := c.ShouldBindUri(&r)
	if err != nil {
		response.ParamErrorWithMessage(c, err.Error())
		return
	}
	router, err := routerService.FindRouterById(r)
	if err != nil {
		global.GRA_LOG.Error("根据ID查询失败:", err.Error())
		response.Error(c)
		return
	}
	response.SuccessWithData(c, router)
}
