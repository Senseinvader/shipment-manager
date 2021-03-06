import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteItemFromShipment, sendShipment, deleteShipment } from '../actions/shipmentActions';

class ModalConfirm extends Component {

  // Handler to close modal window with 
  handleEscPress = (e) => {
    if(e.keyCode === 27) {
      e.preventDefault();
      this.props.handleCloseForm();
      window.removeEventListener('keyup', this.handleEscPress);
    }
  }

  // Listeners to attach ESC button to close modal window
  componentDidMount = () => {
    window.addEventListener('keyup', this.handleEscPress);
  }
  componentDidUpdate = () => {
    window.addEventListener('keyup', this.handleEscPress);
  }
  componentWillUnmount = () => {
    window.removeEventListener('keyup', this.handleEscPress);
  }
   
  // Generic finction to render ModalConfirm window for shipment/item to delete
  // or shipment to send (depending on a given handlerFunction)
  renderModalConfirmation(handlerFunction) {
    const { currentItem, currentShipment, handleCloseForm, actionToConfirm } = this.props;
      return (
        <div className='modal-container'>
          <div className="form-container confirm-container">
            <div className="login-header">
              <h1>{actionToConfirm} {(actionToConfirm==='Delete' && currentItem) ? currentItem.code : currentShipment.name}?</h1>
            </div>
            <div className="flex-button-container">
              <button
                className='submit-button wide-button'
                onClick={handlerFunction}
              >{actionToConfirm.toUpperCase()}</button>
              <button
                className='cancel-button wide-button'
                onClick={handleCloseForm}
              >CANCEL</button>
            </div>
          </div>
        </div>
      );
  }

  render() {
    const {isModalConfirmation, actionToConfirm, handleItemDelete, handleShipmentSend, handleShipmentDelete, currentItem} = this.props;
    if (isModalConfirmation && actionToConfirm==='Delete' && currentItem) {
      return this.renderModalConfirmation(handleItemDelete);
    } else if (isModalConfirmation && actionToConfirm==='Delete' && !currentItem) {
      return this.renderModalConfirmation(handleShipmentDelete);
    } else if (isModalConfirmation && actionToConfirm==='Send') {
      return this.renderModalConfirmation(handleShipmentSend);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.shipmentReducer.currentItem,
    currentShipment: state.shipmentReducer.currentShipment,
    actionToConfirm: state.shipmentReducer.actionToConfirm,
    isModalConfirmation: state.shipmentReducer.isModalConfirmation
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCloseForm: () => { dispatch({type: 'MODAL_CONFIRMATION_FORM_CLOSED'}) },
    handleItemDelete: () => { dispatch(deleteItemFromShipment()) },
    handleShipmentDelete: () => { dispatch(deleteShipment()) },
    handleShipmentSend: () => { dispatch(sendShipment()) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirm);