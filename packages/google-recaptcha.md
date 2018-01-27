Google Recaptcha
================


## 1. install package.
```bash
  	composer require google/recaptcha
```  

## 2. 申请
[Google Recaptcha Apply](https://www.google.com/recaptcha/admin "link")
获得key和secert
在 **.env**文件中添加
```INI
	SETTINGS_GOOGLE_RECAPTCHA_SECRET_KEY=6LfZZkIUAAAAANNmsrtojBKkAfds87NHuI3yTUr1
	SETTINGS_GOOGLE_RECAPTCHA_SITE_KEY=6LfZZkIUAAAAALykNXq2nwXjYwVRuGcgsFFi27J1
```

## 3. 新建trait文件
```PHP
namepsace App\Acme\Traits;
 
use ReCaptcha\ReCaptcha;
 
trait reCaptchaTrait {
 
    public function verifyCaptcha($response)
    {
        $secret = env('SETTINGS_GOOGLE_RECAPTCHA_SECRET_KEY');
        return (bool)(new ReCaptcha($secret))
        	->verify($response, $_SERVER['REMOTE_ADDR'])
        	->isSuccess();
    }
}
```

## 4. 编写逻辑
validation中添加验证规则:

```PHP
    $request->['g-recaptcha-verified'] = $this->verifyCaptcha($request->['g-recaptcha-response']);
    $this->validate($requst, [
        'g-recaptcha-response' => 'required'
        'g-recaptcha-verified' => 'required|min:1'
    ], [
        'g-recaptcha-response.required' => 'Please confirm you are not a robot',
        'g-recaptcha-verified.min' => 'Recaptcha verify failed',
    ]);
```

在blade文件中添加:

```HTML
    <script src='https://www.google.com/recaptcha/api.js'></script>
```

在blade中form表单中添加:

```HTML
    <div class="form-group">
        <div class="g-recaptcha" data-sitekey="{{ env('SETTINGS_GOOGLE_RECAPTCHA_SITE_KEY') }}"></div>
    </div>
```

## 5.开始测试