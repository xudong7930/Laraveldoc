PHP-FIG编码标准
===============

* PSR-0 (Autoloading Standard) 自动加载标准 
* PSR-1 (Basic Coding Standard) 基础编码标准 
* PSR-2 (Coding Style Guide) 编码风格向导 
* PSR-3 (Logger Interface) 日志接口
* PSR-4 (Improved Autoloading) 自动加载的增强版,替换掉PSR-0
* PSR-7 (Http Message) HTTP消息接口

## psr-0 (过时)
## psr-1
* PHP文件必须使用 **<?php** 和 **<?=**
* PHP源码必须不带BOM的UTF-8
* 一个源文件建议只做一件事: 输出信息,类,配置文件等
* namespace 和 class 必须遵守psr-0
* class必须使用UserController写法
* 类中的常量只能是大写字母和下划线
* 方法名称必须使用stduyHard写法

## psr-2 
* 文件末尾必须空一行
* 必须使用Unix LF(换行)作为行结束符
* 纯PHP代码源文件的关闭标签?>必须省略
* 必须使用4个空格来缩进，不能使用Tab键
* 一行推荐的是最多写80个字符
* PHP关键字必须小写: true|false|null
* 命名空间(namespace)的声明后面必须有一行空行
* 所有的导入(use)声明必须放在命名空间(namespace)声明的下面
* 一句声明中，必须只有一个导入(use)关键字
* 在导入(use)声明代码块后面必须有一行空行
* 继承(extends) 和实现(implement) 必须和 class name 写在一行，切花括号要换行写
```php
<?php
namespace Lib\Databaes;
 
class Mysql extends ParentClass implements \PDO, \DB // 写一行
{ // 换行写{
     
}
```
* 属性(property)必须声明其可见性: public,protected,private,不能使用var
* 方法(method)，必须 声明其可见性，到底是 public 还是 protected 还是 private，不能省略。并且，花括号{必须换行写。如果有多个参数，第一个参数后紧接, ,再加个空格，且函数name和( 之间必须要有个空格：function_name ($par, $par2, $pa3), 如果参数有默认值，也要用左右空格分开

* 当用到抽象(abstract)和终结(final)来做类声明时，它们必须放在可见性声明 （public 还是protected还是private）的前面。而当用到静态(static)来做类声明时，则必须放在可见性声明的后面。
```
<?
abstract class some
{
    abstract public some();
    final public static some2()
    {

    }
}
```

* 流程控制: if,switch,while,for,foreach
```php
<?php

if ($some) {

} elseif ($some2) {

} else {

}

switch ($some) {
    case 0:
        echo 'some';
        break;
    case 2:
    default:
        echo "some2";
        break;
}

while ($some) {

}

do {

} while ($some)

for ($i = 0; $i < 10; $i++) {
    // for body
}

foreach ($stome as $k => $val) {
    // foreach body
}

try {

} catch (SomeException $e) {

}
```

## psr-3
* 接触不多,算了

## psr-4
* 废除了PSR-0中_就是目录分割符的写法
* 类文件名要以 .php 结尾
* 类名必须要和对应的文件名要一模一样，大小写也要一模一样

## psr-7