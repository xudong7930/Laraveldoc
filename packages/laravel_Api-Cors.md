Laravel Api Cors
================

## 创建middleware
> php artisan make:middleware Cors

## 配置中间件
```php
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        // 允许的域名
        $allowDomains = [
            'http://localhost:8080'
        ];

        if (isset($request->server()['HTTP_ORIGIN'])) {

            $origin = $request->server()['HTTP_ORIGIN'];

            if (in_array($origin, $allowDomains)) {
                $response->headers->set('Access-Control-Allow-Origin', $origin);
                $response->headers->set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET,PUT,DELETE');
                $response->headers->set('Access-Control-Allow-headers', 'X-Requested-With, Origin, Accept, Content-Type, Authorization');
            }

        }

        return $response;
    }
```


## 在app/Http/Kernel.php中添加
```php
protected $middleware = [
    \App\Http\Middleware\Cors::class,
]
```
