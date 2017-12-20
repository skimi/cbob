import { connect } from 'react-redux';
import { fetchOrders } from '../../modules/actions'
import { getBase } from '../../modules/selectors'

const mapStateToProps = (state) => ({
  base: getBase(state),
  orders: state.orders.data,
  isFetching: state.orders.isFetching,
});

const mapDispatchToProps = {
  fetchOrders,
};

export default connect(mapStateToProps, mapDispatchToProps);
