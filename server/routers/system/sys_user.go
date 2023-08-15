package system

import (
	"github.com/gin-gonic/gin"
	"server/apis/v1"
)

type UserRouter struct {
}

func (u *UserRouter) InitUserRouter(Router *gin.RouterGroup) {
	{
	}
	userRouter := Router.Use()
	userApi := v1.SystemApisApp.SystemApis.UserApi
	{
		userRouter.GET("/user/:id", userApi.GetUserById)
		userRouter.PATCH("/user", userApi.UpdateUserById)
		userRouter.DELETE("/user", userApi.DeleteUserById)
		userRouter.POST("/users", userApi.GetUserList)
		userRouter.POST("/check", userApi.CheckLogin)
		userRouter.PATCH("/user/:id", userApi.ResetUserPassword)
		userRouter.GET("/user", userApi.GetSelfInfo)
		userRouter.PUT("/user", userApi.InsertUser)
		userRouter.POST("/file", userApi.UploadFile)
		userRouter.GET("/routers", userApi.GetRouter)
	}
}
