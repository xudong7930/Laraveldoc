Laravel Cache
=============

## 基础用法
```php
<?php

use Illuminate\Support\Facades\Cache;

Illuminate\Support\Facades\DB::listen(function($query){dump($query->sql);});

// 设置缓存
Route::get('/', function () {

    if (!Cache::has('foo')) {
        Cache::put('foo', 'bar', 10);    
    }

    // 上面代码等价于
    $f = Cache::add('foo', 'bar', 10); // true|false

    Cache::forever('foo', 'bar'); // 永久保存

    dump('done');
});

// 取得缓存
Route::get('/get', function() {

    // 默认值 是闭包函数返回的结果.
    return Cache::get('users', function () {
        return App\User::all();    
    });

    return Cache::get('bar', 'default bar'); // 默认值

    // 判断是否存在
    if (Cache::has('foo')) {
        return Cache::get('foo');
    }

    return null;
});

// 移除 和 清空
Route::get('del', function() {
    if (Cache::has('foo')) {
        Cache::forget('foo');
    }

    Cache::flush(); // 移除所有

    dump('done');
});

// 自增,自减
Route::get('crement', function() {
    Cache::increment('key');
    Cache::increment('key', 5);
    Cache::decrement('key');
    Cache::decrement('key', 5);
});

// 存储和检索
Route::get('users', function() {
    return Cache::remember('users', 10, function () {
        return App\User::all();
    });
});
```

## 自定义缓存驱动
> 参考文档
