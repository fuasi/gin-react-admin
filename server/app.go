package main

import (
	"log"
	"server/initialize"
	"server/middlewares"
)

func main() {
	server := initialize.InitEnter()
	middlewares.InitMiddleware(server)
	err := server.Run(":8088")
	if err != nil {
		log.Fatalln(err.Error())
		return
	}
}
