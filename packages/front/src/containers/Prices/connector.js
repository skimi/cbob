import { connect } from 'react-redux';
import { fetchPrices } from '../../modules/actions'

const mapStateToProps = (state) => ({
  base: state.base,
  currency: state.currency,
  prices: state.prices.data,
  isFetching: state.prices.isFetching,
});

const mapDispatchToProps = {
  fetchPrices,
};

export default connect(mapStateToProps, mapDispatchToProps);
