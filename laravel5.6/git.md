# git提交空目录
情况1: 目录是空的
创建一个.gitkeep文件

情况2：目录存在文件
创建一个.gitignore文件,内容: 
```
*
!.gitignore
```

根目录.gitignore文件中:
```
!.gitignore
```

