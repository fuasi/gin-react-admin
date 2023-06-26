package response

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

var (
	ErrorCode              = 50000
	SuccessCode            = 20000
	ParamErrorCode         = 40000
	AuthorizationErrorCode = 40001
)

type Response struct {
	Code int    `json:"code,omitempty"`
	Data any    `json:"data,omitempty"`
	Msg  string `json:"msg,omitempty"`
}

func BaseResponse(c *gin.Context, code int, msg string, data any) {
	c.JSON(http.StatusOK, Response{
		code,
		data,
		msg,
	})
}

func Success(c *gin.Context) {
	BaseResponse(c, SuccessCode, "执行成功", nil)
}

func SuccessWithData(c *gin.Context, data any) {
	BaseResponse(c, SuccessCode, "执行成功", data)
}

func SuccessWithMessage(c *gin.Context, msg string) {
	BaseResponse(c, SuccessCode, msg, nil)
}

func Error(c *gin.Context) {
	BaseResponse(c, ErrorCode, "执行失败", nil)
}

func ErrorWithData(c *gin.Context, data any) {
	BaseResponse(c, ErrorCode, "执行失败", data)
}

func ErrorWithMessage(c *gin.Context, msg string) {
	BaseResponse(c, ErrorCode, msg, nil)
}

func ParamError(c *gin.Context) {
	BaseResponse(c, ParamErrorCode, "参数传递错误", nil)
}

func ParamErrorWithData(c *gin.Context, data any) {
	BaseResponse(c, ParamErrorCode, "参数传递错误", data)
}

func ParamErrorWithMessage(c *gin.Context, msg string) {
	BaseResponse(c, ParamErrorCode, msg, nil)
}
func AuthorizationError(c *gin.Context) {
	BaseResponse(c, AuthorizationErrorCode, "token认证失败", nil)
}

func AuthorizationErrorWithData(c *gin.Context, data any) {
	BaseResponse(c, AuthorizationErrorCode, "token认证失败", data)
}

func AuthorizationErrorWithMessage(c *gin.Context, msg string) {
	BaseResponse(c, AuthorizationErrorCode, msg, nil)
}
