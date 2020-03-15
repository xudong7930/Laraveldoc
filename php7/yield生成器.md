
```
<?php
// php生成器: yeild
function createRange($number)
{
	$data = [];
	for ($i=0; $i < $number; $i++) { 
		$data[] = time();
	}
	return $data;
}

function createRange2($number)
{
	for ($i=0; $i < $number; $i++) { 
		yield time();
	}
}

// echo json_encode(createRange(10));

$result = createRange2(10);
foreach ($result as $item) {
    sleep(1);
    echo $item . PHP_EOL;
}


/**
# 思考一个问题:

我们注意到，在调用函数 createRange 的时候给 $number 的传值是10，一个很小的数字。假设，现在传递一个值10000000（1000万）。
那么，在函数 createRange 里面，for循环就需要执行1000万次。且有1000万个值被放到 $data 里面，而$data数组在是被放在内存内。所以，在调用函数时候会占用大量内存。


# 我们来还原一下代码执行过程。

首先调用 createRange 函数，传入参数10，但是 for 值执行了一次然后停止了，并且告诉 foreach 第一次循环可以用的值。
 foreach 开始对 $result 循环，进来首先 sleep(1) ，然后开始使用 for 给的一个值执行输出。
 foreach 准备第二次循环，开始第二次循环之前，它向 for 循环又请求了一次。
 for 循环于是又执行了一次，将生成的时间戳告诉 foreach .
 foreach 拿到第二个值，并且输出。由于 foreach 中 sleep(1) ，所以， for 循环延迟了1秒生成当前时间
所以，整个代码执行中，始终只有一个记录值参与循环，内存中也只有一条信息。

无论开始传入的 $number 有多大，由于并不会立即生成所有结果集，所以内存始终是一条循环的值。

# 实际开发应用
读取超大文件
 */
```
