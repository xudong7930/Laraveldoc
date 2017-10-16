laravel 正则
===========

# 基本元素
* 0-9 匹配数字
* A-Z 匹配大写
* a-z 匹配小写
* \d 匹配数字0-9
* \w 匹配字符A-Z,a-z,0-9
* \s 匹配空格,TAB等

## 开始和结束
* ^ 字符串开始
* $ 字符串结束

## 重复(repition)
1. * 匹配0个或多个
2. + 匹配1个或多个
3. ? 匹配0个或1个
4. {n} 匹配n个
5. {n, m} 最少n个,最多m个

## 通配符(wildcards)
* . 匹配单个字符: 字母,数字,空格等

## 转义(escaping)
* \ 匹配转义后的字符


## 区分大小写
* /你的正则表达式/gim
* g-全局匹配
* i-不区分大小写匹配
* m-多行匹配


## 字符集合
* [] 匹配中括中的一个字符: [123], [0-9]
* [^] 不匹配中括的一个字符: /a[^123]b/指不能是a1b,a2b,a3b
* () 捕获正则表达式中的组: 

```PHP 
    preg_match(/a[123]+b/, 'a2232b', $matches); //$matches=array(0=>"a2232b")
    preg_match(/a([123]+)b, 'a2232b', $matches); //$matches=array(0=>"a2232b", 1=>2232)
    
    $s = preg_replace('/\d+/', '--', 'abc123def'); // "abc--def"
    $s = preg_replace('/(\w+) and (\w+)/', '\1 or \2', 'Tom and Jerry'); // "Tom or Jerry"
```

* ?<name>正则  捕获的表达式组命名

```php
    preg_match(/([A-Za-z]+)\s([0-9]+)/, 'Jan 1992', $matches); //$matches=array(0=>'Jan 1992', 1=>'Jan', 2=>'1992');

    preg_match(/(?<month>[A-Za-z]+)\s(?<year>[0-9]+)/, 'Jan 1992', $matches); //$matches=array(0=>'Jan 1992', 'month'=>'Jan', 'year'=>'1992');
```


## PHP中的正则
```php
$s = preg_replace($reg_exp, $replacement, $string);
preg_match($reg_exp, $string, $matches);
```
