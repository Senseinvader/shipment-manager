import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handleLogin, sendErrorMessage } from '../actions/loginActions';
import { Redirect } from 'react-router-dom';

class LoginForm extends Component {
  constructor() {
    super();
    this.onChangeEmail = e => this.props.onChangeEmail(e.target.value);
    this.onChangePassword = e => this.props.onChangePassword(e.target.value);
    this.sendErrorMessage = message => this.props.sendErrorMessage(message);
    this.submitForm = (email, password) => e => {
      e.preventDefault();
      this.props.submitForm(email, password);
    }
  }

  validateForm() {
    const {email, password} = this.props;
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      this.sendErrorMessage('Please provide an email address.');
    } else if (!regex.test(email)) {
      this.sendErrorMessage('That is not a valid email.');
    } else if (!password) {
      this.sendErrorMessage('You forgot about password');
    } else {
      this.props.submitForm(email, password);
    }
  }

  render() {
    const {email, password, isLoggedIn} = this.props;

    if(isLoggedIn) {
      return (<Redirect to='admin'/>)
    }

    return (
      <div className='login-container'>
        <div className="login-header">
          <h1>Sign In</h1>
        </div>
        <div className="form-container">
          <form onSubmit={this.submitForm(email, password)}>
            <input 
              type="email" 
              className='form-input'
              placeholder='Email'
              value={email}
              onChange={this.onChangeEmail}/>
            <input 
              type="password" 
              className='form-input'
              placeholder='Password'
              value={password}
              onChange={this.onChangePassword}/>
            <button
              className='submit-button'
              type='submit'
            >LOG IN</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.loginReducer.email,
    password: state.loginReducer.password,
    isLoggedIn: state.loginReducer.isLoggedIn
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (email, password) => {dispatch(handleLogin(email, password))},
    sendErrorMessage: (message) => {dispatch(sendErrorMessage(message))},
    onChangeEmail: (email) => {dispatch({ type: 'EMAIL_CHANGED', email })},
    onChangePassword: (password) => {dispatch({ type: 'PASSWORD_CHANGED', password })}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);