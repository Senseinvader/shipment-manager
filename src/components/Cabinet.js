import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import SideBar from './SideBar';
import ItemContainer from './ItemContainer';


class Cabinet extends Component {

  render() {
    const {isLoggedIn} = this.props;
    if (!isLoggedIn) {
      return (<Redirect to='/' />)
    }

    return (
      <div className='cabinet-container'>
        <SideBar/>
        <ItemContainer/>
      </div>
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
    
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cabinet);
