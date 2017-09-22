Laravel Memory Database Testing
===============================

## 数据库配置.env
DB_CONNECTION=sqlite
DB_DATABASE=:memory:


## ExampleTest.php
```php
<?php

namespace Tests\Feature;

use App\Dog;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class ExampleTest extends TestCase
{

    public function setUp()
    {
        parent::setUp();
        Artisan::call('migrate');
    }

    public function testBasicTest()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_fetches_adult_dogs()
    {
         Dog::create(['name'=>'River', 'age'=>1]);
         Dog::create(['name'=>'Spotty', 'age'=>7]);

         $dogs = Dog::adults()->get();
         $this->assertCount(2, $dogs); 
    }
}

```


## App\Dog.php
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dog extends Model
{
    protected $fillable = ['name', 'age'];

    public function scopeAdults($query)
    {
        return $query;
    }
}
```

## 测试
phpunit