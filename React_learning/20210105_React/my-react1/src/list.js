
import { Component } from 'react';

class List extends Component {
  render() {
      console.log(this.props);
      const {data} = this.props;
      const {title,list} = data;
    return <dl className="friend-group expanded">
      {/* expanded 拓宽 */}
        <dt>{title}</dt>
        {list.map((item,index)=>{
            return <dd key = {index}>{item.name}</dd>
        })}
      </dl>
  }
}

export default List;
