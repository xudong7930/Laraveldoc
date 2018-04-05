phpcs---PHP代码规范检查工具
===========================

# 安装
> composer global require "squizlabs/php_codesniffer=*"


# 使用
* phpcs -i #已经安装的代码标准
* phpcs --config-set default_standard PSR2 #设置默认标准为PSR-2
* phpcs --config-set colors 1 #显示颜色
* phpcs --config-set severity 1 #显示所有的错误和警告
* phpcs --config-set encoding utf-8 #默认编码
* phpcs --config-set tab_width 4 #tab宽度
* phpcs --config-set show_progress 1 #显示检查过程

phpmd---PHP代码质量检查工具
===========================

# 安装
> composer global require phpmd/phpmd

# 使用
```bash
#phpmd 代码路径 报告格式 规则xml文件
#规则: @https://phpmd.org/rules/index.html 
#规则: @https://github.com/overtrue/phpmd-rulesets
phpmd /path/to/dir_or_file text|html|xml codesize,unusedcode,naming
```
