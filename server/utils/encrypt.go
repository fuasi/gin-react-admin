package utils

import (
	"golang.org/x/crypto/bcrypt"
	"server/global"
)

func GetPasswordEncrypt(password string) string {
	fromPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		global.GRA_LOG.Error("密码加密失败:", err.Error())
		return ""
	}
	return string(fromPassword)
}

func VerifyPassword(dataBasePassword, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(dataBasePassword), []byte(password))
	if err != nil {
		return false
	} else {
		return true
	}
}
