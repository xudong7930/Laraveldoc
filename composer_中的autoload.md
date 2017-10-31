深入 Composer autoload
=====================


## 自动加载的类型
总体来说 composer 提供了几种自动加载类型:
1. classmap
2. psr-0
3. psr-4
4. files


## classmap加载
这应该是最最简单的 autoload 模式了。大概的意思就是这样的：
```php
{
    "autoload": {
        "classmap": ["src"]
    }
}
```
然后 composer 在背后就会读取这个文件夹中所有的文件 然后再 **vendor/composer/autoload_classmap.php** 中怒将所有的 class 的 namespace + classname 生成成一个 key => value 的 php 数组:
```php
<?php
return [
    "App\\Console\\Kernel" => $baseDir. '/app/Console/Kernel.php'
];
```
然后就可以光明正大地用 **spl_autoload_register** 这个函数来怒做自动加载了。

好吧 上面的例子其实有点 tricky 就是上面这个 autoload 实际上是根据 prs-4 来生成出来的。不过这不重要，了解底层重要点，我们可以看到所有的所谓的 autoloading 其实可以理解为生成了这么一个 classmap，这是 **composer dump-autoload -o**做的事儿。不然的话compoesr 会吭哧吭哧地去动态读取 psr-4 和 prs-0 的内容。


## psr-0
现在这个标准已经过时了.当初制定这个标准的时候主要是在 php 从 5.2 刚刚跃迁到 5.3+ 有了命名空间的概念。所以这个时候 psr-0 的标准主要考虑到了 <5.2 的 php 中 类似 Acme_Util_ClassName 这样的写法


## psr-4
最简单来讲就是可以把 prs-4 的 namespace 直接想想成 file structure
```php
{
    "autoload": {
        "psr-4": {
            "Acme\\", "src/"
        }
    }
}
```
对应的文件目录结构
```
vendor/
    acme/
        util/
            composer.json
            src/
                ClassName.php
```
可以看到将 Acme\Util 指向了 src 之后 psr-4 就会默认所有的 src 下面的 class 都已经有了 Acme\Util 的 基本 namespace，而 psr-4 中不会将 _ 转义成 \ 所以就没有必要有 psr-0 那么深得文档结构了。
```php
<?php

namespace Acme/Util;

clas ClassName {

}
```

## file
然而这还是不够。因为可能会有一些全局的 helper function 的存在。
这个写法很简单就不多看了。
```php
{
    "autoload": {
        "files": [
            "path/to/file.php"
        ]
    }
}
```
