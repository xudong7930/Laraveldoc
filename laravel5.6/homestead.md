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

