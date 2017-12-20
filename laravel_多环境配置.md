Laravel多环境
============

## step1: 创建3个环境文件
* .local.env
* .test.env
* .production.env

## step2: 填充环境文件
* 复制.env文件内容到.local.env,设置APP_ENV=local
* 复制.env文件内容到.test.env,设置APP_ENV=test
* 复制.env文件内容到.production.env,设置APP_ENV=production

## step3: 配置.env
* 清空.env文件,并设置"local|test|product"单个环境

## step4: 在bootstrap/下创建environment.php
```php
<?php

use Dotenv\Dotenv;

/*
|--------------------------------------------------------------------------
| Detect The Application Environment
|--------------------------------------------------------------------------
|
| Laravel takes a dead simple approach to your application environments
| so you can just specify a machine name for the host that matches a
| given environment, then we will automatically detect it for you.
|
*/
$env = $app->detectEnvironment(function(){
    $environmentPath = __DIR__.'/../.env';
    $setEnv = trim(file_get_contents($environmentPath));
    if (file_exists($environmentPath))
    {
        putenv("APP_ENV=$setEnv");
        if (getenv('APP_ENV') && file_exists(__DIR__.'/../.' .getenv('APP_ENV') .'.env')) {
            return new Dotenv(__DIR__ . '/../', '.' . getenv('APP_ENV') . '.env');
        } 
    }
});

```

## step5: 在bootstrap/app.php中加载刚才创建的环境文件
```php
<?php

/*
|--------------------------------------------------------------------------
| Load Environment File on Startup
|--------------------------------------------------------------------------
|
| This will determine, which environment will be loaded for our application.
|
*/
require __DIR__.'/environment.php';

?>
```


## step6: 验证当前环境
* termminal: php artisan env
* php: App::environment()
