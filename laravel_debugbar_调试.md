laravel_debugbar
================

## 安装
> composer require barryvdh/laravel-debugbar

## 添加到app.conf:
```php
Barryvdh\Debugbar\ServiceProvider::class,

'Debugbar' => Barryvdh\Debugbar\Facade::class,
```

## 拷贝配置文件
> php artisan vendor:publish --provider="Barryvdh\Debugbar\ServiceProvider"

## 使用
```php
<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \Debugbar;

class UserController extends Controller
{
    public function userFunction()
    {
        Debugbar::info($object);
        Debugbar::error('Error!');
        Debugbar::warning('Watch out…');
        Debugbar::startMeasure('render','start_001');
        echo 11;
        Debugbar::stopMeasure('render', "end_001");
    }
}
```
