import React, {Component} from 'react';
import {Alert} from 'reactstrap'
import './error.css'

export default class AppAlert extends Component {

  render() {
    const {title, description} = this.props;

    return (
      <Alert
        color="danger"
      >
          <img className="sized" src={process.env.PUBLIC_URL + '/img/error.png'}  alt="error"/>

        Ошибка: {title}, Описание: {description}
      </Alert>
    )
  }
}
