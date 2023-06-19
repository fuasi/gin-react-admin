package main

import (
	"github.com/gin-gonic/gin"
	"log"
	"server/apis"
	"server/initialize"
	"server/middlewares"
)

func main() {
	initialize.InitEnter()
	server := gin.Default()
	middlewares.InitMiddleware(server)
	apis.InitApis()
	err := server.Run(":8088")
	if err != nil {
		log.Fatalln(err.Error())
		return
	}
}
