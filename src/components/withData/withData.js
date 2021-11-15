import React, {Component} from 'react';
import Spinner from "../spinner";

export default function(View, getData) {
  return class extends Component {

    state = {
      data: null
    }

    componentDidMount() {

      getData()
        .then(data => {
          this.setState({
            data
          })
        })
    }

    render() {
      const {data} = this.state;

      if (!data) {
        return <Spinner/>
      }

      return <View {...this.props} data={data} />
    }
  }
}
