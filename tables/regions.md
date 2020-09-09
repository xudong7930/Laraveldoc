
#地区表

```php
Schema::create('regions', function (Blueprint $table) {
    $table->increments('id');
    $table->integer('parent_id')->unsigned()->comment('上级ID');
    $table->string('region_name', 60)->comment('区域名称');
    $table->string('region_code', 20)->comment('区域编码');
    $table->string('parent_path', 50)->comment('上级路径');
});
```
