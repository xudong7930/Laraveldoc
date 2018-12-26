# git远程分支与本地分支合并

<!-- 1.查看远程仓库 -->
git remote -v 

<!-- 2.将远程master分支拉到本地,并重命名为temp-->
git fetch origin master:temp

<!-- 3.比较本地分支和temp分支 -->
git diff temp

<!-- 4.将temp分支与本地分支合并 -->
git merge temp

<!-- 5.删除temp分组 -->
git brand -d temp

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

