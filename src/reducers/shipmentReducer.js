const initState = {
  shipments: [],
};

const shipmentReducer = (state=initState, action) => {
  switch (action.type) {
    case 'SHIPMENT_CREATED': 
      return {...state, shipments: [...state.shipments, action.shipment]};
    case 'SHIPMENTS_FETCHED': 
      return {...state, shipments: action.shipments}
    default:
      return state;
  }
}

export default shipmentReducer;