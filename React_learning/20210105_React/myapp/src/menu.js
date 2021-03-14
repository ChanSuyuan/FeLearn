import { Component } from "react";
/*
  状态机
*/
class Menu extends Component {
    state={
      show:false 
    }
    render(){
      //console.log(this.props);
      const {title,data} = this.props;
      const {show} = this.state;
      return <li className={show?"subList-show":""}>
        <a onClick={()=>{
          this.setState({
            show:!show
          })
        }}>{title}</a>
        <ul className="subList">
          {data.map((item,index)=><li key={index}>{item}</li>)}
        </ul>
      </li>
    }
}

export default Menu;