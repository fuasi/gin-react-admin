package common

import "time"

type BaseModel struct {
	CreatedAt time.Time `json:"createdAt,omitempty" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updatedAt,omitempty" gorm:"autoUpdateTime:milli"`
}
