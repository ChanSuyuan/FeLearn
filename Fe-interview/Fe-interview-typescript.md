# TypeScript

## 什么是 TypeScript

> TypeScript 是一个强类型的 JavaScript 超集，支持 ES6 语法，支持面向对象编程的概念，如类、接口、继承、泛型等。

## TypeScript 中的 const 和 readonly 的区别？ 枚举和常量枚举之间有什么区别？ 接口和类型别名的区别？

> const 和 readonly： const可以防止变量的值被修改，readonly可以防止变量的属性被修改。
>
> 枚举和常量枚举：常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，它们在编译阶段会被删除。常量枚举成员在使用的地方会被内联进来。之所以这么做是因为，常量枚举不允许包含计算成员。
>
> 接口和类型别名：两者都可以用来描述对象或类型的类型。与接口不同，类别别名还可以使用于其他类型，如基本类型（原始值）、联合类型、元组。

## TypeScript 中的 any 类型的作用是什么？

> 为编程阶段还不清楚类型的变量指定一个类型，这些值可能来自于动态的内容，比如来自用户输入或者后端发送的API接口数据。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。

## TypeScript 中的 any、never、unknown、null & undefined 和 void 有什么区别？

> any：动态的变量类型（失去了类型检查的作用。）
>
> never： 用不存在的值的类型。例如，never类型是那些总是会抛弃一场或者根本不会有返回值的函数表达式或箭头函数表达式的返回值类型。
>
> unknown ： 任何类型的值都可以赋值给 unknown 类型，但是 unknown 类型的值只能赋给 unknown 本身和 any 类型。
>
> null & undefined： 默认情况下， null 和 undefined 是所有类型的子类型，就是说可以把 null 和 undefined 赋值给 number 类型的变量，当指定了 strictNullCheck 标记， null 和 undefined 只能赋值给 void 和它们各自。
>
> void ： 没有任何类型。例如一个函数没有返回值，那么返回值可以定义为 void。

## TypeScript 中 type 和 interface 之间的区别？ 

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

## TypeScript 中常见符号的含义

> `?. 可选链` 遇到 null 和 undefined 可以立即停止表达式的运行。
>  `?? 空值合并运算符` 当左侧操作数为 null 或 undefined 时，其返回右侧的操作数，否则返回左侧的操作数。
>  `! 非空断言运算符` x! 将从 x 值域中排除 null 和 undefined
>  `!. ` 在变量名后添加，可以断言排除undefined和null类型
>  `_ 数字分割符` 分隔符不会改变数值字面量的值，使人更容易读懂数字 .e.g 1_101_324。
>  `** `求幂

## Typescript 的 tsconfig.json 中有那些配置项信息 ？

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
 `compilerOptions` 编译配置项，如何对具体的ts文件进行编译

