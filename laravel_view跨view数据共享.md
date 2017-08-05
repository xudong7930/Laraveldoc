laravel views
=============

## 往view传递数据
```php
return view('page.profile')->with([
    'ok'=>'your ok data'
]);
```

## 跨view共享数据
appserviceprofiver.php文件中:
```php
use Illuminate\Support\Facades\View;

public function boot()
{
    View::share('profile', 'your profile');

    // 所有的view共享数据
    View::composer('*', function($view) {
        $view->with([
            'auth' => ['uid'=>1, 'email'=>'xuergou@qq.com']
        ]);
    });
}
```

## 创建自定义的跨view数据共享

创建文件:
> php artisan make:provider ComposerServiceProvider  

在app.php中注册服务
> App\Providers\ComposerServiceProvider::class

编辑ComposerServiceProvider.php文件
```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;

class ComposerServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        
        View::composer(['pages.profile'], 'App\Http\ViewComposers\ProfileComposer');
    
        View::creator(['pages.settings'], 'App\Http\ViewComposers\SettingComposer');

    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}

```

创建ProfileComposer.php文件:
app\Http\ViewComposers\ProfileComposer.php

```php
<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;


class ProfileComposer
{
    public function __construct()
    {
        
    }

    /**
     * composer to run this
     *
     * @param View $view
     * @return view
     */
    public function compose(View $view)
    {
        $view->with([
            'married' => mt_rand(0, 1)
        ]);
    }
}
```

blade文件使用共享数据:
```php
{{ $married }}
```
