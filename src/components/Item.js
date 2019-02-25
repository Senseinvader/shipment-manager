import React, { Component } from 'react'
import { connect } from 'react-redux';

class Item extends Component {
  render() {
    const {code} = this.props;
    return (
      <div className='item-container'>
        <div className="item-description">
          {code}
        </div>
        <button className='submit-button low-button'>DELETE</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Item);