
# eager loading(热加载)
```
$blogs = Blog::with('cate')->get();

#sql是:
select * from `blogs`;
select * from `categories` where `categories`.`id` in (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
```


# lazy eager loading(惰性热加载)
```
$posts = Post::limit(100)->get();

#sql是:
select * from `blogs`;
select * from `categories` where `categories`.`id` in (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
```
