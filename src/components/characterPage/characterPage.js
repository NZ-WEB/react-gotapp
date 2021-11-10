import React, {Component} from 'react';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import {Col, Row} from 'reactstrap';
import AppAlert from "../errorMessage";

export default class CharacterPage extends Component {
  state = {
    selectedChar: 130,
    error: false
  }

  componentDidCatch(error, errorInfo) {
    this.setState({startError: true});
  }

  onCharSelected = id => {
    this.setState({
      selectedChar: id
    })
  }

  render() {

    if (this.state.startError) {
      return <AppAlert></AppAlert>
    }

    return (
      <Row>
        <Col md='6'>
          <ItemList onCharSelected={this.onCharSelected} />
        </Col>
        <Col md='6'>
          <CharDetails charId={this.state.selectedChar} />
        </Col>
      </Row>
    )
  }
}
