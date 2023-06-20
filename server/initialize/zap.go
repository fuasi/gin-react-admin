package initialize

import (
	"fmt"
	"github.com/lestrrat-go/file-rotatelogs"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"log"
	"server/global"
	"time"
)

// 配置zap的文件编码
func getEncoder() zapcore.Encoder {
	config := zap.NewProductionEncoderConfig()
	config.EncodeTime = zapcore.ISO8601TimeEncoder
	config.EncodeLevel = zapcore.CapitalLevelEncoder
	return zapcore.NewConsoleEncoder(config)
}

// Filename: 日志文件的位置
// MaxSize：在进行切割之前，日志文件的最大大小（以 MB 为单位）
// MaxBackups：保留旧文件的最大个数
// MaxAges：保留旧文件的最大天数
// Compress：是否压缩 / 归档旧文件
// 写入指定文件
func getLogWriter(fileName string) zapcore.WriteSyncer {
	filePath := fmt.Sprintf("./log_file/%s-%s.log", fileName, time.Now().Format("2006-01-02-15"))
	logs, err := rotatelogs.New(
		filePath,
		// 设置链接的文件名
		rotatelogs.WithLinkName(fileName),
		// 设置日志保留时间
		rotatelogs.WithMaxAge(time.Hour*24*30),
		// 设置多久重新生成文件
		rotatelogs.WithRotationTime(time.Hour),
	)

	if err != nil {
		log.Fatalln("logger/zap.go 中的 rotatelogs 初始化失败")
		return nil
	}

	return zapcore.AddSync(logs)
}

func initZap() {
	infoLevel := zap.LevelEnablerFunc(func(level zapcore.Level) bool {
		return level == zapcore.InfoLevel
	})
	warnLevel := zap.LevelEnablerFunc(func(level zapcore.Level) bool {
		return level == zapcore.WarnLevel
	})

	errorLevel := zap.LevelEnablerFunc(func(level zapcore.Level) bool {
		return level == zapcore.ErrorLevel
	})

	tee := zapcore.NewTee(
		zapcore.NewCore(getEncoder(), getLogWriter("info"), infoLevel),
		zapcore.NewCore(getEncoder(), getLogWriter("warn"), warnLevel),
		zapcore.NewCore(getEncoder(), getLogWriter("error"), errorLevel),
	)
	logger := zap.New(tee, zap.AddCaller())
	global.GRA_LOG = logger.Sugar()
}
