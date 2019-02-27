import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SideBar from './SideBar';
import ItemContainer from './ItemContainer';
const ModalConfirm = React.lazy(() => import('./ModalConfirm'));
const ModalForm = React.lazy(() => import('./ModalForm'));

class Cabinet extends Component {

  render() {
    const { isLoggedIn, isModalConfirmation, isModal } = this.props;

    // In case user doesnt logged in he is being redirected back to login page
    if (!isLoggedIn) {
      return (<Redirect to='/' />)
    }

    // ModalForm and ModalConfirmation are lazily loaded not to be rerendered every time 
    // a new shipment is selected 
    return (
      <div className='cabinet-container'>
        <SideBar/>
        <ItemContainer/>
        {isModal && (
          <Suspense fallback={<div className='fallback-loading'>Loading...</div>}>
            <ModalForm/>
          </Suspense>
        )}
        {isModalConfirmation && (
          <Suspense fallback={<div className='fallback-loading'>Loading...</div>}>
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

export default connect(mapStateToProps)(Cabinet);
