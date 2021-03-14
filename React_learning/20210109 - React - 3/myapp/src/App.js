import { Component, useState } from "react";
import Child from "./child";
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
*/
// class List extends Component {
//   componentDidMount(){
//     console.log("挂载完成-获取一次数据");
//   }
//   componentDidUpdate(){
//     // 判断是否是翻译引起的组件更新
//     console.log("如果是翻页引起的组件更新--重新获取数据")
//   }
//   render(){
//     // 获取数据
//     return //渲染虚拟DOM
//   }
// }
function App() {
  const [show,changeShow] = useState(true);
  return <div>
  {show?<Child />:""}
      <button onClick={()=>{changeShow(!show)}}>显示隐藏</button>
  </div>
}

export default App;