Laravel Log&Error


## 配置.env文件
APP_DEBUG=true
APP_LOG_LEVEL=debug  //debug, info, notice, warning, error, critical,  alert, emergency

## Log
```php
use Illuminate\Support\Facades\Log;

public function showProfile()
{
    $data = ['11'];
    $message = json_encode($data);
    Log::info('user: ', $data);
    Log::emergency($message);
    Log::alert($message);
    Log::critical($message);
    Log::error($message);
    Log::warning($message);
    Log::notice($message);
    Log::info($message);
    Log::debug($message);
}
```
 
## Http Exception
```php
    abort(500, 'something is wrong');
```

自定义模板文件:
resources/views/errors/404.blade.php
```html
<h2>{{ $exception->getMessage() }}</h2>
```

## 异常处理 app/Exceptions/Handler.php
```php
    use \Package\to\your\CustomException;
    
    public function report(Exception $exception)
    {   
        if ($exception instanceof CustomException) {
            return response()->view('errors.custom', [], 500);
        }

        parent::report($exception);
    }

    public function render($request, Exception $exception)
    {
        if ($exception instanceof CustomException) {
            return response()->view('errors.custom', [], 500);
        }

        return parent::render($request, $exception);
    }
```
