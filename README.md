# laiwan_io_web
提供来玩 web 资源支持

## 功能介绍
+ 来玩首页
+ 用户协议: {{domain}}/aggrement.html
+ 隐私政策: {{domain}}/privacy.html

## 如何开发

可以自己使用docker搭建开发环境，也可以使用docker-compose运行提供的docker-compose.yml脚本文件，推荐使用后者。

### 启动开发环境

首先保证自己的电脑环境可以使用docker-compose，然后进入项目根目录。

```shell
$ cd docker
$ docker-compose up -d
```

### 进入 docker
```shell
$ docker-compose exec laiwan_io_web bash
```
也可一开始在项目根目录运行 ./start_develop.sh 直接进入docker。

### 跑Web

进入docker后
```shell
$ ./runserver
```
然后就可以访问主页 <http://localhost:8000>

或者<http://0.0.0.0:8000>

## 如何发布到 production
```shell
$ git checkout master
$ ./make_tag
```
