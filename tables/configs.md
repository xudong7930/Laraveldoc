#配置表
```php
Schema::create('configs', function (Blueprint $table) {
    $table->increments('id');
    $table->string('key', 250)->unique()->comment('配置名称');
    $table->string('value', 250)->nullable()->comment('配置值');
    $table->text('note', 250)->nullable()->comment('备注');
    $table->string('version', 250)->nullable()->default(0)->comment('配置版本');
});
```
