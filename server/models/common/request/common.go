package request

type PageInfo struct {
	Page     int    `json:"page,omitempty"`
	PageSize int    `json:"pageSize,omitempty"`
	KeyWord  string `json:"keyWord,omitempty"`
}
