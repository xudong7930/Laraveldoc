Laravel的API跨域问题
===================

##创建中间件Cors

	php artisan make:middleware Cors


##编辑Cors.php文件

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

## 注册中间件，编辑app/Http/Kernel.php
	protected $middleware = [
	    \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,

	    \App\Http\Middleware\Cors::class,
	];
