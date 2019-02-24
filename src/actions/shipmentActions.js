
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

export const createShipment = (name, token) => {
  let id = createRandomIntegerId();
  return dispatch => {
    fetch('https://api.shipments.test-y-sbm.com/shipment', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}`},
      body: JSON.stringify({
        id: id,
        name: name
      })
    })
    .then(() => {
      let shipment = {id: id, name: name, items: []};
      dispatch({type: 'SHIPMENT_CREATED', shipment: shipment});
    })
    .catch(err => console.log(err.message));
  }
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

const createRandomIntegerId = () => {
  let x = Math.floor((Math.random() * 10000000) + 1);
  let y = Math.floor((Math.random() * 10000000) + 10000000);
  return x+y;
}

