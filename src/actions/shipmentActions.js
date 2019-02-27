
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
    }
  }
}

// In case item names should be unique:
// const checkItemNames = (currentShipment, typeValue) => {
//   for (let item of currentShipment) {
//     if (item.code === typeValue) {
//       return false;
//     }
//   }
//   return true;
// }

const checkShipmentNames = (shipments, typeValue) => {
  for (let shipment of shipments) {
    if (shipment.name === typeValue) {
      return false;
    }
  }
  return true;
}

export const fetchShipments = () => {
  return (dispatch, getState) => {
    dispatch(fetchShipmentsStart());
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
      dispatch({type: 'SHIPMENT_SELECTED', currentShipment: {id: id, name: name, items: []}});
      dispatch({type: 'MODAL_FORM_CLOSED'});
      dispatch(fetchShipments());
    })
    .catch(err => console.log(err.message));
  }
}

export const deleteItemFromShipment = () => {
  return (dispatch, getState) => {
    let currentItem = getState().shipmentReducer.currentItem;
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

export const sendShipment = () => {
  console.log('send shipment')
  return (dispatch, getState) => {
    let shipmentId = getState().shipmentReducer.currentShipment.id;
    fetch(`https://api.shipments.test-y-sbm.com/shipment/${shipmentId}/send`, {
      method: 'POST',
      headers: new Headers(
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getState().loginReducer.token})
    })
    .then(() => {
      dispatch({type: 'MODAL_CONFIRMATION_FORM_CLOSED'});
      dispatch({type: 'CURRENT_SHIPMENT_SENT'});
      dispatch(fetchShipments());
    })
    .catch(err => console.log(err.message));
  }
}

const fetchShipmentsStart = () => ({
  type: 'FETCH_SHIPMENTS_START'
});

export const deleteShipment = () => {
  return (dispatch, getState) => {
    let shipmentId = getState().shipmentReducer.currentShipment.id;
    fetch(`https://api.shipments.test-y-sbm.com/shipment/${shipmentId}`, {
      method: 'DELETE',
      headers: new Headers(
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getState().loginReducer.token})
    })
    .then(() => {
      dispatch({type: 'MODAL_CONFIRMATION_FORM_CLOSED'});
      dispatch({type: 'CURRENT_SHIPMENT_SENT/DELETED'});
      dispatch(fetchShipments());
    })
    .catch(err => console.log(err.message));
  }
}

export const openModalFormShipment = () => ({
  type: 'MODAL_CREATION_FORM_CALLED',
  typeToCreate: 'shipment',
  placeholder: 'shipment name'
});

export const openModalFormItem = () => ({
  type: 'MODAL_CREATION_FORM_CALLED',
  typeToCreate: 'item',
  placeholder: 'item code'
});

export const openModalConfirmSendShipment = () => ({
  type: 'MODAL_CONFIRMATION_FORM_CALLED',
  actionToConfirm: 'Send'
});

export const openModalConfirmDeleteItem = () => ({
  type: 'MODAL_CONFIRMATION_FORM_CALLED',
  actionToConfirm: 'Delete'
});

export const openModalConfirmDeleteShipment = () => ({
  type: 'MODAL_CONFIRMATION_FORM_CALLED',
  actionToConfirm: 'Delete'
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

