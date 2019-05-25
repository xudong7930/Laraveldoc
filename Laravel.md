Laravel
=======

# 12.request获取参数:
```
$request->get('pageSize', 10);
```

# 11.model如果存在则更新，否则创建: updateOrCreate
```
$user = User::updateOrCreate(['email'=>'sbjsw@qq.com'], ['id'=>1,'email'=>'sbjsw@qq.com']);
```


# 10.laralvel数据库的严格模式:
config/database.php中:
```php
"strick" => true //改为false
```

## 9. Laraevl5.4使用whoops错误输出
step1: 安装whoops包
* composer require filp/whoops

step2: app/Exceptions/Handler.php
```php
protected function convertExceptionToResponse(Exception $e)
{
    if (config('app.debug')) {
        $whoops = new \Whoops\Run;
        $whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);

        return response()->make(
                $whoops->handleException($e),
                method_exists($e, 'getStatusCode') ? $e->getStatusCode() : 500,
                method_exists($e, 'getHeaders') ? $e->getHeaders() : []
            );
    }

    return parent::convertExceptionToResponse($e);
}
```


## 8. Laravel5.4执行Migrate报错"Syntax error or access violation: 1071 Specified key was too long; max key length is 767 bytes"
编辑AppServiceProvider.php
```php
use Illuminate\Support\Facades\Schema;

public function boot()
{
    Schema::defaultStringLength(191);
}
```


## 7.自定义全局函数
step1: 新建app/helpers.php文件，里面定义函数
setp2: 在composer.json里面添加

```json
"autoload": {
    "classmap": [
        "database"
    ],
    "psr-4": {
        "App\\": "app/"
    },
    "files": [
        "app/helpers.php",
    ]
},
```
step3: 执行: composer dump-autoload
step4: 开始使用你的自定义函数


## 6. blade模板加载js,css文件
```javascript
<script src="{{ URL::asset('/js/jQuery.js') }}"></script>
```

## 5. 清除Cache
> php artisan view:clear;php artisan route:clear;php artisan config:clear;php artisan cache:clear;php artisan clear-compiled  
> composer clearcache && composer dumpautoload  
> php artisan optimize  


## 4.配置Nginx
```bash
server {
    listen 80;
    server_name laravel.io;
    set $web_root /usr/local/www/newblog/public;
    location / {
        root $web_root;
        try_files \$uri \$uri/ /index.php?\$query_string;
        index index.html index.htm index.php;
    }
    location ~ \.php$ {
        root           $web_root;
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }
}
```


## 3. 安装laravel
composer create-project --prefer-dist "laravel/laravel=5.5.*" blog-project55
composer create-project --prefer-dist "laravel/laravel=5.4.*" blog-project54
composer create-project --prefer-dist "laravel/laravel=5.3.*" blog-project53
composer create-project --prefer-dist "laravel/laravel=5.2.*" blog-project52
composer create-project --prefer-dist "laravel/laravel=5.1.*" blog-project51


## 2. 创建数据库迁移文件
step1: 创建迁移文件
> php artisan make:migration create_users3_table --table=users3 --create=users3

(删除migrations中的文件后，执行一下**composer dumpautoload**)

step2: 为表设计字段
```php
Schema::create('users', function (Blueprint $table) {
    $table->increments('id');
    $table->string('name');
    $table->string('email');
    $table->string('mobile');
    $table->smallInteger('sex');
    $table->timestamps();
});
```
step3: 执行迁移创建表
php artisan migrate "迁移"
php artisan migrate:reset  "重置"
php artisan migrate:refresh "重置并迁移"
php artisan migrate:refresh --seed "重置并迁移并填充数据"


## 1. 数据填充
使用seeder填充数据:
step1: 在database/seeds/DatabaseSeeder.php
```php
use Illuminate\Support\Facades\DB;
public function run()
{
    DB::table('users')->insert([
        'name' => $faker->name
    ]);
}
```

step3: 执行填充
php artisan db:seed


使用Model和tingker填充数据
step1: 创建模型文件,迁移文件
    php artisan make:model User -m

step2: 设计表,并迁移到数据库中
step3: 在model文件中添加可填充字段
    protected $fillable = ['name'];

step4: 设计填充数据
    database/factories/ModelFactory.php
    $factory->define(App\Users::class, function(Faker\Generator $faker){
        return [
            'name' => $faker->name
        ];
    });

step5: 执行填充
使用seeder填充:
    database/seeds/DatabaseSeeder.php
    App\Models\Flights::truncate();
    factory('App\Models\Flights', 14)->create();
    
    php artisan db:seed

使用tinker填充:
    php artisan tinker
    factory('App\Flights', 14)->create();

## tinker的使用
进入tingker
> php artisan tinker  


tinker中的操作:
```php
DB::table('cards')->insert(['title'=>'My New Card', 'created_at'=>new DateTime, 'updated_at'=>new DateTime]);
DB::table('cards')->get();
DB::table('cards')->where('title', 'My New Card')->first();
DB::table('cards')->where('title', 'My New Card')->delete();
DB::listen(function($query){ var_dump($query->sql); });
```

模型:
> \App\Card::all();

保存数据
```
$note = new \App\Note;
$note->body='some note fot the card';
$note->card_id=1
$note->save();
```
