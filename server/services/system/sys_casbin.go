package system

import (
	gormadapter "github.com/casbin/gorm-adapter/v3"
	"server/global"
)

type CasbinServices struct {
}

func (CasbinServices) DeleteCasbinRule(roleName string) error {
	return global.GRA_DB.Delete(&gormadapter.CasbinRule{}, "v0 = ?", roleName).Error
}
func (CasbinServices) DeleteCasbinRules(roleName []string) error {
	return global.GRA_DB.Delete(&gormadapter.CasbinRule{}, "v0 in ?", roleName).Error
}

func (CasbinServices) ReloadCasbin() error {
	err := global.GRA_CASBIN.LoadPolicy()
	if err != nil {
		return err
	}
	return nil
}
