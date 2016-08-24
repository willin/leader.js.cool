# PM2

<https://github.com/Unitech/pm2>

当前使用场景：产品环境守护进程。

## 常用命令

### 启动项目

```bash
pm2 start xxx.js   #直接启动入口文件

pm2 start xxx.json #通过配置启动
```

配置文件参考：

```json
[{
    "name": "app",
    "script": "babel.js",
    "log_date_format": "YYYY-MM-DD HH:mm:ss Z",
    "cwd": "/home/project",
    "error_file": "/home/project/logs/app.err.log",
    "out_file": "/home/project/logs/app.out.log",
    "max_memory_restart": "800M",
    "instances": 0,
    "exec_mode": "cluster",
    "merge_logs": true,
    "env": {
        "NODE_ENV": "production"
    }
},{
  "script" : "./examples/child.js",
  "error_file" : "errLog.log",
  "out_file" : "outLog.log",
  "pid_file" : "child",
  "instances" : "4",
  "min_uptime" : "10",
  "max_restarts" : "4"
},{
  "script" : "examples/env.js",
  "error_file" : "errEcho.log",
  "out_file" : "outEcho.log",
  "name" : "ok",
  "pid_file" : "echo.pid",
  "max" : "1",
  "exec_mode" : "cluster_mode",
  "port" : "9001",
  "env_variable" : "TOTO",
  "TEST_VARIABLE" : "YESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSIR"
}]
```

### 重启项目

```bash
pm2 restart #PID# #重启一个进程

pm2 restart app-name #重启一个应用

pm2 restart all #重启所有项目
```

### 停止

```bash
pm2 stop #PID#

pm2 stop app-name
```

### 终止

```bash
pm2 delete app-name #删除一个进程

pm2 kill #终止所有进程
```

### 开机自启

```bash
pm2 startup
```

参考官方文档获取详细使用说明。
