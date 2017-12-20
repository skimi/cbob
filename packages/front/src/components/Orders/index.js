import React from 'react';

import styles from './styles.scss';

const Orders = ({ orders, base }) => {
  const filteredOrders = orders.filter(order => order.base === base);

  return (
    <div className={styles.orders}>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Subtype</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order._id}>
                <td>{order.type}</td>
                <td>{order.subtype}</td>
                <td>{order.amount}</td>
                <td>{order.price}</td>
                <td>{order.price * order.amount}€</td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="4" className={styles.noOrder}>No order</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
