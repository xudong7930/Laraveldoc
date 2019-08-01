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

# 自定义常量constants.php
touch app/config/consts.php 内容:
```php
<?php
return [
    'ADMIN_NAME' => 'administrator'
];
```

使用: echo config('consts.ADMIN_NAME');


#laravel的xdebug调试
php.ini的配置
```
[xdebug]
zend_extension=xdebug.so
xdebug.remote_enable = 1
xdebug.remote_autostart=1
xdebug.remote_connect_back = 1
xdebug.remote_port = 9090
xdebug.remote_host=127.0.0.1
xdebug.idekey=VSCODE
```

vscode中launch.json的配置
```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "debug with nginx or php-server",
            "type": "php",
            "request": "launch",
            "port": 9090
        },

        {
            "name": "debug with homestead",
            "type": "php",
            "request": "launch",
            "pathMappings": {
                "/Users/xudong7930/code/new-fms/fms-server": "/Users/xudong7930/code/new-fms/fms-server"
            },
            "port": 9090
        }
    ]
}
```


# laravel中.env文件注释
```
# 某个应用的ID
APP_ID=123123
CLUSTER[NODE1]="192.168.1.1:2203"


if (!function_exists('env_array')) {
    /**
     * Gets the values of an environment array.
     *
     * @param string $name
     * @param bool $flatten
     * @param array $default
     * @return array
     */
    function env_array(string $name, bool $flatten = true, array $default = []): array
    {
        $data = [];
        foreach ($_ENV as $key => $value) {
            $matches = [];
            if (preg_match('/^' . $name . '\[([a-zA-Z0-9]*)\]$/', $key, $matches)) {
                if (isset($matches[1])) {
                    $data[$matches[1]] = $value;
                }
            }
        }

        if (empty($data)) {
            $data = $default;
        }

        if ($flatten) {
            return array_values($data);
        }

        return $data;
    }
}
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

# orWhere查询
```php
DB::table("users")->where(function($query) use ($date) {
    $query->where("field_1", 1)
        ->orWhere([
            ["field_2", '=', 2]
        ])
});
```


# 404页面
app\Exceptions\Handler.php中的render方法
```php
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

public function render($request, Exception $exception)
{
    if ($exception instanceof MethodNotAllowedHttpException || $exception instanceof NotFoundHttpException) {
        return redirect()->route('404');
    }

    if ($exception instanceof \Illuminate\Session\TokenMismatchException) {
        notifyMessage('error', "抱歉,你的token已经过期");
        return redirect()->route('logout');
    }

    return parent::render($request, $exception);
}
```


# 分页带查询条件
```
{{ $baseSalaries->appends($query)->links() }}
```

# 获取客户端IP
```
request()->getClientIp();
```

#前端js使用blade模板的传递的json
```js
let jsonData = {!! json_encode($data) !!}
```

#运行原生sql
```php
$sql="";
DB::connection('default')->getPdo()->exec($sql);
```

#自定义验证规则
编辑AppServiceProvider.php文件boot方法:
```php
Validator::extend('myrule', function($attribute, $value, $parameters, $validator) {
    $s = array_get($validator->getData(), $parameters[0]);
    return true;
});

参数传递:
'email' => 'required|myrule:name'
```



# logs目录，cache目录没有权限
```bash
sudo chmod -Rf 0777 bootstrap/cache
sudo chmod -Rf 0777 storage/logs
```