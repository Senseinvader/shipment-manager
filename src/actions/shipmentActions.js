
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
    } else {
      dispatch(createItem(typeValue));
    }
  }
}

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
    console.log(getState().loginReducer.token)
    fetch('https://api.shipments.test-y-sbm.com/shipment', {
      method: 'GET',
      headers: new Headers(
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getState().loginReducer.token})
    })
    .then(results => {
      return results.json();
    })
    .then(data => {
      console.log(data.data.shipments);
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
      let shipment = {id: id, name: name, items: []};
      dispatch({type: 'SHIPMENT_CREATED', shipment: shipment});
      fetchShipments();
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
  typetoCreate: 'item',
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

