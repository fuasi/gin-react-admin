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

English | [简体中文](./README.md)

## 1. Getting started

### 1.1 PrevView
<a href="http://117.72.33.35:7888/">Demo</a> (Periodic data reset has not been set. Do not modify it)

> Gin-react-admin is a full-stack back-end separation development base platform based on [React](https://react.dev/) and [Gin](https://gin-gonic.com), integrating jwt authentication, dynamic routing, dynamic menu, casbin authentication, which can quickly develop react and Golang background management systems.



### 1.2 Web Run
```
# clone the project
git clone https://github.com/fuasi/gin-react-admin.git

# open web catalogue
cd web

# install dependency
pnpm install

# develop
pnpm dev 

```
### 1.3 Server Run
```
# clone the project
git clone https://github.com/fuasi/gin-react-admin.git

# open server catalogue
cd server

# install dependency
go generate

# build
# ff you compile Linux using Windows, you need to adjust the parameters:
# go env -w GOOS=linux
# go env -w GOARCH=amd64

go build ./app.go

# Run (Linux)
./app

# Run (Windows)
./app.exe
```

## 2. Features

### Completed
- [√] User management: User account rights management and login and login rights control
- [√] Role management: Create the main object of permission control, you can assign different api permissions and menu permissions to roles.
- [√] Menu management: Realize dynamic menu configuration for users, and realize different menus for different roles.
- [√] Api management: Set and adjust user api interface information.
### To be completed

- [×] Fragment upload: File fragment upload and large file upload.
- [×] Permission control: Set and adjust the user's api interface permissions.

## 3. Licenses

This project source code adopted [The BSD 3-Clause License](https://choosealicense.com/licenses/bsd-3-clause/) licenses。
