import React, { Component, createRef } from 'react';
class MessageLi extends Component {
    constructor(props){
        super(props);
        this.state={
            edit: false,
            editVal:props.data.message 
        }
    }
    editTextarea = createRef();
    componentDidUpdate(prevProps,prevState){
        if(this.state.edit&&(!prevState.edit)){
            this.editTextarea.current.select();
        }
    }
    render() {
        let {edit,editVal} = this.state;
        let {data,removeMessage,checkedMessage,editMessage} = this.props;
        let {id,name,message,checked} = data;
        return <li className={edit?"editing":""}>
                <h3>{name}</h3>
                <input 
                    type="checkbox" 
                    checked={checked} 
                    onChange={({target})=>{
                        checkedMessage(id,target.checked);
                    }}
                />
                <p onDoubleClick={()=>{
                    this.setState({
                        edit:true
                    })
                }}>{message}</p>
                <textarea
                    ref={this.editTextarea}
                    value={editVal}
                    onChange={({target})=>{
                        this.setState({
                            editVal:target.value
                        })
                    }}
                    onBlur={()=>{
                        if(editVal.trim()){
                            editMessage(id,editVal);
                        } else {
                            this.setState({
                                editVal: message
                            })
                        }
                        this.setState({
                            edit:false
                        })
                    }}
                ></textarea>
                <a onClick={()=>{
                    removeMessage(id);
                }}>删除</a>
            </li>
    }
}

export default MessageLi;
