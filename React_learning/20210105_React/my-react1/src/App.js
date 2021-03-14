import { Component } from 'react';
import "./index.css"
import List from "./list"
import data from "./data"
class App extends Component {
  render() {
    return <div className="friend-list">
      {Object.keys(data).map(item=>{
        console.log(item);
        return <List key ={item} data={data[item]}/>
      })}
    </div>
  }
}

export default App;
