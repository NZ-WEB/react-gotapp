import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import AppAlert from "../errorMessage";
import CharacterPage from "../characterPage";


export default class App extends Component {
  state = {
    randomCharShowed: false,
    startError: false,
  }

  componentDidCatch(error, errorInfo) {
    this.setState({startError: true});
  }

  updateShowingRandomChar = () => {
    const newCondition = !this.state.randomCharShowed;
    this.setState({randomCharShowed: newCondition});
  }

  render() {
    const {randomCharShowed} = this.state;

    const randomChar = randomCharShowed ? <RandomChar/> : null;

    if (this.state.startError) {
      return <AppAlert></AppAlert>
    }

    return (
      <>
        <Container>
          <Header/>
        </Container>
        <Container>
          <Row>
            <Col lg={{size: 5, offset: 0}}>
              {randomChar}
            </Col>
          </Row>
          <Row>
            <Col className="justify-content-center d-flex mb-4">
              <Button onClick={this.updateShowingRandomChar} >{randomChar ? 'Скрыть': 'Показать случайного персонажа'}</Button>
            </Col>
          </Row>
          <CharacterPage/>
        </Container>
      </>
    );
  }
};
