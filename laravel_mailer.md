laravel邮件发送
==============

## 1. 配置.env文件
```
MAIL_DRIVER=smtp
MAIL_HOST=smtp.126.com
MAIL_PORT=25
MAIL_USERNAME=xudong7930@126.com
MAIL_PASSWORD=abc123
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=xudong7930@126.com
MAIL_FROM_NAME=xudong7930
```

## 2.邮件发送
```php
<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function userFunction()
    {
        // 纯文本邮件
        Mail::raw('fwfe', function($m) {
            $m->to('1046457211@qq.com');
            $m->subject('纯文本邮件');
        });

        // 使用邮件模板
        Mail::send('layouts.mail', ['name'=>"xuergou"], function($m){
            $m->from('xudong7930@126.com', 'your app'); // 邮件发送人
            $m->to('1046457211@qq.com'); // 收件人
            $m->cc(['xudong7930@gmail.com']); // 抄送
            $m->subject('纯文本邮件'); // 主题
            $m->replyTo('1046457211@qq.com', null); // 回复

            // 添加附件
            $attachment = storage_path('app/files/test.txt');
            $m->attach($attachment, ['as'=>'test_293292.txt']);
            $m->attach($attachment, ['as'=>"=?UTF-8?B?".base64_encode('中文文档')."?=.txt"]);

            // 添加附件2
            $pdf = '1231231';
            $m->attachData($pdf, 'invoice.pdf', ['mime' => 'application/pdf']);
        });

        echo 'done';
    }
}
```




