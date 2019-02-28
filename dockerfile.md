FROM php:7.3.2-fpm

# 设置镜像维护者
MAINTAINER superadmin "superadmin@ec3s.com"

# 设置时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 更新安装依赖包和PHP核心拓展
RUN apt-get update && apt-get install -y \
    git \
    supervisor \
    curl \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install zip \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-install opcache \
    && docker-php-ext-install mysqli \
    && rm -r /var/lib/apt/lists/*

# 写权限
RUN usermod -u 1000 www-data

ADD supervisord.conf /etc/supervisord.conf

COPY bashrc /root/.bashrc
COPY start.sh /start.sh

CMD ["/bin/bash","/start.sh"]

EXPOSE 22 9000