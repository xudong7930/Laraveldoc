// js 的数据类型
let a = 1;
let b = "sbjsw";
let c = ["a", "b"];
let d = {a: "aa"};
let e = !0;



// 所有的赋值都用const，避免使用var
const a = 1;


// 如果你一定要对参数重新赋值，那就用let，而不是var
let b = 2;
if (true) {
	b += 1;
}

// 使用字面值创建对象
const you = {};

// 用对象方法简写
const atom = {
	value: 1,
	addValue(value) {
		return this.value + value;
	}
}

// 只对那些无效的标示使用引号 ''
const goods = {
	foo: 3,
	bar: 4,
	'data-balh': 5
}

// 不要直接调用Object.prototype上的方法，如hasOwnProperty, propertyIsEnumerable, isPrototypeOf
object.hasOwnProperty(key);// bad
Object.prototype.hasOwnProperty.call(object, key);// good

// 对象浅拷贝时，更推荐使用扩展运算符...
const foo = {a:1, b:2};
const copy = {...foo, {c:3}};
const {a, ...notA} = copy;


// 数组用字面量赋值
const items = [];

// 使用push代替直接向数组中添加一个值
const some = [];
some.push('bababa');

// 用扩展运算符做数组浅拷贝
const foo = [11,22];
const copy = [...foo];

// 用 ... 运算符而不是Array.from来将一个可迭代的对象转换成数组。
const foo = {a:1, b:2}



// 用对象的解构赋值来获取和使用对象某个或多个属性值
function getFullName(user) {
	const {firstName, lastName} = user;
	return `${firstName} ${lastName}`;
}


// 用数组解构
const arr = [11, 22, 33, 44];
const [first, second] = arr;


// 多个返回值用对象的解构，而不是数组解构
function processInput(input) {
	const left = 10;
	const right = 20;
	const top = 30;
	const bottom = 40;
	return {left, right, top, bottom};
}

const {left, top} = processInput(input);


// ===========
// String
// ===========

// 对string用单引号 ''
const your_name = 'capt. janeway';


// 用字符串模板而不是字符串拼接来组织可编程字符串
function sayHi(name) {
	return `how are you, ${name} ?`;
}


// 不要使用不必要的转义字符
cosnt foo = `my name is ${name}`;


// ==========
// Functions
// ==========

// 用命名函数表达式而不是函数声明
const short = function someLongNameFuncDescript() {
	// ...
}


// 把立即执行函数包裹在圆括号里
(function(){
	alert(111);
}());


// 不要使用arguments，用rest语法...代替
function contactAll(...args) {
	return args.join('');
}

// 用默认参数语法而不是在函数里对参数重新赋值, 把默认参数赋值放在最后
function handleSomeThine(name, opts = {}) {
	// ...
}


// 函数签名部分要有空格
const x = function() {};
const y = function a() {};

// 不要对参数重新赋值
function foobar(a) {
	const b = a || 1;
}


// 用...去调用多变的函数更好
const x = [1, 2, 3, 4, 5];
console.log(...x);

new Date(...[2016, 8, 5]);


// 多参数应该像这个指南里的其他多行代码写法一样
function foo(
	bar,
	quiz,
	baz
) {
	// ...
}


// =======
// Arrow Functions
// =======


// 回调函数作为参数使用箭头函数
[11,22,33].map( (x) => {
	return x * (x +1);
});

// =======
// Classes & Constructors
// =======


// 常用class，避免直接操作prototype
class Queue {
	constructor(contents = []) {
		this.queue = [...contents];
	}

	pop() {
		const value = this.queue[0];
		this.queue.splice(0, 1);
		return value;
	}
}


// 用extends实现继承
class PeekableQueue extends Queue {
	peek() {
		return this.queue[0];
	}
}


// 方法可以返回this来实现方法链
class Jedi {
	jump() {
		this.jumping = true;
		return this;
	}

	eat() {
		this.eating = true;
		return this;
	}

	toString() {
		return `jedi - ${this.getName()}`;
	}
}

const luke = new Jedi;
luke.jump()
	.eat();


// 空的构造方法不需要写
class Rey extends Jedi {
	constructor(...args) {
		super(...args);
		this.name = 'rey';
	}
}

// =========
// Modules
// =========

// 用(import/export) 模块而不是无标准的模块系统
// ok
import AirbnbStyleGuide from './AirbnbStyleGuide';
export default AirbnbStyleGuide.es6;

// best
import { es6 } from './AirbnbStyleGuide';
export default es6;


// 不要用import通配符， 就是 * 这种方式
import AirbnbStyleGuide from './AirbnbStyleGuide';


// 不要直接从import中直接export
// filename es6.js
import { es6 } from './AirbnbStyleGuide';
export default es6;


// 一个路径只 import 一次
import foo, {item1, item2} from 'foo';


// 不要导出可变的东西 
const foo = 3;
export {foo}


// 在一个单一导出模块里，用 export default 更好
export default function foo() {};

// import 放在其他所有语句之前
import foo from 'foo';
import bar from 'bar';
foo.init();


// 多行import应该缩进，就像多行数组和对象字面量
import {
	longItemA,
	longItemB,
	longItemC
} from 'path';


// =======================
// Iterators and Generators
// =======================

// 不要用遍历器。用JavaScript高级函数代替for-in、 for-of
let sum = 0;
[1,2,3,4,5].forEach((item) => {
    sum += item;
});


// Properties

// 访问属性时使用点符号
const luke = {jedi: true, age: 28};
const isJedi = luke.jedi;


// 当获取的属性是变量时用方括号[]取
function getProp(prop) {
	return luke[prop];
}
const isJedi = getProp('jedi');


// ========
// Variables
// ========

// 用const或let声明变量, 每个变量都用一个 const 或 let, const放一起，let放一起
const items = getItems();
const goSportsTeam = true;
const dogeIsGood = 'z';
let i;
let dragAble;


// 在你需要的地方声明变量，但是要放在合理的位置
function checkName(hasName) {
	if (hasName === 'test') {
		return false;
	}

	const name = getName();
	if (name == 'test') {
		this.setName('');
		return false;
	}

	return name;
}

// 不要使用链接变量分配
// let a  = b  = c  = 1;
let a = 1;
let b = a;
let c = a;

// 不要使用++, --
let num = 1;
num += 1;
num -= 1;

// 在赋值的时候避免在 = 前/后换行
const foo  = (
	superLongResult()
);


// 布尔值用缩写，而字符串和数字要明确比较对象
if (isValid) {
	// ...
}

if (name === '') {
	// ...
}

if (args.length > 0) {
	// ...
}


// if表达式的else和if的关闭大括号在一行。
if (test) {
	things();
} else {
	things2();
}


// 超长表达式
if (
	(foo == 123 || bar == 'z') 
	&& doesItLookGood()
	& isRealyGood()
) {
	things();
}


// tab用两个空格
function baz() {
  // ...
}

// 在控制语句(if, while 等)的圆括号前空一格
if (isJedi) {
	fight();
}

function fight() {
	console.log('swooosh');
}

// 用空格来隔开运算符, 文件结尾空一行
const x = y + 5;

// 在一个代码块后下一条语句前空一行。
if (foo) {
	return bar;
}

return baz;

const arr = [
	function foo() {

	},

	function bar() {

	}
];

return arr;


// 圆括号里不要加空格
if (foo) {
	console.log(foo);
}

// 方括号里不要加空格。看示例
const foo = [1, 2, 3];
console.log(foo[0]);


// 花括号里加空格
const foo = { foo: 'bar' };


// 避免一行代码超过100个字符
$.ajax({
	method: 'post',
	url: '//go.code',
	data: { name: 'john' },
})
  .done(function(){

  })
  .fail(function(){

  });

// 作为语句的花括号内也要加空格 —— { 后和 } 前都需要空格
function foo() { return bar; }
if (foo) { bar = 0; }


// , 前不要空格， , 后需要空格
var foo = 1, bar = 2;
var arr = [1, 2];


// 调用函数时，函数名和小括号之间不要空格
foo();

// 在对象的字面量属性中， key value 之间要有空格
var obj = { foo: 32 };


// 额外结尾逗号
const hero = {
	firstName: 'flor',
	lastName: 'goofwe',
	inventOf: ['13', '23'],
}

function createHero(
	firtName,
	lastName,
) {
	// ...
}


// 语句的结尾加分号, 行首加分号，避免文件被连接到一起时立即执行函数被当做变量来执行。
;(function(){
	console.log(123);
}());


// 类型强制转换
const totalScore = String(this.review);
const val = Number(inputValue);
const val = parseInt(inputValue);
const hasAge = Boolean(age);
const hasAge = !!age;


// 用小驼峰式命名你的对象、函数、实例
const thisIsMyObject = {};
function thisIsMyFunction() {};

// 用大驼峰式命名类
class User {
	constructor(options) {
		this.name = options.name;
	}
}

const good = new User({name: yup});


// export default导出模块A，则这个文件名也叫A.*， import 时候的参数也叫A。 大小写完全一致
import CheckBox from './CheckBox'; // CheckBox.js
import fortyTwo from './fortyTwo'; // fortyTwo.js
import insideDiredctory from './insideDiredctory'; // insideDiredctory.js 或者 insideDiredctory/index.js


// 当你export-default一个函数时，函数名用小驼峰，文件名需要和函数名一致
// 文件名 makeStyleGuide.js
function makeStyleGuide() {
	// ...
}
export default makeStyleGuide; 



// 当你export一个结构体/类/单例/函数库/对象 时用大驼峰
const AirbnbStyleGuide = {};
export default AirbnbStyleGuide;

// 简称和缩写应该全部大写或全部小写。
import SMSContainer from './container';
const HTTPRequests = {};
const httpRequests = {};
const API_KEY = 'some key';


// 不要使用JavaScript的getters/setters
class Dragon {
	getAge() {
		// ...
	}

	setAge() {
		// ...
	}
}

// 如果属性/方法是boolean， 用 isVal() 或 hasVal()
if (dragon.hasAge()) {
	// ...
}

// 用get()和set()函数是可以的，但是要一起用
class Jedi {
	constructor(options = {}) {
		const lightsaber = options.lightsaber || 'blue';
		this.set('lightsaber', lightsaber);
	}

	set(key, val) {
		this[key] = val;
	}

	get(key) {
		return this[key];
	}
}



// jQuery对象用$变量表示。
const $sideBar = $('.sidebar');

// 暂存jQuery查找
function setSideBar() {
	const $sideBar = $('.sidebar');
	$sideBar.hide();
	$sideBar.attr('data-id', 1);
}




