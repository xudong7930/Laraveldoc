Laravel的图像处理
==================

##1.安装
> composer require intervention/image
> composer require intervention/imagecache  

##2.注册服务app.php
```php
'providers' => [
    Intervention\Image\ImageServiceProvider::class
]

'alias' => [
    'Image' => Intervention\Image\Facades\Image::class
]
```

##3.复制配置文件
> php artisan vendor:publish --provider="Intervention\Image\ImageServiceProviderLaravel5"


## 4.使用
[官网API](http://image.intervention.io)

```php
Route::get('/', function(){
    $img = Image::make('foo.jpg')->resize(300, 200);
    return $img->response('jpg');
});
```
