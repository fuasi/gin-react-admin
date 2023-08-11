package middlewares

import (
	"github.com/gin-gonic/gin"
	"server/global"
	"server/models/common/response"
	"server/utils"
)

func CasbinMiddleware(c *gin.Context) {
	username, _ := c.Get("username")
	sub := username.(string)
	obj := c.Request.RequestURI
	act := c.Request.Method
	request := sub + obj + act

	entry, err := utils.RedisGetCasbinRequest(request)
	if err != nil {
		response.ErrorWithMessage(c, err.Error())
		c.Abort()
	}
	if entry {
		enforce, err := global.GRA_CASBIN.Enforce(sub, obj, act)
		if err != nil {
			response.ErrorWithMessage(c, err.Error())
			c.Abort()
			return
		}
		if !enforce {
			err := utils.RedisSetCasbinRequest(request, false)
			if err != nil {
				response.ErrorWithMessage(c, err.Error())
				c.Abort()
				return
			}
			response.AuthorizationErrorWithMessage(c, "没有权限访问该资源!")
			c.Abort()
			return
		}
	}
	c.Next()
}
