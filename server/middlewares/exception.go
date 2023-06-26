package middlewares

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

func ErrorMiddlewares(c *gin.Context) {
	defer func() {
		if err := recover(); err != nil {
			fmt.Println(err.(string))
			c.Abort()
		}
	}()
	c.Next()
}
