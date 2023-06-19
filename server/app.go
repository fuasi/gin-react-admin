package main

import (
	"github.com/gin-gonic/gin"
	"log"
	"server/initialize"
	"server/middlewares"
)

func main() {
	initialize.InitEnter()
	server := gin.Default()
	middlewares.InitMiddleware(server)
	err := server.Run(":8088")
	if err != nil {
		log.Fatalln(err.Error())
		return
	}
}
