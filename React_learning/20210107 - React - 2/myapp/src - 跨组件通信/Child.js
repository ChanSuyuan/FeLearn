import { Component } from "react";
import SubChild from "./subChild";
class Child extends Component {
  render() {
    return <>
      <SubChild />
    </>
  }
}

export default Child;