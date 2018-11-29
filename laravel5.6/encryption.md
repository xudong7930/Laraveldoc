encryption for laravel
======================


# 配置
生成加密key
> php artisan key:generate


# 使用
```php
$encStr = encrypt('Hello world'); // 加密
$decStr = decrypt($encStr); // 解密
```

# 使用facades

```php
use Illuminate\Support\Facades\Crypt;

$encrypted = Crypt::encryptString('Hello world.'); // 加密
$decrypted = Crypt::decryptString($encrypted); // 解密
```
