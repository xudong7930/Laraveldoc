


# git放弃本地修改
1.未使用git add缓存代码：
	放弃所有文件修改: git checkout .
	放弃指定文件修改: git chekcout -- filename.txt


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

