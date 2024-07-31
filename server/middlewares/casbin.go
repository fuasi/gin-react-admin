package middlewares

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"server/global"
	"server/models/common/response"
	"server/utils"
	"strings"
)

func CasbinMiddleware(c *gin.Context) {
	username := c.GetString("username")
	sub := username
	obj := c.Request.RequestURI
	act := c.Request.Method
	//request := sub + obj + act

	// gin路由模糊匹配
	id := c.Param("id")
	if !utils.IsBlank(id) {
		objSplit := strings.Split(obj, "/")
		obj = ""
		for idx := 1; idx < len(objSplit)-1; idx++ {
			obj += fmt.Sprintf("/%s", objSplit[idx])
		}
		obj += "/:id"
	}
	//fmt.Println(obj)
	enforce, _ := global.GRA_CASBIN.Enforce(sub, obj, act)
	fmt.Println(sub, obj, act)
	if !enforce {
		response.AuthorizationErrorWithMessage(c, "权限不足：请联系管理员或者稍后重试")
		c.Abort()
	}
	c.Next()
}
