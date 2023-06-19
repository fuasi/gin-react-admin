package global

import (
	"github.com/spf13/viper"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

var (
	GRA_DB     *gorm.DB
	GRA_CONFIG *viper.Viper
	GRA_LOG    *zap.SugaredLogger
)
