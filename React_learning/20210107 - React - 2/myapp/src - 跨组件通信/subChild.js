import { Component } from "react";
import context from "./context"
// import { Consumer } from "./context";
// class SubChild extends Component {
//   render() {
//     console.log(this);
//     return <>
//         {/* <p>count:{count}</p>
//         <button onClick={()=>{
//           add();
//         }}>递增</button> */}
//         <Consumer>
//           {(context)=>{
//               console.log(context);
//               return <div></div>
//           }}
//         </Consumer>
//     </>
//   }
// }
class SubChild extends Component {
  static contextType = context;
  render() {
    //console.log(this);
    const {count,add} = this.context;
    return <>
        <p>count:{count}</p>
        <button onClick={()=>{
          add();
        }}>递增</button>
    </>
  }
}

export default SubChild;