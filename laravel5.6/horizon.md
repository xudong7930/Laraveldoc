laravel horizon
===============

官网: https://horizon.laravel.com/

# 安装
composer require laravel/horizon

# 复制文件
php artisan vendor:publish --provider="Laravel\Horizon\HorizonServiceProvider"

# 配置
vim config/horizon.php

vim AppServiceProvider.php中boot方法:

```php
    Horizon::auth(function ($request) {
        
        if ($request->user()) {
            return $request->user()->id == 1;
        }

        return false;
    });
```

# 启动
php artisan horizon
php artisan horizon:pause
php artisan horizon:continue
php artisan horizon:terminate

# 访问查看:
http://app.io/horizon

# 使用supervisor
vim /etc/supervisor/conf.d/horizon.conf 添加:

```bash
[program:horizon]
process_name=%(program_name)s
command=php /home/vagrant/code/laravel56/artisan horizon
autostart=true
autorestart=true
user=vagrant
redirect_stderr=true
stdout_logfile=/home/vagrant/code/laravel56/storage/logs/horizon.log
```

sudo /etc/init.d/supervisor restart

