package middlewares

import (
	"github.com/gin-gonic/gin"
	"server/global"
	"server/models/common/response"
	"server/utils"
	"strings"
)

func AuthMiddleware(c *gin.Context) {
	header := c.GetHeader("Authorization")
	var Authorization = strings.Split(header, " ")
	jwt := utils.NewJWT()
	if len(Authorization) <= 1 {
		response.AuthorizationErrorWithMessage(c, "令牌非法,请登录后再试!")
		c.Abort()
		return
	}
	token, jwtPackaging, err := jwt.ParseToken(Authorization[1])
	if err != nil {
		global.GRA_LOG.Error("token:", err.Error())
		response.AuthorizationErrorWithMessage(c, "令牌过期,请重新登录!")
		c.Abort()
		return
	}
	if header == "" {
		response.AuthorizationErrorWithMessage(c, "请登录后进行访问!")
		c.Abort()
		return
	}
	if !token {
		response.AuthorizationErrorWithMessage(c, "令牌非法!")
		c.Abort()
		return
	}
	redisToken := utils.RedisGetToken(jwtPackaging.SysUserPublic.Username)
	if redisToken != Authorization[1] {
		response.AuthorizationErrorWithMessage(c, "令牌过期,请重新登录!")
		c.Abort()
		return
	}
	c.Set("jwtId", jwtPackaging.SysUserPublic.Id)
	c.Set("jwtUsername", jwtPackaging.SysUserPublic.Username)
	c.Next()
}
