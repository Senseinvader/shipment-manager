import React, { Component } from 'react';
import { connect } from 'react-redux'

class ModalForm extends Component {
  constructor() {
    super();
    this.onChangeItemCode = (e) => this.props.onChangeItemCode(e.target.value);
    this.onChangeShipmentName = (e) => this.props.onChangeShipmentName(e.target.value);
    this.submitForm = (value) => e => {
      e.preventDefault();
      this.props.validateForm(value);
    }
  }

  renderForm(type, onChangeFunction) {
    const {typeToCreate, placeholder} = this.props;
    return (
      <div className='modal-container'>
        <div className="form-container">
          <div className="login-header">
            <h1>Add {typeToCreate}</h1>
          </div>
          <form onSubmit={this.submitForm(type)}>
            <input 
              type="text" 
              className='form-input'
              placeholder={placeholder}
              value={type}
              onChange={onChangeFunction}/>
            <button
              className='submit-button'
              type='submit'
            >ADD {typeToCreate.toUpperCase()}</button>
          </form>
        </div>
      </div>
    )
  }

  render() {
    const {isModal, typeToCreate, shipmentName, itemCode} = this.props;
    if (isModal && typeToCreate==='shipment') {
      return this.renderForm(shipmentName, this.onChangeShipmentName);
    } else if (isModal && typeToCreate==='item') {
      return this.renderForm(itemCode, this.onChangeItemCode);
    } else return null;
  }
}

const mapStateToProps = (state) => {
  return {
    isModal: state.shipmentReducer.isModal,
    typeToCreate: state.shipmentReducer.typeToCreate,
    placeholder: state.shipmentReducer.placeholder,
    shipmentName: state.shipmentReducer.shipmentName,
    itemCode: state.shipmentReducer.itemCode
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeItemCode: (itemCode) => {dispatch({type:'ON_ITEM_CODE_CHANGED', itemCode})},
    onChangeShipmentName: (shipmentName) => {dispatch({type:'ON_SHIPMENT_NAME_CHANGED', shipmentName})},
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);
