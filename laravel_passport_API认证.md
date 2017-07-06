Laravel Passport
================

## 1. 安装
> composer require laravel/passport

## 2.注册服务
在**config/app.php**中的**providers**添加:
> Laravel\Passport\PassportServiceProvider::class,  

添加数据库表
> php artisan migrate

生成访问令牌
> php artisan passport:install

## 3. 往user模型中添加
```php
<?php
namespace App\Models;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;
    protected $table = "ecs_users";
    protected $primaryKey = "user_id";
    // 自定义属性
    protected $username;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'password',
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'api_token'
    ];
    // 验证用户名
    public function findForPassport($username)
    {
        $this->username = $username;
        $user = DB::table($this->table)
            ->where('mobile_phone', '=', $username)
            ->whereNotNull('mobile_phone')
            ->first();
        if ($user) {
            $userObj = new User();
            $userObj->username = $username;
            return $userObj;
        }
        return false;
    }
    // 验证登陆密码
    public function validateForPassportPasswordGrant($password)
    {
        $data = DB::table($this->table)
            ->where('mobile_phone', '=', $this->username)
            ->whereNotNull('mobile_phone')
            ->select('password', 'ec_salt')
            ->first();
        $comparePassword = makeEcshopPassword($password, $data->ec_salt);
        return $data->password == $comparePassword;
    }
    
    // 返回user_id，laravel/passport组件默认使用id字段 ,这样才能获取当前的登陆信息
    public function getAuthIdentifier()
    {
        return DB::table($this->table)->where('mobile_phone', '=', $this->username)->value('user_id');
    }
}
```

## 4. 往AuthServiceProvider中boot方法添加:
```php
public function boot()
{
    $this->registerPolicies();
    Passport::routes();
    // 令牌有效期
    Passport::tokensExpireIn(Carbon::now()->addDays(15));
    Passport::refreshTokensExpireIn(Carbon::now()->addDays(30));
}
```

## 5. 修改conifg/auth.php中修改guards中的api的driver为passport
```php
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],

    'api' => [
        'driver' => 'passport',
        'provider' => 'users',
    ],
],
```
 
## 6. 第一次部署生成 Passport 需要的加密 keys 以便生成访问令牌，生成的 keys 将不会存放在源代码控制
> php artisan passport:keys

# 颁发访问令牌
## 方式1: 通过artisan命令
> php artisan passport:client

## 方式2: 通过JSON API

