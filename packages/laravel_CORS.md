Laravel CORS
============

## 安装
> composer require barryvdh/laravel-cors  

## 注册服务app.php
```php
'providers' => [
    Barryvdh\Cors\ServiceProvider::class,
]
```

## 发布配置文件
> php artisan vendor:publish --provider="Barryvdh\Cors\ServiceProvider"

## 排除指定的接口
在VerifyCsrfToken.php文件中:
```php
protected $except = [
    'api/*'
]
```

## 在指定的Route中过滤
在app/Http/Kernel.php文件中:
```php
// for global
protected $middleware = [
    \Barryvdh\Cors\HandleCors::class,
];

// for specify group
protected $middlewareGroups = [
    'web' => [],
    'api' => [
        \Barryvdh\Cors\HandleCors::class,
    ]
];

```
