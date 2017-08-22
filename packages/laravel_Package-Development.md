Laravel私有包开发
================

## 1.安装[Laravel Packager](https://github.com/Jeroen-G/laravel-packager)
> composer require jeroen-g/laravel-packager

## 2.在config/app.php添加
```php
JeroenG\Packager\PackagerServiceProvider::class,
```

## 3.创建一个新的包
创建修改.evn文件，添加**CURL_VERIFY=false**
> php artisan packager:new xudong7930 MyPackageName  

列出本地的包
> php artisan packager:list  

移除指定包
> php artisan packager:remove xudong7930 MyPackageName

## 4.在app/packages下开发你的包
> 文件目录的部署参考vendor/作者/包  
> 具体实例参考 [Laravel私有包开发](https://github.com/xudong7930/productsadmin)


## 5.发布推送到Github
``` bash
cd app/packages/xudong7930/MyAnotherPackage
git init
git add *
git remote add origin git@github.com:xudong7930/MyAnotherPackage.git
git commmit -m "initial commit"
git push -u origin master
git tag v0.1.1
git push origin v0.1.1  //在远程上创建版本
```

## 6. 安装你的开发包

### 提交到composer上
> [Composer.org](https://getcomposer.org)

### 自定义
在composer.json中添加
```json
"requrie": {
    'xudong7930/MyAnotherPackage': '0.1.*'
},
"repositories": [
    {
        "type": "git",
        "url": "git@github.com:xudong7930/MyAnotherPackage.git"
    }
]
```

更新安装
> composer update -v  
> composer udpate xudong7930 MyAnotherPackage -v  

注册config/app.php文件中service provider
> xudong7930\MyAnotherPackage\MyAnotherPackageServiceProvider::class,

发布包
> php artisan vendor:publish  
> php artisna vendor:publish --provider="xudong7930\Alidayu\AlidayuServiceProvider"  
