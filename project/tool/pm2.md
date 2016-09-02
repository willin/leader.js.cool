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


## 自动重启

设置内存使用过高上限，可以通过配置文件这一项：

```js
{
  "max_memory_restart": "800M"
}
```

如果想要根据CPU使用过高自动重启，则稍微麻烦点，需要自己写一个脚本监控。

```bash
pm2 jlist
```

结果会是这样的json：

```json
[
  {
      "pid": 28701,
      "name": "xxxx",
      "pm2_env": {
          "name": "xxxx",
          "max_memory_restart": 838860800,
          "instances": 0,
          "cwd": "/xxxx/project",
          "merge_logs": true,
          "vizion": true,
          "pmx": true,
          "automation": true,
          "autorestart": true,
          "treekill": true,
          "env": {
              "PM2_JSON_PROCESSING": "true",
              "LSCOLORS": "Gxfxcxdxbxegedabagacad",
              "LESS": "-R",
              "PAGER": "less",
              "SSH_TTY": "/dev/pts/1",
              "SSH_CLIENT": "218.94.29.190 53115 22",
              "SHELL": "/bin/bash",
              "TERM": "xterm-256color",
              "XDG_SESSION_ID": "814",
              "NODE_ENV": "production",
              "max_memory_restart": 838860800,
              "instances": 0,
              "merge_logs": true,
              "vizion": true,
              "pmx": true,
              "automation": true,
              "autorestart": true,
              "treekill": true,
              "log_date_format": "YYYY-MM-DD HH:mm:ss Z",
              "exec_mode": "cluster_mode",
              "node_args": [],
              "exec_interpreter": "node",
              "pm_out_log_path": "/xxxxx/logs/fish.out.log",
              "pm_err_log_path": "/xxxxx/logs/fish.err.log"
          },
          "log_date_format": "YYYY-MM-DD HH:mm:ss Z",
          "exec_mode": "cluster_mode",
          "node_args": [],
          "pm_exec_path": "/xxxx/babel.js",
          "pm_cwd": "/xxxxx/project",
          "exec_interpreter": "node",
          "pm_out_log_path": "/xxxxxx/xxx.out.log",
          "pm_err_log_path": "/xxxxxx/xxx.err.log",
          "NODE_APP_INSTANCE": 0,
          "vizion_running": false,
          "PM2_JSON_PROCESSING": "true",
          "LESSCLOSE": "/usr/bin/lesspipe %s %s",
          "XDG_RUNTIME_DIR": "/run/user/1000",
          "LESSOPEN": "| /usr/bin/lesspipe %s",
          "LC_CTYPE": "zh_CN.UTF-8",
          "SSH_TTY": "/dev/pts/1",
          "SHELL": "/bin/bash",
          "NODE_ENV": "production",
          "fish": "{}",
          "status": "online",
          "pm_uptime": 1472561001434,
          "axm_actions": [],
          "axm_monitor": {
              "Loop delay": {
                  "value": "0.92ms",
                  "agg_type": "avg",
                  "alert": {}
              }
          },
          "axm_options": {
              "http": false,
              "http_latency": 200,
              "http_code": 500,
              "ignore_routes": [],
              "profiling": true,
              "errors": true,
              "alert_enabled": true,
              "custom_probes": true,
              "network": false,
              "ports": false,
              "module_conf": {},
              "module_name": "fish",
              "module_version": "1.1.3",
              "pmx_version": "0.6.2",
              "error": true
          },
          "axm_dynamic": {},
          "created_at": 1472561000966,
          "pm_id": 3,
          "restart_time": 1,
          "unstable_restarts": 0,
          "_pm2_version": "1.1.3",
          "versioning": {
              "type": "git",
              "update_time": "2016-09-02T07:25:14.113Z",
              "comment": "v3.6.12 - fix-importer",
              "unstaged": false,
              "branch": "HEAD",
              "remotes": [
                  "origin"
              ],
              "remote": "origin",
              "branch_exists_on_remote": true,
              "ahead": false,
              "next_rev": null
          },
          "node_version": "6.3.0",
          "exit_code": 0
      },
      "pm_id": 3,
      "monit": {
          "memory": 90591232,
          "cpu": 0
      }
  }
]
```

其中每一列数据都有 `rows[i].monit.cpu`，值范围 0~100。可以用`later`写定时脚本监控并重启。
