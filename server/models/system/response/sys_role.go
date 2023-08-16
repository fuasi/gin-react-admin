package request

import (
	"github.com/lib/pq"
	"server/models/system"
)

type RouterTreeResponse struct {
	Selected pq.Int64Array   `json:"selected"`
	Routers  []system.Router `json:"routers"`
}
type ApiResponse struct {
	Selected pq.Int64Array   `json:"selected"`
	Apis     []system.SysApi `json:"apis"`
}
