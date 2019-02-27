import React, { Component } from 'react'
import { connect } from 'react-redux';
import {fetchShipments, openModalFormShipment} from '../actions/shipmentActions';

class SideBar extends Component {

  // All shipment are fetched on CDM hook
  componentDidMount = () => {
    const {fetchShipments} = this.props;
    fetchShipments();
  }
  
  render() {
    const { shipments, openModalFormShipment, setCurrentShipment, currentShipment } = this.props;
    return (
      <div className='sidebar-container'>
        <div className="shipments-list">
          <ul className="ul-flex">

            {(shipments.length > 0) ? shipments.map(shipment => {
              let classes = '';
              (currentShipment && shipment.id === currentShipment.id) ? classes = 'current' : classes = '';
              return (
                <li className={classes} key={shipment.id} onClick={() => setCurrentShipment(shipment)}>{shipment.name}</li>
              ) 
            })
            : ''
            }

          </ul>
        </div>
        <div className="shipments-button-container">
          <button className="submit-button wide-button" onClick={openModalFormShipment}>
            ADD SHIPMENT
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    shipments: state.shipmentReducer.shipments,
    currentShipment: state.shipmentReducer.currentShipment
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentShipment: (shipment) => { dispatch({type: 'SHIPMENT_SELECTED', currentShipment: shipment}) },
    fetchShipments: () => { dispatch(fetchShipments()) },
    openModalFormShipment: () => { dispatch(openModalFormShipment()) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);