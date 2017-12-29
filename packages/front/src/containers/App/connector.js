import { connect } from 'react-redux';
import { fetchAccounts } from '../../modules/actions';

const mapStateToProps = (state) => ({
  isFetching: state.accounts.isFetching,
  hasAccounts: state.accounts.data && state.accounts.data.length
});

const mapDispatchToProps = {
  fetchAccounts,
};

export default connect(mapStateToProps, mapDispatchToProps);
