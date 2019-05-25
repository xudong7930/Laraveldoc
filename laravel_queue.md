laravel queue队列
================

## 1.队列驱动
> QUEUE_DRIVER=database

## 2.创建队列表
> php artisan queue:table
> php artisan queue:failed-table   
> php artisan migrate  

### 3. 创建相关文件
3-1.创建Job任务类
> php artisan make:job DoheavyStuff  

3-2.编写job逻辑
在App/Jobs/DoheavyStuff的文件中:
```php
<?php

namespace App\Jobs;

use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Intervention\Image\Facades\Image;

class DoheavyStuff implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    
    // for laravel55: job max attempt.
    public $tries = 5;
    
    // for laravel54+: job can run max numbers of seconds
    public $timeout = 120;

    public $file;
    
    // for laravel55: retry this failed job 120s later
    public function retryUtil()
    {
        return now()->addSeconds(120);
    }

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(String $file)
    {
        $this->file = $file;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $image = Image::make(storage_path('app/public').'/'.$this->file);
        $image->insert(storage_path('app/public/github.png'))->save();
    }

    /**
     * The job failed to process
     * 
     * @param Exception $exception
     * @return void
     */
    public function failed(Exception $exception) 
    {
        // 失败的队列将会保存到failed-job表
        // 队列执行失败的处理, etc...
    }
}

```

3-3.使用job在UserController.php中
```php
use Carbon\Carbon;

// 处理上传文件
public function store(Request $request)
{
    $file = $request->file('yourfile')->store('uploads', 'public');

    // for laravel54: 延迟10分钟执行
    $job = (new DoheavyStuff($file))->delay(Carbon::now()->addMinutes(10));
        ->onQueue('watermark') // 委派到指定的队列
        ->onConnection('database') // 委派到指定的连接

    $this->dispatch($job);
    
    // for laravel55: 延迟10分钟执行
    DoheavyStuff::dispatch($file)
        ->delay(carbon::now()->addMinutes(10))
        ->onQueue('watermark')
        ->onConnection('database');
    
    // for laravel55: 使用helper函数
    dispatch((new Job)->onQueue('watermark'));
    
    // for laravel55: 链式调用多个任务到队列
    ProcessPodcast::withChain([
        new OptimizePodcast,
        new ReleasePodcast
    ])->dispatch();

    echo 'done';
}
```

## 4.测试(注意添加connection 和 --queue参数)
* php artisan queue:work sqs --queue=default "运行指定连接的队列任务"
* php artisan queue:work redis --queue=sendsms,sendemail --tries=4 "执行redis 发送短信队列的队列, 最多执行4次, sms队列优先email队列"
* php artisan queue:work --once "每次处理一个任务(only process a single job from queue)"

* php artisan queue:listen redis --queue=default "监听指定连接的队列,并即时执行"
* php artisan queue:failed "查看失败的任务"
* php artisan queue:forget 1 "移除ID=1的失败任务"
* php artisan queue:flush "移除所有失败任务"
* php artisan queue:restart "重启队列,尤其是重新部署代码后需要重启"
* php artisan queue:retry 5 "重新执行失败ID=5的队列"
* php artisan queue:retry all "重新执行所有的失败队列"


## 5.使用supervisor以daemon方式执行队列
centos:
> yum -y install supervisor  

ubuntu:
> apt-get -y install supervisor

vim /etc/supervsor/conf.d/laravel.conf 添加:
```bash
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /home/vagrant/code/artisan queue:work database --sleep=3 --tries=3
autostart=true
autorestart=true
user=vagrant
numprocs=8
redirect_stderr=true
stdout_logfile=/home/vagrant/code/queue.log
```

启动supervisor
> supervisord -c /etc/supervisord.conf  
> supervisorctl -c /etc/supervisord.conf
> supervisorctl restart all

step_1.读取可用的组
> supervisorctl reread  

step_2.更新
> supervisorctl update  

step_3.启动指定的worker
> supervisorctl start laravel-worker:* 
> supervisorctl restart all


开机启动supervisor
vim /usr/lib/systemd/system/supervisord.service

```bash
[Unit]
Description=Process Monitoring and Control Daemon
After=rc-local.service nss-user-lookup.target

[Service]
Type=forking
ExecStart=/usr/bin/supervisord -c /etc/supervisord.conf
ExecStop=/usr/bin/supervisord shutdown
ExecReload=/usr/bin/supervisord reload
KillMode=process
Restart=on-failure
RestartSec=42s

[Install]
WantedBy=multi-user.target
```

systemctl enable supervisord.service