package system

import (
	"github.com/gin-gonic/gin"
	v1 "server/apis/v1"
	"server/models/common"
	"server/utils"
)

type FileRouter struct {
}

func (*FileRouter) InitFileRouter(Router *gin.RouterGroup, apiSet map[string]struct{}) {
	fileRouter := Router.Use()
	fileApis := v1.SystemApisApp.SystemApis.FileApis
	utils.RegisterApi(fileRouter, apiSet,
		utils.NewRegisterApiParam(common.HttpPost, "/file", "文件上传", fileApis.UploadFile),
		utils.NewRegisterApiParam(common.HttpPost, "/files", "获取上传的文件列表", fileApis.GetFileList),
		utils.NewRegisterApiParam(common.HttpPatch, "/file", "根据ID更新文件信息", fileApis.UpdateFile),
		utils.NewRegisterApiParam(common.HttpDelete, "/file", "根据ID删除上传的文件", fileApis.DeleteFile),
	)
}
