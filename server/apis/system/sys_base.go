package system

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"server/global"
	"server/models/common/response"
	"server/models/system"
	"time"
)

type BaseApi struct {
}

func (b *BaseApi) GetRouter(c *gin.Context) {
	routers, err := baseService.GetRouter()
	if err != nil {
		response.ErrorWithMessage(c, err.Error())
		global.GRA_LOG.Error("查询路由失败:", err.Error())
		return
	}
	//-------- 返回组装路由后返回给前端 --------
	routerMap := map[int][]system.Router{}
	for _, router := range routers {
		routerMap[router.ParentId] = append(routerMap[router.ParentId], router)
	}
	var routerTree []system.Router
	for _, router := range routers {
		router.Children = routerMap[router.Id]
		if router.ParentId == -1 {
			routerTree = append(routerTree, router)
		}
	}
	//-------- 返回组装路由后返回给前端 --------
	response.SuccessWithData(c, routerTree)
}

func (b *BaseApi) UploadAvatar(c *gin.Context) {
	file, err := c.FormFile("avatar")
	if err != nil {
		response.ErrorWithMessage(c, "头像上传失败:"+err.Error())
		return
	}
	var fileName = time.Now().Unix()
	err = c.SaveUploadedFile(file, fmt.Sprintf("%s%d.png", global.GRA_CONFIG.Upload.Path, fileName))
	if err != nil {
		response.ErrorWithMessage(c, "头像上传失败:"+err.Error())
		return
	}
	response.Success(c)
}
