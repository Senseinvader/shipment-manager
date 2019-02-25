import React, { Component } from 'react';
import { connect } from 'react-redux';
import Item from './Item';
import {openModalItem} from '../actions/shipmentActions';

class ItemContainer extends Component {

  render() {
    let list;
    const { currentShipment, shipments, currentShipmentItems, openModalItem } = this.props;

    if (!shipments.length) {
      list = (
        <div className="message">
          <h4>You don't have shipments yet. Please create first.</h4>
        </div>
      )
    } else if (shipments.length && !currentShipment) {
      list = (
        <div className="message">
          <h4>Please choose a shipment.</h4>
        </div>
      )
    } else if (currentShipment && !currentShipmentItems.length) {
      list = (
        <div className="message">
          <h4>This shipment doesn't have items. Please add first.</h4>
        </div>
      )
    } else {
      list = currentShipmentItems.map(item => {
        console.log(item)
        return (
          <li className='item' key={item.id}><Item item={item}/></li>
        ) 
      })
    }

    return (
      <div className='items-container'>
        <div className="gap"> </div>
        <div className="items-list-container">
          <ul className="flex-items-list">
          { list }
          </ul>
          <div className="items-buttons-container">
            <button className="submit-button wide-button item-button" onClick={openModalItem}>
              ADD ITEM
            </button>
            <button className="submit-button wide-button item-button" onClick={console.log('hi')}>
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
    currentShipmentItems: state.shipmentReducer.currentShipmentItems
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModalItem: () => {dispatch(openModalItem())}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);