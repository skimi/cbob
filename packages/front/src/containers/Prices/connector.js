import { connect } from 'react-redux';
import { fetchHourlyPrices } from '../../modules/actions'

const mapStateToProps = (state) => ({
  base: state.base,
  currency: state.currency,
  prices: state.prices.hour,
  isFetching: state.prices.isFetching,
});

const mapDispatchToProps = {
  fetchHourlyPrices,
};

export default connect(mapStateToProps, mapDispatchToProps);
