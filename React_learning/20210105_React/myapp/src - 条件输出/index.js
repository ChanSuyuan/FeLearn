import ReactDOM from "react-dom";
/*
  条件输出：
    ||、&&、?: 
    函数
*/
const fn=(nub)=>{
  if(nub < 5){
      return "小于5";
  }
  if(nub < 10){
    return "小于10";
  }
  if(nub < 20){
    return "小于20";
  } 
  return "大于等于20"
}
const div = <div>
  <div>左侧不成立||返回右侧 - {2<0||"不成立"}</div>
  <div>左侧成立&&返回右侧 - {2>0&&"成立"}</div>
  <div>条件?成立:不成立 - {2<0?"成立":"不成立"}</div>
  <div>{fn(20)}</div>
</div>;
ReactDOM.render(
  div,
  document.querySelector("#root")
);