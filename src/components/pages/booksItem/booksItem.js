import React, {Component} from 'react';
import GotService from '../../../services/gotService'
import ItemDetails from '../../itemDetails'
import Field from "../../field";

export default class BooksItem extends Component {
  gotService = new GotService();


  render() {
    return (
      <ItemDetails
          itemId={this.props.bookId}
          getItem={this.gotService.getBook}
        >
          <Field field="name" label="Name" />
          <Field field="numberOfPages" label="Numbers of pages" />
          <Field field="publisher" label="Publisher" />
      </ItemDetails>
    )
  }
}
