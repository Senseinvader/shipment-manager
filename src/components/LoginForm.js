import React, { Component } from 'react'
import { connect } from 'react-redux';
import { validateForm } from '../actions/loginActions';
import { Redirect } from 'react-router-dom';

class LoginForm extends Component {
  constructor() {
    super();
    this.onChangeEmail = e => this.props.onChangeEmail(e.target.value);
    this.onChangePassword = e => this.props.onChangePassword(e.target.value);
    this.sendErrorMessage = message => this.props.sendErrorMessage(message);
    this.submitForm = (email, password) => e => {
      e.preventDefault();
      this.props.validateForm(email, password);
    }
  }

  render() {
    const { email, password, isLoggedIn, errorMessage } = this.props;

    // In case of placing token to localStorage it would be possible to 
    // automaticly redirect a user to the cabinet on page refresh, if he/she didnt logged out
    if(isLoggedIn) {
      return (<Redirect to='admin'/>)
    }

    return (
      <div className='login-container'>
        <div className="login-header">
          <h1>Sign In</h1>
        </div>
          <form onSubmit={this.submitForm(email, password)}>
            <ul className='flex-form'>
              <li>
                <input 
                  type="text" 
                  className='form-input'
                  placeholder='Email'
                  value={email}
                  onChange={this.onChangeEmail}/>
              </li>
              <li>
                <input 
                  type="password" 
                  className='form-input'
                  placeholder='Password'
                  value={password}
                  onChange={this.onChangePassword}/>
              </li>
              <li>
                <p className="error-message">{errorMessage}</p>
              </li>
              <li>
                <button
                  className='submit-button'
                  type='submit'
                >LOG IN</button>
            </li>
            </ul>
          </form>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.loginReducer.email,
    password: state.loginReducer.password,
    isLoggedIn: state.loginReducer.isLoggedIn,
    errorMessage: state.loginReducer.errorMessage
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    validateForm: (email, password) => { dispatch(validateForm(email, password)) },
    onChangeEmail: (email) => { dispatch({ type: 'EMAIL_CHANGED', email })},
    onChangePassword: (password) => { dispatch({ type: 'PASSWORD_CHANGED', password }) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);