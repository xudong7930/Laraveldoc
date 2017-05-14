composer
========

##1.下载安装
wget https://getcomposer.org/download/1.4.1/composer.phar && chmod +x composer.phar && mv composer.phar /usr/local/bin/composer

##2.设置使用CN镜像站
> composer config -g repo.packagist composer https://packagist.phpcomposer.com

##3.升级
> composer self-update

##常用命令
> composer clearcache
> composer dumpautoload

##更新包
> composer update  
> composer global update

##列出安装了哪些包
> composer gloabl info 
> composer info
