package initialize

import (
	"fmt"
	"github.com/spf13/viper"
	"server/global"
)

func initViper() {
	config := viper.New()
	config.SetConfigName("config")
	config.SetConfigType("yml")
	config.AddConfigPath("./")
	//查找并读取配置文件
	err := config.ReadInConfig()
	if err != nil { // 处理读取配置文件的错误
		panic(fmt.Errorf("Fatal error config file: %s \n", err))
	}
	global.GRA_CONFIG = config
}
