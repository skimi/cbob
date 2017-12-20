import { connect } from 'react-redux';
import { getLastPrice } from '../../modules/selectors';
import { saveOrder } from '../../modules/actions';

const mapStateToProps = (state) => ({
  base: state.base,
  isFetching: state.prices.isFetching,
  lastBuyPrice: getLastPrice(state, state.base, 'buy'),
  lastSellPrice: getLastPrice(state, state.base, 'sell'),
  isSaving: state.orders.isSaving,
});

const mapDispatchToProps = {
  save: saveOrder,
};

export default connect(mapStateToProps, mapDispatchToProps);
