# 前端手写题



## Instanceof  原型链判断

- **判断一个实例是否是其父类或者祖先类型的实例。Instanceof 会在查找过程中遍历左边变量的原型链，直到找到 origin 的 prototype 为止，找不到就返回false。**

```javascript
let myInstanceOf = (target, orgin) => {
	while(target){
  	if(target.__proto__ == origin.prototype){
    	return true
    }
    target = target.__proto__
  }
  return target
} 
```

## 数组扁平化

- **多维数组转化为一维数组。**

```javascript
// concat 
function flatten(arr){
	var res = []
  for(let i = 0;i < arr.lengthl; i ++){
    if(Array.isArray(res[i]){
  		res = res.concat(flatten(arr[i]))
  	}else{
    	res.push(arr[i])
    }
  }
	return res
}
```



## Promise

- **根据 Promise A+ 规范提出，Promise 共含有三种状态： PENDING、FULFILLED、 REJECTED**



```javascript
// ES5 Promise

const STATUS = {
	PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected"
}

class myPromise {
  // receive a cb
	constructor(excutor){
  	this._status = STATUS.PENDING
    this._value = undefined
    this._resolveQueue = []
    this._rejectedQueue = []
  }
  
  const resolve = value => {
  	const run = () => {
    	if(this._STATUS = STATUS.PENDING) {
      	this._status = STATUS.FULFILLED
        this._value = value
      }
      
      //resolve cb
      while(this._resolveQueue.length) {
      	const cb = this._resolveQueue.shift()
        cb(value)
      }
    }
  }
  
  const reject = value => {
  	const run = () => {
    	if(this._STATUS = STATUS.PENDING){
      	this._status = STATUS.REJECTED
        this._value = value
      }
    }
    
    //resolve cb
    while(this._rejectedQueue.length) {
    	const cb = this._rejectedQueue.shift()
      cb(value)
    }
  }
}

// Promise.then
Promise.prototype.then = function(onResolved, onRejected) {
  var self = this
  var promise2

  // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
  onResolved = typeof onResolved === 'function' ? onResolved : function(value) {}
  onRejected = typeof onRejected === 'function' ? onRejected : function(reason) {}

  if (self.status === 'resolved') {
    // 如果promise1(此处即为this/self)的状态已经确定并且是resolved，我们调用onResolved
    // 因为考虑到有可能throw，所以我们将其包在try/catch块里
    return promise2 = new Promise(function(resolve, reject) {
      try {
        var x = onResolved(self.data)
        if (x instanceof Promise) { // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
          x.then(resolve, reject)
        }
        resolve(x) // 否则，以它的返回值做为promise2的结果
      } catch (e) {
        reject(e) // 如果出错，以捕获到的错误做为promise2的结果
      }
    })
  }

  if (self.status === 'rejected') {
    return promise2 = new Promise(function(resolve, reject) {
      try {
        var x = onRejected(self.data)
        if (x instanceof Promise) {
          x.then(resolve, reject)
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  if (self.status === 'pending') {
    return promise2 = new Promise(function(resolve, reject) {
      self.onResolvedCallback.push(function(value) {
        try {
          var x = onResolved(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })

      self.onRejectedCallback.push(function(reason) {
        try {
          var x = onRejected(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}


//Promise.all  数组，其中只要有一项失败返回rejected，那么这个Promise就会立即停止，返回一个reject
Promise.prototype.all = function(promises) {
	return new Promise(function(resolve, reject) {
  	if(!isArray(promises)) {
    	return reject(new TypeError('arguments must be an array'))
    }
    var resolvedCounter = 0
    var promiseNum = promises.length
    var resolvedValues =  new Array(promiseNum)
    (var i = 0; i < promiseNum; i++) {
      (function(i) {
        Promise.resolve(promises[i]).then(function(value) {
          resolvedCounter++
          resolvedValues[i] = value
          if (resolvedCounter == promiseNum) {
            return resolve(resolvedValues)
          }
        }, function(reason) {
          return reject(reason)
        })
      })(i)
    }
  })
}
```



## 节流 

- **原理：在事件被触发 n 秒之后再执行回调，如果在 n 秒之内又被触发，则重新进行计时。**
- **适用场景：按钮提交、搜索框联想**

```javascript
// 简易版
function debounce(func, wait) {
	let timeout
  return function() {
  	const context = this
    const args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(function() {
    	func.apply(context, args)
    }, wait)
  }
}
// 立即执行函数 即定义之后立即触发，n 秒之后再次触发。
function debounce(func, wait, immediate) {
	let timeout
  return function () {
  	const context = this
    const args = arguments
    if (timeout) clearTimeout(timeout)
    if (immediate) {
    	const callNow = !timeout
      timeout = setTimeout(function () {
      	timeout = null
      },wait)
      if (callNow) func.apply(context, args)
    } else {
    	timeout = setTimeout(function () {
      	func.apply(context, args)
      }, wait)
    }
  }
}
```

## 防抖

- **原理：规定一个在单位时间内，只能触发一次函数。如果在这个单位时间里，这个函数被多次触发，只有一次生效。**
- 适用场景：拖拽场景、缩放场景。

```javascript
// 使用时间戳，当触发事件的时候，我们取出当前的时间戳，然后减去之前的时间戳(最一开始值设为 0 )，
// 如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行。

function throttle(func, wait) {
	let context, args
  let previous = 0
  
  return function() {
  	let now = +new Date()
    context = this
    args = arguments
    if(now - previous > wait) {
    	func.apply(context, args)
      previous = now
    }
  }
}

// 使用定时器实现 当出发事件时，设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，知道定时器执行，然后执行函数，清空定时器。
function throttle(func, wait) {
	let timeout
  return function() {
  	const context = this
    const args = arguments
    if(!timeout) {
    	timeout = setTimeout(function () {
      	timeout = null
        func.apply(context, args)
      }, wait)
    }
  }
}
```

