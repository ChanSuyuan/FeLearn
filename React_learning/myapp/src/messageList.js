import React, { Component } from 'react';
import MessageLi from './messageLi';
class MessageList extends Component {
    render() {
        let {data} = this.props;
        return <ul className="messageList">
            {data.map(item=><MessageLi key={item.id} {...this.props} data={item}/>)}
        </ul>
    }
}

export default MessageList;
