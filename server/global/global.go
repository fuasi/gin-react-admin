package global

import (
	"github.com/casbin/casbin/v2"
	"github.com/go-redis/redis/v8"
	"github.com/spf13/viper"
	"go.uber.org/zap"
	"gorm.io/gorm"
	"server/configs/viper_config"
)

var (
	GRA_DB     *gorm.DB
	GRA_REDIS  *redis.Client
	GRA_VR     *viper.Viper
	GRA_CONFIG viper_config.ServerConfig
	GRA_LOG    *zap.SugaredLogger
	GRA_CASBIN *casbin.Enforcer
)
