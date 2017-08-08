laravel event&listener
=====================

用户注册后将触发发送邮件和分配账户组的2个事件.

## 1.编辑UserController.php添加
```php
    public function testevent()
    {
        // 事件触发
        event(new \App\Events\UserAccessed('User Accessed!'));
        echo "done";


        // 自定义事件的触发
        event('user.login', ["event_name", ['id'=>1, 'event'=>'your event data']]);
        event('admin.login', ['id'=>1, 'event'=>'your event data']);
    }
```

## 2.编辑app/Providers/EventServiceProvider.php添加
2-1.注册事件
```php
    // event 和 listener的map关系
    protected $listen = [
        // 定义UserAccessed 事件
        'App\Events\UserAccessed' => [
            'App\Listeners\SendActivationCode', // 触发后 发送激活码
            'App\Listeners\AssignUserRole' // 触发后 分配账户组
        ],
    ];


    // 注册自定义事件
    public function boot()
    {
        parent::boot();

        Event::listen('user.login', function($eventName, array $data) {
            dump('user_event: '.$eventName);
            dump('user_event_data:');
            dump($data);

            (new \App\Listeners\MailNotification($data))->handle($eventName);
        });

        Event::listen('admin.*', function($eventName, array $data) {
            dump('admin_event:'.$eventName);
            dump('admin_event_data:');

            dump($data);
        });
    }
```

2-2.生成相关的Listener
> php artisan event:generate  //生成event 和 listener  文件
> php artisan make:event NewUserRegister  // 生成event文件
> php arisan make:listener SendUserActivationMail // 生成listener文件

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

// 实现了ShouldQueue那么这个listener的handle将会在队列中执行
class SendActivationCode implements ShouldQueue
{
    use InteractsWithQueue;

    // the name of the connection the job should be sent to.
    public $connection = 'sqs'

    // the name of then queue the job should sent to.
    public $queue = 'listeners';

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function handle(UserAccessed $event)
    {
        \Log::info('activation', ['event'=>$event->data, 'data'=>'send activation data']);
        
        // 使用InteractsWithQueue trait,可以对队列job操作
        $this->delete();
        $this->release(30);

        return false; // 停止事件传播
    }

    // 异常hanlde的处理
    public function failed(UserAccessed $event, $exception)
    {

    }
}

```

app/Listeners/AssignUserRole.php文件也一样.

## 5. 测试
访问:
> http://localhost:8000/testevent  

查看laravel.log的日志,已经触发了2个事件







# 事件订阅
1.在EventServiceProvider.php中
```php
    protected $subscribe = [
        'App\Listeners\UserEventSubcriber',
    ];
```

2.新建订阅UserEventSubscriber.php
```php
<?php

namespace App\Listeners;

class UserEventSubcriber
{
    public function onUserLogin($event)
    {
        
    }

    public function onUserLogout($event)
    {
        
    }

    // 订阅事件
    public function subscribe($events)
    {
        $events->listen(
            'App\Events\UserLogout', 
            'App\Listeners\UserEventSubcriber@onUserLogout'
        );
    }
}
```

3.新建Logout事件文件
> php artisan make:event Logout  

4.触发该事件
```php
use App\Events\UserLogout;

event(new UserLogout;
```
