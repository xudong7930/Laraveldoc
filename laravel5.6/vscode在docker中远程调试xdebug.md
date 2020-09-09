vscode在docker中远程xdbue调试
==========================


vscode中lauch.json配置: 

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Listen for XDebug",
            "type": "php",
            "request": "launch",

            // "docker中代码的目录":"本地代码的目录"
            "pathMappings": {
                "/opt/data/apps/service/fms":"/Users/xudong7930/code/lemaitong/apps/service/fms"
            },

            // 本机的地址,不要使用docekr分配的本机地址
            "hostname": "192.168.125.146",

            // 本机开放的xdebug监听端口
            "port": 19001
        }
    ]
}
```

docker中的php.ini配置:

```ini
[xdebug]
zend_extension=/usr/local/php/lib/php/extensions/no-debug-non-zts-20121212/xdebug.so
xdebug.enable=1
xdebug.remote_enable=1
xdebug.remote_autostart=1

// vscode主机的地址 和 端口
xdebug.remote_host="192.168.125.146" 
xdebug.remote_port=19001

xdebug.remote_handler=dbgp
xdebug.remote_log=/tmp/xdebug.log
```
