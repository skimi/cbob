import { connect } from 'react-redux';
import { changeBase } from '../../modules/actions';
import { getAccountsBalance } from '../../modules/selectors';

const mapStateToProps = (state) => ({
  balances: getAccountsBalance(state),
});

const mapDispatchToProps = {
  changeBase,
};

export default connect(mapStateToProps, mapDispatchToProps);
