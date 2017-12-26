import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import darkUnica from 'highcharts/js/themes/dark-unica';
import Highcharts from 'highcharts/highstock';

import styles from './styles.scss';

darkUnica(Highcharts);

class Prices extends Component {
  componentDidMount() {
    const { base, currency, prices } = this.props;

    Highcharts.stockChart('container', {
      rangeSelector: {
        selected: 1
      },

      title: {
        text: `${base}-${currency}`
      },

      plotOptions: {
        candlestick: {
          color: 'white',
          upColor: 'blue'
        }
      },

      series: [{
        type: 'candlestick',
        name: `${base}-${currency}`,
        data: this.props.prices.map(price => ([
          +new Date(price.time),
          parseFloat(price.open.amount),
          parseFloat(price.highest.amount),
          parseFloat(price.lowest.amount),
          parseFloat(price.close.amount),
        ])),
        dataGrouping: {
          units: [
            [
              'week', // unit name
              [1] // allowed multiples
            ], [
              'month',
              [1, 2, 3, 4, 6]
            ]
          ]
        }
      }]
    });
  }

  render() {
    const { base, currency, prices } = this.props;
    return (
      <div className={styles.prices}>
        <div id="container"></div>
      </div>
    )
  }
}

Prices.propTypes = {
  base: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
};

export default Prices;
