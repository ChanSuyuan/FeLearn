import { Component, useEffect, useState } from "react";
// hook - 钩子函数
/*
  内置 hook：
    useState -- 使函数组件具备了state
      const [state,setState] = useState(initstate)
      - state 状态
      - setState 修改该状态的方法
        - setState useState 返回的setState ，不具备浅合并
      - initstate state 的初始值
    useEffect -- 副作用
      useEffect(()=>{
        //副作用函数
        return ()=>{
          //返还函数
        }
      },[依赖参数])
        挂载阶段：
          从上向下执行代码，执行的过程中，获取读取到 useEffect，则将 副作用函数，推入一个专属队列，在组件挂载完成之后，会将副作用函数执行，并获取到返回函数，并将返回函数推入到一个专属队列

          挂载阶段：挂载组件-->副作用函数

        更新阶段:
          从上向下执行代码，执行的过程中，获取读取到 useEffect，则将 副作用函数，推入一个专属队列，在更新完成之后，先将 返回函数队列中的函数全部执行完，执行完返回函数之后，再执行副作用函数，执行时获取新的 返回函数队列
          更新阶段：更新组件--> 返回函数 --> 副作用函数

        卸载阶段:
          即将卸载时：执行返回函数队列
      依赖参数: 组件更新时，副作用函数和返回值，在执行前，会判断 该 useEffect 依赖的这条数据是否有变化，有变化才执行没有变化则不能信

      didMount、didUpdate、willUnmont
*/
/*
  副作用: DOM获取，异步
*/
function Child() {
  const [count,setCount] = useState(1);
  const [nub,setNub] = useState(10);
  const [age,setAge] = useState(20);
  useEffect(()=>{
    console.log("组件更新及挂载都需要执行的");
  });//不写依赖就是组件更新挂载都会执行该副作用
  useEffect(()=>{
    console.log("count引起的更新及挂载都需要执行的");
  },[count]);
  useEffect(()=>{
    console.log("count或nub引起的更新及挂载都需要执行的");
  },[count,nub]);
  useEffect(()=>{
    console.log("组件挂载");
    return ()=>{
      console.log("组件即将卸载");  
    }
  },[]);//依赖为空数组，不观察更新只能组件挂载时执行

  return <div>
      <p>{count}</p>
      <button onClick={()=>{
        setCount(count+1);
      }}>递增</button>
      <p>{nub}</p>
      <button onClick={()=>{
        setNub(nub+2);
      }}>递增</button>
      <p>{age}</p>
      <button onClick={()=>{
        setAge(age+2);
      }}>递增</button>
  </div>
}

export default Child;