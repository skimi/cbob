import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class Login extends Component {
  static = {
    input: null,
  }

  render() {
    const { onSubmit } = this.props;
  
    return (
      <div className={styles.wrapper}>
        <form className={styles.login} onSubmit={(e) => {
          e.preventDefault();
          onSubmit(this.input.value);
        }}>
          <input
            className={styles.input}
            placeholder="!%$_@"
            type="password"
            ref={(ref) => this.input = ref}
          />
          <button className={styles.button} type="submit">Login</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Login;
