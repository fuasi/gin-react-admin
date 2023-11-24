package utils

import (
	"context"
	"server/global"
	"time"
)

func RedisGetToken(username string) string {
	return global.GRA_REDIS.Get(context.Background(), username).Val()
}

func RedisSetToken(username string, token string) error {
	return global.GRA_REDIS.Set(context.Background(), username, token, 24*3*time.Hour).Err()
}
