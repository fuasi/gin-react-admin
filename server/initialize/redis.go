package initialize

import (
	"context"
	"github.com/go-redis/redis/v8"
	"log"
	"server/global"
	"time"
)

func InitRedis() {
	rs := redis.NewClient(&redis.Options{
		Addr:     global.GRA_CONFIG.Redis.Addr,
		Password: global.GRA_CONFIG.Redis.Password,
		DB:       0,
		PoolSize: 100,
	})
	timeout, cancelFunc := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancelFunc()
	_, err := rs.Ping(timeout).Result()
	if err != nil {
		log.Println(err)
		panic("Redis数据初始化失败!")
	}
	global.GRA_REDIS = rs
}
