php7.4新特性
===========


# 数组展开
```php

```

# null合并运算符
```php
// php7
$data['now'] = $date['now'] ?? time();

// php7.4
$data['now'] ??= time();

print_r($data);
```

# 类属性
```php
class User {
	protected Department $department;
	protected string $name;
}
```

# 短闭包
```php
<?php 
$a = ['apple', 'google', 'ms', 'slack'];

// php7.4之前
$b = array_map(function($item){
	return $item  . strlen($item);
}, $a);

// php7.4
$c = array_map(fn($item) => $item.strlen($item), $a);
var_dump($b, $c);
```
