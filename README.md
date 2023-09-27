# gin-react-admin

 <a href="https://github.com/facebook/react">
    <img src="https://img.shields.io/badge/react-18.2.0-brightgreen.svg" alt="pinia">
  </a>
  <a href="https://github.com/fuasi/gin-react-admin/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-BSG-brightgreen.svg" alt="license">
  </a>
  <a href="https://img.shields.io/badge/golang-1.20.5-blue.svg">
    <img src="https://img.shields.io/badge/golang-1.20.5-blue.svg" alt="license">
  </a>  
<a href="https://img.shields.io/badge/gin-1.20.5-blue.svg">
    <img src="https://img.shields.io/badge/gin-1.9.1-blue.svg" alt="license">
  </a>
<a href="https://img.shields.io/badge/vite-4.3.9-orange.svg">
    <img src="https://img.shields.io/badge/vite-4.3.9-orange.svg" alt="license">
  </a>
<a href="https://img.shields.io/badge/typescript-5.0.2-orange.svg">
    <img src="https://img.shields.io/badge/typescript-5.0.2-orange.svg" alt="license">
  </a>
<a href="https://img.shields.io/badge/gorm-1.25.1-blue.svg">
    <img src="https://img.shields.io/badge/gorm-1.25.1-blue.svg" alt="license">
  </a>  

## 1. 使用说明

### 1.1 预览地址
<a href="http://117.72.33.35:7888/">项目预览</a> (暂未设置数据定时重置,请勿随意修改)

### 1.2 Web运行
```

git clone https://github.com/fuasi/gin-react-admin.git
# 进入前端
cd web

# 安装依赖包
pnpm install

# 启动服务
pnpm dev 

```
### 1.3 Server运行
```

git clone https://github.com/fuasi/gin-react-admin.git

cd server (进入前端)

go generate (安装依赖包)

# 如果使用Windows编译Linux,需要调整参数: 
# go env -w GOOS=linux
# go env -w GOARCH=amd64

go build ./app.go (编译)

#运行 (Linux)
./app

#运行 (Windows)
./app.exe
```

## 2. 功能一览

### 已完成
- [√] 登录：以及权限控制
- [√] 角色管理：创建权限控制的主要对象，可以给角色分配不同api权限和菜单权限。
- [√] 菜单管理：实现用户动态菜单配置，实现不同角色不同菜单。
- [√] api管理：设置与调整用户的api接口信息。
### 待完成

- [×] 分片上传：文件分片上传和大文件上传。
- [×] 权限控制：设置与调整用户的api接口权限。

## 3. 开源协议

本项目源码采用 [The BSD 3-Clause License](https://choosealicense.com/licenses/bsd-3-clause/) 开源协议。
