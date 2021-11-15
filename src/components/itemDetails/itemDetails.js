import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotService'

const ItemDetailsWrapper = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;

  h4 {
    margin-bottom: 20px;
    text-align: center;
  }
;
`;

export default class itemDetails extends Component {

  gotService = new GotService();

  state = {
    item: null
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const {itemId, getItem} = this.props;
    if (!itemId) {
      return;
    }

    getItem(itemId)
      .then(item => {
        this.setState({item});
      })
  }

  render() {
    if (!this.state.item) {
      return <span className="selectError text-white">Please select a itemacter</span>
    }

    const {item} = this.state;
    const {name} = item;

    return (
      <ItemDetailsWrapper className="rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {
            React.Children.map(this.props.children, child => {
              return React.cloneElement(child, {item})
            })
          }
        </ul>
      </ItemDetailsWrapper>
    );
  }
}
