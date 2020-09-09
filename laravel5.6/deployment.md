laravel deployment
==================

# nginx.conf

```conf

server {
    listen 8000;
    server_name ehd4.f3322.net;
    root /root/html/blog/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index index.html index.htm index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php/php7.1-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}

```

# .env
APP_ENV=product
APP_DEBUG=false

# optimize
> composer install --optimize-autoloader

# config 
> php artisan config:cache

# route

* 检查 routes/web.php 是否包含闭包路由
* 检查 routes/api.php 是否包含闭包路由

> php artisan route:cache

