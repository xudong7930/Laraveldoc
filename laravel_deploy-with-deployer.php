<?php

namespace Deployer;

require 'recipe/laravel.php';

/*
|--------------------------------------------------------------------------
| Property setting
|--------------------------------------------------------------------------
|
| This value is the name of your application. This value is used when the
| framework needs to place the application's name in a notification or
| any other location as required by the application or its packages.
*/
set('application', 'my_project');
set('repository', 'https://github.com/xudong7930/whats-new-in-laravel54.git');
set('keep_releases', 5);
set('branch', 'master');
set('ssh_multiplexing', true);
set('http_user', 'www-data');
set('writable_mode', 'chmod');


// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true); 

// Shared files/dirs between deploys 
add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', ['storage', 'bootstrap/cache']);


/*
|--------------------------------------------------------------------------
| Hosts setting
|--------------------------------------------------------------------------
|
| This value is the name of your application. This value is used when the
| framework needs to place the application's name in a notification or
| any other location as required by the application or its packages.
*/
host('45.32.77.118')
    ->stage('product')
    ->port('22')
    ->user('www-data')
    ->identityFile('~/Public/ssh2/id_rsa')
    ->addSshOption('UserKnownHostsFile', '/dev/null')
    ->addSshOption('StrictHostKeyChecking', 'no')
    ->set('deploy_path', '/usr/local/www/{{application}}');    

localhost()
    ->stage('develop')
    ->become('xudong930')
    ->set('deploy_path', '/Users/xudong7930/Desktop/{{application}}');    

// https://github.com/deployphp/deployer
// run: deployer deploy test|develop|product

/*
|--------------------------------------------------------------------------
| Tasks setting
|--------------------------------------------------------------------------
|
| This value is the name of your application. This value is used when the
| framework needs to place the application's name in a notification or
| any other location as required by the application or its packages.
*/

// 复制环境文件
task('fix:env', function () {
    $cmd = <<<EOF
touch {{release_path}}/database/database.sqlite
cat {{release_path}}/.env.product > {{release_path}}/../../shared/.env
EOF;
    run($cmd);
});

// 修复laravel权限
task('fix:permit', function () {
    
    within('{{release_path}}', function () {
        run("php artisan key:generate;"); 
    });
    
    run("rm -fr {{release_path}}/bootstrap/cache/*");
    run("chmod -R 777 {{release_path}}/bootstrap/cache");
    run("chmod -R 777 {{release_path}}/../../shared/storage");

    writeln('fix permit done');
});

task('after:failed', function () {
    // run('deployer rollback'); 
    // run('deployer deploy:unlock');
});


task('after:success', [
    'fix:permit'
]);


/*
|--------------------------------------------------------------------------
| Hooks setting
|--------------------------------------------------------------------------
|
| This value is the name of your application. This value is used when the
| framework needs to place the application's name in a notification or
| any other location as required by the application or its packages.
*/
// before('deploy:prepare', 'test'); // 检查deploy_path|releases|shared|.dep是否存在,并创建它
// before('deploy:lock', 'test'); // 创建.dep/deploy.lock文件,防止多个部署任务运行
// before('deploy:release', 'test'); // 在release_name下创建release文件夹
// before('deploy:update_code', 'test'); // 从git仓库中下载代码
// before('deploy:shared', 'test'); // 从shared目录创建共享的文件和目录然后link到releases中
// before('deploy:writable', 'test'); // 设置writable_dirs中指定的目录可选权限
before('deploy:vendors', 'fix:env'); // 安装composer 依赖项
// before('deploy:clear_paths', 'test'); // 删除clear_paths中指定的目录
// before('deploy:symlink', 'test'); // 切换current连接到release
// before('deploy:unlock', 'test'); // 部署解锁,删除.dep/deploy.lock文件
// before('cleanup', 'test'); // 清除keep_releases中指定的过期项目
// before('success', 'test'); // 打印部署成功的信息

// after('deploy:prepare', 'test');
// after('deploy:lock', 'test');
// after('deploy:release', 'test');
// after('deploy:update_code', 'test');
// after('deploy:shared', 'test');
// after('deploy:writable', 'test');
// after('deploy:vendors', 'test');
// after('deploy:clear_paths', 'test');
// after('deploy:symlink', 'test');
// after('deploy:unlock', 'test');
// after('cleanup', 'test');
after('success', 'after:success');
after('deploy:failed', 'after:failed');
