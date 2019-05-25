redis
=====


# 资料
* redis全称(remote dictionary server)
* 3个特点: 1.读写性能强悍，支持持久化保存 2.多种数据类型支持 3.主从支持，发布和订阅支持

# 安装和启动

```bash
wget http://download.redis.io/releases/redis-3.2.1.tar.gz
tar -zxf reids-3.2.1.tar.gz
cd redis-3.2.1
make && make PREFIX=/usr/local/redis install
cp redis.conf /usr/local/redis/

vim /usr/local/redis/redis.conf 修改:
    timeout 300
    daemonize yes
   logfile ''

#启动
cd /usr/local/redis
./bin/redis-server redis.conf

```

# redis shell操作
```bash

Redis服务器命令:

查看Redis服务器统计信息: info
   当前服务器时间: time
   异步保存数据到硬盘: save
   上次保存数据到硬盘的时间: lastsave
   客户端连接列表: client list
    获取连接的名称: client getname
   删除所有数据库所有key: flushall
   删除当前数据库所有key: flushdb
   当前服务器角色: role
   同步主从服务器: sync
   记录命令执行时间的日志: slowlog get 100
   总共几条slow log: slowlog len
   重置slow log: slowlog reset
   将当前服务器转为某个服务器的从服务器: slaveof 主机IP 端口
   将从服务器转为主服务器: slaveof no one
   关闭Redis服务: shutdown
   查看所有配置: config get *
查看指定配置: config get 配置名称
   临时设置配置: config set 参数名称 参数值
   设置当前连接名称: client setname 连接名称
   获取连接名称: client getname
   后台异步保存数据到硬盘: bgsave
   客户端和Redis服务器是否连通: ping  //正常返回PONG
   关闭客户端和服务器的连接: quit
   打印字符串: echo "字符串名称"
   查看是否需要密码: config get requirepass
   认证连接: auth 密码 //redis.conf配置文件设置requirepass 密码
   清空: clear

Redis键(key):

   设置键值: SET akey avalue
   删除键值: DEL akey
   获取键值: GET akey
   序列化键值: DUMP akey
   键是否存在: EXISTS akey
   指定过期时间: EXPIRE akey 30(秒)
   指定时间过期: EXPIREAT akey 123992223
   指定过期时间: PEXPIRE akey 2323毫秒
   查看所有键: KEYS *
查看指定键: KEYS /正则表达式/

Redis 字符串:
   设置键值: set lnmp "centos+ningx+php+mysql"
   获取键对应的值: get lnmp
   截取key值: getrange lnmp 0 3
    设置新值,返回旧值: getset lnmp "新的值"
    获取多个键值: mget key1 key2...
    设置键值和过期时间秒: setex lnmp 2 "linuxmysqlphp"
    在key不存在的时候才设置值: setnx lnmp "linux centos"
    获取指定键值的长度: strlen lnmp
    设置多个键值: mset key1 val1 key2 val2
    设置值指定过期时间毫秒: psetex 键名 毫秒 值
    指定键自增减1: incr/decy lnmp
    指定键增减2: incrby/decrby lnmp 2
    指定键0.3: incrbyfloat lnmp 0.3
    追加: append 键名 值

Redis 哈希:
   设置哈希: hmset lnmp web "nginx" db "mysql" os "linux" parse "php"
   获取指定键值: hgetall lnmp
   获取指定键的某个值: hget lnmp db
   获取指定键的所有键: hkeys lnmp
   获取指定键的所有值: hvals lnmp
   字段不存在时设置值：hsetnx lnmp other centos
   设置字段值: hset lnmp os ubuntu
   获取多个值: hmget lnmp os web
   查看多少个字段: hlen keys
   指定字段值加2: hincrby lnmp os 2
   指定字段加0.2: hincrebyfloat lnmp os 0.2

Redis 列表:
   列表左边添加元素: lpush member xudong lina zhufang
   列表右边添加元素: rpush member hudong

   查看指定key列表: lrange member 0 100
   最左边的元素: lpop member
   最右边的元素: rpop member


Redis 集合:

   向集合中添加元素: sadd db "redis" "mysql" ...
   向集合中添加元素: sadd db "mongodb"
   查看集合中的值(不重复): smembers db
   查看集合中元素个数: scard db
   返回集合的差集: sdiff dbs dbs2
   比较2个集合的差集保存到result集合中: sdiffstore result dbs dbs2
   比较2个集合的交集保存到result集合中: sinterstore result dbs dbs2
   返回2个集合的交集: sinter dbs dbs2
   判断集合中是否有指定值: sismember dbs redis
   移动元素到另一个集合: smove source集合 destination集合 元素
   移除应返回集合中的随机元素: spop dbs
   随机返回2个元素: srandmember dbs 2
   删除集合中一个或多个元素: srem dbs 值1 值2
   合并多个集合: sunion dbs1 dbs2

Redis 有序集合:

   Redis 有序集合和集合一样也是string类型元素的集合,且不允许重复的成员。
   不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。
   有序集合的成员是唯一的,但分数(score)却可以重复

   有序集合添加一个或多个元素(分数 值): zadd zqdl 1 xd 2 zf 3 xjl 4 zyl
   集合元素个数: zcard zqdl
   统计某个区间内总数: zcouont zqdl 0 100
   增加某个元素的分数: zincrby zqdl xd 2
   获取key1和key2集合的交集并保存到result集合中: zinterstore result 2 key1 key2
   返回分数: zscore zqdl xd
   取2个集合的交集保存到result集合: zunionstore result 2 key1 key2
   返回从大到小的排名: zrevrank zqdl xd
   移除集合中一个或多个元素: zrem zqdl xd zf
   返回集合元素的索引: zrank zqdl xd

Redis Hyperlog:
   概念: 比如数据集 {1, 3, 5, 7, 5, 7, 8}， 那么这个数据集的基数集为 {1, 3, 5 ,7, 8}, 基数(不重复元素)为5。 基数估计就是在误差可接受的范围内，快速计算基数。

   添加指定元素到HyperLog: pfadd db "redis"
   基数估算值: pfcount db

Redis订阅:
   订阅频道: subscribe channel1 channel2 channel3
   取消订阅: unsubscribe channel1 channel2 channel3
   发布消息: publish channel1 "2132323"


Redis脚本:
   Redis能执行lua脚本



Redis事务:
   multi //开始事务
   set book-name "mysql从入门到精通"
   get book-name
   discard //取消事务内所有命令
   unwatch //取消对所有key的监视
   watch book-name //监视这个key
   exec //执行


Redis备份和恢复:
   将数据保存到硬盘: save
   后台将数据保存到硬盘: bgsave
   恢复数据: 1。config get dir 查看目录 2.将dump.rdb文件复制到目录下


Redis性能测试:
   redis-benchmark -h 主机名 -p 端口 -s Socket -c 并发连接数 -n 请求数 -d 以字节的形式指定 SET/GET 值的数据大小 -k 1-keep alive 0-reconnect -r SET/GET/INCR 使用随机 key, SADD 使用随机值 -P 通过管道传输 <numreq> 请求 -q 强制退出 redis。仅显示 query/sec 值 --csv 以 CSV 格式输出 -l 生成循环，永久执行测试 -t 仅运行以逗号分隔的测试命令列表 -l Idle 模式

   redis-benchmark -n 1000


Redis客户端连接:
   连接远程redis: redis-cli -h 主机IP -p 端口
   查看最大连接数: config get macclients
   当前连接列表: client list
    设置连接名称: client setname "xudong7930"
   挂起客户端: client pause 1000毫秒
   关闭客户端: client kill id ID号
            client kill ADDR IP地址:端口号


Redis管道技术:


Redis分区:
```



# redis in laravel
安装:
> composer require predis/predis

配置:
> config/database.php

基本命令:
```php
#指定连接
Redis::connection('product.server')->set('username', 'sbjsw');
Redis::get('username');

Redis::command('redis shell命令');

#字符串
$result = Redis::command('set', ['jwt', '15811448243']);
$result = Redis::command('get', ['jwt']);
$result = Redis::command('set', ['user_1012_count', 1]);
$result = Redis::command('incr', ['user_1012_count']);
$result = Redis::command('incrby', ['user_1012_count', 2]);

#哈希
$result = Redis::command('hmset', ['centos', 'n', 'nginx']);
$result = Redis::command('hmget', ['lnmp', 'n', 'm']);

#列表
$result = Redis::command('lpush', ['users', 'hudong', 'xuergou', 'zhaocongcong']);
$result = Redis::command('lrange', ['users', 0, 1]);
$result = Redis::command('lpop', ['users']);

#集合
$result = Redis::command('sadd', ['db', 'redis', 'memcache', 'cacti']);
$result = Redis::command('sadd', ['db', 'mongodb']);
$result = Redis::command('smembers', ['db']); //获取集合

#有序集合
$result = Redis::command('zadd', ['zqdl', 1, 'xd', 2, 'lzw', 3, 'zxs']);

#订阅和发布
$result = Redis::command('subscribe', ['q1', 'q2']);
$result = Redis::command('unsubscribe', ['q1', 'q2']);
$result = Redis::command('publish', ['q1', json_encode(['stauts'=>'ok'])]);

```

管道线pipline:
```php
#一次操作执行多个redis命令
$data = [];
Redis::pipeline(function($pipe) use ($data){
   foreach($data as $i=>$item){
      $pipe->set("key:$i", json_encode($item));
   }
});
```


订阅(sub)和发布(pub):
subscribe:
```php
#创建command文件
php artisan make:command RedisSubscribe

#在RedisSubscribe.php文件中handle方法:
Redis::subscribe(['test-channel'], function($message){
   echo $message;
});

Redis::psubscribe(['channel.*'], function($message, $channel){
   $this->info($channel.":".$message);
});
```

publish:
```php
Redis::publish('channel.nadounainai', json_encode(['foo'=>'bar']));
```