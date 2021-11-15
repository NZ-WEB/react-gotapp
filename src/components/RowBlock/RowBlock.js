import React, {Component} from 'react';
import {Col, Row} from "reactstrap";

export default class RowBlock extends Component {
  render() {
    const {left, right} = this.props;

    return (
      <Row>
        <Col md='6'>
          {left}
        </Col>
        <Col md='6'>
          {right}
        </Col>
      </Row>
    )
  }
}
