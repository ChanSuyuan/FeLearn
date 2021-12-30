# Golang
## 优势

+ Golang 是静态类型语言，在编译的时候能够检查出隐藏的大多数问题。
+ 天生支持并发，能够充分利用多核
+ runtime系统调度机制，搞笑的GC垃圾回收，丰富的标准库
+ 面向对象，跨平台。



## 声明方式

```go
// 多变量声明 多行方式
var {
	vv int = 100
  j boolean = true
}
// 冒等声明方式，但不支持全局
e := 100
// 自动匹配变量数据类型
var c = 100

var c int = 100
```



## 常量

> const 多枚举类型应用场景，后端编写 status code

```go
// 常量
const length int = 10
fmt.Println("length =",length)


// const 来定义枚举类型
const (
  // 可以在 const ()添加关键字 iota,每行的 iota都会叠加1，第一行的iota的默认值是0
  // iota 只能在 const 中使用
	BEIJING = iota 
  SHANGHAI
  SHENZHEN
)
// 类似 Symbol.iterator
	fmt.Println("BEIJING = ",BEIJING) // BEIJING = 0
	fmt.Println("SHANGHAI = ",SHANGHAI) // SHANGHAI = 1
	fmt.Println("SHENZHEN = ",SHENZHEN) // SHENZHEN = 2
```



## 函数多返回值写法

```go
// 赋值返回，当不给r1 r2赋值时，默认均为0，且不会报错。
// 下列中的 r1 int r2 int 也可写成 r1,r2 int。
func foo2(a string, b int) (r1 int, r2 int){
  fmt.Println("a = ",a)
  fmt.Println("b = ",b)
  r1 = 1000
  r2 = 2000
  return
}

func main(){
  ret1,ret2 := foo2("haha",333) // => "a = haha" "b = 333" r1 = 1000 r2 = 2000
}
```



## init 函数 与 import 导包

### init 函数

![递归导入包](https://img-blog.csdn.net/20180308161418275?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYmVuYmVuXzIwMTU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

> 初始化顺序，导包过程中，在main包下，不会继续执行下一步，而是进入 pkg1中，解析其内容，以此类推，最后返回main包。这是一个入栈出栈的流程。需要留意的是，导包的接口名称首字母需要大写 例如 func Lib2Test() {}



### import 导包

> 在 Go 中进行导包，需要注意，如果在 import 之后，并没有在文件中运用到导入文件的方法等，会触发 lib1语法错误。需要注释掉 lib1 的 import ，但是这样就不会执行 lib1 中的 init 函数了。
>
> 特定的应用场景，如果需要执行 lib1 的 init 函数，而在 main 中不使用 lib1 的其他方法，而不触发语法错误。则可以在 import 中对导入进行匿名。

```go
// e.g
package main

import (
  "lib1" // 匿名写法  => _ "lib1" 这样在 main()中，即使不适用 lib1 中的方法，也不会触发语法错误。
  "lib2" // 赋值写法 => myLib2 "lib2" 这样写
  // 点写法 => . "lib2" 这种写法即导入 lib2 中的所有方法，直接在 main() 中调用即可 尽量避免使用，容易引发冲突。
)
func main(){
  lib1.Lib1Test() // 如果注释该接口，则会触发语法错误，需要注释吊 lib1 的import
  lib2.Lib2Test()
  // myLib2.Lib2Test()
  // Lib2Test()
}
```



## 指针（数据类型）

![image-20211223223725931](C:\Users\Csy\AppData\Roaming\Typora\typora-user-images\image-20211223223725931.png)

![image-20211223223927536](C:\Users\Csy\AppData\Roaming\Typora\typora-user-images\image-20211223223927536.png)

```go
// pointer
package main

func swap (a *int,b *int){
  var temp int
  temp = *a // temp = main::a
  *a = *b // main:: a = main::b
  *b = temp // main::b = temp
}

func main(){
	var a int = 10
  var b int = 20
  
  // swap
  swap(&a,&b)
  
  fmt.Println("a = ",a, "b = ",b) // 20 10
}
```



## defer 语句调用顺序

> 采用的是一种压栈的理解，使用 defer 进行声明后，其语句会在 main() 结束之前，生命周期之后执行，而对于栈的理解，先进后出。

```go
package main 
//....

func fun1(){
  fmt.Println("A")
}
func fun2(){
  fmt.Println("B")
}
func fun3(){
  fmt.Println("C")
}

func main(){
  defer func1()
  defer func2()
  defer func3() // C B A
}
```

> 需要留意，return 与 defer 两者的执行顺序解析中，return 是要优先于 defer 的。

```go
package main

import "fmt"

func returnFunc int {
  fmt.Println("return func called...")
}

func deferFunc int {
  fmt.Println("defer func called...")
}

func returnAndDefer() {
  defer deferFunc()
  return returnFunc()
}

func main(){
  returnAndDefer() // return func called... defer func called...
}
```



## 切片 slice（动态数组）

```go

// 静态数组
package main

import "fmt"

func main(){
	var myArray1 [10]int
  
  myArray2 := [10]int{1,2,3,4}
  // 值传递
	for i:= 0; i < len(myArray1); i ++ {
		fmt.Println(myArray1[i])
	}
  
  for index,value:=range myArray2 {
    fmt.Println("index = ",index, "value = ", value)
  }
}
// 打印 10 个 0
//index =  0 value =  1
//index =  1 value =  2
//index =  2 value =  3
//index =  3 value =  4
//index =  4 value =  0
//index =  5 value =  0
//index =  6 value =  0
//index =  7 value =  0
//index =  8 value =  0
//index =  9 value =  0
```

```go
// 动态数组

package main
import "fmt"
func printArray(myArray []int){
  // 采用引用传递
  // _ 表示匿名的变量
  for _,value := range myArray {
    fmt.Println("value = ",value)
  }
}

func main(){
  myArray := []int{1,2,3,4} //动态数组，切片
  
  printArray(myArray)
  
  for _,value:= range myArray{
    fmt.Println("value = ",value)
  }
}
```

### Slice 声明方式

```go
slice1 := [] int {1,2,3,4} // 声明 slice1 是一个切片，并且初始化，默认值是 1 2 3 4 长度 len 为 4

var slice1 []int // 声明 slice1 是一个切片，但是并没有给 slice 分配空间，需要使用 make() 开辟空间
// slice1 = make([]int , 3)  3 指的是开辟的空间，默认值为 0

var slice1 []int = make([]int,3)

slice := make([]int,3)

// 判断 slice 是否为空
if slice1 == nil {
  //....
} else {
  //....
}
```

### 切片容量的追加

> len 与 cap，切片的长度和容量不同，长度表示左指针至右指针之间的距离，容量表示在左指针至底层数组末尾的距离。

```go
// 通过 var arr = make([]int,3) 或是 var arr = make([]int,3,5) 创建切片
// 在通过 append 动态添加元素的时候，如果当前长度len超过了容量cap，那么 Go 底层会为当前切片再申请 cap 个容量的空间进行连接，容量夸大为原来两倍。

func main(){
  s := []int {1,2,3}
  s1 := s[0:2]
  fmt.Println(s1) // [1,2]
  s1[0] = 100
  fmt.Println(s) [100,2,3]
  fmt.Println(s1) [100,2]
  
  // copy 可以将底层数组的slice一起进行拷贝
  s2 := make([]int,3)
  
  // 将s中的值，依次拷贝到s2中
  copy(s2,s)
  fmt.Println(s2) // 100,2,3
}
```



## Map

###  声明

```go
// 声明 myMap1 是一种 map 类型 key 是 string， value 是 string
var myMap1 = map[string]string
myMap1 = make(map[string]string,10)

// 第二种
myMap2 := make(map[int]string )
// 第三种
myMap3 := map[string]string {
  "one":"php"
  //....
}
```

### 使用方式

```go
func main(){
  cityMap := make(map[string]string)
  // 添加 
  cityMap["China"] = "Beijing"
  cityMap["USA"] = "NewYork"
  cityMap["Japan"] = "Tokyo"
  
  // 遍历
  for key,value:=range cityMap {
    fmt.Println("key = ", key, "value = ",value)
  }
  
  // 删除
  delete(cityMap,"China")
  
  //修改
  cityMap["USA"] = "DC"
}

// 对于 map 的函数参数传递，传递的是指针，而不只是值。
```



## 面向对象特征

### 封装

```go
type myint int

type Book struct {
	title string
  auth string
}

func changeBook (book Book){
	// 传递的是 book 的副本，结构体传值，传递的是 book 的值，而不是指针
  book.auth = "li4"
}

func changBook2 (book *Book){
	book.auth = "wang5"
}

func main(){
  var book1 Book
  book1.title = "Golang"
  book1.auth = "zhang3"
  
  fmt.Printf("%v\n",book1)
  
  changeBook(book1)
  
  fmt.Printf("%v\n",book1)
  
  changeBook2(&book1)
  
  fmt.Printf("%v\n",book1)
}
```

#### 结构体与类进行绑定，类的表示

```go
package main

import "fmt"

// 如果类名首字母大写，表示其他包也能够访问
type Hero struct {
  // 如果说类的属性首字母大写，表示该属性是对外能够访问到的，否则只能类内部访问。类似 public private
	Name string
  Ad int
  Level int
}

func (this *Hero) Show() {
  fmt.Println("Name =", this.Name)
  fmt.Println("Ad =", this.Ad)
  fmt.Println("Level =", this.Level)

}

// 这里的this， 谁调用他，这个this 就指向谁。 这里的 string 指的是返回值类型
func (this *Hero) GetName() string {
  return this.Name
}

func (this *Hero) SetName(newName string) {
  // this 是调用该方法的对象的一个副本 （拷贝）传递还是传值的，故而要实现改变原来元素值，则需要加指针。
	this.Name = newName
}

func main(){
  // 创建对象
  hero := Hero{Name:"zhang3", Ad: 100,Level:1}
  hero.Show()
	hero.SetName("li4") // 这里传值默认带上了&
  hero.Show()
}
```



## 继承

```go
package main

import "fmt"

type Human struct {
  name string
  sex string
}

func (this *Human) Eat(){
  fmt.Println("Human.Eat()....")
}

func (this *Human) Walk(){
  fmt.Println("Human.Walk()....")
}

type SuperMan struct {
	Human // SuperMan 类继承了 Human类 的方法
  level int
}

// 重定义父类的方法
func (this *SuperMan) Eat(){
  fmt.Println("SuperMan.Eat()....")
}

// 子类的新方法
func (this *SuperMan) Fly(){
  fmt.Println("SuperMan.Fly()...")
}

func main(){
  h := Human{"zhang3","female"}
  
  h.Eat()
  h.Walk()
  
  s := SuperMan{Human{"li4","female"},2}
  s.Walk() //父类的方法
  s.Eat() // 子类的方法
  s.Fly() // 子类的方法
}
```



### 多态

> 基本要素，有一个父类（有接口），有子类（实现了父类的全部接口方法）。父类类型的变量（指针）指向（引用）子类的具体数据变量

```go
package main

// 本质是一个指针
type AnimalIf interface {
  Sleep()
  GetColor() string 
  getType() string
}

// 具体的类
type Cat struct {
  color string
}

func (this *Cat) Sleep(){
  fmt.Println("Cat is sleeping")
}

func (this *Cat) GetColor() string{
  return this.color
}

func (this * Cat) GetType() string {
  return "Cat"
}

func main(){
  var animal AnimalIf // 接口的数据类型，父类指针
  animal = &Cat{"Green"}
  
  animal.Sleep() // 调用的就是 Cat 的 Sleep() 方法
}
```

> interface 通用万能类型 interface{} ,可以使用 interface{}类型表示任何数据类型

```go

// interface{} 是万能数据类型
func myFunc(arg interface{}){
  fmt.Println("MyFunc is called....")
  fmt.Println(arg)
  
  // interface{} 如何区分 此时引用的底层数据类型到底是什么?
  
  // 给interface {} 提供 "类型断言" 的机制.
  value, ok := arg.{string}
  if !ok {
    fmt.Println("arg is not string type")
  } else {
    fmt.Println("arg is string type, value = ", value)
  }
  
}
type Book struct {
  auth string
}

func main(){
  book := Book{"Golang"}
  myFunc(book) //
}
```



### 变量内置的 pair 结构  类型断言

![image-20211224162825869](C:\Users\Csy\AppData\Roaming\Typora\typora-user-images\image-20211224162825869.png)

```go
package main

import (
	"fmt"
  "io"
  "os"
)

func main(){
  // tty: pair<type:*os.File, value:"/dev/tty" 文件描述符>
  tty, err := os.OpenFile("/dev/tty", os.O_RDWR,0)
  
  if err != nil {
    fmt.Println("open file error",err)
    return
  }	
  
  // r: pari<type: , value: >
  var r io.Reader
  // r: pair<type: *os.File, value:"/dev/tty" 文件描述符>
  r = tty
  // w: pair<type: , value: >
  var w = io.Writer
  // w: pair<type: *os.File, value:"/dev/tty" 文件描述符>
  w = r.(io.Writer)
  
  w.Write([]byte("Hello THis is a Test \n"))
}
```



## 反射

 

```go
package main

import (
  "fmt"
  "reflect"
)

type User struct {
	Id int
  Name string
  Age int
}

func (this *User) Call(){
  fmt.Println("user is called")
  // fmt.Println("%v\n",this)
}

func reflectNum(arg interface{}){
  fmt.Println("type : ", reflect.TypeOf(arg))
  fmt.Println("value : ", reflect.ValueOf(arg))
}

func main() {
  var num float64 = 1.2345
  reflectNum(num)
//type :  float64
//value :  1.2345
  user := User{1,"AceId",18}
  DoFiledAndMethod(user)
}

func DoFiledAndMethod(input interface{}) {
  // 获取 input 的 type
  inputType := reflect.TypeOf(input)
  fmt.Println("inputType is :", inputType.Name())
  
  // 获取 input 的 value
  inputValue := reflect.ValueOf(input)
  fmt.Println("inputValue is :",inputValue)
  
  // 通过 type 获取里面的字段
  // 1、获取interface 的 reflect.Type， 通过Type得到 NumField 进行遍历
  // 2、得到每个 field，数据类型
  // 3、 通过field 有一个Interface() 方法得到对应的value
  for i := 0; i < inputType.NumField(); i++ {
    field := inputType.Field(i)
    value := inputValue.Field(i).Interface()
    fmt.Printf(field.Name,field.Type,value)
  }
  
  // 通过 type 获取里面的方法，调用
	for i := 0; i < inputType.NumMethod(); i ++ {
		m := inputType.Method(i)
		fmt.Printf("%s: %v\n", m.Name,m.Type)
	}
}

```



## 结构体标签 需要通过反射进行解读

> 注意此处的 tag中的标签，保证kv类型，且冒号两侧不能有空格

```go
package main

import (
	"fmt"
  "reflect"
)

type resume struct {
  Name string	`info:"name" doc:"我的名字"`
  Sex string	`info:"sex"`
}

func findTag(str interface{}){
  t := reflect.TypeOf(str).Elem()
  
  for i:= 0; i < t.NumField(); i ++{
    tagstring := t.Field(i).Tag.Get("info")
    tagdoc := t.Field(i).Tag.Get("doc")
    fmt.Println("info:", tagstring,"doc: ",tagdoc)
  }
}

func main(){
  var re resume
	findTag(&re)
}
```



### 结构体标签在json中引用 / orm映射关系

```go
package main

import (
	"fmt"
  _"reflect"
	"encoding/json"
)
type Movie struct {
  Title string     `json:"title"`
  Year int				 `json:"year"`
  Price int				 `json:"rmb"`
  Actors []string  `json:"actors"`
}

func main(){
  movie := Movie{"God",2000,120,[]string{"zhang3","li4"}}

	// 编码的过程 结构体 --> json
	jsonStr, err := json.Marshal(movie)
	if err != nil {
		fmt.Println("json marshal error", err)
		return
	}

	fmt.Printf("jsonStr = %s\n",jsonStr) //jsonStr = {"title":"God","year":2000,"rmb":120,"actors":["zhang3","li4"]}

	// 解码的过程 jsonStr --> 结构体
	myMovie := Movie{}
	err = json.Unmarshal(jsonStr,&myMovie)
	if err != nil {
		fmt.Println("json unmarshal error",err)
		return
	}

	fmt.Printf("%v\n", myMovie) //{God 2000 120 [zhang3 li4]}
}
```



## goroutine

```go
package main

import (
	"fmt"
  "time"
)
// 子 goroutine
func newTask(){
  i := 0
  for {
    i ++
    fmt.Printf("new Goroutine : i = %d\n", i)
    time.Sleep( 1 * time.Second)
  }
}
// 主 goruntime
func main (){
  // 创建一个 go 程 区执行 newTask() 流程
  go newTask()
  fmt.Println("main goroutine exit")
  i:= 0
  for {
    i ++
    fmt.Printf("new Goroutine : i = %d\n", i)
    time.Sleep( 1 * time.Second)
  }
}               
         
```



```go
package main

import (
	"fmt"
  "time"
  "runtime"

)

func main (){
  // 用go 创建承载一个形参为空，返回值为空的一个函数
  go func (){
    defer fmt.Println("A.defer")

    func (){
      defer fmt.Println("B.defer")
      // return 这里如果填写return 那么 只是退出当前匿名函数，而不是跳出 当前 goroutine
      // 若要退出当前 goroutine 则需要 runtime.Goexit()
      runtime.Goexit() // 则只打印 B.defer A.defer
      fmt.Println("B")
    }()
    fmt.Println("A")
  }()
   
  // ===== 在这里使用go创建形参不为空，且返回值为布尔类型等值的时候，goroutine 无法使用 赋值( := )的方式获取 这个 true
  // 需要使用 channel
  // go func(a int, b int) bool {
  //   fmt.Println("a = ",a ,", b =", b)
  //   return true
  // }(10,20)

  for {
    time.Sleep(1 * time.Second)
  }
}
```



## channel

> channel 是 goroutine 之间相互联系的声明的一种数据类型。通过 make(chan Type) 方式进行创建，等同于 make(chan Type,0)
>
> 

+ 管道的写操作 `channel <- value` 发送 value 到 channel中
+ `<-channel`接收并将其丢弃
+ ` X:= <-channel` 从channel中接收数据，并赋值给x
+ `x,ok:= <-channel`功能同上，同时检查通道是否已关闭或者是否为空。



### 有缓冲的channel

> 特点： 当channel 已经满，再向里面写数据，就会阻塞，当channel为空，从里面取数据也会阻塞

```go
package main

import (
	"fmt"
  "time"
  _"runtime"

)

func main (){
  c:= make(chan int, 3) // 带有缓冲的channel

  fmt.Println("len(c) = ",len(c),", cap = ", cap(c))

  go func(){
    defer fmt.Println("子go进程结束")
    for i:=0; i < 3; i ++ {
      c <-i
      fmt.Println("子go程正在运行,发送的元素 = ",i," len(c)=", len(c),", cap(c) = ", cap(c))
    }
  }()

  time.Sleep(2 * time.Second)

  for i:= 0;i < 3; i++ {
    num := <-c // 从c中接收数据，并赋值给 num
    fmt.Println("num = ", num)
  }

  fmt.Println("main 结束")
}
```



### 关闭的channel

> channel 不像文件一样需要经常取关闭，只有当你确实没有任何发送数据了，或者你想显式的结束range循环之类的，才去关闭channel
>
> 关闭channel后，无法向channel再发送数据（引发panic错误后导致接收立即返回零值）
>
> 关闭channel后，可以继续从channel接收数据
>
> 对于 nil channel，无论发收都会被阻塞。

```go
package main

import (
  "fmt"
)

func main(){
  c:=make(chan int)
  
  go func() {
    for i:= 0; i < 5; i ++ {
      c <- i
    }
    close(c) // close可以关闭一个channel
  }()
  
  for{
    // ok 如果为 true 表示 channel 没有关闭，如果为false 表示channel 已经关闭。
    if data,ok := <-c; ok {
      fmt.Println(data)
    } else {
      break
    }
  }
  fmt.Println("Main Finished...")
}
```



### channel 与 range

```go
package main

import (
  "fmt"
)

func main(){
  c:=make(chan int)
  
  go func() {
    for i:= 0; i < 5; i ++ {
      c <- i
    }
    close(c) // close可以关闭一个channel
  }()
  
  for data := range c{
    fmt.Println(data)
  }
  fmt.Println("Main Finished...")
}
```



### channel 与 select

> 单流程下一个go只能监控一个channel的状态，select 可以完成监控多个channel 的状态。
>
> ```go
> select {
>   case <- chan1:
>    //如果chan1成功读到数据，则进行该case处理语句
>   case chan2 <- 1:
>   // 如果成功向chan2写入数据，则进行该case处理语句
>   default:
>    //如果上面都没有成功，则进入default处理流程。
> }
> ```
>
> select 具备多路channel的监控功能

```go
package main

import "fmt"

func fibonacii(c,quit chan int){
  x,y:=1,1

  for {
    select {
      case c <- x:
        // 如果 c 可写，则该 case 就会进来。
        x = y
        y = x + y
      case <- quit:
        fmt.Println("quit")
        return
    }
  }
  
}

func main() {
	c:= make(chan int)
	quit := make(chan int)
	
  go func() {
    for i:= 0; i < 6; i ++{
      fmt.Println(<-c)
    }
    
    quit <- 0
  }()

  fibonacii(c,quit)
}
```



## Go PATH

> 弊端：无版本控制概念，无法同步一致第三方版本号，无法指定当前项目引用的第三方版本号



## Go Modules

> 1、开启 go Modules模块 保证GO111MODULE =on => go env -w GO111MODULE = on / export GO111MODULE =on
>
> 2、初始化项目，任意文件夹下创建一个项目(go  mode init) 创建go mod 文件，同时起当前项目的模块名称。
>
> go mod init github.com/..../....
>
> 
