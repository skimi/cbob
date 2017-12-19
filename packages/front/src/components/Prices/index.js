import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Prices extends Component {
  componentWillMount() {
    const { base, currency } = this.props;
  }

  render() {
    const { base, currency, prices } = this.props;
    return (
      <div>
        <h1>{base}-{currency}</h1>
        <table>
          <tbody>
            {prices.map(price => (
              <tr key={price._id}>
                <td>{price.type}</td>
                <td>{price.amount}</td>
                <td>{moment(price.time).format('DD/MM/Y HH:mm:ss')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

Prices.propTypes = {
  base: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
};

export default Prices;
