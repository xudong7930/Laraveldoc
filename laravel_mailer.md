laravel邮件发送
==============

## 1.创建邮件类和模板:
> php artisan make:mail OrderNew  
> php artisan make:mail OrderShipped -m emails.order-shipped

## 2.发布邮件模板和样式文件 **可选**
> php artisan vendor:publish --tag=laravel-mail  

## 3. 配置邮箱账号.env文件

```
for 126
MAIL_DRIVER=smtp
MAIL_HOST=smtp.126.com
MAIL_PORT=25
MAIL_USERNAME=xudong7930@126.com
MAIL_PASSWORD=abc123
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=xudong7930@126.com
MAIL_FROM_NAME=xudong7930

for mailtrap
MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=7a00d5d9c110ab
MAIL_PASSWORD=365493fc398e84
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=xudong7930@mailtrap.io
MAIL_FROM_NAME=xudong7930
```

## 4.编辑mail类和模板文件
```php
<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class OrderConfirmed extends Mailable
{
    use Queueable, SerializesModels;

    public $order;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($order)
    {
        $this->order = $order;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        /*
        return $this->from('ergou@example.com')
            ->markdown('emails.order-confirmed')
            ->with([
                'order' => $this->order
            ]);
        */
        
        // 添加多个附件
        /*
        return $this->view('emails.order-confirmed-view')
            ->with(['order'=>$this->order])
            ->attach('/Users/xudong7930/Public/Xudong/hi.php')
            ->attach('/Users/xudong7930/Public/Xudong/webpack.md');
        */  

        /*
        // 修改了附件
        return $this->markdown('emails.order-confirmed')
            ->with(['order' => $this->order])
            ->attach('/Users/xudong7930/Public/Xudong/webpack.md', [
                'as' => 'webpack_note.md',
                'mime' => 'text/x-markdown'
            ]);
        */
        
        /*
        // 将内存中的数据保存到文件
        $data = '12345678';
        return $this->markdown('emails.order-confirmed')
            ->with(['order' => $this->order])
            ->attachData($data, 'order.txt', ['mime'=>'text/plain']);
        */

        // return $this->text('emails.order-confirmed-view');

        return $this->markdown('emails.order-confirmed')
            ->with(['order' => $this->order]);
    }
}

```


## 5.邮件发送
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
use App\Mail\OrderConfirmed;
use Carbon\Carbon;

class MailtestController extends Controller
{
    public function send()
    {
        // 你的订单
        $order = new \stdClass;
        $order->id = 1;
        $order->name = "your order";
        $order->total = 12.95;

        /*
        // 发送邮件        
        Mail::to('1046457211@qq.com')
            ->cc('xudong7930@hotmail.com')
            ->bcc('xudong7930@163.com')
            ->send(new OrderConfirmed($order));
        */

        /*
        // 发送队列邮件
        Mail::to('xudong7930@gmail.com')
            ->queue(new OrderConfirmed($order));
        */

        /*
        // 延迟发送
        $when = Carbon::now()->addMinutes(2);
        Mail::to('xudong7930@hotmail.com')
            ->later($when, new OrderConfirmed($order));
        */

        // 指定发送队列
        $orderConfirmedMail = (new OrderConfirmed)->onQueue('emails');
        Mail::to('xudong7930@126.com')
            ->queue($orderConfirmedMail);

        dump('done');
    }
}

```

## 6.测试你的代码
> 暂无
