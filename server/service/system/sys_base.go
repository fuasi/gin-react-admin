package system

import (
	"server/global"
	"server/models/system"
)

type BaseService struct {
}

func (b *BaseService) GetRouter() (router []system.Router, err error) {
	err = global.GRA_DB.Find(&router).Error
	return router, err
}
