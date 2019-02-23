import React, { Component } from 'react'
import { connect } from 'react-redux';
import {fetchShipments} from '../actions/shipmentActions';

class SideBar extends Component {

  componentDidMount = () => {
    const {fetchShipments} = this.props;
    fetchShipments();
  }
  

  render() {
    const { shipments } = this.props;
    return (
      <div className='sidebar-container'>
        <ul className="ul-flex">
          {(shipments.length > 0) ? shipments.map(shipment => {
            return (
              <li className='shipment' key={shipment.id}>{shipment.name}</li>
            ) 
          })
          : ''
          }
        </ul>
        <div className="shipments-button-container">
          <button className="submit-button wide-button">
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
    fetchShipments: () => {dispatch(fetchShipments())}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);