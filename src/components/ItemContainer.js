import React, { Component } from 'react';
import { connect } from 'react-redux';
import Item from './Item';

class ItemContainer extends Component {

  renderList() {
    const { currentShipment } = this.props;
    if (!currentShipment) {
      return (
        <div className="message">
          <h4>You don't have shipments yet. Please create first.</h4>
        </div>
      )
    } else if (currentShipment && !currentShipment.items.length) {
      return (
        <div className="message">
          <h4>This shipment doesn't have items. Please add first.</h4>
        </div>
      )
    } else {
      currentShipment.items.map(item => {
        return (
          <li className='shipment' key={item.id}><Item code={item.code}/></li>
        ) 
      })
    }
  }

  render() {
    const { currentShipment } = this.props;
    return (
      <div className='items-container'>
        <div className="gap"> </div>
        <div className="items-list-container">
          <h1>Let's get down to work!</h1>
          <ul className="flex-items-list">
          {  }
          </ul>
          <div className="items-buttons-container">
            <button className="submit-button wide-button item-button" onClick={console.log('hi')}>
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
    currentShipment: state.shipmentReducer.currentShipment
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);