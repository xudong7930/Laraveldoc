Laravel Encryption
==================

## 生成加密key
> php artisan key:generate


## 使用encrypt函数加密
```php
    use Illuminate\Contracts\Encryption\DecryptException;

    $secret = encrypt('password');
    try {
        $secret2 = decrypt($secret);
    } catch (DecryptException $e) {

    }
```

## 加密解密
```php
    use Illuminate\Support\Facades\Crypt;

    // 加密
    $encrypted = Crypt::encryptString('Hello world.');
    dump($encrypted);

    // 解密
    $decrypted = Crypt::decryptString($encrypted);
    dump($decrypted);
```
