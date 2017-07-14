laravel event&listener
=====================

用户注册后将触发发送邮件和分配账户组的2个事件.

## 1.编辑UserController.php添加
```php
    public function testevent()
    {
        event(new \App\Events\UserAccessed('User Accessed!'));
        echo "done";
    }
```

## 2.编辑app/Providers/EventServiceProvider.php添加
```php
    protected $listen = [
        // 定义UserAccessed 事件
        'App\Events\UserAccessed' => [
            'App\Listeners\SendActivationCode', // 触发后 发送激活码
            'App\Listeners\AssignUserRole' // 触发后 分配账户组
        ],
    ];
```
生成相关的监听器
> php artisan event:generate  

## 3. 编辑app/Events/UserAccessed.php添加:
```php

    public $data; // 参数传递

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
    }
```

## 4. 处理事件,编辑app/Listeners/SendActivationCode.php中的handle方法
```php
<?php

namespace App\Listeners;

use App\Events\UserAccessed;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendActivationCode implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserAccessed  $event
     * @return void
     */
    public function handle(UserAccessed $event)
    {
        \Log::info('activation', ['event'=>$event->data, 'data'=>'send activation data']);
    }
}

```

app/Listeners/AssignUserRole.php文件也一样.

## 5. 测试
访问:
> http://localhost:8000/testevent  

查看laravel.log的日志,已经触发了2个事件
