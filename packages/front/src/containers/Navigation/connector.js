import { connect } from 'react-redux';
import { changeBase } from '../../modules/actions';

const mapDispatchToProps = {
  changeBase,
};

export default connect(null, mapDispatchToProps);
