import React, {Component} from 'react';

export default class Field extends Component {
  
  render() {
    const {item, field, label} = this.props;

    return (
      <li className="list-group-item d-flex justify-content-between">
        <span className="term">{label}</span>
        <span>{item[field]}</span>
      </li>
    )
  }
}
