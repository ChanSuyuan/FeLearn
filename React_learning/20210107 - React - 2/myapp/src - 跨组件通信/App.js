import { Component } from "react";
import Child from "./Child";
import {Provider} from "./context";
class App extends Component {
  state = {
    count: 1
  }
  add = () => {
    const { count } = this.state;
    this.setState({
      count:count + 1
    });
  }
  render() {
    const { count } = this.state;
    return <Provider
      value={{
        count:count,
        add:this.add
      }}
    >
        <Child />
    </Provider>
  }
}

export default App;