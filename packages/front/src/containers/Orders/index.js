import React, { Component } from 'react';
import omit from 'lodash/omit';
import connector from './connector';

import Orders from '../../components/Orders';

class OrdersContainer extends Component {
  componentWillMount() {
    this.fetch(this.props);
  }

  fetch(props) {
    const { fetchOrders, base, currency } = props;
    fetchOrders();
  }

  render() {
    if (this.props.isFetching) {
      return 'Fetching...';
    }

    return (
      <Orders
        {...omit(this.props, ['fetchOrders', 'isFetching']) }
      />
    )
  }
}

export default connector(OrdersContainer);
