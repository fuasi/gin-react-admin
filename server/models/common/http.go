package common

type HttpType uint8

const (
	HttpGet    HttpType = 0
	HttpPost   HttpType = 1
	HttpPut    HttpType = 2
	HttpPatch  HttpType = 3
	HttpDelete HttpType = 4
)

func (t HttpType) String() string {
	switch t {
	case HttpGet:
		return "GET / 查询"
	case HttpPut:
		return "PUT / 创建"
	case HttpPost:
		return "POST / 多条件查询|创建"
	case HttpPatch:
		return "PATCH / 更新"
	default:
		return "DELETE / 删除"
	}
}
func (t HttpType) MethodString() string {
	switch t {
	case HttpGet:
		return "GET"
	case HttpPut:
		return "PUT"
	case HttpPost:
		return "POST"
	case HttpPatch:
		return "PATCH"
	default:
		return "DELETE"
	}
}
