import React, { Component } from 'react';
class AddMessage extends Component {
    state={
        name:"",
        message: ""
    }
    render() {
        let {name,message} = this.state;
        let {addMessage} = this.props;
        return <div className="addMessage">
            <input 
                type="text" 
                placeholder="请输入昵称" 
                value={name}
                onChange={({target})=>{
                    this.setState({
                        name: target.value
                    })
                }}
            />
            <textarea 
                placeholder="请输入留言"
                value={message}
                onChange={({target})=>{
                    this.setState({
                        message: target.value
                    })
                }}
            ></textarea>
            <button onClick={()=>{
                if(name.trim()&&message.trim()){
                    addMessage(name,message);
                    this.setState({
                        name: "",
                        message:""
                    })
                } else {
                    alert("请输入完整内容");
                }
            }}>提交留言</button>
        </div>
    }
}

export default AddMessage;
