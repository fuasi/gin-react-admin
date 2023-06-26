package initialize

import "github.com/gin-gonic/gin"

func InitEnter() *gin.Engine {
	initZap()      //初始化Log
	initViper()    //初始化Viper
	InitDataBase() //初始化Database
	InitRedis()    //初始化redis
	return InitRouter()
}
