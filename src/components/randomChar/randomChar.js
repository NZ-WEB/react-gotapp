import React, {Component} from 'react';
import styled from "styled-components";
import GotService from '../../services/gotService';
import Spinner from "../spinner";
import AppAlert from "../errorMessage";

const RandomBlock = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;

  h4 {
    margin-bottom: 20px;
    text-align: center;
  }

  .term {
    font-weight: bold;
  }
`;

export default class RandomChar extends Component {
  constructor(props) {
    super(props);
    this.updateChar();
  }

  gotService = new GotService();
  state = {
    char: {},
    loading: true,
    error: false,
    errorItem: {}
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false,
      error: false
    })
    console.log(this.state)
  }

  onError = (err) => {
    const errObj = {name: err.name, message: err.message};

    this.setState({
      error: true,
      loading: false,
      errorItem: errObj
    })

    console.error(err)

    console.log(this.state.errorItem)

  }

  updateChar() {
    const id = Math.floor(Math.random() * 140 + 25);
    this.gotService.getCharacter(id)
      .then(this.onCharLoaded)
      .catch(e => this.onError(e))
  }

  render() {
    const {char, loading, error, errorItem} = this.state;

    const errorMessage = error ? <AppAlert title={errorItem.name} description={errorItem.message}/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;
    const spinner = loading ? <Spinner/> : null;

    return (
      <RandomBlock className="rounded">
        {errorMessage}
        {spinner}
        {content}
      </RandomBlock>
    );
  }
}

const View = ({char}) => {

  const {name, gender, culture, born, died} = char
  return (
    <>
      <h4>Random Character: {name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Gender </span>
          <span>{gender}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Born </span>
          <span>{born}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Died </span>
          <span>{died}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Culture </span>
          <span>{culture}</span>
        </li>
      </ul>
    </>
  )
}
