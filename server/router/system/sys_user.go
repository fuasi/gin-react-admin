package system

import (
	"github.com/gin-gonic/gin"
	"server/apis"
)

type UserRouter struct {
}

func (u *UserRouter) InitUserRouter(Router *gin.RouterGroup) {
	{
		Router.POST("/login", apis.SystemApisApp.SystemApis.UserApi.Login)
	}
	userRouter := Router.Use()
	userApi := apis.SystemApisApp.SystemApis.UserApi
	{
		userRouter.GET("/users", userApi.GetUserList)
		userRouter.GET("/user/{id}", userApi.GetUserById)
		userRouter.PATCH("/user/{id}", userApi.UpdateUserById)
		userRouter.DELETE("/user/{id}", userApi.DeleteUserById)
	}
}
