import React, { Component } from 'react';
import { connect } from 'react-redux';
import Item from './Item';
import { openModalFormItem } from '../actions/shipmentActions';

class ItemContainer extends Component {

  render() {
    let list;
    const { currentShipment,shipments, currentShipmentItems, openModalFormItem, selectItemToSend, selectItemToDelete, inProgress } = this.props;

    // Depending on if shipment not selected or it doesnt have items
    // warning messages are rendered in the items list place 
    if (!shipments.length) {
      list = (
        <div className="message">
          <h4>You don't have shipments yet. Go on and create first.</h4>
        </div>
      )
    } else if (shipments.length && !currentShipment) {
      list = (
        <div className="message">
          <h4>Choose a shipment, lad.</h4>
        </div>
      )
    } else if (currentShipment && !currentShipmentItems.length) {
      list = (
        <div className="message">
          <h4>This shipment doesn't have items. Add the first one.</h4>
        </div>
      )
    } else {
      list = currentShipmentItems.map(item => {
        return (
          <li className='item' key={item.id}><Item item={item}/></li>
        ) 
      })
    }

    // The inProgress flag is being set to true for the time of shipments fetch (line 49)
    return (
      <div className='items-container'>
        <div className="gap"> </div>
        <div className="items-list-container">
          <ul className="flex-items-list">

          <h2 className='shipment-header'>{currentShipment ? currentShipment.name : ' '}</h2>

          { inProgress
            ?  <h2>Loading...</h2>
            : list }

          </ul>
          <div className="items-buttons-container">
            <button
              className="submit-button wide-button item-button"
              disabled={currentShipment ? false : true}
              onClick={openModalFormItem}>
              ADD ITEM
            </button>
            <button 
              className="submit-button wide-button item-button shipment-delete-button"
              type='button'
              disabled={currentShipment ? false : true}
              onClick={() => selectItemToDelete()}>
              DELETE SHIPMENT
            </button>
            <button 
              className="submit-button wide-button item-button"
              type='button'
              disabled={currentShipmentItems.length ? false : true}
              onClick={() => selectItemToSend()}>
              SEND SHIPMENT
            </button>
        </div>       
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentShipment: state.shipmentReducer.currentShipment,
    shipments: state.shipmentReducer.shipments,
    currentShipmentItems: state.shipmentReducer.currentShipmentItems,
    inProgress: state.shipmentReducer.inProgress
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModalFormItem: () => { dispatch(openModalFormItem()) },
    selectItemToSend: () => { dispatch({type: 'ITEM_SELECTED', currentItem: null, actionToConfirm: 'Send'}) },
    selectItemToDelete: () => { dispatch({type: 'ITEM_SELECTED', currentItem: null, actionToConfirm: 'Delete'}) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);