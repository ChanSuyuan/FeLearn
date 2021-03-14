import { Fragment } from "react";
import ReactDOM from "react-dom";
/*
  JSX 注意事项:
    1. JSX 并不是 html
    2. JSX 也不是字符串
    3. JSX 最终会被解析成一个 VDOM，也就是说 JSX 是一个值
      - JSX 必须有一个顶层，且只有一个顶层父级
      - Fragment 包含容器，最终不会被渲染成真正的DOM
      - React 17 及之后可以使用 <></> 来作为父级
    4. JSX 中区分大小写，标签名要小写，组件名首字母大写
    5. JSX 所有的标签都必须闭合
    6. 列表输出时，必须添加 key
    7. 在 JSX 中，一些属性的写法 和 html 不一致
      - class --> className
      - style 的值接收的是一个对象
*/
const data = {
  a: {
    title: "列表-1"
  },
  b: {
    title: "列表-2"
  },
  c: {
    title: "列表-3"
  }
}
//console.log(Object.values(data));
const dataArr = Object.keys(data).map((item, index) => <li key={index}>{data[item].title}</li>);
// const list = <Fragment>
//   <ul>{dataArr}</ul>
//   <div>div</div>
// </Fragment>;
const list = <>
  <ul>{dataArr}</ul>
  <div>div</div>
</>;
console.log(list);
ReactDOM.render(
  list,
  document.querySelector("#root")
);