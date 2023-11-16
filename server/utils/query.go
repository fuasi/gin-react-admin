package utils

import (
	"fmt"
	"gorm.io/gorm"
	"reflect"
	"server/models/common/request"
)

func SearchWhere(query string, args any, isLike bool) func(tx *gorm.DB) *gorm.DB {
	return func(tx *gorm.DB) *gorm.DB {
		if IsBlank(args) {
			return tx
		}
		if isLike {
			return tx.Where(fmt.Sprintf("%s like ?", query), "%"+args.(string)+"%")
		}
		return tx.Where(fmt.Sprintf("%s = ?", query), args)
	}
}

func PageQuery(pageInfo request.PageInfo) (limit int, offset int) {
	limit = pageInfo.PageSize
	offset = (pageInfo.Page - 1) * pageInfo.PageSize
	return limit, offset
}

func IsBlank(i any) bool {
	value := reflect.ValueOf(i)
	switch value.Kind() {
	case reflect.String:
		return value.Len() == 0
	case reflect.Bool:
		return !value.Bool()
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return value.Int() == 0
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64, reflect.Uintptr:
		return value.Uint() == 0
	case reflect.Float32, reflect.Float64:
		return value.Float() == 0
	case reflect.Interface, reflect.Ptr:
		return value.IsNil()
	}
	return reflect.DeepEqual(value.Interface(), reflect.Zero(value.Type()).Interface())
}
