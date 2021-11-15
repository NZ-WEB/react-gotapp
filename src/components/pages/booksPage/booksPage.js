import React, {Component} from 'react';
import GotService from "../../../services/gotService";
import AppAlert from "../../errorMessage";
import ItemList from "../../itemList";
import ItemDetails from "../../itemDetails";
import Field from "../../field";
import RowBlock from "../../RowBlock";

export default class BooksPage extends Component {
  gotService = new GotService();

  state = {
    selectedItem: 2,
    error: false
  }

  componentDidCatch(error, errorInfo) {
    this.setState({startError: true});
    console.log(error)
  }

  onSelectItem = id => {
    this.setState({
      selectedItem: id
    })
  }

  render() {

    if (this.state.startError) {
      return <AppAlert></AppAlert>
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onSelectItem}
        getData={this.gotService.getAllBooks}
        renderItem={({name}) => name}
      />
    )

    const charDetails = (
      <ItemDetails
        itemId={this.state.selectedItem}
        getItem={this.gotService.getBook}
      >
        <Field field="name" label="Name" />
        <Field field="numberOfPages" label="Numbers of pages" />
        <Field field="publisher" label="Publisher" />
      </ItemDetails>
    )

    return (
      <RowBlock left={itemList} right={charDetails}/>
    )
  }
}
