package initialize

import (
	"fmt"
	"github.com/fsnotify/fsnotify"
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
	config.WatchConfig()
	config.OnConfigChange(func(in fsnotify.Event) {
		global.GRA_LOG.Info("config file changed:", in.Name)
		if err := config.Unmarshal(&global.GRA_CONFIG); err != nil {
			global.GRA_LOG.Error("config file change err:", err.Error())
		}
	})
	if err := config.Unmarshal(&global.GRA_CONFIG); err != nil {
		global.GRA_LOG.Error("config file change err:", err.Error())
	}
	global.GRA_VR = config
}
