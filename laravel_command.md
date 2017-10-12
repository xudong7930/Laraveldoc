Laravel Artisan Command
=======================


# 1.create command
> php artisan make:command UserCreatorCommand  

# 2.register command
app\Console\Kernel.php
```    
    protected $commands = [
        UserCreatorCommand::class
    ];
```

# 3.design command
```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class UserCreatorCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user-create'; // 无参数
    // protected $signature = 'user-create {username}'; // 参数必须
    // protected $signature = 'user-create {username?}'; // 参数可选
    // protected $signature = 'user-create {username=sbjsw}'; // 参数默认
    // protected $signature = 'user-create {username: the name you want to create}'; // 参数注解
    // protected $signature = 'user-create {username*} {--id=*}'; // 多个参数: pa user-create user1 user2 user3 --id=1 --id=2
 

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Rapitaly create an user in database';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // Console输出显示
        $this->info('All done, master'); // 绿色信息
        $this->error('Sorry, something is wrong, quit!'); // 红色错误
        $this->question('Are you crazy?'); // 蓝色问题
        $this->comment('show this command in console.'); // 黄色注释
        $this->line('add one more line to here.'); // 白色行


        // $username = $this->argument('username'); // 接收指定参数
        // $arguments = $this->arguments(); // 所有的参数
        // $options = $this->options(); // 所有的选项

        // 交互输入
        // $host = $this->ask('what is your host?');
        // $password = $this->secret('what is your password?');
        // $this->info('host: '.$host.PHP_EOL.'passwod:'.$password);
        
        // 确认
        // if ($this->confirm('all input are right?')) {
            // $this->info('confirmed');
        // }


        // 自动完成
        // $autoname = $this->anticipate('what is autocomplete?', ['Taylor', 'Otwell']);
        // $this->info('your autocomplete: '.$autoname);

        // 选择
        // $choosename = $this->choice('what is your gender?', ['boy', 'girl'], 0);
        // $this->info('your choose gender: '.$choosename);

        // 表格输出
        // $tableHeader = ['id', 'username', 'password'];
        // $tableBody = [
        //     [1, 'sb', '123123']
        // ];
        // $this->table($tableHeader, $tableBody);


        // 进度条
        // $bar = $this->output->createProgressBar(10);
        // for ($i=0; $i < 10; $i++) { 
        //     sleep(1.2);
        //     $bar->advance();
        // }
        // $bar->finish();
    
        // 调用其他console命令
        $this->call('email:send', [
            'to'=>'sbjsw@qq.com', 
            '--smtp'=>'smtp.mailtrap.io'
        ]);

        $this->callSilent('email:send', [
            'to'=>'sbjsw@qq.com', 
            '--smtp'=>'smtp.mailtrap.io'
        ]);
    }
}

```

# 4.run command
in console:
```bash
php artisan help yourcommand
php artisan yourcommand yourparam --youroption=someinfo
```

in browser:
```php
Route::get('foo', function() {
    $exitCode = Artisan::call('user-create', [
            'username' => 'xuergou',
            '--queue' => 'default',
            '--id' => [1,2],
            '--force' => true   
        ]);

    $exitCode2 = Artisan::queue('user-create', [
            'username' => 'sbjsw'
        ]);

});
```
