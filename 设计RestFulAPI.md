设计RESTful API
===============

## 1.基本原则 ##
> - API与用户的通信协议总是使用**https**协议
> - API复杂:**https://api.example.com**
> - API简单:**https://example.org/api/**
> - 应该将API的版本号放入URL: **https://api.example.com/v1/**
> - API的身份认证应该使用**OAuth2.0**框架
> - 服务器返回的数据格式使用**JSON**

## 2.路径 ##
>网址中不能有动词,只能有名词;API中的名词也应该使用复数。

有一个API提供动物园（zoo）的信息，还包括各种动物和雇员的信息，则它的路径应该设计成下面这样

	https://api.example.com/v1/zoos
	https://api.example.com/v1/animals
	https://api.example.com/v1/employees

## 3.HTTP动词 ##
下面是一些例子

	GET /zoos：列出所有动物园
	POST /zoos：新建一个动物园
	GET /zoos/ID：获取某个指定动物园的信息
	PUT /zoos/ID：更新某个指定动物园的信息（提供该动物园的全部信息）
	PATCH /zoos/ID：更新某个指定动物园的信息（提供该动物园的部分信息）
	DELETE /zoos/ID：删除某个动物园
	GET /zoos/ID/animals：列出某个指定动物园的所有动物
	DELETE /zoos/ID/animals/ID：删除某个指定动物园的指定动物

## 4.状态码 ##
服务器向用户返回的常见状态码和提示信息

	200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
	201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
	202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
	204 NO CONTENT - [DELETE]：用户删除数据成功。
	400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
	401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
	403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
	404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
	406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
	410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
	422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
	500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。

## 5.错误处理 ##
如果状态码是4xx，就应该向用户返回出错信息

	{
		code: 101,
		info: 'success',
		data: []
	}
