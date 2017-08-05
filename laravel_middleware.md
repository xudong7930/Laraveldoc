Laravel Middleware
==================


middleware针对HTTP请求进行处理

## 
1.创建中间件
> php artisan make:middleware Admin

2.在kernel.php中注册中间件
```php
'admin' => \App\Http\Middleware\Admin::class,
```

3.使用中间件
web.php文件中:
```php
Route::get('/home', function(){

})->middleware('admin');
```

AdminMiddleware.php文件
```php
use Auth;

public function handle($request, Closure $next) 
{

    if (!Auth::check()) {
        return redirect('/home');
    }

    return $next($request);
}
```















