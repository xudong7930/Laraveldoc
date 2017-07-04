laravel-ide-helper
==================

## 安装
> composer require barryvdh/laravel-ide-helper
> composer require --dev barryvdh/laravel-ide-helper

## 加入app.conf
> Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class,

加入app/Providers/AppServiceProvider.php
```php
public function register()
{
    if ($this->app->environment() !== 'production') {
        $this->app->register(\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class);
    }
    // ...
}
```

## 加入composer.json
```json
"scripts":{
    "post-update-cmd": [
        "Illuminate\\Foundation\\ComposerScripts::postUpdate",
        "php artisan clear-compiled",
        "php artisan ide-helper:generate",
        "php artisan ide-helper:meta",
        "php artisan optimize"
    ]
},
```
