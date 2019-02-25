const initState = {
  shipments: [],
  currentShipment: null,
  currentItem: null,
  isModal: false,
  isModalConfirmation: false,
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

    case 'MODAL_CONFIRMATION_FORM_CLOSED':
      return {...state, isModalConfirmation: false, currentItem: null};

    case 'SHIPMENT_SELECTED':
      return {...state, currentShipment: action.currentShipment};
    case 'ON_SHIPMENT_NAME_CHANGED':
      return {...state, shipmentName: action.shipmentName};
    case 'ON_ITEM_CODE_CHANGED':
      return {...state, itemCode: action.itemCode};
    case 'ITEM_SELECTED':
      return {...state, currentItem: action.currentItem, isModalConfirmation: true};
    case 'ITEM_DELETED': 
      return {...state, }
    case 'MODAL_FORM_CLOSED':
      return {...state, isModal: false, typeToCreate: '', placeholder: '', shipmentName: '', itemCode: '', currentShipment: null};
    case 'USER_LOGGED_OUT': 
      return {...state, isModal: false, typeToCreate: '', placeholder: '', shipmentName: '', itemCode: '', shipments: [], currentShipment: null};
    default:
      return state;
  }
}

export default shipmentReducer;