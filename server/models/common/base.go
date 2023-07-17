package common

import "time"

type BaseModel struct {
	CreatedAt time.Time `json:"createdAt,omitempty" gorm:"autoUpdateTime:milli"`
	UpdatedAt time.Time `json:"updatedAt,omitempty" gorm:"autoCreateTime"`
}
