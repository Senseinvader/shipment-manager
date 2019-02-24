const initState = {
  shipments: [],
  currentShipment: null,
  isModal: false,
  typeToCreate: '',
  placeholder: '',
  shipmentName: '',
  itemCode: ''
};

const shipmentReducer = (state=initState, action) => {
  switch (action.type) {
    case 'SHIPMENT_CREATED': 
      return {...state, shipments: [...state.shipments, action.shipment]};
    case 'SHIPMENTS_FETCHED': 
      return {...state, shipments: action.shipments};
    case 'MODAL_CREATION_FORM_CALLED': 
      return {...state, isModal: true, typeToCreate: action.typeToCreate, placeholder: action.placeholder};
    case 'MODAL_CREATION_FORM_CLOSED':
      return {...state, isModal: false, typeToCreate: '', placeholder: ''};
    case 'SHIPMENT_SELECTED':
      return {...state, currentShipment: action.currentShipment};
    case 'USER_LOGGED_OUT': 
      return {...state, isModal: false, typeToCreate: '', placeholder: '', shipmentName: '', itemCode: '', shipments: [], currentShipment: null};
    default:
      return state;
  }
}

export default shipmentReducer;