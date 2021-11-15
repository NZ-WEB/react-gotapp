import React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails from '../../itemDetails';
import AppAlert from "../../errorMessage";
import GotService from '../../../services/gotService';
import RowBlock from "../../RowBlock";
import Field from "../../field";


export default class CharacterPage extends Component {
  gotService = new GotService();

  state = {
    selectedItem: 130,
    error: false
  }

  componentDidCatch(error, errorInfo) {
    this.setState({startError: true});
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
        getData={this.gotService.getAllCharacters}
        renderItem={({name}) => name}
      />
    )

    const charDetails = (
      <ItemDetails
        itemId={this.state.selectedItem}
        getItem={this.gotService.getCharacter}
      >
        <Field field="name" label="Name"/>
        <Field field="gender" label="Gender"/>
        <Field field="born" label="Born"/>
        <Field field="death" label="Death"/>
        <Field field="culture" label="Culture"/>
      </ItemDetails>
    )
    return (
      <RowBlock left={itemList} right={charDetails}/>
    )
  }
}
