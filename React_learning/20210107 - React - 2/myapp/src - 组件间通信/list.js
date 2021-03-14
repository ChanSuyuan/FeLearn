import { Component } from "react";
class List extends Component {
  render() {
    const { data, openMenu, openKey, name } = this.props;
    const { title, list } = data;
    return <dl className={`friend-group ${openKey === name ? "expanded" : ""}`}>
      <dt onClick={() => {
        openMenu(openKey === name ? "" : name);
      }}>{title}</dt>
      {list.map((item, index) => {
        return <dd key={index}>{item.name}</dd>
      })}
    </dl>
  }
}

export default List;