package viper_config

type ServerConfig struct {
	Redis    Redis
	Database Database
	JWT      JWT
	Upload   Upload
	User     UserConfig
	Casbin   Casbin
}
