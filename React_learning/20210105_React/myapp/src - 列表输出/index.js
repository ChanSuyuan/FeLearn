import ReactDOM from "react-dom";
/*
  列表输出: 
    1. 根据原有数据映射出一个数组
    2. 列表输出时，每一项必须有 key 值，暂时先用 - 索引值
*/
// const data = [
//   "列表-1",
//   "列表-2",
//   "列表-3"
// ];
// const dataArr = data.map(item=><li>{item}</li>);
const data = {
  a:{
    title: "列表-1"
  },
  b:{
    title: "列表-2"
  },
  c:{
    title: "列表-3"
  }
}
//console.log(Object.values(data));
const dataArr = Object.keys(data).map((item,index)=><li key={index}>{data[item].title}</li>);
const list = <ul>{dataArr}</ul>;
ReactDOM.render(
  list,
  document.querySelector("#root")
);