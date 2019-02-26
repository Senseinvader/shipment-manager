
export const validateForm = (typeValue, typeToCreate) => {
  return (dispatch, getState) => {
    if (!typeValue) {
      dispatch(sendErrorMessage(`Please provide ${typeToCreate} name.`));
    } else if (typeToCreate==='shipment') {
      if (!checkShipmentNames(getState().shipmentReducer.shipments, typeValue)) {
        dispatch(sendErrorMessage('Shipment with this name already exists.'));
      } else {
        dispatch(createShipment(typeValue));
      }
    } else if (typeToCreate==='item') {
      dispatch(addItemToShipment(typeValue));
    } else {
      if (!checkItemNames(getState().shipmentReducer.currentShipment, typeValue)) {
        dispatch(sendErrorMessage('Item with this name already exists in this shipment.'));
      } else {
        dispatch(createItem(typeValue));
      }
    }
  }
}

const checkShipmentNames = (currentShipment, typeValue) => {
  for (let item of currentShipment) {
    if (item.name === typeValue) {
      return false;
    }
  }
  return true;
}

const checkItemNames = (shipments, typeValue) => {
  for (let shipment of shipments) {
    if (shipment.name === typeValue) {
      return false;
    }
  }
  return true;
}

export const fetchShipments = () => {
  return (dispatch, getState) => {
    fetch('https://api.shipments.test-y-sbm.com/shipment', {
      method: 'GET',
      headers: new Headers(
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getState().loginReducer.token})
    })
    .then(results => results.json())
    .then(data => {
      dispatch({type: 'SHIPMENTS_FETCHED', shipments: data.data.shipments})
    })
    .catch(err => console.log(err.message));
  }
}

export const createShipment = (name) => {
  let id = createRandomIntegerId();
  return (dispatch, getState) => {
    fetch('https://api.shipments.test-y-sbm.com/shipment', {
      method: 'POST',
      headers: new Headers(
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getState().loginReducer.token}),
      body: JSON.stringify({
        id: id,
        name: name
      })
    })
    .then(() => {
      dispatch({type: 'MODAL_FORM_CLOSED'});
      dispatch(fetchShipments());
    })
    .catch(err => console.log(err.message));
  }
}

export const deleteItemFromShipment = () => {
  return (dispatch, getState) => {
    let currentItem = getState().shipmentReducer.currentItem;
    console.log(`https://api.shipments.test-y-sbm.com/item/${currentItem.id}`)
    fetch(`https://api.shipments.test-y-sbm.com/item/${currentItem.id}`, {
      method: 'DELETE',
      headers: new Headers(
        {
          'Content-Type': 'application/json',
          'Accept': 'aplication/json',
          'Authorization': 'Bearer ' + getState().loginReducer.token})
    })
    .then(() => {
      dispatch(fetchShipments());
    })
    .then(() => {
      dispatch({type: 'ITEM_DELETED_FROM_CURRENT_SHIPMENT', id: currentItem.id});
      dispatch({type: 'MODAL_CONFIRMATION_FORM_CLOSED'})
    })
    .catch(err => console.log(err.message));
  }
}

const addItemToShipment = (code) => {
  let id = createRandomIntegerId();
  return (dispatch, getState) => {
    let currentShimentId = getState().shipmentReducer.currentShipment.id;
    let currentShipmentName = getState().shipmentReducer.currentShipment.name;
    fetch('https://api.shipments.test-y-sbm.com/item', {
      method: 'POST',
      headers: new Headers(
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getState().loginReducer.token}),
      body: JSON.stringify({
        id: id,
        shipment_id: currentShimentId,
        name: currentShipmentName,
        code: code
      })
    })
    .then(() => {
      dispatch(fetchShipments());
      let item = {id: id, shipment_id: currentShimentId, name: currentShipmentName, code: code};
      dispatch({type: 'ITEM_ADDED', item: item});
      dispatch({type: 'MODAL_FORM_CLOSED'});
    })
    .catch(err => console.log(err.message));
  }
}
 
const createItem = (code) => {
  console.log('createItem ', code);
}

export const openModalShipment = () => ({
  type: 'MODAL_CREATION_FORM_CALLED',
  typeToCreate: 'shipment',
  placeholder: 'shipment name'
});

export const openModalItem = () => ({
  type: 'MODAL_CREATION_FORM_CALLED',
  typeToCreate: 'item',
  placeholder: 'item code'
});

const sendErrorMessage = (message) => ({
  type: 'ERROR_MESSAGE_SHOWN',
  errorMessage: message
});

const createRandomIntegerId = () => {
  let x = Math.floor((Math.random() * 10000000) + 1);
  let y = Math.floor((Math.random() * 10000000) + 10000000);
  return x+y;
}

