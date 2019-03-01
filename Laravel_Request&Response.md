Laravel Request&Response
========================

# Request
```
// 请求方法
$request->method(); //GET,POST

// 判断请求方法
if ($request->isMethod('post')) {
    return 333;
}

// 请求路径
$request->path();

// 完整的url
$request->url(); 

// 请求IP
$request->ip();

// 请求端口
$request->getPort();

// 请求参数
$request->pageSize;
$requst->get('pageSize', 10); //symfony方法
$requst->input('pageSize', 10);

// 检测请求参数
if ($request->has('some')) {
    echo "has field some";
}

// 所有参数
$request->all();

// 取得部分参数
$request->only(['pageSize']);

// 剔除不需要的参数
$request->except(['pageSize']);

// 所有请求头
$request->headers

// 指定请求头
$request->header( 'Host' );

// 检测是否有文件上传
if ($request->hasFile('avatar') && $request->file('avatar')->isValid()) {
    $s = $request->file('avatar')->move('avatar'); // 移动到public/avatar/目录下
}

// 提取上传文件
$request->file('avatar');

// 提交所有cookie
$request->cookie();

// 路径判断
$request->is("api/v1/*");
```


# Response
// basic
// return "hello, laraevl.";
// return ['a'=>1, 'b'=>2];

// response
// return response('hello,java', 200)
//     ->withHeaders([
//         'Content-Type' => 'text/plain'
//     ])->cookie('x-cookie', "your cookie", 10);


// redirect
// return redirect('/');
// return back()->withInput();
// return redirect()->route('user.index', ['id'=>1]); // 待着参数跳转到指定路由

/*
return redirect()->with(['success'=>'your operate is success.']);
@if (session('success'))
    {{session('success')}}
@endif
*/

/*
// view response
return response()->view('user.show', ['id'=>1])
    ->withHeaders([
        'Content-Type' => 'text/plain'
]);
*/

// json response
// return response()->json(['status'=>101,'msg'=>'ok'], 500);

// jsonp response
// return response()->json(['code'=>101, 'msg'=>'error'])->withCallback($request->input('callback'));

// file download
// $pathToFile = '/Users/xudong7930/Public/Xudong/thinkphp.chm';
// return reponse()->download($pathToFile);
// return response()->download($pathToFile, 'tp.chm', ['x-file-hear'=>'123123']);

// 显示PDF或image
// $file = '/Users/xudong7930/Public/Xudong/装逼图片/出来吧叼毛兽.jpg';
// $pdf = '/Users/xudong7930/Public/Xudong/docker/docker_practice.pdf';
// return response()->file($pdf);
