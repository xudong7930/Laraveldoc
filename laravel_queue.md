laravel queue队列
================

## 使用数据库队列
### 1.设置.env文件
> QUEUE_DRIVER=database

### 2.创建队列表
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

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Intervention\Image\Facades\Image;

class DoheavyStuff implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 120;

    public $file;

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
        // 队列执行失败的处理, etc...
    }
}

```

3-3.使用job在UserController.php中
```php
use Carbon\Carbon;

// 处理上传文件
public function store(Request $request)
{
    $file = $request->file('yourfile')->store('uploads', 'public');

    // 延迟10分钟执行
    $job = (new DoheavyStuff($file))->delay(Carbon::now()->addMinutes(10));
        ->onQueue('watermark') // 委派到指定的队列
        ->onConnection('database') // 委派到指定的连接

    $this->dispatch($job);

    
    echo 'done';
}
```



## 4.测试
* php artisan queue:work "运行队列的任务"
* php artisan queue:work redis --queue=sendsms,sendemail --tries=4 "执行redis 发送短信队列的队列, 最多执行4次, sms队列优先email队列"
* php artisan queue:failed "查看失败的任务"
* php artisan queue:forget 1 "移除ID=1的失败任务"
* php artisan queue:flush "移除所有失败任务"
* php artisan queue:restart "重启队列"
* php artisan queue:retry 5 "重新执行失败ID=5的队列"
* php artisan queue:retry all "重新执行所有的失败队列"


## 5.使用supervisor以守护进程方式启动队列
Centos:
> yum -y install supervisor  
> vim /etc/supervsor.d/laravel_sendsms.conf 添加:  

```
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /home/forge/app.com/artisan queue:work sqs --sleep=3 --tries=3
autostart=true
autorestart=true
user=forge
numprocs=8
redirect_stderr=true
stdout_logfile=/home/forge/app.com/worker.log
```

### 启动supervisor
> supervisorctl reread  
> supervisorctl update  
> supervisorctl start  laravel-worker:*  
