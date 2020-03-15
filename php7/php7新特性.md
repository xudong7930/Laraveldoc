PHP7新特性
=========

# 函数中声明参数类型和返回类型
```php
// 参数类型: int, float, string, bool, interfaces, array, callable
// 返回类型: int, float, string, bool, interfaces, array, callable, void
function sum(int $a, int $b): int
{
	return $a + $b;
}

echo sum(2, 1);
```

# 合并运算符: ?? 判断变量是否存在且值不为NULL ?: 判断变量是否为空
```php
// php7之前
$name = isset($_GET['name']) ? $_GET['name'] : '';
$name = $_GET['name'] ?? '';

$age = !empty($_GET['age']) ? $_GET['age'] : 0;
$age = $_GET['age'] ?: 0;
```


# 比较运算符<=>
```php
print( 1 <=> 1); // 0
print( 1 <=> 2); // -1
print( 2 <=> 1); // 1
```

# 常量数组
```php
define('sites', [
	'GOOGLE',
	'APPLE',
	'MS'
]);
echo sites[1]; // APPLE
```

# 闭包函数动态绑定并调用
```php

```

# 新函数intdiv
```php
// 取整
echo intdiv(10,3);  // 3
```

# 伪随机数产生器CSPRNG
```php
// 加密生成被保护的伪随机字符串
echo bin2hex(random_bytes(6));

//加密生成被保护的伪随机整数
echo random_int(1, 100);
```


# 多个use合并
```php
// php7之前
use App\Models\User as ModelUser;
use App\Models\Department;

// php7之后
use App\Models\{User as ModelUser, Department};
```
