/*
  JSX-runtime
  在 React 17 及之后，如果该模块中只使用 React 的 JSX 的话，可以不引入 React 模块
*/
import React from "react";
import ReactDOM from "react-dom";
const data = {
  title: "欢迎进入 React 的世界",
  subtitle: "没有 JSX 的React 世界是黑暗的"
}
const div = <div 
  className={"main-" + "box"}
  style={{
    width: 400,
    height: 400,
    background: "red"
  }}  
>
  <header>
    <h1>{data.title}</h1>
    <p>{data.subtitle}</p>
  </header>
</div>;

ReactDOM.render(
  div,
  document.querySelector("#root")
);