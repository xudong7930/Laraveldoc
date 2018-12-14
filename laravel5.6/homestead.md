homestead
=========

# QA 
将IP地址添加到/etc/hosts中即可去掉8000端口

# box
* vagrant box list

* vagrant box add box.json

```json
{
    "name": "devserver",
    "versions": [{
        "version": "5.2.0",
        "providers": [{
            "name": "virtualbox",
            "url": "file:///Users/xudong7930/.vagrant.d/tmp/virtualbox_520.box"
        }]
    }]
}
```

* vagrant box remove "devserver"

# global-status

```bash
vagrant global-status
vagrant global-status --prune # clean issue vm
```

# 修改homestead.json文件使其生效:

> vagrant reload --provision


# 远程访问redis
sudo vim /etc/redis/redis.conf 修改
	bind 127.0.0.1 为 bind 0.0.0.0

sudo service redis restart

编辑homestead.json文件，添加端口转发:
	ports: [{"send": 6379, "to":6379}]

重启虚拟机: vagrant reload --provision

# laravel项目在vagrant中的权限问题:
查看nginx和php的运行用户:
    ps -aux | grep nginx
    ps -aux | grep php

编辑/etc/nginx/nginx.conf: 1行
编辑/etc/php/7.1/fpm/pool.d/www.conf: 23,24,48,49行
编辑/usr/lib/tmpfiles.d/php7.1-fpm.conf: 1行

# vagrant用户的密码
用户: vagrant
密码: vagrant

# homestead的mysql
配置文件/etc/mysql/mysql.conf.d/mysqld.cnf
