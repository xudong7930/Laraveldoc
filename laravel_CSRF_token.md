Laravel CSRF TOKEN
==================


## form表单中应该包含_token字段
```html
<form method="POST" action="/profile">
    {{ csrf_field() }}
    {{ method_field('PUT|DELETE') }}
</form>
```

## javascript项目中可以在meta字段中
```javascript
<meta name="csrf-token" content="{{ csrf_token() }}">

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
```


## 排除无需验证的路由
VerifyCsrfToken.php文件中:
```php
    protected $except = [
        'stripe/*'
    ];
```