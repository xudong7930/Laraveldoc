Laravel Debugbar
================

## 安装
> composer require barryvdh/laravel-debugbar

## 注册服务app.conf:
```php
"providers" = [
    Barryvdh\Debugbar\ServiceProvider::class,
]

'aliases' => [
    'Debugbar' => Barryvdh\Debugbar\Facade::class,
]
```

## 拷贝配置文件
> php artisan vendor:publish --provider="Barryvdh\Debugbar\ServiceProvider"

## 使用
```php
<?php
use \Debugbar;

public function userFunction()
{
    Debugbar::info($object);
    Debugbar::error('Error!');
    Debugbar::warning('Watch out…');
    Debugbar::startMeasure('render','start_001');
    Debugbar::stopMeasure('render', "end_001");
}
```
