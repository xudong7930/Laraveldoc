laravel pass data to javascript
===============================

# install
composere require laracasts/utilities

# register service (skip on 5.5+)
Laracasts\Utilities\JavaScript\JavaScriptServiceProvider::class

# publish config file
php artisan vendor:publish --provider="Laracasts\Utilities\JavaScript\JavaScriptServiceProvider"

# edit config/JavaScript.php
# web.php
```
<?php
Route::get('/omg', function() {
    JavaScript::put([
        'foo' => 'bar',
        'user' => 'xerg',
        'age' => 29
    ]);

    return view('hello');
});
```
