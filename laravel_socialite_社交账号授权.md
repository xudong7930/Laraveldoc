Laravel Socialite
=================

## 安装
> composer require laravel/socialite

## 配置config/app.php添加
```php
'providers' => [
    // Other service providers...
    Laravel\Socialite\SocialiteServiceProvider::class,
],

'Socialite' => Laravel\Socialite\Facades\Socialite::class,
```

## 
