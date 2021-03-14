import { Component } from "react";
class List extends Component {
  state = {
    open: false
  }
  changeOpen=()=>{
    const {open} = this.state;
    this.setState({
      open:!open
    })
  }
  render(){
    const {data} = this.props;
    const {title,list} = data;
    const {open} = this.state;
    return <dl className={`friend-group ${open?"expanded":""}`}>
        <dt onClick={this.changeOpen}>{title}</dt>
        {list.map((item,index)=>{
            return <dd key={index}>{item.name}</dd>
        })}
    </dl>
  }
}

export default List;