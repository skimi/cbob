import React, { Component } from 'react';
import omit from 'lodash/omit';
import connector from './connector';

import Prices from '../../components/Prices';

class PricesContainer extends Component {
  componentWillMount() {
    this.fetch(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.base !== nextProps.base || this.props.currency !== nextProps.currency) {
      this.fetch(nextProps);
    }
  }

  fetch(props) {
    const { fetchPrices, base, currency } = props;
    fetchPrices({ base, currency });
  }

  render() {
    if (this.props.isFetching) {
      return 'Fetching...';
    }

    return (
      <Prices
        {...omit(this.props, ['fetchPrices', 'isFetching'])}
      />
    )
  }
}

export default connector(PricesContainer);
