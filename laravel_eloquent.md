Laravel Eloquent
================

## 创建Model
pa make:model User "仅创建Model文件"
pa make:model Post -m  "创建Model,同时创建migrate文件"
pa make:model Blog -c  "创建Model,同时创建empty controller文件" 
pa make:model Cart -r  "创建Model,同时创建resource controller文件"

## User.php
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable, SoftDeletes;
    
    // 指定的字段自动转换: integer, real, float, double, string, boolean, object, array, collection, date, datetime, and timestamp.
    protected $casts = [
        'created_at' => 'timestamp'
    ];
    
    // enable soft delete. 在factory里: $table->softDeletes(); 
    protected $dates = ['deleted_at'];

    // specify table.
    protected $table = 'users';

    // specify primary key, default is ID.
    protected $primaryKey = 'id';

    // specify primary key auto increment.
    public $incrementing = true;

    // whether to keep created_at and updated_at field.
    public $timestamps = true;

    // specify your own date formate.
    protected $dateFormat = 'Y-m-d H:i:s';

    // custom field name.
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    // specify database connection name.
    protected $connection = 'mysql';

    /**
     * The attributes that are mass assignable.
     * 可分配的值的字段, whitelist, 不能跟guarded同时使用
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    // 不可分配的字段, blacklist, 不能跟fillable同时使用
    // protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    // The attributes that should be visible for arrays. 
    protected $visible = [
        'email', 'name'
    ];

    // 在返回的数据中添加full_name字段
    protected $appends = ['full_name'];

    // 取得full_name的方法
    public function getFullNameAttribute()
    {
        return $this->attributes['name']."(".$this->attributes['email'].")";
    }
}
```

## 控制器
```php
<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Facades\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UserController extends Controller
{
    public function index()
    {

        // // 查询所有
        // $users = User::all();
        // dump($users);

        // foreach ($users as $user) {
        //     echo $user->name;
        // }

        // // 分段查询
        // User::chunk(10, function ($users) {
        //     foreach ($users as $user) {
        //         echo $user->name . PHP_EOL;
        //     }
        // });
        

        // // 游标查询
        // foreach (User::orderBy('id')->cursor() as $user) {
        //     echo $user->name.PHP_EOL;
        // }
        

        // // 单条查询
        // $user = User::find(1);
        // echo $user->email.PHP_EOL;
        

        // // 多条查询取一条
        // $user = User::where('id', '<', 4)->first();
        // dump($user->email);

        // // 多条查询
        // $users = User::find([1,2,3]);
        // dump($users);
        

        // // 查询异常
        // try {
        //     $user = User::findOrFail(100);    
        //     dump('123');
        // } catch (NotFoundHttpException $e) {
        //     dump("user not found");
        // }
    

        // // 统计查询
        // $totalUser = User::count();
        // $maxUid = User::min('id');
        // dump($totalUser, $maxUid);
        
        
        // 查询软删除
        $users = User::withTrashed()->get();
        $users = User::onlyTrashed()->get();


        return $user->toArray(); // 转为array
        return $user->toJson(); // 转为json
        return $user->makeVisible('password')->toJson(); // 临时显示
        return $user->makeHidden('email')->toJson(); // 临时隐藏
        return $user->created_at->getTimestamp(); // 取得时间戳
    }   

    public function store(Request $request)
    {
        // 新增
        $user = new User;
        $user->name = 'xuergou';
        $user->email = 'xuergou@gmail.com';
        $user->password = encrypt('abc123');
        $user->save();
        dump('done');
    }

    public function save(Request $req)
    {
        // // update
        // $user = User::find(511);

        // if (!isset($user)) {
        //     dd('user not exist');
        // }

        // $user->name='xudong7930';
        // $user->save();
        // dump('done');
        

        // mass update
        $res = User::where('id', '>', 50)
            ->update(['name'=>'ergou', 'email'=>'ergou@domain.com']);
        dump('mass update done.');
        
    }

    public function create(Request $request)
    {
        // // basic create
        // $user = User::create([
        //     'name' => 'doulina2',
        //     'email' => 'doulina2@qq.com',
        //     'password' => bcrypt('abc123')
        //     ]);

        // dump('new user has been created');
    }

    public function destroy()
    {
        // 未启用软删除
        User::find(1)->delete();
        // User::destroy(1);
        // User::destroy([1,2,3]);
        
        // 启用了软删除
        User::find(1)->delete();
        User::find(1)->restore(); // 回复软删除
        User::find(1)->forceDelete(); 
    }
}

```
