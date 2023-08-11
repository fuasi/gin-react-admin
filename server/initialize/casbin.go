package initialize

import (
	"github.com/casbin/casbin/v2"
	gormadapter "github.com/casbin/gorm-adapter/v3"
	"log"
	"server/global"
)

func InitCasbin() {
	db, err := gormadapter.NewAdapterByDB(global.GRA_DB)
	if err != nil {
		log.Fatalln("casbin初始化失败:", err.Error())
		return
	}
	enforcer, err := casbin.NewEnforcer(global.GRA_CONFIG.Casbin.CasbinConfig, db)
	if err != nil {
		return
	}
	global.GRA_CASBIN = enforcer
}
