const initState = {
  shipments: [],
  currentShipment: null,
  currentShipmentItems: [],
  currentItem: null,
  isModal: false,
  isModalConfirmation: false,
  typeToCreate: '',
  actionToConfirm: '',
  placeholder: '',
  shipmentName: '',
  itemCode: '',
  errorMessage: ''
};

const shipmentReducer = (state=initState, action) => {
  switch (action.type) {
    case 'SHIPMENT_CREATED': 
      return {...state, shipments: [...state.shipments, action.shipment], errorMessage: ''};
    case 'SHIPMENTS_FETCHED': 
      return {...state, shipments: action.shipments, errorMessage: ''};
    case 'MODAL_CREATION_FORM_CALLED': 
      return {...state, isModal: true, typeToCreate: action.typeToCreate, placeholder: action.placeholder};
    case 'MODAL_CREATION_FORM_CLOSED':
      return {...state, isModal: false, typeToCreate: '', placeholder: ''};


    case 'MODAL_CONFIRMATION_FORM_CALLED':
      return {...state, isModalConfirmation: true, actionToConfirm: action.actionToConfirm}
    case 'MODAL_CONFIRMATION_FORM_CLOSED':
      return {...state, isModalConfirmation: false, currentItem: null, actionToConfirm: ''};

    case 'SHIPMENT_ITEMS_UPDATED':
      return {...state, currentShipment: action.shipment};

    case 'ERROR_MESSAGE_SHOWN':
      return {...state, errorMessage: action.errorMessage};

    case 'CURRENT_SHIPMENT_SENT':
      return {...state, currentShipment: null, currentShipmentItems: []};

    case 'SHIPMENT_SELECTED':
      return {...state, currentShipment: action.currentShipment, currentShipmentItems: action.currentShipment.items};
    case 'ON_SHIPMENT_NAME_CHANGED':
      return {...state, shipmentName: action.shipmentName};
    case 'ON_ITEM_CODE_CHANGED':
      return {...state, itemCode: action.itemCode};
    case 'ITEM_ADDED': 
      return {...state, currentShipmentItems: [...state.currentShipmentItems, action.item]};
    case 'ITEM_SELECTED':
      return {...state, currentItem: action.currentItem, isModalConfirmation: true, actionToConfirm: action.actionToConfirm};
      
    case 'ITEM_DELETED_FROM_CURRENT_SHIPMENT': 
      return {...state, currentShipmentItems: state.currentShipmentItems.filter(item => item.id !== action.id)};
    case 'MODAL_FORM_CLOSED':
      return {...state, isModal: false, typeToCreate: '', placeholder: '', shipmentName: '', itemCode: '', errorMessage: ''};
    case 'USER_LOGGED_OUT': 
      return {...state, isModal: false, typeToCreate: '', placeholder: '', shipmentName: '', itemCode: '', shipments: [], currentShipment: null, currentShipmentItems: []};
    default:
      return state;
  }
}

export default shipmentReducer;