package initialize

import (
	"github.com/casbin/casbin/v2"
	gormadapter "github.com/casbin/gorm-adapter/v3"
	"log"
	"server/global"
	"time"
)

func InitCasbin() {
	db, err := gormadapter.NewAdapterByDB(global.GRA_DB)
	if err != nil {
		log.Fatalln("casbin初始化失败,NewAdapterByDB:", err.Error())
		return
	}
	enforcer, err := casbin.NewSyncedCachedEnforcer(global.GRA_CONFIG.Casbin.CasbinConfig, db)
	if err != nil {
		log.Fatalln("casbin初始化失败,NewSyncedCachedEnforcer:", err.Error())
		return
	}
	enforcer.SetExpireTime(5 * time.Second)
	err = enforcer.LoadPolicy()
	if err != nil {
		log.Fatalln("casbin初始化失败,LoadPolicy:", err.Error())
		return
	}
	global.GRA_CASBIN = enforcer
}
