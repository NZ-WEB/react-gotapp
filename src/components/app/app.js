import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import AppAlert from "../errorMessage";
import CharacterPage from "../pages/characterPage";
import GotService from '../../services/gotService'
import BooksPage from "../pages/booksPage/booksPage";
import HousesPage from "../pages/housesPage";
import BooksItem from "../pages/booksItem";
import {BrowserRouter, Route} from 'react-router-dom';


export default class App extends Component {
  gotService = new GotService()

  state = {
    randomItemShowed: false,
    startError: false,
  }

  componentDidCatch(error, errorInfo) {
    this.setState({startError: true});
  }

  updateShowingRandomChar = () => {
    const newCondition = !this.state.randomItemShowed;
    this.setState({randomItemShowed: newCondition});
  }

  render() {
    const {randomItemShowed} = this.state;

    const randomChar = randomItemShowed ? <RandomChar /> : null;

    if (this.state.startError) {
      return <AppAlert></AppAlert>
    }

    return (
      <BrowserRouter>
        <div className="app">
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
                <Button
                  onClick={this.updateShowingRandomChar}>{randomChar ? 'Скрыть' : 'Показать случайного персонажа'}</Button>
              </Col>
            </Row>
              <Route path="/" render={() => <h1 className="text-white"> Welcome to GOT DM</h1>}/>
              <Route path="/books" component={BooksPage}/>
              <Route path="/characters"  component={CharacterPage}/>
              <Route path="/houses" component={HousesPage}/>
              <Route path="/books/:id" render={({match}) => {
                const {id} = match.params;
                return <BooksItem bookId={id}/>
              }}/>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
};
