import React, { Component } from 'react';
class Sum extends Component {
    render() {
        let {data,removeCheckedMessage,checkedAllMessage} = this.props;
        let checkedData = data.filter(item=>item.checked);
        return <div className="sum">
            <label>
                <input 
                    type="checkbox" 
                    checked={data.length === checkedData.length} 
                    onChange={({target})=>{
                        checkedAllMessage(target.checked);
                    }}
                />
                <span>选中全部</span>
            </label>
            {checkedData.length>0?<a onClick={()=>{
                removeCheckedMessage();
            }}>删除选中项</a>:""}
            <p>当前选中{checkedData.length}项，共{data.length}条留言</p>
        </div>
    }
}

export default Sum;
