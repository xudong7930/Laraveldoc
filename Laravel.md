Laravel
=======

## 7.自定义全局函数
- 新建app/Helpers/functions.php文件，里面定义函数
- 在composer.json里面添加
```json
"autoload": {
    "classmap": [
        "database"
    ],
    "psr-4": {
        "App\\": "app/"
    },
    "files": [
        "app/helpers/functions.php"
    ]
},
```
- 执行: composer dump-autoload
- 开始使用你的自定义函数


## 6.composer命令
> composer show //查看安装了哪些包   
> composer clearcache //清空缓存  
> composer selfupdate //更新  
> composer update xudong7930/alidayu //更新指定包  

## 5. 在linux上部署Laravel
> - chmod 777 -R storage && chmod 777 database && chmod 777 database/database.sqlite
>

## 4. blade模板加载js,css文件 ##
```javascript
<script src="{{ URL::asset('/js/jQuery.js') }}"></script>
```

## 3. 清除Cache
> php artisan view:clear;php artisan route:clear;php artisan config:clear;php artisan cache:clear;php artisan clear-compiled  
> composer clearcache && composer dumpautoload  
> php artisan optimize  


## 2.配置Nginx

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


## 1. 安装
> composer create-project --prefer-dist laravel/laravel blog 5.3.*


****

## 数据库迁移和回滚

### 创建数据表
> php artisan make:migration create_users3_table --table=users3 --create=users3

> 删除migrations中的文件后，执行一下__composer.phar dumpautoload__

### 创建字段
		// database/migrations/表文件.php
	  Schema::create('users', function (Blueprint $table) {
	      $table->increments('id');
	      $table->string('name');
	      $table->string('email');
	      $table->string('mobile');
	      $table->smallInteger('sex');
	      $table->timestamps();
	  });

### 执行迁移，创建表
> php artisan migrate //迁移  
> php artisan migrate:reset  //重置  
> php artisan migrate:refresh //重置并迁移  
> php artisan migrate:refresh --seed //重置并迁移并填充数据  


### 表数据填充1-Eloquent ###
> database/seeds/DatabaseSeeder.php文件

		use Illuminate\Support\Facades\DB;
	  public function run()
	  {
	      DB::table('users')->insert([
	          'name' => str_random(10),
	          'email'=> str_random(10).'@'.str_random(4).".com",
	          'mobile' => mt_rand(15811448243, 15911448243),
	          'sex' => mt_rand(1,2)
	      ]);
	  }

> php artisan db:seed //执行填充器


### 表数据填充2-模型工厂 ###
#### 1.创建模型文件和迁移文件
> php artisan make:model Flights -m

#### 2.创建表

		// database/migrations/表文件.php
	  Schema::create('users', function (Blueprint $table) {
	      $table->increments('id');
	      $table->string('name');
	      $table->string('email');
	      $table->string('mobile');
	      $table->smallInteger('sex');
	      $table->timestamps();
	  });

> php artisan migrate

#### 3.添加Model中可填充字段

		// app/Models/Fligts.php
		protected $fillable = [
        'name', 'flyno', 'flystart', 'flyend',
    ];


#### 4.模型工厂

		// database/factories/ModelFactory.php文件
		// flights
		$factory->define(App\Models\Flights::class, function (Faker\Generator $faker) {

		    return [
		        'name' => $faker->name,
		        'flyno' => mt_rand(129332,192011),
		        'flystart' => date('Y-m-d'),
		        'flyend' => date('Y-m-d', time()-24*3600*5),
		    ];
		});

#### 5.填充数据

		// database/seeds/DatabaseSeeder.php
		factory('App\Models\Flights', 14)->create();

> php artisan db:seed

> php artisan tinker
> factory('App\Models\Flights', 14)->create();






