import { createRef, PureComponent } from "react";
/*
  PureComponent 具备 Component 的所有功能，同时在 shouldComponentUpdate 会自动进行浅对比

  ref：获取节点实例
  1. ref 属性中接收的是一个函数，挂载或节点更新时，会调用该函数，并传入组件实例或DOM节点
  2. 通过 createRef 可以创建一个 ref 对象，将该对象覆盖 元素的 ref 属性，react 自动将 组件实例或DOM节点，还 ref 对象绑定，通过 ref 对象就可以获取到 实例
*/
class Todo extends PureComponent {
  constructor(props){
      super(props);
      this.state = {
        toEdit: false,
        editText: props.data.title
      }
  }
  static getDerivedStateFromProps(props){
    return props;
  }
  componentDidUpdate(prevProps,prevState){
    //console.log(this.editInput,this.todoLi);
    if(prevState.toEdit === false&&this.state.toEdit){ //刚刚的更新是进入编辑状态的更新
     // this.editInput.focus();
     this.editInput.current.focus();
    }
  }
  editInput = createRef();
  todoLi = createRef();
  render() {
    const {data,remove,changeDone,toEdit,changeTitle,editText} = this.state;
    const {id,title,done} = data;
    return <li className={toEdit?"editing":""} ref={this.todoLi}>
        <div className={"todo " + (done?"done":"")}>
          <div className="display">
            <input 
              className="check" 
              type="checkbox" 
              checked={done}
              onChange={({target})=>{
                  changeDone(id,target.checked);
              }}
            />
            <div 
              className="todo-content"
              onDoubleClick={()=>{
                //  this.setState({toEdit:true},()=>{
                //     //更新完成之后获得焦点
                //     this.editInput.focus();
                //   })
                this.setState({toEdit:true})
                  // 注意并不是在这里就更新完了
              }}
            >{title}</div>
            <span className="todo-destroy" onClick={()=>{remove(id)}}></span>
          </div>
          <div className="edit">
          {/* <input 
              className="todo-input" 
              type="text" 
              onBlur={()=>{
                this.setState({toEdit:false})
              }}
              ref={(node)=>{
                  this.editInput = node;
              }}
            /> */}
            <input 
              className="todo-input" 
              type="text" 
              value={editText}
              onChange={({target})=>{
                //changeTitle(id,target.value);//不要直接修改title，而是复制一份新的，在新的state去修改
                this.setState({
                  editText: target.value
                })
              }}
              onBlur={()=>{
                // 退出编辑状态，判断是否为空，不为空则修改 title，为空恢复编辑前的 title
                if(editText.trim()){
                  changeTitle(id,editText);
                } else {
                  this.setState({
                    editText: title
                  }) 
                }
                this.setState({toEdit:false})
              }}
              ref={this.editInput}
            />
          </div>
        </div>
      </li>
  }
}

export default Todo;