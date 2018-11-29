laravel5.6


# install
```bash
composer create-project --prefer-dist "laravel/laravel=5.6.*" laravel56
```

# 配置
vim config/app.php

68行: 'timezone' => 'Asia/Shanghai',


# 安装passport
```bash
composer require "paragonie/random_compat:2.*"
composer require "laravel/passport"
```

# sql
```sql
    drop database homestead;
    create database homestead;
    grant all on homestead.* to homestead@% identyfied by "secret";
```

# mysql字符串长度问题
vim AppServiceProvider.php:

```php
    public function boot()
    {
        Schema::defaultStringLength(191);

        if ($this->app->environment() == 'local') {
            if (isset($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI'])) {
                file_put_contents('php://stdout', "\e[33m[HTTP::{$_SERVER['REQUEST_METHOD']}] \e[0m{$_SERVER['REQUEST_URI']}\n");
            }
        }

        if (config('app.env') == 'local') {
            \DB::listen(function (QueryExecuted $query) {
                $sql = $query->sql;
                $time = $query->time;
                $querys = json_encode($query->bindings, JSON_UNESCAPED_UNICODE);
                \Log::info("\n\tSQL: {$sql};\n\t参数:{$querys};\n\t耗时: {$time}ms\n");
            });
        }
    }
```


# 创建model目录  
> mkdir -p app/Models


# laravel分页带参数
```php
$query = $request->query();
unset($query['page']);
$items->appends($query)->links();
```

# 自定义常量
touch app/config/consts.php 内容:
```php
<?php
return [
    'ADMIN_NAME' => 'administrator'
];
```

使用: echo config('consts.ADMIN_NAME');


#laravel的xdebug调试
1.PHP内置浏览器调试:
xdebug的配置:
```
[xdebug]
zend_extension = /usr/local/lib/php/pecl/20170718/xdebug.so
xdebug.remote_enable=1
xdebug.remote_autostart=1
xdebug.remote_handler=dbgp
xdebug.remote_mode=req
xdebug.remote_host=127.0.0.1
xdebug.remote_port=9001
xdebug.idekey=VSCODE
```

vscode的launch.json配置
```json
{"version":"0.2.0","configurations":[{"name":"debug with file","type":"php","request":"launch","program":"${file}","cwd":"${fileDirname}","port":9001},{"name":"debug with vagrant","type":"php","request":"launch","pathMappings":{"/home/vagrant/code/ding_liufei":"/Users/xudong7930/code/ding_liufei"},"port":9000},{"name":"debug with buildin server","type":"php","request":"launch","port":9001}]}
```

中间件EncryptCookies.php中:
```php
protected $except = [
    'XCODE_SESSION'
];
```

2.homestead远程调试
homestead服务器上的xdebug.ini:
```
zend_extension=xdebug.so
xdebug.idekey="VSCODE"
xdebug.remote_autostart=1
xdebug.remote_enable = 1
xdebug.remote_connect_back = 1
xdebug.remote_port = 9000
xdebug.remote_host=10.0.2.15
xdebug.max_nesting_level = 512
```

vscode的launch.json配置:
```
{
    "name": "xdebug for vagrant",
    "type": "php",
    "request": "launch",
    "pathMappings": {
        "/home/vagrant/code/ding_liufei": "/Users/xudong7930/code/ding_liufei"
    },  
    "port": 9000
}
```

# laravel中.env文件注释
```ini
# 某个应用的ID
APP_ID=123123
```

# Laravel性能优化
1.配置文件合并,减少文件载入次数
> php artisan config:cache

2.路由缓存效率
> php artisan route:cache

3.把常用加载的类合并到一个文件里提高加载效率(在config:cache后执行)
> php artisan optimize --force

4.把 PSR-0 和 PSR-4 转换为一个类映射表，来提高类的加载速度
> composer dumpautoload -o

5.env关闭debug
APP_DEBUG=false

6.只加载必须的中间件
app/Http/Kernel.php

7.使用HHVM和OPcache和PHP7.0
8.env文件中文件缓存,session缓存,队列缓存都使用redis

