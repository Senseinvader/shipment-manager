import React, { Component } from 'react'
import { connect } from 'react-redux';
import {fetchShipments} from '../actions/shipmentActions';

class SideBar extends Component {

  componentDidMount = () => {
    const {fetchShipments, shipments} = this.props;
    fetchShipments();
    console.log(shipments);
  }
  

  render() {
    return (
      <div className='sidebar-container'>
        <div className="shipments-container">
          <ul className="ul-flex">

          </ul>
        </div>
        <div className="shipments-button-container">
          <button className="add-button">
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