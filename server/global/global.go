package global

import (
	"github.com/go-redis/redis/v8"
	"github.com/spf13/viper"
	"go.uber.org/zap"
	"gorm.io/gorm"
	"server/config"
)

var (
	GRA_DB     *gorm.DB
	GRA_REDIS  *redis.Client
	GRA_VR     *viper.Viper
	GRA_CONFIG config.ServerConfig
	GRA_LOG    *zap.SugaredLogger
)
