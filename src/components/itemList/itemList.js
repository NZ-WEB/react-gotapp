import React, {Component} from 'react';
import styled from "styled-components";
import Spinner from "../spinner";
import PropTypes from 'prop-types';
import GotService from '../../services/gotService';
import WithData from "../withData/withData";

const ItemListUl = styled.ul`
  .list-group-item {
    cursor: pointer;
  }
`;

class ItemList extends Component {

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
    const {data} = this.props;
    const items = this.renderItems(data);

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


const {getAllCharacters} = new GotService();
export default WithData(ItemList, getAllCharacters);
