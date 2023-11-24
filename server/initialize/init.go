package initialize

import (
	"github.com/gin-gonic/gin"
)

func InitEnter() *gin.Engine {
	initZap()      //初始化Log
	initViper()    //初始化Viper
	InitDataBase() //初始化Database
	InitRedis()    //初始化Redis
	InitCasbin()   //初始化Casbin
	return InitRouter()
}
