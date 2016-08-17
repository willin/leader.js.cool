# 常用SHELL命令

推荐使用zsh： <http://ohmyz.sh/>

## 查看磁盘可用空间

```bash
df -h
```

> -h, --human-readable  print sizes in human readable format (e.g., 1K 234M 2G)

```
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda4       321G  1.4G  304G   1% /
none            4.0K     0  4.0K   0% /sys/fs/cgroup
udev             16G  4.0K   16G   1% /dev
tmpfs           3.2G  968K  3.2G   1% /run
none            5.0M     0  5.0M   0% /run/lock
none             16G     0   16G   0% /run/shm
none            100M     0  100M   0% /run/user
/dev/sda2       185M   75M  102M  43% /boot
/dev/sda5        28G  916M   26G   4% /var
/dev/sda6       184G  1.7G  173G   1% /usr
/dev/sda7       234G  1.4G  221G   1% /home
/dev/sda1        94M  2.6M   91M   3% /boot/efi
```

## 查看内存使用

```bash
free -m
```

> -b,-k,-m,-g show output in bytes, KB, MB, or GB

```
             total       used       free     shared    buffers     cached
Mem:         32105       1503      30602          0        223        631
-/+ buffers/cache:        648      31457
Swap:        61034          0      61034
```

## 性能分析

```bash
top
```

```
top - 11:13:36 up 12 days, 14:00,  3 users,  load average: 0.02, 0.03, 0.05
Tasks: 211 total,   1 running, 210 sleeping,   0 stopped,   0 zombie
Cpu(s):  0.0%us,  0.0%sy,  0.0%ni,100.0%id,  0.0%wa,  0.0%hi,  0.0%si,  0.0%st
Mem:  32876316k total,  1535196k used, 31341120k free,   229204k buffers
Swap: 62499836k total,        0k used, 62499836k free,   646796k cached

  PID USER      PR  NI  VIRT  RES  SHR S %CPU %MEM    TIME+  COMMAND
```

常用操作：

```bash
top   #//每隔5秒显式所有进程的资源占用情况
top -d 2  #//每隔2秒显式所有进程的资源占用情况
top -c  #//每隔5秒显式进程的资源占用情况，并显示进程的命令行参数(默认只有进程名)
top -p 12345 -p 6789  #//每隔5秒显示pid是12345和pid是6789的两个进程的资源占用情况
top -d 2 -c -p 123456 #//每隔2秒显示pid是12345的进程的资源使用情况，并显式该进程启动的命令行参数
```

## 搜索文件

```bash
find . -name *.log  #//在当前目录下查找.log日志
```
