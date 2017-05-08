Laravel的图像处理
==================

-[官网](http://image.intervention.io/)

##1.安装包
> php composer.phar require intervention/image

##2.集成到Laravel config/app.php
**$providers中**
> Intervention\Image\ImageServiceProvider::class

**$aliaes**
'Image' => Intervention\Image\Facades\Image::class

##3.复制配置文件
> php artisan vendor:publish --provider="Intervention\Image\ImageServiceProviderLaravel5"


## 4.使用
```php
Route::get('/', function(){
    $img = Image::make('foo.jpg')->resize(300, 200);
    return $img->response('jpg');
});
```

