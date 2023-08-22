package request

import (
	"github.com/lib/pq"
	"server/models/system"
)

type RouterTreeResponse struct {
	Selected        pq.Int64Array      `json:"selected"`
	Routers         []system.SysRouter `json:"routers"`
	DefaultRouterId uint               `json:"defaultRouterId"`
}
type ApiResponse struct {
	Selected pq.Int64Array   `json:"selected"`
	Apis     []system.SysApi `json:"apis"`
}
