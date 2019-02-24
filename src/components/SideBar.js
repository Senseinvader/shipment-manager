import React, { Component } from 'react'
import { connect } from 'react-redux';
import {fetchShipments, openModalShipment} from '../actions/shipmentActions';

class SideBar extends Component {

  componentDidMount = () => {
    const {fetchShipments} = this.props;
    fetchShipments();
  }
  

  render() {
    const { shipments, openModalShipment, setCurrentShipment } = this.props;
    return (
      <div className='sidebar-container'>
        <div className="shipments-list">
          <ul className="ul-flex">
            {(shipments.length > 0) ? shipments.map(shipment => {
              return (
                <li className='shipment' key={shipment.id} onClick={() => setCurrentShipment(shipment)}>{shipment.name}</li>
              ) 
            })
            : ''
            }
          </ul>
        </div>
        <div className="shipments-button-container">
          <button className="submit-button wide-button" onClick={openModalShipment}>
            ADD SHIPMENT
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    shipments: state.shipmentReducer.shipments
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentShipment: (shipment) => {dispatch({type: 'SHIPMENT_SELECTED', currentShipment: shipment})},
    fetchShipments: () => {dispatch(fetchShipments())},
    openModalShipment: () => { 
      dispatch(openModalShipment()) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);