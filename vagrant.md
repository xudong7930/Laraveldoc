vagrant
=======

## 1. 安装virtualbox, vagrant
[下载vagrant](https://www.vagrantup.com/)
[下载virtualbox](https://www.virtualbox.org/wiki/Downloads)

# 2. 下载, 添加vagrant.box
下载: 
* https://app.vagrantup.com/laravel/boxes/homestead
* wget https://vagrantcloud.com/laravel/boxes/homestead/versions/5.2.0/providers/virtualbox.box

添加虚拟机
* 列出所有虚拟机: vagrant box list
* 添加虚拟机: vagrant box add box_metadata.json
* 移除虚拟机: vagrant box remove "laravel_homestead_v520"

```json
{
    "name": "homestead_v520",
    "versions": [{
        "version": "5.2.0",
        "providers": [{
            "name": "virtualbox",
            "url": "file:///Users/xudong7930/.vagrant.d/tmp/virtualbox_520.box"
        }]
    }]
}
```


## 4. 下载homestead项目
如果后期污染了这个项目,重新下载homestead操作即可
```
git clone --branch v7.3.0 https://github.com/laravel/homestead.git
cd homestead
bash init.sh
```

* 配置homestead.yaml
* 启动和安装: vagrant up

```yaml
---
box: "homestead_v520"
version: "5.2.0"
name: "devserver"
hostname: "devserver"
ip: "192.168.10.10"
memory: 2048
cpus: 1
provider: virtualbox

authorize: ~/.ssh/id_rsa.pub

keys:
    - ~/.ssh/id_rsa

folders:
    - map: ~/Public/xudong/code
      to: /home/vagrant/code

sites:
    - map: homestead.io
      to: /home/vagrant/code

databases:
    - homestead
```

8. 启动vagrant虚拟机(cd Homestead)
```
vagrant up '启动'
vagrant halt '关闭'
vagrant destroy --force '删除虚拟机'
vagrant ssh "登录到虚拟机"
vagrant reload --provision '更新homestead.yaml文件后,执行此命令'
vagrant ssh && share homestead.app "共享你的站点,使其他PC能访问"
vagrant suspend "挂起"
vagrant resume "恢复挂起"
vagrant reload "重启虚拟机,并使用新的配置文件"
vagrant port "查看端口映射情况"
```

9. 更新vagrant box
* git pull homestead.git
* vagrant box update

10. 提示
mysql默认账号: host/port/user/password = yourdomain/3306/homestead/secret
redis默认账号:
root账号: 