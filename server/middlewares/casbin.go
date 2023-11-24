package middlewares

import (
	"github.com/gin-gonic/gin"
	"server/global"
	"server/models/common/response"
)

func CasbinMiddleware(c *gin.Context) {
	username := c.GetString("username")
	sub := username
	obj := c.Request.RequestURI
	act := c.Request.Method
	//request := sub + obj + act
	enforce, _ := global.GRA_CASBIN.Enforce(sub, obj, act)
	if !enforce {
		response.ErrorWithMessage(c, "权限不足：请联系管理员或者稍后重试")
		c.Abort()
	}
	c.Next()
}
