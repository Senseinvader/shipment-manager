import React, { Component } from 'react'

class ItemContainer extends Component {
  render() {
    return (
      <div className='items-container'>
        <div className="gap"> </div>
        <div className="items-list-container">
          <h1>Let's get down to work!</h1>

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

export default ItemContainer;