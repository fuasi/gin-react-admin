package main

import (
	"fmt"
	"server/global"
	"server/initialize"
	"server/models/system"
	"testing"
)

func TestDb(t *testing.T) {
	initialize.InitEnter()
	initialize.InitDataBase()
	users := new([]system.SysUser)
	global.GRA_DB.Where(system.SysUser{
		SysUserPublic: system.SysUserPublic{Enable: true},
	}).Find(&users)
	fmt.Println(users)
}
