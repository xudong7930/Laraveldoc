Vagrant-laravel devement env
============================


# 安装
1.下载vagrant
> https://www.vagrantup.com/

2.下载virtualbox
> https://www.virtualbox.org/wiki/Downloads

3.下载vagrant.box
> wget https://vagrantcloud.com/laravel/boxes/homestead/versions/3.1.0/providers/virtualbox.box

4.添加虚拟机
```json
{
    "name": "xudong/homestead",
    "versions": [{
        "version": "0.4.0",
        "providers": [{
            "name": "virtualbox",
            "url": "file:////Users/xudong7930/.vagrant.d/tmp/virtualbox.box"
        }]
    }]
}
```
vagrant box add metadata.json "新增虚拟机"
vagrant box remove xudong/homestead "移除虚拟机"


5.下载homestead项目
git clone https://github.com/laravel/homestead.git Homestead && cd Homestead

6.初始化生成homestead.yaml文件
bash init.sh

7.配置hometead.yaml
```json
---
box: xudong/homestead
ip: "192.168.10.10"
memory: 768
cpus: 1
provider: virtualbox

authorize: ~/Public/ssh2/id_rsa.pub

keys:
    - ~/.ssh/id_rsa

folders:
    - map: ~/Public/Xudong/laravel-55
      to: /home/vagrant/code
      type: "rsync"
      options:
          rsync_args: ["--verbose", "--archive", "--delete", "-zz"]
          rsync_exclude: ["node_modules", "vendor"]

sites:
    - map: laravel.app
      to: /home/vagrant/code/public
      schedule: false

databases:
    - homestead

ports:
    - send: 7777
      to: 777
      protocol: udp
```

8.启动vagrant虚拟机(cd Homestead)
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


9.更新vagrant box
git pull homestead.git
vagrant box update


