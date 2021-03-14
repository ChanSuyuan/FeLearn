import { Component } from "react";
let data = `<div class="markdown-text"><h1>InnerHTML</h1><p>请大家遵守法律法规，勿发布不合规内容。</p></div>`;
// children
// class App extends Component {
//   render() {
//     return <div ref={(node)=>{
//       node.innerHTML = data;
//     }}></div>
//   }
// }
class App extends Component {
  render() {
    return <div
      dangerouslySetInnerHTML={{
        __html:data
      }}
    ></div>
  }
}

export default App;