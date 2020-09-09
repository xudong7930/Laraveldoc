
```php
$users = User::with('log')->get();

$users = User::with(['log'=>function($query){
	$query->select('id', 'content');
}]);

```





