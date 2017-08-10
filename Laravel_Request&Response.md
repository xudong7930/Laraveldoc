Laravel Request&Response
========================

# Request

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
