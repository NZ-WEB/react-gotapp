import React, {Component} from 'react';
import styled from "styled-components";
import Spinner from "../spinner";
import PropTypes from 'prop-types';

const ItemListUl = styled.ul`
  .list-group-item {
    cursor: pointer;
  }
`;

export default class ItemList extends Component {

  state = {
    itemList: null
  }

  componentDidMount() {
    const {getData} = this.props;

    getData()
      .then(itemList => {
        this.setState({
          itemList
        })
      })
  }

  renderItems(arr) {
    return arr.map((item, i) => {

      const {name} = item;
      const label = this.props.renderItem(item);

      return (
        <li
          className="list-group-item"
          key={name + i}
          onClick={() => this.props.onItemSelected(i)}
        >
          {label}
        </li>
      )
    })
  }

  render() {
    const {itemList} = this.state;

    if (!itemList) {
      return <Spinner/>
    }

    const items = this.renderItems(itemList);

    return (
      <ItemListUl className="list-group">
        {items}
      </ItemListUl>
    );
  }
}

ItemList.defaultProps = {
  onItemSelected: () => {}
}

ItemList.propTypes = {
  onItemSelected: PropTypes.func
}
