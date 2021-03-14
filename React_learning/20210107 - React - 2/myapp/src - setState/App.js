import { Component } from "react";
/*
  - setState(updater, [callback])
    - updater: 更新数据 FUNCTION/OBJECT
    - callback: 更新成功后的回调 FUNCTION
    - 异步: react 通常会集齐一批需要更新的组件，然后一次性更新来保证渲染的性能
    - 浅合并 Object.assign()
    - 调用 setState 之后，会触发生命周期，重新渲染组件
*/
class App extends Component {
  state = {
    count: 1,
    time: 10,
    nub: {
      number: 5,
      name: "开课吧"
    }
  }
  render() {
    const { count, time, nub } = this.state;
    return <div>
      <p>count:{count}</p>
      <button onClick={() => {
        this.setState(()=>{
            // 处理 count 的更新问题
            let nub = count%2?1:3;
            return {
              count: count + nub
            }
        },()=>{
          console.log("组件更新完成");
        });
      }}>Count 递增</button>
      <p>time: {time}</p>
      <button onClick={() => {
        this.setState({
          time: time + 10
        })
      }}>time 递增</button>
      <p>name: {nub.name}</p>
      <p>nub: {nub.number}</p>
      <button onClick={() => {
        this.setState({
          nub: {
            ...nub,
            number: nub.number + 5,
          }
        })
      }}>time 递增</button>
      <button onClick={() => {
        this.setState({
          count: count + 1
        });
        this.setState({
          time: time + 10
        })
        this.setState({
          nub: {
            ...nub,
            number: nub.number + 5,
          }
        })
      }}>全部递增</button>
    </div>
  }
}

export default App;