package common

import "time"

type BaseModel struct {
	CreatedAt time.Time `json:"createdAt,omitempty" gorm:"autoCreateTime"`       //创建时间
	UpdatedAt time.Time `json:"updatedAt,omitempty" gorm:"autoUpdateTime:milli"` //修改时间
}
