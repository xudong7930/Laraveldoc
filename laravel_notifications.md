Laravel Notification
====================


## 创建Notification
> php artisan make:notification OrderShiped 
> php artisan make:notification OrderShiped -m emails.notification.order-shiped
> php artisan vendor:publish --tag=laravel-notifications  

## 编写通知的逻辑

### 1. Mail Notify

1.配置.env文件的邮箱账号
2.创建Notify文件: App\Notifications\OrderShiped.php
```php
    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)->markdown('emails.notification.order-shiped')->with([
                'data' => $data
            ]);
    }    
```
3.用户模型: App\User.php
```php
<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function routeNotificationForMail()
    {
        return $this->email; // 包含邮件的字段
    }
}

```

4.控制器使用: UserController.php
```php
    use Illuminate\Support\Facades\Notification;
    use App\User;

    public function notifyByMail()
    {
        // notify by trait
        $user = User::find(1);
        $data = "your data";
        $user->notify(new OrderShiped($data));
        dump('done');

        // notify by facade
        $user = User::find(1);
        $data = "your darta";
        Notification::send($user, new OrderShiped($data));
        dump('done2');
    }

    public function accessNotify()
    {
        $user = User::find(1);

        // 所有notify
        foreach ($user->notifications as $notificaiton) {
            echo $notificaiton->type;
        }

        // 未读notify
        foreach ($user->unreadNotifications as $unreadNotification) {
            $unreadNotification->markAsRead(); // 标记为已读
            $unreadNotification->delete(); // 删除notify
        }
    }
```
5.自定义邮件样式 **可选**
> php artisan vendor:publish --tag=laravel-mail  


### 2.Database Notify
1.创建notifications表
> php artisan notifications:table  
> php artisan migrate  

2.创建notify文件 App\Notifications\OrderShiped.php
```php
    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'order_id' => 1,
            'order_number' => '1046457211',
            'order_amount' => 19.50
        ];
    }
```

### Broadcast Notify
> 暂无

### Slack
1. App\Notifications\Lessonpublichs.php
```php
public function via()
{
    return ['slack'];
}

public function toSlack()
{
    return (new SlackMessage)->content('some slack content message');
}
```

2. App\User.php
```php
public function routeNotificationForSlack()
{
    return "https://hooks.slack.com/services/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";
}
```


### 自定义Notify
1.新建app\Channels\RonglianSmsChannel.php文件
```php
<?php

namespace App\Channels;

use GuzzleHttp\Client;
use Illuminate\Notifications\Notification;

class RonglianSmsChannel
{

    public function send($notifiable, Notification $notification)
    {
        $smsConf = $this->getSmsConf();
        $batch = date("YmdHis");
        $signature = $this->makeSignature($smsConf['asid'], $smsConf['token'], $batch);
        $auth = $this->makeAuthorization($smsConf['asid'], $batch);
        $url = $this->makeUrl($smsConf['url'], $smsConf['version'], $smsConf['asid'], $signature);

        $smsContent = [
            'to' => $notifiable->mobile,
            'templateId' => $smsConf['template'],
            'appId' => $smsConf['appid'],
            'datas' => ['a','b','c','d','e','f','g']
        ];
        
        $client = new Client([
                'headers' => [
                    'Accept'=>'application/json',
                    'Content-Type'=>'application/json;charset=utf-8',
                    'Authorization'=>$auth
                ]
            ]);
        $res = $client->request('POST', $url, ['body'=>json_encode($smsContent)]);
        $data = $res->getBody();
        
        \Log::info('sms response data:'.$data);
    }

    public function getSmsConf()
    {
        return config('services.ytxsms');
    }

    public function makeSignature($asid, $token, $batch)
    {
        return strtoupper(md5($asid.$token.$batch));
    }

    public function makeAuthorization($asid, $batch)
    {
        return base64_encode($asid.":".$batch);
    }

    public function makeUrl($url, $version, $asid, $signature)
    {
        return $url.$version.'/Accounts/'.$asid.'/SMS/TemplateSMS?sig='.$signature;
    }
}

```

2.在创建的Notification文件中使用这个channel
```php
use App\Channels\RonglianSmsChannel;

public function via($notifiable)
{
    return [RonglianSmsChannel::class];
}

public function toRonglianSms($notifiable)
{
    return [
        'content' => 'you sms data'
    ];
}
```


## notification 事件
1.在EventServiceProvider.php文件中
```php
protected $listen = [
    'Illuminate\Notifications\Events\NotificationSent' => [
        'App\Listeners\LogNotification',
    ],
];
```
2.生成事件文件
> php artisan event:generate

3.在LogNotification中进行处理
```php
public function handle(NotificationSent $event)
{
    dump($event); // notifyevent
}
```
