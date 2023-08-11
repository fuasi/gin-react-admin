package system

import (
	"github.com/gin-gonic/gin"
	"server/apis"
	"server/middlewares"
)

type UserRouter struct {
}

func (u *UserRouter) InitUserRouter(Router *gin.RouterGroup) {
	{
		Router.POST("/login", apis.SystemApisApp.SystemApis.UserApi.Login)
	}
	userRouter := Router.Use(middlewares.AuthMiddleware, middlewares.CasbinMiddleware)
	//userRouter := Router.Use()
	userApi := apis.SystemApisApp.SystemApis.UserApi
	{
		userRouter.POST("/check", apis.SystemApisApp.SystemApis.UserApi.CheckLogin)
		userRouter.POST("/users", userApi.GetUserList)
		userRouter.GET("/user/:id", userApi.GetUserById)
		userRouter.PATCH("/user", userApi.UpdateUserById)
		userRouter.DELETE("/user", userApi.DeleteUserById)
		userRouter.PUT("/user", userApi.InsertUser)
		userRouter.GET("/user", userApi.GetSelfInfo)
		userRouter.PATCH("/user/:id", userApi.ResetUserPassword)
	}
}
