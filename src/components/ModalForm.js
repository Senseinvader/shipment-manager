import React, { Component } from 'react';
import { connect } from 'react-redux';
import {validateForm} from '../actions/shipmentActions'; 

class ModalForm extends Component {
  constructor() {
    super();
    this.onChangeItemCode = (e) => this.props.onChangeItemCode(e.target.value);
    this.onChangeShipmentName = (e) => this.props.onChangeShipmentName(e.target.value);
    this.submitForm = (typeValue, typeToCreate) => e => {
      e.preventDefault();
      this.props.validateForm(typeValue, typeToCreate);
    }
  }

  componentDidMount = () => {
    window.addEventListener('keyup', this.handleEscPress);
  }
  componentDidUpdate = () => {
    window.addEventListener('keyup', this.handleEscPress);
  }

  componentWillUnmount = () => {
    window.removeEventListener('keyup', this.handleEscPress);
  }
    
  handleEscPress = (e) => {
    if(e.keyCode === 27) {
      e.preventDefault();
      this.props.handleCloseForm();
      window.removeEventListener('keyup', this.handleEscPress);
    }
  }

  renderForm(typeValue, onChangeFunction) {
    const {typeToCreate, placeholder, handleCloseForm, errorMessage} = this.props;
    return (
      <div className='modal-container'>
        <div className="form-container">
          <div className="login-header">
            <h1>Add {typeToCreate}</h1>
          </div>
          <form onSubmit={this.submitForm(typeValue, typeToCreate)} className='flex-add-form'>
            <input 
              type="text" 
              className='form-input'
              placeholder={placeholder}
              value={typeValue}
              onChange={onChangeFunction}/>
            <p className="error-message">{errorMessage}</p>
            <div className="flex-button-container">
              <button
                className='submit-button wide-button'
                type='submit'
              >ADD {typeToCreate.toUpperCase()}</button>
              <button
                className='cancel-button wide-button'
                onClick={handleCloseForm}
              >CANCEL</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  render() {
    const {isModal, typeToCreate, shipmentName, itemCode} = this.props;
    console.log(typeToCreate)
    if (isModal && typeToCreate==='shipment') {
      return this.renderForm(shipmentName, this.onChangeShipmentName);
    } else if (isModal && typeToCreate==='item') {
      return this.renderForm(itemCode, this.onChangeItemCode);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isModal: state.shipmentReducer.isModal,
    typeToCreate: state.shipmentReducer.typeToCreate,
    placeholder: state.shipmentReducer.placeholder,
    shipmentName: state.shipmentReducer.shipmentName,
    itemCode: state.shipmentReducer.itemCode,
    errorMessage: state.shipmentReducer.errorMessage
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeItemCode: (itemCode) => {dispatch({type:'ON_ITEM_CODE_CHANGED', itemCode})},
    onChangeShipmentName: (shipmentName) => {dispatch({type:'ON_SHIPMENT_NAME_CHANGED', shipmentName})},
    validateForm: (typeValue, typeToCreate) => {dispatch(validateForm(typeValue, typeToCreate))},
    handleCloseForm: () => {dispatch({type: 'MODAL_FORM_CLOSED'})}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);
