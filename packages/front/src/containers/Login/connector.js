import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { saveToken } from '../../modules/actions';

const mapDispatchToProps = {
  saveToken,
};

export default compose(
  connect(null, mapDispatchToProps),
  withRouter,
);
