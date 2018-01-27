Laravel Localization
===================

## 1. 创建语言路由
```PHP
Route::get('/lang/{lang}', function($lang) {
	cache(['locale' => $lang], \Carbon\Carbon::now()->addDay(1));
	return back();
});	
```

## 2. 创建路由中间件, 并加入中间件$middleware

> php artisan make:middleware Localization

编辑Localization.php
```PHP
public function handle($request, Closure $next)
{
    $locale = \Cache::has('locale') ? \Cache::get('locale') : config('app.locale');
    app()->setLocale($locale);

    return $next($request);
}
```

## 3.创建不同的语言文件
**resources/lang/en/app.php**
**resources/lang/cn/app.php**

```PHP
return [
	"Username" => "用户名"
]
```

## 4.使用语言变量
```PHP
<div class="header">{{ __("app.Username") }}</div>
```