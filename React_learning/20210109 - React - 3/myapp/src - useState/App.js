import { useState } from "react";
// 函数式组件 - 16.7之前 无状态组件纯渲染组件
/*
  function 组件名(props){
      return 构建的虚拟DOM
  }
*/
// 16.7 之前函数组件中即没有状态，也没有生命周期


// hook - 钩子函数
/*
  内置 hook：
    useState -- 使函数组件具备了state
    const [state,setState] = useState(initstate)
    - state 状态
    - setState 修改该状态的方法
      - setState useState 返回的setState ，不具备浅合并
    - initstate state 的初始值
*/

// function App() {
//   const [count,setCount] = useState(1);
//   const [nub,setNub] = useState(10);
//   return <div>
//       <p>{count}</p>
//       <button onClick={()=>{
//         setCount(count+1);
//       }}>递增</button>
//       <p>{nub}</p>
//       <button onClick={()=>{
//         setNub(nub+2);
//       }}>递增</button>
//   </div>
// }
function App() {
  const [state, setState] = useState({
    count: 1,
    nub: 10
  });
  const { count, nub } = state;
  return <div>
    <p>{count}</p>
    <button onClick={() => {
      setState({
        ...state,
        count: count + 1
      })
    }}>递增</button>
    <p>{nub}</p>
    <button onClick={() => {
      setState({
        ...state,
        nub: nub + 10
      })
    }}>递增</button>
  </div>
}

export default App;