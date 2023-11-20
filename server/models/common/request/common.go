package request

type PageInfo struct {
	Page     int    `json:"page,omitempty" gorm:"-"`
	PageSize int    `json:"pageSize,omitempty" gorm:"-"`
	KeyWord  string `json:"keyWord,omitempty" gorm:"-"`
}

type Search[T any] struct {
	PageInfo
	Condition T
}
