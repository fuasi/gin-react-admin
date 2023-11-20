package system

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"server/global"
	"server/models/common/request"
	"server/models/common/response"
	"server/models/system"
	"strings"
	"time"
)

type FileApis struct {
}

// UploadFile
// @Tags FileApis
// @Summary 普通文件上传
// @Produce json
// @Accept multipart/form-data
// @Param file formData file true "文件"
// @Success 20000 {object} response.Response{code=int,data=string,msg=string} "上传成功"
// @Failure 40000 {object} response.Response{code=int,msg=string} "请求错误"
// @Failure 50000 {object} response.Response{code=int,msg=string} "内部错误"
// @SysRouter /api/file [POST]
func (*FileApis) UploadFile(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		response.ErrorWithMessage(c, "上传失败:"+err.Error())
		return
	}
	fileNameSplit := strings.Split(file.Filename, ".")
	var fileName string
	for i := 0; i < len(fileNameSplit)-1; i++ {
		fileName += fileNameSplit[i]
	}
	key := time.Now().Unix()
	systemFileName := fmt.Sprintf("%d.%s", key, fileNameSplit[len(fileNameSplit)-1])
	fileInfo := system.SysFile{
		FileName:       fileName,
		SystemFileName: systemFileName,
		Tag:            fileNameSplit[len(fileNameSplit)-1],
		FileUrl:        fmt.Sprintf("%s/%s", global.GRA_CONFIG.Upload.GetImagePath, systemFileName),
		FilePath:       fmt.Sprintf("%s%s", global.GRA_CONFIG.Upload.Path, systemFileName),
	}
	err = fileServices.InsertFile(fileInfo)
	if err != nil {
		global.GRA_LOG.Error("文件信息存入数据库失败:", err.Error())
		response.ErrorWithMessage(c, "文件上传信息保存失败:请联系管理员")
		return
	}
	err = c.SaveUploadedFile(file, fileInfo.FilePath)
	if err != nil {
		global.GRA_LOG.Error("文件保存失败:", err.Error())
		response.ErrorWithMessage(c, "上传失败:请联系管理员")
		return
	}
	response.SuccessWithData(c, fileInfo.SystemFileName)
}

// GetFileList
// @Tags FileApis
// @Summary 获取上传的文件列表
// @Produce json
// @Param file formData file true "上传的文件"
// @Success 20000 {object} response.Response{code=int,data=string,msg=string} "上传成功"
// @Failure 40000 {object} response.Response{code=int,msg=string} "请求错误"
// @Failure 50000 {object} response.Response{code=int,msg=string} "内部错误"
// @SysRouter /api/file [GET]
// Todo: swagger文档待完善
func (*FileApis) GetFileList(c *gin.Context) {
	var file request.Search[system.SysFile]

	err := c.ShouldBindJSON(&file)
	if err != nil {
		response.ParamError(c)
		return
	}
	list, total, err := fileServices.GetFileList(file)
	if err != nil {
		return
	}
	response.SuccessWithData(c, response.PageQueryResponse[system.SysFile]{
		List:  list,
		Total: total,
	})
}

func (*FileApis) UpdateFile(c *gin.Context) {
	var file system.SysFile
	err := c.ShouldBindJSON(&file)
	if err != nil {
		response.ParamError(c)
		return
	}
	err = fileServices.UpdateFile(file)
	if err != nil {
		global.GRA_LOG.Error("修改文件名失败:", err.Error())
		response.ErrorWithMessage(c, "修改文件名失败:请联系管理员")
		return
	}
	response.Success(c)
}

func (*FileApis) DeleteFile(c *gin.Context) {
	var file system.SysFile
	err := c.ShouldBindJSON(&file)
	if err != nil {
		response.ParamError(c)
		return
	}
	err = fileServices.DeleteFile(file)
	if err != nil {
		global.GRA_LOG.Error("删除文件失败:", err.Error())
		response.ErrorWithMessage(c, "文件删除失败:服务器错误,请联系管理员")
		return
	}
	response.Success(c)
}
