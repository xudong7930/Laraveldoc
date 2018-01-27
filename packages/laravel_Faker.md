Laravel Faker
=============

```php
<?
require __DIR__.'/vendor/autoload.php';


// Part0-Install
// composer require fzaninotto/faker


// Part1-Usage
$faker = Faker\Factory::create();
// $faker = Faker\Factory::create('zh_CN');


// Base & Lorem

// echo $faker->randomFloat(2, 10, 100);
// echo $faker->numberBetween(1, 100);
// echo $faker->randomElement([11, 22, 33]);

// echo $faker->word;
// echo $faker->sentence;
// echo $faker->paragraph;
// echo $faker->text(100);

// Person
// echo $faker->firstName('female'); // null,male, female
// echo $faker->lastName('female'); // null,male, female
// echo $faker->name('male'); // null, male, female
// echo $faker->title('male'); // null, male, female

// Address
// echo $faker->state;
// echo $faker->city;
// echo $faker->postcode;
// echo $faker->address;
// echo $faker->country;
// echo $faker->latitude();
// echo $faker->longitude();

// Phone
// echo $faker->phoneNumber;


// Datetime
// echo $faker->unixTime(); // 时间戳
// echo $faker->iso8601(); // '1978-12-09T10:10:29+0000'
// echo $faker->date('Y-m-d H:i:s');
// echo $faker->time('H:i:s');
// echo $faker->amPm();
// echo $faker->dayOfMonth();
// echo $faker->dayOfWeek();
// echo $faker->month();
// echo $faker->monthName();
// echo $faker->year();
// echo $faker->timezone;

// Internet
// echo $faker->email;
// echo $faker->safeEmail; 
// echo $faker->freeEmail;
// echo $faker->freeEmailDomain;
// echo $faker->safeEmailDomain;
// echo $faker->username;
// echo $faker->password;
// echo $faker->url;
// echo $faker->slug;
// echo $faker->ipv4;
// echo $faker->localIpv4;
// echo $faker->ipv6;
// echo $faker->macAddress;


// payment
// echo $faker->creditCardType; // 信用卡类型
// echo $faker->creditCardNumber; // 信用卡号
// echo $faker->creditCardExpirationDateString; // 信用卡过期时间



// browser
// echo $faker->userAgent;
// echo $faker->chrome;
// echo $faker->firefox;
// echo $faker->safari;
// echo $faker->opera;
// echo $faker->internetExplorer;


// color
// echo $faker->hexcolor; // #FA32CC
// echo $faker->rgbcolor; // '24, 80, 42'


// file
// echo $faker->fileExtension; // 文件扩展名
// echo $faker->mimeType; // MIME类型
// echo $faker->file('sourceDIR', 'targetDir', false); // 文件复制


// image
// echo $faker->imageUrl(20, 20); // 远程图片路径
// echo $faker->imageUrl(100, 100, 'cats', true, 'Faker', true); // 带水印的远程图片路径
// echo $faker->image('dir', 400, 400); // 本地图片路径
// echo $faker->image($dir, 400, 400, 'cats', true, true, 'Faker') // 带水印的本地图片路径


// others
// echo $faker->uuid; // UUID
// echo $faker->boolean; // false;
// echo $faker->boolean(50); // true;
// echo $faker->md5; // 加密
// echo $faker->sha1; // 加密
// echo $faker->sha256; // 加密
// echo $faker->locale; // zh_CN
// echo $faker->countryCode; // UK
// echo $faker->languageCode; // en
// echo $faker->currencyCode; // 货币对
// echo $faker->emoji; // emoji表情

// echo $faker->biasedNumberBetween(10, 20, function ($item) { return $item+0.01; });


// Part2-Modify: unique|optional|valid
// echo $faker->unique()->safeEmail;
// echo $faker->optional()->email;
// echo $faker->valid(function ($item) { return $item % 2 == 0; })->randomElement([1, 2]);

