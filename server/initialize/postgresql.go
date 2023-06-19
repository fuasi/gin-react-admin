package initialize

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"server/global"
)

func InitDataBase() {
	dsn := fmt.Sprintf("host=%v port=%v user=%v password=%v dbname=%v",
		global.GRA_CONFIG.Get("database.host"),
		global.GRA_CONFIG.Get("database.port"),
		global.GRA_CONFIG.Get("database.username"),
		global.GRA_CONFIG.Get("database.password"),
		global.GRA_CONFIG.Get("database.dbname"))
	pg, err := gorm.Open(postgres.Open(dsn))
	if err != nil {
		log.Fatalf("数据库连接失败:%s", err.Error())
	} else {
		global.GRA_DB = pg
	}
}
