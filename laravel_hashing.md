Laravel Hashing
===============


## 加密/校验 密码
```php
    use Illuminate\Support\Facades\Hash;

    // make hash
    $pass = 'abc123';
    $hashed = Hash::make($pass);
    
    // check hash
    if (Hash::check($pass, $hashed)) {
        dump('same');
    } else {
        dump('diff');
    }

    // rehash
    if (Hash::needsRehash($hashed)) {
        $hashed = Hash::make('plain-text');
    }

    dump($hashed);
```

