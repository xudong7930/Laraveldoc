如何安装java环境?

# 下载
https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

# 解压到一些地方
tar -zxf jdk-8u181-linux-x64.tar.gz
mv jdk-8u181 /usr/local

# 添加到环境变量
vim ~/.profile #文件末尾添加
```bash
JAVA_HOME=/usr/local/jdk1.8.0_181
CLASSPATH=.:$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar
PATH=$JAVA_HOME/bin:$HOME/bin:$HOME/.local/bin:$PATH
```

source ~/.profile


# 测试
java -version
