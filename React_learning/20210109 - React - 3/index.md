# React-3
## 课程目标
- 掌握 React 其他 API 使用：key、PureComponent、ref、children、dangerouslySetInnerHTML
- todoList 应用

## 课程内容
### key 的问题
在 React ，组件每次更新时，会生成一个 虚拟DOM，和原有的虚拟DOM进行对比。
如果是批量生成的一组元素，那React就会根据 key 值去做对比
**一个列表中的每一项 key 是唯一的**
**如果列表中发生顺序等操作变化，key 一定要用数据的id**

### PureComponent 
PureComponent 提供了一个具有浅比较的 shouldComponentUpdate 方法,其他和 Component 完全一直

### ref
- createRef()
- 注意：在 组件挂载完成之后及更新之后使用

### children
- 组件标签对之间的内容会被当做一个特殊的属性 props.children 传入组件内容
- 可以自定义结构的组件的常用形式
    - children
    - 传递函数
    - 传递子组件

### dangerouslySetInnerHTML
直接设置标签的 innerHTML

## 实战 - 完整todoList
## 练习
基于留言板练习，完善留言板功能 
- 在留言板效果中进行一下修改
  - 双击留言进入编辑状态
  - 编辑状态时失去焦点退出编辑状态修改留言，如果编辑框value为空，则显示编辑前的内容，否则更新message内容
  - 留言全选、全不选
  - 汇总留言（总条数，选中多少条）
  - 删除选中留言

## 下节课内容
- hooks
  - useEffect  副作用钩子 -- 用来替替代掉生命周期
  - useRef 
  - 自定义 hook
  - hooks 使用规范
- React-router-dom
  - SPA （单页应用）
  - React-router-dom
    - hashRouter
    - browserRouter
    - Route
      - 匹配规则
    - Link
