package middlewares

import "github.com/gin-gonic/gin"

func InitMiddleware(c *gin.Engine) {
	c.Use(ErrorMiddlewares)
}
