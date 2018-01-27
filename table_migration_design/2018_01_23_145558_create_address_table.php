<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAddressesTable extends Migration
{
    public function up()
    {
        Schema::create('address', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable(); // 会员ID
            $table->enum('default', [0, 1])->default(0); // 默认收货地址
            $table->string('contact', 250); // 联系人
            $table->string('mobile', 250); // 联系电话
            $table->json('region'); // 地区-省,市,区
            $table->string('detail', 250); // 详细地址
            $table->string('postcode', 12); // 邮编
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('address');
    }
}
