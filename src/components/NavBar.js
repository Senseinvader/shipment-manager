import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'


class NavBar extends Component {

  render() {
    const { onLogout, isLoggedIn } = this.props;
    let logoutButton;

    if(isLoggedIn) {
      logoutButton = <button className='logout-button submit-button' onClick={onLogout}><NavLink to='/'>LOG OUT</NavLink></button>;
    } else {
      logoutButton = null;
    }

    return (
      <nav className='nav-container'>
        <div className='logo'>YSBM</div>
        {logoutButton}
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => { dispatch({type: 'USER_LOGGED_OUT'}) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);