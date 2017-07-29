laravel dusk
============

[laravel browser dusk](https://laravel.com/docs/5.4/dusk)


## 1.安装
> composer require --dev laravel/dusk  

## 2.在appserviceprovider.php中register方法添加
```php
use Laravel\Dusk\DuskServiceProvider;

if ($this->app->environment() !== 'production') {
    $this->app->register(DuskServiceProvider::class);
}
```

## 3.配置.evn
> APP_URL=http://localhost:8000

## 4.安装相关的文件
> php artisan dusk:install  
> php artisan dusk:make RegisterTest "创建测试文件"  
> php artisan dusk "执行测试"  
> php artisan dusk --group=Home "执行指定组的测试"  

## 5.编写tests/RegisterTest.php测试例子
```php
    public function testExample()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                    ->clickLink('Register')
                    ->assertSee('Register')
                    ->value('#name', 'xuergou')
                    ->value('#email', 'xuergou@qq.com')
                    ->value('#password', 'abc123')
                    ->value('#password-confirm', 'abc123')
                    ->click('button[type="submit"]')
                    ->assertPathIs('/home')
                    ->assertSee('You are logged in!');
        });
    }
```


