# gin-react-admin

 <a href="https://github.com/facebook/react">
    <img src="https://img.shields.io/badge/react-18.2.0-brightgreen.svg" alt="react">
  </a>
  <a href="https://github.com/fuasi/gin-react-admin/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-BSG-brightgreen.svg" alt="license">
  </a>
  <a href="https://img.shields.io/badge/golang-1.20.5-blue.svg">
    <img src="https://img.shields.io/badge/golang-1.20.5-blue.svg" alt="golang">
  </a>  
<a href="https://img.shields.io/badge/gin-1.20.5-blue.svg">
    <img src="https://img.shields.io/badge/gin-1.9.1-blue.svg" alt="gin">
  </a>
<a href="https://img.shields.io/badge/vite-4.3.9-orange.svg">
    <img src="https://img.shields.io/badge/vite-4.3.9-orange.svg" alt="vite">
  </a>
<a href="https://img.shields.io/badge/typescript-5.0.2-orange.svg">
    <img src="https://img.shields.io/badge/typescript-5.0.2-orange.svg" alt="typescript">
  </a>
<a href="https://img.shields.io/badge/gorm-1.25.1-blue.svg">
    <img src="https://img.shields.io/badge/gorm-1.25.1-blue.svg" alt="gorm">
  </a>  

[English](./README-en.md) | 简体中文

## 1. 使用说明

### 1.1 预览地址
<a href="http://117.72.33.35:7888/">项目预览</a> (暂未设置数据定时重置,请勿随意修改)

> gin-react-admin是一个基于 [react](https://react.dev/) 和 [gin](https://gin-gonic.com) 开发的全栈前后端分离的开发基础平台，集成jwt鉴权，动态路由，动态菜单，casbin鉴权，能够快速的开发出React和Golang的后台管理系统。

### 1.2 Web运行
```
# 克隆项目
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
# 克隆项目
git clone https://github.com/fuasi/gin-react-admin.git

# 进入后端
cd server

# 安装依赖包
go generate

# 编译
# 如果使用Windows编译Linux,需要调整参数: 
# go env -w GOOS=linux
# go env -w GOARCH=amd64

go build ./app.go 

# 运行 (Linux)
./app

# 运行 (Windows)
./app.exe
```

## 2. 功能一览

### 已完成
- [√] 用户管理：用户的账号权限管理以及登录和登录权限控制
- [√] 角色管理：创建权限控制的主要对象，可以给角色分配不同api权限和菜单权限。
- [√] 菜单管理：实现用户动态菜单配置，实现不同角色不同菜单。
- [√] api管理：设置与调整用户的api接口信息。
### 待完成

- [×] 分片上传：文件分片上传和大文件上传。
- [×] 权限控制：设置与调整用户的api接口权限。

## 3. 开源协议

本项目源码采用 [The BSD 3-Clause License](https://choosealicense.com/licenses/bsd-3-clause/) 开源协议。

## 4. 支持
<a href="https://www.jetbrains.com/community/opensource/?utm_campaign=opensource&utm_content=approved&utm_medium=email&utm_source=newsletter&utm_term=jblogo#support">
 <img src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.svg?_gl=1*jpv2l7*_ga*MTQyNTQzMTA0MC4xNjkxNTU0MzA1*_ga_9J976DJZ68*MTY5NTgwNDEzMC40LjEuMTY5NTgwNjI1Ny42MC4wLjA.&_ga=2.24538040.346469446.1695804131-1425431040.1691554305" alt="open-source"/>
</a>
<a href="https://www.jetbrains.com/community/opensource/?utm_campaign=opensource&utm_content=approved&utm_medium=email&utm_source=newsletter&utm_term=jblogo#support">
 <img src="https://resources.jetbrains.com/storage/products/company/brand/logos/GoLand_icon.svg?_gl=1*1158lr9*_ga*MTQyNTQzMTA0MC4xNjkxNTU0MzA1*_ga_9J976DJZ68*MTY5NTgwNDEzMC40LjEuMTY5NTgwNjg4My40My4wLjA.&_ga=2.57167784.346469446.1695804131-1425431040.1691554305" alt="open-source"/>
</a>
<a href="https://www.jetbrains.com/community/opensource/?utm_campaign=opensource&utm_content=approved&utm_medium=email&utm_source=newsletter&utm_term=jblogo#support">
 <img src="https://resources.jetbrains.com/storage/products/company/brand/logos/WebStorm_icon.svg?_gl=1*fl3528*_ga*MTQyNTQzMTA0MC4xNjkxNTU0MzA1*_ga_9J976DJZ68*MTY5NTgwNDEzMC40LjEuMTY5NTgwNjkxNi4xMC4wLjA.&_ga=2.57167784.346469446.1695804131-1425431040.1691554305" alt="open-source"/>
</a>
