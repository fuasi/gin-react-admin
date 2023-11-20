package system

import (
	"github.com/gin-gonic/gin"
	v1 "server/apis/v1"
)

type FileRouter struct {
}

func (*FileRouter) InitFileRouter(Router *gin.RouterGroup) {
	fileRouter := Router.Use()
	fileApis := v1.SystemApisApp.SystemApis.FileApis
	{
		fileRouter.POST("/file", fileApis.UploadFile)
		fileRouter.POST("/files", fileApis.GetFileList)
		fileRouter.PATCH("/file", fileApis.UpdateFile)
		fileRouter.DELETE("/file", fileApis.DeleteFile)
	}
}
