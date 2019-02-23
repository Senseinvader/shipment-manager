import React, { Component } from 'react'
import { connect } from 'react-redux';

class SideBar extends Component {
  render() {
    return (
      <div className='sidebar-container'>
        <div className="shipments-container">
          <ul className="ul-flex">

          </ul>
        </div>
        <div className="shipments-button">
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
    
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);