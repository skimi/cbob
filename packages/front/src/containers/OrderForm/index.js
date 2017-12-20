import React from 'react';

import connector from './connector';

import OrderForm from '../../components/OrderForm';

const OrderFormContainer = ({ isFetching, ...props }) => {
  if (isFetching) {
    return null;
  }

  return <OrderForm {...props} />
}

export default connector(OrderFormContainer);
