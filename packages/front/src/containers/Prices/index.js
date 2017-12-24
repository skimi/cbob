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
    const { fetchHourlyPrices, base, currency } = props;
    fetchHourlyPrices({ base, currency });
  }

  render() {
    if (this.props.isFetching) {
      return 'Fetching...';
    }

    return (
      <Prices
        {...omit(this.props, ['fetchHourlyPrices', 'isFetching'])}
      />
    )
  }
}

export default connector(PricesContainer);
