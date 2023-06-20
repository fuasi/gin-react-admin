package initialize

func InitEnter() {
	initZap()      //初始化Log
	initViper()    //初始化Viper
	InitDataBase() //初始化Database
	InitRedis()    //初始化redis
}
