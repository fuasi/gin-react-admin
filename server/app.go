package main

import (
	"log"
	"server/initialize"
)

func main() {
	server := initialize.InitEnter()
	//middlewares.InitMiddleware(server)
	err := server.Run(":8888")
	if err != nil {
		log.Fatalln(err.Error())
		return
	}
}
