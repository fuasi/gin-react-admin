package initialize

func InitEnter() {
	//初始化Log
	initZap()
	//初始化Viper
	initViper()
	//初始化Database
	InitDataBase()
}
