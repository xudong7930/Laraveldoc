laravel-ide-helper
==================

## 1.安装
> composer require barryvdh/laravel-ide-helper --dev

## 2.注册服务app.php
```php
'providers' => [
    Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class,
]
```

## 3.手动生成php-docs
> php artisan clear-compiled && php artisan ide-helper:generate

## 4.自动生成php-docs, 加入composer.json
```json
"scripts": {
    "post-update-cmd": [
        "Illuminate\\Foundation\\ComposerScripts::postUpdate",
        "php artisan clear-compiled",
        "php artisan ide-helper:generate",
        "php artisan ide-helper:meta",
        "php artisan optimize"
    ]
},
```

## 5.创建配置文件config/ide-helper.php
> php artisan vendor:publish --provider="Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider" --tag=config

## 6.生成一个.phpstorm.meta.php文件来添加工厂设计模式支持
> php artisan ide-helper:meta   
> 重启PHPStorm确保.phpstorm.meta.php文件被索引  
