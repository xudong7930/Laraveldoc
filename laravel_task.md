Laravel Task Scheduling
=======================


## 将如下命令添加到crontab中
> * * * * * php /Users/xudong7930/Desktop/taskscheduling/artisan schedule:run >> /dev/null 2>&1

## 任务
```php
    protected function schedule(Schedule $schedule)
    {
        $schedule->timezone('Asia/Shanghai');
        // 执行自定义PHP命令
        $schedule->call(function(){
            $now = date('H:i:s');
            \Log::info("current time: ".$now);
        })->everyMinute();      

        // 执行Artisan命令
        $schedule->command('email:send --force')->daily();

        // 执行shell命令
        $schedule->exec('node index.js')->daily();

        // true/false约束
        $schedule->exec('ipconfig')->daily()->when(function(){
            return true;
        })

        // 如果任务已经在运行,则不必再次运行
        $schedule->command('emails:send')->withoutOverlapping();

        // 执行结果输出
        $schedule->command('emails:send')->daily()->sendOutputTo("/data/out.log");
        $schedule->command('emails:send')->daily()->appendOutputTo("/data/out.log");
        $schedule->command('emails:send')->daily()->emailOutputTo("xudong7930@126.com");

        // hook钩子
        $schedule->command('emails:send')
            ->daily()
            ->before(function(){

            })
            ->after(function(){

            });
    }
```
