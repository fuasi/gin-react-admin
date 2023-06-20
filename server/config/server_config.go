package config

type ServerConfig struct {
	Redis    Redis
	Database Database
	JWT      JWT
}
