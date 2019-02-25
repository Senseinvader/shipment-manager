import React, { Component } from 'react';
import { connect } from 'react-redux';
import {handleItemDelete, updateShipmentInfo} from '../actions/shipmentActions';

class ModalConfirm extends Component {

  componentWillUnmount = () => {
    updateShipmentInfo();
  }

  render() {
    const { currentItem, handleCloseForm, handleItemDelete } = this.props;
    if(currentItem) {
      return (
        <div className='modal-container'>
          <div className="form-container">
            <div className="login-header">
              <h1>Delete {currentItem.code}?</h1>
            </div>
              <div className="flex-button-container">
                <button
                  className='submit-button wide-button'
                  onClick={handleItemDelete}
                >DELETE</button>
                <button
                  className='cancel-button wide-button'
                  onClick={handleCloseForm}
                >CANCEL</button>
              </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.shipmentReducer.currentItem
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCloseForm: () => {dispatch({type: 'MODAL_CONFIRMATION_FORM_CLOSED'})},
    handleItemDelete: () => {dispatch(handleItemDelete())}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirm);