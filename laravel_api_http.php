<?php

return [
	'HTTP_OK' => '200', // 服务器成功返回用户请求的数据GET
    'HTTP_CREATED' => '201', // 新建或修改数据成功POST,PUT,PATCH
    'HTTP_ACCEPTED' => '202', // 请求已被服务器端接收，执行完毕后回掉结果（异步）
    'HTTP_NO_CONTENT' => '204', // 用户删除数据成功DELETE

	'UNAUTHORIZED' => '401',
	'FORBIDDEN' => '403',
	'NOT_FOUND' => '404',
	'METHOD_NOT_ALLOWED' => '405',
	'UNPROCESSABLE_ENTITY' => '422',

	'INTERNAL_SERVER_ERROR' => '500', // 服务器内部发生错误
    'SERVICE_UNAVAILABLE' => '503', // 服务器忙碌，资源互斥锁存在，这种情况下需要外部系统稍后重试
];

return $success = [
	'status' => 1,
	'error_code' => 200,
	'error_msg' => "成果了",
	'data' => []
];

return $error = [
	'status' => 0,
	'error_code' => 40001,
	'error_msg' => '错误的错误的'
];


/*
Api结构:
	app/Http/Apis/
	app/Http/Apis/v1
	app/Http/Apis/ApiController.php

编辑RouteServiceProvider.php中:
	19行: protected $apiNamespace = 'App\Http\Apis';
	72行: ->namespace($this->apiNamespace)
*/