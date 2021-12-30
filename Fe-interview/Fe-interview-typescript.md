# TypeScript

## 什么是 TypeScript

> TypeScript 是一个强类型的 JavaScript 超集，支持 ES6 语法，支持面向对象编程的概念，如类、接口、继承、泛型等。提供一套静态检测机制。即在编译过程就会提供告警功能。



## tsconfig.json

> - 通过 tsc -init 创建,用于对类型检查提供基础数据。
> - files - 设置要编译的文件的名称；
> - include - 设置需要进行编译的文件，支持路径模式匹配；
> - exclude - 设置无需进行编译的文件，支持路径模式匹配；
> - compilerOptions - 设置与编译流程相关的选项。

```json
{
  "compilerOptions": {
  
    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```



## 函数签名与函数重载

### 函数签名

+ 也称做类型签名，或方法签名，定义了函数或方法的输入与输出
+ 参数以及参数的类型
+ 返回值及其类型
+ 可能会抛出或传回的异常

### 函数重载

+ 为同一个函数提供多个函数类型定义来进行函数重载



## 具备的数据类型

```typescript
let str: string = "jimmy";
let num: number = 24;
let bool: boolean = false;
let u: undefined = undefined;
let n: null = null;
let obj: object = {x: 1};
let big: bigint = 100n;
let sym: symbol = Symbol("me"); 
```

> 关于 undefined 与 null，默认情况这是所有类型的子类型。也就是说，他可以赋值给任何数据类型。但如果在 tsconfig.json 中指定了 “strictNullChecks:” true，则 null 和 undefined 只能赋值给 void 和它们各自的类型。



### number 和 bigint

> number 和 bigint，两种类型在 typescript中不相互兼容。



### Array

```typescript
//声明方式
// 1、
let arr:string[] = ["1","2"]
let arr2:Array<string> = ["1","2"]
// 2、
let arr:(string | number)[]
// 3、
interface ArrObj {
	name: string
  age: number
}
let arr3:ArrObj[] = [{name:"jimmy",age:20}]
```

### Func

```typescript
function sum(x:number,y:number): number {
	return x + y
}

interface SearchFunc {
  (source:string, subString: string): boolean
}
```



## Tuple 元组

使用元组限制单个变量中存储不同类型的值。

```typescript
 let x:[string, number]
 // 类型必须匹配且个数必须为 2
 x = ['hello',10] //ok
 x = ['hello',10,10] // error
 x = [10,'hello'] // error
```

> 需要注意的时，元组类型只能表示一个已知元素数量和类型的数组，长度已指定，越界访问会提示错误。如果一个数组中可能存在多种类型，数量和类型都不确定的情况下，直接使用 any[]

### 元组类型的可选元素

> 与函数函数签名，在定义元组类型时，可以通过 ？号来声明元组类型的可选元素

```typescript
let optionalTuple: [string, boolean?];
optionalTuple = ["Semlinker", true];
console.log(`optionalTuple : ${optionalTuple}`);
optionalTuple = ["Kakuqo"];
console.log(`optionalTuple : ${optionalTuple}`);
```



## void

> void 表示没有任何类型，和其他类型是平等关系，不能直接赋值。只能为它赋予 null 和 undefined。指的注意的是，方法没有返回值，将得到 undefined，但是我们需要定义成 void 类型，而不是undefined类型，否则将报错。

## never

> never类型表示的是那些永不存在的值的类型。值不会存在的两种情况
>
> + 如果一个函数执行时抛出了异常，那么这个函数永远不存在返回值
> + 函数中执行了死循环的代码

```typescript
 function err(msg:string): never {
	throw new Error(msg)
 }

function loopForever():never {
  while(true){}
}
```

#### 应用场景

> 实现全面性检查

```typescript
type Foo = string | number

function controlFlowAnalysisWithNever(foo: Foo) {
  if(typeof foo === "string"){
    
  } else if(typeof foo === "number") {
    
  } else {
    const check:never = foo
  }
}
```



## 类型断言

> 通过类型断言 告知TypeScript 按照既定的方式做类型检查

```typescript
// 例如
const arrayNumber:number[] = [1,2,3,4]
const greaterThan2: number = arrayNumber.find(num => num > 2) as number
```



## 非空断言

> 在上下文中当类型检查其无法断定类型时，一个新的后缀表达式操作符 | 可以用于断言操作对象是非 null 和 非 undefined 类型。具体而言， **x！将从 x 值域中排除 null 和 undefined。**

```typescript
let mayNullOrUndefinedOrString: null | undefined | string;
mayNullOrUndefinedOrString!.toString(); // ok
mayNullOrUndefinedOrString.toString(); // ts(2531)

type NumGenerator = () => number;

function myFunc(numGenerator: NumGenerator | undefined) {
  // Object is possibly 'undefined'.(2532)
  // Cannot invoke an object which is possibly 'undefined'.(2722)
  const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); //OK
}
```



## 确定赋值断言

允许在实例属性和变量声明后面放置一个 ！ 号，从而高速 TypeScript 该属性会被明确地赋值。

```typescript
let x: number
initialize()

console.log(2 * x)
function initialize(){
  x = 10
}
// 很明显该异常信息会是说 x 在赋值强被使用了。
要解决这个问题可以在 => let x!：number
```



## 交叉类型

> 交叉类型是将多个类型合并为一个类型。这让我们可以把现有的多种类型叠加到一起称为一种类型，它包含了所需的所有类型的特性，使用 & 定义交叉类型

```typescript
{
	type Useless = string & number
}
```

应用场景：将多个接口类型合并成一个类型，从而实现等同接口继承的效果，也就是合并接口。

```typescript
type IntersectionType = { id: number; name: string} & {age: number}
const mixed: IntersectionType = {
  id: 1,
  name: 'name',
  age : 18
}
```



## interface中的 可选|只读属性

```typescript
interface Person {
	readonly name :string
  age ?: number
}
```

> 只读属性用于限制只能在对象刚刚创建的时候修改其值。此外 TypeScript 还提供了 ReadonlyArray<T>类型，它与 Array<T>相似，只是把所有可变方法去掉了，因此可以确保创建后再也不能被修改。

```typescript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```



## 任意属性

在某种特定场合下，我们希望在一个接口中除了包含必选和可选属性之外，还允许由其他的任意属性，这是我们可以使用 **索引签名**的形式来满足要求

```typescript
interface Person {
	name: string
  age?: number
  [propName: string]: string
}

let tom: Person {
  name: 'Tom',
  gender:'male'
}
// 需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集。
```



## 鸭式辨型法

```typescript
interface LabeledValue {
  label: string;
}
function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}
let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj); // OK

// -------------------------
interface LabeledValue {
  label: string;
}
function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}
printLabel({ size: 10, label: "Size 10 Object" }); // Error
```

> 上面代码，在参数里写对象就相当于是直接给 labeledObj 赋值，这个对象有严格的类型定义，所以不能多参或少参。而当你在外面将该对象用另一个变量 myObj 接收，myObj 不会经过额外属性检查，但会根据类型推论为 let myObj : { size: number, label: string} = {size: 10,label:”size 10 Object”}，然后将这个 myObj 再赋值给 labeledObj，此时根据类型的兼容性，两种类型对象，参照【鸭式辨型法】，因为都具备 label 属性，所以被认定为两个相同，故而可以用此法来绕开多余的类型检查。



## 泛型

> 使用 T，T 是一个抽象类型，只有在调用的时候才能确定它的值
>
> ```typescript
> function identity<T>(arg: T): T{
> 	return args
> }
> ```
>
> 其中 T 代表 Type，在定义泛型时通常用作第一个类型变量名称。但实际上 T 可以用任何有效名称代替。除了 T 之外，以下是常见泛型变量代表的意思：
>
> + K，表示对象中的键类型
> + V，表示对象中的值类型
> + E，表示元素类型
>
> 且并不是只能定义一个类型变量，我们可以引入希望定义的任务数量的类型变量。比如可以引入新的泛型变量 U来扩展
>
> ```typescript
> function identity <T,U>(value: T,message: U): T {
>   console.log(message)
> 	return value
> }
> ```
>
> 

### 泛型约束

> ```typescript
> function trace<T>(arg: T): T {
>   console.log(arg.size) // Error: Property 'size doesn't exist on type 'T'
>   return args
> }
> ```
>
> 报错的原因在于 T 理论上是可以是任何类型的，不同于 any，对于 T，不管使用它的什么属性，都会报错。需要进行类型约束
>
> ```typescript
> interface Sizeable {
>   size: number
> }
> function trace<T extends Sizeable>(arg:T):T {
>   console.log(arg.size)
>   return arg
> }
> ```
>
> 那么在这里，为什么不能直接见 Trace 的参数限定为 Sizeable的 类型呢？ 因为这样会有类型丢失的风险。

### 泛型工具类型

#### typeof

> 主要是在类型上下文中获取变量或者属性的类型。
>
> ```typescript
> interface Person {
>   name: string;
>   age: number;
> }
> const sem: Person = { name: "semlinker", age: 30 };
> type Sem = typeof sem; // type Sem = Person
> ```
>
> 在上面代码中，我们通过 `typeof` 操作符获取 sem 变量的类型并赋值给 Sem 类型变量，之后我们就可以使用 Sem 类型：
>
> ```typescript
> const lolo: Sem = { name: "lolo", age: 5 }
> ```
>
> 

#### infer

> 在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用。
>
> ```typescript
> type ReturnType<T> = T extends (
> 	...args: any[]
> ) => infer R ? R :any
> ```
>
> 以上代码中， infer R 就是声明一个变量来承载传入函数签名的返回值类型，简单来说，就是用它渠道函数返回值的类型方便之后使用。



### 索引类型

```typescript
let person = {
    name: 'musion',
    age: 35
}

function getValues(person: any, keys: string[]) {
    return keys.map(key => person[key])
}

console.log(getValues(person, ['name', 'age'])) // ['musion', 35]
console.log(getValues(person, ['gender'])) // [undefined]
```

> 在上述代码中，在 person中并不存在 gender，ts 也没有给出报错信息。那么如何使用 ts 对这种模式进行类型约束呢？
>
> 通过使用 索引类型 和 索引访问 操作符
>
> ```typescript
> function getValues<T, K extends keyof T>(person: T, keys: K[]): T[K][] {
>   return keys.map(key => person[key]);
> }
> 
> interface Person {
>     name: string;
>     age: number;
> }
> 
> const person: Person = {
>     name: 'musion',
>     age: 35
> }
> 
> getValues(person, ['name']) // ['musion']
> getValues(person, ['gender']) // 报错：
> // Argument of Type '"gender"[]' is not assignable to parameter of type '("name" | "age")[]'.
> // Type "gender" is not assignable to type "name" | "age".
> ```
>
> 



### Partial

> Patrial<T> 将类型的属性变成可选
>
> ```typescript
> type Partial<T> = {
>   [P in keyof T]?: T[P]
> }
> ```
>
> 在以上代码中，首先通过 keyof T 拿到 T 的所有属性名，然后使用 in 进行遍历，将值赋给 P，最后通过 T[P] 取得相应的属性值的类。中间的 ？号，用于将所有属性变为可选。
>
> ```typescript
> interface UserInfo {
>     id: string;
>     name: string;
> }
> // error：Property 'id' is missing in type '{ name: string; }' but required in type 'UserInfo'
> const xiaoming: UserInfo = {
>     name: 'xiaoming'
> }
> ```
>
> 使用 Partial<T>
>
> ```typescript
> type NewUserInfo = Partial<UserInfo>;
> const xiaoming: NewUserInfo = {
>     name: 'xiaoming'
> }
> // 在这里 NewUserInfo 就相当于
> interface NewUserInfo {
>   id?: string
>   name?: string
> }
> ```
>
> 但是 Partial<T> 有局限性，就是只支持处理第一层的属性。这是就需要使用 DeepPartial
>
> ```typescript
> type DeepPartial<T> = {
>   // 如果是 Object，则递归类型
>   [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U]
> }
> type PartialedWindow = DeepPartial<T>
> ```
>
> 

### ReturnType

> 用来得到一个函数的返回值类型
>
> ```js
> type ReturnType<T extends (...args: any[]) => any> = T extends (
>   ...args: any[]
> ) => infer R
>   ? R
>   : any;
> 复制代码
> ```
>
> `infer`在这里用于提取函数类型的返回值类型。`ReturnType<T>` 只是将 infer R 从参数位置移动到返回值位置，因此此时 R 即是表示待推断的返回值类型。

#### 举例说明

```js
type Func = (value: number) => string;
const foo: ReturnType<Func> = "1";
```

`ReturnType`获取到 `Func` 的返回值类型为 `string`，所以，`foo` 也就只能被赋值为字符串了。

### Pick

> Pick 从某一个类型中挑出一些属性出来

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

举例

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```



### Exclude

> Exclude<T,U>的作用是将某个类型中属于另一个的类型移除掉。

```typescript
type Exclude<T, U> = T extends U ? never : T;
```

如果 `T` 能赋值给 `U` 类型的话，那么就会返回 `never` 类型，否则返回 `T` 类型。最终实现的效果就是将 `T` 中某些属于 `U` 的类型移除掉。

#### 举例说明

```js
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
```

### Omit

> Omit<T, K extends keyof any>的作用是使用 T 类型中除了 K 类型的所有属性，来构造一个新的类型
>
> ```js
> type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
> ```
>
> #### 举例说明
>
> ```js
> interface Todo {
>   title: string;
>   description: string;
>   completed: boolean;
> }
> 
> type TodoPreview = Omit<Todo, "description">;
> 
> const todo: TodoPreview = {
>   title: "Clean room",
>   completed: false,
> };
> ```

## Q&A

### 什么是接口

> 在面向对象语言中，接口是对行为的抽象，而具体如何行动需要由类去实现。



### unknown 与 any 区别

> 任何类型的值都可以赋值给 any，同时 any 类型的值也可以赋值给任何类型。unknown 任何类型的值都可以赋值给它，但它只能赋值给 unknow 和 any

```typescript
let notSure: unknown = 4;
let uncertain: any = notSure; // OK

let notSure: any = 4;
let uncertain: unknown = notSure; // OK  

let notSure: unknown = 4;
let uncertain: number = notSure; // Error
```

这种机制起到了很强的预防性，更安全，这就要求我们必须缩小类型，我们可以使用 typeof、类型断言等方式来缩小未知范围

```typescript
function getDogName() {
 let x: unknown;
 return x;
};
const dogName = getDogName();
// 直接使用
const upName = dogName.toLowerCase(); // Error
// typeof
if (typeof dogName === 'string') {
  const upName = dogName.toLowerCase(); // OK
}
// 类型断言 
const upName = (dogName as string).toLowerCase(); // OK
```



### TypeScript 中的 const 和 readonly 的区别？ 枚举和常量枚举之间有什么区别？ 接口和类型别名的区别？

> const 和 readonly： const可以防止变量的值被修改，readonly可以防止变量的属性被修改。
>
> 枚举和常量枚举：常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，它们在编译阶段会被删除。常量枚举成员在使用的地方会被内联进来。之所以这么做是因为，常量枚举不允许包含计算成员。
>
> 接口和类型别名：两者都可以用来描述对象或类型的类型。与接口不同，类别别名还可以使用于其他类型，如基本类型（原始值）、联合类型、元组。

### TypeScript 中的 any 类型的作用是什么？

> 为编程阶段还不清楚类型的变量指定一个类型，这些值可能来自于动态的内容，比如来自用户输入或者后端发送的API接口数据。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。

### TypeScript 中的 any、never、unknown、null & undefined 和 void 有什么区别？

> any：动态的变量类型（失去了类型检查的作用。）
>
> never： 用不存在的值的类型。例如，never类型是那些总是会抛弃一场或者根本不会有返回值的函数表达式或箭头函数表达式的返回值类型。
>
> unknown ： 任何类型的值都可以赋值给 unknown 类型，但是 unknown 类型的值只能赋给 unknown 本身和 any 类型。
>
> null & undefined： 默认情况下， null 和 undefined 是所有类型的子类型，就是说可以把 null 和 undefined 赋值给 number 类型的变量，当指定了 strictNullCheck 标记， null 和 undefined 只能赋值给 void 和它们各自。
>
> void ： 没有任何类型。例如一个函数没有返回值，那么返回值可以定义为 void。

### TypeScript 中 type 和 interface 之间的区别？

> 相同点： 
>
> 1、都可以描述 ‘对象’ 或者 ‘函数’
>
> 2、都允许拓展。
>
> 不同点：
>
> 1、type 可以声明基本类型，联合类型，元组。
>
> 2、type 可以使用 typeof 获取实例的类型进行赋值。
>
> 3、多个相同的 interface 声明可以自动合并。
>
> 使用 interface 描述 数据结构，使用 type 描述 类型关系。

### TypeScript 中常见符号的含义

> `?. 可选链` 遇到 null 和 undefined 可以立即停止表达式的运行。
>  `?? 空值合并运算符` 当左侧操作数为 null 或 undefined 时，其返回右侧的操作数，否则返回左侧的操作数。
>  `! 非空断言运算符` x! 将从 x 值域中排除 null 和 undefined
>  `!. ` 在变量名后添加，可以断言排除undefined和null类型
>  `_ 数字分割符` 分隔符不会改变数值字面量的值，使人更容易读懂数字 .e.g 1_101_324。
>  `** `求幂

### Typescript 的 tsconfig.json 中有那些配置项信息 ？

```json
{
  "files": [],
  "include": [],
  "exclude": [],
  "compileOnSave": false,
  "extends": "",
  "compilerOptions": { ... }
}
```

`files` 是一个数组列表，里面包含指定文件的相对或绝对路径，用来指定待编译文件，编译器在编译的时候只会编译包含在files中列出的文件。
 `include & exclude` 指定编译某些文件，或者指定排除某些文件。
 `compileOnSave：true` 让IDE在保存文件的时候根据tsconfig.json重新生成文件。
 `extends` 可以通过指定一个其他的tsconfig.json文件路径，来继承这个配置文件里的配置。
 `compilerOptions` 编译配置项，如何对具体的ts文件进行编译。

