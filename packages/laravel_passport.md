Laravel Passport
================

## 1. 安装
larale5.3:
> composer require laravel/passport=~1.0

laravel5.4
> composer require laravel/passport


## 2.注册服务
文件app.php:
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

## 4. 注册passport路由
AuthServiceProvider.php
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

## 5. 设置API的驱动为Passport
auth.php
```php
'guards' => [
    'api' => [
        'driver' => 'passport',
        'provider' => 'users',
    ],
],
```
 
## 6. 第一次部署生成 Passport 需要的加密 keys 以便生成访问令牌，生成的 keys 将不会存放在源代码控制
> php artisan passport:keys

# 颁发访问令牌
## credential授权类型
> php artisan passport:client
> php artisan passport:client --personal --name=xuergou

取得access token:
POST http://domain.com/oauth/token
grant_type: client_credentials
client_id: 3
client_secret: g1SDZzsSVFlgl7TIKz8Zpeehy1bvQzeXh1YDek6V

使用access token取得数据
http://domain.com/api/products
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhb...

## password授权类型
* 生成访问令牌
> php artisan passport:client --password

* 取得access token
POST http://domain.com/oauth/token
grant_type: password
client_id: 4
client_secret: EIbmxEMjMBneR6XFZrUG2tmlQ8I4RxOMFVEsouOS

* 使用access token取得数据
http://domain.com/api/products
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhb...


* 刷新access token
POST http://domain.com/oauth/token
grant_type: refresh_token
client_id: 4
client_secret: EIbmxEMjMBneR6XFZrUG2tmlQ8I4RxOMFVEsouOS
refresh_token: eyJ0eXAiOiJKV1QiLCJhb...


## web request 授权类型
GET http://localhost:8000/oauth/authorize?client_id=4&redirect_uri=http://localhost&response_type=token
**redirect_uri要跟数据库保持一致**


## code 授权类型(OAuth2)
* GET http://localhost:8000/oauth/authorize?client_id=3&redirect_uri=http://localhost/auth/callback&response_type=code
**client_id需要关联用户ID,redirect_uri要跟数据库保持一致**

> http://localhost/auth/callback?code=def50200dff157d5b95840f9c106c9dc5c96a4437815c913d52b320c82983829a6a04aa31926265ad6f42816773fa2604b5790ce91d3f8db65b8d98ae7ef31a9f86b45a25283a6ef603dd1852a2071a5a624ce49b108cda5f03594caf5c0f7623450e7dc2d6081553e383685c7428f9b24611ecbfdf57563758ebcd2e16d704bdcdfa6aeca83613e2b7328e6670f9297da48fa553e2626fbbb0ccbcca7d55674330342331ab14829436f162c93f469316fba4787f48e09441b3a851b8fd020b6664e4be3e58d05db9b99277635ced2f9ab58deaacf38af3deb2bae77c799606bbe6553525153251e5f085d68d932b5c8362da2054eebda8da9273ba73eeec0d983b5ba8a95194c53479b27c7db681bf2c8f414ce4c3407faae621aeff39a7accdb59a1a35a5cdc2d13b48ec45653fc6de02d953157be9cca2758b7d17184e790e953bc2100991996a7d958807480af848cb7172f02b114cd1b57da4954794d8f07ba


* POST http://localhost:8000/oauth/token
client_id: 3
client_secret: g1SDZzsSVFlgl7TIKz8Zpeehy1bvQzeXh1YDek6V
redirect_uri: http://localhost
code: def50200dff157d5b95840f9c106c9dc5c96a4437815c913d52b320c82983829a6a04aa31926265ad6f42816773fa2604b5790ce91d3f8db65b8d98ae7ef31a9f86b45a25283a6ef603dd1852a2071a5a624ce49b108cda5f03594caf5c0f7623450e7dc2d6081553e383685c7428f9b24611ecbfdf57563758ebcd2e16d704bdcdfa6aeca83613e2b7328e6670f9297da48fa553e2626fbbb0ccbcca7d55674330342331ab14829436f162c93f469316fba4787f48e09441b3a851b8fd020b6664e4be3e58d05db9b99277635ced2f9ab58deaacf38af3deb2bae77c799606bbe6553525153251e5f085d68d932b5c8362da2054eebda8da9273ba73eeec0d983b5ba8a95194c53479b27c7db681bf2c8f414ce4c3407faae621aeff39a7accdb59a1a35a5cdc2d13b48ec45653fc6de02d953157be9cca2758b7d17184e790e953bc2100991996a7d958807480af848cb7172f02b114cd1b57da4954794d8f07ba
grant_type: authorization_code
**redirect_uri要跟数据库保持一致**




