import React, { Component } from 'react';
import connector from './connector';

import App from '../../components/App';

class AppContainer extends Component {
  componentWillMount() {
    this.props.fetchAccounts();
  }

  render() {
    if (this.props.isFetching || !this.props.hasAccounts) {
      return 'loading...';
    }

    return (
      <App />
    )
  }
}

export default connector(AppContainer);
