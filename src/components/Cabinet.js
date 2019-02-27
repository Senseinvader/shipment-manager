import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import SideBar from './SideBar';
import ItemContainer from './ItemContainer';
const ModalConfirm = React.lazy(() => import('./ModalConfirm'));
const ModalForm = React.lazy(() => import('./ModalForm'));

class Cabinet extends Component {

  render() {
    const {isLoggedIn, isModalConfirmation, isModal} = this.props;
    if (!isLoggedIn) {
      return (<Redirect to='/' />)
    }

    return (
      <div className='cabinet-container'>
        <SideBar/>
        <ItemContainer/>
        {isModal && (
          <Suspense fallback={<div>Loading...</div>}>
            <ModalForm/>
          </Suspense>
        )}
        {isModalConfirmation && (
          <Suspense fallback={<div>Loading...</div>}>
            <ModalConfirm/>
          </Suspense>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
    isModalConfirmation: state.shipmentReducer.isModalConfirmation,
    isModal: state.shipmentReducer.isModal
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cabinet);
