import { Component } from "react";
import Child from "./child";
// children
class App extends Component {
  render() {
    return <div>
      <Child>
          <h1>hello Children</h1>
          <p>这是要传入子元素的内容</p>
      </Child>
    </div>
  }
}

export default App;