package utils

import (
	"context"
	"github.com/dgrijalva/jwt-go"
	"server/global"
	"server/models/system"
	"time"
)

type Claims struct {
	jwt.StandardClaims
	system.SysUserPublic
}

type JWT struct {
	sign []byte
}

func NewJWT() *JWT {
	return &JWT{sign: []byte(global.GRA_CONFIG.JWT.Sign)}
}

func (j *JWT) CreateToken(user system.SysUser) (string, error) {
	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, Claims{
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(24 * 3 * time.Hour).Unix(), //过期时间
			IssuedAt:  time.Now().Unix(),                         //签发时间
		},
		SysUserPublic: system.SysUserPublic{
			Id:       user.Id,
			Username: user.Username,
			Avatar:   user.Avatar,
		},
	}).SignedString([]byte(global.GRA_CONFIG.JWT.Sign))
	if err != nil {
		return "", err
	}
	global.GRA_REDIS.Set(context.Background(), user.Username, token, 24*3*time.Hour)
	return token, err
}

func (j *JWT) ParseToken(token string) (bool, *Claims, error) {
	claims, err := jwt.ParseWithClaims(token, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return j.sign, nil
	})
	if err != nil {
		return false, nil, err
	}
	if claims != nil {
		claim, ok := claims.Claims.(*Claims)
		if ok && claims.Valid {
			return true, claim, nil
		} else {
			return false, nil, err
		}
	} else {
		return false, nil, err
	}
}
