import React, {Component} from 'react';
import styled from "styled-components";
import GotService from '../../services/gotService'
import Spinner from "../spinner";

const ItemListUl = styled.ul`
  .list-group-item {
    cursor: pointer;
  }
`;

export default class ItemList extends Component {

  gotService = new GotService();

  state = {
    charList: null
  }

  componentDidMount() {
    this.gotService.getAllCharacters()
      .then(charList => {
        this.setState({
          charList
        })
      })
  }

  renderItems(arr) {
    return arr.map((item, i) => {
      return (
        <li
          className="list-group-item"
          key={41 + i}
          onClick={() => this.props.onCharSelected(i)}
        >
          {item.name}
        </li>
      )
    })
  }

  render() {
    const {charList} = this.state;

    if (!charList) {
      return <Spinner/>
    }

    const items = this.renderItems(charList);

    return (
      <ItemListUl className="list-group">
        {items}
      </ItemListUl>
    );
  }
}
