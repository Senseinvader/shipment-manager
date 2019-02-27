import React, { Component } from 'react'
import { connect } from 'react-redux';

class Item extends Component {
  render() {
    const {item, selectItem} = this.props;
    return (
      <div className='item-container'>
        <div className="item-description">
          {item.code}
        </div>
        <button className='submit-button low-button' onClick={() => selectItem(item)}>DELETE</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectItem: (item) => {dispatch({type: 'ITEM_SELECTED', currentItem: item, actionToConfirm: 'Delete'})}
  }
};

export default connect(null, mapDispatchToProps)(Item);