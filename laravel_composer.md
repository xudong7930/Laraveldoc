PHP Composer
===========

## 下载安装
> wget https://getcomposer.org/download/1.4.1/composer.phar && chmod +x composer.phar && mv composer.phar /usr/local/bin/composer

## 设置使用CN镜像站
> composer config -g repo.packagist composer https://packagist.phpcomposer.com  

## 常用命令
* composer self-update
* composer clearcache
* composer dumpautoload
* composer config --list -g 查看全局配置
* composer update  
* composer global update

## 包管理
* composer search "monolog" 搜索包
* composer show -all "monolog/monolog" 显示包的详细信息
* composer show "xudong7930/Alidayu" 显示指定包的信息
* composer global show 列出安装了那些包
* composer global outdated 列出过期的包
* composer update "foo/bar" 更新指定的包
* composer update --lock 更新composer.lock文件

## 生产环境
* composer dump-autoload --optimize 优化
* composer create-project --prefer-dist --no-progress "laravel/laravel" ~/Desktop/project-name 创建项目
* composer init 创建composer.json文件
